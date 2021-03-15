"use strict";

const readline = require("readline");

const revertInput = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    rl.on("line", (data) => {
        if (data) {
            console.log(data.split("").reverse().join(""));
            console.log();
        }
    });
}

revertInput();
