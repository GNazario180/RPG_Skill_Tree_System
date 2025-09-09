import {Skills} from './Skills.js';

/**
 * Manages Skills in a tree:
 * - Unlocking base on tier level, available points, and prerequisites
 * - Tracking unlocked skills and upgrades
 */
export class SkillTree {
  #skills;
  #skillRequirements;
  #unlockedSkills;
  #tierLevel;

  constructor() {
    this.#skills = new Map();
    this.#skillRequirements = new Map();
    this.#unlockedSkills = new Set();
    this.#tierLevel = 1;
  };

  get skills() {
    return this.#skills;
  };

  get skillRequirements() {
    return this.#skillRequirements;
  };

  get unlockedSkills() {
    return this.#unlockedSkills;
  };

  get tierLevel() {
    return this.#tierLevel;
  };

  setTierLevel(tier) {
    this.#tierLevel = tier;
  };

  /**
   * Register a skill with optional requirements
   *
   * @param {Skills} skill
   * @param {{requiredTier?: number, prerequisites?: string[]}} requirements
   */
  addSkill(skill, requirements = {requiredTier: 0, prerequisites: []}) {
    if (!(skill instanceof Skills)) {
      throw new Error("Must add a Skills object");
    }

    this.#skills.set(skill.name, skill);
    this.#skillRequirements.set(skill.name, {
      requiredTier: requirements.requiredTier || 0,
      prerequisites: requirements.prerequisites || []
    });
  };

  _canUnlockReason(skillName) {
    const skill = this.#skills.get(skillName);
    if (!skill) return `Skill ${skillName} not found.`;

    if (this.#unlockedSkills.has(skillName)) return `${skillName} is already unlocked.`;

    const req = this.#skillRequirements.get(skillName);
    if (!req) return `Requirements for ${skillName} not found.`;

    if (this.#tierLevel < req.requiredTier) {
      return `${skillName} requires Tier ${req.requiredTier}.`;
    }

    if (req.prerequisites && req.prerequisites.length > 0) {
      const hasAtLeastOne = req.prerequisites.some(p => this.#unlockedSkills.has(p));
      if (!hasAtLeastOne) {
        return `${skillName} requires prerequisites: ${req.prerequisites.join(', ')}`;
      }
    }

    return null;
  };

  _canUpgradeReason(skillName) {
    const skill = this.#skills.get(skillName);
    if (!skill) return `Skill ${skillName} not found.`;

    if (!this.#unlockedSkills.has(skillName)) {
      return `${skillName} must be unlocked before it can be upgraded.`;
    }

    if (skill.isMaxedOut()) {
      return `${skillName} is already at max level.`;
    }

    return null;
  };

  canUnlock(skillName) {
    return this._canUnlockReason(skillName) === null;
  };

  canUpgrade(skillName) {
    return this._canUpgradeReason(skillName) === null;
  };

  unlockSkill(skillName) {
    const reason = this._canUnlockReason(skillName);
    if (reason) {
      console.log(reason);
      return false;
    }

    const skill = this.#skills.get(skillName);
    skill.levelUp();
    this.#unlockedSkills.add(skillName);
    return true;
  };

  upgradeSkill(skillName) {
    const reason = this._canUpgradeReason(skillName);
    if (reason) {
      console.log(reason);
      return false;
    }

    const skill = this.#skills.get(skillName);
    skill.levelUp();
    return true;
  };

  listAvailableSkills() {
    const available = [];
    for (const skillName of this.#skills.keys()) {
      if (this.canUnlock(skillName)) available.push(skillName);
    }

    return available;
  };
}