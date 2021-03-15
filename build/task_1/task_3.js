"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.csvToJsonFile = exports.revertInput = void 0;

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.promise.js");

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const csvFilePath = _path.default.join(__dirname, "./data.csv");

const resultFilePath = _path.default.join(__dirname, "./results.json");

const revertInput = () => {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("readable", () => {
    let data;

    while (data = process.stdin.read()) {
      // remove ending chars \r\n
      data = data.replace(/(\r|\n|\r\n|\n\r)$/, "");
      const outputStr = data.split("").reverse().join("");
      process.stdout.write("".concat(outputStr, "\r\n\r\n"));
    }
  });
};

exports.revertInput = revertInput;

const csvToJsonFile = async () => {
  try {
    await _fs.default.writeFileSync(resultFilePath, "", {
      "flag": "w"
    });
  } catch (error) {
    console.log(error);
    return;
  }

  const readStream = _fs.default.createReadStream(csvFilePath);

  const writeStream = _fs.default.createWriteStream(resultFilePath);

  readStream.pipe((0, _csvtojson.default)()).pipe(writeStream);
};

exports.csvToJsonFile = csvToJsonFile;