const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const SECURITY_KEY = "test";

app.use(bodyParser.json());
app.post("/api/user/login", (req, res) => {
  const { userName, password } = req.body;
  if (userName === "admin" && password === "admin") {
    res.json({
      status: 1,
      msg: "login success",
      token: jwt.sign({ userName }, SECURITY_KEY)
    });
  } else {
    res.json({ status: 2, msg: "login fail" });
  }
});

app.get("/api/user/verify", (req, res) => {
  const token = req.headers.authrization;
  console.log(token);
  jwt.verify(token, SECURITY_KEY, (err, decode) => {
    console.log(err, decode);
    if (err) {
      res.json({
        status: 0,
        data: "token失效了"
      });
    } else {
      res.json({
        status: 1,
        userName: decode.userName,
        token: jwt.sign({ userName: decode.userName }, SECURITY_KEY)
      });
    }
  });
});

app.listen(3000, () => {
  console.log("server 启动成功");
});
