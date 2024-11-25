import Camera from "./entities/camera.js";
import Player from "./entities/player.js";
import Gun from "./entities/gun.js";
import Zombie from "./entities/zombie.js";



export function makeLevel1(setScene) {
    const camera = new Camera(0, 0);
    const player = new Player(0, 0);
    const gun = new Gun(0, 0);
    const zombie = new Zombie(0, 0);
    return {
        camera: camera,
        player: player,
        gun: gun,
        zombie: zombie,
        load() {
            this.gun.load();
            this.player.load();
            this.zombie.load();
        },
        setup() {
            this.player.setup();
            this.gun.setup();
            this.camera.attachTo(this.player);
            this.zombie.setup();
        },
        update() {
            this.player.update();
            this.gun.update();
            this.camera.update();
        },
        draw() {
            clear();
            background(0);
            rect(0 + this.camera.x, 0 + this.camera.y, 50, 50);
            this.player.draw(this.camera);
            this.gun.draw(this.camera);
            this.zombie.draw(this.player, this.camera);
        },
    };
}