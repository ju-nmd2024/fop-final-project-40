export default class UI {
    constructor() {
        this.maxHP = null;
        this.maxAmmo = null;
    }
    setup(player, ammoBoxes) {
        this.maxHP = player.hp;
        this.maxAmmo = ammoBoxes;
    }
    draw(player, ammoBoxes) {
        ammoUI(this.maxAmmo, ammoBoxes);
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

function ammoUI(){
    push();


    pop();
    

}