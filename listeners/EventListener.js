import {
  renderPokeTeam,
  renderPokemon,
  findEmptyCardIndex,
  randomNumberGenerator,
  resetAllDivs,
  resetDiv,
  displaySuggestions,
  findShinyPokemon,
  findPokemon
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
      const pokemonName = e.target
        .closest("div")
        .querySelector("h3").textContent
        .toLowerCase();
      pokeTeam.remove(pokemonName);
      resetDiv(cardDiv);
    }
  });

  document.addEventListener("click", async (e) => {
    e.preventDefault();
    if (e.target.classList.contains("shiny-button")) {
      const cardDiv = e.target.closest('[class^="card_"]');
      const pokemonName = e.target
        .closest("div")
        .querySelector("h3").textContent
        .toLowerCase();
      const pokemonShiny = findShinyPokemon(pokemonName, pokeTeam.pokemons);
      const pokemonDefault = findPokemon(pokemonName, pokeTeam.pokemons)
      
      if (cardDiv.querySelector('img').src === pokemonShiny){
        cardDiv.querySelector('img').src = pokemonDefault;
      } else {
        cardDiv.querySelector('img').src = pokemonShiny;
      }    
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
}