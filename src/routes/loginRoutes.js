const express = require("express");
const router = express.Router();
const passport = require("passport");
const loginUser = require("../controllers/loginController")

router.get("/signup", (req, res) => {
    res.render("signup")
});

router.post("/signup", passport.authenticate("signup", {
    successRedirect: "/signin",
    failureRedirect: "/signin-error",
    passReqToCallback: true
}));

router.get("/signin", (req, res) => {
    res.render("signin")
});

router.post("/signin", passport.authenticate("signin", {
    failureRedirect: "/signin-error",
    passReqToCallback: true
}), loginUser);

router.get("/signin-error", (req, res) => {
    res.render("signin-error")
});

router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/signin")
})

module.exports = router;