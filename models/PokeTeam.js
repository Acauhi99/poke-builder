class PokeTeam {
  _pokemons;

  constructor() {
    this._pokemons = [];
  }

  add(pokemon) {
    if (pokemon !== null){
      this._pokemons.push(pokemon);
    }
  }
  
  remove(pokemonName) {
    const index = this._pokemons.findIndex(pokemon => pokemon.name === pokemonName);
    this._pokemons.splice(index, 1);
  }

  clear() {
    this._pokemons = [];
  }
  
  get length() {
    return this._pokemons.length;
  }

  get pokemons() {
    return this._pokemons;
  }
}

export default PokeTeam;