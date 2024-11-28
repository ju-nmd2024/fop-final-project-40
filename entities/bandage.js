import Entity from "./entity.js";

export default class Bandage extends Entity {
  constructor(x, y) {  
    super();
    this.x = x;
    this.y = y;
    this.size = 8;  
    this.bandages = [];
  }
  setup(){

    for( let i = bandages.length - 1; i>= 0; i--){
      bandages[i].draw();
      }
    }

  draw(){
    push();
    fill(255,0,0);
    ellipse(this.x,this.y, this.size, this.size);
    pop();
  }

  healedBy(bandages) {
    for (let bandage of bandages) {
      let distance = dist(this.x, this.y, bandage.x, bandage.y);
      if (distance < 16 && this.hp > 0) {
        this.hp += 10;
      }
    }
  }      


  collisionWith(player, bandages){
    
      if (dist(player.x, player.y, this.x, this.y < this.size)) {
        player.hp += 10;
        bandages.splice(bandages.indexOf(this), 1);
      }
    }
}

