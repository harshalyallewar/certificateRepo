const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("./db/config");
app.use(express.json());
const User = require("./db/users");

app.use(
  cors({
    origin: "*",
  })
);

app.post("/api/signup", async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    if (result) {
      res.send({ result, message: "signed up succesfully", success: true });
    } else {
      res.send({ message: "not added user", success: false });
    }
  } catch {
    res.send({ message: "catched up error", success: false });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    let result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (result) {
      res.send({ result, message: "loged in succesfully", success: true });
    } else {
      res.send({ message: "Email or pass is incorrect", success: false });
    }
  } catch {
    res.send({ message: "something went wrong", success: false });
  }
});

app.get("/api/getData/:id", async (req, res) => {
  try {
    let result = await User.findOne({ _id: req.params.id });
    if (result) {
      res.send({ result, message: "user data is available", success: true });
    } else {
      res.send({ message: "user data is not available", success: false });
    }
  } catch {
    res.send({ message: "something went wrong", success: false });
  }
});

app.put("/api/updateCertificates", async (req, res) => {
  try {
    console.log(req.body.id);
    let user = await User.findOne({ _id: req.body.id });
    user.certificates = req.body.certificates;
    

    if (user) {
      let updatedUser = await User.updateOne(
        {
          _id: req.body.id,
        },
        {
          $set: user,
        }
      );
      if (updatedUser) {
        res.send({updatedUser,user, message: "user got updated", success: true });
      }
    } else {
      res.send({ message: "user does not exist", success: false });
    }
  } catch (e) {
    res.send({ message: "something went wrong", success: false });
  }
});

const PORT = process.env.PORT || 10;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));

  const path = require("path");

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("servber is listening");
});
