// const launches = require('./launches.mogo')
const launches = new Map()

let latestFlightNumber = 100;

const launch = {
    mission: 'kEPLER Eploration X',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27, 2030'),
    destination: 'Kepler-442 b',
    customer: ['ZTM', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => {
    return Array.from(launches.values())
}

const addNewLaunch = (launch) => {
    latestFlightNumber++;
    launches.set(latestFlightNumber, Object.assign(launch, {
        // customer: ['zero to Mastery', 'NASA'],
        flightNumber: latestFlightNumber,
        success: true,
        upcoming: true,
        customer: ['zero to mastery', 'NASA'],
    }))
}

module.exports = {
    getAllLaunches,
    addNewLaunch
}