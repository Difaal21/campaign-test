const express = require('express');
const app = express();
const config = require("../config");
const cors = require("cors");
const routes = require("../routes");

config.init();
app.use(cors());
app.use(express.urlencoded({ extended: false, }));
app.use(express.json());
routes.init(app);

module.exports = app;