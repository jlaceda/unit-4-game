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
	gameplayTests();
});