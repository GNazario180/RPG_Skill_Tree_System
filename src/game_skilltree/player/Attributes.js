import {StatModifier} from '../stats/StatModifier.js';
import {LevelUpBonuses} from '../levelbonuses/LevelUpBonuses.js';
import {tierBonuses} from '../levelbonuses/tierBonuses.js';

/**
 * Manages character stats and handles modifications from
 * passives, buffs/debuffs, or level/tier increases.
 */
export class Attributes {
  #stats;

  constructor() {
    this.#stats = {
      health: new StatModifier(50),
      mana: new StatModifier(20),
      strength: new StatModifier(5),
      defense: new StatModifier(5),
      speed: new StatModifier(2),
      luck: new StatModifier(1)
    };
  };

  get stats() {
    return this.#stats;
  };

  getBaseStats(statName) {
    return this.#stats[statName].baseStats;
  };

  applyModifier(statName, value, type, duration) {
    this.#stats[statName].applyModifier(value, type,duration);
  };

  getModifiedValue(statName) {
    return this.#stats[statName].getModifiedValue();
  };

  // Ticks down a single modified stat
  tick(statName) {
    this.#stats[statName].tick();
  };

  // Ticks down all modified stats
  tickAll() {
    for (const stat of Object.values(this.#stats)) {
      stat.tick();
    }
  };

  // Apply permanent stat increases based on level using levelUpBonuses
  increaseStatsPerLevel(level) {
    for (let stat in this.#stats) {
      const bonus = LevelUpBonuses[stat](level);
      this.#stats[stat].applyModifier(bonus, "permanent");
    }
  };

  // Apply permanent stat increases based on allocated tier points
  increaseStatsPerTierPoint(statName, points, currentTier) {
    const bonusPerPoint = tierBonuses(statName, currentTier);
    const totalBonus = bonusPerPoint * points;
    this.#stats[statName].applyModifier(totalBonus, "permanent");
  };
}