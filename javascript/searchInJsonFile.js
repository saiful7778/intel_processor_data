const fs = require("fs");
const path = require("path");
const jsonPath = path.join(__dirname, "../data/by_js/data.json");

const data = fs.readFileSync(jsonPath, "utf-8", (error) => {
    if (error){
        console.log(error);
    }
});
const jsonData = JSON.parse(data).allProcessorData;
for(let i=0; i<jsonData.length; i++){
    console.log(jsonData[i]);
}
