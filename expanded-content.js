const subclassRecord = (name, source, rules = "2014") => ({ name, source, rules });

const SUBCLASS_CATALOG = {
  Barbarian: [
    subclassRecord("Path of the Berserker", "Player's Handbook (2014)"),
    subclassRecord("Path of the Totem Warrior", "Player's Handbook (2014)"),
    subclassRecord("Path of the Battlerager", "Sword Coast Adventurer's Guide"),
    subclassRecord("Path of the Ancestral Guardian", "Xanathar's Guide to Everything"),
    subclassRecord("Path of the Storm Herald", "Xanathar's Guide to Everything"),
    subclassRecord("Path of the Zealot", "Xanathar's Guide to Everything"),
    subclassRecord("Path of the Beast", "Tasha's Cauldron of Everything"),
    subclassRecord("Path of Wild Magic", "Tasha's Cauldron of Everything"),
    subclassRecord("Path of the Giant", "Bigby Presents: Glory of the Giants"),
    subclassRecord("Path of the Juggernaut", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    subclassRecord("Path of the Berserker", "Player's Handbook (2024)", "2024"),
    subclassRecord("Path of the Wild Heart", "Player's Handbook (2024)", "2024"),
    subclassRecord("Path of the World Tree", "Player's Handbook (2024)", "2024"),
    subclassRecord("Path of the Zealot", "Player's Handbook (2024)", "2024")
  ],
  Bard: [
    subclassRecord("College of Lore", "Player's Handbook (2014)"),
    subclassRecord("College of Valor", "Player's Handbook (2014)"),
    subclassRecord("College of Glamour", "Xanathar's Guide to Everything"),
    subclassRecord("College of Swords", "Xanathar's Guide to Everything"),
    subclassRecord("College of Whispers", "Xanathar's Guide to Everything"),
    subclassRecord("College of Eloquence", "Mythic Odysseys of Theros / Tasha's Cauldron of Everything"),
    subclassRecord("College of Creation", "Tasha's Cauldron of Everything"),
    subclassRecord("College of Spirits", "Van Richten's Guide to Ravenloft"),
    subclassRecord("College of Tragedy", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    subclassRecord("College of Dance", "Player's Handbook (2024)", "2024"),
    subclassRecord("College of Glamour", "Player's Handbook (2024)", "2024"),
    subclassRecord("College of Lore", "Player's Handbook (2024)", "2024"),
    subclassRecord("College of Valor", "Player's Handbook (2024)", "2024"),
    subclassRecord("College of the Moon", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Cleric: [
    ...["Knowledge", "Life", "Light", "Nature", "Tempest", "Trickery", "War"].map(name => subclassRecord(`${name} Domain`, "Player's Handbook (2014)")),
    subclassRecord("Death Domain", "Dungeon Master's Guide (2014)"),
    subclassRecord("Arcana Domain", "Sword Coast Adventurer's Guide"),
    subclassRecord("Forge Domain", "Xanathar's Guide to Everything"),
    subclassRecord("Grave Domain", "Xanathar's Guide to Everything"),
    subclassRecord("Order Domain", "Guildmasters' Guide to Ravnica / Tasha's Cauldron of Everything"),
    subclassRecord("Peace Domain", "Tasha's Cauldron of Everything"),
    subclassRecord("Twilight Domain", "Tasha's Cauldron of Everything"),
    subclassRecord("Blood Domain", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    subclassRecord("Moon Domain", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Life", "Light", "Trickery", "War"].map(name => subclassRecord(`${name} Domain`, "Player's Handbook (2024)", "2024")),
    subclassRecord("Knowledge Domain", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Druid: [
    subclassRecord("Circle of the Land", "Player's Handbook (2014)"),
    subclassRecord("Circle of the Moon", "Player's Handbook (2014)"),
    subclassRecord("Circle of Dreams", "Xanathar's Guide to Everything"),
    subclassRecord("Circle of the Shepherd", "Xanathar's Guide to Everything"),
    subclassRecord("Circle of Spores", "Guildmasters' Guide to Ravnica / Tasha's Cauldron of Everything"),
    subclassRecord("Circle of Stars", "Tasha's Cauldron of Everything"),
    subclassRecord("Circle of Wildfire", "Tasha's Cauldron of Everything"),
    subclassRecord("Circle of the Blighted", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Land", "Moon", "Sea", "Stars"].map(name => subclassRecord(`Circle of the ${name}`, "Player's Handbook (2024)", "2024"))
  ],
  Fighter: [
    ...["Battle Master", "Champion", "Eldritch Knight"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    subclassRecord("Purple Dragon Knight", "Sword Coast Adventurer's Guide"),
    ...["Arcane Archer", "Cavalier", "Samurai"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    subclassRecord("Echo Knight", "Explorer's Guide to Wildemount"),
    ...["Psi Warrior", "Rune Knight"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    subclassRecord("Gunslinger", "Critical Role"),
    ...["Battle Master", "Champion", "Eldritch Knight", "Psi Warrior"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Banneret", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Monk: [
    ...["Way of the Four Elements", "Way of the Open Hand", "Way of Shadow"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    subclassRecord("Way of the Long Death", "Sword Coast Adventurer's Guide"),
    subclassRecord("Way of the Sun Soul", "Sword Coast Adventurer's Guide / Xanathar's Guide to Everything"),
    ...["Way of the Drunken Master", "Way of the Kensei"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    ...["Way of the Astral Self", "Way of Mercy"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    subclassRecord("Way of the Ascendant Dragon", "Fizban's Treasury of Dragons"),
    subclassRecord("Way of the Cobalt Soul", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Warrior of Mercy", "Warrior of Shadow", "Warrior of the Elements", "Warrior of the Open Hand"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024"))
  ],
  Paladin: [
    ...["Oath of the Ancients", "Oath of Devotion", "Oath of Vengeance"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    subclassRecord("Oathbreaker", "Dungeon Master's Guide (2014)"),
    subclassRecord("Oath of the Crown", "Sword Coast Adventurer's Guide"),
    ...["Oath of Conquest", "Oath of Redemption"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    subclassRecord("Oath of Glory", "Mythic Odysseys of Theros / Tasha's Cauldron of Everything"),
    subclassRecord("Oath of the Watchers", "Tasha's Cauldron of Everything"),
    subclassRecord("Oath of the Open Sea", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Oath of Devotion", "Oath of Glory", "Oath of the Ancients", "Oath of Vengeance"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Oath of the Noble Genies", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Ranger: [
    ...["Beast Master", "Hunter"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    ...["Gloom Stalker", "Horizon Walker", "Monster Slayer"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    ...["Fey Wanderer", "Swarmkeeper"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    subclassRecord("Drakewarden", "Fizban's Treasury of Dragons"),
    ...["Beast Master", "Fey Wanderer", "Gloom Stalker", "Hunter"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Winter Walker", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Rogue: [
    ...["Arcane Trickster", "Assassin", "Thief"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    ...["Mastermind", "Swashbuckler"].map(name => subclassRecord(name, "Sword Coast Adventurer's Guide / Xanathar's Guide to Everything")),
    ...["Inquisitive", "Scout"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    ...["Phantom", "Soulknife"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    ...["Arcane Trickster", "Assassin", "Soulknife", "Thief"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Scion of the Three", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Sorcerer: [
    ...["Draconic Bloodline", "Wild Magic"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    subclassRecord("Storm Sorcery", "Sword Coast Adventurer's Guide / Xanathar's Guide to Everything"),
    ...["Divine Soul", "Shadow Magic"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    ...["Aberrant Mind", "Clockwork Soul"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    subclassRecord("Lunar Sorcery", "Dragonlance: Shadow of the Dragon Queen"),
    subclassRecord("Runechild", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Aberrant Sorcery", "Clockwork Sorcery", "Draconic Sorcery", "Wild Magic Sorcery"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Spellfire Sorcery", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Warlock: [
    ...["The Archfey", "The Fiend", "The Great Old One"].map(name => subclassRecord(name, "Player's Handbook (2014)")),
    subclassRecord("The Undying", "Sword Coast Adventurer's Guide"),
    ...["The Celestial", "The Hexblade"].map(name => subclassRecord(name, "Xanathar's Guide to Everything")),
    ...["The Fathomless", "The Genie"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    subclassRecord("The Undead", "Van Richten's Guide to Ravenloft"),
    ...["Archfey Patron", "Celestial Patron", "Fiend Patron", "Great Old One Patron"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024"))
  ],
  Wizard: [
    ...["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"].map(name => subclassRecord(`School of ${name}`, "Player's Handbook (2014)")),
    subclassRecord("Bladesinging", "Sword Coast Adventurer's Guide / Tasha's Cauldron of Everything"),
    subclassRecord("War Magic", "Xanathar's Guide to Everything"),
    ...["Chronurgy Magic", "Graviturgy Magic"].map(name => subclassRecord(name, "Explorer's Guide to Wildemount")),
    subclassRecord("Order of Scribes", "Tasha's Cauldron of Everything"),
    subclassRecord("Blood Magic", "Tal'Dorei Campaign Setting Reborn (Critical Role)"),
    ...["Abjurer", "Diviner", "Evoker", "Illusionist"].map(name => subclassRecord(name, "Player's Handbook (2024)", "2024")),
    subclassRecord("Bladesinger", "Forgotten Realms: Heroes of Faerun", "2024")
  ],
  Artificer: [
    ...["Alchemist", "Armorer", "Artillerist", "Battle Smith"].map(name => subclassRecord(name, "Tasha's Cauldron of Everything")),
    ...["Alchemist", "Armorer", "Artillerist", "Battle Smith", "Cartographer"].map(name => subclassRecord(name, "Eberron: Forge of the Artificer", "2024"))
  ],
  "Blood Hunter": [
    ...["Order of the Ghostslayer", "Order of the Lycan", "Order of the Mutant", "Order of the Profane Soul"].map(name => subclassRecord(name, "Critical Role"))
  ]
};

const SUBCLASS_LEVELS = {
  2014: {
    Barbarian: [3, 6, 10, 14], Bard: [3, 6, 14], Cleric: [1, 2, 6, 8, 17],
    Druid: [2, 6, 10, 14], Fighter: [3, 7, 10, 15, 18], Monk: [3, 6, 11, 17],
    Paladin: [3, 7, 15, 20], Ranger: [3, 7, 11, 15], Rogue: [3, 9, 13, 17],
    Sorcerer: [1, 6, 14, 18], Warlock: [1, 6, 10, 14], Wizard: [2, 6, 10, 14],
    Artificer: [3, 5, 9, 15], "Blood Hunter": [3, 7, 11, 15, 18]
  },
  2024: {
    Barbarian: [3, 6, 10, 14], Bard: [3, 6, 14], Cleric: [3, 6, 17],
    Druid: [3, 6, 10, 14], Fighter: [3, 7, 10, 15, 18], Monk: [3, 6, 11, 17],
    Paladin: [3, 7, 15, 20], Ranger: [3, 7, 11, 15], Rogue: [3, 9, 13, 17],
    Sorcerer: [3, 6, 14, 18], Warlock: [3, 6, 10, 14], Wizard: [3, 6, 10, 14],
    Artificer: [3, 5, 9, 15], "Blood Hunter": [3, 7, 11, 15, 18]
  }
};

const ARTIFICER_SPELLS = {
  0: ["Acid Splash", "Dancing Lights", "Fire Bolt", "Guidance", "Light", "Mage Hand", "Mending", "Message", "Poison Spray", "Prestidigitation", "Ray of Frost", "Resistance", "Shocking Grasp", "Spare the Dying", "Thorn Whip"],
  1: ["Alarm", "Cure Wounds", "Detect Magic", "Disguise Self", "Expeditious Retreat", "Faerie Fire", "False Life", "Feather Fall", "Grease", "Identify", "Jump", "Longstrider", "Purify Food and Drink", "Sanctuary"],
  2: ["Aid", "Alter Self", "Arcane Lock", "Blur", "Continual Flame", "Darkvision", "Enhance Ability", "Enlarge/Reduce", "Heat Metal", "Invisibility", "Lesser Restoration", "Levitate", "Magic Mouth", "Magic Weapon", "Protection from Poison", "Rope Trick", "See Invisibility", "Spider Climb", "Web"],
  3: ["Blink", "Create Food and Water", "Dispel Magic", "Fly", "Glyph of Warding", "Haste", "Protection from Energy", "Revivify", "Water Breathing", "Water Walk"],
  4: ["Arcane Eye", "Fabricate", "Freedom of Movement", "Resilient Sphere", "Secret Chest", "Stone Shape", "Stoneskin"],
  5: ["Animate Objects", "Arcane Hand", "Creation", "Greater Restoration", "Wall of Stone"],
  6: [], 7: [], 8: [], 9: []
};

CLASS_FEATURES[2014].Artificer = [
  [1, "Magical Tinkering"], [1, "Spellcasting"], [2, "Infuse Item"], [3, "Artificer Specialist"],
  [3, "The Right Tool for the Job"], [6, "Tool Expertise"], [7, "Flash of Genius"],
  [10, "Magic Item Adept"], [11, "Spell-Storing Item"], [14, "Magic Item Savant"],
  [18, "Magic Item Master"], [20, "Soul of Artifice"]
];
CLASS_FEATURES[2024].Artificer = [
  [1, "Magical Tinkering"], [1, "Spellcasting"], [2, "Replicate Magic Item"], [3, "Artificer Subclass"],
  [3, "The Right Tool for the Job"], [6, "Magic Item Tinker"], [7, "Flash of Genius"],
  [10, "Magic Item Adept"], [11, "Spell-Storing Item"], [14, "Magic Item Savant"],
  [18, "Magic Item Master"], [20, "Soul of Artifice"]
];

const BLOOD_HUNTER_FEATURES = [
  [1, "Hunter's Bane"], [1, "Blood Maledict"], [2, "Fighting Style"], [2, "Crimson Rite"],
  [3, "Blood Hunter Order"], [5, "Extra Attack"], [6, "Brand of Castigation"],
  [6, "Blood Maledict improvement"], [7, "Crimson Rite improvement"], [9, "Grim Psychometry"],
  [10, "Dark Augmentation"], [13, "Brand of Tethering"], [13, "Blood Maledict improvement"],
  [14, "Hardened Soul"], [14, "Crimson Rite improvement"], [17, "Blood Maledict improvement"],
  [20, "Sanguine Mastery"]
];
CLASS_FEATURES[2014]["Blood Hunter"] = BLOOD_HUNTER_FEATURES;
CLASS_FEATURES[2024]["Blood Hunter"] = BLOOD_HUNTER_FEATURES;

SPELL_LISTS[2014].Artificer = structuredClone(ARTIFICER_SPELLS);
SPELL_LISTS[2024].Artificer = structuredClone(ARTIFICER_SPELLS);
CANTRIP_PROGRESSION[2014].Artificer = { 10: 1, 14: 1 };
CANTRIP_PROGRESSION[2024].Artificer = { 10: 1, 14: 1 };
SPELL_PROGRESSION[2024].Artificer = {
  mode: "prepared",
  totals: [2, 3, 4, 5, 6, 6, 7, 7, 9, 9, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15]
};

function mergeClassFeatures(rulesEdition, className, rows) {
  const target = CLASS_FEATURES[rulesEdition][className] || [];
  const existing = new Set(target.map(([level, name]) => `${level}|${name}`));
  rows.forEach(row => {
    if (!existing.has(`${row[0]}|${row[1]}`)) target.push(row);
  });
  target.sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]));
  CLASS_FEATURES[rulesEdition][className] = target;
}

const ASI_2014 = [4, 8, 12, 16, 19].map(level => [level, "Ability Score Improvement / Feat"]);
const ASI_2024 = [4, 8, 12, 16].map(level => [level, "Ability Score Improvement / Feat"]);
const EPIC_2024 = [[19, "Epic Boon"]];

Object.keys(CLASS_FEATURES[2014]).forEach(className => mergeClassFeatures(2014, className, ASI_2014));
Object.keys(CLASS_FEATURES[2024]).forEach(className => mergeClassFeatures(2024, className, [...ASI_2024, ...EPIC_2024]));

mergeClassFeatures(2014, "Barbarian", [[3, "Rage improvement"], [6, "Rage improvement"], [12, "Rage improvement"], [13, "Brutal Critical improvement"], [17, "Rage improvement"], [17, "Brutal Critical improvement"]]);
mergeClassFeatures(2014, "Bard", [[5, "Bardic Inspiration improvement"], [9, "Song of Rest improvement"], [10, "Bardic Inspiration improvement"], [10, "Expertise"], [13, "Song of Rest improvement"], [14, "Magical Secrets"], [15, "Bardic Inspiration improvement"], [17, "Song of Rest improvement"], [18, "Magical Secrets"]]);
mergeClassFeatures(2014, "Cleric", [[6, "Channel Divinity improvement"], [8, "Destroy Undead improvement"], [11, "Destroy Undead improvement"], [14, "Destroy Undead improvement"], [17, "Destroy Undead improvement"], [18, "Channel Divinity improvement"]]);
mergeClassFeatures(2014, "Druid", [[4, "Wild Shape improvement"], [8, "Wild Shape improvement"]]);
mergeClassFeatures(2014, "Fighter", [[6, "Ability Score Improvement / Feat"], [14, "Ability Score Improvement / Feat"]]);
mergeClassFeatures(2014, "Fighter", [[13, "Indomitable improvement"], [17, "Indomitable improvement"]]);
mergeClassFeatures(2014, "Monk", [[5, "Martial Arts improvement"], [6, "Unarmored Movement improvement"], [10, "Unarmored Movement improvement"], [11, "Martial Arts improvement"], [14, "Unarmored Movement improvement"], [17, "Martial Arts improvement"], [18, "Unarmored Movement improvement"]]);
mergeClassFeatures(2014, "Paladin", [[18, "Aura improvements"]]);
mergeClassFeatures(2014, "Ranger", [[6, "Favored Enemy improvement"], [6, "Natural Explorer improvement"], [10, "Natural Explorer improvement"], [14, "Favored Enemy improvement"]]);
mergeClassFeatures(2014, "Rogue", [[6, "Expertise"], [10, "Ability Score Improvement / Feat"]]);
mergeClassFeatures(2014, "Sorcerer", [[10, "Metamagic improvement"], [17, "Metamagic improvement"]]);
mergeClassFeatures(2014, "Warlock", [[5, "Eldritch Invocations improvement"], [7, "Eldritch Invocations improvement"], [9, "Eldritch Invocations improvement"], [12, "Eldritch Invocations improvement"], [15, "Eldritch Invocations improvement"], [18, "Eldritch Invocations improvement"]]);

mergeClassFeatures(2024, "Fighter", [[6, "Ability Score Improvement / Feat"], [14, "Ability Score Improvement / Feat"]]);
mergeClassFeatures(2024, "Rogue", [[10, "Ability Score Improvement / Feat"]]);
mergeClassFeatures(2024, "Blood Hunter", [[19, "Ability Score Improvement / Feat"]]);
mergeClassFeatures(2024, "Barbarian", [[4, "Weapon Mastery improvement"], [10, "Weapon Mastery improvement"], [13, "Improved Brutal Strike"], [17, "Improved Brutal Strike"]]);
mergeClassFeatures(2024, "Bard", [[9, "Expertise"], [10, "Bardic Inspiration improvement"], [15, "Bardic Inspiration improvement"]]);
mergeClassFeatures(2024, "Cleric", [[6, "Channel Divinity improvement"], [18, "Channel Divinity improvement"]]);
mergeClassFeatures(2024, "Druid", [[6, "Wild Shape improvement"], [17, "Wild Shape improvement"]]);
mergeClassFeatures(2024, "Fighter", [[4, "Second Wind improvement"], [4, "Weapon Mastery improvement"], [10, "Weapon Mastery improvement"], [10, "Second Wind improvement"], [13, "Indomitable improvement"], [16, "Weapon Mastery improvement"], [17, "Action Surge improvement"], [17, "Indomitable improvement"]]);
mergeClassFeatures(2024, "Monk", [[9, "Acrobatic Movement"], [10, "Self-Restoration"]]);
mergeClassFeatures(2024, "Paladin", [[11, "Channel Divinity improvement"]]);
mergeClassFeatures(2024, "Ranger", [[2, "Deft Explorer: Expertise"]]);
mergeClassFeatures(2024, "Sorcerer", [[10, "Metamagic improvement"], [17, "Metamagic improvement"]]);
mergeClassFeatures(2024, "Warlock", [[5, "Eldritch Invocations improvement"], [7, "Eldritch Invocations improvement"], [9, "Eldritch Invocations improvement"], [12, "Eldritch Invocations improvement"], [15, "Eldritch Invocations improvement"], [18, "Eldritch Invocations improvement"]]);

LEVEL_CHOICE_RULES[2024].Ranger.expertise[2] = 1;

PROGRESSION_OPTIONS.fightingStyles[2014] = [
  "Archery", "Blessed Warrior", "Blind Fighting", "Defense", "Druidic Warrior", "Dueling",
  "Great Weapon Fighting", "Interception", "Protection", "Superior Technique",
  "Thrown Weapon Fighting", "Two-Weapon Fighting", "Unarmed Fighting"
];
PROGRESSION_OPTIONS.fightingStyles[2024] = [
  "Archery", "Blind Fighting", "Defense", "Dueling", "Great Weapon Fighting",
  "Interception", "Protection", "Thrown Weapon Fighting", "Two-Weapon Fighting", "Unarmed Fighting"
];
const FIGHTING_STYLE_SOURCES = {
  2014: Object.fromEntries(PROGRESSION_OPTIONS.fightingStyles[2014].map(name => [
    name,
    ["Archery", "Defense", "Dueling", "Great Weapon Fighting", "Protection", "Two-Weapon Fighting"].includes(name)
      ? "Player's Handbook (2014)"
      : "Tasha's Cauldron of Everything"
  ])),
  2024: Object.fromEntries(PROGRESSION_OPTIONS.fightingStyles[2024].map(name => [name, "Player's Handbook (2024)"]))
};
FIGHTING_STYLE_SOURCES[2024]["Blessed Warrior"] = "Player's Handbook (2024)";
FIGHTING_STYLE_SOURCES[2024]["Druidic Warrior"] = "Player's Handbook (2024)";

function addFeatCatalog(rulesEdition, source, category, names, expanded = false) {
  names.forEach(name => {
    const feat = {
      name,
      source,
      category,
      expanded,
      prerequisite: category === "Epic Boon"
        ? "Level 19+"
        : category === "General" && rulesEdition === "2024"
          ? "Level 4+"
          : category === "Fighting Style"
            ? "Fighting Style feature"
            : ""
    };
    const index = FEATS[rulesEdition].findIndex(item => item.name === name);
    if (index >= 0) FEATS[rulesEdition][index] = feat;
    else FEATS[rulesEdition].push(feat);
  });
}

function addBothFeatCatalog(source, category, names) {
  addFeatCatalog(2014, source, category, names);
  addFeatCatalog(2024, source, category, names, true);
}

addFeatCatalog(2014, "Player's Handbook (2014)", "General", [
  "Actor", "Alert", "Athlete", "Charger", "Crossbow Expert", "Defensive Duelist", "Dual Wielder",
  "Dungeon Delver", "Durable", "Elemental Adept", "Great Weapon Master", "Healer", "Heavily Armored",
  "Heavy Armor Master", "Inspiring Leader", "Keen Mind", "Lightly Armored", "Linguist", "Lucky",
  "Mage Slayer", "Magic Initiate", "Martial Adept", "Medium Armor Master", "Mobile",
  "Moderately Armored", "Mounted Combatant", "Observant", "Polearm Master", "Resilient",
  "Ritual Caster", "Savage Attacker", "Sentinel", "Sharpshooter", "Shield Master", "Skilled",
  "Skulker", "Spell Sniper", "Tavern Brawler", "Tough", "War Caster", "Weapon Master", "Grappler"
]);
addBothFeatCatalog("Xanathar's Guide to Everything", "General", [
  "Bountiful Luck", "Dragon Fear", "Dragon Hide", "Drow High Magic", "Dwarven Fortitude",
  "Elven Accuracy", "Fade Away", "Fey Teleportation", "Flames of Phlegethos",
  "Infernal Constitution", "Orcish Fury", "Prodigy", "Second Chance", "Squat Nimbleness", "Wood Elf Magic"
]);
addBothFeatCatalog("Tasha's Cauldron of Everything", "General", [
  "Artificer Initiate", "Chef", "Crusher", "Eldritch Adept", "Fey Touched", "Fighting Initiate",
  "Gunner", "Metamagic Adept", "Piercer", "Poisoner", "Shadow Touched", "Skill Expert",
  "Slasher", "Telekinetic", "Telepathic"
]);
addBothFeatCatalog("Bigby Presents: Glory of the Giants", "General", [
  "Ember of the Fire Giant", "Fury of the Frost Giant", "Guile of the Cloud Giant",
  "Keenness of the Stone Giant", "Rune Shaper", "Soul of the Storm Giant",
  "Strike of the Giants", "Vigor of the Hill Giant"
]);
addBothFeatCatalog("Bigby Presents: Glory of the Giants", "Origin", ["Rune Shaper", "Strike of the Giants"]);
addBothFeatCatalog("Dragonlance: Shadow of the Dragon Queen", "General", [
  "Adept of the Black Robes", "Adept of the Red Robes", "Adept of the White Robes",
  "Divinely Favored", "Initiate of High Sorcery", "Knight of the Crown", "Knight of the Rose",
  "Knight of the Sword", "Squire of Solamnia"
]);
addBothFeatCatalog("Dragonlance: Shadow of the Dragon Queen", "Origin", ["Initiate of High Sorcery", "Squire of Solamnia"]);
addBothFeatCatalog("Planescape: Adventures in the Multiverse", "General", [
  "Agent of Order", "Baleful Scion", "Cohort of Chaos", "Outlands Envoy",
  "Planar Wanderer", "Righteous Heritor", "Scion of the Outer Planes"
]);
addBothFeatCatalog("Planescape: Adventures in the Multiverse", "Origin", ["Scion of the Outer Planes"]);
addBothFeatCatalog("Fizban's Treasury of Dragons", "General", [
  "Gift of the Chromatic Dragon", "Gift of the Gem Dragon", "Gift of the Metallic Dragon"
]);
addBothFeatCatalog("Strixhaven: A Curriculum of Chaos", "General", ["Strixhaven Mascot"]);
addBothFeatCatalog("Strixhaven: A Curriculum of Chaos", "Origin", ["Strixhaven Initiate"]);
addBothFeatCatalog("The Book of Many Things", "General", ["Cartomancer"]);
addBothFeatCatalog("Eberron: Rising from the Last War", "General", ["Revenant Blade"]);
addFeatCatalog(2014, "Elemental Evil Player's Companion", "General", ["Svirfneblin Magic"]);
addFeatCatalog(2014, "Wayfinder's Guide to Eberron", "General", ["Aberrant Dragonmark"]);

addFeatCatalog(2024, "Player's Handbook (2024)", "Origin", [
  "Alert", "Crafter", "Healer", "Lucky", "Magic Initiate", "Musician",
  "Savage Attacker", "Skilled", "Tavern Brawler", "Tough"
]);
addFeatCatalog(2024, "Player's Handbook (2024)", "General", [
  "Ability Score Improvement", "Actor", "Athlete", "Charger", "Chef", "Crossbow Expert", "Crusher",
  "Defensive Duelist", "Dual Wielder", "Durable", "Elemental Adept", "Fey Touched", "Grappler",
  "Great Weapon Master", "Heavily Armored", "Heavy Armor Master", "Inspiring Leader", "Keen Mind",
  "Lightly Armored", "Mage Slayer", "Martial Weapon Training", "Medium Armor Master",
  "Moderately Armored", "Mounted Combatant", "Observant", "Piercer", "Poisoner", "Polearm Master",
  "Resilient", "Ritual Caster", "Sentinel", "Shadow Touched", "Sharpshooter", "Shield Master",
  "Skill Expert", "Skulker", "Slasher", "Speedy", "Spell Sniper", "Telekinetic", "Telepathic",
  "War Caster", "Weapon Master"
]);
addFeatCatalog(2024, "Player's Handbook (2024)", "Fighting Style", PROGRESSION_OPTIONS.fightingStyles[2024]);
addFeatCatalog(2024, "Player's Handbook (2024)", "Epic Boon", [
  "Boon of Combat Prowess", "Boon of Dimensional Travel", "Boon of Energy Resistance",
  "Boon of Fate", "Boon of Fortitude", "Boon of Irresistible Offense", "Boon of Recovery",
  "Boon of Skill", "Boon of Speed", "Boon of Spell Recall", "Boon of the Night Spirit", "Boon of Truesight"
]);

addFeatCatalog(2024, "Forgotten Realms: Heroes of Faerun", "Origin", [
  "Cult of the Dragon Initiate", "Emerald Enclave Fledgling", "Harper Agent", "Lords' Alliance Agent",
  "Purple Dragon Rook", "Spellfire Spark", "Tyro of the Gauntlet", "Zhentarim Ruffian"
]);
addFeatCatalog(2024, "Forgotten Realms: Heroes of Faerun", "General", [
  "Cold Caster", "Dragonscarred", "Enclave Magic", "Fairy Trickster", "Genie Magic",
  "Harper Teamwork", "Lordly Resolve", "Mythal Touched", "Order's Resilience",
  "Purple Dragon Commandant", "Spellfire Adept", "Street Justice", "Zhentarim Tactics"
]);
addFeatCatalog(2024, "Forgotten Realms: Heroes of Faerun", "Epic Boon", [
  "Boon of Bloodshed", "Boon of Bountiful Health", "Boon of Communication",
  "Boon of Desperate Resilience", "Boon of Exquisite Radiance", "Boon of Fluid Forms",
  "Boon of Fortune's Favor", "Boon of Poison Mastery", "Boon of Revelry", "Boon of Terror",
  "Boon of the Bright Sun", "Boon of the Furious Storm", "Boon of the Soul Drinker"
]);
addFeatCatalog(2024, "Eberron: Forge of the Artificer", "Dragonmark", [
  "Aberrant Dragonmark", "Greater Aberrant Mark", "Greater Mark of Detection", "Greater Mark of Finding",
  "Greater Mark of Handling", "Greater Mark of Healing", "Greater Mark of Hospitality",
  "Greater Mark of Making", "Greater Mark of Passage", "Greater Mark of Scribing",
  "Greater Mark of Sentinel", "Greater Mark of Shadow", "Greater Mark of Storm",
  "Greater Mark of Warding", "Mark of Detection", "Mark of Finding", "Mark of Handling",
  "Mark of Healing", "Mark of Hospitality", "Mark of Making", "Mark of Passage",
  "Mark of Scribing", "Mark of Sentinel", "Mark of Shadow", "Mark of Storm",
  "Mark of Warding", "Potent Dragonmark"
]);
addFeatCatalog(2024, "Eberron: Forge of the Artificer", "Epic Boon", [
  "Boon of Siberys (Dragonmark Spell)", "Boon of Siberys (Sorcerer Spell)"
]);
addFeatCatalog(2024, "Astarion's Book of Hungers", "Origin", [
  "Tireless Reveler", "Vampire Hunter", "Vampire's Plaything"
]);
addFeatCatalog(2024, "Astarion's Book of Hungers", "General", [
  "Bloodlust", "Bomber", "Cloying Mists", "Delicious Pain", "Light Bringer",
  "Love Bites", "Putrefy", "Rebuke", "Treacherous Allure", "Vampire Touched"
]);
addFeatCatalog(2024, "Astarion's Book of Hungers", "Epic Boon", [
  "Boon of Blazing Dawn", "Boon of Looming Shadows", "Boon of Misty Escape"
]);
addFeatCatalog(2024, "Ravenloft: The Horrors Within", "Origin", ["Sharp Eye", "Survivor"]);
addFeatCatalog(2024, "Ravenloft: The Horrors Within", "Dark Gift", [
  "Aberrant Anatomy", "Echoing Soul", "Gathered Whispers", "Living Shadow", "Mist Walker",
  "Second Skin", "Symbiotic Being", "Touch of Death", "Watchers"
]);
addFeatCatalog(2024, "Lorwyn: First Light", "Origin", ["Child of the Sun", "Shadowmoor Hexer"]);
addFeatCatalog(2024, "D&D Beyond Drops", "General", [
  "Fey Pact", "Fey Sentinel", "Infernal Bulwark", "Infernal Dragoon", "Infernal Pact"
]);

FEATS[2014].sort((a, b) => a.name.localeCompare(b.name));
FEATS[2024].sort((a, b) => a.name.localeCompare(b.name));

const EXPANDED_SPELL_SOURCES = { 2014: {}, 2024: {} };

function addExpandedSpells(rulesEdition, className, spellsByLevel, source) {
  if (!SPELL_LISTS[rulesEdition][className]) {
    SPELL_LISTS[rulesEdition][className] = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
  }
  Object.entries(spellsByLevel).forEach(([level, names]) => {
    const target = SPELL_LISTS[rulesEdition][className][level] || [];
    names.forEach(name => {
      if (!target.includes(name)) target.push(name);
      EXPANDED_SPELL_SOURCES[rulesEdition][name] = source;
    });
    target.sort((a, b) => a.localeCompare(b));
    SPELL_LISTS[rulesEdition][className][level] = target;
  });
}

const EXPANDED_SPELLS_2014 = {
  Bard: {
    0: ["Thunderclap"],
    1: ["Distort Value", "Earth Tremor", "Silvery Barbs", "Tasha's Hideous Laughter"],
    2: ["Borrowed Knowledge", "Gift of Gab", "Kinetic Jaunt", "Nathair's Mischief", "Pyrotechnics", "Skywrite", "Spray of Cards", "Warding Wind"],
    3: ["Antagonize", "Catnap", "Enemies Abound", "Fast Friends", "Intellect Fortress", "Motivational Speech"],
    4: ["Charm Monster", "Raulothim's Psychic Lance"],
    5: ["Skill Empowerment", "Synaptic Static"],
    7: ["Dream of the Blue Veil", "Mordenkainen's Magnificent Mansion"],
    9: ["Mass Polymorph", "Psychic Scream"]
  },
  Cleric: {
    0: ["Toll the Dead", "Word of Radiance"],
    1: ["Ceremony"],
    2: ["Borrowed Knowledge"],
    3: ["Fast Friends", "Incite Greed", "Life Transference", "Motivational Speech", "Spirit Shroud"],
    5: ["Dawn", "Holy Weapon", "Summon Celestial"],
    7: ["Temple of the Gods"]
  },
  Druid: {
    0: ["Control Flames", "Create Bonfire", "Frostbite", "Gust", "Infestation", "Magic Stone", "Mold Earth", "Primal Savagery", "Shape Water", "Thunderclap"],
    1: ["Absorb Elements", "Beast Bond", "Earth Tremor", "Ice Knife", "Snare"],
    2: ["Air Bubble", "Dust Devil", "Earthbind", "Healing Spirit", "Skywrite", "Summon Beast", "Warding Wind", "Wither and Bloom"],
    3: ["Erupting Earth", "Flame Arrows", "Summon Fey", "Tidal Wave", "Wall of Water"],
    4: ["Charm Monster", "Elemental Bane", "Guardian of Nature", "Summon Elemental", "Watery Sphere"],
    5: ["Control Winds", "Maelstrom", "Summon Draconic Spirit", "Transmute Rock", "Wrath of Nature"],
    6: ["Bones of the Earth", "Druid Grove", "Investiture of Flame", "Investiture of Ice", "Investiture of Stone", "Investiture of Wind", "Primordial Ward"],
    7: ["Draconic Transformation", "Whirlwind"],
    8: ["Tsunami"]
  },
  Paladin: {
    1: ["Ceremony", "Compelled Duel", "Wrathful Smite"],
    3: ["Blinding Smite", "Crusader's Mantle", "Spirit Shroud"],
    4: ["Find Greater Steed"],
    5: ["Holy Weapon", "Summon Celestial"]
  },
  Ranger: {
    1: ["Absorb Elements", "Beast Bond", "Snare", "Zephyr Strike"],
    2: ["Air Bubble", "Healing Spirit", "Summon Beast"],
    3: ["Ashardalon's Stride", "Flame Arrows", "Summon Fey"],
    4: ["Guardian of Nature", "Summon Elemental"],
    5: ["Steel Wind Strike", "Wrath of Nature"]
  },
  Sorcerer: {
    0: ["Booming Blade", "Control Flames", "Create Bonfire", "Frostbite", "Green-Flame Blade", "Gust", "Infestation", "Lightning Lure", "Mind Sliver", "Mold Earth", "Shape Water", "Sword Burst", "Thunderclap"],
    1: ["Absorb Elements", "Catapult", "Chaos Bolt", "Distort Value", "Earth Tremor", "Ice Knife", "Ray of Sickness", "Silvery Barbs", "Tasha's Caustic Brew"],
    2: ["Aganazzar's Scorcher", "Air Bubble", "Dragon's Breath", "Dust Devil", "Earthbind", "Kinetic Jaunt", "Maximilian's Earthen Grasp", "Mind Spike", "Nathair's Mischief", "Pyrotechnics", "Rime's Binding Ice", "Shadow Blade", "Snilloc's Snowball Swarm", "Spray of Cards", "Tasha's Mind Whip", "Vortex Warp", "Warding Wind", "Warp Sense", "Wither and Bloom"],
    3: ["Antagonize", "Ashardalon's Stride", "Catnap", "Enemies Abound", "Erupting Earth", "Flame Arrows", "Incite Greed", "Intellect Fortress", "Melf's Minute Meteors", "Thunder Step", "Tidal Wave", "Wall of Water"],
    4: ["Charm Monster", "Gate Seal", "Raulothim's Psychic Lance", "Sickening Radiance", "Spirit of Death", "Storm Sphere", "Vitriolic Sphere", "Watery Sphere"],
    5: ["Control Winds", "Enervation", "Far Step", "Immolation", "Skill Empowerment", "Summon Draconic Spirit", "Synaptic Static", "Wall of Light"],
    6: ["Fizban's Platinum Shield", "Investiture of Flame", "Investiture of Ice", "Investiture of Stone", "Investiture of Wind", "Mental Prison", "Scatter", "Tasha's Otherworldly Guise"],
    7: ["Crown of Stars", "Draconic Transformation", "Dream of the Blue Veil", "Power Word Pain", "Whirlwind"],
    8: ["Abi-Dalzim's Horrid Wilting"],
    9: ["Blade of Disaster", "Mass Polymorph", "Psychic Scream"]
  },
  Warlock: {
    0: ["Booming Blade", "Create Bonfire", "Frostbite", "Green-Flame Blade", "Infestation", "Lightning Lure", "Magic Stone", "Mind Sliver", "Sword Burst", "Thunderclap", "Toll the Dead"],
    1: ["Cause Fear", "Distort Value"],
    2: ["Borrowed Knowledge", "Earthbind", "Mind Spike", "Shadow Blade", "Spray of Cards", "Warp Sense"],
    3: ["Antagonize", "Enemies Abound", "Incite Greed", "Intellect Fortress", "Spirit Shroud", "Summon Fey", "Summon Lesser Demons", "Summon Shadowspawn", "Summon Undead", "Thunder Step"],
    4: ["Charm Monster", "Elemental Bane", "Gate Seal", "Raulothim's Psychic Lance", "Shadow of Moil", "Sickening Radiance", "Spirit of Death", "Summon Aberration", "Summon Greater Demon"],
    5: ["Danse Macabre", "Enervation", "Far Step", "Infernal Calling", "Negative Energy Flood", "Synaptic Static", "Wall of Light"],
    6: ["Investiture of Flame", "Investiture of Ice", "Investiture of Stone", "Investiture of Wind", "Mental Prison", "Scatter", "Soul Cage", "Summon Fiend", "Tasha's Otherworldly Guise"],
    7: ["Crown of Stars", "Dream of the Blue Veil", "Power Word Pain"],
    8: ["Maddening Darkness"],
    9: ["Blade of Disaster", "Psychic Scream"]
  },
  Wizard: {
    0: ["Booming Blade", "Control Flames", "Create Bonfire", "Encode Thoughts", "Frostbite", "Green-Flame Blade", "Gust", "Infestation", "Lightning Lure", "Mind Sliver", "Mold Earth", "Shape Water", "Sword Burst", "Thunderclap", "Toll the Dead"],
    1: ["Absorb Elements", "Catapult", "Cause Fear", "Distort Value", "Earth Tremor", "Frost Fingers", "Ice Knife", "Jim's Magic Missile", "Ray of Sickness", "Silvery Barbs", "Snare", "Tasha's Caustic Brew", "Tasha's Hideous Laughter"],
    2: ["Aganazzar's Scorcher", "Air Bubble", "Borrowed Knowledge", "Dragon's Breath", "Dust Devil", "Earthbind", "Gift of Gab", "Jim's Glowing Coin", "Kinetic Jaunt", "Maximilian's Earthen Grasp", "Mind Spike", "Nathair's Mischief", "Pyrotechnics", "Rime's Binding Ice", "Shadow Blade", "Skywrite", "Snilloc's Snowball Swarm", "Spray of Cards", "Tasha's Mind Whip", "Vortex Warp", "Warding Wind", "Warp Sense", "Wither and Bloom"],
    3: ["Antagonize", "Ashardalon's Stride", "Catnap", "Enemies Abound", "Erupting Earth", "Fast Friends", "Flame Arrows", "Incite Greed", "Intellect Fortress", "Life Transference", "Melf's Minute Meteors", "Spirit Shroud", "Summon Fey", "Summon Lesser Demons", "Summon Shadowspawn", "Summon Undead", "Thunder Step", "Tidal Wave", "Tiny Servant", "Wall of Sand", "Wall of Water"],
    4: ["Charm Monster", "Elemental Bane", "Gate Seal", "Mordenkainen's Private Sanctum", "Otiluke's Resilient Sphere", "Raulothim's Psychic Lance", "Sickening Radiance", "Spirit of Death", "Storm Sphere", "Summon Aberration", "Summon Construct", "Summon Elemental", "Summon Greater Demon", "Vitriolic Sphere", "Watery Sphere"],
    5: ["Control Winds", "Create Spelljamming Helm", "Danse Macabre", "Dawn", "Enervation", "Far Step", "Immolation", "Infernal Calling", "Negative Energy Flood", "Skill Empowerment", "Steel Wind Strike", "Summon Draconic Spirit", "Synaptic Static", "Transmute Rock", "Wall of Light"],
    6: ["Create Homunculus", "Fizban's Platinum Shield", "Investiture of Flame", "Investiture of Ice", "Investiture of Stone", "Investiture of Wind", "Mental Prison", "Scatter", "Soul Cage", "Summon Fiend", "Tasha's Otherworldly Guise", "Tenser's Transformation"],
    7: ["Create Magen", "Crown of Stars", "Draconic Transformation", "Dream of the Blue Veil", "Mordenkainen's Magnificent Mansion", "Power Word Pain", "Whirlwind"],
    8: ["Abi-Dalzim's Horrid Wilting", "Illusory Dragon", "Maddening Darkness", "Mighty Fortress"],
    9: ["Blade of Disaster", "Invulnerability", "Mass Polymorph", "Psychic Scream"]
  },
  Artificer: {
    0: ["Booming Blade", "Create Bonfire", "Frostbite", "Green-Flame Blade", "Lightning Lure", "Magic Stone", "Sword Burst", "Thunderclap"],
    1: ["Absorb Elements", "Catapult", "Snare", "Tasha's Caustic Brew"],
    2: ["Air Bubble", "Kinetic Jaunt", "Pyrotechnics", "Skywrite", "Vortex Warp"],
    3: ["Ashardalon's Stride", "Catnap", "Flame Arrows", "Intellect Fortress", "Tiny Servant"],
    4: ["Elemental Bane", "Mordenkainen's Private Sanctum", "Otiluke's Resilient Sphere", "Summon Construct"],
    5: ["Create Spelljamming Helm", "Skill Empowerment", "Transmute Rock"]
  }
};

const EXPANDED_SPELLS_2024 = {
  Bard: {
    1: ["Wardaway"], 2: ["Phantasmal Force"], 3: ["Cacophonic Shield"],
    4: ["Backlash", "Doomtide"], 5: ["Alustriel's Mooncloak"], 6: ["Dirge"]
  },
  Cleric: {
    0: ["Toll the Dead"], 1: ["Wardaway"], 2: ["Deryan's Helpful Homunculi"],
    3: ["Laeral's Silver Lance"], 4: ["Doomtide"], 5: ["Summon Celestial"],
    6: ["Dirge"], 8: ["Holy Star of Mystra"]
  },
  Druid: {
    0: ["Thorn Whip"], 3: ["Sylune's Viper"],
    5: ["Alustriel's Mooncloak", "Songal's Elemental Suffusion"],
    6: ["Elminster's Effulgent Spheres"]
  },
  Paladin: { 1: ["Wardaway", "Wrathful Smite"], 5: ["Summon Celestial"] },
  Ranger: { 5: ["Alustriel's Mooncloak", "Steel Wind Strike"] },
  Sorcerer: {
    1: ["Spellfire Flare", "Witch Bolt"], 2: ["Death Armor", "Phantasmal Force"],
    3: ["Cacophonic Shield", "Laeral's Silver Lance"],
    4: ["Backlash", "Spellfire Storm", "Vitriolic Sphere"],
    5: ["Songal's Elemental Suffusion"], 6: ["Elminster's Effulgent Spheres"],
    7: ["Simbul's Synostodweomer"], 9: ["Blade of Disaster"]
  },
  Warlock: {
    0: ["Toll the Dead"], 1: ["Witch Bolt"], 3: ["Hunger of Hadar", "Summon Undead"],
    4: ["Backlash", "Doomtide"], 9: ["Blade of Disaster"]
  },
  Wizard: {
    0: ["Toll the Dead"], 1: ["Spellfire Flare", "Wardaway", "Witch Bolt"],
    2: ["Death Armor", "Deryan's Helpful Homunculi", "Elminster's Elusion", "Phantasmal Force"],
    3: ["Cacophonic Shield", "Conjure Constructs", "Laeral's Silver Lance", "Summon Undead", "Sylune's Viper"],
    4: ["Backlash", "Spellfire Storm", "Vitriolic Sphere"],
    5: ["Alustriel's Mooncloak", "Songal's Elemental Suffusion", "Steel Wind Strike"],
    6: ["Elminster's Effulgent Spheres"], 7: ["Simbul's Synostodweomer"],
    8: ["Holy Star of Mystra"], 9: ["Blade of Disaster"]
  },
  Artificer: { 0: ["Thorn Whip"], 2: ["Homunculus Servant"] }
};

Object.entries(EXPANDED_SPELLS_2014).forEach(([className, spells]) => {
  addExpandedSpells(2014, className, spells, "Official 5e expanded rules");
  addExpandedSpells(2024, className, spells, "5e expanded rules");
});
Object.entries(EXPANDED_SPELLS_2024).forEach(([className, spells]) => {
  addExpandedSpells(2024, className, spells, "Official 5.5e expanded rules");
});

const INVALID_SPELL_NAMES = new Set([
  "Level 3:", "Choose two Wizard spells from the", "ard spell from the", "Level 10: Empowered"
]);
Object.values(SPELL_LISTS).forEach(classes => {
  Object.values(classes).forEach(levels => {
    Object.keys(levels).forEach(level => {
      levels[level] = levels[level].filter(name => !INVALID_SPELL_NAMES.has(name));
    });
  });
});
