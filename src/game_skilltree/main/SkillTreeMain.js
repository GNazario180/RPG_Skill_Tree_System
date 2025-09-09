import {Player} from '../player/Player.js';
import {Skills} from '../skills-skilltree/Skills.js';
import {SkillTree} from '../skills-skilltree/SkillTree.js';

/**
 * 1. Create player
 *
 * @type {Player}
 */
const hero = new Player("Aragon");

/**
 * 2. Define skills
 *
 * @type {Skills}
 */
const fireball = new Skills("Fireball", "Shoot a ball of fire", "single target", 10, "enemy", 1, 5);
const iceShield = new Skills("Ice Shield", "Protect yourself with ice", "buff", 5, "self", 2, 3);
const lightningStrike = new Skills("Lightning Strike", "Strike enemy with lightning", "single target", 12, "enemy", 2, 5);

/**
 * 3. Create a skill tree and register skills with requirements
 *
 * @type {SkillTree}
 */
const magicTree = new SkillTree();
magicTree.addSkill(fireball);
magicTree.addSkill(iceShield, {requiredTier: 1, prerequisites: ["Fireball"]});
magicTree.addSkill(lightningStrike, {requiredTier: 2, prerequisites: ["Ice Shield"]});

// Add tree to player
hero.addSkillTree("Magic", magicTree);

/**
 * 4. Give EXP & Level up
 */
console.log("\n==== Leveling Up ====");
hero.gainExp(2000);
console.log(`Level: ${hero.level}, Tier: ${hero.tierLevel}, EXP: ${hero.currentExp}/${hero.expToNextLevel}`);

/**
 * 5. Allocate Tier Points
 */
console.log("\n==== Allocating Tier Points ====");
// Force give massive EXP to hit Level 20 (Tier 1 threshold), earn Tier points, and allocate them
hero.gainExp(550000);
hero.allocateTierPoints("strength", 2);
hero.allocateTierPoints("health", 3);
hero.showAttributes();

/**
 * 6. Spend Skill Points (Unlocks)
 */
console.log("\n==== Unlocking Skills ====");
hero.spendSkillPoint("Magic", "Fireball", "unlock");
hero.spendSkillPoint("Magic", "Ice Shield", "unlock");

// Attempt to unlock Lightning Strike before Tier 2 (should fail)
hero.spendSkillPoint("Magic", "Lightning Strike", "unlock");

/**
 * 7. Increase Tier + Unlock New Skills
 */
console.log("\n==== Tier Level Up Simulation ====");
hero.gainExp(3000000); // Force level-up to 40 (Tier 2)
console.log(`Now Tier: ${hero.tierLevel}`);

// Now Lightning Strike should be unlockable
hero.spendSkillPoint("Magic", "Lightning Strike", "unlock");

/**
 * 8. Upgrade Skills
 */
console.log("\n==== Upgrading Skills ====");
hero.spendSkillPoint("Magic", "Fireball", "upgrade", 3);

/**
 * 9. Show final State
 */
console.log("\n==== Final State ====");
console.log("Unlocked Skills: ", [...magicTree.unlockedSkills]);
hero.showAttributes();
console.log("Remaining Skill Points: ", hero.availableSkillPoints);