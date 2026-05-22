
function togglePasswordLoginAndsignup() {
    const passwordInput = document.getElementById("passwordinput");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

//conform 
    function confirmDiv(message) {
      return confirm(message);
    }

  //  PASSWORD TOGGLE SCRIPT 
        function togglePassword() {
          const pw = document.getElementById("password2");
          if (pw.type === "password") {
            pw.type = "text";
          } else {
            pw.type = "password";
          }
        }
function checkPasswordSame() {
    const pass1 = document.getElementById("password1").value;
   const pass2 = document.getElementById("password2").value;
    if (pass1 != pass2) {
        alert("Passwords do not match!");
        return false; // stop form submit
    }
     if (pass1.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false; // stop form submit
      }
    return true; // allow submit
}

  //  PASSWORD TOGGLE SCRIPT 
    function checkPassword() {
      const pw = document.getElementById("password");
      if (pw.value.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false; // stop form submit
      }
    }
