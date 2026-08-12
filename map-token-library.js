(function initMapTokenLibrary(root) {
  "use strict";

  const FEATURED_PRESETS = [
    { id: "town-guard", name: "Town Guard", category: "NPC", role: "Defender", color: "#315b78", ac: 16, hp: 18, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2", side: "ally" },
    { id: "veteran", name: "Veteran", category: "NPC", role: "Frontliner", color: "#5b6170", ac: 17, hp: 58, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d8 + 3", side: "ally" },
    { id: "scout", name: "Scout", category: "NPC", role: "Skirmisher", color: "#47704f", ac: 13, hp: 20, initiativeBonus: 3, attackBonus: 4, saveDc: 12, damage: "1d8 + 2", side: "ally" },
    { id: "apprentice-mage", name: "Apprentice Mage", category: "NPC", role: "Spellcaster", color: "#594d89", ac: 12, hp: 18, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "2d6", side: "ally" },
    { id: "temple-priest", name: "Temple Priest", category: "NPC", role: "Support", color: "#92713b", ac: 14, hp: 27, initiativeBonus: 0, attackBonus: 4, saveDc: 13, damage: "1d8 + 2", side: "ally" },
    { id: "travelling-merchant", name: "Travelling Merchant", category: "NPC", role: "Civilian", color: "#8b5b38", ac: 10, hp: 9, initiativeBonus: 0, attackBonus: 1, saveDc: 10, damage: "1d4", side: "ally" },
    { id: "goblin-raider", name: "Goblin Raider", category: "Humanoid", role: "Skirmisher", color: "#4e7135", ac: 15, hp: 10, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "1d6 + 2" },
    { id: "orc-warrior", name: "Orc Warrior", category: "Humanoid", role: "Brute", color: "#61733b", ac: 13, hp: 24, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d12 + 3" },
    { id: "kobold-skirmisher", name: "Kobold Skirmisher", category: "Humanoid", role: "Ambusher", color: "#9a5135", ac: 12, hp: 8, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "1d6 + 2" },
    { id: "gnoll-hunter", name: "Gnoll Hunter", category: "Fiend", role: "Hunter", color: "#7d6539", ac: 15, hp: 27, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2" },
    { id: "hobgoblin-soldier", name: "Hobgoblin Soldier", category: "Humanoid", role: "Soldier", color: "#8b3d35", ac: 18, hp: 18, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2" },
    { id: "bandit-captain", name: "Bandit Captain", category: "Humanoid", role: "Leader", color: "#634a3b", ac: 15, hp: 65, initiativeBonus: 3, attackBonus: 5, saveDc: 13, damage: "1d6 + 3" },
    { id: "wolf", name: "Wolf", category: "Beast", role: "Pack Hunter", color: "#59636a", ac: 13, hp: 12, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "2d4 + 2" },
    { id: "dire-wolf", name: "Dire Wolf", category: "Beast", role: "Large Brute", color: "#3f4850", ac: 14, hp: 42, initiativeBonus: 2, attackBonus: 5, saveDc: 13, damage: "2d6 + 3", size: 2, sizeLabel: "Large" },
    { id: "brown-bear", name: "Brown Bear", category: "Beast", role: "Brute", color: "#6d4d32", ac: 11, hp: 34, initiativeBonus: 0, attackBonus: 5, saveDc: 13, damage: "2d6 + 4", size: 2, sizeLabel: "Large" },
    { id: "giant-spider", name: "Giant Spider", category: "Beast", role: "Controller", color: "#403a47", ac: 14, hp: 26, initiativeBonus: 3, attackBonus: 5, saveDc: 12, damage: "1d8 + 3", size: 2, sizeLabel: "Large" },
    { id: "giant-eagle", name: "Giant Eagle", category: "Beast", role: "Aerial Striker", color: "#806c43", ac: 13, hp: 32, initiativeBonus: 3, attackBonus: 5, saveDc: 12, damage: "2d6 + 3", size: 2, sizeLabel: "Large" },
    { id: "skeleton", name: "Skeleton", category: "Undead", role: "Soldier", color: "#6b7072", ac: 13, hp: 13, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "1d6 + 2" },
    { id: "zombie", name: "Zombie", category: "Undead", role: "Brute", color: "#54644a", ac: 8, hp: 24, initiativeBonus: -2, attackBonus: 3, saveDc: 11, damage: "1d6 + 1" },
    { id: "ghoul", name: "Ghoul", category: "Undead", role: "Controller", color: "#5d5d64", ac: 12, hp: 26, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "2d4 + 2" },
    { id: "wight", name: "Wight", category: "Undead", role: "Commander", color: "#393f52", ac: 14, hp: 48, initiativeBonus: 2, attackBonus: 5, saveDc: 13, damage: "1d8 + 3" },
    { id: "vampire-spawn", name: "Vampire Spawn", category: "Undead", role: "Predator", color: "#7c2e39", ac: 15, hp: 82, initiativeBonus: 3, attackBonus: 6, saveDc: 14, damage: "2d6 + 3" },
    { id: "imp", name: "Imp", category: "Fiend", role: "Infiltrator", color: "#783635", ac: 13, hp: 12, initiativeBonus: 3, attackBonus: 5, saveDc: 11, damage: "1d4 + 3" },
    { id: "hell-hound", name: "Hell Hound", category: "Fiend", role: "Striker", color: "#a44027", ac: 15, hp: 45, initiativeBonus: 1, attackBonus: 5, saveDc: 12, damage: "1d8 + 3" },
    { id: "demon-brute", name: "Demon Brute", category: "Fiend", role: "Brute", color: "#793044", ac: 15, hp: 86, initiativeBonus: 1, attackBonus: 7, saveDc: 14, damage: "2d10 + 4", size: 2, sizeLabel: "Large" },
    { id: "owlbear", name: "Owlbear", category: "Monstrosity", role: "Brute", color: "#71533c", ac: 13, hp: 60, initiativeBonus: 1, attackBonus: 7, saveDc: 14, damage: "2d8 + 5", size: 2, sizeLabel: "Large" },
    { id: "mimic", name: "Mimic", category: "Monstrosity", role: "Ambusher", color: "#74502f", ac: 12, hp: 58, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d8 + 3" },
    { id: "basilisk", name: "Basilisk", category: "Monstrosity", role: "Controller", color: "#557241", ac: 15, hp: 58, initiativeBonus: -1, attackBonus: 5, saveDc: 12, damage: "2d6 + 3", size: 1, sizeLabel: "Medium" },
    { id: "young-dragon", name: "Young Dragon", category: "Dragon", role: "Boss", color: "#8d352d", ac: 18, hp: 145, initiativeBonus: 3, attackBonus: 8, saveDc: 15, damage: "2d10 + 5", size: 2, sizeLabel: "Large" },
    { id: "wyvern", name: "Wyvern", category: "Dragon", role: "Aerial Brute", color: "#4f5d70", ac: 13, hp: 110, initiativeBonus: 0, attackBonus: 7, saveDc: 15, damage: "2d6 + 4", size: 3, sizeLabel: "Huge" },
    { id: "animated-armor", name: "Animated Armor", category: "Construct", role: "Defender", color: "#596778", ac: 18, hp: 34, initiativeBonus: 0, attackBonus: 4, saveDc: 12, damage: "1d6 + 2" },
    { id: "stone-golem", name: "Stone Golem", category: "Construct", role: "Boss", color: "#6a6964", ac: 17, hp: 178, initiativeBonus: -1, attackBonus: 10, saveDc: 17, damage: "3d8 + 6", size: 2, sizeLabel: "Large" },
  ].map(preset => ({ ...preset, source: "DND Beyonder", profileKind: "authored", size: preset.size || 1, sizeLabel: preset.sizeLabel || "Medium" }));

  // Creature names are grouped by the types used in SRD 5.2.1. The application
  // creates original token art and editable map profiles; it does not bundle
  // proprietary monster artwork or reproduce full stat blocks.
  const SRD_BY_CATEGORY = {
    Aberration: "Aboleth|Chuul|Cloaker|Gibbering Mouther|Nothic|Otyugh|Slaad Tadpole",
    Beast: "Allosaurus|Ankylosaurus|Ape|Archelon|Axe Beak|Baboon|Badger|Bat|Black Bear|Blood Hawk|Boar|Brown Bear|Camel|Cat|Constrictor Snake|Crab|Crocodile|Deer|Dire Wolf|Draft Horse|Eagle|Elephant|Elk|Flying Snake|Frog|Giant Ape|Giant Badger|Giant Bat|Giant Boar|Giant Centipede|Giant Constrictor Snake|Giant Crab|Giant Crocodile|Giant Eagle|Giant Elk|Giant Fire Beetle|Giant Frog|Giant Goat|Giant Hyena|Giant Lizard|Giant Octopus|Giant Owl|Giant Rat|Giant Scorpion|Giant Seahorse|Giant Shark|Giant Spider|Giant Toad|Giant Venomous Snake|Giant Vulture|Giant Wasp|Giant Weasel|Giant Wolf Spider|Goat|Hawk|Hippopotamus|Hunter Shark|Hyena|Jackal|Killer Whale|Lion|Lizard|Mammoth|Mastiff|Mule|Octopus|Owl|Panther|Piranha|Plesiosaurus|Polar Bear|Pony|Pteranodon|Rat|Raven|Reef Shark|Riding Horse|Saber-Toothed Tiger|Scorpion|Seahorse|Spider|Stirge|Swarm of Bats|Swarm of Insects|Swarm of Piranhas|Swarm of Rats|Swarm of Ravens|Swarm of Venomous Snakes|Tiger|Triceratops|Tyrannosaurus Rex|Venomous Snake|Vulture|Warhorse|Weasel|Wolf",
    Celestial: "Couatl|Deva|Pegasus|Planetar|Solar|Unicorn",
    Construct: "Animated Armor|Animated Flying Sword|Animated Rug of Smothering|Clay Golem|Flesh Golem|Homunculus|Iron Golem|Shield Guardian|Stone Golem",
    Dragon: "Black Dragon Wyrmling|Young Black Dragon|Adult Black Dragon|Ancient Black Dragon|Blue Dragon Wyrmling|Young Blue Dragon|Adult Blue Dragon|Ancient Blue Dragon|Brass Dragon Wyrmling|Young Brass Dragon|Adult Brass Dragon|Ancient Brass Dragon|Bronze Dragon Wyrmling|Young Bronze Dragon|Adult Bronze Dragon|Ancient Bronze Dragon|Copper Dragon Wyrmling|Young Copper Dragon|Adult Copper Dragon|Ancient Copper Dragon|Gold Dragon Wyrmling|Young Gold Dragon|Adult Gold Dragon|Ancient Gold Dragon|Green Dragon Wyrmling|Young Green Dragon|Adult Green Dragon|Ancient Green Dragon|Red Dragon Wyrmling|Young Red Dragon|Adult Red Dragon|Ancient Red Dragon|Silver Dragon Wyrmling|Young Silver Dragon|Adult Silver Dragon|Ancient Silver Dragon|White Dragon Wyrmling|Young White Dragon|Adult White Dragon|Ancient White Dragon|Dragon Turtle|Half-Dragon|Pseudodragon|Wyvern",
    Elemental: "Air Elemental|Azer Sentinel|Djinni|Dust Mephit|Earth Elemental|Efreeti|Fire Elemental|Gargoyle|Ice Mephit|Invisible Stalker|Magma Mephit|Magmin|Salamander|Steam Mephit|Xorn",
    Fey: "Blink Dog|Centaur Trooper|Dryad|Green Hag|Satyr|Sea Hag|Sprite",
    Fiend: "Balor|Barbed Devil|Bearded Devil|Bone Devil|Chain Devil|Dretch|Erinyes|Glabrezu|Gnoll Warrior|Hell Hound|Hezrou|Horned Devil|Ice Devil|Imp|Incubus|Lemure|Marilith|Nalfeshnee|Night Hag|Nightmare|Quasit|Rakshasa|Succubus|Vrock",
    Giant: "Cloud Giant|Ettin|Fire Giant|Frost Giant|Hill Giant|Ogre|Oni|Stone Giant|Storm Giant|Troll|Troll Limb",
    Humanoid: "Archmage|Assassin|Bandit|Bandit Captain|Berserker|Bugbear Stalker|Bugbear Warrior|Bullywug Bog Sage|Bullywug Warrior|Commoner|Cultist|Cultist Fanatic|Druid|Gladiator|Goblin Boss|Goblin Minion|Goblin Warrior|Grimlock|Guard|Guard Captain|Hobgoblin Captain|Hobgoblin Warrior|Knight|Kobold Warrior|Mage|Merfolk Skirmisher|Noble|Pirate|Pirate Captain|Priest|Priest Acolyte|Sahuagin Warrior|Scout|Spy|Tough|Tough Boss|Warrior Infantry|Warrior Veteran",
    Monstrosity: "Ankheg|Basilisk|Behir|Bulette|Carrion Crawler|Chimera|Cockatrice|Darkmantle|Death Dog|Doppelganger|Drider|Ettercap|Gorgon|Grick|Griffon|Guardian Naga|Harpy|Hippogriff|Hydra|Kraken|Lamia|Medusa|Merrow|Mimic|Minotaur of Baphomet|Owlbear|Phase Spider|Purple Worm|Remorhaz|Roc|Roper|Rust Monster|Sphinx of Lore|Sphinx of Valor|Sphinx of Wonder|Spirit Naga|Tarrasque|Werebear|Wereboar|Wererat|Weretiger|Werewolf|Winter Wolf|Worg",
    Ooze: "Black Pudding|Gelatinous Cube|Gray Ooze|Ochre Jelly",
    Plant: "Awakened Shrub|Awakened Tree|Shambling Mound|Shrieker Fungus|Treant|Violet Fungus",
    Undead: "Ghast|Ghost|Ghoul|Lich|Minotaur Skeleton|Mummy|Mummy Lord|Ogre Zombie|Shadow|Skeleton|Specter|Swarm of Crawling Claws|Vampire|Vampire Familiar|Vampire Spawn|Warhorse Skeleton|Wight|Will-o'-Wisp|Wraith|Zombie",
  };

  const TOKEN_LIBRARY_NOTICE = {
    name: "SRD 5.2.1 creature tokens",
    sourceUrl: "https://www.dndbeyond.com/srd",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/legalcode",
    attribution: "This work includes material from the System Reference Document 5.2.1 (SRD 5.2.1) by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.",
  };

  const CATEGORY_COLORS = {
    Aberration: ["#584177", "#395b6c"], Beast: ["#6b5437", "#475e42"], Celestial: ["#92743f", "#55768b"], Construct: ["#596778", "#74685b"],
    Dragon: ["#843b35", "#42677a"], Elemental: ["#a04b2e", "#377b86"], Fey: ["#6d467d", "#3f7a62"], Fiend: ["#7c3038", "#8e4a29"],
    Giant: ["#665a50", "#536273"], Humanoid: ["#5b6170", "#77503c"], Monstrosity: ["#615075", "#546b42"], NPC: ["#315b78", "#7b5b35"],
    Ooze: ["#587549", "#71507b"], Plant: ["#3f7047", "#6c6534"], Undead: ["#4e5660", "#664357"],
  };

  const CATEGORY_MARKS = {
    NPC: "shield", Humanoid: "blades", Beast: "paw", Undead: "skull", Fiend: "horns", Monstrosity: "eye", Aberration: "eye",
    Dragon: "wings", Construct: "rune", Celestial: "sun", Elemental: "flame", Fey: "leaf", Giant: "mountain", Ooze: "drop", Plant: "leaf",
  };

  const GARGANTUAN_NAMES = new Set("Ancient Black Dragon|Ancient Blue Dragon|Ancient Brass Dragon|Ancient Bronze Dragon|Ancient Copper Dragon|Ancient Gold Dragon|Ancient Green Dragon|Ancient Red Dragon|Ancient Silver Dragon|Ancient White Dragon|Dragon Turtle|Kraken|Purple Worm|Roc|Tarrasque".split("|"));
  const HUGE_NAMES = new Set("Adult Black Dragon|Adult Blue Dragon|Adult Brass Dragon|Adult Bronze Dragon|Adult Copper Dragon|Adult Gold Dragon|Adult Green Dragon|Adult Red Dragon|Adult Silver Dragon|Adult White Dragon|Ankylosaurus|Archelon|Awakened Tree|Balor|Behir|Cloud Giant|Elephant|Fire Giant|Frost Giant|Giant Ape|Hill Giant|Hydra|Mammoth|Remorhaz|Stone Giant|Storm Giant|Treant|Triceratops|Tyrannosaurus Rex".split("|"));
  const LARGE_NAMES = new Set("Air Elemental|Allosaurus|Animated Rug of Smothering|Ankheg|Black Bear|Brown Bear|Bulette|Camel|Carrion Crawler|Centaur Trooper|Chimera|Chuul|Constrictor Snake|Crocodile|Dire Wolf|Djinni|Draft Horse|Earth Elemental|Efreeti|Ettin|Fire Elemental|Flesh Golem|Giant Boar|Giant Constrictor Snake|Giant Crab|Giant Crocodile|Giant Eagle|Giant Elk|Giant Goat|Giant Hyena|Giant Octopus|Giant Owl|Giant Scorpion|Giant Seahorse|Giant Shark|Giant Spider|Giant Toad|Giant Vulture|Gorgon|Griffon|Guardian Naga|Hell Hound|Hippogriff|Hippopotamus|Hunter Shark|Invisible Stalker|Iron Golem|Killer Whale|Lamia|Lion|Manticore|Merrow|Minotaur of Baphomet|Nightmare|Ogre|Oni|Otyugh|Owlbear|Pegasus|Plesiosaurus|Polar Bear|Riding Horse|Saber-Toothed Tiger|Salamander|Shambling Mound|Shield Guardian|Sphinx of Lore|Sphinx of Valor|Spirit Naga|Stone Golem|Troll|Unicorn|Warhorse|Werebear|Wereboar|Weretiger|Winter Wolf|Wyvern|Xorn".split("|"));
  const TINY_NAMES = new Set("Bat|Crab|Frog|Hawk|Homunculus|Imp|Pseudodragon|Rat|Raven|Scorpion|Seahorse|Slaad Tadpole|Spider|Sprite|Weasel".split("|"));
  const SMALL_NAMES = new Set("Awakened Shrub|Baboon|Badger|Blood Hawk|Flying Snake|Goblin Boss|Goblin Minion|Goblin Warrior|Ice Mephit|Kobold Warrior|Magma Mephit|Magmin|Piranha|Quasit|Steam Mephit|Stirge|Venomous Snake".split("|"));

  const PROFILE_BY_SIZE = {
    1: { ac: 13, hp: 18, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "1d8 + 2" },
    2: { ac: 14, hp: 48, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "2d6 + 3" },
    3: { ac: 16, hp: 110, initiativeBonus: 0, attackBonus: 7, saveDc: 15, damage: "2d10 + 4" },
    4: { ac: 18, hp: 220, initiativeBonus: 0, attackBonus: 9, saveDc: 17, damage: "3d10 + 6" },
  };

  function slugify(value) {
    return String(value).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function hashText(value) {
    let hash = 2166136261;
    for (const character of String(value)) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function creatureTokenColor(name, category = "Monstrosity") {
    const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Monstrosity;
    const base = colors[hashText(name) % colors.length];
    const shift = (hashText(`${category}:${name}`) % 13) - 6;
    const value = parseInt(base.slice(1), 16);
    const channels = [value >> 16, (value >> 8) & 255, value & 255].map(channel => Math.max(24, Math.min(220, channel + shift)));
    return `#${channels.map(channel => channel.toString(16).padStart(2, "0")).join("")}`;
  }

  function creatureSize(name) {
    if (GARGANTUAN_NAMES.has(name)) return { size: 4, sizeLabel: "Gargantuan" };
    if (HUGE_NAMES.has(name)) return { size: 3, sizeLabel: "Huge" };
    if (LARGE_NAMES.has(name) || /^Young .* Dragon$/.test(name)) return { size: 2, sizeLabel: "Large" };
    if (TINY_NAMES.has(name)) return { size: 1, sizeLabel: "Tiny" };
    if (SMALL_NAMES.has(name)) return { size: 1, sizeLabel: "Small" };
    return { size: 1, sizeLabel: "Medium" };
  }

  function creatureRole(name, category) {
    if (/Ancient|Tarrasque|Kraken|Lich|Mummy Lord|Solar|Balor|Purple Worm/.test(name)) return "Boss";
    if (/Captain|Boss|Archmage|Veteran|Planetar/.test(name)) return "Leader";
    if (/Mage|Priest|Druid|Sage|Naga|Sphinx/.test(name)) return "Spellcaster";
    if (/Swarm/.test(name)) return "Swarm";
    if (/Assassin|Spy|Stalker|Phase Spider|Mimic/.test(name)) return "Ambusher";
    if (/Giant|Golem|Ogre|Troll|Bear|Boar|Mammoth|Tyrannosaurus/.test(name)) return "Brute";
    if (category === "Beast") return "Wild Creature";
    if (category === "Humanoid") return "Combatant";
    return category;
  }

  function createCreatureTokenPreset(name, category = "Monstrosity") {
    const size = creatureSize(name);
    const profile = { ...PROFILE_BY_SIZE[size.size] };
    if (category === "Construct") profile.ac += 2;
    if (category === "Ooze") { profile.ac = Math.max(8, profile.ac - 3); profile.hp += 16; }
    if (category === "Dragon") { profile.ac += 1; profile.hp += 18 * size.size; }
    if (category === "Undead") profile.hp += 6 * size.size;
    return {
      id: `srd-${slugify(name)}`,
      name,
      category,
      role: creatureRole(name, category),
      color: creatureTokenColor(name, category),
      ...profile,
      ...size,
      side: "enemy",
      source: "SRD 5.2.1",
      sourceUrl: TOKEN_LIBRARY_NOTICE.sourceUrl,
      profileKind: "editable",
    };
  }

  const featuredNames = new Set(FEATURED_PRESETS.map(preset => preset.name.toLowerCase()));
  const SRD_CREATURE_NAMES = Object.values(SRD_BY_CATEGORY).flatMap(names => names.split("|"));
  const SRD_PRESETS = Object.entries(SRD_BY_CATEGORY).flatMap(([category, names]) => names.split("|").map(name => createCreatureTokenPreset(name, category))).filter(preset => !featuredNames.has(preset.name.toLowerCase()));
  const MAP_TOKEN_LIBRARY = [...FEATURED_PRESETS, ...SRD_PRESETS].sort((a, b) => a.name.localeCompare(b.name));
  const TOKEN_BY_ID = new Map(MAP_TOKEN_LIBRARY.map(token => [token.id, token]));
  const portraitCache = new Map();

  function escapeXml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]);
  }

  function tokenMark(category) {
    const mark = CATEGORY_MARKS[category] || "rune";
    if (mark === "shield") return '<path d="M50 18 76 29v20c0 19-11 28-26 35-15-7-26-16-26-35V29Z" fill="none" stroke="#fff" stroke-width="5"/>';
    if (mark === "blades") return '<path d="m28 24 44 52m0-52L28 76" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="none" stroke="#fff" stroke-width="4"/>';
    if (mark === "paw") return '<circle cx="50" cy="57" r="14" fill="#fff"/><circle cx="32" cy="37" r="7" fill="#fff"/><circle cx="47" cy="30" r="7" fill="#fff"/><circle cx="64" cy="35" r="7" fill="#fff"/>';
    if (mark === "skull") return '<path d="M29 47c0-15 9-25 21-25s21 10 21 25c0 11-6 18-12 21v10H41V68c-6-3-12-10-12-21Z" fill="#fff"/><circle cx="42" cy="48" r="5" fill="#222"/><circle cx="58" cy="48" r="5" fill="#222"/>';
    if (mark === "horns") return '<path d="M29 51C13 34 19 19 27 13c-1 14 7 18 15 22m29 16c16-17 10-32 2-38 1 14-7 18-15 22" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M34 62q16-28 32 0L50 81Z" fill="#fff"/>';
    if (mark === "eye") return '<path d="M18 51q32-32 64 0-32 32-64 0Z" fill="none" stroke="#fff" stroke-width="5"/><circle cx="50" cy="51" r="12" fill="#fff"/><circle cx="50" cy="51" r="5" fill="#222"/>';
    if (mark === "wings") return '<path d="M49 45C35 22 19 23 11 27c10 5 13 14 13 25l22 19m5-26c14-23 30-22 38-18-10 5-13 14-13 25L54 71" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="m50 35 8 25-8 21-8-21Z" fill="#fff"/>';
    if (mark === "sun") return '<circle cx="50" cy="50" r="15" fill="#fff"/><path d="M50 19v12m0 38v12M19 50h12m38 0h12M28 28l9 9m26 26 9 9m0-44-9 9M37 63l-9 9" stroke="#fff" stroke-width="5" stroke-linecap="round"/>';
    if (mark === "flame") return '<path d="M52 17c4 18-9 20-3 33 5-8 12-11 15-20 8 11 13 22 9 34-4 14-14 22-25 22-15 0-25-11-24-26 1-14 13-23 28-43Z" fill="#fff"/>';
    if (mark === "leaf") return '<path d="M75 22C43 20 24 36 26 65c18 4 38-4 49-43Z" fill="#fff"/><path d="M27 76c12-21 24-31 43-44" stroke="#213327" stroke-width="5" stroke-linecap="round"/>';
    if (mark === "mountain") return '<path d="m16 75 25-44 10 17 9-14 25 41Z" fill="#fff"/><path d="m35 42 6-11 7 12-7-3Z" fill="#d7dce2"/>';
    if (mark === "drop") return '<path d="M50 17C39 34 27 48 27 62a23 23 0 0 0 46 0c0-14-12-28-23-45Z" fill="#fff"/>';
    return '<path d="m50 18 10 21 22 3-16 16 4 23-20-11-20 11 4-23-16-16 22-3Z" fill="none" stroke="#fff" stroke-width="5"/>';
  }

  function tokenPresetPortrait(presetOrId) {
    const preset = typeof presetOrId === "string" ? TOKEN_BY_ID.get(presetOrId) : presetOrId;
    if (!preset?.name) return "";
    const category = preset.category || preset.creatureType || "Monstrosity";
    const color = preset.color || creatureTokenColor(preset.name, category);
    const cacheKey = `${preset.id || preset.name}:${category}:${color}`;
    if (portraitCache.has(cacheKey)) return portraitCache.get(cacheKey);
    const initials = preset.name.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs><circle cx="50" cy="50" r="49" fill="${escapeXml(color)}"/><circle cx="50" cy="50" r="43" fill="url(#g)" stroke="#f4dfb0" stroke-width="2"/>${tokenMark(category)}<rect x="27" y="71" width="46" height="18" rx="9" fill="#111" fill-opacity=".78"/><text x="50" y="84" text-anchor="middle" fill="#fff" font-family="serif" font-size="14" font-weight="700">${escapeXml(initials)}</text></svg>`;
    const portrait = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    portraitCache.set(cacheKey, portrait);
    return portrait;
  }

  root.MAP_TOKEN_LIBRARY = MAP_TOKEN_LIBRARY;
  root.MAP_TOKEN_TYPES = Object.keys(SRD_BY_CATEGORY);
  root.MAP_SRD_CREATURE_NAMES = SRD_CREATURE_NAMES;
  root.MAP_TOKEN_LIBRARY_NOTICE = TOKEN_LIBRARY_NOTICE;
  root.createCreatureTokenPreset = createCreatureTokenPreset;
  root.creatureTokenColor = creatureTokenColor;
  root.tokenPresetPortrait = tokenPresetPortrait;
  if (typeof module !== "undefined" && module.exports) module.exports = { MAP_TOKEN_LIBRARY, MAP_TOKEN_TYPES: Object.keys(SRD_BY_CATEGORY), MAP_SRD_CREATURE_NAMES: SRD_CREATURE_NAMES, TOKEN_LIBRARY_NOTICE, createCreatureTokenPreset, creatureTokenColor, tokenPresetPortrait };
})(typeof window !== "undefined" ? window : globalThis);
