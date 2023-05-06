const db = require("../models");
const Claims = db.claim;

module.exports = {
  async create(req, res) {
    try {
      // const claim = await Claims.findAll({
      //   attributes: ["CurrencyID"],
      // });
      res.status(200).send(claim);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
  async edit(req, res) {
    try {
      await Claims.update(req.body, {
        where: {
          claimID: req.params.id,
        },
      }).then(() => {
        Claims.findByPk(req.params.id).then((claim) => {
          res.status(200).send(claim);
        });
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
  async cancel(req, res) {
    try {
      await Claims.destroy({
        where: {
          claimID: req.params.id,
        },
      });
      res.status(200);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to cancel claim.",
      });
    }
  },
};
