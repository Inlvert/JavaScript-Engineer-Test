const express = require("express");
const router = require("./routers");
const cors = require("cors");
const basicErrorHendler = require("./middlewares/errors/basic")

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static("public"));
app.use(basicErrorHendler)

module.exports = app;
