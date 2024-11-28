import Camera from "./entities/camera.js";
import Player from "./entities/player.js";
import Gun from "./entities/gun.js";
import Zombie from "./entities/zombie.js";
import DamageParticle from "./entities/particleDamage.js";

import Bandage from "./entities/bandage.js";

import UI from "./ui.js";

export function makeLevel1(setScene) {
  const camera = new Camera(0, 0);
  const player = new Player(0, 0);
  const gun = new Gun(0, 0);
  const ui = new UI();
  const zombies = [];
  const bullets = [];
  const bandages = [];
  return {
    camera: camera,
    player: player,
    gun: gun,
    ui: ui,
    zombies: zombies,
    bullets: bullets,
    bandages: bandages,
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
        this.zombies.push(new Zombie());
      }
      // creates bandages
      for (let i = 0; i < 1; i++) {
        this.bandages.push(new Bandage(20 + this.camera.x, 30 + this.camera.y));
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

      for (let zombie of this.zombies) {
        zombie.update(this.player);
      }
      for (let bullet of this.bullets) {
        bullet.update(this.zombies, this.bullets, this.player, this.camera);
      }

      if (frameCount % 12 === 0) {
        this.player.damageBy(this.zombies);
      }

     

      

      // zombie movement
      for (let i = 0; i < this.zombies.length; i++) {
        let zombie = this.zombies[i];
        // get direction from zombie to player
        let dx = this.player.x - zombie.x;
        let dy = this.player.y - zombie.y;
        let angle = atan2(dy, dx);

        // move zombie in that direction unless already next to player
        if (
          dist(this.player.x, this.player.y, zombie.x, zombie.y) <
          zombie.size + 1
        ) {
        } else {
          zombie.x += cos(angle) * zombie.speed;
          zombie.y += sin(angle) * zombie.speed;
        }

        // to make sure the zombies do not stack up if player moves
        // creating a repel system
        for (let j = 0; j < this.zombies.length; j++) {
          if (i !== j) {
            let other = this.zombies[j];
            let distance = dist(zombie.x, zombie.y, other.x, other.y);

            if (distance < zombie.size) {
              let repelAngle = atan2(zombie.y - other.y, zombie.x - other.x);
              zombie.x += cos(repelAngle) * 0.5; // the amount of repelling (x)
              zombie.y += sin(repelAngle) * 0.5; // the amount of repelling (y)
            }
          }
        }
      }

      // push player
      this.player.pushedBy(this.zombies);
    },

    draw() {
      clear();
      background(0);
      rect(0 + this.camera.x, 0 + this.camera.y, 50, 50);
      for (let bandage of this.bandages) {
        bandage.draw(this.camera);
      }
      this.player.draw(this.camera);
      this.gun.draw(this.camera);
      for (let bullet of this.bullets) {
        bullet.draw(this.camera, this.zombies);
      }
      for (let zombie of this.zombies) {
        zombie.draw(this.camera, this.player);
      }

      this.ui.draw(this.player, this.gun);
    },
  };
}
