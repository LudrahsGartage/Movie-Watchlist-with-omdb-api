import {apiUrl} from "./apiKey.js"

let watchlistTitleArray = JSON.parse(localStorage.getItem("watchlist"))
const moviesContainer = document.querySelector("main")

moviesContainer.addEventListener("click", (e) => handleClick(e))

function render() {
    if(watchlistTitleArray.length) {
        getWatchlistArray().then( (watchlistArray) => {
            moviesContainer.innerHTML = watchlistArray.map((movieData) => generateMovieHtml(movieData)).join("")
        }
        )
    } else {
        moviesContainer.innerHTML = `<a href="index.html" class="navigation-link">No Movies Here! Click to go back to Explore!</a>`
    }
}

function handleClick (e) {
    if (e.path[0].classList == "remove-btn" || e.path[1].classList == "remove-btn") {
        const index = watchlistTitleArray.indexOf(e.target.dataset.id)
        watchlistTitleArray.splice(index,1)
        localStorage.setItem("watchlist", JSON.stringify(watchlistTitleArray))
        render()
        console.log(watchlistTitleArray)
    }
}


async function getWatchlistArray () {
    const watchlistArray = await watchlistTitleArray.map(async title => {
        const res = await fetch(`${apiUrl}&t=${title}`)
        const data = await res.json()
        return data
    })
    return Promise.all(watchlistArray)
}

function generateMovieHtml(movieData) {
    return `
    <div class="movie-card">
        <h2 class="movie-title">${movieData.Title}</h2>
        <div class="rating">
            <i class="fa-solid fa-star"></i>
            <p class="rating-number">${movieData.Ratings[0].Value}</p>
        </div>
        <p class="description">${movieData.Plot}</p>
            <img class="movie-poster" src=${movieData.Poster}>
        <div class="details">
            <p class="run-time">${movieData.Runtime}</p>
            <p class="genre">${movieData.Genre}</p>
        </div>
        <button class="remove-btn" data-id="${movieData.Title}">
            <i class="fa-solid fa-minus" data-id="${movieData.Title}"></i>
            <p data-id="${movieData.Title}">Watchlist</p>
        </button>
    </div>
`
}

render()