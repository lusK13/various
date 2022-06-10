"use strict";
import Rectangle from "./Pysical/Rectangle/Rectangle.js";
import Draw from "./Draw.js";



//A RAJOUTER
//Accélération et/ou dérapage du joueur
//Plateforme accessible par le bas
//Plateforme d'action (si la balle le touche alors..)
//ajouter cercle
//ajouter inclinaison/pente

let largeur = 1;
let canvas = document.querySelector('canvas');
let draw = new Draw(canvas)



// let ball = Rectangle(400,500,50,50,10);



// let mur1 =  Rectangle(0,790,1200,largeur);
// let mur2 =  Rectangle(200,600,150,20)

// let mur3 =  Rectangle(400,500,150,20)

// let mur4 =  Rectangle(600,400,150,20);
// let mur5 =  Rectangle(0,700,150,20);
// let mur6 =  Rectangle(800,300,20,150);
// let mur7 =  Rectangle(600,100,20,150);
// let mur8 =  Rectangle(100,100,150,20);

// let mur9 = Rectangle(937,2,21,797);
// let mur10 = Rectangle(1123,712,54,28);
// let mur11 = Rectangle(995,610,39,22);
// let mur12 = Rectangle(1140,490,22,37);
// let mur13 = Rectangle(999,339,29,56);
// let mur14 = Rectangle(1100,241,50,24);
// let mur15 = Rectangle(994,79,25,31);
// let mur16 = Rectangle(1122,77,69,13);
// let mur17 = Rectangle(1022,780,69,13);



// mur8.setParam({color:"yellow"})


// mur17.setParam({color:"yellow"})
// mur16.setParam({color:"green"})


// console.log(mur8);
// ball.conditionFrame((object)=>{if(object.x >800){console.log('loose');} })

// mur2.style.color = "green";





// ball.setParam({vitesse:10,pixelJump:200, frameJump:60, accelerateDown:1.2, color:'white', gravity:1})


// ball.conditionFrame((e)=>{


//     if(e.geometric.isOnBloc(mur8)){
//         e.geometric.tpOnBloc(mur17, 'center')
//     }
//     if(e.geometric.isOnBloc(mur16)){
//         alert('Vous avez gagné')
//         // console.log(e.geometric.right);
//         e.geometric.teleport(100,200)
//         e.movement.arrowReset()
//     }
// })







// draw.addObject(mur1,mur2,mur3,mur4,mur5,mur6,mur7,mur8);




// draw.addObject(ball,mur1, mur2, mur3, mur4, mur5, mur6, mur7, mur8, mur9, mur10, mur11, mur12, mur13, mur14, mur15, mur16, mur17)


// let ball2 = new Rectangle(50,70,30,30,20)



// let bord1 = new Rectangle(0,0,1200,20);
// let bord2 = new Rectangle(0,0,20,800);
// let bord3 = new Rectangle(1180,0,20,800);
// let bord4 = new Rectangle(0,780,1200,20);


// let ball = new Rectangle(10,10,50,50,5);

// let mur1 = new Rectangle(0,0,1200,largeur);
// let mur5 = new Rectangle(0,60,1140,largeur);
// let mur9 = new Rectangle(60,120,1020,largeur);
// let mur13 = new Rectangle(120,180,900,largeur);
// let mur17 = new Rectangle(180,240,780,largeur);





// let mur2 = new Rectangle(1190,0,largeur,800);
// let mur6 = new Rectangle(1130,60,largeur,680);
// let mur10 = new Rectangle(1070,120,largeur,560);
// let mur14 = new Rectangle(1010,180,largeur,440);
// let mur18 = new Rectangle(950,240,largeur,320);



// let mur3 = new Rectangle(0,790,1200,largeur);
// let mur7 = new Rectangle(60,730,1080,largeur);
// let mur11 = new Rectangle(120,670,960,largeur);
// let mur15 = new Rectangle(180,610,840,largeur);
// let mur19 = new Rectangle(240,550,720,largeur);


// let mur4 = new Rectangle(0,60,largeur,740);
// let mur8 = new Rectangle(60,120,largeur,620);
// let mur12 = new Rectangle(120,180,largeur,500)
// let mur16 = new Rectangle(180,240,largeur,380)
// let mur20 = new Rectangle(240,300,largeur,260)

// console.log(ball);





// draw.addObject(ball)
// draw.addObject(ball)
// draw.addObject(ball,mur1, mur2, mur3, mur4, mur5, mur6, mur7, mur8, mur9,mur10, mur11, mur12, mur13, mur14, mur15, mur16, mur17, mur18, mur19, mur20, ball2)















// let mur1 = Rectangle(8,784,1184,4);
// let mur2 = Rectangle(598,-200,6,1500);
// let mur3 = Rectangle(39,735,66,16);
// let mur4 = Rectangle(192,661,75,12);
// let mur5 = Rectangle(338,598,77,12);
// let mur6 = Rectangle(462,507,66,14);
// let mur7 = Rectangle(303,445,65,23);
// let mur8 = Rectangle(134,376,80,30);
// let mur9 = Rectangle(39,272,27,32);
// let mur10 = Rectangle(150,215,104,22);
// let mur11 = Rectangle(359,129,41,34);
// let mur12 = Rectangle(492,85,32,20);
// let mur13 = Rectangle(621,759,119,6);
// let mur14 = Rectangle(770,704,86,14);
// let mur15 = Rectangle(947,654,72,20);
// let mur16 = Rectangle(1066,561,77,23);
// let mur17 = Rectangle(910,478,63,22);
// let mur18 = Rectangle(731,433,74,25);
// let mur19 = Rectangle(662,352,39,23);
// let mur20 = Rectangle(846,342,47,20);
// let mur21 = Rectangle(968,275,76,26);
// let mur22 = Rectangle(1087,174,54,32);
// let mur23 = Rectangle(968,141,55,25);
// let mur24 = Rectangle(833,118,40,26);
// let mur25 = Rectangle(673,83,57,32);
// let mur26 = Rectangle(328,741,18,18, 1);
// draw.addObject(mur1,mur2,mur3,mur4,mur5,mur6,mur7,mur8,mur9,mur10,mur11,mur12,mur13,mur14,mur15,mur16,mur17,mur18,mur19,mur20,mur21,mur22,mur23,mur24,mur25,mur26);


// mur26.setParam({color:"red", gravity:1, vitesse:5})

// mur12.setParam({color:'yellow'})
// mur13.setParam({color:"yellow"})

// mur26.conditionFrame((e)=>{

//     if(e.geometric.isOnBloc(mur12)){
//         e.geometric.tpOnBloc(mur13, 'center')        
//     }

// })





let mur1 = Rectangle(41,610,232,27);
let mur2 = Rectangle(2,771,1197,2);
let mur3 = Rectangle(211,708,64,24);
let mur4 = Rectangle(249,510,61,28);

let mur5 = Rectangle(307,427,104,38);
let mur6 = Rectangle(461,363,97,15);
let mur7 = Rectangle(702,313,40,13);
let mur8 = Rectangle(891,264,30,2);
let mur9 = Rectangle(1018,234,14,8);
let mur10 = Rectangle(1084,168,27,7);
let mur11 = Rectangle(379,733,18,18, 1);

mur10.setParam({color:'yellow'})

mur11.conditionFrame((e)=>{

if(e.geometric.isOnBloc(mur10)){
    e.geometric.tpOnBloc(mur2, 'center')
}    

})


mur11.setParam({color:"blue", vitesse:5, gravity:1, pixelJump:100, frameJump:40})
draw.addObject(mur1,mur2,mur3,mur4,mur5,mur6,mur7,mur8,mur9,mur10,mur11);
















draw.drawScene()