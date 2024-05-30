class Pokemon{
    _id;
    _name;
    _sprites;
    _types;
 
    constructor(id ,name, sprites, types){
        this._id = id,
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

    get id(){
        return this._id;
    }
}

export default Pokemon;
