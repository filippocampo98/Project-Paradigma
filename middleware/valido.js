const { validationResult } = require('express-validator');
//validationResult(req) ritorna un oggetto result cioè lo stato della richiesta se in errore
function checkValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

module.exports.checkValidation = checkValidation;