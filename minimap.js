export default class Minimap {
    constructor() {
        this.texture = null;

        this.x = 125;
        this.y = 4;

        this.dot = {
            x: 0,
            y: 0,
        };
    }
    load() {
        this.texture = loadImage("./assets/mapLvl3.png");
    }
    update(player) {
        let px = Math.floor( player.x/16 + 14);
        let py = Math.floor( player.y/16 + 14 );


        this.dot.x = px + this.x;
        this.dot.y = py + this.y;

        console.log(this.dot);
    }
    draw() {
        push();
        imageMode(CORNER);
        noStroke();
        image(this.texture, this.x, this.y);
        fill(255, 255, 0);
        rect(this.dot.x, this.dot.y, 1, 1);
        pop();
    }
}