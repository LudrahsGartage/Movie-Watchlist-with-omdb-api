import {apiUrl} from "./apiKey.js"

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let searchArray = []
let moviesArray

searchBtn.addEventListener("click", (e) => handleSearch(e))

function handleSearch(e) {
    e.preventDefault()
    getMoviesArray()
    .then(() => render())
}

function getMoviesArray () {
    return fetch(`${apiUrl}&s=${inputText.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.Search)
            searchArray = data.Search
            moviesArray = searchArray.map(search => getMovieData(search.Title).then(() => data))
            return moviesArray
        })
}

function getMovieData (title) {
    return fetch(`${apiUrl}&t=${title}`)
        .then(res => res.json())
        .then(data => {
            return data
        })
}

function getMovieCardsHTML () {
    return moviesArray.map(movie =>
        (`
        <div class="movie-card">
            <h2 class="movie-title">${movie.Title}</h2>
            <div class="rating">
                <i class="fa-solid fa-star"></i>
                <p class="rating-number">${movie.Ratings[0].Value}</p>
            </div>
            <p class="description">${movie.Plot}</p>
                <img class="movie-poster" src=${movie.Poster}>
            <div class="details">
                <p class="run-time">${movie.Runtime}</p>
                <p class="genre">${movie.Genre}</p>
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
        console.log(moviesArray)
        //moviesContainer.innerHTML = getMovieCardsHTML()
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}