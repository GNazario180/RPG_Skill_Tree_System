export const LevelUpBonuses = {
  health: (level) => Math.floor(2 + (level ** 1.1659)), // or 1.03
  mana: (level) => Math.floor(2 + (level ** .77)),
  strength: (level) => Math.floor(1 + (level ** .591)),
  defense: (level) => Math.floor(1 + (level ** .591)),
  speed: (level) => Math.floor(1 + (level ** .31)),
  luck: (level) => Math.floor(.67 + (level ** .15))
};