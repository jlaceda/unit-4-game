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
	messages:[],
	defeatedEnemies: [],

	// flags
	gameOver: false,
	defenderChosen: false,
	characterChosen: false,

	nameImageMap: {
		"Luke Skywalker": "assets/images/luke.png",
		"Obi-wan Kenobi": "assets/images/kenobi.png",
		"Rey": "assets/images/rey.png",
		"Kylo Ren": "assets/images/kylo.jpg",
	},

	initGame: function()
	{
		this.gameOver = false;
		this.defenderChosen = false;
		this.characterChosen = false;

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
		this.messages.push("Welcome to Star Wars RPG!");
		this.messages.push("To start playing, choose your starting character.");
	},
	// choose a fighter by name
	// enemiesOnDeck and playerCharacter should be filled after this
	chooseFighter: function(fighterName)
	{
		// don't do anything if character has already been chosen
		if (this.characterChosen)
		{
			this.messages.push("You already chose " + this.playerCharacter.name + "!");
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
		this.characterChosen = true;
		this.messages.push("You chose " + this.playerCharacter.name + ". May the force be with you!");
		this.messages.push("Now chose your first opponent.");
	},
	// pick a defender by name
	// currentDefender and enemiesOnDeck are modified
	pickDefender: function(chosenDefenderName)
	{
		// don't do anything if defender has already been chosen
		if (this.defenderChosen)
		{
			return;
		}
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
		let indexOfChosenDefender = this.enemiesOnDeck.findIndex((enemy) =>
		{
			return enemy.name === chosenDefenderName;
		});
		this.currentDefender = this.enemiesOnDeck.splice(indexOfChosenDefender, 1)[0];
		this.defenderChosen = true;
		this.messages.push(this.currentDefender.name + " wants to fight.");
	},
	// format is 'attackerName <blanked> defenderName'
	attackMessage: [
		" smacked ",
		" scolded ",
		" force pushed ",
		" used the force on ",
		" lightsabered ",
		" pointed angrily ",
		" glared at "
	],
	randomAttackMessage: function(attackerName, defenderName)
	{
		let randInt = Math.floor(Math.random() * this.attackMessage.length);
		return attackerName + this.attackMessage[randInt] + defenderName +"!";
	},
	doAttack: function()
	{
		// don't do anything if the defender is ded or not chosen yet.
		if (this.defenderChosen == false || this.currentDefender.isAlive())
		{
			this.messages.push(this.randomAttackMessage(this.playerCharacter.name, this.currentDefender.name));
			this.messages.push(this.playerCharacter.name + " did "+ this.playerCharacter.attackPower + " damage.");
			this.playerCharacter.attack(this.currentDefender);

			// check for life after the attack.
			if (!this.currentDefender.isAlive())
			{
				this.messages.push(this.currentDefender.name + " is defeated.");
				this.messages.push("Chose your next opponent");
				this.defeatedEnemies.push(this.currentDefender);
				this.currentDefender = {};
				this.defenderChosen = false;
				return;
			}
			if (!this.playerCharacter.isAlive())
			{
				this.messages.push(this.currentDefender.name + " counter attacked!");
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