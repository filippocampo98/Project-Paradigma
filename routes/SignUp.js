const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const User = require('../models/user');
const { checkValidation } = require('../middleware/valido');

router.post('/signUp', [check('name').isString(),
check('nick').isString(),
check('password').isString().isLength({ min: 2 })
],  checkValidation, (req, res, next)=>{
    //aggiungo il nuovo utente
    const newUser=new newUser(req.body);
    newUser.password = new Buffer(
        crypto.createHash('sha256').update(req.body.password, 'utf8').digest()
      ).toString('base64');
      User.findOne({nick: request.body.nick})
      .exec(function(err, user) {
        if(err) return response.status(500).json({error:err});
        if(user) return response.status(404).json({message: 'Nick not available'})
      else{
        newUser.save(function(err){
         if(err) {
          return res.status(409).json({
              error: "Invalid nick"
            });
          return res.status(500).json({error: err});
          } 
        res.status(201).json(newUser);
        });
      }
    });
})
//salvare utente, controllare che il nick sia univoco
module.exports = router;