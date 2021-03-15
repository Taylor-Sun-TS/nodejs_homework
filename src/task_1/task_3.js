"use strict";

import csv from "csvtojson";
import path from "path";
import fs from "fs";

const csvFilePath = path.join(__dirname, "./data.csv");
const resultFilePath = path.join(__dirname, "./results.json");

const revertInput = () => {
    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("readable", () => {
        let data
        while (data = process.stdin.read()) {
            // remove ending chars \r\n
            data = data.replace(/(\r|\n|\r\n|\n\r)$/, "");

            const outputStr = data.split("").reverse().join("")

            process.stdout.write(`${outputStr}\r\n\r\n`);
        }
    });
}

const csvToJsonFile = async () => {
    try {
        await fs.writeFileSync(resultFilePath, "", { "flag": "w" });
    } catch (error) {
        console.log(error);
        return;
    }

    const readStream = fs.createReadStream(csvFilePath);
    const writeStream = fs.createWriteStream(resultFilePath);

    readStream.pipe(csv()).pipe(writeStream);
};

export {
    revertInput,
    csvToJsonFile
};
