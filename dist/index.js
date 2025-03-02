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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const PORT = 8080;
app.use(express_1.default.json());
app.get('/random-pokemon', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, utils_1.buildRandomPokemonResponse)();
    if (response) {
        res.status(200)
            .set('Access-Control-Allow-Origin', '*')
            .send(response);
    }
    else {
        res.status(500);
    }
}));
app.get('/verify/:id/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = req.params;
    const response = yield (0, utils_1.buildVerifyResponse)(id, name);
    if (response) {
        res.status(200)
            .set('Access-Control-Allow-Origin', '*')
            .send(response);
    }
    else {
        res.status(500);
    }
}));
app.listen(PORT, () => {
    console.log('Pokemon Node running on http://localhost:8080');
});
