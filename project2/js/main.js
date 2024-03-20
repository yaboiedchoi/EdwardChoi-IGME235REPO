
// 1
// on load, show popular gifs, and load local storage
window.onload = (e) => {
    document.querySelector("#search").onclick = searchButtonClicked;
    searchPopular();
    getLocalStorage();
}
	
// 2
let displayTerm = "";
let offset = 0;

// load local storage
function getLocalStorage() {
    let storage = localStorage.getItem("storage");
    // if storage doesnt exist, dont load anything
    if (storage == null) {
        return;
    }
    // store the limit, type, and term
    storage = JSON.parse(storage);
    document.querySelector("#limit").value = storage.limit;
    document.querySelector("#type").value = storage.searchType;
    document.querySelector("#searchterm").value = storage.searchterm;
}
// set local storage, called when search button is clicked
function setLocalSorage() {
    // find current values
    let limit = document.querySelector("#limit").value;
    let searchType = document.querySelector("#type").value;
    let searchterm = document.querySelector("#searchterm").value;

    // store them in an object
    let storage = {
        limit: limit,
        searchType: searchType,
        searchterm: searchterm
    }

    // store the object in local storage
    localStorage.setItem("storage", JSON.stringify(storage));
}
// 3
function searchButtonClicked(){
    // grabs the search button
    const goButton = document.getElementById("search");

    console.log("searchButtonClicked() called");

    // if there are any images on the page, remove them
    document.querySelector("#content").innerHTML = "";

    // remove navigation buttons in case next search has no results
    document.getElementById("moreOrLess").style.display = "none";

    // replace it with the spinner
    goButton.innerHTML = '<img class="spinner" src="images/spinner.gif" alt="Loading...">';

    // grabs the selector for search type
    let searchType = document.querySelector("#type").value;
    // link start
    let GIPHY_URL = "";
    if (searchType == 'gifs') {
        GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    }
    else if (searchType == 'stickers') {
        GIPHY_URL = "https://api.giphy.com/v1/stickers/search?";
    }
    

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
    document.querySelector("#pageNumber").textContent = "Page: " + ((offset / parseInt(limit)) + 1);
    console.log(offset / parseInt(limit));

    document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    // save the search settings to local storage
    setLocalSorage();

    console.log(url);

    getData(url);
}
// search gifs, called when popular button is clicked
// some code is repeated from searchButtonClicked(), and some is removed for clarity
function searchPopular(){
    // grabs the search button
    const goButton = document.getElementById("search");

    console.log("searchPopular called");

    // if there are any images on the page, remove them
    document.querySelector("#content").innerHTML = "";

    // remove navigation buttons in case next search has no results
    document.getElementById("moreOrLess").style.display = "none";

    // replace it with the spinner
    goButton.innerHTML = '<img class="spinner" src="images/spinner.gif" alt="Loading...">';

    // grabs the selector for search type
    let searchType = document.querySelector("#type").value;
    // link start
    let GIPHY_URL = "https://api.giphy.com/v1/gifs/trending?";
    

    let GIPHY_KEY = "NHW96Lr4nvSAelZ3LIl6e3nlZqdj8M5k";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    //let term = document.querySelector("#searchterm").value;
    //displayTerm = term;

    //term = term.trim();

    //term = encodeURIComponent(term);

    //url += "&q=" + term;

    let limit = 50;
    url += "&limit=" + limit;

    // adding offset suffix
    //url += "&offset=" + offset;

    // page number
    document.querySelector("#pageNumber").textContent = "Page: " + ((offset / parseInt(limit)) + 1);
    console.log(offset / parseInt(limit));

    //document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";

    console.log(url);

    getDataPopular(url);
}

function getData(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoaded;

    xhr.onerror = dataError;

    xhr.open("GET",url);
    xhr.send();
}

// only for on load popular gifs
function getDataPopular(url) {
    let xhr = new XMLHttpRequest();

    xhr.onload = dataLoadedPopular; // this is the only difference

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

    // if there are no results, throw an error on screen
    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results for '" + displayTerm + "'</b>";
        goButton.textContent = "Go!";
        return;
    }

    // if there are results, set the offset to the length of the results
    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "";

    // for each result, create a div with the image and a copy button
    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.gif";

        let url = result.url;

        let line = `<div class='result'>`;
        line += `<span>`; //<a target='_blank' href='${url}'>View on Giphy</a>
        line += `<button id="copy-url-btn" class="resultButton"><img src='${smallURL}' title='${result.id}'/></button>`;
        line += `<p id="copy-text" style="display: none;">${smallURL}</p>`
        line += `</span></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<p>Here are " + results.length + " results for '" + displayTerm + "'</p>";
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
function dataLoadedPopular(e) {
    
    // grabs the search button
    const goButton = document.getElementById("search");

    let xhr = e.target;

    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = "<b>No results for '" + displayTerm + "'</b>";
        goButton.textContent = "Go!";
        return;
    }

    //offset += obj.data.length;

    let results = obj.data;
    console.log("results.length = " + results.length);
    let bigString = "";

    for (let i = 0; i < results.length; i++) {
        let result = results[i];

        let smallURL = result.images.fixed_width_downsampled.url;
        if (!smallURL) smallURL = "images/no-image-found.gif";

        let url = result.url;

        let line = `<div class='result'>`;
        line += `<span>`; //<a target='_blank' href='${url}'>View on Giphy</a>
        // invisible button to copy link
        line += `<button id="copy-url-btn" class="resultButton"><img src='${smallURL}' title='${result.id}'/></button>`;
        line += `<p id="copy-text" style="display: none;">${smallURL}</p>`
        line += `</span></div>`;

        bigString += line;
    }

    document.querySelector("#content").innerHTML = bigString;

    document.querySelector("#status").innerHTML = "<p>Showing Current Most Popular</p>";
    // Success! Change spinner to Go! text
    goButton.textContent = "Go!";
    // Success! set the link copy buttons
    // copy link
    let copyList = document.querySelectorAll("#copy-url-btn");
    let linkList = document.querySelectorAll("#copy-text")
    // for each copy button, add an event listener
    for (let i = 0; i < copyList.length; i++) {
        copyList[i].addEventListener("click", () => {
            navigator.clipboard.writeText(linkList[i].innerText)
            .then(function() {
                console.log('link has been copied!');
                // Display popup message
                // if there is no popup message already
                if (document.querySelector(".popup") == null) {
                    let footer = document.querySelector("footer");

                    let popup = document.createElement("div");
                    popup.textContent = "Image link copied!";
                    popup.classList.add("popup");
                    
                    footer.appendChild(popup);
    
                    // remove the popup message after 5 seconds
                    setTimeout(function() {
                        popup.remove();
                    }, 5000);
                }
            })
        })
    }
}

function dataError(e) {
    console.log("An error occurred");
}


// load more or less gifs
function loadAdditionalGifs(isNext) {
    let limit = document.querySelector("#limit").value;
    offset += isNext ? parseInt(limit) : -parseInt(limit);

    offset = Math.max(0, offset);
    console.log(offset);

    searchButtonClicked();
}

// add event listeners to the next and previous buttons
document.querySelector("#showMore").addEventListener("click", () => loadAdditionalGifs(true));
document.querySelector("#showLess").addEventListener("click", () => loadAdditionalGifs(false));

/*
document.querySelector("#moreOrLess").getElementById("showMore").addEventListener("click", (e) => {
    console.log('meow');
});
*/