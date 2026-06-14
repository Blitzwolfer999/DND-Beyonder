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
const CONDITIONS = ["Blinded", "Charmed", "Deafened", "Frightened", "Grappled", "Incapacitated", "Invisible", "Paralyzed", "Petrified", "Poisoned", "Prone", "Restrained", "Stunned", "Unconscious", "Exhaustion"];
const STORAGE_KEY = "arcanaForge.characters.v1";
const PROFILE_KEY = "arcanaForge.profile.v1";
const ROLL_KEY = "arcanaForge.rolls.v1";
const CLOUD_OWNER_KEY = "arcanaForge.cloudOwner.v1";
const DELETED_KEY = "arcanaForge.deletedCharacters.v1";

let edition = "2014";
let currentStep = 1;
let selectedClass = "Fighter";
let selectedDie = 20;
let selectedSpellLevel = 0;
let selectedFeatNames = new Set();
let selectedFeatAbilities = {};
let selectedAsi = {};
let selectedSpellNames = new Set();
let levelingCharacterId = null;
let inventoryCharacterId = null;
let activeCharacterId = null;
let activeSheetSection = "overview";
let drawing = false;
let drawEnabled = false;
let portraitData = "";
let currentOriginFeat = "";
let accountMode = "signin";
let cloudClient = null;
let cloudUser = null;
let cloudSyncTimer = null;
let characters = readJson(STORAGE_KEY, []);
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
    .filter(character => !isDemoCharacter(character) && characterTimestamp(character) > deletionTimestamp(character.id))
    .map(character => ({
    id: character.id,
    user_id: cloudUser.id,
    data: character,
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
  const { data, error } = await cloudClient.from("characters").select("id, data, updated_at, is_deleted").eq("user_id", cloudUser.id);
  if (error) { setCloudStatus(`Could not load cloud vault: ${error.message}`, true); return; }
  const merged = new Map(characters.filter(character => !isDemoCharacter(character)).map(character => [character.id, character]));
  (data || []).forEach(row => {
    const remoteTimestamp = Date.parse(row.updated_at) || Number(row.data?.updatedAt || 0);
    if (row.is_deleted) {
      const localTimestamp = characterTimestamp(merged.get(row.id));
      if (remoteTimestamp >= localTimestamp) {
        merged.delete(row.id);
        if (remoteTimestamp > deletionTimestamp(row.id)) deletedCharacters[row.id] = remoteTimestamp;
      } else {
        delete deletedCharacters[row.id];
      }
      return;
    }
    const remote = row.data;
    const local = merged.get(remote.id);
    if (deletionTimestamp(remote.id) >= remoteTimestamp) return;
    if (!local || remoteTimestamp >= characterTimestamp(local)) merged.set(remote.id, remote);
    if (remoteTimestamp > deletionTimestamp(remote.id)) delete deletedCharacters[remote.id];
  });
  characters = [...merged.values()].sort((a, b) => Number(b.updatedAt || 0) - Number(a.updatedAt || 0));
  saveJson(STORAGE_KEY, characters);
  saveJson(`${STORAGE_KEY}.${cloudUser.id}`, characters);
  persistDeletedCharacters();
  renderCards();
  renderSheet();
  await syncCharactersToCloud();
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
  const cachedDeletions = readJson(`${DELETED_KEY}.${user.id}`, null);
  if (cached !== null) characters = cached;
  else if (priorOwner && priorOwner !== user.id) characters = [];
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

function populateRules(savedCharacter = null) {
  $("#species-select").innerHTML = customizationEntries(SPECIES_CATALOG, RULES.species[edition], RULES.species[2014])
    .map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("");
  $("#background-select").innerHTML = customizationEntries(BACKGROUND_CATALOG, RULES.backgrounds[edition], RULES.backgrounds[2014])
    .map(item => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}</option>`).join("");
  $("#class-grid").innerHTML = Object.entries(RULES.classes).map(([name, data]) =>
    `<button type="button" class="class-option ${name === selectedClass ? "selected" : ""}" data-class="${name}"><span>${data.icon}</span><strong>${name}</strong>${data.origin ? `<small>${data.origin}</small>` : ""}</button>`
  ).join("");
  populateSubclasses();
  renderOriginRules(savedCharacter);
  renderTalentChoices();
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

function renderOriginRules(savedCharacter = null) {
  const container = $("#origin-rules");
  if (!container) return;
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
  const currentChoice = name => savedCharacter?.[name] || form.elements[name]?.value || "";
  const blocks = [];
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

function selectedValues(name) {
  return $$(`input[name="${name}"]:checked`).map(input => input.value);
}

function maxSpellLevel(className, level, rulesEdition) {
  if (!SPELL_LISTS[rulesEdition]?.[className]) return -1;
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
  $("#feat-guidance").textContent = edition === "2014"
    ? `${FEATS[edition].length} 5e feat options filtered by level prerequisites.`
    : `${FEATS[edition].length} 5.5e and expanded feat options grouped by level category.`;
  $("#feat-list").innerHTML = feats.map(feat => {
    const isOriginFeat = feat.name === currentOriginFeat;
    const eligible = isOriginFeat || featEligible(feat, level, selectedClass, edition);
    if (!eligible) selectedFeatNames.delete(feat.name);
    const description = featDescription(feat, edition);
    const abilityChoices = featAbilityOptions(feat);
    const selectedAbility = abilityChoices.includes(selectedFeatAbilities[feat.name]) ? selectedFeatAbilities[feat.name] : abilityChoices[0];
    if (selectedAbility) selectedFeatAbilities[feat.name] = selectedAbility;
    return `<article class="choice-option ${eligible ? "" : "locked"}"><label>
      <input type="checkbox" name="feats" value="${escapeHtml(feat.name)}" ${selectedFeatNames.has(feat.name) || isOriginFeat ? "checked" : ""} ${eligible && !isOriginFeat ? "" : "disabled"}>
      <span><strong>${escapeHtml(feat.name)}</strong><small>${escapeHtml(feat.category)}${feat.source ? ` · ${escapeHtml(feat.source)}` : ""}${feat.prerequisite ? ` · ${escapeHtml(feat.prerequisite)}` : ""}${eligible ? "" : " · unavailable at this level"}</small></span>
    </label>${abilityChoices.length ? `<label class="feat-ability-choice">+1 ability<select data-feat-ability="${escapeHtml(feat.name)}">${abilityOptions(abilityChoices, selectedAbility)}</select></label>` : ""}${ruleDetails(description)}</article>`;
  }).join("");

  const lists = SPELL_LISTS[edition]?.[selectedClass];
  $("#spell-choice-section").classList.toggle("hidden", !lists);
  $("#non-caster-note").classList.toggle("hidden", Boolean(lists));
  if (!lists) return;
  const allowed = maxSpellLevel(selectedClass, level, edition);
  $("#spell-guidance").textContent = `${selectedClass} spell list · spell levels through ${allowed} are available at character level ${level}.`;
  $("#spell-level-tabs").innerHTML = Object.keys(lists).filter(key => lists[key].length).map(key =>
    `<button type="button" data-spell-level="${key}" class="${Number(key) === selectedSpellLevel ? "active" : ""}">${key === "0" ? "Cantrip" : key}</button>`
  ).join("");
  renderSpellList();
}

function renderSpellList() {
  const lists = SPELL_LISTS[edition]?.[selectedClass];
  if (!lists) return;
  selectedValues("spells").forEach(name => selectedSpellNames.add(name));
  const query = ($("#spell-search")?.value || "").trim().toLowerCase();
  const level = Number(form.elements.level?.value || 1);
  const allowed = maxSpellLevel(selectedClass, level, edition);
  const rows = [];
  Object.entries(lists).forEach(([spellLevel, spells]) => {
    if (!query && Number(spellLevel) !== selectedSpellLevel) return;
    spells.filter(name => !query || name.toLowerCase().includes(query)).forEach(name => rows.push({ name, level: Number(spellLevel) }));
  });
  $("#spell-list").innerHTML = rows.length ? rows.map(spell => {
    const locked = spell.level > allowed;
    const source = EXPANDED_SPELL_SOURCES?.[edition]?.[spell.name] || "";
    const description = spellDescription(spell.name, edition, source);
    return `<article class="choice-option ${locked ? "locked" : ""}"><label>
      <input type="checkbox" name="spells" value="${escapeHtml(spell.name)}" data-level="${spell.level}" ${selectedSpellNames.has(spell.name) ? "checked" : ""} ${locked ? "disabled" : ""}>
      <span><strong>${escapeHtml(spell.name)}</strong><small>${spell.level === 0 ? "Cantrip" : `Level ${spell.level}`}${source ? ` · ${escapeHtml(source)}` : ""}${locked ? ` · available when this spell level is reached` : ""}</small></span>
    </label>${ruleDetails(description)}</article>`;
  }).join("") : `<p>No spells match that search.</p>`;
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
  selectedValues("feats").forEach(name => selectedFeatNames.add(name));
  selectedValues("spells").forEach(name => selectedSpellNames.add(name));
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
  data.weaponMastery = selectedValues("weaponMastery");
  const lists = SPELL_LISTS[edition]?.[selectedClass] || {};
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
  return data;
}

function derived(data) {
  const cls = RULES.classes[data.className] || RULES.classes.Fighter;
  const level = Number(data.level || 1);
  const con = modifier(data.CON);
  return {
    prof: proficiency(level),
    ac: Number(data.acOverride) || 10 + modifier(data.DEX),
    hp: Number(data.hpOverride) || Math.max(1, cls.hit + con + (level - 1) * (Math.ceil(cls.hit / 2) + 1 + con)),
    initiative: modifier(data.DEX),
    passive: 10 + modifier(data.WIS)
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
  $("#page-title").textContent = ({ dashboard: "Hall", builder: "Create", sheet: "Character Sheet", dice: "Dice Tray", vault: "Vault" })[view];
  $(".sidebar").classList.remove("open");
  if (view === "vault" || view === "dashboard") renderCards();
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
  updatePreview();
}

function characterCard(character, withActions = false) {
  const subclass = character.customSubclass || character.subclass || character.className;
  return `<article class="character-card" data-character-id="${character.id}">
    <div class="art">${character.portrait ? `<img src="${character.portrait}" alt="">` : escapeHtml(character.name.charAt(0).toUpperCase())}
      ${withActions ? `<div class="card-actions"><button data-level-up="${character.id}" title="Level up">↑</button><button data-edit="${character.id}" title="Edit">✎</button><button data-delete="${character.id}" title="Delete">×</button></div>` : ""}
    </div>
    <div class="card-copy">
      <div class="card-meta"><span>${character.edition === "2024" ? "5.5e · 2024" : "5e · 2014"}</span><strong>Level ${character.level}</strong></div>
      <h3>${escapeHtml(character.name)}</h3>
      <p>${escapeHtml(character.species)} ${escapeHtml(character.className)} · ${escapeHtml(subclass)}</p>
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

function valueByLevel(level, rows) {
  let value = 0;
  rows.forEach(([unlock, amount]) => { if (level >= unlock) value = amount; });
  return value;
}

function spellSlotResources(character) {
  const level = Number(character.level);
  const className = character.className;
  if (className === "Warlock") {
    const slots = level >= 17 ? 4 : level >= 11 ? 3 : level >= 2 ? 2 : 1;
    const slotLevel = level >= 9 ? 5 : Math.ceil(level / 2);
    return [{ id: "pact-slots", name: `Pact Magic · level ${slotLevel}`, max: slots, recovery: "short", shortRecovery: "all", group: "spell" }];
  }
  let table = null;
  const subclass = character.customSubclass || character.subclass || "";
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

function classResourceDefinitions(character) {
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
  if ((subclass === "The Fiend" || subclass === "Fiend Patron") && level >= 6) add("dark-ones-own-luck", "Dark One's Own Luck", revised ? abilityUses("CHA") : 1, revised ? "long" : "short", revised ? {} : { shortRecovery: "all" });
  if (subclass === "Circle of the Land" && level >= (revised ? 6 : 2)) add("natural-recovery", "Natural Recovery", 1);
  if ((subclass === "Way of the Open Hand" || subclass === "Warrior of the Open Hand") && level >= 6) add("wholeness-of-body", "Wholeness of Body", revised ? abilityUses("WIS") : 1);
  if ((subclass === "School of Evocation" || subclass === "Evoker") && level >= 14) add("overchannel", "Overchannel · safe use", 1);
  return resources;
}

function resourceDefinitions(character) {
  const merged = [...classResourceDefinitions(character), ...spellSlotResources(character)];
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
  const cls = RULES.classes[c.className];
  const classFeatures = (CLASS_FEATURES[c.edition]?.[c.className] || []).filter(([level]) => level <= c.level);
  const subclassName = c.customSubclass || c.subclass;
  const subclassFeatures = resolvedSubclassFeatures(c.edition, c.className, subclassName).filter(([level]) => level <= c.level);
  const subclassMeta = subclassMetadata(c.className, c.subclass, c.edition);
  const subclassUnlock = subclassLevel(c.className, c.edition);
  const subclassStatus = subclassName && c.level < subclassUnlock ? ` · planned for level ${subclassUnlock}` : "";
  const feats = [...(c.feats || []), ...String(c.customFeats || "").split(",").map(x => x.trim()).filter(Boolean)];
  const customSpells = String(c.customSpells || "").split(",").map(x => x.trim()).filter(Boolean).map(name => ({ name, level: "Custom" }));
  const spells = [...(c.spells || []).map(spell => typeof spell === "string" ? { name: spell, level: 0 } : spell), ...customSpells];
  const spellAbility = cls.primary;
  const spellAttack = d.prof + modifier(c[spellAbility]);
  const spellSave = 8 + spellAttack;
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
  const resources = resourceDefinitions(c);
  const hasSpellcasting = Boolean(SPELL_LISTS[c.edition]?.[c.className]);
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
    <div><span class="eyebrow">${c.edition === "2024" ? "5.5e · 2024" : "5e · 2014"} RULES</span><h1>${escapeHtml(c.name)}</h1><p>Level ${c.level} ${escapeHtml(c.species)} ${escapeHtml(c.className)} · ${escapeHtml(c.customSubclass || c.subclass || "Adventurer")}</p>${subclassMeta?.source ? `<small class="sheet-source">${escapeHtml(subclassMeta.source)} · ${subclassMeta.rules === "2024" ? "native 5.5e" : c.edition === "2024" ? "5e expanded rules" : "5e"}${escapeHtml(subclassStatus)}</small>` : ""}</div>
    <div class="sheet-core">
      <button data-sheet-roll="Initiative" data-modifier="${d.initiative}"><small>INITIATIVE${helpChip("initiative")}</small><strong>${signed(d.initiative)}</strong></button>
      <button><small>ARMOR CLASS${helpChip("ac")}</small><strong>${d.ac}</strong></button>
      <button data-sheet-section-jump="overview"><small>HIT POINTS${helpChip("hp")}</small><strong>${currentHp}/${maximumHp}</strong></button>
      <button><small>PROFICIENCY${helpChip("proficiency")}</small><strong>${signed(d.prof)}</strong></button>
      <button data-sheet-section-jump="overview"><small>PASSIVE PERCEPTION</small><strong>${d.passive}</strong></button>
    </div>
    <div class="sheet-header-actions">
      <button class="button ghost" data-edit="${c.id}">Edit character</button>
      <button class="button ghost" data-delevel="${c.id}" ${c.level <= 1 ? "disabled" : ""}>${c.level <= 1 ? "Minimum level" : "Delevel"}</button>
      <button class="button primary" data-level-up="${c.id}" ${c.level >= 20 ? "disabled" : ""}>${c.level >= 20 ? "Maximum level" : "Level up"}</button>
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
        const proficient = cls.save.includes(ability);
        const saveModifier = modifier(c[ability]) + (proficient ? d.prof : 0);
        return `<button type="button" data-sheet-roll="${ability} saving throw" data-modifier="${saveModifier}"><span class="${proficient ? "proficient" : ""}">${ability}</span><strong>${signed(saveModifier)}</strong></button>`;
      }).join("")}</div>
    </section>
    <section class="sheet-panel ${sectionClass("overview")}"><h2>Skills${helpChip("skill")}</h2><div class="skill-list">${Object.entries(SKILLS).map(([skill, ability]) =>
      `<button class="skill-roll" data-sheet-roll="${skill}" data-modifier="${modifier(c[ability])}"><span>${skill} <small>(${ability})</small></span><strong>${signed(modifier(c[ability]))}</strong></button>`
    ).join("")}</div></section>
    <section class="sheet-panel ${sectionClass("overview")}">
      <h2>Combat & senses</h2>
      <p><strong>Proficiency bonus:</strong> ${signed(d.prof)}</p><p><strong>Passive Perception:</strong> ${d.passive}</p>
      <p><strong>Saving throw proficiencies:</strong> ${cls.save.join(", ")}</p><p><strong>Primary ability:</strong> ${cls.primary}</p>
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
      <div class="feature-grid">${[...classFeatures.map(([level,name]) => ({level,name,source:c.className})), ...subclassFeatures.map(([level,name]) => ({level,name,source:subclassName}))].map(feature =>
        `<article class="feature-card"><small>LEVEL ${feature.level} · ${escapeHtml(feature.source)}</small><strong>${escapeHtml(feature.name)}</strong>${ruleDetails(featureDescription(c.edition, feature.source, feature.name, c.className))}</article>`
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
      <div class="sheet-spell-summary"><span><strong>Ability:</strong> ${spellAbility}</span><span><strong>Save DC:</strong> ${spellSave}${helpChip("spellSave")}</span><span><strong>Attack:</strong> ${signed(spellAttack)}${helpChip("spellAttack")}</span><span><strong>Selected:</strong> ${spells.length}</span></div>
      <div class="sheet-spells">${spells.sort((a,b) => Number(a.level) - Number(b.level) || a.name.localeCompare(b.name)).map(spell =>
        `<div class="sheet-spell"><strong>${escapeHtml(spell.name)}</strong><br><small>${spell.level === 0 ? "Cantrip" : spell.level === "Custom" ? "Custom" : `Level ${spell.level}`}</small>${ruleDetails(spellDescription(spell.name, c.edition, EXPANDED_SPELL_SOURCES[c.edition]?.[spell.name] || ""))}</div>`
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
  activeCharacterId = id; edition = c.edition || "2014"; selectedClass = c.className || "Fighter";
  currentOriginFeat = c.originFeat || "";
  selectedFeatAbilities = { ...(c.featAbilityChoices || {}) };
  selectedAsi = c.asi ? JSON.parse(JSON.stringify(c.asi)) : {};
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
    const derivedBase = Number(c[ability] || 10) - Number(legacyOriginBonuses[ability] || 0) - Number(c.featBonuses?.[ability] || 0);
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

function levelFeatures(character, targetLevel) {
  const subclassName = character.customSubclass || character.subclass;
  const classFeatures = (CLASS_FEATURES[character.edition]?.[character.className] || [])
    .filter(([level]) => level === targetLevel)
    .map(([level, name]) => ({ level, name, source: character.className }));
  const subclassFeatures = resolvedSubclassFeatures(character.edition, character.className, subclassName)
    .filter(([level]) => level === targetLevel)
    .map(([level, name]) => ({ level, name, source: subclassName }));
  const beforeSlots = spellSlotResources(character).map(resource => `${resource.id}:${resource.max}:${resource.name}`).join("|");
  const afterCharacter = { ...character, level: targetLevel };
  const afterSlots = spellSlotResources(afterCharacter).map(resource => `${resource.id}:${resource.max}:${resource.name}`).join("|");
  const slotFeature = beforeSlots !== afterSlots && afterSlots
    ? [{ level: targetLevel, name: "Spell slot progression", source: character.className }]
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

function progressionChoiceBlocks(character, targetLevel, features) {
  const blocks = [];
  const featureNames = features.map(feature => feature.name);
  const levelRules = LEVEL_CHOICE_RULES[character.edition]?.[character.className] || {};
  const subclassAt = subclassLevel(character.className, character.edition);
  if (targetLevel === subclassAt) {
    const subclasses = subclassEntries(character.className, character.edition).map(item => item.name);
    blocks.push(`<div class="progression-choice">
      <label for="level-subclass">Choose your ${character.className} subclass</label>
      <select id="level-subclass" name="subclassChoice" required>${[...new Set(subclasses)].map(name => {
        const meta = subclassMetadata(character.className, name, character.edition);
        const suffix = meta?.source ? ` · ${meta.source}${meta.rules === "2014" && character.edition === "2024" ? " · expanded 5e" : ""}` : "";
        return `<option value="${escapeHtml(name)}" ${name === character.subclass ? "selected" : ""}>${escapeHtml(name + suffix)}</option>`;
      }).join("")}</select>
    </div>`);
  }
  const hasFightingStyleFeature = (CLASS_FEATURES[character.edition]?.[character.className] || [])
    .some(([unlock, name]) => unlock <= targetLevel && name.includes("Fighting Style"));
  if (featureNames.some(name => name.includes("Fighting Style")) || (hasFightingStyleFeature && !character.fightingStyle)) {
    const existingStyles = new Set([character.fightingStyle, ...(character.fightingStyles || [])].filter(Boolean));
    const styles = fightingStylesForClass(character.className, character.edition).filter(name => !existingStyles.has(name));
    blocks.push(`<div class="progression-choice"><strong>Choose a Fighting Style</strong>${optionRadios("fightingStyle", styles, "", true, option =>
      fightingStyleDescription(option, character.edition)
    )}</div>`);
  }
  const metamagicCount = Number(levelRules.metamagic?.[targetLevel] || 0);
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
  const invocationCount = Number(levelRules.invocations?.[targetLevel] || 0);
  if (invocationCount) {
    const options = PROGRESSION_OPTIONS.invocations[character.edition].filter(option => !(character.invocations || []).includes(option));
    blocks.push(`<div class="progression-choice" data-min-choices="${invocationCount}" data-choice-name="invocations"><strong>Choose ${invocationCount} Eldritch Invocation${invocationCount > 1 ? "s" : ""}</strong>${optionChecks("invocations", options, [], invocationCount, option =>
      progressionDescription("invocations", option, character.edition)
    )}</div>`);
  }
  const expertiseCount = Number(levelRules.expertise?.[targetLevel] || 0);
  if (expertiseCount) {
    const options = PROGRESSION_OPTIONS.skills.filter(option => !(character.expertise || []).includes(option));
    blocks.push(`<div class="progression-choice" data-min-choices="${expertiseCount}" data-choice-name="expertise"><strong>Choose ${expertiseCount} skills for Expertise</strong>${optionChecks("expertise", options, [], expertiseCount)}</div>`);
  }
  const masteryIncrease = Math.max(0, weaponMasteryCount(character.className, targetLevel, character.edition) - (character.weaponMastery || []).length);
  if (masteryIncrease > 0) {
    const availableWeapons = weaponMasteryOptions(character.className).filter(weapon => !(character.weaponMastery || []).includes(weapon));
    blocks.push(`<div class="progression-choice" data-min-choices="${masteryIncrease}" data-choice-name="weaponMastery"><strong>Choose ${masteryIncrease} mastered weapon${masteryIncrease > 1 ? "s" : ""}</strong>${optionChecks("weaponMastery", availableWeapons, [], masteryIncrease, weapon =>
      `${WEAPON_MASTERY_PROPERTIES[weapon] || "Mastery"} mastery property`
    )}</div>`);
  }
  if (character.edition === "2024" && character.className === "Cleric" && !character.divineOrder) {
    blocks.push(`<div class="progression-choice"><strong>Choose Divine Order</strong>${optionRadios("divineOrder", ["Protector", "Thaumaturge"])}</div>`);
  }
  if (character.edition === "2024" && character.className === "Druid" && !character.primalOrder) {
    blocks.push(`<div class="progression-choice"><strong>Choose Primal Order</strong>${optionRadios("primalOrder", ["Magician", "Warden"])}</div>`);
  }
  if (character.edition === "2024" && character.className === "Cleric" && targetLevel >= 7 && !character.blessedStrikes) {
    blocks.push(`<div class="progression-choice"><strong>Choose Blessed Strikes</strong>${optionRadios("blessedStrikes", ["Divine Strike", "Potent Spellcasting"])}</div>`);
  }
  if (character.edition === "2024" && character.className === "Druid" && targetLevel >= 7 && !character.elementalFury) {
    blocks.push(`<div class="progression-choice"><strong>Choose Elemental Fury</strong>${optionRadios("elementalFury", ["Potent Spellcasting", "Primal Strike"])}</div>`);
  }
  const advancementLevels = advancementLevelsFor(character.className);
  if (advancementLevels.includes(targetLevel)) {
    const availableFeats = FEATS[character.edition].filter(feat =>
        !feat.category.includes("Fighting Style")
        && feat.name !== "Ability Score Improvement"
        && featEligible(feat, targetLevel, character.className, character.edition)
        && (character.edition !== "2024" || feat.category === "General" || (targetLevel >= 19 && feat.category === "Epic Boon"))
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
  const lists = SPELL_LISTS[character.edition]?.[character.className];
  if (!lists) return "";
  const newMax = maxSpellLevel(character.className, targetLevel, character.edition);
  const progression = SPELL_PROGRESSION[character.edition]?.[character.className];
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
  const count = Number(CANTRIP_PROGRESSION[character.edition]?.[character.className]?.[targetLevel] || 0);
  const cantrips = SPELL_LISTS[character.edition]?.[character.className]?.[0] || [];
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

function openLevelUp(id) {
  const character = characters.find(item => item.id === id);
  if (!character) return;
  if (character.level >= 20) { toast("This character is already level 20"); return; }
  levelingCharacterId = id;
  const targetLevel = Number(character.level) + 1;
  const features = levelFeatures(character, targetLevel);
  const fixedGain = Math.max(1, Math.ceil(RULES.classes[character.className].hit / 2) + 1 + modifier(character.CON));
  $("#level-up-title").textContent = `${character.name} reaches level ${targetLevel}`;
  $("#level-up-subtitle").textContent = `${character.edition} ${character.className} progression · review every new benefit before saving.`;
  $("#level-track").innerHTML = `<div class="level-node">${character.level}</div><span>→</span><div class="level-node current">${targetLevel}</div>`;
  $("#level-up-content").innerHTML = `
    <section class="advancement-section">
      <h3>Features gained</h3>
      <p>These features are gained automatically at this level.</p>
      <div class="unlock-list">${features.map(feature => `<article class="unlock-card"><span class="check">✓</span><div><strong>${escapeHtml(feature.name)}</strong><small>${escapeHtml(feature.source)}</small>${ruleDetails(featureDescription(character.edition, feature.source, feature.name, character.className))}</div></article>`).join("") || `<article class="unlock-card"><span class="check">✓</span><div><strong>Core progression</strong><small>Proficiency, spell slots, or existing features may improve.</small></div></article>`}</div>
    </section>
    <section class="advancement-section">
      <h3>Hit points</h3>
      <p>Use the class fixed value or roll the ${character.className}'s d${RULES.classes[character.className].hit} Hit Die.</p>
      <div class="progression-choice">
        ${optionRadios("hpMethod", [`Fixed (+${fixedGain} HP)`, "Roll Hit Die"], `Fixed (+${fixedGain} HP)`)}
        <div class="hidden" id="hp-roll-controls">
          <label>Hit Die result<input name="hpRoll" type="number" min="1" max="${RULES.classes[character.className].hit}" value="${Math.ceil(RULES.classes[character.className].hit / 2)}"></label>
          <button type="button" class="button small ghost" id="roll-level-hp">Roll d${RULES.classes[character.className].hit}</button>
        </div>
      </div>
    </section>
    ${progressionChoiceBlocks(character, targetLevel, features) ? `<section class="advancement-section"><h3>Decisions at level ${targetLevel}</h3><p>Complete each choice to continue.</p>${progressionChoiceBlocks(character, targetLevel, features)}</section>` : ""}
    ${levelCantripChoices(character, targetLevel)}
    ${levelSpellChoices(character, targetLevel)}
    ${mysticArcanumChoices(character, targetLevel)}
    <div class="level-up-summary"><strong>Ready to advance?</strong><br>This saves a progression record and updates the character to level ${targetLevel}. Direct Edit remains available afterward.</div>`;
  updateLevelFeatAbilityOptions(character);
  $("#level-up-modal").classList.remove("hidden");
}

function closeLevelUp() {
  levelingCharacterId = null;
  $("#level-up-modal").classList.add("hidden");
}

function progressionSnapshot(character) {
  const keys = ["level", "hpOverride", "subclass", "customSubclass", "feats", "spells", "fightingStyle", "fightingStyles", "pactBoon", "metamagic", "invocations", "expertise", "weaponMastery", "divineOrder", "primalOrder", "blessedStrikes", "elementalFury", "resourceUsage", "baseAbilities", "originBonuses", "originFeat", "featAbilityChoices", "featBonuses", "speciesVariant", "backgroundAbilityMode", "backgroundPrimary", "backgroundSecondary", "originFeatChoice", ...ABILITIES];
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
  if (!character || character.level <= 1) return;
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
        updated.level = Math.max(1, Number(updated.level) - 1);
        const allowed = maxSpellLevel(updated.className, updated.level, updated.edition);
        updated.spells = (updated.spells || []).filter(spell => Number(typeof spell === "string" ? 0 : spell.level) <= allowed);
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
  const targetLevel = Number(character.level) + 1;
  const formElement = event.currentTarget;
  const formValues = new FormData(formElement);
  for (const block of $$("[data-min-choices]", formElement)) {
    const name = block.dataset.choiceName;
    const required = Number(block.dataset.minChoices);
    const count = formValues.getAll(name).length;
    const labels = { levelCantrips: "cantrip", levelSpells: "spell", mysticArcanum: "Mystic Arcanum", metamagic: "Metamagic option", invocations: "Eldritch Invocation", expertise: "Expertise skill", weaponMastery: "mastered weapon" };
    const label = labels[name] || `${name} option`;
    if (count < required) { toast(`Choose ${required} ${label}${required > 1 ? "s" : ""}`); return; }
  }
  const updated = structuredClone(character);
  const before = progressionSnapshot(character);
  const cls = RULES.classes[character.className];
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
    updated.subclass = formValues.get("subclassChoice");
    updated.customSubclass = "";
  }
  const choices = {};
  const fightingStyle = formValues.get("fightingStyle");
  if (fightingStyle) {
    choices.fightingStyle = fightingStyle;
    if (!updated.fightingStyle) updated.fightingStyle = fightingStyle;
    else updated.fightingStyles = [...new Set([...(updated.fightingStyles || []), fightingStyle])];
  }
  const pactBoon = formValues.get("pactBoon");
  if (pactBoon) { choices.pactBoon = pactBoon; updated.pactBoon = pactBoon; }
  ["metamagic", "invocations", "expertise", "weaponMastery"].forEach(name => {
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
    const lists = SPELL_LISTS[updated.edition]?.[updated.className] || {};
    const spellRecords = addedSpells.map(name => ({
      name,
      level: Number(Object.entries(lists).find(([, names]) => names.includes(name))?.[0] || 0)
    }));
    const existingNames = new Set((updated.spells || []).map(spell => typeof spell === "string" ? spell : spell.name));
    updated.spells = [...(updated.spells || []), ...spellRecords.filter(spell => !existingNames.has(spell.name))];
    choices.spells = addedSpells;
    if (arcanum) choices.mysticArcanum = arcanum;
  }
  const gained = levelFeatures(updated, targetLevel).map(feature => `${feature.source}: ${feature.name}`);
  updated.progressionHistory = [...(updated.progressionHistory || []), {
    level: targetLevel,
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
  toast(`${updated.name} is now level ${targetLevel}`);
}

function resetCanvasFromPortrait() {
  if (!portraitData) { resetPortrait(); return; }
  const image = new Image();
  image.onload = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, canvas.width, canvas.height); updatePreview(); };
  image.src = portraitData;
}

function roll(sides = selectedDie, count = 1, mod = 0, label = "") {
  const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1);
  const total = rolls.reduce((a, b) => a + b, 0) + Number(mod);
  const detail = `${count}d${sides}${Number(mod) ? signed(Number(mod)) : ""} [${rolls.join(", ")}]`;
  const entry = { total, detail, label: label || "Custom roll", time: Date.now() };
  rollHistory.unshift(entry); rollHistory = rollHistory.slice(0, 40); saveJson(ROLL_KEY, rollHistory); renderRolls();
  $("#dice-result strong").textContent = total; $("#dice-result p").textContent = `${entry.label} · ${detail}`;
  return total;
}

function renderRolls() {
  $("#roll-history").innerHTML = rollHistory.length ? rollHistory.map(r =>
    `<li><span>${escapeHtml(r.label)}<br><small>${escapeHtml(r.detail)}</small></span><strong>${r.total}</strong></li>`
  ).join("") : `<li><span>No rolls yet</span><strong>—</strong></li>`;
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
    if (sheetRoll) { const total = roll(Number(sheetRoll.dataset.die || 20), 1, Number(sheetRoll.dataset.modifier || 0), sheetRoll.dataset.sheetRoll); navigate("dice"); toast(`Rolled ${total}`); }
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
      renderClassFeaturePreview();
    }
    if (["species", "background", "speciesVariant", "backgroundAbilityMode"].includes(event.target.name)) {
      renderOriginRules();
      renderTalentChoices();
    } else if (event.target.closest("#origin-rules")) {
      setCurrentOriginFeat(originFeatFromForm());
      renderTalentChoices();
      updatePreview();
    }
    if (event.target.name === "weaponMastery" && event.target.checked) {
      const block = event.target.closest("[data-builder-choice-limit]");
      const limit = Number(block?.dataset.builderChoiceLimit || 0);
      const checked = $$('input[name="weaponMastery"]:checked', block);
      if (limit && checked.length > limit) {
        event.target.checked = false;
        toast(`Choose up to ${limit} mastered weapons`);
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
  }));
  $("#standard-array").addEventListener("click", () => { [15,14,13,12,10,8].forEach((v, i) => form.elements[ABILITIES[i]].value = v); updatePreview(); });
  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = formData();
    if (!data.name.trim()) { setStep(5); form.elements.name.focus(); toast("Your character needs a name"); return; }
    if (!validateOriginChoices()) { setStep(2); toast("Choose different eligible abilities and complete the origin feat selection"); return; }
    const masteryRequired = weaponMasteryCount(data.className, data.level, data.edition);
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
  $("#roll-selected").addEventListener("click", () => roll(selectedDie, Number($("#dice-count").value), Number($("#dice-mod").value)));
  $("#quick-roll").addEventListener("click", () => { const total = roll(20, 1, 0, "Quick d20"); toast(`Quick d20: ${total}`); });
  $("#clear-history").addEventListener("click", () => { rollHistory = []; saveJson(ROLL_KEY, []); renderRolls(); });
  $("#vault-search").addEventListener("input", event => renderCards(event.target.value));
  $("#export-data").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify({ version: 1, characters }, null, 2)], { type: "application/json" });
    const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = "arcana-forge-vault.json"; link.click(); URL.revokeObjectURL(link.href);
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
    await loadCloudCharacters();
    $("#sync-now").disabled = false;
  });
  $("#sign-out").addEventListener("click", async () => {
    if (cloudClient) await cloudClient.auth.signOut();
    cloudUser = null;
    characters = [];
    deletedCharacters = {};
    activeCharacterId = null;
    saveJson(STORAGE_KEY, characters);
    saveJson(DELETED_KEY, deletedCharacters);
    renderCards();
    renderSheet();
    updateAccount();
    setCloudStatus("Signed out. This browser still has a local copy of the vault.");
    toast("Signed out");
  });
  $("#mobile-menu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $("#close-level-up").addEventListener("click", closeLevelUp);
  $("#cancel-level-up").addEventListener("click", closeLevelUp);
  $("#level-up-modal").addEventListener("click", event => { if (event.target.id === "level-up-modal") closeLevelUp(); });
  $("#level-up-form").addEventListener("submit", completeLevelUp);
  $("#level-up-form").addEventListener("change", event => {
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
      if (character) updateLevelFeatAbilityOptions(character);
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
    const sides = RULES.classes[character.className].hit;
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
        options: { data: { display_name: displayName } }
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
  await loadCloudCharacters();
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
  if (cloudUser) await loadCloudCharacters();
  cloudClient.auth.onAuthStateChange((_event, session) => {
    const nextUser = session?.user || null;
    const changed = nextUser?.id !== cloudUser?.id;
    cloudUser = nextUser;
    if (cloudUser) prepareUserVault(cloudUser);
    updateAccount();
    if (changed && cloudUser) setTimeout(loadCloudCharacters, 0);
  });
  window.addEventListener("online", () => {
    if (cloudUser) loadCloudCharacters();
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && cloudUser) loadCloudCharacters();
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
