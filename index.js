import {apiUrl} from "./apiKey.js"

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let searchArray = []
let moviesArray
let watchlistArray = localStorage.getItem("watchlist") ? JSON.parse(localStorage.getItem("watchlist")) : []

searchBtn.addEventListener("click", (e) => handleSearch(e))
moviesContainer.addEventListener("click",(e) => handleClick(e))

function handleSearch(e) {
    e.preventDefault()
    setMoviesArray().then(() => render())
    inputText.value = ""
}

async function setMoviesArray () {
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

async function getMovieCardsHTML () {
    await moviesArray.forEach(async movie =>{
        const element = document.createElement("div")
        element.classList.add("movie-card")
        const movieData = await movie
        element.innerHTML = `
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
            <button class="add-btn" data-id="${movieData.Title}">
                <i class="fa-solid fa-plus" data-id="${movieData.Title}"></i>
                <p data-id="${movieData.Title}">Watchlist</p>
            </button>
        `
        moviesContainer.appendChild(element)
    })
}

function handleClick(e){
    if (e.path[0].classList == "add-btn" || e.path[1].classList == "add-btn") {
        watchlistArray.push(e.target.dataset.id) 
        localStorage.setItem("watchlist", JSON.stringify(watchlistArray))
        console.log(localStorage.getItem("watchlist"))
    }
}

function render() {
    if (searchArray.length) {
        moviesContainer.innerHTML = ""
       getMovieCardsHTML()
       searchArray = []
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you are looking for. Please try another search.</h2>
        `
    }
}