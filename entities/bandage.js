import Entity from "./entity.js";

export default class Bandage extends Entity {
  constructor(x, y) {  
    super();
    this.x = x;
    this.y = y;
    this.size = 8;  
  }
  
  draw(){
    push();
    fill(255,0,0);
    ellipse(this.x,this.y, this.size, this.size);
    pop();
  }    

  collisionWith(player, bandages){ 
      if (dist(player.x, player.y, this.x, this.y < this.size)) {
        player.hp += 10;
        bandages.splice(bandages.indexOf(this), 1);
      }
    }
}

