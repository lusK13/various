class Geometric{

    constructor(x=20, y=20, width=50, height=50){

        // this.movable = true //peut être à suppr
        this.width = width;
        this.height = height;
        this.top = y;
        this.left = x;

        
    }




    //LARGEUR
    get width(){
        return this._width;
    }
    set width(w){
        this._width = w;
    }

    //HAUTEUR
    get height(){
        return this._height;
    }
    set height(h){
        this._height = h;
    }
    
    //POSITION GAUCHE
    get x(){
        return this._left;
    }
    
    set x(value){
        this._left = value;
        this._right = value + this.width;
    }
      
    // POSITION HAUT
    get y(){
        return this.top;
    }
    
    set y(value){
        this.top = value;
    }

    // POSITION HAUT
    get top(){
        return this._top;
    }
    
    set top(value){
        this._top = value;
        this._bottom = value + this.height;
    }

    // POSITION DROITE
    get right(){
        return this._right;
    }
    
    set right(value){
        this._right = value;
        this._left = value - this.width;
    }
    
    // POSITION BAS
    get bottom(){
        return this._bottom;
    }
    set bottom(bottom){
        this._bottom = bottom;
        this._top = bottom - this.height
    }
    
    // POSITION GAUCHE
    get left(){
        return this._left;
    }
    
    set left(value){
        this._left = value;
        this._right = value + this.width;
    }
    
    isOnBloc(bloc){

        if(parseInt(this.bottom) == bloc.geometric.top && parseInt(this.right) > bloc.geometric.left && this.left < bloc.geometric.right){
            console.log("right : "+this.right+" left : "+this.left+" top : "+this.top+ " bottom : "+this.bottom, bloc.geometric);
            return true;
        }
        else{
            return false
        }
    }

    tpOnBloc(bloc, align = 'left'){


        this.bottom = bloc.geometric.top;
        if(align === "center"){
            this.left = bloc.geometric.left + (bloc.geometric.width/2)-(this.width/2);
        }
        else if(align === "right"){
            this.right = bloc.geometric.right;

        }
        else{

            this.left = bloc.geometric.left;
        }
        console.log(this);
    }

    teleport(x, y){
        this.left = x;
        this.y = y;
    }
    
}

export default function(...arg){
    return new Geometric(...arg)
}