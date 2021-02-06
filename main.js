var canvas = document.querySelector("canvas")

canvas.height = 500;

canvas.width = 500;

var c = canvas.getContext("2d");

var key = 0;
var keyrel = true;
var repeat;


window.addEventListener('keydown', function(event)
{
        key=event.key;
        keyrel=event.repeat;
        repeat = event.repeat;
});


window.addEventListener('keyup', function(event)
{
        keyrel=event.repeat;
        console.log(keyrel);
        
});



class Circle{
    constructor(x,y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = "black";



        this.draw = function() { 
            c.beginPath();
            c.arc(this.x, this.y, 10, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

        this.update = function() {

            switch (key){
                case "ArrowUp" :
                    
                    if (colD) {
                        this.dy = 20;
                        colD = false;
                    }



                    if (this.y - 30 < 0) {
                        this.dy = 0;
                        colU = true;
                        
                    }

                    this.y -= this.dy;
                    key=0;
                    break;
                case "ArrowDown" :
                    if (colU) {
                        this.dy = 20;
                        colU = false;
                    }
                    if (this.y + 30 > canvas.height) {
                        this.dy = 0;
                        colD = true;
                    }
                    if (keyrel){
                    this.y += this.dy;                                     // Pour fluidifier l'affichage , faut changer le comportmeent par defaut de repeat et ajouter un if dans les cases
                    }                                       // Enfin aussi verifier le dx par refresh

                    key=0;
                    break;
                    
                case "ArrowRight" :
                    if (colL) {
                        this.dx = 20;
                        colL = false;
                        
                    }

                    if (this.x + 30 > canvas.width) {
                        this.dx = 0;
                        colR = true;
                    }

                    this.x += this.dx;
                    key=0;
                    break;
                case "ArrowLeft" :
                    if (colR) {
                        this.dx = 20;
                        colR = false;
                    }

                    if (this.x - 30 < 0) {
                        this.dx = 0;
                        colL = true;
                    }
                    this.x -= this.dx
                    key=0;
                    break;

            }
            

            this.draw();


        }


    }
}


class objectif{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.color = colorArray[Math.round(Math.random()*5)];

        this.draw = function() {

            c.beginPath();
            c.arc(this.x, this.y, 25, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.fill();
        }

        this.shift = function() {
            object.pop;
        }

       


    
    }






}

var circle;
var object;
var count  = 0;
var colD = false;
var colU = false;
var colR = false;
var colL = false;
var colorArray = [
	'#66cc77',
	'#4084bf',
	'#4f40bf',
	'#40bfa8',
	'#bf4840'
	];


function init() {
    circle = new Circle(50, 50, 20, 20);
    animate();
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    object.draw();
    circle.update();
    game();
    


}


function initnd() {
    let x =  Math.random() * (canvas.width - 5 * 2) + 5;
    let y =  Math.random() * (canvas.height - 5 * 2) + 5;
    object = new objectif(x, y);
    object.draw();
}

function game(){
    let dx = circle.x - object.x;
    let dy = circle.y - object.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 30) {
        circle.color = object.color;
        object.shift();
    }

}


initnd();
init();

