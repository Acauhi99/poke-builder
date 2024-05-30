import { cards, suggestions, searchInput } from "./EventListener.js";

export async function renderPokeTeam(pokeTeam) {
  for (let index = 0; index < pokeTeam.pokemons.length; index++) {
    cards[index].classList.add("loading");
    const pokemon = pokeTeam.pokemons[index];
    const types = pokemon.types.map((type) => `<li id="${type}">${type}</li>`).join("");

    await loadPokemonData(cards[index], pokemon, types);

    cards[index].classList.remove("loading");
  }
}

export function renderPokemon(pokemon, emptyCardIndex) {
  const card = cards[emptyCardIndex];
  const types = pokemon.types.map((type) => `<li id="${type}">${type}</li>`).join("");

  card.classList.add("loading");
  loadPokemonData(card, pokemon, types).then(() =>
    card.classList.remove("loading")
  );
}

async function loadPokemonData(card, pokemon, types) {
  return new Promise((resolve) => {
    setTimeout(() => {
      card.innerHTML = `
              <h3>${firstLetterUpperCase(pokemon.name)}</h3>
              <div class="navegation">
                <button class="button-previous">⬅️</button>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="poke_sprite">
                <button class="button-next">➡️</button>
              </div>
              <ul>
                  ${types}
              </ul>
              <button class="shiny-button">Shiny</button>
              <button class="remove-button">Remover</button>
          `;
      resolve();
    }, 1000);
  });
}

export function findEmptyCardIndex() {
  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];
    if (cardIsEmpty(card)) {
      return index;
    }
  }
  return -1;
}

function cardIsEmpty(card) {
  return card.querySelector("img").src.includes("imgs/pokeball.ico");
}

export function randomNumberGenerator() {
  const numeroAleatorio = Math.floor(Math.random() * 1025) + 1;
  return numeroAleatorio;
}

export function firstLetterUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function resetAllDivs(cards) {
  cards.forEach((card) => resetDiv(card));
}

export function resetDiv(div) {
  const h3Element = div.querySelector("h3");
  const imgElement = div.querySelector("img");
  const ulElement = div.querySelector("ul");
  const buttonPrevious = div.querySelectorAll("button")[0];
  const buttonNext = div.querySelectorAll("button")[1];
  const buttonShiny = div.querySelectorAll("button")[2];
  const buttonRemover = div.querySelectorAll("button")[3];

  if (h3Element) {
    h3Element.textContent = "";
  }

  if (imgElement) {
    imgElement.src = "imgs/pokeball.ico";
    imgElement.alt = "";
  }

  if (ulElement) {
    ulElement.innerHTML = "";
  }

  if (buttonPrevious) {
    buttonPrevious.remove();
  }

  if (buttonNext) {
    buttonNext.remove();
  }

  if (buttonShiny) {
    buttonShiny.remove();
  }

  if (buttonRemover) {
    buttonRemover.remove();
  }
}

export function displaySuggestions(pokemonList) {
  if (pokemonList.length == 0 || searchInput.value == '') {
    suggestions.style.display = "none";
  } else {
    suggestions.style.display = "block";
  }

  while (suggestions.firstChild) {
    suggestions.removeChild(suggestions.firstChild);
  }

  pokemonList.forEach((pokemon) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.textContent = pokemon.name;
    suggestions.appendChild(suggestionItem);
  });
}

export function findPokemonId(pokeName, pokeTeam){
  const foundPokemon = pokeTeam.find(pokemon => pokemon.name === pokeName);
  if (foundPokemon) {
    return foundPokemon.id;
  }
}
