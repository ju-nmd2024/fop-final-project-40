import Entity from "./entity.js";
import { getFramesPos, drawSprite } from "../utils.js";

export default class Gun extends Entity {
  constructor(x, y) {
    super();

    this.speed = 100; // player speed
    this.x = x;
    this.y = y;
    this.viewportX = x;
    this.viewportY = y;
    this.spriteX = 0;
    this.spriteY = 0;
    this.spriteR = 0;
    this.spriteRSmooth = 0;
  }
  load() {
    this.spriteRef = loadImage("./assets/gun.png");
  }

  loadAnim() {
    this.frames = getFramesPos(3, 2, this.width + 1, this.height + 1);
    console.log(this.frames);
    // animations
    this.anims = {
      idle: 0,
      run: { from: 1, to: 2, loop: true, speed: 7 },
      shoot: { from: 3, to: 5, loop: false, speed: 10 },
    };
  }
  /*  I MADE THIS BULLET CODE, WHICH SHOULD PRODUCE BULLETS EVERY TIME YOU CLICK YOUR MOUSE, BUT IT IS NOT DEFINED? should i have made it to its own js file?
class Bullet{
    constructor(x,y, angle, speed = 200){
    this.x = x; // starting position
    this.y = y; // starting position
    this.speed = speed; // bullet speed
    this.angle = angle; // bullet direction
    this.radius = 5; // size of the bullet
    this.active = true; // bullet active/inactive
    }

    update(deltaTime){
        this.x += Math.cos(this.angle) * (this.speed * deltaTime / 500);
        this.y += Math.sin(this.angle) * (this.speed * deltaTime / 500);

         // bullet goes off-screen = active false
    if (this.x < 0 || this.x > windowWidth || this.y < 0 || this.y > windowHeight) {
        this.active = false;
      }
  }

  constructor(x, y) {
    super(); 
    this.bullets = []; // store bullets
    this.fireRate = 300; // Milliseconds between shots
    this.lastShot = 0; // Timer to track shooting
  }

  shoot() {
    const now = performance.now(); // Current time
    if (now - this.lastShot < this.fireRate) return; // Enforce fire rate
  
    const angle = Math.atan2(
      window.mouseY - (108 / 2) * 6, // The vertical distance between the gun's position and the mouse pointer
      window.mouseX - (192 / 2) * 6 // The horizontal distance between the gun's position and the mouse pointer
    );
  
    const bullet = new Bullet(this.x, this.y, angle); // creates bullet 
    this.bullets.push(bullet); // add bullet to bullets array
    this.lastShot = now; // Reset the timer
  }
    */

  movePlayer(moveBy) {
    let move = {
      x: 0,
      y: 0,
    };
    if (mouseIsPressed) {
      //this.shoot(); // calls the shooting method for the bullets
      this.setAnim("shoot");
    }
    if (keyIsDown(68)) {
      move.x += moveBy; // D
    }
    if (keyIsDown(65)) {
      move.x -= moveBy; // A
    }
    if (keyIsDown(87)) {
      move.y -= moveBy; // W
    }
    if (keyIsDown(83)) {
      move.y += moveBy; // S
    }
    if (move.x === 0 && move.y === 0) {
      if (!mouseIsPressed) {
        this.setAnim("idle");
      }
    } else {
      if (!mouseIsPressed) {
        this.setAnim("run");
      }
      this.x += move.x;
      this.y += move.y;
    }
  }

  setup() {
    this.loadAnim();
    this.setAnim("idle");
  }

  update() {
    //prev timer
    this.animationTimer += deltaTime; // make timer

    const moveBy = (this.speed / 1000) * deltaTime;
    this.movePlayer(moveBy);

    const animData = this.anims[this.currentAnim];
    this.currentFrameData = this.setAnimFrame(animData);

    /*
    // bullet updating
    this.bullets = this.bullets.filter((bullet) => {
      bullet.update(deltaTime); // checks bullets position, if off-screen = remove
      return bullet.active; // if active, goes back to bullets array
    });
    */
  }

  draw(camera) {
    imageMode(CENTER);
    push();
    translate(192 / 2, 108 / 2);

    // rotation code inspired by https://discourse.processing.org/t/rotation-based-on-mouse/1766
    push();
    // this takes half of width & height and multiplies it by the upscale of our window (then lastly fixes the rotation offset)
    this.spriteR =
      Math.atan2(window.mouseY - (108 / 2) * 6, window.mouseX - (192 / 2) * 6) +
      radians(90);
    rotate(this.spriteR);
    drawSprite(
      this.spriteRef,
      this.viewportX + this.spriteX,
      this.viewportY + this.spriteY - 3,
      this.currentFrameData.x,
      this.currentFrameData.y,
      this.width,
      this.height
    );
    pop();

    pop();

    push();
    //this.viewportX = (this.x + camera.x);
    //this.viewportY = (this.y + camera.y);
    pop();

    // Draw bullets
   // this.bullets.forEach((bullet) => bullet.draw());
  }
}
