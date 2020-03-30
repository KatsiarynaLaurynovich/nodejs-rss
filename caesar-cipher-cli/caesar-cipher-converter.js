const { EOL } = require('os');

module.exports = {
  /**
   * @param {number} shift
   * @param {string} text
   * @return {string}
   */
  encrypt: (shift, text) => caesar(shift, text),

  /**
   * @param {number} shift
   * @param {string} text
   * @return {string}
   */
  decrypt: (shift, text) => caesar((26 - shift) % 26, text)
};

/**
 * @param {number} shift
 * @param {string} text
 * @return {string}
 */
function caesar(shift, text) {
  if (shift < 0 || shift >= 26) console.error('Shift is out of range');

  let output = '';
  const len = text.length;

  for (let i = 0; i < len; i += 1) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      // uppercase
      output += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) {
      // lowercase
      output += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      output += text.charAt(i);
    }
  }
  return `${output}${EOL}`;
}
