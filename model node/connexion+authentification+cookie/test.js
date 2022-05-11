// let session = {};

// // session.user = {firstname:'lucas', age:28}

// if(typeof session === 'undefined' || session.user == undefined || session.user.lastname == undefined){
//     console.log('false')
// }
// else{
//     console.log('true')
// }


// leVar = 4;
// leLet = 5;
// leConst = 6;

const fonction  = ()=>{
    
        let leLet = 2;
        const leConst = 3;
        global.leVar = 1;

        leLet = 2;
        var leVar = 5;



    console.log(leVar,leLet, leConst)
}

fonction()
console.log(leVar);