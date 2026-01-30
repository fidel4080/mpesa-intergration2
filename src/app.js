const express = require("express");
const cors = require("cors");

const stkRoutes = require("./routes/stkRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", stkRoutes);

module.exports = app;
