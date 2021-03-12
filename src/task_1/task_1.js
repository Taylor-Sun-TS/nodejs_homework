"use strict";

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

revertInput();
