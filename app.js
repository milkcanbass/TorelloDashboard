const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashBoard");
const calendarRouter = require("./routes/calendar");
const fileRouter = require("./routes/file");
const path = require("path");

const { json, urlencoded } = express;

const app = express();
require("./database");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/user", userRouter);
app.use("/dashboards", dashboardRouter);
app.use("/calendar", calendarRouter);
app.use("/file", fileRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // serve the static react app
  app.get("*", (req, res) => {
    // don't serve api routes to react app
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });
  console.log("Serving React App...");
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
