const { getAllLaunches, addNewLaunch } = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.destination
  ) {
      return res.status(400).json({
          error: 'Missing required launch property'
      })
  }

  launch.launchDate = new Date(launch.launchDate);

  // isNaN, by default calls isNaN(launch.launchDate.valueof())
  // which is supposed to be a number for valid dates,
  // i.e would be an an invalid date if it's NaN
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
