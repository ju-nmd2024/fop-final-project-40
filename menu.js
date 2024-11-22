export function makeMenu() {
    return {
        menuBackgroundImg: null,
        menuLogoImg: null,
        menuStartImg: null,
        alpha: 200,
        load() {
            this.menuBackgroundImg = loadImage("./assets/background.png");
            this.menuLogoImg = loadImage("./assets/logo.png");
            this.menuStartImg = loadImage("./assets/startbutton.png");
        },
    
        // update should fade the start button when its pressed, dont know how thoo
        //update() {},
    
        draw() {
            clear();
            image(this.menuBackgroundImg, 0, 0);
            image(this.menuLogoImg, 0, 0);
            tint(255, this.alpha);
            image(this.menuStartImg, 0, 0);
            noTint();
        }
    };
}