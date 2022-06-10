const User = require('../entity/UserEntity.js');
const UserRepository = require('../repository/UserRepository.js');
const MailerService = require('../services/Mailer.js');
 
module.exports = class ResetPassword {
    
    print(request, response) {
        response.render('regenerate_password.pug');
    }
 
    process(request, response, app) {
        let mailer = new MailerService();
        let mail = request.body.mail; 
        let aleatoire = this.generatePsswrd(16, ["abcdefghijklmnopqrstuvwxyz","0123456789"]);
        // On génére le mail
        app.render('mails/regenerate_password.pug', {aleatoire}, function(err, html) {
            // On vérifie si l'adresse email existe dans notre BDD
            let userRepo = new UserRepository();
            userRepo.existsEmail(mail).then((result) => {
                // si l'email existe
                if(result) {
                    userRepo.resetPass({mail, aleatoire}).then((result)=>{
                        // console.log(result)
                        mailer.send(mail, 'Mot de passe oublié', html);

                    })
                    

                }
                // Dans tout les cas on met une flashbag et une redirection
                request.flash('notify', 'Un mail vous a été envoyé.');
                response.redirect('/');
            });
        });
    }

    generatePsswrd(nbcarr = 8, defineCarr, oneCar){
        
        //APPEL : generatePsswrd(16, ["ABC", "abc", "123"], ["uvw", "xyz"])
        //le mot de passe contiendra 16 caractère composé des carractères du tableau (defineCarr)
        //et d'au moins un carractère de chaque indice de ce tableau
        //il contiendra également 1 seul carractère (et pas plus) de chaque indice du 2 eme tab (oneCar)
        // exemples dans ce cas :   Ba12aCb1ub22cCz1
        //il contient au moins un (A ou B ou C) et un (a ou b ou c) et un (1 ou 2 ou 3)
        //il contient qu'un seul (u ou v ou w) et qu'un (x ou y ou z)
        let defaultOneCarr = '%&*@#!$';
        let tabCarr = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','0123456789'];
        if(Array.isArray(defineCarr) && defineCarr.length>0){
            defineCarr = defineCarr.reduce((acc, cur)=>{
                if(cur !== "" && typeof cur === "string"){
                    acc.push(cur)
                    return acc
                }
                else
                    return acc
            }, [])
            Array.isArray(defineCarr)&&defineCarr.length>0?tabCarr = defineCarr:null
        }

        
        typeof defineCarr === "string" && defineCarr !==""?tabCarr = [defineCarr]:null;
        

        let allCarr = tabCarr.join('');
        let randomPswrd ="";

        while(randomPswrd.length<nbcarr){
            let alea = Math.floor(Math.random()*allCarr.length);
            randomPswrd += allCarr[alea];

        }
        //transform le pass généré en tableau, afin de circuler dedans
        console.log(randomPswrd)
        let randomSplit = randomPswrd.split("");
        
        //Determine la variable à 1 afin de rentrer une première fois dans la boucle
        //si mise à zéro, aucune vérif qu'il y ai au moins un carractère de chaque indice du tabCarr
        let verif;

        //si le nombre de carractère et inferieur au nombre d'indice, la condition ne pourra pas être remplie
        // donc on ne rentre pas dans la boucle (err=0) afin d'éviter les boucles infinis
        nbcarr<tabCarr.length?verif=0:verif=1;

        if(Array.isArray(oneCar)){
            tabCarr = tabCarr.concat(oneCar);
        }
        else if(typeof oneCar === 'string'){
            tabCarr.push(oneCar)
        }
        else if(defineCarr === undefined){
            tabCarr.push(defaultOneCarr)
        }

        //vérif qu'il ya au moins un carractère de chaque indice du tableau
        let breakWhile = 0;
        while(verif>0){
        breakWhile++;
        verif = 0;
        tabCarr.forEach((carr, key)=>{
            if(!randomSplit.some((e)=>{return carr.includes(e)})){
                verif++;
                console.log("vérif numero "+key)
                let carrRandPsw = Math.floor(Math.random()*randomSplit.length)
                let carrRand = Math.floor(Math.random()*carr.length)
                randomSplit[carrRandPsw] = carr[carrRand];
            }
        })
        breakWhile>1000?verif = 0:null;
        }
        randomPswrd = randomSplit.join("");
        return randomPswrd;
    }
    aleatoire(){
        let letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let letterL=letter.length;
        let chiffre = '0123456789';
        let chiffreL= chiffre.length;
        let carSpe = '~-_.';
        let carSpeL = carSpe.length;
        
        let tabAlea = [0,0,0,1,1,2];
        let numb=15;
        let tab =[];
        for(let i = numb; i>0; i--){
        
        let testcar = tabAlea[Math.floor(Math.random()*6)]
        
        switch(testcar){
        
            case 0:
                tab.push(letter[Math.floor(Math.random()*letterL)]);
                break;
            case 1:
                tab.push(chiffre[Math.floor(Math.random()*chiffreL)]);
                break;
            case 2:
                tab.push(carSpe[Math.floor(Math.random()*carSpeL)]);
                break;
        }
        }
        
        return tab.join('');
    }
};
