function gameplayTests()
{
	// simulate winning path gameplay.
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
}
