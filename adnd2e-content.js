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
// The level at which a group stops rolling hit dice and starts taking a flat
// gain. Warriors and priests stop after nine; wizards and rogues after ten.
const ADND_LAST_HIT_DIE_LEVEL = { warrior: 9, priest: 9, wizard: 10, rogue: 10 };

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
    hpAfter9: 3, exceptionalStrength: true, canSpecialise: true,
    summary: "The complete warrior: the best attack progression, the most hit points, and every weapon and armour available."
  },
  Paladin: {
    icon: "✦", group: "warrior", hit: 10, prime: ["STR", "CHA"], ownSpellTable: "paladin", noWisdomBonus: true, turnsUndead: true, turnOffset: 2,
    minimums: { STR: 12, CON: 9, WIS: 13, CHA: 17 }, alignment: "Lawful good",
    races: ["Human"], saveBonus: 2, caster: "priest", casterOffset: 8,
    xp: [0, 2250, 4500, 9000, 18000, 36000, 75000, 150000, 300000, 600000, 900000,
         1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 3300000, 3600000],
    hpAfter9: 3, exceptionalStrength: true,
    summary: "A holy warrior sworn to law and good, with a +2 bonus to every saving throw and priest spells from 9th level."
  },
  Ranger: {
    icon: "➶", group: "warrior", hit: 10, prime: ["STR", "DEX", "WIS"], ownSpellTable: "ranger",
    minimums: { STR: 13, DEX: 13, CON: 14, WIS: 14 }, alignment: "Any good",
    races: ["Human", "Elf", "Half-Elf"], caster: "priest", casterOffset: 7, rangerStealth: true,
    xp: [0, 2250, 4500, 9000, 18000, 36000, 75000, 150000, 300000, 600000, 900000,
         1200000, 1500000, 1800000, 2100000, 2400000, 2700000, 3000000, 3300000, 3600000],
    hpAfter9: 3, exceptionalStrength: true,
    summary: "A woodland warrior who tracks, fights well with two weapons, and gains a little druidic magic later on."
  },
  Cleric: {
    icon: "✚", group: "priest", hit: 8, prime: ["WIS"], minimums: { WIS: 9 }, turnsUndead: true,
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
    hpAfter9: 2,
    summary: "A priest of the natural world who shapechanges, charms animals and answers to the balance rather than a deity."
  },
  Monk: {
    icon: "\u262f", group: "priest", hit: 8, prime: ["WIS"],
    minimums: { STR: 9, DEX: 13, WIS: 9 }, alignment: "Lawful evil",
    races: ["Human"], monk: true, monkSkills: true, origin: "The Scarlet Brotherhood",
    xp: [0, 1500, 3000, 6000, 13000, 27500, 55000, 110000, 225000, 450000, 675000,
         900000, 1125000, 1350000, 1575000, 1800000, 2025000, 2250000, 2475000, 2700000],
    hpAfter9: 2,
    note: "The published table and the surrounding text disagree over when the +2 open hand and astral projection arrive. The table's levels are used here.",
    summary: "A martial ascetic who fights barehanded, grows harder to hit every other level, and adds a new bodily discipline almost every level after that. The 2E Player's Handbook left the class out; it returned in a 1999 supplement."
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
    icon: "♪", group: "rogue", hit: 6, prime: ["DEX", "CHA"], bardSkills: true, ownSpellTable: "bard",
    minimums: { DEX: 12, INT: 13, CHA: 15 }, alignment: "Any neutral",
    races: ["Human", "Half-Elf"], caster: "wizard",
    xp: [0, 1250, 2500, 5000, 10000, 20000, 40000, 70000, 110000, 160000, 220000,
         440000, 660000, 880000, 1100000, 1320000, 1540000, 1760000, 1980000, 2200000],
    hpAfter9: 2,
    summary: "A jack of all trades who inspires allies, knows a little of every legend, and casts from the wizard list."
  }
};


// Paladins and rangers do not simply read the priest table a few levels late:
// each has its own progression (Table 17), and after the first couple of levels
// the two diverge from the priest's noticeably. Index 0 of a row is spell level
// 1 -- neither class ever gets 0-level priest spells.
const ADND_CLASS_SPELL_TABLES = {
  paladin: {
    firstLevel: 9,
    rows: { 9: [1], 10: [2], 11: [2, 1], 12: [2, 2], 13: [2, 2, 1], 14: [3, 2, 1],
      15: [3, 2, 1, 1], 16: [3, 3, 2, 1], 17: [3, 3, 3, 1], 18: [3, 3, 3, 1],
      19: [3, 3, 3, 2], 20: [3, 3, 3, 3] }
  },
  bard: {
    firstLevel: 2,
    rows: { 2: [1], 3: [2], 4: [2, 1], 5: [3, 1], 6: [3, 2], 7: [3, 2, 1], 8: [3, 3, 1],
      9: [3, 3, 2], 10: [3, 3, 2, 1], 11: [3, 3, 3, 1], 12: [3, 3, 3, 2], 13: [3, 3, 3, 2, 1],
      14: [3, 3, 3, 3, 1], 15: [3, 3, 3, 3, 2], 16: [4, 3, 3, 3, 2, 1], 17: [4, 4, 3, 3, 3, 1],
      18: [4, 4, 4, 3, 3, 2], 19: [4, 4, 4, 4, 3, 2], 20: [4, 4, 4, 4, 4, 3] }
  },
  ranger: {
    firstLevel: 8,
    rows: { 8: [1], 9: [2], 10: [2, 1], 11: [2, 2], 12: [2, 2, 1], 13: [3, 2, 1],
      14: [3, 2, 2], 15: [3, 3, 2], 16: [3, 3, 3], 17: [3, 3, 3], 18: [3, 3, 3],
      19: [3, 3, 3], 20: [3, 3, 3] }
  }
};

function adndClassSpellRow(tableName, level) {
  const table = ADND_CLASS_SPELL_TABLES[tableName];
  if (!table) return null;
  const lvl = Math.max(1, Math.min(20, Number(level) || 1));
  if (lvl < table.firstLevel) return [];
  for (let candidate = lvl; candidate >= table.firstLevel; candidate -= 1) {
    if (table.rows[candidate]) return table.rows[candidate];
  }
  return [];
}

// Table 28. The published adjustments run from Dexterity 9 (a thief's minimum)
// up to 19, and the low end is a penalty, not a flat zero.
const ADND_THIEF_DEX_ADJUST = {
  "Pick Pockets":      { 9: -15, 10: -10, 11: -5, 12: 0, 17: 5, 18: 10, 19: 15 },
  "Open Locks":        { 9: -10, 10: -5, 11: 0, 16: 5, 17: 10, 18: 15, 19: 20 },
  "Find/Remove Traps": { 9: -10, 11: -5, 12: 0, 18: 5, 19: 10 },
  "Move Silently":     { 9: -20, 10: -15, 11: -10, 12: -5, 13: 0, 17: 5, 18: 10, 19: 15 },
  "Hide in Shadows":   { 9: -10, 10: -5, 11: 0, 17: 5, 18: 10, 19: 15 }
};

// Table 29. Leather is the baseline the base scores assume, so it adjusts
// nothing; going without armour is a bonus and anything stiffer is a penalty.
const ADND_ROGUE_ARMOR_ADJUST = {
  none:    { "Pick Pockets": 5, "Move Silently": 10, "Hide in Shadows": 5, "Climb Walls": 10 },
  leather: {},
  elven:   { "Pick Pockets": -20, "Open Locks": -5, "Find/Remove Traps": -5, "Move Silently": -10,
             "Hide in Shadows": -10, "Detect Noise": -5, "Climb Walls": -20 },
  studded: { "Pick Pockets": -30, "Open Locks": -10, "Find/Remove Traps": -10, "Move Silently": -20,
             "Hide in Shadows": -20, "Detect Noise": -10, "Climb Walls": -30 },
  chain:   { "Pick Pockets": -25, "Open Locks": -10, "Find/Remove Traps": -10, "Move Silently": -15,
             "Hide in Shadows": -15, "Detect Noise": -5, "Climb Walls": -25 }
};

// Which column of Table 29 a piece of armour sits in. A rogue is not permitted
// anything stiffer than studded leather or elven chain, so the heavier entries
// are marked rather than silently given a number the book never printed.
const ADND_ROGUE_ARMOR_COLUMN = {
  "Padded armor": "studded", "Leather armor": "leather", "Studded leather": "studded",
  "Elven chain": "elven", "Ring mail": "chain", "Chain mail": "chain"
};

// Table 33. A bard has four of the rogue skills, with their own base scores,
// and twenty discretionary points at first level rather than a thief's sixty.
const ADND_BARD_SKILLS = {
  "Climb Walls": { base: 50 },
  "Detect Noise": { base: 20 },
  "Pick Pockets": { base: 10 },
  "Read Languages": { base: 5 }
};

// Table 30.
const ADND_BACKSTAB_MULTIPLIER = [{ max: 4, times: 2 }, { max: 8, times: 3 },
  { max: 12, times: 4 }, { max: 20, times: 5 }];

function adndBackstabMultiplier(level) {
  const lvl = Math.max(1, Number(level) || 1);
  const row = ADND_BACKSTAB_MULTIPLIER.find(entry => lvl <= entry.max);
  return row ? row.times : 5;
}

// Table 15. Only the warrior group gains extra melee attacks from level alone.
function adndWarriorAttacks(level) {
  const lvl = Math.max(1, Number(level) || 1);
  if (lvl >= 13) return "2";
  if (lvl >= 7) return "3/2";
  return "1";
}

// Table 18. A ranger's stealth in natural surroundings, halved elsewhere, and
// unavailable in anything heavier than studded leather.
const ADND_RANGER_STEALTH = [
  [10, 15], [15, 21], [20, 27], [25, 33], [31, 40], [37, 47], [43, 55], [49, 62],
  [56, 70], [63, 78], [70, 86], [77, 94], [85, 99], [93, 99], [99, 99], [99, 99],
  [99, 99], [99, 99], [99, 99], [99, 99]
];

// Table 61. The number a d20 must reach to turn that kind of undead, "T" for an
// automatic turn and "D" for one that destroys them outright.
const ADND_TURN_UNDEAD_TARGETS = [
  { name: "Skeleton or 1 HD", row: [10, 7, 4, "T", "T", "D", "D", "D*", "D*", "D*", "D*", "D*"] },
  { name: "Zombie", row: [13, 10, 7, 4, "T", "T", "D", "D", "D*", "D*", "D*", "D*"] },
  { name: "Ghoul or 2 HD", row: [16, 13, 10, 7, 4, "T", "T", "D", "D", "D*", "D*", "D*"] },
  { name: "Shadow or 3-4 HD", row: [19, 16, 13, 10, 7, 4, "T", "T", "D", "D", "D*", "D*"] },
  { name: "Wight or 5 HD", row: [20, 19, 16, 13, 10, 7, 4, "T", "T", "D", "D", "D*"] },
  { name: "Ghast", row: [null, 20, 19, 16, 13, 10, 7, 4, "T", "T", "D", "D"] },
  { name: "Wraith or 6 HD", row: [null, null, 20, 19, 16, 13, 10, 7, 4, "T", "T", "D"] },
  { name: "Mummy or 7 HD", row: [null, null, null, 20, 19, 16, 13, 10, 7, 4, "T", "T"] },
  { name: "Spectre or 8 HD", row: [null, null, null, null, 20, 19, 16, 13, 10, 7, 4, "T"] },
  { name: "Vampire or 9 HD", row: [null, null, null, null, null, 20, 19, 16, 13, 10, 7, 4] },
  { name: "Ghost or 10 HD", row: [null, null, null, null, null, null, 20, 19, 16, 13, 10, 7] },
  { name: "Lich or 11+ HD", row: [null, null, null, null, null, null, null, 20, 19, 16, 13, 10] },
  { name: "Special", row: [null, null, null, null, null, null, null, null, 20, 19, 16, 13] }
];

// The table's columns are priest levels 1 to 9, then 10-11, 12-13 and 14+.
function adndTurnColumn(level) {
  const lvl = Number(level) || 0;
  if (lvl < 1) return -1;
  if (lvl >= 14) return 11;
  if (lvl >= 12) return 10;
  if (lvl >= 10) return 9;
  return lvl - 1;
}

// A paladin turns as a cleric two levels lower, and only from 3rd level.
function adndTurningLevel(className, level) {
  const cls = ADND_CLASSES[className] || {};
  if (!cls.turnsUndead) return 0;
  if (cls.turnOffset) {
    const effective = Number(level) - cls.turnOffset;
    return effective >= 1 ? effective : 0;
  }
  return Math.max(0, Number(level) || 0);
}


// What each of the original eight classes gains, and when. Names and levels are
// from the Player's Handbook class entries; the wording is written for this
// project. The specialists and the monk keep their own lists elsewhere.
const ADND_CLASS_FEATURES = {
  Fighter: [
    { level: 1, name: "Warrior weapon training", text: "Every weapon and every armour is open to a fighter, and the class starts with more weapon proficiencies than any other and gains them fastest." },
    { level: 1, name: "Weapon specialisation", text: "A single-class fighter may spend proficiency slots to specialise in one weapon, improving the attack roll, the damage, and the rate of attacks with it. No other class may." },
    { level: 7, name: "Extra attacks", text: "Melee attacks improve to three every two rounds." },
    { level: 9, name: "Stronghold and followers", text: "A fighter who builds a stronghold and clears the land around it attracts a body of troops who serve without pay." },
    { level: 13, name: "Two attacks a round", text: "Melee attacks improve again, to two every round." }
  ],
  Paladin: [
    { level: 1, name: "Detect evil", text: "By concentrating for a round, the paladin senses evil intent within sixty feet. There is no limit on how often." },
    { level: 1, name: "Blessed saves", text: "A +2 bonus to every saving throw, of every category." },
    { level: 1, name: "Immune to disease", text: "No ordinary disease touches a paladin. Curses that resemble one -- lycanthropy, mummy rot -- still do." },
    { level: 1, name: "Lay on hands", text: "Once a day, heal two hit points per level, on the paladin or on someone else." },
    { level: 1, name: "Cure disease", text: "Once a week for every five levels: once at 1st through 5th, twice at 6th through 10th, and so on." },
    { level: 1, name: "Aura of protection", text: "Summoned and evil creatures take -1 on their attack rolls within ten feet, whoever they are attacking. The source is obvious even through a disguise." },
    { level: 1, name: "Holy sword", text: "Drawn and held, a holy sword throws out a ten-foot circle that dispels hostile magic up to the paladin's own level." },
    { level: 3, name: "Turn undead and fiends", text: "As a cleric two levels lower -- so a 3rd-level paladin turns as a 1st-level cleric." },
    { level: 4, name: "Call a war horse", text: "The paladin's bonded steed, found rather than summoned, usually at the end of a quest of its own." },
    { level: 9, name: "Priest spells", text: "Spells of the combat, divination, healing and protective spheres, on the paladin's own progression. A high Wisdom grants no extra ones." }
  ],
  Ranger: [
    { level: 1, name: "Two-weapon fighting", text: "In studded leather or lighter, a ranger fights with a weapon in each hand at no penalty. No shield, of course." },
    { level: 1, name: "Tracking", text: "The ranger tracks without spending a proficiency slot on it, and the skill improves by +1 for every three levels." },
    { level: 1, name: "Woodland stealth", text: "In studded leather or lighter, a ranger can hide in shadows and move silently in natural surroundings on the class percentages. Elsewhere the chance is halved; in heavier armour there is none." },
    { level: 1, name: "Animal empathy", text: "A domestic or friendly animal is befriended automatically. A wild or attack-trained one saves against rods to resist." },
    { level: 2, name: "Species enemy", text: "One creature the ranger hunts by preference: +4 to hit it, and -4 on encounter reactions with its kind, which is hard to hide." },
    { level: 8, name: "Priest spells", text: "Druidic spells on the ranger's own progression, beginning with one first-level spell." },
    { level: 10, name: "Followers", text: "A body of followers arrives, drawn by reputation rather than pay -- the roll decides what turns up." }
  ],
  Cleric: [
    { level: 1, name: "Turn undead", text: "By presenting a holy symbol the cleric drives off undead, or destroys them outright at higher levels. The number needed is on the turning table." },
    { level: 1, name: "Granted spells", text: "Spells come from the cleric's deity rather than a book, chosen fresh each day from the spheres that deity allows." },
    { level: 1, name: "Blunt weapons", text: "Most faiths forbid edged and pointed weapons, leaving the mace, the hammer, the staff and the sling." },
    { level: 8, name: "Followers", text: "A cleric who establishes a place of worship attracts a congregation and a guard of the faithful." }
  ],
  Druid: [
    { level: 1, name: "Nature's tongue", text: "The druid knows a secret language of their order, and identifying another druid by it is how the order recognises its own." },
    { level: 1, name: "Nonmetal restriction", text: "A druid wears leather and carries a wooden shield, and uses only the weapons the order permits." },
    { level: 3, name: "Identify natural things", text: "Plants, animals and pure water are recognised without error." },
    { level: 3, name: "Pass without trace", text: "Thorn, briar and tangled vine part for the druid, who leaves no trail and is not slowed." },
    { level: 3, name: "Woodland languages", text: "One tongue of the woodland folk at 3rd level, and another at every level after." },
    { level: 7, name: "Immune to woodland charm", text: "Dryads, nixies and their like cannot charm the druid." },
    { level: 7, name: "Shapechange", text: "Three times a day -- once each as reptile, bird and mammal -- the druid takes the shape of a real animal from bullfrog to black bear, gaining its movement, attacks and Armor Class, and healing 10 to 60 percent of the damage taken so far." }
  ],
  Mage: [
    { level: 1, name: "Spellbook", text: "A mage casts only what has been written down and memorised, and Intelligence decides both the highest spell level reachable and the odds of learning any given spell." },
    { level: 1, name: "No armour", text: "Armour interferes with the gestures a spell needs. A mage wears none and carries a dagger, a dart, a sling or a staff." },
    { level: 1, name: "Familiar", text: "A find familiar spell binds a small creature to the mage, which lends its senses and a share of its vitality -- and takes some of the mage's with it if it dies." },
    { level: 9, name: "Tower and apprentices", text: "A mage of this standing can establish a tower and attract students, and begins to be sought out for the work only a wizard can do." },
    { level: 12, name: "Spell research", text: "The mage can research entirely new spells, and craft magical items beyond scrolls and potions." }
  ],
  Thief: [
    { level: 1, name: "Thieving skills", text: "Eight percentile skills, adjusted by race, by Dexterity and by armour, with sixty discretionary points to spend at first level and thirty at every level after." },
    { level: 1, name: "Backstab", text: "Striking an unaware opponent from behind gives +4 to hit and multiplies the damage -- twice at 1st level, and higher as the thief advances." },
    { level: 1, name: "Thieves' cant", text: "The trade's own jargon, understood by thieves everywhere and by almost nobody else." },
    { level: 10, name: "Read scrolls", text: "A thief of this standing can puzzle out most magical scrolls, though roughly one attempt in four goes wrong in some way." },
    { level: 10, name: "Followers", text: "A thief who sets up somewhere attracts a gang, though loyalty is a different question." }
  ],
  Bard: [
    { level: 1, name: "Rogue skills", text: "Climb walls, detect noise, pick pockets and read languages, on the bard's own base scores, with twenty discretionary points at first level and fifteen at every level after." },
    { level: 1, name: "Influence reactions", text: "Performing to a crowd that is not already fighting, the bard shifts its mood one step. Everyone listening saves against paralyzation at -1 for every three bard levels." },
    { level: 1, name: "Inspire allies", text: "Three rounds of performance before a known threat gives allies within ten feet per level either +1 to hit, +1 on saves, or +2 morale, lasting a round per level." },
    { level: 1, name: "Counter song", text: "Once per encounter, the bard's own music blocks a magical attack made of song or speech for everyone within thirty feet, on a successful save against spells." },
    { level: 1, name: "Legend lore", text: "A 5% chance per level to recognise the general nature and history of a magical item on close examination -- not its exact powers." },
    { level: 2, name: "Wizard spells", text: "The bard casts from the wizard list, learning spells the way a mage does but on the bard's own slower progression." },
    { level: 9, name: "Followers", text: "A bard who settles attracts a body of soldiers, who arrive over time and are not replaced if they fall." }
  ]
};


// Table 34. Proficiency is the assumed baseline in 2E, so being proficient
// grants nothing -- it is swinging a weapon you never trained on that costs
// you, and how much depends on the class group.
const ADND_PROFICIENCY_SLOTS = {
  warrior: { weapon: 4, weaponEvery: 3, penalty: -2, nonweapon: 3, nonweaponEvery: 3 },
  wizard:  { weapon: 1, weaponEvery: 6, penalty: -5, nonweapon: 4, nonweaponEvery: 3 },
  priest:  { weapon: 2, weaponEvery: 4, penalty: -3, nonweapon: 4, nonweaponEvery: 3 },
  rogue:   { weapon: 2, weaponEvery: 4, penalty: -3, nonweapon: 3, nonweaponEvery: 4 }
};

function adndWeaponSlots(group, level) {
  const rule = ADND_PROFICIENCY_SLOTS[group] || ADND_PROFICIENCY_SLOTS.rogue;
  const lvl = Math.max(1, Number(level) || 1);
  return rule.weapon + Math.floor(lvl / rule.weaponEvery);
}

function adndNonweaponSlots(group, level) {
  const rule = ADND_PROFICIENCY_SLOTS[group] || ADND_PROFICIENCY_SLOTS.rogue;
  const lvl = Math.max(1, Number(level) || 1);
  return rule.nonweapon + Math.floor(lvl / rule.nonweaponEvery);
}

function adndNonProficiencyPenalty(group) {
  return (ADND_PROFICIENCY_SLOTS[group] || ADND_PROFICIENCY_SLOTS.rogue).penalty;
}

// Table 35. A specialised fighter attacks more often, and the rate depends on
// what kind of weapon it is.
const ADND_SPECIALIST_ATTACKS = [
  { max: 6, melee: "3/2", lightCrossbow: "1/1", heavyCrossbow: "1/2", thrownDagger: "3/1", thrownDart: "4/1", otherThrown: "3/2" },
  { max: 12, melee: "2/1", lightCrossbow: "3/2", heavyCrossbow: "1/1", thrownDagger: "4/1", thrownDart: "5/1", otherThrown: "2/1" },
  { max: 20, melee: "5/2", lightCrossbow: "2/1", heavyCrossbow: "3/2", thrownDagger: "5/1", thrownDart: "6/1", otherThrown: "5/2" }
];

function adndSpecialistAttackRow(level) {
  const lvl = Math.max(1, Number(level) || 1);
  return ADND_SPECIALIST_ATTACKS.find(row => lvl <= row.max) || ADND_SPECIALIST_ATTACKS[2];
}


// Nonweapon proficiencies are 2E's skill system: a check succeeds on a d20 roll
// at or under the relevant ability score plus the proficiency's own modifier.
//
// This is the set the source consulted attributes to the Player's Handbook, and
// it is not the whole of that book's list. The builder therefore also takes a
// typed entry, so a proficiency that is missing here can still be recorded
// rather than being quietly unavailable.
const ADND_NONWEAPON_PROFICIENCIES = {
  "Agriculture": { slots: 1, ability: "INT", modifier: 0 },
  "Animal Handling": { slots: 1, ability: "WIS", modifier: -1 },
  "Animal Training": { slots: 1, ability: "WIS", modifier: 0 },
  "Artistic Ability": { slots: 1, ability: "WIS", modifier: 0 },
  "Blacksmithing": { slots: 1, ability: "STR", modifier: 0 },
  "Brewing": { slots: 1, ability: "INT", modifier: 0 },
  "Carpentry": { slots: 1, ability: "STR", modifier: 0 },
  "Cobbling": { slots: 1, ability: "DEX", modifier: 0 },
  "Cooking": { slots: 1, ability: "INT", modifier: 0 },
  "Dancing": { slots: 1, ability: "DEX", modifier: 0 },
  "Direction Sense": { slots: 1, ability: "WIS", modifier: 1 },
  "Etiquette": { slots: 1, ability: "CHA", modifier: 0 },
  "Fire-building": { slots: 1, ability: "WIS", modifier: -1 },
  "Fishing": { slots: 1, ability: "WIS", modifier: -1 },
  "Heraldry": { slots: 1, ability: "INT", modifier: 0 },
  "Languages, Modern": { slots: 1, ability: "INT", modifier: 0 },
  "Leatherworking": { slots: 1, ability: "INT", modifier: 0 },
  "Mining": { slots: 2, ability: "WIS", modifier: -3 },
  "Pottery": { slots: 1, ability: "DEX", modifier: -2 },
  "Riding, Airborne": { slots: 2, ability: "WIS", modifier: -2 },
  "Riding, Land-Based": { slots: 1, ability: "WIS", modifier: 3 },
  "Rope Use": { slots: 1, ability: "DEX", modifier: 0 },
  "Seamanship": { slots: 1, ability: "DEX", modifier: 1 },
  "Seamstress/Tailor": { slots: 1, ability: "DEX", modifier: -1 },
  "Singing": { slots: 1, ability: "CHA", modifier: 0 },
  "Stonemasonry": { slots: 1, ability: "STR", modifier: -2 },
  "Swimming": { slots: 1, ability: "STR", modifier: 0 },
  "Weather Sense": { slots: 1, ability: "WIS", modifier: -1 },
  "Weaving": { slots: 1, ability: "INT", modifier: -1 }
};

const ADND_NONWEAPON_NOTE =
  "A check succeeds on a d20 roll at or under the ability score plus the proficiency's modifier. This list is the Player's Handbook set the source confirms; anything missing can be typed in below.";


// 2E has no attunement. What it has is a cap on how many magical items certain
// classes may keep at all, and a short list of conditions worth tracking.
const ADND_MAGIC_ITEM_LIMITS = {
  Paladin: { total: 10, note: "At most one suit of armour, one shield, four weapons and four other items." },
  Monk: { total: 5, note: "Only items a rogue could use, and no more wealth than a modest life needs." }
};

const ADND_CONDITIONS = [
  "Blinded", "Charmed", "Confused", "Deafened", "Feebleminded", "Held", "Paralyzed",
  "Petrified", "Poisoned", "Prone", "Silenced", "Slowed", "Stunned", "Unconscious"
];

// Racial adjustments and the class level limits that made demihumans a
// short-term investment.
const ADND_RACES = {
  Human: { adjust: {}, size: "Medium", speed: 12, infravision: 0, limits: {},
    summary: "No adjustments, no level limits, and every class open. That freedom is the human advantage." },
  Dwarf: { adjust: { CON: 1, CHA: -1 }, size: "Medium", speed: 6, infravision: 60, constitutionSaves: true,
    limits: { Fighter: 15, Cleric: 10, Thief: 12 },
    summary: "Stout and hard to poison, with an eye for stonework and a deep suspicion of magic." },
  Elf: { adjust: { DEX: 1, CON: -1 }, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 12, Ranger: 15, Cleric: 12, Mage: 15, Thief: 12 },
    summary: "Graceful and long-lived, resistant to sleep and charm, at ease with sword and bow." },
  Gnome: { adjust: { INT: 1, WIS: -1 }, size: "Small", speed: 6, infravision: 60, constitutionSaves: true,
    limits: { Fighter: 11, Cleric: 9, Thief: 13 },
    summary: "Small, inventive tinkers with a gift for illusion and a rapport with burrowing animals." },
  "Half-Elf": { adjust: {}, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 14, Ranger: 16, Cleric: 14, Druid: 9, Mage: 12, Thief: 12 },
    summary: "At home in two worlds and neither, with elven senses and human adaptability." },
  Halfling: { adjust: { DEX: 1, STR: -1 }, size: "Small", speed: 6, infravision: 30, constitutionSaves: true,
    limits: { Fighter: 9, Cleric: 8, Thief: 15 }, noExceptionalStrength: true,
    summary: "Cheerful, startlingly hard to frighten, and quietly the best thieves in the game." },
  "Half-Orc": { adjust: { STR: 1, CON: 1, CHA: -2 }, size: "Medium", speed: 12, infravision: 60,
    limits: { Fighter: 10, Cleric: 4, Thief: 8 },
    summary: "Powerfully built and widely mistrusted, which most of them have stopped minding." }
};

// The eight schools a wizard may specialise in. Lesser divination is missing
// from the list on purpose: those spells are the trade's common ground and stay
// open to every wizard, specialist or not.
const ADND_WIZARD_SCHOOLS = {
  "Abjuration": "Wards, bindings and dispellings -- magic that keeps things out or shuts them down.",
  "Conjuration/Summoning": "Fetching matter and creatures here from somewhere else.",
  "Greater Divination": "Prising loose knowledge the caster has no ordinary way to reach.",
  "Enchantment/Charm": "Bending a mind, or investing an object with power.",
  "Illusion": "Images, phantasms and shadow-stuff that argue with the senses.",
  "Invocation/Evocation": "Raw energy shaped into force, fire and lightning.",
  "Necromancy": "Life force, death, and the bodies left behind.",
  "Alteration": "Changing what a thing is -- its shape, its size, its nature."
};

// A specialist trades breadth for depth: an extra spell of their own school at
// every spell level, better odds of learning inside it and worse outside, a
// save modifier both ways, and the schools opposite theirs closed off entirely.
const ADND_SPECIALIST_BENEFITS = [
  "One extra spell slot at every spell level, which must hold a spell of the specialist's school.",
  "+1 on saves against school spells cast by other wizards; targets take -1 saving against the specialist's own.",
  "+15% to learn a spell of the school, -15% to learn any spell outside it.",
  "One free school spell added to the book on reaching each new spell level, with no roll to learn it.",
  "Research inside the school is treated as one spell level easier."
];

const ADND_SPECIALISTS = {
  Abjurer: { icon: "\u26e8", school: "Abjuration", ability: { WIS: 15 }, races: ["Human"],
    opposition: ["Alteration", "Illusion"],
    summary: "Turns magic aside for a living. Buys that safety by giving up the schools that change things and the schools that lie." },
  Conjurer: { icon: "\u25ce", school: "Conjuration/Summoning", ability: { CON: 15 }, races: ["Human", "Half-Elf"],
    opposition: ["Greater Divination", "Invocation/Evocation"],
    summary: "Brings matter and creatures in from elsewhere, and needs the constitution to keep hold of what answers." },
  Diviner: { icon: "\u25c9", school: "Greater Divination", ability: { WIS: 16 }, races: ["Human", "Half-Elf", "Elf"],
    opposition: ["Conjuration/Summoning"],
    summary: "Knows things. Loses the least to specialisation and gains the least in a fight -- worth consulting before an adventure rather than during one." },
  Enchanter: { icon: "\u2765", school: "Enchantment/Charm", ability: { CHA: 16 }, races: ["Human", "Half-Elf", "Elf"],
    opposition: ["Invocation/Evocation", "Necromancy"],
    summary: "Works on minds and on objects, and gives up every spell that solves a problem by destroying it." },
  Illusionist: { icon: "\u25d0", school: "Illusion", ability: { DEX: 16 }, races: ["Human", "Gnome"],
    opposition: ["Necromancy", "Invocation/Evocation", "Abjuration"],
    summary: "Persuades the senses rather than the world. Pays the steepest price -- three closed schools -- and is the one specialty a gnome can take." },
  Invoker: { icon: "\u26a1", school: "Invocation/Evocation", ability: { CON: 16 }, races: ["Human"],
    opposition: ["Enchantment/Charm", "Conjuration/Summoning"],
    summary: "The artillery. Trades every spell that talks its way out of trouble for the ones that end it." },
  Necromancer: { icon: "\u2620", school: "Necromancy", ability: { WIS: 16 }, races: ["Human"],
    opposition: ["Illusion", "Enchantment/Charm"],
    summary: "Studies life force and what remains after it. Rare, mistrusted, and shut out of every spell that works by persuasion." },
  Transmuter: { icon: "\u27f3", school: "Alteration", ability: { DEX: 15 }, races: ["Human", "Half-Elf"],
    opposition: ["Abjuration", "Necromancy"],
    summary: "Changes what things are. The broadest specialty, closed off from warding magic and from the dead." }
};

// Each specialist is a mage underneath: same hit die, same THAC0 and saves,
// same experience table. Only the entry requirements and the school change.
Object.entries(ADND_SPECIALISTS).forEach(([name, spec]) => {
  ADND_CLASSES[name] = {
    ...ADND_CLASSES.Mage,
    icon: spec.icon,
    minimums: { INT: 9, ...spec.ability },
    races: [...spec.races],
    specialist: spec.school,
    opposition: [...spec.opposition],
    origin: "Specialist wizard",
    summary: spec.summary
  };
  // Level limits follow the mage's, except for gnomes -- who cannot be mages at
  // all, but may study illusion as far as 15th level.
  spec.races.forEach(raceName => {
    const race = ADND_RACES[raceName];
    if (!race) return;
    const limit = raceName === "Gnome" ? 15 : (race.limits || {}).Mage;
    if (limit) race.limits[name] = limit;
  });
});

// The monk's progression. Unarmed attacks are printed as they are in play:
// "3/2" means three attacks every two rounds. The Armor Class column is a bonus
// against a descending scale, so it is subtracted from 10.
const ADND_MONK_TABLE = [
  { level: 1, move: 12, attacks: "1", damage: "1d4", ac: 1 },
  { level: 2, move: 12, attacks: "1", damage: "1d4", ac: 2 },
  { level: 3, move: 12, attacks: "1", damage: "1d6", ac: 2 },
  { level: 4, move: 15, attacks: "3/2", damage: "1d6", ac: 3 },
  { level: 5, move: 15, attacks: "3/2", damage: "1d6", ac: 3 },
  { level: 6, move: 15, attacks: "3/2", damage: "1d6+1", ac: 4 },
  { level: 7, move: 18, attacks: "2", damage: "1d6+1", ac: 4 },
  { level: 8, move: 18, attacks: "2", damage: "1d6+1", ac: 5 },
  { level: 9, move: 18, attacks: "2", damage: "1d8", ac: 5 },
  { level: 10, move: 21, attacks: "5/2", damage: "1d8", ac: 6 },
  { level: 11, move: 21, attacks: "5/2", damage: "1d8", ac: 6 },
  { level: 12, move: 21, attacks: "5/2", damage: "1d8+1", ac: 7 },
  { level: 13, move: 24, attacks: "3", damage: "1d8+1", ac: 7 },
  { level: 14, move: 24, attacks: "3", damage: "1d8+1", ac: 8 },
  { level: 15, move: 24, attacks: "3", damage: "1d10", ac: 8 },
  { level: 16, move: 27, attacks: "7/2", damage: "1d10", ac: 9 },
  { level: 17, move: 27, attacks: "7/2", damage: "1d10", ac: 9 },
  { level: 18, move: 27, attacks: "7/2", damage: "1d12", ac: 10 },
  { level: 19, move: 30, attacks: "4", damage: "1d12", ac: 10 },
  { level: 20, move: 30, attacks: "4", damage: "1d12", ac: 10 }
];

function adndMonkRow(level) {
  const lvl = Math.max(1, Math.min(ADND_MONK_TABLE.length, Number(level) || 1));
  return ADND_MONK_TABLE[lvl - 1];
}

// A monk's percentile skills. Shorter list than a thief's, different bases, and
// no racial adjustments -- the class is open to humans only.
const ADND_MONK_SKILLS = {
  "Climb Walls": { base: 50, dex: {} },
  "Find Traps": { base: 5, dex: {} },
  "Hear Noise": { base: 10, dex: {} },
  "Hide in Shadows": { base: 5, dex: {} },
  "Move Silently": { base: 5, dex: {} }
};

const ADND_MONK_FEATURES = [
  { level: 1, name: "Open hand", text: "Hands and feet do lethal damage on their own, on the progression in the monk table. Armour is forbidden; Armor Class improves with level instead." },
  { level: 1, name: "Anatomical strike", text: "Against a creature built along familiar lines -- bone, muscle, joints -- a weapon in the monk's hands does extra damage equal to half the monk's level, rounded up. Slimes and gaseous things are unmoved by it." },
  { level: 1, name: "Stunning blow", text: "Once a day per level, declare a stun before rolling. On a hit the target saves against paralyzation or loses its action and its Dexterity bonus for a round." },
  { level: 1, name: "Missile deflection", text: "Forgo everything else in the round and save against petrification to knock aside one arrow, bolt or thrown weapon." },
  { level: 1, name: "Perfect evasion", text: "Any attack the monk saves against does no damage at all, not half -- a fireball included." },
  { level: 2, name: "Killing blow", text: "A stunning strike may be pressed further: the stunned target saves against paralyzation at +4 or dies." },
  { level: 3, name: "Guarded mind", text: "A save against death magic at +2 shuts out ESP and other attempts to read the monk's thoughts." },
  { level: 4, name: "Slow fall (20 feet)", text: "Within a foot of a wall or something equally solid, a 20-foot fall costs nothing." },
  { level: 5, name: "Iron constitution", text: "Immune to disease, and to haste and slow alike." },
  { level: 6, name: "Slow fall (30 feet)", text: "Within four feet of a wall, the safe distance grows to 30 feet." },
  { level: 7, name: "Inner healing", text: "Once a day the monk knits 2 hit points per level back together." },
  { level: 8, name: "Master of Dragons", text: "Slow fall reaches 50 feet within six feet of a wall, and initiative rolls improve by 1." },
  { level: 9, name: "Master of the North Wind", text: "A save against wands shrugs off charm effects outright; only if it fails do the normal saves apply." },
  { level: 10, name: "Master of the East Wind", text: "Open-hand strikes count as +1 weapons against creatures only magic can wound." },
  { level: 11, name: "Master of the South Wind", text: "Immune to poison." },
  { level: 12, name: "Master of the West Wind", text: "The initiative bonus improves to 2." },
  { level: 13, name: "Master of Winter", text: "Quivering palm: once a week, declared before an open-hand strike, against a man-sized or smaller creature of lower level. The blow does normal damage, and at any point within a day per level the monk may will the target dead -- it saves against death magic to survive." },
  { level: 14, name: "Master of Autumn", text: "A saving throw against a magical attack is always allowed, even where none normally is." },
  { level: 15, name: "Master of Summer", text: "A 90% chance of a premonition 1-4 turns before death or serious harm." },
  { level: 17, name: "Master of Spring", text: "Open-hand strikes count as +2 weapons against creatures only magic can wound." },
  { level: 19, name: "Grand Master of Flowers", text: "Once a week the monk may leave their body for the Astral Plane and stay as long as they like. The body left behind still needs feeding." }
];


// What each race can actually do, beyond its ability adjustment. Dwarves,
// gnomes and halflings all improve their saves as Constitution rises, on the
// same +1 per three and a half points; the table is shared.
const ADND_CONSTITUTION_SAVE_BONUS = [
  { max: 3, bonus: 0 }, { max: 6, bonus: 1 }, { max: 10, bonus: 2 },
  { max: 13, bonus: 3 }, { max: 17, bonus: 4 }, { max: 19, bonus: 5 }
];

const ADND_RACIAL_SAVE_CATEGORIES = {
  Dwarf: { rsw: true, spell: true, poison: true },
  Gnome: { rsw: true, spell: true },
  Halfling: { rsw: true, spell: true, poison: true }
};

function adndRacialSaveBonus(species, score) {
  const race = ADND_RACES[species] || {};
  if (!race.constitutionSaves) return 0;
  const value = Math.max(3, Math.min(19, Number(score) || 10));
  const row = ADND_CONSTITUTION_SAVE_BONUS.find(entry => value <= entry.max);
  return row ? row.bonus : 0;
}

const ADND_RACE_TRAITS = {
  Human: [
    ["Unrestricted", "Every class is open, and no level limit ever applies. That freedom is the whole of the human advantage."]
  ],
  Dwarf: [
    ["Infravision", "See warm shapes in the dark out to 60 feet."],
    ["Hardy against magic", "Saves against wands, staves, rods and spells improve by +1 for every three and a half points of Constitution, and poison saves with them."],
    ["Ancestral enemies", "+1 to hit orcs, half-orcs, goblins and hobgoblins. Ogres, trolls, ogre magi, giants and titans suffer -4 to hit a dwarf."],
    ["Stonework sense", "Detect a slope or grade, or new construction, on 1-5 in 6; shifting walls on 1-4; stonework traps or your depth underground on 1-3."],
    ["Magical malfunction", "A magical item not made for the dwarf's own class has a 20% chance of misbehaving each time it is used. Weapons, shields, armour, gauntlets and girdles are exempt."]
  ],
  Elf: [
    ["Infravision", "See warm shapes in the dark out to 60 feet."],
    ["Resistance to sleep and charm", "90% resistant to sleep and charm spells; a failed check still allows whatever save the spell normally offers."],
    ["Secret doors", "Notice a secret door in passing on a 1 in 6; find one on 1-2 when searching a ten-foot square; find a concealed portal on 1-3."],
    ["Trained with blade and bow", "+1 to hit with any bow other than a crossbow, and with a short or long sword."]
  ],
  Gnome: [
    ["Infravision", "See warm shapes in the dark out to 60 feet."],
    ["Hardy against magic", "Saves against wands, staves, rods and spells improve by +1 for every three and a half points of Constitution."],
    ["Small and quick", "+1 to hit kobolds and goblins. Gnolls, bugbears, ogres, trolls, giants and titans suffer -4 to hit a gnome."],
    ["Underground sense", "Detect a slope on 1-5 in 6; unsafe walls, ceilings or floors on 1-7 in 10; depth on 1-4 in 6; direction on 1-3 in 6."],
    ["Magical malfunction", "A magical item not made for the gnome's own class has a 20% chance of misbehaving; weapons, armour and shields are exempt."]
  ],
  "Half-Elf": [
    ["Infravision", "See warm shapes in the dark out to 60 feet."],
    ["Resistance to sleep and charm", "30% resistant to sleep and charm spells."],
    ["Secret doors", "Notice a secret door in passing on a 1 in 6; find one on 1-2 when searching; find a concealed portal on 1-3."],
    ["No bardic ceiling", "Alone among the demihumans, a half-elf bard has no level limit."]
  ],
  Halfling: [
    ["Infravision", "Roughly one halfling in six sees warm shapes out to 60 feet; another quarter manage 30."],
    ["Hardy against magic and poison", "Saves against wands, staves, rods, spells and poison improve by +1 for every three and a half points of Constitution."],
    ["Deadly aim", "+1 to hit with a sling or any thrown weapon."],
    ["Quiet in the wild", "Out of metal armour and ninety feet from anyone but an elf similarly unarmoured, opponents take -4 on their surprise roll; -2 if a door must be opened."],
    ["No exceptional Strength", "A halfling fighter with Strength 18 does not roll the percentile."],
    ["Underground sense", "Detect a slope on 1-3 in 4, and direction underground on 1-3 in 6."]
  ],
  "Half-Orc": [
    ["Infravision", "See warm shapes in the dark out to 60 feet."],
    ["Not a Player's Handbook race", "Half-orcs reached 2E through a later supplement rather than the core book, so tables vary on what they may become and how far."]
  ]
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
  "Half-Elf": { "Pick Pockets": 10, "Hide in Shadows": 5 },
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
  window.ADND_LAST_HIT_DIE_LEVEL = ADND_LAST_HIT_DIE_LEVEL;
  window.ADND_CLASS_SPELL_TABLES = ADND_CLASS_SPELL_TABLES;
  window.ADND_THIEF_DEX_ADJUST = ADND_THIEF_DEX_ADJUST;
  window.ADND_ROGUE_ARMOR_ADJUST = ADND_ROGUE_ARMOR_ADJUST;
  window.ADND_ROGUE_ARMOR_COLUMN = ADND_ROGUE_ARMOR_COLUMN;
  window.ADND_BARD_SKILLS = ADND_BARD_SKILLS;
  window.ADND_BACKSTAB_MULTIPLIER = ADND_BACKSTAB_MULTIPLIER;
  window.ADND_RANGER_STEALTH = ADND_RANGER_STEALTH;
  window.ADND_TURN_UNDEAD_TARGETS = ADND_TURN_UNDEAD_TARGETS;
  window.ADND_CLASS_FEATURES = ADND_CLASS_FEATURES;
  window.ADND_PROFICIENCY_SLOTS = ADND_PROFICIENCY_SLOTS;
  window.ADND_NONWEAPON_PROFICIENCIES = ADND_NONWEAPON_PROFICIENCIES;
  window.ADND_MAGIC_ITEM_LIMITS = ADND_MAGIC_ITEM_LIMITS;
  window.ADND_CONDITIONS = ADND_CONDITIONS;
  window.ADND_NONWEAPON_NOTE = ADND_NONWEAPON_NOTE;
  window.ADND_SPECIALIST_ATTACKS = ADND_SPECIALIST_ATTACKS;
  window.adndWeaponSlots = adndWeaponSlots;
  window.adndNonweaponSlots = adndNonweaponSlots;
  window.adndNonProficiencyPenalty = adndNonProficiencyPenalty;
  window.adndSpecialistAttackRow = adndSpecialistAttackRow;
  window.adndClassSpellRow = adndClassSpellRow;
  window.adndBackstabMultiplier = adndBackstabMultiplier;
  window.adndWarriorAttacks = adndWarriorAttacks;
  window.adndTurnColumn = adndTurnColumn;
  window.adndTurningLevel = adndTurningLevel;
  window.ADND_RACE_TRAITS = ADND_RACE_TRAITS;
  window.ADND_CONSTITUTION_SAVE_BONUS = ADND_CONSTITUTION_SAVE_BONUS;
  window.ADND_RACIAL_SAVE_CATEGORIES = ADND_RACIAL_SAVE_CATEGORIES;
  window.adndRacialSaveBonus = adndRacialSaveBonus;
  window.ADND_WIZARD_SCHOOLS = ADND_WIZARD_SCHOOLS;
  window.ADND_SPECIALISTS = ADND_SPECIALISTS;
  window.ADND_SPECIALIST_BENEFITS = ADND_SPECIALIST_BENEFITS;
  window.ADND_MONK_TABLE = ADND_MONK_TABLE;
  window.ADND_MONK_SKILLS = ADND_MONK_SKILLS;
  window.ADND_MONK_FEATURES = ADND_MONK_FEATURES;
  window.adndMonkRow = adndMonkRow;
  window.adndThac0 = adndThac0;
  window.adndSaveTargets = adndSaveTargets;
}
