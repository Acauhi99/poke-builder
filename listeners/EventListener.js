import {
  renderPokeTeam,
  renderPokemon,
  findEmptyCardIndex,
  randomNumberGenerator,
  resetAllDivs,
  resetDiv,
  displaySuggestions,
} from "./Render.js";
import PokeService from "../utils/PokeService.js";
import PokemonDataMaper from "../factories/PokemonDataMaper.js";

const searchButton = document.querySelectorAll("button")[0];
const addRandomButton = document.querySelectorAll("button")[1];
const generateTeamButton = document.querySelectorAll("button")[2];
export const searchInput = document.querySelectorAll("input")[0];
export const cards = document.querySelectorAll(".display_cards > div");
export const suggestions = document.querySelectorAll('div')[1];

export default function setupEventListeners(pokeTeam) {

  searchButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const searchValue = searchInput.value.toLowerCase();

    if (searchValue === "") {
      alert("Digite o nome de um pokemon!");
      return;
    }

    if (pokeTeam.length > 5) {
      alert(
        "Você já tem 6 pokemons na sua equipe! Remova um para adicionar outro."
      );
      return;
    }

    const pokemonPromise = PokeService.getPokeData(searchValue);
    const pokemon = await PokemonDataMaper.build(pokemonPromise);

    searchInput.value = "";
    suggestions.style.display = "none";
    displaySuggestions([]);

    pokeTeam.add(pokemon);
    renderPokemon(pokemon, findEmptyCardIndex());
  });

  generateTeamButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (pokeTeam.length != 0) {
      pokeTeam.clear();
      resetAllDivs(cards);
    }

    for (let index = 0; index < cards.length; index++) {
      const pokemonPromise = PokeService.getPokeData(randomNumberGenerator());
      const pokemon = await PokemonDataMaper.build(pokemonPromise);
      pokeTeam.add(pokemon);
      renderPokeTeam(pokeTeam);
    }
  });

  addRandomButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (pokeTeam.length > 5) {
      alert(
        "Você já tem 6 pokemons na sua equipe! Remova um para adicionar outro."
      );
      return;
    }

    const pokemonPromise = PokeService.getPokeData(randomNumberGenerator());
    const pokemon = await PokemonDataMaper.build(pokemonPromise);
    pokeTeam.add(pokemon);
    renderPokemon(pokemon, findEmptyCardIndex());
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("remove-button")) {
      const cardDiv = e.target.closest('[class^="card_"]');
      const pokemonName = cardDiv.querySelector("h3").textContent.toLowerCase();
      pokeTeam.remove(pokemonName);
      resetDiv(cardDiv);
    }
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("shiny-button")) {
      const cardDiv = e.target.closest('[class^="card_"]');
      const pokemonName = cardDiv.querySelector("h3").textContent.toLowerCase();
      const spriteShiny = pokeTeam.find(pokemonName).sprites.front_shiny;
      const spriteDefault = pokeTeam.find(pokemonName).sprites.front_default;
      
      cardDiv.querySelector('img').src === spriteShiny ? 
      cardDiv.querySelector('img').src = spriteDefault : 
      cardDiv.querySelector('img').src = spriteShiny;
    }
  });

  searchInput.addEventListener("keyup", async (e) => {
    e.preventDefault();
    const query = searchInput.value.toLowerCase();
    const suggestionsPokemons = await PokeService.getPokeName(query);
    displaySuggestions(suggestionsPokemons);
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("suggestion-item")) {
      searchInput.value = e.target.textContent;
      suggestions.style.display = "none";
      displaySuggestions([]);
    }
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("button-previous")) {
      const cardDiv = e.target.closest('[class^="card_"]');
      const pokemonName = cardDiv.querySelector("h3").textContent.toLowerCase()
      const pokemonId = pokeTeam.find(pokemonName).id;
      const previousPokemon = pokemonId - 1;
      const cardId = cardDiv.classList.toString().split('_')[1] - 1;
      
      if (previousPokemon > 0 && previousPokemon < 1026) {
        const pokemonPromise = PokeService.getPokeData(previousPokemon);
        const pokemon = await PokemonDataMaper.build(pokemonPromise);
        pokeTeam.remove(pokemonName);
        pokeTeam.add(pokemon);
        renderPokemon(pokemon, cardId);
      }
    }
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("button-next")) {
      const cardDiv = e.target.closest('[class^="card_"]');
      const pokemonName = cardDiv.querySelector("h3").textContent.toLowerCase()
      const pokemonId = pokeTeam.find(pokemonName).id;
      const nextPokemon = pokemonId + 1;
      const cardId = cardDiv.classList.toString().split('_')[1] - 1;

      if (nextPokemon > 0 && nextPokemon < 1026) {
        const pokemonPromise = PokeService.getPokeData(nextPokemon);
        const pokemon = await PokemonDataMaper.build(pokemonPromise);
        pokeTeam.remove(pokemonName);
        pokeTeam.add(pokemon);
        renderPokemon(pokemon, cardId);
      }
    }
  });
}
