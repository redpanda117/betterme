/* 
 Bernard Williams

 */

$(document).ready(function () {

    //When the document has finished loading load the goals using the email address
    //Currently stored in the session.
    //If there is not one the table will be blank.


    var fullName = "";

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDpg00CoaceDDDP8itC8OJ0wYzCJjXPIps",
        authDomain: "abetterme-b30cc.firebaseapp.com",
        databaseURL: "https://abetterme-b30cc.firebaseio.com",
        projectId: "abetterme-b30cc",
        storageBucket: "abetterme-b30cc.appspot.com",
        messagingSenderId: "248549609031"
    };
    firebase.initializeApp(config);

    //google authentication
    var provider = new firebase.auth.GoogleAuthProvider();

    //google sign in if before going to goals page

    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            console.log('Im here');
            // User is signed in.
            //works but need to findout how to redirect when user already login
            //window.location = 'home.html';
            console.log(user.email);
            //=======
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var phoneNumber = user.phoneNumber;
            var providerData = user.providerData;
            sessionStorage.setItem('displayName', displayName);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('emailVerified', emailVerified);
            sessionStorage.setItem('photoURL', photoURL);
            sessionStorage.setItem('uid', uid);
            sessionStorage.setItem('phoneNumber', phoneNumber);
            sessionStorage.setItem('providerData', providerData);

            $("#navbarProfilePic").attr('src', photoURL);

            console.log(photoURL);
            loadGoals();

        } else {
            // User is signed out.
            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // loging the user email
                sessionStorage.setItem('email', user.email);
                console.log(user.email);
                sessionStorage.setItem('displayName', displayName);
                createUser(user.email, user.displayName);
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }
    });


    //  signout event need to find out where this will be place.
    /* $("#goalsButton").on("click", function (event) {
         firebase.auth().signOut().then(function () {
             // Sign-out successful.
             console.log("signout");
         }).catch(function (error) {
             // An error happened.
              console.error('Sign Out Error', error);
         });
     }*/

    //getting quotes from the qoute.rest api
    var inspirationalCategory = [
        "inspire",
        "management",
        "sports",
        "life",
        "funny",
        "love",
        "art",
        "students"
    ];

    pickCategory();

    function pickCategory() {
        randomQuote = inspirationalCategory[Math.floor(Math.random() * inspirationalCategory.length)]
        //console.log(randomQuote);
        displayQoute(randomQuote);
    }

    function displayQoute(category) {

        var queryURL = "https://quotes.rest/qod.json?category=" + category;
        //console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            // Creating a div to hold the Quote
            var quoteDiv = $("<div class='randomQuote'>");
            //adding a bootstrap class to the new div. Help in not needing to use floats in the css
            quoteDiv.addClass("show col-md-6");
            // Storing the quote data
            var quoteData = response.contents.quotes[0].quote;
            var quote = $("<p>").text(quoteData);
            quote.attr("id", "randomQuote");
            //console.log(quoteData);
            //store author data
            var authorData = response.contents.quotes[0].author;
            var author = $("<p>").text("By: " + authorData);
            author.attr("id", "randomAuthor");
            //console.log(authorData);
            //appending it to the div
            quoteDiv.append(quote);
            quoteDiv.append(author);
            //displaying it in the html
            $("#quote").prepend(quoteDiv);

            //placeholder display
            //$(".container").prepend(quoteDiv)
        });
    }
});

function loadGoals() {
    var queryURL = "/user/find"
    console.log("loadGoals userEmail: " + sessionStorage.getItem('email'));
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            email: sessionStorage.getItem('email')
        }
    }).done(function (response) {
        $('#userName').text(sessionStorage.getItem("displayName") + "   ");
        console.log(response);
        populateGoalTable(response);
    });
}

function createUser(email, fullName) {
    var queryURL = "/user/create"
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            email: email,
            fullName: fullName
        }
    }).done(function (response) {
        $('#userName').text(sessionStorage.getItem("displayName") + "   ");
        console.log(response);
        populateGoalTable(response);
    });
}

function deleteGoal(goalID) {
    var queryURL = "/goal/del"
    console.log("Del GoalID: " + goalID);
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            goalID: goalID
        }
    }).done(function (response) {

        loadGoals();
    });
}


function populateGoalTable(res) {

    //Update the add/edit goals modal with the userID of the logged in user.
    $("#goalUserID").attr('value', res[0].userID)

    $("#goalTable").empty();
    //console.log(res[0]);
    var goals = res[0].Goals;

    console.log(goals);
//If there are goals show them.  If not show the message to get started.
    if (goals.length < 1) {
        var $newRow = $('<tr>');
        var $newMessage = $('<td>');
        $newMessage.attr('colspan', "7");
        $newMessage.text("Enter a goal or login to get started!!");
        $newRow.append($newMessage);
        $("#goalTable").append($newRow);
    } else {
        for (var i = 0; i < goals.length; i++) {

            var goal = goals[i];

            var $editButton = $('<i>');
            $editButton.addClass("fa fa-pencil-square-o");
            $editButton.attr('aria-hidden', 'true');
            $editButton.attr('id', goals[i].goalID);
            $editButton.on('click', function () {
                console.log('Edit ID ' + $(this).attr('id'));
                editGoal($(this).attr('id'));
            });

            var $deleteButton = $('<i>');
            $deleteButton.addClass("fa fa-trash-o");
            $deleteButton.attr('aria-hidden', 'true');
            $deleteButton.attr('id', goals[i].goalID);
            $deleteButton.on('click', function () {
                console.log('Delete ID ' + $(this).attr('id'));
                deleteGoal($(this).attr('id'));
            });

            var $newRow = $('<tr>');
            var $newGoalTitle = $('<td>');
            var $newStartDate = $('<td>');
            var $newEndDate = $('<td>');
            var $newDifficulty = $('<td>');
            var $newStatus = $('<td>');
            var $delBtnCell = $('<td>');
            var $editBtnCell = $('<td>');

            $newGoalTitle.text(goal.title);
            $newStartDate.text(goal.startDate);
            $newEndDate.text(goal.endDate);
            $newDifficulty.text(goal.difficulty);
            $newStatus.text(goal.status);

            $delBtnCell.append($deleteButton);
            $editBtnCell.append($editButton);
            $newRow.append($editBtnCell);
            $newRow.append($delBtnCell);
            $newRow.append($newGoalTitle);
            $newRow.append($newStartDate);
            $newRow.append($newEndDate);
            $newRow.append($newDifficulty);
            $newRow.append($newStatus);

            $("#goalTable").append($newRow);
            console.log("add new row")
        }
    }
}


function editGoal(goalID){

}

function addGoal() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/goal/create",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "title": $("#titleInput").val().trim(),
            "startDate": $("#startDateInput").val(),
            "endDate": $("#endDateInput").val(),
            "difficulty": $("difficultySelect").val(),
            "description": $("#descriptionInput").val().trim(),
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
        return (settings.data);
    });
}

$("#submitNewGoal").on("click", function () {
    addGoal();
});

function createNewUser() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "/user/create",
        "method": "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "email": $("#emailInput").val().trim(),
            "DOB": $("#birthdayInput").val().trim(),
            "fullName": $("#nameInput").val().trim(),
        }
    };
    $.ajax(settings).done(function (response) {
        return (settings.data);

//can't get it to close modal on submit


    });

};

$("#createUserSubmit").on("click", function () {

    createNewUser();

});

/**
 * This function increments or decrements the current user score based on the value passed.
 * @param val
 */
function updateUserScore(val) {
    var queryURL = "/user/find"
    console.log("Update User Score userEmail: " + sessionStorage.getItem('email'));
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            email: sessionStorage.getItem('email')
        }
    }).done(function (res) {

        res[0].userScore += val;
        queryURL = "/user/update"
        $.ajax({
            url: queryURL,
            method: "POST",
            data: res[0]
        }).done(function (res) {
            console.log(res);
        });
    });
}


