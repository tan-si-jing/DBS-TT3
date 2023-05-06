const db = require("../models");
const Currency = db.currency;

module.exports = {
  async index(req, res) {
    try {
      let currencies = await Currency.findAll({
        attributes: ['CurrencyID'],
      })

      currencies = currencies.map(x => x["CurrencyID"])

      res.status(200).send(currencies);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
};