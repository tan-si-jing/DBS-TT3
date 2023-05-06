const db = require("../models");
const Claims = db.claim;

module.exports = {
  async create(req, res) {
    try {
      const claims = await Claims.findAll({
        attributes: ['CurrencyID'],
      });
      res.status(200).send(claims);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
  async edit(req, res) {
    try {
      const claims = await Claims.findAll({
        attributes: ['CurrencyID'],
      });
      res.status(200).send(claims);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
  async cancel(req, res) {
    try {
      const claims = await Claims.findAll({
        attributes: ['CurrencyID'],
      });
      res.status(200).send(claims);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
};