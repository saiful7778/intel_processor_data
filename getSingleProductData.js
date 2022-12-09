// all packages
const axios = require("axios");
const cheerio = require("cheerio");

// get all data into html code
const extractData = async (link) => {
    const {data} = await axios.get(link);
    const $ = cheerio.load(data);
    return $;
};

async function getName($){
    const nameTab = $("div#specs-1-0-0 div.tech-section-row");
    let nameIndex = "";
    for(let i=0; i<nameTab.length; i++){
        if($(nameTab[i]).find("div.tech-label span").text() == "Processor Number"){
            nameIndex += i;
        }else{
            continue
        }
    };
    const productName = $(nameTab[nameIndex]).find("div.tech-data span").text();
    return productName;
};

async function getPrice($){
    const priceTab = $("div#specs-1-0-0 div.tech-section-row");
    let priceIndex = "";
    for(let i=0; i<priceTab.length; i++){
        if($(priceTab[i]).find("div.tech-label span").text() == "Recommended Customer Price"){
            priceIndex += i;
        }else{
            continue
        }
    };
    const price = $(priceTab[priceIndex]).find("div.tech-data span").text();
    return price;
};

// get all CPU Specifications
async function getAllCpuData($){
    const allInfo = $("div#specs-1-0-1 div.tech-section-row");
    const allSpec = {};
    for(let i=0; i<allInfo.length; i++){
        const singleData = $(allInfo[i]).find("div.tech-data span").text().toLowerCase();
        const singleLabel = $(allInfo[i]).find("div.tech-label span").text().toLowerCase().replace(/[‡®]/g,"");
        allSpec[singleLabel] = singleData;
    };

    return allSpec;
};

// get all Memory Specifications
async function memorySpec($){
    const main = $("div.tech-section");
    const allSpec = {};
    for(let i=0; i<main.length; i++){
        const mainLable = $(main[i]).find(".heading-row h3").text().trim();
        if(mainLable == "Memory Specifications"){
            const subSection = $(main[i]).find("div.tech-section-row");
            for(let i=0; i<subSection.length; i++){
                const singleData = $(subSection[i]).find("div.tech-data span").text().toLowerCase();
                const singleLabel = $(subSection[i]).find("div.tech-label span").text().toLowerCase().replace("‡","");
                allSpec[singleLabel] = singleData;
            };
        }
    };
    return allSpec;
};

// get all Processor Graphics
async function processorGraphics($){
    const main = $("div.tech-section");
    const allSpec = {};
    for(let i=0; i<main.length; i++){
        const mainLable = $(main[i]).find(".heading-row h3").text().trim();
        if(mainLable == "Processor Graphics"){
            const subSection = $(main[i]).find("div.tech-section-row");
            for(let i=0; i<subSection.length; i++){
                const singleData = $(subSection[i]).find("div.tech-data span").text().toLowerCase();
                const singleLabel = $(subSection[i]).find("div.tech-label span").text().toLowerCase().replace("‡","");
                allSpec[singleLabel] = singleData;
            };
        }
    };
    return allSpec;
};

// get all Essentials data
async function essentialData($){
    const allInfo = $("div#specs-1-0-0 div.tech-section-row");
    const allSpec = {};
    for(let i=2; i<allInfo.length; i++){
        const singleData = $(allInfo[i]).find("div.tech-data span").text().toLowerCase();
        const singleLabel = $(allInfo[i]).find("div.tech-label span").text().toLowerCase().replace("‡","");
        allSpec[singleLabel] = singleData;
    };

    return allSpec;
};


// get all the data into a function
async function getSingleProductData(link){
    // get all the main data
    const data = await extractData(link);
    // get all product data
    const productName = await getName(data);
    console.log("Working on: " + productName);
    const productPrice = await getPrice(data);
    const allCpuData = await getAllCpuData(data);
    const allMemorySpec = await memorySpec(data);
    const allessentialData = await essentialData(data);
    const graphicsData = await processorGraphics(data);
    const testType = productName.replace(/[0-9]/g,"").split("-")[1];
    let type = "";
    if(testType == ""){
        type += "none";
    }else{
        type += testType;
    };
    let secType = "";
    if(type == "K"){
        secType += "unlock"
    }else{
        secType += "none"
    };
    const allData = {
        suffix: type,
        performType: secType,
        productName: productName,
        essentialData: allessentialData,
        cpuSpec: allCpuData,
        memorySpec: allMemorySpec,
        processorGraphics: graphicsData,
        price: productPrice,
        link: link
    };
    return allData;
};

module.exports = getSingleProductData;