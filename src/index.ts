import express from "express";
import { buildRandomPokemonResponse, buildVerifyResponse } from "./utils";
import { RandomPokemonResponse, VerifyResponse } from "./interfaces/InternalApiResponses";

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/random-pokemon', async (req, res) => {
  const response: RandomPokemonResponse | null = await buildRandomPokemonResponse();

  if (response) {
    res.status(200)
      .set('Access-Control-Allow-Origin', '*')
      .send(response)
  } else {
    res.status(500);
  }
})

app.get('/verify/:id/:name', async (req, res) => {
  const { id, name } = req.params;
  const response: VerifyResponse | null = await buildVerifyResponse(id, name);

  if (response) {
    res.status(200)
      .set('Access-Control-Allow-Origin', '*')
      .send(response)
  } else {
    res.status(500);
  }
})

app.listen(PORT, () => {
  console.log('Pokemon Node running on http://localhost:8080');
})
