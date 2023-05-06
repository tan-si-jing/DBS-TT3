const db = require("../models");
const Claims = db.claim;

module.exports = {
  async index(req, res) {
    try {
      const claims = await Claims.findAll({
        where: {
          EmployeeID: req.body.employeeId,
        },
      });
      res.status(200).send(claims);
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
};