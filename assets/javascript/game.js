// singleton object for game because there will only be 1 instance.
let Game =
{
	playerCharacter: {}, // Fighter type
	currentDefender: {}, // Fighter type
	enemiesOnDeck: [], // array of Fighter type
	isGameOver: function()
	{
		return !playerCharacter.isAlive();
	}
}