var cheerio = require("cheerio");

var request = require("request");

//telling the console what the app is doing
console.log("\n***********************************\n" +
            "Grabbing every article headline, summary, and link\n" +
            "from the LA Times:" +
            "\n***********************************\n");

//making a request from LA Times to scrape the necessary information from the site

request ("http://www.latimes.com/local/lanow/#nt=taxonomy-article", function(err, response, html) {
    
    //loads the HTML and saves it into cheerio as a variable 
    //'$' becomes the symbol for cheerio's shorthand commands  
    var $ = cheerio.load(html);

    //saves the data that we scrape into an empty array 
    var results = [];

    //with cheerio we are looking for p-tag elements with the "title" class
    $("h5").each(function(i, element) {

        //saves the text of the element into a "title" variable 
        var title = $(element).text();


        //var summary = $(element).text()

        //in the selected element we are looking for children attributes such as a-tags and storing them in the "link" variable
        var link = $(element).children().attr("href");

        results.push({
            title: title,
            link: link
        });
    });

    console.log(results);
});