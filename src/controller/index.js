const { getPokemon } = require('../api/resolvers');

const getAllPokemons = async (_req, res) => {
  const allPokemons = await getPokemon();

  let displayedPokemons = [];
  for (let i = 0; i < 8; i += 1) {
    displayedPokemons = [
      ...displayedPokemons,
      allPokemons[Math.floor(Math.random() * allPokemons.length)],
    ];
  }
  res.status(200).send(displayedPokemons);
};

const getMatchedPokemon = async (req, res) => {
  const pokeName = req.params.name;

  const allPokemons = await getPokemon();
  const matchedPokemon = await allPokemons.filter(
    (item) => item.name.toLowerCase() === pokeName,
  );
  res.status(200).send(matchedPokemon);
};

module.exports = { getAllPokemons, getMatchedPokemon };
