/* 
 Bernard Williams

 */

$(document).ready(function () {


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
    $("#goalsButton").on("click", function (event) {
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
<<<<<<< HEAD
                // User is signed in.
                //works but need to findout how to redirect when user already login
                //window.location = 'home.html';
                console.log(user.email);
=======
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

                console.log(photoURL);
                loadGoals(email);

>>>>>>> 448e858a86d655d9e45cd8e612b6458dfdaae178
            } else {
                // User is signed out. 
                firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    // loging the user email
                    console.log(user.email);
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

    })

    /* signout event need to find out where this will be place.                    
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("signout");
        }).catch(function (error) {
            // An error happened.
             console.error('Sign Out Error', error);
        });
         */


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


function loadGoals(userEmail) {
    var queryURL = "/user/find"
console.log("loadGoals userEmail: " + userEmail)
    $.ajax({
        url: queryURL,
        method: "POST",
        data: {
            email: userEmail
        }
    }).done(function (response) {

        console.log(response);
    });


}