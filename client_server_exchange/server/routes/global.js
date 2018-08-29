const path = require("path");
//global elite

module.exports = (app) => {
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../../client/build", "index.html"));
  });
};
