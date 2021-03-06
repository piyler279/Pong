var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 360;
canvas.style.backgroundColor = "black";
document.body.appendChild(canvas);

//constants for the game
const paddleHeight = 80;
const paddleWidth = 15;
const dy = 2.85;

//score for players
var score = {
    p1: 0,
    p2: 0
};

//storing events
var events = {};
addEventListener("keydown",function(e){
    events[e.keyCode]=true;
},false);
addEventListener("keyup",function(e){
    delete events[e.keyCode];
},false);

var ball = {
    x: 240,
    y: 1 + (Math.random()*348),
    Xmag: 1.5,
    Ymag: 1,
    radius: 10
};

//Player 1
var player1 = {
    x: 30,
    y: 140
};

//Player 2
var player2 = {
    x: 435,
    y: 140
};

function keyEvents(){
    if(87 in events){
        player1.y -= (player1.y<=0.001?0:dy);
    }else if(83 in events){
        player1.y += (player1.y>=(359.999-paddleHeight)?0:dy);
    }

    if(38 in events){
        player2.y -= (player2.y<=0.001?0:dy);
    }else if(40 in events){
        player2.y += (player2.y>=(359.999-paddleHeight)?0:dy);
    }
}

function drawScore(){
    ctx.font = "30px monospace";
    ctx.fillStyle="white";
    ctx.fillText(score.p1,50,30);
    ctx.fillText(score.p2,410,30);
}

//Update function
function update(){
    keyEvents();

    if(ball.y < ball.radius || ball.y > canvas.height - ball.radius){
        ball.Ymag *= -1;
    }

    if(ball.x > player2.x){
        if(ball.y >= player2.y && ball.y <= player2.y + paddleHeight && ball.x < player2.x + paddleWidth){
            ball.Xmag *= -1.15;
        }else{
            if(ball.x >= canvas.width - ball.radius){
                score.p1++;
                ball.x = 240;
                ball.y = 1 + (Math.random()*358);
                ball.Xmag = 1.5;
                ball.Ymag = 1;
            }
        }
    }else if(ball.x < player1.x + paddleWidth){
        if(ball.y >= player1.y && ball.y <= player1.y + paddleHeight && ball.x > player1.x){
            ball.Xmag *= -1.15;
        }else{
            if(ball.x <= ball.radius){
                score.p2++;
                ball.x = 240;
                ball.y = 1 + (Math.random()*358);
                ball.Xmag = -1.5;
                ball.Ymag = 1;
            }
        }
    }
    drawScore();
    ball.x += ball.Xmag;
    ball.y += ball.Ymag;

}

//draw function
function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.radius,0,Math.PI*2);
    ctx.rect(player1.x,player1.y,paddleWidth,paddleHeight);
    ctx.rect(player2.x,player2.y,paddleWidth,paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
    update();
    requestAnimationFrame(draw);
}
draw();