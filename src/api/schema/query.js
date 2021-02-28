const query = `
 query GetPokemon{
   repository(owner:"Jood80", name:"pokemon.json") {
     pokemonData: object(expression: "HEAD:pokedex.json") {
      ...on Blob {
         text
         }        
       }     
     pokemonImg: object(expression: "HEAD:images") {
      ... on Tree {
        entries {
          name       
         }
        }
      }
     }
}`;

module.exports = query;
