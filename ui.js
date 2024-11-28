export default class UI {
    constructor() {
        this.maxHP = null;
    }
    setup(player) {
        this.maxHP = player.hp;
    }
    draw(player, gun) {
        ammoUI(gun);
        healthBar(this.maxHP, player);
    }
}

function healthBar(maxHP, player) {
    push();
    // background
    stroke(50, 0, 0);
    fill(50, 0, 0);
    rect(3, 3, maxHP/1.8, 5);
    // bar
    fill(255, 0, 0);
    rect(3, 3, player.hp/1.8, 5);
    // text
    textSize(5);
    strokeWeight(1.8);
    text(player.hp, 61, 7.3);
    pop();
}

function ammoUI(gun){
    push();
    textAlign(RIGHT, BASELINE);
    stroke(55, 20, 0);
    strokeWeight(2);
    fill(255, 220, 0);
    // ammo
    textSize(10);
    text(gun.ammoCount, 184, 100);
    // magazine
    textSize(5);
    text(gun.magCount + " /", 172, 100);

    pop();
}