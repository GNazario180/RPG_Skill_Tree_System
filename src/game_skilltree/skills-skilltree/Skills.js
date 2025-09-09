/**
 * Manges ability's descriptions, effect type (e.g. single target, AoE, or DoT),
 * mana cost, target type (e.g. enemy, friendly, or self),
 * skill points required, and max level.
 */
export class Skills {
  #name;
  #description;
  #effectType;
  #manaCost;
  #targetType;
  #baseUnlockCost;
  #maxLevel;
  #currentLevel;

  constructor(name, description, effectType, manaCost, targetType, baseUnlockCost = 1, maxLevel = 1) {
    this.#name = name;
    this.#description = description;
    this.#effectType = effectType;
    this.#manaCost = manaCost;
    this.#targetType = targetType;
    this.#baseUnlockCost = baseUnlockCost;
    this.#maxLevel = maxLevel;
    this.#currentLevel = 0;
  };

  get name() {
    return this.#name;
  };

  get description() {
    return this.#description;
  };

  get effectType() {
    return this.#effectType;
  };

  get manaCost() {
    return this.#manaCost;
  };

  get targetType() {
    return this.#targetType;
  };

  get baseUnlockCost() {
    if (this.#currentLevel === 0) {
      return this.#baseUnlockCost;
    }

    return this.#baseUnlockCost + this.#currentLevel;
  };

  get maxLevel() {
    return this.#maxLevel;
  };

  get currentLevel() {
    return this.#currentLevel;
  };

  levelUp() {
    if (this.#currentLevel < this.#maxLevel) {
      this.#currentLevel++;
      return true;
    }

    return false;
  };

  isMaxedOut() {
    return this.#currentLevel >= this.#maxLevel;
  };
}