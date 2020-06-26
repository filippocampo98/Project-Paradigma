const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { checkValidation } = require('../middleware/valido');
//controllare se i dati immessi sono corretti
router.post('/login', [
    check('nick').isString(),
    check('password').isString().isLength({ min: 2 })
  ], checkValidation, function(req, res) {
    const filter = {
      nick: req.body.nick,
      password: new Buffer(
          crypto.createHash('sha256').update(req.body.password, 'utf8').digest()
        ).toString('base64')
    };
    User.findOne(filter, (err, user) => {
      if(err) {
        return res.status(500).json({error: err});
      }
      if (!user) {
        return res.status(401).json({message: 'Invalid nick or password'});
      }
      /*const accessToken = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: "1 hour"});
      const bodyResponse = {
        accessToken,
        expiresIn: 3600
      };*/
      res.json(bodyResponse);
    });
  });
module.exports = router;