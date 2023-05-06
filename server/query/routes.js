const { TokenExpiredError, verify } = require("jsonwebtoken");
const { jwtSecret } = require("./config/authConfig");
const dashboardController = require("./controllers/dashboardController");
const transactionController = require("./controllers/transactionController");
const currencyController = require("./controllers/currencyController");

module.exports = function (app) {
  app.get("/api/dashboard", isLoggedIn, dashboardController.index);
  app.post("/api/claim", isLoggedIn, transactionController.create);
  app.put("/api/claim/:id", isLoggedIn, transactionController.edit);
  app.delete("/api/claim/:id", isLoggedIn, transactionController.cancel);
  app.get("/api/currencies", currencyController.index);

  function isLoggedIn(req, res, next) {
    let token = req.headers["x-access-token"];

    if (!token) {
      return res.status(401).send({ message: "Login Required." });
    }

    verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          return res
            .status(401)
            .send({ message: "Token has expired. Please log in again." });
        }
        return res.status(401).send({
          message: "An error occured. Please try again. Error: " + err,
        });
      }
      req.body.params.id = decoded.id;
      next();
    });
  }
};
