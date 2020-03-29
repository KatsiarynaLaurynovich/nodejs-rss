const { pipeline } = require('stream');
const commander = require('commander');
const streams = require('./streams');
const validate = require('./validate');

const program = new commander.Command();
program
  .version('0.0.1')
  .requiredOption(
    '-a, --action <type>',
    'encode or decode string',
    validate.actionValidator
  )
  .requiredOption('-s, --shift <shift>', 'a shift', validate.shiftValidator)
  .option('-i, --input <input>', 'an input file to encode/decode')
  .option('-o, --output <output>', 'an output file with encoded/decoded string')
  .parse(process.argv);

const { action, shift, input, output } = program;

pipeline(
  streams.readStream(input),
  streams.transformStream(shift, action),
  streams.writeStream(output),
  err => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);
