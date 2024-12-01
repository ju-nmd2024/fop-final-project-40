import Camera from "./entities/camera.js";
import Player from "./entities/player.js";
import Gun from "./entities/gun.js";
import Zombie from "./entities/zombie.js";
import DamageParticle from "./entities/particleDamage.js";

import Bandage from "./entities/bandage.js";
import Ammo from "./entities/ammoBox.js";

import Map from "./map.js";
import UI from "./ui.js";

export function makeLevel1(setScene) {
  const camera = new Camera(0, 0);
  const player = new Player(0, 0);
  const gun = new Gun(0, 0);
  const zombies = [];

  const bullets = [];
  const bandages = [];
  const ammoBoxes = [];

  const map = new Map();
  const ui = new UI();
  return {
    camera: camera,
    player: player,
    gun: gun,
    zombies: zombies,

    bullets: bullets,
    bandages: bandages,
    ammoBoxes: ammoBoxes,

    map: map,
    ui: ui,
    load() {
      this.map.load();
      this.gun.load();
      this.player.load();
    },
    setup() {
      this.map.setup();
      this.player.setup();
      this.gun.setup();
      this.camera.attachTo(this.player);
      // creates zombies
      for (let l = 0; l < 5;) { // ensures they only spawn on walkable tiles
        let x = Math.floor((Math.random()*550)/16);
        let y = Math.floor((Math.random()*350)/16);
        if (this.map.tiles1[y][x] < 5) {
          x = Math.floor((x*16-220)+4);
          y = Math.floor((y*16-220)+4);
          this.zombies.push(new Zombie(x, y));
          l++;
        }
      }
      // creates bandages
      for (let l = 0; l < 1;) { // ensures they only spawn on walkable tiles
        let x = Math.floor((Math.random()*550)/16);
        let y = Math.floor((Math.random()*350)/16);
        if (this.map.tiles1[y][x] < 5) {
          x = Math.floor((x*16-220)+4);
          y = Math.floor((y*16-220)+4);
          this.bandages.push(new Bandage(x, y));
          l++;
        }
      }
      // creates ammo boxes
      for (let l = 0; l < 2;) { // ensures they only spawn on walkable tiles
        let x = Math.floor((Math.random()*550)/16);
        let y = Math.floor((Math.random()*350)/16);
        if (this.map.tiles1[y][x] < 5) {
          x = Math.floor((x*16-220)+4);
          y = Math.floor((y*16-220)+4);
          this.ammoBoxes.push(new Ammo(x, y));
          l++;
        }
      }
      ui.setup(this.player);
    },

    update() {
      this.player.update(this.map);
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
      this.map.lvl1(this.camera);
      push();
      for (let bandage of this.bandages) {
        bandage.draw(this.camera);
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

      this.ui.draw(this.player, this.gun);
    },
  };
}
