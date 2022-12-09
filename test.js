const axios = require("axios");
const cheerio = require("cheerio");

async function getAllData(link){
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);
    console.log($.html());
};

getAllData("https://www.intel.com/content/www/us/en/products/details/processors/core/i3/products.html");