/*
 Not working:
 const b = require('./b');
 */
module.exports = {
  a() {
    const b = require('./b');
    b.b();
  }
};