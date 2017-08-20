/* 
 Bernard Williams

 */

$(document).ready(function () {

//Insert code to do Firebase

    
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
        }).done(function(response) {
            // Creating a div to hold the Quote
            var quoteDiv = $("<div class='quote'>");
            // Storing the quote data
            var quoteData = response.contents.quotes[0].quote;
            var quote = $("<p>").text(quoteData);
           // console.log(quoteData);
            //appending it to the div 
            quoteDiv.append(quote);
            //displaying it in the html   
            //$("#qoute").prepend(quoteDiv);
            
            //placeholder display
            $(".container").prepend(quoteDiv)
        });
    }
});

