class Movement{

    constructor(width, height){

        this.jump = false;
        this.ecartSaut = 1;
        this.vitesse = 0;
        this.movable = true;
        this.nbFrameJump = 60;
        this.nbPixelJump = 150;
        this.accelerateDown = 1
        this.gravity = 0;
        this.arrayJump = []

    }

    arrowReset(){
        if(this.arrowLeft){
            this.arrowLeft = false;
        }
        if(this.arrowUp){
            this.arrowUp = false;
        }
        if(this.arrowRight){
            this.arrowRight = false;
        }
    }

    jumpInit(){
        let arrayValues = [];
        this.arrayJump = []
        for(let i = 1; i<=this.nbFrameJump; i++){
            let multiple = 1/this.nbFrameJump*i;
            let value = this.jumpCalcul(multiple)*this.nbPixelJump;
            if(arrayValues.length == 0){
                this.arrayJump.push(0-value)
                arrayValues.push(value);
            }
            else{
                this.arrayJump.push(arrayValues[arrayValues.length-1]-value);
                arrayValues.push(value)
            }
        
        }
    }

    jumpCalcul(x) {
        return Math.sin(x * Math.PI) * 1;
    }
    

    autoMoving(starX, startY, endX, endY, time){
        this.movin = {}
        this.movin.starX = starX;
        this.movin.startY = startY;
        this.movin.endX = endX; 
        this.movin.endY = endY;
        this.movin.time = time
    
    }


    get etapeSaut(){
        return this._etapeSaut;
    }
    set etapeSaut(etapeSaut){
        this._etapeSaut = etapeSaut;
    }

    get jump(){
        return this._jump;
    }
    set jump(jump){
        this._jump = jump;
    }
    
    get ecartSaut(){
        return this._ecartSaut;
    }
    set ecartSaut(ecartSaut){
        this._ecartSaut = ecartSaut;
    }

    get vitesse(){
        return this._vitesse;
    }
    set vitesse(vitesse){
        this._vitesse = vitesse;
    }

    get movable(){
        return this._movable;
    }
    set movable(movable){
        this._movable = movable;
    }

    get nbFrameJump(){
        return this._nbFrameJump;
    }
    set nbFrameJump(nbFrameJump){
        this._nbFrameJump = nbFrameJump;
    }

    get nbPixelJump(){
        return this._nbPixelJump;
    }
    set nbPixelJump(nbPixelJump){
        this._nbPixelJump = nbPixelJump;
    }

    get gravity(){
        return this._gravity;
    }
    set gravity(gravity){
        this._gravity = gravity;
    }

    get accelerateDown(){
        return this._accelerateDown;
    }
    set accelerateDown(accelerateDown){
        this._accelerateDown = accelerateDown
    }

}

export default function(...arg){
    return new Movement(...arg)
}