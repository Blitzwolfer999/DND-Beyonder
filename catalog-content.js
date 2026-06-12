const customizationRecord = (name, source, rules) => ({ name, source, rules });

const LEGACY_SPECIES_OPTIONS = [
  "Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling",
  "Custom", "Aarakocra", "Aasimar", "Changeling", "Deep Gnome", "Duergar", "Eladrin", "Fairy",
  "Firbolg", "Genasi (Air)", "Genasi (Earth)", "Genasi (Fire)", "Genasi (Water)", "Githyanki",
  "Githzerai", "Goliath", "Harengon", "Kenku", "Locathah", "Owlin", "Satyr", "Sea Elf",
  "Shadar-Kai", "Tabaxi", "Tortle", "Triton", "Verdan", "Bugbear", "Centaur", "Goblin", "Grung",
  "Hobgoblin", "Kobold", "Lizardfolk", "Minotaur", "Orc", "Shifter", "Yuan-Ti", "Kender",
  "Kalashtar", "Warforged", "Dhampir", "Hexblood", "Reborn", "Loxodon", "Simic Hybrid", "Vedalken",
  "Astral Elf", "Autognome", "Giff", "Hadozee", "Plasmoid", "Thri-kreen", "Leonin"
];

const REVISED_SPECIES_OPTIONS = [
  "Aasimar", "Dragonborn", "Dwarf", "Elf", "Gnome", "Goliath", "Halfling", "Human", "Orc", "Tiefling",
  "Changeling", "Kalashtar", "Khoravar", "Shifter", "Warforged", "Boggart", "Faerie", "Flamekin",
  "Lorwyn Changeling", "Rimekin", "Dhampir", "Hexblood", "Lupin", "Reborn"
];

const LEGACY_BACKGROUND_OPTIONS = [
  "Acolyte", "Anthropologist", "Archaeologist", "Athlete", "Charlatan", "Clan Crafter",
  "Cloistered Scholar", "Courtier", "Criminal", "Entertainer", "Faceless", "Faction Agent",
  "Far Traveler", "Feylost", "Fisher", "Folk Hero", "Giant Foundling", "Haunted One", "Hermit",
  "House Agent", "Inheritor", "Knight of the Order", "Marine", "Mercenary Veteran", "Noble",
  "Outlander", "Rewarded", "Ruined", "Rune Carver", "Sage", "Sailor", "Shipwright", "Smuggler",
  "Soldier", "Urban Bounty Hunter", "Urchin", "Uthgardt Tribe Member", "Waterdhavian Noble",
  "Witchlight Hand", "Celebrity Adventurer's Scion", "Failed Merchant", "Gambler", "Plaintiff",
  "Rival Intern", "Knight of Solamnia", "Mage of High Sorcery", "Gate Warden", "Planar Philosopher",
  "Azorius Functionary", "Boros Legionnaire", "Dimir Operative", "Golgari Agent", "Gruul Anarch",
  "Izzet Engineer", "Orzhov Representative", "Rakdos Cultist", "Selesnya Initiate", "Simic Scientist",
  "Lorehold Student", "Prismari Student", "Quandrix Student", "Silverquill Student",
  "Witherbloom Student", "Astral Drifter", "Wildspacer"
];

const REVISED_BACKGROUND_OPTIONS = [
  "Acolyte", "Artisan", "Charlatan", "Criminal", "Entertainer", "Farmer", "Guard", "Guide", "Hermit",
  "Merchant", "Noble", "Sage", "Sailor", "Scribe", "Soldier", "Wayfarer", "Aberrant Heir",
  "Archaeologist", "House Agent", "House Cannith Heir", "House Deneith Heir", "House Ghallanda Heir",
  "House Jorasco Heir", "House Kundarak Heir", "House Lyrandar Heir", "House Medani Heir",
  "House Orien Heir", "House Phiarlan Heir", "House Sivis Heir", "House Tharashk Heir",
  "House Thuranni Heir", "House Vadalis Heir", "Inquisitive", "Chondathan Freebooter",
  "Dead Magic Dweller", "Dragon Cultist", "Emerald Enclave Caretaker", "Flaming Fist Mercenary",
  "Genie Touched", "Harper", "Ice Fisher", "Knight Of The Gauntlet", "Lords' Alliance Vassal",
  "Moonwell Pilgrim", "Mulhorandi Tomb Raider", "Mythalkeeper", "Purple Dragon Squire",
  "Rashemi Wanderer", "Shadowmasters Exile", "Spellfire Initiate", "Zhentarim Mercenary",
  "Haunted One", "Investigator", "Mist Wanderer", "Spirit Medium", "Carouser", "Lorwyn Expert",
  "Pact Seeker", "Shadowmoor Expert", "Vampire Devotee", "Vampire Survivor"
];

const SPECIES_CATALOG = [
  ...REVISED_SPECIES_OPTIONS.map(name => customizationRecord(name, "D&D Beyond 5.5e catalog", "2024")),
  ...LEGACY_SPECIES_OPTIONS.map(name => customizationRecord(name, "D&D Beyond 5e catalog", "2014"))
];

const BACKGROUND_CATALOG = [
  ...REVISED_BACKGROUND_OPTIONS.map(name => customizationRecord(name, "D&D Beyond 5.5e catalog", "2024")),
  ...LEGACY_BACKGROUND_OPTIONS.map(name => customizationRecord(name, "D&D Beyond 5e catalog", "2014"))
];

const flexibleSpeciesVariant = (name = "Flexible ability increases") => ({
  name,
  choices: [{ amount: 2, count: 1 }, { amount: 1, count: 1, distinct: true }]
});

const SPECIES_RULES_2014 = {
  Human: { variants: [
    { name: "Standard Human", bonuses: { STR: 1, DEX: 1, CON: 1, INT: 1, WIS: 1, CHA: 1 } },
    { name: "Variant Human", choices: [{ amount: 1, count: 2, distinct: true }], featChoice: true }
  ] },
  Dwarf: { variants: [
    { name: "Hill Dwarf", bonuses: { CON: 2, WIS: 1 } },
    { name: "Mountain Dwarf", bonuses: { STR: 2, CON: 2 } },
    flexibleSpeciesVariant("Flexible Dwarf")
  ] },
  Elf: { variants: [
    { name: "High Elf", bonuses: { DEX: 2, INT: 1 } },
    { name: "Wood Elf", bonuses: { DEX: 2, WIS: 1 } },
    { name: "Drow", bonuses: { DEX: 2, CHA: 1 } },
    flexibleSpeciesVariant("Flexible Elf")
  ] },
  Halfling: { variants: [
    { name: "Lightfoot Halfling", bonuses: { DEX: 2, CHA: 1 } },
    { name: "Stout Halfling", bonuses: { DEX: 2, CON: 1 } },
    flexibleSpeciesVariant("Flexible Halfling")
  ] },
  Dragonborn: { variants: [
    { name: "Player's Handbook Dragonborn", bonuses: { STR: 2, CHA: 1 } },
    flexibleSpeciesVariant("Flexible Dragonborn")
  ] },
  Gnome: { variants: [
    { name: "Forest Gnome", bonuses: { DEX: 1, INT: 2 } },
    { name: "Rock Gnome", bonuses: { CON: 1, INT: 2 } },
    { name: "Deep Gnome", bonuses: { DEX: 1, INT: 2 } },
    flexibleSpeciesVariant("Flexible Gnome")
  ] },
  "Half-Elf": { variants: [
    { name: "Half-Elf", bonuses: { CHA: 2 }, choices: [{ amount: 1, count: 2, exclude: ["CHA"], distinct: true }] }
  ] },
  "Half-Orc": { variants: [{ name: "Half-Orc", bonuses: { STR: 2, CON: 1 } }] },
  Tiefling: { variants: [
    { name: "Player's Handbook Tiefling", bonuses: { INT: 1, CHA: 2 } },
    flexibleSpeciesVariant("Flexible Tiefling")
  ] },
  Aarakocra: { variants: [
    { name: "Legacy Aarakocra", bonuses: { DEX: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Aasimar: { variants: [
    { name: "Protector Aasimar", bonuses: { WIS: 1, CHA: 2 } },
    { name: "Scourge Aasimar", bonuses: { CON: 1, CHA: 2 } },
    { name: "Fallen Aasimar", bonuses: { STR: 1, CHA: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Changeling: { variants: [
    { name: "Eberron Changeling", bonuses: { CHA: 2 }, choices: [{ amount: 1, count: 1, exclude: ["CHA"] }] },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Deep Gnome": { variants: [
    { name: "Legacy Deep Gnome", bonuses: { DEX: 1, INT: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Duergar: { variants: [
    { name: "Legacy Duergar", bonuses: { STR: 1, CON: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Eladrin: { variants: [
    { name: "Legacy Eladrin", bonuses: { DEX: 2, CHA: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Fairy: { variants: [flexibleSpeciesVariant()] },
  Firbolg: { variants: [
    { name: "Legacy Firbolg", bonuses: { STR: 1, WIS: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Genasi (Air)": { variants: [
    { name: "Legacy Air Genasi", bonuses: { DEX: 1, CON: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Genasi (Earth)": { variants: [
    { name: "Legacy Earth Genasi", bonuses: { STR: 1, CON: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Genasi (Fire)": { variants: [
    { name: "Legacy Fire Genasi", bonuses: { CON: 2, INT: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Genasi (Water)": { variants: [
    { name: "Legacy Water Genasi", bonuses: { CON: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Githyanki: { variants: [
    { name: "Legacy Githyanki", bonuses: { STR: 2, INT: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Githzerai: { variants: [
    { name: "Legacy Githzerai", bonuses: { INT: 1, WIS: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Goliath: { variants: [
    { name: "Legacy Goliath", bonuses: { STR: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Harengon: { variants: [flexibleSpeciesVariant()] },
  Kenku: { variants: [
    { name: "Legacy Kenku", bonuses: { DEX: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Locathah: { variants: [{ name: "Locathah", bonuses: { STR: 2, DEX: 1 } }] },
  Owlin: { variants: [flexibleSpeciesVariant()] },
  Satyr: { variants: [
    { name: "Legacy Satyr", bonuses: { DEX: 1, CHA: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Sea Elf": { variants: [
    { name: "Legacy Sea Elf", bonuses: { DEX: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Shadar-Kai": { variants: [
    { name: "Legacy Shadar-Kai", bonuses: { DEX: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Tabaxi: { variants: [
    { name: "Legacy Tabaxi", bonuses: { DEX: 2, CHA: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Tortle: { variants: [
    { name: "Legacy Tortle", bonuses: { STR: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Triton: { variants: [
    { name: "Legacy Triton", bonuses: { STR: 1, CON: 1, CHA: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Verdan: { variants: [{ name: "Verdan", bonuses: { CON: 1, CHA: 2 } }] },
  Bugbear: { variants: [
    { name: "Legacy Bugbear", bonuses: { STR: 2, DEX: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Centaur: { variants: [
    { name: "Legacy Centaur", bonuses: { STR: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Goblin: { variants: [
    { name: "Legacy Goblin", bonuses: { DEX: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Grung: { variants: [{ name: "Grung", bonuses: { DEX: 2, CON: 1 } }] },
  Hobgoblin: { variants: [
    { name: "Legacy Hobgoblin", bonuses: { CON: 2, INT: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Kobold: { variants: [
    { name: "Legacy Kobold", bonuses: { DEX: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Lizardfolk: { variants: [
    { name: "Legacy Lizardfolk", bonuses: { CON: 2, WIS: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Minotaur: { variants: [
    { name: "Legacy Minotaur", bonuses: { STR: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Orc: { variants: [
    { name: "Eberron Orc", bonuses: { STR: 2, CON: 1 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Shifter: { variants: [
    { name: "Beasthide Shifter", bonuses: { STR: 1, CON: 2 } },
    { name: "Longtooth Shifter", bonuses: { STR: 2, DEX: 1 } },
    { name: "Swiftstride Shifter", bonuses: { DEX: 2, CHA: 1 } },
    { name: "Wildhunt Shifter", bonuses: { DEX: 1, WIS: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  "Yuan-Ti": { variants: [
    { name: "Legacy Yuan-Ti Pureblood", bonuses: { INT: 1, CHA: 2 } },
    flexibleSpeciesVariant("Monsters of the Multiverse")
  ] },
  Kender: { variants: [flexibleSpeciesVariant()] },
  Kalashtar: { variants: [{ name: "Kalashtar", bonuses: { WIS: 2, CHA: 1 } }] },
  Warforged: { variants: [
    { name: "Warforged", bonuses: { CON: 2 }, choices: [{ amount: 1, count: 1, exclude: ["CON"] }] }
  ] },
  Dhampir: { variants: [flexibleSpeciesVariant()] },
  Hexblood: { variants: [flexibleSpeciesVariant()] },
  Reborn: { variants: [flexibleSpeciesVariant()] },
  Loxodon: { variants: [{ name: "Loxodon", bonuses: { CON: 2, WIS: 1 } }] },
  "Simic Hybrid": { variants: [
    { name: "Simic Hybrid", bonuses: { CON: 2 }, choices: [{ amount: 1, count: 1, exclude: ["CON"] }] }
  ] },
  Vedalken: { variants: [{ name: "Vedalken", bonuses: { INT: 2, WIS: 1 } }] },
  "Astral Elf": { variants: [flexibleSpeciesVariant()] },
  Autognome: { variants: [flexibleSpeciesVariant()] },
  Giff: { variants: [flexibleSpeciesVariant()] },
  Hadozee: { variants: [flexibleSpeciesVariant()] },
  Plasmoid: { variants: [flexibleSpeciesVariant()] },
  "Thri-kreen": { variants: [flexibleSpeciesVariant()] },
  Leonin: { variants: [{ name: "Leonin", bonuses: { STR: 1, CON: 2 } }] },
  Custom: { variants: [
    { ...flexibleSpeciesVariant("Custom Lineage"), featChoice: true }
  ] }
};

LEGACY_SPECIES_OPTIONS.forEach(name => {
  if (!SPECIES_RULES_2014[name]) SPECIES_RULES_2014[name] = { variants: [flexibleSpeciesVariant()] };
});

const BACKGROUND_RULES_2024 = {
  "Acolyte": { abilities: ["INT","WIS","CHA"], feat: "Magic Initiate (Cleric)" },
  "Artisan": { abilities: ["STR","DEX","INT"], feat: "Crafter" },
  "Charlatan": { abilities: ["DEX","CON","CHA"], feat: "Skilled" },
  "Criminal": { abilities: ["DEX","CON","INT"], feat: "Alert" },
  "Entertainer": { abilities: ["STR","DEX","CHA"], feat: "Musician" },
  "Farmer": { abilities: ["STR","CON","WIS"], feat: "Tough" },
  "Guard": { abilities: ["STR","INT","WIS"], feat: "Alert" },
  "Guide": { abilities: ["DEX","CON","WIS"], feat: "Magic Initiate (Druid)" },
  "Hermit": { abilities: ["CON","WIS","CHA"], feat: "Healer" },
  "Merchant": { abilities: ["CON","INT","CHA"], feat: "Lucky" },
  "Noble": { abilities: ["STR","INT","CHA"], feat: "Skilled" },
  "Sage": { abilities: ["CON","INT","WIS"], feat: "Magic Initiate (Wizard)" },
  "Sailor": { abilities: ["STR","DEX","WIS"], feat: "Tavern Brawler" },
  "Scribe": { abilities: ["DEX","INT","WIS"], feat: "Skilled" },
  "Soldier": { abilities: ["STR","DEX","CON"], feat: "Savage Attacker" },
  "Wayfarer": { abilities: ["DEX","WIS","CHA"], feat: "Lucky" },
  "Aberrant Heir": { abilities: ["STR","CON","CHA"], feat: "Aberrant Dragonmark" },
  "Archaeologist": { abilities: ["DEX","INT","WIS"], feat: "Skilled" },
  "House Agent": { abilities: ["STR","INT","CHA"], feat: "Lucky" },
  "House Cannith Heir": { abilities: ["STR","DEX","INT"], feat: "Mark of Making" },
  "House Deneith Heir": { abilities: ["STR","CON","WIS"], feat: "Mark of Sentinel" },
  "House Ghallanda Heir": { abilities: ["DEX","WIS","CHA"], feat: "Mark of Hospitality" },
  "House Jorasco Heir": { abilities: ["DEX","CON","WIS"], feat: "Mark of Healing" },
  "House Kundarak Heir": { abilities: ["STR","CON","INT"], feat: "Mark of Warding" },
  "House Lyrandar Heir": { abilities: ["STR","DEX","CHA"], feat: "Mark of Storm" },
  "House Medani Heir": { abilities: ["DEX","INT","WIS"], feat: "Mark of Detection" },
  "House Orien Heir": { abilities: ["DEX","CON","INT"], feat: "Mark of Passage" },
  "House Phiarlan Heir": { abilities: ["DEX","WIS","CHA"], feat: "Mark of Shadow" },
  "House Sivis Heir": { abilities: ["INT","WIS","CHA"], feat: "Mark of Scribing" },
  "House Tharashk Heir": { abilities: ["CON","INT","WIS"], feat: "Mark of Finding" },
  "House Thuranni Heir": { abilities: ["DEX","INT","CHA"], feat: "Mark of Shadow" },
  "House Vadalis Heir": { abilities: ["CON","WIS","CHA"], feat: "Mark of Handling" },
  "Inquisitive": { abilities: ["CON","INT","CHA"], feat: "Alert" },
  "Chondathan Freebooter": { abilities: ["STR","DEX","WIS"], feat: "Skilled" },
  "Dead Magic Dweller": { abilities: ["STR","CON","WIS"], feat: "Healer" },
  "Dragon Cultist": { abilities: ["DEX","CON","INT"], feat: "Cult of the Dragon Initiate" },
  "Emerald Enclave Caretaker": { abilities: ["CON","INT","WIS"], feat: "Emerald Enclave Fledgling" },
  "Flaming Fist Mercenary": { abilities: ["STR","CON","CHA"], feat: "Tough" },
  "Genie Touched": { abilities: ["DEX","WIS","CHA"], feat: "Magic Initiate (Wizard)" },
  "Harper": { abilities: ["DEX","INT","CHA"], feat: "Harper Agent" },
  "Ice Fisher": { abilities: ["STR","DEX","CON"], feat: "Alert" },
  "Knight Of The Gauntlet": { abilities: ["STR","INT","WIS"], feat: "Tyro of the Gauntlet" },
  "Lords' Alliance Vassal": { abilities: ["STR","INT","CHA"], feat: "Lords' Alliance Agent" },
  "Moonwell Pilgrim": { abilities: ["CON","WIS","CHA"], feat: "Magic Initiate (Druid)" },
  "Mulhorandi Tomb Raider": { abilities: ["DEX","CON","INT"], feat: "Lucky" },
  "Mythalkeeper": { abilities: ["INT","WIS","CHA"], feat: "Crafter" },
  "Purple Dragon Squire": { abilities: ["STR","WIS","CHA"], feat: "Purple Dragon Rook" },
  "Rashemi Wanderer": { abilities: ["STR","CON","CHA"], feat: "Tough" },
  "Shadowmasters Exile": { abilities: ["DEX","INT","CHA"], feat: "Savage Attacker" },
  "Spellfire Initiate": { abilities: ["CON","INT","CHA"], feat: "Spellfire Spark" },
  "Zhentarim Mercenary": { abilities: ["STR","DEX","CHA"], feat: "Zhentarim Ruffian" },
  "Haunted One": { abilities: ["CON","WIS","CHA"], featChoice: "Choose Survivor or a Dark Gift feat" },
  "Investigator": { abilities: ["INT","WIS","CHA"], featChoice: "Choose Sharp Eye or a Dark Gift feat" },
  "Mist Wanderer": { abilities: ["DEX","CON","WIS"], featChoice: "Choose a Dark Gift feat" },
  "Spirit Medium": { abilities: ["CON","INT","WIS"], featChoice: "Choose a Dark Gift feat" },
  "Carouser": { abilities: ["DEX","INT","CHA"], feat: "Tireless Reveler" },
  "Lorwyn Expert": { abilities: ["STR","CON","WIS"], feat: "Child of the Sun" },
  "Pact Seeker": { abilities: ["CON","INT","CHA"], featChoice: "Choose a Planar Pact feat" },
  "Shadowmoor Expert": { abilities: ["DEX","INT","CHA"], feat: "Shadowmoor Hexer" },
  "Vampire Devotee": { abilities: ["STR","CON","CHA"], feat: "Vampire's Plaything" },
  "Vampire Survivor": { abilities: ["DEX","CON","WIS"], feat: "Vampire Hunter" }
};

const FEAT_ABILITY_OPTIONS_2024 = {
  "Actor": ["CHA"],
  "Athlete": ["STR", "DEX"],
  "Charger": ["STR", "DEX"],
  "Chef": ["CON", "WIS"],
  "Crossbow Expert": ["DEX"],
  "Crusher": ["STR", "CON"],
  "Defensive Duelist": ["DEX"],
  "Dual Wielder": ["STR", "DEX"],
  "Durable": ["CON"],
  "Elemental Adept": ["INT", "WIS", "CHA"],
  "Fey Touched": ["INT", "WIS", "CHA"],
  "Grappler": ["STR", "DEX"],
  "Great Weapon Master": ["STR"],
  "Heavily Armored": ["STR", "CON"],
  "Heavy Armor Master": ["STR", "CON"],
  "Inspiring Leader": ["WIS", "CHA"],
  "Keen Mind": ["INT"],
  "Lightly Armored": ["STR", "DEX"],
  "Mage Slayer": ["STR", "DEX"],
  "Martial Weapon Training": ["STR", "DEX"],
  "Medium Armor Master": ["STR", "DEX"],
  "Moderately Armored": ["STR", "DEX"],
  "Mounted Combatant": ["STR", "DEX", "WIS"],
  "Observant": ["INT", "WIS"],
  "Piercer": ["STR", "DEX"],
  "Poisoner": ["DEX", "INT"],
  "Polearm Master": ["STR", "DEX"],
  "Resilient": ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
  "Ritual Caster": ["INT", "WIS", "CHA"],
  "Sentinel": ["STR", "DEX"],
  "Shadow Touched": ["INT", "WIS", "CHA"],
  "Sharpshooter": ["DEX"],
  "Shield Master": ["STR"],
  "Skill Expert": ["STR", "DEX", "CON", "INT", "WIS", "CHA"],
  "Skulker": ["DEX"],
  "Slasher": ["STR", "DEX"],
  "Speedy": ["DEX", "CON"],
  "Spell Sniper": ["INT", "WIS", "CHA"],
  "Telekinetic": ["INT", "WIS", "CHA"],
  "Telepathic": ["INT", "WIS", "CHA"],
  "War Caster": ["INT", "WIS", "CHA"],
  "Weapon Master": ["STR", "DEX"],
  "Cold Caster": ["INT", "WIS", "CHA"],
  "Dragonscarred": ["CON", "CHA"],
  "Enclave Magic": ["INT", "WIS", "CHA"],
  "Fairy Trickster": ["DEX", "CHA"],
  "Genie Magic": ["INT", "WIS", "CHA"],
  "Harper Teamwork": ["DEX", "CHA"],
  "Lordly Resolve": ["STR", "CHA"],
  "Mythal Touched": ["INT", "WIS", "CHA"],
  "Order's Resilience": ["STR", "WIS", "CHA"],
  "Purple Dragon Commandant": ["STR", "DEX"],
  "Spellfire Adept": ["INT", "WIS", "CHA"],
  "Street Justice": ["STR", "DEX"],
  "Zhentarim Tactics": ["DEX", "CHA"],
  "Bloodlust": ["STR", "DEX", "CON"],
  "Bomber": ["DEX"],
  "Cloying Mists": ["INT", "WIS", "CHA"],
  "Light Bringer": ["INT", "WIS", "CHA"],
  "Treacherous Allure": ["INT", "WIS", "CHA"],
  "Vampire Touched": ["INT", "WIS", "CHA"],
  "Boon of Irresistible Offense": ["STR", "DEX"],
  "Boon of Spell Recall": ["INT", "WIS", "CHA"],
  "Boon of Communication": ["INT", "WIS", "CHA"],
  "Boon of Desperate Resilience": ["STR", "CON"],
  "Boon of Fluid Forms": ["INT", "WIS", "CHA"],
  "Boon of Revelry": ["INT", "WIS", "CHA"],
  "Boon of Terror": ["CHA"],
  "Boon of the Bright Sun": ["CON", "WIS", "CHA"],
  "Boon of the Furious Storm": ["INT", "WIS", "CHA"],
  "Boon of Misty Escape": ["INT", "WIS", "CHA"],
  "Greater Aberrant Mark": ["CON"],
  "Fey Sentinel": ["INT", "WIS", "CHA"],
  "Infernal Bulwark": ["CON", "CHA"],
  "Infernal Dragoon": ["CON", "CHA"]
};

const CATALOG_SPELL_ADDITIONS = {
  2014: {
    Artificer: {
      3: ["Elemental Weapon"],
      4: ["Leomund's Secret Chest", "Mordenkainen's Faithful Hound"],
      5: ["Bigby's Hand"]
    },
    Bard: {
      0: ["Blade Ward", "Friends"],
      1: ["Color Spray", "Command", "Dissonant Whispers"],
      2: ["Aid", "Cloud of Daggers", "Crown of Madness", "Enlarge/Reduce", "Mirror Image", "Phantasmal Force"],
      3: ["Feign Death", "Leomund's Tiny Hut", "Mass Healing Word", "Slow"],
      4: ["Phantasmal Killer"],
      5: ["Rary's Telepathic Bond"],
      6: ["Heroes' Feast", "Otto's Irresistible Dance"],
      7: ["Mordenkainen's Sword", "Prismatic Spray"],
      8: ["Antipathy/Sympathy"],
      9: ["Prismatic Wall"]
    },
    Cleric: {
      3: ["Aura of Vitality", "Feign Death"],
      4: ["Aura of Life", "Aura of Purity"],
      6: ["Sunbeam"],
      8: ["Sunburst"]
    },
    Druid: {
      0: ["Thorn Whip"],
      1: ["Protection from Evil and Good"],
      2: ["Augury", "Beast Sense", "Continual Flame", "Enlarge/Reduce"],
      3: ["Aura of Vitality", "Elemental Weapon", "Feign Death", "Revivify"],
      4: ["Divination", "Fire Shield", "Grasping Vine"],
      5: ["Cone of Cold"],
      6: ["Flesh to Stone"],
      7: ["Symbol"],
      8: ["Incendiary Cloud"]
    },
    Paladin: {
      1: ["Searing Smite", "Thunderous Smite"],
      2: ["Gentle Repose", "Prayer of Healing", "Warding Bond"],
      3: ["Aura of Vitality", "Elemental Weapon"],
      4: ["Aura of Life", "Aura of Purity", "Staggering Smite"],
      5: ["Banishing Smite", "Circle of Power", "Destructive Wave"]
    },
    Ranger: {
      1: ["Ensnaring Strike", "Entangle", "Hail of Thorns", "Searing Smite"],
      2: ["Aid", "Beast Sense", "Cordon of Arrows", "Enhance Ability", "Gust of Wind", "Magic Weapon"],
      3: ["Conjure Barrage", "Elemental Weapon", "Lightning Arrow", "Meld into Stone", "Revivify"],
      4: ["Dominate Beast", "Grasping Vine"],
      5: ["Conjure Volley", "Greater Restoration", "Swift Quiver"]
    },
    Sorcerer: {
      0: ["Blade Ward", "Friends"],
      1: ["Chromatic Orb", "Grease", "Witch Bolt"],
      2: ["Cloud of Daggers", "Crown of Madness", "Flame Blade", "Flaming Sphere", "Magic Weapon", "Phantasmal Force"],
      3: ["Vampiric Touch"],
      4: ["Fire Shield"],
      5: ["Bigby's Hand"],
      6: ["Arcane Gate", "Flesh to Stone", "Otiluke's Freezing Sphere"],
      8: ["Demiplane"]
    },
    Warlock: {
      0: ["Blade Ward", "Friends"],
      1: ["Armor of Agathys", "Arms of Hadar", "Hex", "Witch Bolt"],
      2: ["Cloud of Daggers", "Crown of Madness", "Flock of Familiars"],
      3: ["Hunger Of Hadar"],
      4: ["Galder's Speedy Courier"],
      5: ["Mislead", "Planar Binding", "Teleportation Circle"],
      6: ["Arcane Gate"],
      9: ["Gate", "Weird"]
    },
    Wizard: {
      0: ["Blade Ward", "Friends"],
      1: ["Chromatic Orb", "Tenser's Floating Disk", "Witch Bolt"],
      2: ["Augury", "Cloud of Daggers", "Crown of Madness", "Enhance Ability", "Flock of Familiars", "Melf's Acid Arrow", "Nystul's Magic Aura", "Phantasmal Force"],
      3: ["Feign Death", "Galder's Tower", "Leomund's Tiny Hut", "Speak with Dead"],
      4: ["Divination", "Evard's Black Tentacles", "Galder's Speedy Courier", "Leomund's Secret Chest", "Mordenkainen's Faithful Hound"],
      5: ["Bigby's Hand", "Rary's Telepathic Bond"],
      6: ["Arcane Gate", "Drawmij's Instant Summons", "Otiluke's Freezing Sphere", "Otto's Irresistible Dance"],
      7: ["Mordenkainen's Sword"],
      8: ["Telepathy"]
    }
  },
  2024: {
    Artificer: {
      0: ["Elementalism", "True Strike"],
      2: ["Arcane Vigor", "Dragon's Breath", "Tortoise Shell"],
      3: ["Elemental Weapon"],
      4: ["Leomund's Secret Chest"],
      5: ["Bigby's Hand", "Circle Of Power"]
    },
    Bard: {
      0: ["Blade Ward", "Friends"],
      1: ["Insidious Rhythm"],
      2: ["Cloud Of Daggers", "Crown Of Madness"],
      3: ["Astral Flood", "Feign Death", "Leomund's Tiny Hut"],
      4: ["Fount of Moonlight"],
      5: ["Rary's Telepathic Bond", "Yolande's Regal Presence"],
      6: ["Leomund's Lamentable Belaborment", "Otto's Irresistible Dance"],
      7: ["Mordenkainen's Sword", "Power Word Fortify"]
    },
    Cleric: {
      2: ["Searing Orb"],
      3: ["Astral Flood", "Aura of Vitality", "Feign Death"],
      4: ["Aura of Purity", "Sticks to Snakes"],
      5: ["Circle Of Power"],
      7: ["Power Word Fortify"]
    },
    Druid: {
      1: ["Buzzing Bee"],
      2: ["Beast Sense", "Tortoise Shell"],
      3: ["Aura of Vitality", "Elemental Weapon", "Feign Death"],
      4: ["Fount of Moonlight", "Grasping Vine", "Sticks to Snakes"]
    },
    Paladin: {
      1: ["Thunderous Smite"],
      2: ["Searing Orb"],
      3: ["Aura of Vitality", "Elemental Weapon"],
      4: ["Aura of Purity", "Staggering Smite"],
      5: ["Banishing Smite", "Circle Of Power", "Destructive Wave"]
    },
    Ranger: {
      1: ["Buzzing Bee", "Hail of Thorns"],
      2: ["Beast Sense", "Cordon Of Arrows", "Tortoise Shell"],
      3: ["Conjure Barrage", "Elemental Weapon", "Lightning Arrow"],
      4: ["Grasping Vine", "Sticks to Snakes"],
      5: ["Conjure Volley", "Swift Quiver"]
    },
    Sorcerer: {
      0: ["Blade Ward", "Friends"],
      1: ["Buzzing Bee"],
      2: ["Arcane Vigor", "Cloud Of Daggers", "Crown Of Madness"],
      3: ["Astral Flood"],
      5: ["Bigby's Hand"],
      6: ["Arcane Gate", "Leomund's Lamentable Belaborment", "Otiluke's Freezing Sphere"]
    },
    Warlock: {
      0: ["Blade Ward", "Friends"],
      1: ["Armor of Agathys", "Arms of Hadar", "Tasha's Hideous Laughter"],
      2: ["Cloud Of Daggers", "Crown Of Madness"],
      5: ["Jallarzi's Storm of Radiance"],
      6: ["Arcane Gate", "Tasha's Bubbling Cauldron"],
      7: ["Void Star"]
    },
    Wizard: {
      0: ["Blade Ward", "Friends"],
      1: ["Buzzing Bee", "Tenser's Floating Disk"],
      2: ["Arcane Vigor", "Cloud Of Daggers", "Crown Of Madness", "Melf's Acid Arrow", "Nystul's Magic Aura"],
      3: ["Astral Flood", "Feign Death", "Leomund's Tiny Hut"],
      4: ["Evard's Black Tentacles", "Leomund's Secret Chest", "Mordenkainen's Faithful Hound"],
      5: ["Bigby's Hand", "Circle Of Power", "Jallarzi's Storm of Radiance", "Rary's Telepathic Bond", "Yolande's Regal Presence"],
      6: ["Arcane Gate", "Drawmij's Instant Summons", "Leomund's Lamentable Belaborment", "Otiluke's Freezing Sphere", "Otto's Irresistible Dance", "Tasha's Bubbling Cauldron"],
      7: ["Mordenkainen's Sword", "Void Star"],
      8: ["Telepathy"]
    }
  }
};

Object.entries(CATALOG_SPELL_ADDITIONS).forEach(([rulesEdition, classes]) => {
  Object.entries(classes).forEach(([className, spells]) => {
    addExpandedSpells(rulesEdition, className, spells, "D&D Beyond option catalog");
  });
});

addFeatCatalog(2024, "Legacy D&D Beyond catalog", "General", [
  "Dungeon Delver", "Linguist", "Martial Adept", "Mobile", "Svirfneblin Magic"
], true);
FEATS[2024].sort((a, b) => a.name.localeCompare(b.name));

const CATALOG_SUBCLASSES_2024 = {
  Artificer: ["Reanimator", [
    [3, "Reanimator Spells"], [3, "Reanimator's Skill Set"], [3, "Reanimated Companion"],
    [5, "Strange Modifications"], [9, "Improved Reanimation"], [9, "Macabre Modifications"],
    [15, "Refined Reanimation"]
  ]],
  Ranger: ["Hollow Warden", [
    [3, "Hollow Warden Spells"], [3, "Wrath of the Wild"], [7, "Hungering Might"],
    [11, "Rot and Violence"], [15, "Ancient Might"]
  ]],
  Sorcerer: ["Shadow Sorcery", [
    [3, "Shadow Spells"], [3, "Power of Shadow"], [6, "Beasts of Ill Omen"],
    [14, "Shadow Walk"], [18, "Umbral Form"]
  ]],
  Warlock: ["Undead Patron", [
    [3, "Form of Dread"], [3, "Undead Spells"], [6, "Grave Touched"],
    [10, "Necrotic Husk"], [14, "Superior Dread"]
  ]]
};

Object.entries(CATALOG_SUBCLASSES_2024).forEach(([className, [name, features]]) => {
  if (!SUBCLASS_CATALOG[className].some(item => item.name === name && item.rules === "2024")) {
    SUBCLASS_CATALOG[className].push(subclassRecord(name, "Ravenloft: The Horrors Within", "2024"));
  }
  SUBCLASS_FEATURES[2024][name] = features;
});
