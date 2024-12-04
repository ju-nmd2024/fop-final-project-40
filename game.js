import Menu from "./menu.js";
import { makeLevel1 } from "./level1.js";
import { makeLevel2 } from "./level2.js";

let savedVars = {
    hp: 100,
    shield: 0,
    magCount: 1,
    ammoCount: 20
}


const scenes = ["menu", "level1", "level2"];
let currentScene = "menu";
function setScene(name) {
    if (scenes.includes(name)) {
        currentScene = name;
    }
}
const menu = new Menu();
const level1 = makeLevel1(setScene);
const level2 = makeLevel2(setScene);



function preload() {
    menu.load();
    level1.load();
    level2.load();

 
}
window.preload = preload;

function setup() {
    createCanvas(192, 108);
    pixelDensity(3);
    frameRate(60);
    noSmooth();

    level1.setup();
    //level2.setup();
   
}
window.setup = setup;

function draw() {
    switch (currentScene) {
        case "menu":
            menu.update();
            if (menu.start) {
                setScene("level1");
            }
            menu.draw();
            break;
        case "level1":
            menu.alpha = 255;
            menu.start = false;
            level1.update(level2, savedVars);
            level1.draw(currentScene);
            if (level1.loseScreen.restart) {
                setup();         
                setScene("menu");
                level1.loseScreen.restart = false;
            }
            break;
        case "level2":
            menu.alpha = 255;
            menu.start = false;
            level2.update(savedVars);
            level2.draw(currentScene);
            if (level2.loseScreen.restart) {
                setup();         
                setScene("menu");
                level2.loseScreen.restart = false;
            }
            break;
        default:
    }
}
window.draw = draw;

//window.keyReleased = keyReleased;