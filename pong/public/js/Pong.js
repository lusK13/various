class Pong{

    constructor(){
        this.socket = io.connect(document.location.host);

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
        this.paddle1 = 190;
        this.paddle2 = 190;
        this.player = null;
        this.player1;
        this.player2;
        this.spectator = [];
        this.listenServer();
        this.listenInterface();
        this.posBall = {x:480, y:270};
        

    }
    listenInterface() {
        document.querySelector("#btnconnexion").addEventListener('click', ()=>{this.pseudoChoice()} );
        document.querySelector("#choose").addEventListener('click', (e)=>{
            this.teamChoice(e.target);
        });

    
    }
    teamChoice(e){
        console.log(e)
        this.socket.emit('client:choice:team', e.dataset.player);

    }
    listenServer(){
        this.socket.on('server:user:pseudo_exists', this.pseudoChoice.bind(this,true));
        this.socket.on('server:players:infos', (play1, play2, spectator) => { 
            
                this.player1 = play1;
                this.player2 = play2;
                this.spectator = spectator;

            if(this.player1){
                document.getElementById("player1").classList.add("hide");
            }
            else{
                document.getElementById("player1").classList.remove("hide");
            }
            if(this.player2){
                document.getElementById("player2").classList.add("hide");
            }
            else{
                document.getElementById("player2").classList.remove("hide");
            }

            
        });
        this.socket.on('server:user:connected', this.connectUser);
        this.socket.on('server:user:start', (player)=>{this.startGame(player)});
        
        this.socket.on('server:paddles:position', (paddle1, paddle2)=>{
            if(this.player =="player1"){
                this.paddle2= paddle2;
            }
            else{
                this.paddle1= paddle1;
            }
            
            

        });
        this.socket.on('server:game:full', ()=>{this.fullPlayer()});
        this.socket.on('playerLoose', (e)=>{
            if(confirm(e+"/n Voulez vous rejouez une partie")){
                this.socket.emit('restart');
            }});
        
        
        this.socket.on('serveur:position:ball', (e)=>{
            this.posBall.x = e.x;
            this.posBall.y = e.y;
        });
        
    }

    connectUser() {
        document.getElementById("choose").classList.remove('hide');
        document.getElementById("connexion").classList.add('hide');
    }
    fullPlayer(){
        this.player ="spectator";
        alert('Il y a déjà 1 joueur pour cette équipe');
    }
    startGame(player) {
        if(player == this.player1){
            this.player = "player1";
        }
        else if(player == this.player2){
            this.player = "player2";
        }
        else if(this.spectator.includes(player)){
            this.player = "spectator"
        }
        console.log(this.player1);
        document.getElementById("game").classList.remove('hide');
        document.getElementById("choose").classList.add('hide');
        


        
    }
    pseudoChoice(alertPseudo = false)  {
        if(alertPseudo === true) alert(`Choisissez un autre pseudo, celui ci est déjà utilisé !`);
        else{
            let user = document.getElementById("username").value;
            if(user !== null) {
                this.socket.emit('client:choice:pseudo', user);
        }}
        
    }
    drawGame(){
    // on vide tout le canvas
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    // on positionne la premiere raquette
    this.context.fillStyle = '#0095DD';
    this.context.fillRect(10, this.paddle1, 20, 200);
        
    // on positionne la deuxieme raquette
    this.context.fillStyle = '#ff4c4c';
    this.context.fillRect(970, this.paddle2, 20, 200);

    this.context.beginPath();
    this.context.fillStyle="#000000";
    this.context.arc(this.posBall.x, this.posBall.y, 20, 0, 2 * Math.PI);
    this.context.fill();
    window.requestAnimationFrame(this.drawGame.bind(this));

    if(this.arrowUp){
        if(this.player == 'player1') {
            this.paddle1 -= 10;
            if(this.paddle1 < 0) this.paddle1 = 0;
            this.socket.emit('client:paddle:position', this.paddle1);
        }
        else if(this.player == 'player2') {
            this.paddle2 -= 10;
            if(this.paddle2 < 0) this.paddle2 = 0;
            this.socket.emit('client:paddle:position', this.paddle2);

        }
    }
    if(this.arrowDown){
        if(this.player == 'player1') {
            this.paddle1 +=10;
            if(this.paddle1+200 > this.canvas.height) 
                this.paddle1 = this.canvas.height-200;
            this.socket.emit('client:paddle:position', this.paddle1);

        }
        else if(this.player == 'player2') {
            this.paddle2 += 10;
            if(this.paddle2+200 > this.canvas.height) 
                this.paddle2 = this.canvas.height-200;
            this.socket.emit('client:paddle:position', this.paddle2);

        }
    }

    }

    listenKeyBoard() {
        document.addEventListener('keydown', (e) => {
            if(e.key == 'ArrowUp') {

                this.arrowUp =true;

            } else if(e.key == 'ArrowDown') {
                this.arrowDown = true;
            }
        });
        document.addEventListener('keyup', (e) => {
            if(e.key == 'ArrowUp') {

                this.arrowUp =false;

            } else if(e.key == 'ArrowDown') {
                this.arrowDown = false;
            }
        });
    }




}

let pong = new Pong();
pong.drawGame();
pong.listenKeyBoard()
