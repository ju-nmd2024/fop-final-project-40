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

    this.speed = 60; // zombie speed
    this.x = Math.random(this.screenHeight);
    this.y = Math.random(this.screenWidth);
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteR = 0;
    this.spriteRSmooth = 0;


    this.zombies = [];
    this.screenWidth = 192*6;
    this.screenHeight = 108*6;
    this.spawnRate = 50; // Spawns a new zombie
    this.lastSpawnTime = 0; // Tracks when the last zombie spawned
    this.maxZombieCount = 20; // max zombies on screen
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


    // zombies at random positions and amount of zombie spawn
    for (let i = 0; i < 10; i++) {
      this.zombies.push(new Zombie());
    }
    console.log(this.zombies)
  }


  draw(player, camera) {
    // zombies movement
    for (let i = 0; i < this.zombies.length; i++) {
      let zombie = this.zombies[i];
      //zombie move toward player
      let dx = player.x - zombie.x + camera.x;
      let dy = player.y - zombie.y + camera.y;
      let angle = atan2(dy, dx);

      zombie.x += cos(angle) * zombie.speed;
      zombie.y += sin(angle) * zombie.speed;

      // to make sure the zombies do not stack up if player moves
      // creating a repel system
      for (let j = 0; j < this.zombies.length; j++) {
        if (i !== j) {
          let other = this.zombies[j];
          let distance = dist(zombie.x, zombie.y, other.x, other.y);

          if (distance < zombie.size) {
            let repelAngle = atan2(zombie.y - other.y, zombie.x - other.x);
            zombie.x += cos(repelAngle) * 0.5; // the amount of repelling (x)
            zombie.y += sin(repelAngle) * 0.5; // the amount of repelling (y)
          }
        }
      }
      // zombie
      push();
      fill(0, 255, 0);
      ellipse(zombie.x, zombie.y, 30);
      pop();
    }
    // Spawn a new zombie every few seconds until max number
    if (
      frameCount - this.lastSpawnTime > this.spawnRate &&
      this.zombies.length <= this.maxZombieCount
    ) {
      this.zombies.push(new Zombie());
      this.lastSpawnTime = frameCount; // Update last spawn time
    }
  }
}