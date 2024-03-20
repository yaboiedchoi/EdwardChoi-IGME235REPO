"use strict";
const app = new PIXI.Application({
    background: '#040016',
    width: 1024,
    height: 768,
});
document.body.appendChild(app.view);

const screenWidth = app.view.width;
const screenHeight = app.view.height;

// NOTE: NO LONGER IMPLEMENTING
// get images using NASA API
// https://api.nasa.gov/


// load the images
app.loader.
    add([
        "images/background.png",
        "images/planets/sun.png",
        "images/planets/mercury.png",
        "images/planets/venus.png",
        "images/planets/earth.png",
        "images/planets/mars.png",
        "images/planets/jupiter.png",
        "images/planets/saturn.png",
        "images/planets/uranus.png",
        "images/planets/neptune.png",
        "images/planets/real/sun.png",
        "images/planets/real/mercury.png",
        "images/planets/real/venus.png",
        "images/planets/real/earth.png",
        "images/planets/real/mars.png",
        "images/planets/real/jupiter.png",
        "images/planets/real/saturn.png",
        "images/planets/real/uranus.png",
        "images/planets/real/neptune.png"
    ]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();
/*
loadImages();

async function loadImages(){
// https://github.com/pixijs/pixijs/wiki/v7-Migration-Guide#-replaces-loader-with-assets
// https://pixijs.io/guides/basics/assets.html
PIXI.Assets.addBundle('sprites', {
  background: 'images/background.png',
  sun: 'images/planets/sun.png',
  mercury: 'images/planets/mercury.png',
  venus: 'images/planets/venus.png',
  earth: 'images/planets/earth.png',
  mars: 'images/planets/mars.png',
  jupiter: 'images/planets/jupiter.png',
  saturn: 'images/planets/saturn.png',
  uranus: 'images/planets/uranus.png',
  neptune: 'images/planets/neptune.png',
});

assets = await PIXI.Assets.loadBundle('sprites');

setup();
}*/

let assets;
let background;
let solarSystem,orbits;
let titleScene;
let gameScene;

let stage;

let planetButtons;

let soundtrack, clicked, hovered, unhovered;

function setup(){
    stage = app.stage;
    
    // title screen
    titleScene = new PIXI.Container();
    stage.addChild(titleScene);

    // game scene (invisible)
    gameScene = new PIXI.Container();
    gameScene.visible = false;
    stage.addChild(gameScene);

    // planet.visible = false;

    // load background
    background = new Background();
    titleScene.addChild(background);
    titleScene.visible = true; //added later
    
    LabelsAndButtons();

	app.ticker.add(gameLoop);
    
}
function gameLoop(){
    // deltaTime
    let dt = 1/app.ticker.FPS;
    if(dt > 1/12) dt = 1/12;

    // update planets
    
    if (gameScene.visible == true){
        SolarSystemUpdate(dt);
    }

}



function LabelsAndButtons(){

    // Styles

    // Title Text
    let style = new PIXI.TextStyle({
        fontFamily: "Quicksand",
        fontSize: 64,
        fill: "white",
    });

    // Button Text
    let buttonStyle = new PIXI.TextStyle({
        fontFamily: "Quicksand",
        fontSize: 32,
        fill: "lightblue",
    })


    // Title Screen

    let title = new PIXI.Text("The Solar System", style);
    title.x = screenWidth/2 - title.width/2;
    title.y = 100;
    titleScene.addChild(title);

    // Enter button

    let enterButton = new PIXI.Text("Explore", buttonStyle);
    enterButton.x = screenWidth/2 - enterButton.width/2;
    enterButton.y = 400;
    enterButton.interactive = true;
    enterButton.buttonMode = true;
    enterButton.on('pointerdown', startGame);

    /* test for opening a link in a new tab
    enterButton.on('pointerdown', function(){
        window.open("https://www.html5gamedevs.com/topic/44780-best-way-to-remove-objects-from-the-stage/", "__blank");
    })
    */
    /*enterButton.on("pointerdown", () => {
        startGame();

        // set new background
        background = new Background();
        gameScene.addChild(background);
    });*/

    // make button "darker" when mouse hovers over it
    enterButton.on('pointerover', e => e.target.alpha = 0.5); 
    // make button normal when mouse leaves it
    enterButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    titleScene.addChild(enterButton);

}
function startGame(){
    // change scenes
    titleScene.visible = false;
    gameScene.visible = true;

    // set new background
    background = new Background();
    gameScene.addChild(background);

    // load orbits
    LoadOrbits();
    // load planets
    LoadPlanets();
    // load buttons
    LoadButtons();
    // load audio
    LoadAudio();

    // play soundtrack
    soundtrack.play();
}
function LoadPlanets(){
    // all planets
    let sun = new Planet("Sun", screenWidth/2, screenHeight/2, 0.3, "images/planets/sun.png", 0);
    let mercury = new Planet("Mercury", screenWidth/2, 350, 0.1, "images/planets/mercury.png", 2);
    let venus = new Planet("Venus", screenWidth/2, 325, 0.15, "images/planets/venus.png", 1);
    let earth = new Planet("Earth", screenWidth/2, 295, 0.15, "images/planets/earth.png", 0.5);
    let mars = new Planet("Mars", screenWidth/2, 265, 0.1, "images/planets/mars.png", 0.25);
    let jupiter = new Planet("Jupiter", screenWidth/2, 205, 0.3, "images/planets/jupiter.png", 0.05);
    let saturn = new Planet("Saturn", screenWidth/2, 160, 0.6, "images/planets/saturn.png", 0.02);
    let uranus = new Planet("Uranus", screenWidth/2, 115, 0.2, "images/planets/uranus.png", 0.01);
    let neptune = new Planet("Neptune", screenWidth/2, 80, 0.19, "images/planets/neptune.png", 0.005);

    solarSystem = [sun, mercury, venus, earth, mars, jupiter, saturn, uranus, neptune];

    for (Planet of solarSystem){
        gameScene.addChild(Planet);
    }
}
function LoadOrbits(){
    let orbitSun = new Orbits(screenWidth/2, screenHeight/2, 0); // made just so that there are the same number of orbits and planets
    let orbitMercury = new Orbits(screenWidth/2, screenHeight/2, 34);
    let orbitVenus = new Orbits(screenWidth/2, screenHeight/2, 59);
    let orbitEarth = new Orbits(screenWidth/2, screenHeight/2, 89);
    let orbitMars = new Orbits(screenWidth/2, screenHeight/2, 119);
    let orbitJupiter = new Orbits(screenWidth/2, screenHeight/2, 179);
    let orbitSaturn = new Orbits(screenWidth/2, screenHeight/2, 224);
    let orbitUranus = new Orbits(screenWidth/2, screenHeight/2, 269);
    let orbitNeptune = new Orbits(screenWidth/2, screenHeight/2, 304);

    orbits = [orbitSun, orbitMercury, orbitVenus, orbitEarth, orbitMars, orbitJupiter, orbitSaturn, orbitUranus, orbitNeptune];

    for (let orbit of orbits){
        gameScene.addChild(orbit);
    }
}
function LoadButtons() {

    // button style
    let buttonStyle = new PIXI.TextStyle({
        fontFamily: "Quicksand",
        fontSize: 32,
        fill: "lightblue",
    })
    
    // Title Text
    let titleStyle = new PIXI.TextStyle({
        fontFamily: "Quicksand",
        fontSize: 38,
        fill: "white",
    });

    planetButtons = [];

    /*
    for (let i = 0; i < solarSystem.length; i++) {
        let planet = solarSystem[i];
        let button = new PIXI.Text(planet.name, { fill: 0xffffff });
        button.x = planet.x;
        button.y = planet.y + planet.radius + 10;
        button.anchor.set(0.5);
        button.interactive = true;
        button.buttonMode = true;
        button.on("pointerdown", () => {
            // Handle button click event here
            console.log("Button clicked for planet: " + planet.name);
        });

        planetButtons.push(button);
        gameScene.addChild(button);
    }

    // Enter button
    let enterButton = new PIXI.Text("Explore", buttonStyle);
    enterButton.x = screenWidth/2 - enterButton.width/2;
    enterButton.y = 400;
    enterButton.interactive = true;
    enterButton.buttonMode = true;
    enterButton.on('pointerdown', startGame);

    /*enterButton.on("pointerdown", () => {
        startGame();

        // set new background
        background = new Background();
        gameScene.addChild(background);
    });

    // make button "darker" when mouse hovers over it
    enterButton.on('pointerover', e => e.target.alpha = 0.5); 
    // make button normal when mouse leaves it
    enterButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
    titleScene.addChild(enterButton);
    */

    let solarSystemButton = new PIXI.Text("The Solar System: ", titleStyle);
    solarSystemButton.x = 20;
    solarSystemButton.y = 20;
    gameScene.addChild(solarSystemButton);

    for (let i = 0; i < solarSystem.length; i++){
        let planetButton = new PIXI.Text(solarSystem[i].name, buttonStyle);
        planetButton.x = 20;
        planetButton.y = 20 + (i * 35 + 40);
        planetButton.interactive = true;
        planetButton.buttonMode = true;
        planetButton.on('pointerdown', () => {
            solarSystem[i].focused(stage, gameScene, solarSystem[i]); 
            clicked.play();
            console.log("Button clicked for planet: " + solarSystem[i].name);
        });
        planetButton.on('pointerover', e => e.target.alpha = 0.5);
        planetButton.on('pointerover', function(){
            hovered.play();
            solarSystem[i].selected();
        });
        planetButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
        planetButton.on('pointerout', function(){
            unhovered.play();
            solarSystem[i].deselected();
        });
        planetButtons.push(planetButton);
        gameScene.addChild(planetButton);            
    }
}
function SolarSystemUpdate(dt){
    for (let i = 0; i < solarSystem.length; i++){
        if (i == 0){
            solarSystem[i].update(0, dt);
        }
        else{
            solarSystem[i].update(orbits[i].radius, dt);
        }
    }
}
function LoadAudio(){
    soundtrack = new Howl({
        src: ['sounds/soundtrack.mp3'],
        loop: true
    });
    clicked = new Howl({
        src: ['sounds/clicked.mp3']
    });
    hovered = new Howl({
        src: ['sounds/hovered.mp3']
    });
    unhovered = new Howl({
        src: ['sounds/unhovered.mp3']
    });
}