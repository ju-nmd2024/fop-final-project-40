import Camera from "./entities/camera.js";
import Player from "./entities/player.js";

export function makeLevel1(setScene) {
    return {
        camera: new Camera(100, 0),
        player: new Player(0, 0),
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
            this.player.draw(this.camera);
        },
    };
}