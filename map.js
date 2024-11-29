import Entity from "./entities/entity.js";

export default class Map extends Entity {
    constructor() {
        this.tileMap1 = null;
        this.tileMap2 = null;
        this.tileMap2 = null;
    }
    load() {
        this.tileMap1 = loadImage("./assets/player.png");
    }
    loadAnim() {
        this.frames = getFramesPos(6, 4, this.width, this.height);
    
        // tiles
        this.anims = {
          "grass": 0, "tree": 1, "fencetop1": 2, "fencetop2": 3, "fencetop3": 4, "fenceright": 5,
          "fencebot1": 6, "fencebot2": 7, "fencebot3": 8, "fenceleft": 9, "rooftop1": 10, "rooftop3": 11,
          "houseleft": 12, "door": 13, "wall": 14, "houseright": 15, "roofleft": 16, "roofright": 17,
          "rooftop2": 18, "roof": 19 
        };
    }
    update() {
        const animData = this.anims[this.currentAnim];
        this.currentFrameData = this.setAnimFrame(animData);
    }

 

    
    lvl1() {
        // draw map
    }
    lvl2() {
        // draw map
    }
    lvl3() {
        // draw map
    }
}