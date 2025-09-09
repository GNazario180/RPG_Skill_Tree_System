import {Modifier} from "./Modifier.js";

/**
 * Handles stats, applying temporary or permanent
 * modifiers and ticking down temporary ones.
 */
export class StatModifier {
  #baseStats;
  #modifiedStats;

  constructor(baseStats) {
    this.#baseStats = baseStats;

    this.#modifiedStats = {
      permanentModifier: [],
      temporaryModifier: [],
    };
  };

  get baseStats() {
    return this.#baseStats;
  };

  get modifiedStats() {
    return this.#modifiedStats;
  };

  // Applies stat modifier, either permanent or temporary (with optional duration)
  applyModifier(amount, type, duration = null) {
    if (type === "permanent") {
      this.#modifiedStats.permanentModifier.push(new Modifier(amount, type, duration));
    } else {
      this.#modifiedStats.temporaryModifier.push(new Modifier(amount, type, duration));
    }
  };

  // Returns the total stat value including all permanent and temporary modifiers
  getModifiedValue() {
    let permaValue = this.#modifiedStats.permanentModifier.reduce((sum, mod) => sum + mod.value, 0);
    let tempValue = this.#modifiedStats.temporaryModifier.reduce((sum, mod) => sum + mod.value, 0);
    return this.#baseStats + permaValue + tempValue;
  };

  // Ticks down the duration of temporary modifiers and removes expired ones
  tick() {
    this.#modifiedStats.temporaryModifier.forEach(mod => {
      if (mod.duration > 0) {
        mod.setDuration(mod.duration - 1);
      }
    });

    this.#modifiedStats.temporaryModifier = this.#modifiedStats.temporaryModifier.filter(mod => mod.duration > 0);
  };
}