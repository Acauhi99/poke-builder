class PokeService {
    static async getPokeData(name){
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then(response => response.json())
        .catch(error => alert('Erro ao buscar o Pokémon!'));
        return response; 
    }

    static async getPokeName(query) {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025')
        .then(response => response.json())
        .catch(error => alert('Erro ao buscar o Pokémon!'));
        const filteredPokemons = response.results.filter(pokemon => pokemon.name.startsWith(query));
        return filteredPokemons;
    }
}

export default PokeService;