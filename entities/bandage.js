import Entity from "./entity.js";
import { getFramesPos, drawSprite } from "../utils.js";

export default class Bandage extends Entity {
  constructor(x, y) {
    super();

    this.x = Math.random() + 20;
    this.y = Math.random() + 20;
    this.size = 8;
    //this.spriteX = 0;
    //this.spriteY = 0;
    //this.spriteR = 0;
    //this.spriteRSmooth = 0;

    this.bandages = [];
    this.screenWidth = 192;
    this.screenHeight = 108;

    //this.load();

    // this.loadAnim();
    //this.setup();
  }
  load() {
    this.spriteRef = loadImage("");
  }
  loadAnim() {
    this.frames = getFramesPos(2, 2, this.width + 1, this.height + 1);

    // animations
    this.anims = {
      run: { from: 0, to: 1, loop: true, speed: 3 },
      hit: { from: 2, to: 3, loop: true, speed: 7 },
    };
  }
  animSwitch(player) {
    let distance = dist(this.x, this.y, player.x, player.y);
    if (distance < this.size + 2) {
      this.setAnim("hit");
    } else {
      this.setAnim("run");
    }
  }

  setup() {
    this.loadAnim();
    this.setAnim("run");
  }
  update(player) {
    //prev timer
    // this.animationTimer += deltaTime; // make timer
    //this.animSwitch(player);
    //const animData = this.anims[this.currentAnim];
    //this.currentFrameData = this.setAnimFrame(animData);
  }

  draw(camera, player) {
    push();
    fill(0, 255, 0);
    noStroke();
    //ellipse(60, 50, this.size, this.size);
    ellipse(this.x + camera.x, this.y + camera.y, this.size);  
    pop();
 
    /*imageMode(CENTER); 
    push();

    tint(this.tint);

    translate(this.x + camera.x, this.y + camera.y);
    let dx = player.x - this.x;
    let dy = player.y - this.y;
    this.spriteR = atan2(dy, dx);

    rotate(this.spriteR + radians(90));

    drawSprite(
      this.spriteRef,
      0,
      0,
      this.currentFrameData.x,
      this.currentFrameData.y,
      this.width,
      this.height
    );
    pop();*/
  }
}
