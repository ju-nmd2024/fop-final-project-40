export default class UI {
    constructor() {
        this.maxHP = 100;
        this.maxShield = 100;
    }
    setup(player) {
    }
    draw(player, gun, zombies) {
        ammoUI(gun);
        healthBar(this.maxHP, player);
        if (player.shield > 0) {
            shieldBar(this.maxShield, player);
        }


        if (zombies.length <= 3) {
            push();
            stroke(0);
            strokeWeight(2);
            fill(255);
            textAlign(CENTER);
            textSize(7);
            textStyle(BOLD);
            text(zombies.length + " ZOMBIES LEFT!", 192/2, 108-5);
            pop();
        }
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
    // background
    stroke(31, 32, 40); 
    fill(31, 32, 40);
    rect(3, 11, maxShield / 1.8, 5);
    // bar
    fill(164, 175, 208);
    rect(3, 11, player.shield / 1.8, 5);
    // text
    textSize(5);
    strokeWeight(1.8);
    text(player.shield, 61, 15.3);
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