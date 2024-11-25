import Entity from "./entity.js";
import { getFramesPos, drawSprite } from "../utils.js";

// Zombies spawning on random position from canvas width & height
// Zombies moving towards the players movement
// they have a slight repel so that they do not stack up
// unless the player stays still

// there is no collision
// either we have zombies spawning overtime
// or having one spawn when another one dies, (this i have not done)

export default class Zombie extends Entity {
  constructor(x, y) {
    super();

    this.speed = 0.5; // zombie speed
    this.x = Math.random() * (200) - 100;
    this.y = Math.random() * (200) - 100;
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteR = 0;
    this.spriteRSmooth = 0;


    this.zombies = [];
    this.screenWidth = 192;
    this.screenHeight = 108;
    this.spawnRate = 50; // Spawns a new zombie
    this.lastSpawnTime = 0; // Tracks when the last zombie spawned
    this.maxZombieCount = 20; // max zombies on screen
    this.size = 20;

    this.load();
    this.loadAnim();
    this.setup();
  }
  load() {
    this.spriteRef = loadImage('./assets/player.png');
  }
  loadAnim() {
    this.frames = getFramesPos(3, 1, this.width+1, this.height+1);

    // animations
    this.anims = {
        "idle": 0,
        "run": {from: 1, to: 2, loop: true, speed: 7},
    };
  }


  setup() {
    this.loadAnim();
    this.setAnim("idle");
  }


  draw(camera) {
      // zombie
      push();
      fill(0, 255, 0);
      noStroke();
      ellipse(this.x + camera.x, this.y + camera.y, this.size);
      pop();
    }
}