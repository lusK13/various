module.exports = class AbstractRepository {
    constructor(request)
    {
        this.mysql = require('mysql');
        this.config = require('../../app/config').db
        
    }

    

    add(entity) {
        return new Promise((resolve, reject) => {
            this.connect().query(`INSERT INTO ${this.tableName}  SET ?`, this.insertEntity(entity), function (error, results, fields) {  
                if (error) reject(error.message);
                else resolve(results.insertId);
            });
        });
    }

    update(entity) {            
        return new Promise((resolve, reject) => {
            if( typeof entity['id'] != 'undefined' &&  entity['id'] > 0) {
                let whereId = entity['id'];
                delete entity['id'];
                this.connect().query(`UPDATE ${this.tableName} SET ? WHERE id=?`, [this.updateEntity(entity), whereId], function (error, results, fields) {  
                    if (error) reject(error.message);
                    else resolve(results);
                });
                entity['id'] = whereId;
            } else {
                reject();
            }
        });        
    }

    delete(entity) {
        return new Promise((resolve, reject) => {
            this.connect().query(`DELETE FROM ${this.tableName} WHERE ?`, entity, function (error, results, fields) {  
                if (error) reject(false);
                else resolve(true);
            });
        });
    }

    insertEntity(entity) {
        Object.keys(entity).forEach((name) => {
            let methodeSetKey = 'set'+name.charAt(0).toUpperCase()+name.substr(1);
            // si une methode de setter Existe (il faut la supprimer)
            if(methodeSetKey in entity) {
                Reflect.deleteProperty(entity, methodeSetKey);
            }
        });
        entity.created_by = this.user(); 
        entity.updated_by = this.user();
        entity.created_at = this.now();
        entity.updated_at = this.now();
        
        return entity;
    }

    updateEntity(entity) {
        entity.updated_by = this.user();
        entity.updated_at = this.now();
        return entity;
    }
    query(query, param, callback){
        this.connect().query(query, param, callback)
    }
    connect() {
        return this.mysql.createConnection(this.config)
    }

    disconnect() {
        this.db.end();
    }
    
    now() {
        return new Date().toISOString().slice(0,19).replace('T', ' ');
    }

    user() {
        // @todo ne devrait pas faire appel au session ici, modifier pour appeler
        //       une méthode dédié à la récupération des infos utilisateurs
        let user = 0;
        if( typeof this.request != 'undefined' 
            && typeof this.request.session != 'undefined' 
            && typeof this.request.session.user != 'undefined' 
            && typeof this.request.session.user.id != 'undefined' 
            && this.request.session.user.id > 0 
        ) {
            user = this.request.session.user.id;
        }
        return user;
    }
}