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

// Importing Route Files
const customerRoutes = require("./app/routes/customer");

const app = express();
var http = require("http");
var httpServer = http.createServer(app);
httpServer.listen(process.env.PORT || 3000);

const mysql = require("mysql");
// connection configurations
const mc = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "aadhar"
});

// connect to database
mc.connect();

//Helmet helps you secure your Express apps by setting various HTTP headers.
app.use(helmet());

// compress all responses
app.use(compression());

// Body Parser middleware to convert the response format into proper json.
app.use(bodyParaser.urlencoded({ extended: false }));
app.use(bodyParaser.json({ limit: "5mb" }));

//Allow Easy Day, PayU and Distance
// var whitelist = [
//   "https://cs.bigbazaarstore.com",
//   "https://test.shop.bigbazaar.com",
//   "http://shop.bigbazaar.com.s3-website.ap-south-1.amazonaws.com",
//   "http://localhost:8000",
//   "https://cs-staging.bigbazaarstore.com",
//   config.EASY_DAY,
//   config.PAYU_DOMAIN
// ];
// var corsOptionsDelegate = function (req, callback) {
//   var patt = new RegExp("/distance/");
//   var corsOptions;
//   if (patt.test(req.url)) {
//     corsOptions = { origin: true };
//   } else {
//     if (whitelist.indexOf(req.header("Origin")) !== -1) {
//       corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//     } else {
//       corsOptions = { origin: false }; // disable CORS for this request
//     }
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// // CORS Plugin
// app.use(cors(corsOptionsDelegate));

//Console Log
app.use(morgan("dev"));

//Routes
app.use(`/customer`, customerRoutes);

// Error Handling - Returning 404 if Route Not Found.
app.use((req, res, next) => {
  let error = {
    responseCode: "404",
    responseMessage: "Not Found",
    responseData: {}
  };
  next(error);
});

// app.use((err, req, res, next) => {
//   // only providing error in development or production
//   if (
//     process.env.NODE_ENV == config.DEVELOPMENT ||
//     process.env.NODE_ENV == config.PRODUCTION
//   ) {
//     res.locals.message = err.message;
//     res.locals.error = err;
//     if (err.responseCode == constant.DATA_NOT_FOUND) {
//       res.render("error", { easyday: config.EASY_DAY });
//     }
//   }
// });

module.exports = app;

// const express = require("express"),
//   app = express(),
//   bodyParser = require("body-parser");
// port = process.env.PORT || 3000;

// const mysql = require("mysql");
// // connection configurations
// const mc = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "aadhar"
// });

// // connect to database
// mc.connect();

// app.listen(port);

// console.log("API server started on: " + port);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// var routes = require("./app/routes/approutes"); //importing route
// routes(app); //register the route
