const fs = require('fs');
const CONSTANTS = require('./constants');

const exit = process.exit;

process.on('exit', code =>
  console.log(`\nCLI is about to exit with code ${code}`)
);

const printError = error => {
  process.stderr.write(error);
  exit(1);
};

const isFileAbsent = path => {
  // eslint-disable-next-line no-sync
  return fs.existsSync(path) === false;
};

module.exports = {
  /**
   * @param {string} value
   * @return {number}
   */
  shiftValidator: value => {
    if (!Number.isInteger(parseInt(value, 10))) {
      printError(CONSTANTS.SHIFT_TYPE_ERROR);
    }

    return parseInt(value, 10);
  },

  /**
   * @param {string} type
   * @return {string}
   */
  actionValidator: type => {
    const types = ['encode', 'decode'];

    if (!types.includes(type)) {
      printError(CONSTANTS.ACTION_TYPE_ERROR);
    }

    return type;
  },

  /**
   * @param {string} path
   * @return {string}
   */
  inputValidator: path => {
    if (isFileAbsent(path)) {
      printError(CONSTANTS.INPUT_ERROR);
    }

    return path;
  },

  /**
   * @param {string} path
   * @return {string}
   */
  outputValidator: path => {
    if (isFileAbsent(path)) {
      printError(CONSTANTS.OUTPUT_ERROR);
    }

    return path;
  }
};
