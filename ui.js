export default class UI {
    constructor() {
    }
    draw(player) {
        push();
        stroke(50, 0, 0);
        fill(50, 0, 0);
        rect(5, 5, 100, 10);
        fill(255, 0, 0);
        rect(5, 5, player.hp, 10);

        text(player.hp, 30, 30);
        pop();
    }
}
