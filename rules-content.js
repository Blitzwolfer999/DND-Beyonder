const FEATS = {
  2014: [
    { name: "Grappler", category: "General", prerequisite: "Strength 13 or higher" }
  ],
  2024: [
    { name: "Alert", category: "Origin" },
    { name: "Magic Initiate", category: "Origin" },
    { name: "Savage Attacker", category: "Origin" },
    { name: "Skilled", category: "Origin" },
    { name: "Ability Score Improvement", category: "General", prerequisite: "Level 4+" },
    { name: "Grappler", category: "General", prerequisite: "Level 4+, Strength or Dexterity 13+" },
    { name: "Archery", category: "Fighting Style", prerequisite: "Fighting Style feature" },
    { name: "Defense", category: "Fighting Style", prerequisite: "Fighting Style feature" },
    { name: "Great Weapon Fighting", category: "Fighting Style", prerequisite: "Fighting Style feature" },
    { name: "Two-Weapon Fighting", category: "Fighting Style", prerequisite: "Fighting Style feature" },
    { name: "Boon of Combat Prowess", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of Dimensional Travel", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of Fate", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of Irresistible Offense", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of the Night Spirit", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of Spell Recall", category: "Epic Boon", prerequisite: "Level 19+" },
    { name: "Boon of Truesight", category: "Epic Boon", prerequisite: "Level 19+" }
  ]
};

const CLASS_FEATURES = {
  2014: {
    Barbarian: [[1,"Rage"],[1,"Unarmored Defense"],[2,"Reckless Attack"],[2,"Danger Sense"],[3,"Primal Path"],[4,"Ability Score Improvement"],[5,"Extra Attack"],[5,"Fast Movement"],[7,"Feral Instinct"],[9,"Brutal Critical"],[11,"Relentless Rage"],[15,"Persistent Rage"],[18,"Indomitable Might"],[20,"Primal Champion"]],
    Bard: [[1,"Spellcasting"],[1,"Bardic Inspiration"],[2,"Jack of All Trades"],[2,"Song of Rest"],[3,"Bard College"],[3,"Expertise"],[5,"Font of Inspiration"],[6,"Countercharm"],[10,"Magical Secrets"],[20,"Superior Inspiration"]],
    Cleric: [[1,"Spellcasting"],[1,"Divine Domain"],[2,"Channel Divinity"],[2,"Turn Undead"],[5,"Destroy Undead"],[10,"Divine Intervention"],[20,"Divine Intervention Improvement"]],
    Druid: [[1,"Druidic"],[1,"Spellcasting"],[2,"Wild Shape"],[2,"Druid Circle"],[18,"Timeless Body"],[18,"Beast Spells"],[20,"Archdruid"]],
    Fighter: [[1,"Fighting Style"],[1,"Second Wind"],[2,"Action Surge"],[3,"Martial Archetype"],[5,"Extra Attack"],[9,"Indomitable"],[11,"Extra Attack (2)"],[17,"Action Surge (2)"],[20,"Extra Attack (3)"]],
    Monk: [[1,"Unarmored Defense"],[1,"Martial Arts"],[2,"Ki"],[2,"Unarmored Movement"],[3,"Monastic Tradition"],[3,"Deflect Missiles"],[4,"Slow Fall"],[5,"Extra Attack"],[5,"Stunning Strike"],[6,"Ki-Empowered Strikes"],[7,"Evasion"],[7,"Stillness of Mind"],[10,"Purity of Body"],[14,"Diamond Soul"],[15,"Timeless Body"],[18,"Empty Body"],[20,"Perfect Self"]],
    Paladin: [[1,"Divine Sense"],[1,"Lay on Hands"],[2,"Fighting Style"],[2,"Spellcasting"],[2,"Divine Smite"],[3,"Divine Health"],[3,"Sacred Oath"],[5,"Extra Attack"],[6,"Aura of Protection"],[10,"Aura of Courage"],[11,"Improved Divine Smite"],[14,"Cleansing Touch"]],
    Ranger: [[1,"Favored Enemy"],[1,"Natural Explorer"],[2,"Fighting Style"],[2,"Spellcasting"],[3,"Ranger Archetype"],[3,"Primeval Awareness"],[5,"Extra Attack"],[8,"Land's Stride"],[10,"Hide in Plain Sight"],[14,"Vanish"],[18,"Feral Senses"],[20,"Foe Slayer"]],
    Rogue: [[1,"Expertise"],[1,"Sneak Attack"],[1,"Thieves' Cant"],[2,"Cunning Action"],[3,"Roguish Archetype"],[5,"Uncanny Dodge"],[7,"Evasion"],[11,"Reliable Talent"],[14,"Blindsense"],[15,"Slippery Mind"],[18,"Elusive"],[20,"Stroke of Luck"]],
    Sorcerer: [[1,"Spellcasting"],[1,"Sorcerous Origin"],[2,"Font of Magic"],[3,"Metamagic"],[20,"Sorcerous Restoration"]],
    Warlock: [[1,"Otherworldly Patron"],[1,"Pact Magic"],[2,"Eldritch Invocations"],[3,"Pact Boon"],[11,"Mystic Arcanum (6th)"],[13,"Mystic Arcanum (7th)"],[15,"Mystic Arcanum (8th)"],[17,"Mystic Arcanum (9th)"],[20,"Eldritch Master"]],
    Wizard: [[1,"Spellcasting"],[1,"Arcane Recovery"],[2,"Arcane Tradition"],[18,"Spell Mastery"],[20,"Signature Spells"]]
  },
  2024: {
    Barbarian: [[1,"Rage"],[1,"Unarmored Defense"],[1,"Weapon Mastery"],[2,"Danger Sense"],[2,"Reckless Attack"],[3,"Barbarian Subclass"],[3,"Primal Knowledge"],[5,"Extra Attack"],[5,"Fast Movement"],[7,"Feral Instinct"],[7,"Instinctive Pounce"],[9,"Brutal Strike"],[11,"Relentless Rage"],[15,"Persistent Rage"],[18,"Indomitable Might"],[20,"Primal Champion"]],
    Bard: [[1,"Bardic Inspiration"],[1,"Spellcasting"],[2,"Expertise"],[2,"Jack of All Trades"],[3,"Bard Subclass"],[5,"Font of Inspiration"],[7,"Countercharm"],[10,"Magical Secrets"],[18,"Superior Inspiration"],[20,"Words of Creation"]],
    Cleric: [[1,"Divine Order"],[1,"Spellcasting"],[2,"Channel Divinity"],[2,"Divine Spark"],[2,"Turn Undead"],[3,"Cleric Subclass"],[5,"Sear Undead"],[7,"Blessed Strikes"],[10,"Divine Intervention"],[14,"Improved Blessed Strikes"],[20,"Greater Divine Intervention"]],
    Druid: [[1,"Druidic"],[1,"Primal Order"],[1,"Spellcasting"],[2,"Wild Shape"],[2,"Wild Companion"],[3,"Druid Subclass"],[5,"Wild Resurgence"],[7,"Elemental Fury"],[15,"Improved Elemental Fury"],[18,"Beast Spells"],[20,"Archdruid"]],
    Fighter: [[1,"Fighting Style"],[1,"Second Wind"],[1,"Weapon Mastery"],[2,"Action Surge"],[2,"Tactical Mind"],[3,"Fighter Subclass"],[5,"Extra Attack"],[5,"Tactical Shift"],[9,"Indomitable"],[9,"Tactical Master"],[11,"Two Extra Attacks"],[13,"Studied Attacks"],[19,"Epic Boon"],[20,"Three Extra Attacks"]],
    Monk: [[1,"Martial Arts"],[1,"Unarmored Defense"],[2,"Monk's Focus"],[2,"Unarmored Movement"],[2,"Uncanny Metabolism"],[3,"Deflect Attacks"],[3,"Monk Subclass"],[4,"Slow Fall"],[5,"Extra Attack"],[5,"Stunning Strike"],[6,"Empowered Strikes"],[7,"Evasion"],[10,"Heightened Focus"],[13,"Deflect Energy"],[14,"Disciplined Survivor"],[15,"Perfect Focus"],[18,"Superior Defense"],[20,"Body and Mind"]],
    Paladin: [[1,"Lay on Hands"],[1,"Spellcasting"],[1,"Weapon Mastery"],[2,"Fighting Style"],[2,"Paladin's Smite"],[3,"Channel Divinity"],[3,"Paladin Subclass"],[5,"Extra Attack"],[5,"Faithful Steed"],[6,"Aura of Protection"],[9,"Abjure Foes"],[10,"Aura of Courage"],[11,"Radiant Strikes"],[14,"Restoring Touch"],[18,"Aura Expansion"]],
    Ranger: [[1,"Favored Enemy"],[1,"Spellcasting"],[1,"Weapon Mastery"],[2,"Deft Explorer"],[2,"Fighting Style"],[3,"Ranger Subclass"],[5,"Extra Attack"],[6,"Roving"],[9,"Expertise"],[10,"Tireless"],[13,"Relentless Hunter"],[14,"Nature's Veil"],[17,"Precise Hunter"],[18,"Feral Senses"],[20,"Foe Slayer"]],
    Rogue: [[1,"Expertise"],[1,"Sneak Attack"],[1,"Thieves' Cant"],[1,"Weapon Mastery"],[2,"Cunning Action"],[3,"Rogue Subclass"],[3,"Steady Aim"],[5,"Cunning Strike"],[5,"Uncanny Dodge"],[7,"Evasion"],[7,"Reliable Talent"],[11,"Improved Cunning Strike"],[14,"Devious Strikes"],[15,"Slippery Mind"],[18,"Elusive"],[20,"Stroke of Luck"]],
    Sorcerer: [[1,"Innate Sorcery"],[1,"Spellcasting"],[2,"Font of Magic"],[2,"Metamagic"],[3,"Sorcerer Subclass"],[5,"Sorcerous Restoration"],[7,"Sorcery Incarnate"],[20,"Arcane Apotheosis"]],
    Warlock: [[1,"Eldritch Invocations"],[1,"Pact Magic"],[2,"Magical Cunning"],[3,"Warlock Subclass"],[9,"Contact Patron"],[11,"Mystic Arcanum (6th)"],[13,"Mystic Arcanum (7th)"],[15,"Mystic Arcanum (8th)"],[17,"Mystic Arcanum (9th)"],[20,"Eldritch Master"]],
    Wizard: [[1,"Ritual Adept"],[1,"Spellcasting"],[1,"Arcane Recovery"],[2,"Scholar"],[3,"Wizard Subclass"],[5,"Memorize Spell"],[18,"Spell Mastery"],[20,"Signature Spells"]]
  }
};

const SUBCLASS_FEATURES = {
  2014: {
    "Path of the Berserker": [[3,"Frenzy"],[6,"Mindless Rage"],[10,"Intimidating Presence"],[14,"Retaliation"]],
    "College of Lore": [[3,"Bonus Proficiencies"],[3,"Cutting Words"],[6,"Additional Magical Secrets"],[14,"Peerless Skill"]],
    "Life Domain": [[1,"Bonus Proficiency"],[1,"Disciple of Life"],[2,"Preserve Life"],[6,"Blessed Healer"],[8,"Divine Strike"],[17,"Supreme Healing"]],
    "Circle of the Land": [[2,"Bonus Cantrip"],[2,"Natural Recovery"],[3,"Circle Spells"],[6,"Land's Stride"],[10,"Nature's Ward"],[14,"Nature's Sanctuary"]],
    "Champion": [[3,"Improved Critical"],[7,"Remarkable Athlete"],[10,"Additional Fighting Style"],[15,"Superior Critical"],[18,"Survivor"]],
    "Way of the Open Hand": [[3,"Open Hand Technique"],[6,"Wholeness of Body"],[11,"Tranquility"],[17,"Quivering Palm"]],
    "Oath of Devotion": [[3,"Oath Spells"],[3,"Sacred Weapon"],[3,"Turn the Unholy"],[7,"Aura of Devotion"],[15,"Purity of Spirit"],[20,"Holy Nimbus"]],
    "Hunter": [[3,"Hunter's Prey"],[7,"Defensive Tactics"],[11,"Multiattack"],[15,"Superior Hunter's Defense"]],
    "Thief": [[3,"Fast Hands"],[3,"Second-Story Work"],[9,"Supreme Sneak"],[13,"Use Magic Device"],[17,"Thief's Reflexes"]],
    "Draconic Bloodline": [[1,"Dragon Ancestor"],[1,"Draconic Resilience"],[6,"Elemental Affinity"],[14,"Dragon Wings"],[18,"Draconic Presence"]],
    "The Fiend": [[1,"Dark One's Blessing"],[6,"Dark One's Own Luck"],[10,"Fiendish Resilience"],[14,"Hurl Through Hell"]],
    "School of Evocation": [[2,"Evocation Savant"],[2,"Sculpt Spells"],[6,"Potent Cantrip"],[10,"Empowered Evocation"],[14,"Overchannel"]]
  },
  2024: {
    "Path of the Berserker": [[3,"Frenzy"],[6,"Mindless Rage"],[10,"Retaliation"],[14,"Intimidating Presence"]],
    "College of Lore": [[3,"Bonus Proficiencies"],[3,"Cutting Words"],[6,"Magical Discoveries"],[14,"Peerless Skill"]],
    "Life Domain": [[3,"Disciple of Life"],[3,"Preserve Life"],[6,"Blessed Healer"],[17,"Supreme Healing"]],
    "Circle of the Land": [[3,"Circle Spells"],[3,"Land's Aid"],[6,"Natural Recovery"],[10,"Nature's Ward"],[14,"Nature's Sanctuary"]],
    "Champion": [[3,"Improved Critical"],[3,"Remarkable Athlete"],[7,"Additional Fighting Style"],[10,"Heroic Warrior"],[15,"Superior Critical"],[18,"Survivor"]],
    "Warrior of the Open Hand": [[3,"Open Hand Technique"],[6,"Wholeness of Body"],[11,"Fleet Step"],[17,"Quivering Palm"]],
    "Oath of Devotion": [[3,"Oath Spells"],[3,"Sacred Weapon"],[7,"Aura of Devotion"],[15,"Smite of Protection"],[20,"Holy Nimbus"]],
    "Hunter": [[3,"Hunter's Lore"],[3,"Hunter's Prey"],[7,"Defensive Tactics"],[11,"Superior Hunter's Prey"],[15,"Superior Hunter's Defense"]],
    "Thief": [[3,"Fast Hands"],[3,"Second-Story Work"],[9,"Supreme Sneak"],[13,"Use Magic Device"],[17,"Thief's Reflexes"]],
    "Draconic Sorcery": [[3,"Draconic Resilience"],[3,"Draconic Spells"],[6,"Elemental Affinity"],[14,"Dragon Wings"],[18,"Dragon Companion"]],
    "Fiend Patron": [[3,"Dark One's Blessing"],[3,"Fiend Spells"],[6,"Dark One's Own Luck"],[10,"Fiendish Resilience"],[14,"Hurl Through Hell"]],
    "Evoker": [[3,"Evocation Savant"],[3,"Potent Cantrip"],[6,"Sculpt Spells"],[10,"Empowered Evocation"],[14,"Overchannel"]]
  }
};

const PROGRESSION_OPTIONS = {
  fightingStyles: {
    2014: ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"],
    2024: ["Archery", "Defense", "Great Weapon Fighting", "Two-Weapon Fighting"]
  },
  metamagic: {
    2014: ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Subtle Spell", "Twinned Spell"],
    2024: ["Careful Spell", "Distant Spell", "Empowered Spell", "Extended Spell", "Heightened Spell", "Quickened Spell", "Seeking Spell", "Subtle Spell", "Transmuted Spell", "Twinned Spell"]
  },
  pactBoons2014: ["Pact of the Chain", "Pact of the Blade", "Pact of the Tome"],
  pactBoons2024: ["Pact of the Blade", "Pact of the Chain", "Pact of the Tome"],
  invocations: {
    2014: [
      "Agonizing Blast", "Armor of Shadows", "Ascendant Step", "Beast Speech", "Beguiling Influence",
      "Bewitching Whispers", "Book of Ancient Secrets", "Chains of Carceri", "Devil's Sight", "Dreadful Word",
      "Eldritch Sight", "Eldritch Spear", "Eyes of the Rune Keeper", "Fiendish Vigor", "Gaze of Two Minds",
      "Lifedrinker", "Mask of Many Faces", "Master of Myriad Forms", "Minions of Chaos", "Mire the Mind",
      "Misty Visions", "One with Shadows", "Otherworldly Leap", "Repelling Blast", "Sculptor of Flesh",
      "Sign of Ill Omen", "Thief of Five Fates", "Thirsting Blade", "Visions of Distant Realms",
      "Voice of the Chain Master", "Whispers of the Grave", "Witch Sight"
    ],
    2024: [
      "Agonizing Blast", "Armor of Shadows", "Ascendant Step", "Devil's Sight", "Devouring Blade",
      "Eldritch Mind", "Eldritch Smite", "Eldritch Spear", "Fiendish Vigor", "Gaze of Two Minds",
      "Gift of the Depths", "Gift of the Protectors", "Investment of the Chain Master", "Lessons of the First Ones",
      "Lifedrinker", "Mask of Many Faces", "Master of Myriad Forms", "Misty Visions", "One with Shadows",
      "Otherworldly Leap", "Pact of the Blade", "Pact of the Chain", "Pact of the Tome", "Repelling Blast",
      "Thirsting Blade", "Visions of Distant Realms", "Whispers of the Grave", "Witch Sight"
    ]
  },
  weapons: [
    "Battleaxe", "Blowgun", "Club", "Dagger", "Dart", "Flail", "Glaive", "Greataxe", "Greatclub",
    "Greatsword", "Halberd", "Hand Crossbow", "Handaxe", "Heavy Crossbow", "Javelin", "Lance",
    "Light Crossbow", "Light Hammer", "Longbow", "Longsword", "Mace", "Maul", "Morningstar",
    "Musket", "Pike", "Pistol", "Quarterstaff", "Rapier", "Scimitar", "Shortbow", "Shortsword",
    "Sickle", "Sling", "Spear", "Trident", "War Pick", "Warhammer", "Whip"
  ],
  skills: ["Acrobatics", "Animal Handling", "Arcana", "Athletics", "Deception", "History", "Insight", "Intimidation", "Investigation", "Medicine", "Nature", "Perception", "Performance", "Persuasion", "Religion", "Sleight of Hand", "Stealth", "Survival"]
};

const WEAPON_MASTERY_PROPERTIES = {
  Battleaxe: "Topple", Blowgun: "Vex", Club: "Slow", Dagger: "Nick", Dart: "Vex", Flail: "Sap",
  Glaive: "Graze", Greataxe: "Cleave", Greatclub: "Push", Greatsword: "Graze", Halberd: "Cleave",
  "Hand Crossbow": "Vex", Handaxe: "Vex", "Heavy Crossbow": "Push", Javelin: "Slow", Lance: "Topple",
  "Light Crossbow": "Slow", "Light Hammer": "Nick", Longbow: "Slow", Longsword: "Sap", Mace: "Sap",
  Maul: "Topple", Morningstar: "Sap", Musket: "Slow", Pike: "Push", Pistol: "Vex",
  Quarterstaff: "Topple", Rapier: "Vex", Scimitar: "Nick", Shortbow: "Vex", Shortsword: "Vex",
  Sickle: "Nick", Sling: "Slow", Spear: "Sap", Trident: "Topple", "War Pick": "Sap",
  Warhammer: "Push", Whip: "Slow"
};

const FULL_CASTER_SLOTS = [
  [2], [3], [4,2], [4,3], [4,3,2], [4,3,3], [4,3,3,1], [4,3,3,2], [4,3,3,3,1],
  [4,3,3,3,2], [4,3,3,3,2,1], [4,3,3,3,2,1], [4,3,3,3,2,1,1],
  [4,3,3,3,2,1,1], [4,3,3,3,2,1,1,1], [4,3,3,3,2,1,1,1],
  [4,3,3,3,2,1,1,1,1], [4,3,3,3,3,1,1,1,1], [4,3,3,3,3,2,1,1,1],
  [4,3,3,3,3,2,2,1,1]
];

const HALF_CASTER_SLOTS_2014 = [
  [], [2], [3], [3], [4,2], [4,2], [4,3], [4,3], [4,3,2], [4,3,2],
  [4,3,3], [4,3,3], [4,3,3,1], [4,3,3,1], [4,3,3,2], [4,3,3,2],
  [4,3,3,3,1], [4,3,3,3,1], [4,3,3,3,2], [4,3,3,3,2]
];

const HALF_CASTER_SLOTS_2024 = [
  [2], [2], [3], [3], [4,2], [4,2], [4,3], [4,3], [4,3,2], [4,3,2],
  [4,3,3], [4,3,3], [4,3,3,1], [4,3,3,1], [4,3,3,2], [4,3,3,2],
  [4,3,3,3,1], [4,3,3,3,1], [4,3,3,3,2], [4,3,3,3,2]
];

const THIRD_CASTER_SLOTS = [
  [], [], [2], [3], [3], [3], [4,2], [4,2], [4,2], [4,3],
  [4,3], [4,3], [4,3,2], [4,3,2], [4,3,2], [4,3,3],
  [4,3,3], [4,3,3], [4,3,3,1], [4,3,3,1]
];

const equipmentItem = (name, type, cost, weight, details = "") => ({ name, type, cost, weight, details });
const EQUIPMENT_CATALOG = [
  equipmentItem("Club", "Simple Melee Weapon", "1 SP", 2, "1d4 bludgeoning · Light · Slow mastery"),
  equipmentItem("Dagger", "Simple Melee Weapon", "2 GP", 1, "1d4 piercing · Finesse, light, thrown · Nick mastery"),
  equipmentItem("Greatclub", "Simple Melee Weapon", "2 SP", 10, "1d8 bludgeoning · Two-handed · Push mastery"),
  equipmentItem("Handaxe", "Simple Melee Weapon", "5 GP", 2, "1d6 slashing · Light, thrown · Vex mastery"),
  equipmentItem("Javelin", "Simple Melee Weapon", "5 SP", 2, "1d6 piercing · Thrown · Slow mastery"),
  equipmentItem("Light Hammer", "Simple Melee Weapon", "2 GP", 2, "1d4 bludgeoning · Light, thrown · Nick mastery"),
  equipmentItem("Mace", "Simple Melee Weapon", "5 GP", 4, "1d6 bludgeoning · Sap mastery"),
  equipmentItem("Quarterstaff", "Simple Melee Weapon", "2 SP", 4, "1d6 bludgeoning · Versatile (1d8) · Topple mastery"),
  equipmentItem("Sickle", "Simple Melee Weapon", "1 GP", 2, "1d4 slashing · Light · Nick mastery"),
  equipmentItem("Spear", "Simple Melee Weapon", "1 GP", 3, "1d6 piercing · Thrown, versatile (1d8) · Sap mastery"),
  equipmentItem("Dart", "Simple Ranged Weapon", "5 CP", 0.25, "1d4 piercing · Finesse, thrown · Vex mastery"),
  equipmentItem("Light Crossbow", "Simple Ranged Weapon", "25 GP", 5, "1d8 piercing · Ammunition, loading, two-handed · Slow mastery"),
  equipmentItem("Shortbow", "Simple Ranged Weapon", "25 GP", 2, "1d6 piercing · Ammunition, two-handed · Vex mastery"),
  equipmentItem("Sling", "Simple Ranged Weapon", "1 SP", 0, "1d4 bludgeoning · Ammunition · Slow mastery"),
  equipmentItem("Battleaxe", "Martial Melee Weapon", "10 GP", 4, "1d8 slashing · Versatile (1d10) · Topple mastery"),
  equipmentItem("Flail", "Martial Melee Weapon", "10 GP", 2, "1d8 bludgeoning · Sap mastery"),
  equipmentItem("Glaive", "Martial Melee Weapon", "20 GP", 6, "1d10 slashing · Heavy, reach, two-handed · Graze mastery"),
  equipmentItem("Greataxe", "Martial Melee Weapon", "30 GP", 7, "1d12 slashing · Heavy, two-handed · Cleave mastery"),
  equipmentItem("Greatsword", "Martial Melee Weapon", "50 GP", 6, "2d6 slashing · Heavy, two-handed · Graze mastery"),
  equipmentItem("Halberd", "Martial Melee Weapon", "20 GP", 6, "1d10 slashing · Heavy, reach, two-handed · Cleave mastery"),
  equipmentItem("Lance", "Martial Melee Weapon", "10 GP", 6, "1d10 piercing · Heavy, reach, two-handed while unmounted · Topple mastery"),
  equipmentItem("Longsword", "Martial Melee Weapon", "15 GP", 3, "1d8 slashing · Versatile (1d10) · Sap mastery"),
  equipmentItem("Maul", "Martial Melee Weapon", "10 GP", 10, "2d6 bludgeoning · Heavy, two-handed · Topple mastery"),
  equipmentItem("Morningstar", "Martial Melee Weapon", "15 GP", 4, "1d8 piercing · Sap mastery"),
  equipmentItem("Pike", "Martial Melee Weapon", "5 GP", 18, "1d10 piercing · Heavy, reach, two-handed · Push mastery"),
  equipmentItem("Rapier", "Martial Melee Weapon", "25 GP", 2, "1d8 piercing · Finesse · Vex mastery"),
  equipmentItem("Scimitar", "Martial Melee Weapon", "25 GP", 3, "1d6 slashing · Finesse, light · Nick mastery"),
  equipmentItem("Shortsword", "Martial Melee Weapon", "10 GP", 2, "1d6 piercing · Finesse, light · Vex mastery"),
  equipmentItem("Trident", "Martial Melee Weapon", "5 GP", 4, "1d8 piercing · Thrown, versatile (1d10) · Topple mastery"),
  equipmentItem("War Pick", "Martial Melee Weapon", "5 GP", 2, "1d8 piercing · Versatile (1d10) · Sap mastery"),
  equipmentItem("Warhammer", "Martial Melee Weapon", "15 GP", 5, "1d8 bludgeoning · Versatile (1d10) · Push mastery"),
  equipmentItem("Whip", "Martial Melee Weapon", "2 GP", 3, "1d4 slashing · Finesse, reach · Slow mastery"),
  equipmentItem("Blowgun", "Martial Ranged Weapon", "10 GP", 1, "1 piercing · Ammunition, loading · Vex mastery"),
  equipmentItem("Hand Crossbow", "Martial Ranged Weapon", "75 GP", 3, "1d6 piercing · Ammunition, light, loading · Vex mastery"),
  equipmentItem("Heavy Crossbow", "Martial Ranged Weapon", "50 GP", 18, "1d10 piercing · Ammunition, heavy, loading, two-handed · Push mastery"),
  equipmentItem("Longbow", "Martial Ranged Weapon", "50 GP", 2, "1d8 piercing · Ammunition, heavy, two-handed · Slow mastery"),
  equipmentItem("Pistol", "Martial Ranged Weapon", "250 GP", 3, "1d10 piercing · Ammunition, loading · Vex mastery"),
  equipmentItem("Musket", "Martial Ranged Weapon", "500 GP", 10, "1d12 piercing · Ammunition, loading, two-handed · Slow mastery"),
  equipmentItem("Padded Armor", "Light Armor", "5 GP", 8, "AC 11 + Dexterity modifier · Stealth disadvantage"),
  equipmentItem("Leather Armor", "Light Armor", "10 GP", 10, "AC 11 + Dexterity modifier"),
  equipmentItem("Studded Leather Armor", "Light Armor", "45 GP", 13, "AC 12 + Dexterity modifier"),
  equipmentItem("Hide Armor", "Medium Armor", "10 GP", 12, "AC 12 + Dexterity modifier (maximum +2)"),
  equipmentItem("Chain Shirt", "Medium Armor", "50 GP", 20, "AC 13 + Dexterity modifier (maximum +2)"),
  equipmentItem("Scale Mail", "Medium Armor", "50 GP", 45, "AC 14 + Dexterity modifier (maximum +2) · Stealth disadvantage"),
  equipmentItem("Breastplate", "Medium Armor", "400 GP", 20, "AC 14 + Dexterity modifier (maximum +2)"),
  equipmentItem("Half Plate Armor", "Medium Armor", "750 GP", 40, "AC 15 + Dexterity modifier (maximum +2) · Stealth disadvantage"),
  equipmentItem("Ring Mail", "Heavy Armor", "30 GP", 40, "AC 14 · Stealth disadvantage"),
  equipmentItem("Chain Mail", "Heavy Armor", "75 GP", 55, "AC 16 · Strength 13 · Stealth disadvantage"),
  equipmentItem("Splint Armor", "Heavy Armor", "200 GP", 60, "AC 17 · Strength 15 · Stealth disadvantage"),
  equipmentItem("Plate Armor", "Heavy Armor", "1,500 GP", 65, "AC 18 · Strength 15 · Stealth disadvantage"),
  equipmentItem("Shield", "Shield", "10 GP", 6, "+2 Armor Class while wielded"),
  equipmentItem("Backpack", "Adventuring Gear", "2 GP", 5, "Holds gear and supplies"),
  equipmentItem("Bedroll", "Adventuring Gear", "1 GP", 7, "Portable sleeping gear"),
  equipmentItem("Blanket", "Adventuring Gear", "5 SP", 3, "Travel blanket"),
  equipmentItem("Book", "Adventuring Gear", "25 GP", 5, "A written volume"),
  equipmentItem("Caltrops", "Adventuring Gear", "1 GP", 2, "Bag of twenty caltrops"),
  equipmentItem("Candle", "Adventuring Gear", "1 CP", 0, "Provides dim light"),
  equipmentItem("Case, Map or Scroll", "Adventuring Gear", "1 GP", 1, "Protective document case"),
  equipmentItem("Chain, 10 feet", "Adventuring Gear", "5 GP", 10, "Ten feet of chain"),
  equipmentItem("Crowbar", "Adventuring Gear", "2 GP", 5, "Provides leverage when appropriate"),
  equipmentItem("Flask or Tankard", "Adventuring Gear", "2 CP", 1, "Liquid container"),
  equipmentItem("Grappling Hook", "Adventuring Gear", "2 GP", 4, "Climbing and securing gear"),
  equipmentItem("Healer's Kit", "Adventuring Gear", "5 GP", 3, "Ten uses for stabilizing creatures"),
  equipmentItem("Holy Water", "Adventuring Gear", "25 GP", 1, "A flask of consecrated water"),
  equipmentItem("Lantern, Hooded", "Adventuring Gear", "5 GP", 2, "Directional light source"),
  equipmentItem("Lock", "Adventuring Gear", "10 GP", 1, "A key-operated lock"),
  equipmentItem("Manacles", "Adventuring Gear", "2 GP", 6, "Metal restraints"),
  equipmentItem("Mess Kit", "Adventuring Gear", "2 SP", 1, "Portable eating and cooking kit"),
  equipmentItem("Oil, Flask", "Adventuring Gear", "1 SP", 1, "Fuel or improvised combustible"),
  equipmentItem("Potion of Healing", "Potion", "50 GP", 0.5, "Consumable healing potion"),
  equipmentItem("Rations, 1 day", "Adventuring Gear", "5 SP", 2, "One day of preserved food"),
  equipmentItem("Rope, Hempen, 50 feet", "Adventuring Gear", "1 GP", 10, "Fifty feet of hempen rope"),
  equipmentItem("Rope, Silk, 50 feet", "Adventuring Gear", "10 GP", 5, "Fifty feet of silk rope"),
  equipmentItem("Spellbook", "Adventuring Gear", "50 GP", 3, "A wizard's spellbook"),
  equipmentItem("Tinderbox", "Adventuring Gear", "5 SP", 1, "Used to start a fire"),
  equipmentItem("Torch", "Adventuring Gear", "1 CP", 1, "Provides bright and dim light"),
  equipmentItem("Waterskin", "Adventuring Gear", "2 SP", 5, "Liquid container; weight shown when full"),
  equipmentItem("Thieves' Tools", "Tool", "25 GP", 1, "Tools for locks and traps"),
  equipmentItem("Herbalism Kit", "Tool", "5 GP", 3, "Tools for identifying and applying herbs"),
  equipmentItem("Disguise Kit", "Tool", "25 GP", 3, "Cosmetics and disguise supplies"),
  equipmentItem("Musical Instrument", "Tool", "Varies", 3, "Choose a specific instrument"),
  equipmentItem("Arcane Focus", "Spellcasting Focus", "Varies", 1, "Focus for arcane spells"),
  equipmentItem("Druidic Focus", "Spellcasting Focus", "Varies", 1, "Focus for druid spells"),
  equipmentItem("Holy Symbol", "Spellcasting Focus", "5 GP", 1, "Focus for divine spells")
];

const LEVEL_CHOICE_RULES = {
  2014: {
    Bard: { expertise: { 3: 2, 10: 2 } },
    Rogue: { expertise: { 1: 2, 6: 2 } },
    Sorcerer: { metamagic: { 3: 2, 10: 1, 17: 1 } },
    Warlock: { invocations: { 2: 2, 5: 1, 7: 1, 9: 1, 12: 1, 15: 1, 18: 1 } }
  },
  2024: {
    Bard: { expertise: { 2: 2, 9: 2 } },
    Ranger: { expertise: { 9: 2 } },
    Rogue: { expertise: { 1: 2, 6: 2 } },
    Sorcerer: { metamagic: { 2: 2, 10: 2, 17: 2 } },
    Warlock: { invocations: { 1: 1, 2: 2, 5: 2, 7: 1, 9: 1, 12: 1, 15: 1, 18: 1 } }
  }
};

const CANTRIP_PROGRESSION = {
  2014: {
    Bard: { 4: 1, 10: 1 }, Cleric: { 4: 1, 10: 1 }, Druid: { 4: 1, 10: 1 },
    Sorcerer: { 4: 1, 10: 1 }, Warlock: { 4: 1, 10: 1 }, Wizard: { 4: 1, 10: 1 }
  },
  2024: {
    Bard: { 4: 1, 10: 1 }, Cleric: { 4: 1, 10: 1 }, Druid: { 4: 1, 10: 1 },
    Sorcerer: { 4: 1, 10: 1 }, Warlock: { 4: 1, 10: 1 }, Wizard: { 4: 1, 10: 1 }
  }
};

const SPELL_PROGRESSION = {
  2014: {
    Bard: { mode: "known", totals: [4,5,6,7,8,9,10,11,12,14,15,15,16,18,19,19,20,22,22,22] },
    Ranger: { mode: "known", totals: [0,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11] },
    Sorcerer: { mode: "known", totals: [2,3,4,5,6,7,8,9,10,11,12,12,13,13,14,14,15,15,15,15] },
    Warlock: { mode: "known", totals: [2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15] },
    Wizard: { mode: "spellbook", perLevel: 2 }
  },
  2024: {
    Bard: { mode: "prepared", totals: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    Cleric: { mode: "prepared", totals: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    Druid: { mode: "prepared", totals: [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    Paladin: { mode: "prepared", totals: [2,3,4,5,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15] },
    Ranger: { mode: "prepared", totals: [2,3,4,5,6,6,7,7,9,9,10,10,11,11,12,12,14,14,15,15] },
    Sorcerer: { mode: "prepared", totals: [2,4,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22] },
    Warlock: { mode: "prepared", totals: [2,3,4,5,6,7,8,9,10,10,11,11,12,12,13,13,14,14,15,15] },
    Wizard: { mode: "spellbook", perLevel: 2 }
  }
};

if (typeof module !== "undefined") {
  module.exports = { FEATS, CLASS_FEATURES, SUBCLASS_FEATURES, PROGRESSION_OPTIONS, LEVEL_CHOICE_RULES, CANTRIP_PROGRESSION, SPELL_PROGRESSION };
}
