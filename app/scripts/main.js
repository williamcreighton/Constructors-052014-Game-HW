"use strict";

function Mal () {
	this.hp = 15;
 
	this.primaryAttack = function(target) {
		target.hp = target.hp - 2;
	};
 
	this.specialAttack = function(target) {
		if (target.reavers == true) {
			this.hp = 0;
		} else {
			target.hp = target.hp - 20;
		}
	};
}

function River () {
	this.hp = 30;
 
	this.primaryAttack = function(target) {
		target.hp = target.hp - 2;
	};
 
	this.specialAttack = function(target) {
		if (target.reavers == true) {
			this.hp = 0;
		} else {
			target.hp = target.hp - 20;
		}
	};
}

function Jayne () {
	this.hp = 20;
 
	this.primaryAttack = function(target) {
		target.hp = target.hp - 2;
	};
 
	this.specialAttack = function(target) {
		if (target.reavers == true) {
			this.hp = 0;
		} else {
			target.hp = target.hp - 20;
		}
	};
}
 
 
function Enemy (level) {
	this.hp = level * 10;
 
	this.primaryAttack = function(target) {
		target.hp = target.hp - (10 + level/4);
	};
 
	this.specialAttack = function(target) {
		target.hp = target.hp - 10;
		this.hp = this.hp + 10;
	};
}


// need to tie if (target.reavers == true) {this.hp = 0;} to the Reavers function. 
// there's only one outome with Reavers, death. if killed by them, then player is
// shown the 'game-over-reavers' screen.
function Reavers (level) {
	this.hp = level * 20;
 
	this.primaryAttack = function(target) {
		target.hp = target.hp - (10 + level/4);
	};
 
	this.specialAttack = function(target) {
		target.hp = target.hp - 10;
		this.hp = this.hp + 10;
	};
}


var enemyLevel = 1;
 
$('.choose-mal').click(function(){
	player = new Mal();
	enemy = new Enemy(enemyLevel);
 
	$('.choices').remove();
 
	$('.battle-menu').addClass('active');
 
	renderPlayerInfo(player);
	renderEnemyInfo(enemy);
 
});

$('.choose-river').click(function(){
	player = new River();
	enemy = new Enemy(enemyLevel);
 
	$('.choices').remove();
 
	$('.battle-menu').addClass('active');
 
	renderPlayerInfo(player);
	renderEnemyInfo(enemy);
 
});

$('.choose-jayne').click(function(){
	player = new Jayne();
	enemy = new Enemy(enemyLevel);
 
	$('.choices').remove();
 
	$('.battle-menu').addClass('active');
 
	renderPlayerInfo(player);
	renderEnemyInfo(enemy);
 
});

 
function renderPlayerInfo (player) {
	if (player.hp < 1) {
		showGameOver();
	} else {
		$('.player-info').html('Player has ' + player.hp + 'hp');
	}
}

 
function renderEnemyInfo (enemy) {
	if (enemy.hp < 1) {
		$('.enemy-info').html('<span class='red'>Enemy has dead</span>');
	}
}
 
$('.primary').click(function(){
	player.primaryAttack(enemy);
	$('.status').html('You attack!');
	renderPlayerInfo(player);
	renderEnemyInfo(enemy);
 
	triggerEnemyAttack(player);
  
});
 
$('.special').click(function(){
	player.specialAttack(enemy);
	renderPlayerInfo(player);
	renderEnemyInfo(enemy);
 
	triggerEnemyAttack();
});

 
function showGameOver() {
	$('.game-over-reavers').addClass('active');
}
 
 
function triggerEnemyAttack () {
	setTimeout(function(){
		if (Math.floor(Math.random() * 10 ) > 6){
			enemy.specialAttack(player);
			$('.status').html('Enemy special attack!');
		} else {
			enemy.primaryAttack(player);
			$('.status').html('Enemy attack!');
		}
 
		renderPlayerInfo(player);
		renderEnemyInfo(enemy);
	}, 2000);
}