///<reference path="Fighter.js"/>
///<reference path="game.js"/>
///<reference path="jquery-3.3.1.min.js"/>
// DOM related stuff.

let playerContainer = $('#playerContainer');
let defenderContainer = $('#defenderContainer');
let enemiesContainer = $('#enemiesContainer');
let messageContainer = $('#messageContainer');

// https://stackoverflow.com/a/39065147/1332190
// template for fighter div.
const fighterTemplate = ({ name, healthPoints, image }) => `
<div class="fighter" data-fightername="${name}">
	<img src="${image}" alt="${name}">
	<span class="fighterName">${name}</span>
	<br>
	<span class="fighterHP">[${healthPoints}]</span>
</div>
`;

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
			messageContainer.text("You Won!")
		}
		else
		{
			messageContainer.text("You Died.")
		}
		return;
	}

	// Game.enemiesOnDeck.forEach(function(enemy)
	// {
	// 	enemiesContainer.append($('<div>').text(enemy.name + " [" + enemy.healthPoints + "]"));
	// });
	enemiesContainer.html(Game.enemiesOnDeck.map(fighterTemplate).join(''));

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
	// https://stackoverflow.com/a/39065147/1332190
	playerContainer.html(Game.allFighters.map(fighterTemplate).join(''));
	// add a click handler for picking your character.
	$("#playerContainer .fighter").click(function() {
		Game.chooseFighter($(this).attr("data-fightername"));
		updateGameDisplay();
	});

	
}

$(function() {
	Game.initGame();
	initializeGameDisplay();
});