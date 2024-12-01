export default class DamageParticle {
    constructor(damageAmount, target, camera) {
        this.damageAmount = damageAmount;
        this.target = target;
        this.x = camera.x;
        this.y = camera.y;

        this.particles = [];
    }

    generateParticle(x, y) {
        // You could add the lifespan of a particle here
        return {
            x: x,
            y: y,
            size: 60,
            velocity: Math.random(),
            angle: Math.random() * Math.PI * 2,
        };
    }

    createParticles(x, y) {
        for (let i = 0; i < 10; i++) {
            let particle = this.generateParticle(x, y);
            this.particles.push(particle);
        }
    }

    updateParticle(particle) {
        particle.x += Math.cos(particle.angle) * particle.velocity; //+ this.x;
        particle.y += Math.sin(particle.angle) * particle.velocity; //+ this.y;
        particle.size *= 0.79;
        particle.velocity *= 0.79;
        // Update the lifespan of a particle here
    }

    drawParticle(particle) {
        push();
        noStroke();
        fill(255, 0, 0, 100);
        rect(particle.x, particle.y, particle.size, particle.size);
        pop();
    }

    draw() {
        for (let particle of this.particles) {
            this.updateParticle(particle);
            this.drawParticle(particle);
            // And remove a particle here, once its lifespan is over
        }
    }
}

// cred 2 u garrit ^ :)