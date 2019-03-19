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
