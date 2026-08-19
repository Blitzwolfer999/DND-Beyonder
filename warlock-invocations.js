// Completes the 2014 Eldritch Invocation list with the Xanathar's Guide to
// Everything and Tasha's Cauldron of Everything options (the base data only
// carried the 32 Player's Handbook invocations; the full 2014 list is 54).
// The 2024 list in the base data is already complete at 28.
//
// Tasha's also introduced Pact of the Talisman as a fourth 2014 pact boon,
// which three of these invocations require, so it is registered here too.
//
// Every summary below is an original concise description of the mechanic, in
// keeping with this project's content policy. Each opens with the invocation's
// prerequisite so the requirement is visible on the choice, matching how the
// existing invocation entries read.

const EXTRA_INVOCATIONS_2014 = {
  "Aspect of the Moon": "Prerequisite: Pact of the Tome. You no longer need sleep and cannot be forced to sleep, so you can keep watch through a long rest.",
  "Bond of the Talisman": "Prerequisite: Level 12+, Pact of the Talisman. You and the talisman's wearer can teleport to each other's side, a number of times per long rest equal to your proficiency bonus.",
  "Cloak of Flies": "Prerequisite: Level 5+. Wreathe yourself in buzzing insects for advantage on Intimidation checks and poison damage to adjacent foes, at the cost of your other Charisma checks.",
  "Eldritch Mind": "You have advantage on Constitution saving throws made to maintain concentration on a spell.",
  "Eldritch Smite": "Prerequisite: Level 5+, Pact of the Blade. Expend a warlock spell slot on a pact weapon hit for extra force damage, knocking a Huge or smaller target prone.",
  "Far Scribe": "Prerequisite: Level 5+, Pact of the Tome. Names written into your Book of Shadows can be reached with sending without spending a spell slot.",
  "Ghostly Gaze": "Prerequisite: Level 7+. Once per short rest, see through solid objects for a minute out to a short distance, using darkvision.",
  "Gift of the Depths": "Prerequisite: Level 5+. You can breathe underwater and gain a swimming speed, and can cast water breathing once per long rest without a slot.",
  "Gift of the Ever-Living Ones": "Prerequisite: Pact of the Chain. Whenever you regain hit points with your familiar nearby, any dice rolled for that healing count as their maximum.",
  "Gift of the Protectors": "Prerequisite: Level 9+, Pact of the Tome. Once per long rest, a creature named in your book drops to 1 hit point instead of 0.",
  "Grasp of Hadar": "Prerequisite: eldritch blast cantrip. Once each turn when your eldritch blast hits, you can drag the target closer to you.",
  "Improved Pact Weapon": "Prerequisite: Pact of the Blade. Your pact weapon counts as magical, grants a bonus to attack and damage rolls, and can serve as your spellcasting focus.",
  "Investment of the Chain Master": "Prerequisite: Pact of the Chain. Your familiar gains a flying or swimming speed, attacks against it use your spell save DC, and you can command it as a bonus action.",
  "Lance of Lethargy": "Prerequisite: eldritch blast cantrip. Once each turn when your eldritch blast hits, you can slow the target until the end of your next turn.",
  "Maddening Hex": "Prerequisite: Level 5+, hex or a warlock curse feature. A bonus action deals psychic damage to your cursed target and the creatures around it.",
  "Protection of the Talisman": "Prerequisite: Level 7+, Pact of the Talisman. The talisman's wearer can add a bonus die to a failed saving throw, a number of times per long rest equal to your proficiency bonus.",
  "Rebuke of the Talisman": "Prerequisite: Pact of the Talisman. When the wearer is hit, you can react to deal psychic damage to the attacker and push it away.",
  "Relentless Hex": "Prerequisite: Level 7+, hex or a warlock curse feature. A bonus action teleports you to a space next to your cursed target.",
  "Shroud of Shadow": "Prerequisite: Level 15+. You can cast invisibility at will, without spending a spell slot.",
  "Tomb of Levistus": "Prerequisite: Level 5+. Once per short rest, react to damage by encasing yourself in ice for temporary hit points, at the cost of your speed.",
  "Trickster's Escape": "Prerequisite: Level 7+. Once per long rest, cast freedom of movement on yourself without spending a spell slot.",
  "Undying Servitude": "Prerequisite: Level 5+. Once per long rest, cast animate dead without spending a spell slot."
};

// Prerequisites for every invocation, so the picker only offers ones the
// character actually qualifies for (D&D Beyond gates them the same way).
//   level      - minimum warlock level
//   pact       - required Pact Boon (a boon in 2014; itself an invocation in 2024)
//   invocation - another invocation that must already be taken
//   cantrip    - required cantrip
//   feature    - required class feature, described in prose
// An invocation with no entry has no prerequisite.
const INVOCATION_PREREQUISITES = {
  "2014": {
    "Agonizing Blast": { cantrip: "Eldritch Blast" },
    "Ascendant Step": { level: 9 },
    "Aspect of the Moon": { pact: "Pact of the Tome" },
    "Bewitching Whispers": { level: 7 },
    "Bond of the Talisman": { level: 12, pact: "Pact of the Talisman" },
    "Book of Ancient Secrets": { pact: "Pact of the Tome" },
    "Chains of Carceri": { level: 15, pact: "Pact of the Chain" },
    "Cloak of Flies": { level: 5 },
    "Dreadful Word": { level: 7 },
    "Eldritch Smite": { level: 5, pact: "Pact of the Blade" },
    "Eldritch Spear": { cantrip: "Eldritch Blast" },
    "Far Scribe": { level: 5, pact: "Pact of the Tome" },
    "Ghostly Gaze": { level: 7 },
    "Gift of the Depths": { level: 5 },
    "Gift of the Ever-Living Ones": { pact: "Pact of the Chain" },
    "Gift of the Protectors": { level: 9, pact: "Pact of the Tome" },
    "Grasp of Hadar": { cantrip: "Eldritch Blast" },
    "Improved Pact Weapon": { pact: "Pact of the Blade" },
    "Investment of the Chain Master": { pact: "Pact of the Chain" },
    "Lance of Lethargy": { cantrip: "Eldritch Blast" },
    "Lifedrinker": { level: 12, pact: "Pact of the Blade" },
    "Maddening Hex": { level: 5, feature: "the hex spell or a warlock curse feature" },
    "Master of Myriad Forms": { level: 15 },
    "Minions of Chaos": { level: 9 },
    "Mire the Mind": { level: 5 },
    "One with Shadows": { level: 5 },
    "Otherworldly Leap": { level: 9 },
    "Protection of the Talisman": { level: 7, pact: "Pact of the Talisman" },
    "Rebuke of the Talisman": { pact: "Pact of the Talisman" },
    "Relentless Hex": { level: 7, feature: "the hex spell or a warlock curse feature" },
    "Repelling Blast": { cantrip: "Eldritch Blast" },
    "Sculptor of Flesh": { level: 7 },
    "Shroud of Shadow": { level: 15 },
    "Sign of Ill Omen": { level: 5 },
    "Thirsting Blade": { level: 5, pact: "Pact of the Blade" },
    "Tomb of Levistus": { level: 5 },
    "Trickster's Escape": { level: 7 },
    "Undying Servitude": { level: 5 },
    "Visions of Distant Realms": { level: 15 },
    "Voice of the Chain Master": { pact: "Pact of the Chain" },
    "Whispers of the Grave": { level: 9 },
    "Witch Sight": { level: 15 }
  },
  "2024": {
    "Agonizing Blast": { level: 2, cantrip: "a warlock cantrip that deals damage" },
    "Ascendant Step": { level: 5 },
    "Devil's Sight": { level: 2 },
    "Devouring Blade": { level: 12, invocation: "Thirsting Blade" },
    "Eldritch Smite": { level: 5, pact: "Pact of the Blade" },
    "Eldritch Spear": { level: 2, cantrip: "a warlock cantrip that deals damage" },
    "Fiendish Vigor": { level: 2 },
    "Gaze of Two Minds": { level: 5 },
    "Gift of the Depths": { level: 5 },
    "Gift of the Protectors": { level: 9, pact: "Pact of the Tome" },
    "Investment of the Chain Master": { level: 5, pact: "Pact of the Chain" },
    "Lessons of the First Ones": { level: 2 },
    "Lifedrinker": { level: 12, pact: "Pact of the Blade" },
    "Mask of Many Faces": { level: 2 },
    "Master of Myriad Forms": { level: 5 },
    "Misty Visions": { level: 2 },
    "One with Shadows": { level: 5 },
    "Otherworldly Leap": { level: 2 },
    "Repelling Blast": { level: 2, cantrip: "a warlock cantrip that makes an attack roll" },
    "Thirsting Blade": { level: 5, pact: "Pact of the Blade" },
    "Visions of Distant Realms": { level: 9 },
    "Whispers of the Grave": { level: 7 },
    "Witch Sight": { level: 15 }
  }
};

const EXTRA_PACT_BOONS_2014 = {
  "Pact of the Talisman": "Your patron gifts you an amulet; whoever wears it can add a bonus die to a failed ability check, a number of times per long rest equal to your proficiency bonus."
};

(function registerWarlockInvocations() {
  if (typeof PROGRESSION_OPTIONS !== "undefined" && PROGRESSION_OPTIONS.invocations) {
    const list = PROGRESSION_OPTIONS.invocations[2014] || [];
    Object.keys(EXTRA_INVOCATIONS_2014).forEach(name => {
      if (!list.includes(name)) list.push(name);
    });
    list.sort((a, b) => a.localeCompare(b));
    PROGRESSION_OPTIONS.invocations[2014] = list;

    const boons = PROGRESSION_OPTIONS.pactBoons2014 || [];
    Object.keys(EXTRA_PACT_BOONS_2014).forEach(name => {
      if (!boons.includes(name)) boons.push(name);
    });
    PROGRESSION_OPTIONS.pactBoons2014 = boons;
  }
  if (typeof CONTENT_SUMMARIES !== "undefined") {
    CONTENT_SUMMARIES.invocations = CONTENT_SUMMARIES.invocations || {};
    Object.entries(EXTRA_INVOCATIONS_2014).forEach(([name, summary]) => {
      if (!CONTENT_SUMMARIES.invocations[name]) CONTENT_SUMMARIES.invocations[name] = summary;
    });
    CONTENT_SUMMARIES.pactBoons = CONTENT_SUMMARIES.pactBoons || {};
    Object.entries(EXTRA_PACT_BOONS_2014).forEach(([name, summary]) => {
      if (!CONTENT_SUMMARIES.pactBoons[name]) CONTENT_SUMMARIES.pactBoons[name] = summary;
    });
  }
})();

if (typeof module !== "undefined") {
  module.exports = { EXTRA_INVOCATIONS_2014, EXTRA_PACT_BOONS_2014 };
}
