//-----------------------Enemies section---------------------------
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.velocity = 75 + 100 * Math.random(); //random velocity between 75-175
    this.boost = false; //Flag which tells if the object is boosted beyond its velocity
};

/**
 * @description A function to Update the enemy's position
 * @param {float} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
    if (this.y === player.y + 8.5 && this.x < player.x) { //if the player is in the same row with an enemy
        if (!this.boost) {
            this.original = this.velocity;
            this.boost = true;
            this.velocity += 50; //boost the velocity of the enemy
        }
    } else if (this.boost) {
        this.velocity = this.original; //return to normal velocity once the player moved away
        this.boost = false;
    }
    this.x += this.velocity * dt;
    if (this.x >= 505) {
        var rem = this;
        allEnemies = allEnemies.filter(function(e) { //remove enemy once it has exited the canvas completely
            return e !== rem;
        });
    }
};

/**
 * @description A function to Draw the enemy on the screen
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//----------------------Player section------------------------------
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.reset();
    this.hasMoved = false;
};

/**
 * @description A function to handle inputs from the keyboard
 */
Player.prototype.handleInput = function(key) {
    this.hasMoved = true;
    switch (key) {
        case 'up':
            this.y -= ((this.y - 83) >= 0) ? 83 : this.y + 10;
            break;
        case 'down':
            this.y += ((this.y + 83) < 415) ? 83 : 0;
            break;
        case 'left':
            this.x -= ((this.x - 101) >= 0) ? 101 : 0;
            break;
        case 'right':
            this.x += ((this.x + 101) < 505) ? 101 : 0;
            break;
    }
};

/**
 * @description A function to display the player on the canvas
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.hasMoved) {
        var move = new Audio('audio/move.mp3');
        move.play();
        this.hasMoved = false;
    }
};

/**
 * @description A function to reset the position of the player
 */
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 373.5;
};


//--------------------Initialization----------------------------

var player = new Player();
var allEnemies = [],
    isSpawning = false,
    initFlag = false;

/**
 * @description A function to randomly generate enemies
 * @param {boolean} init - Tells the function if the game has been initialized or not
 */
function spawnEnemys(init) {
    if (init) {
        for (var i = 0; i < 3; i++) {
            var enemy = new Enemy();
            enemy.x = 300 * (Math.random());
            enemy.y = 50 + 83 * i;
            allEnemies.push(enemy);
        }
        initFlag = true;
    } else if (!isSpawning) {
        isSpawning = true;
        setTimeout(function() {
            var enemy = new Enemy();
            enemy.x = -100;
            enemy.y = 50 + 83 * (Math.floor(Math.random() * 3));
            allEnemies.push(enemy);
            isSpawning = false;
        }, (initFlag) ? 500 : 2000);
        initFlag = false;
    }
}



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if (allowedKeys[e.keyCode] !== undefined)
        player.handleInput(allowedKeys[e.keyCode]);
});