export default class loseScreen {
    constructor(){
        this.loseScreenBackgroundImg = null;
        this.loseScreenLogoImg = null;
        this.loseScreenStartImg = null;
        this.start = false;
       
    }

    load(){
        
    }

    update(setScene, player){

// connected with the players health

        if(player.hp === 0){
            this.start = true;
            
        }
    }

    draw(){
        
    }
}