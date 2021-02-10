var jwt = require('jsonwebtoken');
var config = require('../config/configToken');

const verifyToken=(req, res, next)=>{
  var token = req.headers['token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
    
  jwt.verify(token, config.secret, async function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
    // if everything good, save to request for use in other routes
    next();
  });
}
// const userAuth123=0;

module.exports = verifyToken