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
        background(0,100);
        rectMode(CENTER);
        stroke("#b8b8b8");
        fill("#741f2d");
        rect(192/2 ,108/2 , 90 ,50);
        pop();

        push();
        imageMode(CENTER);
        image(this.deathMessage, 192/2, 108/2 - 15, 45, 15);
        pop();

        push();
        rectMode(CENTER);
        stroke("#9b9b9b");
        fill("#50171f");
        rect(192/2, 108/2 + 10, 45, 15);
        pop();

    }
}



