import { makeMenu } from "menu.js";
import { makeLevel1 } from "level1.js";

const scenes = ["menu", "level1", "level2", "level3"];
let currentScene = "menu";
function setScene(name) {
  if (scenes.includes(name)) {
    currentScene = name;
  }
}
const menu = makeMenu();
const level1 = makeLevel1();
// const level2 = makeLevel2;
// const level3 = makeLevel3;
function preload() {
  menu.load();
  level1.load();
}

function setup() {
  createCanvas(800, 500);
  pixelDensity(3);
  frameRate(60);
  noSmooth();

  level1.setup();
}

function draw() {
  //scale(4);
  switch (currentScene) {
    case "menu":
      menu.draw();
      break;
    case "level1":
      level1.update();
      level1.draw();
      break;
    case "level2":
      // not done
      break;
    case "level3":
      // not done
      break;
    default:
  }
}

function keyReleased() {
  if (keyCode === 13 && currentScene === "menu") {
    setScene("level1");
  }
}