const { google } = require("googleapis");
const readline = require("readline");
const fs = require("fs");

const credentials = require("./credentials.json");

const { client_id, client_secret, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const SCOPES = ["https://www.googleapis.com/auth/drive"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

console.log("Open this URL in browser:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter code: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  fs.writeFileSync("token.json", JSON.stringify(tokens));
  console.log("Token saved! ✅");
  rl.close();
});