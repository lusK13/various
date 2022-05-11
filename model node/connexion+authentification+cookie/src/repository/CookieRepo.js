const AbstractRepository = require('./AbstractRepo.js');
module.exports = class CookieRepository extends AbstractRepository{

list(){
return new Promise((resolve, reject)=>{

    this.connect().query('SELECT * FROM cookies',{}, (error, result, field)=>{

        if(error){
            reject(error)
        }
        else{resolve(result)}

    })

})
    
}

cookieByIdUser(idUser){
    return new Promise((resolve, reject)=>{
        // console.log(super.connect())
            super.query('SELECT * FROM cookies WHERE id_user=?',[idUser], (error, result, field)=>{
    
            if(error){
                reject(error)
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
cookieByCookie(cookie){
    return new Promise((resolve, reject)=>{
        // console.log(super.connect())
            super.query('SELECT * FROM cookies WHERE cookie=?',[cookie], (error, result, field)=>{
    
            if(error){
                reject(error)
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

    updateCookie(id_user, cookie){
        return new Promise((resolve, reject)=>{
            
            super.query('INSERT INTO cookies (id_user, cookie) VALUES(?, ?) ON DUPLICATE KEY UPDATE cookie=?', [id_user, cookie, cookie], (error, result, field)=>{
                console.log(result)
                if(error){
                    reject(error)
                }
                else{
                    if(result.affectedRows >1){
                        resolve(cookie)
                    }
                }

            })


        })
    }






}