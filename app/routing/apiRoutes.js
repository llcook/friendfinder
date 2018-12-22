// LOAD DATA SOURCE
// ====================================================
var friendsData = require("../data/friends");

// ROUTING
// ====================================================

module.exports = function (app) {

    // SHOWS ALL FRIENDS AS JSON
    app.get("/api/friends", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {

        // STORE NEW USER'S DATA INPUT
        var userInput = req.body;

        // PUSH NEW USER'S DATA TO FRIENDS ARRAY
        // (IT SEEMS IF THIS IS PLACED AT THE BOTTOM OF THE .post, IT BREAKS THE $.post IN survey.js)
        friendsData.push(userInput);

        // STORES NEW USER'S DATA IN res.json OBJECT THAT'S REFERENCED IN FRONT-END console.log
        res.json(userInput);

        // LOOP THROUGH NEW USER'S SCORES AND CONVERT TO INTEGERS
        var newUserScores = [];
        for (var i = 0; i < userInput.scores.length; i++) {
            var score = parseInt(userInput.scores[i]);
            newUserScores.push(score);
        }

        userInput.scores = newUserScores;

        // LOOP THROUGH SCORES AND COMPARE FOR COMPATIBILITY MATCH
        var match = {
            name: "",
            photo: "",
            ratingDiff: 1000
        };
        var userScores = userInput.scores;

        // LOOP THROUGH ALL FRIENDS IN friends.js
        // EXCLUDE NEWEST USER VIA -1 AFTER LENGTH

        var diff = 0;

        for (var i = 0; i < friendsData.length - 1; i++) {
            console.log(friendsData[i]);
        
            // COMPARE NEW USER'S SCORES WITH ALL FRIENDS SCORES
            // THEN CALCULATE SMALLEST DIFFERENCE AND DEFINE A MATCH
            var friendScores = friendsData[i].scores;


            for (var x = 0; x < friendScores.length; x++) {
                // LOOP THROUGH STORED FRIENDS AND COMPARE NEW USER'S SCORES
                // CALCULATE DIFFERENCE FOR EACH INDEX IN EACH STORED FRIEND'S SCORES ARRAY
                console.log(Math.abs(userScores[x]) - friendsData[i].scores[x]);
            }
        }

        // Once you've found the current user's most compatible friend, display the result as a modal pop-up.
        // The modal should display both the name and picture of the closest match.
    })

};