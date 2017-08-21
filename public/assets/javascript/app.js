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

        var queryURL = "http://quotes.rest/qod.json?category=" + category;
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
            $("#qoute").prepend(quoteDiv);

            //placeholder display
            //$(".container").prepend(quoteDiv)
        });
    }
});
