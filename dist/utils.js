"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRandomPokemonResponse = buildRandomPokemonResponse;
exports.selectFour = selectFour;
exports.getRandInt = getRandInt;
exports.buildVerifyResponse = buildVerifyResponse;
const externalAPI_1 = require("./externalAPI");
function buildRandomPokemonResponse() {
    return __awaiter(this, void 0, void 0, function* () {
        const pokemonResponse = yield (0, externalAPI_1.getAllPokemon)(50);
        let builtResponse = null;
        if (pokemonResponse) {
            const pokemon = pokemonResponse.results;
            const fourPokemon = selectFour(pokemon);
            const keyPokemonName = fourPokemon[getRandInt(fourPokemon.length)];
            const keyPokemon = yield (0, externalAPI_1.getIndividualPokemonByName)(keyPokemonName);
            if (keyPokemon) {
                builtResponse = {
                    id: keyPokemon.id,
                    sprite: keyPokemon.sprites["front_default"],
                    names: fourPokemon
                };
            }
        }
        return builtResponse;
    });
}
function selectFour(pokemon) {
    const fourPokemon = [];
    if (pokemon) {
        while (fourPokemon.length < 4) {
            const el = pokemon[getRandInt(pokemon.length)];
            if (!fourPokemon.includes(el.name))
                fourPokemon.push(el.name);
        }
    }
    return fourPokemon;
}
function getRandInt(max) {
    return Math.floor(Math.random() * max);
}
function buildVerifyResponse(id, name) {
    return __awaiter(this, void 0, void 0, function* () {
        const correctPokemon = yield (0, externalAPI_1.getIndividualPokemonById)(id);
        let builtResponse = null;
        if (correctPokemon) {
            builtResponse = {
                name: correctPokemon.name,
                imageUrl: correctPokemon.sprites["front_default"],
                isCorrect: correctPokemon.name === name
            };
        }
        return builtResponse;
    });
}
