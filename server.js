require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//? IMPORT MODELS / SCHEMAS
const User = require('./models/User')
const Recipe = require('./models/Recipe')

//* INIT APP
const app = express()
const PORT = process.env.PORT || 4444

//* CONNECT TO DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected...'))
  .catch(err => console.error(err))

//* RUN SERVER
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))
