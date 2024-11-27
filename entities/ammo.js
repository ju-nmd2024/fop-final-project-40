let ammo;

function setup() {
  ammo = new Ammo(24); // Initialize the ammo with 24 bullets
}

function draw() {
  ammo.display();
}

class Ammo {
  constructor(initialAmmo) {
    this.ammo = initialAmmo;
  } 

  display() {
    push();
    textAlign(RIGHT, BOTTOM);
    textSize(24);
    fill(255, 0, 0);
    text(`Ammo: ${this.ammo}`, width - 50, height - 50); // Display in bottom-right corner
    pop();
  }
}
