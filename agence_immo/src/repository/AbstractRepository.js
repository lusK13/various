const config = require('../../app/config.js');
const MySql = require('mysql');
 
module.exports = class AbstractRepository {
    constructor()
    {
        this.db = null;
    }
 
    insertEntity(entity)
    {
        entity.created_at = this.now();
        entity.updated_at = this.now();
        return entity;
    }
 
    connect() {
        this.db = MySql.createConnection(config.mysql);
        return this.db;
    }
 
    disconnect() {
        this.db.end();
    }
    
    now() {
        return new Date().toISOString().slice(0,19).replace('T', ' ');
    }
}

