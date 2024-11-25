export default class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = Math.random()*2+4;
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
        push();
        ellipse(this.x + camera.x, this.y + camera.y, 5);
        pop();
    }
}