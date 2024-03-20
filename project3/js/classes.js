class Planet extends PIXI.Sprite {
    constructor(name, x, y, scale, texture, speed) {
        super(app.loader.resources[texture].texture);
        this.anchor.set(0.5, 0.5);
        this.scale.set(scale);
        this.x = x;
        this.y = y;
        this.currentAngle = Math.random() * 2 * Math.PI; // in radians
        this.speed = speed;
        this.name = name;
        this.currentScale = scale;
    }
    selected(){
        // when the planet is hovered over, it will increase in size, and bring to the front of the display list
        this.currentScale *= 2;
        BringToFront(this);
        console.log("Planet selected: " + this.name)
    }
    deselected(){
        // return the planet to its original size
        this.currentScale /= 2;
    }
    focused(parentScene, currentScene, planet){
        // throw new Error("Not implemented"); // Zoom into planet and show info
        // TODO: KNOWN ISSUE: when you click on a planet, the scene is empty. 

        let planetInfo = new PIXI.Container();
        console.log(planet.name + " is focused");
        parentScene.addChild(planetInfo);

        // add background
        planetInfo.addChild(new Background());

        // add planet
        planetInfo.addChild(new Planet(planet.name, 772, 384, 2, "images/planets/" + planet.name.toLowerCase() + ".png", planet.speed));
        
        // add square background
        let background = new PIXI.Graphics();
        background.lineStyle(2, 0x14567d, 1);
        background.beginFill(0x000000);
        background.drawRoundedRect(20, 70, 500, 650);
        background.endFill();
        planetInfo.addChild(background);

        // add planet name
        let planetName = new PIXI.Text(planet.name, {fontFamily: "Quicksand", fontSize: 24, fill: "lightblue"});
        planetName.x = 270 - planetName.width / 2;
        planetName.y = 75;
        planetInfo.addChild(planetName);

        // 

        // add planet info
        //planetInfo.addChild(new Planet("name", 0, 0, 2, "https://images-assets.nasa.gov/image/NHQ201905310040/NHQ201905310040~thumb.jpg", 0));
        // a switch depending on which planet was selected
        switch (planet.name) {
            case "Sun":
                //#region Sun
                // image
                let sunImage = new PIXI.Sprite(app.loader.resources["images/planets/real/sun.png"].texture);
                sunImage.x = 270;
                sunImage.y = 200;
                sunImage.anchor.set(0.5, 0.5);
                sunImage.scale.set(0.1);
                planetInfo.addChild(sunImage);

                // text
                let typeText = new PIXI.Text("Type: Yellow Dwarf Star", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                typeText.x = 30;
                typeText.y = 290;
                planetInfo.addChild(typeText);

                let massText = new PIXI.Text("Mass: 1.989 × 10^30 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                massText.x = 270;
                massText.y = 290;
                planetInfo.addChild(massText);

                let diameterText = new PIXI.Text("Diameter: 1,392,684 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                diameterText.x = 30;
                diameterText.y = 330;
                planetInfo.addChild(diameterText);

                let volumeText = new PIXI.Text("Volume: 1.41 × 10^18 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                volumeText.x = 270;
                volumeText.y = 330;
                planetInfo.addChild(volumeText);

                let description = new PIXI.Text("The Sun's gravity holds the solar system together, keeping everything " +
                                                "in its orbit. It holds all of our planets, comets, and asteroids as well. " + 
                                                "Though it is special to us, there are billions of stars like our Sun scattered across " +
                                                "the Milky Way galaxy. The Sun has many names in many cultures. The Latin word for Sun is “sol,” " +
                                                "which is the main adjective for all things Sun-related: solar.", 
                                                {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                description.x = 30;
                description.y = 370;
                description.width = 440;
                planetInfo.addChild(description);

                let sunMythText = new PIXI.Text("Greek Mythos Name: Helios, the God of the Sun", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                sunMythText.x = 30;
                sunMythText.y = 610;
                planetInfo.addChild(sunMythText);


                let sourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                sourcePre.x = 30;
                sourcePre.y = 660;
                planetInfo.addChild(sourcePre);

                let sourceText = new PIXI.Text("https://science.nasa.gov/sun/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                sourceText.text
                sourceText.interactive = true;
                sourceText.buttonMode = true;
                sourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/sun/");
                })
                sourceText.x = 30 + sourcePre.width;
                sourceText.y = 660;
                planetInfo.addChild(sourceText);

                break;
                //#endregion
            case "Mercury":
                //#region Mercury
                // image
                let mercuryImage = new PIXI.Sprite(app.loader.resources["images/planets/real/mercury.png"].texture);
                mercuryImage.x = 270;
                mercuryImage.y = 190;
                mercuryImage.anchor.set(0.5, 0.5);
                mercuryImage.scale.set(0.08);
                planetInfo.addChild(mercuryImage);

                // text
                let mercuryTypeText = new PIXI.Text("Type: Terrestrial Planet", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                mercuryTypeText.x = 30;
                mercuryTypeText.y = 290;
                planetInfo.addChild(mercuryTypeText);

                let mercuryMassText = new PIXI.Text("Mass: 3.285 × 10^23 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                mercuryMassText.x = 270;
                mercuryMassText.y = 290;
                planetInfo.addChild(mercuryMassText);

                let mercuryDiameterText = new PIXI.Text("Diameter: 4,879 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                mercuryDiameterText.x = 30;
                mercuryDiameterText.y = 330;
                planetInfo.addChild(mercuryDiameterText);

                let mercuryVolumeText = new PIXI.Text("Volume: 6.083 × 10^10 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                mercuryVolumeText.x = 270;
                mercuryVolumeText.y = 330;
                planetInfo.addChild(mercuryVolumeText);

                let mercuryDescription = new PIXI.Text("Mercury is the smallest planet that is closest to the sun. It is only slightly " +
                                                       "larger than Earth's Moon. Its surface is covered in tens of thousands of impact craters. " +
                                                       "From the surface of Mercury, the Sun would appear more than three times as large as it does " +
                                                       "when viewed from Earth, and the sunlight would be as much as 11 times brighter. " +
                                                       "Mercury is the fastest planet, zipping around the Sun every 88 Earth days. ",
                                                        {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                mercuryDescription.x = 30;
                mercuryDescription.y = 370;
                mercuryDescription.width = 440;
                planetInfo.addChild(mercuryDescription);

                let mercuryMythText = new PIXI.Text("Greek Mythos Name: Hermes, the God of Messangers and Humor", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                mercuryMythText.x = 30;
                mercuryMythText.y = 590;
                planetInfo.addChild(mercuryMythText);

                let mercurySourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                mercurySourcePre.x = 30;
                mercurySourcePre.y = 660;
                planetInfo.addChild(mercurySourcePre);

                let mercurySourceText = new PIXI.Text("https://science.nasa.gov/mercury/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                mercurySourceText.text
                mercurySourceText.interactive = true;
                mercurySourceText.buttonMode = true;
                mercurySourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/mercury/");
                })
                mercurySourceText.x = 30 + mercurySourcePre.width;
                mercurySourceText.y = 660;
                planetInfo.addChild(mercurySourceText);
                
                break;
                //#endregion
            case "Venus":
                //#region Venus
                // image
                let venusImage = new PIXI.Sprite(app.loader.resources["images/planets/real/venus.png"].texture);
                venusImage.x = 270;
                venusImage.y = 190;
                venusImage.anchor.set(0.5, 0.5);
                venusImage.scale.set(0.04);
                planetInfo.addChild(venusImage);

                // text
                let venusTypeText = new PIXI.Text("Type: Terrestrial Planet", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                venusTypeText.x = 30;
                venusTypeText.y = 290;
                planetInfo.addChild(venusTypeText);

                let venusMassText = new PIXI.Text("Mass: 4.867 × 10^24 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                venusMassText.x = 270;
                venusMassText.y = 290;
                planetInfo.addChild(venusMassText);

                let venusDiameterText = new PIXI.Text("Diameter: 12,104 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                venusDiameterText.x = 30;
                venusDiameterText.y = 330;
                planetInfo.addChild(venusDiameterText);

                let venusVolumeText = new PIXI.Text("Volume: 9.284 × 10^11 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                venusVolumeText.x = 270;
                venusVolumeText.y = 330;
                planetInfo.addChild(venusVolumeText);
                
                let venusDescription = new PIXI.Text("Venus, our nearest planetary neighbor, has a surface hot " +
                                                     "enough to melt lead. The atmosphere is so thick that, from " +
                                                     "the surface, the Sun is just a smear of light. Venus is like Earth's opposite: " +
                                                     "Venus spins backward, has a day longer than its year, and lacks any semblance of seasons. It might once have " +
                                                     "been a habitable ocean world, like Earth, but that was at least a billion years ago. ", 
                                                     {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                venusDescription.x = 30;
                venusDescription.y = 370;
                venusDescription.width = 440;
                planetInfo.addChild(venusDescription);

                let venusMythText = new PIXI.Text("Greek Mythos Name: Aphrodite, the Goddess of Love and Beauty", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                venusMythText.x = 30;
                venusMythText.y = 590;
                planetInfo.addChild(venusMythText);

                let venusSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                venusSourcePre.x = 30;
                venusSourcePre.y = 660;
                planetInfo.addChild(venusSourcePre);

                let venusSourceText = new PIXI.Text("https://science.nasa.gov/venus/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                venusSourceText.text
                venusSourceText.interactive = true;
                venusSourceText.buttonMode = true;
                venusSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/venus/");
                })

                venusSourceText.x = 30 + venusSourcePre.width;
                venusSourceText.y = 660;
                planetInfo.addChild(venusSourceText);

                break;
                //#endregion
            case "Earth":
                //#region Earth
                // image
                let earthImage = new PIXI.Sprite(app.loader.resources["images/planets/real/earth.png"].texture);
                earthImage.x = 270;
                earthImage.y = 190;
                earthImage.anchor.set(0.5, 0.5);
                earthImage.scale.set(0.08);
                planetInfo.addChild(earthImage);

                // text
                let earthTypeText = new PIXI.Text("Type: Terrestrial Planet", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                earthTypeText.x = 30;
                earthTypeText.y = 290;
                planetInfo.addChild(earthTypeText);

                let earthMassText = new PIXI.Text("Mass: 5.972 × 10^24 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                earthMassText.x = 270;
                earthMassText.y = 290;
                planetInfo.addChild(earthMassText);

                let earthDiameterText = new PIXI.Text("Diameter: 12,756 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                earthDiameterText.x = 30;
                earthDiameterText.y = 330;
                planetInfo.addChild(earthDiameterText);

                let earthVolumeText = new PIXI.Text("Volume: 1.083 × 10^12 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                earthVolumeText.x = 270;
                earthVolumeText.y = 330;
                planetInfo.addChild(earthVolumeText);

                let earthDescription = new PIXI.Text("Earth is the third planet from the Sun and the only known celestial body to support life. " +
                                                     "It has a diverse range of ecosystems and is home to millions of species, including humans. " +
                                                     "Earth has a solid surface, liquid water, and a breathable atmosphere, making it a unique and " +
                                                     "habitable planet in our solar system.", 
                                                     {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                earthDescription.x = 30;
                earthDescription.y = 370;
                earthDescription.width = 440;
                planetInfo.addChild(earthDescription);

                let earthMythText = new PIXI.Text("Greek Mythos Name: Gaia, the Goddess of the Earth", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                earthMythText.x = 30;
                earthMythText.y = 590;
                planetInfo.addChild(earthMythText);

                let earthSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                earthSourcePre.x = 30;
                earthSourcePre.y = 660;
                planetInfo.addChild(earthSourcePre);

                let earthSourceText = new PIXI.Text("https://science.nasa.gov/earth/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                earthSourceText.text
                earthSourceText.interactive = true;
                earthSourceText.buttonMode = true;
                earthSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/earth/");
                })
                earthSourceText.x = 30 + earthSourcePre.width;
                earthSourceText.y = 660;
                planetInfo.addChild(earthSourceText);

                break;
                //#endregion
            case "Mars":
                //#region mars
                // image
                let marsImage = new PIXI.Sprite(app.loader.resources["images/planets/real/mars.png"].texture);
                marsImage.x = 270;
                marsImage.y = 190;
                marsImage.anchor.set(0.5, 0.5);
                marsImage.scale.set(0.4);
                planetInfo.addChild(marsImage);

                // text
                let marsTypeText = new PIXI.Text("Type: Terrestrial Planet", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                marsTypeText.x = 30;
                marsTypeText.y = 290;
                planetInfo.addChild(marsTypeText);

                let marsMassText = new PIXI.Text("Mass: 6.39 × 10^23 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                marsMassText.x = 270;
                marsMassText.y = 290;
                planetInfo.addChild(marsMassText);

                let marsDiameterText = new PIXI.Text("Diameter: 6,792 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                marsDiameterText.x = 30;
                marsDiameterText.y = 330;
                planetInfo.addChild(marsDiameterText);

                let marsVolumeText = new PIXI.Text("Volume: 1.631 × 10^11 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                marsVolumeText.x = 270;
                marsVolumeText.y = 330;
                planetInfo.addChild(marsVolumeText);

                let marsDescription = new PIXI.Text("Mars, or the Red Planet, is the fourth planet from the Sun and the second-smallest planet in the Solar System. " +
                                                    "It is called the Red Planet due to the iron oxide prevalent on the surface, " +
                                                    "which gives it a reddish appearance distinctive among the astronomical bodies visible to the naked eye. " +
                                                    "Mars is a terrestrial planet with a thin atmosphere, having craters, valleys, deserts, and polar ice caps of Earth.",
                                                    {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                marsDescription.x = 30;
                marsDescription.y = 370;
                marsDescription.width = 440;
                planetInfo.addChild(marsDescription);

                let marsMythText = new PIXI.Text("Greek Mythos Name: Ares, the God of War", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                marsMythText.x = 30;
                marsMythText.y = 600;
                planetInfo.addChild(marsMythText);

                let marsSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                marsSourcePre.x = 30;
                marsSourcePre.y = 660;
                planetInfo.addChild(marsSourcePre);

                let marsSourceText = new PIXI.Text("https://science.nasa.gov/mars/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                marsSourceText.text
                marsSourceText.interactive = true;
                marsSourceText.buttonMode = true;
                marsSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/mars/");
                })
                marsSourceText.x = 30 + marsSourcePre.width;
                marsSourceText.y = 660;
                planetInfo.addChild(marsSourceText);

                break;
                //#endregion
            case "Jupiter":
                //#region jupiter
                // image
                let jupiterImage = new PIXI.Sprite(app.loader.resources["images/planets/real/jupiter.png"].texture);
                jupiterImage.x = 270;
                jupiterImage.y = 190;
                jupiterImage.anchor.set(0.5, 0.5);
                jupiterImage.scale.set(0.09);
                planetInfo.addChild(jupiterImage);

                // text
                let jupiterTypeText = new PIXI.Text("Type: Gas Giant", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                jupiterTypeText.x = 30;
                jupiterTypeText.y = 290;
                planetInfo.addChild(jupiterTypeText);

                let jupiterMassText = new PIXI.Text("Mass: 1.898 × 10^27 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                jupiterMassText.x = 270;
                jupiterMassText.y = 290;
                planetInfo.addChild(jupiterMassText);

                let jupiterDiameterText = new PIXI.Text("Diameter: 139,822 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                jupiterDiameterText.x = 30;
                jupiterDiameterText.y = 330;
                planetInfo.addChild(jupiterDiameterText);

                let jupiterVolumeText = new PIXI.Text("Volume: 1.431 × 10^15 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                jupiterVolumeText.x = 270;
                jupiterVolumeText.y = 330;
                planetInfo.addChild(jupiterVolumeText);

                let jupiterDescription = new PIXI.Text("Jupiter is the largest planet in our solar system. It is a giant ball of gas and liquid. " +
                                                        "Jupiter's stripes and swirls are actually cold, windy clouds of ammonia and water, " +
                                                        "floating in an atmosphere of hydrogen and helium. Jupiter’s iconic Great Red Spot is " +
                                                        "a giant storm bigger than Earth that has raged for hundreds of years." +
                                                        "Jupiter has 79 known moons, including Ganymede, Europa, Io, and Callisto. ",
                                                        {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                jupiterDescription.x = 30;
                jupiterDescription.y = 370;
                jupiterDescription.width = 440;
                planetInfo.addChild(jupiterDescription);

                let jupiterMythText = new PIXI.Text("Greek Mythos Name: Zeus, the God of the Sky and Thunder", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                jupiterMythText.x = 30;
                jupiterMythText.y = 600;
                planetInfo.addChild(jupiterMythText);

                let jupiterSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                jupiterSourcePre.x = 30;
                jupiterSourcePre.y = 660;
                planetInfo.addChild(jupiterSourcePre);

                let jupiterSourceText = new PIXI.Text("https://science.nasa.gov/jupiter/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                jupiterSourceText.text
                jupiterSourceText.interactive = true;
                jupiterSourceText.buttonMode = true;
                jupiterSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/jupiter/");
                })
                jupiterSourceText.x = 30 + jupiterSourcePre.width;
                jupiterSourceText.y = 660;
                planetInfo.addChild(jupiterSourceText);
                
                break;
                //#endregion
            case "Saturn":
                //#region saturn
                // image
                let saturnImage = new PIXI.Sprite(app.loader.resources["images/planets/real/saturn.png"].texture);
                saturnImage.x = 270;
                saturnImage.y = 190;
                saturnImage.anchor.set(0.5, 0.5);
                saturnImage.scale.set(0.2);
                planetInfo.addChild(saturnImage);

                // text
                let saturnTypeText = new PIXI.Text("Type: Gas Giant", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                saturnTypeText.x = 30;
                saturnTypeText.y = 290;
                planetInfo.addChild(saturnTypeText);

                let saturnMassText = new PIXI.Text("Mass: 5.683 × 10^26 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                saturnMassText.x = 270;
                saturnMassText.y = 290;
                planetInfo.addChild(saturnMassText);

                let saturnDiameterText = new PIXI.Text("Diameter: 116,464 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                saturnDiameterText.x = 30;
                saturnDiameterText.y = 330;
                planetInfo.addChild(saturnDiameterText);

                let saturnVolumeText = new PIXI.Text("Volume: 8.271 × 10^14 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                saturnVolumeText.x = 270;
                saturnVolumeText.y = 330;
                planetInfo.addChild(saturnVolumeText);

                let saturnDescription = new PIXI.Text("Saturn is the sixth planet from the Sun and the second largest planet in our solar system. " +
                                                        "Adorned with a dazzling system of icy rings, Saturn is unique among the planets. It is not the " +
                                                        "only planet to have rings, but none are as spectacular or as complex as Saturn's. Saturn is a massive " +
                                                        "ball made mostly of hydrogen and helium. The farthest planet from " +
                                                        "Earth discovered by the unaided human eye, Saturn has been known since ancient times. ",
                                                        {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                saturnDescription.x = 30;
                saturnDescription.y = 370;
                saturnDescription.width = 440;
                planetInfo.addChild(saturnDescription);

                let saturnMythText = new PIXI.Text("Greek Mythos Name: Cronus, the God of Time", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                saturnMythText.x = 30;
                saturnMythText.y = 600;
                planetInfo.addChild(saturnMythText);

                let saturnSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                saturnSourcePre.x = 30;
                saturnSourcePre.y = 660;
                planetInfo.addChild(saturnSourcePre);

                let saturnSourceText = new PIXI.Text("https://science.nasa.gov/saturn/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                saturnSourceText.text
                saturnSourceText.interactive = true;
                saturnSourceText.buttonMode = true;
                saturnSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/saturn/");
                })
                saturnSourceText.x = 30 + saturnSourcePre.width;
                saturnSourceText.y = 660;
                planetInfo.addChild(saturnSourceText);

                break;
                //#endregion
            case "Uranus":
                //#region uranus
                // image
                let uranusImage = new PIXI.Sprite(app.loader.resources["images/planets/real/uranus.png"].texture);
                uranusImage.x = 270;
                uranusImage.y = 190;
                uranusImage.anchor.set(0.5, 0.5);
                uranusImage.scale.set(0.75);
                planetInfo.addChild(uranusImage);

                // text
                let uranusTypeText = new PIXI.Text("Type: Ice Giant", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                uranusTypeText.x = 30;
                uranusTypeText.y = 290;
                planetInfo.addChild(uranusTypeText);

                let uranusMassText = new PIXI.Text("Mass: 8.681 × 10^25 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                uranusMassText.x = 270;
                uranusMassText.y = 290;
                planetInfo.addChild(uranusMassText);

                let uranusDiameterText = new PIXI.Text("Diameter: 50,724 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                uranusDiameterText.x = 30;
                uranusDiameterText.y = 330;
                planetInfo.addChild(uranusDiameterText);

                let uranusVolumeText = new PIXI.Text("Volume: 6.833 × 10^13 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                uranusVolumeText.x = 270;
                uranusVolumeText.y = 330;
                planetInfo.addChild(uranusVolumeText);

                let uranusDescription = new PIXI.Text("It is surrounded by faint rings and more than two dozen small moons as it rotates at a " +
                                                      "nearly 90-degree angle from the plane of its orbit. This unique tilt makes Uranus appear " +
                                                      "to spin on its side. The atmosphere is mostly " +
                                                      "hydrogen and helium, but also includes large amounts of water, ammonia and methane. Astronomer " + 
                                                      "William Herschel tried unsuccessfully to name his discovery Georgium Sidus after his patron, English " +
                                                      "king George III. ",
                                                        {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                uranusDescription.x = 30;
                uranusDescription.y = 370;
                uranusDescription.width = 440;
                planetInfo.addChild(uranusDescription);

                let uranusMythText = new PIXI.Text("Greek Mythos Name: Ouranos, the God of the Sky", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                uranusMythText.x = 30;
                uranusMythText.y = 600;
                planetInfo.addChild(uranusMythText);

                let uranusSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                uranusSourcePre.x = 30;
                uranusSourcePre.y = 660;
                planetInfo.addChild(uranusSourcePre);

                let uranusSourceText = new PIXI.Text("https://science.nasa.gov/uranus/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                uranusSourceText.text
                uranusSourceText.interactive = true;
                uranusSourceText.buttonMode = true;
                uranusSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/uranus/");
                })
                uranusSourceText.x = 30 + uranusSourcePre.width;
                uranusSourceText.y = 660;
                planetInfo.addChild(uranusSourceText);

                break;
                //#endregion
            case "Neptune":
                //#region neptune
                // image
                let neptuneImage = new PIXI.Sprite(app.loader.resources["images/planets/real/neptune.png"].texture);
                neptuneImage.x = 270;
                neptuneImage.y = 190;
                neptuneImage.anchor.set(0.5, 0.5);
                neptuneImage.scale.set(0.075);
                planetInfo.addChild(neptuneImage);

                // text
                let neptuneTypeText = new PIXI.Text("Type: Ice Giant", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                neptuneTypeText.x = 30;
                neptuneTypeText.y = 290;
                planetInfo.addChild(neptuneTypeText);

                let neptuneMassText = new PIXI.Text("Mass: 1.024 × 10^26 kg", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                neptuneMassText.x = 270;
                neptuneMassText.y = 290;
                planetInfo.addChild(neptuneMassText);

                let neptuneDiameterText = new PIXI.Text("Diameter: 49,244 km", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                neptuneDiameterText.x = 30;
                neptuneDiameterText.y = 330;
                planetInfo.addChild(neptuneDiameterText);

                let neptuneVolumeText = new PIXI.Text("Volume: 6.254 × 10^13 km³", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                neptuneVolumeText.x = 270;
                neptuneVolumeText.y = 330;
                planetInfo.addChild(neptuneVolumeText);

                let neptuneDescription = new PIXI.Text("Dark, cold and whipped by supersonic winds, The planet’s rich blue color comes from methane in " +
                                                       "its atmosphere, which absorbs Neptune was the " +
                                                       "first planet located through mathematical calculations. Using predictions sent him by French astronomer " +
                                                       "Urbain Le Verrier, based on disturbances in the orbit of Uranus, German asstronomer Johann Galle was " +
                                                       "first to observe the planet in 1846. ",
                                                        {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                neptuneDescription.x = 30;
                neptuneDescription.y = 370;
                neptuneDescription.width = 440;
                planetInfo.addChild(neptuneDescription);

                let neptuneMythText = new PIXI.Text("Greek Mythos Name: Poseidon, the God of the Sea", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue", wordWrap: true, wordWrapWidth: 440});
                neptuneMythText.x = 30;
                neptuneMythText.y = 600;
                planetInfo.addChild(neptuneMythText);

                let neptuneSourcePre = new PIXI.Text("Learn more at ", {fontFamily: "Quicksand", fontSize: 20, fill: "lightblue"});
                neptuneSourcePre.x = 30;
                neptuneSourcePre.y = 660;
                planetInfo.addChild(neptuneSourcePre);

                let neptuneSourceText = new PIXI.Text("https://science.nasa.gov/neptune/", {fontFamily: "Quicksand", fontSize: 20, fill: "0x1ca6d9", fontStyle: "italic"});
                neptuneSourceText.text
                neptuneSourceText.interactive = true;
                neptuneSourceText.buttonMode = true;
                neptuneSourceText.on('pointerdown', () => {
                    window.open("https://science.nasa.gov/neptune/");
                })
                neptuneSourceText.x = 30 + neptuneSourcePre.width;
                neptuneSourceText.y = 660;
                planetInfo.addChild(neptuneSourceText);

                break;
                //#endregion
            default: // hopefully never called
                throw new Error("Planet.name not passed in correctly");
        }

        // make scene visible
        currentScene.visible = false;
        planetInfo.visible = true;

        // back button

        let buttonStyle = new PIXI.TextStyle({
            fontFamily: "Quicksand",
            fontSize: 32,
            fill: "lightblue",
        });

        let backButton = new PIXI.Text("< Back", buttonStyle);
        backButton.x = 20;
        backButton.y = 30;
        backButton.interactive = true;
        backButton.buttonMode = true;
        backButton.on('pointerdown', () => {
            planetInfo.visible = false;
            currentScene.visible = true;
            console.log("Back button clicked");
            currentScene.removeChild(planetInfo);
        });
        // make button "darker" when mouse hovers over it
        backButton.on('pointerover', e => e.target.alpha = 0.5); 
        // make button normal when mouse leaves it
        backButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
        
        planetInfo.addChild(backButton);
    }
    update(radius = 100, dt = 1 / 12) {
        // rotates the planet around the center of the scrreen
        // calculate the center of the screen
        const centerX = 1024 / 2;
        const centerY = 768 / 2;

        // set scale every frame
        this.scale.set(this.currentScale);

        if (this.currentAngle > 0) {
            this.currentAngle -= this.speed * dt;
        }
        else {
            this.currentAngle = Math.PI * 2;
        }

        this.x = centerX + Math.cos(this.currentAngle) * radius;
        this.y = centerY + Math.sin(this.currentAngle) * radius;

        
        
        /* old code
        // Calculate the new position of the planet
        const angle = speed * dt;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        // Update the position of the planet
        this.x = x;
        this.y = y;
        */
    }
}
// Class for the background, which needs to be created before the planets
class Background extends PIXI.Sprite {
    constructor(x = 512, y = 384) {
        super(app.loader.resources["images/background.png"].texture);
        this.anchor.set(0.5, 0.5);
        this.x = x;
        this.y = y;
    }
}
// Class for the orbit rings 
class Orbits extends PIXI.Graphics {
    constructor(x, y, radius) {
        super();
        this.radius = radius;
        this.lineStyle(2, 0xFFFFFF);
        this.drawCircle(x, y, radius);
        this.endFill();
    }
}