// Subclass spell lists — the "always prepared" spells a subclass grants
// (Cleric domain spells, Paladin oath spells, 2024 patron spells, Druid circle
// spells, and similar). On D&D Beyond these appear on the sheet automatically
// and, for prepared casters, do not count against the prepared limit.
//
// A 2014 warlock patron does not grant its spells: it adds them to the warlock
// spell list for the player to learn. Those live in SUBCLASS_EXPANDED_SPELLS
// further down, keyed by spell level as the patron tables print them.
//
// Shape: SUBCLASS_SPELL_LISTS[edition][subclassName] = { <classLevel>: [spellNames] }
// The key is the level in that class at which the spells are granted; the
// spell's own level is resolved at runtime from the class spell lists.

const SUBCLASS_SPELL_LISTS = {
  "2014": {
    // ---------------- Cleric domains (levels 1/3/5/7/9) ----------------
    "Knowledge Domain": {
      1: ["Command", "Identify"], 3: ["Augury", "Suggestion"],
      5: ["Nondetection", "Speak with Dead"], 7: ["Arcane Eye", "Confusion"],
      9: ["Legend Lore", "Scrying"]
    },
    "Life Domain": {
      1: ["Bless", "Cure Wounds"], 3: ["Lesser Restoration", "Spiritual Weapon"],
      5: ["Beacon of Hope", "Revivify"], 7: ["Death Ward", "Guardian of Faith"],
      9: ["Mass Cure Wounds", "Raise Dead"]
    },
    "Light Domain": {
      1: ["Burning Hands", "Faerie Fire"], 3: ["Flaming Sphere", "Scorching Ray"],
      5: ["Daylight", "Fireball"], 7: ["Guardian of Faith", "Wall of Fire"],
      9: ["Flame Strike", "Scrying"]
    },
    "Nature Domain": {
      1: ["Animal Friendship", "Speak with Animals"], 3: ["Barkskin", "Spike Growth"],
      5: ["Plant Growth", "Wind Wall"], 7: ["Dominate Beast", "Grasping Vine"],
      9: ["Insect Plague", "Tree Stride"]
    },
    "Tempest Domain": {
      1: ["Fog Cloud", "Thunderwave"], 3: ["Gust of Wind", "Shatter"],
      5: ["Call Lightning", "Sleet Storm"], 7: ["Control Water", "Ice Storm"],
      9: ["Destructive Wave", "Insect Plague"]
    },
    "Trickery Domain": {
      1: ["Charm Person", "Disguise Self"], 3: ["Mirror Image", "Pass without Trace"],
      5: ["Blink", "Dispel Magic"], 7: ["Dimension Door", "Polymorph"],
      9: ["Dominate Person", "Modify Memory"]
    },
    "War Domain": {
      1: ["Divine Favor", "Shield of Faith"], 3: ["Magic Weapon", "Spiritual Weapon"],
      5: ["Crusader's Mantle", "Spirit Guardians"], 7: ["Freedom of Movement", "Stoneskin"],
      9: ["Flame Strike", "Hold Monster"]
    },
    "Death Domain": {
      1: ["False Life", "Ray of Sickness"], 3: ["Blindness/Deafness", "Ray of Enfeeblement"],
      5: ["Animate Dead", "Vampiric Touch"], 7: ["Blight", "Death Ward"],
      9: ["Antilife Shell", "Cloudkill"]
    },
    "Arcana Domain": {
      1: ["Detect Magic", "Magic Missile"], 3: ["Magic Weapon", "Nystul's Magic Aura"],
      5: ["Dispel Magic", "Magic Circle"], 7: ["Arcane Eye", "Leomund's Secret Chest"],
      9: ["Planar Binding", "Teleportation Circle"]
    },
    "Forge Domain": {
      1: ["Identify", "Searing Smite"], 3: ["Heat Metal", "Magic Weapon"],
      5: ["Elemental Weapon", "Protection from Energy"], 7: ["Fabricate", "Wall of Fire"],
      9: ["Animate Objects", "Creation"]
    },
    "Grave Domain": {
      1: ["Bane", "False Life"], 3: ["Gentle Repose", "Ray of Enfeeblement"],
      5: ["Revivify", "Vampiric Touch"], 7: ["Blight", "Death Ward"],
      9: ["Antilife Shell", "Raise Dead"]
    },
    "Order Domain": {
      1: ["Command", "Heroism"], 3: ["Hold Person", "Zone of Truth"],
      5: ["Mass Healing Word", "Slow"], 7: ["Compulsion", "Locate Creature"],
      9: ["Commune", "Dominate Person"]
    },
    "Peace Domain": {
      1: ["Heroism", "Sanctuary"], 3: ["Aid", "Warding Bond"],
      5: ["Beacon of Hope", "Sending"], 7: ["Aura of Purity", "Otiluke's Resilient Sphere"],
      9: ["Greater Restoration", "Rary's Telepathic Bond"]
    },
    "Twilight Domain": {
      1: ["Faerie Fire", "Sleep"], 3: ["Moonbeam", "See Invisibility"],
      5: ["Aura of Vitality", "Leomund's Tiny Hut"], 7: ["Aura of Life", "Greater Invisibility"],
      9: ["Circle of Power", "Mislead"]
    },

    // ---------------- Paladin oaths (levels 3/5/9/13/17) ----------------
    "Oath of Devotion": {
      3: ["Protection from Evil and Good", "Sanctuary"], 5: ["Lesser Restoration", "Zone of Truth"],
      9: ["Beacon of Hope", "Dispel Magic"], 13: ["Freedom of Movement", "Guardian of Faith"],
      17: ["Commune", "Flame Strike"]
    },
    "Oath of the Ancients": {
      3: ["Ensnaring Strike", "Speak with Animals"], 5: ["Misty Step", "Moonbeam"],
      9: ["Plant Growth", "Protection from Energy"], 13: ["Ice Storm", "Stoneskin"],
      17: ["Commune with Nature", "Tree Stride"]
    },
    "Oath of Vengeance": {
      3: ["Bane", "Hunter's Mark"], 5: ["Hold Person", "Misty Step"],
      9: ["Haste", "Protection from Energy"], 13: ["Banishment", "Dimension Door"],
      17: ["Hold Monster", "Scrying"]
    },
    "Oathbreaker": {
      3: ["Hellish Rebuke", "Inflict Wounds"], 5: ["Crown of Madness", "Darkness"],
      9: ["Animate Dead", "Bestow Curse"], 13: ["Blight", "Confusion"],
      17: ["Contagion", "Dominate Person"]
    },
    "Oath of the Crown": {
      3: ["Command", "Compelled Duel"], 5: ["Warding Bond", "Zone of Truth"],
      9: ["Aura of Vitality", "Spirit Guardians"], 13: ["Banishment", "Guardian of Faith"],
      17: ["Circle of Power", "Geas"]
    },
    "Oath of Conquest": {
      3: ["Armor of Agathys", "Command"], 5: ["Hold Person", "Spiritual Weapon"],
      9: ["Bestow Curse", "Fear"], 13: ["Dominate Beast", "Stoneskin"],
      17: ["Cloudkill", "Dominate Person"]
    },
    "Oath of Redemption": {
      3: ["Sanctuary", "Sleep"], 5: ["Calm Emotions", "Hold Person"],
      9: ["Counterspell", "Hypnotic Pattern"], 13: ["Otiluke's Resilient Sphere", "Stoneskin"],
      17: ["Hold Monster", "Wall of Force"]
    },
    "Oath of Glory": {
      3: ["Guiding Bolt", "Heroism"], 5: ["Enhance Ability", "Magic Weapon"],
      9: ["Haste", "Protection from Energy"], 13: ["Compulsion", "Freedom of Movement"],
      17: ["Commune", "Flame Strike"]
    },
    "Oath of the Watchers": {
      3: ["Alarm", "Detect Magic"], 5: ["Moonbeam", "See Invisibility"],
      9: ["Counterspell", "Nondetection"], 13: ["Aura of Purity", "Banishment"],
      17: ["Hold Monster", "Scrying"]
    },

    // ---------------- Warlock patrons ----------------
    // The Celestial's bonus cantrips are the only spells a 2014 patron grants
    // outright; every patron's expanded list is in SUBCLASS_EXPANDED_SPELLS.
    "The Celestial": {
      1: ["Light", "Sacred Flame"]
    },

    // ---------------- Druid circles ----------------
    // Circle of the Land's spells depend on the land chosen; they are in
    // SUBCLASS_CHOICE_SPELLS below. Dreams and Shepherd have no circle spells.
    "Circle of Spores": {
      2: ["Chill Touch"], 3: ["Blindness/Deafness", "Gentle Repose"],
      5: ["Animate Dead", "Gaseous Form"], 7: ["Blight", "Confusion"],
      9: ["Cloudkill", "Contagion"]
    },
    // Star Map: the Guidance cantrip, and Guiding Bolt always prepared.
    "Circle of Stars": {
      2: ["Guidance", "Guiding Bolt"]
    },
    "Circle of Wildfire": {
      2: ["Burning Hands", "Cure Wounds"], 3: ["Flaming Sphere", "Scorching Ray"],
      5: ["Plant Growth", "Revivify"], 7: ["Aura of Life", "Fire Shield"],
      9: ["Flame Strike", "Mass Cure Wounds"]
    },

    // ---------------- Sorcerer origins ----------------
    // Divine Soul opens the whole cleric list instead (SUBCLASS_EXPANDED_SPELLS);
    // its one bonus spell depends on the affinity chosen.
    "Aberrant Mind": {
      1: ["Arms of Hadar", "Dissonant Whispers", "Mind Sliver"], 3: ["Calm Emotions", "Detect Thoughts"],
      5: ["Hunger of Hadar", "Sending"], 7: ["Evard's Black Tentacles", "Summon Aberration"],
      9: ["Rary's Telepathic Bond", "Telekinesis"]
    },
    "Clockwork Soul": {
      1: ["Alarm", "Protection from Evil and Good"], 3: ["Aid", "Lesser Restoration"],
      5: ["Dispel Magic", "Protection from Energy"], 7: ["Freedom of Movement", "Summon Construct"],
      9: ["Greater Restoration", "Wall of Force"]
    },
    // Eyes of the Dark: Darkness at 3rd level, outside the spells known.
    "Shadow Magic": {
      3: ["Darkness"]
    },

    // ---------------- Ranger archetypes ----------------
    "Gloom Stalker": {
      3: ["Disguise Self"], 5: ["Rope Trick"], 9: ["Fear"],
      13: ["Greater Invisibility"], 17: ["Seeming"]
    },
    "Horizon Walker": {
      3: ["Protection from Evil and Good"], 5: ["Misty Step"], 9: ["Haste"],
      13: ["Banishment"], 17: ["Teleportation Circle"]
    },
    "Monster Slayer": {
      3: ["Protection from Evil and Good"], 5: ["Zone of Truth"], 9: ["Magic Circle"],
      13: ["Banishment"], 17: ["Hold Monster"]
    },
    "Fey Wanderer": {
      3: ["Charm Person"], 5: ["Misty Step"], 9: ["Dispel Magic"],
      13: ["Dimension Door"], 17: ["Mislead"]
    },
    "Swarmkeeper": {
      3: ["Mage Hand", "Faerie Fire"], 5: ["Web"], 9: ["Gaseous Form"],
      13: ["Arcane Eye"], 17: ["Insect Plague"]
    },

    // ---------------- Artificer specialists ----------------
    "Alchemist": {
      3: ["Healing Word", "Ray of Sickness"], 5: ["Flaming Sphere", "Melf's Acid Arrow"],
      9: ["Gaseous Form", "Mass Healing Word"], 13: ["Blight", "Death Ward"],
      17: ["Cloudkill", "Raise Dead"]
    },
    "Armorer": {
      3: ["Magic Missile", "Thunderwave"], 5: ["Mirror Image", "Shatter"],
      9: ["Hypnotic Pattern", "Lightning Bolt"], 13: ["Fire Shield", "Greater Invisibility"],
      17: ["Passwall", "Wall of Force"]
    },
    "Artillerist": {
      3: ["Shield", "Thunderwave"], 5: ["Scorching Ray", "Shatter"],
      9: ["Fireball", "Wind Wall"], 13: ["Ice Storm", "Wall of Fire"],
      17: ["Cone of Cold", "Wall of Force"]
    },
    "Battle Smith": {
      3: ["Heroism", "Shield"], 5: ["Branding Smite", "Warding Bond"],
      9: ["Aura of Vitality", "Conjure Barrage"], 13: ["Aura of Purity", "Fire Shield"],
      17: ["Banishing Smite", "Mass Cure Wounds"]
    }
  },

  "2024": {
    // ---------------- Cleric domains (levels 3/5/7/9) ----------------
    "Life Domain": {
      3: ["Aid", "Bless", "Cure Wounds", "Lesser Restoration"],
      5: ["Mass Healing Word", "Revivify"],
      7: ["Aura of Life", "Death Ward"],
      9: ["Greater Restoration", "Mass Cure Wounds"]
    },
    "Light Domain": {
      3: ["Burning Hands", "Faerie Fire", "Scorching Ray", "See Invisibility"],
      5: ["Daylight", "Fireball"],
      7: ["Arcane Eye", "Wall of Fire"],
      9: ["Flame Strike", "Scrying"]
    },
    "Trickery Domain": {
      3: ["Charm Person", "Disguise Self", "Invisibility", "Pass without Trace"],
      5: ["Hypnotic Pattern", "Nondetection"],
      7: ["Confusion", "Dimension Door"],
      9: ["Dominate Person", "Modify Memory"]
    },
    "War Domain": {
      3: ["Guiding Bolt", "Magic Weapon", "Shield of Faith", "Spiritual Weapon"],
      5: ["Crusader's Mantle", "Spirit Guardians"],
      7: ["Fire Shield", "Freedom of Movement"],
      9: ["Hold Monster", "Steel Wind Strike"]
    },

    // ---------------- Paladin oaths (levels 3/5/9/13/17) ----------------
    "Oath of Devotion": {
      3: ["Protection from Evil and Good", "Shield of Faith"], 5: ["Aid", "Zone of Truth"],
      9: ["Beacon of Hope", "Dispel Magic"], 13: ["Freedom of Movement", "Guardian of Faith"],
      17: ["Commune", "Flame Strike"]
    },
    "Oath of the Ancients": {
      3: ["Ensnaring Strike", "Speak with Animals"], 5: ["Misty Step", "Moonbeam"],
      9: ["Plant Growth", "Protection from Energy"], 13: ["Ice Storm", "Stoneskin"],
      17: ["Commune with Nature", "Tree Stride"]
    },
    "Oath of Vengeance": {
      3: ["Bane", "Hunter's Mark"], 5: ["Hold Person", "Misty Step"],
      9: ["Haste", "Protection from Energy"], 13: ["Banishment", "Dimension Door"],
      17: ["Hold Monster", "Scrying"]
    },
    "Oath of Glory": {
      3: ["Guiding Bolt", "Heroism"], 5: ["Enhance Ability", "Magic Weapon"],
      9: ["Haste", "Protection from Energy"], 13: ["Compulsion", "Freedom of Movement"],
      17: ["Legend Lore", "Yolande's Regal Presence"]
    },

    // ---------------- Warlock patrons (levels 3/5/7/9) ----------------
    "Archfey Patron": {
      3: ["Calm Emotions", "Faerie Fire", "Misty Step", "Phantasmal Force", "Sleep"],
      5: ["Blink", "Plant Growth"], 7: ["Dominate Beast", "Greater Invisibility"],
      9: ["Dominate Person", "Seeming"]
    },
    "Fiend Patron": {
      3: ["Burning Hands", "Command", "Scorching Ray", "Suggestion"],
      5: ["Fireball", "Stinking Cloud"], 7: ["Fire Shield", "Wall of Fire"],
      9: ["Geas", "Insect Plague"]
    },
    "Great Old One Patron": {
      3: ["Detect Thoughts", "Dissonant Whispers", "Phantasmal Force", "Tasha's Hideous Laughter"],
      5: ["Clairvoyance", "Hunger of Hadar"], 7: ["Confusion", "Summon Aberration"],
      9: ["Modify Memory", "Telekinesis"]
    },
    "Celestial Patron": {
      3: ["Aid", "Cure Wounds", "Guiding Bolt", "Lesser Restoration", "Light", "Sacred Flame"],
      5: ["Daylight", "Revivify"], 7: ["Guardian of Faith", "Wall of Fire"],
      9: ["Greater Restoration", "Summon Celestial"]
    },

    // ---------------- Druid circles (levels 3/5/7/9) ----------------
    "Circle of the Moon": {
      3: ["Cure Wounds", "Moonbeam", "Starry Wisp"], 5: ["Conjure Animals"],
      7: ["Fount of Moonlight"], 9: ["Mass Cure Wounds"]
    },
    "Circle of the Sea": {
      3: ["Fog Cloud", "Gust of Wind", "Ray of Frost", "Thunderwave"],
      5: ["Lightning Bolt", "Water Breathing"], 7: ["Control Water", "Ice Storm"],
      9: ["Conjure Elemental", "Hold Monster"]
    },
    // Star Map: Guidance and Guiding Bolt prepared. There is no circle table.
    "Circle of the Stars": {
      3: ["Guidance", "Guiding Bolt"]
    },

    // ---------------- Sorcerer origins (levels 3/5/7/9) ----------------
    "Draconic Sorcery": {
      3: ["Alter Self", "Chromatic Orb", "Command", "Dragon's Breath"],
      5: ["Fear", "Fly"], 7: ["Arcane Eye", "Charm Monster"],
      9: ["Legend Lore", "Summon Dragon"]
    },
    "Aberrant Sorcery": {
      3: ["Arms of Hadar", "Calm Emotions", "Detect Thoughts", "Dissonant Whispers", "Mind Sliver"],
      5: ["Hunger of Hadar", "Sending"], 7: ["Evard's Black Tentacles", "Summon Aberration"],
      9: ["Rary's Telepathic Bond", "Telekinesis"]
    },
    "Clockwork Sorcery": {
      3: ["Aid", "Alarm", "Lesser Restoration", "Protection from Evil and Good"],
      5: ["Dispel Magic", "Protection from Energy"], 7: ["Freedom of Movement", "Summon Construct"],
      9: ["Greater Restoration", "Wall of Force"]
    },

    // ---------------- Ranger archetypes ----------------
    "Fey Wanderer": {
      3: ["Charm Person"], 5: ["Misty Step"], 9: ["Summon Fey"],
      13: ["Dimension Door"], 17: ["Mislead"]
    },
    "Gloom Stalker": {
      3: ["Disguise Self"], 5: ["Rope Trick"], 9: ["Fear"],
      13: ["Greater Invisibility"], 17: ["Seeming"]
    }
  }
};

// Spells that hang on a subclass choice: a Circle of the Land druid's spells
// follow the land. Shape: [edition][subclass] = { key, lists: { option: table } }.
const SUBCLASS_CHOICE_SPELLS = {
  "2014": {
    "Circle of the Land": {
      key: "circleLand",
      lists: {
        Arctic: { 3: ["Hold Person", "Spike Growth"], 5: ["Sleet Storm", "Slow"], 7: ["Freedom of Movement", "Ice Storm"], 9: ["Commune with Nature", "Cone of Cold"] },
        Coast: { 3: ["Mirror Image", "Misty Step"], 5: ["Water Breathing", "Water Walk"], 7: ["Control Water", "Freedom of Movement"], 9: ["Conjure Elemental", "Scrying"] },
        Desert: { 3: ["Blur", "Silence"], 5: ["Create Food and Water", "Protection from Energy"], 7: ["Blight", "Hallucinatory Terrain"], 9: ["Insect Plague", "Wall of Stone"] },
        Forest: { 3: ["Barkskin", "Spider Climb"], 5: ["Call Lightning", "Plant Growth"], 7: ["Divination", "Freedom of Movement"], 9: ["Commune with Nature", "Tree Stride"] },
        Grassland: { 3: ["Invisibility", "Pass without Trace"], 5: ["Daylight", "Haste"], 7: ["Divination", "Freedom of Movement"], 9: ["Dream", "Insect Plague"] },
        Mountain: { 3: ["Spider Climb", "Spike Growth"], 5: ["Lightning Bolt", "Meld into Stone"], 7: ["Stone Shape", "Stoneskin"], 9: ["Passwall", "Wall of Stone"] },
        Swamp: { 3: ["Darkness", "Melf's Acid Arrow"], 5: ["Water Walk", "Stinking Cloud"], 7: ["Freedom of Movement", "Locate Creature"], 9: ["Insect Plague", "Scrying"] },
        Underdark: { 3: ["Spider Climb", "Web"], 5: ["Gaseous Form", "Stinking Cloud"], 7: ["Greater Invisibility", "Stone Shape"], 9: ["Cloudkill", "Insect Plague"] }
      }
    }
  },
  "2024": {
    // The land is chosen again after each Long Rest.
    "Circle of the Land": {
      key: "circleLand",
      lists: {
        Arid: { 3: ["Blur", "Burning Hands", "Fire Bolt"], 5: ["Fireball"], 7: ["Blight"], 9: ["Wall of Stone"] },
        Polar: { 3: ["Fog Cloud", "Hold Person", "Ray of Frost"], 5: ["Sleet Storm"], 7: ["Ice Storm"], 9: ["Cone of Cold"] },
        Temperate: { 3: ["Misty Step", "Shocking Grasp", "Sleep"], 5: ["Lightning Bolt"], 7: ["Freedom of Movement"], 9: ["Tree Stride"] },
        Tropical: { 3: ["Acid Splash", "Ray of Sickness", "Web"], 5: ["Stinking Cloud"], 7: ["Polymorph"], 9: ["Insect Plague"] }
      }
    }
  }
};

// Spells a subclass adds to its class's list for the player to choose from,
// rather than granting outright. Keyed by spell level. A 2014 patron's table,
// and the Divine Soul's access to the whole cleric list.
const SUBCLASS_EXPANDED_SPELLS = {
  "The Archfey": { 1: ["Faerie Fire", "Sleep"], 2: ["Calm Emotions", "Phantasmal Force"], 3: ["Blink", "Plant Growth"], 4: ["Dominate Beast", "Greater Invisibility"], 5: ["Dominate Person", "Seeming"] },
  "The Fiend": { 1: ["Burning Hands", "Command"], 2: ["Blindness/Deafness", "Scorching Ray"], 3: ["Fireball", "Stinking Cloud"], 4: ["Fire Shield", "Wall of Fire"], 5: ["Flame Strike", "Hallow"] },
  "The Great Old One": { 1: ["Dissonant Whispers", "Tasha's Hideous Laughter"], 2: ["Detect Thoughts", "Phantasmal Force"], 3: ["Clairvoyance", "Sending"], 4: ["Dominate Beast", "Evard's Black Tentacles"], 5: ["Dominate Person", "Telekinesis"] },
  "The Undying": { 1: ["False Life", "Ray of Sickness"], 2: ["Blindness/Deafness", "Silence"], 3: ["Feign Death", "Speak with Dead"], 4: ["Aura of Life", "Death Ward"], 5: ["Contagion", "Legend Lore"] },
  "The Celestial": { 1: ["Cure Wounds", "Guiding Bolt"], 2: ["Flaming Sphere", "Lesser Restoration"], 3: ["Daylight", "Revivify"], 4: ["Guardian of Faith", "Wall of Fire"], 5: ["Flame Strike", "Greater Restoration"] },
  "The Hexblade": { 1: ["Shield", "Wrathful Smite"], 2: ["Blur", "Branding Smite"], 3: ["Blink", "Elemental Weapon"], 4: ["Phantasmal Killer", "Staggering Smite"], 5: ["Banishing Smite", "Cone of Cold"] },
  "The Fathomless": { 1: ["Create or Destroy Water", "Thunderwave"], 2: ["Gust of Wind", "Silence"], 3: ["Lightning Bolt", "Sleet Storm"], 4: ["Control Water", "Summon Elemental"], 5: ["Bigby's Hand", "Cone of Cold"] },
  "The Undead": { 1: ["Bane", "False Life"], 2: ["Blindness/Deafness", "Phantasmal Force"], 3: ["Phantom Steed", "Speak with Dead"], 4: ["Death Ward", "Greater Invisibility"], 5: ["Antilife Shell", "Cloudkill"] },
  "Divine Soul": { classList: "Cleric" }
};

if (typeof module !== "undefined") module.exports = { SUBCLASS_SPELL_LISTS, SUBCLASS_CHOICE_SPELLS, SUBCLASS_EXPANDED_SPELLS };
