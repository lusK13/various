const PropertyEntity = require("../entity/PropertyEntity");
const PropertyRepository = require("../repository/PropertyRepository");
const MailerService = require('../services/Mailer.js');

module.exports = class User {
    
    print(req, res) {
        if(typeof req.session.user !=="undefined") {
            res.redirect('/');
        }
        else{
        res.render('admin/add_property');  

        }
    }
    
    list(req, res) {
        if(typeof req.session.user =="undefined1") {
            res.redirect('/');
        }
        else{
            console.log(req.user, req.cookie, req.session);

            let property = new PropertyRepository();
        return property.list().then((result)=>{
            res.render('admin/product', {result});
        })

        }
    }



    process(req, res) {
        let property = new PropertyEntity();
        property.title = req.body.title; 
        property.type = req.body.type; 
        property.square = req.body.square;
        property.num_street = req.body.num_street;
        property.postal_code = req.body.postal_code;
        property.city = req.body.city;

        (new PropertyRepository).add(property).then((result) => {
            req.flash('notify', 'Ce bien a bien été créé.');
            res.redirect('/admin/biens');
        }, (message) => {
            req.flash('error', message);
            res.redirect('/admin/biens');
        });   
    }


    deleteProperty(req, res){
    // console.log(req.params.id);
    // this.setProperty(propertyId).then((result)=>{
    //          result
    // })
    (new PropertyRepository).delete(req.params.id).then((result)=>{

        console.log(result);
        req.flash('notify', 'Ce bien a été supprimé');
        res.redirect('/admin/biens');

    }, ()=>{
        req.flash('notify', 'Une erreur est survenu');
        res.redirect('/admin/biens');
    })

    }
    printUpdateProperty(req,res){

        (new PropertyRepository).getProperty(req.params.id).then(result=>{

            console.log(result);
            res.render('admin/update_product', {property:result[0]});

        }, ()=>{
            req.flash('notify', 'Une erreur est survenu');
            res.redirect('/admin/biens');
        })

    }
    updateProperty(req, res){

        let property = new PropertyEntity();
        property.id = req.body.id;
        property.title = req.body.title;
        property.type = req.body.type;
        property.square = req.body.square;
        property.num_street = req.body.num_street;
        property.postal_code = req.body.postal_code;
        property.city = req.body.city;

        if(req.params.id === property.id)
        (new PropertyRepository).updateProperty(property).then(result=>{

            req.flash('notify', 'Le bien à bien été modifié')
            res.redirect('/admin/biens')

        }, message=>{
            req.flash('notify', message)
            res.redirect('/admin/biens')
        })

    }

}
