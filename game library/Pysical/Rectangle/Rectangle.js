"use strict";
import Geometric from './Geometric.js';
import Movement from './Movement.js'
import Style from './Style.js';



class Rectangle{


    constructor(x=20, y=20, width=50, height=50, movable=false){
        
        this.collision = true;
        this.geometric = Geometric(x, y, width, height);
        if(movable){
            this.movement = Movement();
            this.movement.jumpInit();
        }
        this.style = Style();

        // this.size.width = width;
        // this.size.height = height;
        
        
        

        
        
    }

    returnPosition(){

        return false;
    }
    initObjects(){
    }
    setParam({color, frameJump, pixelJump, vitesse, gravity, collision, accelerateDown}){
        if(vitesse){
            this.movement.vitesse = vitesse;
            this.movement.movable = vitesse>0;}
        
        if(color)
            this.style.color = color;
        
        if(gravity)
            this.movement.gravity = gravity
        

        if(frameJump)
            this.movement.nbFrameJump = frameJump;

        if(pixelJump)
            this.movement.nbPixelJump = pixelJump;

        if(frameJump || pixelJump)
            this.movement.jumpInit();
        
        if(collision)
        this.collision = collision

        if(accelerateDown)
        this.movement.accelerateDown = accelerateDown;


    }
    sizeObject(){
        return 
    }
    conditionFrame(callback){

        this.conditionFrameVar = callback;
    }
    
    // personalizeJump(tableauSaut){
    //     if(Array.isArray(tableauSaut) && tableauSaut.length>2){
    //         this.movement.arrayJump = tableauSaut;
    //     }
    //     else{
    //         return console.log('gestionSaut() prend en paramêtre un tableau contenant chaque pixel de plus ou de moins par image pour un saut par rapport à la hauteur y (ex:[-7,-7,-7,-6,-6,-5,-4,-3,-2,-1,0,1,2,3,5,8...]')
    //     }
        
    // }





// moveData(){

//     document.addEventListener('keydown', (keydown)=>{
//         if(keydown.key == "ArrowUp"){
//             this.y -= this.movement.vitesse
//         }
//         if(keydown.key == "ArrowDown"){
//             this.y += this.movement.vitesse
//         }
//         if(keydown.key == "ArrowLeft"){
//             this.x -= this.movement.vitesse
//         }
//         if(keydown.key == "ArrowRight"){
//             this.x += this.movement.vitesse
//         }

//     })


// }
}








export default function(...args) {
        



    return new Rectangle(...args);
}