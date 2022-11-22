import {apiUrl} from "./apiKey.js"

fetch(`${apiUrl}&s=pokemon`)
    .then(res => res.json())
    .then(data => console.log(data))

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let moviesArray = []

function setMoviesArray () {
    fetch(`${apiUrl}&s=${inputText.value}`)
    .then(res => res.json())
    .then(data => console.log(data))
}

function getMovieCardsHTML () {
    return moviesArray.map(movie =>
        (`
        <div class="movie-card">
            <h2 class="movie-title">Blade Runner</h2>
            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <p class="rating-number">8.0</p>
            </div>
            <p class="description">A blade runner must pursue and terminate four 
                replicants who stole a ship in space, and have returned to Earth 
                to find their creator.</p>
                <img class="movie-poster" src="https://upload.wikimedia.org/wikipedia/en/9/9b/Blade_Runner_2049_poster.png">
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
    if (moviesArray.length) {
        moviesContainer.innerHTML = getMovieCardsHTML
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}

render()