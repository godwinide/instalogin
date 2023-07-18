const router = require("express").Router();
const User = require("../../model/User");
const { ensureAdmin } = require("../../config/auth");
const bcrypt = require("bcryptjs/dist/bcrypt");
const Victims = require("../../model/Victims");

router.get("/", ensureAdmin, async (req, res) => {
    try {
        const customers = await Victims.find({});
        return res.render("admin/index", { layout: "admin/layout", pageTitle: "Welcome", customers, req });
    }
    catch (err) {
        return res.redirect("/admin");
    }
});

router.get("/change-password", ensureAdmin, async (req, res) => {
    try {
        return res.render("admin/changePassword", { layout: "admin/layout", pageTitle: "Change Password", req });
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
})

router.post("/change-password", ensureAdmin, async (req, res) => {
    try {
        const { password, password2 } = req.body;
        console.log(req.body);
        if (!password || !password2) {
            req.flash("error_msg", "Please provide fill all fields");
            return res.redirect("/admin/change-password");
        }
        else if (password !== password2) {
            req.flash("error_msg", "Both passwords must be same");
            return res.redirect("/admin/change-password");
        }
        else if (password.length < 6) {
            req.flash("error_msg", "Password too short")
            return res.redirect("/admin/change-password");
        } else {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(password2, salt);
            await User.updateOne({ _id: req.user.id }, {
                password: hash
            });
            req.flash("success_msg", "password updated successfully");
            return res.redirect("/admin/change-password");
        }

    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    }
})

module.exports = router;