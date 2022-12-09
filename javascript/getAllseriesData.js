const axios = require("axios");
const cheerio = require("cheerio");

async function getSeriesList(link){
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);

    const item = $(".panel-default");
    const allLinks = [];
    for(let i=0; i<item.length; i++){
        const showData = "https://www.intel.com"+$(item[i]).find(".panel-title a").get()[0].attribs.href;
        allLinks.push(showData);
    };
    return allLinks;
};

module.exports = getSeriesList;