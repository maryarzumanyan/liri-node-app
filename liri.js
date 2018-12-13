// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");


// Add the code required to import the keys.js file and store it in a variable. You should then be able to access your keys information like so:
var spotify = new Spotify(keys.spotify);

inquirer
  .prompt([
    {
      type: "list",
      message: "Choose a command",
      choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
      name: "commands"
    }
  ])
  .then(function(inquirerResponse) {
        if(inquirerResponse.commands === "concert-this")
        {

        }

        else if(inquirerResponse.commands === "spotify-this-song")
        {
            inquirer
            .prompt([
                {
                type: "input",
                message: "song name here",
                name: "song"
                }
            ])
            .then(function(inquirerResponse) {
                SpotifyThis(inquirerResponse.song);
            })
        }

        else if(inquirerResponse.commands === "movie-this")
        {
            inquirer
            .prompt([
                {
                type: "input",
                message: "movie name here",
                name: "movie"
                }
            ])
            .then(function(inquirerResponse) {
                IMDB(inquirerResponse.movie);
            })
        }

        else if(inquirerResponse.commands === "do-what-it-says"){
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
                var dataArr = data.split(",");
                var value = dataArr[1].slice(1, -1);
                if(dataArr[0] === "concert-this")
                {

                }
                else if(dataArr[0] === "spotify-this-song")
                {
                    SpotifyThis(value);  
                }
                else if(dataArr[0] === "movie-this")
                {
                    IMDB(value);
                }
              
              });
        }
    
  });



  function SpotifyThis(song){
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }

            for(var index in data.tracks.items)
            {
                console.log("\nartist(s): " + data.tracks.items[index].artists[0].name);
                console.log("\nsong: " + data.tracks.items[index].name);
                console.log("\npreview url: " + data.tracks.items[index].preview_url);
                console.log("\nalbum: " + data.tracks.items[index].album.name);
            }
            
        });
  }

  function IMDB(movie){
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
          console.log("Title of the movie: " + JSON.parse(body).Title);
          console.log("Year the movie came out: " + JSON.parse(body).Year);
          console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
          console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
          console.log("Country where the movie was produced: " + JSON.parse(body).Country);
          console.log("Language of the movie: " + JSON.parse(body).Language);
          console.log("Plot of the movie: " + JSON.parse(body).Plot);
          console.log("Actors in the movie: " + JSON.parse(body).Actors);

        }
      });
  }