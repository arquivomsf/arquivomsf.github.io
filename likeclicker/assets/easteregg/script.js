var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;

function startGame() {
	myGamePiece = new component(32, 23, "tiny_ship_crop.png", 10, 120, "image");
	myBackground = new component(656, 270, "sky3.jpg", 0, 0, "background");
	myScore = new component("15px", "Consolas", "black", 15, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 466;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
	if (type == "image" || type == "background") {
    this.image = new Image();
    this.image.src = color;
  }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
			if (type == "image" || type == "background") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	  if (type == "background") {
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
      }
    } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
	}
        }
    }
    this.newPos = function() {
        if (this == myGamePiece) {
            if (this.x + this.speedX > 0 && this.speedX < 0) {
                this.x += this.speedX;
            }
            if ((this.x+this.width) + this.speedX < myGameArea.canvas.width && this.speedX > 0) {
                this.x += this.speedX;
            }
            if (this.y + this.speedY > 0 && this.speedY < 0) {
                this.y += this.speedY;
            }
            if ((this.y+this.height) + this.speedY < myGameArea.canvas.height && this.speedY > 0) {
                this.y += this.speedY;
            }
        } else {
            this.x += this.speedX;
            this.y += this.speedY;
        }
		if (this.type == "background") {
      if (this.x == -(this.width)) {
        this.x = 0;
      }
    }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        } 
    }
    myGameArea.clear();
	myBackground.speedX = -1;
	myBackground.newPos(); 
	myBackground.update();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 150;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 50;
        maxGap = 100;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(10, height, "green", x, 0));
        myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].speedX = -3;
        myObstacles[i].newPos();
        myObstacles[i].update();
    }
    document.getElementById("scoretext").innerHTML = myGameArea.frameNo;
    /*myScore.text = myGameArea.frameNo;
    myScore.update();*/
    myGamePiece.newPos();    
    myGamePiece.update();
}

function everyinterval(n) {
    myGameArea.canvas.width = window.innerWidth;
    myBackground.update();
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function moveup() {
    myGamePiece.speedY = -3;
}

function movedown() {
    myGamePiece.speedY = 3;
}

function moveleft() {
    myGamePiece.speedX = -3;
}

function moveright() {
    myGamePiece.speedX = 3;
}

function clearmove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
}

if (new URLSearchParams(window.location.search).get('dark') == "1") {
    document.documentElement.style.setProperty('--main-bg', '#333333');
    document.documentElement.style.setProperty('--border-color', 'white');
    document.documentElement.style.setProperty('--text-color', 'white');
    document.documentElement.style.setProperty('--option-hover', '#575757');
    document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
    document.documentElement.style.setProperty('--close-filter', 'invert(1)');
} else {
    document.documentElement.style.setProperty('--main-bg', 'white');
    document.documentElement.style.setProperty('--border-color', 'black');
    document.documentElement.style.setProperty('--text-color', 'black');
    document.documentElement.style.setProperty('--option-hover', 'rgba(0,0,0,.1)');
    document.documentElement.style.setProperty('--focus-shadow', 'rgba(255, 255, 255, .8)');
    document.documentElement.style.setProperty('--close-filter', 'none');
}