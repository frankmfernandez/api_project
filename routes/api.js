const express = require("express");
//const router = express()
//const knex = require('../index')
//const db = knex.knex

module.exports = models => {
  /**
   * Controller Logic
   */
  const createZodiac = (req, res) =>
    models
      .create({ name: req.body.name })
      .then(zodiacs => res.status(201).json(zodiacs.serialize()))
      .catch(err => res.status(400).send(err.message));

  const listZodiacs = (req, res) =>
    models
      .list()
      .then(zodiacs => zodiacs.map(zodiac => zodiac.serialize()))
      .then(zodiacs => res.status(200).json(zodiacs))
      .catch(err => res.status(400).send(err.message));

  const getZodiacs = (req, res) =>
    models
      .list({ name: req.params.name })
      .then(messages => res.status(200).json(messages))
      .catch(err => res.status(400).send(err.message));

  /**
   * Routes
   */
  const router = express.Router();
  router.post("", createZodiac);
  router.get("", listZodiacs);
  router.get("/:name", getZodiacs);

  return router;
};

//module.exports = router
