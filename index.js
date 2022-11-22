import {apiUrl} from "./apiKey.js"

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let searchArray = []
let moviesArray

searchBtn.addEventListener("click", (e) => setMoviesArray(e))

function setMoviesArray (e) {
    e.preventDefault()
    fetch(`${apiUrl}&s=${inputText.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            searchArray = data.Search
            moviesArray = []
            searchArray.forEach (search => getMovieData(search.Title))
        })
}

function getMovieData (title) {
    let movie
    fetch(`${apiUrl}&t=${inputText.value}`)
        .then(res => res.json())
        .then(data => {
            movie = data
        })
    return movie
}

function getMovieCardsHTML () {
    return moviesArray.map(movie =>
        (`
        <div class="movie-card">
            <h2 class="movie-title">${movie.Title}</h2>
            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <p class="rating-number">8.0</p>
            </div>
            <p class="description">A blade runner must pursue and terminate four 
                replicants who stole a ship in space, and have returned to Earth 
                to find their creator.</p>
                <img class="movie-poster" src=${movie.Poster}>
            <div class="details">
                <p class="run-time">117 min</p>
                <p class="genre">Action, Drama, Sci-fi</p>
            </div>
            <button class="add-btn">
                <i class="fa-solid fa-plus"></i>
                <p>Watchlist</p>
            </button>
        </div>
        `)
    ).join("")
}

function render() {
    if (searchArray.length) {
        moviesContainer.innerHTML = getMovieCardsHTML
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}

render()