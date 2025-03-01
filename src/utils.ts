import { getAllPokemon, getIndividualPokemonById, getIndividualPokemonByName } from "./externalAPI";
import { BasicPokemonData, GetAllPokemonData } from "./interfaces/AllPokemon";
import { IndividualPokemon } from "./interfaces/IndividualPokemon";

export async function buildRandomPokemonResponse() {
  const pokemonResponse: GetAllPokemonData | null = await getAllPokemon(50);
  let builtResponse = null;
  if (pokemonResponse) {
    const pokemon = pokemonResponse.results;
    const fourPokemon = selectFour(pokemon);
    const keyPokemonName = fourPokemon[getRandInt(fourPokemon.length)];
    const keyPokemon: IndividualPokemon | null = await getIndividualPokemonByName(keyPokemonName);
    if (keyPokemon) {
      builtResponse = {
        id: keyPokemon.id,
        sprite: keyPokemon.sprites["front_default"],
        names: fourPokemon
      }
    }
  }

  return builtResponse;
}

export function selectFour(pokemon: BasicPokemonData[]) {
  const fourPokemon: string[] = [];
  if (pokemon) {
    while (fourPokemon.length < 4) {
      const el: any = pokemon[getRandInt(pokemon.length)];
      if (!fourPokemon.includes(el.name)) fourPokemon.push(el.name);
    }
  }
  return fourPokemon;
}

export function getRandInt(max: number) {
  return Math.floor(Math.random() * max)
}

export async function buildVerifyResponse(id: string, name: string) {
  const correctPokemon: IndividualPokemon | null = await getIndividualPokemonById(id);
  let builtResponse = null;

  if (correctPokemon) {
    builtResponse = {
      name: correctPokemon.name,
      imageUrl: correctPokemon.sprites["front_default"],
      isCorrect: correctPokemon.name === name
    }
  }

  return builtResponse;
}