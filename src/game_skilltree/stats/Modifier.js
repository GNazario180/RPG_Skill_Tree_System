/**
 * Represents a modifier used by StatModifier,
 * storing its value, type, and duration.
 *
 * @param value The numerical amount of the modifier
 * @param type "permanent" or "temporary" modifier
 * @param duration Number of ticks the modifier lasts (optional for permanent)
 */
export class Modifier {
  #value;
  #type;
  #duration;

  constructor(value, type, duration) {
    this.#value = value;
    this.#type = type;
    this.#duration = duration;
  };

  get value() {
    return this.#value;
  };

  get type() {
    return this.#type;
  };

  get duration() {
    return this.#duration;
  };

  setDuration(duration) {
    this.#duration = duration;
  };
}