//trouver le nombre le plus proche d'un nombre référence dans un tableau
function nearestNumberOfX(array, reference=0) {

    if(!Array.isArray(array) || array.length == 0){
        return 0;
    }

    return array.reduce((nearest, current)=>{

            //on définie des variables qui correspondent à l'écard entre les valeurs et le nombre référence
            let curDiff = Math.abs(current-reference);
            let preDiff = Math.abs(nearest-reference);

            //si la différence précédente est plus petite que l'actuelle, on retourne le nombre précédent
            if(preDiff<curDiff){
                return nearest;
            }
            else if(preDiff>curDiff){
                //si la différence précédente est plus grande on retourne le nombre actuelle
                return current;
            }
            else{
                //sinon c'est que la différence est égale, on retourne donc le plus grand nombre (pour avoir le plus proche supérieur)
                return nearest>current?nearest:current;
            }   
    })
}

// //trouver le nombre le plus proche de zero dans un tableau

// function nearestNumberOfZero(array) {

    
//     array.sort((a,b)=>a-b);

    
//     let number = array.reduce((pre, cur)=>{
//         preTemp = pre<0?pre*-1:pre;
//         curTemp = cur<0?cur*-1:cur;
//         if(typeof preTemp =='number'){
//             if(preTemp<curTemp){
//                 return pre
//             }
//             else{
//                 return cur
//             }
//         }
//     })



    // console.log(number);


//     return number


// }




//test

// let tabsTest = [{return: 1, array:[7,5,9,1,4]}, {return: -50, array:[-50]}, {return: 10000, array:[10000]}, {return: -7, array:[-15,-7,-9,-14,-12]}, {return: -10, array:[-10, -10]}, {return: 0, array:[]},{return: 7, array:[15,-7,9,14,7,12]}]
// tabsTest.forEach(e=>{
//     console.log(nearestNumberOfX(e.array, 0)===e.return?true: false);
// })

