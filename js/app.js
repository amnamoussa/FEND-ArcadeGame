// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Initial locations and evemy speed
    this.x = x;
    this.y = y;
    this.speed = 100;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    // The reason x has chosen, is because the movement is horizontal
    this.x += this.speed * dt;
    
    // Repeat the enemies if it exeeds the canvas
    if(this.x > 500) {
        this.x = -100; // to make the movement consistent
        this.speed = 100;
    }
    
    // Collisions handling
    if(Math.abs(this.x - player.x) < 70 && Math.abs(this.y - player.y) < 70) {
        player.reset(); //fail and reset player
        alert("The enemy has eaten you.. Hard luck next time!");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function() {
    // To easily load the player's image
    this.sprite = 'images/char-princess-girl.png';
    this.reset();
}

/* This class requires an update(), render() and a handleInput() method.*/
Player.prototype.update = function() {
    // local variables of the number of rows and columns
    var numRows = 6;
    var numCols = 5;
    
    // Reset here because the player has reached the water
    // up
    if(this.row == 0) {
        this.reset();// successed and reset player
        alert("Wohoooo!\nYou've reached the sea successfully.\nYou are the winner!");
    }
    
    // Check if the player has tried to move outside of the game's frame, it will force the player to stay at her position.
     // down
    if(this.row >= numRows) {
        this.row = numRows - 1;
    }
    // right
    if(this.col >= numCols) {
        this.col = numCols - 1;
    }
    // left
    if(this.col < 0) {
        this.col = 0;
    }
    // Update the player's position in every movement
    this.x = this.col * 100;
    this.y = this.row * 70;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);    
}

Player.prototype.handleInput = function(key) {
    // Check if the correct key was pressed, the player's move either increases or decreases
    if (key == "up") {
        this.row--;
    } else if (key == "down") {
        this.row++;
    } else if (key == "right") {
        this.col++;
    } else if (key == "left") {
        this.col--;
    } else {
        // Keep the player at the same position
        this.row;
        this.col;
    }
}

// Reset function to reset the player's position
Player.prototype.reset = function() {
    // Update the player's position by setting the row and column
    this.row = 5;
    this.col = 2;
    
    // Update the player's position in every movement
    this.x = this.col * 100;
    this.y = this.row * 70;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var eNum = 3;
var allEnemies = [];
for (var i = 0; i < eNum; i++) {
    allEnemies.push(new Enemy(i * 250, (i + 1) * 70));
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
