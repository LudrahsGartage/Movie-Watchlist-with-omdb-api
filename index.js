import {apiUrl} from "./apiKey.js"

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let searchArray = []
let moviesArray

searchBtn.addEventListener("click", (e) => handleSearch(e))

function handleSearch(e) {
    e.preventDefault()
    getMoviesArray().then(() => render())
}

async function getMoviesArray () {
    const res = await fetch(`${apiUrl}&s=${inputText.value}`)
    const data = await res.json()
    searchArray = data.Search
    moviesArray = searchArray.map(search => getMovieData(search.Title))
    return moviesArray
}

async function getMovieData (title) {
    const res = await fetch(`${apiUrl}&t=${title}`)
    const data = await res.json()
    return data
}

function getMovieCardsHTML () {
    const cardsHtml = moviesArray.map(async movie =>{
        const movieData = await movie
        const html = (`
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
            <button class="add-btn">
                <i class="fa-solid fa-plus"></i>
                <p>Watchlist</p>
            </button>
        </div>
        `)
        return html
    })
    return cardsHtml
}

function render() {
    if (searchArray.length) {
        const cardsHtml = getMovieCardsHTML()
        moviesContainer.innerHTML = cardsHtml
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you’re looking for. Please try another search.</h2>
        `
    }
}