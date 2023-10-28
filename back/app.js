const express = require("express");
const app = express();
const postRouter = require("./routes/post");
const userRouter = require("./routes/user");
const db = require("./models");
const cors = require("cors");

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
