export default class BossFinder {
    constructor(angle) {
        this.angle = angle;
        this.x = 0;
        this.y = -20;
    }
    draw() {
        push();
        fill(255,0,0);
        translate(192/2, 108/2);
        rotate(this.angle);
        ellipse(0, -20, 4);
        pop();
    }
}