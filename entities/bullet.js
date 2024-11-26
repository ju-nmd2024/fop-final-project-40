export default class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = Math.random()*2+3;
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
        translate(this.x + camera.x, this.y + camera.y);
        image(this.spriteRef, 0, 0, 3, 3);
        pop();
    }
}