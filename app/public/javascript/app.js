var addFriend;

$("#submit").on("click", function(event) {
    event.preventDefault();
    addFriend = {
        name: $("#name").val().trim(),
        photo: $("#photo").val().trim(),
        scores: [
            $("#1").val(),
            $("#2").val(),
            $("#3").val(),
            $("#4").val(),
            $("#5").val(),
            $("#6").val(),
            $("#7").val(),
            $("#8").val(),
            $("#9").val(),
            $("#10").val(),
        ]
    };
    console.log(addFriend);
})