init();

function init() {
  // get url, separate it by "/" and extract movie slug
  const url = window.location.pathname.split("/");
  const filename = url[url.length - 1].split(".")[0]
  // find the object in my movie list
  const movie = movies.find(element => element.slug == filename);

  // fill the document title with the movie name
  document.title = movie.name + " - Tarantino's movies"

  // target first h1 element and fill it with movie name
  document.getElementsByTagName("H1")[0].append(
    document.createTextNode(movie.name)
  )

  // create iframe element that embeds youtube movie and append it to .movie-screen
  const iframe = document.createElement("IFRAME")
  iframe.src = "https://www.youtube.com/embed/" + movie.id
  iframe.frameBorder = 0
  document.getElementsByClassName("movie-screen")[0].append(iframe)

  // fetch all the data from omdbapi
  fetch('https://www.omdbapi.com/?apikey=3d9f43d4&t=' + movie.name)
    .then(response => response.json())
    .then(data => {

      // get IMDB rating
      document.getElementById("rating").appendChild(
        document.createTextNode(data.imdbRating)
      )

      // get release date + count age by substracting release year from current year
      const diff = new Date().getUTCFullYear() - new Date(data.Year).getUTCFullYear()
      document.getElementById("released").appendChild(
        document.createTextNode(data.Released + " (" + diff + " years" +
          " old)")
      )

      // add cast to the cast span
      document.getElementById("cast").appendChild(
        document.createTextNode(data.Actors)
      )

      // add description into .text
      // first add plot
      const plot = document.createElement("P")
      const plotText = document.createTextNode(data.Plot)
      plot.appendChild(plotText)
      document.getElementsByClassName("text")[0].append(plot)

      // then add custom information about the movie
      const info = document.createElement("P")
      const infoText = document.createTextNode(
        "This " + data.Type + " is a " + data.Year + " " + data.Rated + " rated " + data.Country + " piece produced" +
        " by " + data.Production + " and directed by " + data.Director + ". It has " + data.Awards.charAt(0).toLowerCase() + data.Awards.substring(1)
      )
      info.appendChild(infoText)
      document.getElementsByClassName("text")[0].appendChild(info)

      load.classList.add("loaded")

    })

}
