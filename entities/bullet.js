export default class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = Math.random()*2+3; // speed not exact to prevent repeating pattern of gun tracer
        this.spriteRef = null;

        this.load();
    }
    load() {
        this.spriteRef = loadImage('./assets/bullet.png');
    }
    update(zombies, bullets) {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        for (let zombie of zombies) {
            if (dist(zombie.x, zombie.y, this.x, this.y) < zombie.size) {
                zombies.splice(zombies.indexOf(zombie), 1);
                bullets.splice(bullets.indexOf(this), 1);
            }
        }
    }
    draw(camera) {
        imageMode(CENTER);
        push();
        translate(this.x + camera.x, this.y + camera.y); // move spawn location with player
        rotate(this.angle+radians(90)); // rotate before moving to player location
        image(this.spriteRef, 6.667, -8, 3, 3); // spawn on tip of gun to rotate correctly
        pop();
    }
}