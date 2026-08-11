// Structured mechanics used when a spell does not have a full parseable rules record.
const SPELL_METADATA = {
  "Abi-Dalzim's Horrid Wilting": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "150 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "12d8 necrotic",
    "area": "30-foot",
    "damageEffect": "Necrotic"
  },
  "Absorb Elements": {
    "school": "Abjuration",
    "castingTime": "1 Reaction",
    "range": "Self",
    "duration": "1 round",
    "components": "S",
    "dice": "1d6",
    "damageEffect": "Acid"
  },
  "Aganazzar's Scorcher": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "30 Feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "3d8 fire, 1d8",
    "area": "30-foot",
    "damageEffect": "Fire"
  },
  "Air Bubble": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "24 hours",
    "components": "S",
    "damageEffect": "Buff"
  },
  "Alustriel's Mooncloak": {
    "school": "Abjuration",
    "castingTime": "1 Action",
    "range": "Self (20-foot radius)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "area": "20-foot radius"
  },
  "Antagonize": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "4d4 psychic, 1d4",
    "damageEffect": "Psychic"
  },
  "Ashardalon's Stride": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V,S",
    "dice": "1d6 fire",
    "damageEffect": "Fire"
  },
  "Backlash": {
    "school": "Abjuration",
    "castingTime": "1 Reaction",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "CON save",
    "damageEffect": "Force",
    "dice": "4d6 force",
    "area": "Single target"
  },
  "Beast Bond": {
    "school": "Divination",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "damageEffect": "Buff"
  },
  "Blade of Disaster": {
    "school": "Conjuration",
    "castingTime": "1 Bonus Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "Melee spell attack",
    "dice": "4d12 force, 8d12 force, 12d12 force",
    "damageEffect": "Force"
  },
  "Blinding Smite": {
    "school": "Evocation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "CON save",
    "dice": "3d8 radiant",
    "damageEffect": "Radiant"
  },
  "Bones of the Earth": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "DEX save",
    "dice": "6d6 bludgeoning",
    "area": "5-foot *",
    "damageEffect": "Bludgeoning"
  },
  "Booming Blade": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "1 round",
    "components": "S, M",
    "saveAttack": "Melee spell attack",
    "dice": "1d8 thunder, 2d8, 3d8, 4d8",
    "area": "5-foot radius",
    "damageEffect": "Thunder"
  },
  "Borrowed Knowledge": {
    "school": "Divination",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M",
    "damageEffect": "Utility"
  },
  "Cacophonic Shield": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (10-foot radius)",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "CON Save",
    "area": "10-foot radius",
    "damageEffect": "Thunder"
  },
  "Catapult": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "S",
    "saveAttack": "DEX save",
    "dice": "3d8 bludgeoning, 1d8",
    "damageEffect": "Bludgeoning"
  },
  "Catnap": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "10 minutes",
    "components": "S, M",
    "damageEffect": "Buff"
  },
  "Cause Fear": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "WIS save",
    "damageEffect": "Frightened"
  },
  "Ceremony": {
    "school": "Abjuration",
    "castingTime": "1 Action Ritual",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damageEffect": "Buff"
  },
  "Chaos Bolt": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "Ranged spell attack",
    "dice": "2d8, 1d6",
    "damageEffect": "Acid"
  },
  "Charm Monster": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "1 hour",
    "components": "V, S",
    "saveAttack": "WIS save",
    "damageEffect": "Charmed"
  },
  "Compelled Duel": {
    "school": "Enchantment",
    "castingTime": "1 Bonus Action",
    "range": "30 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "WIS save",
    "damageEffect": "Control"
  },
  "Conjure Constructs": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "saveAttack": "DEX Save",
    "damageEffect": "Force"
  },
  "Control Flames": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "area": "5-foot *",
    "damageEffect": "Control"
  },
  "Control Winds": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "300 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "saveAttack": "STR save",
    "area": "100-foot",
    "damageEffect": "Prone"
  },
  "Create Bonfire": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "DEX save",
    "dice": "1d8 fire, 2d8, 3d8, 4d8",
    "area": "5-foot",
    "damageEffect": "Fire"
  },
  "Create Homunculus": {
    "school": "Transmutation",
    "castingTime": "1 Hour",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "dice": "2d4 piercing",
    "damageEffect": "Creation"
  },
  "Create Magen": {
    "school": "Transmutation",
    "castingTime": "1 Hour",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V, S, M"
  },
  "Create Spelljamming Helm": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "Instantaneous",
    "components": "V,S,M",
    "damageEffect": "Creation"
  },
  "Crown of Stars": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S",
    "saveAttack": "Ranged spell attack",
    "dice": "4d12 radiant",
    "damageEffect": "Radiant"
  },
  "Crusader's Mantle": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "dice": "1d4 radiant",
    "area": "30-foot",
    "damageEffect": "Radiant"
  },
  "Danse Macabre": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "damageEffect": "Control"
  },
  "Dawn": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "4d10 radiant",
    "area": "30-foot *",
    "damageEffect": "Radiant"
  },
  "Death Armor": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S, M",
    "damageEffect": "Necrotic"
  },
  "Deryan's Helpful Homunculi": {
    "school": "Conjuration",
    "castingTime": "1 Action or Ritual",
    "range": "Self",
    "duration": "8 hours",
    "components": "V, S, M"
  },
  "Dirge": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "Self (60-foot radius)",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "CON Save",
    "area": "60-foot radius",
    "damageEffect": "Necrotic"
  },
  "Distort Value": {
    "school": "Illusion",
    "castingTime": "1 Minute",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V",
    "area": "One touched object",
    "damageEffect": "Deception"
  },
  "Doomtide": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "120 feet (20-foot radius)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "WIS Save",
    "area": "20-foot radius",
    "damageEffect": "Psychic"
  },
  "Draconic Transformation": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "6d8 force",
    "area": "60-foot",
    "damageEffect": "Force"
  },
  "Dragon's Breath": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "3d6, 1d6",
    "area": "15-foot",
    "damageEffect": "Acid"
  },
  "Dream of the Blue Veil": {
    "school": "Conjuration",
    "castingTime": "10 minutes",
    "range": "20 feet",
    "duration": "6 hours",
    "components": "V, S, M",
    "damageEffect": "Teleportation"
  },
  "Druid Grove": {
    "school": "Abjuration",
    "castingTime": "10 Minutes",
    "range": "Touch",
    "duration": "24 hours",
    "components": "V, S, M",
    "area": "*",
    "damageEffect": "Debuff"
  },
  "Dust Devil": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "STR save",
    "dice": "1d8 bludgeoning",
    "area": "5-foot *",
    "damageEffect": "Bludgeoning"
  },
  "Earth Tremor": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (10-foot radius)",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "DEX save",
    "dice": "1d6 bludgeoning",
    "area": "10-foot radius",
    "damageEffect": "Bludgeoning"
  },
  "Earthbind": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "300 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "STR save",
    "damageEffect": "Control"
  },
  "Elemental Bane": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "2d6",
    "damageEffect": "Acid"
  },
  "Elminster's Effulgent Spheres": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M",
    "damageEffect": "Acid"
  },
  "Elminster's Elusion": {
    "school": "Abjuration",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S"
  },
  "Encode Thoughts": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "8 hours",
    "components": "S",
    "damageEffect": "Creation"
  },
  "Enemies Abound": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "INT save",
    "damageEffect": "Control"
  },
  "Enervation": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "DEX save",
    "dice": "2d8 necrotic, 4d8 necrotic, 1d8",
    "damageEffect": "Necrotic"
  },
  "Erupting Earth": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "3d12 bludgeoning, 1d12",
    "area": "20-foot",
    "damageEffect": "Bludgeoning"
  },
  "Far Step": {
    "school": "Conjuration",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "damageEffect": "Teleportation"
  },
  "Fast Friends": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V",
    "saveAttack": "WIS save",
    "damageEffect": "Charmed"
  },
  "Find Greater Steed": {
    "school": "Conjuration",
    "castingTime": "10 Minutes",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "damageEffect": "Summoning"
  },
  "Fizban's Platinum Shield": {
    "school": "Abjuration",
    "castingTime": "1 Bonus Action",
    "range": "60ft",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "damageEffect": "Warding"
  },
  "Flame Arrows": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "dice": "1d6 fire",
    "damageEffect": "Fire"
  },
  "Frost Fingers": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (15-foot cone)",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "2d8 cold, 1d8",
    "area": "15-foot cone",
    "damageEffect": "Cold"
  },
  "Frostbite": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "1d6 cold, 2d6, 3d6, 4d6",
    "damageEffect": "Cold"
  },
  "Gate Seal": {
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "60 feet",
    "duration": "24 hours",
    "components": "V, S, M",
    "area": "30-foot",
    "damageEffect": "Control"
  },
  "Gift of Gab": {
    "school": "Enchantment",
    "castingTime": "Reaction",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "V, S, M"
  },
  "Green-Flame Blade": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "S, M",
    "saveAttack": "Melee spell attack",
    "dice": "1d8 fire, 1d8 + your spellcasting ability modifier fire, 2d8, 3d8",
    "area": "5-foot radius",
    "damageEffect": "Fire"
  },
  "Guardian of Nature": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "CON save",
    "dice": "1d6 force",
    "damageEffect": "Buff"
  },
  "Gust": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "STR save",
    "damageEffect": "Control"
  },
  "Healing Spirit": {
    "school": "Conjuration",
    "castingTime": "1 Bonus Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "dice": "1d6",
    "area": "5-foot",
    "damageEffect": "Healing"
  },
  "Holy Star of Mystra": {
    "school": "Evocation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "Ranged spell attack",
    "damageEffect": "Force"
  },
  "Holy Weapon": {
    "school": "Evocation",
    "castingTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "2d8 radiant, 4d8 radiant",
    "damageEffect": "Radiant"
  },
  "Homunculus Servant": {
    "school": "Conjuration",
    "castingTime": "1 hour or Ritual",
    "range": "10 feet",
    "duration": "Instantaneous",
    "components": "V, S, M"
  },
  "Hunger of Hadar": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "150 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "2d6 cold, 2d6 acid",
    "area": "20-foot *",
    "damageEffect": "Cold"
  },
  "Ice Knife": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "S, M",
    "saveAttack": "DEX save",
    "dice": "1d10 piercing, 2d6 cold, 1d6 cold",
    "area": "5-foot *",
    "damageEffect": "Piercing"
  },
  "Illusory Dragon": {
    "school": "Illusion",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "S",
    "saveAttack": "WIS save, INT save",
    "dice": "7d6",
    "damageEffect": "Acid"
  },
  "Immolation": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "DEX save",
    "dice": "8d6 fire, 4d6 fire",
    "damageEffect": "Fire"
  },
  "Incite Greed": {
    "school": "Enchantment",
    "castingTime": "1 action",
    "range": "30 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "damageEffect": "Charmed"
  },
  "Infernal Calling": {
    "school": "Conjuration",
    "castingTime": "1 Minute",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "dice": "3d6",
    "damageEffect": "Control"
  },
  "Infestation": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "1d6 poison, 2d6, 3d6, 4d6",
    "damageEffect": "Poison"
  },
  "Intellect Fortress": {
    "school": "Abjuration",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V",
    "saveAttack": "CHA save",
    "damageEffect": "Buff"
  },
  "Investiture of Flame": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "DEX save",
    "dice": "1d10 fire, 4d8 fire",
    "damageEffect": "Fire"
  },
  "Investiture of Ice": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "4d6 cold",
    "area": "15-foot *",
    "damageEffect": "Cold"
  },
  "Investiture of Stone": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "DEX save",
    "damageEffect": "Prone"
  },
  "Investiture of Wind": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "2d10 bludgeoning",
    "area": "15-foot *",
    "damageEffect": "Bludgeoning"
  },
  "Invulnerability": {
    "school": "Abjuration",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "damageEffect": "Warding"
  },
  "Jim's Glowing Coin": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "1 minute",
    "components": "S, M",
    "saveAttack": "WIS save"
  },
  "Jim's Magic Missile": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "Ranged spell attack",
    "dice": "2d4 force, 5d4 force, 4d4 force",
    "damageEffect": "Force"
  },
  "Kinetic Jaunt": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "S",
    "dice": "1d8 force",
    "damageEffect": "Buff"
  },
  "Laeral's Silver Lance": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "90 feet (10-foot radius)",
    "duration": "1 minute",
    "components": "V, S, M",
    "saveAttack": "STR Save",
    "area": "10-foot radius",
    "damageEffect": "Force"
  },
  "Life Transference": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "dice": "4d8 necrotic, 1d8",
    "damageEffect": "Necrotic"
  },
  "Lightning Lure": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (15-foot radius)",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "STR save",
    "dice": "1d8 lightning, 2d8, 3d8, 4d8",
    "area": "15-foot radius",
    "damageEffect": "Lightning"
  },
  "Maddening Darkness": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "150 feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, M",
    "saveAttack": "WIS save",
    "dice": "8d8 psychic",
    "area": "60-foot",
    "damageEffect": "Psychic"
  },
  "Maelstrom": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "STR save",
    "dice": "6d6 bludgeoning",
    "damageEffect": "Bludgeoning"
  },
  "Magic Stone": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Touch",
    "duration": "1 minute",
    "components": "V, S",
    "saveAttack": "Ranged spell attack",
    "dice": "1d6 + your spellcasting ability modifier bludgeoning",
    "damageEffect": "Bludgeoning"
  },
  "Mass Polymorph": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "damageEffect": "Control"
  },
  "Maximilian's Earthen Grasp": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "30 feet (5-foot square)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "STR Save",
    "area": "5-foot square",
    "damageEffect": "Bludgeoning"
  },
  "Melf's Minute Meteors": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (120 feet)",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "2d6 fire",
    "area": "120 feet",
    "damageEffect": "Fire"
  },
  "Mental Prison": {
    "school": "Illusion",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "S",
    "saveAttack": "INT save",
    "dice": "5d10 psychic, 10d10 psychic",
    "damageEffect": "Psychic"
  },
  "Mighty Fortress": {
    "school": "Conjuration",
    "castingTime": "1 Minute",
    "range": "1 mile",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "damageEffect": "Utility"
  },
  "Mind Sliver": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "1 round",
    "components": "V",
    "saveAttack": "INT save",
    "dice": "1d6 psychic, 1d4 psychic, 2d6, 3d6",
    "damageEffect": "Psychic"
  },
  "Mind Spike": {
    "school": "Divination",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "S",
    "saveAttack": "WIS save",
    "dice": "3d8 psychic, 1d8",
    "damageEffect": "Psychic"
  },
  "Mold Earth": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "area": "5-foot",
    "damageEffect": "Control"
  },
  "Motivational Speech": {
    "school": "Enchantment",
    "castingTime": "1 Minute",
    "range": "60 feet",
    "duration": "1 hour",
    "components": "V",
    "saveAttack": "WIS save",
    "damageEffect": "Buff"
  },
  "Nathair's Mischief": {
    "school": "Illusion",
    "castingTime": "1 Action",
    "range": "60ft",
    "duration": "Concentration, up to 1 minute",
    "components": "S, M",
    "saveAttack": "WIS save, DEX save",
    "area": "20-foot",
    "damageEffect": "Charmed"
  },
  "Negative Energy Flood": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, M",
    "saveAttack": "CON save",
    "dice": "5d12 necrotic",
    "damageEffect": "Necrotic"
  },
  "Phantasmal Force": {
    "school": "Illusion",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "INT save",
    "dice": "1d6 psychic",
    "area": "10-foot *",
    "damageEffect": "Psychic"
  },
  "Power Word Pain": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "CON save",
    "damageEffect": "Debuff"
  },
  "Primal Savagery": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Instantaneous",
    "components": "S",
    "saveAttack": "Melee spell attack",
    "dice": "1d10 acid, 2d10, 3d10, 4d10",
    "damageEffect": "Acid"
  },
  "Primordial Ward": {
    "school": "Abjuration",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "damageEffect": "Warding"
  },
  "Psychic Scream": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "S",
    "saveAttack": "INT save",
    "dice": "14d6 psychic",
    "damageEffect": "Psychic"
  },
  "Pyrotechnics": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "CON save",
    "area": "5-foot *",
    "damageEffect": "Blinded"
  },
  "Raulothim's Psychic Lance": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "INT save",
    "dice": "7d6 psychic, 1d6",
    "damageEffect": "Psychic"
  },
  "Ray of Sickness": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "2d8 poison, 1d8",
    "damageEffect": "Poison"
  },
  "Rime's Binding Ice": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (30-foot cone)",
    "duration": "Instantaneous",
    "components": "S, M",
    "saveAttack": "CON save",
    "dice": "3d8 cold, 1d8 cold",
    "area": "30-foot cone",
    "damageEffect": "Cold"
  },
  "Scatter": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "WIS save",
    "damageEffect": "Control"
  },
  "Shadow Blade": {
    "school": "Illusion",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "dice": "2d8 psychic, 3d8, 4d8, 5d8",
    "damageEffect": "Psychic"
  },
  "Shadow of Moil": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "dice": "2d8 necrotic",
    "damageEffect": "Necrotic"
  },
  "Shape Water": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous or 1 hour",
    "components": "S",
    "area": "5-foot",
    "damageEffect": "Control"
  },
  "Sickening Radiance": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 Feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S",
    "saveAttack": "CON save",
    "dice": "4d10 radiant",
    "area": "30-foot",
    "damageEffect": "Radiant"
  },
  "Silvery Barbs": {
    "school": "Enchantment",
    "castingTime": "1 Reaction",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V",
    "damageEffect": "Buff"
  },
  "Simbul's Synostodweomer": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "1 hour",
    "components": "V, S",
    "damageEffect": "Healing"
  },
  "Skill Empowerment": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Touch",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S",
    "damageEffect": "Buff"
  },
  "Skywrite": {
    "school": "Transmutation",
    "castingTime": "1 Action Ritual",
    "range": "Sight",
    "duration": "Concentration, up to 1 day",
    "components": "V, S",
    "damageEffect": "Communication"
  },
  "Snare": {
    "school": "Abjuration",
    "castingTime": "1 Minute",
    "range": "Touch",
    "duration": "8 hours",
    "components": "S, M",
    "saveAttack": "DEX save",
    "damageEffect": "Restrained"
  },
  "Snilloc's Snowball Swarm": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "3d6 cold, 1d6",
    "area": "5-foot",
    "damageEffect": "Cold"
  },
  "Songal's Elemental Suffusion": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX Save",
    "damageEffect": "Acid"
  },
  "Soul Cage": {
    "school": "Necromancy",
    "castingTime": "Special",
    "range": "60 feet",
    "duration": "8 hours",
    "components": "V, S, M",
    "dice": "2d8",
    "damageEffect": "Buff"
  },
  "Spellfire Flare": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "Ranged spell attack",
    "damageEffect": "Radiant",
    "dice": "2d10 radiant",
    "area": "Single target"
  },
  "Spellfire Storm": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "60 feet (20-foot radius)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "CON save",
    "area": "20-foot-radius, 20-foot-high cylinder",
    "damageEffect": "Radiant",
    "dice": "4d10 radiant"
  },
  "Spirit of Death": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "1d10 force, 1d8 + 3 necrotic",
    "damageEffect": "Summoning"
  },
  "Spirit Shroud": {
    "school": "Necromancy",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "dice": "1d8",
    "damageEffect": "Cold"
  },
  "Spray of Cards": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "Self (15-foot cone)",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "2d10 force, 1d10",
    "area": "15-foot cone",
    "damageEffect": "Force"
  },
  "Steel Wind Strike": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "S, M",
    "saveAttack": "Melee spell attack",
    "dice": "6d10 force",
    "damageEffect": "Force"
  },
  "Storm Sphere": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "150 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "STR save",
    "dice": "2d6 bludgeoning, 4d6 lightning, 1d6",
    "area": "20-foot",
    "damageEffect": "Bludgeoning"
  },
  "Summon Aberration": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "2d6 psychic, 1d10 + 3 slashing, 1d8 + 3 psychic",
    "damageEffect": "Summoning"
  },
  "Summon Beast": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "dice": "1d8 + 4 piercing",
    "damageEffect": "Summoning"
  },
  "Summon Celestial": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "dice": "2d6 + 2 radiant, 1d10 + 3 radiant, 2d8",
    "damageEffect": "Summoning"
  },
  "Summon Construct": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "1d10 fire, 1d8 + 4 bludgeoning",
    "damageEffect": "Summoning"
  },
  "Summon Draconic Spirit": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "1d6 piercing, 2d6",
    "damageEffect": "Summoning"
  },
  "Summon Elemental": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "dice": "1d10 + 4 bludgeoning",
    "damageEffect": "Summoning"
  },
  "Summon Fey": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "1d6 + 3 force, 1d6 force",
    "damageEffect": "Summoning"
  },
  "Summon Fiend": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "2d10 fire, 1d12 + 3 necrotic, 1d8 + 3 slashing, 2d6 + 3 fire",
    "damageEffect": "Summoning"
  },
  "Summon Greater Demon": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "CHA save",
    "dice": "1d6",
    "damageEffect": "Summoning"
  },
  "Summon Lesser Demons": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "60 Feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "damageEffect": "Summoning"
  },
  "Summon Shadowspawn": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "WIS save",
    "dice": "1d12 + 3 cold",
    "damageEffect": "Summoning"
  },
  "Summon Undead": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 hour",
    "components": "V, S, M",
    "saveAttack": "CON save, WIS save",
    "dice": "1d10 force, 1d8 + 3 necrotic, 2d4 + 3 necrotic, 1d6 + 3 slashing",
    "damageEffect": "Summoning"
  },
  "Sword Burst": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "DEX save",
    "dice": "1d6 force, 2d6, 3d6, 4d6",
    "area": "5-foot radius",
    "damageEffect": "Force"
  },
  "Sylune's Viper": {
    "school": "Conjuration",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "1 hour",
    "components": "V, S, M",
    "saveAttack": "Ranged spell attack",
    "damageEffect": "Force",
    "dice": "1d6 force",
    "area": "Single target"
  },
  "Synaptic Static": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "INT save, CON save",
    "dice": "8d6 psychic",
    "area": "20-foot",
    "damageEffect": "Psychic"
  },
  "Tasha's Caustic Brew": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (30-foot line)",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "2d4 acid",
    "area": "30-foot line",
    "damageEffect": "Acid"
  },
  "Tasha's Mind Whip": {
    "school": "Enchantment",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "1 round",
    "components": "V",
    "saveAttack": "INT save",
    "dice": "3d6 psychic",
    "damageEffect": "Psychic"
  },
  "Tasha's Otherworldly Guise": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "damageEffect": "Buff"
  },
  "Temple of the Gods": {
    "school": "Conjuration",
    "castingTime": "1 hour",
    "range": "120 feet",
    "duration": "24 hours",
    "components": "V, S, M",
    "saveAttack": "CHA save",
    "damageEffect": "Creation"
  },
  "Tenser's Transformation": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "2d12 force",
    "damageEffect": "Buff"
  },
  "Thorn Whip": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "Melee spell attack",
    "dice": "1d6 piercing, 2d6, 3d6, 4d6",
    "damageEffect": "Piercing"
  },
  "Thunder Step": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V",
    "saveAttack": "CON save",
    "dice": "3d10 thunder, 1d10",
    "damageEffect": "Thunder"
  },
  "Thunderclap": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self (5-foot radius)",
    "duration": "Instantaneous",
    "components": "S",
    "saveAttack": "CON save",
    "dice": "1d6 thunder, 2d6, 3d6, 4d6",
    "area": "5-foot radius",
    "damageEffect": "Thunder"
  },
  "Tidal Wave": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "4d8 bludgeoning",
    "damageEffect": "Bludgeoning"
  },
  "Tiny Servant": {
    "school": "Transmutation",
    "castingTime": "1 Minute",
    "range": "Touch",
    "duration": "8 hours",
    "components": "V, S",
    "dice": "4d4, 1d4 + 3 bludgeoning",
    "damageEffect": "Utility"
  },
  "Toll the Dead": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "WIS save",
    "dice": "1d8 necrotic, 1d12 necrotic, 2d8, 2d12, 3d8",
    "damageEffect": "Necrotic"
  },
  "Transmute Rock": {
    "school": "Transmutation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "STR save, DEX save",
    "dice": "4d8 bludgeoning",
    "area": "40-foot *",
    "damageEffect": "Bludgeoning"
  },
  "Tsunami": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "Sight",
    "duration": "Concentration, up to 6 rounds",
    "components": "V, S",
    "saveAttack": "STR save",
    "dice": "6d10 bludgeoning, 5d10 bludgeoning, 1d10",
    "damageEffect": "Bludgeoning"
  },
  "Vitriolic Sphere": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "150 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "DEX save",
    "dice": "10d4 acid, 5d4 acid, 2d4",
    "area": "20-foot",
    "damageEffect": "Acid"
  },
  "Vortex Warp": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Instantaneous",
    "components": "V, S",
    "saveAttack": "CON save",
    "damageEffect": "Teleportation"
  },
  "Wall of Light": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "4d8 radiant, 1d8",
    "damageEffect": "Radiant"
  },
  "Wall of Sand": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "damageEffect": "Blinded"
  },
  "Wall of Water": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Concentration, up to 10 minutes",
    "components": "V, S, M",
    "damageEffect": "Control"
  },
  "Wardaway": {
    "school": "Abjuration",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "CON Save",
    "damageEffect": "Force"
  },
  "Warding Wind": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 10 minutes",
    "components": "V",
    "area": "10-foot",
    "damageEffect": "Deafened"
  },
  "Warp Sense": {
    "school": "Divination",
    "castingTime": "1 Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "damageEffect": "Detection"
  },
  "Watery Sphere": {
    "school": "Conjuration",
    "castingTime": "1 Action",
    "range": "90 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "STR save",
    "area": "5-foot",
    "damageEffect": "Restrained"
  },
  "Whirlwind": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "300 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, M",
    "saveAttack": "DEX save, STR save",
    "dice": "10d6 bludgeoning, 3d6",
    "area": "10-foot *",
    "damageEffect": "Bludgeoning"
  },
  "Witch Bolt": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "30 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S, M",
    "saveAttack": "Ranged spell attack",
    "dice": "1d12 lightning",
    "damageEffect": "Lightning"
  },
  "Wither and Bloom": {
    "school": "Necromancy",
    "castingTime": "1 Action",
    "range": "60 feet",
    "duration": "Instantaneous",
    "components": "V, S, M",
    "saveAttack": "CON save",
    "dice": "2d6 necrotic, 1d6",
    "area": "10-foot *",
    "damageEffect": "Necrotic"
  },
  "Word of Radiance": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "5 feet",
    "duration": "Instantaneous",
    "components": "V, M",
    "saveAttack": "CON save",
    "dice": "1d6 radiant, 2d6, 3d6, 4d6",
    "area": "5-foot",
    "damageEffect": "Radiant"
  },
  "Wrath of Nature": {
    "school": "Evocation",
    "castingTime": "1 Action",
    "range": "120 feet",
    "duration": "Concentration, up to 1 minute",
    "components": "V, S",
    "saveAttack": "DEX save, STR save",
    "dice": "4d6 slashing, 3d8 bludgeoning",
    "area": "60-foot",
    "damageEffect": "Slashing"
  },
  "Wrathful Smite": {
    "school": "Evocation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "saveAttack": "WIS save",
    "dice": "1d6 psychic",
    "damageEffect": "Necrotic"
  },
  "Zephyr Strike": {
    "school": "Transmutation",
    "castingTime": "1 Bonus Action",
    "range": "Self",
    "duration": "Concentration, up to 1 minute",
    "components": "V",
    "dice": "1d8 force",
    "damageEffect": "Force"
  }
};

