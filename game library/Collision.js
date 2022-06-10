class Collision{

    constructor(){


    }

    collision(movable, dir){

        let colision = false;
        this.objects.forEach(object=>{
            let fixed = object.geometric;
            // console.log(fixed);
            switch (dir) {
                case 1:
                    if(movable.top == fixed.bottom && movable.right > fixed.left && movable.left < fixed.right){
                        colision = true;//test avec some
                    }
                    break
                                    
                case 2:
                    if(movable.right == fixed.left && movable.bottom > fixed.top && movable.top < fixed.bottom){
                        colision = true;
                    }
                    break
                case 3: 
                    if(movable.bottom == fixed.top && movable.right > fixed.left && movable.left < fixed.right){
                        colision = true;
                    }
                    break
                case 4:
                    if(movable.left == fixed.right && movable.bottom > fixed.top && movable.top < fixed.bottom){
                        colision = true;
                    }
                    break;
            }



        })
                        
            return colision

    }


}

export default function(...arg){
    return new Collision(...arg)
}