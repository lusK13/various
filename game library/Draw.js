class Draw{
    
    constructor(canvas){
        this.canvas = canvas;
        this.objects = [];
        this.movables = [];
        this.upGrav = 0;
        this.i = 2;
        this.ctx = canvas.getContext("2d");
    }
    
    
    addObject(...objects){
        
        objects.forEach(object=>{
            
            this.objects.push(object);
            if(object.movable){
                this.movables.push(object)
            }
        })

    }
    drawScene(){
        
        this.move();
        this.animationFrame();
        
        
    }
    conditionFrame(callback){
        callback;
    }
    animationFrame(){
        this.ctx.clearRect(0,0,1200,800);
        this.objects.forEach(object=>{
            let geometric = object.geometric
            this.ctx.beginPath()
            // console.log();
            this.ctx.fillStyle = object.style.color;
            this.ctx.fillRect(geometric.x,geometric.y,geometric.width,geometric.height);
            this.ctx.closePath()
            if(object.conditionFrameVar)
            this.conditionFrame(object.conditionFrameVar(object));
            if(object.movement && object.movement.gravity){
                // console.log('gravity on');
                this.sideView(object)
            }
            else
            this.topDownView(object);
        })

        
        
        
        window.requestAnimationFrame(this.animationFrame.bind(this))
    }

    
    sideView(object){
        
        
       
        let movement = object.movement;
        let geometric = object.geometric;
        

        let enLair = !this.collision(geometric, 3);
            if(movement.jump){

                let etapeSaut = movement.arrayJump[movement.etapeSaut];
                if(!etapeSaut){
                    movement.ecartSaut = movement.arrayJump[movement.arrayJump.length-1];
                    movement.jump = false;
                    movement.etapeSaut = 0;
                }
                movement.etapeSaut++
                // console.log(etapeSaut);
                if(etapeSaut<0){
                    for (let pixel = 0; pixel > etapeSaut ; pixel--) {
                        if(!this.collision(geometric, 1)){
                            object.geometric.y--
                            
                        }
                        else{movement.jump = false;movement.etapeSaut=0}

                    }
                }
                else{
                    movement.jump = false;movement.etapeSaut=0

                    // for (let pixel = 0; pixel < etapeSaut ; pixel++) {
                    //     if(!this.collision(object, 3)){
                    //         object.y++
                            
                    //     }
                    //     else{object.jump = false;object.etapeSaut=0}
                    // }
                }
                

            }


            else{
                if(enLair){
                    
                    // let i  = Math.ceil(this.i = this.i*1.1);
                    for(let i=0; i<movement.ecartSaut; i++){
                        if(!this.collision(geometric, 3)){
                            object.geometric.y++;
                        }
                        
                    }
                    movement.ecartSaut+=object.movement.accelerateDown;
                }
                else{
                    movement.ecartSaut = 0
                }
            }



        
        if(movement.arrowUp && !enLair){
            for(let i = movement.vitesse; i>0; i--){
                
                movement.jump = true
                                
            }
        }
        if(movement.arrowLeft){
            for(let i = movement.vitesse; i>0; i--){
                if(!this.collision(geometric, 4)){
                    object.geometric.x--;
                }
                
            }
        }
        if(movement.arrowRight){
            for(let i = movement.vitesse; i>0; i--){
                if(!this.collision(geometric, 2)){
                    object.geometric.x++;
                }
                
            }
        


    }


    }

    topDownView(object){
        let movement = object.movement;
        let geometric =object.geometric;
        
        if(movement && movement.movable){
            if(movement.arrowUp){
                // console.log(movement.vitesse);
                for(let i = movement.vitesse; i>0; i--){
                    if(!this.collision(geometric, 1)){
                        object.geometric.y--;
                    }
                    
                }
            }

            if(movement.arrowDown){
                for(let i = movement.vitesse; i>0; i--){
                    if(!this.collision(geometric, 3)){
                        object.geometric.y++;
                    }
                    
                }
            }
            if(movement.arrowLeft){
                for(let i = movement.vitesse; i>0; i--){
                    if(!this.collision(geometric, 4)){
                        object.geometric.x--;
                    }
                    
                }
            }
            if(movement.arrowRight){
                for(let i = movement.vitesse; i>0; i--){
                    if(!this.collision(geometric, 2)){
                        object.geometric.x++;
                    }
                    
                }
            }
            
            
        }
    }


    collision(movable, dir){

        let colision = false;
        this.objects.forEach(object=>{

            
            if(!object.collision){

            }else{

                let fixed = object.geometric;
                // console.log(fixed);
                switch (dir) {
                    case 1:
                        if(parseInt(movable.top) == fixed.bottom && movable.right > fixed.left && movable.left < fixed.right){
                            colision = true;//test avec some
                        }
                        break
                                        
                    case 2:
                        if(parseInt(movable.right) == fixed.left && movable.bottom > fixed.top && movable.top < fixed.bottom){
                            colision = true;
                        }
                        break
                    case 3: 
                        if(parseInt(movable.bottom) == fixed.top && movable.right > fixed.left && movable.left < fixed.right){
                            colision = true;
                        }
                        break
                    case 4:
                        if(parseInt(movable.left) == fixed.right && movable.bottom > fixed.top && movable.top < fixed.bottom){
                            colision = true;
                        }
                        break;
                }
            }



        })
                        
            return colision

    }

    move(){

        this.objects.forEach(object=>{

            if(object.movement && object.movement.movable){
                document.addEventListener('keydown', (keydown)=>{
                    if(keydown.key == "ArrowUp"){
                        object.movement.arrowUp = true;
                    }
                    if(keydown.key == "ArrowDown"){
                        object.movement.arrowDown = true;
                    }
                    if(keydown.key == "ArrowLeft"){
                        object.movement.arrowLeft = true;
                    }
                    if(keydown.key == "ArrowRight"){
                        object.movement.arrowRight = true;
                    }
            
                })
                document.addEventListener('keyup', (keydown)=>{
                    if(keydown.key == "ArrowUp"){
                        object.movement.arrowUp = false;
                    }
                    if(keydown.key == "ArrowDown"){
                        object.movement.arrowDown = false;
                    }
                    if(keydown.key == "ArrowLeft"){
                        object.movement.arrowLeft = false;
                    }
                    if(keydown.key == "ArrowRight"){
                        object.movement.arrowRight = false;
                    }
            
                })
            }
        })
    }

}



export default function(...arg){
return new Draw(...arg);
}