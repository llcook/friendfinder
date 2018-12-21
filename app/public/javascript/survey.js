var surveyKey = [
    "1. Your mind is always buzzing with unexplored ideas and plans.",
    "2. Generally speaking, you rely more on your experience than your imagination.",
    "3. You find it easy to stay relaxed and focused even when there is some pressure.",
    "4. You rarely do something just out of sheer curiosity.",
    "5. People can rarely upset you.",
    "6. It is often difficult for you to relate to other people's feelings.",
    "7. In a discussion, truth should be more important than people's sensitivities.",
    "8. You rarely get carried away by fantasies and ideas.",
    "9. You think that everyone's views should be respected regardless of whether they are supported by facts or not.",
    "10. You feel more energetic after spending time with a group of people."
];

function showSurvey() {

    // SHOW FRIEND INFO QUESTIONS
    var friendInfo = $("<div class='form-group'><label for='name'>Name (Required)</label><input type='text' class='form-control' id='name' required></input><label for='photoUrl'>Link to Photo Image (Required)</label><input type='url' class='form-control' id='photoUrl' required></input></div>");

    $("#survey").append(friendInfo);

    // SHOW QUESTIONS
    for (var i = 0; i < surveyKey.length; i++) {

        var p = $("<p>");

        // <option value='0'></option>

        var dropDown = $("<select class='form-control form-control-sm' id='answer" + [i] + "'><option value='1'>1 (strongly disagree)</option><option value='2'>2</option><option value='3'>3</option><option value='4'>4</option><option value='5'>5 (strongly agree)</option></select>");

        console.log

        p.text(surveyKey[i]).attr("id", [i]);
        $("#survey").append(p, dropDown);
    }

    // CREATE SUBMIT BUTTON
    var submitBtn = $("<button type='submit' class='btn btn-primary' id='submit'>Submit</button>");
    $("#survey").append(submitBtn);

    // PUT SUBMIT BUTTON TO USE AND PULL DATA ON NEW FRIEND

    submit();
}

showSurvey();

function submit() {

    $("#submit").on("click", function (event) {
        event.preventDefault();

        // STORE ANSWERS
        var answers = [];

        for (var i = 0; i < 10; i++) {
            var optionSelect = "#answer" + [i];
            var score = $(optionSelect).val();
            answers.push(parseInt(score));
        }

        console.log(answers);

        // STORE USER DATA IN OBJECT
        var friendData = {
            name: $("#name").val(),
            photo: $("#photoUrl").val(),
            scores: answers
        };

        console.log(friendData);

        $.post("/api/friends", friendData)
        .then(function(data) {
            console.log("New friend added: " + data);
        });

    });

};