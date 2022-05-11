const {repository, service} = require('../../app/getFiles')() 
const  bcrypt  =  require ( 'bcrypt' );

module.exports = class AuthenticationController{

    print(req, res){
        if(typeof req.session.user !== 'undefined'){
            res.redirect('/')

        }else
        req.flash('notify', 'some msg');
        res.redirect('/');
        // res.render('login')
    }
    login(req, res){
        if(typeof req.session.user !== 'undefined') {
            res.redirect('/');
        }
        repository('User').userByEmail(req.body.email).then(user=>{
            if(user){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    
                    let cookie = service('generatePassword')(64, ['ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz', '1234567890'])
                    repository("cookie").updateCookie(user.id, cookie).then(cookie=>{

                        user.password= null;
                        req.session.user = user;
                        console.log('test')
                        res.cookie("cookie", cookie)
                        req.flash('notify', 'Vous êtes maintenant connecté.');
                        res.redirect('/');


                    })
                    
                }
            else{
                return res.send("le mot de passe n'est pas bon")
            }


            }
            else{
                 res.send("aucun compte trouvé");
                }
            
        }, err=>{
            // console.log(err)
            return res.send('une erreur est survenue')


        })

    }
    logout(req, res, next){

        if(typeof req.session.user !== 'undefined') {
            res.clearCookie('cookie')
            delete req.session.user;
        }
        res.redirect('/');

    }
    async middleware(req,res, next){
        if(typeof req.session === 'undefined' || typeof req.session.user === 'undefined'){
            let cookie = require('cookie').parse(req.headers.cookie || "");
            if(cookie.cookie !== undefined){
            console.log('un cookie')

                await repository('cookie').cookieByCookie(cookie.cookie).then(result=>{
                    console.log("resultCookie",result)
                    if(result){
                        repository("user").userById(result.id_user).then(user=>{
                            console.log("resultUser",user)
                            if(user){
                                user.password= null;
                                req.session.user = user
                            }
                            else{
                                res.clearCookie("cookie")
                            }
                            

                        })
                        
                    }
                    else{
                        res.clearCookie("cookie")
                    }
                })
            }else{
            }
        }
            next()
            

    }
}

//let password = 'mon mot de passe'
// bcrypt . hash ( password ,  10 ,  function ( err ,  hash )  { 
//     console.log(hash)
// });