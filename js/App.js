import PokeTeam from "../models/PokeTeam.js";
import setupEventListeners from "../listeners/EventListener.js";

main();

function main() {
    const pokeTeam = new PokeTeam();
    setupEventListeners(pokeTeam);
}
