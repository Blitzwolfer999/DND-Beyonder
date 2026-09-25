// The Psion, from Unearthed Arcana: Psion Update (UA9, October 2025). This is
// playtest material for the 2024 rules and is labelled as such everywhere it
// appears. The class chassis, feature levels, spell list, disciplines and
// three subclasses all come from that packet; every description below is an
// original summary, as this project's content policy requires.
//
// RULES, CLASS_SKILLS, CLASS_TRAINING and SPELLCASTING_ABILITIES live in
// app.js, which loads after the content files, so the chassis is registered
// from registerPsionRuntime() the way the SW5E content does it.

const PSION_SOURCE = "Unearthed Arcana: Psion Update";

const PSION_CHASSIS = {
  icon: "◈", hit: 6, primary: "INT", save: ["INT", "WIS"], editions: ["2024"],
  subclasses: { 2014: [], 2024: ["Telepath"] }
};

const PSION_CLASS_SKILLS = {
  count: 2,
  options: ["Arcana", "Insight", "Intimidation", "Investigation", "Medicine", "Perception", "Persuasion"]
};

// No armour training at all, and simple weapons only.
const PSION_TRAINING = { simple: true, multiclass: { simple: true } };

const PSION_FEATURES = [
  [1, "Psionic Power"], [1, "Spellcasting"], [1, "Subtle Telekinesis"],
  [2, "Psionic Discipline"], [3, "Psion Subclass"], [4, "Ability Score Improvement"],
  [5, "Psionic Restoration"], [7, "Psionic Surge"], [8, "Ability Score Improvement"],
  [12, "Ability Score Improvement"], [16, "Ability Score Improvement"],
  [18, "Psionic Reserves"], [19, "Epic Boon"], [20, "Enkindled Lifeforce"]
];

const PSION_FEATURE_SUMMARIES = {
  "Psionic Power": "A pool of Psionic Energy Dice that fuel your psionic features. They also power Telekinetic Propel, a bonus-action shove at range, and Telepathic Connection, telepathy you can stretch further by spending a die. You regain one die on a short rest and all of them on a long rest.",
  "Subtle Telekinesis": "You know Mage Hand, can cast it without gestures, and can make the hand invisible.",
  "Psionic Discipline": "You learn psionic techniques fuelled by your energy dice, and can trade one for another whenever you gain a level. You start with two and gain more at levels 5, 10, 13 and 17.",
  "Psionic Restoration": "A minute of meditation returns expended Psionic Energy Dice, once per long rest.",
  "Psionic Surge": "After rolling energy dice, spend a Hit Point Die to treat every 1, 2 or 3 among them as a 4.",
  "Psionic Reserves": "Rolling initiative tops your Psionic Energy Dice back up to four if you have fewer.",
  "Enkindled Lifeforce": "Once a turn, burn one or two Hit Point Dice to roll that many extra energy dice and add them to the total, without expending them."
};

// Number and size of Psionic Energy Dice by Psion level.
const PSION_ENERGY_DICE = [
  { level: 1, count: 4, die: 6 }, { level: 5, count: 6, die: 8 }, { level: 9, count: 8, die: 8 },
  { level: 11, count: 8, die: 10 }, { level: 13, count: 10, die: 10 }, { level: 17, count: 12, die: 12 }
];

const PSION_DISCIPLINES = {
  "Biofeedback": "Casting a Necromancy or Transmutation spell can spend energy dice up to your Intelligence modifier for temporary hit points.",
  "Bolstering Precognition": "Casting an Abjuration or Divination spell can spend a die to give a creature you can see a bonus to its next d20 test.",
  "Destructive Thoughts": "Casting a Conjuration or Evocation spell that forces a save can spend dice up to your Intelligence modifier for guaranteed psychic damage.",
  "Devilish Tongue": "Add a die to an Influence check; it is spent only if it makes the difference.",
  "Expanded Awareness": "Add a die to a Search check; it is spent only if it makes the difference.",
  "Id Insinuation": "Casting an Enchantment or Illusion spell that forces a save can spend a die to weaken one target's save against it.",
  "Inerrant Aim": "Add a die to a missed attack roll; it is spent only if the attack then hits.",
  "Observant Mind": "Add a die to a Study check; it is spent only if it makes the difference.",
  "Psionic Backlash": "React to a hit by spending a die to halve-and-then-some the damage, and the attacker may take that much psychic damage.",
  "Psionic Guards": "Spend a die at the start of your turn for immunity to being charmed or frightened and advantage on Intelligence saves. It does not use up your discipline for the turn.",
  "Sharpened Mind": "Spend a die to ignore psychic resistance for a minute and swap a recorded roll into one psychic damage die each turn. It does not use up your discipline for the turn."
};

// From the packet's Psion spell list. Only spells in the 2024 Player's Handbook
// and in that packet appear on it.
const PSION_SPELL_LIST = {
  0: ["Blade Ward", "Dancing Lights", "Friends", "Light", "Mage Hand", "Mending", "Message", "Mind Sliver",
    "Minor Illusion", "Prestidigitation", "Telekinetic Fling", "True Strike"],
  1: ["Animal Friendship", "Charm Person", "Command", "Comprehend Languages", "Detect Magic", "Dissonant Whispers",
    "Feather Fall", "Identify", "Jump", "Life Siphon", "Longstrider", "Mage Armor", "Sanctuary", "Shield",
    "Silent Image", "Sleep", "Speak with Animals", "Tasha's Hideous Laughter", "Tenser's Floating Disk", "Thunderwave"],
  2: ["Animal Messenger", "Blindness/Deafness", "Calm Emotions", "Crown of Madness", "Detect Thoughts",
    "Ectoplasmic Trail", "Ego Whip", "Enhance Ability", "Enlarge/Reduce", "Enthrall", "Heat Metal", "Hold Person",
    "Invisibility", "Knock", "Levitate", "Locate Animals or Plants", "Locate Object", "Magic Mouth", "Mind Spike",
    "Mirror Image", "Phantasmal Force", "See Invisibility", "Shatter", "Silence", "Suggestion", "Tasha's Mind Whip",
    "Zone of Truth"],
  3: ["Bestow Curse", "Bleeding Darkness", "Clairvoyance", "Dispel Magic", "Enemies Abound", "Fear", "Fly",
    "Hypnotic Pattern", "Intellect Fortress", "Major Image", "Nondetection", "Sending", "Summon Astral Entity",
    "Telekinetic Crush", "Tongues"],
  4: ["Arcane Eye", "Banishment", "Charm Monster", "Compulsion", "Confusion", "Dimension Door",
    "Freedom of Movement", "Greater Invisibility", "Hallucinatory Terrain", "Life Inversion Field",
    "Locate Creature", "Phantasmal Killer", "Polymorph", "Raulothim's Psychic Lance", "Summon Aberration"],
  5: ["Animate Objects", "Awaken", "Contact Other Plane", "Dominate Person", "Dream", "Geas", "Hold Monster",
    "Legend Lore", "Mislead", "Modify Memory", "Rary's Telepathic Bond", "Scrying", "Seeming", "Synaptic Static",
    "Telekinesis", "Teleportation Circle"],
  6: ["Blade Barrier", "Disintegrate", "Eyebite", "Find the Path", "Mass Suggestion", "Mental Prison", "Move Earth",
    "Otto's Irresistible Dance", "Programmed Illusion", "Psionic Blast", "Thought Form", "True Seeing"],
  7: ["Etherealness", "Forcecage", "Mirage Arcane", "Plane Shift", "Power Word Fortify", "Project Image",
    "Reverse Gravity", "Teleport"],
  8: ["Abi-Dalzim's Horrid Wilting", "Antimagic Field", "Antipathy/Sympathy", "Befuddlement", "Dominate Monster",
    "Glibness", "Maze", "Mind Blank", "Power Word Stun", "Telepathy"],
  9: ["Astral Projection", "Foresight", "Power Word Heal", "Power Word Kill", "Psychic Scream", "Shapechange",
    "Time Stop", "Weird"]
};

// The ten spells the packet introduces, with the other classes it gives them to.
const PSION_NEW_SPELLS = {
  "Telekinetic Fling": { level: 0, classes: [], meta: { school: "Evocation", castingTime: "1 Action", range: "60 feet",
    duration: "Instantaneous", components: "S", saveAttack: "Ranged spell attack", dice: "1d10 force", damageEffect: "Force" },
    summary: "Hurl a small loose object at a creature with your mind for 1d10 force damage, rising at levels 5, 11 and 17. The object lands undamaged." },
  "Life Siphon": { level: 1, classes: [], meta: { school: "Evocation", castingTime: "1 Action", range: "120 feet",
    duration: "Instantaneous", components: "S", saveAttack: "Ranged spell attack", dice: "1d10 psychic", damageEffect: "Psychic" },
    summary: "An orb of psionic force deals 1d10 psychic damage, and you can spend a Hit Point Die to add another 1d10." },
  "Ectoplasmic Trail": { level: 2, classes: ["Warlock"], meta: { school: "Necromancy", castingTime: "1 Bonus Action",
    range: "Self", duration: "Instantaneous", components: "V, S", dice: "2d8 necrotic", damageEffect: "Necrotic" },
    summary: "Until the end of your turn you can move through occupied spaces without provoking, coating anyone whose space you enter in ectoplasm that slows them and burns for 2d8 necrotic." },
  "Ego Whip": { level: 2, classes: [], meta: { school: "Enchantment", castingTime: "1 Reaction", range: "120 feet",
    duration: "Instantaneous", components: "V", saveAttack: "CHA save", dice: "1d8 penalty" },
    summary: "React to a Charisma check or save near you: on a failed Charisma save the creature subtracts 1d8 from it." },
  "Bleeding Darkness": { level: 3, classes: ["Warlock", "Wizard"], meta: { school: "Evocation", castingTime: "1 Action",
    range: "60 feet", duration: "Concentration, up to 1 minute", components: "V, S, M", saveAttack: "CON save",
    dice: "3d8 cold", area: "10-foot radius", damageEffect: "Cold" },
    summary: "A sphere of unlit darkness pours out a 40-foot cylinder of difficult terrain; those caught in it take 3d8 cold damage and are blinded on a failed Constitution save." },
  "Summon Astral Entity": { level: 3, classes: ["Sorcerer", "Warlock", "Wizard"], meta: { school: "Conjuration",
    castingTime: "1 Action", range: "90 feet", duration: "Concentration, up to 1 hour", components: "V, S, M" },
    summary: "Call a crystal, ectoplasmic or ghostly psionic spirit that fights on your initiative and obeys your spoken commands." },
  "Telekinetic Crush": { level: 3, classes: ["Sorcerer", "Warlock"], meta: { school: "Transmutation",
    castingTime: "1 Action", range: "120 feet", duration: "Instantaneous", components: "V", saveAttack: "STR save",
    dice: "5d6 force", area: "30-foot cube", damageEffect: "Force" },
    summary: "Crushing force fills a 30-foot cube: 5d6 force damage and prone on a failed Strength save, half damage on a success." },
  "Life Inversion Field": { level: 4, classes: ["Cleric", "Sorcerer"], meta: { school: "Abjuration",
    castingTime: "1 Action", range: "Self", duration: "Concentration, up to 1 minute", components: "V, S",
    saveAttack: "CON save", dice: "4d8 healing", area: "30-foot emanation", damageEffect: "Necrotic" },
    summary: "Heal yourself 4d8 and raise an aura for a minute; each time you regain hit points, one creature in it can be dealt necrotic damage equal to half that healing." },
  "Psionic Blast": { level: 6, classes: ["Wizard"], meta: { school: "Evocation", castingTime: "1 Action",
    range: "Self", duration: "Instantaneous", components: "V, S, M", saveAttack: "INT save", dice: "6d8 psychic",
    area: "60-foot cone", damageEffect: "Psychic" },
    summary: "A 60-foot cone of psionic force deals 6d8 psychic damage and stuns until your next turn on a failed Intelligence save." },
  "Thought Form": { level: 6, classes: [], meta: { school: "Transmutation", castingTime: "1 Bonus Action",
    range: "Self", duration: "Concentration, up to 1 minute", components: "V, M" },
    summary: "Become a psionic spirit for a minute: immune to poison, psychic damage and exhaustion, flying and hovering, able to pass through occupied spaces, and able to return a low-level spell slot by touch." }
};

const PSION_SUBCLASSES = ["Metamorph", "Psykinetic", "Telepath"];

const PSION_SUBCLASS_FEATURES = {
  Metamorph: [
    [3, "Metamorph Spells", "Healing and shape-changing spells are always prepared as you rise."],
    [3, "Mutable Form", "Spend an energy die to stretch your body for a minute: temporary hit points, longer reach, more speed, and touch spells at 10 feet."],
    [3, "Organic Weapons", "Reshape a hand into a bone blade, flesh maul or viscera launcher, all of which use Intelligence to attack and damage."],
    [6, "Extra Attack", "Attack twice with the Attack action, and you can replace one attack with a Psion cantrip."],
    [6, "Flesh Weaver", "An extra die spent on Mutable Form adds +2 AC and lets you pour energy dice into your healing spells."],
    [10, "Improved Mutable Form", "Mutable Form lasts 10 minutes and adds stony skin, a climbing and swimming stride, or a pliable body that slips through gaps."],
    [14, "Life-Bending Weapons", "Your organic weapon deals extra necrotic damage, or drains a target to heal everyone around you."]
  ],
  Psykinetic: [
    [3, "Psykinetic Spells", "Force and barrier spells are always prepared as you rise."],
    [3, "Stronger Telekinesis", "Your Mage Hand reaches 30 feet further and can lift 20 pounds."],
    [3, "Telekinetic Techniques", "Telekinetic Propel can run on a 1d4 instead of a die, and a failed save also boosts, disorients or damages the target."],
    [6, "Destructive Trance", "Spend a die to hover on a 20-foot fly speed for 10 minutes and add an unspent die to one damage roll of each spell you cast."],
    [6, "Rebounding Field", "When Shield turns an attack aside, spend a die to fling the force back and gain temporary hit points."],
    [10, "Enhanced Telekinetic Crush", "Telekinetic Crush can halve the target's speed whatever it rolls, and hit harder."],
    [14, "Heightened Telekinesis", "Cast Telekinesis for four energy dice instead of a slot, without concentration and up to Gargantuan size."]
  ],
  Telepath: [
    [3, "Mind Infiltrator", "Spend a die so Detect Thoughts needs no components or concentration and leaves the target unaware."],
    [3, "Telepath Spells", "Mind-affecting spells are always prepared as you rise."],
    [3, "Telepathic Distraction", "React to an attack within your telepathy range and subtract a die from the roll; it is spent only if the attack misses."],
    [6, "Bulwark Mind", "Spend a die for 10 minutes of psychic resistance and an unspent die added to your mental saves."],
    [6, "Potent Thoughts", "Your telepathy reaches 60 feet, and your Psion cantrips add your Intelligence modifier to damage."],
    [10, "Telepathic Bolstering", "React to a failed check or a miss within your telepathy range and add a die to the d20."],
    [14, "Scramble Minds", "Cast Confusion for four energy dice, widened, sparing one creature and dictating what the rest do."]
  ]
};

const PSION_SUBCLASS_SPELLS = {
  Metamorph: { 3: ["Alter Self", "Cure Wounds", "Inflict Wounds", "Lesser Restoration"],
    5: ["Aura of Vitality", "Haste"], 7: ["Polymorph", "Stoneskin"], 9: ["Contagion", "Mass Cure Wounds"] },
  Psykinetic: { 3: ["Cloud of Daggers", "Levitate", "Shield", "Thunderwave"],
    5: ["Slow", "Telekinetic Crush"], 7: ["Otiluke's Resilient Sphere", "Stone Shape"],
    9: ["Telekinesis", "Wall of Force"] },
  Telepath: { 3: ["Bane", "Command", "Detect Thoughts", "Mind Spike"], 5: ["Counterspell", "Slow"],
    7: ["Compulsion", "Confusion"], 9: ["Modify Memory", "Yolande's Regal Presence"] }
};

// The prepared-spell and cantrip columns of the Psion Features table. They match
// the 2024 full-caster shape.
const PSION_PREPARED_SPELLS = [4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22];

(function registerPsionContent() {
  if (typeof CLASS_FEATURES !== "undefined") {
    CLASS_FEATURES["2024"] = CLASS_FEATURES["2024"] || {};
    CLASS_FEATURES["2024"].Psion = PSION_FEATURES;
  }
  if (typeof SUBCLASS_LEVELS !== "undefined") {
    SUBCLASS_LEVELS["2024"] = SUBCLASS_LEVELS["2024"] || {};
    SUBCLASS_LEVELS["2024"].Psion = [3, 6, 10, 14];
  }
  if (typeof SUBCLASS_CATALOG !== "undefined" && typeof subclassRecord === "function") {
    SUBCLASS_CATALOG.Psion = SUBCLASS_CATALOG.Psion || [];
    PSION_SUBCLASSES.forEach(name => {
      if (!SUBCLASS_CATALOG.Psion.some(item => item.name === name && item.rules === "2024")) {
        SUBCLASS_CATALOG.Psion.push(subclassRecord(name, PSION_SOURCE, "2024"));
      }
    });
  }
  if (typeof addSubclassFeatures === "function") {
    const rows = {};
    Object.entries(PSION_SUBCLASS_FEATURES).forEach(([name, feats]) => { rows[name] = feats; });
    addSubclassFeatures({ "2024": rows });
  }
  if (typeof SUBCLASS_SPELL_LISTS !== "undefined") {
    SUBCLASS_SPELL_LISTS["2024"] = SUBCLASS_SPELL_LISTS["2024"] || {};
    Object.entries(PSION_SUBCLASS_SPELLS).forEach(([name, table]) => {
      if (!SUBCLASS_SPELL_LISTS["2024"][name]) SUBCLASS_SPELL_LISTS["2024"][name] = table;
    });
  }
  if (typeof SPELL_LISTS !== "undefined") {
    SPELL_LISTS["2024"] = SPELL_LISTS["2024"] || {};
    SPELL_LISTS["2024"].Psion = JSON.parse(JSON.stringify(PSION_SPELL_LIST));
  }
  // Only the ten spells the packet introduces get the playtest source label, so
  // the Psion's Player's Handbook spells keep grouping under their own book.
  if (typeof addExpandedSpells === "function") {
    const byClass = { Psion: {} };
    Object.entries(PSION_NEW_SPELLS).forEach(([name, data]) => {
      (byClass.Psion[data.level] = byClass.Psion[data.level] || []).push(name);
      data.classes.forEach(className => {
        byClass[className] = byClass[className] || {};
        (byClass[className][data.level] = byClass[className][data.level] || []).push(name);
      });
    });
    Object.entries(byClass).forEach(([className, table]) => addExpandedSpells("2024", className, table, PSION_SOURCE));
  }
  if (typeof SPELL_METADATA !== "undefined") {
    Object.entries(PSION_NEW_SPELLS).forEach(([name, data]) => {
      if (!SPELL_METADATA[name]) SPELL_METADATA[name] = data.meta;
    });
  }
  if (typeof SPELL_PROGRESSION !== "undefined") {
    SPELL_PROGRESSION["2024"] = SPELL_PROGRESSION["2024"] || {};
    SPELL_PROGRESSION["2024"].Psion = { mode: "prepared", totals: PSION_PREPARED_SPELLS };
  }
  if (typeof CANTRIP_PROGRESSION !== "undefined") {
    CANTRIP_PROGRESSION["2024"] = CANTRIP_PROGRESSION["2024"] || {};
    CANTRIP_PROGRESSION["2024"].Psion = { 4: 1, 10: 1 };
  }
  if (typeof PROGRESSION_OPTIONS !== "undefined") {
    PROGRESSION_OPTIONS.disciplines = PROGRESSION_OPTIONS.disciplines || {};
    PROGRESSION_OPTIONS.disciplines["2024"] = Object.keys(PSION_DISCIPLINES);
    PROGRESSION_OPTIONS.disciplines["2014"] = [];
  }
  if (typeof LEVEL_CHOICE_RULES !== "undefined") {
    LEVEL_CHOICE_RULES["2024"] = LEVEL_CHOICE_RULES["2024"] || {};
    LEVEL_CHOICE_RULES["2024"].Psion = { disciplines: { 2: 2, 5: 1, 10: 1, 13: 1, 17: 1 } };
  }
  if (typeof CONTENT_SUMMARIES !== "undefined") {
    CONTENT_SUMMARIES.disciplines = CONTENT_SUMMARIES.disciplines || {};
    Object.entries(PSION_DISCIPLINES).forEach(([name, text]) => {
      if (!CONTENT_SUMMARIES.disciplines[name]) CONTENT_SUMMARIES.disciplines[name] = text;
    });
    CONTENT_SUMMARIES.features = CONTENT_SUMMARIES.features || {};
    Object.entries(PSION_FEATURE_SUMMARIES).forEach(([name, text]) => {
      if (!CONTENT_SUMMARIES.features[name]) CONTENT_SUMMARIES.features[name] = text;
    });
    CONTENT_SUMMARIES.spells = CONTENT_SUMMARIES.spells || {};
    Object.entries(PSION_NEW_SPELLS).forEach(([name, data]) => {
      if (!CONTENT_SUMMARIES.spells[name]) CONTENT_SUMMARIES.spells[name] = data.summary;
    });
  }
})();

// Called from app.js init(), once RULES and the other app-level tables exist.
function registerPsionRuntime() {
  if (typeof RULES === "undefined" || RULES.classes.Psion) return;
  RULES.classes.Psion = PSION_CHASSIS;
  if (typeof CLASS_SKILLS !== "undefined") CLASS_SKILLS.Psion = PSION_CLASS_SKILLS;
  if (typeof SPELLCASTING_ABILITIES !== "undefined") SPELLCASTING_ABILITIES.Psion = "INT";
  // Two cantrips and four level 1 spells to start with.
  if (typeof QUICK_SPELL_COUNTS !== "undefined") QUICK_SPELL_COUNTS.Psion = { 0: 2, 1: 4 };
  if (typeof FULL_CASTER_CLASSES !== "undefined" && !FULL_CASTER_CLASSES.includes("Psion")) {
    FULL_CASTER_CLASSES.push("Psion");
  }
  if (typeof CLASS_TRAINING !== "undefined") {
    CLASS_TRAINING["2024"] = CLASS_TRAINING["2024"] || {};
    CLASS_TRAINING["2024"].Psion = PSION_TRAINING;
  }
}

// Size and number of a Psion's energy dice at a given level.
function psionEnergyDice(level) {
  const row = [...PSION_ENERGY_DICE].reverse().find(entry => Number(level) >= entry.level);
  return row ? { count: row.count, die: row.die } : null;
}

if (typeof module !== "undefined") {
  module.exports = { PSION_CHASSIS, PSION_FEATURES, PSION_SPELL_LIST, PSION_DISCIPLINES,
    PSION_SUBCLASS_FEATURES, PSION_SUBCLASS_SPELLS, PSION_NEW_SPELLS, PSION_ENERGY_DICE };
}
