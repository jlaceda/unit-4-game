///<reference path="Fighter.js"/>
// Game Object
// singleton object for game because there will only be one instance.
let Game =
{
	LukeSkywalker: {},
	ObiwanKenobi: {},
	EmperorPalpatine: {},
	DarthMaul: {},
	
	allFighters: [],
	playerCharacter: {},
	currentDefender: {},
	enemiesOnDeck: [],

	gameOver: false,

	initGame: function()
	{
		this.gameOver = false;
		// this is where all Fighters are created.
		// TODO: set stats here based on testing from Fighter.js
		this.LukeSkywalker = new Fighter("Luke Skywalker", 100, 6, 5);
		this.ObiwanKenobi = new Fighter("Obi-wan Kenobi", 120, 8, 10);
		this.EmperorPalpatine = new Fighter("Emperor Palpatine", 150, 10, 20);
		this.DarthMaul = new Fighter("Darth Maul", 180, 12, 25);

		this.allFighters = [
			this.LukeSkywalker,
			this.ObiwanKenobi,
			this.EmperorPalpatine,
			this.DarthMaul
		];

		this.playerCharacter = {};
		this.currentDefender = {};
		this.enemiesOnDeck = [];
	},
	// choose a fighter by name
	// enemiesOnDeck and playerCharacter should be filled after this
	chooseFighter: function(fighterName)
	{
		for (let i = 0; i < this.allFighters.length; i++)
		{
			const fighter = this.allFighters[i];
			if (fighter.name !== fighterName)
			{
				this.enemiesOnDeck.push(fighter);
			}
			else
			{
				this.playerCharacter = fighter;
			}
		}
	},
	// pick a defender by name
	// currentDefender and enemiesOnDeck are modified
	pickDefender: function(chosenDefenderName)
	{
		let indexOfChosenDefender = -1;
		for (let i = 0; i < this.enemiesOnDeck.length; i++)
		{
			if (this.enemiesOnDeck[i].name === chosenDefenderName)
			{
				indexOfChosenDefender = i;
			}
		}
		this.currentDefender = this.enemiesOnDeck.splice(indexOfChosenDefender, 1)[0];
	},
	doAttack: function()
	{
		// don't do anything if the defender is ded.
		if (this.currentDefender.isAlive())
		{
			this.playerCharacter.attack(this.currentDefender);
			if (!this.playerCharacter.isAlive() || !this.currentDefender.isAlive())
			{
				this.gameOver = true;
			}
		}
		else
		{
			if (this.enemiesOnDeck.length === 0)
			{
				this.gameOver = true;
			}
		}
	},
}