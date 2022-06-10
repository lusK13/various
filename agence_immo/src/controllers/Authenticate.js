const UserRepository = require('../repository/UserRepository.js');
 
module.exports = class Authenticate {
 
    print(req, res) {
        if(typeof req.session.user !== 'undefined') {
            res.redirect('/');
        }
        else{
            res.render('form_auth.pug');
        }
    }
 
    process(req, res) {
        // on doit recevoir les champs email et password
        if(req.body.mail != undefined && req.body.password != undefined) {
            let UserRepo = new UserRepository
            UserRepo.findByEmail(req.body.mail).then((result) => {
                let bcrypt = require('bcryptjs');
                if(bcrypt.compareSync(req.body.password, result.password)) {
                    UserRepo.updateCookie(result.id).then(
                        (resul)=>{
                            req.session.user = true;
                            console.log(resul)
                            res.cookie('cookie', resul);
                            let cookie = {result}
                            res.cookies = cookie
                            req.user  = 'user'
                            req.flash('notify', 'Vous êtes maintenant connecté.');
                            res.redirect('/');
                            
                        }, (err)=>{
                            console.log(err)
                            res.redirect('/connexion')
                        }
                    )
                    
                    
                } else {
                    req.flash('error', `Erreur d'identification`);
                    res.redirect('/connexion');
                }
            }, (message) => {
                req.flash('error', `Erreur d'identification`);
                res.redirect('/connexion');
            });
        } else {
            req.flash('error', `Petit malin ^^`);
            res.redirect('/connexion');
        }
    }
    disconnect(req, res) {
        if(typeof req.session.user !== 'undefined') {
            delete req.session.user;
        }
        res.redirect('/');
    }
    user(req, res, next){

        return (new UserRepository).getUserPerCookie(req.cookies.cookie).then(result=>{
            return result;
        }
        )
        
    }

};

