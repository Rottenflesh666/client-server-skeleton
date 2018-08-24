const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const schema = new mongoose.Schema({
  login: "string",
  password: "string"
});
const user =  mongoose.model("user", schema);

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {

  mongoose.connect("mongodb://localhost/users")
    .then(() => console.log("mongoDB connected"))
    .catch(e => console.log(e));

  app.use(express.static(path.join(__dirname, "client/build")));

  app.post("/db", function(req, res) {
    console.log("ok");
    user.findOne({
      login: req.body.login,
      password: req.body.password
    },function(err, docs) {
      if(docs !== null) {
        res.json({
          body: docs,
          status: 200
        });
      }else {
        res.json({
          body: "null",
          status: 404
        })
      }
    });
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
app.listen(port, () => console.log("listening on port " + port));
