///<reference path="Fighter.js"/>
///<reference path="game.js"/>
///<reference path="jquery-3.3.1.min.js"/>
// DOM related stuff.

let playerContainer = $('#playerContainer');
let defenderContainer = $('#defenderContainer');
let enemiesContainer = $('#enemiesContainer');
let messageContainer = $('#messageContainer');
let attackButtonContainer = $('#attackButtonContainer');

// https://stackoverflow.com/a/39065147/1332190
// template for fighter div.
const fighterTemplate = ({ name, healthPoints, image }) => `
<div class="fighter" data-name="${name}">
	<img src="${image}" alt="${name}">
	<p class="fighterName">${name}</p>
	<p class="fighterHP">[${healthPoints}]</p>
</div>
`;

function clearContainers()
{
	playerContainer.empty();
	defenderContainer.empty();
	enemiesContainer.empty();
}

// MAIN UPDATE/RENDER FUNCTION
function updateGameDisplay()
{
	clearContainers();

	if (Game.gameOver)
	{
		if (Game.playerCharacter.isAlive())
		{
			messageContainer.prepend("<h1>You Won!</h1>")
		}
		else
		{
			messageContainer.prepend("<h1>You Died.</h1>")
		}
		return;
	}

	// update enemiesContainer
	enemiesContainer.html(Game.enemiesOnDeck.map(fighterTemplate).join(''));

	// update playerContainer
	playerContainer.html([Game.playerCharacter].map(fighterTemplate).join(''));

	// empty defenderContainer if it's not picked yet or dead.
	if (typeof(Game.currentDefender.name) === 'undefined' || !Game.currentDefender.isAlive())
	{
		Game.currentDefender = {};
		defenderContainer.empty();
		attackButtonContainer.empty();
	}
	else
	{
		defenderContainer.html([Game.currentDefender].map(fighterTemplate).join(''));
		attackButtonContainer.html("<button class='attackButton'>Attack " + Game.currentDefender.name + "!</button>");
	}

	// update click handlers
	attackButtonContainer.find(".attackButton").click(function()
	{
		Game.doAttack();
		updateGameDisplay();
	});

	// add pickDefender to all fighters enemy
	enemiesContainer.find(".fighter").one("click", function()
	{
		if (typeof(Game.currentDefender.name) === 'undefined')
		{
			// pickDefender and add doAttack click handler
			Game.pickDefender($(this).attr("data-name"));
		}
		updateGameDisplay();
	});
}

function initializeGameDisplay()
{
	clearContainers();
	// https://stackoverflow.com/a/39065147/1332190
	playerContainer.html(Game.allFighters.map(fighterTemplate).join(''));
	// add a click handler for picking your character.
	playerContainer.find(".fighter").one("click", function()
	{
		Game.chooseFighter($(this).attr("data-name"));
		updateGameDisplay();
	});
}

$(function() {
	Game.initGame();
	initializeGameDisplay();
});