module.exports = (nbcarr = 8, defineCarr, oneCar)=>{
        
    //APPEL : generatePsswrd(16, ["ABC", "abc", "123"], ["uvw", "xyz"])
    //le mot de passe contiendra 16 caractère composé des carractères du tableau (defineCarr)
    //et d'au moins un carractère de chaque indice de ce tableau
    //il contiendra également 1 carractère et pas plus de chaque indice du 2 eme tab (oneCar)
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
    // console.log(randomPswrd)
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
            // console.log("vérif numero "+key)
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
