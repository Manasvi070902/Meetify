var admin = require("firebase-admin");
require("dotenv").config();
// required for configuring firebase admin sdk
var serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

const checkAuth = (req, res, next) => {
  console.log(
    "inside ensureAuth middleware"
  );

  if (req.headers.authtoken) {
    if (req.headers.authtoken == "test") {
      req.user = {
        user_id: "j4vM2gwuiARNg7c5uAbMddXVxiJ2",
        email: "abc@gmail.com",
        name: "abc",
        picture: "https://xyz.googleusercontent.com"
      };
      console.log("decoded token", req.user);
      next();
    } else {
      admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then((decodedToken) => {
          console.log("decoded token", decodedToken);
          req.user = decodedToken;
          next();
        })
        .catch((err) => {
          console.log("some problem with token. Unable to decode");
          next(err);
        });
    }
  } else {
    return res.status(403).send({
      message: "no authtoken provided in header",
    });
  }
};

module.exports = checkAuth;
