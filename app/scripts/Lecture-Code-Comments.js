"use strict";

// Comment the Code to Understand What's Doing What and Why.

// Additional time needs to be spent reading over and understanding the Object.prototype.constructor
// (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)
// explanation on MDN and any additional sites that will help make clearer.

// Will continue to attempt to chip away at building this game. This time however, I'll
// look at starting with the JavaScript and jQuery instances (where at this point I'm admittedly
// weaker) and work to understand that BEFORE moving into setting up my HTML and CSS.

// Creates a function, or 'character' called 'Mario.'
function Mario () {
  
// 'this' is a direct reference back to 'Mario' or the function specifically. The
// 'hp' property represents the character's 'hit points' or health status.
  this.hp = 15;

// Creates a function, or 'primaryAttack' action for Mario against the 'target.'
// Here, target.hp represents the 'hit points' or health of the character's opponent
// and ascribes a value to the character's 'primaryAttack' strength and the number
// of hit points it would remove, or mutate, from the enemy's overall hit points 
// total.
  this.primaryAttack = function(target) {
    target.hp = target.hp - 2;
  }

// Similar to the 'primaryAttack' action for the character, 'specialAttack' represents
// the characters 'special' weapon/action. This function contains an if/else statement
// where the 'if' condition lays out a scenario where if the target, or enemy is
// 'spikey' the character's hit points are reduced/mutated to 0 and is thus, dead.  
  this.specialAttack = function(target) {
    if (target.spikey == true) {
      this.hp = 0;
// The 'else' statement ascribes a value to the character's 'specialAttack' powers and 
// sets up an instance where if this statement is initiated, the target's total hit 
// points will be subtracted by 20.
    } else {
      target.hp = target.hp - 20;
    }
  }
}

// Still not 100% sure how to create a function where I could create characters on the 
// fly. 

// I think I would run: player = new PacMan(); however, this would give PacMan the same
// properties as 'Mario.' Reading up on this: http://www.worldofwebcraft.com/blog.php?id=116
// I could get more granular with the properties ascribed to a 'player' and when creating
// a new one add them in as such: player = new PacMan("PacMan","Male","Yellow Dot",33,6,190,200)
// though in this case, I'm defining PacMan's name inside, so really that would be redundant to
// name him twice.

// I guess same would go with the getDamage function as well. Because each character in the
// (World Of Webcraft) instance would have different strength points, Math.floor and Math.random
// would generate different fighting abilities and you could create multiple 'Attack' functions
// like this and then wrap each part (character creation and attack abilities) into a single 
// function?

// Going off of this, I could create (I believe) a generic character function as so:

// BEGINNING World Of Webcraft (http://www.worldofwebcraft.com/blog.php?id=116) EXAMPLE //

// Create the custom object's constructor
    function player(pname,gender,age,catchphrase,strength,iq,hitpoints){
// Create the custom object's Properties
    this.pname = pname;
    this.gender = gender;
    this.age = age;
    this.catchphrase = catchphrase; * rather than hardcoding <h1>OK, time to fight</h1> in the HTML,
    // each character would get a specific catchphrase which would render in its place instead.
    // Adding the catchphrase would be inserted into the .click character select function. At this point
    // I'm unclear where (it will need to point to a pre-defined class in the HTML) it would fit in 
    // that jQuery method. Will need to do trial and error to figure it out.
    this.strength = strength;
    this.iq = iq;
    this.hitpoints = hitpoints;

// Again, these parameters can obviously be changed based on the concept of the game being created and
// while there is only a single 'attack' instance listed in this example from World Of Webcraft,
// additional functions can be created and called to allow for varied attack methods and results.

// Create the custom object's Methods
    this.getDamage = function getDamage(stren){
      var damage = stren + (Math.floor(Math.random() * 10) + 1); // the numbers here can obviously
      // be changed to suit the game's structure.
    return damage;
      }
    }

// creating a player would look like this: player = new PacMan("PacMan","Male","Yellow Dot",33,6,190,200)    

// END World Of Webcraft (http://www.worldofwebcraft.com/blog.php?id=116) EXAMPLE //
 
 
// This creates a function, or generic 'Enemy' character with a 'level' parameter which
// is used to evaluate the Enemy character's hit point total as well as the strength
// ascribed to both the primary and special attack functions.
// The Enemy character's hit points total will multiply by a factor of 10 against the
// the level number being played. 
function Enemy (level) {
  this.hp = level * 10;

// The strength, or number of hit points removed through the primaryAttack function is 
// determined by taking subtracting the target's hit points by 10 + the current level 
// number divided by 4.
  this.primaryAttack = function(target) {
    target.hp = target.hp - (10 + level/4);
  }

// The Enemy specialAttack function is set up so that it subtracts/mutates a target's 
// hit points total by 10 and then adds/mutates those same 10 points back onto its
// own hit points total.
  this.specialAttack = function(target) {
    target.hp = target.hp - 10;
    this.hp = this.hp + 10;
  }
}
 
var enemyLevel = 1;
 
// This is the jQuery click function that enables a player to select Mario as their
// prefered character to play as. Once clicked, it creates a player, Mario, inheriting
// it's properties from the 'Mario' prototype. (I believe prototype is the correct
// description here.) At the same time, a new Enemy is created as well, using the 
// previously described Enemy function while also calling the parameter 'enemyLevel'
// which determines the strength and total number of points ascribed to that instance.
$('.choose-mario').click(function(){
  player = new Mario();
  enemy = new Enemy(enemyLevel)
 
// Here the .remove method is called on the jQuery object, '.choices,' whereby the 
// player choices generated in the browser are removed, or hidden.
  $('.choices').remove();
 
// The .addClass method adds the '.battle-menu' object to the browser while 
// putting it in an 'active' state.
  $('.battle-menu').addClass('active');

// Both the Player and Enemy Info (hit point totals) are then rendered in the battle-menu
// view in the browser. This information is determined via the renderPlayerInfo and 
// renderEnemyInfo functions created below and is the starting point totals for both
// player and enemy.
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);
 
})
 
// This function 'renders' the player information in the battle-menu. It contains an 
// if/else statement declaring that 'if' player's hit point are less than 1 then call
// the showGameOver function declarad below.
function renderPlayerInfo (player) {
  if (player.hp < 1) {
    showGameOver()
// Else, if player's hit point total remains above 1, then print the number of hit points
// assingned to the player. This will be either a full count, or a reduced number depending
// on the random generation of the enemy's attack method.
  } else {
    $('.player-info').html("Player has " + player.hp + "hp")
  }
}

// Essentially the same function as the renderPlayerInfo function. This deals with the values
// which would terminate the enemy's life, printing 'Enemy has dead' in the browser, or
// would print the enemy's hit points total. The hp total for the enemy could, based on 
// specialAttack function could assume points from player or lose them. 
function renderEnemyInfo (enemy) {
  if (enemy.hp < 1) {
    $('.enemy-info').html("<span class='red'>Enemy has dead</span>")

// Somewhere the code is missing the ability to STOP the game when the enemy.hp < 1 ... while
// it prints 'Enemy has dead' ... the enemy function continues to run until player is dead.

  } else {
    $('.enemy-info').html("Enemy has " + enemy.hp + "hp")
  }
}
 
// The .primary object referred to here relates to the 'Primary Attack' button rendered in the
// browser. When the user clicks the 'Primary Attack' button, the player's primaryAttack
// function is run against the enemy. 
$('.primary').click(function(){
  player.primaryAttack(enemy);

// The jQuery .html method is then called against the .status object, printing, 'You attack!' in
// the battle-menu display in the browser. Both the PlayerInfo and the EnemyInfo are rendered
// in the browser at this time, though it's only the player who at this point has 'attacked.'  
  $('.status').html('You attack!')
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);

// This is where the triggerEnemyAttack function is called against the player.
  triggerEnemyAttack(player)
  
})
 
// Again, similar to the above jQuery click method, this one calls/runs the player's specialAttack
// function. After running this function and again displaying both characters hit points info, the
// triggerEnemyAttack function is run.
$('.special').click(function(){
  player.specialAttack(enemy);
  renderPlayerInfo(player);
  renderEnemyInfo(enemy);
 
  triggerEnemyAttack()
})
 
// The showGameOver function is specific to the player, or Mario, in this case. It's called in the
// renderPlayerInfo when the 'if' statement evaluates to less than 1.
function showGameOver() {
  $('.game-over').addClass('active')
}
 
// This function triggers the EnemyAttack to run. setTimeout stipulates an if/else statement running
// on a delay which determines whether the enemy will use its specialAttack or its primaryAttack.
// 'The Math.floor(x) function returns the largest integer less than or equal to a number "x".' At the 
// same time, Math.random returns a randowm number between 0 and 1 which is multiplied by 10. If this number 
// is larger than 6, the enemy will use it's specialAttack and jQuery will print 'Enemy special attack!' in
// the browser. If the number is NOT greater than 6, then the function for the enemey's primary attack will
// run instead, printing 'Enemy attack!' in the browser.
function triggerEnemyAttack () {
  setTimeout(function(){
    if (Math.floor(Math.random() * 10 ) > 6){
      enemy.specialAttack(player);   
      $('.status').html('Enemy special attack!')
    } else {
      enemy.primaryAttack(player);   
      $('.status').html('Enemy attack!')
    }
 
    renderPlayerInfo(player);
    renderEnemyInfo(enemy);
 
// The '2000' here is 2000ms which is the dealy between when the player clicks the button to 'attack' and
// when the enemy responds.
  }, 2000)
}

//////////////BELOW IS DREW'S CODE EXAMPLE FROM CLASS//////////////


function powerBar (player) {
  if (player.power > 90 && player.power < 150){
      $('.player-bar').addClass('power10');
    } else if (player.power >= 80 && player.power < 90){
      $('.player-bar').attr('class','player-bar').addClass('power9');
    } else if (player.power >= 70 && player.power < 80){
      $('.player-bar').attr('class','player-bar').addClass('power8');
    } else if (player.power >= 60 && player.power < 70){
      $('.player-bar').attr('class','player-bar').addClass('power7');
    } else if (player.power >= 50 && player.power < 60){
      $('.player-bar').attr('class','player-bar').addClass('power6');
    } else if (player.power >= 40 && player.power < 50){
      $('.player-bar').attr('class','player-bar').addClass('power5');
    } else if (player.power >= 30 && player.power < 40){
      $('.player-bar').attr('class','player-bar').addClass('power4');
    } else if (player.power >= 20 && player.power < 30){
      $('.player-bar').attr('class','player-bar').addClass('power3');
    } else if (player.power >= 10 && player.power < 20){
      $('.player-bar').attr('class','player-bar').addClass('power2');
    } else if (player.power >= 5 && player.power < 10){
      $('.player-bar').attr('class','player-bar').addClass('power1');
    } else {
      $('.player-bar').addClass('power0');
    }
}



// refactored by Mason.

function generatePowerColor (player) {
  var width = (player.power / 100) * 255;
  return "background: rgb(0," + player.power + ", 0); width: " + width + "%;"
}

function powerBar (player) {
  $('.player-bar').attr('style', generatePowerColor(player))
}

