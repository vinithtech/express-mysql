const express = require("express");
var path = require("path");

//body-parser extract the entire body portion of an incoming request stream and exposes it on req.body
const bodyParaser = require("body-parser");

//compressing can greatly decrease the size of the response body.
const compression = require("compression");

//CORS allows AJAX requests to skip the Same-origin policy and access resources from remote hosts.
const cors = require("cors");

//Morgan is used for logging request details.
const morgan = require("morgan");

//Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
const helmet = require("helmet");

const config = require("./config");

// Importing Route Files
const customerRoutes = require("./app/routes/customer");
const userRoutes = require("./app/routes/user");

const app = express();
var http = require("http");
var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || config.port);

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// compress all responses
app.use(compression());

// Body Parser middleware to convert the response format into proper json.
app.use(bodyParaser.urlencoded({ extended: false }));
app.use(bodyParaser.json({ limit: "5mb" }));

//Console Log
app.use(morgan("dev"));

//Routes
app.use(`/customer`, customerRoutes);
app.use(`/user`, userRoutes);

// Error Handling - Returning 404 if Route Not Found.
app.use((req, res, next) => {
  let error = {
    responseCode: "404",
    responseMessage: "Not Found",
    responseData: {}
  };
  next(error);
});

module.exports = app;
