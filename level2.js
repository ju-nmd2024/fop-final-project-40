import LoseScreen from "./loseScreen.js";

import Camera from "./entities/camera.js";
import Player from "./entities/player.js";
import Gun from "./entities/gun.js";
import Zombie from "./entities/zombie.js";
import DamageParticle from "./entities/particleDamage.js";

import Bandage from "./entities/bandage.js";
import Ammo from "./entities/ammoBox.js";
import Shield from "./entities/shield.js";


import Map from "./map.js";
import UI from "./ui.js";

let particles = [];

export function makeLevel2(setScene) {
    const loseScreen = new LoseScreen();
    const camera = new Camera(0, 0); 
    const player = new Player(0, 0);
    const gun = new Gun(0, 0);
    const zombies = [];

    const bullets = [];
    const bandages = [];
    const shields = [];
    const ammoBoxes = [];

    const map = new Map();
    const ui = new UI();
    return {
        loseScreen: loseScreen,
        camera: camera,
        player: player,
        gun: gun,
        zombies: zombies,

        bullets: bullets,
        bandages: bandages,
        shields: shields,
        ammoBoxes: ammoBoxes,

        map: map,
        ui: ui,
        load() {
            this.map.load();
            this.gun.load();
            this.player.load();
            this.loseScreen.load();
        },
        setup() {

            this.player.hp = 100;
            this.player.shield = 0;
            this.player.x = -95;
            this.player.y = 420;
            this.gun.magCount = 1;
            this.gun.ammoCount = 20;

            this.zombies = [];
            this.bandages = [];
            this.ammoBoxes = [];

            this.map.setup();
            this.player.setup();
            this.gun.setup();
            this.camera.attachTo(this.player);

           


            // creates zombies
            for (let l = 0; l < 30;) { // ensures they only spawn on walkable tiles
                let x = Math.floor((Math.random() * 300) / 16);
                let y = Math.floor((Math.random() * 546 + 48) / 16);
                if (this.map.tiles2[y][x] < 6) {
                    x = Math.floor(x * 16 - 220);
                    y = Math.floor(y * 16 - 220);
                    this.zombies.push(new Zombie(x, y, 20, 14));
                    l++;
                }
            }
            // creates bandages
            for (let l = 0; l < 2;) { // ensures they only spawn on walkable tiles
                let x = Math.floor((Math.random() * 300 ) / 16);
                let y = Math.floor((Math.random() * 480 + 48) / 16);
                if (this.map.tiles2[y][x] < 6) {
                    x = Math.floor((x * 16 - 220) + 4);
                    y = Math.floor((y * 16 - 220) + 4);
                    this.bandages.push(new Bandage(x, y));
                    l++;
                }
            }

            // creates shields rn its a bandage
            for (let l = 0; l < 1;) { // ensures they only spawn on walkable tiles
                let x = Math.floor((Math.random() * 300) / 16);
                let y = Math.floor(620 / 16);
                if (this.map.tiles2[y][x] < 6) {
                    x = Math.floor((x * 16 - 220) + 4);
                    y = Math.floor((y * 16 - 220) + 4);
                    this.shields.push(new Shield(x, y));
                    l++;
                }
            }

            // creates ammo boxes
            for (let l = 0; l < 10;) { // ensures they only spawn on walkable tiles
                let x = Math.floor((Math.random() * 300) / 16);
                let y = Math.floor((Math.random() * 480 + 48) / 16);
                if (this.map.tiles2[y][x] < 6) {
                    x = Math.floor((x * 16 - 220) + 4);
                    y = Math.floor((y * 16 - 220) + 4);
                    this.ammoBoxes.push(new Ammo(x, y));
                    l++;
                }
            }
            ui.setup(this.player);

            

        },

        update() {
            this.player.update(this.map.tiles2, this.gun);
            this.gun.update(this.bullets, this.player);
            this.camera.update();
            this.loseScreen.update(this.player);

            for (let bandage of this.bandages) {
                bandage.update();
                bandage.collisionWith(this.player, this.bandages, this.ui);
            }
            for (let shield of this.shields) {
                shield.update();
                shield.collisionWith(this.player, this.shields, this.ui);
            }
             // spawn over time
             if (frameCount % 1000 === 0) {
                for (let l = 0; l < 1;) { 
                    let x = Math.floor((Math.random() * 550) / 16);
                    let y = Math.floor((Math.random() * 350) / 16);
                    if (this.map.tiles2[y][x] < 5) {
                        x = Math.floor((x * 16 - 220) + 4);
                        y = Math.floor((y * 16 - 220) + 4);
                        this.ammoBoxes.push(new Ammo(x, y));
                        l++;
                    }
                }
            }
            for (let ammoBox of this.ammoBoxes) {
                ammoBox.update();
                ammoBox.collisionWith(this.player, this.gun, this.ammoBoxes, this.ui);
            }

            for (let zombie of this.zombies) {
                zombie.update(this.player);
            }
            for (let bullet of this.bullets) {
                bullet.update(this.zombies, this.bullets, this.player, this.camera, this.map.tiles2);
            }

            if (frameCount % 24 === 0) {
                this.player.damageBy(this.zombies);
            }

            // zombie death
            for (let zombie of this.zombies) {
                for (let bullet of this.bullets) {
                    if (dist(zombie.x, zombie.y, bullet.x, bullet.y) < zombie.size / 2) {
                        createParticles(-2, zombie.x, zombie.y, this.camera, zombie);
                        zombie.hp -= 2;
                        this.bullets.splice(this.bullets.indexOf(bullet), 1);
                    }
                    if (zombie.hp <= 0) {
                        this.zombies.splice(this.zombies.indexOf(zombie), 1);
                    }
                }
            }

            // zombie movement
            for (let i = 0; i < this.zombies.length; i++) {
                let zombie = this.zombies[i];
                // get direction from zombie to player
                let dx = this.player.x - zombie.x;
                let dy = this.player.y - zombie.y;
                let angle = atan2(dy, dx);

                zombie.Collide = false;
                for(let otherZombie of this.zombies){
                    if (zombie !== otherZombie) {
                        if(dist(zombie.x + cos(angle)*2, zombie.y + sin(angle)*2, otherZombie.x, otherZombie.y) < zombie.size){
                            zombie.Collide = true;
                        }
                    }
                }

                // move zombie in that direction unless already next to player
                if (
                    dist(this.player.x, this.player.y, zombie.x, zombie.y) < zombie.size + 1 ||
                    dist(this.player.x, this.player.y, zombie.x, zombie.y) > zombie.activationRange || zombie.Collide) {
                } else {

                    let moveX = cos(angle) * zombie.speed;
                    let moveY = sin(angle) * zombie.speed;

                    for (let vec of zombie.points) {
                        let nextMove = {
                            x: zombie.x + moveX + vec.x,
                            y: zombie.y + moveY + vec.y,
                        };

                        let x = Math.floor((zombie.x + 220) / 16);
                        let y = Math.floor((zombie.y + 220) / 16);
                        let a = Math.floor((nextMove.x + 220) / 16);
                        let b = Math.floor((nextMove.y + 220) / 16);

                        if (this.map.tiles2[b][x] > 5) {
                            moveY *= -1.2;
                        }

                        if (this.map.tiles2[y][a] > 5) {
                            moveX *= -1.2;
                        }
                    }
                    zombie.x += moveX;
                    zombie.y += moveY;
                }

                let collisionPoints = [];
                for (let vec of zombie.points) {
                    let x = Math.floor((zombie.x+vec.x + 220) / 16);
                    let y = Math.floor((zombie.y+vec.y + 220) / 16);
        
                    if (this.map.tiles2[y][x] > 5) {
                        collisionPoints.push({x: vec.x, y: vec.y});
                    }
                }
                
                let direction = {x: 0, y: 0};
                for (let colVec of collisionPoints) {
                    direction.x += colVec.x;
                    direction.y += colVec.y;
                }
        
                zombie.x -= direction.x*0.05;
                zombie.y -= direction.y*0.05;

                // to make sure the zombies do not stack up if player moves
                // creating a repel system
                for (let j = 0; j < this.zombies.length; j++) {
                    if (i !== j) {
                        let other = this.zombies[j];
                        let distance = dist(zombie.x, zombie.y, other.x, other.y);

                        if (distance < zombie.size) {
                            let repelAngle = atan2(zombie.y - other.y, zombie.x - other.x);
                            zombie.x += cos(repelAngle) * 2; // the amount of repelling (x)
                            zombie.y += sin(repelAngle) * 2; // the amount of repelling (y)
                        }
                    }
                }
            }

            // push player
            this.player.pushedBy(this.zombies);


            if (this.zombies.length === 0) {
                setScene("level2");
            }
        },

        draw(currentScene) {
            this.map.draw(this.map.tiles2, this.camera, this.map.tileMap2);
            push();
            for (let bandage of this.bandages) {
                bandage.draw(this.camera);
            }
            for (let shield of this.shields) {
                shield.draw(this.camera);
            }
            for (let ammoBox of this.ammoBoxes) {
                ammoBox.draw(this.camera);
            }
            this.player.draw(this.camera);
            this.gun.draw(this.camera);
            for (let bullet of this.bullets) {
                bullet.draw(this.camera, this.zombies);
            }
            for (let zombie of this.zombies) {
                zombie.draw(this.camera, this.player);
            }
            for (let particle of particles) {
                particle.update();
                particle.draw();

                if (particle.isDead()) {
                    let particleIndex = particles.indexOf(particle);
                    particle.target.tint = 255;
                    //particles.splice(particleIndex, 1);
                }
            }

            this.ui.draw(this.player, this.gun);

            if (this.player.hp === 0) {
                this.loseScreen.draw(currentScene);
            }
        },
    };
}

function createParticles(damageAmount, x, y, camera, target) {
    for (let i = 0; i < 10; i++) {
        let particleZ = new DamageParticle(damageAmount, x, y, camera, target);
        particles.push(particleZ);
    }
}
