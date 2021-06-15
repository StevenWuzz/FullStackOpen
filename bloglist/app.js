const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

const mongoURL = "mongodb+srv://Steven:StevenHans@cluster0.s52wk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
.then(result => console.log("Connected to MongoDB"))
.catch(error => console.log("Error connecting to MongoDB: ", error.message))

module.exports = app