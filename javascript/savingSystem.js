const fs = require("fs");
const path = require("path");

const jsonPath = path.join(__dirname, "../data/by_js/data.json");

function saveToJson(e) {
  fs.writeFile(jsonPath, e, function (err) {
    err ? console.log(err) : console.log("successful");
  });
}
module.exports = saveToJson;
