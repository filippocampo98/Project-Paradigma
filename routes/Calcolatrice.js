const express = require('express');
const Calcolo = require('../models/calcolo');
const { check } = require('express-validator');
const { checkValidation } = require('../middleware/valido');
const { response } = require('express');
const router = express.Router();
router.get('/calcolatrice',[
    check('funzione').isString(),
    check('argomento').isString()
  ], checkValidation, (req, res, next)=>{
      var i=1;
      var operazione="o";
      while(i<req.body.argomento.lenght && operazione=="o"){
          switch(req.body.argomento[i]){ 
              case "+": operazione="+";
                break;
            case "-": operazione="-";
                break;
            case "*": operazione="*";
                break;
            case "/": operazione="/";
                break;
            case "%": operazione="%";
                break;
            case ",": operazione=",";
                break;                
            default: i++;
        }
    }
    var funzione;
    var index;
    if(req.body.argomento[0]=="s"){
        if(req.body.argomento[3]=="("){
            funzione="sen";
            index=4;
        }
        else if(req.body.argomento[3]=="h"){
            funzione="senh";
            index=5;
        }
        else {
            funzione="sqrt";
            index=5;
        }
    }else if(req.body.argomento[0]=="c"){
        if(req.body.argomento[3]=="(") {
            funzione="cos";
            index=4;
        }
        else {
            funzione="cosh";
            index=5;
        }
    }else if(req.body.argomento[0]=="t"){
        if(req.body.argomento[3]=="(") {
            funzione="tan";
            index=4;
        }
        else {
            funzione="tanh";
            index=5;
        }
    }
    else if(req.body.argomento[0]=="e") {
        funzione="pow";
        index=4;
    }
    else if(req.body.argomento[0]=="l") {
        funzione="log";
        index=4;
    }
    else if(req.body.argomento[0]=="a") {
        funzione="arctg";
        index=6;
    }
    else funzione="none";

        var argomento=number(req.body.argomento.substring(index, i-1));//oppure usare round()
        var subrest=argomento;
        if(i<req.body.argomento.lenght){
            var arg2=number(req.body.argomento.substring(i+1));
            switch(operazione){
                case "+": 
                    subrest=argomento+arg2;
                    break;
                case "-":
                    subrest=argomento-arg2;
                    break;
                case "*":
                    subrest=argomento*arg2;
                    break;
                case "/":
                    subrest=argomento/arg2;
                    break;
                case "%":
                    subrest=argomento%arg2;
                    break;
                case ",": break;
                default: return res.Status(500).json({message: "Operazione non supportata"});
            }
        }
        var Calc;
    switch(funzione){
        case "sen":  Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.sin(subrest)});
            res.json(Calc);
            break;
        case "cos":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.cos(subrest)});
            res.json(Calc);
            break;
        case "log":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.log(subrest)});
            res.json(Calc);
            break;
        case "pow":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.pow(argomento, arg2)});
            res.json(Calc);
            break;
        case "sqrt":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.sqrt(subrest)});
            res.json(Calc);
            break;
        case "tan":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.tan(subrest)});
            res.json(Calc);
            break;
        case "tanh":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.tanh(subrest)});
            res.json(Calc);
            break;
        case "arctg":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.arctg(subrest)});
            res.json(Calc);
            break;
        case "cosh":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.cosh(subrest)});
            res.json(Calc);
            break;
        case "senh":
             Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: Math.sinh(subrest)});
            res.json(Calc);
            break;
        default:  Calc=new Calcolo({author: req.body.author, funzione: req.body.funzione, argomento: req.body.argomento, risultato: subrest});
            res.json(Calc);
    }
});
// prova a salvare se esiste semplicmente risponde che c'è già
router.post('/calcolatrice', [
    check('funzione').isString(),
    check('argomento').isNumeric()
  ], checkValidation, function(req, res){
    Calcolo.findOne({author:req.body.author, funzione: req.body.funzione, argomento: req.body.argomento}).exec(function(err, Calcolo){
        if(err) return response.status(500).json({error: err});
        if(Calcolo) res.json({message: 'Già salvato!'});
        else{
            const nCalcolo = new Calcolo(req.body);
            nCalcolo.save(function(err){
                if(err) return res.status(500).json({message: 'Something went wrong'});
                return res.status(201).json(nCalcolo);
            })
        }
    })
});
//Funzioni da implementare: calcola, cerca, salva(se è loggato);
module.exports = router;
/*nel caso volessi dare anche l'oportunita di cancellare 
i calcoli sbagliati deve essere fatto con 
var Calcolo=monoogose.model('Calcolo', calcoloschema);
calcolo.remove({funzione: req.body.funzione, argomento: req.body.argomento}, function(err)){
    if(err){...ecc}
})
per cercare vedere slide monogse pag 10
findone trova il rpimo elemento che soddisfa la ricerca
find tutti
findbyid invece per lid specificato

where utilizzato con
gt/gte (greater o greater than equal)
lt/lte less e less than
equals /ne uguale o diverso
in (in un a serie di vaori) esempio pag 12
_id sempre presente*/