///<reference path="Fighter.js"/>
///<reference path="game.js"/>
///<reference path="jquery-3.3.1.min.js"/>
// DOM related stuff.

let playerContainer = $('#playerContainer');
let defenderContainer = $('#defenderContainer');
let enemiesContainer = $('#enemiesContainer');

function clearContainers()
{
	playerContainer.empty();
	defenderContainer.empty();
	enemiesContainer.empty();
}

function updateGameDisplay()
{
	clearContainers();

	if (Game.gameOver)
	{
		if (Game.playerCharacter.isAlive())
		{
			playerContainer.text("You Won!")
		}
		else
		{
			defenderContainer.text("You Died.")
		}
		return;
	}

	Game.enemiesOnDeck.forEach(function(enemy)
	{
		enemiesContainer.append($('<div>').text(enemy.name + " [" + enemy.healthPoints + "]"));
	});

	playerContainer.append($('<div>').text(Game.playerCharacter.name + " [" + Game.playerCharacter.healthPoints + "]"));
	// show empty defenderContainer if it's not picked yet or dead.
	if (typeof(Game.currentDefender.name) === 'undefined' || !Game.currentDefender.isAlive())
	{
		defenderContainer.append($('<div>').text('empty'));
	}
	else
	{
		defenderContainer.append($('<div>').text(Game.currentDefender.name + " [" + Game.currentDefender.healthPoints + "]"));
	}
	
}

function initializeGameDisplay()
{
	clearContainers();

	for (let i = 0; i < Game.allFighters.length; i++)
	{
		const fighter = Game.allFighters[i];
		let fighterDiv = $('<div>').text(fighter.name + " [" + fighter.healthPoints + "]");
		playerContainer.append(fighterDiv);
	}
}

$(function() {
	console.log("ready!");
	Game.initGame();
	initializeGameDisplay();

	// simulate wining path gameplay.
	console.log('Game.chooseFighter("Obi-wan Kenobi");');
	Game.chooseFighter("Obi-wan Kenobi");
	updateGameDisplay();

	console.log('Game.pickDefender("Luke Skywalker");');
	Game.pickDefender("Luke Skywalker");
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();
	
	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.pickDefender("Emperor Palpatine");');
	Game.pickDefender("Emperor Palpatine");
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.pickDefender("Darth Maul");');
	Game.pickDefender("Darth Maul");
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	// simulate losing path gameplay.
	Game.initGame();
	initializeGameDisplay();

	console.log('Game.chooseFighter("Obi-wan Kenobi");');
	Game.chooseFighter("Obi-wan Kenobi");
	updateGameDisplay();

	console.log('Game.pickDefender("Darth Maul");');
	Game.pickDefender("Darth Maul");
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();

	console.log('Game.doAttack();');
	Game.doAttack();
	updateGameDisplay();


});