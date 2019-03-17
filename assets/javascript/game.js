class Fighter
{
	// Each character in the game has 3 attributes: Health Points, Attack Power and Counter Attack Power.
	constructor(name, initialHealthPoints, baseAttackPower, counterAttackPower)
	{
		this.name = name;
		this.healthPoints = initialHealthPoints;
		this.baseAttackPower = baseAttackPower;
		this.attackPower = baseAttackPower;
		this.counterAttackPower = counterAttackPower;
	}

	// Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points).
	// Each time the player attacks, their character's Attack Power increases by its base Attack Power.
	// The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP.
	attack(defender)
	{
		defender.takeDamage(this.attackPower);
		this.attackPower += this.baseAttackPower;
		if (defender.isAlive())
		{
			this.takeDamage(defender.counterAttackPower);
		}
	}

	takeDamage(damage)
	{
		this.healthPoints -= damage;
	}

	isAlive()
	{
		return this.healthPoints > 0;
	}
}

// Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.

function doFights(fighterArray)
{
	let attacker = fighterArray[0];
	defenderArray = fighterArray.slice(1);
	for (let i = 0; i < defenderArray.length && attacker.isAlive(); i++)
	{
		let defender = defenderArray[i];
		while (defender.isAlive() && attacker.isAlive())
		{
			attacker.attack(defender);
		}
		if (!attacker.isAlive())
		{
			console.log(
				defenderArray[0].name + " " + 
				defenderArray[1].name + " " +
				defenderArray[2].name + " is a losing order for " + attacker.name);
			break;
		}
	}
	if (attacker.isAlive())
	{
		console.log(
			defenderArray[0].name + " " + 
			defenderArray[1].name + " " +
			defenderArray[2].name + " is a winning order for " + attacker.name);
	}
}

function resetFighters()
{
	//					   hp ap cap
	f1 = new Fighter("f1", 100, 25, 25);
	f2 = new Fighter("f2", 120, 25, 25);
	f3 = new Fighter("f3", 150, 25, 25);
	f4 = new Fighter("f4", 180, 25, 25);
}

//						   hp ap cap
let f1 = new Fighter("f1", 0, 0, 0);
let f2 = new Fighter("f2", 0, 0, 0);
let f3 = new Fighter("f3", 0, 0, 0);
let f4 = new Fighter("f4", 0, 0, 0);

// https://initjs.org/all-permutations-of-a-set-f1be174c79f8
function getAllPermutations(fighterArray)
{
	var results = [];
	if (fighterArray.length === 1)
	{
		results.push(fighterArray);
		return results;
	}

	for (var i = 0; i < fighterArray.length; i++)
	{
		var firstFighter = fighterArray[i];
		var remainingFighters = fighterArray.slice(1);
		var innerPermutations = getAllPermutations(remainingFighters);
		for (var j = 0; j < innerPermutations.length; j++)
		{
			results.push([firstFighter].concat(innerPermutations[j]));
		}
	}
	return results;
}

var arrayOfFighterArrays = getAllPermutations([f1,f2,f3,f4]);

for (let i = 0; i < arrayOfFighterArrays.length; i++) {
	const fighterArray = arrayOfFighterArrays[i];
	resetFighters();
	doFights(fighterArray);
}

console.dir(f1);
console.dir(f2);
console.dir(f3);
console.dir(f4);

// resetFighters();
// doFights([f1,f2,f3,f4]);
// resetFighters();
// doFights([f1,f2,f4,f3]);

// resetFighters();
// doFights([f1,f3,f2,f4]);
// resetFighters();
// doFights([f1,f3,f4,f2]);

// resetFighters();
// doFights([f1,f4,f2,f3]);
// resetFighters();
// doFights([f1,f4,f3,f2]);
