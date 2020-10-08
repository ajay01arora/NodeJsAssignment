const expressJwt = require('express-jwt');

function isAuthenticated() {
  return expressJwt({ secret: "MY_Secret-Key", algorithms: ['HS256'] });
}

module.exports = {
  isAuthenticated,
};
