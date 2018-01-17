$(document).ready(function() {
  var $inputSearch = $('#title');
  var $btnSearch = $('#searchBtn');
  $btnSearch.click(searchByTitle);
  function searchByTitle() {
    var movieTitle = $inputSearch.val();
    var url = 'http://www.omdbapi.com/?s=' + movieTitle + '&apikey=3a181f1c';

    $.ajax({
      url: url,
      success: renderMovies,
      error: function() {
        alert('opps');
      }
    });
  }
  function renderMovies(response) {
    console.log(response);
    // var table = $('<table>');
    // table.addClass('table');
    var movies = response.Search;
    var resultsUl = $('#results');
    resultsUl.empty();

    for (var m in movies) {
      var movie = movies[m];
      var title = movie.Title;
      var imdbID = movie.imdbID;
      $.getJSON('http://www.omdbapi.com/?apikey=3a181f1c&t=' + title + '&type=movie', function(data) {
        var keys = Object.keys(data);
        console.log(data);
        var word = data[keys[5]];
        console.log(word);
        var patt = /Family/g;
        result = patt.test(word);
        console.log(result);
        var wordTwo = data[keys[5]];
        console.log(wordTwo);
        var pattTwo = /Animation/g;
        resultTwo = pattTwo.test(wordTwo);
        console.log(resultTwo);
        console.log(data.Poster);
        if (result === true || resultTwo === true) {
          var posterImg = $('<img class="poster-movie" src="' + data.Poster + '" />');
          liMovie = $('<li class="list-group-item">');
          liMovie.append(data.Title);
          liMovie.append(posterImg);
          resultsUl.append(liMovie);
        }
      });
      // var tr = $('<tr>');
      // var td = $('<td>');
      // td.append(movie.Title);
      // tr.append(td);

      // var imgMovie = $('<img class="poster-movie">');
      // imgMovie.attr('src', movie.Poster);
      // td = $('<td>');
      // td.append(imgMovie);
      // tr.append(td);

      // table.append(tr);
    }
    // $('#searchResults').append(table);
  }

  function renderError(error) {
    console.error(error);
  }
});
