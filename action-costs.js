// What a class feature costs on your turn, so the sheet can group everything a
// character can do by action economy the way a combat turn actually works.
//
// Only features whose rules text states the cost are listed. Anything not here
// is shown under "Other" rather than guessed at: a wrong action cost is worse
// than an unsorted one. Costs were read from the 2024 class descriptions on
// dnd2024.wikidot.com; where a feature works the same in both editions it is
// listed once, and the 2014-only entries are marked.

const FEATURE_ACTION_COSTS = {
  // --- Bonus Action -------------------------------------------------------
  Rage: "Bonus Action",
  "Bardic Inspiration": "Bonus Action",
  "Wild Shape": "Bonus Action",
  "Second Wind": "Bonus Action",
  "Lay on Hands": "Bonus Action",
  "Nature's Veil": "Bonus Action",
  "Cunning Action": "Bonus Action",
  "Innate Sorcery": "Bonus Action",
  "Flurry of Blows": "Bonus Action",
  "Patient Defense": "Bonus Action",
  "Step of the Wind": "Bonus Action",
  "Steps of the Fey": "Bonus Action",
  "Divine Smite": "Bonus Action",
  "Frenzy": "Bonus Action",

  // --- Reaction -----------------------------------------------------------
  "Uncanny Dodge": "Reaction",
  "Deflect Attacks": "Reaction",
  "Deflect Missiles": "Reaction",
  "Slow Fall": "Reaction",
  "Flash of Genius": "Reaction",
  "Spirit Shield": "Reaction",

  // --- Action -------------------------------------------------------------
  "Divine Intervention": "Action",
  "Cleansing Touch": "Action",
  "Fey Presence": "Action",

  // --- No action, or taken outside a turn ---------------------------------
  "Action Surge": "No action",
  Indomitable: "No action",
  "Stroke of Luck": "No action",
  "Wild Resurgence": "No action",
  "Uncanny Metabolism": "No action",
  "Arcane Recovery": "Short Rest",
  "Sorcerous Restoration": "Short Rest",
  "Magical Cunning": "1 minute",
  "Natural Recovery": "Short Rest"
};

// Features whose cost differs in the 2014 rules.
const FEATURE_ACTION_COSTS_2014 = {
  "Wild Shape": "Action",
  "Lay on Hands": "Action",
  "Divine Sense": "Action",
  "Divine Intervention": "Action"
};

function featureActionCost(name, rulesEdition) {
  if (rulesEdition === "2014" && FEATURE_ACTION_COSTS_2014[name]) return FEATURE_ACTION_COSTS_2014[name];
  return FEATURE_ACTION_COSTS[name] || "";
}

// Which column of the action economy a casting time or feature cost belongs in.
function actionEconomyBucket(cost) {
  const text = String(cost || "").trim();
  if (/^bonus action/i.test(text)) return "Bonus Action";
  if (/^reaction/i.test(text)) return "Reaction";
  if (/^(1 )?(magic )?action\b/i.test(text)) return "Action";
  return "Other";
}

if (typeof module !== "undefined") {
  module.exports = { FEATURE_ACTION_COSTS, FEATURE_ACTION_COSTS_2014, featureActionCost, actionEconomyBucket };
}
