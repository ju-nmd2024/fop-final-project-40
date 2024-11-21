import Camera from "./entities/camera.js";
import Player from "./entities/player.js";



export function makeLevel1(setScene) {
    const camera = new Camera(0, 0);
    const player = new Player(0, 0);
    return {
        camera: camera,
        player: player,
        load() {
            this.player.load();
        },
        setup() {
            this.player.setup();
            this.camera.attachTo(this.player);
        },
        update() {
            this.player.update();
            this.camera.update();
        },
        draw() {
            clear();
            background(0);
            rect(0 + this.camera.x, 0 + this.camera.y, 50, 50);
            this.player.draw(this.camera);
        },
    };
}