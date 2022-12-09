const fs = require("fs"),
  jsonPath = "./data/data.json";

function saveToJson(e) {
  fs.writeFile(jsonPath, e, function (err) {
    err ? console.log(err) : console.log("successful");
  });
}
module.exports = saveToJson;
