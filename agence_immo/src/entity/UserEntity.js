module.exports = class User {
    
    id;
    civility;
    lastname;
    firstname;
    phone;
    mail;
    password;
 
    get id() {
        return this.id;
    }
    set id(id) {
        this.id = id;
    }
     get lastname() {
        return this.lastname;
    }
    set lastname(lastname) {
        this.lastname = lastname;
    }
    get firstname() {
        return this.firstname;
    }
    set firstname(firstname) {
        this.firstname = firstname;
    }
    get mail() {
        return this.email;
    }
    set mail(mail) {
        this.mail = mail;
    }
    get password() {
        return this.password;
    }
    set password(password) {
        this.password = password;
    }
}
