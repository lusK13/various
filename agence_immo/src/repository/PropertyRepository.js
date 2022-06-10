const AbstractRepository = require('./AbstractRepository.js');
 
module.exports = class PropertyRepository extends AbstractRepository {
    

    list(){
        return new Promise((res, rej)=>{
            this.connect().query('SELECT * FROM property', [], (err, result, field)=>{
                if(err){
                    rej()
                }
                else{
                    res(result)
                }
            })
        })
    }
    add(property, forceDisconnect = true) {
        return new Promise((resolve, reject) => {
            // On vérifie si l'adresse email existe déjà en BDD
                    console.log(property)
                    this.insertEntity(property);
                    this.connect().query('INSERT INTO property (title, type, square, num_street,postal_code, city,  created_at, updated_at) VALUES(?,?,?,?,?,?,?,?)', [property.title, property.type, property.square, property.num_street, property.postal_code, property.city, property.created_at, property.updated_at], function (error, results, fields) {        
                        if (error) { reject(error.message); }
                        resolve(results.insertId);
                    });
                    if(forceDisconnect) this.disconnect();
            
                // Déconnexion de MySql
        });
    }
    delete(property, forceDisconnect = true) {
        return new Promise((resolve, reject) => {
            

                this.connect().query('DELETE FROM property WHERE id=?', [property], function (error, results, fields) {        
                    if (error) { reject(error.message); }
                        resolve(results);
                    });
                    // Déconnexion de MySql
                if(forceDisconnect) this.disconnect();
        })
    }
    updateProperty(property){
        this.insertEntity(property);
        return new Promise((res, rej)=>{
            this.connect().query('UPDATE property SET title=?, type=?, square=?, num_street=?, postal_code=?, city=?, updated_at =? WHERE id=?', [property.title, property.type, property.square, property.num_street, property.postal_code, property.city, property.updated_at, property.id], (error, results, fields)=>{
                if(error){rej(error.message)}
                else{
                    res(results)
                }

            })
        })
        
    }
    getProperty(id){
        return new Promise((res, rej)=>{
            this.connect().query('SELECT * FROM property WHERE id=?', [id], function (error, results, fields) {        
                if (error) { rej(error.message); }
                else{
                    if(results.length === 1)
                    res(results)
                }
                rej('une erreur est survenu')
                
            });

        })
        
    }
}

