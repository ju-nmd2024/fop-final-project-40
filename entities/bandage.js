import Entity from "./entity.js";

export default class Bandage extends Entity {
  constructor(x, y) {  
    super();
    this.x = x;
    this.y = y;
    this.size = 8;  
  }
  
  draw(camera){
    push();
    fill(255,0,0);
    ellipse(this.x + camera.x, this.y + camera.y, this.size);
    pop();
  }    

  collisionWith(player, bandages, ui){ 
      if (dist(player.x, player.y, this.x, this.y) < this.size && player.hp < (ui.maxHP-10)) {
        player.hp += 10;
        bandages.splice(bandages.indexOf(this), 1);
      }
    }
}

