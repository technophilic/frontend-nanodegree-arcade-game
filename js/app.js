// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.velocity=75+100*Math.random();
    this.boost=false;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.y===player.y+8.5&&this.x<player.x)
    {
        if (!this.boost) {
            this.original=this.velocity;
            this.boost=true;
            this.velocity+=50;
        }
    }
    else if(this.boost)
    {
        this.velocity=this.original;
        this.boost=false;
    }
    this.x+=this.velocity*dt;
    if(this.x>=505)
    {
        console.log('exited screen !');
        var rem=this;
        allEnemies = allEnemies.filter(function(e) {return e !== rem })
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};
// Enemy.prototype.
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log('here !',this.x,this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player=function () {
    this.sprite = 'images/char-boy.png';
    this.reset();
    // this.x=0;
    // this.y=0;     //(83 * 4.5) Initial position of the player
    this.hasMoved=false;
};
Player.prototype.handleInput=function (key) {
    this.hasMoved=true;
    switch (key){
        case 'up':this.y-=((this.y-83)>=0)?83:this.y+10;break;
        case 'down':this.y+=((this.y+83)<415)?83:0;break;
        case 'left':this.x-=((this.x-101)>=0)?101:0;break;
        case 'right':this.x+=((this.x+101)<505)?101:0;break;
    }
    console.log(key,this.x,this.y);
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.hasMoved)
    {
        var move=new Audio('audio/move.mp3');
        move.play();
        this.hasMoved=false;
    }
    // console.log('here !');
};
Player.prototype.update = function() {

};
Player.prototype.reset=function () {
    this.x=202;
    this.y=373.5;
};
// Now instantiate your objects.
var player =new Player();
var allEnemies=[],isSpawning=false,initFlag=false;
function spawnEnemys(init) {
    if(init) {
        for(var i=0;i<3;i++)
        {
            var enemy=new Enemy();
            enemy.x=300*(Math.random());
            enemy.y=50+83*i;
            allEnemies.push(enemy);
        }
        initFlag=true;
    }
    else if(!isSpawning){
        isSpawning=true;
        setTimeout(function () {
            var enemy=new Enemy();
            enemy.x=-100;
            enemy.y=50+83*(Math.floor(Math.random()*3));
            allEnemies.push(enemy);
            isSpawning=false;
        },(initFlag)?500:2000);
        initFlag=false;
    }
}
console.log(player,allEnemies);
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(allowedKeys[e.keyCode]!==undefined)
    player.handleInput(allowedKeys[e.keyCode]);
});