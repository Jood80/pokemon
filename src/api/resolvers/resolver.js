const fetch = require('node-fetch');
const query = require('../schema/query');

const { ACCESS_TOKEN } = process.env;

const getPokemon = async () => {
  try {
    const data1 = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const data2 = await data1.json();
    const data3 = await data2.data.repository;

    const pokemonData = JSON.parse(await data3.pokemonData.text);
    const pokemonImages = await data3.pokemonImg.entries;

    const data4 = await pokemonImages.map((data) => {
      const image = data.name;
      return image;
    });

    const motherOFData = await pokemonData.map((data, index) => {
      if (data.id === +data4[index].slice(0, 3)) {
        return {
          id: data.id,
          name: data.name.english,
          image: data4[index],
          type: data.type,
          base: data.base,
        };
      }
    });
    return motherOFData;
  } catch (error) {
    console.error(error);
  }
};

const resolvers = {
  Query: {
    getPokemon: () => getPokemon(),
  },
};

module.exports = { resolvers, getPokemon };
