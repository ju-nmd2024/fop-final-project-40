import Menu from "./menu.js";
import { makeLevel1 } from "./level1.js";

import loseScreen from "./loseScreen.js";
import winScreen from "./winScreen.js";


const scenes = ["menu", "level1", "losescreen", "winscreen"];
let currentScene = "menu";
function setScene(name) {
    if (scenes.includes(name)) {
        currentScene = name;
    }
}
const menu = new Menu();
const level1 = makeLevel1();

const losescreen = new loseScreen();
const winscreen = new winScreen();

function preload() {
    menu.load();
    level1.load();

    losescreen.load();
    winscreen.load();
}
window.preload = preload;

function setup() {
    createCanvas(192, 108);
    pixelDensity(3);
    frameRate(60);
    noSmooth();

    level1.setup();


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
            level1.update();
            level1.draw();
            break;
        default:
    }
}
window.draw = draw;

//window.keyReleased = keyReleased;