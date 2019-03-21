///<reference path="Fighter.js"/>
// Game Object
// singleton object for game because there will only be one instance.
let Game =
{
	LukeSkywalker: {},
	ObiwanKenobi: {},
	Rey: {},
	KyloRen: {},
	
	allFighters: [],
	playerCharacter: {},
	currentDefender: {},
	enemiesOnDeck: [],

	gameOver: false,

	nameImageMap: {
		"Luke Skywalker": "assets/images/luke.png",
		"Obi-wan Kenobi": "assets/images/kenobi.png",
		"Rey": "assets/images/rey.png",
		"Kylo Ren": "assets/images/kylo.jpg",
	},

	initGame: function()
	{
		this.gameOver = false;
		// this is where all Fighters are created.
		this.LukeSkywalker = new Fighter("Luke Skywalker", 140, 4, 30);
		this.ObiwanKenobi = new Fighter("Obi-wan Kenobi", 120, 8, 11);
		this.Rey = new Fighter("Rey", 110, 10, 8);
		this.KyloRen = new Fighter("Kylo Ren", 130, 9, 25);

		this.allFighters = [
			this.LukeSkywalker,
			this.ObiwanKenobi,
			this.Rey,
			this.KyloRen
		];

		this.playerCharacter = {};
		this.currentDefender = {};
		this.enemiesOnDeck = [];
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		this.allFighters.map(f => f.image = this.nameImageMap[f.name]);
	},
	// choose a fighter by name
	// enemiesOnDeck and playerCharacter should be filled after this
	chooseFighter: function(fighterName)
	{
		// don't do anything if playerCharacter is empty.
		if (typeof(this.playerCharacter.name) !== "undefined")
		{
			return;
		}
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
		if (typeof(this.currentDefender.name) !== "undefined")
		{
			return;
		}

		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
		let indexOfChosenDefender = this.enemiesOnDeck.findIndex((enemy) =>
		{
			return enemy.name === chosenDefenderName;
		});
		this.currentDefender = this.enemiesOnDeck.splice(indexOfChosenDefender, 1)[0];
	},
	doAttack: function()
	{
		// don't do anything if the defender is ded.
		if (this.currentDefender.isAlive())
		{
			this.playerCharacter.attack(this.currentDefender);
			// check for life after the attack.
			if (!this.currentDefender.isAlive())
			{
				this.currentDefender = {};
				return;
			}
			if (!this.playerCharacter.isAlive())
			{
				this.gameOver = true;
				return;
			}
		}
		else
		{
			// player won if theres no more enemies
			if (this.enemiesOnDeck.length === 0)
			{
				this.gameOver = true;
			}
		}
	},
}