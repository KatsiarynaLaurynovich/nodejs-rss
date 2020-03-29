const isNumber = value => typeof value === 'number' && value === value && value !== Infinity && value !== -Infinity;
const exit = process.exit;

module.exports = {
  /**
   * @param {string} value
   * @return {number}
   */
  shiftValidator: (value) => {
    if (!isNumber(parseInt(value, 10))) {
      process.stderr.write('Please, pass number as a shift \n');
      exit(1);
    
      process.on('exit', function(code) {
        return console.log(`About to exit with code ${code}`);
      }); 
    }
  
    return parseInt(value, 10);
  },

  /**
   * @param {string} type
   * @return {string}
   */
  actionValidator: (type) => {
    const types = ['encode', 'decode'];

    if (types.includes(type)) {
      return type;
    }
  
    process.stderr.write('An error occured: Available options of action are "encode" or "decode" \n');
    exit(1);
  
    process.on('exit', function(code) {
      return console.log(`About to exit with code ${code}`);
    }); 
  }
}
