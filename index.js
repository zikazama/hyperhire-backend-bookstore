require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
const YAML = require("yaml");
const bodyParser = require("body-parser");
const sequelize = require("./src/config/database");
const RootController = require("./src/controllers/RootController");
const UserController = require("./src/controllers/UserController");
const BookController = require("./src/controllers/BookController");
const OrderController = require("./src/controllers/OrderController");
const ProfileController = require("./src/controllers/ProfileController");
const verifyToken = require("./src/middlewares/auth");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const file = fs.readFileSync("./swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/", RootController);
app.use("/api", UserController);
app.use("/api", BookController);
app.use("/api", OrderController);
app.use("/api", ProfileController);

app.post("/api/book", verifyToken, (req, res) => {
  res.json({ message: "Protected route accessed successfully" });
});

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("Error syncing database:", err));

module.exports = app;
