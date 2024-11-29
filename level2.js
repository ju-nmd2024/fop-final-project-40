import Camera from "./entities/camera.js";
import Player from "./entities/player.js";
import Gun from "./entities/gun.js";
import Zombielvl2 from "./entities/zombielvl2.js";
import DamageParticle from "./entities/particleDamage.js";

import Bandage from "./entities/bandage.js";
import Ammo from "./entities/ammoBox.js";

import UI from "./ui.js";

export function makeLevel2(setScene) {
  const camera = new Camera(0, 0);
  const player = new Player(0, 0)
  const gun = new Gun(0, 0);
  const zombieslvl2 = [];

  const bullets = [];
  const bandages = [];
  const ammoBoxes = [];

  const ui = new UI();
  return {
    camera: camera,
    player: player,
    gun: gun,
    zombieslvl2: zombieslvl2,

    bullets: bullets,
    bandages: bandages,
    ammoBoxes: ammoBoxes,

    ui: ui,
    load() {
      this.gun.load();
      this.player.load();
    },
    setup() {
      this.player.setup();
      this.gun.setup();
      this.camera.attachTo(this.player);
      // creates zombies

      for (let i = 0; i < 1; i++) {
        this.zombieslvl2.push(new Zombielvl2());
      }
      // creates bandages
      for (let i = 0; i < 3; i++) {
        this.bandages.push(new Bandage((Math.random()*200-100) + this.camera.x, (Math.random()*200-100) + this.camera.y));
      }
      // creates ammo boxes
      for (let i = 0; i < 3; i++) {
        this.ammoBoxes.push(new Ammo((Math.random()*200-100) + this.camera.x, (Math.random()*200-100) + this.camera.y));
      }
      ui.setup(this.player);
    },

    update() {
      this.player.update();
      this.gun.update(this.bullets, this.player);
      this.camera.update();

      for (let bandage of this.bandages) {
        bandage.update();
        bandage.collisionWith(this.player, this.bandages, this.ui);
      }
      for (let ammoBox of this.ammoBoxes) {
        ammoBox.update();
        ammoBox.collisionWith(this.player, this.gun, this.ammoBoxes, this.ui);
      }

      for (let zombielvl2 of this.zombieslvl2) {
        zombielvl2.update(this.player);
      }
      for (let bullet of this.bullets) {
        bullet.update(this.zombieslvl2, this.bullets, this.player, this.camera);
      }

      if (frameCount % 12 === 0) {
        this.player.damageBy(this.zombieslvl2);
      }

     

      

      // zombie movement
      for (let i = 0; i < this.zombieslvl2.length; i++) {
        let zombielvl2 = this.zombieslvl2[i];
        // get direction from zombie to player
        let dx = this.player.x - zombielvl2.x;
        let dy = this.player.y - zombielvl2.y;
        let angle = atan2(dy, dx);

        // move zombie in that direction unless already next to player
        if (
          dist(this.player.x, this.player.y, zombielvl2.x, zombielvl2.y) <
          zombielvl2.size + 1
        ) {
        } else {
          zombielvl2.x += cos(angle) * zombielvl2.speed;
          zombielvl2.y += sin(angle) * zombielvl2.speed;
        }

        // to make sure the zombies do not stack up if player moves
        // creating a repel system
        for (let j = 0; j < this.zombieslvl2.length; j++) {
          if (i !== j) {
            let other = this.zombieslvl2[j];
            let distance = dist(zombielvl2.x, zombielvl2.y, other.x, other.y);

            if (distance < zombielvl2.size) {
              let repelAngle = atan2(zombielvl2.y - other.y, zombielvl2.x - other.x);
              zombielvl2.x += cos(repelAngle) * 0.5; // the amount of repelling (x)
              zombielvl2.y += sin(repelAngle) * 0.5; // the amount of repelling (y)
            }
          }
        }
      }

      // push player
      this.player.pushedBy(this.zombieslvl2);
    },

    draw() {
      clear();
      background(0);
      push();
      fill(200);
      rect(0 + this.camera.x, 0 + this.camera.y, 50, 50);
      pop();
      for (let bandage of this.bandages) {
        bandage.draw(this.camera);
      }
      for (let ammoBox of this.ammoBoxes) {
        ammoBox.draw(this.camera);
      }
      this.player.draw(this.camera);
      this.gun.draw(this.camera);
      for (let bullet of this.bullets) {
        bullet.draw(this.camera, this.zombieslvl2);
      }
      for (let zombielvl2 of this.zombieslvl2) {
        zombielvl2.draw(this.camera, this.player);
      }

      this.ui.draw(this.player, this.gun);
    },
  };
}
