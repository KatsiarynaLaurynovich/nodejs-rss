const { pipeline } = require('stream');
const commander = require('commander');
const streams = require('./streams');
const validate = require('./validate');
const CONSTANTS = require('./constants');

const program = new commander.Command();

program.storeOptionsAsProperties(false);

program
  .version('0.0.1')
  .requiredOption(
    '-a, --action <type>',
    'encode or decode string',
    validate.actionValidator
  )
  .requiredOption('-s, --shift <shift>', 'a shift', validate.shiftValidator)
  .option(
    '-i, --input <input>',
    'an input file to encode/decode',
    validate.inputValidator
  )
  .option(
    '-o, --output <output>',
    'an output file with encoded/decoded string',
    validate.outputValidator
  )
  .parse(process.argv);

const { action, shift, input, output } = program.opts();

pipeline(
  streams.readStream(input),
  streams.transformStream(shift, action),
  streams.writeStream(output),
  err => {
    if (err) {
      console.error(CONSTANTS.PIPELINE_ERROR, err);
    } else {
      console.log(CONSTANTS.PIPELINE_SUCCESS);
    }
  }
);
