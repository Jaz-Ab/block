$(document).ready(function() {
  var allList = [];
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
    $inputSearch.val('');
  }
  function renderMovies(response) {
    console.log(response);
    var movies = response.Search;
    var resultsUl = $('#results');
    var informationUl = $('#info');
    resultsUl.empty();

    for (var m in movies) {
      var movie = movies[m];
      var title = movie.Title;
      var imdbID = movie.imdbID;
      $.getJSON('http://www.omdbapi.com/?apikey=3a181f1c&t=' + title + '&type=movie', function(data) {
        var keys = Object.keys(data);
        var word = data[keys[5]];
        console.log(data);
        //  identificando palabra "Family"
        var patt = /Family/g;
        var result = patt.test(word);
        console.log(result);
        var wordTwo = data[keys[5]];
        console.log(wordTwo);
        //  identificando palabra "Animation"
        var pattTwo = /Animation/g;
        var resultTwo = pattTwo.test(wordTwo);
        console.log(resultTwo);
        if (result === true || resultTwo === true) {
          var posterImg = $('<img class="poster-movie" src="' + data.Poster + '" />');
          var liMovie = $('<li class="list-group-item">');
          
          liMovie.append(data.Title);
          liMovie.append(posterImg);
          resultsUl.append(liMovie);
          allList.push(data);
          $('#prod2').on('click', function(event) {
            var production = $('#prod2').val();
            if (event.target.checked) {
              resultsUl.hide();
              findProduction(production);
            } else {
              resultsUl.show();
            }
          });
        }
        //  habilitando checkboxs
        //  Disney
        $('#prod1').on('click', function(event) {
          var production = $('#prod1').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //  DreamWorks

        //  Cartoon
        $('#prod3').on('click', function(event) {
          var production = $('#prod3').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //  Universal
        $('#prod4').on('click', function(event) {
          var production = $('#prod4').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //  Pixar
        $('#prod5').on('click', function(event) {
          var production = $('#prod5').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //  Warner
        $('#prod6').on('click', function(event) {
          var production = $('#prod6').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //  ilumination
        $('#prod7').on('click', function(event) {
          var production = $('#prod7').val();
          if (event.target.checked) {
            findProduction(production);
          }
        });
        //   funcion para reconocer las productoras
        function findProduction(nameProduction) {
          for (var i = 0; i < allList.length; i++) {
            var production = allList[i].Production;
            console.log(production);
            var regex = new RegExp(nameProduction, 'g');
            var result = regex.test(production);
            console.log(result);
            var tag = /DreamWorks/g;
            var resultTwo = tag.test(production);
            console.log(resultTwo);
            if (result === true || resultTwo === true) {
              console.log('si es de ' + nameProduction);
              var posterImg = $('<img class="poster-movie" src="' + allList[i].Poster + '" />');
              console.log(allList[i]);
              liMovieTwo = $('<li class="list-group-item">');
              liMovieTwo.append(allList[i].Title);
              liMovieTwo.append(posterImg);
              resultsUl.append(liMovieTwo);
            }
          }
        }
      });
    }
  }
  function renderError(error) {
    console.error(error);
  }
});
