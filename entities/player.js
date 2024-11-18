export default class Player {
    constructor(x, y) {
        this.spriteRef = null;
        this.width = 16;
        this.height = 16;

        this.speed = 200;
        this.x = x;
        this.y = y;
        this.viewportX = x;
        this.viewportY = y;
        this.spriteX = 0;
        this.spriteY = 0;
    }

    load() {
        this.spriteRef = loadImage('./assets/player.png');
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
        this.viewportX = this.x + camera.x;
        this.viewportY = this.y + camera.y;

        drawSprite(
            this.spriteRef,
            this.viewportX + this.spriteX,
            this.viewportY + this.spriteY,
            this.width,
            this.height
        );
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