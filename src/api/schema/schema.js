const typeDefs = `
type Query {
  getPokemon: [Pokemon]!
}

type Pokemon {
  pokemonData: [PokemonInfo]!
  imagesData: [PokemonImg]!
}

type PokemonInfo {
  id: Int
  name: Name
  type: [String]!
  base: Base!
}

type PokemonImg {
  name: String
}

type Name {
  english: String
  japanese: String
  chinese: String
  french: String!
}

type Base {
  HP: Int
  Attack: Int
  Defense: Int
  Speed: Int
}
`;
module.exports = typeDefs;
