const express = require("express");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const { check, validationResult } = require("express-validator");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

const auctionsRouter = require("./api/v1/routes/auctions");
const offersRouter = require("./api/v1/routes/offers");

app.get("/", (req, res) => {
  res.send("<h1>Server side :)</h1>");
});
app.use("/api/v1/auction", auctionsRouter);
app.use("/api/v1/offer", offersRouter);

app.listen(port, () => console.info(`App listening on port ${port}`));
