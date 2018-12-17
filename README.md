LIRI Bot

It's a console log application, which allows user to search for songs, concerts or movies, using Band In Town, Spotify and IMDB public services.
To be able to use this app user will need to create their own *.env* file with key values in the following format:
```
# Spotify API keys
SPOTIFY_ID=
SPOTIFY_SECRET=

# Bands API key
BANDS_APP_ID=
```

When the application starts it prompts user to select one of the four following options: 
1. concert-this
2. spotify-this-song
3. movie-this
4. do-what-it-says

Based on the content of *random.txt* file the **do-what-it-says** option will call one of the abovementioned three functions (1, 2, 3).

After the user picks concert-this, spotify-this-song or movie-this the app will prompt for the artist/band, song or movie name to search for. As a result user will get some request specific results.

If no name is provided by the user, app will search for some default content as listed below:
1. Song - "The Sign" by Ace of Base;
2. Movie - "Mr. Nobody."
