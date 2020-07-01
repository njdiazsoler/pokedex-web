import { Pokedex } from 'pokeapi-js-wrapper';

const pokeDex = new Pokedex();

const getOnePokemonByName = async (name) => {
    const singlePokemonData = await pokeDex.getPokemonByName(name);
    return singlePokemonData
};

const getAllPokemon = async (options) => {
  const allPokemonData = await pokeDex.getPokemonsList(options)
  return allPokemonData;
}

export default {
  getOnePokemonByName,
  getAllPokemon,
}