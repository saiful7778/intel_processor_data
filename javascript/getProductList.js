// all packages
const axios = require("axios");
const cheerio = require("cheerio");

const mainSeriesName = [];

async function getProductList(link){
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);

    // get the specipacific data
    const item = $("table tbody tr");

    // get all processor link and filter it only continued processon
    const allData = [];

    // get the specfic data
    for(let i=0; i<item.length; i++){
        const condition = $(item[i]).get()[0].attribs['data-filter-ddlviewselection'].trim();
        if(condition == "Desktop"){
            const simpleData = $(item[i]).find("td")[1].children[0].data.trim();
            if(simpleData == "Discontinued"){
                continue
            }else{
                const link = $(item[i]).find("div.add-compare-wrap a").get()[0].attribs.href;
                allData.push("https://www.intel.com"+link);
            };
        }else if(condition == "Desktop retail-key"){
            const simpleData = $(item[i]).find("td")[1].children[0].data.trim();
            if(simpleData == "Discontinued"){
                continue
            }else{
                const link = $(item[i]).find("div.add-compare-wrap a").get()[0].attribs.href;
                allData.push("https://www.intel.com"+link);
            };
        }else if(condition == "Workstation retail-key"){
            const simpleData = $(item[i]).find("td")[1].children[0].data.trim();
            if(simpleData == "Discontinued"){
                continue
            }else{
                const link = $(item[i]).find("div.add-compare-wrap a").get()[0].attribs.href;
                allData.push("https://www.intel.com"+link);
            };
        }else if(condition == "Server"){
            const simpleData = $(item[i]).find("td")[1].children[0].data.trim();
            if(simpleData == "Discontinued"){
                continue
            }else{
                const link = $(item[i]).find("div.add-compare-wrap a").get()[0].attribs.href;
                allData.push("https://www.intel.com"+link);
            };
        }else{
            continue
        }
    }
    if(allData.length !== 0){
        const testName = $(".upe-marquee-layout .text-container h1").text().trim().replace(/[®™]/g,"").toLowerCase().split(" ");
        const seriesName = [];
        for(let i=1; i<3; i++){
            seriesName.push(testName[i]);
        };
        mainSeriesName.length = 0;
        mainSeriesName.push(seriesName.join(" "));
        return allData;
    }else{
    }
    return allData
};


module.exports = {getProductList, mainSeriesName};