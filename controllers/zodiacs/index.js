const express = require("express");

module.exports = models => {
  /**
   * Controller Logic
   */
  const createZodiac = (req, res) =>
    models.zodiacs
      .create({
        name: req.body.name,
        leadMonth: req.body.leadMonth,
        trait: req.body.trait,
        translation: req.body.translation,
        longitude: req.body.longitude
      })
      .then(zodiac => res.status(201).json(zodiac.serialize()))
      .catch(err => {
        if (err.message === "That zodiac already exists") {
          return models.zodiacs
            .get({ name: req.body.name })
            .then(zodiac => res.status(200).json(zodiac.serialize()));
        }
        return res.status(400).send(err.message);
      });

  const listZodiacs = (req, res) =>
    models.zodiacs
      .list()
      .then(zodiacs => zodiacs.map(zodiac => zodiac.serialize()))
      .then(zodiacs => res.status(200).json(zodiacs))
      .catch(err => res.status(400).send(err.message));

  const getZodiacs = (req, res) => {
    return models.zodiacs
      .get({ name: req.params.name })
      .then(zodiacs => res.status(200).json(zodiacs))
      .catch(err => res.status(400).send(err.message));
  };

  const delZodiacs = (req, res) => {
    return models.zodiacs
      .delete({ name: req.params.name })
      .then(zodiacs => res.status(200).json(zodiacs))
      .catch(err => res.status(400).send(err.message));
  };

  const patchZodiacs = (req, res) => {
    return models.zodiacs
      .patch({ name: req.params.name, update: req.body })
      .then(zodiacs => res.status(200).json(zodiacs));
  };
  /**
   * Routes
   */
  const router = express.Router();
  router.post("/", createZodiac);
  router.get("/", listZodiacs);
  router.get("/:name", getZodiacs);
  router.delete("/:name", delZodiacs);
  router.patch("/:name", patchZodiacs);

  return router;
};
