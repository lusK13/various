const AbstractRepository = require('./AbstractRepo.js');

module.exports = class UserRepository extends AbstractRepository{

// constructor(){


//     this.db = require('mysql');


// }

// connect(){

//     return this.db.createConnection(config.db)
// }


list(){
return new Promise((resolve, reject)=>{

    this.connect().query('SELECT * FROM users',{}, (erreur, result, field)=>{

        if(erreur){
            reject(erreur)
        }
        else{resolve(result)}

    })

})
    
}

userByEmail(email){
    return new Promise((resolve, reject)=>{
        // console.log(super.connect())
            super.query('SELECT * FROM users WHERE email=?',[email], (erreur, result, field)=>{
    
            if(erreur){
                reject(erreur)
            }
            else{
                if(result.length===1)
                resolve(result[0])
                else
                resolve(false);
                    
            }
    
        })
    
    })
        
    }
    userById(id){
        return new Promise((resolve, reject)=>{
            // console.log(super.connect())
                super.query('SELECT * FROM users WHERE id=?',[id], (erreur, result, field)=>{
        
                if(erreur){
                    reject(erreur)
                }
                else{
                    if(result.length===1)
                    resolve(result[0])
                    else
                    resolve(false);
                        
                }
        
            })
        
        })
            
        }

    emailExist(email){

        return new Promise((resolve, reject)=>{

            this.connect


        })

    }






}