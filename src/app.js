const express = require("express");
const cors = require("cors");
const path = require("path");

const stkRoutes = require("./routes/stkRoutes");

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/v1", stkRoutes);

module.exports = app;
