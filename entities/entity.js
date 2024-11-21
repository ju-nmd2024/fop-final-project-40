export default class Entity {
    constructor() {
        this.spriteRef = null; // holds sprite image
        this.itemRef = null; // holds item sprite image
        this.anims = {}; // animation data
        this.currentAnim = null; // which generated animation is currently active
        this.currentFrame = 0, // which frame of the animation we're on
        this.currentFrameData = null; // where in the sprite sheet the frame is at
        this.animationTimer = 0; // to know when to switch frame
        //this.previousTime = 0;
        this.width = 16; // entity size
        this.height = 16; // entity size
        this.frames = [];
    }
    setAnim(name) {
        if (this.currentAnim !== name) { // if animation isnt already active
            this.currentAnim = name; // set animation
            this.currentFrame = 0; // start at first frame
            this.animationTimer = 0; // reset timer
            //this.previousTime = 0; // reset timer
        }
    }

    setAnimFrame(animData) {
        // if the animation only contains a single frame then just view that one frame
        if (typeof animData === "number") { 
            this.currentFrame = animData;
            return this.frames[this.currentFrame];
        }

        // if animation hasn't started
        if (this.currentFrame === 0) {
            this.currentFrame = animData.from;
        }

        // if animation is done and should loop
        if (this.currentFrame > animData.to && animData.loop) {
            this.currentFrame = animData.from;
        }
        
        const currentFrameData = this.frames[this.currentFrame];

        // make animation go through frames at constant speed
        const durationPerFrame = 1000 / animData.speed;
        if (this.animationTimer >= durationPerFrame) {
            this.currentFrame++; // next frame
            this.animationTimer -= durationPerFrame; //reset timer
        }

        return currentFrameData;
    }
}