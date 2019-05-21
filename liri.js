require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
  bandsintown(value);
  break;
  case "spotify-this-song":
  spotifyInfo(value);
  break;
  case "movie-this":
  movieInfo(value);
  break;
  case "do-what-it-says":
  //randomInfo(value);
  break;
}

//BandsinTownAPI
var artist = "Thomas Rhett";
function bandsintown(value) {
  var axios = require('axios');
  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
     function(response) {
      if (action === 'concert-this') {
        console.log(response)
      }
      }
)
}

//Spotify API
var findSpotify;
function spotifyInfo(value) {
//creating default to "The sign" by ace of base 
    if(value === undefined) {
      findSpotify = "The Sign Ace of Base";
    } else {
      findSpotify = value;
    }
};
//displaying everything onto the console
  spotify.search({ type: 'track', query: findSpotify }) 
    .then(function(response) {
      if(action === 'spotify-this-song') 
        console.log("Artist: " + response.tracks.items[0].artists[0].name);
        console.log("Song: " + response.tracks.items[0].name);
        console.log("Preview: " + response.tracks.items[3].preview_url);
        console.log("Album: " + response.tracks.items[0].album.name);
     })
      .catch(function(err) {
       console.log(err);
      });

//OMDB api 
var findMovie;
function movieInfo(value) {
//creating default movie to Mr Nobody
    if(value === undefined) {
      findMovie = "Mr Nobody";
    } else {
      findMovie = value;
    }
};
  var axios = require('axios')
    axios.get("http://www.omdbapi.com/?t=" + findMovie + "&y=&plot=short&apikey=trilogy").then(
   
   function(response) {
    if(action === 'movie-this') {
     console.log("Title: " + response.data.Title);
     console.log("Year: " + response.data.Year);
     console.log("IMDB Rating: " + response.data.imdbRating);
     console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
     console.log("Country: " + response.data.Country);
     console.log("Language: " + response.data.Language);
     console.log("Plot: " + response.data.Plot);
     console.log("Actors: " + response.data.Actors);
   } 
  }
 );


