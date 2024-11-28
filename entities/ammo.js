import Entity from "./entity.js";


export default class Ammo extends Entity{
  constructor(x,y) {
    super();
    this.x = x;
    this.y = y;
    this.size = 8;
    this.ammoBoxes = [];
  } 

  setup(){
    for( let i = ammoBoxes.length - 1; i>= 0; i--){
      ammoBoxes[i].draw();
      }
  }

  draw(){
    fill(128);
    ellipse(this.x,this.y, this.size, this.size);
  }

  

  collisionWith(player, ammoBoxes){
    
    if (dist(player.x, player.y, this.x, this.y < this.size)) {
      // gun should get max amount of ammo? or just get a set amount? 
      ammoBoxes.splice(ammoBoxes.indexOf(this), 1);
    }
  }
}
