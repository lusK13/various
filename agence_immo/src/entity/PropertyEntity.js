module.exports = class Property {
    
    id;
    title;
    type;
    square;
    num_street;
    postal_code;
    city;
 
    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }
     get title() {
        return this.title;
    }
    set title(title) {
        this.title = title;
    }
    get type() {
        return this.type;
    }
    set type(type) {
        this.type = type;
    }
    get square() {
        return this.square;
    }
    set square(square) {
        this.square = square;
    }
    get num_street() {
        return this.num_street;
    }
    set num_street(num_street) {
        this.num_street = num_street;
    }
    get postal_code() {
        return this.postal_code;
    }
    set postal_code(postal_code) {
        this.postal_code = postal_code;
    }
    get city() {
        return this.city;
    }
    set city(city) {
        this.city = city;
    }
}

