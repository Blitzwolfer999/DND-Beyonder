/* D&D 3.5 edition data.
 *
 * Mechanics here come from the 3.5 System Reference Document, published by
 * Wizards of the Coast under the Open Game License v1.0a. Descriptive text is
 * original summary writing rather than reproduced sourcebook prose.
 *
 * 3.5 is a different engine from 5e rather than a content pack: attack rolls
 * come from Base Attack Bonus with iterative attacks, saves are Fortitude /
 * Reflex / Will on good-or-poor progressions, skills are bought with ranks
 * instead of being proficiencies, and Armor Class splits into normal, touch and
 * flat-footed. The tables that drive all of that live in this file; the maths
 * lives in app.js next to the 5e equivalents.
 */

const D35_EDITION = "d35";

// Base attack bonus per class level. "good" is full level, "average" is 3/4,
// "poor" is 1/2 -- always rounded down.
const D35_BAB_RATES = { good: 1, average: 0.75, poor: 0.5 };

// A good save is 2 + level/2; a poor save is level/3. Both round down.
function d35SaveProgression(rate, level) {
  const n = Math.max(0, Number(level) || 0);
  return rate === "good" ? 2 + Math.floor(n / 2) : Math.floor(n / 3);
}

function d35BabForClass(rate, level) {
  const n = Math.max(0, Number(level) || 0);
  return Math.floor(n * (D35_BAB_RATES[rate] ?? 0.75));
}

// Iterative attacks: a second at +6, a third at +11, a fourth at +16, each five
// lower than the last.
function d35IterativeAttacks(bab) {
  const total = Math.max(0, Number(bab) || 0);
  const attacks = [total];
  for (let next = total - 5; next >= 1 && attacks.length < 4; next -= 5) attacks.push(next);
  return attacks;
}

const D35_CLASSES = {
  Barbarian: { icon: "⚔", hit: 12, bab: "good", saves: { fort: "good", ref: "poor", will: "poor" },
    skillPoints: 4, primary: "STR", alignment: "Any nonlawful",
    classSkills: ["Climb", "Craft", "Handle Animal", "Intimidate", "Jump", "Listen", "Ride", "Survival", "Swim"],
    proficiencies: "Simple and martial weapons, light and medium armor, shields" },
  Bard: { icon: "♪", hit: 6, bab: "average", saves: { fort: "poor", ref: "good", will: "good" },
    skillPoints: 6, primary: "CHA", caster: "arcane", castingAbility: "CHA", alignment: "Any nonlawful",
    classSkills: ["Appraise", "Balance", "Bluff", "Climb", "Concentration", "Craft", "Decipher Script", "Diplomacy",
      "Disguise", "Escape Artist", "Gather Information", "Hide", "Jump", "Knowledge", "Listen", "Move Silently",
      "Perform", "Profession", "Sense Motive", "Sleight of Hand", "Speak Language", "Spellcraft", "Swim", "Tumble", "Use Magic Device"],
    proficiencies: "Simple weapons plus a short list of classics, light armor, shields" },
  Cleric: { icon: "✚", hit: 8, bab: "average", saves: { fort: "good", ref: "poor", will: "good" },
    skillPoints: 2, primary: "WIS", caster: "divine", castingAbility: "WIS", alignment: "Within one step of deity",
    classSkills: ["Concentration", "Craft", "Diplomacy", "Heal", "Knowledge", "Profession", "Spellcraft"],
    proficiencies: "Simple weapons, all armor, shields" },
  Druid: { icon: "❦", hit: 8, bab: "average", saves: { fort: "good", ref: "poor", will: "good" },
    skillPoints: 4, primary: "WIS", caster: "divine", castingAbility: "WIS", alignment: "Any neutral",
    classSkills: ["Concentration", "Craft", "Diplomacy", "Handle Animal", "Heal", "Knowledge", "Listen",
      "Profession", "Ride", "Spellcraft", "Spot", "Survival", "Swim"],
    proficiencies: "A druidic weapon list, light and medium nonmetal armor, nonmetal shields" },
  Fighter: { icon: "♜", hit: 10, bab: "good", saves: { fort: "good", ref: "poor", will: "poor" },
    skillPoints: 2, primary: "STR", alignment: "Any",
    classSkills: ["Climb", "Craft", "Handle Animal", "Intimidate", "Jump", "Ride", "Swim"],
    proficiencies: "Simple and martial weapons, all armor, shields" },
  Monk: { icon: "☯", hit: 8, bab: "average", saves: { fort: "good", ref: "good", will: "good" },
    skillPoints: 4, primary: "WIS", alignment: "Any lawful",
    classSkills: ["Balance", "Climb", "Concentration", "Craft", "Diplomacy", "Escape Artist", "Hide", "Jump",
      "Knowledge", "Listen", "Move Silently", "Perform", "Profession", "Sense Motive", "Spot", "Swim", "Tumble"],
    proficiencies: "A monk weapon list; no armor or shields" },
  Paladin: { icon: "✦", hit: 10, bab: "good", saves: { fort: "good", ref: "poor", will: "poor" },
    skillPoints: 2, primary: "CHA", caster: "divine", castingAbility: "WIS", alignment: "Lawful good",
    classSkills: ["Concentration", "Craft", "Diplomacy", "Handle Animal", "Heal", "Knowledge", "Profession", "Ride", "Sense Motive"],
    proficiencies: "Simple and martial weapons, all armor, shields" },
  Ranger: { icon: "➶", hit: 8, bab: "good", saves: { fort: "good", ref: "good", will: "poor" },
    skillPoints: 6, primary: "DEX", caster: "divine", castingAbility: "WIS", alignment: "Any",
    classSkills: ["Climb", "Concentration", "Craft", "Handle Animal", "Heal", "Hide", "Jump", "Knowledge",
      "Listen", "Move Silently", "Profession", "Ride", "Search", "Spot", "Survival", "Swim", "Use Rope"],
    proficiencies: "Simple and martial weapons, light armor, shields" },
  Rogue: { icon: "◈", hit: 6, bab: "average", saves: { fort: "poor", ref: "good", will: "poor" },
    skillPoints: 8, primary: "DEX", alignment: "Any",
    classSkills: ["Appraise", "Balance", "Bluff", "Climb", "Craft", "Decipher Script", "Diplomacy", "Disable Device",
      "Disguise", "Escape Artist", "Forgery", "Gather Information", "Hide", "Intimidate", "Jump", "Knowledge",
      "Listen", "Move Silently", "Open Lock", "Perform", "Profession", "Search", "Sense Motive", "Sleight of Hand",
      "Spot", "Swim", "Tumble", "Use Magic Device", "Use Rope"],
    proficiencies: "Simple weapons plus a rogue's classics, light armor" },
  Sorcerer: { icon: "✧", hit: 4, bab: "poor", saves: { fort: "poor", ref: "poor", will: "good" },
    skillPoints: 2, primary: "CHA", caster: "arcane", castingAbility: "CHA", spontaneous: true, alignment: "Any",
    classSkills: ["Bluff", "Concentration", "Craft", "Knowledge", "Profession", "Spellcraft"],
    proficiencies: "Simple weapons; no armor (it risks arcane spell failure)" },
  Wizard: { icon: "✶", hit: 4, bab: "poor", saves: { fort: "poor", ref: "poor", will: "good" },
    skillPoints: 2, primary: "INT", caster: "arcane", castingAbility: "INT", alignment: "Any",
    classSkills: ["Concentration", "Craft", "Decipher Script", "Knowledge", "Profession", "Spellcraft"],
    proficiencies: "A short staple weapon list; no armor (it risks arcane spell failure)" }
};

// Skill name -> key ability. Armor check penalty applies to the flagged ones.
const D35_SKILLS = {
  "Appraise": "INT", "Balance": "DEX", "Bluff": "CHA", "Climb": "STR", "Concentration": "CON",
  "Craft": "INT", "Decipher Script": "INT", "Diplomacy": "CHA", "Disable Device": "INT", "Disguise": "CHA",
  "Escape Artist": "DEX", "Forgery": "INT", "Gather Information": "CHA", "Handle Animal": "CHA", "Heal": "WIS",
  "Hide": "DEX", "Intimidate": "CHA", "Jump": "STR", "Knowledge": "INT", "Listen": "WIS",
  "Move Silently": "DEX", "Open Lock": "DEX", "Perform": "CHA", "Profession": "WIS", "Ride": "DEX",
  "Search": "INT", "Sense Motive": "WIS", "Sleight of Hand": "DEX", "Speak Language": "INT", "Spellcraft": "INT",
  "Spot": "WIS", "Survival": "WIS", "Swim": "STR", "Tumble": "DEX", "Use Magic Device": "CHA", "Use Rope": "DEX"
};

const D35_ARMOR_CHECK_SKILLS = new Set(["Balance", "Climb", "Escape Artist", "Hide", "Jump",
  "Move Silently", "Sleight of Hand", "Swim", "Tumble"]);

// Trained-only skills cannot be attempted without at least one rank.
const D35_TRAINED_ONLY = new Set(["Decipher Script", "Disable Device", "Handle Animal", "Knowledge",
  "Open Lock", "Sleight of Hand", "Speak Language", "Spellcraft", "Tumble", "Use Magic Device"]);

const D35_RACES = {
  Human: { bonuses: {}, size: "Medium", speed: 30, extraFeat: 1, extraSkillPoints: 4,
    summary: "Adaptable and quick to specialise, with an extra feat and extra skill points." },
  Dwarf: { bonuses: { CON: 2, CHA: -2 }, size: "Medium", speed: 20,
    summary: "Hardy and stubborn, steady on stone and resistant to poison and magic." },
  Elf: { bonuses: { DEX: 2, CON: -2 }, size: "Medium", speed: 30,
    summary: "Keen-sensed and graceful, immune to magic sleep and trained with blade and bow." },
  Gnome: { bonuses: { CON: 2, STR: -2 }, size: "Small", speed: 20,
    summary: "Small and inventive, with a knack for illusion and a way with burrowing creatures." },
  "Half-Elf": { bonuses: {}, size: "Medium", speed: 30,
    summary: "At home in two worlds and neither, with elven senses and human flexibility." },
  "Half-Orc": { bonuses: { STR: 2, INT: -2, CHA: -2 }, size: "Medium", speed: 30,
    summary: "Powerfully built and often underestimated, seeing well in the dark." },
  Halfling: { bonuses: { DEX: 2, STR: -2 }, size: "Small", speed: 20,
    summary: "Small, lucky and hard to frighten, with a gift for stealth and thrown weapons." }
};

// Size affects Armor Class and attack rolls by the same amount, in opposite
// directions to the creature's bulk.
const D35_SIZE_MODIFIERS = { Fine: 8, Diminutive: 4, Tiny: 2, Small: 1, Medium: 0, Large: -1, Huge: -2, Gargantuan: -4, Colossal: -8 };

// Spells per day. Index 0 is the character's 1st class level; each row runs from
// spell level 0 upward. A null entry means no spells of that level yet.
const D35_SPELLS_PER_DAY = {
  Wizard: [[3,1],[4,2],[4,2,1],[4,3,2],[4,3,2,1],[4,3,3,2],[4,4,3,2,1],[4,4,3,3,2],[4,4,4,3,2,1],[4,4,4,3,3,2],
    [4,4,4,4,3,2,1],[4,4,4,4,3,3,2],[4,4,4,4,4,3,2,1],[4,4,4,4,4,3,3,2],[4,4,4,4,4,4,3,2,1],[4,4,4,4,4,4,3,3,2],
    [4,4,4,4,4,4,4,3,2,1],[4,4,4,4,4,4,4,3,3,2],[4,4,4,4,4,4,4,4,3,3],[4,4,4,4,4,4,4,4,4,4]],
  Cleric: [[3,1],[4,2],[4,2,1],[5,3,2],[5,3,2,1],[5,3,3,2],[6,4,3,2,1],[6,4,3,3,2],[6,4,4,3,2,1],[6,4,4,3,3,2],
    [6,5,4,4,3,2,1],[6,5,4,4,3,3,2],[6,5,5,4,4,3,2,1],[6,5,5,4,4,3,3,2],[6,5,5,5,4,4,3,2,1],[6,5,5,5,4,4,3,3,2],
    [6,5,5,5,5,4,4,3,2,1],[6,5,5,5,5,4,4,3,3,2],[6,5,5,5,5,5,4,4,3,3],[6,5,5,5,5,5,4,4,4,4]],
  Druid: [[3,1],[4,2],[4,2,1],[5,3,2],[5,3,2,1],[5,3,3,2],[6,4,3,2,1],[6,4,3,3,2],[6,4,4,3,2,1],[6,4,4,3,3,2],
    [6,5,4,4,3,2,1],[6,5,4,4,3,3,2],[6,5,5,4,4,3,2,1],[6,5,5,4,4,3,3,2],[6,5,5,5,4,4,3,2,1],[6,5,5,5,4,4,3,3,2],
    [6,5,5,5,5,4,4,3,2,1],[6,5,5,5,5,4,4,3,3,2],[6,5,5,5,5,5,4,4,3,3],[6,5,5,5,5,5,4,4,4,4]],
  Bard: [[2],[3,0],[3,1],[3,2,0],[3,3,1],[3,3,2],[3,3,2,0],[3,3,3,1],[3,3,3,2],[3,3,3,2,0],[3,3,3,3,1],
    [3,3,3,3,2],[3,3,3,3,2,0],[4,3,3,3,3,1],[4,4,3,3,3,2],[4,4,4,3,3,2],[4,4,4,4,3,3],[4,4,4,4,4,3],
    [4,4,4,4,4,4],[4,4,4,4,4,4]],
  Sorcerer: [[5,3],[6,4],[6,5],[6,6,3],[6,6,4],[6,6,5,3],[6,6,6,4],[6,6,6,5,3],[6,6,6,6,4],[6,6,6,6,5,3],
    [6,6,6,6,6,4],[6,6,6,6,6,5,3],[6,6,6,6,6,6,4],[6,6,6,6,6,6,5,3],[6,6,6,6,6,6,6,4],[6,6,6,6,6,6,6,5,3],
    [6,6,6,6,6,6,6,6,4],[6,6,6,6,6,6,6,6,5,3],[6,6,6,6,6,6,6,6,6,4],[6,6,6,6,6,6,6,6,6,6]],
  Paladin: [[],[],[],[0],[0,1],[1,1],[1,1],[1,1,0],[1,1,1],[1,1,1],[1,1,1,0],[1,1,1,1],[1,1,1,1],
    [2,1,1,1],[2,2,1,1],[2,2,2,1],[2,2,2,1],[3,2,2,1],[3,3,3,2],[3,3,3,3]],
  Ranger: [[],[],[],[0],[0,1],[1,1],[1,1],[1,1,0],[1,1,1],[1,1,1],[1,1,1,0],[1,1,1,1],[1,1,1,1],
    [2,1,1,1],[2,2,1,1],[2,2,2,1],[2,2,2,1],[3,2,2,1],[3,3,3,2],[3,3,3,3]]
};

// Sorcerers and bards know a fixed list rather than preparing from a book.
const D35_SPELLS_KNOWN = {
  Sorcerer: [[4,2],[5,2],[5,3],[6,3,1],[6,4,2],[7,4,2,1],[7,5,3,2],[8,5,3,2,1],[8,5,4,3,2],[9,5,4,3,2,1],
    [9,5,5,4,3,2],[9,5,5,4,3,2,1],[9,5,5,4,4,3,2],[9,5,5,4,4,3,2,1],[9,5,5,4,4,4,3,2],[9,5,5,4,4,4,3,2,1],
    [9,5,5,4,4,4,3,3,2],[9,5,5,4,4,4,3,3,2,1],[9,5,5,4,4,4,3,3,3,2],[9,5,5,4,4,4,3,3,3,3]],
  Bard: [[4],[5,2],[6,3],[6,3,2],[6,4,3],[6,4,3],[6,4,4,2],[6,4,4,3],[6,4,4,3],[6,4,4,4,2],[6,4,4,4,3],
    [6,4,4,4,3],[6,4,4,4,4,2],[6,4,4,4,4,3],[6,4,4,4,4,3],[6,5,4,4,4,4,2],[6,5,5,4,4,4,3],[6,5,5,5,4,4,3],
    [6,5,5,5,5,4,4],[6,5,5,5,5,5,4]]
};

// Armor: AC bonus, maximum Dexterity it lets through, its check penalty, and
// the chance an arcane spell fails while wearing it.
const D35_ARMOR = {
  "Padded": { ac: 1, maxDex: 8, check: 0, spellFailure: 5, type: "light", speed: 30 },
  "Leather": { ac: 2, maxDex: 6, check: 0, spellFailure: 10, type: "light", speed: 30 },
  "Studded Leather": { ac: 3, maxDex: 5, check: -1, spellFailure: 15, type: "light", speed: 30 },
  "Chain Shirt": { ac: 4, maxDex: 4, check: -2, spellFailure: 20, type: "light", speed: 30 },
  "Hide": { ac: 3, maxDex: 4, check: -3, spellFailure: 20, type: "medium", speed: 20 },
  "Scale Mail": { ac: 4, maxDex: 3, check: -4, spellFailure: 25, type: "medium", speed: 20 },
  "Chainmail": { ac: 5, maxDex: 2, check: -5, spellFailure: 30, type: "medium", speed: 20 },
  "Breastplate": { ac: 5, maxDex: 3, check: -4, spellFailure: 25, type: "medium", speed: 20 },
  "Splint Mail": { ac: 6, maxDex: 0, check: -7, spellFailure: 40, type: "heavy", speed: 20 },
  "Banded Mail": { ac: 6, maxDex: 1, check: -6, spellFailure: 35, type: "heavy", speed: 20 },
  "Half-Plate": { ac: 7, maxDex: 0, check: -7, spellFailure: 40, type: "heavy", speed: 20 },
  "Full Plate": { ac: 8, maxDex: 1, check: -6, spellFailure: 35, type: "heavy", speed: 20 },
  "Buckler": { ac: 1, maxDex: Infinity, check: -1, spellFailure: 5, type: "shield" },
  "Light Wooden Shield": { ac: 1, maxDex: Infinity, check: -1, spellFailure: 5, type: "shield" },
  "Light Steel Shield": { ac: 1, maxDex: Infinity, check: -1, spellFailure: 5, type: "shield" },
  "Heavy Wooden Shield": { ac: 2, maxDex: Infinity, check: -2, spellFailure: 15, type: "shield" },
  "Heavy Steel Shield": { ac: 2, maxDex: Infinity, check: -2, spellFailure: 15, type: "shield" },
  "Tower Shield": { ac: 4, maxDex: 2, check: -10, spellFailure: 50, type: "shield" }
};

const D35_FEATS = [
  { name: "Alertness", prereq: "", summary: "+2 on Listen and Spot checks." },
  { name: "Armor Proficiency (Light)", prereq: "", summary: "Wear light armor without the attack penalty." },
  { name: "Armor Proficiency (Medium)", prereq: "Armor Proficiency (Light)", summary: "Wear medium armor without the attack penalty." },
  { name: "Armor Proficiency (Heavy)", prereq: "Armor Proficiency (Medium)", summary: "Wear heavy armor without the attack penalty." },
  { name: "Blind-Fight", prereq: "", summary: "Reroll miss chances from concealment and keep your footing when you cannot see." },
  { name: "Cleave", prereq: "Power Attack", summary: "Drop a foe and get an immediate extra attack against another in reach." },
  { name: "Combat Casting", prereq: "", summary: "+4 on Concentration checks to cast defensively." },
  { name: "Combat Expertise", prereq: "INT 13", summary: "Trade attack bonus for Armor Class, up to 5 points." },
  { name: "Combat Reflexes", prereq: "", summary: "Make extra attacks of opportunity, and take them while flat-footed." },
  { name: "Dodge", prereq: "DEX 13", summary: "+1 dodge bonus to AC against one chosen opponent." },
  { name: "Endurance", prereq: "", summary: "+4 on checks to resist exhaustion, and sleep in light or medium armor." },
  { name: "Great Cleave", prereq: "Cleave, BAB +4", summary: "Cleave without limit as long as foes keep dropping." },
  { name: "Great Fortitude", prereq: "", summary: "+2 on Fortitude saves." },
  { name: "Improved Critical", prereq: "BAB +8", summary: "Double the threat range of one weapon." },
  { name: "Improved Initiative", prereq: "", summary: "+4 on initiative checks." },
  { name: "Improved Unarmed Strike", prereq: "", summary: "Your unarmed strikes are armed and provoke nothing." },
  { name: "Iron Will", prereq: "", summary: "+2 on Will saves." },
  { name: "Lightning Reflexes", prereq: "", summary: "+2 on Reflex saves." },
  { name: "Mobility", prereq: "Dodge", summary: "+4 AC against attacks of opportunity for leaving a threatened square." },
  { name: "Mounted Combat", prereq: "Ride 1 rank", summary: "Negate a hit on your mount with a Ride check." },
  { name: "Point Blank Shot", prereq: "", summary: "+1 attack and damage with ranged weapons within 30 feet." },
  { name: "Power Attack", prereq: "STR 13", summary: "Trade attack bonus for damage, point for point." },
  { name: "Precise Shot", prereq: "Point Blank Shot", summary: "Shoot into melee without the usual penalty." },
  { name: "Quick Draw", prereq: "BAB +1", summary: "Draw a weapon as a free action." },
  { name: "Rapid Shot", prereq: "Point Blank Shot, DEX 13", summary: "One extra ranged attack, all at -2." },
  { name: "Skill Focus", prereq: "", summary: "+3 on one chosen skill." },
  { name: "Spring Attack", prereq: "Mobility, BAB +4", summary: "Move, attack, and keep moving without provoking from your target." },
  { name: "Stealthy", prereq: "", summary: "+2 on Hide and Move Silently checks." },
  { name: "Toughness", prereq: "", summary: "+3 hit points." },
  { name: "Track", prereq: "", summary: "Use Survival to follow trails." },
  { name: "Two-Weapon Fighting", prereq: "DEX 15", summary: "Reduce the penalties for fighting with two weapons." },
  { name: "Weapon Finesse", prereq: "BAB +1", summary: "Use Dexterity instead of Strength to hit with light weapons." },
  { name: "Weapon Focus", prereq: "BAB +1", summary: "+1 attack with one chosen weapon." },
  { name: "Weapon Specialization", prereq: "Weapon Focus, Fighter 4", summary: "+2 damage with one chosen weapon." }
];

const D35_ALIGNMENTS = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral",
  "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"];

// 3.5 has no backgrounds; these stand in as a starting hook so the origin step
// has something to offer without inventing mechanics.
const D35_BACKGROUNDS = ["Acolyte", "Artisan", "Criminal", "Entertainer", "Farmhand", "Guard", "Hermit",
  "Merchant", "Noble", "Sailor", "Scholar", "Soldier", "Wanderer"];

// RULES, SKILLS and friends are defined in app.js, which loads after this file,
// so registration is deferred until init() calls it.
function registerD35Runtime() {
  if (typeof RULES === "undefined") return;
  const ED = D35_EDITION;
  // Keep the 5e classes out of 3.5: same names, different engines.
  Object.values(RULES.classes).forEach(data => {
    if (!data.editions) data.editions = ["2014", "2024"];
  });
  Object.entries(D35_CLASSES).forEach(([name, data]) => {
    const existing = RULES.classes[name];
    if (existing) {
      // A 3.5 Fighter is not a 5e Fighter, so the shared name gains the edition
      // but the 3.5 tables are read from D35_CLASSES rather than merged in.
      existing.editions = [...new Set([...(existing.editions || []), ED])];
      existing.subclasses = { ...(existing.subclasses || {}), [ED]: [] };
      return;
    }
    RULES.classes[name] = { icon: data.icon, hit: data.hit, primary: data.primary,
      save: [], origin: "D&D 3.5", editions: [ED], subclasses: { [ED]: [] } };
  });
  Object.entries(D35_SKILLS).forEach(([name, ability]) => { if (!SKILLS[name]) SKILLS[name] = ability; });
  RULES.species[ED] = Object.keys(D35_RACES);
  RULES.backgrounds[ED] = D35_BACKGROUNDS;
  if (typeof FEATS !== "undefined") FEATS[ED] = D35_FEATS.map(feat => ({
    name: feat.name, source: "3.5 SRD", category: "General", expanded: false, prerequisite: feat.prereq
  }));
  if (typeof CONTENT_SUMMARIES !== "undefined") {
    D35_FEATS.forEach(feat => { if (!CONTENT_SUMMARIES.feats[feat.name]) CONTENT_SUMMARIES.feats[feat.name] = feat.summary; });
    Object.entries(D35_RACES).forEach(([name, race]) => {
      if (!CONTENT_SUMMARIES.species[name]) CONTENT_SUMMARIES.species[name] = race.summary;
    });
  }
}


// Racial traits, kept apart from the 5e species tables so a 3.5 half-orc does
// not inherit Relentless Endurance and Savage Attacks, which are 5e features.
const D35_RACE_TRAITS = {
  Human: [["Bonus feat", "One extra feat at 1st level."],
          ["Skilled", "Four extra skill points at 1st level and one per level after."]],
  Dwarf: [["Darkvision", "See 60 feet in complete darkness."],
          ["Stonecunning", "+2 on Search checks for unusual stonework, and you notice it in passing."],
          ["Stability", "+4 against bull rush and trip attempts while on the ground."],
          ["Hardy", "+2 on saves against poison, and +2 against spells and spell-like effects."],
          ["Ancient foes", "+1 to hit orcs and goblinoids, and +4 dodge bonus against giants."]],
  Elf: [["Immunity to sleep", "Magic sleep effects do not work on you, and +2 against enchantments."],
        ["Low-light vision", "See twice as far as a human in dim light."],
        ["Keen senses", "+2 on Listen, Search and Spot, and you notice secret doors in passing."],
        ["Martial training", "Proficient with longsword, rapier, longbow and shortbow."]],
  Gnome: [["Low-light vision", "See twice as far as a human in dim light."],
          ["Illusion affinity", "+2 on saves against illusions, and +1 to the save DC of illusions you cast."],
          ["Ancient foes", "+1 to hit kobolds and goblinoids, and +4 dodge bonus against giants."],
          ["Keen ears", "+2 on Listen checks and +2 on Craft (alchemy)."],
          ["Speak with animals", "Speak with burrowing mammals once per day."]],
  "Half-Elf": [["Immunity to sleep", "Magic sleep effects do not work on you, and +2 against enchantments."],
               ["Low-light vision", "See twice as far as a human in dim light."],
               ["Keen senses", "+1 on Listen, Search and Spot."],
               ["Diplomatic", "+2 on Diplomacy and Gather Information checks."],
               ["Elven blood", "You count as an elf for any effect related to race."]],
  "Half-Orc": [["Darkvision", "See 60 feet in complete darkness."],
               ["Orc blood", "You count as an orc for any effect related to race."]],
  Halfling: [["Lucky", "+1 on all saving throws."],
             ["Brave", "+2 more against fear, on top of the racial bonus to saves."],
             ["Deadly aim", "+1 to hit with thrown weapons and slings."],
             ["Nimble", "+2 on Climb, Jump, Listen and Move Silently."]]
};

if (typeof window !== "undefined") window.D35_RACE_TRAITS = D35_RACE_TRAITS;

if (typeof window !== "undefined") {
  window.D35_EDITION = D35_EDITION;
  window.D35_CLASSES = D35_CLASSES;
  window.D35_SKILLS = D35_SKILLS;
  window.D35_RACES = D35_RACES;
  window.D35_ARMOR = D35_ARMOR;
  window.D35_FEATS = D35_FEATS;
  window.D35_SPELLS_PER_DAY = D35_SPELLS_PER_DAY;
  window.D35_SPELLS_KNOWN = D35_SPELLS_KNOWN;
  window.D35_SIZE_MODIFIERS = D35_SIZE_MODIFIERS;
  window.D35_ARMOR_CHECK_SKILLS = D35_ARMOR_CHECK_SKILLS;
  window.D35_TRAINED_ONLY = D35_TRAINED_ONLY;
  window.D35_ALIGNMENTS = D35_ALIGNMENTS;
  window.d35SaveProgression = d35SaveProgression;
  window.d35BabForClass = d35BabForClass;
  window.d35IterativeAttacks = d35IterativeAttacks;
  window.registerD35Runtime = registerD35Runtime;
}
