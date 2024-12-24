const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router
  .route("/signup")
  .get(userController.renderSignupForm) //user get signup route
  .post(wrapAsync(userController.signup)); //user post signup route

router
  .route("/login")
  .get(userController.renderLoginForm) //user get login route
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  ); //user post login route

//user get logout route
router.get("/logout", userController.logout);

module.exports = router;
