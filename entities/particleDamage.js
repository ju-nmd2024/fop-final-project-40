export default class DamageParticle {
    constructor(camera, damageAmount, target) {
        this.x = target.x + camera.x;
        this.y = target.y + camera.y;
        this.damageAmount = damageAmount;
        this.target = target;
        this.particles = [];

        this.setup();
    }
    setup() {
        for (let i = 0; i < 20; i++) {
            let particle = generateParticle(this.x, this.y);
            this.particles.push(particle);
        }
    }
    drawParticle(particle) {
        push();
        rectMode(CENTER);
        noStroke();
        fill(255, 0, 0);
        rect(this.x, this.y, 200, 200);
        pop();
        console.log("particle " + this.x);
    }
    update(particle) {
        particle.x += Math.cos(particle.angle) * particle.velocity;
        particle.y += Math.sin(particle.angle) * particle.velocity;
        this.velocity *= 0.99;
        for (let i = 0; i < 10; i++) {
            this.target.tint = '#ff6464';
            console.log(this.target.x);
        }
    }
    draw() {
        for (let particle of this.particles) {
            this.update(particle);
            this.drawParticle(particle);
        }
    }
}
function generateParticle(x, y) {
    return {
        x: x,
        y: y,
        velocity: 0.6,
        angle: Math.random() * Math.PI * 2,
    };
}