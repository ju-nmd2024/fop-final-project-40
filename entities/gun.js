import Entity from "./entity.js";
import Bullet from "./bullet.js";
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

    this.prevPress = false; // nånting skott sjuktit tryuckt kanpp
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

  movePlayer(moveBy) {
    let move = {
      x: 0,
      y: 0,
    };
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

  update(bullets, player) {
    //prev timer
    this.animationTimer += deltaTime; // make timer

    if (mouseIsPressed && !this.prevPress) {
      //this.shoot(); // calls the shooting method for the bullets
      this.setAnim("shoot");
      bullets.push(new Bullet(player.x, player.y, (this.spriteR)-radians(90)));
    }
    this.prevPress = mouseIsPressed;

    const moveBy = (this.speed / 1000) * deltaTime;
    this.movePlayer(moveBy);

    const animData = this.anims[this.currentAnim];
    this.currentFrameData = this.setAnimFrame(animData);
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
  }
}