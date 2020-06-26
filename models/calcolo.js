const mongoose = require('mongoose');

const CalcoloSchema = mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'User'},
    funzione: String,
    argomento: {type: String, required: true},
    risultato: Number
});

const Calcolo = mongoose.model('Calcolo', CalcoloSchema);

module.exports = Calcolo;