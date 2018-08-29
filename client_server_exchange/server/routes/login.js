const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");

const jwtMW = exjwt({
  secret: "4 the lich king"
});

let user = {
  id: 1,
  username: "admin",
  password: "admin"
};

module.exports = (app) => {
  app.post("/login",(req,res) => {
    const {username, password} = req.body;
    if(username ===user.username && password===user.password){
      let token = jwt.sign({id: user.id, username: user.username}, "4 the lich king",{expressIn: 129600});
      res.json({
        success: true,
        err: null,
        token
      });
    }
    else{
      res.status(401).json({
        success: false,
        token: null,
        err: "username or password in incorrect"
      });
    }
  });
};

module.exports = (app) => {
  app.get("/", jwtMW, (req, res) => {
    res.send("You are authenticated");
  });
};

module.exports = (app) => {
  app.use(function(err, req, res, next) {
    if(err.name === "UnauthorizedError"){
      res.status(401).send(err);
    }
    else{
      next(err)
    }
  });
};

