export default class Menu {
    constructor(menuBackgroundImg, menuLogoImg, menuStartImg, alpha) {
        menuBackgroundImg = null;
        menuLogoImg = null;
        menuStartImg = null;
        alpha = 100;
    }

    load() {
        this.menuBackgroundImg = loadImage("./assets/background.png");
        this.menuLogoImg = loadImage("./assets/logo.png");
        this.menuStartImg = loadImage("./assets/startbutton.png");
    }

    update() {}

    draw() {
        clear();
        image(this.menuBackgroundImg, 0, 0);
        image(this.menuLogoImg, 20, 20);
        tint(255, this.alpha);
        image(this.menuStartImg, 50, 60);
        noTint();
    }
}
