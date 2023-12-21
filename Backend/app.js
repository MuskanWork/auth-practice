const express = require("express");
var dotenv = require("dotenv");
const cors = require("cors");
const { ApolloServer, gql } = require('apollo-server-express');
var routes = require("./routes");
const resolvers = require('./resolvers');

const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

const typeDefs = gql`
  ${require('fs').readFileSync('./schema.graphql', 'utf8')}
`;

app.use(express.json());
app.use(cors());
app.use(routes);

async function startApolloServer(typeDefs, resolvers){
    const server = new ApolloServer({typeDefs, resolvers})
    await server.start();
    server.applyMiddleware({app, path: '/api'});
    
    app.listen(port, () => {
    console.log(`Server is listening on port ${port}${server.graphqlPath}`);
})
}

startApolloServer(typeDefs, resolvers);

// app.listen(port, () => {
//   console.log("server is connected on port ", port);
// });