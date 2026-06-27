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
let levelingCharacterId = null;
let levelUpClassName = "";
let inventoryCharacterId = null;
let activeCharacterId = null;
let activeSheetSection = "overview";
let quickStep = 1;
let quickClass = "Fighter";
let drawing = false;
let drawEnabled = false;
let portraitData = "";
let currentOriginFeat = "";
let accountMode = "signin";
let cloudClient = null;
let cloudUser = null;
let cloudSyncTimer = null;
let characters = readJson(STORAGE_KEY, []);
let campaigns = readJson(CAMPAIGN_KEY, []);
let campaignMemberships = [];
let campaignCharacters = [];
let activeCampaignId = "";
let deletedCharacters = readJson(DELETED_KEY, {});
let rollHistory = readJson(ROLL_KEY, []);
localStorage.removeItem("arcanaForge.ownedContent.v1");

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const form = $("#character-form");
const canvas = $("#portrait-canvas");
const ctx = canvas.getContext("2d");

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function saveJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
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
function characterOwnerId(character) {
  return character?.cloudOwnerId || character?.owner_user_id || cloudUser?.id || "";
}
function isOwnCharacter(character) {
  return !cloudUser || !character?.cloudOwnerId || character.cloudOwnerId === cloudUser.id;
}
function canControlCharacter(character) {
  return isOwnCharacter(character) || character?._campaignRole === "dm";
}
function ownCharacters() {
  return characters.filter(character => !isDemoCharacter(character) && isOwnCharacter(character));
}
function campaignMember(campaignId, userId = cloudUser?.id) {
  return campaignMemberships.find(member => member.campaign_id === campaignId && member.user_id === userId);
}
function campaignRole(campaignId) {
  return campaignMember(campaignId)?.role || "";
}
function generateInviteCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
}
function saveCampaignCache() {
  saveJson(CAMPAIGN_KEY, campaigns);
  if (cloudUser) saveJson(`${CAMPAIGN_KEY}.${cloudUser.id}`, campaigns);
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
function reportCampaignError(error, fallbackMessage, showToast = true) {
  const message = isMissingCampaignSchema(error) ? campaignSetupMessage() : `${fallbackMessage}: ${error.message}`;
  setCloudStatus(message, true);
  if (showToast) toast(message);
}
function persistCharacters() {
  saveJson(STORAGE_KEY, characters);
  if (cloudUser) saveJson(`${STORAGE_KEY}.${cloudUser.id}`, characters);
  if (!cloudUser || !cloudClient) return;
  clearTimeout(cloudSyncTimer);
  cloudSyncTimer = setTimeout(syncCharactersToCloud, 350);
}
async function syncCharactersToCloud() {
  if (!cloudUser || !cloudClient) return;
  const activeRows = characters
    .filter(character => !isDemoCharacter(character)
      && characterTimestamp(character) > deletionTimestamp(character.id)
      && (isOwnCharacter(character) || character._campaignRole === "dm"))
    .map(character => ({
    id: character.id,
    user_id: characterOwnerId(character),
    data: { ...character, cloudOwnerId: characterOwnerId(character), _campaignShared: undefined, _campaignRole: undefined, _campaignIds: undefined },
    is_deleted: false,
    updated_at: new Date(character.updatedAt || Date.now()).toISOString()
  }));
  const activeIds = new Set(activeRows.map(row => row.id));
  const deletedRows = Object.entries(deletedCharacters).filter(([id]) => !activeIds.has(id)).map(([id, timestamp]) => ({
    id,
    user_id: cloudUser.id,
    data: { id },
    is_deleted: true,
    updated_at: new Date(timestamp).toISOString()
  }));
  const rows = [...activeRows, ...deletedRows];
  if (rows.length) {
    const { error } = await cloudClient.from("characters").upsert(rows, { onConflict: "user_id,id" });
    if (error) { setCloudStatus(`Cloud sync failed: ${error.message}`, true); return; }
  }
  setCloudStatus(`Cloud vault synced at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`);
}
async function loadCloudCharacters() {
  if (!cloudUser || !cloudClient) return;
  const { data, error } = await cloudClient.from("characters").select("id, user_id, data, updated_at, is_deleted");
  if (error) { setCloudStatus(`Could not load cloud vault: ${error.message}`, true); return; }
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
  renderCards();
  renderSheet();
  await syncCharactersToCloud();
}
async function loadCampaigns() {
  if (!cloudUser || !cloudClient) {
    renderCampaigns();
    return;
  }
  const [campaignResult, memberResult, characterResult] = await Promise.all([
    cloudClient.from("campaigns").select("id, owner_id, name, description, invite_code, updated_at"),
    cloudClient.from("campaign_members").select("campaign_id, user_id, role, display_name, joined_at"),
    cloudClient.from("campaign_characters").select("campaign_id, owner_user_id, character_id, nickname, added_at")
  ]);
  if (campaignResult.error) { reportCampaignError(campaignResult.error, "Could not load campaigns", false); return; }
  if (memberResult.error) { reportCampaignError(memberResult.error, "Could not load campaign members", false); return; }
  if (characterResult.error) { reportCampaignError(characterResult.error, "Could not load campaign characters", false); return; }
  campaignMemberships = memberResult.data || [];
  const myCampaignIds = new Set(campaignMemberships.filter(member => member.user_id === cloudUser.id).map(member => member.campaign_id));
  campaigns = (campaignResult.data || [])
    .filter(campaign => myCampaignIds.has(campaign.id) || campaign.owner_id === cloudUser.id)
    .sort((a, b) => String(a.name).localeCompare(String(b.name)));
  campaignCharacters = (characterResult.data || []).filter(link => myCampaignIds.has(link.campaign_id));
  if (!activeCampaignId || !campaigns.some(campaign => campaign.id === activeCampaignId)) activeCampaignId = campaigns[0]?.id || "";
  saveCampaignCache();
  renderCampaigns();
  await loadCloudCharacters();
  renderCampaigns();
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
  await cloudClient.from("campaign_members").upsert({
    campaign_id: data.id,
    user_id: cloudUser.id,
    role: "dm",
    display_name: cloudUser.user_metadata?.display_name || cloudUser.email?.split("@")[0] || "DM"
  }, { onConflict: "campaign_id,user_id" });
  activeCampaignId = data.id;
  await loadCampaigns();
  toast(`${name} created`);
}
async function joinCampaign(inviteCode) {
  if (!cloudUser || !cloudClient) { toast("Sign in to join a campaign"); return; }
  const code = inviteCode.trim().toUpperCase();
  const { data, error } = await cloudClient.from("campaigns").select("id, name").eq("invite_code", code).single();
  if (error) {
    if (isMissingCampaignSchema(error)) reportCampaignError(error, "Could not join campaign");
    else toast("Invite code not found");
    return;
  }
  if (!data) { toast("Invite code not found"); return; }
  const { error: joinError } = await cloudClient.from("campaign_members").upsert({
    campaign_id: data.id,
    user_id: cloudUser.id,
    role: "player",
    display_name: cloudUser.user_metadata?.display_name || cloudUser.email?.split("@")[0] || "Player"
  }, { onConflict: "campaign_id,user_id" });
  if (joinError) { toast(`Could not join campaign: ${joinError.message}`); return; }
  activeCampaignId = data.id;
  await loadCampaigns();
  toast(`Joined ${data.name}`);
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
  const priorOwner = localStorage.getItem(CLOUD_OWNER_KEY);
  const cached = readJson(`${STORAGE_KEY}.${user.id}`, null);
  const cachedCampaigns = readJson(`${CAMPAIGN_KEY}.${user.id}`, null);
  const cachedDeletions = readJson(`${DELETED_KEY}.${user.id}`, null);
  if (cached !== null) characters = cached;
  else if (priorOwner && priorOwner !== user.id) characters = [];
  campaigns = cachedCampaigns || [];
  deletedCharacters = cachedDeletions || {};
  localStorage.setItem(CLOUD_OWNER_KEY, user.id);
  saveJson(STORAGE_KEY, characters);
  persistDeletedCharacters();
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
    if (slot?.one) bonuses[slot.one] = (bonuses[slot.one] || 0) + 1;
    if (slot?.two) bonuses[slot.two] = (bonuses[slot.two] || 0) + 1;
  });
  return bonuses;
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

function speciesDescription(name) {
  return (typeof CONTENT_SUMMARIES !== "undefined" && CONTENT_SUMMARIES.species && CONTENT_SUMMARIES.species[name]) || "";
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

function quickSelections() {
  const profile = QUICK_BUILD_PROFILES[quickClass];
  const species = $("#quick-species")?.value || (edition === "2024" ? "Human" : "Human");
  const background = $("#quick-background")?.value || profile.backgrounds[edition];
  return { profile, species, background };
}

function buildQuickCharacter(preview = false) {
  const { profile, species, background } = quickSelections();
  const baseAbilities = quickAbilityScores(quickClass);
  const origin = quickOrigin(quickClass, species, background);
  const skills = quickSkillChoices(quickClass, background);
  const subclass = quickDefaultSubclass(quickClass);
  const finalAbilities = Object.fromEntries(ABILITIES.map(ability => [
    ability,
    Number(baseAbilities[ability]) + Number(origin.originBonuses[ability] || 0)
  ]));
  const masteryCount = weaponMasteryCount(quickClass, 1, edition);
  const spells = quickSpellChoices(quickClass);
  const feats = origin.originFeat ? [origin.originFeat] : [];
  const character = {
    id: preview ? "quick-preview" : crypto.randomUUID(),
    name: $("#quick-name")?.value.trim() || generateQuickName(false),
    player: $("#quick-player")?.value.trim() || "",
    pronouns: "",
    level: 1,
    edition,
    species,
    background,
    alignment: "Unaligned",
    campaign: "",
    className: quickClass,
    subclass,
    customSubclass: "",
    classes: [{ name: quickClass, level: 1, subclass, customSubclass: "", subclassChoices: {} }],
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
    asi: {},
    asiBonuses: Object.fromEntries(ABILITIES.map(ability => [ability, 0])),
    skillProficiencies: skills.skillProficiencies,
    backgroundSkills: skills.backgroundSkills,
    expertise: skills.expertise,
    weaponMastery: (profile.masteries || []).slice(0, masteryCount),
    fightingStyle: quickClass === "Fighter" ? profile.fightingStyle || "Defense" : "",
    fightingStyles: [],
    divineOrder: edition === "2024" && quickClass === "Cleric" ? "Protector" : "",
    primalOrder: edition === "2024" && quickClass === "Druid" ? "Magician" : "",
    invocations: edition === "2024" && quickClass === "Warlock" ? ["Pact of the Tome"] : [],
    subclassChoices: subclass === "Draconic Bloodline" ? { draconicAncestry: "Fire" } : {},
    spells,
    customSpells: "",
    customFeats: "",
    inventory: quickInventory(quickClass),
    currency: { cp: 0, sp: 0, ep: 0, gp: 10, pp: 0 },
    portrait: "",
    backstory: `${profile.tagline} This quick-build character is ready to play and can be fully customized from the character sheet.`,
    acOverride: "",
    hpOverride: "",
    resourceUsage: {},
    conditions: [],
    progressionHistory: [],
    quickBuilt: true,
    updatedAt: Date.now()
  };
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
  summary.innerHTML = `
    <div class="quick-summary-title"><span>${RULES.classes[quickClass].icon}</span><div><small>LEVEL 1 ${edition === "2024" ? "5.5e" : "5e"}</small><h3>${escapeHtml(character.species)} ${escapeHtml(quickClass)}</h3><p>${escapeHtml(character.background)} background</p></div></div>
    <div class="quick-summary-stats">
      <span><small>AC</small><strong>${stats.ac}</strong></span>
      <span><small>HP</small><strong>${stats.hp}</strong></span>
      <span><small>Best ability</small><strong>${QUICK_BUILD_PROFILES[quickClass].abilities[0]} ${character[QUICK_BUILD_PROFILES[quickClass].abilities[0]]}</strong></span>
    </div>
    <div class="quick-summary-section"><strong>Automatic ability scores</strong><p>${ABILITIES.map(ability => `${ability} ${character[ability]}`).join(" · ")}</p></div>
    <div class="quick-summary-section"><strong>Trained skills</strong><p>${[...new Set([...character.skillProficiencies, ...character.backgroundSkills])].join(", ")}</p></div>
    ${spellNames.length ? `<div class="quick-summary-section"><strong>Starting spells</strong><p>${escapeHtml(spellNames.join(", "))}</p></div>` : ""}
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

function showCreationMethod(method) {
  const choosing = method === "choose";
  const quick = method === "quick";
  const standard = method === "standard";
  $("#creation-methods").classList.toggle("hidden", !choosing);
  $("#quick-builder").classList.toggle("hidden", !quick);
  $("#standard-builder").classList.toggle("hidden", !standard);
  $("#builder-eyebrow").textContent = choosing ? "CHARACTER CREATOR" : quick ? "BEGINNER QUICK BUILD" : "FULL CHARACTER CREATOR";
  $("#builder-title").textContent = choosing ? "Build your adventurer" : quick ? "Create a hero in minutes" : "Build every detail";
  $("#builder-description").textContent = choosing
    ? "Choose a fast guided build or take full control."
    : quick ? "Level 1, smart defaults, and no rules expertise required." : "Every choice updates your sheet as you go.";
  if (quick) initializeQuickBuilder();
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
  container.innerHTML = `<h3>Features at level ${level}</h3>
    <p>Class and subclass features are granted automatically at their listed levels.</p>
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

function renderTalentChoices(savedFeats, savedSpells, savedFeatAbilities) {
  if (!$("#feat-list")) return;
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
  const rows = [];
  Object.entries(lists).forEach(([spellLevel, spells]) => {
    if (!query && Number(spellLevel) !== selectedSpellLevel) return;
    spells.filter(name => !query || name.toLowerCase().includes(query)).forEach(name => rows.push({ name, level: Number(spellLevel) }));
  });
  const renderSpell = spell => {
    const locked = spell.level > allowed;
    const source = EXPANDED_SPELL_SOURCES?.[edition]?.[spell.name] || "";
    const description = spellDescription(spell.name, edition, source);
    return `<article class="choice-option ${locked ? "locked" : ""}"><label>
      <input type="checkbox" name="spells" value="${escapeHtml(spell.name)}" data-level="${spell.level}" ${selectedSpellNames.has(spell.name) ? "checked" : ""} ${locked ? "disabled" : ""}>
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
      : `${selectedClass} gains ${slots} Ability Score Improvement${slots > 1 ? "s" : ""} by level ${level}. Increase one ability by +2 or two abilities by +1 each, or leave a slot empty to take a feat instead. Scores cap at 20.`;
  }
  if (slots < 1) { container.innerHTML = ""; return; }
  const optionsFor = current => `<option value="">— none —</option>` + ABILITIES.map(ability => `<option value="${ability}" ${ability === current ? "selected" : ""}>${ability}</option>`).join("");
  container.innerHTML = Array.from({ length: slots }, (_, index) => {
    const slot = selectedAsi[index] || { one: "", two: "" };
    return `<article class="choice-option asi-option"><span><strong>Ability Score Improvement ${index + 1}</strong><small>Increase one ability by +2 (choose it twice) or two abilities by +1 each.</small></span>
      <label class="feat-ability-choice">+1<select data-asi-slot="${index}" data-asi-part="one">${optionsFor(slot.one)}</select></label>
      <label class="feat-ability-choice">+1<select data-asi-slot="${index}" data-asi-part="two">${optionsFor(slot.two)}</select></label>
    </article>`;
  }).join("");
}

function buildAbilities() {
  $("#ability-editor").innerHTML = ABILITIES.map((ability, i) =>
    `<div class="ability-box"><label>${ability}<input name="${ability}" type="number" min="1" max="30" value="${[15,14,13,12,10,8][i]}"></label><small data-origin-bonus="${ability}">Origin +0</small><span data-mod="${ability}">${signed(modifier([15,14,13,12,10,8][i]))}</span></div>`
  ).join("");
  $("#preview-abilities").innerHTML = ABILITIES.map(a => `<div><small>${a}</small><strong data-preview-mod="${a}">+0</strong></div>`).join("");
}

function formData() {
  const data = Object.fromEntries(new FormData(form));
  data.edition = edition;
  data.className = selectedClass;
  data.portrait = portraitData;
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
    return { name, level: Number(spellLevel) };
  });
  const asiBonuses = asiAbilityBonuses(selectedAsi);
  data.asi = JSON.parse(JSON.stringify(selectedAsi));
  data.asiBonuses = { ...asiBonuses };
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
    data.classes = classBreakdown(existing).map(entry =>
      entry.name === data.className
        ? { ...entry, subclass: data.subclass || entry.subclass || "", customSubclass: data.customSubclass || "" }
        : entry
    );
    data.level = characterTotalLevel(data);
  } else {
    data.classes = [{ name: data.className, level: data.level, subclass: data.subclass || "", customSubclass: data.customSubclass || "" }];
  }
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
}

function setStep(step) {
  currentStep = Math.max(1, Math.min(5, step));
  $$(".form-step").forEach(x => x.classList.toggle("active", Number(x.dataset.stepPanel) === currentStep));
  $$(".step-tabs button").forEach(x => {
    const tabStep = Number(x.dataset.step);
    x.classList.toggle("active", tabStep === currentStep);
    x.classList.toggle("complete", tabStep < currentStep);
  });
  $("#character-form").dataset.currentStep = currentStep;
  $("#prev-step").style.visibility = currentStep === 1 ? "hidden" : "visible";
  $("#next-step").classList.toggle("hidden", currentStep === 5);
  $("#save-character").classList.toggle("hidden", currentStep !== 5);
  $("#step-count").textContent = `Step ${currentStep} of 5`;
  if (currentStep === 4) renderTalentChoices();
}

function navigate(view) {
  $$(".view").forEach(x => x.classList.toggle("active", x.id === `${view}-view`));
  $$(".nav-item").forEach(x => x.classList.toggle("active", x.dataset.view === view));
  $("#page-title").textContent = ({ dashboard: "Hall", builder: "Create", sheet: "Character Sheet", dice: "Dice Tray", vault: "Vault", campaigns: "Campaigns" })[view];
  $(".topnav")?.classList.remove("open");
  if (view === "vault" || view === "dashboard") renderCards();
  if (view === "campaigns") renderCampaigns();
  if (view === "sheet") renderSheet();
  window.scrollTo({ top: 0, behavior: "smooth" });
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
  form.reset();
  form.elements.level.value = 1;
  if ($("#subclass-select")) $("#subclass-select").value = "";
  $("#builder-eyebrow").textContent = "CHARACTER CREATOR";
  $("#builder-title").textContent = "Build your adventurer";
  $("#builder-description").textContent = "Every choice updates your sheet as you go.";
  $$(".edition-toggle button").forEach(button => button.classList.toggle("active", button.dataset.edition === edition));
  populateRules();
  resetPortrait();
  setStep(1);
  showCreationMethod("choose");
  updatePreview();
}

function characterCard(character, withActions = false) {
  const subclass = classBreakdown(character).map(entry => classSubclassName(character, entry.name)).filter(Boolean).join(" / ") || primaryClassName(character);
  const canControl = canControlCharacter(character);
  const canDelete = isOwnCharacter(character);
  return `<article class="character-card" data-character-id="${character.id}">
    <div class="art">${character.portrait ? `<img src="${character.portrait}" alt="">` : escapeHtml(character.name.charAt(0).toUpperCase())}
      ${withActions ? `<div class="card-actions">${canControl ? `<button data-level-up="${character.id}" title="Level up">↑</button><button data-edit="${character.id}" title="Edit">✎</button>` : ""}${canDelete ? `<button data-delete="${character.id}" title="Delete">×</button>` : ""}</div>` : ""}
    </div>
    <div class="card-copy">
      <div class="card-meta"><span>${character.edition === "2024" ? "5.5e · 2024" : "5e · 2014"}</span><strong>Level ${characterTotalLevel(character)}</strong></div>
      <h3>${escapeHtml(character.name)}</h3>
      <p>${character._campaignShared ? "Campaign sheet · " : ""}${escapeHtml(character.species)} ${escapeHtml(classSummary(character))} · ${escapeHtml(subclass)}</p>
      <span class="card-open">Open character <b>→</b></span>
    </div>
  </article>`;
}

function renderCards(filter = "") {
  const matches = characters.filter(c => c.name.toLowerCase().includes(filter.toLowerCase()));
  $("#recent-characters").innerHTML = matches.slice(0, 2).map(c => characterCard(c)).join("") +
    `<button class="character-card new-card" data-go="builder"><div><span>＋</span><h3>Forge a new hero</h3><p>Begin a fresh adventure</p></div></button>`;
  $("#vault-characters").innerHTML = matches.length ? matches.map(c => characterCard(c, true)).join("") :
    `<div class="empty-state"><span>✦</span><h2>Your vault is waiting</h2><p>Create your first character to see them here.</p></div>`;
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
    const count = campaignCharacters.filter(link => link.campaign_id === campaign.id).length;
    return `<button type="button" class="campaign-card ${campaign.id === activeCampaignId ? "active" : ""}" data-campaign-select="${campaign.id}">
      <small>${role === "dm" ? "Dungeon Master" : "Player"}</small>
      <strong>${escapeHtml(campaign.name)}</strong>
      <span>${count} shared character${count === 1 ? "" : "s"}</span>
    </button>`;
  }).join("") : `<p>No campaigns yet. Create one as DM or join with an invite code.</p>`;
  const campaign = campaigns.find(item => item.id === activeCampaignId);
  if (!campaign) {
    $("#campaign-detail").innerHTML = `<div class="empty-state"><span>⚑</span><h2>No campaign selected</h2><p>Create or join a campaign to begin.</p></div>`;
    return;
  }
  const role = campaignRole(campaign.id) || (campaign.owner_id === cloudUser.id ? "dm" : "player");
  const isDm = role === "dm";
  const members = campaignMemberships.filter(member => member.campaign_id === campaign.id);
  const links = campaignCharacters.filter(link => link.campaign_id === campaign.id);
  const shareOptions = ownCharacters()
    .filter(character => !links.some(link => link.owner_user_id === cloudUser.id && link.character_id === character.id))
    .map(character => `<option value="${escapeHtml(character.id)}">${escapeHtml(character.name)} · ${escapeHtml(classSummary(character))}</option>`)
    .join("");
  const characterRows = links.map(link => {
    const character = characters.find(item => item.id === link.character_id && characterOwnerId(item) === link.owner_user_id);
    const owner = members.find(member => member.user_id === link.owner_user_id);
    const ownerLabel = owner?.display_name || (link.owner_user_id === cloudUser.id ? "You" : "Player");
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
    <div class="campaign-detail-head">
      <div>
        <span class="eyebrow">${isDm ? "DM VIEW" : "PLAYER VIEW"}</span>
        <h2>${escapeHtml(campaign.name)}</h2>
        <p>${escapeHtml(campaign.description || "No campaign notes yet.")}</p>
      </div>
      ${isDm ? `<div class="invite-code"><span>${escapeHtml(campaign.invite_code)}</span><button type="button" class="button ghost small" data-copy-invite="${escapeHtml(campaign.invite_code)}">Copy invite</button></div>` : ""}
    </div>
    <div class="campaign-grid">
      <section class="campaign-panel">
        <h3>Members</h3>
        ${members.map(member => `<div class="campaign-member"><div><strong>${escapeHtml(member.display_name || "Adventurer")}</strong><br><small>${member.user_id === cloudUser.id ? "You" : member.user_id}</small></div><span class="tag">${member.role === "dm" ? "DM" : "Player"}</span></div>`).join("") || "<p>No members yet.</p>"}
      </section>
      <section class="campaign-panel">
        <h3>Shared characters</h3>
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
}

function saveSessionCharacter(character) {
  character.updatedAt = Date.now();
  persistCharacters();
  renderSheet();
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

function renderSheet() {
  const c = characters.find(x => x.id === activeCharacterId) || characters[0];
  if (!c) { $("#sheet-empty").classList.remove("hidden"); $("#character-sheet").classList.add("hidden"); return; }
  activeCharacterId = c.id;
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
  const customSpells = String(c.customSpells || "").split(",").map(x => x.trim()).filter(Boolean).map(name => ({ name, level: "Custom" }));
  const spells = [...(c.spells || []).map(spell => typeof spell === "string" ? { name: spell, level: 0 } : spell), ...customSpells];
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
    <div class="sheet-portrait">${c.portrait ? `<img src="${c.portrait}" alt="">` : escapeHtml(c.name.charAt(0))}</div>
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
    <button type="button" class="${activeSheetSection === "features" ? "active" : ""}" data-sheet-section="features">Features</button>
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
      }).join("")}<span><strong>Selected:</strong> ${spells.length}</span></div>
      <div class="sheet-spells">${spells.sort((a,b) => Number(a.level) - Number(b.level) || a.name.localeCompare(b.name)).map(spell =>
        `<div class="sheet-spell"><strong>${escapeHtml(spell.name)}</strong><br><small>${spell.className ? `${escapeHtml(spell.className)} · ` : ""}${spell.level === 0 ? "Cantrip" : spell.level === "Custom" ? "Custom" : `Level ${spell.level}`}</small>${ruleDetails(spellDescription(spell.name, c.edition, EXPANDED_SPELL_SOURCES[c.edition]?.[spell.name] || ""))}</div>`
      ).join("") || "<p>No spells selected.</p>"}</div>
    </section>` : ""}
    ${(c.progressionHistory || []).length ? `<section class="sheet-panel sheet-wide ${sectionClass("features")}">
      <h2>Level-up history</h2>
      <div class="feature-grid">${[...c.progressionHistory].reverse().map(entry => {
        const choiceText = Object.entries(entry.choices || {}).map(([name, value]) => `${name}: ${Array.isArray(value) ? value.join(", ") : value}`).join(" · ");
        return `<article class="feature-card"><small>LEVEL ${entry.level}</small><strong>${escapeHtml(entry.hpMethod || "Level gained")}</strong>${choiceText ? `<p>${escapeHtml(choiceText)}</p>` : ""}</article>`;
      }).join("")}</div>
    </section>` : ""}
  </div>`;
}

function editCharacter(id) {
  const c = characters.find(x => x.id === id); if (!c) return;
  if (!canControlCharacter(c)) { toast("Only the owner or campaign DM can edit this sheet"); return; }
  activeCharacterId = id; edition = c.edition || "2014"; selectedClass = c.className || "Fighter";
  currentOriginFeat = c.originFeat || "";
  selectedFeatAbilities = { ...(c.featAbilityChoices || {}) };
  selectedAsi = c.asi ? JSON.parse(JSON.stringify(c.asi)) : {};
  showCreationMethod("standard");
  $("#builder-eyebrow").textContent = "DIRECT EDIT";
  $("#builder-title").textContent = `Edit ${c.name}`;
  $("#builder-description").textContent = "Adjust any saved detail directly. Use Level Up for guided progression.";
  $$(".edition-toggle button").forEach(b => b.classList.toggle("active", b.dataset.edition === edition));
  populateRules();
  Object.entries(c).forEach(([key, value]) => {
    const input = form.elements[key]; if (input && key !== "portrait" && !Array.isArray(value)) input.value = value;
  });
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
  const thirdCasterTotals = {
    "Eldritch Knight": [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    "Arcane Trickster": [0,0,3,4,4,4,5,6,6,7,8,8,9,10,10,11,11,11,12,13],
    "Order of the Profane Soul": [0,0,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,11]
  };
  const progression = SPELL_PROGRESSION[character.edition]?.[character.className]
    || (thirdCasterTotals[subclassName(character)] ? { mode: "known", totals: thirdCasterTotals[subclassName(character)] } : null);
  let count = 0;
  if (progression?.perLevel) count = progression.perLevel;
  if (progression?.totals) {
    const before = progression.totals[Number(character.level) - 1] || 0;
    const after = progression.totals[targetLevel - 1] || before;
    count = Math.max(0, after - before);
  }
  if (!count) return "";
  const existing = new Set((character.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
  const available = Object.entries(lists)
    .filter(([level]) => Number(level) > 0 && Number(level) <= newMax)
    .flatMap(([level, spells]) => spells.map(name => ({ name, level: Number(level) })))
    .filter(spell => !existing.has(spell.name));
  const modeLabel = progression.mode === "spellbook" ? "spellbook" : progression.mode === "known" ? "spells known" : "prepared spells";
  return `<section class="advancement-section">
    <h3>Add ${count} spell${count > 1 ? "s" : ""}</h3>
    <p>Your ${modeLabel} increases at this level. Choose exactly ${count}; eligible spell levels are 1–${newMax}.</p>
    <div class="progression-choice" data-min-choices="${count}" data-choice-name="levelSpells">
      ${optionChecks("levelSpells", available.map(spell => spell.name), [], count, name => {
        const spell = available.find(item => item.name === name);
        return spellDescription(name, character.edition, EXPANDED_SPELL_SOURCES[character.edition]?.[name] || "");
      })}
    </div>
  </section>`;
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
    <div class="level-up-summary"><strong>Ready to advance?</strong><br>This saves a progression record and updates the character to level ${targetLevel}. Direct Edit remains available afterward.</div>`;
  updateLevelFeatAbilityOptions(context);
  $("#level-up-modal").classList.remove("hidden");
}

function closeLevelUp() {
  levelingCharacterId = null;
  levelUpClassName = "";
  $("#level-up-modal").classList.add("hidden");
}

function progressionSnapshot(character) {
  const keys = ["level", "classes", "className", "hpOverride", "subclass", "customSubclass", "subclassChoices", "feats", "spells", "fightingStyle", "fightingStyles", "pactBoon", "metamagic", "invocations", "skillProficiencies", "backgroundSkills", "expertise", "weaponMastery", "divineOrder", "primalOrder", "blessedStrikes", "elementalFury", "resourceUsage", "baseAbilities", "originBonuses", "originFeat", "featAbilityChoices", "featBonuses", "speciesVariant", "backgroundAbilityMode", "backgroundPrimary", "backgroundSecondary", "originFeatChoice", ...ABILITIES];
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
    updated.baseAbilities = { ...(updated.baseAbilities || Object.fromEntries(ABILITIES.map(ability => [ability, Number(updated[ability]) - Number(updated.originBonuses?.[ability] || 0) - Number(updated.featBonuses?.[ability] || 0)]))) };
    if (first) {
      updated[first] = Math.min(20, Number(updated[first]) + 1);
      updated.baseAbilities[first] = Number(updated[first]) - Number(updated.originBonuses?.[first] || 0);
    }
    if (second) {
      updated[second] = Math.min(20, Number(updated[second]) + 1);
      updated.baseAbilities[second] = Number(updated[second]) - Number(updated.originBonuses?.[second] || 0);
    }
    choices.advancement = `${first} +1, ${second} +1`;
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
      choices.advancement = `Feat: ${feat}${featAbility ? ` (${featAbility} +1)` : ""}`;
    }
  }
  const addedCantrips = formValues.getAll("levelCantrips");
  const arcanum = formValues.get("mysticArcanum");
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
  animateDiceResult({ total, sides, label: entry.label, detail });
  showRollOverlay({ label: label || `d${sides} roll`, modifier: mod, d20s: rolls, chosen, total, mode, sides, count });
  return total;
}

function animateDiceResult({ total, sides, label, detail }) {
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
      number.textContent = total;
      copy.textContent = `${label} · ${detail}`;
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
function rollOnSheet(label, modifier, mode) {
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
  if ($("#dice-result strong")) { $("#dice-result strong").textContent = total; $("#dice-result p").textContent = `${entry.label} · ${detail}`; }
  showRollOverlay({ label: label || "Roll", modifier, d20s, chosen, total, mode });
  return total;
}

function showRollOverlay(r) {
  const overlay = $("#roll-overlay");
  if (!overlay) return;
  const sides = Number(r.sides || 20);
  currentRollContext = { label: r.label, modifier: r.modifier, sides };
  $("#roll-overlay-label").textContent = r.label;
  const parts = [r.d20s.length > 1 ? `rolled ${r.d20s.join(" & ")} → ${r.chosen}` : `d${sides}`];
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
  let ticks = 0;
  rollOverlayTimer = setInterval(() => {
    num.textContent = Math.floor(Math.random() * sides) + 1;
    if (++ticks > 14) {
      clearInterval(rollOverlayTimer);
      num.textContent = r.chosen;
      totalEl.textContent = r.total;
      if (sides === 20 && r.chosen === 20) overlay.classList.add("crit");
      else if (r.chosen === 1) overlay.classList.add("fumble");
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
  toast(`${restType === "short" ? "Short" : "Long"} rest resources restored`);
}

function initDice() {
  $("#dice-buttons").innerHTML = [4, 6, 8, 10, 12, 20, 100].map(d => `<button class="die ${d === 20 ? "active" : ""}" data-die="${d}">d${d}</button>`).join("");
  renderRolls();
}

function initEvents() {
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
    const nav = event.target.closest("[data-view]"); if (nav) { if (nav.dataset.view === "builder") startNewCharacter(); navigate(nav.dataset.view); }
    const go = event.target.closest("[data-go]"); if (go) { if (go.dataset.go === "builder") startNewCharacter(); navigate(go.dataset.go); }
    const link = event.target.closest("[data-view-link]"); if (link) { event.preventDefault(); navigate(link.dataset.viewLink); }
    const classButton = event.target.closest("[data-class]");
    if (classButton) { selectedClass = classButton.dataset.class; selectedSpellLevel = 0; selectedSpellNames.clear(); $("#class-choice-fields").innerHTML = ""; $$(".class-option").forEach(b => b.classList.toggle("selected", b === classButton)); populateSubclasses(); renderTalentChoices(); updatePreview(); }
    const spellLevel = event.target.closest("[data-spell-level]");
    if (spellLevel) { selectedSpellLevel = Number(spellLevel.dataset.spellLevel); $("#spell-search").value = ""; renderTalentChoices(); }
    const step = event.target.closest("[data-step]"); if (step) setStep(Number(step.dataset.step));
    const card = event.target.closest("[data-character-id]");
    if (card && !event.target.closest(".card-actions")) { activeCharacterId = card.dataset.characterId; navigate("sheet"); }
    const edit = event.target.closest("[data-edit]"); if (edit) editCharacter(edit.dataset.edit);
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
  });
  form.addEventListener("input", event => {
    updatePreview();
    if (event.target.name === "level") {
      populateSubclasses();
      renderTalentChoices();
    }
  });
  form.addEventListener("change", event => {
    if (event.target.name === "spells") event.target.checked ? selectedSpellNames.add(event.target.value) : selectedSpellNames.delete(event.target.value);
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
    const select = event.target.closest("select[data-asi-slot]");
    if (!select) return;
    selectedAsi[select.dataset.asiSlot] = selectedAsi[select.dataset.asiSlot] || { one: "", two: "" };
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
    if (!formEl) return;
    event.preventDefault();
    const values = Object.fromEntries(new FormData(formEl));
    shareCharacterWithCampaign(formEl.dataset.campaignShare, values.characterId);
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
  $$(".edition-toggle button").forEach(button => button.addEventListener("click", () => {
    edition = button.dataset.edition; selectedSpellLevel = 0; currentOriginFeat = ""; selectedSpellNames.clear(); selectedFeatNames.clear(); selectedFeatAbilities = {}; selectedAsi = {}; $("#class-choice-fields").innerHTML = ""; $$(".edition-toggle button").forEach(b => b.classList.toggle("active", b === button)); populateRules(); updatePreview();
    if (!$("#quick-builder").classList.contains("hidden")) initializeQuickBuilder();
  }));
  $("#quick-next").addEventListener("click", () => setQuickStep(quickStep + 1));
  $("#quick-back").addEventListener("click", () => setQuickStep(quickStep - 1));
  $("#quick-surprise").addEventListener("click", surpriseQuickBuild);
  $("#quick-name-generator").addEventListener("click", () => { generateQuickName(true); renderQuickSummary(); });
  $("#quick-create").addEventListener("click", createQuickCharacter);
  $("#quick-species").addEventListener("change", renderQuickOrigin);
  $("#quick-background").addEventListener("change", renderQuickOrigin);
  $("#quick-name").addEventListener("input", renderQuickSummary);
  $("#standard-array").addEventListener("click", () => { [15,14,13,12,10,8].forEach((v, i) => form.elements[ABILITIES[i]].value = v); updatePreview(); });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = formData();
    if (!data.name.trim()) { setStep(5); form.elements.name.focus(); toast("Your character needs a name"); return; }
    if (!validateOriginChoices()) { setStep(2); toast("Choose different eligible abilities and complete the origin feat selection"); return; }
    const primaryEditLevel = classLevel(data, data.className) || data.level;
    const skillRule = classSkillRuleAtLevel(data.className, primaryEditLevel, data.edition, data.subclass);
    if (data.skillProficiencies.length !== skillRule.count) {
      setStep(1);
      toast(`Choose ${skillRule.count} class skill proficiencies`);
      return;
    }
    if (data.backgroundSkills.length !== 2 || new Set(data.backgroundSkills).size !== 2) {
      setStep(2);
      toast("Choose two different background skill proficiencies");
      return;
    }
    const trainedSkills = new Set([...data.skillProficiencies, ...data.backgroundSkills]);
    if (data.expertise.some(skill => !trainedSkills.has(skill))) {
      setStep(1);
      toast("Expertise must be assigned to a proficient skill");
      return;
    }
    const expertiseRequired = expertiseCountAtLevel(data.className, primaryEditLevel, data.edition);
    if (data.expertise.length !== expertiseRequired) {
      setStep(1);
      toast(`Choose ${expertiseRequired} skills for Expertise`);
      return;
    }
    const masteryRequired = weaponMasteryCount(data.className, primaryEditLevel, data.edition);
    if (data.weaponMastery.length !== masteryRequired) { setStep(1); toast(`Choose ${masteryRequired} mastered weapon${masteryRequired === 1 ? "" : "s"}`); return; }
    data.id = activeCharacterId && activeCharacterId !== "demo-lyra" ? activeCharacterId : crypto.randomUUID();
    clearCharacterDeletion(data.id);
    data.updatedAt = Date.now();
    const index = characters.findIndex(c => c.id === data.id);
    if (index >= 0) characters[index] = { ...characters[index], ...data }; else characters.unshift(data);
    activeCharacterId = data.id; persistCharacters(); renderCards(); renderSheet(); toast(`${data.name} saved to the vault`); navigate("sheet");
  });
  $("#portrait-upload").addEventListener("change", event => {
    const file = event.target.files[0]; if (!file) return;
    if (file.size > 4 * 1024 * 1024) { toast("Please choose an image under 4 MB"); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        portraitData = canvas.toDataURL("image/jpeg", .82);
        updatePreview();
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
  const moveDraw = event => { if (!drawing || !drawEnabled) return; event.preventDefault(); const p = point(event); ctx.strokeStyle = "#342a22"; ctx.lineWidth = 8; ctx.lineCap = "round"; ctx.lineTo(p.x, p.y); ctx.stroke(); portraitData = canvas.toDataURL("image/jpeg", .82); updatePreview(); };
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
        const importedIds = new Set(data.characters.map(character => character.id));
        characters.filter(character => !importedIds.has(character.id)).forEach(character => rememberCharacterDeletion(character.id));
        characters = data.characters.map(character => ({ ...character, updatedAt: Number(character.updatedAt || Date.now()) }));
        characters.forEach(character => clearCharacterDeletion(character.id));
        persistCharacters();
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
    await loadCampaigns();
    $("#sync-now").disabled = false;
  });
  $("#sign-out").addEventListener("click", async () => {
    if (cloudClient) await cloudClient.auth.signOut();
    cloudUser = null;
    characters = [];
    campaigns = [];
    campaignMemberships = [];
    campaignCharacters = [];
    activeCampaignId = "";
    deletedCharacters = {};
    activeCharacterId = null;
    saveJson(STORAGE_KEY, characters);
    saveJson(CAMPAIGN_KEY, campaigns);
    saveJson(DELETED_KEY, deletedCharacters);
    renderCards();
    renderSheet();
    renderCampaigns();
    updateAccount();
    setCloudStatus("Signed out. This browser still has a local copy of the vault.");
    toast("Signed out");
  });
  $("#mobile-menu").addEventListener("click", () => $(".topnav")?.classList.toggle("open"));
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
        target.innerHTML = levelSubclassChoiceMarkup(withClassContext(character, selectedClass, classLevel(character, selectedClass)), event.target.value, classLevel(character, selectedClass) + 1);
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
  saveJson(PROFILE_KEY, { displayName, email: values.email });
  if (!cloudClient) {
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
  if (result.error) { setCloudStatus(result.error.message, true); return; }
  if (!result.data.session) {
    setCloudStatus("Account created. Check your email to confirm it, then sign in.");
    setAccountMode("signin");
    return;
  }
  cloudUser = result.data.user;
  prepareUserVault(cloudUser);
  updateAccount();
  await loadCampaigns();
  $("#account-modal").classList.add("hidden");
  toast(`Welcome, ${displayName}`);
}

function updateAccount() {
  const localProfile = readJson(PROFILE_KEY, null);
  const displayName = cloudUser?.user_metadata?.display_name || localProfile?.displayName || cloudUser?.email?.split("@")[0] || "";
  $("#account-label").textContent = displayName || "Sign in";
  $(".avatar-mini").textContent = (displayName || "W").charAt(0).toUpperCase();
  const signedIn = Boolean(cloudUser);
  $("#account-form").classList.toggle("hidden", signedIn);
  $("#account-modes").classList.toggle("hidden", signedIn);
  $("#sync-now").classList.toggle("hidden", !signedIn);
  $("#sign-out").classList.toggle("hidden", !signedIn);
  $("#account-description").textContent = signedIn
    ? `Signed in as ${cloudUser.email}. Character changes synchronize to this account.`
    : cloudConfigured()
      ? "Sign in to keep this vault synchronized across devices. A local copy remains available offline."
      : "Cloud sync is ready for configuration. Until Supabase settings are added, characters remain in this browser.";
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
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  });
  const { data } = await cloudClient.auth.getSession();
  cloudUser = data.session?.user || null;
  if (cloudUser) prepareUserVault(cloudUser);
  updateAccount();
  if (cloudUser) await loadCampaigns();
  cloudClient.auth.onAuthStateChange((_event, session) => {
    const nextUser = session?.user || null;
    const changed = nextUser?.id !== cloudUser?.id;
    cloudUser = nextUser;
    if (cloudUser) prepareUserVault(cloudUser);
    updateAccount();
    if (changed && cloudUser) setTimeout(loadCampaigns, 0);
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
  seedDemo(); buildAbilities(); populateRules(); resetPortrait(); initDice(); initEvents(); updatePreview(); updateAccount(); renderCards(); setStep(1);
  initCloud();
}
init();
