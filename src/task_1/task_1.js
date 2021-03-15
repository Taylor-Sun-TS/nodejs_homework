"use strict";

const readline = require("readline");

const revertInput = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.prompt();

    rl.on("line", (data) => {
        console.log(data.split("").reverse().join(""));

        rl.prompt();
    });
}

revertInput();
