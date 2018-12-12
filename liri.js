// At the top of the liri.js file, add code to read and set any environment variables with the dotenv package:
require("dotenv").config();
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
        if(inquirerResponse.commands === "spotify-this-song")
        {
            console.log("spotify-this-song");
            inquirer
            .prompt([
                {
                type: "input",
                message: "song name here",
                name: "song"
                }
            ])
            .then(function(inquirerResponse) {
                spotify.search({ type: 'track', query: inquirerResponse.song }, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }

                    for(var index in data.tracks.items)
                    {
                        console.log(data.tracks.items[index].preview_url);
                    }
                     
                });
            })
            
            

        }
    
  });