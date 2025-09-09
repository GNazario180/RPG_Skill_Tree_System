import {Character} from './Character.js';

/**
 * Playable character class that handles leveling, tier leveling, exp management
 * skill and tier point allocation, and skill trees.
 */
export class Player extends Character {
  #level;
  #baseExp;
  #currentExp;
  #expToNextLevel;

  #tierLevel;
  #tierThreshHold;
  #tierPoints;

  #skillTrees;
  #availableSkillPoints;

  constructor(name) {
    super(name);
    this.#level = 1;
    this.#baseExp = 500;
    this.#currentExp = 0;
    this.#expToNextLevel = this.#baseExp;

    this.#tierLevel = 0;
    this.#tierThreshHold = 20;
    this.#tierPoints = 0;

    this.#skillTrees = new Map();
    this.#availableSkillPoints = 0;
  };

  get level() {
    return this.#level;
  };

  get baseExp() {
    return this.#baseExp;
  };

  get currentExp() {
    return this.#currentExp;
  };

  get expToNextLevel() {
    return this.#expToNextLevel;
  };

  get tierLevel() {
    return this.#tierLevel;
  };

  get tierThreshHold() {
    return this.#tierThreshHold;
  };

  get skillTrees() {
    return this.#skillTrees;
  };

  get availableSkillPoints() {
    return this.#availableSkillPoints;
  };

  addSkillTree(treeName, skillTree) {
    this.#skillTrees.set(treeName, skillTree);
  };

  getSkillTree(treeName) {
    return this.#skillTrees.get(treeName);
  };

  addSkillPoints(points) {
    this.#availableSkillPoints += points;
  };

  // Attempt to spend a skill point on a specific skill to unlock or upgrade
  spendSkillPoint(treeName, skillName, action = "unlock", count = 1) {
    const tree = this.#skillTrees.get(treeName);
    if (!tree) {
      console.log(`Skill tree ${treeName} not found.`);
      return false;
    }

    const skill = tree.skills.get(skillName);
    if (!skill) {
      console.log(`Skill ${skillName} not found in tree ${treeName}.`);
      return false;
    }

    let upgrades = 0;
    let success = false;
    for (let i = 0; i < count; i++) {
      const cost = skill.baseUnlockCost;

      if (this.#availableSkillPoints < cost) {
        console.log(`Not enough skill points! Needed ${cost}, but only ${this.#availableSkillPoints} left.`);
        break;
      }

      if (action === "unlock") {
        if (!tree.unlockedSkills.has(skillName)) {
          success = tree.unlockSkill(skillName);
        } else {
          console.log(`${skillName} is already unlocked. Use upgrade instead.`);
          break;
        }
      } else if (action === "upgrade") {
        success = tree.upgradeSkill(skillName);
      } else {
        console.log(`Unknown action: ${action}`);
        break;
      }

      if (success) {
        this.#availableSkillPoints -= cost;

        if (action === "unlock") {
          console.log(`${skillName} has been unlocked at Level ${skill.currentLevel}!`);
          break;
        }

        if (action === "upgrade") {
          upgrades++;
        }
      } else {
        break;
      }
    }

    if (action === "upgrade" && upgrades > 0) {
      console.log(`${skillName} upgraded by ${upgrades} levels!`);
      return true;
    }

    return action === "unlock" ? tree.unlockedSkills.has(skillName) : false;
  };

  showAttributes() {
    console.log(`===== ${this.name} Stats =====`);
    console.log("HP: " + this.attributes.getModifiedValue("health") +
    "\nMP: " + this.attributes.getModifiedValue("mana") +
    "\nSTR: " + this.attributes.getModifiedValue("strength") +
    "\nDEF: " + this.attributes.getModifiedValue("defense") +
    "\nSPD: " + this.attributes.getModifiedValue("speed") +
    "\nLCK: " + this.attributes.getModifiedValue("luck"));
  };

  // Level up while current experience exceeds the threshold
  levelUp() {
    while (this.#currentExp >= this.#expToNextLevel) {
      this.#level++;
      this.#currentExp -= this.#expToNextLevel;
      this.#expToNextLevel = Math.floor(this.#baseExp * (this.#level ** 1.67));

      this.attributes.increaseStatsPerLevel(this.#level);

      this.tierLevelUp();

      if (this.#level % 2 === 0) {
        this.#availableSkillPoints += 5;
      }
    }
  };

  gainExp(expAmount) {
    this.#currentExp += expAmount;
    this.levelUp();
  };

  // Handle tier level-ups when hitting thresholds
  tierLevelUp() {
    if (this.#level >= this.#tierThreshHold) {
      this.#tierLevel++;
      this.#tierThreshHold += 20;

      this.#tierPoints += 5;

      for (let tree of this.#skillTrees.values()) {
        tree.setTierLevel(this.#tierLevel);
      }
    }
  };

  allocateTierPoints(statName, points) {
    if (points <= this.#tierPoints) {
      this.#tierPoints -= points;
      this.attributes.increaseStatsPerTierPoint(statName, points, this.#tierLevel);
    } else {
      console.log("Not enough tier points!");
    }
  };
}