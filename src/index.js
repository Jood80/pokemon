const { GraphQLServer } = require('graphql-yoga');
const serveStatic = require('serve-static');
const { join } = require('path');

require('dotenv').config();
const { resolvers } = require('./api/resolvers');
const typeDefs = require('./api/schema/schema');
const { getAllPokemons, getMatchedPokemon } = require('./controller');

const options = {
  port: process.env.PORT || 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
  cors: {
    credentials: false,
    origin: ['http://localhost:5000'],
  },
  static: 'public',
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  options,
});

const app = server.express;

app.use(
  serveStatic(join(`${__dirname}/../public/`), {
    cacheControl: false,
  }),
);

app.get('/api/pokemons', getAllPokemons);
app.get('/api/pokemons/:name', getMatchedPokemon);

server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`,
  ),
);
