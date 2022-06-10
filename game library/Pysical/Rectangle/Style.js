class Style{

    constructor(color = "black"){

        this.color = color;

    }


    get color(){
        return this._color;
    }
    set color(color){
        this._color = color;
    }
}

export default function(...arg){
    return new Style(...arg)
}