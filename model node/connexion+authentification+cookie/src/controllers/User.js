const {repository} = require('../../app/getFiles')() 
const  bcrypt  =  require ( 'bcrypt' );

module.exports = class UserController{


    register(req, res){
        res.render('register')
    }
    add(req,res){

        repository('User').emailExist(req.body.email)
        console.log(req.body)
        res.end()
    }

}