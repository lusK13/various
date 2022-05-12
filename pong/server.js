const express = require('express');
// const { emit } = require('process');
const app = express();
const port =  process.env.PORT || 9000;
//----------------------------------------------------------
// Mise en place du répertoire static (./public)
//----------------------------------------------------------
app.use(express.static(require("path").join(__dirname, 'public')));
 
//----------------------------------------------------------
// Mise en écoute sur le port http
//----------------------------------------------------------
const server = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
 
//----------------------------------------------------------
// Mise en place des WebSockets
//----------------------------------------------------------
var io = require('socket.io')(server);

let start = false;
let player1 = { pseudo : null, paddle : 0, taille:2000};
let player2 = { pseudo : null, paddle : 190, taille:200};
let spectators = [];
let users = [];
let posBall = {x:480, y:270};
let dirDroite = true;
let dirBas = true;
let debutParti;
let vitesseBallx = 5;
let vitesseBally = 3;
let interval = 20;
let loose = false;

io.on('connection', (socket) => {
    
    // on envoie dès la connexion toute les infos de la partie (la liste des spectateurs et les 2 joueurs)
    socket.emit('server:players:infos', player1.pseudo, player2.pseudo, spectators);
 
    socket.on('client:choice:pseudo', (pseudo) => {
        // si le pseudo n'est pas disponible
        if(users.includes(pseudo)) {
            socket.emit('server:user:pseudo_exists');
        }
        else {
            users.push(pseudo);
            socket.emit('server:user:connected');
            socket.pseudo = pseudo;
        }
    });
   
    
 // quand on choisi le player
    socket.on('client:choice:team', (player) => {
        if(player == 'spectator') {
            if(spectators.includes(socket.pseudo) === false) {
                spectators.push(socket.pseudo);
                // si le pseudo était en tant que player1 ou player2 on le retire
                if(socket.pseudo == player1.pseudo) player1 = {pseudo : null, paddle : 190};
                if(socket.pseudo == player2.pseudo) player2 = {pseudo : null, paddle : 190};
            }
        } else if(!start && ((player == 'player1' && player1.pseudo === null) || (player == 'player2' && player2.pseudo === null))) {
            if(player == 'player1') {
                player1 = { pseudo : socket.pseudo, paddle : 190};
                // si il était en player2
                if(socket.pseudo == player2.pseudo) player2 = {pseudo : null, paddle : 190};
            }
            else if(player == 'player2') {
                player2 = { pseudo : socket.pseudo, paddle : 190};
                // si il était en player1
                if(socket.pseudo == player1.pseudo) player1 = {pseudo : null, paddle : 190};
            }
    
            // on le retire des spectateurs (si il était en spectateur)
            let index = spectators.indexOf(socket.pseudo);
            if(index != -1) { spectators.splice(index,1);}
        }
        else{
            socket.emit('server:game:full');
        }
        // on renvoie toute les infos de la partie (la liste des spectateurs et les 2 joueurs)
        io.emit('server:players:infos', player1.pseudo, player2.pseudo, spectators);
        socket.emit('server:user:start', socket.pseudo);
        if(player1.pseudo && player2.pseudo){
            debutParti =
            setInterval(()=>{
                startBall()
            }, interval);
        }
    });
    socket.on('restart', ()=>{
        defaultStat();
        if(player1.pseudo && player2.pseudo){
            debutParti =
            setInterval(()=>{
                startBall()
            }, interval);
        }

    })
    function defaultStat(){
        posBall.x = 480
        posBall.y=270;
        dirDroite = true;
        dirBas = true;
        vitesseBallx = 5;
        vitesseBally = 3;
        loose = false;
        clearInterval(debutParti);
    }

    function startBall(){
        
        if(dirDroite){
            if(loose){
                
                posBall.x +=vitesseBallx;
                if(posBall.x>1100){
                clearInterval(debutParti);
                defaultStat();
                io.emit('playerLoose', 'Joueur rouge à perdu');
                }
                if(dirBas){
                    if(posBall.y<530){
                    posBall.y +=vitesseBally;}
                    else{dirBas = false}
        
                }
                else{
                    if(posBall.y>20)
                    posBall.y -=vitesseBally;
                    else{dirBas = true}
                }


            }
        else{

        if(dirBas){
            if(posBall.y<530){
            posBall.y +=vitesseBally;}
            else{dirBas = false}

        }
        else{
            if(posBall.y>20)
            posBall.y -=vitesseBally;
            else{dirBas = true}
        }
        
        if(posBall.x<950){
        posBall.x +=vitesseBallx;
        }
        else{
            let debut = player2.paddle;//150
            let fin = player2.paddle+200;//350
            let long = fin-debut;
            let rb1 = debut+(long/4);
            let rb2 = debut+(long/2);
            let rb3 = debut+(long/2+(rb1));


            if(posBall.y>debut-10 && posBall.y<fin+10){
            if(posBall.y<rb1){
                if(dirBas){
                    dirBas = false;
                    vitesseBally = 5+(vitesseBallx/2);
                }
                else{
                    vitesseBally = vitesseBally + 5;
                    
                }
            }
            else if(posBall.y<rb2){
                if(dirBas){
                    dirBas = false;
                    vitesseBally = 2;
                }
                else{
                    vitesseBally = vitesseBally + (vitesseBally/4);
                    
                }
                
            }
            else if(posBall.y<rb3){
                if(!dirBas){
                    dirBas = true;
                    vitesseBally = 2;
                }
                else{
                    vitesseBally = vitesseBally + 2;
                    
                }
            
            }
            else if(posBall.y<fin){
                if(!dirBas){
                    dirBas = true;
                    vitesseBally = 5+(vitesseBallx/2);
                }
                else{
                    vitesseBally = vitesseBally + 5;
                    
                }
            }
            dirDroite = false;
            }
            else{
                loose = true;
                    
        }
    }
        }
    }
        if(!dirDroite){
            if(loose){
                
                posBall.x -=vitesseBallx;
                if(posBall.x<-100){
                clearInterval(debutParti);
                defaultStat();
                io.emit('playerLoose', 'Joueur bleu à perdu')}

                if(dirBas){
                    if(posBall.y<560){
                    posBall.y +=vitesseBally;}
                    else{dirBas = false}
        
                }
                else{
                    if(posBall.y>20)
                    posBall.y -=vitesseBally;
                    else{dirBas = true}
                }

            }else{

            if(dirBas){
                if(posBall.y<560){
                posBall.y +=vitesseBally;}
                else{dirBas = false}
    
            }
            else{
                if(posBall.y>20)
                posBall.y -=vitesseBally;
                else{dirBas = true}
            }
            if(posBall.x>50){
            posBall.x -= vitesseBallx;
            }
            else{
            let debut = player1.paddle;
            // let debut = 0;
            let fin = player1.paddle+200;
            // let fin = 1000;
            let rb1 = debut+(fin/4);
            let rb2 = debut+(fin/2);
            let rb3 = debut+(fin/2+(rb1));

            if(posBall.y>debut-10 && posBall.y<fin+10){
                if(posBall.y<rb1){
                    if(dirBas){
                        dirBas = false;
                        vitesseBally = 5+(vitesseBallx/2);
                    }
                    else{
                        vitesseBally = vitesseBally + 5;
                        
                    }
                }
                else if(posBall.y<rb2){
                    if(dirBas){
                        dirBas = false;
                        vitesseBally = 2;
                    }
                    else{
                        vitesseBally = vitesseBally + (vitesseBally/4);
                        
                    }
                    
                }
                else if(posBall.y<rb3){
                    if(!dirBas){
                        dirBas = true;
                        vitesseBally = 2;
                    }
                    else{
                        vitesseBally = vitesseBally + 2;
                        
                    }
                
                }
                else if(posBall.y<fin){
                    if(!dirBas){
                        dirBas = true;
                        vitesseBally = 5+(vitesseBallx/2);
                    }
                    else{
                        vitesseBally = vitesseBally + 5;
                        
                    }
                }
            dirDroite = true;
            vitesseBallx++;

            }

            else{
                loose = true;
            
        }
            }}
        }
    io.emit('serveur:position:ball', posBall)
    
}

socket.on('client:paddle:position', (paddle) => {
    if(socket.pseudo == player1.pseudo) {
        player1.paddle = paddle;
    }
    else if(socket.pseudo == player2.pseudo) {
        player2.paddle = paddle;
    }
    // on renvoie toute les infos de la partie
    socket.broadcast.emit('server:paddles:position', player1.paddle, player2.paddle);
});




    socket.on('disconnect', () => {
        if(socket.pseudo != undefined) {
            let index = users.findIndex(user => user == socket.pseudo);
            if(index != -1) {
                users.splice(index,1);
                // si le pseudo était en tant que player1 ou player2
                if(socket.pseudo == player1.pseudo){
                clearInterval(debutParti)
                    player1 = {pseudo : null, paddle : 190};
                }
                if(socket.pseudo == player2.pseudo){
                    clearInterval(debutParti)
                    player2 = {pseudo : null, paddle : 190};
                }
                // on le retire des spectateurs
                let index2 = spectators.indexOf(socket.pseudo);
                if(index2 != -1) { spectators.splice(index2,1);}
                // on renvoie toute les infos de la partie
                io.emit('server:players:infos', 
                    player1.pseudo, 
                    player2.pseudo, 
                    spectators
                );
            }
        }
    });
});

