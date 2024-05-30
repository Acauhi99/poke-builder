import Pokemon from "../models/Pokemon.js";

class PokemonDataMaper{
    static async build(pokemonPromise) {
        const data = await pokemonPromise;
        if (data) {
            return new Pokemon(data.id ,data.name, data.sprites, data.types.map(type => type.type.name));
        }
        return null;
    }
}

export default PokemonDataMaper;
