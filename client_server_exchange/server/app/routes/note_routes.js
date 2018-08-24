module.exports = (app, db) => {
  app.get("/", (req, res) => {
    res.send("Fresh memes for soul");
  });
};
