require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')

//? IMPORT MODELS / SCHEMAS
const User = require('./models/User')
const Recipe = require('./models/Recipe')

//? IMPORT GRAPHQL TYPEDEFS AND RESOLVERS
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

//

//* INIT APP
const app = express()
const PORT = process.env.PORT || 4444

//* CREATE GRAPHQL SCHEMA
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

//* MIDDLEWARE
// Create GraphiQL application
app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))
// Connect schemas with GraphQL
app.use(
  '/graphql',
  graphqlExpress({
    schema,
    context: { User, Recipe },
  })
)

//* CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected...'))
  .catch(err => console.error(err))

//* RUN SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
