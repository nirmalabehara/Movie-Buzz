$(document).ready(function() {

  var apiBaseURL = 'https://api.themoviedb.org/3/';
  var apiKey = "2ec56988da89f63a91431a311d329aa7"

  var imageBaseUrl = 'https://image.tmdb.org/t/p/';

  const nowPlayingURL = apiBaseURL + 'movie/now_playing?api_key=' + apiKey;

  function getNowPlayingData() {
    $.getJSON(nowPlayingURL, function(nowPlayingData) {
      for (let i = 0; i < nowPlayingData.results.length; i++) {
        var dataRes = nowPlayingData.results[i].id;
        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey) {
          var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;

          var title = nowPlayingData.results[i].original_title;

          var releaseDate = nowPlayingData.results[i].release_date;

          var overview = nowPlayingData.results[i].overview;

          var voteAverage = nowPlayingData.results[i].vote_average;

          var youtubeKey = movieKey.results[0].key;

          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          var nowPlayingHTML = '';
          nowPlayingHTML += '<div class="col-sm-3 eachMovie">';
          nowPlayingHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          nowPlayingHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          nowPlayingHTML += '<div class="modal-dialog" role="document">';
          nowPlayingHTML += '<div class="modal-content col-sm-12">';
          nowPlayingHTML += '<div class="col-sm-6 moviePosterInModal">';
          nowPlayingHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          nowPlayingHTML += '</div><br>'; //close trailerLink
          nowPlayingHTML += '<div class="col-sm-6 movieDetails">';
          nowPlayingHTML += '<div class="movieName">' + title + '</div><br>';
          nowPlayingHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          nowPlayingHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          nowPlayingHTML += '<div class="overview">' + overview + '</div><br>';
          nowPlayingHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          nowPlayingHTML += '</div>'; 
          nowPlayingHTML += '</div>'; 
          nowPlayingHTML += '</div>'; 
          nowPlayingHTML += '</div>'; 
          nowPlayingHTML += '</div>'; 
          $('#movie-grid').append(nowPlayingHTML);
          $('#movieGenreLabel').html("Now Playing");
        })
      }
    })
  }

  getNowPlayingData();

  function getMoviesByGenre(genre_id) {
    const getMoviesByGenreURL = apiBaseURL + 'genre/' + genre_id + '/movies?api_key=' + apiKey + '&language=en-US&include_adult=false&sort_by=created_at.asc';

    $.getJSON(getMoviesByGenreURL, function(genreData) {
      for (let i = 0; i < genreData.results.length; i++) {
        var dataRes = genreData.results[i].id;
        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey) {
          var poster = imageBaseUrl + 'w300' + genreData.results[i].poster_path;
          var title = genreData.results[i].original_title;
          var releaseDate = genreData.results[i].release_date;
          var overview = genreData.results[i].overview;
          var voteAverage = genreData.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          var genreHTML = '';
          genreHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
          genreHTML += '<button type="button" class="btnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          genreHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          genreHTML += '<div class="modal-dialog" role="document">';
          genreHTML += '<div class="modal-content col-sm-12 col-lg-12">';
          genreHTML += '<div class="col-sm-6 moviePosterInModal">';
          genreHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          genreHTML += '</div><br>'; //close trailerLink
          genreHTML += '<div class="col-sm-6 movieDetails">';
          genreHTML += '<div class="movieName">' + title + '</div><br>';
          genreHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          genreHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          genreHTML += '<div class="overview">' + overview + '</div><br>';
          genreHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          genreHTML += '</div>'; 
          genreHTML += '</div>'; 
          genreHTML += '</div>'; 
          genreHTML += '</div>'; 
          genreHTML += '</div>'; 
          $('#genre-grid').append(genreHTML);
        })
      }
    })
  }

    $('#action').click(function() {
    getMoviesByGenre(28);
    $('#movieGenreLabel').html("Action");
  });
  $('#adventure').click(function() {
    getMoviesByGenre(12);
    $('#movieGenreLabel').html("Adventure");
  });
  $('#animation').click(function() {
    getMoviesByGenre(16);
    $('#movieGenreLabel').html("Animation");
  });
  $('#comedy').click(function() {
    getMoviesByGenre(35);
    $('#movieGenreLabel').html("Comedy");
  });
  $('#drama').click(function() {
    getMoviesByGenre(18);
    $('#movieGenreLabel').html("Drama");
  });
  $('#family').click(function() {
    getMoviesByGenre(10751);
    $('#movieGenreLabel').html("Family");
  });
  $('#fantasy').click(function() {
    getMoviesByGenre(14);
    $('#movieGenreLabel').html("Fantasy");
  });
  $('#horror').click(function() {
    getMoviesByGenre(27);
    $('#genre-grid').html(genreHTML);
    $('#movieGenreLabel').html("Horror");
  });
  $('#music').click(function() {
    getMoviesByGenre(10402);
    $('#movieGenreLabel').html("Music");
  });
  $('#romance').click(function() {
    getMoviesByGenre(10749);
    $('#movieGenreLabel').html("Romance");
  });
  $('#scifi').click(function() {
    getMoviesByGenre(878);
    $('#movieGenreLabel').html("Science Fiction");
  });
  $('#thriller').click(function() {
    getMoviesByGenre(53);
    $('#movieGenreLabel').html("Thriller");
  });


  // Search Function
  var searchTerm = '';
  searchMovies();
  $('.searchForm').submit(function(event) {
    $('#search-grid').html('');
    event.preventDefault();
    searchTerm = $('#searchMovieNeWindowxfxInput').val();
    searchMovies();
  });

  function searchMovies() {
    const searchMovieURL = apiBaseURL + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=' + searchTerm;
    $.getJSON(searchMovieURL, function(movieSearchResults) {
      for (let i = 0; i < movieSearchResults.results.length; i++) {
        var dataRes = movieSearchResults.results[i].id;
        var thisMovieUrl = apiBaseURL + 'movie/' + dataRes + '/videos?api_key=' + apiKey;

        $.getJSON(thisMovieUrl, function(movieKey) {
          console.log(movieKey)
          var poster = imageBaseUrl + 'w300' + movieSearchResults.results[i].poster_path;
          var title = movieSearchResults.results[i].original_title;
          var releaseDate = movieSearchResults.results[i].release_date;
          var overview = movieSearchResults.results[i].overview;
          var voteAverage = movieSearchResults.results[i].vote_average;
          var youtubeKey = movieKey.results[0].key;
          var youtubeLink = 'https://www.youtube.com/watch?v=' + youtubeKey;
          var searchResultsHTML = '';
          searchResultsHTML += '<div class="col-sm-3 col-md-3 col-lg-3 eachMovie">';
          searchResultsHTML += '<button type="button" class="searchbtnModal" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '">' + '<img src="' + poster + '"></button>';
          searchResultsHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">';
          searchResultsHTML += '<div class="modal-dialog" role="document">';
          searchResultsHTML += '<div class="modal-content col-sm-12 col-lg-12">';
          searchResultsHTML += '<div class="col-sm-6 moviePosterInModal" style="vertical-align: middle;">';
          searchResultsHTML += '<a href="' + youtubeLink + '"><img src="' + poster + '"></a>';
          searchResultsHTML += '</div><br>';
          searchResultsHTML += '<div class="col-sm-6 movieDetails">';
          searchResultsHTML += '<div class="movieName">' + title + '</div><br>';
          searchResultsHTML += '<div class="linkToTrailer"><a href="' + youtubeLink + '"><span class="glyphicon glyphicon-play"></span>&nbspPlay trailer</a>' + '</div><br>';
          searchResultsHTML += '<div class="release">Release Date: ' + releaseDate + '</div><br>';
          searchResultsHTML += '<div class="overview">' + overview + '</div><br>';
          searchResultsHTML += '<div class="rating">Rating: ' + voteAverage + '/10</div><br>';
          searchResultsHTML += '</div>'; 
          searchResultsHTML += '</div>'; 
          searchResultsHTML += '</div>'; 
          searchResultsHTML += '</div>';
          $('#search-grid').append(searchResultsHTML);
          $('#searchLabel').html('"' + searchTerm + '"');
        })
      }
    })
  }
});
