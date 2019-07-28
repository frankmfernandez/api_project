const config = require("./config");
const services = require("./services")(config);
const knex = require("knex")(config.db);
const models = require("./models")(knex);
const apiRouter = require("./controllers")(models);
const bodyParser = require("body-parser"); // a middleware plugin to enable express to parse JSON
const express = require("express");
const app = express();
app.use(bodyParser.json({ type: "application/json", limit: "50mb" }));
app.use("/api", apiRouter);
app.use(express.static(`${__dirname}/views`)); // otherwise load the client app

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

//const config = require("./config");

// const services = require("./services")(config);

// const knex = require("knex")(config.db);

//const morgan = require("morgan"); // a popular library for logging your requests

// const express = require("express");

// const app = express();

// 1. log every request when it comes in
// app.use(morgan("dev"));

// 2. Set the headers for incoming requests
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,OPTIONS,PATCH"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, authorization"
//   );
//   next();
// });

// 3. Parse request bodies as json

// 4. If the requests begin with '/api', hand them off to the API router

// 5. Catch unhandled errors thrown by any of the previous middleware steps
// eslint-disable-next-line no-unused-vars
