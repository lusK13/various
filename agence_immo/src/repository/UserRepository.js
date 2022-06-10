const { genSalt } = require('bcryptjs');
const AbstractRepository = require('./AbstractRepository.js');
const MyFunctions = require('../services/MyFunctions.js')
module.exports = class UserRepository extends AbstractRepository {
    
    add(user, forceDisconnect = true) {
        return new Promise((resolve, reject) => {
            // On vérifie si l'adresse email existe déjà en BDD
            this.existsEmail(user.mail).then((result) => {
                if(result) {
                    reject(`L'adresse email "${user.mail}" est déjà présente dans notre base de données.`);
                } else {
                    this.insertEntity(user);
                    this.connect().query('INSERT INTO users (lastname, firstname, mail, password, created_at, updated_at) VALUES(?,?,?,?,?,?)', [user.lastname, user.firstname, user.mail, user.password, user.created_at, user.updated_at], function (error, results, fields) {        
                        if (error) { reject(error.message); }
                        resolve(results.insertId);
                    });
                }
 
                // Déconnexion de MySql
                if(forceDisconnect) this.disconnect();
            }, reject);
        });
    }
 
    existsEmail(email) {
        return new Promise((resolve, reject) => {
            this.connect().query('SELECT id FROM users WHERE mail= ?', email, function (error, results, fields) {
                if (error) { reject(error.message);}
                // n'existe pas
                if(results.length == 0) resolve(false);
                // existe
                else resolve(true);
            });
        }).then((result)=>{
            return result
        });
    }
    findByEmail(email){
        return new Promise((resolve, reject) => {
            this.connect().query('SELECT id, mail, password FROM users WHERE mail= ?', email, function (error, results, fields) {
                
                if (error) { reject(error.message);}
                // n'existe pas
                if(results.length == 0) resolve(false);
                // existe
                else resolve(results[0]);
            });
        });
    }
    resetPass(user, forceDisconnect = true) {
        return new Promise((resolve, reject) => {
            // On vérifie si l'adresse email existe déjà en BDD
            this.existsEmail(user.mail).then((result) => {
                if(result) {
                    this.insertEntity(user);
                    this.connect().query('INSERT INTO generate_link_password (link, mail, created_at) VALUES(?,?,?)', [user.aleatoire, user.mail, user.created_at], function (error, results, fields) {    
                        if (error) { reject(error.message); }
                        resolve(user.mail);
                    });
                } 
                // Déconnexion de MySql
                if(forceDisconnect) this.disconnect();
            }, reject);
        });
    }
    list(){
        return new Promise((res, rej)=>{
            this.connect().query('SELECT users.*, roles.id as role_id, roles.name as name FROM users LEFT JOIN links_roles_user ON links_roles_user.id_user=users.id LEFT JOIN roles ON roles.id = links_roles_user.id_role', [], (err, result, field)=>{
                if(err){
                    rej()
                }
                else{
                    console.log(result)
                    res(result)
                }
            })
        })
    }

    delete(user, forceDisconnect = true) {
        return new Promise((resolve, reject) => {
            

                this.connect().query('DELETE FROM users WHERE id=?', [user], function (error, results, fields) {        
                    if (error) { reject(error.message); }
                        resolve(results);
                    });
                    // Déconnexion de MySql
                if(forceDisconnect) this.disconnect();
        })
    }
    updateUser(user){
        this.insertEntity(user);
        return new Promise((res, rej)=>{
            this.connect().query('UPDATE users SET mail=?, lastname=?, firstname=?, updated_at =? WHERE id=?', [user.mail, user.lastname, user.firstname, user.updated_at, user.id], (error, results, fields)=>{
                if(error){rej(error.message)}
                else{

                    
                            res(results)
                    }

            })
        })
        
    }

    getUser(id){
        return new Promise((res, rej)=>{
            this.connect().query('SELECT * FROM users WHERE id=?', [id], function (error, results, fields) {        
                if (error) { rej(error.message); }
                else{
                    if(results.length === 1)
                    res(results)
                }
                rej('une erreur est survenu')
                
            });

        })
        
    }



    updateCookie(id){
        return new Promise((resolve, reject)=>{
            this.connect().query('SELECT * FROM cookies WHERE id_user = ?', [id], (err, result, field)=>{
                if(err){
                    console.log(err)
                    reject()
                }
                else{
                    if(result.length == 0){
                        let newCookie = (new MyFunctions).generatePsswrd(64)
                        console.log(id)
                        this.connect().query('INSERT INTO cookies (id_user, cookie) VALUES(?,?)',[id, newCookie], (err, result)=>{
                            console.log(result)

                        })
                    }
                    else{

                        resolve(result[0].cookie)
                    }
                }
            })
        })
    }
    getUserPerCookie(cookie){
        return new Promise((resolve, reject)=>{
            this.connect().query(`
                SELECT users.id, users.lastname, users.firstname, roles.name as role FROM cookies
                LEFT JOIN users ON users.id = cookies.id_user
                LEFT JOIN links_roles_user ON links_roles_user.id_user = users.id
                LEFT JOIN roles ON roles.id = links_roles_user.id_role
                WHERE cookie = ?`, [cookie], (err, result, field)=>{
                if(err){
                    console.log(err)
                    reject()
                }
                else{
                    if(result.length == 1){
                        resolve(result[0])
                    }
                    else{

                        reject()
                    }
                }
            })
        })
    }
}