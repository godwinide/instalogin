const router = require("express").Router();
const User = require("../model/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const path = require("path");

router.get("/signin", (req, res) => {
    try {
        return res.render("signin", { pageTitle: "Login" });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/signin');
});


router.get("/signup", (req, res) => {
    try {
        return res.render("signup", { pageTitle: "Signup" });
    } catch (err) {
        return res.redirect("/");
    }
});

router.post('/signup', async (req, res) => {
    try {
        const {
            username,
            password
        } = req.body;
        console.log(req.body)
        const userIP = req.ip;
        const user1 = await User.findOne({ username });
        if (user1) {
            return res.render("signup", { ...req.body, error_msg: "A User with that email or username already exists", pageTitle: "Signup" });
        } else {
            if (!username || !password) {
                return res.render("signup", { ...req.body, error_msg: "Please fill all fields", pageTitle: "Signup" });
            } else {
                const newUser = {
                    username,
                    password
                };
                const salt = await bcrypt.genSalt();
                const hash = await bcrypt.hash(password, salt);
                newUser.password = hash;
                const _newUser = new User(newUser);
                await _newUser.save();
                req.flash("success_msg", "Register success, you can now login");
                return res.redirect("/signin");
            }
        }
    } catch (err) {
        console.log(err)
    }
})



module.exports = router;