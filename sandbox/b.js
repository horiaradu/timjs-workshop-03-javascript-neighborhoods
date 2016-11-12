/*
 Not working:
 const a = require('./a');
 */
module.exports = {
  b() {
    const a = require('./a');
    console.log("a: ", a.a);
    return null;
  }
};