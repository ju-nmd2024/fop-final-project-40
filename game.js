import Menu from "./menu.js";
import { makeLevel1 } from "./level1.js";
import { makeLevel2 } from "./level2.js";

const scenes = ["menu", "level1", "level2", "level3"];
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
  level2.setup();
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
      break;
    default:
  }
}
window.draw = draw;

//window.keyReleased = keyReleased;