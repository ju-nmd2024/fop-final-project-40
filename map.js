import Entity from "./entities/entity.js";
import { getFramesPos, drawSprite } from "../utils.js";

export default class Map extends Entity {
    constructor() {
        super();
        this.tileSize = 16,

        this.tileMap1 = null;
        this.tileMap2 = null;
        this.tileMap2 = null;

        this.tiles1 = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 9, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
            [1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 2, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 9, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
            [1, 1, 0, 0, 0, 9, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 0],
            [1, 1, 1, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 18, 18, 11, 1, 1, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 19, 19, 17, 1, 0, 0, 0, 0, 0, 1, 5, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 14, 15, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 0],
            [1, 1, 1, 0, 0, 9, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 9, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 9, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 5, 1, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 9, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 1, 0, 0, 0, 1],
            [0, 0, 0, 1, 1, 6, 7, 7, 7, 7, 7, 7, 7, 7, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1]
        ];
    }
    load() {
        this.tileMap1 = loadImage("./assets/level1.png");
    }
    loadAnim() {
        this.frames = getFramesPos(6, 4, this.tileSize, this.tileSize);
    
        // tiles
        this.anims = {
          "grass": 0, "tree": 1, "fencetop1": 2, "fencetop2": 3, "fencetop3": 4, "fenceright": 5,
          "fencebot1": 6, "fencebot2": 7, "fencebot3": 8, "fenceleft": 9, "rooftop1": 10, "rooftop3": 11,
          "houseleft": 12, "door": 13, "wall": 14, "houseright": 15, "roofleft": 16, "roofright": 17,
          "rooftop2": 18, "roof": 19 
        };
    }
    setup() {
        this.loadAnim();
    }
    update() {
        const animData = this.anims[this.currentAnim];
        this.currentFrameData = this.setAnimFrame(animData);
    }

    
    lvl1(camera) {
        imageMode(CORNER);
        noStroke();
        push();
        translate(Math.floor(camera.x-220), Math.floor(camera.y-220));
        for (let rowIndex = 0; rowIndex < this.tiles1.length; rowIndex++) {
            
            for (let colIndex = 0; colIndex < this.tiles1[rowIndex].length; colIndex++) {

                this.tiles(this.tiles1[rowIndex][colIndex], colIndex * this.tileSize, rowIndex * this.tileSize);
            }
        }
        pop();
    }
    lvl2() {
        // draw map
    }
    lvl3() {
        // draw map
    }



    tiles(tile, x, y) {
        drawSprite(
            this.tileMap1,
            x,
            y,
            this.frames[tile].x,
            this.frames[tile].y,
            this.tileSize,
            this.tileSize,
        );
    }
}

