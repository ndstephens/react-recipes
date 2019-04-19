require('dotenv').config()
const path = require('path')
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
  if (token === 'null' || token === undefined || token === '') {
    return next()
  }
  try {
    const currentUser = await jwt.verify(token, process.env.JWT_SECRET)
    req.currentUser = currentUser
  } catch (err) {
    console.error(err.message)
  }
  next()
})
// STATIC (CLIENT INDEX)
app.use(express.static('client/build'))

//* CREATE APOLLO SERVER
//? This MUST come after Express middleware b/c we attach new fields to the request object in that middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    User,
    Recipe,
    currentUser: req.currentUser,
  }),
})

//* APOLLO MIDDLEWARE
server.applyMiddleware({ app })

//* DIRECT ALL REQUEST THAT WEREN'T CAUGHT BY '/graphql' TO THE CLIENT INDEX
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

//* CONNECT TO MONGODB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB connected...'))
  .catch(err => console.error(err))
mongoose.set('useCreateIndex', true)

//* RUN SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
