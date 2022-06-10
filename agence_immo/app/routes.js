module.exports = (app) => {

    // home
    app.get('/', (req, res) => {
        let Home = require('../src/controllers/Home');
        let Controller = new Home();
        Controller.print(req,res);
    });
    app.get('/inscription', (req, res) => {
        let User = require('../src/controllers/User');
        (new User).print(req,res);
    });
    app.post('/inscription', (req, res) => {
        console.log(req.body);
        let User = require('../src/controllers/User');
        (new User).process(req, res);
    });
    app.get('/connexion', (req, res) => {
        let User = require('../src/controllers/Authenticate.js');
        (new User).print(req, res);
    });
    app.post('/connexion', (req, res) => {
        let User = require('../src/controllers/Authenticate.js');
        (new User).process(req, res);
    });
    app.get('/deconnexion', (req, res) => {
        let Authenticate = require('../src/controllers/Authenticate.js');
        (new Authenticate).disconnect(req, res);
    });
     
     app.get('/mot_de_passe_oublie', (req, res) => {
        let Regen = require('../src/controllers/ResetPassword.js');
        (new Regen).print(req, res);
    });
    app.post('/mot_de_passe_oublie', (req, res) => {
        let Regen = require('../src/controllers/ResetPassword.js');
        (new Regen).process(req, res, app);
    });


    app.use((req, res, next)=>{
        if(req.cookies.cookie){
            let Authenticate = require('../src/controllers/Authenticate.js');
            let user =  (new Authenticate).user(req, res).then(
                result=>{
                    if(result.role === 'admin'){
                        req.user = result
                        req.user.admin = true;
                        next()
                    }
                    else
                    if(result.role === null){
                            req.user = result
                            next()
                        }
                    
                },rej=>{
                    res.redirect('/')
                }
            )
        }
        else
        res.send('404 not found')
        
        

    })
    // administrateur
    app.get('/admin', (req, res, next) => {
        if(req.user.admin){
            let User = require('../src/controllers/Admin.js');
            (new User).print(req, res);
        }
        else next()
    });
    app.get('/admin/biens', (req, res, next) => {
        if(req.user.admin){
        let Property = require('../src/controllers/Property.js');
        (new Property).list(req, res);
        }
        else next()
    });

    app.get('/admin/ajouter_bien', (req, res) => {
        let Property = require('../src/controllers/Property.js');
        (new Property).print(req, res);
    });
    app.post('/admin/ajouter_bien', (req, res) => {
        console.log(req.files)
        let Property = require('../src/controllers/Property.js');
        (new Property).process(req, res);
    });
    app.get('/admin/bien/supprimer/:id', (req, res) => {
        let Property = require('../src/controllers/Property.js');
        (new Property).deleteProperty(req, res);
    });
    app.get('/admin/bien/modifier/:id', (req, res) => {
        let Property = require('../src/controllers/Property.js');
        (new Property).printUpdateProperty(req, res);
    });
    app.post('/admin/bien/modifier/:id', (req, res) => {
        let Property = require('../src/controllers/Property.js');
        (new Property).updateProperty(req, res);
    });
    app.get('/admin/utilisateurs', (req, res) => {
        let Users = require('../src/controllers/User.js');
        (new Users).printList(req, res);
    });
    app.get('/admin/user/modifier/:id', (req, res) => {
        let Users = require('../src/controllers/User.js');
        (new Users).printUpdateUser(req, res);
    });
    app.post('/admin/user/modifier/:id', (req, res) => {
        let Users = require('../src/controllers/User.js');
        (new Users).updateUser(req, res);
    });
    app.get('/admin/user/supprimer/:id', (req, res) => {
        let Users = require('../src/controllers/User.js');
        (new Users).deleteUser(req, res);
    });
    app.use('/admin/', (req, res)=>{

        res.send('vous n\'avez pas les droits pour acceder à cette page')

    })

};
