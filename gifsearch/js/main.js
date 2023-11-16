
// 1
window.onload = (e) => {document.querySelector("#search").onclick = searchButtonClicked};
//window.onload = (e) => {document.querySelector("#showMore").onclick = loadAdditionalGifs(true)};
	
// 2
let displayTerm = "";
let offset = 0;


// 3
function searchButtonClicked(){
    // grabs the search button
    const goButton = document.getElementById("search");

    console.log("searchButtonClicked() called");

    // replace it with the spinner
    goButton.innerHTML = '<img class="spinner" src="images/spinner.gif" alt="Loading...">';

    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "NHW96Lr4nvSAelZ3LIl6e3nlZqdj8M5k";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    // if the search length is shorter than 1 character
    if(term.length < 1) {
        // change the go button back from the gif
        goButton.textContent = "Go!"
        // Throw an error message
        document.querySelector("#status").innerHTML = "<b>Search Failed!</b><p><i>Search Syntax Error</i></p>";
        return;
    }

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    // adding offset suffix
    url += "&offset=" + offset;

    // page number
    document.querySelector("#pageNumber").textContent = "Page: " + (offset / parseInt(limit));
    console.log(offset / parseInt(limit));

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);
}
/*function searchButtonClicked(){
    // grabs the search button
    const goButton = document.getElementById("search");

    console.log("searchButtonClicked() called");

    // replace it with the spinner
    goButton.innerHTML = '<img class="spinner" src="images/spinner.gif" alt="Loading...">';
    
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";

    let GIPHY_KEY = "NHW96Lr4nvSAelZ3LIl6e3nlZqdj8M5k";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();

    term = encodeURIComponent(term);

    if(term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getData(url);
}*/

function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET",url);
    xhr.send();
}


function dataLoaded(e) {
    
    // grabs the search button
    const goButton = document.getElementById("search");

    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results found for '" + displayTerm + "'</b>";
        return;
    }

    //offset += obj.data.length;

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.png";

        let url = result.url;

        let line = `<div class='result'><img src='${smallURL}' title= '${result.id}' />`;
        line += `<span>`; //<a target='_blank' href='${url}'>View on Giphy</a>
        line += `<button id="copy-url-btn" class="blue">copy</button>`;
        line += `<p id="copy-text" style="display: none;">${smallURL}</p>`

        line += `<p>Rating: ${result.rating.toUpperCase()}</p></span></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<b>Success!</b><p><i>Here are " + results.length + " results for '" + displayTerm + "'</i></p>";
    // Success! Change spinner to Go! text
    goButton.textContent = "Go!";
    // Success! show more button reveal
    document.getElementById("moreOrLess").style.display = "flex";
    // Success! set the link copy buttons
    // copy link
    let copyList = document.querySelectorAll("#copy-url-btn");
    let linkList = document.querySelectorAll("#copy-text")
    for (let i = 0; i < copyList.length; i++) {
        copyList[i].addEventListener("click", () => {
            navigator.clipboard.writeText(linkList[i].innerText)
            .then(function() {
                console.log('link has been copied!')
            })
        })
    }
}

function dataError(e) {
    console.log("An error occurred");
}



function loadAdditionalGifs(isNext) {
    let limit = document.querySelector("#limit").value;
    offset += isNext ? parseInt(limit) : -parseInt(limit);

    offset = Math.max(0, offset);
    console.log(offset);

    

    searchButtonClicked();
}

document.querySelector("#showMore").addEventListener("click", () => loadAdditionalGifs(true));
document.querySelector("#showLess").addEventListener("click", () => loadAdditionalGifs(false));

/*
document.querySelector("#moreOrLess").getElementById("showMore").addEventListener("click", (e) => {
    console.log('meow');
});
*/