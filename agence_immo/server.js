const express = require('express');
const app = express();
const path = require('path');
const config = require('./app/config');
const cookieParser = require('cookie-parser')

//pug
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');


const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser())

//Express-session
const session = require('express-session');
app.use(session({
    secret: config.appKey, resave:false, saveUninitialized:false, 
    cookie: {maxAge: 3600000} 
}));

//message flash
const flash = require('express-flash-messages');
app.use(flash());


//static
app.use(express.static(path.join(__dirname, 'public')));

//Envoi de variable à toute les vues
app.use((req,res,next) => {
    res.locals.session = req.session;
    res.locals.websiteName = config.websiteName;
    next();
});

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
  }));
  

//mes routes
require('./app/routes')(app);

app.listen(config.port,() => {
    console.log(`Le serveur est démarré : http://localhost:${config.port}`);
});