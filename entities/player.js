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
        this.spriteR = Math.atan2((108/2), (192/2));
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

        //angleMode(DEGREES);
        rotate(this.spriteR);
        drawSprite(
            this.spriteRef,
            this.viewportX + this.spriteX,
            this.viewportY + this.spriteY,
            this.width,
            this.height
        );
        drawSprite(
            this.itemRef,
            this.viewportX + this.spriteX,
            this.viewportY + this.spriteY,
            this.width,
            this.height
        );
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