"use strict";

const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
const csvFilePath = path.join(__dirname, "./data.csv");
const resultFilePath = path.join(__dirname, "./results.json");

const csvToJsonFile = async () => {
    try {
        await fs.writeFileSync(resultFilePath, "", { "flag": "w" });

        const readStream = fs.createReadStream(csvFilePath);
        const writeStream = fs.createWriteStream(resultFilePath);

        readStream.pipe(csv()).pipe(writeStream);
    } catch (error) {
        console.log(error);
        return;
    }
};

csvToJsonFile();
