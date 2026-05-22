const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
 const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose').default;
const nodemailer = require("nodemailer");
const path = require("path");
// flash middleware (NOTE: usually in app.js, but ok here if needed)
router.use(flash());
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// views (better keep in app.js, but keeping as you asked)
// router.set = router.app?.set; // ❌ ignore if app handles views
// -------- MongoDB --------
// mongoose.connect("mongodb://127.0.0.1:27017/mydb")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

// -------- Session (IMPORTANT: should be in app.js, not router) --------
// You can move this to app.js later
router.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/subject",
    collectionName: "sessions"
  }),
  cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }
}));
router.use(passport.initialize());
router.use(passport.session());
//user data save for res
router.use((req, res, next) => {
  res.locals.currUser = req.user;
  next();
});
// -------- Schema --------
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  majorsubject: String,
  otp: String,
  otpExpiry: Date,
  admin: {
    type: Boolean,
    default: false
  },
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});
const userPass = mongoose.model('userPass', userSchema);
passport.use(userPass.createStrategy());
passport.serializeUser(userPass.serializeUser());
passport.deserializeUser(userPass.deserializeUser());
// -------- Helpers --------
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}

// ================= ROUTES ================= //

// home
router.get("/loginAndsigup", (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.redirect("/loginform");
  }
});
// login page
router.get("/loginform", (req, res) => {
  const errorMessage = req.flash('error');
  res.render("./loginAndsignup/index", { error: errorMessage[0] });
});

// login
router.post('/login', async (req, res, next) => {
  const { email } = req.body;
  const user = await userPass.findOne({ email });
  if (!user) {
    req.flash('error', "Email not found");
    return res.redirect('/loginform');
  }
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.flash('error', "Wrong password");
      return res.redirect('/loginform');
    }
    req.login(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

// signup form
router.get("/signform", (req, res) => {
  res.render("./loginAndsignup/sign.ejs");
});

// signup
router.post("/singup", async (req, res, next) => {
  try {
    const { username, majorsubject, email, password } = req.body;
    const newUser = new userPass({ username, majorsubject, email });
    const registeredUser = await userPass.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  } catch (err) {
    if (err.name === "UserExistsError") {
      res.send("Username already taken <a href='/loginform'>login</a>");
    } else {
      res.send("Something went wrong");
    }
  }
});

// logout
router.get("/logout", (req, res, next) => {
  // if user already logged out
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
req.logout(err => {
    if (err) return next(err);
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/");
    });
});
});
// forget password page
router.get("/forgetPassword", (req, res) => {
  res.render("./loginAndsignup/forgetPassword");
});

// send OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000);
}
router.post("/forgetPassword", async (req, res) => {
  let { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",   // ✅ correct
    port: 465,
    secure: true,
    auth: {
      // user: "amanpatel64907@gmail.com",
      // pass: "vorz qxrw xamj ijsl"
      user: "notesforugbhu@gmail.com",
      pass: "iywa mooy dmyc akcz" //
    }
  });

  let otp = generateOTP();
  const user = await userPass.findOneAndUpdate({ email }, {
    otp: otp,
    otpExpiry: Date.now() + 5 * 60 * 1000
  },
    { new: true }
  );
  if (!user) {
    req.flash('error', "Email not found and please enter correct email and user must be register");
    return res.redirect('/loginform');
  }
  const mailOptions = {
    from: "amanpatel64907@gmail.com",
    to: email,
    subject: "OTP for Password Reset",
    text: `Hello,
We received a request to reset your password.
Your One-Time Password (OTP) is: ${otp}
This OTP is valid for only 10 minutes. Please do not share it with anyone for security reasons.
If you did not request a password reset, please ignore this email.
Thank you.
Best regards,
Notes for Ug`
  };
  transporter.sendMail(mailOptions, (err, info) => {
    //if (err)  console.log("Error:", err);
    //else console.log("Email sent:", info.response);
  });
  res.render("./loginAndsignup/otpEnter", { email });
})
// OTP check
router.post("/otpCheck", async (req, res) => {
  let { otp, email } = req.body;
  const user = await userPass.findOne({ email });

  if (user && user.otp == otp && user.otpExpiry > Date.now()) {
    res.render("./loginAndsignup/passwored", { email });
  } else {
    res.render("./loginAndsignup/otpEnter", { email, error: "Invalid OTP" });
  }
});
// password update
router.post("/passwordUpadte", async (req, res) => {
  let { email, password1 } = req.body;
  const user = await userPass.findOne({ email });
  if (!user) {
    return res.render("./passwored", { email, error: "User not found" });
  }
  await user.setPassword(password1);
  await user.save();
  res.render("./loginAndsignup/index.ejs", { success: "Password reset successful" });
});
module.exports = router;