// Subclasses from the newest 2024-rules books: Arcana Unleashed, Ravenloft:
// The Horrors Within, Forgotten Realms: Heroes of Faerûn and Eberron: Forge of
// the Artificer. Catalog rows, per-level features, and the spells a subclass
// always has prepared.
//
// Every summary here is an original concise description of the mechanic, in
// keeping with this project's content policy: names, levels and numbers come
// from the sourcebook, the wording does not.

const NEW_BOOK_SUBCLASSES = {
  Bard: [["College of Spirits", "Ravenloft: The Horrors Within"]],
  Cleric: [["Arcana Domain", "Arcana Unleashed"]],
  Fighter: [["Arcane Archer", "Arcana Unleashed"]],
  Monk: [["Warrior of the Mystic Arts", "Arcana Unleashed"]],
  Rogue: [["Phantom", "Ravenloft: The Horrors Within"]],
  Warlock: [["Vestige Patron", "Arcana Unleashed"]],
  Wizard: [
    ["Conjurer", "Arcana Unleashed"],
    ["Enchanter", "Arcana Unleashed"],
    ["Necromancer", "Arcana Unleashed"],
    ["Transmuter", "Arcana Unleashed"]
  ]
};

const NEW_BOOK_SUBCLASS_FEATURES = {
  // ---------------- Ravenloft: The Horrors Within ----------------
  "College of Spirits": [
    [3, "Channeler", "You know Guidance with a 60-foot range, and a gaming set, candle, ink pen or crystal serves as your spellcasting focus."],
    [3, "Spirits from Beyond", "Handing out a Bardic Inspiration die also calls a random spirit from the table; unleash it later as a Magic action on a creature within 30 feet."],
    [6, "Empowered Channeling", "Once a turn a damaging or healing Bard spell gains a 1d6 bonus, and Spirit Guardians is always prepared with a free casting that can grant your allies cover."],
    [14, "Mystical Connection", "Roll twice on the Spirits from Beyond table and choose which spirit answers; matching rolls let you take any spirit on it."]
  ],
  Phantom: [
    [3, "Wails from the Grave", "After Sneak Attack damage, a second creature within 30 feet takes necrotic damage from half your Sneak Attack dice, Dexterity modifier times per long rest."],
    [3, "Whispers of the Dead", "Each rest a ghost lends you one skill or tool proficiency you lack, until you trade it for another."],
    [9, "Tokens of the Departed", "Soul trinkets taken from the dying grant advantage on death and Constitution saves, fuel Wails from the Grave, and can be spent to cast Augury or question a spirit."],
    [9, "Voice of Death", "Cast Speak with Dead once per short rest without a slot, questioning a soul trinket in place of a corpse."],
    [13, "Ghost Walk", "Assume a spectral form for 10 minutes: hovering flight, disadvantage on attacks against you, and movement through creatures and objects."],
    [17, "Death's Friend", "Wails from the Grave also strikes its first target, and you gain a soul trinket whenever you roll initiative without one."]
  ],

  // ---------------- Arcana Unleashed ----------------
  "Arcana Domain": [
    [3, "Modify Magic", "Spend Channel Divinity as you cast to give a target temporary hit points, or to penalise a creature's next save against the spell."],
    [3, "Student of Arcana", "You gain a Cleric skill of your choice and two Wizard cantrips, swappable as you gain levels."],
    [6, "Dispelling Recovery", "After a spell that restores hit points or ends a condition, cast Dispel Magic free once per short rest, or refresh it with Channel Divinity."],
    [17, "Magical Mastery", "Four Wizard spells — one each of levels 6, 7, 8 and 9 — are always prepared, and one can be swapped each level."]
  ],
  "Arcane Archer": [
    [3, "Arcane Archer Lore", "Druidcraft or Prestidigitation cast with Intelligence, plus proficiency in Arcana and Nature."],
    [3, "Arcane Shot", "Two Arcane Shot options, rising to six by level 18. Once a turn a shot from an Ammunition weapon carries one, Intelligence modifier times per short rest, on a die that grows from d6 to d12."],
    [7, "Curving Shot", "A missed shot can ricochet toward a new target as a Bonus Action."],
    [7, "Magical Ammunition", "Once per short rest, fix ammunition to a surface to darken the area, unbar what is locked, or grow a climbing vine."],
    [10, "Ever-Ready Shot", "Rolling initiative restores one use of Arcane Shot."],
    [15, "Indomitable Teleport", "A saving throw saved by Indomitable also teleports you up to 60 feet."],
    [18, "Masterful Shots", "React to a miss by withdrawing half your speed without provoking, then shooting back."]
  ],
  "Warrior of the Mystic Arts": [
    [3, "Spellcasting", "You cast Sorcerer spells using Wisdom, on the third-caster slot table, preparing three spells at level 3 and more as you rise."],
    [6, "Mystic Fighting Style", "Replace one Unarmed Strike in your Attack action with a Sorcerer cantrip."],
    [6, "Mystic Focus", "Spend a spell slot to regain Focus Points equal to its level, or convert Focus Points into a recovered slot on a short rest."],
    [11, "Focused Strike", "A Stunning Strike leaves the target with disadvantage on saves against your spells until your next turn."],
    [17, "Improved Mystic Fighting Style", "Flurry of Blows can carry a level 1 or 2 Sorcerer spell in place of two of its strikes."]
  ],
  "Vestige Patron": [
    [3, "Vestige Companion", "A dying god's remnant fights beside you as a Celestial, Fiend or Undead companion with its own stat block and a daily burst of divine power."],
    [6, "Vestige Power", "The vestige regains its Divine Power on a short rest or through Magical Cunning, and you share its damage resistance while near it."],
    [10, "Vestige Recovery", "React with a Pact Magic slot to restore the vestige to its full hit points and teleport it up to 30 feet away."],
    [14, "Semblance of Life", "For an hour the vestige takes the shape of a summoned spirit of its own type, with temporary hit points to match."]
  ],
  Conjurer: [
    [3, "Benign Transposition", "Teleport up to 30 feet as a Bonus Action, or swap places with a willing Medium or smaller creature, Intelligence modifier times per long rest."],
    [3, "Conjuration Savant", "Two Conjuration spells are added to your spellbook free, and another whenever a new spell level opens."],
    [6, "Distant Transposition", "Benign Transposition reaches 60 feet, and a level 3+ slot restores a use of it."],
    [6, "Durable Summons", "Creatures you summon arrive with temporary hit points equal to twice your level, and are resistant while those last."],
    [10, "Focused Conjuration", "Damage cannot break your concentration on a Conjuration spell."],
    [14, "Splintered Summons", "Once per long rest a summoning spell calls two creatures instead of one."]
  ],
  Enchanter: [
    [3, "Enchanting Conversationalist", "Proficiency in Deception, Intimidation or Persuasion, with your Intelligence modifier added to checks using it."],
    [3, "Enchantment Savant", "Two Enchantment spells are added to your spellbook free, and another whenever a new spell level opens."],
    [3, "Hypnotic Presence", "A Magic action charms a creature within 10 feet that fails a Wisdom save, Intelligence modifier times per long rest."],
    [6, "Split Enchantment", "Raise an Enchantment spell's effective level by one to catch another creature, Intelligence modifier times per long rest."],
    [10, "Instinctive Charm", "React to a hit by forcing the attacker to save or miss and strike someone else instead; casting an Enchantment spell refreshes it."],
    [14, "Alter Memories", "A creature you charm never realises it, and you can strip hours from its memory before the spell ends."]
  ],
  Necromancer: [
    [3, "Necromancy Savant", "Two Necromancy spells are added to your spellbook free, and another whenever a new spell level opens."],
    [3, "Necromancy Spellbook", "Resistance to necrotic damage, a skeleton or zombie familiar that can attack, and healing for an undead each time you cast a Necromancy spell."],
    [6, "Grave Power", "Arcane Recovery also lifts a level of exhaustion, and your spells ignore resistance to necrotic damage."],
    [6, "Undead Thralls", "Animate Dead is always prepared with a free casting a level higher, and your undead gain hit points and deal extra necrotic damage."],
    [10, "Harvest Undead", "On becoming bloodied, react to destroy an undead you control and regain hit points equal to your Wizard level."],
    [14, "Death's Master", "Bolster your undead with temporary hit points, and make one that drops explode in necrotic energy."]
  ],
  Transmuter: [
    [3, "Transmutation Savant", "Two Transmutation spells are added to your spellbook free, and another whenever a new spell level opens."],
    [3, "Transmuter's Stone", "A stone made on a long rest grants its bearer darkvision, a damage resistance or 10 more feet of speed, and serves as your spellcasting focus."],
    [3, "Wondrous Alteration", "Alter Self is always prepared with a free casting per long rest, and each of its options carries an extra benefit."],
    [6, "Empowered Transmutation", "Raise the effective level of a Transmutation spell that needs no attack or save, Intelligence modifier times per long rest."],
    [10, "Potent Stone", "Your stone carries two benefits at once, and adds Mighty Build and tremorsense to its options."],
    [10, "Shape-Shifter", "Polymorph is always prepared with a free casting; used on yourself you keep your mind, proficiencies and Transmutation spells."],
    [14, "Master Transmuter", "Consume the stone to transform an object, cure and heal a creature, cast Raise Dead, or shed decades of age."]
  ],

  // ---------------- Forgotten Realms: Heroes of Faerûn ----------------
  "College of the Moon": [
    [3, "Moon's Inspiration", "Giving a Bardic Inspiration die can turn you invisible and teleport you 30 feet, and a die spent on a healing spell adds its roll to the hit points restored."],
    [3, "Primal Lore", "You learn Druidic, a Druid cantrip that does not count against your total, and one wilderness skill."],
    [6, "Blessing of Moonlight", "Moonbeam is always prepared; once per long rest you can cast it so that each creature it burns heals an ally within 60 feet for 2d4."],
    [14, "Eventide's Splendor", "Inspired Eclipse also hides and teleports the creature you inspired, and Lunar Vitality can spend a 1d6 instead of a Bardic Inspiration die."]
  ],
  "Knowledge Domain": [
    [3, "Blessings of Knowledge", "Artisan's tools proficiency and Expertise in two of Arcana, History, Nature or Religion."],
    [3, "Mind Magic", "Spend Channel Divinity to cast a prepared Divination spell from the domain list without a slot or material components."],
    [6, "Unfettered Mind", "Telepathy out to 60 feet with several creatures at once, and proficiency in Intelligence saving throws."],
    [17, "Divine Foreknowledge", "A Bonus Action grants advantage on D20 tests for an hour, once per long rest."]
  ],
  "Oath of the Noble Genies": [
    [3, "Elemental Smite", "After a Divine Smite, spend Channel Divinity for a genie's flourish: grasping earth, a teleporting escape, leaping flame, or a shoving wave."],
    [3, "Genie's Splendor", "Unarmoured, your Armor Class is 10 plus Dexterity and Charisma, shield included, and you gain one social or acrobatic skill."],
    [7, "Aura of Elemental Shielding", "Your aura grants resistance to one elemental damage type, which you can change at the start of each turn."],
    [15, "Elemental Rebuke", "React to halve an attack's damage and force the attacker into a Dexterity save, Charisma modifier times per long rest."],
    [20, "Noble Scion", "For 10 minutes you fly, and a failed D20 test by you or an ally in your aura can be turned into a success."]
  ],
  "Winter Walker": [
    [3, "Frigid Explorer", "Resistance to cold, damage that ignores cold resistance, and an extra 1d4 cold damage once a turn, growing at level 11."],
    [3, "Hunter's Rime", "Hunter's Mark grants you temporary hit points and stops the marked creature from disengaging."],
    [7, "Fortifying Soul", "Once per long rest, heal several allies for 1d10 plus your level and give them an hour's advantage against fear."],
    [11, "Chilling Retribution", "React when hit to stun the attacker on a failed Wisdom save, Wisdom modifier times per long rest."],
    [15, "Frozen Haunt", "Hunter's Mark can wrap you in a snowy ghost form with cold immunity, an aura of cold, and passage through creatures and objects."]
  ],
  "Scion of the Three": [
    [3, "Bloodthirst", "React when an enemy is bloodied to teleport beside it and strike, Intelligence modifier times per long rest."],
    [3, "Dread Allegiance", "Choose Bane, Bhaal or Myrkul for a matching damage resistance and a cantrip cast with Intelligence."],
    [9, "Strike Fear", "A Cunning Strike option that frightens the target for a minute on a failed Wisdom save."],
    [13, "Aura of Malevolence", "Teleporting with Bloodthirst deals your Intelligence modifier in your patron's damage type to creatures beside either space, ignoring resistance."],
    [17, "Dread Incarnate", "Bloodthirst returns on a short rest, and Sneak Attack dice never count less than 3."]
  ],
  "Spellfire Sorcery": [
    [3, "Spellfire Burst", "Spending a Sorcery Point once a turn also grants temporary hit points or deals 1d4 fire or radiant damage within 30 feet."],
    [3, "Spellfire Spells", "Your spellfire keeps a list of healing and fire spells always prepared."],
    [6, "Absorb Spells", "Counterspell is always prepared, and each creature that fails against it returns 1d4 Sorcery Points."],
    [14, "Honed Spellfire", "Bolstering Flames adds your Sorcerer level, and Radiant Fire rises to 1d8."],
    [18, "Crown of Spellfire", "Innate Sorcery can burn as spellfire: flight, no damage on a successful save, and hit dice spent to answer an attacker."]
  ],

  // ---------------- Eberron: Forge of the Artificer ----------------
  Cartographer: [
    [3, "Tools of the Trade", "Calligrapher's supplies and cartographer's tools, and spell scrolls take half as long to scribe."],
    [3, "Adventurer's Atlas", "On a long rest you make magical maps for the party: 1d4 added to initiative and knowledge of where the other holders are."],
    [3, "Mapping Magic", "Free castings of Faerie Fire, and a short teleport spent from your movement."],
    [5, "Guided Precision", "Add your Intelligence modifier to damage against a target you have outlined, and keep concentration on Faerie Fire through damage."],
    [9, "Ingenious Movement", "Flash of Genius also teleports you or a nearby ally up to 30 feet."],
    [15, "Superior Atlas", "A map holder can destroy the map to stay standing, and you can cast Find the Path without a slot."]
  ]
};

// Spells a new-book subclass always has prepared, keyed by the class level at
// which they arrive.
const NEW_BOOK_SUBCLASS_SPELLS = {
  "Arcana Domain": {
    3: ["Detect Magic", "Magic Missile", "Magic Weapon", "Nystul's Magic Aura"],
    5: ["Counterspell", "Dispel Magic"],
    7: ["Arcane Eye", "Leomund's Secret Chest"],
    9: ["Bigby's Hand", "Teleportation Circle"]
  },
  "Knowledge Domain": {
    3: ["Command", "Comprehend Languages", "Detect Magic", "Detect Thoughts", "Identify", "Mind Spike"],
    5: ["Dispel Magic", "Nondetection", "Tongues"],
    7: ["Arcane Eye", "Banishment", "Confusion"],
    9: ["Legend Lore", "Scrying", "Synaptic Static"]
  },
  "Oath of the Noble Genies": {
    3: ["Chromatic Orb", "Elementalism", "Thunderous Smite"],
    5: ["Mirror Image", "Phantasmal Force"],
    9: ["Fly", "Gaseous Form"],
    13: ["Conjure Minor Elementals", "Summon Elemental"],
    17: ["Banishing Smite", "Contact Other Plane"]
  },
  "Winter Walker": {
    3: ["Ice Knife"], 5: ["Hold Person"], 9: ["Remove Curse"], 13: ["Ice Storm"], 17: ["Cone of Cold"]
  },
  "Spellfire Sorcery": {
    3: ["Cure Wounds", "Guiding Bolt", "Lesser Restoration", "Scorching Ray"],
    5: ["Aura of Vitality", "Dispel Magic"],
    7: ["Fire Shield", "Wall of Fire"],
    9: ["Greater Restoration", "Flame Strike"]
  },
  Cartographer: {
    3: ["Faerie Fire", "Guiding Bolt", "Healing Word"],
    5: ["Locate Object", "Mind Spike"],
    9: ["Call Lightning", "Clairvoyance"],
    13: ["Banishment", "Locate Creature"],
    17: ["Scrying", "Teleportation Circle"]
  }
};

(function registerNewBookContent() {
  if (typeof SUBCLASS_CATALOG !== "undefined" && typeof subclassRecord === "function") {
    Object.entries(NEW_BOOK_SUBCLASSES).forEach(([className, entries]) => {
      SUBCLASS_CATALOG[className] = SUBCLASS_CATALOG[className] || [];
      entries.forEach(([name, source]) => {
        const exists = SUBCLASS_CATALOG[className].some(item => item.name === name && item.rules === "2024");
        if (!exists) SUBCLASS_CATALOG[className].push(subclassRecord(name, source, "2024"));
      });
    });
  }
  if (typeof addSubclassFeatures === "function") {
    addSubclassFeatures({ "2024": NEW_BOOK_SUBCLASS_FEATURES });
  }
  if (typeof SUBCLASS_SPELL_LISTS !== "undefined") {
    SUBCLASS_SPELL_LISTS["2024"] = SUBCLASS_SPELL_LISTS["2024"] || {};
    Object.entries(NEW_BOOK_SUBCLASS_SPELLS).forEach(([subclass, table]) => {
      SUBCLASS_SPELL_LISTS["2024"][subclass] = table;
    });
  }
  // A Vestige Patron warlock borrows a cleric domain's spells, so the choice of
  // domain decides which ones are always prepared.
  if (typeof SUBCLASS_CHOICE_SPELLS !== "undefined" && typeof SUBCLASS_SPELL_LISTS !== "undefined") {
    const domains = ["Life", "Light", "Trickery", "War"];
    const lists = {};
    domains.forEach(domain => {
      const table = SUBCLASS_SPELL_LISTS["2024"]?.[`${domain} Domain`];
      if (table) lists[domain] = table;
    });
    if (Object.keys(lists).length) {
      SUBCLASS_CHOICE_SPELLS["2024"] = SUBCLASS_CHOICE_SPELLS["2024"] || {};
      SUBCLASS_CHOICE_SPELLS["2024"]["Vestige Patron"] = { key: "vestigeDomain", lists };
    }
  }
  if (typeof SUBCLASS_CHOICE_RULES !== "undefined") {
    SUBCLASS_CHOICE_RULES["Vestige Patron"] = [
      { key: "vestigeDomain", label: "Domain the vestige draws on", level: 3, editions: ["2024"], options: ["Life", "Light", "Trickery", "War"] },
      { key: "vestigeForm", label: "Form of the vestige", level: 3, editions: ["2024"], options: ["Celestial", "Fiend", "Undead"] }
    ];
    SUBCLASS_CHOICE_RULES["Scion of the Three"] = [
      { key: "deadThree", label: "Dead Three patron", level: 3, editions: ["2024"], options: ["Bane", "Bhaal", "Myrkul"] }
    ];
    SUBCLASS_CHOICE_RULES["Oath of the Noble Genies"] = [
      { key: "elementalShield", label: "Aura damage type", level: 7, editions: ["2024"], options: ["Acid", "Cold", "Fire", "Lightning", "Thunder"] }
    ];
  }
})();

if (typeof module !== "undefined") {
  module.exports = { NEW_BOOK_SUBCLASSES, NEW_BOOK_SUBCLASS_FEATURES, NEW_BOOK_SUBCLASS_SPELLS };
}
