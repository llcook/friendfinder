// LOAD DATA SOURCE
// ====================================================
var friendsData = require("../data/friends");

// ROUTING
// ====================================================

// Your `apiRoutes.js` file should contain two routes:

//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

module.exports = function(app) {

    // Handles when users "visit" a page

    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        console.log(req.body);
        friendsData.push(req.body);
        res.json(true);
    })

};