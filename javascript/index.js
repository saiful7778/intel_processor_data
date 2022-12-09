console.time("Time of this code");
// all packages
const axios = require("axios");
const cheerio = require("cheerio");

const getSeriesList = require("./getAllseriesData")
const {getProductList, mainSeriesName} = require("./getProductList");
const getSingleProductData = require("./getSingleProductData");
const saveToJson =require("./savingSystem");

// the main website url
const mainUrl = "https://www.intel.com/content/www/us/en/products/details/processors.html";

async function getAllData(link){
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);

    const allMainLinks = [];
    const item = $(".panel-default");
    for(let i=0; i<4; i++){
        const mainPageData = "https://www.intel.com"+$(item[i]).find("div[class='panel-body'] a[class='top-level']").get()[0].attribs.href;
        const seriesLinks = await getSeriesList(mainPageData);
        for(let i=0; i<seriesLinks.length; i++){
            allMainLinks.push(seriesLinks[i].replace(".html","/products.html"));
        }
    };
    const allSingleProductLink = [];
    const seriesName = [];
    for(let i=0; i<allMainLinks.length; i++){
        const allProductLinks = await getProductList(allMainLinks[i]);
        if(allProductLinks !== undefined){
            seriesName.push(mainSeriesName.toString());
            const allSeriesName = mainSeriesName.toString();
            allSingleProductLink.push({
                [allSeriesName]: allProductLinks
            })
        };
    };

    const allProcessorData = [];
    for(let x of seriesName){
        const seriesData = []
        allProcessorData.push({
            [x]: seriesData
        })
        for(let i=0; i<allSingleProductLink.length; i++){
            const singleData = allSingleProductLink[i][x];
            for(let z in singleData){
                const Data = await getSingleProductData(singleData[z]);
                seriesData.push(Data)
            }
        };
    };
    saveToJson(JSON.stringify({allProcessorData}));
    
    console.timeEnd("Time of this code");
};

getAllData(mainUrl);