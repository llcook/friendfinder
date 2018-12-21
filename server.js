// Your `server.js` file should require the basic npm packages we've used in class: `express` and `path`.

// DEPENDENCIES
var express = require("express");
var path = require("path");

// EXPRESS CONFIGURATION
var app = express();
var PORT = process.env.port || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/app/public")));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});