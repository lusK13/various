const assert = require('assert');
const UserRepo = require('../src/repository/UserRepository');

describe('Vérifier email', () => {
    
    
    it('verif email true', (done) => {
      (new UserRepo).existsEmail('lucas.lardot@gmail.com').then( result=>{
        assert.strictEqual(result, true)
        done();
        });
        
      
    });
 
    it('verif email false', (done) => {
      (new UserRepo).existsEmail('lucas.lardsot@gmail.com').then( result=>{
        assert.strictEqual(result, false)
        done();
        });
        
      
    });
});











































