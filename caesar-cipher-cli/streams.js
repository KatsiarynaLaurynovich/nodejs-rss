const fs = require('fs');
const stream = require('stream');
const { encrypt, decrypt } = require('./caesar-cipher-converter');
const CONSTANTS = require('./constants');
const exit = process.exit;

const isPathUndefined = path => {
  return typeof path === 'undefined';
};

module.exports = {
  /**
   * Creates readable stream
   *
   * @param {string} path
   * @return {ReadStream}
   */
  readStream: path => {
    if (isPathUndefined(path)) {
      process.stdout.write(CONSTANTS.INPUT_PROMPT);
      process.stdin.setEncoding('utf-8');

      return process.stdin;
    }

    return fs.createReadStream(path, { encoding: 'utf-8' });
  },

  /**
   * Creates writible stream
   *
   * @param {string} path
   * @return {WriteStream}
   */
  writeStream: path => {
    if (isPathUndefined(path)) {
      return process.stdout;
    }

    return fs.createWriteStream(path, { flags: 'a' });
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
