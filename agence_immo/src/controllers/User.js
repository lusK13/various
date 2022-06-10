const UserEntity = require("../entity/UserEntity");
const UserRepository = require("../repository/UserRepository");

module.exports = class User {
    print(req, res) {
        if(typeof req.session.user !=="undefined") {
            res.redirect('/');
        }
        else{
        res.render('inscription');  

        }
    }

    process(req, res) {
        let user = new UserEntity();
        user.lastname = req.body.lastname; 
        user.firstname = req.body.firstname; 
        user.mail = req.body.mail;

        let bcrypt = require('bcryptjs');
        user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

 
        (new UserRepository).add(user).then((result) => {
            req.flash('notify', 'Votre compte a bien été créé.');
            res.redirect('/');
        }, (message) => {
            req.flash('error', message);
            res.redirect('/inscription');
        });   
    }
    printList(req, res) {
        if(typeof req.session.user =="undefined1") {
            res.redirect('/');
        }
        else{
            let Users = new UserRepository();
        return Users.list().then((result)=>{
            // console.log(result)
            res.render('admin/usersList', {result});
        })

        }
    }


    deleteUser(req, res){
        // console.log(req.params.id);
        // this.setProperty(propertyId).then((result)=>{
        //          result
        // })
        (new UserRepository).delete(req.params.id).then((result)=>{
    
            console.log(result);
            req.flash('notify', 'Ce bien a été supprimé');
            res.redirect('/admin/utilisateurs');
    
        }, ()=>{
            req.flash('notify', 'Une erreur est survenu');
            res.redirect('/admin/utilisateurs');
        })
    
        }
        printUpdateUser(req,res){
    
            (new UserRepository).getUser(req.params.id).then(result=>{
    
                console.log(result);
                res.render('admin/update_user', {user:result[0]});
    
            }, ()=>{
                req.flash('notify', 'Une erreur est survenu');
                res.redirect('/admin/utilisateurs');
            })
    
        }
        updateUser(req, res){
    
            let user = new UserEntity();
            user.id = req.body.id;
            user.mail = req.body.mail;
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
                
            if(req.params.id === user.id)
            (new UserRepository).updateUser(user).then(result=>{
    
                req.flash('notify', 'Le bien à bien été modifié')
                res.redirect('/admin/utilisateurs')
    
            }, message=>{
                req.flash('notify', message)
                res.redirect('/admin/utilisateurs')
            })
    
        }
}
