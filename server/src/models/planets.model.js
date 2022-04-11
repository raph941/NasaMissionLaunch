const path = require('path')
const fs = require("fs");
const { parse } = require("csv-parse");

const planets = require('./planets.mongo');

const habitablePlanets = [];

const isHabitablePlanet = (planet) => {
  // Conditions determined based on herbitability research criterias for a planet
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = () => {
  // Go through csv data to find out planets that are similar to earth

  // Stream through data, since we are dealing with a huge chunk of data being parsed
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, 'data', 'kepler_data.csv'))
    .pipe(
      parse({
        comment: "#",
        columns: true,
      })
    )
    .on("data", async (data) => {
      // insert + update = upsert
      if (isHabitablePlanet(data)) {
        await planets.create({
          keplerName: data.kekpler_name,
        })
      };
    })
    .on("error", (err) => {
      reject({err})
    })
    .on("end", () => {
      // console.log({ results });
      resolve()
    });
  })
};

const getAllPlanets = () => {
  return habitablePlanets
}

module.exports = {
  getAllPlanets,
  loadPlanetsData,
}