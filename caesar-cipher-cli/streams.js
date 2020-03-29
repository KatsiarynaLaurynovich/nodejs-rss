const fs = require('fs');
const stream = require('stream');
const { encrypt, decrypt } = require('./ceasar_cipher');
const exit = process.exit;

module.exports =  {
  /**
   * Creates readable stream
   *
   * @param {string} path
   * @return {ReadStream}
   */
  readStream: (path) => {
    if (path === undefined) { 
      process.stdout.write(`Please type string to decode/encode: \n`);
      process.stdin.setEncoding('utf-8');
  
      return process.stdin;
    } 

    if (fs.existsSync(path) === false) {
      process.stderr.write(`Input file does not exist. \n`);
      exit(1);
    }

    return fs.createReadStream('input.txt', { encoding: 'utf-8' });
  },

  /**
   * Creates writible stream
   *
   * @param {string} path
   * @return {WriteStream}
   */
  writeStream: (path) => {
    if (path === undefined) {
      return process.stdout;
    } 

    if (fs.existsSync(path) === false) {
      process.stderr.write(`Output file does not exist. \n`);
      exit(1);
    }

    return fs.createWriteStream(path, { flags: 'a' }).on('access', data => {
      console.log(data);
    });
  },

  /**
   * Creates transform stream
   *
   * @param {string} path
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
            process.stderr.write('An error occured: Available options of action are "encode" or "decode" \n');
            exit(1);
          
            process.on('exit', function(code) {
              return console.log(`About to exit with code ${code}`);
            }); 
          }
        done(null, data);
      }
    });
  }
}
