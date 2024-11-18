export default class Camera {
    constructor(x, y)  {
        this.x = x;
        this.y = y;
        this.entity = null;
    }

    attachTo(entity) {
        this.entity = entity;
    }

    update() {
        this.x = -this.entity.x + (width / 3);
        this.y = -this.entity.y + (height / 3);
    }
}