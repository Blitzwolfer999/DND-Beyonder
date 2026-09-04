/* AD&D 2nd Edition data.
 *
 * 2E has no SRD and was never placed under the Open Game License, so nothing
 * here is reproduced from a rulebook. The tables below encode the game's
 * mechanics -- THAC0 progressions, saving throw categories, thief skill bases,
 * experience thresholds -- which are systems rather than expression, and every
 * descriptive line is written for this project.
 *
 * 2E sits further from 5e than 3.5 does. Armor Class descends: 10 is unarmoured
 * and lower is better, and an attack lands when the d20 roll reaches THAC0
 * minus the target's AC. Saves are five named categories that improve in steps
 * rather than one number per ability. Strength above 18 is a percentile.
 */

const ADND_EDITION = "adnd2e";

// THAC0 -- "to hit Armor Class 0". Lower is better, and each class group
// improves at its own rate.
const ADND_THAC0_RATES = {
  warrior: level => 21 - level,                          // 1 point per level
  priest: level => 20 - Math.floor((level - 1) / 3) * 2, // 2 points per 3 levels
  rogue: level => 20 - Math.floor((level - 1) / 2),      // 1 point per 2 levels
  wizard: level => 20 - Math.floor((level - 1) / 3)      // 1 point per 3 levels
};

function adndThac0(group, level) {
  const rate = ADND_THAC0_RATES[group] || ADND_THAC0_RATES.rogue;
  return Math.max(1, rate(Math.max(1, Number(level) || 1)));
}

// The five saving throw categories, in the order a 2E sheet prints them.
const ADND_SAVE_CATEGORIES = [
  { key: "ppdm", label: "Paralyzation, Poison, Death Magic", short: "Par/Poison/Death" },
  { key: "rsw", label: "Rod, Staff, or Wand", short: "Rod/Staff/Wand" },
  { key: "pp", label: "Petrification or Polymorph", short: "Petrify/Polymorph" },
  { key: "bw", label: "Breath Weapon", short: "Breath" },
  { key: "spell", label: "Spell", short: "Spell" }
];

// Save targets by class group. Each row is [minLevel, ppdm, rsw, pp, bw, spell];
// you succeed by rolling that number or higher on a d20.
const ADND_SAVE_TABLES = {
  warrior: [[1, 14, 16, 15, 17, 17], [3, 13, 15, 14, 16, 16], [5, 11, 13, 12, 13, 14],
            [7, 10, 12, 11, 12, 13], [9, 8, 10, 9, 9, 11], [11, 7, 9, 8, 8, 10],
            [13, 5, 7, 6, 5, 8], [15, 4, 6, 5, 4, 7], [17, 3, 5, 4, 4, 6]],
  priest:  [[1, 10, 14, 13, 16, 15], [4, 9, 13, 12, 15, 14], [7, 7, 11, 10, 13, 12],
            [10, 6, 10, 9, 12, 11], [13, 5, 9, 8, 11, 10], [16, 4, 8, 7, 10, 9],
            [19, 2, 6, 5, 8, 7]],
  rogue:   [[1, 13, 14, 12, 16, 15], [5, 12, 13, 11, 15, 14], [9, 11, 12, 10, 14, 13],
            [13, 10, 11, 9, 13, 12], [17, 9, 10, 8, 12, 11], [21, 8, 9, 7, 11, 10]],
  wizard:  [[1, 14, 11, 13, 15, 12], [6, 13, 9, 11, 13, 10], [11, 11, 7, 9, 11, 8],
            [16, 10, 5, 7, 9, 6], [21, 8, 3, 5, 7, 4]]
};

function adndSaveTargets(group, level) {
  const table = ADND_SAVE_TABLES[group] || ADND_SAVE_TABLES.rogue;
  const lvl = Math.max(1, Number(level) || 1);
  let row = table[0];
  table.forEach(entry => { if (lvl >= entry[0]) row = entry; });
  return { ppdm: row[1], rsw: row[2], pp: row[3], bw: row[4], spell: row[5] };
}

const ADND_CLASSES = {
  Fighter: {
    icon: "♜", group: "warrior", hit: 10, prime: ["STR"], minimums: { STR: 9 },
    races: ["Human", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc"],
    xp: [0, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 750000,
         1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000, 2750000, 3000000],
    hpAfter9: 3, exceptionalStrength: true,
    summary: "The complete warrior: the best attack progression, the most hit points, and every weapon and armour available."
  },
  Paladin: {
    icon: "✦", group: "warrior", hit: 10, prime: ["STR", "CHA"],
    minimums: { STR: 12, CON: 9, WIS: 13, CHA: 17 }, alignment: "Lawful good",
    races: ["Human"], saveBonus: 2, caster: "priest", casterOffset: 8,
    xp: [0, 2250, 4500, 9000, 18000, 36000, 75000, 150000, 300000, 600000, 900000,
         1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 3300000, 3600000],
    hpAfter9: 3, exceptionalStrength: true,
    summary: "A holy warrior sworn to law and good, with a +2 bonus to every saving throw and priest spells from 9th level."
  },
  Ranger: {
    icon: "➶", group: "warrior", hit: 10, prime: ["STR", "DEX", "WIS"],
    minimums: { STR: 13, DEX: 13, CON: 14, WIS: 14 }, alignment: "Any good",
    races: ["Human", "Elf", "Half-Elf"], caster: "priest", casterOffset: 7,
    xp: [0, 2250, 4500, 9000, 18000, 36000, 75000, 150000, 300000, 600000, 900000,
         1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 3300000, 3600000],
    hpAfter9: 3, exceptionalStrength: true,
    summary: "A woodland warrior who tracks, fights well with two weapons, and gains a little druidic magic later on."
  },
  Cleric: {
    icon: "✚", group: "priest", hit: 8, prime: ["WIS"], minimums: { WIS: 9 },
    races: ["Human", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc"],
    caster: "priest",
    xp: [0, 1500, 3000, 6000, 13000, 27500, 55000, 110000, 225000, 450000, 675000,
         900000, 1125000, 1350000, 1575000, 1800000, 2025000, 2250000, 2475000, 2700000],
    hpAfter9: 2,
    summary: "A deity's servant who heals, turns undead, and traditionally leaves edged weapons alone."
  },
  Druid: {
    icon: "❦", group: "priest", hit: 8, prime: ["WIS", "CHA"],
    minimums: { WIS: 12, CHA: 15 }, alignment: "True neutral",
    races: ["Human", "Half-Elf"], caster: "priest",
    xp: [0, 2000, 4000, 7500, 12500, 20000, 35000, 60000, 90000, 125000, 200000,
         300000, 750000, 1500000, 3000000, 3500000, 4000000, 4500000, 5000000, 5500000],
    hpAfter9: 1,
    summary: "A priest of the natural world who shapechanges, charms animals and answers to the balance rather than a deity."
  },
  Mage: {
    icon: "✶", group: "wizard", hit: 4, prime: ["INT"], minimums: { INT: 9 },
    races: ["Human", "Elf", "Half-Elf"], caster: "wizard",
    xp: [0, 2500, 5000, 10000, 20000, 40000, 60000, 90000, 135000, 250000, 375000,
         750000, 1125000, 1500000, 1875000, 2250000, 2625000, 3000000, 3375000, 3750000],
    hpAfter9: 1,
    summary: "A student of arcane magic. Fragile early and unmatched late, limited by what Intelligence lets them learn."
  },
  Thief: {
    icon: "◈", group: "rogue", hit: 6, prime: ["DEX"], minimums: { DEX: 9 },
    races: ["Human", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc"],
    thiefSkills: true,
    xp: [0, 1250, 2500, 5000, 10000, 20000, 40000, 70000, 110000, 160000, 220000,
         440000, 660000, 880000, 1100000, 1320000, 1540000, 1760000, 1980000, 2200000],
    hpAfter9: 2,
    summary: "A specialist in locks, stealth and backstabs, with skills rated as percentages you distribute yourself."
  },
  Bard: {
    icon: "♪", group: "rogue", hit: 6, prime: ["DEX", "CHA"],
    minimums: { DEX: 12, INT: 13, CHA: 15 }, alignment: "Any neutral",
    races: ["Human", "Half-Elf"], caster: "wizard", thiefSkills: true, bardSkills: true,
    xp: [0, 1250, 2500, 5000, 10000, 20000, 40000, 70000, 110000, 160000, 220000,
         440000, 660000, 880000, 1100000, 1320000, 1540000, 1760000, 1980000, 2200000],
    hpAfter9: 2,
    summary: "A jack of all trades who inspires allies, knows a little of every legend, and casts from the wizard list."
  }
};

// Racial adjustments and the class level limits that made demihumans a
// short-term investment.
const ADND_RACES = {
  Human: { adjust: {}, size: "Medium", speed: 12, infravision: 0, limits: {},
    summary: "No adjustments, no level limits, and every class open. That freedom is the human advantage." },
  Dwarf: { adjust: { CON: 1, CHA: -1 }, size: "Medium", speed: 6, infravision: 60,
    limits: { Fighter: 15, Cleric: 10, Thief: 12 },
    summary: "Stout and hard to poison, with an eye for stonework and a deep suspicion of magic." },
  Elf: { adjust: { DEX: 1, CON: -1 }, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 12, Ranger: 15, Cleric: 12, Mage: 15, Thief: 12 },
    summary: "Graceful and long-lived, resistant to sleep and charm, at ease with sword and bow." },
  Gnome: { adjust: { INT: 1, WIS: -1 }, size: "Small", speed: 6, infravision: 60,
    limits: { Fighter: 11, Cleric: 9, Thief: 13 },
    summary: "Small, inventive tinkers with a gift for illusion and a rapport with burrowing animals." },
  "Half-Elf": { adjust: {}, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 14, Ranger: 16, Cleric: 14, Druid: 9, Mage: 12, Thief: 12, Bard: 14 },
    summary: "At home in two worlds and neither, with elven senses and human adaptability." },
  Halfling: { adjust: { DEX: 1, STR: -1 }, size: "Small", speed: 6, infravision: 30,
    limits: { Fighter: 9, Cleric: 8, Thief: 15 },
    summary: "Cheerful, startlingly hard to frighten, and quietly the best thieves in the game." },
  "Half-Orc": { adjust: { STR: 1, CON: 1, CHA: -2 }, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 10, Cleric: 4, Thief: 8 },
    summary: "Powerfully built and widely mistrusted, which most of them have stopped minding." }
};

// Ability score effects. Scores run 3 to 18, and warriors may roll exceptional
// Strength as a percentile above 18.
const ADND_STRENGTH = {
  1: { hit: -5, dmg: -4, weight: 1, openDoors: 1 },
  2: { hit: -3, dmg: -2, weight: 1, openDoors: 1 },
  3: { hit: -3, dmg: -1, weight: 5, openDoors: 2 },
  4: { hit: -2, dmg: -1, weight: 10, openDoors: 3 },
  5: { hit: -2, dmg: -1, weight: 10, openDoors: 3 },
  6: { hit: -1, dmg: 0, weight: 20, openDoors: 4 },
  7: { hit: -1, dmg: 0, weight: 20, openDoors: 4 },
  8: { hit: 0, dmg: 0, weight: 35, openDoors: 5 },
  9: { hit: 0, dmg: 0, weight: 35, openDoors: 5 },
  10: { hit: 0, dmg: 0, weight: 40, openDoors: 6 },
  11: { hit: 0, dmg: 0, weight: 40, openDoors: 6 },
  12: { hit: 0, dmg: 0, weight: 45, openDoors: 7 },
  13: { hit: 0, dmg: 0, weight: 45, openDoors: 7 },
  14: { hit: 0, dmg: 0, weight: 55, openDoors: 8 },
  15: { hit: 0, dmg: 0, weight: 55, openDoors: 8 },
  16: { hit: 0, dmg: 1, weight: 70, openDoors: 9 },
  17: { hit: 1, dmg: 1, weight: 85, openDoors: 10 },
  18: { hit: 1, dmg: 2, weight: 110, openDoors: 11 }
};

// Exceptional Strength, warriors only. Each band covers percentile rolls up to
// and including its max.
const ADND_EXCEPTIONAL_STRENGTH = [
  { max: 50, label: "18/01-50", hit: 1, dmg: 3, weight: 135, openDoors: 13 },
  { max: 75, label: "18/51-75", hit: 2, dmg: 3, weight: 160, openDoors: 14 },
  { max: 90, label: "18/76-90", hit: 2, dmg: 4, weight: 185, openDoors: 15 },
  { max: 99, label: "18/91-99", hit: 2, dmg: 5, weight: 235, openDoors: 16 },
  { max: 100, label: "18/00", hit: 3, dmg: 6, weight: 335, openDoors: 17 }
];

// Dexterity. The Armor Class figure is a penalty in 2E terms: a negative number
// improves a descending AC.
const ADND_DEXTERITY = {
  3: { reaction: -3, missile: -3, ac: 4 }, 4: { reaction: -2, missile: -2, ac: 3 },
  5: { reaction: -1, missile: -1, ac: 2 }, 6: { reaction: 0, missile: 0, ac: 1 },
  7: { reaction: 0, missile: 0, ac: 0 }, 8: { reaction: 0, missile: 0, ac: 0 },
  9: { reaction: 0, missile: 0, ac: 0 }, 10: { reaction: 0, missile: 0, ac: 0 },
  11: { reaction: 0, missile: 0, ac: 0 }, 12: { reaction: 0, missile: 0, ac: 0 },
  13: { reaction: 0, missile: 0, ac: 0 }, 14: { reaction: 0, missile: 0, ac: 0 },
  15: { reaction: 0, missile: 0, ac: -1 }, 16: { reaction: 1, missile: 1, ac: -2 },
  17: { reaction: 2, missile: 2, ac: -3 }, 18: { reaction: 2, missile: 2, ac: -4 },
  19: { reaction: 3, missile: 3, ac: -4 }
};

// Constitution. Only warriors receive the bonuses above +2.
const ADND_CONSTITUTION = {
  3: { hp: -2, warriorHp: -2, system: 35, resurrection: 40 },
  4: { hp: -1, warriorHp: -1, system: 40, resurrection: 45 },
  5: { hp: -1, warriorHp: -1, system: 45, resurrection: 50 },
  6: { hp: -1, warriorHp: -1, system: 50, resurrection: 55 },
  7: { hp: 0, warriorHp: 0, system: 55, resurrection: 60 },
  8: { hp: 0, warriorHp: 0, system: 60, resurrection: 65 },
  9: { hp: 0, warriorHp: 0, system: 65, resurrection: 70 },
  10: { hp: 0, warriorHp: 0, system: 70, resurrection: 75 },
  11: { hp: 0, warriorHp: 0, system: 75, resurrection: 80 },
  12: { hp: 0, warriorHp: 0, system: 80, resurrection: 85 },
  13: { hp: 0, warriorHp: 0, system: 85, resurrection: 90 },
  14: { hp: 0, warriorHp: 0, system: 88, resurrection: 92 },
  15: { hp: 1, warriorHp: 1, system: 90, resurrection: 94 },
  16: { hp: 2, warriorHp: 2, system: 95, resurrection: 96 },
  17: { hp: 2, warriorHp: 3, system: 97, resurrection: 98 },
  18: { hp: 2, warriorHp: 4, system: 99, resurrection: 100 },
  19: { hp: 2, warriorHp: 5, system: 99, resurrection: 100 }
};

// Wisdom grants bonus priest spells and a magical defence adjustment.
const ADND_WISDOM = {
  13: { bonus: [1], defense: 0 }, 14: { bonus: [2], defense: 0 },
  15: { bonus: [2, 1], defense: 1 }, 16: { bonus: [2, 2], defense: 2 },
  17: { bonus: [2, 2, 1], defense: 3 }, 18: { bonus: [2, 2, 1, 1], defense: 4 },
  19: { bonus: [3, 2, 2, 1], defense: 4 }
};

// Intelligence caps the spell level a mage may learn and the odds of learning
// any given spell.
const ADND_INTELLIGENCE = {
  9: { maxSpellLevel: 4, learn: 35, perLevel: 6 },
  10: { maxSpellLevel: 5, learn: 40, perLevel: 7 },
  11: { maxSpellLevel: 5, learn: 45, perLevel: 7 },
  12: { maxSpellLevel: 6, learn: 50, perLevel: 7 },
  13: { maxSpellLevel: 6, learn: 55, perLevel: 9 },
  14: { maxSpellLevel: 7, learn: 60, perLevel: 9 },
  15: { maxSpellLevel: 7, learn: 65, perLevel: 11 },
  16: { maxSpellLevel: 8, learn: 70, perLevel: 11 },
  17: { maxSpellLevel: 8, learn: 75, perLevel: 14 },
  18: { maxSpellLevel: 9, learn: 85, perLevel: 18 },
  19: { maxSpellLevel: 9, learn: 95, perLevel: 99 }
};

// Thief skills start from a common base, are adjusted by race and Dexterity,
// and then improved with 30 discretionary points per level.
const ADND_THIEF_SKILLS = {
  "Pick Pockets": { base: 15, dex: { 12: 0, 13: 0, 16: 5, 17: 10, 18: 15 } },
  "Open Locks": { base: 10, dex: { 12: 0, 13: 0, 16: 5, 17: 10, 18: 15 } },
  "Find/Remove Traps": { base: 5, dex: { 12: 0, 13: 0, 16: 0, 17: 5, 18: 10 } },
  "Move Silently": { base: 10, dex: { 12: 0, 13: 0, 16: 0, 17: 5, 18: 10 } },
  "Hide in Shadows": { base: 5, dex: { 12: 0, 13: 0, 16: 0, 17: 5, 18: 10 } },
  "Detect Noise": { base: 15, dex: {} },
  "Climb Walls": { base: 60, dex: {} },
  "Read Languages": { base: 0, dex: {} }
};

// Racial adjustments to the thief skill percentages.
const ADND_THIEF_RACIAL = {
  Dwarf: { "Open Locks": 10, "Find/Remove Traps": 15, "Climb Walls": -10, "Read Languages": -5 },
  Elf: { "Pick Pockets": 5, "Open Locks": -5, "Move Silently": 5, "Hide in Shadows": 10, "Detect Noise": 5 },
  Gnome: { "Open Locks": 5, "Find/Remove Traps": 10, "Move Silently": 5, "Hide in Shadows": 5,
    "Detect Noise": 10, "Climb Walls": -15 },
  "Half-Elf": { "Pick Pockets": 10, "Detect Noise": 5 },
  Halfling: { "Pick Pockets": 5, "Open Locks": 5, "Find/Remove Traps": 5, "Move Silently": 10,
    "Hide in Shadows": 15, "Detect Noise": 5, "Climb Walls": -15, "Read Languages": -5 },
  "Half-Orc": { "Open Locks": 5, "Find/Remove Traps": 5, "Climb Walls": 5, "Read Languages": -10 }
};

// Spell slots per day. Index 0 is class level 1; each row runs from spell
// level 1 upward, since 2E has no cantrips.
const ADND_SPELL_SLOTS = {
  wizard: [[1], [2], [2, 1], [3, 2], [4, 2, 1], [4, 2, 2], [4, 3, 2, 1], [4, 3, 3, 2],
           [4, 3, 3, 2, 1], [4, 4, 3, 2, 2], [4, 4, 4, 3, 3], [4, 4, 4, 4, 4, 1],
           [5, 5, 5, 4, 4, 2], [5, 5, 5, 4, 4, 3, 1], [5, 5, 5, 5, 5, 3, 2],
           [5, 5, 5, 5, 5, 4, 3], [5, 5, 5, 5, 5, 4, 3, 1], [5, 5, 5, 5, 5, 4, 3, 2],
           [5, 5, 5, 5, 5, 4, 4, 3], [5, 5, 5, 5, 5, 5, 4, 3, 1]],
  priest: [[1], [2], [2, 1], [3, 2], [3, 3, 1], [3, 3, 2], [3, 3, 2, 1], [3, 3, 3, 2],
           [4, 4, 3, 2, 1], [4, 4, 3, 3, 2], [5, 5, 4, 3, 2, 1], [6, 6, 5, 3, 2, 2],
           [6, 6, 6, 4, 2, 2], [6, 6, 6, 5, 3, 2], [6, 6, 6, 6, 4, 2], [7, 7, 7, 6, 4, 3],
           [7, 7, 7, 7, 5, 3], [8, 8, 8, 8, 6, 4], [9, 9, 8, 8, 6, 4], [9, 9, 9, 8, 7, 5]]
};

if (typeof window !== "undefined") {
  window.ADND_EDITION = ADND_EDITION;
  window.ADND_CLASSES = ADND_CLASSES;
  window.ADND_RACES = ADND_RACES;
  window.ADND_SAVE_CATEGORIES = ADND_SAVE_CATEGORIES;
  window.ADND_SAVE_TABLES = ADND_SAVE_TABLES;
  window.ADND_STRENGTH = ADND_STRENGTH;
  window.ADND_EXCEPTIONAL_STRENGTH = ADND_EXCEPTIONAL_STRENGTH;
  window.ADND_DEXTERITY = ADND_DEXTERITY;
  window.ADND_CONSTITUTION = ADND_CONSTITUTION;
  window.ADND_WISDOM = ADND_WISDOM;
  window.ADND_INTELLIGENCE = ADND_INTELLIGENCE;
  window.ADND_THIEF_SKILLS = ADND_THIEF_SKILLS;
  window.ADND_THIEF_RACIAL = ADND_THIEF_RACIAL;
  window.ADND_SPELL_SLOTS = ADND_SPELL_SLOTS;
  window.adndThac0 = adndThac0;
  window.adndSaveTargets = adndSaveTargets;
}
