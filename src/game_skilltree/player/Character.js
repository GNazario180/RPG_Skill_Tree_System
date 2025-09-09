import {Attributes} from './Attributes.js';

/**
 * Character class to allow creation of multiple players, and enemy AI's
 * with access methods to modify stats, tick abilities, and delegates attribute
 * handling to the Attributes class.
 */
export class Character {
  #name;
  #attributes;

  constructor(name) {
    this.#name = name;
    this.#attributes = new Attributes();
  };

  get name() {
    return this.#name;
  };

  get attributes() {
    return this.#attributes;
  };

  getBaseStats(statName) {
    return this.#attributes.getBaseStats(statName);
  };

  applyModifier(statName, value, type, duration) {
    this.#attributes.applyModifier(statName, value, type, duration);
  };

  getModifiedValue(statName) {
    return this.#attributes.getModifiedValue(statName);
  };

  // Tick down a duration of a single stat modifier
  tick(statName) {
    this.#attributes.tick(statName);
  };

  // Tick down all active modifiers
  tickAll() {
    this.#attributes.tickAll();
  };
}