const express = require("express");

const router = express.Router();

const zodiacRouter = require("./zodiacs");

module.exports = models => {
  router.use("/zodiacs", zodiacRouter(models));

  return router;
};
