init()
function init() {

  //looping over all movies in json
  movies.forEach((movie, index) => {

    // create link node and assign it a "article" class and link to the movie page
    const articleLink = document.createElement("a")
    articleLink.classList.add("article")
    articleLink.href = "movie/" + movie.slug + ".html"

    // fetching data from OMDB API passing it the movie name
      fetch('https://www.omdbapi.com/?apikey=3d9f43d4&t=' + movie.name)
      // when response, turn it into json
        .then(response => response.json())
        // then use the data
        .then(data => {

          // create article node
          const article = articleLink.appendChild(document.createElement("article"))

          // create heading node, add the movie name as a text, combine them and append to the article
          const heading = document.createElement("H2")
          const headingText = document.createTextNode(movie.name)
          heading.appendChild(headingText)
          article.appendChild(heading)

          // create the background image node with image from OMDB and alt text being the name of the movie and append
          // it to the article
          const image = document.createElement("IMG")
          image.src = data.Poster
          image.alt = data.Title + " poster"
          article.appendChild(image)



          // if this is the last request, hide loader
          if (index === movies.length - 1){
            load.classList.add("loaded")
          }
        })
        .catch(err => {

          // Do something for an error here
          const errorMessage = document.createElement('H2');
          errorMessage.classList.add("error")
          errorMessage.textContent = `Sorry there was an error!`;
          movieList.appendChild(errorMessage);
          load.classList.add("loaded")
        })

      //append the article "a" node to the main section
      movieList.append(articleLink)

  })
}
