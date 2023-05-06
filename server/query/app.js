const express = require("express");
const bodyParser = require("body-parser");
const { sequelize } = require("./models");
const cors = require("cors");
const morgan = require("morgan");

const corsConfig = {
  credentials: true,
  origin: true,
};

const app = express();
app.use(cors(corsConfig));
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes")(app);

sequelize
  .sync({force:true})
  .then(() => {
    const PORT = process.env.NODE_DOCKER_PORT || 8080;
    app.listen(PORT);
    console.log(`Server started on port ${PORT}`);
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });