///<reference path="Fighter.js"/>
// this part should test each order of defenders for each fighter and make sure theres a winning order and losing order.
// TODO: adjust these numbers to balance game.
function resetFighters()
{
	//					   hp ap cap
	f1 = new Fighter("f1", 120, 8, 11);
	f2 = new Fighter("f2", 110, 10, 8);
	f3 = new Fighter("f3", 140, 4, 30);
	f4 = new Fighter("f4", 130, 9, 25);
}

// Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
function doFights(fighterArray)
{
	resetFighters();
	let attacker = fighterArray[0];
	defenderArray = fighterArray.slice(1);
	for (let i = 0; i < defenderArray.length && attacker.isAlive(); i++)
	{
		let defender = defenderArray[i];
		while (defender.isAlive() && attacker.isAlive())
		{
			attacker.attack(defender);
			//console.log(defender.name + " [" + defender.healthPoints + "]")
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

let f1 = new Fighter();
let f2 = new Fighter();
let f3 = new Fighter();
let f4 = new Fighter();

resetFighters();

doFights([f1,f2,f3,f4]);
doFights([f1,f2,f4,f3]);
doFights([f1,f3,f2,f4]);
doFights([f1,f3,f4,f2]);
doFights([f1,f4,f2,f3]);
doFights([f1,f4,f3,f2]);

doFights([f2,f1,f3,f4]);
doFights([f2,f1,f4,f3]);
doFights([f2,f3,f4,f1]);
doFights([f2,f3,f1,f4]);
doFights([f2,f4,f3,f1]);
doFights([f2,f4,f1,f3]);

doFights([f3,f1,f2,f4]);
doFights([f3,f1,f4,f2]);
doFights([f3,f2,f1,f4]);
doFights([f3,f2,f4,f1]);
doFights([f3,f4,f1,f2]);
doFights([f3,f4,f2,f1]);

doFights([f4,f1,f2,f3]);
doFights([f4,f1,f3,f2]);
doFights([f4,f2,f1,f3]);
doFights([f4,f2,f3,f1]);
doFights([f4,f3,f1,f2]);
doFights([f4,f3,f2,f1]);
