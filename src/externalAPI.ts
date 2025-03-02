import axios from "axios";
import { GetAllPokemon, GetAllPokemonData } from "./interfaces/AllPokemon";
import { GetIndividualPokemonResponse, IndividualPokemon } from "./interfaces/IndividualPokemon";

const BASE_URL = "https://pokeapi.co/api/v2/";

export async function getAllPokemon(limit: number) {
  const response: GetAllPokemon = await axios.get(`${BASE_URL}/pokemon?limit=${limit}`);
  return response ? response.data as GetAllPokemonData : null;
}

export async function getIndividualPokemonByName(name: string) {
  const response: GetIndividualPokemonResponse = await axios.get(`${BASE_URL}/pokemon/${name}`);
  return response ? response.data as IndividualPokemon : null;
}

export async function getIndividualPokemonById(id: string) {
  const response: GetIndividualPokemonResponse = await axios.get(`${BASE_URL}/pokemon/${id}`);
  return response ? response.data as IndividualPokemon : null;
}