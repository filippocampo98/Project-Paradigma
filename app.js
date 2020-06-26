const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
app.use(bodyParser.json());
app.use(cors());//per rendere l'app raggiungibile da client web
//Importo i router ci vuole .js?
const CalcolatriceRouter = require('./routes/Calcolatrice');
const LoginRouter = require('./routes/Login');
const SignUpRouter = require('./routes/SignUp');
//Utilizzo i router su /benvenuto
app.use('/', CalcolatriceRouter);
app.use('/', LoginRouter);
app.use('/', SignUpRouter);
// Database configuration
const host = 'localhost';
const dbName = 'Project_Paradigma';

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://'+ host + '/' + dbName);

const db = mongoose.connection;
db.on('error', function() {
  console.error('Connection error!')
});
db.once('open', function() {
  console.log('DB connection Ready');
});
// url: /benvenuto
app.get('/', (req, res, next)=>{
    res.json({message: "OK, I'm on."});
    next();//nel caso dovessi mettere piu middleware
});
// Catch 404 errors
//app.use prende sempre un middleware coem parametro
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // Error handler
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
module.exports=app;