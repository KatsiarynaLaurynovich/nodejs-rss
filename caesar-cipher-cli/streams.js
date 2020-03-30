const fs = require('fs');
const path = require('path');
const stream = require('stream');
const { encrypt, decrypt } = require('./caesar-cipher-converter');
const CONSTANTS = require('./constants');
const exit = process.exit;

const isPathUndefined = value => {
  return typeof value === 'undefined';
};

const pathToFile = value => {
  return value ? path.join(__dirname, value) : value;
};

module.exports = {
  /**
   * Creates readable stream
   *
   * @param {string} value
   * @return {ReadStream}
   */
  readStream: value => {
    const pathFile = pathToFile(value);

    if (isPathUndefined(pathFile)) {
      process.stdout.write(CONSTANTS.INPUT_PROMPT);
      process.stdin.setEncoding('utf-8');

      return process.stdin;
    }

    return fs.createReadStream(pathFile, { encoding: 'utf-8' });
  },

  /**
   * Creates writible stream
   *
   * @param {string} value
   * @return {WriteStream}
   */
  writeStream: value => {
    const pathFile = pathToFile(value);

    if (isPathUndefined(pathFile)) {
      return process.stdout;
    }

    return fs.createWriteStream(pathFile, { flags: 'a' });
  },

  /**
   * Creates transform stream
   *
   * @param {number} shift
   * @param {string} action
   * @return {module:stream.internal.Transform}
   */
  transformStream: (shift, action) => {
    return new stream.Transform({
      readableObjectMode: true,
      writableObjectMode: true,
      transform: (chunk, encoding, done) => {
        let data;
        switch (action) {
          case 'encode':
            data = encrypt(shift, chunk);
            break;
          case 'decode':
            data = decrypt(shift, chunk);
            break;
          default:
            process.stderr.write(CONSTANTS.ACTION_TYPE_ERROR);
            exit(1);
        }
        done(null, data);
      }
    });
  }
};
