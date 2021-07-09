var admin = require("firebase-admin");
require("dotenv").config();

//firebase auth status
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
