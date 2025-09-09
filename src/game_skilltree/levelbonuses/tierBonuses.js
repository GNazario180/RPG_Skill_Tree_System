import {LevelUpBonuses} from "./LevelUpBonuses.js";

const TIER_LEVEL_GATE = {1: 20, 2: 40, 3: 60, 4: 80};

function roundToNearest5(n) {
  return Math.round(n / 5) * 5;
}

export function tierBonuses(statName, tier) {
  const gateLevel = TIER_LEVEL_GATE[tier];
  if (!gateLevel) return 0;

  const levelIncrementAtGate = LevelUpBonuses[statName](gateLevel);
  const cushion = 4;
  return roundToNearest5(levelIncrementAtGate * cushion);
}