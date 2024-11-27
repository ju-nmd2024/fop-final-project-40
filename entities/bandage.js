// i dont get how im supposed to put this into other files..
// anyways, this could works except the "player". 


let bandages = [];
const bandageAmount = 3;
const width = 600;
const height = 600;

function setup() {
  createCanvas(width, height);

  // Spawn initial bandages
  for (let i = 0; i < bandageAmount; i++) {
    bandages.push(new Bandage());
  }
}

function draw() {
  background(0);

  for (let i = bandages.length - 1; i >= 0; i--) {
    bandages[i].draw();

    // update player health code i think?
    if (bandages[i].Collision(player)) {
      player.hp = constrain(player.hp + 10, 0, maxHP);
      bandages.splice(i, 1);
    }
  }
}

// Bandage class
class Bandage {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 20;
  }

  draw() {
    fill(255, 0, 0);
    stroke(255);
    ellipse(this.x, this.y, this.size);
    noStroke();
  }
}
