export default class Player {
    constructor(x, y) {
        this.spriteRef = null;
        this.itemRef = null;
        this.width = 16;
        this.height = 16;

        this.speed = 100;
        this.x = 0;
        this.y = 0;
        this.viewportX = 0;
        this.viewportY = 0; 
        this.spriteX = 0;
        this.spriteY = 0;
        this.spriteR = 0;
        this.spriteRSmooth = 0;
    }
    load() {
        this.spriteRef = loadImage('./assets/player.png');
        this.itemRef = loadImage('./assets/gun.png');
    }

    loadAnim() {
        // room for adding animation
    }

    movePlayer(moveBy) {
        if (keyIsDown(68)) {
            this.x += moveBy;
        }
        if (keyIsDown(65)) {
            this.x -= moveBy;
        }
        if (keyIsDown(87)) {
            this.y -= moveBy;
        }
        if (keyIsDown(83)) {
            this.y += moveBy;
        }
    }

    setup() {
        this.loadAnim();
        // not needed atm
    }

    update() {
        // could be used for animations

        const moveBy = (this.speed / 1000) * deltaTime;
        this.movePlayer(moveBy);
    }

    draw(camera) {
        imageMode(CENTER);
        push();
        translate(192/2, 108/2);
        
        push();

        // rotation code inspired by https://discourse.processing.org/t/rotation-based-on-mouse/1766

        this.spriteRSmooth = lerp(this.spriteRSmooth, this.spriteR, 0.2);
        rotate(this.spriteRSmooth)
        drawSprite(
            this.spriteRef,
            this.viewportX + this.spriteX,
            this.viewportY + this.spriteY,
            this.width,
            this.height
        );
        pop();

        push();
        // this takes half of width & height and multiplies it by the upscale of our window (then lastly fixes the rotation offset)
        this.spriteR = (Math.atan2(window.mouseY-(108/2)*4, window.mouseX-(192/2)*4)+ radians(90));
        rotate(this.spriteR);
        drawSprite(
            this.itemRef,
            this.viewportX + this.spriteX,
            this.viewportY + this.spriteY,
            this.width,
            this.height
        );
        pop();

        pop();

        push();
        //this.viewportX = (this.x + camera.x);
        //this.viewportY = (this.y + camera.y);
        pop();
    }
}

function drawSprite(
    src,
    destinationX,
    destinationY,
    width,
    height
) {
   image(
    src,
    destinationX,
    destinationY,
    width,
    height
   );
}
window.drawSprite = drawSprite;