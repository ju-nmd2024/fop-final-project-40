  //  I MADE THIS BULLET CODE, WHICH SHOULD PRODUCE BULLETS EVERY TIME YOU CLICK YOUR MOUSE, BUT IT IS NOT DEFINED? should i have made it to its own js file?
class Bullet {
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



  update() {
        
    // bullet updating
    this.bullets = this.bullets.filter((bullet) => {
      bullet.update(deltaTime); // checks bullets position, if off-screen = remove
      return bullet.active; // if active, goes back to bullets array
    }
    );
  }

  draw() {
    // Draw bullets
   this.bullets.forEach((bullet) => bullet.draw());
  }