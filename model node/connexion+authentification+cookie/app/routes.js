let errorsHTTP = require('./errorsHTTP.js')();
let loader = require('./getFiles.js');



module.exports = (app) => {
    app.use(require('body-parser').urlencoded({ extended: true }));
    
    app.use(loader().controller('Authentication').middleware)
 
    // ACCUEIL
    app.route("/")
    .get(loader().controller('Home').print)
    .all(errorsHTTP.error405)
    

    //LOGIN
    app.route("/login")
    .get(loader().controller('Authentication').print)
    .post(loader().controller('Authentication').login)
    .all(errorsHTTP.error405)

    //LOGOUT
    app.route("/logout")
    .get(loader().controller('Authentication').logout)
    .all(errorsHTTP.error405)



    //REGISTER
    app.route("/register")
    .get(loader().controller('User').register)
    .post(loader().controller('User').add)
    .all(errorsHTTP.error405)


   

    
    //-------------------------------------------------------------------------------------
    //                  Erreur 404 (doit être en derniere)
    //-------------------------------------------------------------------------------------
    app.route("*").all(errorsHTTP.error404);
};