import {apiUrl} from "./apiKey.js"

const inputText = document.getElementById("search-input")
const searchBtn = document.getElementById("search-btn")
const moviesContainer = document.querySelector("main")
let searchArray = []
let moviesArray

searchBtn.addEventListener("click", (e) => handleSearch(e))

function handleSearch(e) {
    e.preventDefault()
    setMoviesArray().then(() => render())
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
    let html
/**
 * run a search again in the browser and open the console.
 * follow the lines of code for the console.log output.
 * pay particular attention to what is output in the console
 * and how it is written in the file. and think about that
 * left to right, top to bottom synchronous code
 * then think about asyn again and how it gets skipped over.
 */
    let timeStamp = Date.now() / 1000
    await moviesArray.forEach(async movie =>{
        const movieData = await movie
        html += `
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
        `
        console.log('returns after return of html', (Date.now() /1000) - timeStamp) //in s
    })

    console.log('runs before async finishes, finishes first',(Date.now()/1000) - timeStamp) //in s
    return html  //in html nothing gets initialize immediately returns. 
}

function render() {
    if (searchArray.length) {
       getMovieCardsHTML()
        .then((html) => {

            // html is undefined because of the async function
            //returning later. so your return value is still
            //uninitialized

            console.log('returns here after undefined is passed, finishes second',html)
            moviesContainer.innerHTML = html
        })
    } else {
        moviesContainer.innerHTML = `
            <h2 style="text-align:center;">Unable to find what you are looking for. Please try another search.</h2>
        `
    }
}