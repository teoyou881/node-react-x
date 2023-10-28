const express = require("express");
const router = express.Router();
const { User } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res, next) => {
    try {
        await User.findOne({
            where: { email: req.body.email },
        }).then((user) => {
            if (user) {
                return res.status(403).send("Already used email");
            }
        });
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            email: req.body.email,
            nickname: req.body.nickname,
            password: hashedPassword,
        });
        res.status(200).send("ok");
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;
