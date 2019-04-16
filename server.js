require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express')

//? MONGOOSE MODELS
const User = require('./models/User')
const Recipe = require('./models/Recipe')

//? GRAPHQL TYPEDEFS AND RESOLVERS
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

//

//* INIT EXPRESS APP
const app = express()
const PORT = process.env.PORT || 4000

//* CREATE APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ request }) => ({
    ...request,
    User,
    Recipe,
  }),
})

//* EXPRESS MIDDLEWARE
// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
// JSON parsing
app.use(express.json())

//* APOLLO MIDDLEWARE
server.applyMiddleware({ app })

//* CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected...'))
  .catch(err => console.error(err))
mongoose.set('useCreateIndex', true)

//* RUN SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
