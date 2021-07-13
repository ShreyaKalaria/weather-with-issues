const core = require('@actions/core');
const fetch = require("node-fetch");

let title = core.getInput('title');
let city = title.split(" | ")[1];
let degreeType = title.split(" | ")[2] || "C";

if (!city) return core.setOutput('closeIssueMsg', "Uh oh! Looks like you didn't provide any location, please provide a location in the title.")
if (!["C", "F"].includes(degreeType)) return core.setOutput('closeIssueMsg', "Uh oh! Looks like you the degree-type you provided is invalid. Please provide either C or F")

fetch(`https://weather-api.shadeoxidee.repl.co/?city=${city}&degreeType${degreeType}`)
.then(res => res.json())
.then(data => core.setOutput('closeIssueMsg', data.message))
