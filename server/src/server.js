const http = require('http')

const app = require('./app')

const { loadPlanetsData, planets } = require('./models/planets.model')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app)

const startServer = async () => {
    // A common way to perform some necessary actions before server comes up
    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })    
}
startServer()