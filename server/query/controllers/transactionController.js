const db = require("../models");
const Claims = db.claim;

module.exports = {
  async create(req, res) {
    try {
      Claims.create({
        ProjectID: req.body.projectID,
        EmployeeID: req.body.employeeID,
        CurrencyID: req.body.currencyID,
        ExpenseDate: req.body.expenseDate,
        Purpose: req.body.purpose,
        Amount: req.body.amount,
        Status: req.body.status,
        ChargeToDefaultDept: req.body.chargeToDefaultDept,
        AlternativeDeptCode: req.body.alternativeDeptCode,
      }).then(function (claims) {
        if (claims) {
          res.status(200).send(claims);
        } else {
          response.status(400).send("Error in insert new record");
        }
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to retrieve data.",
      });
    }
  },
  async edit(req, res) {
    try {
      console.log("===== res", req.body);
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
      }).then(() => {
        res.status(200).send();
      });
    } catch (err) {
      res.status(500).send({
        error: err.message || "An error has occurred trying to cancel claim.",
      });
    }
  },
};
