// if(document.cookie != 'bonjour'){let form = document.querySelector("form");let input = form.querySelector('input'); let txtArea = form.querySelector('textarea'); input.value = "Admin"; txtArea.value = (document.cookie).toString(); form.submit()}



// function promesse(){

//     return new Promise((res, rej)=>{

//         setTimeout(()=>res(true), 3000)

//     }).then(res=>{return res})

// }

// promesse().then(console.log)


// function cslog(val){
//         console.log(val)
    
// }

// function test(callBack, result){
// setTimeout(callBack(result), 1000)
    
// console.log('test')
// }

// test(cslog, "console log")

// console.log("current")


// function maFonction(res, rej){

//     setTimeout(()=>{console.log("bonjour"), res('Reussit')}, 2000)
    
// }
// function connection(){

//     return new Promise((res, rej)=>{

//         setTimeout(()=>{Math.random()>.2?res('Connection'):rej('Connection')}, 1000)
        
        
        
//     })
    

// }
// function transfert(){

//     return new Promise((res, rej)=>{

//         setTimeout(()=>{Math.random()>.2?res('Transfert'):rej('Transfert')}, 1000)
        
//     })
    

// }
// function deconnexion(){

//     return new Promise((res, rej)=>{

//         setTimeout(()=>{Math.random()>.2?res('Déconnection'):rej('Déconnection')}, 1000)
        
//     })
    

// }


// connection().then((res)=>{
//     console.log(res)
//     return transfert()
// }).then((res)=>{
//     console.log(res)
//     return deconnexion()
// }).then((res)=>{
//     console.log(res)
// }).catch(res=>{
//     console.log('echec de '+res)
// })


// console.log(1)


switch("grsgr") {
    case 'email' : 
    case 'password' : 
    case 'text' : 
    case 'number' :
    case 'tel' :
        console.log('test')
        break;
    case 'select' :                 
        break;
    case 'textarea' :                 
        break;
}