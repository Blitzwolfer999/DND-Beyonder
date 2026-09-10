/* What each D&D 3.5 class feature actually does.
 *
 * Mechanics from the 3.5 System Reference Document, published by Wizards of the
 * Coast under the Open Game License v1.0a. The wording is original summary
 * writing rather than reproduced sourcebook prose.
 *
 * These have to live apart from the shared CONTENT_SUMMARIES.features map,
 * which is keyed by name across every edition. A dozen 3.5 features share a
 * name with a 5e one and mean something different by it -- 3.5's Uncanny Dodge
 * keeps your Dexterity bonus to Armor Class when flat-footed, where 5e's halves
 * the damage of one attack. Left to the shared map, every 3.5 sheet described
 * the 5e version.
 */

const D35_FEATURE_TEXT = {
  /* --- Barbarian --- */
  "Fast movement": "Land speed increases by 10 feet in light or medium armour, or none, so long as the barbarian is not carrying a heavy load.",
  "Illiteracy": "A barbarian begins unable to read or write any language, and must spend two skill points to learn how.",
  "Uncanny dodge": "The barbarian keeps their Dexterity bonus to Armor Class even when flat-footed or struck by an attacker they cannot see. Being immobilised still costs it.",
  "Improved uncanny dodge": "No longer flankable. Only a rogue at least four levels higher than this character's combined uncanny dodge levels can flank them to sneak attack.",
  "Greater rage": "The rage bonuses improve to +6 Strength, +6 Constitution and a +3 morale bonus on Will saves.",
  "Tireless rage": "The barbarian is no longer fatigued when a rage ends.",
  "Indomitable will": "While raging, the barbarian gains a +4 bonus on Will saves against enchantment spells and effects, on top of the rage's own morale bonus.",
  "Mighty rage": "The rage bonuses improve again, to +8 Strength, +8 Constitution and a +4 morale bonus on Will saves.",

  /* --- Bard --- */
  "Bardic music": "A performance that produces a real magical effect. Usable once a day per bard level, and each use costs one of those daily attempts.",
  "Bardic knowledge": "A check of 1d20 plus bard level plus Intelligence modifier to recall a scrap of legend or local lore about a person, place or thing.",
  "Countersong": "Ten rounds of performance that lets anyone within thirty feet use the bard's Perform check in place of their own save against sonic or language-dependent magic.",
  "Fascinate": "One creature per three bard levels within ninety feet sits rapt for as long as the bard performs, up to a round per level. A successful Will save shrugs it off.",
  "Inspire competence": "An ally who can hear the bard gains a +2 competence bonus on skill checks for as long as the performance lasts, up to two minutes.",
  "Suggestion": "A creature already fascinated can be given a suggestion without spending a spell, resisted by a Will save.",
  "Mass suggestion": "The suggestion reaches every creature the bard has fascinated, not just one.",
  "Inspire greatness": "One ally per three levels above 8th gains 2 bonus Hit Dice, +2 on attack rolls and +1 on Fortitude saves while the bard plays.",
  "Song of freedom": "A minute of performance acts as break enchantment on one creature within thirty feet.",
  "Inspire heroics": "One ally per three levels above 14th gains a +4 morale bonus on saving throws and a +4 dodge bonus to Armor Class.",

  /* --- Cleric --- */
  "Turn or rebuke undead": "A good cleric drives undead away and may destroy them; an evil one cows them into obedience instead. Usable three times a day plus the cleric's Charisma modifier.",
  "Aura": "A cleric of a deity with a strong alignment radiates an aura of that alignment, of a power equal to their class level.",
  "Spontaneous casting": "A good cleric can drop a prepared spell to cast a cure spell of the same level instead; an evil one converts to inflict spells the same way.",
  "Deity, domains, and domain spells": "Two domains chosen from those the cleric's deity allows. Each grants a power and adds one spell to every level of the cleric's list, cast from a slot of its own.",

  /* --- Druid --- */
  "Animal companion": "A loyal animal that grows in power alongside the druid, gaining bonus Hit Dice, natural armour and improved Strength and Dexterity as the class advances.",
  "Nature sense": "A +2 bonus on Knowledge (nature) and Survival checks.",
  "Wild empathy": "A check of 1d20 plus druid level plus Charisma modifier to shift an animal's attitude, taking a minute and working the way a Diplomacy check does on a person.",
  "Woodland stride": "Undergrowth, thorns and briars neither slow the druid nor harm them, though magically manipulated growth still does.",
  "Trackless step": "The druid leaves no trail in natural surroundings and cannot be tracked, unless they choose to leave one.",
  "Resist nature’s lure": "A +4 bonus on saving throws against the spell-like abilities of fey creatures.",
  "Venom immunity": "Immune to all poisons.",
  "A thousand faces": "The druid can change their appearance at will, as the alter self spell, but only while in their own form.",
  "Timeless body": "The druid no longer takes penalties from ageing, though the years still pass and the eventual end still comes.",

  /* --- Fighter --- */
  "Bonus feat": "An extra feat chosen from the fighter's own list, on top of the ones every character earns.",

  /* --- Monk --- */
  "Unarmed strike": "The monk strikes for lethal damage barehanded, on the class's own damage progression, and may deal non-lethal damage instead at no penalty.",
  "Flurry of blows": "An extra attack in a full attack, all of them taken at a penalty that shrinks as the monk advances.",
  "Greater flurry": "A second extra attack, so the flurry now grants two beyond the normal sequence.",
  "Evasion": "A successful Reflex save against an effect that would deal half damage on a save takes no damage at all. Only while in light armour or none.",
  "Improved evasion": "Evasion, and a failed save now costs only half damage rather than all of it.",
  "Still mind": "A +2 bonus on saving throws against spells and effects of the enchantment school.",
  "Ki strike (magic)": "The monk's unarmed strike counts as a magic weapon for overcoming damage reduction.",
  "Ki strike (lawful)": "The unarmed strike also counts as lawful for the same purpose.",
  "Ki strike (adamantine)": "The unarmed strike also counts as adamantine, letting it cut through hardness and the damage reduction that stops lesser metals.",
  "Purity of body": "Immune to all natural disease, though magical and supernatural ones still take hold.",
  "Wholeness of body": "Once a day the monk heals themselves twice their level in hit points.",
  "Diamond body": "Immune to poison of every kind.",
  "Abundant step": "Once a day the monk steps through space as the dimension door spell, at a caster level of half their monk level.",
  "Diamond soul": "Spell resistance equal to the monk's level plus ten.",
  "Quivering palm": "Once a week, a strike that sets up lethal vibrations. Within a day per level the monk can will the victim dead; a Fortitude save avoids it. Only against a creature with fewer Hit Dice than the monk has levels.",
  "Tongue of the sun and moon": "The monk can speak with any living creature.",
  "Empty body": "Once a day the monk becomes ethereal for a round per level, as the etherealness spell.",
  "Perfect self": "The monk becomes a native outsider, gains damage reduction 10 magic, and can no longer be affected by spells that single out humanoids.",

  /* --- Paladin --- */
  "Aura of good": "The paladin radiates good of a power equal to their class level, visible to anyone detecting it.",
  "Detect evil": "At will, as the detect evil spell.",
  "Divine grace": "The paladin adds their Charisma modifier to every saving throw.",
  "Lay on hands": "Once a day the paladin heals a total of their level times their Charisma modifier, divided as they like. Spent on an undead creature it becomes damage instead.",
  "Aura of courage": "The paladin is immune to fear, and allies within ten feet gain a +4 morale bonus on saves against it.",
  "Divine health": "Immune to all disease, including the supernatural kinds such as mummy rot and lycanthropy.",
  "Turn undead": "The paladin turns undead as a cleric of three levels lower, three times a day plus their Charisma modifier.",
  "Special mount": "A bonded warhorse or pony, summoned once a day for a period that lengthens with level, stronger and cleverer than its kind and sharing the paladin's growth.",

  /* --- Ranger --- */
  "Track": "The ranger gains Track as a bonus feat, following a trail with a Survival check.",
  "Combat style": "Archery or two-weapon fighting. The ranger gains Rapid Shot or Two-Weapon Fighting as a bonus feat without meeting its prerequisites, while in light armour or none.",
  "Improved combat style": "Manyshot or Improved Two-Weapon Fighting, again without meeting the prerequisites.",
  "Combat style mastery": "Improved Precise Shot or Greater Two-Weapon Fighting, on the same terms.",
  "Endurance": "The ranger gains Endurance as a bonus feat, easing the checks that long marches and forced exertion demand.",
  "Swift tracker": "The ranger can follow a trail at their normal speed with only a -5 penalty, rather than the usual halved pace.",
  "Camouflage": "The ranger can use Hide in any natural terrain, even with no cover or concealment to hand.",
  "Hide in plain sight": "In natural terrain the ranger can hide even while being observed, with no distraction or cover needed.",

  /* --- Rogue --- */
  "Trapfinding": "The rogue can use Search to find traps whose Difficulty Class is above 20, and Disable Device to disarm magical ones.",
  "Special ability": "A choice from the rogue's own list: crippling strike, defensive roll, improved evasion, opportunist, skill mastery or slippery mind.",

  /* --- Sorcerer and Wizard --- */
  "Summon familiar": "A small magical animal bound to the caster, granting a benefit of its own kind, sharing the caster's saves and lending its senses through a shared link.",
  "Scribe Scroll": "A bonus item creation feat, letting the wizard write spells onto scrolls that anyone able to read them can use."
};

/* Families where the number lives in the name. */
const D35_FEATURE_PATTERNS = [
  [/^Rage (\d+)\/day$/,
    m => `A rage grants +4 Strength, +4 Constitution and a +2 morale bonus on Will saves at the cost of -2 Armor Class, and lasts 3 rounds plus the new Constitution modifier. Usable ${m[1]} time${m[1] === "1" ? "" : "s"} a day, and the barbarian is fatigued afterwards.`],
  [/^Sneak attack \+(\d+)d6$/,
    m => `When the target is denied its Dexterity bonus to Armor Class, or the rogue is flanking, the attack deals an extra ${m[1]}d6 damage. Only within thirty feet, and never against a creature immune to critical hits.`],
  [/^Trap sense \+(\d+)$/,
    m => `A +${m[1]} bonus on Reflex saves against traps, and a +${m[1]} dodge bonus to Armor Class against attacks made by them.`],
  [/^Damage reduction (\d+)\/—$/,
    m => `The character ignores ${m[1]} points of damage from every physical attack. Nothing overcomes it.`],
  [/^Smite evil (\d+)\/day$/,
    m => `${m[1]} time${m[1] === "1" ? "" : "s"} a day the paladin adds their Charisma modifier to one attack roll and their paladin level to its damage, against an evil target.`],
  [/^Remove disease (\d+)\/week$/,
    m => `The paladin can cure disease ${m[1]} time${m[1] === "1" ? "" : "s"} a week, as the spell of that name.`],
  [/^(\d)(?:st|nd|rd|th) favored enemy$/,
    () => "Another kind of creature the ranger has studied. Each favoured enemy grants a bonus on Bluff, Listen, Sense Motive, Spot and Survival checks against it, and the same bonus on weapon damage. Every new choice also raises one earlier one."],
  [/^Inspire courage \+(\d+)$/,
    m => `Allies who can hear the bard gain a +${m[1]} morale bonus on attack rolls and weapon damage, and the same against charm and fear, for as long as the performance lasts and five rounds after.`],
  [/^Slow fall (\d+) ft$/,
    m => `Within arm's reach of a wall the monk can break a fall of up to ${m[1]} feet, taking no damage from it.`],
  [/^Slow fall any distance$/,
    () => "Within arm's reach of a wall the monk can break a fall of any height at all."],
  [/^Wild shape \((\d+)\/day\)$/,
    m => `The druid takes the shape of a Small or Medium animal ${m[1]} time${m[1] === "1" ? "" : "s"} a day, as the polymorph spell but only into animal form, for an hour per level or until they change back.`],
  [/^Wild shape \((Tiny|Large|Huge|plant)\)$/,
    m => m[1] === "plant"
      ? "Wild shape now reaches plant creatures as well as animals."
      : `Wild shape now reaches ${m[1]} animals as well.`],
  [/^Wild shape \(elemental (\d+)\/day\)$/,
    m => `The druid can also take elemental form ${m[1]} time${m[1] === "1" ? "" : "s"} a day, up to Large size.`],
  [/^Wild shape \((\d+)\/day, elemental (\d+)\/day\)$/,
    m => `Animal form ${m[1]} times a day, and elemental form ${m[2]} times, up to Huge size.`],
  [/^Wild shape \(elemental (\d+)\/day, Huge elemental\)$/,
    m => `Elemental form ${m[1]} times a day, now reaching Huge elementals.`]
];

function d35FeatureDescription(name) {
  const key = String(name || "");
  if (D35_FEATURE_TEXT[key]) return D35_FEATURE_TEXT[key];
  for (const [pattern, build] of D35_FEATURE_PATTERNS) {
    const match = pattern.exec(key);
    if (match) return build(match);
  }
  return "";
}

// A handful of features are described in the class entry rather than printed in
// the Special column, so the tables miss them. The sparse classes are the ones
// that suffer: an SRD cleric's table lists exactly one thing.
const D35_EXTRA_CLASS_FEATURES = {
  Cleric: [[1, "Aura"], [1, "Spontaneous casting"], [1, "Deity, domains, and domain spells"]],
  Druid: [[1, "Nature sense"], [1, "Wild empathy"]],
  Bard: [[1, "Bardic knowledge"]]
};

function registerD35FeatureText() {
  if (typeof D35_CLASS_FEATURES === "undefined") return;
  Object.entries(D35_EXTRA_CLASS_FEATURES).forEach(([className, rows]) => {
    const existing = D35_CLASS_FEATURES[className] || [];
    const known = new Set(existing.map(row => row[1]));
    const additions = rows.filter(row => !known.has(row[1]));
    if (!additions.length) return;
    D35_CLASS_FEATURES[className] = [...existing, ...additions]
      .sort((a, b) => a[0] - b[0]);
  });
}

if (typeof window !== "undefined") {
  window.D35_FEATURE_TEXT = D35_FEATURE_TEXT;
  window.D35_FEATURE_PATTERNS = D35_FEATURE_PATTERNS;
  window.D35_EXTRA_CLASS_FEATURES = D35_EXTRA_CLASS_FEATURES;
  window.d35FeatureDescription = d35FeatureDescription;
  window.registerD35FeatureText = registerD35FeatureText;
}
