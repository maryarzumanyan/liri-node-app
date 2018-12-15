require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var inquirer = require("inquirer");
var moment = require('moment');

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
            inquirer
            .prompt([
                {
                type: "input",
                message: "artist/band name here",
                name: "artist"
                }
            ])
            .then(function(inquirerResponse) {
                ConcertThis(inquirerResponse.artist);
            })

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
                if(inquirerResponse.song != "")
                {
                    SpotifyThis(inquirerResponse.song);
                }
                else{
                    SpotifyThis("The Sign");
                }
                
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
                if(inquirerResponse.movie != "")
                {
                    IMDB(inquirerResponse.movie);
                }
                else{
                    IMDB("Mr. Nobody");                    
                }
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
                    ConcertThis(value);
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

  function ConcertThis(artist){
 //     request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function(error, response, body) {
      request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=" + keys.bands.app_id, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            for(var index in  JSON.parse(body))
            {
                Log("\nName of the venue: " + JSON.parse(body)[index].venue.name);
                Log("Venue location: " + JSON.parse(body)[index].venue.country + ", " + JSON.parse(body)[index].venue.region + ", " + JSON.parse(body)[index].venue.city);
                Log("Date of the Event: " + moment(JSON.parse(body)[index].datetime).format('M/D/YYYY'));
                
            }
        }
      });

  }


  function SpotifyThis(song){
        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
            
            for(var index in data.tracks.items)
            {
                Log("\nartist(s): " + data.tracks.items[index].artists[0].name);
                Log("song: " + data.tracks.items[index].name);
                Log("preview url: " + data.tracks.items[index].preview_url);
                Log("album: " + data.tracks.items[index].album.name);
            }
            
        });
  }

  function IMDB(movie){
    request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        
        if (!error && response.statusCode === 200) {

          Log("Title of the movie: " + JSON.parse(body).Title);
          Log("Year the movie came out: " + JSON.parse(body).Year);
          Log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
          Log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
          Log("Country where the movie was produced: " + JSON.parse(body).Country);
          Log("Language of the movie: " + JSON.parse(body).Language);
          Log("Plot of the movie: " + JSON.parse(body).Plot);
          Log("Actors in the movie: " + JSON.parse(body).Actors);

        }
      });
  }

  function Log(text){
      console.log(text);
      fs.appendFile("sample.txt", text, function(err) {
        if (err) {
          console.log(err);
        }
      });   

  }