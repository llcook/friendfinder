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

    // ADDS NEW USER TO FRIENDS JSON AND CALCULATES THEIR BEST MATCH
    app.post("/api/friends", function (req, res) {

        // STORE NEW USER'S DATA INPUT
        var userInput = req.body;

        // PUSH NEW USER'S DATA TO FRIENDS ARRAY
        // (IT SEEMS IF THIS IS PLACED AT THE BOTTOM OF THE .post, IT BREAKS THE $.post IN survey.js)
        friendsData.push(userInput);

        // LOOP THROUGH NEW USER'S SCORES AND CONVERT TO INTEGERS
        var newUserScores = [];
        for (var i = 0; i < userInput.scores.length; i++) {
            var score = parseInt(userInput.scores[i]);
            newUserScores.push(score);
        }

        userInput.scores = newUserScores;

        // FUNCTIONALITY TO COMPARE NEW USER WITH STORED USER SCORES

        var totals = [];
        var userScores = userInput.scores;

        // LOOP THROUGH STORED FRIENDS SCORES
        for (var i = 0; i < friendsData.length - 1; i++) {
            var total = 0;
            scores = friendsData[i].scores;

            // CALCULATE DIFFERENCE BETWEEN NEW USER'S SCORES AND EACH STORED FRIEND'S SCORES
            for (var x = 0; x < scores.length; x++) {
                var diff = Math.abs(userScores[x] - friendsData[i].scores[x]);
                total += diff;
            }

            // PUSHES THE CALCULATED DIFFERENCES INTO AN ARRAY
            totals.push(total);
        }

        // STORES THE LOWEST VALUE IN THE ARRAY AND FINDS A MATCH
        // VIA https://github.com/braydenc303

        var min = Math.min.apply(null, totals);
        var index = totals.indexOf(min);
        var match = friendsData[index];

        /////////////////////////////////////

        // STORES THE MATCH, WHICH IS DISPLAYED VIA MODAL ON FRONT END
        res.json(match);

        console.log("new user added: " + userInput.name + " " + userInput.scores);
        console.log("your match is " + match.name);
        console.log("match info: " + match.name + " " + match.scores);
    });

};