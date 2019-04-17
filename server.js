require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
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

//* EXPRESS MIDDLEWARE
// CORS
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
app.use(cors(corsOptions))
// JSON parsing
app.use(express.json())
// JWT Auth
app.use(async (req, res, next) => {
  const token = req.headers.authorization
  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, process.env.JWT_SECRET)
      console.log(currentUser)
    } catch (err) {
      console.error(err)
    }
  }
  next()
})

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
