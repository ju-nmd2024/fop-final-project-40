export default class LoseScreen {
    constructor(){
       this.deathMessage = null;
       this.restart = false;
    }

    load(){
        this.deathMessage = loadImage("./assets/youdied.png");
    }


    update(){
        if(mouseIsPressed && window.mouseX > (192/2 - 45/2) *6 && window.mouseX < (192/2 + 45/2) *6 && 
        window.mouseY > (108/2+10 - 15/2) *6 && window.mouseY < (108/2+10 + 15/2)*6){
            this.restart = true;
        }

    }
   
    draw() {
        push();
        background(0, 150);
        imageMode(CORNER);
        image(this.deathMessage, 0, 0);
        pop();
    }
}



