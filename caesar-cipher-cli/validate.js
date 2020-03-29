const fs = require('fs');
const CONSTANTS = require('./constants');

const MODULE_NAME = 'validate.js';

const exit = process.exit;

process.on('exit', code => console.log(`\nAbout to exit with code ${code}`));

module.exports = {
  /**
   * @param {string} value
   * @return {number}
   */
  shiftValidator: value => {
    if (!Number.isInteger(parseInt(value, 10))) {
      process.stderr.write(`${MODULE_NAME}, ${CONSTANTS.SHIFT_ERROR}`);
      exit(1);
    }

    return parseInt(value, 10);
  },

  /**
   * @param {string} type
   * @return {string}
   */
  actionValidator: type => {
    const types = ['encode', 'decode'];

    if (types.includes(type)) {
      return type;
    }

    process.stderr.write(`${MODULE_NAME}, ${CONSTANTS.ACTION_ERROR}`);
    exit(1);
  },

  /**
   * @param {string} path
   * @return {string}
   */
  inputValidator: path => {
    // eslint-disable-next-line no-sync
    if (fs.existsSync(path) === false) {
      process.stderr.write(`${MODULE_NAME} ${CONSTANTS.INPUT_ERROR}`);
      exit(1);
    }

    return path;
  },

  /**
   * @param {string} path
   * @return {string}
   */
  outputValidator: path => {
    // eslint-disable-next-line no-sync
    if (fs.existsSync(path) === false) {
      process.stderr.write(`${MODULE_NAME}, ${CONSTANTS.OUTPUT_ERROR}`);
      exit(1);
    }

    return path;
  }
};
