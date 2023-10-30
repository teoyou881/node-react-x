const express = require("express");
const app = express();
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const cors = require("cors");
const passportConfig = require("./passport");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
passportConfig();
app.use(
    cors({
        origin: "*",
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        savedUninitialized: false,
        resave: false,
        secret: process.env.COOKIE_SECRET,
        cookie: { secure: true },
    }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/post", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
    res.end("hi express");
});

app.listen(3065, () => {
    db.sequelize.sync().then(() => {
        console.log("db is connected");
    });
    console.log("Server is running on http://localhost:3065");
});
