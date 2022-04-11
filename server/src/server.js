const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");

const { loadPlanetsData, planets } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://raph941:nigerians941@cluster0.k1l4j.mongodb.net/nasa?retryWrites=true&w=majority";

// use .once instead of the .on function just to make it 
// explicit that the function would only be called back once.
mongoose.connection.once("open", () => {
    console.log('MongoDB connection Successful')
});

mongoose.connection.on('error', (error) => {
    console.error(error)
})

const startServer = async () => {
  // A common way to perform some necessary actions before server comes up
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};
startServer();
