const config = require("./config");
const services = require("./services")(config);
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const apiRouter = require("./controllers")(models);
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
app.use("/api", apiRouter);
const path = require("path");
app.use(express.static(`${__dirname}/views`));

app.use(express.static("views"));
app.get("/", function(req, res) {
  res.sendFile("/index.html");
});

//app.use()
app.use((err, req, res, next) => {
  if (err.stack) {
    if (err.stack.match("node_modules/body-parser"))
      return res.status(400).send("Invalid JSON");
  }

  services.logger.log(err);
  return res.status(500).send("Internal Error.");
});

app.listen(config.express.port, () => {
  services.logger.log(`Server up and listening on port ${config.express.port}`);
});
