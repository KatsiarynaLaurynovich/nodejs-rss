const CONSTANTS = {
  ACTION_TYPE_ERROR:
    'An error occured. Available options of action are "encode" or "decode" \n',
  SHIFT_TYPE_ERROR: 'An error occured. Please, pass number as a shift \n',
  INPUT_PROMPT: 'Please, type string to decode/encode: \n',
  INPUT_ERROR: 'An error occured. Input file does not exist. \n',
  OUTPUT_ERROR: 'An error occured. Output file does not exist. \n',
  PIPELINE_ERROR: 'Pipeline failed. Message is not encrypted/decripted. \n',
  PIPELINE_SUCCESS: 'Pipeline succeeded. Message is converted. \n'
};

module.exports = CONSTANTS;
