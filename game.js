import Menu from "./menu.js";
import { makeLevel1 } from "./level1.js";
import { makeLevel2 } from "./level2.js";
//import { makeLevel3 } from "./level3.js";

import loseScreen from "./loseScreen.js";
import winScreen from "./winScreen.js";


const scenes = ["menu", "level1", "level2", "level3", "losescreen", "winscreen"];
let currentScene = "level1";
function setScene(name) {
  if (scenes.includes(name)) {
    currentScene = name;
  }
}
const menu = new Menu();
const level1 = makeLevel1();
const level2 = makeLevel2();
// const level3 = makeLevel3;
const losescreen = new loseScreen();
const winscreen = new winScreen();

function preload() {
  menu.load();
  level1.load();
  level2.load();
  //level3.load();
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
  level2.setup();
  //level3.setup();
  
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
    case "level2":
      level2.update();
      level2.draw();
      break;
    case "level3":
      // not done
      //level3.update();
      //level3.draw();
      break;
    case "level1, level2, level3":
      losescreen.update();
      if(losescreen.start){
        setScene("losescreen");
      } 
      case "level1, level2, level3":
      winscreen.update();
      if(winscreen.start){
        setScene("winscreen");
      } 
      break;
    default:
  }
}
window.draw = draw;

//window.keyReleased = keyReleased;