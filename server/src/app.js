const express = require('express')
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')

const plantesRouter = require('./routes/planets/planets.router')
const launchesRouter = require('./routes/launches/launches.router')

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}))

// morgan handles logging, should come before immediatly after all security
// related middlewares
app.use(morgan('combined'))

app.use(express.json())

// This helps serve static files of client app located in the server folder
// Added to ensure we can run api and client on thesame server in prod
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/planets', plantesRouter);
app.use('/launches', launchesRouter)

// Handles serving homepage on '/'
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app;