export default class UI {
    constructor() {
        this.maxHP = null;
        this.maxShield = null;
    }
    setup(player) {
        this.maxHP = player.hp;
        this.maxShield = 100;
    }
    draw(player, gun) {
        ammoUI(gun);
        healthBar(this.maxHP, player);
        shieldBar(this.maxShield, player);
    }
}

function healthBar(maxHP, player) {
    push();
    // background
    stroke(50, 0, 0); 
    fill(50, 0, 0);
    rect(3, 3, maxHP / 1.8, 5);
    // bar
    fill(255, 0, 0);
    rect(3, 3, player.hp / 1.8, 5);
    // text
    textSize(5);
    strokeWeight(1.8);
    text(player.hp, 61, 7.3);
    pop();
}

function shieldBar(maxShield, player) {
    push();
    translate(0, 7);
    // background
    stroke(0, 0, 50); 
    fill(0, 0, 50);
    rect(3, 3, maxShield / 1.8, 5);
    // bar
    fill(0, 0, 255);
    rect(3, 3, player.shield / 1.8, 5);
    // text
    textSize(5);
    strokeWeight(1.8);
    text(player.shield, 61, 7.3);
    pop();
}

function ammoUI(gun) {
    push();
    stroke(55, 20, 0);
    strokeWeight(2);
    fill(255, 220, 0);
    // magazine
    textSize(5);
    text("|  " + (gun.magCount * gun.maxAmmo), 174, 97);
    // ammo
    textSize(10);
    textAlign(RIGHT, BASELINE);
    text(gun.ammoCount, 172, 100);

    pop();
}