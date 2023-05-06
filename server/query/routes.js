const dashboardController = require("./controllers/dashboardController");
const transactionController = require("./controllers/claimController");

module.exports = function(app) {
    app.get("/api/dashboard", isLoggedIn, dashboardController.index);
    app.post("/api/claim", isLoggedIn, transactionController.create);
    app.put("/api/claim/:id", isLoggedIn, transactionController.edit);
    app.delete("/api/claim/:id", isLoggedIn, transactionController.cancel);
    app.get('/api/currencies', isLoggedIn, currencyController)
}