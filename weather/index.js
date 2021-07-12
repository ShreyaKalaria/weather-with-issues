const core = require('@actions/core');
const weather = require('weather-js');

let title = core.getInput('title');
let city = title.split(" | ")[1];
let degreeType = title.split(" | ")[2] || "C";

if (!city) return core.setOutput('closeIssueMsg', "Uh oh! Looks like you didn't provide any location, please provide a location in the title.")

weather.find({
    search: city,
    degreeType: degreeType
}, function (err, result) {

    if (result === undefined || result.length === 0) return core.setOutput('closeIssueMsg', "Looks like the location provided was invalid.")


    let { current, location } = result[0];
    
    core.setOutput('closeIssueMsg', `Current Weather in ${current.observationpoint}: ${current.skytext} | Temperature: ${current.temperature}°${degreeType}\n\nThanks for using me! If you liked this, please star the repository :)`);
}
