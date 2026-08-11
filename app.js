const RULES = {
  species: {
    2014: ["Human", "Dwarf", "Elf", "Halfling", "Dragonborn", "Gnome", "Half-Elf", "Half-Orc", "Tiefling"],
    2024: ["Human", "Dwarf", "Elf", "Halfling", "Dragonborn", "Gnome", "Goliath", "Orc", "Tiefling"]
  },
  backgrounds: {
    2014: ["Acolyte", "Charlatan", "Criminal", "Entertainer", "Folk Hero", "Guild Artisan", "Hermit", "Noble", "Outlander", "Sage", "Sailor", "Soldier", "Urchin"],
    2024: ["Acolyte", "Artisan", "Charlatan", "Criminal", "Entertainer", "Farmer", "Guard", "Guide", "Hermit", "Merchant", "Noble", "Sage", "Sailor", "Scribe", "Soldier", "Wayfarer"]
  },
  classes: {
    Barbarian: { icon: "⚔", hit: 12, primary: "STR", save: ["STR", "CON"], subclasses: { 2014: ["Path of the Berserker"], 2024: ["Path of the Berserker"] } },
    Bard: { icon: "♫", hit: 8, primary: "CHA", save: ["DEX", "CHA"], subclasses: { 2014: ["College of Lore"], 2024: ["College of Lore"] } },
    Cleric: { icon: "✦", hit: 8, primary: "WIS", save: ["WIS", "CHA"], subclasses: { 2014: ["Life Domain"], 2024: ["Life Domain"] } },
    Druid: { icon: "❧", hit: 8, primary: "WIS", save: ["INT", "WIS"], subclasses: { 2014: ["Circle of the Land"], 2024: ["Circle of the Land"] } },
    Fighter: { icon: "♜", hit: 10, primary: "STR", save: ["STR", "CON"], subclasses: { 2014: ["Champion"], 2024: ["Champion"] } },
    Monk: { icon: "◉", hit: 8, primary: "DEX", save: ["STR", "DEX"], subclasses: { 2014: ["Way of the Open Hand"], 2024: ["Warrior of the Open Hand"] } },
    Paladin: { icon: "☀", hit: 10, primary: "STR", save: ["WIS", "CHA"], subclasses: { 2014: ["Oath of Devotion"], 2024: ["Oath of Devotion"] } },
    Ranger: { icon: "➶", hit: 10, primary: "DEX", save: ["STR", "DEX"], subclasses: { 2014: ["Hunter"], 2024: ["Hunter"] } },
    Rogue: { icon: "◆", hit: 8, primary: "DEX", save: ["DEX", "INT"], subclasses: { 2014: ["Thief"], 2024: ["Thief"] } },
    Sorcerer: { icon: "✺", hit: 6, primary: "CHA", save: ["CON", "CHA"], subclasses: { 2014: ["Draconic Bloodline"], 2024: ["Draconic Sorcery"] } },
    Warlock: { icon: "☾", hit: 8, primary: "CHA", save: ["WIS", "CHA"], subclasses: { 2014: ["The Fiend"], 2024: ["Fiend Patron"] } },
    Wizard: { icon: "△", hit: 6, primary: "INT", save: ["INT", "WIS"], subclasses: { 2014: ["School of Evocation"], 2024: ["Evoker"] } },
    Artificer: { icon: "A", hit: 8, primary: "INT", save: ["CON", "INT"], origin: "Official expanded class", subclasses: { 2014: ["Alchemist"], 2024: ["Alchemist"] } },
    "Blood Hunter": { icon: "BH", hit: 10, primary: "DEX", save: ["DEX", "INT"], origin: "Critical Role class", subclasses: { 2014: ["Order of the Ghostslayer"], 2024: ["Order of the Ghostslayer"] } }
  }
};

const ABILITIES = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_BUDGET = 27;
const POINT_BUY_COSTS = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
const SKILLS = {
  Acrobatics: "DEX", "Animal Handling": "WIS", Arcana: "INT", Athletics: "STR", Deception: "CHA", History: "INT",
  Insight: "WIS", Intimidation: "CHA", Investigation: "INT", Medicine: "WIS", Nature: "INT", Perception: "WIS",
  Performance: "CHA", Persuasion: "CHA", Religion: "INT", "Sleight of Hand": "DEX", Stealth: "DEX", Survival: "WIS"
};
const CLASS_SKILLS = {
  Barbarian: { count: 2, options: ["Animal Handling", "Athletics", "Intimidation", "Nature", "Perception", "Survival"] },
  Bard: { count: 3, options: Object.keys(SKILLS) },
  Cleric: { count: 2, options: ["History", "Insight", "Medicine", "Persuasion", "Religion"] },
  Druid: { count: 2, options: ["Arcana", "Animal Handling", "Insight", "Medicine", "Nature", "Perception", "Religion", "Survival"] },
  Fighter: { count: 2, options: ["Acrobatics", "Animal Handling", "Athletics", "History", "Insight", "Intimidation", "Perception", "Persuasion", "Survival"] },
  Monk: { count: 2, options: ["Acrobatics", "Athletics", "History", "Insight", "Religion", "Stealth"] },
  Paladin: { count: 2, options: ["Athletics", "Insight", "Intimidation", "Medicine", "Persuasion", "Religion"] },
  Ranger: { count: 3, options: ["Animal Handling", "Athletics", "Insight", "Investigation", "Nature", "Perception", "Stealth", "Survival"] },
  Rogue: { count: 4, options: ["Acrobatics", "Athletics", "Deception", "Insight", "Intimidation", "Investigation", "Perception", "Performance", "Persuasion", "Sleight of Hand", "Stealth"] },
  Sorcerer: { count: 2, options: ["Arcana", "Deception", "Insight", "Intimidation", "Persuasion", "Religion"] },
  Warlock: { count: 2, options: ["Arcana", "Deception", "History", "Intimidation", "Investigation", "Nature", "Religion"] },
  Wizard: { count: 2, options: ["Arcana", "History", "Insight", "Investigation", "Medicine", "Nature", "Religion"] },
  Artificer: { count: 2, options: ["Arcana", "History", "Investigation", "Medicine", "Nature", "Perception", "Sleight of Hand"] },
  "Blood Hunter": { count: 3, options: ["Acrobatics", "Arcana", "Athletics", "History", "Insight", "Investigation", "Religion", "Survival"] }
};
const BACKGROUND_SKILLS = {
  Acolyte: ["Insight", "Religion"], Artisan: ["Investigation", "Persuasion"], Charlatan: ["Deception", "Sleight of Hand"],
  Criminal: ["Deception", "Stealth"], Entertainer: ["Acrobatics", "Performance"], Farmer: ["Animal Handling", "Nature"],
  "Folk Hero": ["Animal Handling", "Survival"], "Guild Artisan": ["Insight", "Persuasion"], Guard: ["Athletics", "Perception"],
  Guide: ["Stealth", "Survival"], Hermit: ["Medicine", "Religion"], Merchant: ["Animal Handling", "Persuasion"],
  Noble: ["History", "Persuasion"], Outlander: ["Athletics", "Survival"], Sage: ["Arcana", "History"],
  Sailor: ["Athletics", "Perception"], Scribe: ["Investigation", "Perception"], Soldier: ["Athletics", "Intimidation"],
  Urchin: ["Sleight of Hand", "Stealth"], Wayfarer: ["Insight", "Stealth"]
};
const SPELLCASTING_ABILITIES = {
  Bard: "CHA", Cleric: "WIS", Druid: "WIS", Paladin: "CHA", Ranger: "WIS", Sorcerer: "CHA",
  Warlock: "CHA", Wizard: "INT", Artificer: "INT"
};
const ARMOR_RULES = {
  "Padded Armor": { base: 11, dex: Infinity, type: "Light Armor" },
  "Leather Armor": { base: 11, dex: Infinity, type: "Light Armor" },
  "Studded Leather Armor": { base: 12, dex: Infinity, type: "Light Armor" },
  "Hide Armor": { base: 12, dex: 2, type: "Medium Armor" },
  "Chain Shirt": { base: 13, dex: 2, type: "Medium Armor" },
  "Scale Mail": { base: 14, dex: 2, type: "Medium Armor" },
  Breastplate: { base: 14, dex: 2, type: "Medium Armor" },
  "Half Plate Armor": { base: 15, dex: 2, type: "Medium Armor" },
  "Ring Mail": { base: 14, dex: 0, type: "Heavy Armor" },
  "Chain Mail": { base: 16, dex: 0, type: "Heavy Armor" },
  "Splint Armor": { base: 17, dex: 0, type: "Heavy Armor" },
  "Plate Armor": { base: 18, dex: 0, type: "Heavy Armor" }
};
const SUBCLASS_CHOICE_RULES = {
  "Path of the Totem Warrior": [
    { key: "totemSpirit", label: "Totem Spirit", level: 3, options: ["Bear", "Eagle", "Wolf"] },
    { key: "beastAspect", label: "Aspect of the Beast", level: 6, options: ["Bear", "Eagle", "Elk", "Tiger", "Wolf"] },
    { key: "totemicAttunement", label: "Totemic Attunement", level: 14, options: ["Bear", "Eagle", "Elk", "Tiger", "Wolf"] }
  ],
  "Path of the Wild Heart": [
    { key: "rageOfWilds", label: "Rage of the Wilds", level: 3, options: ["Bear", "Eagle", "Wolf"] },
    { key: "aspectOfWilds", label: "Aspect of the Wilds", level: 6, options: ["Owl", "Panther", "Salmon"] },
    { key: "powerOfWilds", label: "Power of the Wilds", level: 14, options: ["Falcon", "Lion", "Ram"] }
  ],
  "Path of the Storm Herald": [
    { key: "stormAura", label: "Storm Aura", level: 3, options: ["Desert", "Sea", "Tundra"] }
  ],
  "Circle of the Land": [
    { key: "circleLand", label: "Land type", level: 2, options: ["Arctic", "Coast", "Desert", "Forest", "Grassland", "Mountain", "Swamp", "Underdark"] }
  ],
  "Draconic Bloodline": [
    { key: "draconicAncestry", label: "Dragon Ancestor", level: 1, options: ["Acid", "Cold", "Fire", "Lightning", "Poison"] }
  ],
  "Draconic Sorcery": [
    { key: "draconicAncestry", label: "Draconic damage type", level: 3, options: ["Acid", "Cold", "Fire", "Lightning", "Poison"] }
  ],
  "The Genie": [
    { key: "genieKind", label: "Genie patron", level: 1, options: ["Dao (Earth)", "Djinni (Air)", "Efreeti (Fire)", "Marid (Water)"] }
  ],
  "Lunar Sorcery": [
    { key: "lunarPhase", label: "Current lunar phase", level: 1, options: ["Full Moon", "New Moon", "Crescent Moon"] }
  ],
  "Oni Bloodline": [
    { key: "oniManifestation", label: "Oni manifestation", level: 1, editions: ["2014"], options: ["Horns and fangs", "Burning eyes", "Spectral mask", "Shadowed skin", "Towering frame"] },
    { key: "oniManifestation", label: "Oni manifestation", level: 3, editions: ["2024"], options: ["Horns and fangs", "Burning eyes", "Spectral mask", "Shadowed skin", "Towering frame"] },
    { key: "oniTransformation", label: "Oni transformation focus", level: 6, options: ["Dreadful voice", "Claws and tusks", "Demonic aura", "Shifting size", "Smoke and sparks"] }
  ],
  Hunter: [
    { key: "huntersPrey", label: "Hunter's Prey", level: 3, editions: ["2014"], options: ["Colossus Slayer", "Giant Killer", "Horde Breaker"] },
    { key: "defensiveTactics", label: "Defensive Tactics", level: 7, editions: ["2014"], options: ["Escape the Horde", "Multiattack Defense", "Steel Will"] },
    { key: "multiattack", label: "Multiattack", level: 11, editions: ["2014"], options: ["Volley", "Whirlwind Attack"] },
    { key: "superiorDefense", label: "Superior Hunter's Defense", level: 15, editions: ["2014"], options: ["Evasion", "Stand Against the Tide", "Uncanny Dodge"] }
  ]
};
const QUICK_BUILD_PROFILES = {
  Barbarian: {
    role: "Tough front-line warrior", tagline: "Charge into danger, shrug off hits, and hit back hard.",
    abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Perception", "Survival", "Intimidation"],
    backgrounds: { 2014: "Outlander", 2024: "Soldier" }, equipment: ["Greataxe", "Handaxe", "Handaxe", "Backpack"],
    masteries: ["Greataxe", "Handaxe"]
  },
  Bard: {
    role: "Supportive magical expert", tagline: "Inspire allies, solve problems, and always have a clever spell.",
    abilities: ["CHA", "DEX", "CON", "WIS", "INT", "STR"], skills: ["Persuasion", "Performance", "Insight", "Deception"],
    backgrounds: { 2014: "Entertainer", 2024: "Entertainer" }, equipment: ["Rapier", "Leather Armor", "Dagger", "Backpack"],
    spells: ["Vicious Mockery", "Mage Hand", "Healing Word", "Dissonant Whispers", "Faerie Fire", "Thunderwave"]
  },
  Cleric: {
    role: "Armored divine spellcaster", tagline: "Protect the party, restore allies, and call down divine power.",
    abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Insight", "Medicine", "Religion", "Persuasion"],
    backgrounds: { 2014: "Acolyte", 2024: "Acolyte" }, equipment: ["Scale Mail", "Shield", "Mace", "Light Crossbow", "Backpack"],
    spells: ["Guidance", "Sacred Flame", "Thaumaturgy", "Bless", "Cure Wounds", "Guiding Bolt", "Healing Word"]
  },
  Druid: {
    role: "Nature spellcaster and shapeshifter", tagline: "Control the battlefield, heal friends, and wield primal magic.",
    abilities: ["WIS", "CON", "DEX", "INT", "CHA", "STR"], skills: ["Nature", "Perception", "Animal Handling", "Insight"],
    backgrounds: { 2014: "Hermit", 2024: "Guide" }, equipment: ["Leather Armor", "Shield", "Scimitar", "Backpack"],
    spells: ["Guidance", "Produce Flame", "Shillelagh", "Entangle", "Faerie Fire", "Goodberry", "Healing Word"]
  },
  Fighter: {
    role: "Reliable weapons specialist", tagline: "Master weapons, wear sturdy armor, and thrive in every battle.",
    abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"], skills: ["Athletics", "Perception", "Insight", "Survival"],
    backgrounds: { 2014: "Soldier", 2024: "Soldier" }, equipment: ["Chain Mail", "Shield", "Longsword", "Light Crossbow", "Backpack"],
    fightingStyle: "Defense", masteries: ["Longsword", "Light Crossbow", "Javelin"]
  },
  Monk: {
    role: "Fast unarmored martial artist", tagline: "Move quickly, strike precisely, and turn discipline into defense.",
    abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"], skills: ["Acrobatics", "Stealth", "Insight", "Athletics"],
    backgrounds: { 2014: "Hermit", 2024: "Guide" }, equipment: ["Quarterstaff", "Dart", "Backpack"]
  },
  Paladin: {
    role: "Protective holy warrior", tagline: "Stand beside your allies with armor, healing, and radiant magic.",
    abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Persuasion", "Insight", "Intimidation"],
    backgrounds: { 2014: "Noble", 2024: "Noble" }, equipment: ["Chain Mail", "Shield", "Longsword", "Javelin", "Backpack"],
    masteries: ["Longsword", "Javelin"], spells: ["Bless", "Cure Wounds", "Divine Favor", "Shield of Faith"]
  },
  Ranger: {
    role: "Mobile wilderness warrior", tagline: "Scout ahead, track danger, and fight effectively at range.",
    abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"], skills: ["Perception", "Stealth", "Survival", "Nature"],
    backgrounds: { 2014: "Outlander", 2024: "Guide" }, equipment: ["Studded Leather Armor", "Longbow", "Shortsword", "Shortsword", "Backpack"],
    masteries: ["Longbow", "Shortsword"], spells: ["Cure Wounds", "Ensnaring Strike", "Goodberry", "Hunter's Mark"]
  },
  Rogue: {
    role: "Precise and skillful expert", tagline: "Sneak, investigate, and land one devastating attack at the right moment.",
    abilities: ["DEX", "INT", "CON", "WIS", "CHA", "STR"], skills: ["Stealth", "Investigation", "Perception", "Sleight of Hand", "Deception"],
    backgrounds: { 2014: "Criminal", 2024: "Criminal" }, equipment: ["Leather Armor", "Rapier", "Shortbow", "Dagger", "Dagger", "Backpack"],
    masteries: ["Rapier", "Shortbow"]
  },
  Sorcerer: {
    role: "Instinctive arcane spellcaster", tagline: "Unleash powerful magic through raw talent and personality.",
    abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Persuasion", "Deception", "Insight"],
    backgrounds: { 2014: "Charlatan", 2024: "Charlatan" }, equipment: ["Light Crossbow", "Dagger", "Backpack"],
    spells: ["Fire Bolt", "Mage Hand", "Minor Illusion", "Prestidigitation", "Magic Missile", "Shield"]
  },
  Warlock: {
    role: "Occult spellcaster", tagline: "Mix dependable magical attacks with strange gifts from a patron.",
    abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Deception", "Investigation", "Intimidation"],
    backgrounds: { 2014: "Charlatan", 2024: "Charlatan" }, equipment: ["Leather Armor", "Light Crossbow", "Dagger", "Backpack"],
    spells: ["Eldritch Blast", "Mage Hand", "Armor of Agathys", "Hex"]
  },
  Wizard: {
    role: "Versatile scholarly spellcaster", tagline: "Prepare the right magical tool for almost any problem.",
    abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "History", "Insight"],
    backgrounds: { 2014: "Sage", 2024: "Sage" }, equipment: ["Quarterstaff", "Dagger", "Book", "Backpack"],
    spells: ["Fire Bolt", "Mage Hand", "Prestidigitation", "Detect Magic", "Mage Armor", "Magic Missile", "Shield", "Sleep", "Thunderwave"]
  },
  Artificer: {
    role: "Inventive magical specialist", tagline: "Support the party with tools, clever magic, and durable equipment.",
    abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Perception", "Sleight of Hand"],
    backgrounds: { 2014: "Sage", 2024: "Artisan" }, equipment: ["Scale Mail", "Shield", "Light Crossbow", "Dagger", "Backpack"],
    spells: ["Guidance", "Fire Bolt", "Cure Wounds", "Faerie Fire", "Grease"]
  },
  "Blood Hunter": {
    role: "Risk-taking monster hunter", tagline: "Track unnatural threats and trade vitality for specialized combat power.",
    abilities: ["DEX", "INT", "CON", "WIS", "STR", "CHA"], skills: ["Investigation", "Survival", "Arcana", "Athletics"],
    backgrounds: { 2014: "Haunted One", 2024: "Criminal" }, equipment: ["Studded Leather Armor", "Longbow", "Shortsword", "Dagger", "Backpack"]
  }
};
const QUICK_SPELL_COUNTS = {
  Bard: { 0: 2, 1: 4 }, Cleric: { 0: 3, 1: 4 }, Druid: { 0: 2, 1: 4 },
  Paladin: { 0: 0, 1: 2 }, Ranger: { 0: 0, 1: 2 }, Sorcerer: { 0: 4, 1: 2 },
  Warlock: { 0: 2, 1: 2 }, Wizard: { 0: 3, 1: 6 }, Artificer: { 0: 2, 1: 3 }
};
const PREMADE_HEROES = [
  { key: "ironward", name: "Branna Ironward", className: "Fighter", species: "Dwarf", background: "Soldier", role: "Defender", pitch: "A shield-bearing veteran who keeps danger pointed at herself.", level: 1 },
  { key: "brightbrook", name: "Mira Brightbrook", className: "Cleric", species: "Human", background: "Acolyte", role: "Healer", pitch: "A steady divine caster with healing, blessings, and sturdy armor.", level: 1, subclass: "Life Domain" },
  { key: "moonfall", name: "Lyra Moonfall", className: "Wizard", species: "Elf", background: "Sage", role: "Arcane problem-solver", pitch: "A careful scholar stocked with utility magic and battle control.", level: 1 },
  { key: "quickstep", name: "Pip Quickstep", className: "Rogue", species: "Halfling", background: "Criminal", role: "Scout", pitch: "A stealthy expert who opens locks, reads rooms, and strikes precisely.", level: 1 },
  { key: "embersong", name: "Kael Embersong", className: "Bard", species: "Tiefling", background: "Entertainer", role: "Face", pitch: "A silver-tongued performer with support magic and social skills.", level: 1 },
  { key: "ashtrail", name: "Rowan Ashtrail", className: "Ranger", species: "Human", background: "Outlander", role: "Wilderness striker", pitch: "A tracker with ranged combat, survival skills, and practical magic.", level: 1 }
];
const QUICK_NAMES = {
  Aasimar: ["Seraphine", "Valen", "Astra"], Dragonborn: ["Arjhan", "Kava", "Rhogar"], Dwarf: ["Brynja", "Dain", "Torga"],
  Elf: ["Aelar", "Lia", "Thalion"], Gnome: ["Fizzwick", "Nissa", "Wrenn"], Goliath: ["Korr", "Nalla", "Vimak"],
  Halfling: ["Bree", "Milo", "Roscoe"], Human: ["Elara", "Garrick", "Rowan"], Orc: ["Dren", "Morga", "Thokk"],
  Tiefling: ["Ash", "Hope", "Mordai"]
};
const CONDITIONS = ["Blinded", "Charmed", "Deafened", "Frightened", "Grappled", "Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious", "Exhaustion"];
const STORAGE_KEY = "arcanaForge.characters.v1";
const PROFILE_KEY = "arcanaForge.profile.v1";
const ROLL_KEY = "arcanaForge.rolls.v1";
const CLOUD_OWNER_KEY = "arcanaForge.cloudOwner.v1";
const DELETED_KEY = "arcanaForge.deletedCharacters.v1";
const CAMPAIGN_KEY = "arcanaForge.campaigns.v1";
const CAMPAIGN_MEMBER_KEY = "arcanaForge.campaignMembers.v1";
const CAMPAIGN_CHARACTER_KEY = "arcanaForge.campaignCharacters.v1";
const CAMPAIGN_MAP_KEY = "arcanaForge.campaignMaps.v1";
const CAMPAIGN_LOG_KEY = "arcanaForge.campaignGameLog.v1";
const RECOVERY_SNAPSHOT_KEY = "arcanaForge.recoverySnapshots.v1";
const MAX_RECOVERY_SNAPSHOTS = 5;
const BACKUP_META_KEY = "arcanaForge.cloudBackupMeta.v1";
const THEME_KEY = "dndb.theme";
const ROUTE_VIEWS = new Set(["dashboard", "builder", "sheet", "dice", "vault", "campaigns"]);
const BUILDER_STEP_COUNT = 7;

let edition = "2014";
let currentStep = 1;
let selectedClass = "Fighter";
let selectedDie = 20;
let selectedRollMode = "normal";
let selectedSpellLevel = 0;
let selectedFeatNames = new Set();
let selectedFeatAbilities = {};
let selectedAsi = {};
let selectedSpellNames = new Set();
let abilityMethod = "standard";
let levelingCharacterId = null;
let levelUpClassName = "";
let inventoryCharacterId = null;
let spellManagerState = null;
let activeCharacterId = null;
let activeSheetSection = "overview";
let quickStep = 1;
let quickClass = "Fighter";
let prebuildClass = "Fighter";
let prebuildSubclass = "";
let drawing = false;
let drawEnabled = false;
let portraitData = "";
let currentOriginFeat = "";
let accountMode = "signin";
let cloudClient = null;
let cloudUser = null;
let cloudSyncTimer = null;
let cloudBackupTimer = null;
let characters = readJson(STORAGE_KEY, []);
let campaigns = readJson(CAMPAIGN_KEY, []);
let campaignMemberships = readJson(CAMPAIGN_MEMBER_KEY, []);
let campaignCharacters = readJson(CAMPAIGN_CHARACTER_KEY, []);
let campaignMaps = readJson(CAMPAIGN_MAP_KEY, []);
let campaignGameLogs = readJson(CAMPAIGN_LOG_KEY, []);
let activeCampaignId = "";
let activeMapId = "";
let selectedMapToken = null;
let selectedMapTool = "token";
let selectedMapTile = "stone-floor";
let selectedMapRulerStart = null;
let campaignMapImageDraft = "";
let campaignTileImageDraft = "";
let campaignLiveTimer = null;
let deletedCharacters = readJson(DELETED_KEY, {});
let rollHistory = readJson(ROLL_KEY, []);
restoreRecoverySnapshotIfEmpty("initial load");
localStorage.removeItem("arcanaForge.ownedContent.v1");

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const form = $("#character-form");
const canvas = $("#portrait-canvas");
const ctx = canvas.getContext("2d");
const PORTRAIT_EXPORT_SIZE = 256;
const PORTRAIT_EXPORT_QUALITY = 0.74;
const BUILT_IN_MAP_TILES = [
  { id: "stone-floor", name: "Stone Floor", category: "Dungeon", style: "background:#787064;background-image:linear-gradient(90deg,rgba(0,0,0,.18) 1px,transparent 1px),linear-gradient(rgba(0,0,0,.18) 1px,transparent 1px);background-size:50% 50%;" },
  { id: "cracked-stone", name: "Cracked Stone", category: "Dungeon", style: "background:#6c665e;background-image:linear-gradient(135deg,transparent 45%,rgba(24,20,18,.36) 46%,transparent 50%),linear-gradient(35deg,transparent 58%,rgba(255,255,255,.12) 59%,transparent 62%);" },
  { id: "dungeon-wall", name: "Dungeon Wall", category: "Dungeon", style: "background:#3e3935;background-image:linear-gradient(90deg,rgba(255,255,255,.09) 2px,transparent 2px),linear-gradient(rgba(0,0,0,.3) 50%,transparent 50%);background-size:22px 100%,100% 50%;" },
  { id: "wood-planks", name: "Wood Planks", category: "Town", style: "background:#8b5f37;background-image:linear-gradient(90deg,rgba(50,25,9,.35) 2px,transparent 2px),linear-gradient(rgba(255,230,170,.12),rgba(30,12,5,.18));background-size:16px 100%,100% 100%;" },
  { id: "cobblestone", name: "Cobblestone", category: "Town", style: "background:#8c877b;background-image:radial-gradient(ellipse at 35% 35%,rgba(255,255,255,.18) 0 18%,transparent 19%),radial-gradient(ellipse at 75% 65%,rgba(0,0,0,.18) 0 22%,transparent 23%);background-size:26px 22px;" },
  { id: "grass", name: "Grass", category: "Wilderness", style: "background:#4f7a3c;background-image:linear-gradient(115deg,rgba(255,255,255,.08) 12%,transparent 12%),linear-gradient(25deg,rgba(0,0,0,.12) 18%,transparent 18%);background-size:14px 14px;" },
  { id: "forest", name: "Forest", category: "Wilderness", style: "background:#315b35;background-image:radial-gradient(circle at 35% 35%,#4f8a45 0 18%,transparent 19%),radial-gradient(circle at 72% 68%,#24452b 0 22%,transparent 23%);background-size:30px 30px;" },
  { id: "dirt", name: "Dirt Path", category: "Wilderness", style: "background:#8a633f;background-image:radial-gradient(circle,rgba(50,25,10,.22) 0 12%,transparent 13%);background-size:18px 18px;" },
  { id: "sand", name: "Sand", category: "Wilderness", style: "background:#c7ad6b;background-image:radial-gradient(circle,rgba(255,255,255,.18) 0 8%,transparent 9%),radial-gradient(circle,rgba(90,60,20,.18) 0 7%,transparent 8%);background-size:18px 18px,25px 25px;" },
  { id: "water", name: "Water", category: "Hazard", style: "background:#2f6f94;background-image:linear-gradient(135deg,rgba(255,255,255,.24) 12%,transparent 13%,transparent 50%,rgba(255,255,255,.16) 51%,transparent 52%);background-size:24px 24px;" },
  { id: "lava", name: "Lava", category: "Hazard", style: "background:#9b2f1e;background-image:radial-gradient(circle at 30% 35%,#ffb13a 0 12%,transparent 13%),linear-gradient(45deg,rgba(0,0,0,.28),transparent);" },
  { id: "shadow", name: "Shadow", category: "Overlay", style: "background:rgba(18,14,22,.7);background-image:radial-gradient(circle,rgba(255,255,255,.06),transparent 55%);" }
];

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`Could not save ${key}`, error);
    return false;
  }
}
function meaningfulState(payload) {
  return Boolean(payload?.characters?.length
    || payload?.campaigns?.length
    || payload?.campaignMemberships?.length
    || payload?.campaignCharacters?.length
    || payload?.campaignMaps?.length
    || payload?.campaignGameLogs?.length);
}
function recoveryContent() {
  return {
    ownerId: cloudUser?.id || localStorage.getItem(CLOUD_OWNER_KEY) || "",
    characters: Array.isArray(characters) ? characters : [],
    campaigns: Array.isArray(campaigns) ? campaigns : [],
    campaignMemberships: Array.isArray(campaignMemberships) ? campaignMemberships : [],
    campaignCharacters: Array.isArray(campaignCharacters) ? campaignCharacters : [],
    campaignMaps: Array.isArray(campaignMaps) ? campaignMaps : [],
    campaignGameLogs: Array.isArray(campaignGameLogs) ? campaignGameLogs : [],
    deletedCharacters: deletedCharacters && typeof deletedCharacters === "object" ? deletedCharacters : {}
  };
}
function writeRecoverySnapshot(reason = "save") {
  try {
    const content = recoveryContent();
    if (!meaningfulState(content)) return true;
    const fingerprint = JSON.stringify(content);
    const snapshots = readJson(RECOVERY_SNAPSHOT_KEY, []);
    if (snapshots[0]?.fingerprint === fingerprint) return true;
    const entry = {
      version: 1,
      reason,
      createdAt: Date.now(),
      fingerprint,
      ...content
    };
    return saveJson(RECOVERY_SNAPSHOT_KEY, [entry, ...snapshots].slice(0, MAX_RECOVERY_SNAPSHOTS));
  } catch (error) {
    console.warn("Could not write recovery snapshot", error);
    return false;
  }
}
function restoreRecoverySnapshotIfEmpty(reason = "recovery") {
  const hasCurrentState = meaningfulState({
    characters,
    campaigns,
    campaignMemberships,
    campaignCharacters,
    campaignMaps,
    campaignGameLogs
  });
  if (hasCurrentState) return false;
  const snapshot = readJson(RECOVERY_SNAPSHOT_KEY, [])[0];
  if (!meaningfulState(snapshot)) return false;
  characters = Array.isArray(snapshot.characters) ? snapshot.characters : [];
  campaigns = Array.isArray(snapshot.campaigns) ? snapshot.campaigns : [];
  campaignMemberships = Array.isArray(snapshot.campaignMemberships) ? snapshot.campaignMemberships : [];
  campaignCharacters = Array.isArray(snapshot.campaignCharacters) ? snapshot.campaignCharacters : [];
  campaignMaps = Array.isArray(snapshot.campaignMaps) ? snapshot.campaignMaps : [];
  campaignGameLogs = Array.isArray(snapshot.campaignGameLogs) ? snapshot.campaignGameLogs : [];
  deletedCharacters = snapshot.deletedCharacters && typeof snapshot.deletedCharacters === "object" ? snapshot.deletedCharacters : {};
  saveJson(STORAGE_KEY, characters);
  saveJson(CAMPAIGN_KEY, campaigns);
  saveJson(CAMPAIGN_MEMBER_KEY, campaignMemberships);
  saveJson(CAMPAIGN_CHARACTER_KEY, campaignCharacters);
  saveJson(CAMPAIGN_MAP_KEY, campaignMaps);
  saveJson(CAMPAIGN_LOG_KEY, campaignGameLogs);
  saveJson(DELETED_KEY, deletedCharacters);
  console.info(`Recovered DND Beyonder save state from snapshot (${reason})`);
  return true;
}
function characterTimestamp(character) { return Number(character?.updatedAt || 0); }
function deletionTimestamp(id) { return Number(deletedCharacters[id] || 0); }
function persistDeletedCharacters() {
  saveJson(DELETED_KEY, deletedCharacters);
  if (cloudUser) saveJson(`${DELETED_KEY}.${cloudUser.id}`, deletedCharacters);
}
function rememberCharacterDeletion(id, timestamp = Date.now()) {
  deletedCharacters = { ...deletedCharacters, [id]: timestamp };
  persistDeletedCharacters();
}
function clearCharacterDeletion(id) {
  if (!deletedCharacters[id]) return;
  delete deletedCharacters[id];
  persistDeletedCharacters();
}
function isDemoCharacter(character) {
  return Boolean(character?.demo || character?.id === "demo-lyra");
}
function cloudConfigured() {
  const config = window.ARCANA_CLOUD_CONFIG || {};
  return Boolean(config.supabaseUrl && config.supabasePublishableKey && window.supabase?.createClient);
}
function cloudAuthErrorMessage(error) {
  const message = error?.message || String(error || "Unknown Supabase auth error");
  if (/failed to fetch/i.test(message)) {
    const host = window.ARCANA_CLOUD_CONFIG?.supabaseUrl || "the configured Supabase project";
    return `Could not reach Supabase (${host}). Check that the project is active, the publishable key matches this project, and browser/privacy tools allow requests to this Supabase URL.`;
  }
  return message;
}
function characterOwnerId(character) {
  return character?.cloudOwnerId || character?.owner_user_id || cloudUser?.id || "";
}
function isOwnCharacter(character) {
  return !cloudUser || !character?.cloudOwnerId || character.cloudOwnerId === cloudUser.id;
}
function characterVaultKey(character, ownerId = cloudUser?.id || "") {
  return `${character?.cloudOwnerId || character?.owner_user_id || ownerId}:${character?.id || ""}`;
}
function mergeUserVaultCharacters(lists, userId) {
  const merged = new Map();
  lists.flat().forEach(character => {
    if (!character?.id || isDemoCharacter(character)) return;
    const ownerId = character.cloudOwnerId || character.owner_user_id || userId || "";
    const normalized = { ...character, cloudOwnerId: ownerId };
    const key = characterVaultKey(normalized, userId);
    const existing = merged.get(key);
    if (!existing || characterTimestamp(normalized) >= characterTimestamp(existing)) merged.set(key, normalized);
  });
  return [...merged.values()].sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
}
function canControlCharacter(character) {
  return isOwnCharacter(character) || character?._campaignRole === "dm";
}
function ownCharacters() {
  return characters.filter(character => !isDemoCharacter(character) && isOwnCharacter(character));
}
function dmCampaignCharacters() {
  return characters.filter(character => !isDemoCharacter(character) && !isOwnCharacter(character) && character._campaignRole === "dm");
}
function campaignMember(campaignId, userId = cloudUser?.id) {
  return campaignMemberships.find(member => member.campaign_id === campaignId && member.user_id === userId);
}
function campaignRole(campaignId) {
  if (campaigns.find(campaign => campaign.id === campaignId)?.owner_id === cloudUser?.id) return "dm";
  return campaignMember(campaignId)?.role || "";
}
function mergeRecordsById(primary = [], fallback = [], keyFn = item => item?.id) {
  const merged = new Map();
  [...fallback, ...primary].forEach(item => {
    const key = keyFn(item);
    if (key) merged.set(key, item);
  });
  return [...merged.values()];
}
function accountDisplayName(fallback = "Adventurer") {
  return cloudUser?.user_metadata?.display_name || cloudUser?.email?.split("@")[0] || fallback;
}
function generateInviteCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}
function saveCampaignCache() {
  saveJson(CAMPAIGN_KEY, campaigns);
  saveJson(CAMPAIGN_MEMBER_KEY, campaignMemberships);
  saveJson(CAMPAIGN_CHARACTER_KEY, campaignCharacters);
  saveJson(CAMPAIGN_MAP_KEY, campaignMaps);
  saveJson(CAMPAIGN_LOG_KEY, campaignGameLogs);
  if (cloudUser) saveJson(`${CAMPAIGN_KEY}.${cloudUser.id}`, campaigns);
  if (cloudUser) saveJson(`${CAMPAIGN_MEMBER_KEY}.${cloudUser.id}`, campaignMemberships);
  if (cloudUser) saveJson(`${CAMPAIGN_CHARACTER_KEY}.${cloudUser.id}`, campaignCharacters);
  if (cloudUser) saveJson(`${CAMPAIGN_MAP_KEY}.${cloudUser.id}`, campaignMaps);
  if (cloudUser) saveJson(`${CAMPAIGN_LOG_KEY}.${cloudUser.id}`, campaignGameLogs);
  writeRecoverySnapshot("campaign cache saved");
  scheduleCloudBackup("campaign cache saved");
}
function campaignSetupMessage() {
  return "Campaign tables are not set up yet. Run supabase-campaign-schema.sql in the Supabase SQL Editor, then refresh DND Beyonder.";
}
function isMissingCampaignSchema(error) {
  const message = String(error?.message || error?.details || "").toLowerCase();
  return message.includes("could not find the table")
    || message.includes("schema cache")
    || (message.includes("relation") && message.includes("campaign"));
}
function isMissingSecurityRpc(error) {
  const message = String(error?.message || error?.details || "").toLowerCase();
  return message.includes("could not find the function")
    || (message.includes("function") && message.includes("does not exist"))
    || (message.includes("schema cache") && message.includes("function"));
}
function isMissingBackupSchema(error) {
  const message = String(error?.message || error?.details || "").toLowerCase();
  return message.includes("account_backups")
    || message.includes("could not find the table")
    || message.includes("schema cache")
    || (message.includes("relation") && message.includes("account_backups"));
}
function reportCampaignError(error, fallbackMessage, showToast = true) {
  const message = isMissingCampaignSchema(error) ? campaignSetupMessage() : `${fallbackMessage}: ${error.message}`;
  setCloudStatus(message, true);
  if (showToast) toast(message);
}
function normalizeMapData(data = {}) {
  const session = data.session && typeof data.session === "object" ? data.session : {};
  const fog = data.fog && typeof data.fog === "object" ? data.fog : {};
  return {
    columns: Math.min(80, Math.max(4, Number(data.columns || 24))),
    rows: Math.min(80, Math.max(4, Number(data.rows || 16))),
    gridSize: Math.min(72, Math.max(28, Number(data.gridSize || 44))),
    gridEnabled: data.gridEnabled !== false,
    background: String(data.background || ""),
    backgroundFit: data.backgroundFit || "cover",
    scale: data.scale && typeof data.scale === "object" ? {
      feetPerSquare: Math.min(100, Math.max(1, Number(data.scale.feetPerSquare || 5))),
      offsetX: Number(data.scale.offsetX || 0),
      offsetY: Number(data.scale.offsetY || 0)
    } : { feetPerSquare: 5, offsetX: 0, offsetY: 0 },
    session: {
      state: ["draft", "live", "paused", "ended"].includes(session.state) ? session.state : "draft",
      updatedAt: session.updatedAt || ""
    },
    fog: {
      enabled: Boolean(fog.enabled),
      cells: Array.isArray(fog.cells) ? fog.cells.filter(Boolean).map(String).slice(0, 7000) : []
    },
    pings: Array.isArray(data.pings) ? data.pings : [],
    drawings: Array.isArray(data.drawings) ? data.drawings : [],
    overlays: Array.isArray(data.overlays) ? data.overlays : [],
    stickers: Array.isArray(data.stickers) ? data.stickers : [],
    tokens: Array.isArray(data.tokens) ? data.tokens : [],
    tiles: Array.isArray(data.tiles) ? data.tiles : [],
    customTiles: Array.isArray(data.customTiles) ? data.customTiles : []
  };
}
function mapCellKey(x, y) {
  return `${Math.max(0, Number(x) || 0)},${Math.max(0, Number(y) || 0)}`;
}
function mapCellCovered(data, x, y) {
  return data.fog.enabled && new Set(data.fog.cells).has(mapCellKey(x, y));
}
function mapTokenVisibleForRole(data, token, isDm) {
  if (isDm) return true;
  if (token.hidden) return false;
  const size = mapTokenSize(token);
  for (let dx = 0; dx < size; dx += 1) {
    for (let dy = 0; dy < size; dy += 1) {
      if (mapCellCovered(data, Number(token.x || 0) + dx, Number(token.y || 0) + dy)) return false;
    }
  }
  return true;
}
function allMapCells(data) {
  const cells = [];
  for (let y = 0; y < data.rows; y += 1) {
    for (let x = 0; x < data.columns; x += 1) cells.push(mapCellKey(x, y));
  }
  return cells;
}
function mapTileDefinition(map, tileId) {
  const data = normalizeMapData(map?.data);
  return BUILT_IN_MAP_TILES.find(tile => tile.id === tileId)
    || data.customTiles.find(tile => tile.id === tileId)
    || BUILT_IN_MAP_TILES[0];
}
function mapTileStyle(map, tileId) {
  const tile = mapTileDefinition(map, tileId);
  if (tile.url) {
    const safeUrl = String(tile.url).replace(/"/g, "%22").replace(/'/g, "%27").replace(/\\/g, "%5C").replace(/\n|\r/g, "");
    return `background-image:url('${safeUrl}');background-size:cover;background-position:center;`;
  }
  return tile.style || BUILT_IN_MAP_TILES[0].style;
}
function campaignMapById(mapId) {
  return campaignMaps.find(map => map.id === mapId);
}
function mapsForCampaign(campaignId) {
  return campaignMaps.filter(map => map.campaign_id === campaignId).sort((a, b) => String(a.name).localeCompare(String(b.name)));
}
function activeMapForCampaign(campaignId) {
  const maps = mapsForCampaign(campaignId);
  if (!maps.length) return null;
  if (!activeMapId || !maps.some(map => map.id === activeMapId)) activeMapId = maps[0].id;
  return maps.find(map => map.id === activeMapId) || maps[0];
}
function canEditCampaign(campaignId) {
  return campaignRole(campaignId) === "dm";
}
function canMoveMapToken(token, campaignId) {
  return canEditCampaign(campaignId) || token.ownerUserId === cloudUser?.id;
}
function mapTokenId(ownerUserId, characterId) {
  return `${ownerUserId}:${characterId}`;
}
function characterForMapToken(token) {
  return characters.find(character => character.id === token.characterId && characterOwnerId(character) === token.ownerUserId);
}
function tokenColor(name = "") {
  const palette = ["#8f2f2f", "#2f5f8f", "#3f7a55", "#8f6b2f", "#693b8f", "#8f4f2f", "#2f7f82", "#6d7330"];
  const total = [...String(name)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return palette[total % palette.length];
}
function mapTokenSize(token) {
  return Math.min(4, Math.max(1, Math.round(Number(token?.size || 1))));
}
function clampMapTokenPosition(data, token, x, y) {
  const size = mapTokenSize(token);
  return {
    x: Math.min(Math.max(0, data.columns - size), Math.max(0, Number(x))),
    y: Math.min(Math.max(0, data.rows - size), Math.max(0, Number(y)))
  };
}
function tokensForCampaignMap(map, links) {
  const data = normalizeMapData(map?.data);
  const existing = new Map(data.tokens.map(token => [token.id || mapTokenId(token.ownerUserId, token.characterId), token]));
  return links.map((link, index) => {
    const character = characters.find(item => item.id === link.character_id && characterOwnerId(item) === link.owner_user_id);
    const id = mapTokenId(link.owner_user_id, link.character_id);
    const prior = existing.get(id) || {};
    const name = prior.name || character?.name || link.nickname || "Hero";
    const token = {
      id,
      ownerUserId: link.owner_user_id,
      characterId: link.character_id,
      name,
      portrait: character?.portrait || prior.portrait || "",
      size: mapTokenSize(prior),
      color: prior.color || tokenColor(name),
      x: Math.min(data.columns - 1, Math.max(0, Number(prior.x ?? (index % Math.max(1, data.columns))))),
      y: Math.min(data.rows - 1, Math.max(0, Number(prior.y ?? Math.floor(index / Math.max(1, data.columns))))),
      hidden: Boolean(prior.hidden)
    };
    return { ...token, ...clampMapTokenPosition(data, token, token.x, token.y) };
  });
}
function updateCampaignMapCache(map) {
  if (!map?.id) return;
  campaignMaps = [...campaignMaps.filter(item => item.id !== map.id), map];
  saveCampaignCache();
}
async function fetchCampaignMap(mapId) {
  if (!cloudUser || !cloudClient || !mapId) return null;
  const { data, error } = await cloudClient.from("campaign_maps")
    .select("id, campaign_id, owner_id, name, data, updated_at")
    .eq("id", mapId)
    .maybeSingle();
  if (error || !data) return null;
  return data;
}
async function saveCampaignMap(map, message = "Map updated", options = {}) {
  if (!cloudUser || !cloudClient || !map) return;
  const latest = options.preserveTokens ? await fetchCampaignMap(map.id) : null;
  const nextData = normalizeMapData(map.data);
  if (latest?.data) {
    nextData.tokens = normalizeMapData(latest.data).tokens.map(token => {
      const normalizedToken = { ...token, size: mapTokenSize(token) };
      return { ...normalizedToken, ...clampMapTokenPosition(nextData, normalizedToken, normalizedToken.x, normalizedToken.y) };
    });
  }
  map.data = nextData;
  map.updated_at = new Date().toISOString();
  const { error } = await cloudClient.from("campaign_maps")
    .update({ name: map.name, data: map.data, updated_at: map.updated_at })
    .eq("id", map.id);
  if (error) { reportCampaignError(error, "Could not save map"); return; }
  updateCampaignMapCache(map);
  renderCampaigns();
  if (message) toast(message);
}
async function createCampaignMap(campaignId, values) {
  if (!cloudUser || !cloudClient) { toast("Sign in to create a map"); return; }
  if (!canEditCampaign(campaignId)) { toast("Only the DM can create maps"); return; }
  const name = String(values.name || "").trim() || "New Encounter Map";
  const data = normalizeMapData({
    columns: values.columns,
    rows: values.rows,
    gridSize: values.gridSize,
    gridEnabled: values.gridEnabled === "on",
    background: campaignMapImageDraft || String(values.background || "").trim(),
    session: { state: "draft", updatedAt: new Date().toISOString() }
  });
  const { data: inserted, error } = await cloudClient.from("campaign_maps").insert({
    campaign_id: campaignId,
    owner_id: cloudUser.id,
    name,
    data,
    updated_at: new Date().toISOString()
  }).select("id, campaign_id, owner_id, name, data, updated_at").single();
  if (error) { reportCampaignError(error, "Could not create map"); return; }
  campaignMapImageDraft = "";
  activeMapId = inserted.id;
  campaignMaps = [...campaignMaps.filter(map => map.id !== inserted.id), inserted];
  saveCampaignCache();
  renderCampaigns();
  toast(`${name} created`);
}
async function updateCampaignMapSettings(mapId, values) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can edit map settings"); return; }
  map.name = String(values.name || "").trim() || map.name || "Encounter Map";
  map.data = normalizeMapData({
    ...map.data,
    columns: values.columns,
    rows: values.rows,
    gridSize: values.gridSize,
    gridEnabled: values.gridEnabled === "on",
    background: campaignMapImageDraft || String(values.background || "").trim() || map.data?.background || ""
  });
  campaignMapImageDraft = "";
  await saveCampaignMap(map, "Map settings saved", { preserveTokens: true });
}
async function deleteCampaignMap(mapId) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can delete maps"); return; }
  const { error } = await cloudClient.from("campaign_maps").delete().eq("id", mapId);
  if (error) { reportCampaignError(error, "Could not delete map"); return; }
  campaignMaps = campaignMaps.filter(item => item.id !== mapId);
  if (activeMapId === mapId) activeMapId = "";
  saveCampaignCache();
  renderCampaigns();
  toast("Map deleted");
}
async function ensureCampaignMapTokens(mapId) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can add tokens"); return; }
  const links = campaignCharacters.filter(link => link.campaign_id === map.campaign_id);
  const latest = await fetchCampaignMap(map.id);
  if (latest) {
    map.name = latest.name;
    map.data = normalizeMapData(latest.data);
  } else {
    map.data = normalizeMapData(map.data);
  }
  map.data.tokens = tokensForCampaignMap(map, links);
  await saveCampaignMap(map, "Party tokens added");
}
async function moveCampaignMapToken(mapId, tokenId, x, y) {
  if (!cloudUser || !cloudClient) { toast("Sign in to move campaign map tokens"); return; }
  const map = campaignMapById(mapId);
  if (!map) return;
  const data = normalizeMapData(map.data);
  const token = data.tokens.find(item => item.id === tokenId);
  if (!token) { toast("Choose Add party tokens first"); return; }
  if (!canMoveMapToken(token, map.campaign_id)) { toast("You can move your own token; the DM can move any token"); return; }
  const position = clampMapTokenPosition(data, token, x, y);
  const { data: updatedMap, error } = await cloudClient.rpc("move_campaign_map_token", {
    p_map_id: map.id,
    p_token_id: tokenId,
    p_x: position.x,
    p_y: position.y
  });
  if (error && !isMissingSecurityRpc(error)) { toast(`Could not move token: ${error.message}`); return; }
  if (!error) {
    if (updatedMap?.id) {
      updateCampaignMapCache(updatedMap);
      renderCampaigns();
    } else {
      await loadCampaigns();
    }
    return;
  }
  if (!canEditCampaign(map.campaign_id)) {
    toast("Map movement needs the latest campaign SQL. Run supabase-security-hardening.sql, then refresh.");
    return;
  }
  const latest = await fetchCampaignMap(map.id);
  const fallbackData = normalizeMapData(latest?.data || map.data);
  const fallbackToken = fallbackData.tokens.find(item => item.id === tokenId);
  if (fallbackToken) {
    fallbackToken.x = position.x;
    fallbackToken.y = position.y;
  } else {
    token.x = position.x;
    token.y = position.y;
    fallbackData.tokens.push(token);
  }
  if (latest?.name) map.name = latest.name;
  map.data = fallbackData;
  await saveCampaignMap(map, "");
}
async function resizeCampaignMapToken(mapId, tokenId, delta) {
  if (!cloudUser || !cloudClient) { toast("Sign in to resize campaign map tokens"); return; }
  const map = campaignMapById(mapId);
  if (!map) return;
  const data = normalizeMapData(map.data);
  const token = data.tokens.find(item => item.id === tokenId);
  if (!token) { toast("Choose Add party tokens first"); return; }
  if (!canMoveMapToken(token, map.campaign_id)) { toast("You can resize your own token; the DM can resize any token"); return; }
  const nextSize = Math.min(4, Math.max(1, mapTokenSize(token) + Number(delta || 0)));
  token.size = nextSize;
  const position = clampMapTokenPosition(data, token, token.x, token.y);
  token.x = position.x;
  token.y = position.y;
  const { data: updatedMap, error } = await cloudClient.rpc("resize_campaign_map_token", {
    p_map_id: map.id,
    p_token_id: tokenId,
    p_size: nextSize
  });
  if (error && !isMissingSecurityRpc(error)) { toast(`Could not resize token: ${error.message}`); return; }
  if (!error && updatedMap?.id) {
    updateCampaignMapCache(updatedMap);
    renderCampaigns();
    return;
  }
  if (!error) {
    await loadCampaigns();
    return;
  }
  if (!canEditCampaign(map.campaign_id)) {
    toast("Map token sizing needs the latest campaign SQL. Run supabase-security-hardening.sql, then refresh.");
    return;
  }
  const latest = await fetchCampaignMap(map.id);
  const fallbackData = normalizeMapData(latest?.data || map.data);
  const fallbackToken = fallbackData.tokens.find(item => item.id === tokenId);
  if (fallbackToken) {
    fallbackToken.size = nextSize;
    const fallbackPosition = clampMapTokenPosition(fallbackData, fallbackToken, fallbackToken.x, fallbackToken.y);
    fallbackToken.x = fallbackPosition.x;
    fallbackToken.y = fallbackPosition.y;
  } else {
    fallbackData.tokens.push(token);
  }
  if (latest?.name) map.name = latest.name;
  map.data = fallbackData;
  await saveCampaignMap(map, "");
}
async function paintCampaignMapTile(mapId, tileId, x, y, mode = "paint") {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can edit the map"); return; }
  const data = normalizeMapData(map.data);
  const boundedX = Math.min(data.columns - 1, Math.max(0, x));
  const boundedY = Math.min(data.rows - 1, Math.max(0, y));
  data.tiles = data.tiles.filter(tile => !(Number(tile.x) === boundedX && Number(tile.y) === boundedY));
  if (mode !== "erase") data.tiles.push({ x: boundedX, y: boundedY, tileId });
  map.data = data;
  await saveCampaignMap(map, "", { preserveTokens: true });
}
async function addCampaignCustomTile(mapId, values) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can add tiles"); return; }
  const url = campaignTileImageDraft || String(values.tileUrl || "").trim();
  if (!url) { toast("Upload a tile image or paste an image URL"); return; }
  const name = String(values.tileName || "").trim() || "Custom Tile";
  map.data = normalizeMapData(map.data);
  const customTile = { id: `custom-${Date.now().toString(36)}`, name, category: "Custom", url };
  map.data.customTiles = [...map.data.customTiles, customTile].slice(-24);
  campaignTileImageDraft = "";
  selectedMapTile = customTile.id;
  selectedMapTool = "paint";
  await saveCampaignMap(map, `${name} added to tiles`, { preserveTokens: true });
}
async function setCampaignMapSession(mapId, state) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can control the map session"); return; }
  map.data = normalizeMapData(map.data);
  map.data.session = { state, updatedAt: new Date().toISOString() };
  await saveCampaignMap(map, state === "live" ? "Session started" : state === "paused" ? "Session paused" : state === "ended" ? "Session ended" : "Session reset", { preserveTokens: true });
}
async function updateCampaignMapToken(mapId, tokenId, updates = {}, message = "Token updated") {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can edit token details"); return; }
  const data = normalizeMapData(map.data);
  const index = data.tokens.findIndex(token => token.id === tokenId);
  if (index < 0) { toast("Token not found"); return; }
  data.tokens[index] = { ...data.tokens[index], ...updates };
  map.data = data;
  await saveCampaignMap(map, message);
}
async function deleteCampaignMapToken(mapId, tokenId) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can delete tokens"); return; }
  const data = normalizeMapData(map.data);
  data.tokens = data.tokens.filter(token => token.id !== tokenId);
  if (selectedMapToken === tokenId) selectedMapToken = null;
  map.data = data;
  await saveCampaignMap(map, "Token removed");
}
async function updateCampaignFog(mapId, action, x, y) {
  const map = campaignMapById(mapId);
  if (!map || !canEditCampaign(map.campaign_id)) { toast("Only the DM can edit fog of war"); return; }
  const data = normalizeMapData(map.data);
  const cells = new Set(data.fog.cells);
  if (action === "cover-all") {
    data.fog.enabled = true;
    data.fog.cells = allMapCells(data);
  } else if (action === "reveal-all") {
    data.fog.enabled = false;
    data.fog.cells = [];
  } else {
    data.fog.enabled = true;
    const key = mapCellKey(x, y);
    if (action === "fog-erase") cells.delete(key);
    else cells.add(key);
    data.fog.cells = [...cells];
  }
  map.data = data;
  await saveCampaignMap(map, action === "cover-all" ? "Map covered by fog" : action === "reveal-all" ? "Map revealed" : "", { preserveTokens: true });
}
async function addCampaignMapPing(mapId, x, y) {
  const map = campaignMapById(mapId);
  if (!map) return;
  const data = normalizeMapData(map.data);
  const ping = {
    id: `ping-${Date.now().toString(36)}`,
    x: Math.max(0, Math.min(data.columns - 1, Number(x) || 0)),
    y: Math.max(0, Math.min(data.rows - 1, Number(y) || 0)),
    by: cloudUser?.user_metadata?.display_name || cloudUser?.email?.split("@")[0] || "Player",
    time: Date.now()
  };
  if (cloudUser && cloudClient) {
    const { data: updatedMap, error } = await cloudClient.rpc("add_campaign_map_ping", {
      p_map_id: map.id,
      p_x: ping.x,
      p_y: ping.y,
      p_label: ping.by
    });
    if (!error && updatedMap?.id) {
      updateCampaignMapCache(updatedMap);
      renderCampaigns();
      return;
    }
    if (error && !isMissingSecurityRpc(error)) {
      toast(`Could not ping map: ${error.message}`);
      return;
    }
  }
  data.pings = [
    ...data.pings.filter(ping => Date.now() - Number(ping.time || 0) < 15000),
    ping
  ].slice(-12);
  map.data = data;
  if (canEditCampaign(map.campaign_id)) await saveCampaignMap(map, "", { preserveTokens: true });
  else {
    updateCampaignMapCache(map);
    renderCampaigns();
  }
}
function campaignLogRows(campaignId, isDm = false) {
  return campaignGameLogs
    .filter(entry => entry.campaign_id === campaignId && (isDm || (entry.visibility || "public") !== "dm" || entry.actor_user_id === cloudUser?.id))
    .sort((a, b) => new Date(b.created_at || b.time || 0) - new Date(a.created_at || a.time || 0))
    .slice(0, 40);
}
async function recordCampaignGameLog(campaignId, payload) {
  if (!campaignId) return;
  const entry = {
    id: `local-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
    campaign_id: campaignId,
    actor_user_id: cloudUser?.id || "",
    actor_name: cloudUser?.user_metadata?.display_name || cloudUser?.email?.split("@")[0] || "Player",
    source: payload.source || "sheet",
    label: payload.label || "Roll",
    rolls: payload.rolls || [],
    raw_total: Number(payload.rawTotal || 0),
    modifier: Number(payload.modifier || 0),
    total: Number(payload.total || 0),
    visibility: payload.visibility || "public",
    created_at: new Date().toISOString()
  };
  campaignGameLogs = [entry, ...campaignGameLogs.filter(item => item.id !== entry.id)].slice(0, 120);
  saveCampaignCache();
  if (cloudUser && cloudClient) {
    const { data, error } = await cloudClient.from("campaign_game_log").insert({
      campaign_id: campaignId,
      actor_user_id: cloudUser.id,
      actor_name: entry.actor_name,
      character_id: payload.characterId || null,
      source: entry.source,
      label: entry.label,
      rolls: entry.rolls,
      raw_total: entry.raw_total,
      modifier: entry.modifier,
      total: entry.total,
      visibility: entry.visibility
    }).select("id, campaign_id, actor_user_id, actor_name, character_id, source, label, rolls, raw_total, modifier, total, visibility, created_at").maybeSingle();
    if (error) {
      const message = String(error.message || "").toLowerCase();
      if (message.includes("campaign_game_log") || message.includes("schema cache") || message.includes("relation")) {
        setCloudStatus("Campaign rolls are local until you run the updated supabase-campaign-schema.sql.", true);
      } else {
        setCloudStatus(`Could not save campaign roll: ${error.message}`, true);
      }
    } else if (data?.id) {
      campaignGameLogs = [data, ...campaignGameLogs.filter(item => item.id !== entry.id && item.id !== data.id)].slice(0, 120);
      saveCampaignCache();
    }
  }
  if ($("#campaigns-view")?.classList.contains("active")) renderCampaigns();
}
function persistCharacters() {
  const savedMain = saveJson(STORAGE_KEY, characters);
  const savedUser = cloudUser ? saveJson(`${STORAGE_KEY}.${cloudUser.id}`, characters) : true;
  if (savedMain || savedUser) writeRecoverySnapshot("characters saved");
  if (savedMain || savedUser) scheduleCloudBackup("characters saved");
  if (cloudUser && cloudClient) {
    clearTimeout(cloudSyncTimer);
    cloudSyncTimer = setTimeout(syncCharactersToCloud, 350);
  }
  return savedMain && savedUser;
}
async function syncCharactersToCloud() {
  if (!cloudUser || !cloudClient) return;
  let syncedOwnCount = 0;
  let syncedSharedCount = 0;
  try {
    const ownRows = characters
      .filter(character => !isDemoCharacter(character)
        && characterTimestamp(character) > deletionTimestamp(character.id)
        && isOwnCharacter(character))
      .map(character => ({
      id: character.id,
      user_id: cloudUser.id,
      data: { ...character, cloudOwnerId: cloudUser.id, _campaignShared: undefined, _campaignRole: undefined, _campaignIds: undefined },
      is_deleted: false,
      updated_at: new Date(character.updatedAt || Date.now()).toISOString()
    }));
    const sharedRows = characters
      .filter(character => !isDemoCharacter(character)
        && characterTimestamp(character) > deletionTimestamp(character.id)
        && !isOwnCharacter(character)
        && character._campaignRole === "dm")
      .map(character => ({
        id: character.id,
        user_id: characterOwnerId(character),
        data: { ...character, cloudOwnerId: characterOwnerId(character), _campaignShared: undefined, _campaignRole: undefined, _campaignIds: undefined },
        is_deleted: false,
        updated_at: new Date(character.updatedAt || Date.now()).toISOString()
      }));
    const activeIds = new Set(ownRows.map(row => row.id));
    const deletedRows = Object.entries(deletedCharacters).filter(([id]) => !activeIds.has(id)).map(([id, timestamp]) => ({
      id,
      user_id: cloudUser.id,
      data: { id },
      is_deleted: true,
      updated_at: new Date(timestamp).toISOString()
    }));
    const ownSyncRows = [...ownRows, ...deletedRows];
    if (ownSyncRows.length) {
      const { error } = await cloudClient.from("characters").upsert(ownSyncRows, { onConflict: "user_id,id" });
      if (error) { setCloudStatus(`Cloud sync failed: ${error.message}`, true); return; }
      syncedOwnCount = ownRows.length;
    }
    for (const row of sharedRows) {
      const { error } = await cloudClient.from("characters")
        .update({ data: row.data, is_deleted: false, updated_at: row.updated_at })
        .eq("user_id", row.user_id)
        .eq("id", row.id);
      if (error) { setCloudStatus(`Campaign sheet sync failed: ${error.message}`, true); return; }
      syncedSharedCount += 1;
    }
  } catch (error) {
    writeRecoverySnapshot("character sync failed");
    setCloudStatus(`Cloud sync failed. Your changes are saved locally: ${error.message || error}`, true);
    return;
  }
  const sharedText = syncedSharedCount ? `, ${syncedSharedCount} DM sheet update${syncedSharedCount === 1 ? "" : "s"}` : "";
  setCloudStatus(`Cloud vault synced at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} (${syncedOwnCount} owned character${syncedOwnCount === 1 ? "" : "s"}${sharedText})`);
}
async function ensureCampaignDmMembership(campaign, displayName, joinedAt) {
  const row = {
    campaign_id: campaign.id,
    user_id: cloudUser.id,
    role: "dm",
    display_name: displayName,
    joined_at: joinedAt || campaign.updated_at || new Date().toISOString()
  };
  const rpc = await cloudClient.rpc("ensure_campaign_dm_membership", {
    p_campaign_id: campaign.id,
    p_display_name: displayName
  });
  if (!rpc.error) return { ok: true, method: "rpc" };
  if (!isMissingSecurityRpc(rpc.error)) return { ok: false, fallbackError: rpc.error };

  const upsert = await cloudClient.from("campaign_members")
    .upsert(row, { onConflict: "campaign_id,user_id" });
  if (!upsert.error) return { ok: true, method: "upsert" };

  const insert = await cloudClient.from("campaign_members").insert(row);
  if (!insert.error) return { ok: true, method: "insert" };
  const insertMessage = String(insert.error.message || "").toLowerCase();
  if (!insertMessage.includes("duplicate") && !insertMessage.includes("already exists")) {
    return { ok: false, error: upsert.error, fallbackError: insert.error };
  }

  const update = await cloudClient.from("campaign_members")
    .update({ role: "dm", display_name: displayName })
    .eq("campaign_id", campaign.id)
    .eq("user_id", cloudUser.id);
  if (!update.error) return { ok: true, method: "update" };
  return { ok: false, error: upsert.error, fallbackError: update.error };
}
async function syncCampaignsToCloud() {
  if (!cloudUser || !cloudClient) return false;
  const ownedCampaigns = campaigns.filter(campaign => campaign?.id && campaign.owner_id === cloudUser.id);
  if (!ownedCampaigns.length) return true;
  try {
    const now = new Date().toISOString();
    const ownedCampaignIds = new Set(ownedCampaigns.map(campaign => campaign.id));
    const campaignRows = ownedCampaigns.map(campaign => ({
      id: campaign.id,
      owner_id: cloudUser.id,
      name: campaign.name || "Untitled Campaign",
      description: campaign.description || "",
      invite_code: campaign.invite_code || generateInviteCode(),
      updated_at: campaign.updated_at || now
    }));
    const { error: campaignError } = await cloudClient.from("campaigns")
      .upsert(campaignRows, { onConflict: "id" });
    if (campaignError) { reportCampaignError(campaignError, "Campaign sync failed", false); return false; }

    const displayName = accountDisplayName("DM");
    const memberRows = ownedCampaigns.map(campaign => {
      const existing = campaignMemberships.find(member => member.campaign_id === campaign.id && member.user_id === cloudUser.id);
      return {
        campaign_id: campaign.id,
        user_id: cloudUser.id,
        role: "dm",
        display_name: existing?.display_name || displayName,
        joined_at: existing?.joined_at || campaign.updated_at || now
      };
    });
    let repairedMemberships = 0;
    for (const campaign of ownedCampaigns) {
      const existing = memberRows.find(row => row.campaign_id === campaign.id);
      const result = await ensureCampaignDmMembership(campaign, existing?.display_name || displayName, existing?.joined_at || now);
      if (!result.ok) {
        const detail = result.fallbackError?.message || result.error?.message || "Unknown membership error";
        setCloudStatus(`Campaign membership sync failed for "${campaign.name}". ${detail}`, true);
        return false;
      }
      if (result.method !== "upsert") repairedMemberships += 1;
    }

    const ownLinks = campaignCharacters
      .filter(link => ownedCampaignIds.has(link.campaign_id) && link.owner_user_id === cloudUser.id)
      .map(link => ({
        campaign_id: link.campaign_id,
        owner_user_id: cloudUser.id,
        character_id: link.character_id,
        nickname: link.nickname || "",
        added_at: link.added_at || now
      }));
    if (ownLinks.length) {
      const { error: linkError } = await cloudClient.from("campaign_characters")
        .upsert(ownLinks, { onConflict: "campaign_id,owner_user_id,character_id" });
      if (linkError) { reportCampaignError(linkError, "Campaign character sync failed", false); return false; }
    }

    const mapRows = campaignMaps
      .filter(map => ownedCampaignIds.has(map.campaign_id))
      .map(map => ({
        id: map.id,
        campaign_id: map.campaign_id,
        owner_id: cloudUser.id,
        name: map.name || "Encounter Map",
        data: normalizeMapData(map.data),
        updated_at: map.updated_at || now
      }));
    if (mapRows.length) {
      const { error: mapError } = await cloudClient.from("campaign_maps")
        .upsert(mapRows, { onConflict: "id" });
      if (mapError && !isMissingCampaignSchema(mapError)) { reportCampaignError(mapError, "Campaign map sync failed", false); return false; }
    }

    const repairText = repairedMemberships ? `, ${repairedMemberships} membership repair${repairedMemberships === 1 ? "" : "s"}` : "";
    setCloudStatus(`Campaigns synced at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} (${campaignRows.length} campaign${campaignRows.length === 1 ? "" : "s"}, ${mapRows.length} map${mapRows.length === 1 ? "" : "s"}${repairText})`);
    return true;
  } catch (error) {
    writeRecoverySnapshot("campaign sync failed");
    setCloudStatus(`Campaign sync failed. Cached campaigns are still local: ${error.message || error}`, true);
    return false;
  }
}
function backupFingerprint(payload) {
  const text = JSON.stringify(payload);
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = ((hash << 5) - hash + text.charCodeAt(index)) | 0;
  }
  return `${text.length}:${hash >>> 0}`;
}
function accountBackupPayload() {
  const ownedCampaignIds = new Set(campaigns
    .filter(campaign => campaign?.id && campaign.owner_id === cloudUser?.id)
    .map(campaign => campaign.id));
  const ownCharacterIds = new Set(ownCharacters().map(character => character.id));
  const cleanedCharacters = ownCharacters().map(character => ({
    ...character,
    cloudOwnerId: cloudUser.id,
    _campaignShared: undefined,
    _campaignRole: undefined,
    _campaignIds: undefined
  }));
  return {
    version: 2,
    app: "DND Beyonder",
    userId: cloudUser.id,
    createdAt: new Date().toISOString(),
    characters: cleanedCharacters,
    campaigns: campaigns
      .filter(campaign => ownedCampaignIds.has(campaign.id))
      .map(campaign => ({ ...campaign, owner_id: cloudUser.id })),
    campaignMemberships: campaignMemberships
      .filter(member => ownedCampaignIds.has(member.campaign_id) || member.user_id === cloudUser.id),
    campaignCharacters: campaignCharacters
      .filter(link => (ownedCampaignIds.has(link.campaign_id) && link.owner_user_id === cloudUser.id)
        || (link.owner_user_id === cloudUser.id && ownCharacterIds.has(link.character_id))),
    campaignMaps: campaignMaps
      .filter(map => ownedCampaignIds.has(map.campaign_id))
      .map(map => ({ ...map, owner_id: cloudUser.id, data: normalizeMapData(map.data) })),
    deletedCharacters
  };
}
async function createAccountBackup(label = "Automatic backup", options = {}) {
  if (!cloudUser || !cloudClient) return false;
  const payload = accountBackupPayload();
  const fingerprint = backupFingerprint(payload);
  const metaKey = `${BACKUP_META_KEY}.${cloudUser.id}`;
  const meta = readJson(metaKey, {});
  const recent = Date.now() - Number(meta.createdAt || 0) < 60_000;
  if (!options.force && meta.fingerprint === fingerprint && recent) return true;
  const { error } = await cloudClient.from("account_backups").insert({
    user_id: cloudUser.id,
    label,
    data: payload
  });
  if (error) {
    const message = isMissingBackupSchema(error)
      ? "Cloud backups need the updated Supabase schema. Run supabase-campaign-schema.sql, then try Backup now."
      : `Cloud backup failed: ${error.message}`;
    setBackupStatus(message, true);
    return false;
  }
  saveJson(metaKey, { fingerprint, createdAt: Date.now() });
  await pruneAccountBackups();
  setBackupStatus(`Latest cloud backup: ${new Date().toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`);
  return true;
}
function scheduleCloudBackup(reason = "Automatic backup") {
  if (!cloudUser || !cloudClient) return;
  clearTimeout(cloudBackupTimer);
  cloudBackupTimer = setTimeout(() => {
    createAccountBackup(reason).catch(error => setBackupStatus(`Cloud backup failed: ${error.message || error}`, true));
  }, 2500);
}
async function pruneAccountBackups(limit = 10) {
  if (!cloudUser || !cloudClient) return;
  const { data, error } = await cloudClient.from("account_backups")
    .select("id, created_at")
    .order("created_at", { ascending: false })
    .limit(40);
  if (error || !Array.isArray(data) || data.length <= limit) return;
  const oldIds = data.slice(limit).map(row => row.id).filter(Boolean);
  if (oldIds.length) await cloudClient.from("account_backups").delete().in("id", oldIds);
}
function setBackupStatus(message, isError = false) {
  const status = $("#backup-status");
  if (!status) return;
  status.textContent = message || "";
  status.classList.toggle("error", Boolean(isError));
}
async function refreshBackupStatus() {
  if (!cloudUser || !cloudClient) {
    setBackupStatus("");
    return;
  }
  const { data, error } = await cloudClient.from("account_backups")
    .select("id, label, created_at")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) {
    if (isMissingBackupSchema(error)) setBackupStatus("Cloud backups are not set up yet. Run the updated Supabase schema.", true);
    return;
  }
  const latest = data?.[0];
  setBackupStatus(latest ? `Latest cloud backup: ${new Date(latest.created_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}` : "No cloud backup yet.");
}
async function restoreLatestAccountBackup() {
  if (!cloudUser || !cloudClient) return;
  const { data, error } = await cloudClient.from("account_backups")
    .select("id, label, data, created_at")
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) {
    setBackupStatus(isMissingBackupSchema(error) ? "Cloud backups are not set up yet. Run the updated Supabase schema." : `Could not load backup: ${error.message}`, true);
    return;
  }
  const backup = data?.[0]?.data;
  if (!backup) {
    setBackupStatus("No cloud backup found for this account.", true);
    return;
  }
  const restoredCharacters = (Array.isArray(backup.characters) ? backup.characters : []).map(character => ({
    ...character,
    cloudOwnerId: cloudUser.id,
    _campaignShared: undefined,
    _campaignRole: undefined,
    _campaignIds: undefined,
    updatedAt: Number(character.updatedAt || Date.now())
  }));
  const ownedCampaigns = (Array.isArray(backup.campaigns) ? backup.campaigns : []).map(campaign => ({ ...campaign, owner_id: cloudUser.id }));
  const ownedCampaignIds = new Set(ownedCampaigns.map(campaign => campaign.id));
  characters = mergeUserVaultCharacters([characters.filter(character => !isOwnCharacter(character)), restoredCharacters], cloudUser.id);
  campaigns = mergeRecordsById(ownedCampaigns, campaigns.filter(campaign => campaign.owner_id !== cloudUser.id));
  campaignMemberships = mergeRecordsById(
    (Array.isArray(backup.campaignMemberships) ? backup.campaignMemberships : []).filter(member => ownedCampaignIds.has(member.campaign_id) || member.user_id === cloudUser.id),
    campaignMemberships.filter(member => !ownedCampaignIds.has(member.campaign_id) && member.user_id !== cloudUser.id),
    member => `${member?.campaign_id}:${member?.user_id}`
  );
  ownedCampaignIds.forEach(campaignId => {
    if (!campaignMemberships.some(member => member.campaign_id === campaignId && member.user_id === cloudUser.id)) {
      campaignMemberships.push({ campaign_id: campaignId, user_id: cloudUser.id, role: "dm", display_name: accountDisplayName("DM"), joined_at: new Date().toISOString() });
    }
  });
  campaignCharacters = mergeRecordsById(
    (Array.isArray(backup.campaignCharacters) ? backup.campaignCharacters : []).filter(link => link.owner_user_id === cloudUser.id),
    campaignCharacters.filter(link => link.owner_user_id !== cloudUser.id),
    link => `${link?.campaign_id}:${link?.owner_user_id}:${link?.character_id}`
  );
  campaignMaps = mergeRecordsById(
    (Array.isArray(backup.campaignMaps) ? backup.campaignMaps : []).filter(map => ownedCampaignIds.has(map.campaign_id)).map(map => ({ ...map, owner_id: cloudUser.id, data: normalizeMapData(map.data) })),
    campaignMaps.filter(map => !ownedCampaignIds.has(map.campaign_id))
  );
  deletedCharacters = backup.deletedCharacters && typeof backup.deletedCharacters === "object" ? backup.deletedCharacters : {};
  saveJson(STORAGE_KEY, characters);
  saveJson(`${STORAGE_KEY}.${cloudUser.id}`, characters);
  persistDeletedCharacters();
  saveCampaignCache();
  await syncCharactersToCloud();
  await syncCampaignsToCloud();
  await createAccountBackup("Post-restore backup", { force: true });
  await loadCampaigns();
  renderCards($("#vault-search")?.value || "");
  renderSheet();
  setBackupStatus(`Restored backup from ${new Date(data[0].created_at).toLocaleString([], { dateStyle: "medium", timeStyle: "short" })}`);
  toast("Cloud backup restored");
}
async function loadCloudCharacters() {
  if (!cloudUser || !cloudClient) return;
  const { data, error } = await cloudClient.from("characters").select("id, user_id, data, updated_at, is_deleted");
  if (error) {
    writeRecoverySnapshot("cloud vault load failed");
    setCloudStatus(`Could not load cloud vault. Showing cached characters: ${error.message}`, true);
    renderCards();
    renderSheet();
    return;
  }
  const sharedLookup = new Map(campaignCharacters.map(link => [`${link.owner_user_id}:${link.character_id}`, link]));
  const merged = new Map(characters
    .filter(character => !isDemoCharacter(character) && isOwnCharacter(character))
    .map(character => [`${characterOwnerId(character)}:${character.id}`, character]));
  (data || []).forEach(row => {
    const remoteTimestamp = Date.parse(row.updated_at) || Number(row.data?.updatedAt || 0);
    const rowKey = `${row.user_id}:${row.id}`;
    const shared = sharedLookup.get(rowKey);
    const campaignId = shared?.campaign_id || "";
    const role = campaignId ? campaignRole(campaignId) : "";
    const isOwn = row.user_id === cloudUser.id;
    if (!isOwn && role !== "dm") return;
    if (row.is_deleted) {
      const localTimestamp = characterTimestamp(merged.get(rowKey));
      if (remoteTimestamp >= localTimestamp) {
        merged.delete(rowKey);
        if (isOwn && remoteTimestamp > deletionTimestamp(row.id)) deletedCharacters[row.id] = remoteTimestamp;
      } else {
        if (isOwn) delete deletedCharacters[row.id];
      }
      return;
    }
    const remote = {
      ...row.data,
      id: row.id,
      cloudOwnerId: row.user_id,
      _campaignShared: !isOwn,
      _campaignRole: role || "",
      _campaignIds: campaignCharacters.filter(link => link.owner_user_id === row.user_id && link.character_id === row.id).map(link => link.campaign_id)
    };
    const local = merged.get(rowKey);
    if (isOwn && deletionTimestamp(remote.id) >= remoteTimestamp) return;
    if (!local || remoteTimestamp >= characterTimestamp(local)) merged.set(rowKey, remote);
    if (isOwn && remoteTimestamp > deletionTimestamp(remote.id)) delete deletedCharacters[remote.id];
  });
  characters = [...merged.values()].sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
  saveJson(STORAGE_KEY, characters);
  saveJson(`${STORAGE_KEY}.${cloudUser.id}`, characters);
  persistDeletedCharacters();
  writeRecoverySnapshot("cloud vault loaded");
  renderCards();
  renderSheet();
  await syncCharactersToCloud();
}
async function loadCampaigns() {
  if (!cloudUser || !cloudClient) {
    renderCampaigns();
    return;
  }
  let campaignResult;
  let memberResult;
  let characterResult;
  let mapResult;
  let logResult;
  try {
    [campaignResult, memberResult, characterResult, mapResult, logResult] = await Promise.all([
      cloudClient.from("campaigns").select("id, owner_id, name, description, invite_code, updated_at"),
      cloudClient.from("campaign_members").select("campaign_id, user_id, role, display_name, joined_at"),
      cloudClient.from("campaign_characters").select("campaign_id, owner_user_id, character_id, nickname, added_at"),
      cloudClient.from("campaign_maps").select("id, campaign_id, owner_id, name, data, updated_at"),
      cloudClient.from("campaign_game_log").select("id, campaign_id, actor_user_id, actor_name, character_id, source, label, rolls, raw_total, modifier, total, visibility, created_at").order("created_at", { ascending: false }).limit(120)
    ]);
  } catch (error) {
    writeRecoverySnapshot("campaign load failed");
    setCloudStatus(`Could not refresh campaigns. Showing cached campaign data: ${error.message || error}`, true);
    renderCampaigns();
    return;
  }
  if (campaignResult.error) { reportCampaignError(campaignResult.error, "Could not load campaigns", false); return; }
  if (memberResult.error) { reportCampaignError(memberResult.error, "Could not load campaign members", false); return; }
  if (characterResult.error) { reportCampaignError(characterResult.error, "Could not load campaign characters", false); return; }
  if (mapResult.error && !isMissingCampaignSchema(mapResult.error)) { reportCampaignError(mapResult.error, "Could not load campaign maps", false); return; }
  const priorCampaigns = Array.isArray(campaigns) ? campaigns : [];
  const priorMemberships = Array.isArray(campaignMemberships) ? campaignMemberships : [];
  const priorCampaignCharacters = Array.isArray(campaignCharacters) ? campaignCharacters : [];
  const priorCampaignMaps = Array.isArray(campaignMaps) ? campaignMaps : [];
  const priorCampaignLogs = Array.isArray(campaignGameLogs) ? campaignGameLogs : [];
  campaignMemberships = mergeRecordsById(memberResult.data || [], priorMemberships, member => `${member?.campaign_id}:${member?.user_id}`);
  const myCampaignIds = new Set(campaignMemberships.filter(member => member.user_id === cloudUser.id).map(member => member.campaign_id));
  const remoteCampaigns = (campaignResult.data || [])
    .filter(campaign => myCampaignIds.has(campaign.id) || campaign.owner_id === cloudUser.id)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  campaigns = mergeRecordsById(remoteCampaigns, priorCampaigns)
    .filter(campaign => myCampaignIds.has(campaign.id) || campaign.owner_id === cloudUser.id)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  campaigns.forEach(campaign => {
    if (campaign.owner_id === cloudUser.id && !campaignMemberships.some(member => member.campaign_id === campaign.id && member.user_id === cloudUser.id)) {
      campaignMemberships.push({ campaign_id: campaign.id, user_id: cloudUser.id, role: "dm", display_name: accountDisplayName("DM"), joined_at: campaign.updated_at || new Date().toISOString() });
      myCampaignIds.add(campaign.id);
    }
  });
  campaignCharacters = mergeRecordsById((characterResult.data || []).filter(link => myCampaignIds.has(link.campaign_id)), priorCampaignCharacters, link => `${link?.campaign_id}:${link?.owner_user_id}:${link?.character_id}`)
    .filter(link => myCampaignIds.has(link.campaign_id));
  campaignMaps = mergeRecordsById(mapResult.error ? [] : (mapResult.data || []).filter(map => myCampaignIds.has(map.campaign_id)), priorCampaignMaps)
    .filter(map => myCampaignIds.has(map.campaign_id));
  if (!logResult.error) {
    campaignGameLogs = mergeRecordsById((logResult.data || []).filter(entry => myCampaignIds.has(entry.campaign_id)), priorCampaignLogs)
      .filter(entry => myCampaignIds.has(entry.campaign_id))
      .slice(0, 160);
  } else if (!String(logResult.error.message || "").toLowerCase().includes("campaign_game_log")) {
    setCloudStatus(`Could not load campaign game log: ${logResult.error.message}`, true);
  }
  if (!activeCampaignId || !campaigns.some(campaign => campaign.id === activeCampaignId)) activeCampaignId = campaigns[0]?.id || "";
  if (activeMapId && !campaignMaps.some(map => map.id === activeMapId)) activeMapId = "";
  saveCampaignCache();
  renderCampaigns();
  await loadCloudCharacters();
  renderCampaigns();
  if ($("#campaigns-view")?.classList.contains("active")) startCampaignLiveSync(true);
}
async function createCampaign(name, description) {
  if (!cloudUser || !cloudClient) { toast("Sign in to create a campaign"); return; }
  const inviteCode = generateInviteCode();
  const { data, error } = await cloudClient.from("campaigns").insert({
    owner_id: cloudUser.id,
    name,
    description,
    invite_code: inviteCode,
    updated_at: new Date().toISOString()
  }).select("id, owner_id, name, description, invite_code, updated_at").single();
  if (error) { reportCampaignError(error, "Campaign create failed"); return; }
  const membership = await ensureCampaignDmMembership(data, accountDisplayName("DM"), data.updated_at);
  if (!membership.ok) {
    const detail = membership.fallbackError?.message || membership.error?.message || "Unknown membership error";
    setCloudStatus(`Campaign created, but DM membership repair failed: ${detail}`, true);
  }
  activeCampaignId = data.id;
  await loadCampaigns();
  toast(`${name} created`);
}
async function joinCampaign(inviteCode) {
  if (!cloudUser || !cloudClient) { toast("Sign in to join a campaign"); return; }
  const code = inviteCode.trim().toUpperCase();
  const displayName = accountDisplayName("Player");
  const { data, error } = await cloudClient.rpc("join_campaign_by_invite", {
    p_invite_code: code,
    p_display_name: displayName
  });
  if (error) {
    if (isMissingSecurityRpc(error)) {
      const fallback = await cloudClient.from("campaigns").select("id, name").eq("invite_code", code).single();
      if (fallback.error || !fallback.data) { toast("Invite code not found"); return; }
      const { error: joinError } = await cloudClient.from("campaign_members").upsert({
        campaign_id: fallback.data.id,
        user_id: cloudUser.id,
        role: "player",
        display_name: displayName
      }, { onConflict: "campaign_id,user_id" });
      if (joinError) { toast(`Could not join campaign: ${joinError.message}`); return; }
      activeCampaignId = fallback.data.id;
      await loadCampaigns();
      toast(`Joined ${fallback.data.name}`);
      return;
    }
    if (isMissingCampaignSchema(error)) reportCampaignError(error, "Could not join campaign");
    else toast("Invite code not found");
    return;
  }
  const joined = Array.isArray(data) ? data[0] : data;
  if (!joined?.id) { toast("Invite code not found"); return; }
  activeCampaignId = joined.id;
  await loadCampaigns();
  toast(`Joined ${joined.name}`);
}
async function deleteCampaign(campaignId) {
  const campaign = campaigns.find(item => item.id === campaignId);
  if (!cloudUser || !cloudClient || !campaign) return;
  if (campaign.owner_id !== cloudUser.id) { toast("Only the campaign owner can delete this campaign"); return; }
  const { error } = await cloudClient.from("campaigns").delete().eq("id", campaignId);
  if (error) { reportCampaignError(error, "Could not delete campaign"); return; }
  campaigns = campaigns.filter(item => item.id !== campaignId);
  campaignMemberships = campaignMemberships.filter(member => member.campaign_id !== campaignId);
  campaignCharacters = campaignCharacters.filter(link => link.campaign_id !== campaignId);
  campaignMaps = campaignMaps.filter(map => map.campaign_id !== campaignId);
  campaignGameLogs = campaignGameLogs.filter(entry => entry.campaign_id !== campaignId);
  if (activeCampaignId === campaignId) activeCampaignId = campaigns[0]?.id || "";
  if (activeMapId && !campaignMaps.some(map => map.id === activeMapId)) activeMapId = "";
  saveCampaignCache();
  renderCards();
  renderCampaigns();
  toast("Campaign deleted");
}
async function shareCharacterWithCampaign(campaignId, characterId) {
  const character = characters.find(item => item.id === characterId && isOwnCharacter(item));
  if (!cloudUser || !cloudClient || !character) return;
  character.cloudOwnerId = cloudUser.id;
  character.updatedAt = Date.now();
  await syncCharactersToCloud();
  const { error } = await cloudClient.from("campaign_characters").upsert({
    campaign_id: campaignId,
    owner_user_id: cloudUser.id,
    character_id: character.id,
    nickname: character.name || ""
  }, { onConflict: "campaign_id,owner_user_id,character_id" });
  if (error) { reportCampaignError(error, "Could not share character"); return; }
  await loadCampaigns();
  toast(`${character.name} joined the campaign`);
}
async function removeCampaignCharacter(campaignId, ownerUserId, characterId) {
  if (!cloudUser || !cloudClient) return;
  const { error } = await cloudClient.from("campaign_characters")
    .delete()
    .eq("campaign_id", campaignId)
    .eq("owner_user_id", ownerUserId)
    .eq("character_id", characterId);
  if (error) { reportCampaignError(error, "Could not remove character"); return; }
  await loadCampaigns();
  toast("Character removed from campaign");
}
function setCloudStatus(message, isError = false) {
  const status = $("#account-status");
  if (status) {
    status.textContent = message;
    status.classList.toggle("error", isError);
  }
  const saveStatus = $("#save-status");
  if (saveStatus) {
    saveStatus.textContent = cloudUser
      ? (isError ? "Saved locally; cloud sync needs attention." : "Saved locally and synchronized to your account.")
      : "Saved in this browser. Sign in to synchronize across devices.";
  }
}
function prepareUserVault(user) {
  if (!user) return;
  writeRecoverySnapshot("before account switch");
  const priorOwner = localStorage.getItem(CLOUD_OWNER_KEY);
  const sameOwnerLocal = priorOwner === user.id;
  const localCharacters = sameOwnerLocal ? (Array.isArray(characters) ? characters : []) : [];
  const localCampaigns = sameOwnerLocal ? (Array.isArray(campaigns) ? campaigns : []) : [];
  const localMemberships = sameOwnerLocal ? (Array.isArray(campaignMemberships) ? campaignMemberships : []) : [];
  const localCampaignCharacters = sameOwnerLocal ? (Array.isArray(campaignCharacters) ? campaignCharacters : []) : [];
  const localCampaignMaps = sameOwnerLocal ? (Array.isArray(campaignMaps) ? campaignMaps : []) : [];
  const localCampaignLogs = sameOwnerLocal ? (Array.isArray(campaignGameLogs) ? campaignGameLogs : []) : [];
  const cached = readJson(`${STORAGE_KEY}.${user.id}`, null);
  const cachedCampaigns = readJson(`${CAMPAIGN_KEY}.${user.id}`, null);
  const cachedMemberships = readJson(`${CAMPAIGN_MEMBER_KEY}.${user.id}`, null);
  const cachedCampaignCharacters = readJson(`${CAMPAIGN_CHARACTER_KEY}.${user.id}`, null);
  const cachedCampaignMaps = readJson(`${CAMPAIGN_MAP_KEY}.${user.id}`, null);
  const cachedCampaignLogs = readJson(`${CAMPAIGN_LOG_KEY}.${user.id}`, null);
  const cachedDeletions = readJson(`${DELETED_KEY}.${user.id}`, null);
  characters = mergeUserVaultCharacters([cached || [], localCharacters], user.id);
  campaigns = mergeRecordsById(cachedCampaigns || [], localCampaigns);
  campaignMemberships = mergeRecordsById(cachedMemberships || [], localMemberships, member => `${member?.campaign_id}:${member?.user_id}`);
  campaignCharacters = mergeRecordsById(cachedCampaignCharacters || [], localCampaignCharacters, link => `${link?.campaign_id}:${link?.owner_user_id}:${link?.character_id}`);
  campaignMaps = mergeRecordsById(cachedCampaignMaps || [], localCampaignMaps);
  campaignGameLogs = mergeRecordsById(cachedCampaignLogs || [], localCampaignLogs);
  deletedCharacters = cachedDeletions || (sameOwnerLocal ? deletedCharacters : {});
  localStorage.setItem(CLOUD_OWNER_KEY, user.id);
  saveJson(STORAGE_KEY, characters);
  persistDeletedCharacters();
  saveCampaignCache();
  writeRecoverySnapshot("account prepared");
}
function modifier(score) { return Math.floor((Number(score || 10) - 10) / 2); }
function signed(value) { return value >= 0 ? `+${value}` : String(value); }

// Plain-language help for new players. Each entry: [term, explanation].
const GLOSSARY = {
  ac: ["Armor Class (AC)", "How hard you are to hit. An attacker must roll this number or higher to land a hit on you. Higher is better."],
  hp: ["Hit Points (HP)", "Your health. You lose HP when you take damage and fall unconscious at 0. Resting restores it."],
  proficiency: ["Proficiency Bonus", "A bonus you add to things your character is trained in — attacks, certain skills, and saving throws. It grows as you level up."],
  initiative: ["Initiative", "A quick Dexterity roll at the start of a fight that sets turn order. Higher numbers act first."],
  ability: ["Ability Scores", "Your six core traits: Strength, Dexterity, Constitution, Intelligence, Wisdom, and Charisma. The big number is the score; the +/- beside it is the modifier you add to rolls."],
  save: ["Saving Throws", "Rolls to resist danger — dodging a blast, shrugging off poison, keeping your nerve. You add the matching ability modifier, plus your proficiency bonus when you're proficient."],
  skill: ["Skills", "Specific things you can be good at, like Stealth or Persuasion. You roll a d20 and add the linked ability modifier and any bonus."],
  spellSave: ["Spell Save DC", "The number an enemy must beat on its saving throw to resist one of your spells."],
  spellAttack: ["Spell Attack Bonus", "What you add to your roll when you attack a target with a spell."],
  asi: ["Ability Score Improvement", "At certain levels you can raise your ability scores — or take a feat instead — to get better at what you do."],
  feat: ["Feats", "Special talents that grant a unique ability. You can take one in place of an Ability Score Improvement."],
  subclass: ["Subclass", "A specialization within your class that grants extra features as you level, like a Cleric choosing a divine domain."],
  level: ["Level", "How experienced your character is, from 1 to 20. Higher levels unlock more power and new features."]
};

function helpChip(key) {
  const entry = GLOSSARY[key];
  if (!entry) return "";
  return `<span class="help-chip" role="button" tabindex="0" data-help="${key}" aria-label="What is ${escapeHtml(entry[0])}?">?</span>`;
}

let helpPopoverEl = null;
function hideHelpPopover() { if (helpPopoverEl) { helpPopoverEl.remove(); helpPopoverEl = null; } }
function showHelpPopover(chip) {
  hideHelpPopover();
  const entry = GLOSSARY[chip.dataset.help];
  if (!entry) return;
  const pop = document.createElement("div");
  pop.className = "help-popover";
  pop.innerHTML = `<strong>${escapeHtml(entry[0])}</strong><p>${escapeHtml(entry[1])}</p>`;
  document.body.appendChild(pop);
  const rect = chip.getBoundingClientRect();
  const maxLeft = window.scrollX + document.documentElement.clientWidth - pop.offsetWidth - 10;
  pop.style.top = `${window.scrollY + rect.bottom + 8}px`;
  pop.style.left = `${Math.max(10, Math.min(window.scrollX + rect.left - 6, maxLeft))}px`;
  helpPopoverEl = pop;
}

function routeViewFromHash() {
  const view = String(location.hash || "").replace(/^#\/?/, "").split(/[/?&]/)[0] || "dashboard";
  return ROUTE_VIEWS.has(view) ? view : "dashboard";
}
function syncRoute(view, replace = false) {
  const nextHash = `#${view}`;
  if (location.hash === nextHash) return;
  const url = `${location.pathname}${location.search}${nextHash}`;
  if (replace) history.replaceState(null, "", url);
  else history.pushState(null, "", url);
}
function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#10131a" : "#f3f5f8");
  const toggle = $("#theme-toggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(nextTheme === "dark"));
    const label = toggle.querySelector("strong");
    if (label) label.textContent = nextTheme === "dark" ? "Dark" : "Light";
  }
}
function initTheme() {
  let theme = document.documentElement.dataset.theme || "light";
  try { theme = localStorage.getItem(THEME_KEY) || theme; } catch (e) {}
  applyTheme(theme);
  $("#theme-toggle")?.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    try { localStorage.setItem(THEME_KEY, nextTheme); } catch (e) {}
    applyTheme(nextTheme);
  });
}

function showWelcomeIfNeeded() {
  const tip = $("#welcome-tip");
  if (!tip) return;
  let dismissed = false;
  try { dismissed = localStorage.getItem("af-welcome-dismissed") === "1"; } catch (e) {}
  if (!dismissed) tip.removeAttribute("hidden");
}
function proficiency(level) { return 2 + Math.floor((Math.max(1, Number(level)) - 1) / 4); }
function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function toast(message) {
  const el = $("#toast"); el.textContent = message; el.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function cleanRuleDescription(description) {
  return String(description || "")
    .replace(/\s*System Reference Document 5\.(?:1|2(?:\.1)?)\s*/gi, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function ruleDetails(description) {
  const cleanedDescription = cleanRuleDescription(description);
  if (!cleanedDescription) return "";
  return `<details class="rule-detail"><summary>Read description</summary><p>${escapeHtml(cleanedDescription)}</p></details>`;
}

function spellLevelLabel(spell) {
  if (spell.level === "Custom") return "Custom spell";
  const level = Number(spell.level || 0);
  return level === 0 ? "Cantrip" : `Level ${level}`;
}

function titleCaseWords(value = "") {
  return String(value).toLowerCase().replace(/\b[a-z]/g, char => char.toUpperCase());
}

function plainRuleText(description) {
  return cleanRuleDescription(description)
    .replace(/([A-Za-z])\s+-\s*([A-Za-z])/g, "$1$2")
    .replace(/([A-Za-z])\s*-\s+([A-Za-z])/g, "$1$2")
    .replace(/#{2,6}\s*/g, "")
    .replace(/\*{1,3}/g, "")
    .replace(/\s+\|\s+/g, " | ")
    .trim();
}

function splitSpellText(description) {
  const full = plainRuleText(description);
  const result = { meta: {}, body: full };
  if (!full) return result;
  let headerMatch = full.match(/^Level\s+(\d+|Custom)\s+([A-Za-z ]+?)(?:\s+\([^)]+\))?\s+Casting Time:\s*/i);
  if (!headerMatch) {
    headerMatch = full.match(/^([A-Za-z ]+)\s+Cantrip(?:\s+\([^)]+\))?\s+Casting Time:\s*/i);
    if (headerMatch) headerMatch = [headerMatch[0], "0", headerMatch[1]];
  }
  if (!headerMatch) return result;

  result.meta.level = headerMatch[1];
  result.meta.school = titleCaseWords(headerMatch[2]);
  let rest = full.slice(headerMatch[0].length).trim();
  const rangeIndex = rest.indexOf(" Range:");
  if (rangeIndex >= 0) {
    result.meta.castingTime = rest.slice(0, rangeIndex).trim();
    rest = rest.slice(rangeIndex + " Range:".length).trim();
  }
  const durationIndex = rest.indexOf(" Duration:");
  if (durationIndex >= 0) {
    const rangeText = rest.slice(0, durationIndex).trim();
    const componentsIndex = rangeText.indexOf(" Components:");
    if (componentsIndex >= 0) {
      result.meta.range = rangeText.slice(0, componentsIndex).trim();
      result.meta.components = rangeText.slice(componentsIndex + " Components:".length).trim();
    } else {
      result.meta.range = rangeText;
    }
    rest = rest.slice(durationIndex + " Duration:".length).trim();
  }

  const durationMatch = rest.match(/^(Instantaneous|Special|Until dispelled(?: or triggered)?|Concentration,\s*up to\s*\d+\s+\w+|Up to\s*\d+\s+\w+|\d+\s+\w+)(?:\s+|$)/i);
  if (durationMatch) {
    result.meta.duration = durationMatch[1].trim();
    rest = rest.slice(durationMatch[0].length).trim();
  }
  result.body = rest || full;
  return result;
}

function uniqueList(items, limit = 4) {
  const seen = new Set();
  return items
    .map(item => String(item || "").trim())
    .filter(item => {
      const key = item.toLowerCase();
      if (!item || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, limit);
}

function spellMechanicsFromBody(body = "") {
  const text = plainRuleText(body);
  const damageTypes = ["acid", "bludgeoning", "cold", "fire", "force", "lightning", "necrotic", "piercing", "poison", "psychic", "radiant", "slashing", "thunder", "healing"];
  const saves = uniqueList([...text.matchAll(/\b(Strength|Dexterity|Constitution|Intelligence|Wisdom|Charisma)\s+saving throw/gi)].map(match => `${titleCaseWords(match[1])} save`), 3);
  const attacks = [];
  if (/\branged spell attack\b/i.test(text)) attacks.push("Ranged spell attack");
  if (/\bmelee spell attack\b/i.test(text)) attacks.push("Melee spell attack");
  if (!attacks.length && /\bspell attack\b/i.test(text)) attacks.push("Spell attack");

  const dice = uniqueList([...text.matchAll(/\b\d+d\d+(?:\s*\+\s*(?:\d+|your spellcasting ability modifier|your ability modifier))?\b/gi)].map(match => {
    const nearby = text.slice(Math.max(0, match.index - 45), match.index + 90).toLowerCase();
    const type = damageTypes.find(item => nearby.includes(`${item} damage`) || nearby.includes(`${item} hit points`));
    return type ? `${match[0]} ${type}` : match[0];
  }), 5);

  const areaCandidates = uniqueList([
    ...[...text.matchAll(/\b\d+[- ]foot[- ](?:radius\s+)?(?:sphere|cone|cube|cylinder|line|emanation|wall)\b/gi)].map(match => match[0]),
    ...[...text.matchAll(/\b\d+\s+feet?\s+(?:radius|long|high|wide|thick|diameter)\b/gi)].map(match => match[0]),
    ...[...text.matchAll(/\b\d+[- ]foot[- ]radius\b/gi)].map(match => match[0])
  ].map(item => item.replace(/-/g, " ")), 8);
  const areas = areaCandidates
    .filter((item, index, list) => !list.some((other, otherIndex) => otherIndex !== index && other.toLowerCase().includes(item.toLowerCase())))
    .slice(0, 4);

  return {
    saveAttack: uniqueList([...saves, ...attacks], 4).join(", "),
    dice: dice.join(", "),
    area: areas.join(", ")
  };
}

function spellEffectText(name, rulesEdition, source = "", limit = 560) {
  const full = spellDescription(name, rulesEdition, source);
  const { body } = splitSpellText(full);
  const fallback = contentSummary("spells", name);
  const effect = plainRuleText(body || fallback || full);
  if (!effect) return "No spell effect text is available yet.";
  return effect.length > limit ? `${effect.slice(0, limit - 3).trim()}...` : effect;
}

function renderSpellFact(label, value) {
  if (!value) return "";
  return `<span class="spell-fact"><small>${escapeHtml(label)}</small><strong>${escapeHtml(value)}</strong></span>`;
}

function spellcastingModifierForSpell(character, spell) {
  const className = spell.className && spell.className !== "Character" ? spell.className : primaryClassName(character);
  const context = withClassContext(character, className, classLevel(character, className) || characterTotalLevel(character));
  return modifier(character[spellcastingAbility(context)]);
}

function spellRollOptions(value, spell, character) {
  if (!value || /^none$/i.test(String(value).trim())) return [];
  const spellcastingModifier = spellcastingModifierForSpell(character, spell);
  const options = [];
  String(value).split(/\s*,\s*/).forEach(part => {
    const expression = /(\d+)\s*d\s*(\d+)(?:\s*\+\s*(\d+|your spellcasting ability modifier|your ability modifier))?/gi;
    for (const match of part.matchAll(expression)) {
      const count = Math.max(1, Number(match[1]));
      const sides = Math.max(2, Number(match[2]));
      const modifierText = String(match[3] || "");
      const rollModifier = /^\d+$/.test(modifierText) ? Number(modifierText) : modifierText ? spellcastingModifier : 0;
      const suffix = part.slice(Number(match.index || 0) + match[0].length).trim();
      const formula = `${count}d${sides}${rollModifier ? signed(rollModifier) : ""}`;
      const label = `${formula}${suffix ? ` ${suffix}` : ""}`;
      const key = `${count}:${sides}:${rollModifier}:${suffix.toLowerCase()}`;
      if (!options.some(option => option.key === key)) options.push({ key, count, sides, modifier: rollModifier, label });
    }
  });
  return options;
}

function renderSpellDiceFact(value, spell, character) {
  const options = spellRollOptions(value, spell, character);
  if (!options.length) return renderSpellFact("Dice", value);
  const buttons = options.map(option => `<button type="button" class="spell-dice-roll" data-spell-roll data-count="${option.count}" data-sides="${option.sides}" data-modifier="${option.modifier}" data-roll-label="${escapeHtml(`${spell.name} - ${option.label}`)}" aria-label="Roll ${escapeHtml(option.label)} for ${escapeHtml(spell.name)}">${escapeHtml(option.label)}</button>`).join("");
  return `<span class="spell-fact spell-dice-fact"><small>Dice <em>Click to roll</em></small><span class="spell-roll-list">${buttons}</span></span>`;
}

function renderSpellHitSaveFact(value, spell, character) {
  if (!value || !/spell attack/i.test(value)) return renderSpellFact("Hit / Save", value);
  const attackModifier = derived(character).prof + spellcastingModifierForSpell(character, spell);
  return `<span class="spell-fact spell-attack-fact"><small>Hit / Save</small><button type="button" class="spell-attack-roll" data-sheet-roll="${escapeHtml(`${spell.name} spell attack`)}" data-modifier="${attackModifier}">${escapeHtml(value)} <strong>${signed(attackModifier)}</strong></button></span>`;
}

function spellRuleDetails(description) {
  const cleanedDescription = plainRuleText(description);
  if (!cleanedDescription) return "";
  return `<details class="rule-detail"><summary>Full spell text</summary><p>${escapeHtml(cleanedDescription)}</p></details>`;
}

function spellLevelSortValue(spell) {
  if (spell.level === "Custom") return 99;
  return Number(spell.level || 0);
}

function spellGroupLabel(level) {
  if (level === 0) return "Cantrips";
  if (level === 99) return "Custom Spells";
  return `Level ${level} Spells`;
}

function spellDisplayData(spell, character) {
  const source = EXPANDED_SPELL_SOURCES[character.edition]?.[spell.name] || "";
  const fullDescription = spellDescription(spell.name, character.edition, source);
  const parsed = splitSpellText(fullDescription);
  const mechanics = spellMechanicsFromBody(parsed.body);
  const metadata = (typeof SPELL_METADATA !== "undefined" && descriptionMatch(SPELL_METADATA, spell.name)) || {};
  return {
    source,
    fullDescription,
    parsed,
    mechanics,
    classText: spell.className || "Character",
    school: parsed.meta.school || metadata.school || (spell.level === "Custom" ? "Custom" : ""),
    castingTime: parsed.meta.castingTime || metadata.castingTime || "",
    range: parsed.meta.range || metadata.range || "",
    duration: parsed.meta.duration || metadata.duration || "",
    components: parsed.meta.components || metadata.components || "",
    saveAttack: mechanics.saveAttack || metadata.saveAttack || "None",
    dice: mechanics.dice || metadata.dice || "None",
    area: mechanics.area || metadata.area || "Single target / see effect",
    damageEffect: metadata.damageEffect || "",
    effect: spellEffectText(spell.name, character.edition, source)
  };
}

function renderSpellCard(spell, character) {
  const data = spellDisplayData(spell, character);
  const facts = [
    renderSpellFact("Cast", data.castingTime),
    renderSpellFact("Range", data.range),
    renderSpellFact("Duration", data.duration),
    renderSpellHitSaveFact(data.saveAttack, spell, character),
    renderSpellDiceFact(data.dice, spell, character),
    renderSpellFact("Damage / Effect", data.damageEffect),
    renderSpellFact("Area", data.area),
    renderSpellFact("Components", data.components)
  ].join("");
  return `<article class="sheet-spell-card spellbook-row">
    <div class="spellbook-main">
      <div class="spell-card-head">
        <div><small>${escapeHtml(spellLevelLabel(spell))}${data.school ? ` · ${escapeHtml(data.school)}` : ""}</small><strong>${escapeHtml(spell.name)}</strong></div>
        <span>${escapeHtml(data.classText)}</span>
      </div>
      <p class="spell-effect"><strong>Effect.</strong> ${escapeHtml(data.effect)}</p>
    </div>
    <div class="spell-fact-grid">${facts}</div>
    ${spellRuleDetails(data.fullDescription)}
  </article>`;
}

function renderSpellBook(spells, character) {
  const sorted = [...spells].sort((a,b) => spellLevelSortValue(a) - spellLevelSortValue(b) || a.name.localeCompare(b.name));
  if (!sorted.length) return `<div class="spellbook-empty"><p>No spells are ready to cast.</p></div>`;
  const groups = new Map();
  sorted.forEach(spell => {
    const level = spellLevelSortValue(spell);
    if (!groups.has(level)) groups.set(level, []);
    groups.get(level).push(spell);
  });
  return `<div class="spellbook">
    ${[...groups.entries()].map(([level, entries]) => `<section class="spellbook-level">
      <header class="spellbook-level-head"><h3>${escapeHtml(spellGroupLabel(level))}</h3><span>${entries.length} ready</span></header>
      <div class="sheet-spells polished-spells">${entries.map(spell => renderSpellCard(spell, character)).join("")}</div>
    </section>`).join("")}
  </div>`;
}

const OPEN_FEATURE_SUMMARIES = {
  "Ability Score Improvement / Feat": "Increase ability scores or choose an eligible feat, following the advancement rules for this level.",
  "Epic Boon": "Choose an Epic Boon feat for which the character qualifies.",
  "Spell slot progression": "The character's number or level of available spell slots improves at this level.",
  "Weapon Mastery improvement": "The number of weapons whose mastery properties you can use increases.",
  "Second Wind improvement": "The number of available Second Wind uses increases.",
  "Action Surge improvement": "The number of available Action Surge uses increases.",
  "Indomitable improvement": "The number of available Indomitable uses increases.",
  "Channel Divinity improvement": "The number of available Channel Divinity uses increases.",
  "Wild Shape improvement": "Wild Shape gains another use or improves according to the class table.",
  "Rage improvement": "The number of available Rage uses increases.",
  "Brutal Critical improvement": "Brutal Critical gains another damage die.",
  "Improved Brutal Strike": "Brutal Strike gains additional options and improved damage.",
  "Bardic Inspiration improvement": "The Bardic Inspiration die increases according to the class table.",
  "Song of Rest improvement": "The Song of Rest die increases according to the class table.",
  "Destroy Undead improvement": "Destroy Undead affects undead of a higher challenge rating.",
  "Martial Arts improvement": "The Martial Arts die increases according to the class table.",
  "Unarmored Movement improvement": "The Unarmored Movement speed bonus increases.",
  "Aura improvements": "The range of the Paladin's class auras increases.",
  "Favored Enemy improvement": "Choose another favored enemy and associated language, following the class feature.",
  "Natural Explorer improvement": "Choose another favored terrain, following the class feature.",
  "Metamagic improvement": "Choose additional Metamagic options from those available to the class.",
  "Eldritch Invocations improvement": "Choose additional Eldritch Invocations for which the character qualifies.",
  "Deft Explorer: Expertise": "Choose a proficient skill; the character gains Expertise in that skill.",
  "Acrobatic Movement": "Unarmored Movement expands to movement across vertical surfaces and liquids during the turn.",
  "Self-Restoration": "The Monk can end certain debilitating conditions on themself at the end of the turn."
};

function openFeatureSummary(name) {
  return OPEN_FEATURE_SUMMARIES[name] || "";
}

function normalizedRuleName(name = "") {
  return String(name)
    .normalize("NFKD")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/\b(melfs|nystuls|leomunds|mordenkainens|otilukes|ottos|rarys|tashas|evards|bigbys|drawmijs|tensers)\b/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function descriptionMatch(records, name) {
  if (!records) return "";
  if (records[name]) return records[name];
  const target = normalizedRuleName(name);
  const key = Object.keys(records).find(candidate => normalizedRuleName(candidate) === target);
  return key ? records[key] : "";
}

function contentSummary(group, name) {
  const summaries = typeof CONTENT_SUMMARIES === "undefined" ? null : CONTENT_SUMMARIES[group];
  return descriptionMatch(summaries, name);
}

function featureDescriptionInEdition(rulesEdition, source, name, className) {
  const features = RULE_DESCRIPTIONS.features[rulesEdition] || {};
  return descriptionMatch(features[source], name)
    || descriptionMatch(features[className], name)
    || Object.values(features).map(records => descriptionMatch(records, name)).find(Boolean)
    || "";
}

function featureDescription(rulesEdition, source, name, className = selectedClass) {
  const description = openFeatureSummary(name)
    || contentSummary("features", name)
    || featureDescriptionInEdition(rulesEdition, source, name, className)
    || (rulesEdition === "2024" ? featureDescriptionInEdition("2014", source, name, className) : "")
    || "";
  if (description) return description;
  return `${name} is gained automatically at the listed level and applies the class or subclass benefit represented by this feature.`;
}

function featEligible(feat, level, className, rulesEdition) {
  if (feat.category === "Epic Boon") return level >= 19;
  if (feat.category === "General") return level >= 4;
  if (feat.category === "Dragonmark" && /^(Greater|Potent)/.test(feat.name)) return level >= 4;
  if (feat.category === "Fighting Style") {
    return (CLASS_FEATURES[rulesEdition]?.[className] || []).some(([unlock, name]) => unlock <= level && name.includes("Fighting Style"));
  }
  return true;
}

function catalogRulesSummary(kind, name, source = "", category = "") {
  const categoryText = category ? `${category} ` : "";
  return `${name} is a ${categoryText}${kind}. Its prerequisites and level restrictions are enforced by the character builder.`;
}

const OPEN_FIGHTING_STYLE_SUMMARIES = {
  "Blessed Warrior": "Learn two Cleric cantrips of your choice. They count as Paladin spells for you, and Charisma is your spellcasting ability for them.",
  "Blind Fighting": "You gain blindsight out to 10 feet, allowing you to perceive creatures and objects in that range unless you are deafened.",
  "Druidic Warrior": "Learn two Druid cantrips of your choice. They count as Ranger spells for you, and Wisdom is your spellcasting ability for them.",
  "Dueling": "While wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
  "Interception": "When a nearby creature is hit by an attack, you can use your reaction while wielding a shield or weapon to reduce the damage by 1d10 plus your proficiency bonus.",
  "Protection": "While wielding a shield, you can use your reaction to interfere with an attack against a nearby ally and impose disadvantage on the attack roll.",
  "Superior Technique": "Learn one Battle Master maneuver and gain one d6 superiority die to fuel it; the die returns when you finish a short or long rest.",
  "Thrown Weapon Fighting": "You can draw a thrown weapon as part of the attack, and ranged attacks with thrown weapons gain a +2 bonus to damage.",
  "Unarmed Fighting": "Your unarmed strikes deal improved bludgeoning damage, and you can deal extra damage to a creature you are grappling."
};

const OPEN_CLASS_CHOICE_SUMMARIES = {
  "Thaumaturge": "Learn one additional Cleric cantrip and add your Wisdom modifier to Arcana and Religion checks.",
  "Protector": "Gain proficiency with martial weapons and training with heavy armor.",
  "Magician": "Learn one additional Druid cantrip and add your Wisdom modifier to Arcana and Nature checks.",
  "Warden": "Gain proficiency with martial weapons and training with medium armor.",
  "Divine Strike": "Once on each of your turns, add extra radiant or weapon-type damage to a weapon hit.",
  "Potent Spellcasting": "Add your spellcasting ability modifier to the damage dealt by eligible cantrips.",
  "Primal Strike": "Once on each of your turns, add extra elemental damage to a weapon or Wild Shape attack."
};

function classChoiceDescription(name) {
  return OPEN_CLASS_CHOICE_SUMMARIES[name] || contentSummary("features", name);
}

function featDescription(feat, rulesEdition) {
  return descriptionMatch(RULE_DESCRIPTIONS.feats[rulesEdition], feat.name)
    || (rulesEdition === "2024" && feat.expanded ? descriptionMatch(RULE_DESCRIPTIONS.feats[2014], feat.name) : "")
    || (feat.category === "Fighting Style" ? fightingStyleDescription(feat.name, rulesEdition) : "")
    || contentSummary("feats", feat.name)
    || catalogRulesSummary("feat", feat.name, feat.source, feat.category);
}

function featAbilityOptions(feat, rulesEdition = edition) {
  if (rulesEdition !== "2024") return [];
  return FEAT_ABILITY_OPTIONS_2024[feat.name]
    || (feat.category === "Epic Boon" ? ABILITIES : []);
}

function featAbilityBonuses(featNames = selectedFeatNames) {
  const bonuses = Object.fromEntries(ABILITIES.map(ability => [ability, 0]));
  if (edition !== "2024") return bonuses;
  featNames.forEach(name => {
    const feat = (FEATS[2024] || []).find(item => item.name === name) || { name };
    const options = featAbilityOptions(feat, "2024");
    const selected = selectedFeatAbilities[name];
    if (options.includes(selected)) bonuses[selected] += 1;
  });
  return bonuses;
}

function advancementLevelsFor(className) {
  return className === "Fighter" ? [4, 6, 8, 12, 14, 16, 19]
    : className === "Rogue" ? [4, 8, 10, 12, 16, 19]
    : [4, 8, 12, 16, 19];
}

function asiSlotCount(className, level) {
  return advancementLevelsFor(className).filter(unlock => unlock <= Number(level || 1)).length;
}

function asiAbilityBonuses(asiState = selectedAsi) {
  const bonuses = Object.fromEntries(ABILITIES.map(ability => [ability, 0]));
  Object.values(asiState || {}).forEach(slot => {
    const mode = slot?.mode || (slot?.one || slot?.two ? "asi" : "none");
    if (mode !== "asi") return;
    if (slot?.one) bonuses[slot.one] = (bonuses[slot.one] || 0) + 1;
    if (slot?.two) bonuses[slot.two] = (bonuses[slot.two] || 0) + 1;
  });
  return bonuses;
}

function asiStateFromBonuses(bonuses = {}) {
  const increases = [];
  ABILITIES.forEach(ability => {
    const count = Math.max(0, Math.floor(Number(bonuses?.[ability] || 0)));
    for (let index = 0; index < count; index += 1) increases.push(ability);
  });
  return increases.reduce((state, ability, index) => {
    const slot = Math.floor(index / 2);
    state[slot] = state[slot] || { mode: "asi", one: "", two: "" };
    state[slot][index % 2 === 0 ? "one" : "two"] = ability;
    return state;
  }, {});
}

function spellDescription(name, rulesEdition, source = "") {
  return descriptionMatch(RULE_DESCRIPTIONS.spells[rulesEdition], name)
    || (rulesEdition === "2024" ? descriptionMatch(RULE_DESCRIPTIONS.spells[2014], name) : "")
    || contentSummary("spells", name)
    || inferredSpellSummary(name)
    || catalogRulesSummary("spell", name, source, "expanded");
}

function inferredSpellSummary(name) {
  const lower = String(name).toLowerCase();
  if (lower.startsWith("summon ")) return `Summon a ${name.slice(7).toLowerCase()} spirit that follows your commands and improves when cast with a higher-level slot.`;
  if (lower.startsWith("conjure ")) return `Conjure the creatures, objects, or magical force named by the spell to influence an area or fight for you.`;
  if (lower.endsWith(" smite")) return "Empower a weapon hit with additional magical damage and the spell's associated secondary effect.";
  if (lower.startsWith("wall of ")) return `Create a wall of ${name.slice(8).toLowerCase()} that blocks, damages, or hinders creatures near it.`;
  if (lower.startsWith("aura of ")) return `Create a protective magical aura centered on you that grants the benefit associated with ${name.slice(8)}.`;
  if (lower.startsWith("investiture of ")) return `Assume an elemental form tied to ${name.slice(15)}, gaining defenses, movement, and a repeatable magical attack.`;
  if (lower.startsWith("power word ")) return `Speak a word of power that imposes the spell's major effect on a creature that meets its Hit Point restriction.`;
  return `${name} creates its named magical effect using the casting time, range, duration, and spell level shown for the option.`;
}

function fightingStyleDescription(name, rulesEdition) {
  return descriptionMatch(RULE_DESCRIPTIONS.fightingStyles[rulesEdition], name)
    || (rulesEdition === "2024" ? descriptionMatch(RULE_DESCRIPTIONS.fightingStyles[2014], name) : "")
    || OPEN_FIGHTING_STYLE_SUMMARIES[name]
    || catalogRulesSummary("fighting style", name, FIGHTING_STYLE_SOURCES[rulesEdition]?.[name] || "");
}

function progressionDescription(group, name, rulesEdition) {
  if (!name) return "";
  return descriptionMatch(RULE_DESCRIPTIONS.progression?.[group]?.[rulesEdition], name)
    || (rulesEdition === "2024" ? descriptionMatch(RULE_DESCRIPTIONS.progression?.[group]?.[2014], name) : "")
    || contentSummary(group, name)
    || catalogRulesSummary(group === "pactBoons" ? "pact boon" : group === "metamagic" ? "Metamagic option" : "Eldritch Invocation", name);
}

function resetPortrait() {
  ctx.fillStyle = "#e9e2d7"; ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#c7b9a7"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(210, 170, 70, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(80, 410); ctx.quadraticCurveTo(210, 230, 340, 410); ctx.stroke();
  portraitData = "";
  updatePreview();
}
function drawImageCover(targetCtx, image, width, height) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  targetCtx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
}
function portraitFromCanvas() {
  const exportCanvas = document.createElement("canvas");
  exportCanvas.width = PORTRAIT_EXPORT_SIZE;
  exportCanvas.height = PORTRAIT_EXPORT_SIZE;
  const exportCtx = exportCanvas.getContext("2d");
  exportCtx.drawImage(canvas, 0, 0, PORTRAIT_EXPORT_SIZE, PORTRAIT_EXPORT_SIZE);
  return exportCanvas.toDataURL("image/jpeg", PORTRAIT_EXPORT_QUALITY);
}
function setPortraitFromCanvas() {
  portraitData = portraitFromCanvas();
  updatePreview();
}

function speciesDescription(name) {
  return (typeof CONTENT_SUMMARIES !== "undefined" && CONTENT_SUMMARIES.species && CONTENT_SUMMARIES.species[name]) || "";
}

const SPECIES_TRAIT_SUMMARIES = {
  Aarakocra: ["Flight", "Talons", "Wind Caller"],
  Aasimar: ["Celestial Resistance", "Healing Hands", "Light Bearer"],
  Autognome: ["Constructed Resilience", "Mechanical Nature", "Specialized Design"],
  Boggart: ["Small and Sly", "Fey Mischief", "Scavenger's Knack"],
  Bugbear: ["Long-Limbed", "Powerful Build", "Sneaky"],
  Centaur: ["Charge", "Hooves", "Equine Build"],
  Changeling: ["Shapechanger", "Changeling Instincts", "Unsettling Visage"],
  Custom: ["Custom Traits", "Flexible Origin", "Table-Defined Features"],
  Dara: ["Remembered Glyphs", "Tree-Born Nature", "Obojima Heritage"],
  "Deep Gnome": ["Superior Darkvision", "Gnomish Cunning", "Svirfneblin Camouflage"],
  Dhampir: ["Deathless Nature", "Spider Climb", "Vampiric Bite"],
  Dragonborn: ["Breath Weapon", "Damage Resistance", "Draconic Ancestry"],
  Duergar: ["Superior Darkvision", "Dwarven Resilience", "Duergar Magic"],
  Dwarf: ["Darkvision", "Dwarven Resilience", "Dwarven Toughness"],
  Eladrin: ["Fey Step", "Darkvision", "Keen Senses"],
  Elf: ["Darkvision", "Fey Ancestry", "Trance"],
  Faerie: ["Flight", "Fey Magic", "Small Stature"],
  Fairy: ["Flight", "Fairy Magic", "Fey Creature"],
  Firbolg: ["Firbolg Magic", "Hidden Step", "Powerful Build"],
  Flamekin: ["Fire Resistance", "Living Flame", "Obojima Heritage"],
  "Genasi (Air)": ["Unending Breath", "Lightning Resistance", "Mingle with the Wind"],
  "Genasi (Earth)": ["Earth Walk", "Merge with Stone", "Sturdy Frame"],
  "Genasi (Fire)": ["Darkvision", "Fire Resistance", "Reach to the Blaze"],
  "Genasi (Water)": ["Amphibious", "Acid Resistance", "Swim Speed"],
  Giff: ["Hippo Build", "Astral Spark", "Firearms Mastery"],
  Githyanki: ["Astral Knowledge", "Githyanki Psionics", "Martial Prodigy"],
  Githzerai: ["Mental Discipline", "Githzerai Psionics", "Psychic Resilience"],
  Gnome: ["Darkvision", "Gnomish Cunning", "Small Stature"],
  Goblin: ["Fury of the Small", "Nimble Escape", "Darkvision"],
  Goliath: ["Giant Ancestry", "Powerful Build", "Mountain Born"],
  Grung: ["Amphibious", "Poisonous Skin", "Standing Leap"],
  Hadozee: ["Dexterous Feet", "Glide", "Hadozee Resilience"],
  "Half-Elf": ["Darkvision", "Fey Ancestry", "Skill Versatility"],
  "Half-Orc": ["Darkvision", "Relentless Endurance", "Savage Attacks"],
  Halfling: ["Lucky", "Brave", "Halfling Nimbleness"],
  Harengon: ["Hare-Trigger", "Leporine Senses", "Rabbit Hop"],
  Hexblood: ["Eerie Token", "Hex Magic", "Fey-Touched Nature"],
  Hobgoblin: ["Fey Gift", "Fortune from the Many", "Darkvision"],
  Human: ["Resourceful", "Skillful", "Versatile"],
  Kalashtar: ["Dual Mind", "Mind Link", "Psychic Resistance"],
  Kender: ["Fearless", "Kender Aptitude", "Taunt"],
  Kenku: ["Expert Duplication", "Kenku Recall", "Mimicry"],
  Khoravar: ["Dual Heritage", "Skill Versatility", "Social Flexibility"],
  Kobold: ["Draconic Cry", "Kobold Legacy", "Darkvision"],
  Leonin: ["Daunting Roar", "Hunter's Instincts", "Claws"],
  Locathah: ["Leviathan Will", "Limited Amphibiousness", "Natural Armor"],
  "Lorwyn Changeling": ["Shapechanger", "Fey Nature", "Many Masks"],
  Loxodon: ["Powerful Build", "Natural Armor", "Trunk"],
  Lupin: ["Keen Smell", "Pack Instincts", "Loyal Companion"],
  Lizardfolk: ["Bite", "Natural Armor", "Hungry Jaws"],
  Minotaur: ["Horns", "Hammering Horns", "Labyrinthine Recall"],
  Nakudama: ["Amphibious Spirit", "Community Storyteller", "Obojima Heritage"],
  "Obojima Elf": ["Fey Ancestry", "Spirit-Touched Culture", "Obojima Heritage"],
  Orc: ["Adrenaline Rush", "Darkvision", "Relentless Endurance"],
  Owlin: ["Flight", "Darkvision", "Silent Feathers"],
  Plasmoid: ["Amorphous", "Hold Breath", "Natural Resilience"],
  Reborn: ["Deathless Nature", "Knowledge from a Past Life", "Sleepless"],
  Rimekin: ["Cold Resistance", "Winter-Born", "Hardy Spirit"],
  Satyr: ["Magic Resistance", "Mirthful Leaps", "Ram"],
  "Sea Elf": ["Child of the Sea", "Friend of the Sea", "Trance"],
  "Shadar-Kai": ["Blessing of the Raven Queen", "Necrotic Resistance", "Trance"],
  Shifter: ["Shifting", "Bestial Instincts", "Darkvision"],
  "Simic Hybrid": ["Animal Enhancement", "Darkvision", "Hybrid Adaptation"],
  Tabaxi: ["Cat's Claws", "Feline Agility", "Cat's Talent"],
  "Thri-kreen": ["Chameleon Carapace", "Secondary Arms", "Thri-kreen Telepathy"],
  Tiefling: ["Darkvision", "Fiendish Legacy", "Otherworldly Presence"],
  Tortle: ["Natural Armor", "Shell Defense", "Claws"],
  Triton: ["Amphibious", "Control Air and Water", "Guardian of the Depths"],
  Vedalken: ["Vedalken Dispassion", "Tireless Precision", "Partially Amphibious"],
  Verdan: ["Black Blood Healing", "Limited Telepathy", "Persuasive"],
  Warforged: ["Constructed Resilience", "Integrated Protection", "Specialized Design"],
  "Yuan-Ti": ["Magic Resistance", "Poison Resilience", "Serpentine Spellcasting"]
};

function speciesTraitSummary(name, speciesName) {
  const lower = String(name || "").toLowerCase();
  if (lower.includes("darkvision")) return "You can see in dim light and darkness better than most creatures.";
  if (lower.includes("flight")) return "You have a flying speed or limited winged movement granted by your species.";
  if (lower.includes("breath weapon")) return "Exhale destructive elemental energy tied to your ancestry.";
  if (lower.includes("damage resistance") || lower.includes("resistance")) return "You resist a damage type or harmful condition associated with your heritage.";
  if (lower.includes("ancestry")) return "Your supernatural lineage grants defenses, senses, or magic tied to that ancestry.";
  if (lower.includes("trance")) return "You rest through a meditative trance rather than sleeping normally.";
  if (lower.includes("lucky")) return "Your luck can turn a failed d20 moment into another chance.";
  if (lower.includes("powerful build")) return "You count as larger when carrying, pushing, dragging, or lifting.";
  if (lower.includes("shapechanger")) return "You can alter your appearance, making disguise and identity fluid.";
  if (lower.includes("legacy") || lower.includes("magic") || lower.includes("spellcasting")) return "Your species grants innate magic or a small list of spells.";
  if (lower.includes("heritage")) return `${speciesName} carries cultural and supernatural traits from its setting.`;
  return `${name} is a ${speciesName} trait. Check your table's source text for exact timing, limits, and uses.`;
}

function speciesTraitCards(character) {
  const speciesName = character.species || "Custom";
  const cards = [];
  const summary = speciesDescription(speciesName);
  if (summary) cards.push({ name: speciesName, source: "Species", description: summary });
  if (character.edition === "2014" && character.speciesVariant) {
    cards.push({
      name: character.speciesVariant,
      source: "Species version",
      description: `${character.speciesVariant} determines the 2014 species ability increases and lineage traits used by this character.`
    });
  }
  const bonusText = ABILITIES
    .filter(ability => Number(character.originBonuses?.[ability] || 0))
    .map(ability => `${ability} ${signed(Number(character.originBonuses[ability]))}`)
    .join(", ");
  if (bonusText) {
    cards.push({
      name: "Origin ability increases",
      source: character.edition === "2024" ? "Background ability bonuses" : "Species ability bonuses",
      description: `${bonusText}. These increases are already included in the ability scores shown on the sheet.`
    });
  }
  (SPECIES_TRAIT_SUMMARIES[speciesName] || ["Species Traits"]).forEach(name => {
    cards.push({ name, source: speciesName, description: speciesTraitSummary(name, speciesName) });
  });
  return cards;
}

function backgroundDescription(name) {
  return (typeof CONTENT_SUMMARIES !== "undefined" && CONTENT_SUMMARIES.backgrounds && CONTENT_SUMMARIES.backgrounds[name]) || "";
}
function updateOriginDescriptions() {
  const sd = $("#species-desc");
  if (sd) sd.textContent = speciesDescription($("#species-select")?.value || "");
  const bd = $("#background-desc");
  if (bd) bd.textContent = backgroundDescription($("#background-select")?.value || "");
}

// Sort source labels with core rulebooks first, then alphabetically.
function sourceSort(a, b) {
  const rank = s => /player's handbook|core 5/i.test(s) ? 0 : 1;
  return rank(a) - rank(b) || a.localeCompare(b);
}
// Build <optgroup>-grouped <option>s, one group per source book.
function groupedSelectOptions(entries) {
  const groups = {}, order = [];
  entries.forEach(item => {
    const src = item.source || "Other";
    if (!groups[src]) { groups[src] = []; order.push(src); }
    groups[src].push(item);
  });
  order.sort(sourceSort);
  return order.map(src =>
    `<optgroup label="${escapeHtml(src)}">${groups[src].slice().sort((a, b) => a.name.localeCompare(b.name)).map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("")}</optgroup>`
  ).join("");
}

function populateRules(savedCharacter = null) {
  $("#species-select").innerHTML = groupedSelectOptions(customizationEntries(SPECIES_CATALOG, RULES.species[edition], RULES.species[2014]));
  $("#background-select").innerHTML = groupedSelectOptions(customizationEntries(BACKGROUND_CATALOG, RULES.backgrounds[edition], RULES.backgrounds[2014]));
  $("#class-grid").innerHTML = Object.entries(RULES.classes).map(([name, data]) =>
    `<button type="button" class="class-option ${name === selectedClass ? "selected" : ""}" data-class="${name}"><span>${data.icon}</span><strong>${name}</strong>${data.origin ? `<small>${data.origin}</small>` : ""}</button>`
  ).join("");
  populateSubclasses();
  renderOriginRules(savedCharacter);
  renderTalentChoices();
  renderStartingEquipmentChoices();
}

function quickAbilityScores(className) {
  const order = QUICK_BUILD_PROFILES[className]?.abilities || ABILITIES;
  const scores = {};
  [15, 14, 13, 12, 10, 8].forEach((score, index) => { scores[order[index]] = score; });
  return Object.fromEntries(ABILITIES.map(ability => [ability, scores[ability] || 10]));
}

function quickOrigin(className, species, background) {
  const profile = QUICK_BUILD_PROFILES[className];
  const bonuses = Object.fromEntries(ABILITIES.map(ability => [ability, 0]));
  if (edition === "2014") {
    const rule = SPECIES_RULES_2014[species] || { variants: [flexibleSpeciesVariant()] };
    const variant = rule.variants[0];
    Object.entries(variant.bonuses || {}).forEach(([ability, amount]) => { bonuses[ability] += Number(amount); });
    const chosen = [];
    (variant.choices || []).forEach(choice => {
      for (let index = 0; index < choice.count; index += 1) {
        const ability = profile.abilities.find(candidate =>
          !choice.exclude?.includes(candidate) && (!choice.distinct || !chosen.includes(candidate))
        );
        if (ability) {
          bonuses[ability] += Number(choice.amount);
          chosen.push(ability);
        }
      }
    });
    return {
      originBonuses: bonuses,
      speciesVariant: variant.name,
      originFeat: variant.featChoice ? "Tough" : "",
      originFeatChoice: variant.featChoice ? "Tough" : ""
    };
  }
  const rule = BACKGROUND_RULES_2024[background] || {
    abilities: profile.abilities.slice(0, 3),
    feat: "Skilled"
  };
  const primary = profile.abilities.find(ability => rule.abilities.includes(ability)) || rule.abilities[0];
  const secondary = profile.abilities.find(ability => rule.abilities.includes(ability) && ability !== primary)
    || rule.abilities.find(ability => ability !== primary);
  bonuses[primary] += 2;
  if (secondary) bonuses[secondary] += 1;
  return {
    originBonuses: bonuses,
    backgroundAbilityMode: "split",
    backgroundPrimary: primary,
    backgroundSecondary: secondary,
    originFeat: rule.feat || "Skilled",
    originFeatChoice: rule.feat ? "" : "Skilled"
  };
}

function quickSkillChoices(className, background) {
  const profile = QUICK_BUILD_PROFILES[className];
  const backgroundSkills = [...new Set(BACKGROUND_SKILLS[background] || profile.skills.slice(-2))].slice(0, 2);
  while (backgroundSkills.length < 2) {
    const fallback = Object.keys(SKILLS).find(skill => !backgroundSkills.includes(skill));
    backgroundSkills.push(fallback);
  }
  const rule = classSkillRuleAtLevel(className, 1, edition);
  const preferred = profile.skills.filter(skill => rule.options.includes(skill) && !backgroundSkills.includes(skill));
  const remaining = rule.options.filter(skill => !backgroundSkills.includes(skill) && !preferred.includes(skill));
  const skillProficiencies = [...preferred, ...remaining].slice(0, rule.count);
  const expertiseCount = expertiseCountAtLevel(className, 1, edition);
  return {
    backgroundSkills,
    skillProficiencies,
    expertise: [...skillProficiencies, ...backgroundSkills].slice(0, expertiseCount)
  };
}

function quickSpellChoices(className) {
  const lists = spellListsFor(edition, className) || {};
  const profile = QUICK_BUILD_PROFILES[className];
  const counts = { ...(QUICK_SPELL_COUNTS[className] || {}) };
  if (edition === "2014" && ["Paladin", "Ranger"].includes(className)) counts[1] = 0;
  const chosen = [];
  [0, 1].forEach(level => {
    const available = lists[level] || [];
    const preferred = (profile.spells || []).filter(name => available.includes(name));
    [...preferred, ...available].filter((name, index, names) => names.indexOf(name) === index)
      .slice(0, Number(counts[level] || 0))
      .forEach(name => chosen.push({ name, level }));
  });
  return chosen;
}

function quickInventory(className) {
  const names = [...(QUICK_BUILD_PROFILES[className]?.equipment || []), "Bedroll", "Rations, 1 day"];
  const entries = new Map();
  names.forEach(name => {
    const catalog = EQUIPMENT_CATALOG.find(item => item.name === name)
      || { name, type: "Adventuring Gear", cost: "", weight: 0, details: "" };
    if (entries.has(name)) {
      entries.get(name).quantity += 1;
      return;
    }
    const wearable = /Armor$/.test(catalog.type) || catalog.type === "Shield";
    entries.set(name, {
      id: crypto.randomUUID(),
      name: catalog.name,
      type: catalog.type,
      quantity: 1,
      weight: catalog.weight,
      cost: catalog.cost,
      notes: catalog.details,
      carried: true,
      equipped: wearable || /Weapon/.test(catalog.type),
      attuned: false
    });
  });
  return [...entries.values()];
}

function equipmentDisplayName(item) {
  if (!item) return "";
  return `${item.quantity > 1 ? `${item.quantity}x ` : ""}${item.name}`;
}

function renderStartingEquipmentChoices() {
  const target = $("#starting-equipment-list");
  if (!target) return;
  const mode = form.elements.startingEquipmentMode?.value || "starting";
  updateEquipmentMethodUI();
  if (mode === "manual") {
    target.innerHTML = `<article class="equipment-empty"><strong>Manual inventory selected</strong><p>Your sheet will start without a class kit. Use the Items section after saving to add gear.</p></article>`;
    return;
  }
  if (mode === "keep" && activeCharacterId) {
    const existing = characters.find(character => character.id === activeCharacterId);
    const count = existing?.inventory?.length || 0;
    target.innerHTML = `<article class="equipment-empty"><strong>Keeping current inventory</strong><p>${count} saved item${count === 1 ? "" : "s"} will remain on this character.</p></article>`;
    return;
  }
  const kit = quickInventory(selectedClass);
  target.innerHTML = kit.map((item, index) => `<label class="equipment-option">
    <input type="checkbox" name="startingEquipment" value="${index}" checked>
    <span><strong>${escapeHtml(equipmentDisplayName(item))}</strong><small>${escapeHtml(item.type || "Equipment")}${item.weight ? ` · ${item.weight} lb.` : ""}</small></span>
  </label>`).join("") || `<article class="equipment-empty"><strong>No class kit found</strong><p>You can add equipment from the sheet after saving.</p></article>`;
}

function updateEquipmentMethodUI() {
  $$("[name='startingEquipmentMode']").forEach(input => {
    input.closest(".equipment-method")?.classList.toggle("active", input.checked);
  });
}

function quickDefaultSubclass(className) {
  if (subclassLevel(className, edition) > 1) return "";
  const preferred = {
    "2014:Cleric": "Life Domain",
    "2014:Sorcerer": "Draconic Bloodline",
    "2014:Warlock": "The Fiend"
  }[`${edition}:${className}`];
  const options = subclassEntries(className, edition);
  return options.some(item => item.name === preferred) ? preferred : options[0]?.name || "";
}

function defaultSubclassFor(className, level = 1, rulesEdition = edition) {
  const options = subclassEntries(className, rulesEdition);
  const preferred = {
    "2014:Barbarian": "Path of the Berserker",
    "2024:Barbarian": "Path of the Berserker",
    "2014:Bard": "College of Lore",
    "2024:Bard": "College of Lore",
    "2014:Cleric": "Life Domain",
    "2024:Cleric": "Life Domain",
    "2014:Druid": "Circle of the Land",
    "2024:Druid": "Circle of the Land",
    "2014:Fighter": "Champion",
    "2024:Fighter": "Champion",
    "2014:Monk": "Way of the Open Hand",
    "2024:Monk": "Warrior of the Open Hand",
    "2014:Paladin": "Oath of Devotion",
    "2024:Paladin": "Oath of Devotion",
    "2014:Ranger": "Hunter",
    "2024:Ranger": "Hunter",
    "2014:Rogue": "Thief",
    "2024:Rogue": "Thief",
    "2014:Sorcerer": "Draconic Bloodline",
    "2024:Sorcerer": "Draconic Sorcery",
    "2014:Warlock": "The Fiend",
    "2024:Warlock": "Fiend Patron",
    "2014:Wizard": "School of Evocation",
    "2024:Wizard": "Evoker",
    "2014:Artificer": "Alchemist",
    "2024:Artificer": "Alchemist",
    "2014:Blood Hunter": "Order of the Ghostslayer",
    "2024:Blood Hunter": "Order of the Ghostslayer"
  }[`${rulesEdition}:${className}`];
  const chosen = options.find(item => item.name === preferred)?.name || options[0]?.name || "";
  return Number(level || 1) >= subclassLevel(className, rulesEdition) ? chosen : chosen;
}

function prebuildAsiCount(className, level) {
  const baseLevels = [4, 8, 12, 16, 19];
  let count = baseLevels.filter(unlock => level >= unlock).length;
  if (className === "Fighter") count += [6, 14].filter(unlock => level >= unlock).length;
  if (className === "Rogue" && level >= 10) count += 1;
  return count;
}

function prebuildAsiBonuses(className, level, baseAbilities, originBonuses) {
  const profile = QUICK_BUILD_PROFILES[className] || QUICK_BUILD_PROFILES.Fighter;
  const bonuses = Object.fromEntries(ABILITIES.map(ability => [ability, 0]));
  let points = prebuildAsiCount(className, Number(level || 1)) * 2;
  const order = [...profile.abilities, ...ABILITIES].filter((ability, index, list) => list.indexOf(ability) === index);
  while (points > 0) {
    const target = order.find(ability =>
      Number(baseAbilities[ability] || 10) + Number(originBonuses[ability] || 0) + Number(bonuses[ability] || 0) < 20
    );
    if (!target) break;
    bonuses[target] += 1;
    points -= 1;
  }
  return bonuses;
}

function prebuildSubclassChoices(subclass, level) {
  const choices = {};
  (SUBCLASS_CHOICE_RULES[subclass] || []).forEach(choice => {
    if (Number(level || 1) < Number(choice.level || 1)) return;
    if (choice.editions && !choice.editions.includes(edition)) return;
    if (choice.options?.length) choices[choice.key] = choice.options[0];
  });
  return choices;
}

function prebuildClassChoices(className, level, profile) {
  return {
    weaponMastery: (profile.masteries || []).slice(0, weaponMasteryCount(className, level, edition)),
    fightingStyle: ["Fighter", "Paladin", "Ranger"].includes(className) && level >= (className === "Fighter" ? 1 : 2) ? profile.fightingStyle || "Defense" : "",
    fightingStyles: [],
    divineOrder: edition === "2024" && className === "Cleric" ? "Protector" : "",
    primalOrder: edition === "2024" && className === "Druid" ? "Magician" : "",
    blessedStrikes: edition === "2024" && className === "Cleric" && level >= 7 ? "Divine Strike" : "",
    elementalFury: edition === "2024" && className === "Druid" && level >= 7 ? "Potent Spellcasting" : "",
    invocations: className === "Warlock"
      ? ["Agonizing Blast", "Eldritch Mind", "Repelling Blast", "Pact of the Tome", "Fiendish Vigor"].slice(0, Object.entries(LEVEL_CHOICE_RULES[edition]?.Warlock?.invocations || {}).reduce((total, [unlock, amount]) => total + (level >= Number(unlock) ? Number(amount) : 0), 0))
      : [],
    metamagic: className === "Sorcerer"
      ? ["Careful Spell", "Quickened Spell", "Twinned Spell", "Subtle Spell", "Empowered Spell"].slice(0, Object.entries(LEVEL_CHOICE_RULES[edition]?.Sorcerer?.metamagic || {}).reduce((total, [unlock, amount]) => total + (level >= Number(unlock) ? Number(amount) : 0), 0))
      : []
  };
}

function preferredAbilityOrder(className) {
  const profile = QUICK_BUILD_PROFILES[className] || QUICK_BUILD_PROFILES.Fighter || {};
  return [...(profile.abilities || []), ...ABILITIES].filter((ability, index, list) => list.indexOf(ability) === index);
}

function nextAsiSlotKey(asi = {}) {
  return String(Object.keys(asi || {}).reduce((max, key) => Math.max(max, Number(key)), -1) + 1);
}

function autoAsiPlan(className, level, baseAbilities, originBonuses) {
  const bonuses = prebuildAsiBonuses(className, level, baseAbilities, originBonuses);
  return { bonuses, asi: asiStateFromBonuses(bonuses) };
}

function eligibleAdvancementFeats(character, className, classLevelValue) {
  return (FEATS[character.edition] || []).filter(feat =>
    !feat.category.includes("Fighting Style")
    && feat.name !== "Ability Score Improvement"
    && featEligible(feat, classLevelValue, className, character.edition)
    && (character.edition !== "2024" || feat.category === "General" || (classLevelValue >= 19 && feat.category === "Epic Boon"))
    && !(character.feats || []).includes(feat.name)
  );
}

function applyAutoAbilityIncrease(character, className, choices, maximum = 20) {
  const order = preferredAbilityOrder(className);
  const target = order.find(ability => Number(character[ability] || 10) < maximum);
  if (!target) return false;
  character[target] = Math.min(maximum, Number(character[target] || 10) + 1);
  character.asiBonuses = { ...(character.asiBonuses || Object.fromEntries(ABILITIES.map(ability => [ability, 0]))) };
  character.asiBonuses[target] = Number(character.asiBonuses[target] || 0) + 1;
  choices.advancement = choices.advancement ? `${choices.advancement}, ${target} +1` : `${target} +1`;
  return target;
}

function applyAutoFeat(character, className, classLevelValue, choices) {
  const feats = eligibleAdvancementFeats(character, className, classLevelValue);
  const feat = feats.find(item => item.category === "Epic Boon") || feats[0];
  if (!feat) return false;
  character.feats = [...new Set([...(character.feats || []), feat.name])];
  character.featAbilityChoices = { ...(character.featAbilityChoices || {}) };
  character.featBonuses = { ...(character.featBonuses || Object.fromEntries(ABILITIES.map(ability => [ability, 0]))) };
  const abilityOptionsList = featAbilityOptions(feat, character.edition);
  const ability = preferredAbilityOrder(className).find(option => abilityOptionsList.includes(option)) || abilityOptionsList[0];
  if (ability) {
    const maximum = feat.category === "Epic Boon" ? 30 : 20;
    character[ability] = Math.min(maximum, Number(character[ability] || 10) + 1);
    character.featAbilityChoices[feat.name] = ability;
    character.featBonuses[ability] = Number(character.featBonuses[ability] || 0) + 1;
  }
  character.asi = character.asi && Object.keys(character.asi).length ? JSON.parse(JSON.stringify(character.asi)) : asiStateFromBonuses(character.asiBonuses);
  character.asi[nextAsiSlotKey(character.asi)] = { mode: "feat", one: "", two: "", feat: feat.name };
  choices.advancement = `Feat: ${feat.name}${ability ? ` (${ability} +1)` : ""}`;
  return true;
}

function applyAutoAdvancement(character, className, classLevelValue, choices) {
  if (!advancementLevelsFor(className).includes(classLevelValue)) return;
  if (character.edition === "2024" && classLevelValue >= 19 && applyAutoFeat(character, className, classLevelValue, choices)) return;
  character.asi = character.asi && Object.keys(character.asi).length ? JSON.parse(JSON.stringify(character.asi)) : asiStateFromBonuses(character.asiBonuses);
  const first = applyAutoAbilityIncrease(character, className, choices);
  const second = applyAutoAbilityIncrease(character, className, choices);
  if (first || second) {
    character.asi[nextAsiSlotKey(character.asi)] = { mode: "asi", one: first || "", two: second || "" };
    return;
  }
  applyAutoFeat(character, className, classLevelValue, choices);
}

function autoSpellChoicesForClass(character, className, classLevelValue) {
  const subclass = classSubclassName(character, className);
  const lists = spellListsFor(character.edition, className, subclass) || {};
  const profile = QUICK_BUILD_PROFILES[className] || {};
  const additions = [];
  const existingNames = new Set((character.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
  const addUnique = (name, spellLevel) => {
    if (!name || existingNames.has(name)) return false;
    const record = { name, className, level: Number(spellLevel) };
    additions.push(record);
    existingNames.add(name);
    return true;
  };
  const addFromPool = (pool, amount) => {
    const ordered = [
      ...(profile.spells || []).map(name => pool.find(spell => spell.name === name)).filter(Boolean),
      ...pool
    ].filter((spell, index, list) => spell && list.findIndex(item => item.name === spell.name) === index);
    for (const spell of ordered) {
      if (amount <= 0) break;
      if (addUnique(spell.name, spell.level)) amount -= 1;
    }
  };
  const cantripTarget = cantripLimitFor(className, classLevelValue, character.edition, subclass);
  const existingCantrips = (character.spells || []).filter(spell =>
    (typeof spell === "string" ? 0 : Number(spell.level || 0)) === 0
    && (typeof spell === "string" || !spell.className || spell.className === className)
  ).length;
  addFromPool((lists[0] || []).map(name => ({ name, level: 0 })), Math.max(0, cantripTarget - existingCantrips));
  const allowed = maxSpellLevel(className, classLevelValue, character.edition, subclass);
  const spellTarget = spellLimitFor(className, classLevelValue, character.edition, subclass, withClassContext(character, className, classLevelValue));
  const existingLeveled = (character.spells || []).filter(spell =>
    typeof spell !== "string"
    && Number(spell.level || 0) > 0
    && (!spell.className || spell.className === className)
    && Number(spell.level || 0) <= allowed
  ).length;
  const leveledPool = [];
  for (let spellLevel = 1; spellLevel <= allowed; spellLevel += 1) {
    (lists[spellLevel] || []).forEach(name => leveledPool.push({ name, level: spellLevel }));
  }
  if (className === "Wizard") leveledPool.sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
  addFromPool(leveledPool, Math.max(0, spellTarget - existingLeveled));
  if (className === "Warlock") {
    const arcanumLevel = ({ 11: 6, 13: 7, 15: 8, 17: 9 })[classLevelValue];
    if (arcanumLevel) {
      addFromPool((SPELL_LISTS[character.edition]?.Warlock?.[arcanumLevel] || []).map(name => ({ name, level: arcanumLevel })), 1);
    }
  }
  return additions;
}

function prebuildSpellChoices(className, level, subclass, characterData) {
  const lists = spellListsFor(edition, className, subclass) || {};
  const profile = QUICK_BUILD_PROFILES[className] || {};
  const allowed = maxSpellLevel(className, level, edition, subclass);
  const cantripLimit = cantripLimitFor(className, level, edition, subclass);
  const spellLimit = spellLimitFor(className, level, edition, subclass, characterData);
  const chosen = [];
  const addUnique = (name, spellLevel) => {
    if (!name || chosen.some(spell => spell.name === name)) return;
    chosen.push({ name, level: Number(spellLevel) });
  };
  const cantrips = lists[0] || [];
  const preferredCantrips = (profile.spells || []).filter(name => cantrips.includes(name));
  [...preferredCantrips, ...cantrips].slice(0, Math.max(0, cantripLimit)).forEach(name => addUnique(name, 0));
  if (className === "Wizard") {
    const addWizardSpells = (classLevel, amount) => {
      const maximum = maxSpellLevel(className, classLevel, edition, subclass);
      const pool = Object.entries(lists)
        .filter(([spellLevel]) => Number(spellLevel) > 0 && Number(spellLevel) <= maximum)
        .flatMap(([spellLevel, names]) => names.map(name => ({ name, level: Number(spellLevel) })))
        .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name));
      const preferred = (profile.spells || []).map(name => pool.find(spell => spell.name === name)).filter(Boolean);
      for (const spell of [...preferred, ...pool]) {
        if (amount <= 0) break;
        const before = chosen.length;
        addUnique(spell.name, spell.level);
        if (chosen.length > before) amount -= 1;
      }
    };
    addWizardSpells(1, 6);
    for (let classLevel = 2; classLevel <= level; classLevel += 1) addWizardSpells(classLevel, 2);
    return chosen;
  }
  const leveledPool = [];
  for (let spellLevel = 1; spellLevel <= allowed; spellLevel += 1) {
    (lists[spellLevel] || []).forEach(name => leveledPool.push({ name, level: spellLevel }));
  }
  const preferred = (profile.spells || [])
    .map(name => leveledPool.find(spell => spell.name === name))
    .filter(Boolean);
  [...preferred, ...leveledPool].forEach(spell => {
    if (chosen.filter(item => item.level > 0).length < Math.max(0, spellLimit)) addUnique(spell.name, spell.level);
  });
  return chosen;
}

function prebuildProgressionHistory(className, subclass, level) {
  const classRows = (CLASS_FEATURES[edition]?.[className] || [])
    .filter(([featureLevel]) => featureLevel <= level)
    .map(([featureLevel, name]) => ({ level: featureLevel, choices: {}, features: [`${className}: ${name}`], summary: `${className} feature gained.` }));
  const subclassRows = subclass ? resolvedSubclassFeatures(edition, className, subclass)
    .filter(([featureLevel]) => featureLevel <= level)
    .map(([featureLevel, name]) => ({ level: featureLevel, choices: {}, features: [`${subclass}: ${name}`], summary: `${subclass} feature gained.` })) : [];
  return [...classRows, ...subclassRows].sort((a, b) => a.level - b.level);
}

function quickSelections() {
  const profile = QUICK_BUILD_PROFILES[quickClass];
  const species = $("#quick-species")?.value || (edition === "2024" ? "Human" : "Human");
  const background = $("#quick-background")?.value || profile.backgrounds[edition];
  const level = Math.max(1, Math.min(20, Number($("#quick-level")?.value || 1)));
  if ($("#quick-level")) $("#quick-level").value = level;
  return { profile, species, background, level };
}

function prebuildSelections() {
  const className = $("#prebuild-class")?.value || prebuildClass || "Fighter";
  const profile = QUICK_BUILD_PROFILES[className] || QUICK_BUILD_PROFILES.Fighter;
  const level = Math.max(1, Math.min(20, Number($("#prebuild-level")?.value || 1)));
  const subclass = $("#prebuild-subclass")?.value || prebuildSubclass || defaultSubclassFor(className, level);
  const species = $("#prebuild-species")?.value || "Human";
  const background = $("#prebuild-background")?.value || profile.backgrounds[edition] || "Soldier";
  return { className, profile, level, subclass, species, background };
}

function buildPrebuiltCharacter(preview = false) {
  const { className, profile, level, subclass, species, background } = prebuildSelections();
  const baseAbilities = quickAbilityScores(className);
  const origin = quickOrigin(className, species, background);
  const asiPlan = autoAsiPlan(className, level, baseAbilities, origin.originBonuses);
  const asiBonuses = asiPlan.bonuses;
  const finalAbilities = Object.fromEntries(ABILITIES.map(ability => [
    ability,
    Number(baseAbilities[ability]) + Number(origin.originBonuses[ability] || 0) + Number(asiBonuses[ability] || 0)
  ]));
  const skills = quickSkillChoices(className, background);
  const feats = origin.originFeat ? [origin.originFeat] : [];
  const classChoices = prebuildClassChoices(className, level, profile);
  const subclassChoices = prebuildSubclassChoices(subclass, level);
  const spellSeed = { className, level, edition, subclass, ...finalAbilities };
  const character = {
    id: preview ? "prebuild-preview" : crypto.randomUUID(),
    name: $("#prebuild-name")?.value.trim() || generateQuickName(false),
    player: $("#prebuild-player")?.value.trim() || "",
    pronouns: "",
    level,
    edition,
    species,
    background,
    alignment: "Unaligned",
    campaign: "",
    className,
    subclass,
    customSubclass: "",
    classes: [{ name: className, level, subclass, customSubclass: "", subclassChoices }],
    ...finalAbilities,
    baseAbilities,
    originBonuses: origin.originBonuses,
    originFeat: origin.originFeat,
    originFeatChoice: origin.originFeatChoice,
    speciesVariant: origin.speciesVariant || "",
    backgroundAbilityMode: origin.backgroundAbilityMode || "",
    backgroundPrimary: origin.backgroundPrimary || "",
    backgroundSecondary: origin.backgroundSecondary || "",
    feats,
    featAbilityChoices: {},
    featBonuses: Object.fromEntries(ABILITIES.map(ability => [ability, 0])),
    asi: asiPlan.asi,
    asiBonuses,
    skillProficiencies: skills.skillProficiencies,
    backgroundSkills: skills.backgroundSkills,
    expertise: skills.expertise,
    weaponMastery: classChoices.weaponMastery,
    fightingStyle: classChoices.fightingStyle,
    fightingStyles: classChoices.fightingStyles,
    divineOrder: classChoices.divineOrder,
    primalOrder: classChoices.primalOrder,
    blessedStrikes: classChoices.blessedStrikes,
    elementalFury: classChoices.elementalFury,
    invocations: classChoices.invocations,
    metamagic: classChoices.metamagic,
    subclassChoices,
    spells: prebuildSpellChoices(className, level, subclass, spellSeed),
    customSpells: "",
    customFeats: "",
    inventory: quickInventory(className),
    currency: { cp: 0, sp: 0, ep: 0, gp: 10 + Math.max(0, level - 1) * 5, pp: 0 },
    portrait: "",
    backstory: `${profile.tagline} This custom prebuild was generated at level ${level} with solid default choices. Everything remains editable from the sheet and level-up tools.`,
    acOverride: "",
    hpOverride: "",
    resourceUsage: {},
    conditions: [],
    progressionHistory: prebuildProgressionHistory(className, subclass, level),
    prebuilt: true,
    quickBuilt: true,
    updatedAt: Date.now()
  };
  reconcilePreparedSpells(character);
  character.currentHp = derived(character).hp;
  return character;
}

function renderPrebuildOptions(resetBackground = false) {
  const classSelect = $("#prebuild-class");
  const subclassSelect = $("#prebuild-subclass");
  const speciesSelect = $("#prebuild-species");
  const backgroundSelect = $("#prebuild-background");
  if (!classSelect || !subclassSelect || !speciesSelect || !backgroundSelect) return;
  const priorClass = classSelect.value || prebuildClass;
  classSelect.innerHTML = Object.keys(RULES.classes).map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("");
  prebuildClass = RULES.classes[priorClass] ? priorClass : prebuildClass;
  classSelect.value = prebuildClass;
  const level = Math.max(1, Math.min(20, Number($("#prebuild-level")?.value || 3)));
  $("#prebuild-level").value = level;
  const subclassOptions = subclassEntries(prebuildClass, edition);
  const defaultSubclass = defaultSubclassFor(prebuildClass, level);
  subclassSelect.innerHTML = subclassOptions.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)} - ${escapeHtml(item.source)}</option>`).join("") || `<option value="">No subclass</option>`;
  if (!subclassOptions.some(item => item.name === prebuildSubclass)) prebuildSubclass = defaultSubclass;
  subclassSelect.value = subclassOptions.some(item => item.name === prebuildSubclass) ? prebuildSubclass : subclassOptions[0]?.name || "";
  const unlock = subclassLevel(prebuildClass, edition);
  $("#prebuild-subclass-note").textContent = level >= unlock
    ? `${prebuildSubclass || subclassSelect.value || "Subclass"} features are active at this level.`
    : `This class activates subclass features at level ${unlock}; the choice is saved as the planned path.`;
  const speciesValue = speciesSelect.value || "Human";
  const species = customizationEntries(SPECIES_CATALOG, RULES.species[edition], RULES.species[2014]);
  speciesSelect.innerHTML = species.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("");
  speciesSelect.value = species.some(item => item.name === speciesValue) ? speciesValue : "Human";
  const profile = QUICK_BUILD_PROFILES[prebuildClass] || QUICK_BUILD_PROFILES.Fighter;
  const preferredBackground = profile.backgrounds[edition] || "Soldier";
  const backgroundValue = resetBackground ? preferredBackground : backgroundSelect.value || preferredBackground;
  const backgrounds = customizationEntries(BACKGROUND_CATALOG, RULES.backgrounds[edition], RULES.backgrounds[2014]);
  backgroundSelect.innerHTML = backgrounds.map(item =>
    `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}${item.name === preferredBackground ? " - recommended" : ""}</option>`
  ).join("");
  backgroundSelect.value = backgrounds.some(item => item.name === backgroundValue) ? backgroundValue : backgrounds[0]?.name || "";
  renderPrebuildSummary();
}

function renderPrebuildSummary() {
  const summary = $("#prebuild-summary");
  if (!summary || !$("#prebuild-class")?.value) return;
  const character = buildPrebuiltCharacter(true);
  const stats = derived(character);
  const primary = QUICK_BUILD_PROFILES[character.className]?.abilities?.[0] || "STR";
  const spellNames = character.spells.map(spell => spell.name);
  const featureCount = (CLASS_FEATURES[edition]?.[character.className] || []).filter(([level]) => level <= character.level).length
    + (character.subclass ? resolvedSubclassFeatures(edition, character.className, character.subclass).filter(([level]) => level <= character.level).length : 0);
  summary.innerHTML = `
    <div class="quick-summary-title"><span>${RULES.classes[character.className]?.icon || "PB"}</span><div><small>LEVEL ${character.level} ${edition === "2024" ? "5.5e" : "5e"} PREBUILD</small><h3>${escapeHtml(character.species)} ${escapeHtml(character.subclass || character.className)}</h3><p>${escapeHtml(character.background)} background</p></div></div>
    <div class="quick-summary-stats">
      <span><small>AC</small><strong>${stats.ac}</strong></span>
      <span><small>HP</small><strong>${stats.hp}</strong></span>
      <span><small>${primary}</small><strong>${character[primary]}</strong></span>
    </div>
    <div class="quick-summary-section"><strong>Ability scores</strong><p>${ABILITIES.map(ability => `${ability} ${character[ability]}`).join(" &middot; ")}</p></div>
    <div class="quick-summary-section"><strong>Core proficiencies</strong><p>${[...new Set([...character.skillProficiencies, ...character.backgroundSkills])].join(", ")}</p></div>
    ${character.weaponMastery?.length ? `<div class="quick-summary-section"><strong>Weapon masteries</strong><p>${escapeHtml(character.weaponMastery.join(", "))}</p></div>` : ""}
    ${character.fightingStyle ? `<div class="quick-summary-section"><strong>Fighting style</strong><p>${escapeHtml(character.fightingStyle)}</p></div>` : ""}
    ${spellNames.length ? `<div class="quick-summary-section"><strong>Spells selected</strong><p>${escapeHtml(spellNames.slice(0, 18).join(", "))}${spellNames.length > 18 ? `, and ${spellNames.length - 18} more` : ""}</p></div>` : ""}
    <div class="quick-summary-section"><strong>Features ready</strong><p>${featureCount} class/subclass feature${featureCount === 1 ? "" : "s"} will appear on the sheet for level ${character.level}.</p></div>
    <div class="quick-summary-section"><strong>Starting equipment</strong><p>${character.inventory.slice(0, 7).map(item => `${item.quantity > 1 ? `${item.quantity}x ` : ""}${item.name}`).join(", ")}</p></div>
    <p class="quick-summary-note">Generated choices are solid defaults. You can edit spells, ASIs, items, and level-up details after creation.</p>`;
}

function buildQuickCharacter(preview = false) {
  const { profile, species, background, level } = quickSelections();
  const baseAbilities = quickAbilityScores(quickClass);
  const origin = quickOrigin(quickClass, species, background);
  const asiPlan = autoAsiPlan(quickClass, level, baseAbilities, origin.originBonuses);
  const asiBonuses = asiPlan.bonuses;
  const skills = quickSkillChoices(quickClass, background);
  const subclass = defaultSubclassFor(quickClass, level);
  const subclassChoices = prebuildSubclassChoices(subclass, level);
  const finalAbilities = Object.fromEntries(ABILITIES.map(ability => [
    ability,
    Number(baseAbilities[ability]) + Number(origin.originBonuses[ability] || 0) + Number(asiBonuses[ability] || 0)
  ]));
  const classChoices = prebuildClassChoices(quickClass, level, profile);
  const spellSeed = { className: quickClass, level, edition, subclass, ...finalAbilities };
  const spells = prebuildSpellChoices(quickClass, level, subclass, spellSeed);
  const feats = origin.originFeat ? [origin.originFeat] : [];
  const character = {
    id: preview ? "quick-preview" : crypto.randomUUID(),
    name: $("#quick-name")?.value.trim() || generateQuickName(false),
    player: $("#quick-player")?.value.trim() || "",
    pronouns: "",
    level,
    edition,
    species,
    background,
    alignment: "Unaligned",
    campaign: "",
    className: quickClass,
    subclass,
    customSubclass: "",
    classes: [{ name: quickClass, level, subclass, customSubclass: "", subclassChoices }],
    ...finalAbilities,
    baseAbilities,
    originBonuses: origin.originBonuses,
    originFeat: origin.originFeat,
    originFeatChoice: origin.originFeatChoice,
    speciesVariant: origin.speciesVariant || "",
    backgroundAbilityMode: origin.backgroundAbilityMode || "",
    backgroundPrimary: origin.backgroundPrimary || "",
    backgroundSecondary: origin.backgroundSecondary || "",
    feats,
    featAbilityChoices: {},
    featBonuses: Object.fromEntries(ABILITIES.map(ability => [ability, 0])),
    asi: asiPlan.asi,
    asiBonuses,
    skillProficiencies: skills.skillProficiencies,
    backgroundSkills: skills.backgroundSkills,
    expertise: skills.expertise,
    weaponMastery: classChoices.weaponMastery,
    fightingStyle: classChoices.fightingStyle,
    fightingStyles: classChoices.fightingStyles,
    divineOrder: classChoices.divineOrder,
    primalOrder: classChoices.primalOrder,
    blessedStrikes: classChoices.blessedStrikes,
    elementalFury: classChoices.elementalFury,
    invocations: classChoices.invocations,
    metamagic: classChoices.metamagic,
    subclassChoices,
    spells,
    customSpells: "",
    customFeats: "",
    inventory: quickInventory(quickClass),
    currency: { cp: 0, sp: 0, ep: 0, gp: 10 + Math.max(0, level - 1) * 5, pp: 0 },
    portrait: "",
    backstory: `${profile.tagline} This quick-build character was generated at level ${level} with smart defaults and can be fully customized from the character sheet.`,
    acOverride: "",
    hpOverride: "",
    resourceUsage: {},
    conditions: [],
    progressionHistory: prebuildProgressionHistory(quickClass, subclass, level),
    quickBuilt: true,
    updatedAt: Date.now()
  };
  reconcilePreparedSpells(character);
  character.currentHp = derived(character).hp;
  return character;
}

function renderQuickClasses() {
  const container = $("#quick-class-grid");
  if (!container) return;
  container.innerHTML = Object.entries(RULES.classes).map(([name, data]) => {
    const profile = QUICK_BUILD_PROFILES[name];
    return `<button type="button" class="quick-class-card ${name === quickClass ? "selected" : ""}" data-quick-class="${escapeHtml(name)}">
      <span class="quick-class-icon">${data.icon}</span>
      <span><strong>${escapeHtml(name)}</strong><small>${escapeHtml(profile.role)}</small><em>${escapeHtml(profile.tagline)}</em></span>
      <b aria-hidden="true">✓</b>
    </button>`;
  }).join("");
}

function renderQuickOrigin(resetBackground = false) {
  const speciesSelect = $("#quick-species");
  const backgroundSelect = $("#quick-background");
  if (!speciesSelect || !backgroundSelect) return;
  const speciesValue = speciesSelect.value || "Human";
  const preferredBackground = QUICK_BUILD_PROFILES[quickClass].backgrounds[edition];
  const backgroundValue = resetBackground ? preferredBackground : backgroundSelect.value || preferredBackground;
  const species = customizationEntries(SPECIES_CATALOG, RULES.species[edition], RULES.species[2014]);
  const backgrounds = customizationEntries(BACKGROUND_CATALOG, RULES.backgrounds[edition], RULES.backgrounds[2014]);
  speciesSelect.innerHTML = species.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("");
  backgroundSelect.innerHTML = backgrounds.map(item =>
    `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}${item.name === preferredBackground ? " · recommended" : ""}</option>`
  ).join("");
  speciesSelect.value = species.some(item => item.name === speciesValue) ? speciesValue : "Human";
  backgroundSelect.value = backgrounds.some(item => item.name === backgroundValue) ? backgroundValue : backgrounds[0]?.name || "";
  $("#quick-species-description").textContent = speciesDescription(speciesSelect.value) || "Your species grants traits such as movement, senses, and special abilities.";
  $("#quick-background-description").textContent = `${backgroundDescription(backgroundSelect.value) || "Your background grants starting skills and origin benefits."}${backgroundSelect.value === preferredBackground ? " Recommended for this class." : ""}`;
  renderQuickSummary();
}

function renderQuickSummary() {
  const summary = $("#quick-summary");
  if (!summary || !$("#quick-species")?.value || !$("#quick-background")?.value) return;
  const character = buildQuickCharacter(true);
  const stats = derived(character);
  const spellNames = character.spells.map(spell => spell.name);
  const featureCount = (CLASS_FEATURES[edition]?.[quickClass] || []).filter(([level]) => level <= character.level).length
    + (character.subclass ? resolvedSubclassFeatures(edition, quickClass, character.subclass).filter(([level]) => level <= character.level).length : 0);
  summary.innerHTML = `
    <div class="quick-summary-title"><span>${RULES.classes[quickClass].icon}</span><div><small>LEVEL ${character.level} ${edition === "2024" ? "5.5e" : "5e"}</small><h3>${escapeHtml(character.species)} ${escapeHtml(character.subclass || quickClass)}</h3><p>${escapeHtml(character.background)} background</p></div></div>
    <div class="quick-summary-stats">
      <span><small>AC</small><strong>${stats.ac}</strong></span>
      <span><small>HP</small><strong>${stats.hp}</strong></span>
      <span><small>Best ability</small><strong>${QUICK_BUILD_PROFILES[quickClass].abilities[0]} ${character[QUICK_BUILD_PROFILES[quickClass].abilities[0]]}</strong></span>
    </div>
    <div class="quick-summary-section"><strong>Automatic ability scores</strong><p>${ABILITIES.map(ability => `${ability} ${character[ability]}`).join(" · ")}</p></div>
    <div class="quick-summary-section"><strong>Trained skills</strong><p>${[...new Set([...character.skillProficiencies, ...character.backgroundSkills])].join(", ")}</p></div>
    ${character.weaponMastery?.length ? `<div class="quick-summary-section"><strong>Weapon masteries</strong><p>${escapeHtml(character.weaponMastery.join(", "))}</p></div>` : ""}
    ${character.fightingStyle ? `<div class="quick-summary-section"><strong>Fighting style</strong><p>${escapeHtml(character.fightingStyle)}</p></div>` : ""}
    ${spellNames.length ? `<div class="quick-summary-section"><strong>Selected spells</strong><p>${escapeHtml(spellNames.slice(0, 18).join(", "))}${spellNames.length > 18 ? `, and ${spellNames.length - 18} more` : ""}</p></div>` : ""}
    <div class="quick-summary-section"><strong>Features ready</strong><p>${featureCount} class/subclass feature${featureCount === 1 ? "" : "s"} will appear on the sheet for level ${character.level}.</p></div>
    <div class="quick-summary-section"><strong>Starting equipment</strong><p>${character.inventory.slice(0, 6).map(item => `${item.quantity > 1 ? `${item.quantity}× ` : ""}${item.name}`).join(", ")}</p></div>
    <p class="quick-summary-note">Every choice remains editable after creation.</p>`;
}

function setQuickStep(step) {
  quickStep = Math.max(1, Math.min(3, step));
  $$("[data-quick-panel]").forEach(panel => panel.classList.toggle("active", Number(panel.dataset.quickPanel) === quickStep));
  $$("[data-quick-step]").forEach(button => {
    const buttonStep = Number(button.dataset.quickStep);
    button.classList.toggle("active", buttonStep === quickStep);
    button.classList.toggle("complete", buttonStep < quickStep);
  });
  $("#quick-back").style.visibility = quickStep === 1 ? "hidden" : "visible";
  $("#quick-next").classList.toggle("hidden", quickStep === 3);
  $("#quick-step-count").textContent = `Step ${quickStep} of 3`;
  if (quickStep === 2) renderQuickOrigin();
  if (quickStep === 3) {
    if (!$("#quick-name").value) generateQuickName(true);
    renderQuickSummary();
  }
}

function initializeQuickBuilder() {
  quickStep = 1;
  quickClass = RULES.classes[quickClass] ? quickClass : "Fighter";
  renderQuickClasses();
  renderQuickOrigin(true);
  setQuickStep(1);
}

function initializePrebuildBuilder() {
  prebuildClass = RULES.classes[prebuildClass] ? prebuildClass : "Fighter";
  prebuildSubclass = defaultSubclassFor(prebuildClass, Number($("#prebuild-level")?.value || 3));
  renderPrebuildOptions(true);
  if (!$("#prebuild-name")?.value) $("#prebuild-name").value = generateQuickName(false);
  renderPrebuildSummary();
}

function showCreationMethod(method) {
  if (method === "random") {
    initializeQuickBuilder();
    createRandomCharacter();
    return;
  }
  const choosing = method === "choose";
  const quick = method === "quick";
  const standard = method === "standard";
  const premade = method === "premade";
  const prebuild = method === "prebuild";
  $("#creation-methods").classList.toggle("hidden", !choosing);
  $("#quick-builder").classList.toggle("hidden", !quick);
  $("#prebuild-builder")?.classList.toggle("hidden", !prebuild);
  $("#premade-builder")?.classList.toggle("hidden", !premade);
  $("#standard-builder").classList.toggle("hidden", !standard);
  $("#builder-eyebrow").textContent = choosing ? "CHARACTER CREATOR" : quick ? "BEGINNER QUICK BUILD" : prebuild ? "CUSTOM PREBUILD" : premade ? "PREMADE HEROES" : "FULL CHARACTER CREATOR";
  $("#builder-title").textContent = choosing ? "Build your adventurer" : quick ? "Create a hero in minutes" : prebuild ? "Generate a leveled hero" : premade ? "Claim a ready character" : "Build every detail";
  $("#builder-description").textContent = choosing
    ? "Choose a fast guided build or take full control."
    : quick ? "Pick a starting level, smart defaults, and no rules expertise required." : prebuild ? "Pick the core concept and let DND Beyonder create a solid playable sheet." : premade ? "Pick a playable hero, then edit anything from the sheet." : "Every choice updates your sheet as you go.";
  if (quick) initializeQuickBuilder();
  if (prebuild) initializePrebuildBuilder();
  if (premade) renderPremadeHeroes();
  if (standard) setStep(currentStep);
}

function generateQuickName(writeToField = true) {
  const species = $("#quick-species")?.value || "Human";
  const pool = QUICK_NAMES[species] || ["Arden", "Kael", "Mira", "Rowan", "Tamsin", "Vale"];
  const name = pool[Math.floor(Math.random() * pool.length)];
  if (writeToField && $("#quick-name")) $("#quick-name").value = name;
  return name;
}

function surpriseQuickBuild() {
  const classes = Object.keys(RULES.classes);
  quickClass = classes[Math.floor(Math.random() * classes.length)];
  renderQuickClasses();
  renderQuickOrigin(true);
  const speciesOptions = [...$("#quick-species").options];
  if (speciesOptions.length) $("#quick-species").value = speciesOptions[Math.floor(Math.random() * speciesOptions.length)].value;
  generateQuickName(true);
  renderQuickOrigin();
  setQuickStep(3);
}

function createQuickCharacter() {
  const character = buildQuickCharacter();
  if (!character.name.trim()) {
    $("#quick-name").focus();
    toast("Give your hero a name");
    return;
  }
  clearCharacterDeletion(character.id);
  characters.unshift(character);
  activeCharacterId = character.id;
  persistCharacters();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${character.name} is ready to adventure`);
}

function createPrebuiltCharacter() {
  const character = buildPrebuiltCharacter();
  if (!character.name.trim()) {
    $("#prebuild-name")?.focus();
    toast("Give your prebuilt hero a name");
    return;
  }
  clearCharacterDeletion(character.id);
  characters.unshift(character);
  activeCharacterId = character.id;
  persistCharacters();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${character.name} is ready at level ${character.level}`);
}

function surprisePrebuild() {
  const classes = Object.keys(RULES.classes);
  prebuildClass = classes[Math.floor(Math.random() * classes.length)] || "Fighter";
  const level = 1 + Math.floor(Math.random() * 20);
  if ($("#prebuild-level")) $("#prebuild-level").value = level;
  prebuildSubclass = defaultSubclassFor(prebuildClass, level);
  renderPrebuildOptions(true);
  const speciesOptions = [...($("#prebuild-species")?.options || [])];
  if (speciesOptions.length) $("#prebuild-species").value = speciesOptions[Math.floor(Math.random() * speciesOptions.length)].value;
  if ($("#prebuild-name")) $("#prebuild-name").value = generateQuickName(false);
  if ($("#prebuild-player")) $("#prebuild-player").value = "";
  renderPrebuildSummary();
}

function buildPremadeCharacter(hero, preview = false) {
  if (!hero) return null;
  const previousQuickClass = quickClass;
  const previousQuickLevel = $("#quick-level")?.value || "1";
  quickClass = hero.className;
  renderQuickOrigin(true);
  if ($("#quick-species")) $("#quick-species").value = hero.species;
  if ($("#quick-background")) $("#quick-background").value = hero.background;
  if ($("#quick-level")) $("#quick-level").value = Math.max(1, Math.min(20, Number(hero.level || 1)));
  if ($("#quick-name")) $("#quick-name").value = hero.name;
  if ($("#quick-player")) $("#quick-player").value = "";
  const character = buildQuickCharacter(preview);
  quickClass = previousQuickClass;
  if ($("#quick-level")) $("#quick-level").value = previousQuickLevel;
  character.id = preview ? `premade-${hero.key}` : crypto.randomUUID();
  character.name = hero.name;
  character.level = Number(hero.level || 1);
  character.className = hero.className;
  const subclassUnlocked = character.level >= subclassLevel(hero.className, edition);
  character.subclass = subclassUnlocked ? (hero.subclass || character.subclass || "") : "";
  character.classes = [{ name: hero.className, level: character.level, subclass: character.subclass, customSubclass: "", subclassChoices: character.subclassChoices || {} }];
  character.backstory = `${hero.pitch} This premade character is ready for play and can be fully customized after creation.`;
  character.premade = true;
  character.quickBuilt = true;
  character.currentHp = derived(character).hp;
  return character;
}

function renderPremadeHeroes() {
  const target = $("#premade-grid");
  if (!target) return;
  target.innerHTML = PREMADE_HEROES.map(hero => {
    const preview = buildPremadeCharacter(hero, true);
    const stats = preview ? derived(preview) : { ac: "-", hp: "-", prof: "" };
    return `<article class="premade-card">
      <span class="premade-role">${escapeHtml(hero.role)}</span>
      <h3>${escapeHtml(hero.name)}</h3>
      <p>${escapeHtml(hero.pitch)}</p>
      <div class="premade-tags"><span>${escapeHtml(hero.species)}</span><span>${escapeHtml(hero.className)}</span><span>${escapeHtml(hero.background)}</span></div>
      <div class="premade-stats"><span>AC <strong>${stats.ac}</strong></span><span>HP <strong>${stats.hp}</strong></span><span>PROF <strong>${escapeHtml(signed(stats.prof || 2))}</strong></span></div>
      <button type="button" class="button primary small" data-premade-create="${escapeHtml(hero.key)}">Claim character</button>
    </article>`;
  }).join("");
}

function createPremadeCharacter(key) {
  const hero = PREMADE_HEROES.find(item => item.key === key);
  const character = buildPremadeCharacter(hero);
  if (!character) return;
  clearCharacterDeletion(character.id);
  characters.unshift(character);
  activeCharacterId = character.id;
  persistCharacters();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${character.name} added to your vault`);
}

function createRandomCharacter() {
  const classNames = Object.keys(RULES.classes);
  quickClass = classNames[Math.floor(Math.random() * classNames.length)] || "Fighter";
  renderQuickOrigin(true);
  if ($("#quick-level")) $("#quick-level").value = 1;
  const speciesOptions = [...($("#quick-species")?.options || [])];
  const backgroundOptions = [...($("#quick-background")?.options || [])];
  if (speciesOptions.length) $("#quick-species").value = speciesOptions[Math.floor(Math.random() * speciesOptions.length)].value;
  if (backgroundOptions.length) $("#quick-background").value = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)].value;
  if ($("#quick-name")) $("#quick-name").value = generateQuickName(false);
  if ($("#quick-player")) $("#quick-player").value = "";
  const character = buildQuickCharacter();
  character.randomized = true;
  clearCharacterDeletion(character.id);
  characters.unshift(character);
  activeCharacterId = character.id;
  persistCharacters();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${character.name} was randomized and saved`);
}

function customizationEntries(catalog, fallback, legacyFallback = []) {
  if (!Array.isArray(catalog)) return fallback.map(name => ({ name, source: edition === "2024" ? "5.5e" : "5e", rules: edition }));
  const native = catalog.filter(item => item.rules === edition);
  const nativeNames = new Set(native.map(item => item.name));
  fallback.forEach(name => {
    if (!nativeNames.has(name)) {
      native.push({ name, source: edition === "2024" ? "Core 5.5e rules" : "Core 5e rules", rules: edition });
      nativeNames.add(name);
    }
  });
  if (edition === "2014") return native.slice().sort((a, b) => a.name.localeCompare(b.name));
  const legacy = catalog.filter(item => item.rules === "2014" && !nativeNames.has(item.name));
  const legacyNames = new Set(legacy.map(item => item.name));
  legacyFallback.forEach(name => {
    if (!nativeNames.has(name) && !legacyNames.has(name)) {
      legacy.push({ name, source: "Core 5e rules", rules: "2014" });
      legacyNames.add(name);
    }
  });
  return [...native, ...legacy]
    .sort((a, b) => a.name.localeCompare(b.name));
}

function abilityOptions(abilities = ABILITIES, selected = "", excluded = []) {
  return abilities.filter(ability => !excluded.includes(ability)).map(ability =>
    `<option value="${ability}" ${ability === selected ? "selected" : ""}>${ability}</option>`
  ).join("");
}

function originFormValues() {
  return Object.fromEntries(new FormData(form));
}

function setCurrentOriginFeat(name) {
  const next = String(name || "").trim();
  if (currentOriginFeat && currentOriginFeat !== next) selectedFeatNames.delete(currentOriginFeat);
  currentOriginFeat = next;
  if (next) selectedFeatNames.add(next);
}

function selectedSpeciesVariant(raw = originFormValues()) {
  const rule = SPECIES_RULES_2014[raw.species || $("#species-select").value] || { variants: [flexibleSpeciesVariant()] };
  return rule.variants.find(variant => variant.name === raw.speciesVariant) || rule.variants[0];
}

function originAbilityBonuses(raw = originFormValues()) {
  const bonuses = Object.fromEntries(ABILITIES.map(ability => [ability, 0]));
  if (edition === "2014") {
    const variant = selectedSpeciesVariant(raw);
    Object.entries(variant.bonuses || {}).forEach(([ability, amount]) => bonuses[ability] += Number(amount));
    (variant.choices || []).forEach((choice, choiceIndex) => {
      for (let index = 0; index < choice.count; index += 1) {
        const ability = raw[`originAbility${choiceIndex}_${index}`];
        if (ABILITIES.includes(ability)) bonuses[ability] += Number(choice.amount);
      }
    });
    return bonuses;
  }
  const background = BACKGROUND_RULES_2024[raw.background || $("#background-select").value];
  if (!background) return bonuses;
  if (raw.backgroundAbilityMode === "three") {
    background.abilities.forEach(ability => bonuses[ability] += 1);
  } else {
    const primary = background.abilities.includes(raw.backgroundPrimary) ? raw.backgroundPrimary : background.abilities[0];
    const secondary = background.abilities.includes(raw.backgroundSecondary) && raw.backgroundSecondary !== primary
      ? raw.backgroundSecondary
      : background.abilities.find(ability => ability !== primary);
    bonuses[primary] += 2;
    if (secondary) bonuses[secondary] += 1;
  }
  return bonuses;
}

function originFeatFromForm(raw = originFormValues()) {
  if (edition === "2014") {
    return selectedSpeciesVariant(raw).featChoice ? String(raw.originFeatChoice || "").trim() : "";
  }
  const rule = BACKGROUND_RULES_2024[raw.background || $("#background-select").value];
  return rule?.feat || String(raw.originFeatChoice || "").trim();
}

function validateOriginChoices(raw = originFormValues()) {
  if (edition === "2014") {
    const variant = selectedSpeciesVariant(raw);
    const selected = [];
    for (let choiceIndex = 0; choiceIndex < (variant.choices || []).length; choiceIndex += 1) {
      const choice = variant.choices[choiceIndex];
      for (let index = 0; index < choice.count; index += 1) {
        const ability = raw[`originAbility${choiceIndex}_${index}`];
        if (!ability || choice.exclude?.includes(ability)) return false;
        if (choice.distinct && selected.includes(ability)) return false;
        selected.push(ability);
      }
    }
    return !variant.featChoice || Boolean(String(raw.originFeatChoice || "").trim());
  }
  const rule = BACKGROUND_RULES_2024[raw.background || $("#background-select").value];
  if (!rule) return true;
  if (raw.backgroundAbilityMode !== "three" && raw.backgroundPrimary === raw.backgroundSecondary) return false;
  return !rule.featChoice || Boolean(String(raw.originFeatChoice || "").trim());
}

function backgroundSkillBlock(savedCharacter, backgroundName, currentSelections = []) {
  const defaults = BACKGROUND_SKILLS[backgroundName] || [];
  const selected = savedCharacter?.backgroundSkills?.length
    ? savedCharacter.backgroundSkills
    : currentSelections.length === 2 ? currentSelections : defaults;
  return choiceChecks("backgroundSkills", Object.keys(SKILLS), selected, 2, "Background skill proficiencies");
}

function renderOriginRules(savedCharacter = null) {
  const container = $("#origin-rules");
  if (!container) return;
  const currentBackgroundSkills = selectedValues("backgroundSkills", container);
  updateOriginDescriptions();
  const live = originFormValues();
  const saved = savedCharacter || live;
  if (edition === "2014") {
    const species = saved.species || $("#species-select").value;
    const rule = SPECIES_RULES_2014[species] || { variants: [flexibleSpeciesVariant()] };
    const selectedVariant = rule.variants.find(variant => variant.name === saved.speciesVariant) || rule.variants[0];
    const choiceFields = (selectedVariant.choices || []).flatMap((choice, choiceIndex) =>
      Array.from({ length: choice.count }, (_, index) => {
        const fieldName = `originAbility${choiceIndex}_${index}`;
        const candidates = ABILITIES.filter(ability => !choice.exclude?.includes(ability));
        const chosen = saved[fieldName] || choice.default || candidates[(choiceIndex + index) % candidates.length] || ABILITIES[0];
        return `<label>+${choice.amount} ability<select name="${fieldName}">${abilityOptions(ABILITIES, chosen, choice.exclude || [])}</select></label>`;
      })
    ).join("");
    const fixed = Object.entries(selectedVariant.bonuses || {}).map(([ability, amount]) => `${ability} +${amount}`).join(", ");
    const featOptions = (FEATS[2014] || [])
      .filter(feat => feat.category !== "Epic Boon" && feat.category !== "Fighting Style")
      .map(feat => feat.name);
    const featField = selectedVariant.featChoice
      ? `<label>Species feat<select name="originFeatChoice" required>${[...new Set(featOptions)].map(name =>
          `<option value="${escapeHtml(name)}" ${name === saved.originFeatChoice || name === saved.originFeat ? "selected" : ""}>${escapeHtml(name)}</option>`
        ).join("")}</select></label>`
      : "";
    container.innerHTML = `<div class="origin-heading"><div><span class="eyebrow">2014 SPECIES BONUSES</span><h3>${escapeHtml(species)}</h3></div><p>These increases are added to the base scores entered in Step 4.</p></div>
      <div class="origin-choice-grid">
        <label>Species version<select name="speciesVariant">${rule.variants.map(variant =>
          `<option value="${escapeHtml(variant.name)}" ${variant.name === selectedVariant.name ? "selected" : ""}>${escapeHtml(variant.name)}</option>`
        ).join("")}</select></label>
        ${choiceFields}${featField}
      </div>
      <p class="origin-summary">${fixed ? `Fixed bonuses: ${escapeHtml(fixed)}.` : "This version uses flexible ability increases."} Chosen increases must go to different abilities when required.</p>`;
  } else {
    const backgroundName = saved.background || $("#background-select").value;
    const rule = BACKGROUND_RULES_2024[backgroundName];
    if (!rule) { container.innerHTML = ""; setCurrentOriginFeat(""); return; }
    const mode = saved.backgroundAbilityMode || "split";
    const primary = rule.abilities.includes(saved.backgroundPrimary) ? saved.backgroundPrimary : rule.abilities[0];
    const secondary = rule.abilities.includes(saved.backgroundSecondary) && saved.backgroundSecondary !== primary
      ? saved.backgroundSecondary
      : rule.abilities.find(ability => ability !== primary);
    const featField = rule.feat
      ? `<label>Granted Origin feat<input value="${escapeHtml(rule.feat)}" readonly><input type="hidden" name="originFeat" value="${escapeHtml(rule.feat)}"></label>`
      : `<label>${escapeHtml(rule.featChoice)}<input name="originFeatChoice" value="${escapeHtml(saved.originFeatChoice || saved.originFeat || "")}" required placeholder="Enter the selected feat"></label>`;
    container.innerHTML = `<div class="origin-heading"><div><span class="eyebrow">2024 BACKGROUND BENEFITS</span><h3>${escapeHtml(backgroundName)}</h3></div><p>2024 species do not grant ability score increases; the background does.</p></div>
      <div class="origin-choice-grid">
        <label>Ability increase method<select name="backgroundAbilityMode">
          <option value="split" ${mode === "split" ? "selected" : ""}>+2 to one, +1 to another</option>
          <option value="three" ${mode === "three" ? "selected" : ""}>+1 to all three</option>
        </select></label>
        ${mode === "three" ? "" : `<label>+2 ability<select name="backgroundPrimary">${abilityOptions(rule.abilities, primary)}</select></label>
        <label>+1 ability<select name="backgroundSecondary">${abilityOptions(rule.abilities, secondary)}</select></label>`}
        ${featField}
      </div>
      <p class="origin-summary">Eligible abilities: ${rule.abilities.join(", ")}. The granted feat is added to the character sheet automatically.</p>`;
  }
  const backgroundName = saved.background || $("#background-select").value;
  container.insertAdjacentHTML("beforeend", backgroundSkillBlock(savedCharacter, backgroundName, currentBackgroundSkills));
  setCurrentOriginFeat(originFeatFromForm());
  updatePreview();
}

function fightingStylesForClass(className, rulesEdition) {
  const styles = {
    Fighter: ["Archery", "Blind Fighting", "Defense", "Dueling", "Great Weapon Fighting", "Interception", "Protection", "Superior Technique", "Thrown Weapon Fighting", "Two-Weapon Fighting", "Unarmed Fighting"],
    Paladin: ["Blessed Warrior", "Blind Fighting", "Defense", "Dueling", "Great Weapon Fighting", "Interception", "Protection"],
    Ranger: ["Archery", "Blind Fighting", "Defense", "Druidic Warrior", "Dueling", "Thrown Weapon Fighting", "Two-Weapon Fighting"],
    "Blood Hunter": ["Archery", "Dueling", "Great Weapon Fighting", "Two-Weapon Fighting"]
  };
  if (rulesEdition === "2024") {
    const revised = PROGRESSION_OPTIONS.fightingStyles[2024];
    return {
      Fighter: revised,
      Paladin: [...revised, "Blessed Warrior"],
      Ranger: [...revised, "Druidic Warrior"],
      "Blood Hunter": styles["Blood Hunter"]
    }[className] || [];
  }
  return styles[className] || PROGRESSION_OPTIONS.fightingStyles[2014];
}

function weaponMasteryCount(className, level, rulesEdition) {
  if (rulesEdition !== "2024") return 0;
  if (className === "Fighter") return level >= 16 ? 6 : level >= 10 ? 5 : level >= 4 ? 4 : 3;
  if (className === "Barbarian") return level >= 10 ? 4 : level >= 4 ? 3 : 2;
  return ["Paladin", "Ranger", "Rogue"].includes(className) ? 2 : 0;
}

function weaponMasteryOptions(className) {
  if (className !== "Rogue") return PROGRESSION_OPTIONS.weapons;
  const rogueWeapons = new Set([
    "Club", "Dagger", "Dart", "Greatclub", "Hand Crossbow", "Handaxe", "Javelin", "Light Crossbow",
    "Light Hammer", "Mace", "Quarterstaff", "Rapier", "Scimitar", "Shortbow", "Shortsword",
    "Sickle", "Sling", "Spear", "Whip"
  ]);
  return PROGRESSION_OPTIONS.weapons.filter(weapon => rogueWeapons.has(weapon));
}

function classChoiceSelect(name, label, options, selected = "") {
  return `<label class="class-choice-block"><strong>${escapeHtml(label)}</strong><select name="${name}">${options.map(option =>
    `<option value="${escapeHtml(option)}" ${option === selected ? "selected" : ""}>${escapeHtml(option)}</option>`
  ).join("")}</select></label>`;
}

function choiceChecks(name, options, selected, limit, label) {
  const chosen = new Set(selected || []);
  return `<div class="class-choice-block" data-builder-choice-name="${name}" data-builder-choice-limit="${limit}">
    <strong>${escapeHtml(label)} · choose ${limit}</strong>
    <div class="radio-grid">${options.map(option => `<label class="radio-option">
      <input type="checkbox" name="${name}" value="${escapeHtml(option)}" ${chosen.has(option) ? "checked" : ""}>
      <span>${escapeHtml(option)}</span>
    </label>`).join("")}</div>
  </div>`;
}

function expertiseCountAtLevel(className, level, rulesEdition) {
  const rows = LEVEL_CHOICE_RULES[rulesEdition]?.[className]?.expertise || {};
  return Object.entries(rows).reduce((total, [unlock, count]) => total + (level >= Number(unlock) ? Number(count) : 0), 0);
}

function classSkillRuleAtLevel(className, level, rulesEdition, subclass = "") {
  const base = CLASS_SKILLS[className] || { count: 0, options: [] };
  let count = base.count;
  let options = [...base.options];
  if (rulesEdition === "2014" && className === "Fighter") options = options.filter(skill => skill !== "Persuasion");
  if (rulesEdition === "2014" && className === "Wizard") options = options.filter(skill => skill !== "Nature");
  if (rulesEdition === "2024" && className === "Rogue") options = options.filter(skill => skill !== "Performance");
  if (rulesEdition === "2024" && className === "Barbarian" && level >= 3) count += 1;
  if (subclass === "College of Lore" && level >= 3) {
    count += 3;
    options = Object.keys(SKILLS);
  }
  return { count, options };
}

function subclassChoiceBlocks(savedCharacter, level) {
  const subclass = $("#subclass-select")?.value || savedCharacter?.subclass || "";
  const saved = savedCharacter?.subclassChoices || {};
  return subclassChoiceMarkup(subclass, level, saved, true);
}

function subclassChoiceMarkup(subclass, level, saved = {}, includeEarlier = false, rulesEdition = edition) {
  return (SUBCLASS_CHOICE_RULES[subclass] || [])
    .filter(choice => includeEarlier ? level >= choice.level : level === choice.level)
    .filter(choice => !choice.editions || choice.editions.includes(rulesEdition))
    .map(choice => classChoiceSelect(`subclassChoice_${choice.key}`, choice.label, choice.options, saved[choice.key]))
    .join("");
}

function subclassChoiceSummaryMarkup(subclass, level, saved = {}, rulesEdition = edition) {
  const rows = (SUBCLASS_CHOICE_RULES[subclass] || [])
    .filter(choice => level >= choice.level)
    .filter(choice => !choice.editions || choice.editions.includes(rulesEdition))
    .map(choice => {
      const field = form.elements[`subclassChoice_${choice.key}`];
      const value = field?.value || saved[choice.key] || "";
      return value ? `<span class="tag">${escapeHtml(choice.label)}: ${escapeHtml(value)}</span>` : "";
    })
    .filter(Boolean);
  return rows.length ? `<div class="selection-choice-summary"><strong>Selected subclass options</strong><div class="tag-list">${rows.join("")}</div></div>` : "";
}

function levelSubclassChoiceMarkup(character, subclass, targetLevel) {
  let markup = subclassChoiceMarkup(
    subclass,
    targetLevel,
    character.subclassChoices || {},
    true,
    character.edition
  );
  if (subclass === "College of Lore" && targetLevel >= 3 && Number(character.level || 1) < 3) {
    const trained = proficientSkills(character);
    const options = Object.keys(SKILLS).filter(skill => !trained.has(skill));
    markup += `<div data-min-choices="3" data-choice-name="skillProficiencies"><strong>Choose three bonus skill proficiencies</strong>${optionChecks("skillProficiencies", options, [], 3)}</div>`;
  }
  return markup;
}

function renderStartingClassOptions(savedCharacter = null) {
  const field = $("#fighting-style-field");
  const select = $("#fighting-style-select");
  if (!field || !select) return;
  const level = Number(form.elements.level?.value || 1);
  const hasFightingStyle = (CLASS_FEATURES[edition]?.[selectedClass] || [])
    .some(([unlock, name]) => unlock <= level && name.includes("Fighting Style"));
  field.classList.toggle("hidden", !hasFightingStyle);
  if (!hasFightingStyle) {
    select.innerHTML = "";
  } else {
    const current = savedCharacter?.fightingStyle || select.value;
    const styles = fightingStylesForClass(selectedClass, edition);
    select.innerHTML = styles.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)} · ${escapeHtml(FIGHTING_STYLE_SOURCES[edition]?.[name] || "Expanded rules")}</option>`).join("");
    if (current && styles.includes(current)) select.value = current;
    $("#fighting-style-meta").textContent = `${styles.length} options available for ${selectedClass} at level ${level}.`;
  }

  const choiceFields = $("#class-choice-fields");
  if (!choiceFields) return;
  const currentMasteries = new Set(savedCharacter?.weaponMastery || selectedValues("weaponMastery"));
  const classSkillRule = classSkillRuleAtLevel(selectedClass, level, edition, $("#subclass-select")?.value || "");
  const currentSkills = savedCharacter?.skillProficiencies || selectedValues("skillProficiencies");
  const currentExpertise = savedCharacter?.expertise || selectedValues("expertise");
  const currentChoice = name => savedCharacter?.[name] || form.elements[name]?.value || "";
  const blocks = [];
  if (classSkillRule.count) {
    blocks.push(choiceChecks("skillProficiencies", classSkillRule.options, currentSkills, classSkillRule.count, "Class skill proficiencies"));
  }
  const expertiseCount = expertiseCountAtLevel(selectedClass, level, edition);
  if (expertiseCount) {
    blocks.push(choiceChecks("expertise", Object.keys(SKILLS), currentExpertise, expertiseCount, "Expertise"));
  }
  const masteryCount = weaponMasteryCount(selectedClass, level, edition);
  if (masteryCount) {
    blocks.push(`<div class="class-choice-block" data-builder-choice-name="weaponMastery" data-builder-choice-limit="${masteryCount}">
      <strong>Weapon Mastery · choose ${masteryCount}</strong>
      <div class="radio-grid">${weaponMasteryOptions(selectedClass).map(weapon => `<label class="radio-option">
        <input type="checkbox" name="weaponMastery" value="${escapeHtml(weapon)}" ${currentMasteries.has(weapon) ? "checked" : ""}>
        <span>${escapeHtml(weapon)} · ${escapeHtml(WEAPON_MASTERY_PROPERTIES[weapon] || "Mastery")}</span>
      </label>`).join("")}</div>
      <small>You can replace mastered weapons after a Long Rest. Additional choices become available at the levels shown in class progression.</small>
    </div>`);
  }
  if (edition === "2024" && selectedClass === "Cleric") {
    blocks.push(classChoiceSelect("divineOrder", "Divine Order", ["Protector", "Thaumaturge"], currentChoice("divineOrder")));
  }
  if (edition === "2024" && selectedClass === "Druid") {
    blocks.push(classChoiceSelect("primalOrder", "Primal Order", ["Magician", "Warden"], currentChoice("primalOrder")));
  }
  if (edition === "2024" && selectedClass === "Cleric" && level >= 7) {
    blocks.push(classChoiceSelect("blessedStrikes", "Blessed Strikes", ["Divine Strike", "Potent Spellcasting"], currentChoice("blessedStrikes")));
  }
  if (edition === "2024" && selectedClass === "Druid" && level >= 7) {
    blocks.push(classChoiceSelect("elementalFury", "Elemental Fury", ["Potent Spellcasting", "Primal Strike"], currentChoice("elementalFury")));
  }
  blocks.push(subclassChoiceBlocks(savedCharacter, level));
  choiceFields.innerHTML = blocks.join("");
}

function subclassEntries(className = selectedClass, rulesEdition = edition) {
  const catalog = SUBCLASS_CATALOG[className] || [];
  const native = catalog.filter(item => item.rules === rulesEdition);
  if (rulesEdition === "2014") return native;
  const nativeNames = new Set(native.map(item => item.name));
  const expanded = catalog.filter(item => item.rules === "2014" && !nativeNames.has(item.name));
  return [...native, ...expanded];
}

function subclassMetadata(className, name, rulesEdition) {
  const entries = SUBCLASS_CATALOG[className] || [];
  return entries.find(item => item.name === name && item.rules === rulesEdition)
    || entries.find(item => item.name === name && item.rules === "2014");
}

function updateSubclassMeta() {
  const name = $("#subclass-select")?.value;
  const unlock = subclassLevel(selectedClass, edition);
  const level = Number(form.elements.level?.value || 1);
  const meta = subclassMetadata(selectedClass, name, edition);
  if (!$("#subclass-meta")) return;
  if (!meta) {
    $("#subclass-meta").textContent = level < unlock
      ? `Optional plan. ${selectedClass} subclass features activate at level ${unlock}.`
      : "Homebrew subclass selected.";
    return;
  }
  const rulesLabel = meta.rules === "2024" ? "native 5.5e" : edition === "2024" ? "5e expanded rules" : "5e";
  const levelStatus = level < unlock ? ` · planned for level ${unlock}` : " · active";
  $("#subclass-meta").textContent = `${meta.source} · ${rulesLabel}${levelStatus}`;
}

function renderClassFeaturePreview() {
  const container = $("#class-feature-preview");
  if (!container) return;
  const level = Number(form.elements.level?.value || 1);
  const subclassName = $("#subclass-select")?.value || "";
  const classRows = (CLASS_FEATURES[edition]?.[selectedClass] || [])
    .filter(([featureLevel]) => featureLevel <= level)
    .map(([featureLevel, name]) => ({ level: featureLevel, name, source: selectedClass }));
  const subclassRows = subclassName
    ? resolvedSubclassFeatures(edition, selectedClass, subclassName)
      .filter(([featureLevel]) => featureLevel <= level)
      .map(([featureLevel, name]) => ({ level: featureLevel, name, source: subclassName }))
    : [];
  const features = [...classRows, ...subclassRows];
  const subclassChoices = subclassName ? subclassChoiceSummaryMarkup(subclassName, level) : "";
  container.innerHTML = `<h3>Features at level ${level}</h3>
    <p>Class and subclass features are granted automatically at their listed levels.</p>
    ${subclassChoices}
    <div class="selection-feature-grid">${features.map(feature =>
      `<article class="feature-card"><small>LEVEL ${feature.level} · ${escapeHtml(feature.source)}</small><strong>${escapeHtml(feature.name)}</strong>${ruleDetails(featureDescription(edition, feature.source, feature.name, selectedClass))}</article>`
    ).join("") || "<p>No class features are available at this level.</p>"}</div>`;
}

function populateSubclasses() {
  const current = $("#subclass-select").value;
  const entries = subclassEntries();
  const native = entries.filter(item => item.rules === edition);
  const expanded = edition === "2024" ? entries.filter(item => item.rules === "2014") : [];
  const options = [];
  if (native.length) options.push(`<optgroup label="${edition === "2024" ? "Native 5.5e subclasses" : "5e subclasses"}">${native.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)} · ${escapeHtml(item.source)}</option>`).join("")}</optgroup>`);
  if (expanded.length) options.push(`<optgroup label="5e expanded rules">${expanded.map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)} · ${escapeHtml(item.source)}</option>`).join("")}</optgroup>`);
  options.push(`<option value="">Homebrew / none</option>`);
  $("#subclass-select").innerHTML = options.join("");
  $("#subclass-select").disabled = false;
  const belowUnlock = Number(form.elements.level?.value || 1) < subclassLevel(selectedClass, edition);
  if (current && [...$("#subclass-select").options].some(option => option.value === current)) {
    $("#subclass-select").value = current;
  } else {
    $("#subclass-select").value = belowUnlock ? "" : entries[0]?.name || "";
  }
  updateSubclassMeta();
  renderStartingClassOptions();
  renderClassFeaturePreview();
}

function selectedValues(name, root = document) {
  return $$(`input[name="${name}"]:checked`, root).map(input => input.value);
}

function spellListClass(className, subclass = "") {
  if (["Eldritch Knight", "Arcane Trickster"].includes(subclass)) return "Wizard";
  if (subclass === "Order of the Profane Soul") return "Warlock";
  return className;
}

function spellListsFor(rulesEdition, className, subclass = "") {
  return SPELL_LISTS[rulesEdition]?.[spellListClass(className, subclass)];
}

function maxSpellLevel(className, level, rulesEdition, subclass = "") {
  if (!spellListsFor(rulesEdition, className, subclass)) return -1;
  if (["Eldritch Knight", "Arcane Trickster"].includes(subclass)) {
    return (THIRD_CASTER_SLOTS[level - 1] || []).length;
  }
  if (subclass === "Order of the Profane Soul") return Math.min(4, Math.floor((level + 5) / 6));
  if (className === "Artificer") return Math.min(5, Math.ceil(level / 2));
  if (className === "Paladin" || className === "Ranger") {
    if (rulesEdition === "2014" && level < 2) return 0;
    return Math.min(5, Math.floor((level + 3) / 4));
  }
  if (className === "Warlock") return Math.min(5, Math.ceil(level / 2));
  return Math.min(9, Math.ceil(level / 2));
}

function baseCantripCount(className, rulesEdition) {
  return Number(QUICK_SPELL_COUNTS[className]?.[0] || 0);
}

function cantripLimitFor(className, level, rulesEdition, subclass = "") {
  const targetLevel = Number(level || 1);
  let total = baseCantripCount(className, rulesEdition);
  Object.entries(CANTRIP_PROGRESSION[rulesEdition]?.[className] || {}).forEach(([unlock, count]) => {
    if (targetLevel >= Number(unlock)) total += Number(count || 0);
  });
  if (["Eldritch Knight", "Arcane Trickster"].includes(subclass) && targetLevel >= 3) {
    total = 2 + (targetLevel >= 10 ? 1 : 0);
  } else if (subclass === "Order of the Profane Soul" && targetLevel >= 3) {
    total = 2 + (targetLevel >= 10 ? 1 : 0);
  }
  return Math.max(0, total);
}

function nextCantripLevelFor(className, level, rulesEdition, subclass = "") {
  const targetLevel = Number(level || 1);
  if (["Eldritch Knight", "Arcane Trickster", "Order of the Profane Soul"].includes(subclass)) {
    if (targetLevel < 3) return 3;
    if (targetLevel < 10) return 10;
    return null;
  }
  return Object.keys(CANTRIP_PROGRESSION[rulesEdition]?.[className] || {})
    .map(Number)
    .filter(unlock => unlock > targetLevel)
    .sort((a, b) => a - b)[0] || null;
}

function spellProgressionFor(rulesEdition, className, subclass = "") {
  const thirdCasterTotals = {
    "Eldritch Knight": [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    "Arcane Trickster": [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    "Order of the Profane Soul": [0,0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11]
  };
  if (thirdCasterTotals[subclass]) return { mode: "known", totals: thirdCasterTotals[subclass] };
  return SPELL_PROGRESSION[rulesEdition]?.[className]
    || (className === "Artificer" ? SPELL_PROGRESSION[2024]?.Artificer : null);
}

function spellLimitFor(className, level, rulesEdition, subclass = "", data = {}) {
  const targetLevel = Number(level || 1);
  if (rulesEdition === "2014" && className === "Artificer") {
    return Math.max(1, Math.floor(targetLevel / 2) + modifier(data.INT));
  }
  const progression = spellProgressionFor(rulesEdition, className, subclass);
  if (progression?.totals) return Number(progression.totals[targetLevel - 1] || 0);
  if (progression?.perLevel) return Math.max(0, 6 + (Math.max(1, targetLevel) - 1) * Number(progression.perLevel));
  if (rulesEdition === "2014" && (className === "Cleric" || className === "Druid")) {
    const ability = spellcastingAbility({ ...data, className });
    return Math.max(1, targetLevel + modifier(data[ability]));
  }
  if (rulesEdition === "2014" && className === "Paladin") {
    if (targetLevel < 2) return 0;
    return Math.max(1, Math.floor(targetLevel / 2) + modifier(data.CHA));
  }
  return 0;
}

function spellLimitLabel(className, rulesEdition, subclass = "") {
  const progression = spellProgressionFor(rulesEdition, className, subclass);
  if (progression?.mode === "spellbook") return "Spellbook";
  if (progression?.mode === "known") return "Known spells";
  if (progression?.mode === "prepared") return "Prepared spells";
  if (rulesEdition === "2014" && ["Cleric", "Druid", "Paladin", "Artificer"].includes(className)) return "Prepared spells";
  return "Spells";
}

const WIZARD_2024_PREPARED_TOTALS = [4,5,6,7,9,10,11,12,14,15,16,16,17,17,18,18,19,20,21,22];

function spellPreparationPolicy(rulesEdition, className, subclass = "") {
  if (className === "Wizard") return "spellbook";
  if (["Eldritch Knight", "Arcane Trickster", "Order of the Profane Soul"].includes(subclass)) return "level";
  if (rulesEdition === "2014") {
    if (["Bard", "Ranger", "Sorcerer", "Warlock"].includes(className)) return "level";
    if (["Cleric", "Druid", "Paladin", "Artificer"].includes(className)) return "long-rest-all";
  }
  if (["Bard", "Sorcerer", "Warlock"].includes(className)) return "level";
  if (["Paladin", "Ranger"].includes(className)) return "long-rest-one";
  if (["Cleric", "Druid", "Artificer"].includes(className)) return "long-rest-all";
  return "level";
}

function preparedSpellLimitFor(className, level, rulesEdition, subclass = "", data = {}) {
  const targetLevel = Math.max(1, Number(level || 1));
  if (className === "Wizard") {
    if (rulesEdition === "2024") return Number(WIZARD_2024_PREPARED_TOTALS[targetLevel - 1] || 0);
    return Math.max(1, targetLevel + modifier(data.INT));
  }
  return spellLimitFor(className, targetLevel, rulesEdition, subclass, data);
}

function spellRecordClass(spell, character) {
  return typeof spell === "string" ? primaryClassName(character) : spell.className || primaryClassName(character);
}

function characterSpellRecords(character) {
  return (character.spells || []).map(spell => typeof spell === "string"
    ? { name: spell, level: 0, className: primaryClassName(character) }
    : { ...spell, className: spell.className || primaryClassName(character) });
}

function classSpellRecords(character, className, leveledOnly = false) {
  return characterSpellRecords(character).filter(spell =>
    spell.className === className && (!leveledOnly || Number(spell.level || 0) > 0)
  );
}

function preparedEntryClass(entry, character) {
  return typeof entry === "string" ? primaryClassName(character) : entry.className || primaryClassName(character);
}

function preparedNamesForClass(character, className) {
  const stored = (character.preparedSpells || [])
    .filter(entry => preparedEntryClass(entry, character) === className)
    .map(entry => typeof entry === "string" ? entry : entry.name)
    .filter(Boolean);
  if ((character.preparedSpellClasses || []).includes(className)) return new Set(stored);
  const entry = classEntry(character, className) || { level: character.level || 1 };
  const limit = preparedSpellLimitFor(className, entry.level, character.edition, classSubclassName(character, className), withClassContext(character, className, entry.level));
  return new Set(classSpellRecords(character, className, true).slice(0, limit).map(spell => spell.name));
}

function reconcilePreparedSpells(character, previous = null) {
  const prior = previous || character;
  const preserved = (character.preparedSpells || []).filter(entry => {
    const className = preparedEntryClass(entry, character);
    return className !== "Wizard";
  });
  const preparedClasses = new Set(character.preparedSpellClasses || []);
  classBreakdown(character).forEach(entry => {
    if (spellPreparationPolicy(character.edition, entry.name, classSubclassName(character, entry.name)) !== "spellbook") return;
    const book = classSpellRecords(character, entry.name, true);
    const available = new Set(book.map(spell => spell.name));
    const previousNames = preparedNamesForClass(prior, entry.name);
    const limit = preparedSpellLimitFor(entry.name, entry.level, character.edition, classSubclassName(character, entry.name), withClassContext(character, entry.name, entry.level));
    const selected = [...previousNames].filter(name => available.has(name)).slice(0, limit);
    book.forEach(spell => {
      if (selected.length < limit && !selected.includes(spell.name)) selected.push(spell.name);
    });
    selected.forEach(name => preserved.push({ name, className: entry.name }));
    preparedClasses.add(entry.name);
  });
  character.preparedSpells = preserved;
  character.preparedSpellClasses = [...preparedClasses];
  return character;
}

function spellPreparationRuleText(character, className) {
  const policy = spellPreparationPolicy(character.edition, className, classSubclassName(character, className));
  if (policy === "spellbook") return character.edition === "2024"
    ? "Prepare spells from your spellbook after a Long Rest. At Wizard 5, Memorize Spell also lets you replace one after a Short Rest."
    : "Prepare spells from your spellbook after a Long Rest.";
  if (policy === "long-rest-all") return "Change any prepared spells after a Long Rest.";
  if (policy === "long-rest-one") return "Replace one prepared spell after a Long Rest.";
  return character.edition === "2024" ? "Replace one prepared spell when you gain a level in this class." : "Replace one known spell when you gain a level in this class.";
}

function spellLimitContext() {
  const selectedSubclass = $("#subclass-select")?.value || "";
  const level = Number(form.elements.level?.value || 1);
  const abilityData = Object.fromEntries(ABILITIES.map(ability => [ability, Number(form.elements[ability]?.value || 10)]));
  const cantripLimit = cantripLimitFor(selectedClass, level, edition, selectedSubclass);
  const nextCantripLevel = nextCantripLevelFor(selectedClass, level, edition, selectedSubclass);
  const spellLimit = spellLimitFor(selectedClass, level, edition, selectedSubclass, abilityData);
  const spellLabel = spellLimitLabel(selectedClass, edition, selectedSubclass);
  return { selectedSubclass, level, cantripLimit, nextCantripLevel, spellLimit, spellLabel };
}

function selectedSpellCounts() {
  const selectedSubclass = $("#subclass-select")?.value || "";
  const lists = spellListsFor(edition, selectedClass, selectedSubclass) || {};
  const levelsByName = new Map();
  Object.entries(lists).forEach(([spellLevel, names]) => {
    names.forEach(name => levelsByName.set(name, Number(spellLevel)));
  });
  let cantrips = 0, spells = 0;
  selectedSpellNames.forEach(name => {
    const spellLevel = levelsByName.get(name);
    if (spellLevel === 0) cantrips += 1;
    else if (spellLevel > 0) spells += 1;
  });
  return { cantrips, spells };
}

function spellSelectionIssue(data) {
  const lists = spellListsFor(data.edition, data.className, data.subclass);
  if (!lists) return "";
  const level = Number(data.level || 1);
  const allowed = maxSpellLevel(data.className, level, data.edition, data.subclass);
  const cantripLimit = cantripLimitFor(data.className, level, data.edition, data.subclass);
  const spellLimit = spellLimitFor(data.className, level, data.edition, data.subclass, data);
  const levelsByName = new Map();
  Object.entries(lists).forEach(([spellLevel, names]) => {
    names.forEach(name => levelsByName.set(name, Number(spellLevel)));
  });
  let cantrips = 0, spells = 0;
  const tooHigh = [];
  (data.spells || []).forEach(spell => {
    const name = typeof spell === "string" ? spell : spell.name;
    const spellLevel = levelsByName.get(name);
    if (spellLevel === 0) cantrips += 1;
    else if (spellLevel > 0) {
      spells += 1;
      if (spellLevel > allowed) tooHigh.push(name);
    }
  });
  if (cantrips > cantripLimit) return `Choose ${cantripLimit} cantrip${cantripLimit === 1 ? "" : "s"} or fewer`;
  if (spells > spellLimit) return `Choose ${spellLimit} leveled spell${spellLimit === 1 ? "" : "s"} or fewer`;
  if (tooHigh.length) return `Remove spells above your current spell level: ${tooHigh.slice(0, 3).join(", ")}`;
  return "";
}

function renderTalentChoices(savedFeats, savedSpells, savedFeatAbilities) {
  if (!$("#feat-list")) return;
  $$("select[data-asi-mode]").forEach(select => {
    selectedAsi[select.dataset.asiMode] = selectedAsi[select.dataset.asiMode] || { one: "", two: "" };
    selectedAsi[select.dataset.asiMode].mode = select.value;
  });
  $$("select[data-asi-slot]").forEach(select => {
    const slot = select.dataset.asiSlot, part = select.dataset.asiPart;
    selectedAsi[slot] = selectedAsi[slot] || { one: "", two: "" };
    selectedAsi[slot][part] = select.value;
  });
  renderAsiChoices();
  $$("select[data-feat-ability]").forEach(select => { selectedFeatAbilities[select.dataset.featAbility] = select.value; });
  selectedValues("feats").forEach(name => selectedFeatNames.add(name));
  selectedValues("spells").forEach(name => selectedSpellNames.add(name));
  if (savedFeats) selectedFeatNames = new Set(savedFeats);
  if (savedSpells) selectedSpellNames = new Set(savedSpells);
  if (savedFeatAbilities) selectedFeatAbilities = { ...savedFeatAbilities };
  if (currentOriginFeat) selectedFeatNames.add(currentOriginFeat);
  const level = Number(form.elements.level?.value || 1);
  const featQuery = ($("#feat-search")?.value || "").trim().toLowerCase();
  let feats = [...(FEATS[edition] || [])].filter(feat =>
    !featQuery || `${feat.name} ${feat.source || ""} ${feat.category}`.toLowerCase().includes(featQuery)
  );
  if (currentOriginFeat && !feats.some(feat => feat.name === currentOriginFeat) && (!featQuery || currentOriginFeat.toLowerCase().includes(featQuery))) {
    feats.unshift({ name: currentOriginFeat, category: "Origin", source: edition === "2024" ? "Background" : "Species" });
  }
  $("#feat-guidance").textContent = `${FEATS[edition].length} ${edition === "2014" ? "5e" : "5.5e and expanded"} feat options, grouped by source.`;
  const renderFeat = feat => {
    const isOriginFeat = feat.name === currentOriginFeat;
    const eligible = isOriginFeat || featEligible(feat, level, selectedClass, edition);
    if (!eligible) selectedFeatNames.delete(feat.name);
    const description = featDescription(feat, edition);
    const abilityChoices = featAbilityOptions(feat);
    const selectedAbility = abilityChoices.includes(selectedFeatAbilities[feat.name]) ? selectedFeatAbilities[feat.name] : abilityChoices[0];
    if (selectedAbility) selectedFeatAbilities[feat.name] = selectedAbility;
    return `<article class="choice-option ${eligible ? "" : "locked"}"><label>
      <input type="checkbox" name="feats" value="${escapeHtml(feat.name)}" ${selectedFeatNames.has(feat.name) || isOriginFeat ? "checked" : ""} ${eligible && !isOriginFeat ? "" : "disabled"}>
      <span><strong>${escapeHtml(feat.name)}</strong><small>${escapeHtml(feat.category)}${feat.prerequisite ? ` · ${escapeHtml(feat.prerequisite)}` : ""}${eligible ? "" : " · unavailable at this level"}</small></span>
    </label>${abilityChoices.length ? `<label class="feat-ability-choice">+1 ability<select data-feat-ability="${escapeHtml(feat.name)}">${abilityOptions(abilityChoices, selectedAbility)}</select></label>` : ""}${ruleDetails(description)}</article>`;
  };
  const featGroups = {}, featOrder = [];
  feats.forEach(feat => {
    const src = feat.source || (edition === "2024" ? "Player's Handbook (2024)" : "Player's Handbook (2014)");
    if (!featGroups[src]) { featGroups[src] = []; featOrder.push(src); }
    featGroups[src].push(feat);
  });
  featOrder.sort(sourceSort);
  $("#feat-list").innerHTML = featOrder.map(src =>
    `<div class="choice-group"><div class="choice-group-label">${escapeHtml(src)}</div>${featGroups[src].slice().sort((a, b) => a.name.localeCompare(b.name)).map(renderFeat).join("")}</div>`
  ).join("") || `<p>No feats match that search.</p>`;

  const selectedSubclass = $("#subclass-select")?.value || "";
  const lists = spellListsFor(edition, selectedClass, selectedSubclass);
  $("#spell-choice-section").classList.toggle("hidden", !lists);
  $("#non-caster-note").classList.toggle("hidden", Boolean(lists));
  if (!lists) return;
  const allowed = maxSpellLevel(selectedClass, level, edition, selectedSubclass);
  $("#spell-guidance").textContent = `${selectedClass} spell list · spell levels through ${allowed} are available at character level ${level}.`;
  const { cantripLimit, nextCantripLevel, spellLimit, spellLabel } = spellLimitContext();
  const counts = selectedSpellCounts();
  const cantripText = `Cantrips ${counts.cantrips}/${cantripLimit}${nextCantripLevel ? ` (next at level ${nextCantripLevel})` : ""}`;
  const spellLimitText = spellLimit ? `${spellLabel} ${counts.spells}/${spellLimit}` : "No leveled spells available yet";
  $("#spell-guidance").textContent = `${selectedClass} spell list - ${cantripText} - ${spellLimitText} - spell levels through ${allowed} are available at character level ${level}.`;
  const editingCharacter = characters.find(character => character.id === activeCharacterId && !isDemoCharacter(character));
  if (editingCharacter && spellPreparationPolicy(edition, selectedClass, selectedSubclass) === "level") {
    $("#spell-guidance").textContent += ` Leveled spells are locked here; replace one when you gain a ${selectedClass} level.`;
  }
  $("#spell-level-tabs").innerHTML = Object.keys(lists).filter(key => lists[key].length).map(key =>
    `<button type="button" data-spell-level="${key}" class="${Number(key) === selectedSpellLevel ? "active" : ""}">${key === "0" ? "Cantrip" : key}</button>`
  ).join("");
  renderSpellList();
}

function renderSpellList() {
  const selectedSubclass = $("#subclass-select")?.value || "";
  const lists = spellListsFor(edition, selectedClass, selectedSubclass);
  if (!lists) return;
  selectedValues("spells").forEach(name => selectedSpellNames.add(name));
  const query = ($("#spell-search")?.value || "").trim().toLowerCase();
  const level = Number(form.elements.level?.value || 1);
  const allowed = maxSpellLevel(selectedClass, level, edition, selectedSubclass);
  const { cantripLimit, spellLimit } = spellLimitContext();
  const counts = selectedSpellCounts();
  const editingCharacter = characters.find(character => character.id === activeCharacterId && !isDemoCharacter(character));
  const levelChangeOnly = Boolean(editingCharacter && spellPreparationPolicy(edition, selectedClass, selectedSubclass) === "level");
  const rows = [];
  Object.entries(lists).forEach(([spellLevel, spells]) => {
    if (!query && Number(spellLevel) !== selectedSpellLevel) return;
    spells.filter(name => !query || name.toLowerCase().includes(query)).forEach(name => rows.push({ name, level: Number(spellLevel) }));
  });
  const renderSpell = spell => {
    const locked = spell.level > allowed;
    const checked = selectedSpellNames.has(spell.name);
    const capped = !checked && !locked && (spell.level === 0 ? counts.cantrips >= cantripLimit : counts.spells >= spellLimit);
    const levelLocked = levelChangeOnly && spell.level > 0;
    const source = EXPANDED_SPELL_SOURCES?.[edition]?.[spell.name] || "";
    const description = spellDescription(spell.name, edition, source);
    return `<article class="choice-option ${locked || capped || levelLocked ? "locked" : ""}"><label>
      <input type="checkbox" name="spells" value="${escapeHtml(spell.name)}" data-level="${spell.level}" ${checked ? "checked" : ""} ${locked || capped || levelLocked ? "disabled" : ""}>
      <span><strong>${escapeHtml(spell.name)}</strong><small>${spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}${locked ? ` · available when this spell level is reached` : ""}</small></span>
    </label>${ruleDetails(description)}</article>`;
  };
  const spellGroups = {}, spellOrder = [];
  rows.forEach(spell => {
    const src = EXPANDED_SPELL_SOURCES?.[edition]?.[spell.name] || (edition === "2024" ? "Player's Handbook (2024)" : "Player's Handbook (2014)");
    if (!spellGroups[src]) { spellGroups[src] = []; spellOrder.push(src); }
    spellGroups[src].push(spell);
  });
  spellOrder.sort(sourceSort);
  $("#spell-list").innerHTML = rows.length ? spellOrder.map(src =>
    `<div class="choice-group"><div class="choice-group-label">${escapeHtml(src)}</div>${spellGroups[src].slice().sort((a, b) => (a.level - b.level) || a.name.localeCompare(b.name)).map(renderSpell).join("")}</div>`
  ).join("") : `<p>No spells match that search.</p>`;
}

function renderAsiChoices() {
  const container = $("#asi-list");
  const section = $("#asi-section");
  if (!container || !section) return;
  const level = Number(form.elements.level?.value || 1);
  const slots = asiSlotCount(selectedClass, level);
  Object.keys(selectedAsi).forEach(key => { if (Number(key) >= slots) delete selectedAsi[key]; });
  section.classList.toggle("hidden", slots < 1);
  const guidance = $("#asi-guidance");
  if (guidance) {
    guidance.textContent = slots < 1
      ? `${selectedClass} gains its first Ability Score Improvement at level 4.`
      : `${selectedClass} gains ${slots} advancement slot${slots > 1 ? "s" : ""} by level ${level}. For each slot, choose an Ability Score Increase or mark it for a feat. ASI scores cap at 20.`;
  }
  if (slots < 1) { container.innerHTML = ""; return; }
  const optionsFor = current => `<option value="">-- none --</option>` + ABILITIES.map(ability => `<option value="${ability}" ${ability === current ? "selected" : ""}>${ability}</option>`).join("");
  container.innerHTML = Array.from({ length: slots }, (_, index) => {
    const slot = selectedAsi[index] || { one: "", two: "" };
    const mode = slot.mode || (slot.one || slot.two ? "asi" : "none");
    const disabled = mode === "asi" ? "" : "disabled";
    return `<article class="choice-option asi-option ${mode === "asi" ? "" : "muted"}"><span><strong>Advancement Slot ${index + 1}</strong><small>${mode === "asi" ? "Pick the same ability twice for +2, or two different abilities for +1 each." : mode === "feat" ? `Use this slot for a feat from the Feats list below.${slot.feat ? ` Saved: ${escapeHtml(slot.feat)}.` : ""}` : "Choose how this advancement slot is spent."}</small></span>
      <label class="feat-ability-choice">Use slot for<select data-asi-mode="${index}">
        <option value="none" ${mode === "none" ? "selected" : ""}>Choose later</option>
        <option value="asi" ${mode === "asi" ? "selected" : ""}>Ability Score Increase</option>
        <option value="feat" ${mode === "feat" ? "selected" : ""}>Feat from list below</option>
      </select></label>
      <label class="feat-ability-choice">First +1<select data-asi-slot="${index}" data-asi-part="one" ${disabled}>${optionsFor(slot.one)}</select></label>
      <label class="feat-ability-choice">Second +1<select data-asi-slot="${index}" data-asi-part="two" ${disabled}>${optionsFor(slot.two)}</select></label>
    </article>`;
  }).join("");
}

function abilityScoreValues() {
  return Object.fromEntries(ABILITIES.map((ability, index) => [
    ability,
    Number(form.elements[ability]?.value || STANDARD_ARRAY[index])
  ]));
}

function pointBuySpent(values = abilityScoreValues()) {
  return ABILITIES.reduce((total, ability) => total + Number(POINT_BUY_COSTS[Number(values[ability])] ?? 999), 0);
}

function standardArrayCounts(values = abilityScoreValues()) {
  return STANDARD_ARRAY.reduce((counts, score) => {
    counts[score] = ABILITIES.filter(ability => Number(values[ability]) === score).length;
    return counts;
  }, {});
}

function standardArrayValid(values = abilityScoreValues()) {
  const scores = ABILITIES.map(ability => Number(values[ability])).sort((a, b) => b - a);
  return scores.length === STANDARD_ARRAY.length && scores.every((score, index) => score === STANDARD_ARRAY[index]);
}

function setAbilityMethod(method, options = {}) {
  abilityMethod = ["standard", "pointbuy", "manual"].includes(method) ? method : "standard";
  $$("[name='abilityMethod']").forEach(input => {
    input.checked = input.value === abilityMethod;
    input.closest(".ability-method")?.classList.toggle("active", input.checked);
  });
  if (!options.keepScores) {
    if (abilityMethod === "standard") setAbilityScores(Object.fromEntries(ABILITIES.map((ability, index) => [ability, STANDARD_ARRAY[index]])), { silent: true });
    if (abilityMethod === "pointbuy") setAbilityScores(Object.fromEntries(ABILITIES.map(ability => [ability, 8])), { silent: true });
  }
  buildAbilities({ keepScores: true });
  updateAbilityMethodStatus();
  updatePreview();
}

function setAbilityScores(scores, options = {}) {
  ABILITIES.forEach(ability => {
    const field = form.elements[ability];
    if (field && scores[ability] != null) field.value = Number(scores[ability]);
  });
  enforceAbilityCaps({ silent: options.silent });
  updateAbilityMethodStatus();
  if (!options.silent) updatePreview();
}

function enforceAbilityCaps(options = {}) {
  ABILITIES.forEach(ability => {
    const field = form.elements[ability];
    if (!field) return;
    const min = abilityMethod === "pointbuy" ? 8 : 1;
    const max = abilityMethod === "pointbuy" ? 15 : 30;
    let value = Math.round(Number(field.value || min));
    value = Math.max(min, Math.min(max, value));
    field.value = value;
  });
  if (abilityMethod === "pointbuy" && pointBuySpent() > POINT_BUY_BUDGET && !options.silent) {
    toast("Point buy is over 27 points");
  }
}

function abilityInputFor(ability, value) {
  if (abilityMethod === "standard") {
    return `<select name="${ability}" data-ability-score="${ability}">
      ${STANDARD_ARRAY.map(score => `<option value="${score}" ${Number(value) === score ? "selected" : ""}>${score}</option>`).join("")}
    </select>`;
  }
  const min = abilityMethod === "pointbuy" ? 8 : 1;
  const max = abilityMethod === "pointbuy" ? 15 : 30;
  return `<input name="${ability}" data-ability-score="${ability}" type="number" min="${min}" max="${max}" step="1" value="${Number(value)}">`;
}

function updateAbilityMethodStatus() {
  const status = $("#ability-method-status");
  if (!status) return;
  const values = abilityScoreValues();
  if (abilityMethod === "pointbuy") {
    const spent = pointBuySpent(values);
    const remaining = POINT_BUY_BUDGET - spent;
    status.classList.toggle("error", remaining < 0);
    status.innerHTML = `<strong>Point Buy:</strong> ${spent}/${POINT_BUY_BUDGET} points spent · ${remaining >= 0 ? `${remaining} remaining` : `${Math.abs(remaining)} over budget`} · scores must stay between 8 and 15 before bonuses.`;
    ABILITIES.forEach(ability => {
      const cost = POINT_BUY_COSTS[Number(values[ability])] ?? 0;
      const label = $(`[data-point-cost="${ability}"]`);
      if (label) label.textContent = `Point cost ${cost}`;
    });
    return;
  }
  if (abilityMethod === "standard") {
    const counts = standardArrayCounts(values);
    const missing = STANDARD_ARRAY.filter(score => counts[score] !== 1);
    status.classList.toggle("error", missing.length > 0);
    status.innerHTML = missing.length
      ? `<strong>Standard Array:</strong> use each score exactly once: ${STANDARD_ARRAY.join(", ")}.`
      : `<strong>Standard Array:</strong> all six scores are assigned once.`;
    return;
  }
  status.classList.remove("error");
  status.innerHTML = `<strong>Manual Entry:</strong> type any table-approved base scores. These are before origin, feat, and ASI bonuses.`;
}

function validateAbilityScores() {
  enforceAbilityCaps({ silent: true });
  const values = abilityScoreValues();
  if (abilityMethod === "pointbuy") {
    const spent = pointBuySpent(values);
    const inRange = ABILITIES.every(ability => Number(values[ability]) >= 8 && Number(values[ability]) <= 15);
    if (!inRange || spent > POINT_BUY_BUDGET) {
      setStep(4);
      updateAbilityMethodStatus();
      toast(spent > POINT_BUY_BUDGET ? "Point buy cannot exceed 27 points" : "Point buy scores must stay between 8 and 15");
      return false;
    }
  }
  if (abilityMethod === "standard" && !standardArrayValid(values)) {
    setStep(4);
    updateAbilityMethodStatus();
    toast("Standard Array must use 15, 14, 13, 12, 10, and 8 exactly once");
    return false;
  }
  return true;
}

function buildAbilities(options = {}) {
  const current = options.keepScores ? abilityScoreValues() : Object.fromEntries(ABILITIES.map((ability, index) => [ability, STANDARD_ARRAY[index]]));
  $("#ability-editor").innerHTML = ABILITIES.map((ability, i) => {
    const value = current[ability] ?? STANDARD_ARRAY[i];
    const helper = abilityMethod === "pointbuy"
      ? `<small data-point-cost="${ability}">Point cost ${POINT_BUY_COSTS[Number(value)] ?? 0}</small>`
      : "";
    return `<div class="ability-box"><label>${ability}${abilityInputFor(ability, value)}</label>${helper}<small data-origin-bonus="${ability}">Origin +0</small><span data-mod="${ability}">${signed(modifier(value))}</span></div>`;
  }).join("");
  $("#preview-abilities").innerHTML = ABILITIES.map(a => `<div><small>${a}</small><strong data-preview-mod="${a}">+0</strong></div>`).join("");
  updateAbilityMethodStatus();
}

function formData() {
  const data = Object.fromEntries(new FormData(form));
  data.edition = edition;
  data.abilityMethod = abilityMethod;
  data.className = selectedClass;
  data.portrait = portraitData ? portraitFromCanvas() : "";
  selectedValues("feats", form).forEach(name => selectedFeatNames.add(name));
  selectedValues("spells", form).forEach(name => selectedSpellNames.add(name));
  $$("select[data-feat-ability]").forEach(select => { selectedFeatAbilities[select.dataset.featAbility] = select.value; });
  const originBonuses = originAbilityBonuses(data);
  const originFeat = originFeatFromForm(data);
  if (originFeat) selectedFeatNames.add(originFeat);
  data.feats = [...selectedFeatNames];
  data.originFeat = originFeat;
  data.originBonuses = originBonuses;
  data.featAbilityChoices = Object.fromEntries(data.feats
    .filter(name => selectedFeatAbilities[name])
    .map(name => [name, selectedFeatAbilities[name]]));
  const featBonuses = featAbilityBonuses(new Set(data.feats));
  data.featBonuses = { ...featBonuses };
  data.skillProficiencies = selectedValues("skillProficiencies", form);
  data.backgroundSkills = selectedValues("backgroundSkills", form);
  data.expertise = selectedValues("expertise", form);
  data.weaponMastery = selectedValues("weaponMastery", form);
  data.subclassChoices = {};
  $$("[data-subclass-choice], select[name^='subclassChoice_']", form).forEach(input => {
    const key = input.dataset.subclassChoice || input.name.replace("subclassChoice_", "");
    if (key && input.value) data.subclassChoices[key] = input.value;
  });
  const lists = spellListsFor(edition, selectedClass, data.subclass) || {};
  data.spells = [...selectedSpellNames].map(name => {
    const spellLevel = Object.entries(lists).find(([, names]) => names.includes(name))?.[0] ?? 0;
    return { name, level: Number(spellLevel), className: selectedClass };
  });
  const asiBonuses = asiAbilityBonuses(selectedAsi);
  data.asi = JSON.parse(JSON.stringify(selectedAsi));
  data.asiBonuses = { ...asiBonuses };
  data.pointBuySpent = abilityMethod === "pointbuy" ? pointBuySpent() : null;
  data.baseAbilities = {};
  ABILITIES.forEach(ability => {
    const base = Number(data[ability] || 10);
    data.baseAbilities[ability] = base;
    const beforeFeat = base + Number(originBonuses[ability] || 0);
    const hasEpicIncrease = data.feats.some(name => {
      const feat = (FEATS[2024] || []).find(item => item.name === name);
      return feat?.category === "Epic Boon" && data.featAbilityChoices[name] === ability;
    });
    const maximum = hasEpicIncrease ? 30 : 20;
    const appliedFeatBonus = Math.max(0, Math.min(Number(featBonuses[ability] || 0), maximum - beforeFeat));
    data.featBonuses[ability] = appliedFeatBonus;
    const beforeAsi = beforeFeat + appliedFeatBonus;
    const appliedAsi = Math.max(0, Math.min(Number(asiBonuses[ability] || 0), 20 - beforeAsi));
    data.asiBonuses[ability] = appliedAsi;
    data[ability] = beforeAsi + appliedAsi;
  });
  data.level = Number(data.level || 1);
  const existing = characters.find(character => character.id === activeCharacterId);
  if (existing?.classes?.length > 1) {
    data.spells = [
      ...(existing.spells || []).filter(spell => spellRecordClass(spell, existing) !== data.className),
      ...data.spells
    ];
    data.classes = classBreakdown(existing).map(entry =>
      entry.name === data.className
        ? { ...entry, subclass: data.subclass || entry.subclass || "", customSubclass: data.customSubclass || "", subclassChoices: { ...(entry.subclassChoices || {}), ...(data.subclassChoices || {}) } }
        : entry
    );
    data.level = characterTotalLevel(data);
  } else {
    data.classes = [{ name: data.className, level: data.level, subclass: data.subclass || "", customSubclass: data.customSubclass || "", subclassChoices: { ...(data.subclassChoices || {}) } }];
  }
  const equipmentMode = data.startingEquipmentMode || "starting";
  if (equipmentMode === "keep" && existing) {
    data.inventory = existing.inventory || [];
    data.currency = existing.currency || { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 };
  } else if (equipmentMode === "manual") {
    data.inventory = existing?.inventory || [];
    data.currency = existing?.currency || { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 };
  } else {
    const kit = quickInventory(data.className);
    const selectedEquipment = new Set(selectedValues("startingEquipment", form));
    data.inventory = selectedEquipment.size
      ? kit.filter((item, index) => selectedEquipment.has(String(index)))
      : kit;
    data.currency = existing?.currency || { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 };
  }
  reconcilePreparedSpells(data, existing || data);
  return data;
}

function classBreakdown(data) {
  const source = Array.isArray(data?.classes) && data.classes.length
    ? data.classes
    : [{ name: data?.className || "Fighter", level: Number(data?.level || 1), subclass: data?.subclass || "", customSubclass: data?.customSubclass || "" }];
  const merged = [];
  source.forEach(entry => {
    const name = entry?.name || entry?.className || data?.className || "Fighter";
    if (!RULES.classes[name]) return;
    const level = Math.max(0, Math.min(20, Number(entry.level || 0)));
    if (!level) return;
    const existing = merged.find(item => item.name === name);
    if (existing) {
      existing.level += level;
      existing.subclass ||= entry.subclass || "";
      existing.customSubclass ||= entry.customSubclass || "";
      existing.subclassChoices = { ...(existing.subclassChoices || {}), ...(entry.subclassChoices || {}) };
    } else {
      merged.push({
        name,
        level,
        subclass: entry.subclass || (name === data?.className ? data?.subclass || "" : ""),
        customSubclass: entry.customSubclass || (name === data?.className ? data?.customSubclass || "" : ""),
        subclassChoices: { ...(entry.subclassChoices || {}) }
      });
    }
  });
  if (!merged.length) merged.push({ name: data?.className || "Fighter", level: Number(data?.level || 1), subclass: data?.subclass || "", customSubclass: data?.customSubclass || "", subclassChoices: {} });
  return merged.map(entry => ({ ...entry, level: Math.max(1, Math.min(20, Number(entry.level || 1))) }));
}

function characterTotalLevel(data) {
  return classBreakdown(data).reduce((total, entry) => total + Number(entry.level || 0), 0);
}

function primaryClassName(data) {
  return data?.className || classBreakdown(data)[0]?.name || "Fighter";
}

function classEntry(data, className = primaryClassName(data)) {
  return classBreakdown(data).find(entry => entry.name === className) || null;
}

function classLevel(data, className = primaryClassName(data)) {
  return Number(classEntry(data, className)?.level || 0);
}

function hasClass(data, className, minimumLevel = 1) {
  return classLevel(data, className) >= minimumLevel;
}

function classSubclassName(data, className = primaryClassName(data)) {
  const entry = classEntry(data, className);
  if (entry) return entry.customSubclass || entry.subclass || "";
  return className === data?.className ? data.customSubclass || data.subclass || "" : "";
}

function subclassName(data) {
  return classSubclassName(data);
}

function classSummary(data) {
  return classBreakdown(data).map(entry => `${entry.name} ${entry.level}`).join(" / ");
}

function withClassContext(character, className = primaryClassName(character), levelOverride = null) {
  const entry = classEntry(character, className) || { name: className, level: 0, subclass: "", customSubclass: "", subclassChoices: {} };
  return {
    ...character,
    className,
    level: Number(levelOverride ?? entry.level ?? 1),
    subclass: entry.subclass || (className === character.className ? character.subclass || "" : ""),
    customSubclass: entry.customSubclass || (className === character.className ? character.customSubclass || "" : ""),
    subclassChoices: { ...(character.subclassChoices || {}), ...(entry.subclassChoices || {}) }
  };
}

function characterWithClassLevelGain(character, className) {
  const updated = structuredClone(character);
  const entries = classBreakdown(updated);
  const entry = entries.find(item => item.name === className);
  if (entry) entry.level += 1;
  else entries.push({ name: className, level: 1, subclass: "", customSubclass: "", subclassChoices: {} });
  updated.classes = entries;
  updated.level = entries.reduce((total, item) => total + item.level, 0);
  updated.className ||= entries[0]?.name || className;
  return updated;
}

function setClassEntry(updated, className, patch) {
  const entries = classBreakdown(updated);
  let entry = entries.find(item => item.name === className);
  if (!entry) {
    entry = { name: className, level: 1, subclass: "", customSubclass: "", subclassChoices: {} };
    entries.push(entry);
  }
  Object.assign(entry, patch);
  updated.classes = entries;
  if (className === updated.className) {
    if ("subclass" in patch) updated.subclass = patch.subclass;
    if ("customSubclass" in patch) updated.customSubclass = patch.customSubclass;
  }
}

function equippedItems(data) {
  return (data.inventory || []).filter(item => item.equipped && item.carried !== false);
}

// Best unarmored AC, accounting for class, subclass, feat, and species rules.
function unarmoredAcOptions(data, hasShield = false) {
  const dex = modifier(data.DEX);
  const sorcererSubclass = classSubclassName(data, "Sorcerer");
  const feats = new Set(data.feats || []);
  const options = [{ value: 10 + dex, source: "Unarmored (10 + DEX)" }];
  if (hasClass(data, "Barbarian")) {
    options.push({ value: 10 + dex + modifier(data.CON), source: "Barbarian Unarmored Defense" });
  }
  if (hasClass(data, "Monk") && !hasShield) {
    options.push({ value: 10 + dex + modifier(data.WIS), source: "Monk Unarmored Defense" });
  }
  if (sorcererSubclass === "Draconic Sorcery" && classLevel(data, "Sorcerer") >= 3) {
    options.push({ value: 10 + dex + modifier(data.CHA), source: "Draconic Resilience (10 + DEX + CHA)" });
  }
  if (sorcererSubclass === "Draconic Bloodline" && classLevel(data, "Sorcerer") >= 1) {
    options.push({ value: 13 + dex, source: "Draconic Resilience (13 + DEX)" });
  }
  if (feats.has("Dragon Hide")) options.push({ value: 13 + dex, source: "Dragon Hide natural armor" });
  if (data.species === "Tortle") options.push({ value: 17, source: "Tortle natural armor" });
  if (data.species === "Lizardfolk") options.push({ value: 13 + dex, source: "Lizardfolk natural armor" });
  if (data.species === "Loxodon") options.push({ value: 12 + modifier(data.CON), source: "Loxodon natural armor" });
  if (["Autognome", "Thri-kreen"].includes(data.species)) options.push({ value: 13 + dex, source: `${data.species} natural armor` });
  return options;
}

function armorClassDetails(data) {
  if (Number(data.acOverride)) return { value: Number(data.acOverride), source: "Manual override" };
  const items = equippedItems(data);
  const hasShield = items.some(item => item.name === "Shield" || item.type === "Shield");
  const shieldBonus = hasShield ? 2 : 0;
  const defenseStyle = [data.fightingStyle, ...(data.fightingStyles || [])].includes("Defense");
  const mediumDexCap = (data.feats || []).includes("Medium Armor Master") ? 3 : 2;
  const armorOptions = items.flatMap(item => {
    const rule = ARMOR_RULES[item.name];
    if (!rule) return [];
    const dexCap = rule.type === "Medium Armor" ? mediumDexCap : rule.dex;
    const dexBonus = dexCap === Infinity ? modifier(data.DEX) : Math.min(dexCap, modifier(data.DEX));
    return [{
      value: rule.base + dexBonus + shieldBonus + (defenseStyle ? 1 : 0),
      source: `${item.name}${hasShield ? " + Shield" : ""}${defenseStyle ? " + Defense style" : ""}`
    }];
  });
  const options = armorOptions.length
    ? armorOptions
    : unarmoredAcOptions(data, hasShield).map(option => ({ ...option, value: option.value + shieldBonus }));
  let best = options.reduce((highest, option) => option.value > highest.value ? option : highest, options[0]);
  if (data.species === "Warforged") best = { value: best.value + 1, source: `${best.source} + Integrated Protection` };
  return best;
}

// Extra maximum HP granted by feats/features that scale with level.
function bonusMaxHp(data) {
  const level = characterTotalLevel(data);
  const sorcererLevel = classLevel(data, "Sorcerer");
  const sorcererSubclass = classSubclassName(data, "Sorcerer");
  const feats = data.feats || [];
  let bonus = 0;
  if (feats.includes("Tough")) bonus += level * 2;
  if (feats.includes("Dwarven Fortitude")) { /* heals on Dodge; no flat max change */ }
  if ((sorcererSubclass === "Draconic Sorcery" && sorcererLevel >= 3)
    || (sorcererSubclass === "Draconic Bloodline" && sorcererLevel >= 1)) bonus += sorcererLevel;
  if (data.species === "Dwarf" && (data.edition === "2024" || /Hill Dwarf/i.test(data.speciesVariant || ""))) bonus += level;
  return bonus;
}

function spellcastingAbility(data) {
  const subclass = subclassName(data);
  if (["Eldritch Knight", "Arcane Trickster"].includes(subclass)) return "INT";
  if (subclass === "Order of the Profane Soul") return data.hemocraftAbility || "INT";
  return SPELLCASTING_ABILITIES[data.className] || RULES.classes[data.className]?.primary || "INT";
}

function proficientSkills(data) {
  const skills = new Set([...(data.skillProficiencies || []), ...(data.backgroundSkills || []), ...(data.expertise || [])]);
  if (classSubclassName(data, "Rogue") === "Scout" && classLevel(data, "Rogue") >= 3) ["Nature", "Survival"].forEach(skill => skills.add(skill));
  if (["Bladesinging", "Bladesinger"].includes(classSubclassName(data, "Wizard")) && classLevel(data, "Wizard") >= (data.edition === "2024" ? 3 : 2)) skills.add("Performance");
  return skills;
}

function expertiseSkills(data) {
  const skills = new Set(data.expertise || []);
  if (classSubclassName(data, "Rogue") === "Scout" && classLevel(data, "Rogue") >= 3) ["Nature", "Survival"].forEach(skill => skills.add(skill));
  return skills;
}

function halfProficiencyApplies(data, ability, alreadyProficient) {
  if (alreadyProficient) return false;
  if (hasClass(data, "Bard", 2)) return true;
  return data.edition === "2014"
    && classSubclassName(data, "Fighter") === "Champion"
    && classLevel(data, "Fighter") >= 7
    && ["STR", "DEX", "CON"].includes(ability);
}

function skillModifier(data, skill) {
  const ability = SKILLS[skill];
  const prof = proficiency(characterTotalLevel(data));
  const proficient = proficientSkills(data).has(skill);
  const expertise = expertiseSkills(data).has(skill);
  return modifier(data[ability]) + (expertise ? prof * 2 : proficient ? prof : halfProficiencyApplies(data, ability, false) ? Math.floor(prof / 2) : 0);
}

function initiativeDetails(data) {
  const level = characterTotalLevel(data);
  const prof = proficiency(level);
  const feats = new Set(data.feats || []);
  const parts = ["DEX"];
  let value = modifier(data.DEX);
  let addsProficiency = false;
  if (data.edition === "2024" && feats.has("Alert")) addsProficiency = true;
  if (data.edition === "2014" && feats.has("Alert")) { value += 5; parts.push("Alert +5"); }
  if (data.species === "Harengon") addsProficiency = true;
  if (classSubclassName(data, "Fighter") === "Gunslinger" && classLevel(data, "Fighter") >= 7) addsProficiency = true;
  if (classSubclassName(data, "Paladin") === "Oath of the Watchers" && classLevel(data, "Paladin") >= 7) addsProficiency = true;
  if (addsProficiency) { value += prof; parts.push("proficiency"); }
  else if (halfProficiencyApplies(data, "DEX", false)) { value += Math.floor(prof / 2); parts.push("half proficiency"); }
  if (["War Magic", "Chronurgy Magic"].includes(classSubclassName(data, "Wizard")) && classLevel(data, "Wizard") >= 2) { value += modifier(data.INT); parts.push("INT"); }
  if (classSubclassName(data, "Ranger") === "Gloom Stalker" && classLevel(data, "Ranger") >= 3) { value += modifier(data.WIS); parts.push("WIS"); }
  if (classSubclassName(data, "Rogue") === "Swashbuckler" && classLevel(data, "Rogue") >= 3) { value += modifier(data.CHA); parts.push("CHA"); }
  const advantage = hasClass(data, "Barbarian", 7)
    || (data.edition === "2024" && classSubclassName(data, "Fighter") === "Champion" && classLevel(data, "Fighter") >= 3);
  return { value, source: parts.join(" + "), advantage };
}

function savingThrowProficiencies(data) {
  const proficiencies = new Set(RULES.classes[primaryClassName(data)]?.save || []);
  if (hasClass(data, "Monk", 14)) ABILITIES.forEach(ability => proficiencies.add(ability));
  if (hasClass(data, "Rogue", 15)) {
    proficiencies.add("WIS");
    if (data.edition === "2024") proficiencies.add("CHA");
  }
  if (classSubclassName(data, "Ranger") === "Gloom Stalker" && classLevel(data, "Ranger") >= 7) proficiencies.add("WIS");
  if (classSubclassName(data, "Fighter") === "Samurai" && classLevel(data, "Fighter") >= 7) proficiencies.add("WIS");
  const resilientAbility = data.featAbilityChoices?.Resilient;
  if (resilientAbility) proficiencies.add(resilientAbility);
  return proficiencies;
}

function savingThrowModifier(data, ability) {
  const prof = proficiency(characterTotalLevel(data));
  let value = modifier(data[ability]) + (savingThrowProficiencies(data).has(ability) ? prof : 0);
  if (hasClass(data, "Paladin", 6)) value += Math.max(1, modifier(data.CHA));
  if (hasClass(data, "Artificer", 20)) {
    value += (data.inventory || []).filter(item => item.attuned).length;
  }
  return value;
}

function derived(data) {
  const level = characterTotalLevel(data);
  const con = modifier(data.CON);
  let firstHitDie = true;
  const baseHp = Math.max(1, classBreakdown(data).reduce((total, entry) => {
    const hit = RULES.classes[entry.name]?.hit || 8;
    let classHp = 0;
    for (let index = 0; index < entry.level; index += 1) {
      classHp += firstHitDie ? hit + con : Math.ceil(hit / 2) + 1 + con;
      firstHitDie = false;
    }
    return total + classHp;
  }, 0));
  const armor = armorClassDetails(data);
  const initiative = initiativeDetails(data);
  return {
    prof: proficiency(level),
    ac: armor.value,
    acSource: armor.source,
    hp: Number(data.hpOverride) || Math.max(1, baseHp + bonusMaxHp(data)),
    initiative: initiative.value,
    initiativeSource: initiative.source,
    initiativeAdvantage: initiative.advantage,
    passive: 10 + skillModifier(data, "Perception") + (data.edition === "2014" && (data.feats || []).includes("Observant") ? 5 : 0)
  };
}

function resolvedSubclassFeatures(rulesEdition, className, subclassName) {
  if (!subclassName) return [];
  const listed = SUBCLASS_FEATURES[rulesEdition]?.[subclassName] || [];
  if (listed.length) return listed;
  return (SUBCLASS_LEVELS[rulesEdition]?.[className] || []).map(level => [level, `${subclassName}: subclass feature gained`]);
}

function validateAbilityScoresQuiet() {
  const values = abilityScoreValues();
  if (abilityMethod === "pointbuy") {
    return ABILITIES.every(ability => Number(values[ability]) >= 8 && Number(values[ability]) <= 15)
      && pointBuySpent(values) <= POINT_BUY_BUDGET;
  }
  if (abilityMethod === "standard") return standardArrayValid(values);
  return true;
}

function builderChecklistItems(data) {
  const abilityOk = validateAbilityScoresQuiet();
  const originOk = Boolean(data.species && data.background);
  const spellIssue = spellSelectionIssue(data);
  const equipmentMode = data.startingEquipmentMode || "starting";
  const equipmentOk = equipmentMode !== "starting" || selectedValues("startingEquipment", form).length > 0 || currentStep < 6;
  return [
    { label: "Home", detail: data.name ? `${data.name} is named` : "Add a character name", complete: Boolean(data.name) },
    { label: "Class", detail: `${data.className || "Class"} level ${data.level || 1}`, complete: Boolean(data.className) },
    { label: "Origin", detail: originOk ? `${data.species} / ${data.background}` : "Choose species and background", complete: originOk },
    { label: "Abilities", detail: abilityOk ? "Ability scores are valid" : "Fix ability score method limits", complete: abilityOk },
    { label: "Talents", detail: spellIssue || "Feats, ASI, and spells are within limits", complete: !spellIssue },
    { label: "Equipment", detail: equipmentMode === "manual" ? "Manual inventory selected" : equipmentMode === "keep" ? "Keeping current inventory" : "Starting kit selected", complete: equipmentOk }
  ];
}

function renderBuilderChecklist(data = formData()) {
  const items = builderChecklistItems(data);
  const markup = items.map(item => `<div class="checklist-item ${item.complete ? "complete" : "attention"}">
    <span>${item.complete ? "✓" : "!"}</span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.detail)}</small>
  </div>`).join("");
  const finish = $("#builder-checklist");
  if (finish) finish.innerHTML = `<h3>Builder readiness</h3>${markup}`;
  const preview = $("#preview-readiness");
  if (preview) preview.innerHTML = items.map(item => `<span class="${item.complete ? "complete" : "attention"}">${item.complete ? "✓" : "!"} ${escapeHtml(item.label)}</span>`).join("");
}

function updatePreview() {
  const data = formData();
  const stats = derived(data);
  $("#preview-name").textContent = data.name || "Unnamed Wanderer";
  $("#preview-summary").textContent = `Level ${data.level} ${data.species || ""} ${data.className}`;
  $("#preview-ac").textContent = stats.ac;
  $("#preview-hp").textContent = stats.hp;
  $("#preview-prof").textContent = signed(stats.prof);
  $("#preview-initial").textContent = (data.name || "?").trim().charAt(0).toUpperCase();
  const img = $("#preview-image");
  if (portraitData) { img.src = portraitData; img.classList.remove("hidden"); $("#preview-initial").classList.add("hidden"); }
  else { img.removeAttribute("src"); img.classList.add("hidden"); $("#preview-initial").classList.remove("hidden"); }
  ABILITIES.forEach(a => {
    const score = data[a] || 10;
    const mod = signed(modifier(score));
    const editor = $(`[data-mod="${a}"]`); if (editor) editor.textContent = mod;
    const bonus = $(`[data-origin-bonus="${a}"]`);
    if (bonus) {
      const originAmount = Number(data.originBonuses?.[a] || 0);
      const featAmount = Number(data.featBonuses?.[a] || 0);
      const asiAmount = Number(data.asiBonuses?.[a] || 0);
      bonus.textContent = `Bonuses ${signed(originAmount + featAmount + asiAmount)} · final ${score}`;
    }
    const preview = $(`[data-preview-mod="${a}"]`); if (preview) preview.textContent = mod;
  });
  renderBuilderChecklist(data);
}

function setStep(step) {
  currentStep = Math.max(1, Math.min(BUILDER_STEP_COUNT, step));
  $$(".form-step").forEach(x => x.classList.toggle("active", Number(x.dataset.stepPanel) === currentStep));
  $$(".step-tabs button").forEach(x => {
    const tabStep = Number(x.dataset.step);
    x.classList.toggle("active", tabStep === currentStep);
    x.classList.toggle("complete", tabStep < currentStep);
  });
  $("#character-form").dataset.currentStep = currentStep;
  $("#prev-step").style.visibility = currentStep === 1 ? "hidden" : "visible";
  $("#next-step").classList.toggle("hidden", currentStep === BUILDER_STEP_COUNT);
  $("#save-character").classList.toggle("hidden", currentStep !== BUILDER_STEP_COUNT);
  $("#step-count").textContent = `Step ${currentStep} of ${BUILDER_STEP_COUNT}`;
  if (currentStep === 5) renderTalentChoices();
  if (currentStep === 6 || currentStep === 7) renderStartingEquipmentChoices();
  if (currentStep === 7) renderBuilderChecklist(formData());
}

function navigate(view, options = {}) {
  if (!ROUTE_VIEWS.has(view)) view = "dashboard";
  $$(".view").forEach(x => x.classList.toggle("active", x.id === `${view}-view`));
  $$(".nav-item").forEach(x => x.classList.toggle("active", x.dataset.view === view));
  $("#page-title").textContent = ({ dashboard: "Hall", builder: "Create", sheet: "Character Sheet", dice: "Dice Tray", vault: "Vault", campaigns: "Campaigns" })[view];
  $(".topnav")?.classList.remove("open");
  $("#mobile-menu")?.setAttribute("aria-expanded", "false");
  if (options.updateHash !== false) syncRoute(view, Boolean(options.replace));
  if (view === "vault" || view === "dashboard") renderCards();
  if (view === "campaigns") renderCampaigns();
  if (view === "sheet") renderSheet();
  startCampaignLiveSync(view === "campaigns");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function startCampaignLiveSync(active) {
  if (campaignLiveTimer) {
    clearInterval(campaignLiveTimer);
    campaignLiveTimer = null;
  }
  if (!active || !cloudUser || !cloudClient) return;
  campaignLiveTimer = setInterval(() => {
    if (!document.hidden && $("#campaigns-view")?.classList.contains("active")) loadCampaigns();
  }, 7000);
}

function startNewCharacter() {
  activeCharacterId = null;
  edition = "2014";
  selectedClass = "Fighter";
  selectedSpellLevel = 0;
  currentOriginFeat = "";
  selectedFeatNames.clear();
  selectedFeatAbilities = {};
  selectedAsi = {};
  selectedSpellNames.clear();
  abilityMethod = "standard";
  form.reset();
  buildAbilities({ keepScores: false });
  $$("[name='abilityMethod']").forEach(input => {
    input.checked = input.value === abilityMethod;
    input.closest(".ability-method")?.classList.toggle("active", input.checked);
  });
  $$("[name='startingEquipmentMode']").forEach(input => {
    input.checked = input.value === "starting";
  });
  updateEquipmentMethodUI();
  form.elements.level.value = 1;
  if ($("#subclass-select")) $("#subclass-select").value = "";
  $("#builder-eyebrow").textContent = "CHARACTER CREATOR";
  $("#builder-title").textContent = "Build your adventurer";
  $("#builder-description").textContent = "Every choice updates your sheet as you go.";
  $$(".edition-toggle button").forEach(button => button.classList.toggle("active", button.dataset.edition === edition));
  populateRules();
  resetPortrait();
  renderStartingEquipmentChoices();
  setStep(1);
  showCreationMethod("choose");
  updatePreview();
}

function characterCard(character, withActions = false) {
  const subclass = classBreakdown(character).map(entry => classSubclassName(character, entry.name)).filter(Boolean).join(" / ") || primaryClassName(character);
  const canControl = canControlCharacter(character);
  const canDelete = isOwnCharacter(character);
  const sourceLabel = cloudUser
    ? (isOwnCharacter(character) ? "Cloud account" : "DM access")
    : "Local only";
  return `<article class="character-card" data-character-id="${character.id}">
    <div class="art">${character.portrait ? `<img src="${escapeHtml(character.portrait)}" alt="">` : escapeHtml(character.name.charAt(0).toUpperCase())}
      ${withActions ? `<div class="card-actions">${canControl ? `<button data-level-up="${character.id}" title="Level up">↑</button><button data-edit="${character.id}" title="Edit">✎</button>` : ""}${canDelete ? `<button data-delete="${character.id}" title="Delete">×</button>` : ""}</div>` : ""}
    </div>
    <div class="card-copy">
      <div class="card-meta"><span>${character.edition === "2024" ? "5.5e · 2024" : "5e · 2014"}</span><strong>Level ${characterTotalLevel(character)}</strong></div>
      <small class="source-pill">${escapeHtml(sourceLabel)}</small>
      <h3>${escapeHtml(character.name)}</h3>
      <p>${character._campaignShared ? "Campaign sheet · " : ""}${escapeHtml(character.species)} ${escapeHtml(classSummary(character))} · ${escapeHtml(subclass)}</p>
      <span class="card-open">Open character <b>→</b></span>
    </div>
  </article>`;
}

function campaignPartyCard(character, link, ownerLabel, isDm, campaignId) {
  const d = derived(character);
  const maximumHp = d.hp;
  const currentHp = Math.max(0, Math.min(maximumHp, Number(character.currentHp ?? maximumHp)));
  const temporaryHp = Math.max(0, Number(character.temporaryHp || 0));
  const resources = resourceDefinitions(character).slice(0, 3);
  const resourceLine = resources.length
    ? resources.map(resource => `${resource.name}: ${resource.max - resourceUsed(character, resource)}/${resource.max}`).join(" | ")
    : "No tracked resources";
  const rollButton = (label, modifier, mode = "normal") =>
    `<button type="button" data-campaign-roll="${escapeHtml(character.id)}" data-owner="${escapeHtml(link.owner_user_id)}" data-roll-label="${escapeHtml(label)}" data-modifier="${modifier}" data-roll-mode="${mode}">${escapeHtml(label)}</button>`;
  return `<article class="campaign-party-card">
    <div class="campaign-party-head">
      <div class="mini-portrait">${character.portrait ? `<img src="${escapeHtml(character.portrait)}" alt="">` : escapeHtml(character.name.charAt(0).toUpperCase())}</div>
      <div>
        <small>${escapeHtml(ownerLabel)}</small>
        <strong>${escapeHtml(character.name)}</strong>
        <span>${escapeHtml(classSummary(character))}</span>
      </div>
    </div>
    <div class="campaign-stat-grid">
      <span><small>AC</small><strong>${d.ac}</strong></span>
      <span><small>HP</small><strong>${currentHp}/${maximumHp}</strong>${temporaryHp ? `<em>+${temporaryHp}</em>` : ""}</span>
      <span><small>PP</small><strong>${d.passive}</strong></span>
      <span><small>Init</small><strong>${signed(d.initiative)}</strong></span>
    </div>
    <p class="campaign-resource-line">${escapeHtml(resourceLine)}</p>
    <div class="campaign-roll-row">
      ${rollButton("Initiative", d.initiative, d.initiativeAdvantage ? "advantage" : "normal")}
      ${rollButton("Perception", skillModifier(character, "Perception"))}
      ${rollButton("Stealth", skillModifier(character, "Stealth"))}
    </div>
    ${isDm ? `<div class="session-hp campaign-hp" data-session-character="${escapeHtml(character.id)}">
      <label>HP<input type="number" min="1" max="999" value="1" data-hp-amount></label>
      <button type="button" class="session-action damage" data-hp-action="damage" data-character="${escapeHtml(character.id)}">Damage</button>
      <button type="button" class="session-action heal" data-hp-action="heal" data-character="${escapeHtml(character.id)}">Heal</button>
      <button type="button" class="session-action temp" data-hp-action="temp" data-character="${escapeHtml(character.id)}">Temp</button>
    </div>
    <div class="campaign-card-actions">
      <button type="button" data-campaign-open-character="${escapeHtml(character.id)}" data-owner="${escapeHtml(link.owner_user_id)}">Open sheet</button>
      <button type="button" data-inventory-open="${escapeHtml(character.id)}">Add items</button>
      <button type="button" data-rest="short" data-character="${escapeHtml(character.id)}">Short rest</button>
      <button type="button" data-rest="long" data-character="${escapeHtml(character.id)}">Long rest</button>
    </div>` : `<div class="campaign-card-actions"><button type="button" data-campaign-open-character="${escapeHtml(character.id)}" data-owner="${escapeHtml(link.owner_user_id)}">Open sheet</button></div>`}
  </article>`;
}

function renderCampaignMapPanel(campaign, linkedCharacters, isDm) {
  const maps = mapsForCampaign(campaign.id);
  const activeMap = activeMapForCampaign(campaign.id);
  const mapTabs = maps.map(map => `<button type="button" class="${map.id === activeMap?.id ? "active" : ""}" data-campaign-map-select="${escapeHtml(map.id)}">${escapeHtml(map.name)}</button>`).join("");
  const createForm = isDm ? `<details class="map-create">
    <summary>Create or upload a map</summary>
    <form data-campaign-map-create="${escapeHtml(campaign.id)}">
      <div class="map-form-grid">
        <label>Map name<input name="name" maxlength="60" placeholder="Goblin cave ambush"></label>
        <label>Columns<input name="columns" type="number" min="4" max="80" value="24"></label>
        <label>Rows<input name="rows" type="number" min="4" max="80" value="16"></label>
        <label>Grid size<input name="gridSize" type="number" min="28" max="72" value="44"></label>
      </div>
      <label class="map-grid-toggle"><input name="gridEnabled" type="checkbox" checked><span><strong>Show tactical grid</strong><small>Turn this off for theater maps, city art, or free-position scenes.</small></span></label>
      <label>Image URL<input name="background" placeholder="Paste a map image URL, or upload below"></label>
      <label>Upload map image<input type="file" accept="image/*" data-campaign-map-upload><small class="field-hint" data-map-upload-status>No image selected</small></label>
      <button class="button primary small" type="submit">Create map</button>
    </form>
  </details>` : "";
  if (!activeMap) {
    return `<section class="campaign-panel campaign-map-panel campaign-map-room">
      <div class="campaign-map-hero">
        <div>
          <span class="eyebrow">MAP ROOM</span>
          <h3>Encounter maps</h3>
          <p>${isDm ? "Create a grid map, upload art, and place party tokens." : "The DM has not shared a battle map yet."}</p>
        </div>
        <div class="campaign-map-status">
          <strong>Draft</strong>
          <small>No active map</small>
        </div>
      </div>
      ${createForm || "<p>No active battle map yet.</p>"}
    </section>`;
  }
  const data = normalizeMapData(activeMap.data);
  const sessionState = data.session.state;
  const playerCanSeeMap = isDm || sessionState === "live";
  const allTiles = [...BUILT_IN_MAP_TILES, ...data.customTiles];
  if (!allTiles.some(tile => tile.id === selectedMapTile)) selectedMapTile = allTiles[0]?.id || "stone-floor";
  const sessionLabel = sessionState === "live" ? "Live" : sessionState === "paused" ? "Paused" : sessionState === "ended" ? "Ended" : "Draft";
  const sessionControls = isDm ? `<div class="map-session-controls">
    <span class="tag">${sessionLabel}</span>
    <button type="button" data-map-session="live" data-map-id="${escapeHtml(activeMap.id)}">${sessionState === "live" ? "Restart" : "Start"} session</button>
    <button type="button" data-map-session="paused" data-map-id="${escapeHtml(activeMap.id)}" ${sessionState === "live" ? "" : "disabled"}>Pause</button>
    <button type="button" data-map-session="ended" data-map-id="${escapeHtml(activeMap.id)}">End</button>
  </div>` : `<div class="map-session-controls player"><span class="tag">${sessionState === "live" ? "Live" : sessionState === "paused" ? "Paused" : sessionState === "ended" ? "Ended" : "Waiting for DM"}</span></div>`;
  const fogControls = isDm ? `<div class="map-fog-controls">
    <button type="button" data-map-fog="cover-all" data-map-id="${escapeHtml(activeMap.id)}">Cover all</button>
    <button type="button" data-map-fog="reveal-all" data-map-id="${escapeHtml(activeMap.id)}">Reveal all</button>
  </div>` : "";
  const toolButtons = playerCanSeeMap ? `<div class="map-editor-tools" aria-label="Map editor tools">
    <button type="button" class="${selectedMapTool === "token" ? "active" : ""}" data-map-tool="token">Move tokens</button>
    ${isDm ? `<button type="button" class="${selectedMapTool === "paint" ? "active" : ""}" data-map-tool="paint">Paint tiles</button>
    <button type="button" class="${selectedMapTool === "erase" ? "active" : ""}" data-map-tool="erase">Erase tiles</button>
    <button type="button" class="${selectedMapTool === "fog-paint" ? "active" : ""}" data-map-tool="fog-paint">Add fog</button>
    <button type="button" class="${selectedMapTool === "fog-erase" ? "active" : ""}" data-map-tool="fog-erase">Reveal fog</button>` : ""}
    <button type="button" class="${selectedMapTool === "ping" ? "active" : ""}" data-map-tool="ping">Ping</button>
    <button type="button" class="${selectedMapTool === "ruler" ? "active" : ""}" data-map-tool="ruler">Ruler</button>
  </div>` : "";
  const tilePalette = isDm ? `<div class="map-tile-palette">
    ${allTiles.map(tile => `<button type="button" class="map-tile-swatch ${selectedMapTile === tile.id ? "active" : ""}" data-map-tile="${escapeHtml(tile.id)}" title="${escapeHtml(tile.name)}">
      <span style="${mapTileStyle(activeMap, tile.id)}"></span>
      <small>${escapeHtml(tile.name)}</small>
    </button>`).join("")}
  </div>
  <details class="map-custom-tile">
    <summary>Upload custom tile stamp</summary>
    <form data-campaign-tile-create="${escapeHtml(activeMap.id)}">
      <div class="map-form-grid custom">
        <label>Tile name<input name="tileName" maxlength="40" placeholder="Torchlight, rug, bridge..."></label>
        <label>Tile image URL<input name="tileUrl" placeholder="Paste a small image URL"></label>
      </div>
      <label>Upload tile image<input type="file" accept="image/*" data-campaign-tile-upload><small class="field-hint" data-tile-upload-status>No tile selected</small></label>
      <button class="button primary small" type="submit">Add tile</button>
    </form>
  </details>` : "";
  const paintedTiles = data.tiles.map(tile => {
    const x = Math.min(data.columns - 1, Math.max(0, Number(tile.x || 0)));
    const y = Math.min(data.rows - 1, Math.max(0, Number(tile.y || 0)));
    return `<div class="map-cell-tile" style="--x:${x};--y:${y};${mapTileStyle(activeMap, tile.tileId)}"></div>`;
  }).join("");
  const tokenCards = data.tokens.filter(token => mapTokenVisibleForRole(data, token, isDm)).map(token => {
    const character = characterForMapToken(token);
    const canMove = canMoveMapToken(token, campaign.id);
    const label = character?.name || token.name || "Token";
    const portrait = character?.portrait || token.portrait || "";
    const size = mapTokenSize(token);
    const hiddenText = token.hidden ? "Hidden from players" : "Visible to players";
    return `<article class="map-token-card ${selectedMapToken === token.id ? "active" : ""}">
      <button type="button" class="map-token-pick" data-map-token-select="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}" ${canMove ? "" : "disabled"}>
        <span class="map-token-avatar" style="--token:${escapeHtml(token.color)}">${portrait ? `<img src="${escapeHtml(portrait)}" alt="">` : escapeHtml(label.charAt(0).toUpperCase())}</span>
        <strong>${escapeHtml(label)}</strong>
        <small>${isDm ? hiddenText : canMove ? data.gridEnabled ? "Click, then choose a square" : "Click, then choose a spot" : "DM controlled"}</small>
      </button>
      <div class="map-token-size-row">
        <small>Token size: ${size}x${size}</small>
        <span>
          <button type="button" data-map-token-size="-1" data-token-id="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}" ${canMove && size > 1 ? "" : "disabled"}>-</button>
          <button type="button" data-map-token-size="1" data-token-id="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}" ${canMove && size < 4 ? "" : "disabled"}>+</button>
        </span>
      </div>
      ${isDm ? `<div class="map-token-toolbar">
        <button type="button" data-map-token-toggle-hidden="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}">${token.hidden ? "Reveal" : "Hide"}</button>
        <button type="button" data-map-token-rename="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}">Rename</button>
        <button type="button" data-map-token-color="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}">Color</button>
        <button type="button" data-map-token-delete="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}">Delete</button>
      </div>` : ""}
    </article>`;
  }).join("");
  const tokenButtons = data.tokens.filter(token => mapTokenVisibleForRole(data, token, isDm)).map(token => {
    const character = characterForMapToken(token);
    const canMove = canMoveMapToken(token, campaign.id);
    const label = character?.name || token.name || "Token";
    const portrait = character?.portrait || token.portrait || "";
    const size = mapTokenSize(token);
    return `<button type="button" class="map-token ${selectedMapToken === token.id ? "selected" : ""} ${token.hidden ? "hidden-token" : ""}" data-map-token-select="${escapeHtml(token.id)}" data-map-id="${escapeHtml(activeMap.id)}" ${canMove ? "" : "disabled"} style="--x:${Number(token.x)};--y:${Number(token.y)};--size:${size};--token:${escapeHtml(token.color || tokenColor(label))}" title="${escapeHtml(`${label} (${size}x${size})`)}">${portrait ? `<img src="${escapeHtml(portrait)}" alt="">` : escapeHtml(label.charAt(0).toUpperCase())}</button>`;
  }).join("");
  const fogCells = data.fog.enabled ? data.fog.cells.map(cell => {
    const [x, y] = String(cell).split(",").map(Number);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return "";
    return `<div class="map-fog-cell" style="--x:${Math.min(data.columns - 1, Math.max(0, x))};--y:${Math.min(data.rows - 1, Math.max(0, y))};"></div>`;
  }).join("") : "";
  const pings = data.pings.filter(ping => Date.now() - Number(ping.time || 0) < 15000).map(ping =>
    `<div class="map-ping" style="--x:${Number(ping.x)};--y:${Number(ping.y)};"><span></span><small>${escapeHtml(ping.by || "Ping")}</small></div>`
  ).join("");
  const settingsForm = isDm ? `<details class="map-settings">
    <summary>Map settings</summary>
    <form data-campaign-map-settings="${escapeHtml(activeMap.id)}">
      <div class="map-form-grid">
        <label>Name<input name="name" maxlength="60" value="${escapeHtml(activeMap.name)}"></label>
        <label>Columns<input name="columns" type="number" min="4" max="80" value="${data.columns}"></label>
        <label>Rows<input name="rows" type="number" min="4" max="80" value="${data.rows}"></label>
        <label>Grid size<input name="gridSize" type="number" min="28" max="72" value="${data.gridSize}"></label>
      </div>
      <label class="map-grid-toggle"><input name="gridEnabled" type="checkbox" ${data.gridEnabled ? "checked" : ""}><span><strong>Show tactical grid</strong><small>${data.gridEnabled ? "Grid lines are visible and token movement snaps to squares." : "Grid lines are hidden and token movement uses free positioning."}</small></span></label>
      <label>Image URL<input name="background" value="${escapeHtml(data.background)}"></label>
      <label>Replace uploaded image<input type="file" accept="image/*" data-campaign-map-upload><small class="field-hint" data-map-upload-status>No new image selected</small></label>
      <div class="map-control-row">
        <button class="button primary small" type="submit">Save settings</button>
        <button class="button ghost small" type="button" data-campaign-map-delete="${escapeHtml(activeMap.id)}">Delete map</button>
      </div>
    </form>
  </details>` : "";
  return `<section class="campaign-panel campaign-map-panel campaign-map-room">
    <div class="campaign-map-hero">
      <div>
        <span class="eyebrow">MAP ROOM</span>
        <h3>${escapeHtml(activeMap.name)}</h3>
        <p>${isDm ? "Run the table from a dark tactical workspace: start the session, control fog, place tokens, ping, measure, and track play." : "The live table appears here when the DM starts the session. You can move tokens connected to your own character."}</p>
      </div>
      <div class="campaign-map-status">
        <span class="map-live-dot ${sessionState === "live" ? "live" : ""}"></span>
        <strong>${escapeHtml(sessionLabel)}</strong>
        <small>${data.columns} x ${data.rows} ${data.gridEnabled ? "grid" : "free map"} &middot; ${data.tokens.length} token${data.tokens.length === 1 ? "" : "s"}</small>
      </div>
    </div>
    <div class="map-room-command-bar">
      <div class="campaign-map-tabs">${mapTabs}</div>
      ${isDm ? `<button type="button" class="button primary small" data-campaign-map-add-tokens="${escapeHtml(activeMap.id)}">Add party tokens</button>` : ""}
    </div>
    ${sessionControls}
    ${createForm}
    ${settingsForm}
    ${fogControls}
    ${toolButtons}
    ${isDm ? tilePalette : ""}
    ${!playerCanSeeMap ? `<div class="map-waiting"><strong>${sessionState === "paused" ? "Session paused" : sessionState === "ended" ? "Session ended" : "Waiting for the DM"}</strong><p>The map is hidden until the DM starts or resumes the session.</p></div>` : `<div class="campaign-map-workspace">
      <aside class="map-token-list">${tokenCards || `<p>${isDm ? "Add party tokens to place characters on this map." : "No tokens have been placed yet."}</p>`}</aside>
      <div class="battle-map-shell">
        <div class="battle-map-board ${data.gridEnabled ? "" : "gridless"}" data-campaign-map-board="${escapeHtml(activeMap.id)}" style="--cols:${data.columns};--rows:${data.rows};--cell:${data.gridSize}px;">
          ${data.background ? `<img class="battle-map-bg" src="${escapeHtml(data.background)}" alt="">` : `<div class="battle-map-empty">No map art uploaded</div>`}
          <div class="battle-map-tiles">${paintedTiles}</div>
          ${data.gridEnabled ? `<div class="battle-map-grid" aria-hidden="true"></div>` : ""}
          <div class="battle-map-fog ${isDm ? "dm-fog" : ""}" aria-hidden="true">${fogCells}</div>
          ${tokenButtons}
          <div class="battle-map-pings" aria-hidden="true">${pings}</div>
        </div>
      </div>
    </div>`}
  </section>`;
}

function renderCampaignWorkbench(campaign, isDm, visibleLinks, allLinks, maps) {
  const sharedCount = visibleLinks.length;
  const totalShared = allLinks.length;
  const mapCount = maps.length;
  if (isDm) {
    return `<section class="campaign-workbench dm campaign-command-grid">
      <article>
        <small>DM Control</small>
        <strong>${totalShared} shared sheet${totalShared === 1 ? "" : "s"}</strong>
        <p>Open sheets, roll checks, edit HP, rest resources, and manage inventory from this campaign.</p>
        <button type="button" class="button ghost small" data-go="vault">Open DM vault</button>
      </article>
      <article>
        <small>Invite</small>
        <strong>${escapeHtml(campaign.invite_code)}</strong>
        <p>Give this code to players so they can join, then have them share their character sheet.</p>
        <button type="button" class="button ghost small" data-copy-invite="${escapeHtml(campaign.invite_code)}">Copy invite</button>
      </article>
      <article>
        <small>Live Table</small>
        <strong>${mapCount} map${mapCount === 1 ? "" : "s"}</strong>
        <p>Create a battle map, add party tokens, paint tiles, and run movement from one screen.</p>
        <button type="button" class="button ghost small" data-campaign-focus="maps">Open maps</button>
      </article>
    </section>`;
  }
  return `<section class="campaign-workbench player campaign-command-grid">
    <article>
      <small>Your Access</small>
      <strong>${sharedCount} shared sheet${sharedCount === 1 ? "" : "s"}</strong>
      <p>You can open and manage your own shared character sheet. Other players' sheets stay private.</p>
      <button type="button" class="button ghost small" data-campaign-focus="share">Share a sheet</button>
    </article>
    <article>
      <small>Battle Map</small>
      <strong>${mapCount ? "Map ready" : "No map yet"}</strong>
      <p>When the DM starts a map, select your token and click a square to move.</p>
      <button type="button" class="button ghost small" data-campaign-focus="maps">Open map area</button>
    </article>
    <article>
      <small>Privacy</small>
      <strong>Player-safe view</strong>
      <p>Players only see their own shared sheet. The DM can see campaign sheets for table management.</p>
    </article>
  </section>`;
}

function renderCampaignGameLog(campaignId, isDm = false) {
  const rows = campaignLogRows(campaignId, isDm);
  return `<section class="campaign-panel campaign-log-panel">
    <div class="campaign-panel-head">
      <div><h3>Game log</h3><p>Shared rolls from campaign sheets and map tools appear here for the table.</p></div>
      <button type="button" class="button ghost small" data-campaign-log-refresh="${escapeHtml(campaignId)}">Refresh</button>
    </div>
    <ol class="campaign-game-log">
      ${rows.length ? rows.map(entry => {
        const rolls = Array.isArray(entry.rolls) ? entry.rolls : [];
        const rollText = rolls.length ? rolls.join(", ") : entry.raw_total || entry.total || "";
        const when = entry.created_at ? new Date(entry.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }) : "";
        return `<li>
          <div><strong>${escapeHtml(entry.label || "Roll")}</strong><small>${escapeHtml(entry.actor_name || "Player")} · ${escapeHtml(entry.source || "sheet")} · ${escapeHtml(when)}</small></div>
          <span><small>${escapeHtml(String(rollText))}${Number(entry.modifier || 0) ? ` ${escapeHtml(signed(entry.modifier))}` : ""}</small><b>${Number(entry.total || 0)}</b></span>
        </li>`;
      }).join("") : `<li class="empty-log"><div><strong>No shared rolls yet</strong><small>Roll from a campaign sheet to start the log.</small></div></li>`}
    </ol>
  </section>`;
}

function renderCards(filter = "") {
  const query = filter.toLowerCase();
  const ownMatches = ownCharacters().filter(c => c.name.toLowerCase().includes(query));
  const dmMatches = dmCampaignCharacters().filter(c => c.name.toLowerCase().includes(query));
  const recentMatches = [...ownMatches, ...dmMatches];
  const dmCampaignCount = campaigns.filter(campaign => campaignRole(campaign.id) === "dm" || campaign.owner_id === cloudUser?.id).length;
  const playerCampaignCount = campaigns.filter(campaign => campaignRole(campaign.id) === "player").length;
  const summary = $("#vault-role-summary");
  if (summary) {
    summary.innerHTML = `<article>
      <span>Your characters</span><strong>${ownMatches.length}</strong><small>Private sheets you own and control.</small>
    </article>
    <article>
      <span>DM campaign sheets</span><strong>${dmMatches.length}</strong><small>Player sheets visible because you DM the campaign.</small>
    </article>
    <article>
      <span>Campaign roles</span><strong>${dmCampaignCount} DM / ${playerCampaignCount} Player</strong><small>Player views only reveal your own shared sheet.</small>
    </article>`;
  }
  $("#recent-characters").innerHTML = recentMatches.slice(0, 2).map(c => characterCard(c)).join("") +
    `<button class="character-card new-card" data-go="builder"><div><span>+</span><h3>Forge a new hero</h3><p>Begin a fresh adventure</p></div></button>`;
  $("#vault-characters").innerHTML = ownMatches.length ? ownMatches.map(c => characterCard(c, true)).join("") :
    `<div class="empty-state"><span>*</span><h2>Your vault is waiting</h2><p>Create your first character to see them here.</p></div>`;
  const dmSection = $("#dm-campaign-vault-section");
  const dmGrid = $("#vault-dm-characters");
  if (dmSection && dmGrid) {
    dmSection.classList.toggle("hidden", !cloudUser && !dmMatches.length);
    dmGrid.innerHTML = dmMatches.length ? dmMatches.map(c => characterCard(c, true)).join("") :
      `<div class="empty-state"><span>DM</span><h2>No DM campaign sheets</h2><p>When players share sheets in a campaign you DM, they will appear here for quick access.</p></div>`;
  }
}

function renderCampaigns() {
  const warning = $("#campaign-cloud-warning");
  if (!$("#campaign-list") || !$("#campaign-detail")) return;
  const signedIn = Boolean(cloudUser && cloudClient);
  warning?.classList.toggle("hidden", signedIn);
  $("#create-campaign-form")?.classList.toggle("hidden", !signedIn);
  $("#join-campaign-form")?.classList.toggle("hidden", !signedIn);
  if (!signedIn) {
    $("#campaign-list").innerHTML = `<p>Sign in to see campaigns.</p>`;
    $("#campaign-detail").innerHTML = `<div class="empty-state"><span>⚑</span><h2>No account connected</h2><p>Campaigns need cloud sync so DMs and players can share sheets.</p></div>`;
    return;
  }
  $("#campaign-list").innerHTML = campaigns.length ? campaigns.map(campaign => {
    const role = campaignRole(campaign.id) || (campaign.owner_id === cloudUser.id ? "dm" : "player");
    const count = campaignCharacters.filter(link => link.campaign_id === campaign.id && (role === "dm" || link.owner_user_id === cloudUser.id)).length;
    const mapCount = campaignMaps.filter(map => map.campaign_id === campaign.id).length;
    return `<button type="button" class="campaign-card ${campaign.id === activeCampaignId ? "active" : ""}" data-campaign-select="${campaign.id}">
      <small>${role === "dm" ? "Dungeon Master" : "Player"}</small>
      <strong>${escapeHtml(campaign.name)}</strong>
      <span>${count} shared character${count === 1 ? "" : "s"} · ${mapCount} map${mapCount === 1 ? "" : "s"}</span>
    </button>`;
  }).join("") : `<p>No campaigns yet. Create one as DM or join with an invite code.</p>`;
  const campaign = campaigns.find(item => item.id === activeCampaignId);
  if (!campaign) {
    $("#campaign-detail").innerHTML = `<div class="empty-state"><span>⚑</span><h2>No campaign selected</h2><p>Create or join a campaign to begin.</p></div>`;
    return;
  }
  const role = campaignRole(campaign.id) || (campaign.owner_id === cloudUser.id ? "dm" : "player");
  const isDm = role === "dm";
  const isOwner = campaign.owner_id === cloudUser.id;
  const members = campaignMemberships.filter(member => member.campaign_id === campaign.id);
  const allLinks = campaignCharacters.filter(link => link.campaign_id === campaign.id);
  const links = allLinks.filter(link => isDm || link.owner_user_id === cloudUser.id);
  const campaignMapsForView = mapsForCampaign(campaign.id);
  const shareOptions = ownCharacters()
    .filter(character => !allLinks.some(link => link.owner_user_id === cloudUser.id && link.character_id === character.id))
    .map(character => `<option value="${escapeHtml(character.id)}">${escapeHtml(character.name)} · ${escapeHtml(classSummary(character))}</option>`)
    .join("");
  const linkedCharacters = links.map(link => {
    const character = characters.find(item => item.id === link.character_id && characterOwnerId(item) === link.owner_user_id);
    const owner = members.find(member => member.user_id === link.owner_user_id);
    const ownerLabel = owner?.display_name || (link.owner_user_id === cloudUser.id ? "You" : "Player");
    return { link, character, ownerLabel };
  });
  const partyCards = linkedCharacters.map(({ link, character, ownerLabel }) =>
    character
      ? campaignPartyCard(character, link, ownerLabel, isDm, campaign.id)
      : `<article class="campaign-party-card pending"><strong>${escapeHtml(link.nickname || "Shared character")}</strong><p>${escapeHtml(ownerLabel)} · sync pending</p></article>`
  ).join("");
  const mapPanel = renderCampaignMapPanel(campaign, linkedCharacters, isDm);
  const workbench = renderCampaignWorkbench(campaign, isDm, links, allLinks, campaignMapsForView);
  const gameLogPanel = renderCampaignGameLog(campaign.id, isDm);
  const liveMap = campaignMapsForView.map(map => ({ map, data: normalizeMapData(map.data) })).find(entry => entry.data.session.state === "live");
  const campaignStatus = liveMap ? `Live map: ${liveMap.map.name}` : campaignMapsForView.length ? `${campaignMapsForView.length} map${campaignMapsForView.length === 1 ? "" : "s"} ready` : "No map yet";
  const sharedSummary = `${allLinks.length} shared sheet${allLinks.length === 1 ? "" : "s"}`;
  const characterRows = linkedCharacters.map(({ link, character, ownerLabel }) => {
    const canOpen = Boolean(character);
    const canRemove = isDm || link.owner_user_id === cloudUser.id;
    return `<div class="campaign-character-row">
      <div><strong>${escapeHtml(character?.name || link.nickname || "Shared character")}</strong><br><small>${escapeHtml(ownerLabel)}${character ? ` · ${escapeHtml(classSummary(character))}` : " · sync pending"}</small></div>
      <div class="item-actions">
        ${canOpen ? `<button type="button" data-campaign-open-character="${escapeHtml(character.id)}" data-owner="${escapeHtml(link.owner_user_id)}">Open</button>` : ""}
        ${canRemove ? `<button type="button" data-campaign-remove-character="${escapeHtml(link.character_id)}" data-owner="${escapeHtml(link.owner_user_id)}" data-campaign="${escapeHtml(campaign.id)}">Remove</button>` : ""}
      </div>
    </div>`;
  }).join("");
  $("#campaign-detail").innerHTML = `
    <div class="campaign-detail-head campaign-hero-panel ${isDm ? "dm" : "player"}">
      <div>
        <span class="eyebrow">${isDm ? "DM VIEW" : "PLAYER VIEW"}</span>
        <h2>${escapeHtml(campaign.name)}</h2>
        <p>${escapeHtml(campaign.description || "No campaign notes yet.")}</p>
        <div class="campaign-hero-meta">
          <span>${escapeHtml(sharedSummary)}</span>
          <span>${members.length} member${members.length === 1 ? "" : "s"}</span>
          <span>${escapeHtml(campaignStatus)}</span>
        </div>
      </div>
      <div class="campaign-dm-actions">
        <div class="invite-code"><span>${escapeHtml(campaign.invite_code)}</span><button type="button" class="button ghost small" data-copy-invite="${escapeHtml(campaign.invite_code)}">${isDm ? "Copy invite" : "Copy code"}</button></div>
        ${isDm ? `<button type="button" class="button primary small" data-campaign-roll-party="${escapeHtml(campaign.id)}">Roll party initiative</button>${isOwner ? `<button type="button" class="button ghost small danger-button" data-campaign-delete="${escapeHtml(campaign.id)}">Delete campaign</button>` : ""}` : `<button type="button" class="button primary small" data-campaign-focus="share">Share a character</button>`}
      </div>
    </div>
    ${workbench}
    <section class="campaign-panel campaign-party-panel">
      <div class="campaign-panel-head">
        <div><span class="eyebrow">PARTY ROSTER</span><h3>${isDm ? "DM table" : "Your campaign sheets"}</h3><p>${isDm ? "Open sheets, roll checks, adjust HP, rest, and manage equipment from one screen." : "Open the sheets you have shared with this campaign."}</p></div>
      </div>
      <div class="campaign-party-grid">${partyCards || "<p>No shared character sheets yet.</p>"}</div>
    </section>
    ${mapPanel}
    ${gameLogPanel}
    <div class="campaign-grid">
      <section class="campaign-panel">
        <h3>Members</h3>
        ${members.map(member => `<div class="campaign-member"><div><strong>${escapeHtml(member.display_name || "Adventurer")}</strong><br><small>${member.user_id === cloudUser.id ? "You" : member.user_id}</small></div><span class="tag">${member.role === "dm" ? "DM" : "Player"}</span></div>`).join("") || "<p>No members yet.</p>"}
      </section>
      <section class="campaign-panel">
        <h3>Shared characters</h3>
        <p class="campaign-privacy-note">${isDm ? "DM view: all shared sheets in this campaign are visible here." : "Player view: only your own shared sheet appears here."}</p>
        ${characterRows || "<p>No character sheets have been shared yet.</p>"}
        <form class="campaign-share-form" data-campaign-share="${escapeHtml(campaign.id)}">
          <select name="characterId" ${shareOptions ? "" : "disabled"}>${shareOptions || `<option>No unshared characters</option>`}</select>
          <button class="button primary small" type="submit" ${shareOptions ? "" : "disabled"}>Share sheet</button>
        </form>
      </section>
    </div>`;
}

function valueByLevel(level, rows) {
  let value = 0;
  rows.forEach(([unlock, amount]) => { if (level >= unlock) value = amount; });
  return value;
}

function singleClassSpellSlotResources(character) {
  const level = Number(character.level);
  const className = character.className;
  const subclass = character.customSubclass || character.subclass || "";
  if (subclass === "Order of the Profane Soul" && level >= 3) {
    const slots = level >= 6 ? 2 : 1;
    const slotLevel = Math.min(4, Math.floor((level + 5) / 6));
    return [{ id: "profane-soul-slots", name: `Pact Magic · level ${slotLevel}`, max: slots, recovery: "short", shortRecovery: "all", group: "spell" }];
  }
  if (className === "Warlock") {
    const slots = level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1;
    const slotLevel = level >= 9 ? 5 : Math.ceil(level / 2);
    return [{ id: "pact-slots", name: `Pact Magic · level ${slotLevel}`, max: slots, recovery: "short", shortRecovery: "all", group: "spell" }];
  }
  let table = null;
  if (["Bard", "Cleric", "Druid", "Sorcerer", "Wizard"].includes(className)) table = FULL_CASTER_SLOTS;
  if (["Paladin", "Ranger"].includes(className)) table = character.edition === "2024" ? HALF_CASTER_SLOTS_2024 : HALF_CASTER_SLOTS_2014;
  if (className === "Artificer") table = HALF_CASTER_SLOTS_2024;
  if (["Eldritch Knight", "Arcane Trickster"].includes(subclass)) table = THIRD_CASTER_SLOTS;
  return (table?.[level - 1] || []).map((max, index) => ({
    id: `spell-slot-${index + 1}`,
    name: `Level ${index + 1} spell slots`,
    max,
    recovery: "long",
    group: "spell"
  }));
}

function multiclassSpellcastingLevel(character) {
  return classBreakdown(character).reduce((total, entry) => {
    const subclass = classSubclassName(character, entry.name);
    if (["Bard", "Cleric", "Druid", "Sorcerer", "Wizard"].includes(entry.name)) return total + entry.level;
    if (entry.name === "Artificer") return total + Math.ceil(entry.level / 2);
    if (["Paladin", "Ranger"].includes(entry.name)) return total + Math.floor(entry.level / 2);
    if (["Eldritch Knight", "Arcane Trickster"].includes(subclass)) return total + Math.floor(entry.level / 3);
    return total;
  }, 0);
}

function resourcePrefix(className) {
  return className.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function spellSlotResources(character) {
  const entries = classBreakdown(character);
  if (entries.length <= 1) return singleClassSpellSlotResources(withClassContext(character, entries[0]?.name || primaryClassName(character), entries[0]?.level || character.level));
  const resources = [];
  entries.forEach(entry => {
    const context = withClassContext(character, entry.name, entry.level);
    if (entry.name === "Warlock" || classSubclassName(character, entry.name) === "Order of the Profane Soul") {
      singleClassSpellSlotResources(context).forEach(resource => resources.push({
        ...resource,
        id: `${resourcePrefix(entry.name)}-${resource.id}`,
        name: `${entry.name} · ${resource.name}`
      }));
    }
  });
  const casterLevel = multiclassSpellcastingLevel(character);
  if (casterLevel > 0) {
    (FULL_CASTER_SLOTS[Math.max(1, Math.min(20, casterLevel)) - 1] || []).forEach((max, index) => {
      resources.push({
        id: `multiclass-spell-slot-${index + 1}`,
        name: `Multiclass · level ${index + 1} spell slots`,
        max,
        recovery: "long",
        group: "spell"
      });
    });
  }
  return resources;
}

function singleClassResourceDefinitions(character) {
  const level = Number(character.level);
  const revised = character.edition === "2024";
  const abilityUses = ability => Math.max(1, modifier(character[ability]));
  const resources = [];
  const add = (id, name, max, recovery = "long", extra = {}) => {
    if (max > 0) resources.push({ id, name, max, recovery, ...extra });
  };
  add("hit-dice", `Hit Dice · d${RULES.classes[character.className]?.hit || 8}`, level, "long", {
    longRecovery: revised ? "all" : Math.max(1, Math.floor(level / 2)),
    type: level > 12 ? "pool" : "pips"
  });

  if (character.className === "Barbarian") {
    const rage = valueByLevel(level, [[1,2],[3,3],[6,4],[12,5],[17,6]]);
    if (level < 20 || revised) add("rage", "Rage", rage, "long", revised ? { shortRecovery: 1 } : {});
  }
  if (character.className === "Bard") {
    add("bardic-inspiration", "Bardic Inspiration", abilityUses("CHA"), level >= 5 ? "short" : "long", level >= 5 ? { shortRecovery: "all" } : {});
  }
  if (character.className === "Cleric" && level >= 2) {
    const uses = revised ? valueByLevel(level, [[2,2],[6,3],[18,4]]) : valueByLevel(level, [[2,1],[6,2],[18,3]]);
    add("channel-divinity", "Channel Divinity", uses, "short", revised ? { shortRecovery: 1 } : { shortRecovery: "all" });
    if (level >= 10) add("divine-intervention", "Divine Intervention", 1);
  }
  if (character.className === "Druid" && level >= 2 && (revised || level < 20)) {
    const uses = revised ? valueByLevel(level, [[2,2],[6,3],[17,4]]) : 2;
    add("wild-shape", "Wild Shape", uses, "short", revised ? { shortRecovery: 1 } : { shortRecovery: "all" });
    if (revised && level >= 5) add("wild-resurgence", "Wild Resurgence · slot recovery", 1);
  }
  if (character.className === "Fighter") {
    const secondWind = revised ? valueByLevel(level, [[1,2],[4,3],[10,4]]) : 1;
    add("second-wind", "Second Wind", secondWind, "short", revised ? { shortRecovery: 1 } : { shortRecovery: "all" });
    if (level >= 2) add("action-surge", "Action Surge", level >= 17 ? 2 : 1, "short", { shortRecovery: "all" });
    if (level >= 9) add("indomitable", "Indomitable", valueByLevel(level, [[9,1],[13,2],[17,3]]));
  }
  if (character.className === "Monk" && level >= 2) {
    add(revised ? "focus-points" : "ki-points", revised ? "Focus Points" : "Ki Points", level, "short", { shortRecovery: "all", type: level > 12 ? "pool" : "pips" });
    if (revised) add("uncanny-metabolism", "Uncanny Metabolism", 1);
  }
  if (character.className === "Paladin") {
    add("lay-on-hands", "Lay on Hands pool", 5 * level, "long", { type: "pool" });
    if (!revised) add("divine-sense", "Divine Sense", 1 + Math.max(0, modifier(character.CHA)));
    if (revised && level >= 3) add("channel-divinity", "Channel Divinity", level >= 11 ? 3 : 2, "short", { shortRecovery: 1 });
    if (revised && level >= 2) add("paladins-smite", "Paladin's Smite · free casting", 1);
    if (revised && level >= 5) add("faithful-steed", "Faithful Steed · free casting", 1);
    if (!revised && level >= 14) add("cleansing-touch", "Cleansing Touch", abilityUses("CHA"));
  }
  if (character.className === "Ranger" && revised) {
    add("favored-enemy", "Favored Enemy · free Hunter's Mark", valueByLevel(level, [[1,2],[5,3],[9,4],[13,5],[17,6]]));
    if (level >= 14) add("natures-veil", "Nature's Veil", abilityUses("WIS"));
    if (level >= 10) add("tireless", "Tireless · temporary HP", abilityUses("WIS"));
  }
  if (character.className === "Rogue" && level >= 20) add("stroke-of-luck", "Stroke of Luck", 1, "short", { shortRecovery: "all" });
  if (character.className === "Sorcerer") {
    if (level >= 2) add("sorcery-points", "Sorcery Points", level, "long", { type: level > 12 ? "pool" : "pips" });
    if (revised) add("innate-sorcery", "Innate Sorcery", 2);
    if (revised && level >= 5) add("sorcerous-restoration", "Sorcerous Restoration", 1);
  }
  if (character.className === "Warlock") {
    if (revised && level >= 2) add("magical-cunning", "Magical Cunning", 1);
    if (revised && level >= 9) add("contact-patron", "Contact Patron", 1);
    [11,13,15,17].forEach((unlock, index) => {
      if (level >= unlock) add(`mystic-arcanum-${index + 6}`, `Mystic Arcanum · level ${index + 6}`, 1);
    });
  }
  if (character.className === "Wizard") add("arcane-recovery", "Arcane Recovery", 1);
  if (character.className === "Artificer" && level >= 7) add("flash-of-genius", "Flash of Genius", abilityUses("INT"));
  if (character.className === "Blood Hunter") add("blood-maledict", "Blood Maledict", valueByLevel(level, [[1,1],[6,2],[13,3],[17,4]]), "short", { shortRecovery: "all" });

  const subclass = character.customSubclass || character.subclass || "";
  if (subclass === "Battle Master" && level >= 3) add("superiority-dice", "Superiority Dice", valueByLevel(level, [[3,4],[7,5],[15,6]]), "short", { shortRecovery: "all" });
  if (subclass === "Arcane Archer" && level >= 3) add("arcane-shot", "Arcane Shot", 2, "short", { shortRecovery: "all" });
  if (subclass === "Samurai" && level >= 3) add("fighting-spirit", "Fighting Spirit", 3);
  if (subclass === "Psi Warrior" && level >= 3) add("psionic-energy-dice", "Psionic Energy Dice", 2 * proficiency(level));
  if (subclass === "Soulknife" && level >= 3) add("psionic-energy-dice", "Psionic Energy Dice", 2 * proficiency(level));
  if (subclass === "Rune Knight" && level >= 3) add("giants-might", "Giant's Might", proficiency(level));
  if (subclass === "Echo Knight" && level >= 3) add("unleash-incarnation", "Unleash Incarnation", Math.max(1, modifier(character.CON)));
  if (["Bladesinging", "Bladesinger"].includes(subclass) && level >= (revised ? 3 : 2)) add("bladesong", "Bladesong", proficiency(level));
  if (subclass === "School of Divination" && level >= 2) add("portent", "Portent dice", level >= 14 ? 3 : 2);
  if (subclass === "Chronurgy Magic" && level >= 2) add("chronal-shift", "Chronal Shift", 2);
  if (subclass === "Wild Magic" && level >= 1) add("tides-of-chaos", "Tides of Chaos", 1);
  if (subclass === "Clockwork Soul" && level >= 1) add("restore-balance", "Restore Balance", proficiency(level));
  if (subclass === "The Undead" && level >= 1) add("form-of-dread", "Form of Dread", proficiency(level));
  if (subclass === "Celestial Patron" && level >= 3) add("healing-light", "Healing Light dice", 1 + level, "long", { type: "pool" });
  if (subclass === "The Celestial" && level >= 1) add("healing-light", "Healing Light dice", 1 + level, "long", { type: "pool" });
  if (subclass === "Drakewarden" && level >= 3) add("drake-companion", "Summon Drake · free use", 1);
  if ((subclass === "The Fiend" || subclass === "Fiend Patron") && level >= 6) add("dark-ones-own-luck", "Dark One's Own Luck", revised ? abilityUses("CHA") : 1, revised ? "long" : "short", revised ? {} : { shortRecovery: "all" });
  if (subclass === "Circle of the Land" && level >= (revised ? 6 : 2)) add("natural-recovery", "Natural Recovery", 1);
  if ((subclass === "Way of the Open Hand" || subclass === "Warrior of the Open Hand") && level >= 6) add("wholeness-of-body", "Wholeness of Body", revised ? abilityUses("WIS") : 1);
  if ((subclass === "School of Evocation" || subclass === "Evoker") && level >= 14) add("overchannel", "Overchannel · safe use", 1);
  return resources;
}

function resourceDefinitions(character) {
  const entries = classBreakdown(character);
  if (entries.length > 1) {
    const classResources = entries.flatMap(entry => singleClassResourceDefinitions(withClassContext(character, entry.name, entry.level)).map(resource => ({
      ...resource,
      id: `${resourcePrefix(entry.name)}-${resource.id}`,
      name: `${entry.name} · ${resource.name}`
    })));
    const merged = [...classResources, ...spellSlotResources(character)];
    return [...new Map(merged.map(resource => [resource.id, resource])).values()];
  }
  const merged = [...singleClassResourceDefinitions(character), ...spellSlotResources(character)];
  return [...new Map(merged.map(resource => [resource.id, resource])).values()];
}

function resourceUsed(character, resource) {
  return Math.min(resource.max, Math.max(0, Number(character.resourceUsage?.[resource.id] || 0)));
}

function renderResourceCard(character, resource) {
  const used = resourceUsed(character, resource);
  const remaining = resource.max - used;
  const recoveryLabel = resource.recovery === "short" ? "Short or Long Rest" : "Long Rest";
  const type = resource.type || (resource.max > 12 ? "pool" : "pips");
  const controls = type === "pool"
    ? `<div class="resource-pool">
        <button type="button" data-resource-remaining="-1" data-character="${character.id}" data-resource="${resource.id}" aria-label="Spend ${escapeHtml(resource.name)}">−</button>
        <div><div class="resource-bar"><span style="width:${resource.max ? remaining / resource.max * 100 : 0}%"></span></div><small>${remaining} / ${resource.max} remaining</small></div>
        <button type="button" data-resource-remaining="1" data-character="${character.id}" data-resource="${resource.id}" aria-label="Restore ${escapeHtml(resource.name)}">+</button>
      </div>`
    : `<div class="resource-pips">${Array.from({ length: resource.max }, (_, index) =>
        `<button type="button" class="resource-pip ${index < used ? "expended" : ""}" data-resource-pip="${index}" data-character="${character.id}" data-resource="${resource.id}" aria-label="${index < used ? "Restore" : "Expend"} ${escapeHtml(resource.name)} use ${index + 1}"></button>`
      ).join("")}</div>`;
  return `<article class="resource-card">
    <div class="resource-head"><strong>${escapeHtml(resource.name)}</strong><small>${remaining}/${resource.max}</small></div>
    ${controls}
    <button type="button" class="resource-reset" data-resource-reset="${resource.id}" data-character="${character.id}">Reset · ${recoveryLabel}</button>
  </article>`;
}

function characterCurrency(character) {
  return { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0, ...(character.currency || {}) };
}

function inventoryWeight(character) {
  return (character.inventory || []).reduce((total, item) =>
    total + (item.carried === false ? 0 : Number(item.weight || 0) * Number(item.quantity || 1)), 0
  );
}

function renderInventorySection(character, extraClass = "") {
  const inventory = character.inventory || [];
  const currency = characterCurrency(character);
  const weight = inventoryWeight(character);
  const capacity = Math.max(0, Number(character.STR || 10) * 15);
  const attuned = inventory.filter(item => item.attuned).length;
  return `<section class="sheet-panel sheet-wide ${extraClass}">
    <div class="resource-toolbar">
      <h2>Equipment & inventory</h2>
      <button type="button" class="button ghost small" data-inventory-open="${character.id}">Add or manage items</button>
    </div>
    <div class="currency-row">${["cp","sp","ep","gp","pp"].map(coin =>
      `<span class="coin"><strong>${Number(currency[coin] || 0)}</strong>${coin.toUpperCase()}</span>`
    ).join("")}</div>
    <div class="inventory-summary">
      <span><strong>Carried:</strong> ${Number(weight.toFixed(2))} lb.</span>
      <span><strong>Capacity:</strong> ${capacity} lb.</span>
      <span><strong>Attuned:</strong> ${attuned}/3</span>
      <span><strong>Items:</strong> ${inventory.reduce((sum, item) => sum + Number(item.quantity || 1), 0)}</span>
    </div>
    ${inventory.length ? `<div class="inventory-scroll"><table class="inventory-table">
      <thead><tr><th>Status</th><th>Item</th><th>Qty.</th><th>Weight</th><th>Cost</th><th></th></tr></thead>
      <tbody>${inventory.map(item => `<tr>
        <td><div class="item-state">
          <button type="button" class="${item.carried === false ? "" : "active"}" data-item-action="carry" data-character="${character.id}" data-item-id="${item.id}" title="Carried">C</button>
          <button type="button" class="${item.equipped ? "active" : ""}" data-item-action="equip" data-character="${character.id}" data-item-id="${item.id}" title="Equipped">E</button>
          <button type="button" class="${item.attuned ? "active" : ""}" data-item-action="attune" data-character="${character.id}" data-item-id="${item.id}" title="Attuned">A</button>
        </div></td>
        <td class="item-name"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.type || "Item")}${item.notes ? ` · ${escapeHtml(item.notes)}` : ""}</small></td>
        <td>${Number(item.quantity || 1)}</td>
        <td>${Number((Number(item.weight || 0) * Number(item.quantity || 1)).toFixed(2))} lb.</td>
        <td>${escapeHtml(item.cost || "—")}</td>
        <td><div class="item-actions">
          <button type="button" data-item-action="decrease" data-character="${character.id}" data-item-id="${item.id}" aria-label="Decrease ${escapeHtml(item.name)}">−</button>
          <button type="button" data-item-action="increase" data-character="${character.id}" data-item-id="${item.id}" aria-label="Increase ${escapeHtml(item.name)}">+</button>
          <button type="button" data-item-action="delete" data-character="${character.id}" data-item-id="${item.id}" aria-label="Delete ${escapeHtml(item.name)}">×</button>
        </div></td>
      </tr>`).join("")}</tbody>
    </table></div>` : `<p>No equipment recorded. Add SRD equipment or a custom item.</p>`}
  </section>`;
}

function renderItemTemplates(query = "") {
  const normalized = query.trim().toLowerCase();
  const matches = EQUIPMENT_CATALOG
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => !normalized || `${item.name} ${item.type} ${item.details}`.toLowerCase().includes(normalized));
  $("#item-template").innerHTML = matches.map(({ item, index }) =>
    `<option value="${index}">${escapeHtml(item.name)} · ${escapeHtml(item.type)} · ${escapeHtml(item.cost)}</option>`
  ).join("");
  if (matches.length) {
    $("#item-template").value = String(matches[0].index);
    applyItemTemplate(matches[0].index);
  }
}

function applyItemTemplate(index) {
  const item = EQUIPMENT_CATALOG[Number(index)];
  if (!item) return;
  $("#item-name").value = item.name;
  $("#item-type").value = item.type;
  $("#item-quantity").value = 1;
  $("#item-weight").value = item.weight;
  $("#item-cost").value = item.cost;
  $("#item-notes").value = item.details;
}

function openInventory(characterId) {
  const character = characters.find(item => item.id === characterId);
  if (!character) return;
  if (!canControlCharacter(character)) { toast("Only the owner or campaign DM can manage this inventory"); return; }
  inventoryCharacterId = characterId;
  const currency = characterCurrency(character);
  Object.entries(currency).forEach(([coin, value]) => { $(`#currency-${coin}`).value = value; });
  $("#item-search").value = "";
  $("#inventory-form").reset();
  $("#item-carried").checked = true;
  renderItemTemplates();
  $("#inventory-modal").classList.remove("hidden");
}

function closeInventory() {
  inventoryCharacterId = null;
  $("#inventory-modal").classList.add("hidden");
}

function saveInventoryCharacter(character) {
  character.updatedAt = Date.now();
  persistCharacters();
  renderSheet();
  renderCampaigns();
}

function saveSessionCharacter(character) {
  character.updatedAt = Date.now();
  persistCharacters();
  renderSheet();
  renderCampaigns();
}

function renderDeathSaves(character) {
  const saves = { successes: 0, failures: 0, ...(character.deathSaves || {}) };
  const group = (type, count) => `<div class="death-save-group"><span>${type === "successes" ? "Successes" : "Failures"}</span><div>${Array.from({ length: 3 }, (_, index) =>
    `<button type="button" class="${index < count ? "active" : ""} ${type === "failures" ? "failure" : ""}" data-death-save="${type}" data-death-index="${index}" data-character="${character.id}" aria-label="${type} ${index + 1}"></button>`
  ).join("")}</div></div>`;
  return `<div class="death-saves"><strong>Death saves</strong>${group("successes", saves.successes)}${group("failures", saves.failures)}</div>`;
}

function renderConditionPicker(character) {
  const active = new Set(character.conditions || []);
  return `<details class="condition-picker">
    <summary>Conditions <span>${active.size || "None"}</span></summary>
    <div class="condition-menu">${CONDITIONS.map(condition =>
      `<button type="button" class="${active.has(condition) ? "active" : ""}" data-condition="${escapeHtml(condition)}" data-character="${character.id}">${escapeHtml(condition)}</button>`
    ).join("")}</div>
  </details>`;
}

function spellManagerPool(character, className) {
  const entry = classEntry(character, className) || { level: 1 };
  const lists = spellListsFor(character.edition, className, classSubclassName(character, className)) || {};
  const allowed = maxSpellLevel(className, entry.level, character.edition, classSubclassName(character, className));
  return Object.entries(lists)
    .filter(([level]) => Number(level) > 0 && Number(level) <= allowed)
    .flatMap(([level, names]) => names.map(name => ({ name, level: Number(level), className })))
    .filter((spell, index, rows) => rows.findIndex(item => item.name === spell.name) === index);
}

function activePreparedNames(character, className) {
  const policy = spellPreparationPolicy(character.edition, className, classSubclassName(character, className));
  if (policy === "spellbook") return preparedNamesForClass(character, className);
  return new Set(classSpellRecords(character, className, true).map(spell => spell.name));
}

function openSpellManager(characterId, className) {
  const character = characters.find(item => item.id === characterId);
  if (!character || !canControlCharacter(character)) return;
  const entry = classEntry(character, className);
  if (!entry) return;
  const policy = spellPreparationPolicy(character.edition, className, classSubclassName(character, className));
  if (policy === "level") { toast(spellPreparationRuleText(character, className)); return; }
  const names = activePreparedNames(character, className);
  spellManagerState = {
    characterId,
    className,
    policy,
    original: new Set(names),
    draft: new Set(names),
    bookDraft: new Set(classSpellRecords(character, className, true).map(spell => spell.name))
  };
  activeSheetSection = "spells";
  renderSheet();
}

function closeSpellManager() {
  spellManagerState = null;
  renderSheet();
}

function saveSpellManager() {
  if (!spellManagerState) return;
  const character = characters.find(item => item.id === spellManagerState.characterId);
  const entry = character && classEntry(character, spellManagerState.className);
  if (!character || !entry || !canControlCharacter(character)) return;
  const pool = spellManagerPool(character, entry.name);
  const available = new Map(pool.map(spell => [spell.name, spell]));
  const limit = preparedSpellLimitFor(entry.name, entry.level, character.edition, classSubclassName(character, entry.name), withClassContext(character, entry.name, entry.level));
  const required = Math.min(limit, pool.length);
  const selected = [...spellManagerState.draft].filter(name => available.has(name));
  if (selected.length !== required) {
    toast(`Prepare exactly ${required} ${entry.name} spell${required === 1 ? "" : "s"}`);
    return;
  }
  if (spellManagerState.policy === "long-rest-one") {
    const removed = [...spellManagerState.original].filter(name => !spellManagerState.draft.has(name));
    const added = selected.filter(name => !spellManagerState.original.has(name));
    const openSlots = Math.max(0, required - spellManagerState.original.size);
    if (removed.length > 1 || added.length > openSlots + 1) {
      toast(`${entry.name} can replace only one prepared spell after a Long Rest`);
      return;
    }
  }
  if (spellManagerState.policy === "spellbook") {
    const bookNames = [...spellManagerState.bookDraft].filter(name => available.has(name));
    if (selected.some(name => !spellManagerState.bookDraft.has(name))) {
      toast("Prepared Wizard spells must be in the spellbook");
      return;
    }
    const preservedBook = characterSpellRecords(character).filter(spell => spell.className !== entry.name || Number(spell.level || 0) === 0);
    character.spells = [...preservedBook, ...bookNames.map(name => available.get(name))];
    const otherClasses = (character.preparedSpells || []).filter(prepared => preparedEntryClass(prepared, character) !== entry.name);
    character.preparedSpells = [...otherClasses, ...selected.map(name => ({ name, className: entry.name }))];
    character.preparedSpellClasses = [...new Set([...(character.preparedSpellClasses || []), entry.name])];
  } else {
    const preserved = characterSpellRecords(character).filter(spell => spell.className !== entry.name || Number(spell.level || 0) === 0);
    character.spells = [...preserved, ...selected.map(name => available.get(name))];
  }
  character.updatedAt = Date.now();
  spellManagerState = null;
  persistCharacters();
  renderSheet();
  renderCampaigns();
  toast(`${entry.name} prepared spells updated`);
}

function renderSpellManagerPanel(character) {
  if (!spellManagerState || spellManagerState.characterId !== character.id) return "";
  const entry = classEntry(character, spellManagerState.className);
  if (!entry) return "";
  const pool = spellManagerPool(character, entry.name);
  const limit = preparedSpellLimitFor(entry.name, entry.level, character.edition, classSubclassName(character, entry.name), withClassContext(character, entry.name, entry.level));
  const selectedCount = spellManagerState.draft.size;
  const managesSpellbook = spellManagerState.policy === "spellbook";
  const groups = new Map();
  pool.forEach(spell => {
    if (!groups.has(spell.level)) groups.set(spell.level, []);
    groups.get(spell.level).push(spell);
  });
  return `<section class="spell-manager-panel">
    <div class="spell-manager-head">
      <div><span class="eyebrow">MANAGE SPELLS</span><h3>${escapeHtml(entry.name)} prepared spells</h3><p>${escapeHtml(spellPreparationRuleText(character, entry.name))}${managesSpellbook ? " Add any eligible spell below to your spellbook before preparing it." : ""}</p></div>
      <strong class="spell-manager-count ${selectedCount === limit ? "complete" : ""}">${selectedCount}/${limit}</strong>
    </div>
    <div class="spell-manager-levels">${[...groups.entries()].sort((a, b) => a[0] - b[0]).map(([level, spells]) => `<div class="spell-manager-level">
      <h4>Level ${level}</h4>
      <div>${spells.sort((a, b) => a.name.localeCompare(b.name)).map(spell => {
        const checked = spellManagerState.draft.has(spell.name);
        const inBook = !managesSpellbook || spellManagerState.bookDraft.has(spell.name);
        const capped = !checked && selectedCount >= limit;
        if (managesSpellbook) return `<article class="spell-manager-option ${checked ? "selected" : ""} ${!inBook ? "available" : ""}"><label><input type="checkbox" data-manage-spell="${escapeHtml(spell.name)}" ${checked ? "checked" : ""} ${!inBook || capped ? "disabled" : ""}><span><strong>${escapeHtml(spell.name)}</strong><small>${checked ? "Prepared" : inBook ? "In spellbook" : "Available to add"}</small></span></label><button type="button" class="button small ghost" data-spellbook-spell="${escapeHtml(spell.name)}">${inBook ? "Remove" : "Add"}</button></article>`;
        return `<label class="spell-manager-option ${checked ? "selected" : ""} ${capped ? "locked" : ""}"><input type="checkbox" data-manage-spell="${escapeHtml(spell.name)}" ${checked ? "checked" : ""} ${capped ? "disabled" : ""}><span><strong>${escapeHtml(spell.name)}</strong><small>${checked ? "Prepared" : "Available"}</small></span></label>`;
      }).join("")}</div>
    </div>`).join("")}</div>
    <div class="spell-manager-actions"><button type="button" class="button ghost" data-spell-manager-cancel>Cancel</button><button type="button" class="button primary" data-spell-manager-save>Save prepared spells</button></div>
  </section>`;
}

function renderSpellPreparationControls(character, spellcastingClasses, canControl) {
  return `<div class="spell-preparation-grid">${spellcastingClasses.map(entry => {
    const policy = spellPreparationPolicy(character.edition, entry.name, classSubclassName(character, entry.name));
    const limit = preparedSpellLimitFor(entry.name, entry.level, character.edition, classSubclassName(character, entry.name), withClassContext(character, entry.name, entry.level));
    const prepared = activePreparedNames(character, entry.name).size;
    const bookCount = policy === "spellbook" ? classSpellRecords(character, entry.name, true).length : 0;
    const noun = policy === "level" && character.edition === "2014" ? "known" : "prepared";
    return `<article class="spell-preparation-card"><div><small>${escapeHtml(entry.name)} SPELLS</small><strong>${prepared}/${limit} ${noun}</strong>${bookCount ? `<span>${bookCount} in spellbook</span>` : ""}<p>${escapeHtml(spellPreparationRuleText(character, entry.name))}</p></div>${canControl && policy !== "level" ? `<button type="button" class="button small ghost" data-manage-spells="${escapeHtml(entry.name)}" data-character="${character.id}">Manage spells</button>` : `<span class="spell-change-lock">${policy === "level" ? `Change at ${escapeHtml(entry.name)} level-up` : "View only"}</span>`}</article>`;
  }).join("")}</div>`;
}

function spellsReadyToCast(character, allSpells) {
  const wizardPrepared = new Map(classBreakdown(character)
    .filter(entry => spellPreparationPolicy(character.edition, entry.name, classSubclassName(character, entry.name)) === "spellbook")
    .map(entry => [entry.name, preparedNamesForClass(character, entry.name)]));
  return allSpells.filter(spell => {
    if (spell.level === "Custom" || Number(spell.level || 0) === 0) return true;
    const className = spell.className || primaryClassName(character);
    return !wizardPrepared.has(className) || wizardPrepared.get(className).has(spell.name);
  });
}

function renderWizardSpellbooks(character) {
  const entries = classBreakdown(character).filter(entry => entry.name === "Wizard");
  return entries.map(entry => {
    const book = classSpellRecords(character, entry.name, true);
    const prepared = preparedNamesForClass(character, entry.name);
    if (!book.length) return "";
    return `<details class="wizard-spellbook"><summary><strong>Wizard Spellbook</strong><span>${book.length} spells · ${prepared.size} prepared</span></summary><div>${book.slice().sort((a, b) => Number(a.level) - Number(b.level) || a.name.localeCompare(b.name)).map(spell => `<span class="${prepared.has(spell.name) ? "prepared" : ""}"><small>Level ${spell.level}</small>${escapeHtml(spell.name)}<b>${prepared.has(spell.name) ? "Prepared" : "In book"}</b></span>`).join("")}</div></details>`;
  }).join("");
}

function renderSheet() {
  const c = characters.find(x => x.id === activeCharacterId) || characters[0];
  if (!c) { $("#sheet-empty").classList.remove("hidden"); $("#character-sheet").classList.add("hidden"); return; }
  activeCharacterId = c.id;
  if (spellManagerState && spellManagerState.characterId !== c.id) spellManagerState = null;
  const d = derived(c);
  const canControl = canControlCharacter(c);
  const classEntries = classBreakdown(c);
  const primaryClass = primaryClassName(c);
  const cls = RULES.classes[primaryClass];
  const classFeatures = classEntries.flatMap(entry =>
    (CLASS_FEATURES[c.edition]?.[entry.name] || [])
      .filter(([level]) => level <= entry.level)
      .map(([level, name]) => ({ level, name, source: entry.name, className: entry.name }))
  );
  const subclassFeatures = classEntries.flatMap(entry => {
    const name = classSubclassName(c, entry.name);
    return resolvedSubclassFeatures(c.edition, entry.name, name)
      .filter(([level]) => level <= entry.level)
      .map(([level, featureName]) => ({ level, name: featureName, source: name, className: entry.name }));
  });
  const subclassLines = classEntries
    .map(entry => {
      const subclass = classSubclassName(c, entry.name);
      if (!subclass) return "";
      const meta = subclassMetadata(entry.name, subclass, c.edition);
      const unlock = subclassLevel(entry.name, c.edition);
      const status = entry.level < unlock ? ` · planned for ${entry.name} ${unlock}` : "";
      return `${entry.name}: ${subclass}${meta?.source ? ` · ${meta.source}` : ""}${status}`;
    })
    .filter(Boolean);
  const feats = [...(c.feats || []), ...String(c.customFeats || "").split(",").map(x => x.trim()).filter(Boolean)];
  const customSpells = String(c.customSpells || "").split(",").map(x => x.trim()).filter(Boolean).map(name => ({ name, level: "Custom", className: primaryClassName(c) }));
  const allSpells = [...characterSpellRecords(c), ...customSpells];
  const castableSpells = spellsReadyToCast(c, allSpells);
  const speciesTraits = speciesTraitCards(c);
  const characterChoices = [];
  const addChoice = (name, source, description = "") => {
    if (name) characterChoices.push({ name, source, description });
  };
  [...new Set([c.fightingStyle, ...(c.fightingStyles || [])].filter(Boolean))].forEach(name =>
    addChoice(name, "Fighting Style", fightingStyleDescription(name, c.edition))
  );
  addChoice(c.pactBoon, "Pact Boon", progressionDescription("pactBoons", c.pactBoon, c.edition));
  (c.metamagic || []).forEach(name => addChoice(name, "Metamagic", progressionDescription("metamagic", name, c.edition)));
  (c.invocations || []).forEach(name => addChoice(name, "Eldritch Invocation", progressionDescription("invocations", name, c.edition)));
  (c.expertise || []).forEach(name => addChoice(name, "Expertise", `Your proficiency bonus is doubled for checks you make with ${name}.`));
  (c.weaponMastery || []).forEach(name => addChoice(name, "Weapon Mastery", `${WEAPON_MASTERY_PROPERTIES[name] || "Mastery"} property · usable when the weapon's requirements are met.`));
  addChoice(c.divineOrder, "Divine Order", classChoiceDescription(c.divineOrder));
  addChoice(c.primalOrder, "Primal Order", classChoiceDescription(c.primalOrder));
  addChoice(c.blessedStrikes, "Blessed Strikes", classChoiceDescription(c.blessedStrikes));
  addChoice(c.elementalFury, "Elemental Fury", classChoiceDescription(c.elementalFury));
  classEntries.forEach(entry => {
    const subclass = classSubclassName(c, entry.name);
    const choices = { ...(c.subclassChoices || {}), ...(entry.subclassChoices || {}) };
    (SUBCLASS_CHOICE_RULES[subclass] || []).filter(choice =>
      !choice.editions || choice.editions.includes(c.edition)
    ).forEach(choice => {
      const value = choices[choice.key];
      if (value && entry.level >= choice.level) addChoice(value, `${entry.name} · ${choice.label}`, `${choice.label}: ${value}.`);
    });
  });
  const resources = resourceDefinitions(c);
  const spellcastingClasses = classEntries.filter(entry => spellListsFor(c.edition, entry.name, classSubclassName(c, entry.name)));
  const hasSpellcasting = Boolean(spellcastingClasses.length);
  if (activeSheetSection === "spells" && !hasSpellcasting) activeSheetSection = "overview";
  const sectionClass = section => activeSheetSection === section ? "" : "hidden";
  const maximumHp = d.hp;
  const currentHp = Math.max(0, Math.min(maximumHp, Number(c.currentHp ?? maximumHp)));
  const temporaryHp = Math.max(0, Number(c.temporaryHp || 0));
  const activeConditions = c.conditions || [];
  $("#sheet-empty").classList.add("hidden");
  const sheet = $("#character-sheet"); sheet.classList.remove("hidden");
  sheet.innerHTML = `<div class="sheet-header">
    <div class="sheet-portrait">${c.portrait ? `<img src="${escapeHtml(c.portrait)}" alt="">` : escapeHtml(c.name.charAt(0))}</div>
    <div><span class="eyebrow">${c._campaignShared ? "CAMPAIGN SHEET · " : ""}${c.edition === "2024" ? "5.5e · 2024" : "5e · 2014"} RULES</span><h1>${escapeHtml(c.name)}</h1><p>Level ${characterTotalLevel(c)} ${escapeHtml(c.species)} ${escapeHtml(classSummary(c))}</p>${subclassLines.length ? `<small class="sheet-source">${escapeHtml(subclassLines.join(" · "))}</small>` : ""}${c._campaignShared ? `<small class="sheet-source">DM access: changes sync to the player's shared sheet.</small>` : ""}</div>
    <div class="sheet-core">
      <button data-sheet-roll="Initiative" data-roll-mode="${d.initiativeAdvantage ? "advantage" : "normal"}" data-modifier="${d.initiative}"><small>INITIATIVE${helpChip("initiative")}</small><strong>${signed(d.initiative)}${d.initiativeAdvantage ? " ▲" : ""}</strong></button>
      <button><small>ARMOR CLASS${helpChip("ac")}</small><strong>${d.ac}</strong></button>
      <button data-sheet-section-jump="overview"><small>HIT POINTS${helpChip("hp")}</small><strong>${currentHp}/${maximumHp}</strong></button>
      <button><small>PROFICIENCY${helpChip("proficiency")}</small><strong>${signed(d.prof)}</strong></button>
      <button data-sheet-section-jump="overview"><small>PASSIVE PERCEPTION</small><strong>${d.passive}</strong></button>
    </div>
    <div class="sheet-header-actions">
      ${canControl ? `<button class="button ghost" data-edit="${c.id}">Edit character</button>
      <button class="button ghost" data-delevel="${c.id}" ${characterTotalLevel(c) <= 1 ? "disabled" : ""}>${characterTotalLevel(c) <= 1 ? "Minimum level" : "Delevel"}</button>
      <button class="button ghost" data-auto-level="${c.id}" ${characterTotalLevel(c) >= 20 ? "disabled" : ""}>Auto level</button>
      <button class="button primary" data-level-up="${c.id}" ${characterTotalLevel(c) >= 20 ? "disabled" : ""}>${characterTotalLevel(c) >= 20 ? "Maximum level" : "Level up"}</button>` : `<span class="tag">View only</span>`}
    </div>
  </div>
  <div class="session-toolbar">
    <div class="session-hp" data-session-character="${c.id}">
      <div class="session-label"><span>Current HP</span><strong>${currentHp}<small> / ${maximumHp}</small></strong>${temporaryHp ? `<em>+${temporaryHp} temp</em>` : ""}</div>
      <label>Amount<input type="number" min="1" max="999" value="1" data-hp-amount></label>
      <button type="button" class="session-action damage" data-hp-action="damage" data-character="${c.id}">Damage</button>
      <button type="button" class="session-action heal" data-hp-action="heal" data-character="${c.id}">Heal</button>
      <button type="button" class="session-action temp" data-hp-action="temp" data-character="${c.id}">Temp HP</button>
    </div>
    <div class="session-rests">
      <button type="button" data-rest="short" data-character="${c.id}"><span>☾</span><strong>Short Rest</strong></button>
      <button type="button" data-rest="long" data-character="${c.id}"><span>✦</span><strong>Long Rest</strong></button>
    </div>
    <button type="button" class="inspiration-toggle ${c.inspiration ? "active" : ""}" data-inspiration data-character="${c.id}" aria-pressed="${Boolean(c.inspiration)}"><span>◆</span><strong>Inspiration</strong></button>
    ${renderConditionPicker(c)}
  </div>
  <nav class="sheet-tabs" aria-label="Character sheet sections">
    <button type="button" class="${activeSheetSection === "overview" ? "active" : ""}" data-sheet-section="overview">Overview</button>
    <button type="button" class="${activeSheetSection === "inventory" ? "active" : ""}" data-sheet-section="inventory">Inventory</button>
    <button type="button" class="${activeSheetSection === "features" ? "active" : ""}" data-sheet-section="features">Features & Traits</button>
    ${hasSpellcasting ? `<button type="button" class="${activeSheetSection === "spells" ? "active" : ""}" data-sheet-section="spells">Spells</button>` : ""}
  </nav>
  <div class="sheet-body">
    <section class="sheet-panel ${sectionClass("overview")}"><h2>Abilities${helpChip("ability")}</h2><div class="sheet-abilities">${ABILITIES.map(a =>
      `<button class="sheet-ability" data-sheet-roll="${a} check" data-modifier="${modifier(c[a])}"><small>${a}</small><strong>${signed(modifier(c[a]))}</strong><span>${c[a]}</span></button>`
    ).join("")}</div>
      <h2 class="subsection-title">Saving throws${helpChip("save")}</h2>
      <div class="saving-throw-list">${ABILITIES.map(ability => {
        const proficient = savingThrowProficiencies(c).has(ability);
        const saveModifier = savingThrowModifier(c, ability);
        return `<button type="button" data-sheet-roll="${ability} saving throw" data-modifier="${saveModifier}"><span class="${proficient ? "proficient" : ""}">${ability}</span><strong>${signed(saveModifier)}</strong></button>`;
      }).join("")}</div>
    </section>
    <section class="sheet-panel ${sectionClass("overview")}"><h2>Skills${helpChip("skill")}</h2><div class="skill-list">${Object.entries(SKILLS).map(([skill, ability]) => {
      const proficient = proficientSkills(c).has(skill);
      const expertise = expertiseSkills(c).has(skill);
      const value = skillModifier(c, skill);
      return `<button class="skill-roll" data-sheet-roll="${skill}" data-modifier="${value}"><span class="${proficient ? "proficient" : ""}">${skill} <small>(${ability})${expertise ? " · Expertise" : ""}</small></span><strong>${signed(value)}</strong></button>`;
    }).join("")}</div></section>
    <section class="sheet-panel ${sectionClass("overview")}">
      <h2>Combat & senses</h2>
      <p><strong>Proficiency bonus:</strong> ${signed(d.prof)}</p><p><strong>Passive Perception:</strong> ${d.passive}</p>
      <p><strong>Armor Class source:</strong> ${escapeHtml(d.acSource)}</p><p><strong>Initiative:</strong> ${escapeHtml(d.initiativeSource)}${d.initiativeAdvantage ? " · advantage" : ""}</p>
      <p><strong>Saving throw proficiencies:</strong> ${[...savingThrowProficiencies(c)].join(", ")}</p><p><strong>Primary ability:</strong> ${cls.primary}</p>
      <p><strong>Class levels:</strong> ${escapeHtml(classSummary(c))}</p>
      <p><strong>Skill proficiencies:</strong> ${[...proficientSkills(c)].sort().join(", ") || "None selected"}</p>
      <p><strong>Active conditions:</strong> ${activeConditions.length ? escapeHtml(activeConditions.join(", ")) : "None"}</p>
      ${renderDeathSaves(c)}
      <h2>Background</h2><p><strong>${escapeHtml(c.background)}</strong> · ${escapeHtml(c.alignment)}</p>
      <div class="sheet-notes">${escapeHtml(c.backstory || "No backstory recorded yet.")}</div>
    </section>
    ${resources.length ? `<section class="sheet-panel sheet-wide ${sectionClass("overview")}">
      <div class="resource-toolbar"><h2>Resources & spell slots</h2><span>Tap a box when a use is spent.</span></div>
      <div class="resource-grid">${resources.map(resource => renderResourceCard(c, resource)).join("")}</div>
    </section>` : ""}
    ${renderInventorySection(c, sectionClass("inventory"))}
    <section class="sheet-panel sheet-wide ${sectionClass("features")}">
      <h2>Species Traits</h2>
      <div class="feature-grid">${speciesTraits.map(trait =>
        `<article class="feature-card trait-card"><small>${escapeHtml(trait.source)}</small><strong>${escapeHtml(trait.name)}</strong>${ruleDetails(trait.description)}</article>`
      ).join("") || "<p>No species traits are recorded for this character.</p>"}</div>
    </section>
    <section class="sheet-panel sheet-wide ${sectionClass("features")}">
      <h2>Class & subclass features</h2>
      <div class="feature-grid">${[...classFeatures, ...subclassFeatures].map(feature =>
        `<article class="feature-card"><small>${escapeHtml(feature.className)} ${feature.level} · ${escapeHtml(feature.source)}</small><strong>${escapeHtml(feature.name)}</strong>${ruleDetails(featureDescription(c.edition, feature.source, feature.name, feature.className))}</article>`
      ).join("") || "<p>No features are available at this level.</p>"}</div>
    </section>
    ${characterChoices.length ? `<section class="sheet-panel sheet-wide ${sectionClass("features")}">
      <h2>Chosen class options</h2>
      <div class="feature-grid">${characterChoices.map(choice =>
        `<article class="feature-card"><small>${escapeHtml(choice.source)}</small><strong>${escapeHtml(choice.name)}</strong>${ruleDetails(choice.description)}</article>`
      ).join("")}</div>
    </section>` : ""}
    <section class="sheet-panel sheet-wide ${sectionClass("features")}">
      <h2>Feats</h2>
      <div class="tag-list">${feats.map(feat => {
        const featRecord = (FEATS[c.edition] || []).find(item => item.name === feat) || { name: feat };
        return `<div class="tag">${escapeHtml(feat)}${ruleDetails(featDescription(featRecord, c.edition))}</div>`;
      }).join("") || "<p>No feats selected.</p>"}</div>
    </section>
    ${hasSpellcasting ? `<section class="sheet-panel sheet-wide ${sectionClass("spells")}">
      <h2>Spellcasting</h2>
      <div class="sheet-spell-summary">${spellcastingClasses.map(entry => {
        const context = withClassContext(c, entry.name, entry.level);
        const ability = spellcastingAbility(context);
        const attack = d.prof + modifier(c[ability]);
        return `<span><strong>${escapeHtml(entry.name)}:</strong> ${ability} · DC ${8 + attack} · ${signed(attack)} attack</span>`;
      }).join("")}<span><strong>Ready to cast:</strong> ${castableSpells.length}</span></div>
      ${renderSpellPreparationControls(c, spellcastingClasses, canControl)}
      ${renderSpellManagerPanel(c)}
      ${renderSpellBook(castableSpells, c)}
      ${renderWizardSpellbooks(c)}
    </section>` : ""}
  </div>`;
}

function editCharacter(id) {
  const c = characters.find(x => x.id === id); if (!c) return;
  if (!canControlCharacter(c)) { toast("Only the owner or campaign DM can edit this sheet"); return; }
  activeCharacterId = id; edition = c.edition || "2014"; selectedClass = c.className || "Fighter";
  abilityMethod = c.abilityMethod || "manual";
  currentOriginFeat = c.originFeat || "";
  selectedFeatAbilities = { ...(c.featAbilityChoices || {}) };
  selectedAsi = c.asi && Object.keys(c.asi).length ? JSON.parse(JSON.stringify(c.asi)) : asiStateFromBonuses(c.asiBonuses);
  showCreationMethod("standard");
  $("#builder-eyebrow").textContent = "DIRECT EDIT";
  $("#builder-title").textContent = `Edit ${c.name}`;
  $("#builder-description").textContent = "Adjust any saved detail directly. Use Level Up for guided progression.";
  $$(".edition-toggle button").forEach(b => b.classList.toggle("active", b.dataset.edition === edition));
  populateRules();
  buildAbilities({ keepScores: false });
  $$("[name='abilityMethod']").forEach(input => {
    input.checked = input.value === abilityMethod;
    input.closest(".ability-method")?.classList.toggle("active", input.checked);
  });
  Object.entries(c).forEach(([key, value]) => {
    const input = form.elements[key]; if (input && key !== "portrait" && !Array.isArray(value)) input.value = value;
  });
  $$("[name='startingEquipmentMode']").forEach(input => {
    input.checked = input.value === (c.inventory?.length ? "keep" : "starting");
  });
  updateEquipmentMethodUI();
  renderOriginRules(c);
  const legacyOriginBonuses = c.originBonuses || originAbilityBonuses();
  ABILITIES.forEach(ability => {
    const storedBase = c.baseAbilities?.[ability];
    const derivedBase = Number(c[ability] || 10)
      - Number(legacyOriginBonuses[ability] || 0)
      - Number(c.featBonuses?.[ability] || 0)
      - Number(c.asiBonuses?.[ability] || 0);
    form.elements[ability].value = storedBase ?? derivedBase;
  });
  populateSubclasses();
  if (form.elements.subclass) form.elements.subclass.value = c.subclass || "";
  if (form.elements.fightingStyle && c.fightingStyle) form.elements.fightingStyle.value = c.fightingStyle;
  renderStartingClassOptions(c);
  updateSubclassMeta();
  renderTalentChoices(c.feats || [], (c.spells || []).map(spell => typeof spell === "string" ? spell : spell.name), c.featAbilityChoices || {});
  renderStartingEquipmentChoices();
  portraitData = c.portrait || ""; resetCanvasFromPortrait();
  setStep(1); updatePreview(); navigate("builder"); toast("Character loaded for editing");
}

function subclassLevel(className, rulesEdition) {
  if (rulesEdition === "2024") return 3;
  if (["Cleric", "Sorcerer", "Warlock"].includes(className)) return 1;
  if (["Druid", "Wizard"].includes(className)) return 2;
  return 3;
}

function levelFeatures(character, targetLevel, targetClass = primaryClassName(character)) {
  const targetClassLevel = classLevel(character, targetClass) + 1;
  const context = withClassContext(character, targetClass, targetClassLevel);
  const selectedSubclass = subclassName(context);
  const classFeatures = (CLASS_FEATURES[character.edition]?.[targetClass] || [])
    .filter(([level]) => level === targetClassLevel)
    .map(([level, name]) => ({ level, name, source: targetClass, className: targetClass }));
  const subclassFeatures = resolvedSubclassFeatures(character.edition, targetClass, selectedSubclass)
    .filter(([level]) => level === targetClassLevel)
    .map(([level, name]) => ({ level, name, source: selectedSubclass, className: targetClass }));
  const beforeSlots = spellSlotResources(character).map(resource => `${resource.id}:${resource.max}:${resource.name}`).join("|");
  const afterCharacter = characterWithClassLevelGain(character, targetClass);
  const afterSlots = spellSlotResources(afterCharacter).map(resource => `${resource.id}:${resource.max}:${resource.name}`).join("|");
  const slotFeature = beforeSlots !== afterSlots && afterSlots
    ? [{ level: targetClassLevel, name: "Spell slot progression", source: targetClass, className: targetClass }]
    : [];
  return [...classFeatures, ...subclassFeatures, ...slotFeature];
}

function optionRadios(name, options, selected = "", required = true, describe = () => "") {
  return `<div class="radio-grid">${options.map(option => `<article class="radio-option"><label>
    <input type="radio" name="${name}" value="${escapeHtml(option)}" ${option === selected ? "checked" : ""} ${required ? "required" : ""}>
    <span>${escapeHtml(option)}</span>
  </label>${ruleDetails(describe(option))}</article>`).join("")}</div>`;
}

function optionChecks(name, options, selected = [], limit = 0, describe = () => "") {
  const chosen = new Set(selected);
  return `<div class="radio-grid">${options.map(option => `<article class="radio-option"><label>
    <input type="checkbox" name="${name}" value="${escapeHtml(option)}" ${chosen.has(option) ? "checked" : ""} ${limit ? `data-choice-limit="${limit}"` : ""}>
    <span>${escapeHtml(option)}</span>
  </label>${ruleDetails(describe(option))}</article>`).join("")}</div>`;
}

function progressionChoiceBlocks(character, targetLevel, features, targetClass = primaryClassName(character)) {
  const targetClassLevel = classLevel(character, targetClass) + 1;
  const context = withClassContext(character, targetClass, targetClassLevel);
  const blocks = [];
  const featureNames = features.map(feature => feature.name);
  const levelRules = LEVEL_CHOICE_RULES[character.edition]?.[targetClass] || {};
  const subclassAt = subclassLevel(targetClass, character.edition);
  if (targetClassLevel === subclassAt) {
    const subclasses = subclassEntries(targetClass, character.edition).map(item => item.name);
    const initialSubclass = classSubclassName(character, targetClass) || subclasses[0] || "";
    blocks.push(`<div class="progression-choice">
      <label for="level-subclass">Choose your ${targetClass} subclass</label>
      <select id="level-subclass" name="subclassChoice" required>${[...new Set(subclasses)].map(name => {
        const meta = subclassMetadata(targetClass, name, character.edition);
        const suffix = meta?.source ? ` · ${meta.source}${meta.rules === "2014" && character.edition === "2024" ? " · expanded 5e" : ""}` : "";
        return `<option value="${escapeHtml(name)}" ${name === initialSubclass ? "selected" : ""}>${escapeHtml(name + suffix)}</option>`;
      }).join("")}</select>
      <div id="level-subclass-choices">${levelSubclassChoiceMarkup(context, initialSubclass, targetClassLevel)}</div>
    </div>`);
  } else if (classSubclassName(character, targetClass)) {
    const subclassChoices = subclassChoiceMarkup(classSubclassName(character, targetClass), targetClassLevel, context.subclassChoices || {}, false, character.edition);
    if (subclassChoices) {
      blocks.push(`<div class="progression-choice"><strong>Choose your subclass feature option</strong>${subclassChoices}</div>`);
    }
  }
  const hasFightingStyleFeature = (CLASS_FEATURES[character.edition]?.[targetClass] || [])
    .some(([unlock, name]) => unlock <= targetClassLevel && name.includes("Fighting Style"));
  if (featureNames.some(name => name.includes("Fighting Style")) || (hasFightingStyleFeature && !character.fightingStyle)) {
    const existingStyles = new Set([character.fightingStyle, ...(character.fightingStyles || [])].filter(Boolean));
    const styles = fightingStylesForClass(targetClass, character.edition).filter(name => !existingStyles.has(name));
    blocks.push(`<div class="progression-choice"><strong>Choose a Fighting Style</strong>${optionRadios("fightingStyle", styles, "", true, option =>
      fightingStyleDescription(option, character.edition)
    )}</div>`);
  }
  const metamagicCount = Number(levelRules.metamagic?.[targetClassLevel] || 0);
  if (metamagicCount) {
    const options = PROGRESSION_OPTIONS.metamagic[character.edition].filter(option => !(character.metamagic || []).includes(option));
    blocks.push(`<div class="progression-choice" data-min-choices="${metamagicCount}" data-choice-name="metamagic"><strong>Choose ${metamagicCount} Metamagic option${metamagicCount > 1 ? "s" : ""}</strong>${optionChecks("metamagic", options, [], metamagicCount, option =>
      progressionDescription("metamagic", option, character.edition)
    )}</div>`);
  }
  if (featureNames.includes("Pact Boon")) {
    blocks.push(`<div class="progression-choice"><strong>Choose a Pact Boon</strong>${optionRadios("pactBoon", PROGRESSION_OPTIONS.pactBoons2014, "", true, option =>
      progressionDescription("pactBoons", option, character.edition)
    )}</div>`);
  }
  const invocationCount = Number(levelRules.invocations?.[targetClassLevel] || 0);
  if (invocationCount) {
    const options = PROGRESSION_OPTIONS.invocations[character.edition].filter(option => !(character.invocations || []).includes(option));
    blocks.push(`<div class="progression-choice" data-min-choices="${invocationCount}" data-choice-name="invocations"><strong>Choose ${invocationCount} Eldritch Invocation${invocationCount > 1 ? "s" : ""}</strong>${optionChecks("invocations", options, [], invocationCount, option =>
      progressionDescription("invocations", option, character.edition)
    )}</div>`);
  }
  const expertiseCount = Number(levelRules.expertise?.[targetClassLevel] || 0);
  if (expertiseCount) {
    const trained = proficientSkills(character);
    const options = PROGRESSION_OPTIONS.skills.filter(option => trained.has(option) && !(character.expertise || []).includes(option));
    blocks.push(`<div class="progression-choice" data-min-choices="${expertiseCount}" data-choice-name="expertise"><strong>Choose ${expertiseCount} skills for Expertise</strong>${optionChecks("expertise", options, [], expertiseCount)}</div>`);
  }
  if (character.edition === "2024" && targetClass === "Barbarian" && targetClassLevel === 3) {
    const trained = proficientSkills(character);
    const options = CLASS_SKILLS.Barbarian.options.filter(skill => !trained.has(skill));
    blocks.push(`<div class="progression-choice" data-min-choices="1" data-choice-name="skillProficiencies"><strong>Choose a Primal Knowledge skill</strong>${optionChecks("skillProficiencies", options, [], 1)}</div>`);
  }
  const masteryIncrease = Math.max(0, weaponMasteryCount(targetClass, targetClassLevel, character.edition) - (character.weaponMastery || []).length);
  if (masteryIncrease > 0) {
    const availableWeapons = weaponMasteryOptions(targetClass).filter(weapon => !(character.weaponMastery || []).includes(weapon));
    blocks.push(`<div class="progression-choice" data-min-choices="${masteryIncrease}" data-choice-name="weaponMastery"><strong>Choose ${masteryIncrease} mastered weapon${masteryIncrease > 1 ? "s" : ""}</strong>${optionChecks("weaponMastery", availableWeapons, [], masteryIncrease, weapon =>
      `${WEAPON_MASTERY_PROPERTIES[weapon] || "Mastery"} mastery property`
    )}</div>`);
  }
  if (character.edition === "2024" && targetClass === "Cleric" && !character.divineOrder) {
    blocks.push(`<div class="progression-choice"><strong>Choose Divine Order</strong>${optionRadios("divineOrder", ["Protector", "Thaumaturge"])}</div>`);
  }
  if (character.edition === "2024" && targetClass === "Druid" && !character.primalOrder) {
    blocks.push(`<div class="progression-choice"><strong>Choose Primal Order</strong>${optionRadios("primalOrder", ["Magician", "Warden"])}</div>`);
  }
  if (character.edition === "2024" && targetClass === "Cleric" && targetClassLevel >= 7 && !character.blessedStrikes) {
    blocks.push(`<div class="progression-choice"><strong>Choose Blessed Strikes</strong>${optionRadios("blessedStrikes", ["Divine Strike", "Potent Spellcasting"])}</div>`);
  }
  if (character.edition === "2024" && targetClass === "Druid" && targetClassLevel >= 7 && !character.elementalFury) {
    blocks.push(`<div class="progression-choice"><strong>Choose Elemental Fury</strong>${optionRadios("elementalFury", ["Potent Spellcasting", "Primal Strike"])}</div>`);
  }
  const advancementLevels = advancementLevelsFor(targetClass);
  if (advancementLevels.includes(targetClassLevel)) {
    const availableFeats = FEATS[character.edition].filter(feat =>
        !feat.category.includes("Fighting Style")
        && feat.name !== "Ability Score Improvement"
        && featEligible(feat, targetClassLevel, targetClass, character.edition)
        && (character.edition !== "2024" || feat.category === "General" || (targetClassLevel >= 19 && feat.category === "Epic Boon"))
        && !(character.feats || []).includes(feat.name)
      );
    const firstFeatAbilities = featAbilityOptions(availableFeats[0] || {}, character.edition);
    blocks.push(`<div class="progression-choice">
      <strong>Choose an advancement</strong>
      ${optionRadios("advancementType", ["Ability Score Improvement", "Feat"], "Ability Score Improvement")}
      <div id="ability-advancement">
        <p>Increase one ability twice or two abilities once.</p>
        <div class="radio-grid">
          <label>First +1<select name="abilityIncreaseOne">${ABILITIES.map(ability => `<option>${ability}</option>`).join("")}</select></label>
          <label>Second +1<select name="abilityIncreaseTwo">${ABILITIES.map(ability => `<option>${ability}</option>`).join("")}</select></label>
        </div>
      </div>
      <div class="hidden" id="feat-advancement">
        <label id="level-feat-ability-field" class="${firstFeatAbilities.length ? "" : "hidden"}">Ability increased by the feat<select name="levelFeatAbility">${abilityOptions(firstFeatAbilities, firstFeatAbilities[0])}</select></label>
        <label>Choose feat<select name="levelFeat">${availableFeats.map(feat => `<option value="${escapeHtml(feat.name)}">${escapeHtml(feat.name)} · ${escapeHtml(feat.category)}</option>`).join("")}</select></label>
      </div>
    </div>`);
  }
  return blocks.join("");
}

function levelSpellChoices(character, targetLevel) {
  const lists = spellListsFor(character.edition, character.className, subclassName(character));
  if (!lists) return "";
  const newMax = maxSpellLevel(character.className, targetLevel, character.edition, subclassName(character));
  const progression = character.edition === "2014" && character.className === "Artificer"
    ? null
    : spellProgressionFor(character.edition, character.className, subclassName(character));
  const policy = spellPreparationPolicy(character.edition, character.className, subclassName(character));
  let count = 0;
  if (progression?.perLevel) count = character.className === "Wizard" && targetLevel === 1 ? 6 : progression.perLevel;
  if (progression?.totals) {
    const before = progression.totals[Number(character.level) - 1] || 0;
    const after = progression.totals[targetLevel - 1] || before;
    count = Math.max(0, after - before);
  }
  if (!progression && policy !== "level") {
    const before = preparedSpellLimitFor(character.className, Number(character.level), character.edition, subclassName(character), character);
    const after = preparedSpellLimitFor(character.className, targetLevel, character.edition, subclassName(character), { ...character, level: targetLevel });
    count = Math.max(0, after - before);
  }
  const existingRecords = classSpellRecords(character, character.className, true);
  const existing = new Set(existingRecords.map(spell => spell.name));
  const available = Object.entries(lists)
    .filter(([level]) => Number(level) > 0 && Number(level) <= newMax)
    .flatMap(([level, spells]) => spells.map(name => ({ name, level: Number(level) })))
    .filter(spell => !existing.has(spell.name));
  const modeLabel = progression?.mode === "spellbook" ? "spellbook" : policy === "level" && character.edition === "2014" ? "spells known" : "prepared spells";
  const addSection = count ? `<section class="advancement-section">
    <h3>Add ${count} spell${count > 1 ? "s" : ""}</h3>
    <p>Your ${modeLabel} increases at this level. Choose exactly ${count}; eligible spell levels are 1–${newMax}.</p>
    <div class="progression-choice" data-min-choices="${count}" data-choice-name="levelSpells">
      ${optionChecks("levelSpells", available.map(spell => spell.name), [], count, name => {
        const spell = available.find(item => item.name === name);
        return spellDescription(name, character.edition, EXPANDED_SPELL_SOURCES[character.edition]?.[name] || "");
      })}
    </div>
  </section>` : "";
  const replacementSection = policy === "level" && existingRecords.length && available.length ? `<section class="advancement-section">
    <h3>Optional spell replacement</h3>
    <p>${character.edition === "2024" ? "Replace one prepared spell" : "Replace one known spell"} as part of gaining this ${character.className} level.</p>
    <div class="progression-choice spell-replacement-row">
      <label>Replace<select name="replaceSpellOld"><option value="">Keep current spells</option>${existingRecords.slice().sort((a, b) => a.name.localeCompare(b.name)).map(spell => `<option value="${escapeHtml(spell.name)}">${escapeHtml(spell.name)}</option>`).join("")}</select></label>
      <label>With<select name="replaceSpellNew"><option value="">Choose a replacement</option>${available.slice().sort((a, b) => a.level - b.level || a.name.localeCompare(b.name)).map(spell => `<option value="${escapeHtml(spell.name)}">${escapeHtml(spell.name)} · level ${spell.level}</option>`).join("")}</select></label>
    </div>
  </section>` : "";
  return `${addSection}${replacementSection}`;
}

function levelCantripChoices(character, targetLevel) {
  const subclass = subclassName(character);
  const thirdCasterCantrips = ["Eldritch Knight", "Arcane Trickster"].includes(subclass)
    ? ({ 3: 2, 10: 1 })[targetLevel]
    : subclass === "Order of the Profane Soul" ? ({ 3: 2, 10: 1 })[targetLevel] : 0;
  const count = Number(CANTRIP_PROGRESSION[character.edition]?.[character.className]?.[targetLevel] || thirdCasterCantrips || 0);
  const cantrips = spellListsFor(character.edition, character.className, subclass)?.[0] || [];
  if (!count || !cantrips.length) return "";
  const existing = new Set((character.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
  const available = cantrips.filter(name => !existing.has(name));
  return `<section class="advancement-section">
    <h3>Learn ${count} cantrip${count > 1 ? "s" : ""}</h3>
    <p>Your class gains another cantrip at this level.</p>
    <div class="progression-choice" data-min-choices="${count}" data-choice-name="levelCantrips">
      ${optionChecks("levelCantrips", available, [], count, name => spellDescription(name, character.edition, EXPANDED_SPELL_SOURCES[character.edition]?.[name] || ""))}
    </div>
  </section>`;
}

function mysticArcanumChoices(character, targetLevel) {
  if (character.className !== "Warlock") return "";
  const arcanumLevel = ({ 11: 6, 13: 7, 15: 8, 17: 9 })[targetLevel];
  if (!arcanumLevel) return "";
  const existing = new Set((character.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
  const available = (SPELL_LISTS[character.edition]?.Warlock?.[arcanumLevel] || []).filter(name => !existing.has(name));
  return `<section class="advancement-section">
    <h3>Choose a level ${arcanumLevel} Mystic Arcanum</h3>
    <p>This spell is gained through Mystic Arcanum, separate from your Pact Magic spell slots.</p>
    <div class="progression-choice" data-min-choices="1" data-choice-name="mysticArcanum">
      ${optionRadios("mysticArcanum", available, "", true, name => spellDescription(name, character.edition, EXPANDED_SPELL_SOURCES[character.edition]?.[name] || ""))}
    </div>
  </section>`;
}

function updateLevelFeatAbilityOptions(character) {
  const field = $("#level-feat-ability-field");
  const select = $("#level-up-form").elements.levelFeatAbility;
  const featName = $("#level-up-form").elements.levelFeat?.value;
  if (!field || !select || !featName) return;
  const feat = (FEATS[character.edition] || []).find(item => item.name === featName) || { name: featName, category: "Custom" };
  const options = featAbilityOptions(feat, character.edition);
  field.classList.toggle("hidden", !options.length);
  select.innerHTML = abilityOptions(options, options[0]);
}

function openLevelUp(id, targetClass = "") {
  const character = characters.find(item => item.id === id);
  if (!character) return;
  if (!canControlCharacter(character)) { toast("Only the owner or campaign DM can level this sheet"); return; }
  if (characterTotalLevel(character) >= 20) { toast("This character is already level 20"); return; }
  levelingCharacterId = id;
  const currentClasses = classBreakdown(character);
  const availableClasses = Object.keys(RULES.classes);
  levelUpClassName = targetClass && availableClasses.includes(targetClass) ? targetClass : levelUpClassName && availableClasses.includes(levelUpClassName) ? levelUpClassName : primaryClassName(character);
  const currentTotalLevel = characterTotalLevel(character);
  const targetLevel = currentTotalLevel + 1;
  const currentClassLevel = classLevel(character, levelUpClassName);
  const targetClassLevel = currentClassLevel + 1;
  const context = withClassContext(character, levelUpClassName, currentClassLevel);
  const features = levelFeatures(character, targetLevel, levelUpClassName);
  const fixedGain = Math.max(1, Math.ceil(RULES.classes[levelUpClassName].hit / 2) + 1 + modifier(character.CON));
  const classSelect = `<label class="level-class-picker">Class to advance<select name="levelClass" id="level-class-select">
    <optgroup label="Current classes">${currentClasses.map(entry => `<option value="${escapeHtml(entry.name)}" ${entry.name === levelUpClassName ? "selected" : ""}>${escapeHtml(entry.name)} ${entry.level} → ${entry.level + 1}</option>`).join("")}</optgroup>
    <optgroup label="Add multiclass">${availableClasses.filter(name => !currentClasses.some(entry => entry.name === name)).map(name => `<option value="${escapeHtml(name)}" ${name === levelUpClassName ? "selected" : ""}>Add ${escapeHtml(name)} 1</option>`).join("")}</optgroup>
  </select><small>Total character level ${currentTotalLevel} → ${targetLevel}. New multiclass levels do not grant starting saving throws.</small></label>`;
  $("#level-up-title").textContent = `${character.name} reaches level ${targetLevel}`;
  $("#level-up-subtitle").textContent = `${character.edition} ${levelUpClassName} progression · class level ${currentClassLevel} → ${targetClassLevel}.`;
  $("#level-track").innerHTML = `<div class="level-node">${currentTotalLevel}</div><span>→</span><div class="level-node current">${targetLevel}</div>`;
  $("#level-up-content").innerHTML = `
    <section class="advancement-section">
      <h3>Choose class path</h3>
      <p>Advance an existing class, or add a new class level for a multiclass character.</p>
      ${classSelect}
    </section>
    <section class="advancement-section">
      <h3>Features gained</h3>
      <p>These features are gained automatically at this level.</p>
      <div class="unlock-list">${features.map(feature => `<article class="unlock-card"><span class="check">✓</span><div><strong>${escapeHtml(feature.name)}</strong><small>${escapeHtml(feature.source)}</small>${ruleDetails(featureDescription(character.edition, feature.source, feature.name, feature.className || levelUpClassName))}</div></article>`).join("") || `<article class="unlock-card"><span class="check">✓</span><div><strong>Core progression</strong><small>Proficiency, spell slots, or existing features may improve.</small></div></article>`}</div>
    </section>
    <section class="advancement-section">
      <h3>Hit points</h3>
      <p>Use the class fixed value or roll the ${levelUpClassName}'s d${RULES.classes[levelUpClassName].hit} Hit Die.</p>
      <div class="progression-choice">
        ${optionRadios("hpMethod", [`Fixed (+${fixedGain} HP)`, "Roll Hit Die"], `Fixed (+${fixedGain} HP)`)}
        <div class="hidden" id="hp-roll-controls">
          <label>Hit Die result<input name="hpRoll" type="number" min="1" max="${RULES.classes[levelUpClassName].hit}" value="${Math.ceil(RULES.classes[levelUpClassName].hit / 2)}"></label>
          <button type="button" class="button small ghost" id="roll-level-hp">Roll d${RULES.classes[levelUpClassName].hit}</button>
        </div>
      </div>
    </section>
    ${progressionChoiceBlocks(character, targetLevel, features, levelUpClassName) ? `<section class="advancement-section"><h3>Decisions at ${levelUpClassName} level ${targetClassLevel}</h3><p>Complete each choice to continue.</p>${progressionChoiceBlocks(character, targetLevel, features, levelUpClassName)}</section>` : ""}
    ${levelCantripChoices(context, targetClassLevel)}
    ${levelSpellChoices(context, targetClassLevel)}
    ${mysticArcanumChoices(context, targetClassLevel)}
    <div class="level-up-summary"><strong>Ready to advance?</strong><br>This updates the character to level ${targetLevel}. Direct Edit remains available afterward.</div>`;
  updateLevelFeatAbilityOptions(context);
  $("#level-up-modal").classList.remove("hidden");
}

function closeLevelUp() {
  levelingCharacterId = null;
  levelUpClassName = "";
  $("#level-up-modal").classList.add("hidden");
}

function progressionSnapshot(character) {
  const keys = ["level", "classes", "className", "hpOverride", "subclass", "customSubclass", "subclassChoices", "feats", "spells", "preparedSpells", "preparedSpellClasses", "fightingStyle", "fightingStyles", "pactBoon", "metamagic", "invocations", "skillProficiencies", "backgroundSkills", "expertise", "weaponMastery", "divineOrder", "primalOrder", "blessedStrikes", "elementalFury", "resourceUsage", "baseAbilities", "originBonuses", "originFeat", "featAbilityChoices", "featBonuses", "speciesVariant", "backgroundAbilityMode", "backgroundPrimary", "backgroundSecondary", "originFeatChoice", ...ABILITIES];
  return Object.fromEntries(keys.map(name => [name, structuredClone(character[name])]));
}

let pendingConfirm = null;
function confirmAction(options) {
  const opts = options || {};
  const modal = $("#confirm-modal");
  if (!modal) { if (opts.onConfirm) opts.onConfirm(); return; }
  $("#confirm-title").textContent = opts.title || "Are you sure?";
  $("#confirm-message").textContent = opts.message || "";
  const ok = $("#confirm-ok");
  ok.textContent = opts.confirmLabel || "Confirm";
  ok.classList.toggle("danger", Boolean(opts.danger));
  pendingConfirm = opts.onConfirm || null;
  modal.classList.remove("hidden");
  ok.focus();
}
function closeConfirm() { $("#confirm-modal")?.classList.add("hidden"); pendingConfirm = null; }

function delevelCharacter(id) {
  const character = characters.find(item => item.id === id);
  if (!character || characterTotalLevel(character) <= 1) return;
  if (!canControlCharacter(character)) { toast("Only the owner or campaign DM can delevel this sheet"); return; }
  confirmAction({
    title: "Delevel character?",
    message: `Return ${character.name} from level ${character.level} to level ${character.level - 1}? Choices gained at the current level will be rolled back.`,
    confirmLabel: "Delevel",
    onConfirm: () => {
      const updated = structuredClone(character);
      const history = [...(updated.progressionHistory || [])];
      const last = history.at(-1);
      if (last?.level === updated.level && last.before) {
        Object.entries(last.before).forEach(([name, value]) => {
          if (value === undefined) delete updated[name];
          else updated[name] = structuredClone(value);
        });
        history.pop();
      } else {
        const entries = classBreakdown(updated);
        const lastEntry = entries.at(-1);
        if (lastEntry) lastEntry.level -= 1;
        updated.classes = entries.filter(entry => entry.level > 0);
        updated.level = Math.max(1, characterTotalLevel(updated));
        const allowedByClass = new Map(classBreakdown(updated).map(entry => [entry.name, maxSpellLevel(entry.name, entry.level, updated.edition, classSubclassName(updated, entry.name))]));
        updated.spells = (updated.spells || []).filter(spell => {
          const spellClass = typeof spell === "string" ? primaryClassName(updated) : spell.className || primaryClassName(updated);
          return Number(typeof spell === "string" ? 0 : spell.level) <= Number(allowedByClass.get(spellClass) ?? 0);
        });
        if (last?.level > updated.level) history.pop();
      }
      updated.progressionHistory = history;
      reconcilePreparedSpells(updated, updated);
      updated.updatedAt = Date.now();
      characters[characters.findIndex(item => item.id === id)] = updated;
      persistCharacters();
      activeCharacterId = id;
      renderCards();
      renderSheet();
      toast(`${updated.name} returned to level ${updated.level}`);
    }
  });
}

function autoLevelCharacter(id, targetClass = "") {
  const character = characters.find(item => item.id === id);
  if (!character) return;
  if (!canControlCharacter(character)) { toast("Only the owner or campaign DM can auto level this sheet"); return; }
  if (characterTotalLevel(character) >= 20) { toast("This character is already level 20"); return; }
  const availableClasses = Object.keys(RULES.classes);
  const levelClass = targetClass && availableClasses.includes(targetClass) ? targetClass : primaryClassName(character);
  const targetLevel = characterTotalLevel(character) + 1;
  const before = progressionSnapshot(character);
  const updated = characterWithClassLevelGain(character, levelClass);
  const targetClassLevel = classLevel(updated, levelClass);
  const cls = RULES.classes[levelClass];
  const previousHp = derived(character).hp;
  const fixedGain = Math.max(1, Math.ceil(cls.hit / 2) + 1 + modifier(character.CON));
  const choices = { autoLevel: true };
  updated.level = targetLevel;
  if (character.hpOverride) updated.hpOverride = previousHp + fixedGain;
  const subclassUnlock = subclassLevel(levelClass, updated.edition);
  const existingSubclass = classSubclassName(updated, levelClass);
  if (targetClassLevel >= subclassUnlock && !existingSubclass) {
    const selectedSubclass = defaultSubclassFor(levelClass, targetClassLevel, updated.edition);
    if (selectedSubclass) {
      setClassEntry(updated, levelClass, { subclass: selectedSubclass, customSubclass: "" });
      if (levelClass === updated.className) updated.subclass = selectedSubclass;
      choices.subclass = selectedSubclass;
    }
  }
  const selectedEntry = classEntry(updated, levelClass) || {};
  const selectedSubclass = classSubclassName(updated, levelClass);
  const subclassChoices = { ...(selectedEntry.subclassChoices || {}) };
  (SUBCLASS_CHOICE_RULES[selectedSubclass] || []).forEach(choice => {
    if (targetClassLevel < Number(choice.level || 1)) return;
    if (choice.editions && !choice.editions.includes(updated.edition)) return;
    if (!subclassChoices[choice.key] && choice.options?.length) subclassChoices[choice.key] = choice.options[0];
  });
  if (Object.keys(subclassChoices).length) {
    setClassEntry(updated, levelClass, { subclassChoices });
    if (levelClass === updated.className) updated.subclassChoices = subclassChoices;
    choices.subclassChoices = { ...subclassChoices };
  }
  const profile = QUICK_BUILD_PROFILES[levelClass] || QUICK_BUILD_PROFILES.Fighter;
  const classChoices = prebuildClassChoices(levelClass, targetClassLevel, profile);
  const masteryTarget = weaponMasteryCount(levelClass, targetClassLevel, updated.edition);
  const masteryPool = [...(profile.masteries || []), ...weaponMasteryOptions(levelClass)];
  const mastery = [...new Set([...(updated.weaponMastery || []), ...masteryPool])].slice(0, masteryTarget);
  if (mastery.length > (updated.weaponMastery || []).length) choices.weaponMastery = mastery.filter(name => !(updated.weaponMastery || []).includes(name));
  updated.weaponMastery = mastery;
  if (classChoices.fightingStyle && !updated.fightingStyle) {
    updated.fightingStyle = classChoices.fightingStyle;
    choices.fightingStyle = classChoices.fightingStyle;
  }
  ["divineOrder", "primalOrder", "blessedStrikes", "elementalFury"].forEach(name => {
    if (classChoices[name] && !updated[name]) {
      updated[name] = classChoices[name];
      choices[name] = classChoices[name];
    }
  });
  ["invocations", "metamagic"].forEach(name => {
    const targetValues = classChoices[name] || [];
    const current = updated[name] || [];
    const additions = targetValues.filter(value => !current.includes(value));
    if (additions.length) {
      updated[name] = [...current, ...additions];
      choices[name] = additions;
    }
  });
  const levelRules = LEVEL_CHOICE_RULES[updated.edition]?.[levelClass] || {};
  const expertiseCount = Number(levelRules.expertise?.[targetClassLevel] || 0);
  if (expertiseCount) {
    const trained = [...proficientSkills(updated)];
    const additions = trained.filter(skill => !(updated.expertise || []).includes(skill)).slice(0, expertiseCount);
    if (additions.length) {
      updated.expertise = [...new Set([...(updated.expertise || []), ...additions])];
      choices.expertise = additions;
    }
  }
  if (updated.edition === "2024" && levelClass === "Barbarian" && targetClassLevel === 3) {
    const trained = proficientSkills(updated);
    const skill = CLASS_SKILLS.Barbarian.options.find(option => !trained.has(option));
    if (skill) {
      updated.skillProficiencies = [...new Set([...(updated.skillProficiencies || []), skill])];
      choices.skillProficiencies = [skill];
    }
  }
  applyAutoAdvancement(updated, levelClass, targetClassLevel, choices);
  const spellAdditions = autoSpellChoicesForClass(updated, levelClass, targetClassLevel);
  if (spellAdditions.length) {
    updated.spells = [...(updated.spells || []), ...spellAdditions];
    choices.spells = spellAdditions.map(spell => spell.name);
  }
  reconcilePreparedSpells(updated, character);
  const gained = levelFeatures(character, targetLevel, levelClass).map(feature => `${feature.source}: ${feature.name}`);
  updated.progressionHistory = [...(updated.progressionHistory || []), {
    level: targetLevel,
    className: levelClass,
    classLevel: targetClassLevel,
    date: new Date().toISOString(),
    hpMethod: `Auto fixed (+${fixedGain} HP)`,
    gained,
    choices,
    before
  }];
  updated.updatedAt = Date.now();
  const index = characters.findIndex(item => item.id === updated.id);
  characters[index] = updated;
  activeCharacterId = updated.id;
  persistCharacters();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${updated.name} auto-leveled to ${targetLevel} (${levelClass} ${targetClassLevel})`);
}

function completeLevelUp(event) {
  event.preventDefault();
  const character = characters.find(item => item.id === levelingCharacterId);
  if (!character) return;
  const formElement = event.currentTarget;
  const formValues = new FormData(formElement);
  const levelClass = formValues.get("levelClass") || levelUpClassName || primaryClassName(character);
  const targetLevel = characterTotalLevel(character) + 1;
  const targetClassLevel = classLevel(character, levelClass) + 1;
  for (const block of $$("[data-min-choices]", formElement)) {
    const name = block.dataset.choiceName;
    const required = Number(block.dataset.minChoices);
    const count = formValues.getAll(name).length;
    const labels = { levelCantrips: "cantrip", levelSpells: "spell", mysticArcanum: "Mystic Arcanum", metamagic: "Metamagic option", invocations: "Eldritch Invocation", expertise: "Expertise skill", skillProficiencies: "skill proficiency", weaponMastery: "mastered weapon" };
    const label = labels[name] || `${name} option`;
    if (count < required) { toast(`Choose ${required} ${label}${required > 1 ? "s" : ""}`); return; }
    if (count > required) { toast(`Choose only ${required} ${label}${required > 1 ? "s" : ""}`); return; }
  }
  const before = progressionSnapshot(character);
  const updated = characterWithClassLevelGain(character, levelClass);
  const cls = RULES.classes[levelClass];
  const previousHp = derived(character).hp;
  const fixedGain = Math.max(1, Math.ceil(cls.hit / 2) + 1 + modifier(character.CON));
  const hpMethod = formValues.get("hpMethod") || `Fixed (+${fixedGain} HP)`;
  updated.level = targetLevel;
  if (hpMethod === "Roll Hit Die") {
    const rolled = Math.max(1, Number(formValues.get("hpRoll") || 1));
    updated.hpOverride = previousHp + Math.max(1, rolled + modifier(character.CON));
  } else if (character.hpOverride) {
    updated.hpOverride = previousHp + fixedGain;
  }
  if (formValues.get("subclassChoice")) {
    setClassEntry(updated, levelClass, { subclass: formValues.get("subclassChoice"), customSubclass: "" });
  }
  const choices = {};
  const selectedEntry = classEntry(updated, levelClass) || {};
  const subclassChoices = { ...(selectedEntry.subclassChoices || {}) };
  $$("select[name^='subclassChoice_']", formElement).forEach(select => {
    const key = select.name.replace("subclassChoice_", "");
    if (select.value) subclassChoices[key] = select.value;
  });
  setClassEntry(updated, levelClass, { subclassChoices });
  if (levelClass === updated.className) updated.subclassChoices = subclassChoices;
  if (Object.keys(subclassChoices).length) choices.subclassChoices = { ...subclassChoices };
  const fightingStyle = formValues.get("fightingStyle");
  if (fightingStyle) {
    choices.fightingStyle = fightingStyle;
    if (!updated.fightingStyle) updated.fightingStyle = fightingStyle;
    else updated.fightingStyles = [...new Set([...(updated.fightingStyles || []), fightingStyle])];
  }
  const pactBoon = formValues.get("pactBoon");
  if (pactBoon) { choices.pactBoon = pactBoon; updated.pactBoon = pactBoon; }
  ["metamagic", "invocations", "expertise", "skillProficiencies", "weaponMastery"].forEach(name => {
    const values = formValues.getAll(name);
    if (values.length) {
      choices[name] = values;
      updated[name] = [...new Set([...(updated[name] || []), ...values])];
    }
  });
  ["divineOrder", "primalOrder", "blessedStrikes", "elementalFury"].forEach(name => {
    const value = formValues.get(name);
    if (value) { updated[name] = value; choices[name] = value; }
  });
  const advancementType = formValues.get("advancementType");
  if (advancementType === "Ability Score Improvement") {
    const first = formValues.get("abilityIncreaseOne");
    const second = formValues.get("abilityIncreaseTwo");
    updated.asiBonuses = { ...(updated.asiBonuses || Object.fromEntries(ABILITIES.map(ability => [ability, 0]))) };
    updated.asi = updated.asi && Object.keys(updated.asi).length ? JSON.parse(JSON.stringify(updated.asi)) : asiStateFromBonuses(updated.asiBonuses);
    updated.baseAbilities = { ...(updated.baseAbilities || Object.fromEntries(ABILITIES.map(ability => [
      ability,
      Number(updated[ability] || 10)
        - Number(updated.originBonuses?.[ability] || 0)
        - Number(updated.featBonuses?.[ability] || 0)
        - Number(updated.asiBonuses?.[ability] || 0)
    ]))) };
    const applied = [];
    const appliedAbilities = [];
    [first, second].forEach(ability => {
      if (!ABILITIES.includes(ability)) return;
      const before = Number(updated[ability] || 10);
      if (before >= 20) return;
      updated[ability] = before + 1;
      updated.asiBonuses[ability] = Number(updated.asiBonuses[ability] || 0) + 1;
      applied.push(`${ability} +1`);
      appliedAbilities.push(ability);
    });
    if (!applied.length) {
      toast("Choose an ability score below 20 for the ASI");
      return;
    }
    const nextSlot = String(Object.keys(updated.asi).reduce((max, key) => Math.max(max, Number(key)), -1) + 1);
    updated.asi[nextSlot] = { mode: "asi", one: appliedAbilities[0] || "", two: appliedAbilities[1] || "" };
    choices.advancement = applied.join(", ");
  } else if (advancementType === "Feat") {
    const feat = formValues.get("levelFeat");
    if (feat) {
      const featRecord = (FEATS[updated.edition] || []).find(item => item.name === feat) || { name: feat, category: "Custom" };
      const allowedAbilities = featAbilityOptions(featRecord, updated.edition);
      const featAbility = formValues.get("levelFeatAbility");
      if (allowedAbilities.length && !allowedAbilities.includes(featAbility)) {
        toast("Choose an ability allowed by that feat");
        return;
      }
      updated.feats = [...new Set([...(updated.feats || []), feat])];
      if (featAbility) {
        const maximum = featRecord.category === "Epic Boon" ? 30 : 20;
        updated[featAbility] = Math.min(maximum, Number(updated[featAbility]) + 1);
        updated.featAbilityChoices = { ...(updated.featAbilityChoices || {}), [feat]: featAbility };
        updated.featBonuses = { ...(updated.featBonuses || Object.fromEntries(ABILITIES.map(ability => [ability, 0]))) };
        updated.featBonuses[featAbility] = Number(updated.featBonuses[featAbility] || 0) + 1;
      }
      updated.asiBonuses = { ...(updated.asiBonuses || Object.fromEntries(ABILITIES.map(ability => [ability, 0]))) };
      updated.asi = updated.asi && Object.keys(updated.asi).length ? JSON.parse(JSON.stringify(updated.asi)) : asiStateFromBonuses(updated.asiBonuses);
      const nextSlot = String(Object.keys(updated.asi).reduce((max, key) => Math.max(max, Number(key)), -1) + 1);
      updated.asi[nextSlot] = { mode: "feat", one: "", two: "", feat };
      choices.advancement = `Feat: ${feat}${featAbility ? ` (${featAbility} +1)` : ""}`;
    }
  }
  const addedCantrips = formValues.getAll("levelCantrips");
  const arcanum = formValues.get("mysticArcanum");
  const replaceSpellOld = formValues.get("replaceSpellOld");
  const replaceSpellNew = formValues.get("replaceSpellNew");
  if (Boolean(replaceSpellOld) !== Boolean(replaceSpellNew)) {
    toast("Choose both the spell to replace and its replacement");
    return;
  }
  if (replaceSpellOld && replaceSpellNew) {
    const spellContext = withClassContext(updated, levelClass, targetClassLevel);
    const lists = spellListsFor(updated.edition, levelClass, subclassName(spellContext)) || {};
    const replacementLevel = Number(Object.entries(lists).find(([, names]) => names.includes(replaceSpellNew))?.[0] || 0);
    updated.spells = characterSpellRecords(updated).filter(spell => !(spell.className === levelClass && spell.name === replaceSpellOld));
    if (!updated.spells.some(spell => spell.className === levelClass && spell.name === replaceSpellNew)) {
      updated.spells.push({ name: replaceSpellNew, className: levelClass, level: replacementLevel });
    }
    choices.spellReplacement = `${replaceSpellOld} -> ${replaceSpellNew}`;
  }
  const addedSpells = [...addedCantrips, ...formValues.getAll("levelSpells"), ...(arcanum ? [arcanum] : [])];
  if (addedSpells.length) {
    const spellContext = withClassContext(updated, levelClass, targetClassLevel);
    const lists = spellListsFor(updated.edition, levelClass, subclassName(spellContext)) || {};
    const spellRecords = addedSpells.map(name => ({
      name,
      className: levelClass,
      level: Number(Object.entries(lists).find(([, names]) => names.includes(name))?.[0] || 0)
    }));
    const existingNames = new Set((updated.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
    updated.spells = [...(updated.spells || []), ...spellRecords.filter(spell => !existingNames.has(spell.name))];
    choices.spells = addedSpells;
    if (arcanum) choices.mysticArcanum = arcanum;
  }
  reconcilePreparedSpells(updated, character);
  const gained = levelFeatures(character, targetLevel, levelClass).map(feature => `${feature.source}: ${feature.name}`);
  updated.progressionHistory = [...(updated.progressionHistory || []), {
    level: targetLevel,
    className: levelClass,
    classLevel: targetClassLevel,
    date: new Date().toISOString(),
    hpMethod,
    gained,
    choices,
    before
  }];
  updated.updatedAt = Date.now();
  const index = characters.findIndex(item => item.id === updated.id);
  characters[index] = updated;
  activeCharacterId = updated.id;
  persistCharacters();
  closeLevelUp();
  renderCards();
  renderSheet();
  navigate("sheet");
  toast(`${updated.name} is now level ${targetLevel} (${levelClass} ${targetClassLevel})`);
}

function resetCanvasFromPortrait() {
  if (!portraitData) { resetPortrait(); return; }
  const image = new Image();
  image.onload = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height); updatePreview(); };
  image.src = portraitData;
}

function roll(sides = selectedDie, count = 1, mod = 0, label = "", mode = selectedRollMode) {
  sides = Math.max(2, Number(sides || 20));
  count = Math.max(1, Number(count || 1));
  mod = Number(mod || 0);
  mode = mode || "normal";
  let rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
  let chosen = rolls.reduce((sum, value) => sum + value, 0);
  let modeLabel = "";
  if (mode === "advantage" || mode === "disadvantage") {
    rolls = [Math.floor(Math.random() * sides) + 1, Math.floor(Math.random() * sides) + 1];
    chosen = mode === "advantage" ? Math.max(...rolls) : Math.min(...rolls);
    count = 1;
    modeLabel = mode === "advantage" ? " (advantage)" : " (disadvantage)";
  }
  const total = chosen + mod;
  const detail = mode === "normal"
    ? `${count}d${sides}${mod ? signed(mod) : ""} [${rolls.join(", ")}]`
    : `2d${sides}${mod ? signed(mod) : ""} [${rolls.join(", ")} → ${chosen}]`;
  const entry = { total, detail, label: (label || "Custom roll") + modeLabel, time: Date.now() };
  rollHistory.unshift(entry); rollHistory = rollHistory.slice(0, 40); saveJson(ROLL_KEY, rollHistory); renderRolls();
  animateDiceResult({ rollValue: chosen, total, sides, label: entry.label, detail });
  const overlayData = { label: label || `d${sides} roll`, modifier: mod, rolls, d20s: rolls, chosen, faceValue: chosen, total, mode, sides, count };
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && dicePhysicsEnabled() && $("#dice-stage")) rollPhysics(chosen, () => showRollOverlay({ ...overlayData, settled: true }), sides);
  else showRollOverlay(overlayData);
  return total;
}

function animateDiceResult({ rollValue, total, sides, label, detail }) {
  const panel = $("#dice-result");
  const number = $("#dice-result strong");
  const copy = $("#dice-result p");
  if (!panel || !number || !copy) return;
  panel.classList.remove("rolling");
  void panel.offsetWidth;
  panel.classList.add("rolling");
  copy.textContent = "Rolling...";
  let ticks = 0;
  clearInterval(animateDiceResult.timer);
  animateDiceResult.timer = setInterval(() => {
    number.textContent = Math.floor(Math.random() * Math.max(2, Number(sides || 20))) + 1;
    if (++ticks > 16) {
      clearInterval(animateDiceResult.timer);
      number.textContent = rollValue;
      copy.textContent = `${label} - raw ${rollValue}${total !== rollValue ? ` - total ${total}` : ""} - ${detail}`;
      panel.classList.remove("rolling");
      panel.classList.add("landed");
      setTimeout(() => panel.classList.remove("landed"), 900);
    }
  }, 42);
}

function renderRolls() {
  $("#roll-history").innerHTML = rollHistory.length ? rollHistory.map(r =>
    `<li><span>${escapeHtml(r.label)}<br><small>${escapeHtml(r.detail)}</small></span><strong>${r.total}</strong></li>`
  ).join("") : `<li><span>No rolls yet</span><strong>—</strong></li>`;
}

let currentRollContext = null;
let rollOverlayTimer = null;
let rollOverlayHideTimer = null;
// Roll a d20 check/save/skill and show the animated result in place (no page change).
function rollOnSheet(label, modifier, mode, options = {}) {
  mode = mode || "normal";
  modifier = Number(modifier || 0);
  let d20s = [Math.floor(Math.random() * 20) + 1];
  let chosen = d20s[0];
  if (mode === "advantage" || mode === "disadvantage") {
    d20s = [Math.floor(Math.random() * 20) + 1, Math.floor(Math.random() * 20) + 1];
    chosen = mode === "advantage" ? Math.max(...d20s) : Math.min(...d20s);
  }
  const total = chosen + modifier;
  const modeLabel = mode === "advantage" ? " (advantage)" : mode === "disadvantage" ? " (disadvantage)" : "";
  const detail = `1d20${modifier ? signed(modifier) : ""} [${d20s.join(", ")}${mode !== "normal" ? " → " + chosen : ""}]`;
  const entry = { total, detail, label: (label || "Roll") + modeLabel, time: Date.now() };
  rollHistory.unshift(entry); rollHistory = rollHistory.slice(0, 40); saveJson(ROLL_KEY, rollHistory); renderRolls();
  if (options.campaignId) {
    recordCampaignGameLog(options.campaignId, {
      source: options.source || "sheet",
      characterId: options.characterId || "",
      label: entry.label,
      rolls: d20s,
      rawTotal: chosen,
      modifier,
      total,
      visibility: options.visibility || "public"
    });
  }
  if ($("#dice-result strong")) {
    $("#dice-result strong").textContent = chosen;
    $("#dice-result p").textContent = `${entry.label} - raw ${chosen}${total !== chosen ? ` - total ${total}` : ""} - ${detail}`;
  }
  const overlayData = { label: label || "Roll", modifier, rolls: d20s, d20s, chosen, faceValue: chosen, total, mode, sides: 20, count: 1 };
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && dicePhysicsEnabled() && $("#dice-stage")) rollPhysics(chosen, () => showRollOverlay({ ...overlayData, settled: true }), 20);
  else showRollOverlay(overlayData);
  return total;
}

function dicePhysicsEnabled() {
  try { return localStorage.getItem("af-dice-physics") !== "0"; } catch (e) { return true; }
}

// Original 2D physics dice roll: the d20 drops in and tumbles/bounces off the
// walls and floor (gravity + restitution + friction), differently each time,
// before settling on the rolled value.
let diceRaf = null, diceFadeTimer = null;
function rollPhysics(finalValue, onSettle, sides = 20) {
  const stage = $("#dice-stage"), die = $("#dice-stage-die"), num = $("#dice-stage-num");
  if (!stage || !die || !num) { if (onSettle) onSettle(); return; }
  sides = Math.max(2, Number(sides || 20));
  const animationMax = Math.max(sides, Number(finalValue) || sides);
  cancelAnimationFrame(diceRaf); clearTimeout(diceFadeTimer);
  die.style.transition = "";
  stage.hidden = false;
  stage.classList.remove("landed", "crit", "fumble");
  const size = 72;
  const W = stage.clientWidth || window.innerWidth;
  const H = stage.clientHeight || 260;
  let x = Math.random() * Math.max(40, W - size - 80) + 30;
  let y = -size - 8;
  let vx = (Math.random() - 0.5) * 26;
  let vy = Math.random() * 3 + 2.5;
  let rot = Math.random() * 360;
  let vr = (Math.random() - 0.5) * 60;
  const g = 1.05, rest = 0.6, fric = 0.82, floor = H - size, wallR = Math.max(0, W - size);
  let restCount = 0, last = performance.now(), startT = last, tick = 0, settled = false;
  function step(now) {
    let dt = (now - last) / 16.67; last = now; if (dt > 2.5) dt = 2.5;
    vy += g * dt; x += vx * dt; y += vy * dt; rot += vr * dt;
    if (x < 0) { x = 0; vx = -vx * rest; vr *= -fric; }
    else if (x > wallR) { x = wallR; vx = -vx * rest; vr *= -fric; }
    if (y >= floor) {
      y = floor; vy = -vy * rest; vx *= fric; vr *= fric;
      if (Math.abs(vy) < 3 && Math.abs(vx) < 1.4) restCount += dt; else restCount = 0;
    } else restCount = 0;
    if ((Math.abs(vx) + Math.abs(vy)) > 2.5 && (++tick % 2 === 0)) num.textContent = Math.floor(Math.random() * animationMax) + 1;
    die.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    if ((restCount > 16 || now - startT > 3200) && !settled) {
      settled = true;
      num.textContent = finalValue;
      const upright = Math.round(rot / 360) * 360;
      die.style.transition = "transform .16s ease-out";
      die.style.transform = `translate(${x}px, ${floor}px) rotate(${upright}deg)`;
      stage.classList.add("landed");
      if (sides === 20 && finalValue === 20) stage.classList.add("crit");
      else if (finalValue === 1) stage.classList.add("fumble");
      if (onSettle) onSettle();
      diceFadeTimer = setTimeout(() => { stage.hidden = true; stage.classList.remove("landed", "crit", "fumble"); }, 2200);
      return;
    }
    diceRaf = requestAnimationFrame(step);
  }
  diceRaf = requestAnimationFrame(step);
}

function showRollOverlay(r) {
  const overlay = $("#roll-overlay");
  if (!overlay) return;
  const sides = Number(r.sides || 20);
  const rolls = Array.isArray(r.rolls) ? r.rolls : Array.isArray(r.d20s) ? r.d20s : [r.chosen];
  const faceValue = Number(r.faceValue ?? r.chosen ?? r.total);
  const animationMax = Math.max(sides, faceValue || sides);
  const allowsRollMode = sides === 20 && Number(r.count || 1) === 1;
  currentRollContext = allowsRollMode ? { label: r.label, modifier: r.modifier, sides } : null;
  const rollModeControls = overlay.querySelector(".roll-adv");
  if (rollModeControls) rollModeControls.hidden = !allowsRollMode;
  $("#roll-overlay-label").textContent = r.label;
  const parts = [r.d20s.length > 1 ? `rolled ${r.d20s.join(" & ")} → ${r.chosen}` : `d${sides}`];
  parts[0] = rolls.length > 1 ? `rolled ${rolls.join(" & ")} -> ${r.chosen}` : `rolled ${faceValue} on d${sides}`;
  if (r.modifier) parts.push(signed(r.modifier));
  if (r.mode === "advantage") parts.push("· advantage");
  else if (r.mode === "disadvantage") parts.push("· disadvantage");
  $("#roll-overlay-detail").textContent = parts.join(" ");
  overlay.hidden = false;
  overlay.classList.remove("crit", "fumble");
  const die = $("#roll-die"), num = $("#roll-die-num"), totalEl = $("#roll-total");
  die.classList.remove("spin"); void die.offsetWidth; die.classList.add("spin");
  totalEl.textContent = "";
  clearInterval(rollOverlayTimer);
  if (r.settled) {
    die.classList.remove("spin");
    num.textContent = faceValue;
    totalEl.textContent = r.total;
    if (sides === 20 && faceValue === 20 && (r.mode !== "normal" || Number(r.count || 1) === 1)) overlay.classList.add("crit");
    else if (faceValue === 1) overlay.classList.add("fumble");
    clearTimeout(rollOverlayHideTimer);
    rollOverlayHideTimer = setTimeout(() => { overlay.hidden = true; }, 8000);
    return;
  }
  let ticks = 0;
  rollOverlayTimer = setInterval(() => {
    num.textContent = Math.floor(Math.random() * animationMax) + 1;
    if (++ticks > 14) {
      clearInterval(rollOverlayTimer);
      num.textContent = faceValue;
      totalEl.textContent = r.total;
      if (sides === 20 && faceValue === 20 && (r.mode !== "normal" || Number(r.count || 1) === 1)) overlay.classList.add("crit");
      else if (faceValue === 1) overlay.classList.add("fumble");
    }
  }, 45);
  clearTimeout(rollOverlayHideTimer);
  rollOverlayHideTimer = setTimeout(() => { overlay.hidden = true; }, 8000);
}

function saveResourceUsage(character, resourceId, used) {
  const resource = resourceDefinitions(character).find(item => item.id === resourceId);
  if (!resource) return;
  character.resourceUsage = { ...(character.resourceUsage || {}), [resourceId]: Math.min(resource.max, Math.max(0, used)) };
  character.updatedAt = Date.now();
  persistCharacters();
  renderSheet();
  renderCampaigns();
}

function applyCharacterRest(character, restType) {
  const usage = { ...(character.resourceUsage || {}) };
  resourceDefinitions(character).forEach(resource => {
    const used = resourceUsed(character, resource);
    if (restType === "long" && resource.longRecovery === "all") usage[resource.id] = 0;
    else if (restType === "long" && Number(resource.longRecovery) > 0) usage[resource.id] = Math.max(0, used - Number(resource.longRecovery));
    else if (restType === "long") usage[resource.id] = 0;
    else if (resource.shortRecovery === "all") usage[resource.id] = 0;
    else if (Number(resource.shortRecovery) > 0) usage[resource.id] = Math.max(0, used - Number(resource.shortRecovery));
  });
  character.resourceUsage = usage;
  if (restType === "long") {
    character.currentHp = derived(character).hp;
    character.temporaryHp = 0;
    character.deathSaves = { successes: 0, failures: 0 };
  }
  character.updatedAt = Date.now();
  persistCharacters();
  renderSheet();
  renderCampaigns();
  toast(`${restType === "short" ? "Short" : "Long"} rest resources restored`);
}

function initDice() {
  $("#dice-buttons").innerHTML = [4, 6, 8, 10, 12, 20, 100].map(d => `<button class="die ${d === 20 ? "active" : ""}" data-die="${d}">d${d}</button>`).join("");
  renderRolls();
}

function initEvents() {
  window.addEventListener("hashchange", () => navigate(routeViewFromHash(), { updateHash: false }));
  document.addEventListener("click", event => {
    const creationMethod = event.target.closest("[data-creation-method]");
    if (creationMethod) {
      showCreationMethod(creationMethod.dataset.creationMethod);
      return;
    }
    const quickClassButton = event.target.closest("[data-quick-class]");
    if (quickClassButton) {
      quickClass = quickClassButton.dataset.quickClass;
      renderQuickClasses();
      renderQuickOrigin(true);
      return;
    }
    const quickStepButton = event.target.closest("[data-quick-step]");
    if (quickStepButton) {
      setQuickStep(Number(quickStepButton.dataset.quickStep));
      return;
    }
    const premadeCreate = event.target.closest("[data-premade-create]");
    if (premadeCreate) {
      createPremadeCharacter(premadeCreate.dataset.premadeCreate);
      return;
    }
    if (event.target.closest("#prebuild-create")) {
      createPrebuiltCharacter();
      return;
    }
    if (event.target.closest("#prebuild-surprise")) {
      surprisePrebuild();
      return;
    }
    if (event.target.closest("#prebuild-name-generator")) {
      if ($("#prebuild-name")) $("#prebuild-name").value = generateQuickName(false);
      renderPrebuildSummary();
      return;
    }
    const helpChipEl = event.target.closest(".help-chip");
    if (helpChipEl) { event.preventDefault(); showHelpPopover(helpChipEl); return; }
    if (!event.target.closest(".help-popover")) hideHelpPopover();
    const sheetSection = event.target.closest("[data-sheet-section]");
    if (sheetSection) {
      activeSheetSection = sheetSection.dataset.sheetSection;
      renderSheet();
      return;
    }
    const sheetJump = event.target.closest("[data-sheet-section-jump]");
    if (sheetJump) {
      activeSheetSection = sheetJump.dataset.sheetSectionJump;
      renderSheet();
      return;
    }
    const manageSpells = event.target.closest("[data-manage-spells]");
    if (manageSpells) {
      openSpellManager(manageSpells.dataset.character, manageSpells.dataset.manageSpells);
      return;
    }
    if (event.target.closest("[data-spell-manager-cancel]")) { closeSpellManager(); return; }
    if (event.target.closest("[data-spell-manager-save]")) { saveSpellManager(); return; }
    const spellbookSpell = event.target.closest("[data-spellbook-spell]");
    if (spellbookSpell && spellManagerState?.policy === "spellbook") {
      const name = spellbookSpell.dataset.spellbookSpell;
      if (spellManagerState.bookDraft.has(name)) {
        spellManagerState.bookDraft.delete(name);
        spellManagerState.draft.delete(name);
      } else {
        spellManagerState.bookDraft.add(name);
      }
      renderSheet();
      return;
    }
    const managedSpell = event.target.closest("[data-manage-spell]");
    if (managedSpell && spellManagerState) {
      const name = managedSpell.dataset.manageSpell;
      if (managedSpell.checked) spellManagerState.draft.add(name);
      else spellManagerState.draft.delete(name);
      renderSheet();
      return;
    }
    const hpAction = event.target.closest("[data-hp-action]");
    if (hpAction) {
      const character = characters.find(item => item.id === hpAction.dataset.character);
      if (!character) return;
      const maximum = derived(character).hp;
      const current = Math.max(0, Math.min(maximum, Number(character.currentHp ?? maximum)));
      const amount = Math.max(1, Number(hpAction.closest(".session-hp")?.querySelector("[data-hp-amount]")?.value || 1));
      if (hpAction.dataset.hpAction === "damage") {
        const absorbed = Math.min(Number(character.temporaryHp || 0), amount);
        character.temporaryHp = Math.max(0, Number(character.temporaryHp || 0) - absorbed);
        character.currentHp = Math.max(0, current - (amount - absorbed));
      }
      if (hpAction.dataset.hpAction === "heal") character.currentHp = Math.min(maximum, current + amount);
      if (hpAction.dataset.hpAction === "temp") character.temporaryHp = amount;
      saveSessionCharacter(character);
      return;
    }
    const inspiration = event.target.closest("[data-inspiration]");
    if (inspiration) {
      const character = characters.find(item => item.id === inspiration.dataset.character);
      if (!character) return;
      character.inspiration = !character.inspiration;
      saveSessionCharacter(character);
      return;
    }
    const conditionButton = event.target.closest("[data-condition]");
    if (conditionButton) {
      const character = characters.find(item => item.id === conditionButton.dataset.character);
      if (!character) return;
      const conditions = new Set(character.conditions || []);
      conditions.has(conditionButton.dataset.condition) ? conditions.delete(conditionButton.dataset.condition) : conditions.add(conditionButton.dataset.condition);
      character.conditions = [...conditions];
      saveSessionCharacter(character);
      return;
    }
    const deathSave = event.target.closest("[data-death-save]");
    if (deathSave) {
      const character = characters.find(item => item.id === deathSave.dataset.character);
      if (!character) return;
      const type = deathSave.dataset.deathSave;
      const index = Number(deathSave.dataset.deathIndex);
      const saves = { successes: 0, failures: 0, ...(character.deathSaves || {}) };
      saves[type] = index < saves[type] ? index : index + 1;
      character.deathSaves = saves;
      saveSessionCharacter(character);
      return;
    }
    const inventoryOpen = event.target.closest("[data-inventory-open]");
    if (inventoryOpen) {
      openInventory(inventoryOpen.dataset.inventoryOpen);
      return;
    }
    const itemAction = event.target.closest("[data-item-action]");
    if (itemAction) {
      const character = characters.find(item => item.id === itemAction.dataset.character);
      const item = character?.inventory?.find(entry => entry.id === itemAction.dataset.itemId);
      if (!character || !item) return;
      const action = itemAction.dataset.itemAction;
      if (action === "increase") item.quantity = Number(item.quantity || 1) + 1;
      if (action === "decrease") {
        item.quantity = Math.max(0, Number(item.quantity || 1) - 1);
        if (!item.quantity) character.inventory = character.inventory.filter(entry => entry.id !== item.id);
      }
      if (action === "carry") item.carried = item.carried === false;
      if (action === "equip") item.equipped = !item.equipped;
      if (action === "attune") {
        const attunedCount = character.inventory.filter(entry => entry.attuned).length;
        if (!item.attuned && attunedCount >= 3) { toast("A character can normally attune to three items"); return; }
        item.attuned = !item.attuned;
      }
      if (action === "delete") character.inventory = character.inventory.filter(entry => entry.id !== item.id);
      saveInventoryCharacter(character);
      return;
    }
    const resourceControl = event.target.closest("[data-resource-pip], [data-resource-remaining], [data-resource-reset], [data-rest]");
    const resourceCharacterId = resourceControl?.dataset.character;
    if (resourceControl && resourceCharacterId) {
      const character = characters.find(item => item.id === resourceCharacterId);
      if (!character) return;
      if (resourceControl.dataset.rest) {
        applyCharacterRest(character, resourceControl.dataset.rest);
        return;
      }
      const resourceId = resourceControl.dataset.resource || resourceControl.dataset.resourceReset;
      const resource = resourceDefinitions(character).find(item => item.id === resourceId);
      if (!resource) return;
      const used = resourceUsed(character, resource);
      if (resourceControl.dataset.resourceReset) saveResourceUsage(character, resourceId, 0);
      else if (resourceControl.dataset.resourcePip !== undefined) {
        const index = Number(resourceControl.dataset.resourcePip);
        saveResourceUsage(character, resourceId, index < used ? index : index + 1);
      } else {
        const remainingDelta = Number(resourceControl.dataset.resourceRemaining);
        saveResourceUsage(character, resourceId, used - remainingDelta);
      }
      return;
    }
    const campaignSelect = event.target.closest("[data-campaign-select]");
    if (campaignSelect) {
      activeCampaignId = campaignSelect.dataset.campaignSelect;
      renderCampaigns();
      return;
    }
    const copyInvite = event.target.closest("[data-copy-invite]");
    if (copyInvite) {
      navigator.clipboard?.writeText(copyInvite.dataset.copyInvite);
      toast("Invite code copied");
      return;
    }
    const campaignDelete = event.target.closest("[data-campaign-delete]");
    if (campaignDelete) {
      const campaign = campaigns.find(item => item.id === campaignDelete.dataset.campaignDelete);
      confirmAction({
        title: "Delete campaign?",
        message: `This permanently removes ${campaign?.name || "this campaign"} for everyone. Character sheets remain in their owners' vaults.`,
        confirmLabel: "Delete campaign",
        danger: true,
        onConfirm: () => deleteCampaign(campaignDelete.dataset.campaignDelete)
      });
      return;
    }
    const partyRoll = event.target.closest("[data-campaign-roll-party]");
    if (partyRoll) {
      const campaignId = partyRoll.dataset.campaignRollParty;
      const links = campaignCharacters.filter(link => link.campaign_id === campaignId);
      const rolled = links
        .map(link => characters.find(item => item.id === link.character_id && characterOwnerId(item) === link.owner_user_id))
        .filter(Boolean);
      rolled.forEach(character => {
        const stats = derived(character);
        rollOnSheet(`${character.name} Initiative`, stats.initiative, stats.initiativeAdvantage ? "advantage" : "normal", { campaignId, characterId: character.id, source: "campaign" });
      });
      toast(rolled.length ? `Rolled initiative for ${rolled.length} character${rolled.length === 1 ? "" : "s"}` : "No synced character sheets to roll");
      return;
    }
    const campaignRoll = event.target.closest("[data-campaign-roll]");
    if (campaignRoll) {
      const character = characters.find(item => item.id === campaignRoll.dataset.campaignRoll && characterOwnerId(item) === campaignRoll.dataset.owner);
      if (!character) { toast("That shared sheet is still syncing"); return; }
      const campaign = campaigns.find(item => item.id === activeCampaignId);
      rollOnSheet(`${character.name} ${campaignRoll.dataset.rollLabel || "Roll"}`, Number(campaignRoll.dataset.modifier || 0), campaignRoll.dataset.rollMode || "normal", { campaignId: campaign?.id || "", characterId: character.id, source: "campaign" });
      return;
    }
    const campaignOpen = event.target.closest("[data-campaign-open-character]");
    if (campaignOpen) {
      const ownerId = campaignOpen.dataset.owner;
      const character = characters.find(item => item.id === campaignOpen.dataset.campaignOpenCharacter && characterOwnerId(item) === ownerId);
      if (character) {
        activeCharacterId = character.id;
        navigate("sheet");
      }
      return;
    }
    const campaignRemove = event.target.closest("[data-campaign-remove-character]");
    if (campaignRemove) {
      removeCampaignCharacter(campaignRemove.dataset.campaign, campaignRemove.dataset.owner, campaignRemove.dataset.campaignRemoveCharacter);
      return;
    }
    const campaignFocus = event.target.closest("[data-campaign-focus]");
    if (campaignFocus) {
      const target = campaignFocus.dataset.campaignFocus === "maps"
        ? $(".campaign-map-panel")
        : $(".campaign-share-form");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const mapSelect = event.target.closest("[data-campaign-map-select]");
    if (mapSelect) {
      activeMapId = mapSelect.dataset.campaignMapSelect;
      selectedMapToken = null;
      renderCampaigns();
      return;
    }
    const mapAddTokens = event.target.closest("[data-campaign-map-add-tokens]");
    if (mapAddTokens) {
      ensureCampaignMapTokens(mapAddTokens.dataset.campaignMapAddTokens);
      return;
    }
    const mapDelete = event.target.closest("[data-campaign-map-delete]");
    if (mapDelete) {
      confirmAction({
        title: "Delete map?",
        message: "This removes the encounter map for everyone in the campaign.",
        confirmLabel: "Delete map",
        danger: true,
        onConfirm: () => deleteCampaignMap(mapDelete.dataset.campaignMapDelete)
      });
      return;
    }
    const mapTool = event.target.closest("[data-map-tool]");
    if (mapTool) {
      selectedMapTool = mapTool.dataset.mapTool || "token";
      if (selectedMapTool !== "ruler") selectedMapRulerStart = null;
      renderCampaigns();
      return;
    }
    const mapTile = event.target.closest("[data-map-tile]");
    if (mapTile) {
      selectedMapTile = mapTile.dataset.mapTile || selectedMapTile;
      selectedMapTool = "paint";
      renderCampaigns();
      return;
    }
    const logRefresh = event.target.closest("[data-campaign-log-refresh]");
    if (logRefresh) {
      loadCampaigns();
      return;
    }
    const mapSession = event.target.closest("[data-map-session]");
    if (mapSession) {
      if (mapSession.disabled) return;
      setCampaignMapSession(mapSession.dataset.mapId, mapSession.dataset.mapSession);
      return;
    }
    const mapFog = event.target.closest("[data-map-fog]");
    if (mapFog) {
      updateCampaignFog(mapFog.dataset.mapId, mapFog.dataset.mapFog);
      return;
    }
    const mapTokenSizeButton = event.target.closest("[data-map-token-size]");
    if (mapTokenSizeButton) {
      if (mapTokenSizeButton.disabled) return;
      selectedMapToken = mapTokenSizeButton.dataset.tokenId;
      activeMapId = mapTokenSizeButton.dataset.mapId || activeMapId;
      selectedMapTool = "token";
      resizeCampaignMapToken(mapTokenSizeButton.dataset.mapId, mapTokenSizeButton.dataset.tokenId, Number(mapTokenSizeButton.dataset.mapTokenSize || 0));
      return;
    }
    const mapTokenHide = event.target.closest("[data-map-token-toggle-hidden]");
    if (mapTokenHide) {
      const map = campaignMapById(mapTokenHide.dataset.mapId);
      const token = normalizeMapData(map?.data).tokens.find(item => item.id === mapTokenHide.dataset.mapTokenToggleHidden);
      if (token) updateCampaignMapToken(map.id, token.id, { hidden: !token.hidden }, token.hidden ? "Token revealed" : "Token hidden");
      return;
    }
    const mapTokenRename = event.target.closest("[data-map-token-rename]");
    if (mapTokenRename) {
      const map = campaignMapById(mapTokenRename.dataset.mapId);
      const token = normalizeMapData(map?.data).tokens.find(item => item.id === mapTokenRename.dataset.mapTokenRename);
      if (!token) return;
      const nextName = prompt("Token name", token.name || "Token");
      if (nextName !== null) updateCampaignMapToken(map.id, token.id, { name: String(nextName).trim() || token.name || "Token" }, "Token renamed");
      return;
    }
    const mapTokenColor = event.target.closest("[data-map-token-color]");
    if (mapTokenColor) {
      const map = campaignMapById(mapTokenColor.dataset.mapId);
      const token = normalizeMapData(map?.data).tokens.find(item => item.id === mapTokenColor.dataset.mapTokenColor);
      if (!token) return;
      const nextColor = prompt("Border/token color hex", token.color || tokenColor(token.name || "Token"));
      if (nextColor !== null) updateCampaignMapToken(map.id, token.id, { color: String(nextColor).trim() || token.color || tokenColor(token.name || "Token") }, "Token color updated");
      return;
    }
    const mapTokenDelete = event.target.closest("[data-map-token-delete]");
    if (mapTokenDelete) {
      confirmAction({
        title: "Delete token?",
        message: "This removes the token from this map, but does not delete the character sheet.",
        confirmLabel: "Delete token",
        danger: true,
        onConfirm: () => deleteCampaignMapToken(mapTokenDelete.dataset.mapId, mapTokenDelete.dataset.mapTokenDelete)
      });
      return;
    }
    const mapToken = event.target.closest("[data-map-token-select]");
    if (mapToken) {
      if (mapToken.disabled) return;
      selectedMapToken = mapToken.dataset.mapTokenSelect;
      activeMapId = mapToken.dataset.mapId || activeMapId;
      selectedMapTool = "token";
      renderCampaigns();
      return;
    }
    const mapBoard = event.target.closest("[data-campaign-map-board]");
    if (mapBoard && !event.target.closest("[data-map-token-select]")) {
      const map = campaignMapById(mapBoard.dataset.campaignMapBoard);
      if (!map) return;
      const data = normalizeMapData(map.data);
      const rect = mapBoard.getBoundingClientRect();
      const rawX = (event.clientX - rect.left) / data.gridSize;
      const rawY = (event.clientY - rect.top) / data.gridSize;
      const x = data.gridEnabled ? Math.floor(rawX) : rawX;
      const y = data.gridEnabled ? Math.floor(rawY) : rawY;
      const cellX = Math.floor(rawX);
      const cellY = Math.floor(rawY);
      if (canEditCampaign(map.campaign_id) && selectedMapTool === "paint") paintCampaignMapTile(map.id, selectedMapTile, cellX, cellY, "paint");
      else if (canEditCampaign(map.campaign_id) && selectedMapTool === "erase") paintCampaignMapTile(map.id, selectedMapTile, cellX, cellY, "erase");
      else if (canEditCampaign(map.campaign_id) && (selectedMapTool === "fog-paint" || selectedMapTool === "fog-erase")) updateCampaignFog(map.id, selectedMapTool, cellX, cellY);
      else if (selectedMapTool === "ping") addCampaignMapPing(map.id, x, y);
      else if (selectedMapTool === "ruler") {
        if (!selectedMapRulerStart) {
          selectedMapRulerStart = { mapId: map.id, x, y };
          toast("Ruler start set. Click a destination square.");
        } else {
          const dx = x - selectedMapRulerStart.x;
          const dy = y - selectedMapRulerStart.y;
          const distance = Math.round(Math.sqrt(dx * dx + dy * dy) * data.scale.feetPerSquare);
          toast(`Distance: ${distance} ft`);
          selectedMapRulerStart = null;
        }
      }
      else if (selectedMapToken) moveCampaignMapToken(map.id, selectedMapToken, x, y);
      return;
    }
    const nav = event.target.closest("[data-view]"); if (nav) { if (nav.dataset.view === "builder") startNewCharacter(); navigate(nav.dataset.view); }
    const go = event.target.closest("[data-go]"); if (go) { if (go.dataset.go === "builder") startNewCharacter(); navigate(go.dataset.go); }
    const link = event.target.closest("[data-view-link]"); if (link) { event.preventDefault(); navigate(link.dataset.viewLink); }
    const classButton = event.target.closest("[data-class]");
    if (classButton) { selectedClass = classButton.dataset.class; selectedSpellLevel = 0; selectedSpellNames.clear(); $("#class-choice-fields").innerHTML = ""; $$(".class-option").forEach(b => b.classList.toggle("selected", b === classButton)); populateSubclasses(); renderTalentChoices(); renderStartingEquipmentChoices(); updatePreview(); }
    const spellLevel = event.target.closest("[data-spell-level]");
    if (spellLevel) { selectedSpellLevel = Number(spellLevel.dataset.spellLevel); $("#spell-search").value = ""; renderTalentChoices(); }
    const step = event.target.closest("[data-step]"); if (step) setStep(Number(step.dataset.step));
    const card = event.target.closest("[data-character-id]");
    if (card && !event.target.closest(".card-actions")) { activeCharacterId = card.dataset.characterId; navigate("sheet"); }
    const edit = event.target.closest("[data-edit]"); if (edit) editCharacter(edit.dataset.edit);
    const autoLevel = event.target.closest("[data-auto-level]"); if (autoLevel && !autoLevel.disabled) autoLevelCharacter(autoLevel.dataset.autoLevel);
    const levelUp = event.target.closest("[data-level-up]"); if (levelUp && !levelUp.disabled) openLevelUp(levelUp.dataset.levelUp);
    const delevel = event.target.closest("[data-delevel]"); if (delevel && !delevel.disabled) delevelCharacter(delevel.dataset.delevel);
    const del = event.target.closest("[data-delete]");
    if (del) {
      const deleteId = del.dataset.delete;
      const deleting = characters.find(character => character.id === deleteId);
      if (deleting && !isOwnCharacter(deleting)) { toast("Remove shared sheets from the campaign instead of deleting them"); return; }
      confirmAction({
        title: "Delete character?",
        message: "This removes the character from your vault on every synchronized device.",
        confirmLabel: "Delete",
        danger: true,
        onConfirm: () => {
          rememberCharacterDeletion(deleteId);
          characters = characters.filter(c => c.id !== deleteId);
          persistCharacters();
          renderCards($("#vault-search").value);
          renderSheet();
          toast("Character deleted");
        }
      });
    }
    const sheetRoll = event.target.closest("[data-sheet-roll]");
    if (sheetRoll) { rollOnSheet(sheetRoll.dataset.sheetRoll, Number(sheetRoll.dataset.modifier || 0), sheetRoll.dataset.rollMode || "normal"); return; }
    const spellRoll = event.target.closest("[data-spell-roll]");
    if (spellRoll) {
      roll(Number(spellRoll.dataset.sides), Number(spellRoll.dataset.count), Number(spellRoll.dataset.modifier || 0), spellRoll.dataset.rollLabel || "Spell roll", "normal");
      return;
    }
  });
  document.addEventListener("change", event => {
    const target = event.target.closest("#prebuild-class, #prebuild-subclass, #prebuild-species, #prebuild-background, #prebuild-level");
    if (!target) return;
    if (target.id === "prebuild-class") {
      prebuildClass = target.value;
      prebuildSubclass = defaultSubclassFor(prebuildClass, Number($("#prebuild-level")?.value || 1));
      renderPrebuildOptions(true);
      return;
    }
    if (target.id === "prebuild-subclass") prebuildSubclass = target.value;
    if (target.id === "prebuild-level") renderPrebuildOptions(false);
    else renderPrebuildSummary();
  });
  document.addEventListener("input", event => {
    if (event.target.closest("#prebuild-name, #prebuild-player")) renderPrebuildSummary();
    if (event.target.closest("#prebuild-level")) renderPrebuildOptions(false);
  });
  form.addEventListener("input", event => {
    if (ABILITIES.includes(event.target.name)) {
      enforceAbilityCaps();
      updateAbilityMethodStatus();
      renderTalentChoices();
    }
    updatePreview();
    if (event.target.name === "level") {
      populateSubclasses();
      renderTalentChoices();
    }
  });
  form.addEventListener("change", event => {
    if (event.target.name === "abilityMethod") {
      setAbilityMethod(event.target.value);
      return;
    }
    if (event.target.name === "startingEquipmentMode") {
      updateEquipmentMethodUI();
      renderStartingEquipmentChoices();
      updatePreview();
      return;
    }
    if (event.target.name === "startingEquipment") {
      updatePreview();
    }
    if (ABILITIES.includes(event.target.name)) {
      enforceAbilityCaps();
      updateAbilityMethodStatus();
      renderTalentChoices();
      updatePreview();
    }
    if (event.target.name === "spells") {
      event.target.checked ? selectedSpellNames.add(event.target.value) : selectedSpellNames.delete(event.target.value);
      const { cantripLimit, spellLimit } = spellLimitContext();
      const counts = selectedSpellCounts();
      const spellLevel = Number(event.target.dataset.level || 0);
      const overLimit = event.target.checked && (spellLevel === 0 ? counts.cantrips > cantripLimit : counts.spells > spellLimit);
      if (overLimit) {
        event.target.checked = false;
        selectedSpellNames.delete(event.target.value);
        toast(spellLevel === 0 ? `Choose up to ${cantripLimit} cantrip${cantripLimit === 1 ? "" : "s"}` : `Choose up to ${spellLimit} leveled spell${spellLimit === 1 ? "" : "s"}`);
      }
      renderTalentChoices();
      updatePreview();
    }
    if (event.target.name === "feats") event.target.checked ? selectedFeatNames.add(event.target.value) : selectedFeatNames.delete(event.target.value);
    if (event.target.dataset.featAbility) {
      selectedFeatAbilities[event.target.dataset.featAbility] = event.target.value;
      updatePreview();
    }
    if (event.target.name === "subclass") {
      updateSubclassMeta();
      renderStartingClassOptions();
      renderClassFeaturePreview();
      renderTalentChoices();
    }
    if (event.target.name?.startsWith("subclassChoice_")) {
      renderClassFeaturePreview();
      updatePreview();
    }
    if (["species", "background", "speciesVariant", "backgroundAbilityMode"].includes(event.target.name)) {
      renderOriginRules();
      renderTalentChoices();
    } else if (event.target.closest("#origin-rules")) {
      setCurrentOriginFeat(originFeatFromForm());
      renderTalentChoices();
      updatePreview();
    }
    if (event.target.type === "checkbox" && event.target.checked) {
      const block = event.target.closest("[data-builder-choice-limit]");
      const limit = Number(block?.dataset.builderChoiceLimit || 0);
      const checked = block ? $$(`input[name="${event.target.name}"]:checked`, block) : [];
      if (limit && checked.length > limit) {
        event.target.checked = false;
        toast(`Choose up to ${limit} options`);
      }
    }
  });
  form.elements.level.addEventListener("change", () => { populateSubclasses(); renderTalentChoices(); });
  $("#asi-list").addEventListener("change", event => {
    const modeSelect = event.target.closest("select[data-asi-mode]");
    if (modeSelect) {
      const slot = modeSelect.dataset.asiMode;
      selectedAsi[slot] = selectedAsi[slot] || { one: "", two: "" };
      selectedAsi[slot].mode = modeSelect.value;
      if (modeSelect.value !== "asi") {
        selectedAsi[slot].one = "";
        selectedAsi[slot].two = "";
      }
      renderAsiChoices();
      updatePreview();
      return;
    }
    const select = event.target.closest("select[data-asi-slot]");
    if (!select) return;
    selectedAsi[select.dataset.asiSlot] = selectedAsi[select.dataset.asiSlot] || { one: "", two: "" };
    selectedAsi[select.dataset.asiSlot].mode = "asi";
    selectedAsi[select.dataset.asiSlot][select.dataset.asiPart] = select.value;
    updatePreview();
  });
  $("#feat-search").addEventListener("input", () => renderTalentChoices());
  $("#spell-search").addEventListener("input", () => renderSpellList());
  $("#close-inventory").addEventListener("click", closeInventory);
  $("#inventory-modal").addEventListener("click", event => { if (event.target.id === "inventory-modal") closeInventory(); });
  $("#confirm-ok")?.addEventListener("click", () => { const cb = pendingConfirm; closeConfirm(); if (cb) cb(); });
  $("#confirm-cancel")?.addEventListener("click", closeConfirm);
  $("#confirm-modal")?.addEventListener("click", event => { if (event.target.id === "confirm-modal") closeConfirm(); });
  $("#item-search").addEventListener("input", event => renderItemTemplates(event.target.value));
  $("#item-template").addEventListener("change", event => applyItemTemplate(event.target.value));
  $("#save-currency").addEventListener("click", () => {
    const character = characters.find(item => item.id === inventoryCharacterId);
    if (!character) return;
    character.currency = Object.fromEntries(["cp","sp","ep","gp","pp"].map(coin => [coin, Math.max(0, Number($(`#currency-${coin}`).value || 0))]));
    saveInventoryCharacter(character);
    toast("Currency updated");
  });
  $("#inventory-form").addEventListener("submit", event => {
    event.preventDefault();
    const character = characters.find(item => item.id === inventoryCharacterId);
    if (!character) return;
    const name = $("#item-name").value.trim();
    if (!name) { toast("Enter an item name"); return; }
    const entry = {
      id: crypto.randomUUID(),
      name,
      type: $("#item-type").value.trim() || "Item",
      quantity: Math.max(1, Number($("#item-quantity").value || 1)),
      weight: Math.max(0, Number($("#item-weight").value || 0)),
      cost: $("#item-cost").value.trim(),
      notes: $("#item-notes").value.trim(),
      carried: $("#item-carried").checked,
      equipped: $("#item-equipped").checked,
      attuned: $("#item-attuned").checked
    };
    if (entry.attuned && (character.inventory || []).filter(item => item.attuned).length >= 3) {
      toast("A character can normally attune to three items");
      return;
    }
    character.inventory = [...(character.inventory || []), entry];
    saveInventoryCharacter(character);
    $("#inventory-form").reset();
    $("#item-carried").checked = true;
    $("#item-search").value = "";
    renderItemTemplates();
    toast(`${name} added to inventory`);
  });
  $("#create-campaign-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    createCampaign(String(values.name || "").trim(), String(values.description || "").trim());
    event.currentTarget.reset();
  });
  $("#join-campaign-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget));
    joinCampaign(String(values.inviteCode || ""));
    event.currentTarget.reset();
  });
  $("#campaign-detail")?.addEventListener("submit", event => {
    const formEl = event.target.closest("[data-campaign-share]");
    const mapCreate = event.target.closest("[data-campaign-map-create]");
    const mapSettings = event.target.closest("[data-campaign-map-settings]");
    const tileCreate = event.target.closest("[data-campaign-tile-create]");
    if (!formEl && !mapCreate && !mapSettings && !tileCreate) return;
    event.preventDefault();
    const targetForm = formEl || mapCreate || mapSettings || tileCreate;
    const values = Object.fromEntries(new FormData(targetForm));
    if (formEl) shareCharacterWithCampaign(formEl.dataset.campaignShare, values.characterId);
    if (mapCreate) createCampaignMap(mapCreate.dataset.campaignMapCreate, values);
    if (mapSettings) updateCampaignMapSettings(mapSettings.dataset.campaignMapSettings, values);
    if (tileCreate) addCampaignCustomTile(tileCreate.dataset.campaignTileCreate, values);
  });
  $("#campaign-detail")?.addEventListener("change", event => {
    const tileUpload = event.target.closest("[data-campaign-tile-upload]");
    const upload = event.target.closest("[data-campaign-map-upload]") || tileUpload;
    if (!upload) return;
    const file = upload.files?.[0];
    const status = upload.closest("label")?.querySelector(tileUpload ? "[data-tile-upload-status]" : "[data-map-upload-status]");
    if (!file) {
      if (tileUpload) campaignTileImageDraft = "";
      else campaignMapImageDraft = "";
      if (status) status.textContent = "No image selected";
      return;
    }
    if (file.size > 2_500_000) {
      upload.value = "";
      if (tileUpload) campaignTileImageDraft = "";
      else campaignMapImageDraft = "";
      if (status) status.textContent = "Image is too large for cloud sync";
      toast("Use an image under 2.5 MB, or paste an image URL");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (tileUpload) campaignTileImageDraft = String(reader.result || "");
      else campaignMapImageDraft = String(reader.result || "");
      if (status) status.textContent = `${file.name} ready`;
    };
    reader.readAsDataURL(file);
  });
  $("#refresh-campaigns")?.addEventListener("click", loadCampaigns);
  $("#campaign-sign-in")?.addEventListener("click", () => {
    updateAccount();
    $("#account-modal").classList.remove("hidden");
  });
  $("#next-step").addEventListener("click", () => setStep(currentStep + 1));
  $("#prev-step").addEventListener("click", () => setStep(currentStep - 1));
  $("#dismiss-welcome")?.addEventListener("click", () => { try { localStorage.setItem("af-welcome-dismissed", "1"); } catch (e) {} $("#welcome-tip")?.setAttribute("hidden", ""); });
  showWelcomeIfNeeded();
  const helpToggle = $("#toggle-help");
  if (helpToggle) {
    let helpOff = false;
    try { helpOff = localStorage.getItem("af-help-off") === "1"; } catch (e) {}
    const applyHelp = () => {
      document.body.classList.toggle("help-off", helpOff);
      helpToggle.textContent = `Beginner help: ${helpOff ? "off" : "on"}`;
      helpToggle.setAttribute("aria-pressed", String(!helpOff));
    };
    applyHelp();
    helpToggle.addEventListener("click", () => {
      helpOff = !helpOff;
      try { localStorage.setItem("af-help-off", helpOff ? "1" : "0"); } catch (e) {}
      if (helpOff) hideHelpPopover();
      applyHelp();
    });
  }
  // --- Dice settings: color "skin" + on-screen physics roll toggle ---
  (function initDiceSettings() {
    let skin = "gold";
    try { skin = localStorage.getItem("af-dice-skin") || "gold"; } catch (e) {}
    if (skin && skin !== "gold") document.body.setAttribute("data-dice", skin);
    $$("#dice-skins [data-dice-skin]").forEach(b => b.classList.toggle("active", b.dataset.diceSkin === skin));
    $("#dice-skins")?.addEventListener("click", event => {
      const btn = event.target.closest("[data-dice-skin]");
      if (!btn) return;
      const value = btn.dataset.diceSkin;
      if (value === "gold") document.body.removeAttribute("data-dice");
      else document.body.setAttribute("data-dice", value);
      try { localStorage.setItem("af-dice-skin", value); } catch (e) {}
      $$("#dice-skins [data-dice-skin]").forEach(b => b.classList.toggle("active", b === btn));
    });
    const physToggle = $("#dice-physics-toggle");
    if (physToggle) {
      physToggle.checked = dicePhysicsEnabled();
      physToggle.addEventListener("change", () => {
        try { localStorage.setItem("af-dice-physics", physToggle.checked ? "1" : "0"); } catch (e) {}
      });
    }
    $("#dice-test-roll")?.addEventListener("click", () => rollOnSheet("Test roll", 0, "normal"));
  })();
  $$(".edition-toggle button").forEach(button => button.addEventListener("click", () => {
    edition = button.dataset.edition; selectedSpellLevel = 0; currentOriginFeat = ""; selectedSpellNames.clear(); selectedFeatNames.clear(); selectedFeatAbilities = {}; selectedAsi = {}; $("#class-choice-fields").innerHTML = ""; $$(".edition-toggle button").forEach(b => b.classList.toggle("active", b === button)); populateRules(); updatePreview();
    if (!$("#quick-builder").classList.contains("hidden")) initializeQuickBuilder();
    if (!$("#prebuild-builder")?.classList.contains("hidden")) initializePrebuildBuilder();
    if (!$("#premade-builder")?.classList.contains("hidden")) renderPremadeHeroes();
  }));
  $("#quick-next").addEventListener("click", () => setQuickStep(quickStep + 1));
  $("#quick-back").addEventListener("click", () => setQuickStep(quickStep - 1));
  $("#quick-surprise").addEventListener("click", surpriseQuickBuild);
  $("#quick-name-generator").addEventListener("click", () => { generateQuickName(true); renderQuickSummary(); });
  $("#quick-create").addEventListener("click", createQuickCharacter);
  $("#quick-species").addEventListener("change", renderQuickOrigin);
  $("#quick-background").addEventListener("change", renderQuickOrigin);
  $("#quick-level")?.addEventListener("input", renderQuickSummary);
  $("#quick-level")?.addEventListener("change", renderQuickSummary);
  $("#quick-name").addEventListener("input", renderQuickSummary);
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!validateAbilityScores()) return;
    const data = formData();
    if (!data.name.trim()) { setStep(1); form.elements.name.focus(); toast("Your character needs a name"); return; }
    if (!validateOriginChoices()) { setStep(3); toast("Choose different eligible abilities and complete the origin feat selection"); return; }
    const primaryEditLevel = classLevel(data, data.className) || data.level;
    const skillRule = classSkillRuleAtLevel(data.className, primaryEditLevel, data.edition, data.subclass);
    if (data.skillProficiencies.length !== skillRule.count) {
      setStep(2);
      toast(`Choose ${skillRule.count} class skill proficiencies`);
      return;
    }
    if (data.backgroundSkills.length !== 2 || new Set(data.backgroundSkills).size !== 2) {
      setStep(3);
      toast("Choose two different background skill proficiencies");
      return;
    }
    const trainedSkills = new Set([...data.skillProficiencies, ...data.backgroundSkills]);
    if (data.expertise.some(skill => !trainedSkills.has(skill))) {
      setStep(2);
      toast("Expertise must be assigned to a proficient skill");
      return;
    }
    const expertiseRequired = expertiseCountAtLevel(data.className, primaryEditLevel, data.edition);
    if (data.expertise.length !== expertiseRequired) {
      setStep(2);
      toast(`Choose ${expertiseRequired} skills for Expertise`);
      return;
    }
    const masteryRequired = weaponMasteryCount(data.className, primaryEditLevel, data.edition);
    if (data.weaponMastery.length !== masteryRequired) { setStep(2); toast(`Choose ${masteryRequired} mastered weapon${masteryRequired === 1 ? "" : "s"}`); return; }
    const spellIssue = spellSelectionIssue(data);
    if (spellIssue) { setStep(5); toast(spellIssue); return; }
    data.id = activeCharacterId && activeCharacterId !== "demo-lyra" ? activeCharacterId : crypto.randomUUID();
    clearCharacterDeletion(data.id);
    data.updatedAt = Date.now();
    const index = characters.findIndex(c => c.id === data.id);
    if (index >= 0) characters[index] = { ...characters[index], ...data }; else characters.unshift(data);
    activeCharacterId = data.id;
    const saved = persistCharacters();
    renderCards();
    renderSheet();
    toast(saved ? `${data.name} saved to the vault` : "Character updated on this page, but browser storage is full. Remove old exports/images or sign in before refreshing.");
    navigate("sheet");
  });
  $("#portrait-upload").addEventListener("change", event => {
    const file = event.target.files[0]; if (!file) return;
    if (file.size > 4 * 1024 * 1024) { toast("Please choose an image under 4 MB"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImageCover(ctx, image, canvas.width, canvas.height);
        setPortraitFromCanvas();
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  $("#draw-portrait").addEventListener("click", () => { drawEnabled = !drawEnabled; $("#draw-portrait").textContent = drawEnabled ? "Drawing on" : "Draw"; $("#draw-hint").textContent = drawEnabled ? "Drag on the portrait to sketch." : "Upload an image, or draw directly on the portrait."; });
  $("#clear-portrait").addEventListener("click", resetPortrait);
  const point = event => {
    const rect = canvas.getBoundingClientRect();
    const source = event.touches ? event.touches[0] : event;
    return { x: (source.clientX - rect.left) * canvas.width / rect.width, y: (source.clientY - rect.top) * canvas.height / rect.height };
  };
  const startDraw = event => { if (!drawEnabled) return; drawing = true; const p = point(event); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
  const moveDraw = event => { if (!drawing || !drawEnabled) return; event.preventDefault(); const p = point(event); ctx.strokeStyle = "#342a22"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.lineTo(p.x, p.y); ctx.stroke(); setPortraitFromCanvas(); };
  const endDraw = () => { drawing = false; };
  canvas.addEventListener("pointerdown", startDraw); canvas.addEventListener("pointermove", moveDraw); window.addEventListener("pointerup", endDraw);
  $("#dice-buttons").addEventListener("click", event => {
    const die = event.target.closest("[data-die]"); if (!die) return; selectedDie = Number(die.dataset.die); $$(".die").forEach(d => d.classList.toggle("active", d === die));
  });
  $("#dice-mode")?.addEventListener("click", event => {
    const mode = event.target.closest("[data-dice-mode]");
    if (!mode) return;
    selectedRollMode = mode.dataset.diceMode || "normal";
    $$("[data-dice-mode]", $("#dice-mode")).forEach(button => button.classList.toggle("active", button === mode));
    $("#dice-count").disabled = selectedRollMode !== "normal";
  });
  $("#roll-selected").addEventListener("click", () => roll(selectedDie, Number($("#dice-count").value), Number($("#dice-mod").value), `d${selectedDie} roll`, selectedRollMode));
  $("#quick-roll").addEventListener("click", () => rollOnSheet("Quick d20", 0, "normal"));
  $("#roll-overlay-close")?.addEventListener("click", () => { const ov = $("#roll-overlay"); if (ov) ov.hidden = true; });
  $("#roll-overlay")?.addEventListener("click", event => {
    const adv = event.target.closest("[data-roll-mode]");
    if (adv && currentRollContext) roll(currentRollContext.sides || 20, 1, currentRollContext.modifier, currentRollContext.label, adv.dataset.rollMode);
  });
  $("#clear-history").addEventListener("click", () => { rollHistory = []; saveJson(ROLL_KEY, []); renderRolls(); });
  $("#vault-search").addEventListener("input", event => renderCards(event.target.value));
  $("#export-data").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ version: 1, characters }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "dnd-beyonder-vault.json"; link.click(); URL.revokeObjectURL(link.href);
  });
  $("#import-data").addEventListener("change", event => {
    const file = event.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data.characters)) throw new Error();
        writeRecoverySnapshot("before vault import");
        const importedIds = new Set(data.characters.map(character => character.id));
        characters.filter(character => !importedIds.has(character.id)).forEach(character => rememberCharacterDeletion(character.id));
        characters = data.characters.map(character => ({ ...character, updatedAt: Number(character.updatedAt || Date.now()) }));
        characters.forEach(character => clearCharacterDeletion(character.id));
        persistCharacters();
        writeRecoverySnapshot("vault imported");
        renderCards();
        renderSheet();
        toast("Vault imported");
      }
      catch { toast("That vault file could not be read"); }
    }; reader.readAsText(file);
  });
  $("#account-button").addEventListener("click", () => {
    updateAccount();
    $("#account-modal").classList.remove("hidden");
  });
  $("#close-account").addEventListener("click", () => $("#account-modal").classList.add("hidden"));
  $("#account-modal").addEventListener("click", event => { if (event.target.id === "account-modal") event.currentTarget.classList.add("hidden"); });
  $("#account-modes").addEventListener("click", event => {
    const button = event.target.closest("[data-account-mode]");
    if (button) setAccountMode(button.dataset.accountMode);
  });
  $("#account-form").addEventListener("submit", handleAccountSubmit);
  $("#sync-now").addEventListener("click", async () => {
    $("#sync-now").disabled = true;
    try {
      await syncCharactersToCloud();
      await syncCampaignsToCloud();
      await createAccountBackup("Manual sync backup", { force: true });
      await loadCampaigns();
    } finally {
      $("#sync-now").disabled = false;
    }
  });
  $("#backup-now").addEventListener("click", async () => {
    $("#backup-now").disabled = true;
    try {
      await syncCharactersToCloud();
      await syncCampaignsToCloud();
      await createAccountBackup("Manual backup", { force: true });
      toast("Cloud backup saved");
    } finally {
      $("#backup-now").disabled = false;
    }
  });
  $("#restore-backup").addEventListener("click", () => {
    confirmAction({
      title: "Restore latest cloud backup?",
      message: "This merges the latest account backup into your signed-in vault, then syncs it back to Supabase.",
      confirmLabel: "Restore backup",
      onConfirm: () => restoreLatestAccountBackup()
    });
  });
  $("#sign-out").addEventListener("click", async () => {
    writeRecoverySnapshot("before sign out");
    const localCharacters = characters
      .filter(character => !isDemoCharacter(character) && isOwnCharacter(character))
      .map(character => ({
        ...character,
        cloudOwnerId: undefined,
        _campaignShared: undefined,
        _campaignRole: undefined,
        _campaignIds: undefined
      }));
    if (cloudClient) {
      const { error } = await cloudClient.auth.signOut();
      if (error) setCloudStatus(`Supabase sign-out warning: ${error.message}`, true);
    }
    clearTimeout(cloudBackupTimer);
    cloudUser = null;
    characters = localCharacters;
    campaigns = [];
    campaignMemberships = [];
    campaignCharacters = [];
    campaignMaps = [];
    campaignGameLogs = [];
    activeCampaignId = "";
    activeMapId = "";
    selectedMapToken = null;
    startCampaignLiveSync(false);
    deletedCharacters = {};
    activeCharacterId = characters.some(character => character.id === activeCharacterId) ? activeCharacterId : characters[0]?.id || null;
    saveJson(STORAGE_KEY, characters);
    saveJson(CAMPAIGN_KEY, campaigns);
    saveJson(CAMPAIGN_MEMBER_KEY, campaignMemberships);
    saveJson(CAMPAIGN_CHARACTER_KEY, campaignCharacters);
    saveJson(CAMPAIGN_MAP_KEY, campaignMaps);
    saveJson(CAMPAIGN_LOG_KEY, campaignGameLogs);
    saveJson(DELETED_KEY, deletedCharacters);
    writeRecoverySnapshot("after sign out");
    renderCards();
    renderSheet();
    renderCampaigns();
    updateAccount();
    setBackupStatus("");
    setCloudStatus("Signed out. This browser still has a local copy of the vault.");
    toast("Signed out");
  });
  $("#mobile-menu").addEventListener("click", () => {
    const opened = $(".topnav")?.classList.toggle("open");
    $("#mobile-menu")?.setAttribute("aria-expanded", String(Boolean(opened)));
  });
  $("#close-level-up").addEventListener("click", closeLevelUp);
  $("#cancel-level-up").addEventListener("click", closeLevelUp);
  $("#level-up-modal").addEventListener("click", event => { if (event.target.id === "level-up-modal") closeLevelUp(); });
  $("#level-up-form").addEventListener("submit", completeLevelUp);
  $("#level-up-form").addEventListener("change", event => {
    if (event.target.name === "levelClass") {
      openLevelUp(levelingCharacterId, event.target.value);
      return;
    }
    if (event.target.name === "subclassChoice") {
      const character = characters.find(item => item.id === levelingCharacterId);
      const target = $("#level-subclass-choices");
      if (character && target) {
        const selectedClass = $("#level-class-select")?.value || levelUpClassName || primaryClassName(character);
        const targetClassLevel = classLevel(character, selectedClass) + 1;
        target.innerHTML = levelSubclassChoiceMarkup(withClassContext(character, selectedClass, targetClassLevel), event.target.value, targetClassLevel);
      }
    }
    if (event.target.name === "advancementType") {
      const featMode = event.target.value === "Feat";
      $("#ability-advancement")?.classList.toggle("hidden", featMode);
      $("#feat-advancement")?.classList.toggle("hidden", !featMode);
      if (featMode) {
        const character = characters.find(item => item.id === levelingCharacterId);
        if (character) updateLevelFeatAbilityOptions(character);
      }
    }
    if (event.target.name === "levelFeat") {
      const character = characters.find(item => item.id === levelingCharacterId);
      const selectedClass = $("#level-class-select")?.value || levelUpClassName || primaryClassName(character);
      if (character) updateLevelFeatAbilityOptions(withClassContext(character, selectedClass, classLevel(character, selectedClass)));
    }
    if (event.target.name === "hpMethod") {
      $("#hp-roll-controls")?.classList.toggle("hidden", event.target.value !== "Roll Hit Die");
    }
    if (event.target.dataset.choiceLimit && event.target.checked) {
      const limit = Number(event.target.dataset.choiceLimit);
      const checked = $$(`input[name="${event.target.name}"]:checked`, $("#level-up-form"));
      if (checked.length > limit) { event.target.checked = false; toast(`Choose up to ${limit} options`); }
    }
  });
  $("#level-up-form").addEventListener("click", event => {
    if (event.target.id !== "roll-level-hp") return;
    const character = characters.find(item => item.id === levelingCharacterId);
    if (!character) return;
    const selectedClass = $("#level-class-select")?.value || levelUpClassName || primaryClassName(character);
    const sides = RULES.classes[selectedClass].hit;
    const result = Math.floor(Math.random() * sides) + 1;
    $("#level-up-form").elements.hpRoll.value = result;
    toast(`Rolled ${result} on the d${sides}`);
  });
}

function setAccountMode(mode) {
  accountMode = mode === "signup" ? "signup" : "signin";
  $$("[data-account-mode]").forEach(button => button.classList.toggle("active", button.dataset.accountMode === accountMode));
  $("#display-name-field").classList.toggle("hidden", accountMode !== "signup");
  $("#account-submit").textContent = accountMode === "signup" ? "Create account and sync" : "Sign in and sync";
  const password = $("#account-form").elements.password;
  password.autocomplete = accountMode === "signup" ? "new-password" : "current-password";
}

async function handleAccountSubmit(event) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.currentTarget));
  const displayName = String(values.displayName || values.email.split("@")[0]).trim();
  if (!cloudClient) {
    saveJson(PROFILE_KEY, { displayName, email: values.email });
    updateAccount();
    setCloudStatus("Local profile saved. Add Supabase settings in cloud-config.js to enable cross-device sign-in.", true);
    toast("Profile saved locally");
    return;
  }
  $("#account-submit").disabled = true;
  const result = accountMode === "signup"
    ? await cloudClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: new URL(".", window.location.href).href
        }
      })
    : await cloudClient.auth.signInWithPassword({ email: values.email, password: values.password });
  $("#account-submit").disabled = false;
  if (result.error) { setCloudStatus(cloudAuthErrorMessage(result.error), true); return; }
  if (!result.data.session) {
    saveJson(PROFILE_KEY, { displayName, email: values.email });
    setCloudStatus("Account created. Check your email to confirm it, then sign in.");
    setAccountMode("signin");
    return;
  }
  saveJson(PROFILE_KEY, { displayName, email: values.email });
  cloudUser = result.data.user;
  prepareUserVault(cloudUser);
  updateAccount();
  await syncCharactersToCloud();
  await syncCampaignsToCloud();
  await loadCampaigns();
  await createAccountBackup("Sign-in backup");
  $("#account-modal").classList.add("hidden");
  toast(`Welcome, ${displayName}`);
}

function updateAccount() {
  const signedIn = Boolean(cloudUser);
  const displayName = signedIn ? accountDisplayName("Adventurer") : "";
  $("#account-label").textContent = signedIn ? displayName : "Sign in";
  $(".avatar-mini").textContent = (signedIn ? displayName : "D").charAt(0).toUpperCase();
  $("#account-form").classList.toggle("hidden", signedIn);
  $("#account-modes").classList.toggle("hidden", signedIn);
  $("#sync-now").classList.toggle("hidden", !signedIn);
  $("#backup-now").classList.toggle("hidden", !signedIn);
  $("#restore-backup").classList.toggle("hidden", !signedIn);
  $("#sign-out").classList.toggle("hidden", !signedIn);
  $("#account-description").textContent = signedIn
    ? `Signed in as ${cloudUser.email}. Character changes synchronize to this account.`
    : cloudConfigured()
      ? "Sign in to keep this vault synchronized across devices. A local copy remains available offline."
      : "Cloud sync is ready for configuration. Until Supabase settings are added, characters remain in this browser.";
  if (signedIn) refreshBackupStatus();
  else setBackupStatus("");
  if (!signedIn) setAccountMode(accountMode);
}

async function initCloud() {
  if (!cloudConfigured()) {
    setCloudStatus("Local vault active. Cloud credentials have not been configured.");
    updateAccount();
    return;
  }
  const config = window.ARCANA_CLOUD_CONFIG;
  cloudClient = window.supabase.createClient(config.supabaseUrl, config.supabasePublishableKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    global: { fetch: (...args) => window.fetch(...args) }
  });
  const { data, error } = await cloudClient.auth.getSession();
  if (error) setCloudStatus(cloudAuthErrorMessage(error), true);
  cloudUser = data?.session?.user || null;
  if (cloudUser) prepareUserVault(cloudUser);
  updateAccount();
  if (cloudUser) {
    await syncCharactersToCloud();
    await syncCampaignsToCloud();
    await loadCampaigns();
    await createAccountBackup("Session backup");
  }
  cloudClient.auth.onAuthStateChange((_event, session) => {
    const nextUser = session?.user || null;
    const changed = nextUser?.id !== cloudUser?.id;
    cloudUser = nextUser;
    if (cloudUser) prepareUserVault(cloudUser);
    updateAccount();
    if (changed && cloudUser) setTimeout(async () => {
      await syncCharactersToCloud();
      await syncCampaignsToCloud();
      await loadCampaigns();
      await createAccountBackup("Session backup");
    }, 0);
  });
  window.addEventListener("online", () => {
    if (cloudUser) loadCampaigns();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && cloudUser) loadCampaigns();
  });
}

function seedDemo() {
  if (characters.length) return;
  characters = [{
    id: "demo-lyra", name: "Lyra Moonfall", player: "", pronouns: "she / her", level: 5, edition: "2024",
    demo: true,
    species: "Elf", background: "Sage", alignment: "Neutral Good", campaign: "The Shattered Crown",
    className: "Wizard", subclass: "Evoker", customSubclass: "", STR: 8, DEX: 14, CON: 13, INT: 17, WIS: 12, CHA: 10,
    baseAbilities: { STR: 8, DEX: 14, CON: 12, INT: 15, WIS: 12, CHA: 10 },
    originBonuses: { STR: 0, DEX: 0, CON: 1, INT: 2, WIS: 0, CHA: 0 },
    featBonuses: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    backgroundAbilityMode: "split", backgroundPrimary: "INT", backgroundSecondary: "CON",
    originFeat: "Magic Initiate (Wizard)", feats: ["Magic Initiate (Wizard)"], featAbilityChoices: {},
    acOverride: "", hpOverride: "", portrait: "", backstory: "A stargazer searching for the vanished observatory of her first teacher.", updatedAt: Date.now()
  }];
  persistCharacters();
}

function init() {
  seedDemo(); buildAbilities(); populateRules(); resetPortrait(); initDice(); initTheme(); initEvents(); updatePreview(); updateAccount(); renderCards(); setStep(1); navigate(routeViewFromHash(), { replace: true });
  initCloud();
}
init();
