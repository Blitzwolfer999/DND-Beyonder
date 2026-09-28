// Skill proficiencies for the backgrounds in the expanded catalog. The core
// Player's Handbook backgrounds live in BACKGROUND_SKILLS in app.js; everything
// the setting books add was offered in the builder while granting no skills at
// all, so a character built on one of these lost two proficiencies.
//
// Sourced from dnd5e.wikidot.com and dnd2024.wikidot.com. Skill names only,
// which are mechanics rather than prose.

// Backgrounds whose two skills are fixed.
const EXPANDED_BACKGROUND_SKILLS = {
  "Aberrant Heir": ["History", "Intimidation"],
  Anthropologist: ["Insight", "Religion"],
  Archaeologist: ["History", "Survival"],
  "Astral Drifter": ["Insight", "Religion"],
  Athlete: ["Acrobatics", "Athletics"],
  "Azorius Functionary": ["Insight", "Intimidation"],
  "Boros Legionnaire": ["Athletics", "Intimidation"],
  Carouser: ["Deception", "Persuasion"],
  "Celebrity Adventurer's Scion": ["Perception", "Performance"],
  "Chondathan Freebooter": ["Athletics", "Sleight of Hand"],
  "Clan Crafter": ["History", "Insight"],
  Courtier: ["Insight", "Persuasion"],
  "Dead Magic Dweller": ["Medicine", "Survival"],
  "Dimir Operative": ["Deception", "Stealth"],
  "Dragon Cultist": ["Deception", "Stealth"],
  "Emerald Enclave Caretaker": ["Nature", "Survival"],
  Faceless: ["Deception", "Intimidation"],
  "Failed Merchant": ["Investigation", "Persuasion"],
  "Far Traveler": ["Insight", "Perception"],
  Feylost: ["Deception", "Survival"],
  Fisher: ["History", "Survival"],
  "Flaming Fist Mercenary": ["Intimidation", "Perception"],
  Gambler: ["Deception", "Insight"],
  "Gate Warden": ["Persuasion", "Survival"],
  "Genie Touched": ["Perception", "Persuasion"],
  "Giant Foundling": ["Intimidation", "Survival"],
  "Golgari Agent": ["Nature", "Survival"],
  "Gruul Anarch": ["Animal Handling", "Athletics"],
  Harper: ["Performance", "Sleight of Hand"],
  "House Agent": ["Investigation", "Persuasion"],
  "House Cannith Heir": ["Investigation", "Sleight of Hand"],
  "House Deneith Heir": ["Insight", "Perception"],
  "House Ghallanda Heir": ["Insight", "Persuasion"],
  "House Jorasco Heir": ["Medicine", "Stealth"],
  "House Kundarak Heir": ["Arcana", "Investigation"],
  "House Lyrandar Heir": ["Acrobatics", "Nature"],
  "House Medani Heir": ["Insight", "Investigation"],
  "House Orien Heir": ["Acrobatics", "Athletics"],
  "House Phiarlan Heir": ["Deception", "Stealth"],
  "House Sivis Heir": ["History", "Perception"],
  "House Tharashk Heir": ["Perception", "Survival"],
  "House Thuranni Heir": ["Performance", "Stealth"],
  "House Vadalis Heir": ["Animal Handling", "Nature"],
  "Ice Fisher": ["Animal Handling", "Athletics"],
  Inquisitive: ["Insight", "Investigation"],
  "Izzet Engineer": ["Arcana", "Investigation"],
  "Knight of Solamnia": ["Athletics", "Survival"],
  "Knight Of The Gauntlet": ["Athletics", "Medicine"],
  "Lords' Alliance Vassal": ["Insight", "Persuasion"],
  "Lorehold Student": ["History", "Religion"],
  "Lorwyn Expert": ["Athletics", "Nature"],
  "Mage of High Sorcery": ["Arcana", "History"],
  Marine: ["Athletics", "Survival"],
  "Mercenary Veteran": ["Athletics", "Persuasion"],
  "Mist Wanderer": ["Stealth", "Survival"],
  "Moonwell Pilgrim": ["Nature", "Performance"],
  "Mulhorandi Tomb Raider": ["Investigation", "Religion"],
  Mythalkeeper: ["Arcana", "History"],
  "Orzhov Representative": ["Intimidation", "Religion"],
  "Pact Seeker": ["Arcana", "Persuasion"],
  Plaintiff: ["Medicine", "Persuasion"],
  "Prismari Student": ["Acrobatics", "Performance"],
  "Purple Dragon Squire": ["Animal Handling", "Insight"],
  "Quandrix Student": ["Arcana", "Nature"],
  "Rakdos Cultist": ["Acrobatics", "Performance"],
  "Rashemi Wanderer": ["Intimidation", "Perception"],
  Rewarded: ["Insight", "Persuasion"],
  "Rival Intern": ["History", "Investigation"],
  Ruined: ["Stealth", "Survival"],
  "Rune Carver": ["History", "Perception"],
  "Selesnya Initiate": ["Nature", "Persuasion"],
  "Shadowmasters Exile": ["Acrobatics", "Stealth"],
  "Shadowmoor Expert": ["Acrobatics", "Deception"],
  Shipwright: ["History", "Perception"],
  "Silverquill Student": ["Intimidation", "Persuasion"],
  "Simic Scientist": ["Arcana", "Medicine"],
  Smuggler: ["Athletics", "Deception"],
  "Spellfire Initiate": ["Arcana", "Perception"],
  "Spirit Medium": ["Insight", "Religion"],
  "Uthgardt Tribe Member": ["Athletics", "Survival"],
  "Vampire Devotee": ["Persuasion", "Stealth"],
  "Vampire Survivor": ["Insight", "Religion"],
  "Waterdhavian Noble": ["History", "Persuasion"],
  Wildspacer: ["Athletics", "Survival"],
  "Witchlight Hand": ["Performance", "Sleight of Hand"],
  "Witherbloom Student": ["Nature", "Survival"],
  "Zhentarim Mercenary": ["Intimidation", "Perception"]
};

// Backgrounds that let you pick one or both skills. The builder stores a
// starting pair and lets you change it, and the sheet already flags skills
// that differ from the default rather than rewriting them, so these list the
// fixed skill first and a sensible default for the choice.
const CHOICE_BACKGROUND_SKILLS = {
  "Cloistered Scholar": { skills: ["History", "Arcana"], choose: "History, plus Arcana, Nature or Religion" },
  "Faction Agent": { skills: ["Insight", "Investigation"], choose: "Insight, plus one Intelligence, Wisdom or Charisma skill" },
  "Haunted One": { skills: ["Arcana", "Investigation"], choose: "two of Arcana, Investigation, Religion or Survival" },
  Inheritor: { skills: ["Survival", "Arcana"], choose: "Survival, plus Arcana, History or Religion" },
  Investigator: { skills: ["Insight", "Investigation"], choose: "two of Insight, Investigation or Perception" },
  "Knight of the Order": { skills: ["Persuasion", "Arcana"], choose: "Persuasion, plus Arcana, History, Nature or Religion" },
  "Planar Philosopher": { skills: ["Arcana", "Insight"], choose: "Arcana, plus your faction's skill or one of your choice" },
  "Urban Bounty Hunter": { skills: ["Deception", "Stealth"], choose: "two of Deception, Insight, Persuasion or Stealth" }
};

// BACKGROUND_SKILLS lives in app.js, which loads after the content files, so
// these are merged in from the init() hook the other content packs use.
function registerBackgroundSkillsRuntime() {
  if (typeof BACKGROUND_SKILLS === "undefined") return;
  Object.entries(EXPANDED_BACKGROUND_SKILLS).forEach(([name, skills]) => {
    if (!BACKGROUND_SKILLS[name]) BACKGROUND_SKILLS[name] = skills;
  });
  Object.entries(CHOICE_BACKGROUND_SKILLS).forEach(([name, entry]) => {
    if (!BACKGROUND_SKILLS[name]) BACKGROUND_SKILLS[name] = entry.skills;
  });
}

if (typeof module !== "undefined") {
  module.exports = { EXPANDED_BACKGROUND_SKILLS, CHOICE_BACKGROUND_SKILLS };
}
