class Pokemon{
    _name;
    _sprites;
    _types;
 
    constructor(name, sprites, types){
        this._name = name,
        this._sprites = sprites,
        this._types = types;
    }

    get name(){
        return this._name;
    }

    get sprites(){
        return this._sprites;
    }

    get types() {
        return this._types;
    }
}

export default Pokemon;