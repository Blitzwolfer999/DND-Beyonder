const CHARACTER_THEMES = [
  {
    id: "psychic",
    name: "Psychic",
    icon: "PSI",
    description: "Read minds, move creatures, and turn thought into a weapon.",
    aliases: ["psionic", "telepath", "telekinetic", "mind mage", "mental magic", "jedi"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Psi Warrior", 2024: "Psi Warrior" }, title: "Psychic Warrior", playstyle: "A durable weapon user who protects allies and strikes with telekinetic force.", abilities: ["STR", "INT", "CON", "DEX", "WIS", "CHA"], skills: ["Athletics", "Insight", "Perception", "Investigation"], feats: ["Telekinetic", "Telepathic", "War Caster", "Resilient"], fightingStyle: "Defense", masteries: ["Longsword", "Javelin", "Light Crossbow"], spells: [] },
      { className: "Rogue", subclasses: { 2014: "Soulknife", 2024: "Soulknife" }, title: "Soulknife Agent", playstyle: "A stealthy expert who communicates silently and attacks with blades of pure thought.", abilities: ["DEX", "INT", "CON", "WIS", "CHA", "STR"], skills: ["Stealth", "Investigation", "Insight", "Perception", "Deception"], feats: ["Telepathic", "Telekinetic", "Skulker", "Alert"], masteries: ["Dagger", "Shortbow"], spells: [] },
      { className: "Sorcerer", subclasses: { 2014: "Aberrant Mind", 2024: "Aberrant Sorcery" }, title: "Aberrant Mind", playstyle: "A full caster built around psychic damage, subtle influence, and alien magic.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Deception", "Insight", "Arcana", "Persuasion"], feats: ["Telepathic", "Telekinetic", "War Caster", "Spell Sniper"], spells: ["Mind Sliver", "Dissonant Whispers", "Detect Thoughts", "Suggestion", "Hold Person", "Fear", "Hypnotic Pattern", "Confusion", "Telekinesis", "Synaptic Static"] },
      { className: "Warlock", subclasses: { 2014: "The Great Old One", 2024: "Great Old One Patron" }, title: "Great Old One Adept", playstyle: "An occult controller with telepathy, curses, and unsettling battlefield magic.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Deception", "Investigation", "Intimidation"], feats: ["Telepathic", "War Caster", "Shadow Touched", "Spell Sniper"], spells: ["Mind Sliver", "Eldritch Blast", "Dissonant Whispers", "Tasha's Hideous Laughter", "Detect Thoughts", "Suggestion", "Hunger of Hadar", "Hypnotic Pattern", "Telekinesis"] }
    ]
  },
  {
    id: "ninja",
    name: "Ninja",
    icon: "SHD",
    description: "Move unseen, strike decisively, and escape before enemies can answer.",
    aliases: ["shinobi", "assassin", "stealth", "shadow warrior", "spy", "infiltrator"],
    branches: [
      { className: "Monk", subclasses: { 2014: "Way of Shadow", 2024: "Warrior of Shadow" }, title: "Shadow Disciple", playstyle: "A fast unarmored infiltrator using darkness, mobility, and disciplined strikes.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Stealth", "Acrobatics", "Insight", "Athletics"], feats: ["Skulker", "Alert", "Mobile", "Shadow Touched"], equipment: ["Shortsword", "Dart", "Dart", "Backpack"] },
      { className: "Rogue", subclasses: { 2014: "Assassin", 2024: "Assassin" }, title: "Silent Assassin", playstyle: "A precision striker focused on disguise, ambushes, poison, and infiltration.", abilities: ["DEX", "CON", "WIS", "INT", "CHA", "STR"], skills: ["Stealth", "Deception", "Acrobatics", "Perception", "Sleight of Hand"], feats: ["Alert", "Skulker", "Poisoner", "Mobile"], masteries: ["Dagger", "Shortbow"], equipment: ["Leather Armor", "Shortsword", "Shortbow", "Dagger", "Dagger", "Backpack"] },
      { className: "Ranger", subclasses: { 2014: "Gloom Stalker", 2024: "Gloom Stalker" }, title: "Night Stalker", playstyle: "A hidden scout who opens combat with a punishing ranged assault.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Stealth", "Perception", "Survival", "Investigation"], feats: ["Sharpshooter", "Skulker", "Alert", "Fey Touched"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Hunter's Mark", "Goodberry", "Pass without Trace", "Silence", "Darkvision", "Rope Trick", "Greater Invisibility"] },
      { className: "Wizard", subclasses: { 2014: "Bladesinging", 2024: "Bladesinger" }, title: "Arcane Blade", playstyle: "A mobile duelist who blends swordplay, illusion, and defensive magic.", abilities: ["INT", "DEX", "CON", "WIS", "CHA", "STR"], skills: ["Arcana", "Acrobatics", "Investigation", "Stealth"], feats: ["War Caster", "Mobile", "Fey Touched", "Alert"], spells: ["Booming Blade", "Mage Armor", "Shield", "Absorb Elements", "Disguise Self", "Misty Step", "Mirror Image", "Invisibility", "Haste", "Greater Invisibility", "Steel Wind Strike"] }
    ]
  },
  {
    id: "necromancer",
    name: "Necromancer",
    icon: "NEC",
    description: "Command death magic, drain vitality, or return the fallen to service.",
    aliases: ["undead", "death mage", "grave", "skeleton", "vampire", "dark magic"],
    branches: [
      { className: "Wizard", subclasses: { 2014: "School of Necromancy", 2024: "School of Necromancy" }, title: "Necromancy Scholar", playstyle: "A prepared caster with broad utility and a focus on undead servants and life-draining spells.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Religion", "Investigation", "History"], feats: ["War Caster", "Shadow Touched", "Resilient", "Ritual Caster"], spells: ["Chill Touch", "Toll the Dead", "False Life", "Ray of Sickness", "Blindness/Deafness", "Gentle Repose", "Animate Dead", "Vampiric Touch", "Blight", "Danse Macabre", "Create Undead", "Finger of Death"] },
      { className: "Cleric", subclasses: { 2014: "Death Domain", 2024: "Death Domain" }, title: "Death Priest", playstyle: "An armored divine caster who weakens enemies and channels necrotic power.", abilities: ["WIS", "CON", "STR", "DEX", "INT", "CHA"], skills: ["Religion", "Insight", "Medicine", "Intimidation"], feats: ["War Caster", "Shadow Touched", "Resilient", "Magic Initiate"], spells: ["Toll the Dead", "Spare the Dying", "Inflict Wounds", "Bane", "Blindness/Deafness", "Spiritual Weapon", "Animate Dead", "Spirit Guardians", "Blight", "Contagion"] },
      { className: "Warlock", subclasses: { 2014: "The Undead", 2024: "The Undead" }, title: "Undead Pact", playstyle: "A frightening occult caster who borrows power from an immortal patron.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Intimidation", "Arcana", "Religion", "Deception"], feats: ["Shadow Touched", "War Caster", "Telepathic", "Spell Sniper"], spells: ["Chill Touch", "Eldritch Blast", "Cause Fear", "Hex", "Ray of Enfeeblement", "Fear", "Vampiric Touch", "Blight", "Danse Macabre", "Negative Energy Flood"] },
      { className: "Paladin", subclasses: { 2014: "Oathbreaker", 2024: "Oathbreaker" }, title: "Dread Knight", playstyle: "A heavily armored warrior whose presence empowers fear and undead allies.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Intimidation", "Athletics", "Religion", "Insight"], feats: ["Heavy Armor Master", "Sentinel", "Shadow Touched", "War Caster"], fightingStyle: "Defense", masteries: ["Longsword", "Javelin"], spells: ["Command", "Hellish Rebuke", "Crown of Madness", "Darkness", "Animate Dead", "Bestow Curse", "Blight", "Contagion"] }
    ]
  },
  {
    id: "elementalist",
    name: "Elementalist",
    icon: "ELM",
    description: "Shape fire, frost, storms, and earth into spectacular battlefield magic.",
    aliases: ["fire mage", "ice mage", "storm", "lightning", "airbender", "elemental"],
    branches: [
      { className: "Sorcerer", subclasses: { 2014: "Draconic Bloodline", 2024: "Draconic Sorcery" }, title: "Draconic Elementalist", playstyle: "A resilient blaster specializing in one elemental damage type.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Intimidation", "Persuasion", "Insight"], feats: ["Elemental Adept", "War Caster", "Spell Sniper", "Resilient"], spells: ["Fire Bolt", "Ray of Frost", "Shocking Grasp", "Burning Hands", "Chromatic Orb", "Scorching Ray", "Shatter", "Fireball", "Lightning Bolt", "Ice Storm", "Cone of Cold", "Chain Lightning"] },
      { className: "Wizard", subclasses: { 2014: "School of Evocation", 2024: "Evoker" }, title: "Evocation Savant", playstyle: "A versatile spell scholar who can blast enemies without endangering allies.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "History", "Nature"], feats: ["Elemental Adept", "War Caster", "Spell Sniper", "Resilient"], spells: ["Fire Bolt", "Ray of Frost", "Magic Missile", "Burning Hands", "Thunderwave", "Scorching Ray", "Shatter", "Fireball", "Lightning Bolt", "Ice Storm", "Cone of Cold", "Chain Lightning", "Meteor Swarm"] },
      { className: "Monk", subclasses: { 2014: "Way of the Four Elements", 2024: "Warrior of the Elements" }, title: "Elemental Disciple", playstyle: "A mobile martial artist who extends strikes with elemental force.", abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"], skills: ["Acrobatics", "Athletics", "Insight", "Stealth"], feats: ["Elemental Adept", "Mobile", "Crusher", "Alert"] },
      { className: "Druid", subclasses: { 2014: "Circle of Wildfire", 2024: "Circle of Wildfire" }, title: "Wildfire Keeper", playstyle: "A primal caster balancing fiery destruction with healing and renewal.", abilities: ["WIS", "CON", "DEX", "INT", "CHA", "STR"], skills: ["Nature", "Medicine", "Perception", "Survival"], feats: ["Elemental Adept", "War Caster", "Healer", "Resilient"], spells: ["Produce Flame", "Control Flames", "Cure Wounds", "Faerie Fire", "Flaming Sphere", "Heat Metal", "Call Lightning", "Plant Growth", "Wall of Fire", "Flame Strike"] }
    ]
  },
  {
    id: "holy-champion",
    name: "Holy Champion",
    icon: "SUN",
    description: "Protect companions with armor, healing, radiant power, and unwavering conviction.",
    aliases: ["holy knight", "templar", "crusader", "guardian", "radiant", "paladin"],
    branches: [
      { className: "Paladin", subclasses: { 2014: "Oath of Devotion", 2024: "Oath of Devotion" }, title: "Devoted Knight", playstyle: "A classic armored protector with healing, radiant smites, and defensive auras.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Persuasion", "Insight", "Religion"], feats: ["Sentinel", "Heavy Armor Master", "Inspiring Leader", "War Caster"], fightingStyle: "Defense", masteries: ["Longsword", "Javelin"], spells: ["Bless", "Cure Wounds", "Shield of Faith", "Aid", "Lesser Restoration", "Revivify", "Aura of Vitality", "Death Ward", "Circle of Power"] },
      { className: "Cleric", subclasses: { 2014: "Life Domain", 2024: "Life Domain" }, title: "Radiant Healer", playstyle: "An armored full caster specializing in restoration and party support.", abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Medicine", "Insight", "Religion", "Persuasion"], feats: ["Healer", "War Caster", "Inspiring Leader", "Resilient"], spells: ["Guidance", "Sacred Flame", "Bless", "Cure Wounds", "Healing Word", "Aid", "Lesser Restoration", "Prayer of Healing", "Revivify", "Spirit Guardians", "Death Ward", "Greater Restoration", "Heal"] },
      { className: "Sorcerer", subclasses: { 2014: "Divine Soul", 2024: "Divine Soul" }, title: "Divine Soul", playstyle: "A charismatic full caster combining flexible arcane magic with divine healing.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Persuasion", "Religion", "Insight", "Arcana"], feats: ["War Caster", "Healer", "Inspiring Leader", "Metamagic Adept"], spells: ["Guidance", "Sacred Flame", "Bless", "Cure Wounds", "Healing Word", "Shield", "Aid", "Spiritual Weapon", "Revivify", "Spirit Guardians", "Death Ward", "Heal"] }
    ]
  },
  {
    id: "nature-guardian",
    name: "Nature Guardian",
    icon: "WLD",
    description: "Draw on beasts, plants, weather, and primal magic to defend the wilds.",
    aliases: ["druid", "beast", "animal", "forest", "shapeshifter", "wild shape"],
    branches: [
      { className: "Druid", subclasses: { 2014: "Circle of the Moon", 2024: "Circle of the Moon" }, title: "Moon Shapeshifter", playstyle: "Transform into beasts for front-line combat while retaining full primal spellcasting.", abilities: ["WIS", "CON", "DEX", "INT", "CHA", "STR"], skills: ["Perception", "Nature", "Animal Handling", "Survival"], feats: ["War Caster", "Resilient", "Mobile", "Tough"], spells: ["Guidance", "Shillelagh", "Entangle", "Goodberry", "Healing Word", "Faerie Fire", "Moonbeam", "Pass without Trace", "Call Lightning", "Conjure Animals", "Polymorph"] },
      { className: "Ranger", subclasses: { 2014: "Beast Master", 2024: "Beast Master" }, title: "Beast Warden", playstyle: "Fight beside a loyal primal companion while scouting and supporting the party.", abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"], skills: ["Animal Handling", "Perception", "Survival", "Stealth"], feats: ["Sharpshooter", "Mounted Combatant", "Alert", "Skill Expert"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Animal Friendship", "Hunter's Mark", "Goodberry", "Cure Wounds", "Pass without Trace", "Spike Growth", "Conjure Animals", "Plant Growth"] },
      { className: "Barbarian", subclasses: { 2014: "Path of the Totem Warrior", 2024: "Path of the Wild Heart" }, title: "Primal Warrior", playstyle: "A relentless front-line combatant empowered by animal aspects.", abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Perception", "Survival", "Animal Handling"], feats: ["Tough", "Great Weapon Master", "Sentinel", "Crusher"], masteries: ["Greataxe", "Handaxe"] }
    ]
  },
  {
    id: "monster-hunter",
    name: "Monster Hunter",
    icon: "HNT",
    description: "Track supernatural threats, learn their weaknesses, and finish the hunt.",
    aliases: ["witcher", "vampire hunter", "demon hunter", "slayer", "tracker", "blood hunter"],
    branches: [
      { className: "Blood Hunter", subclasses: { 2014: "Order of the Ghostslayer", 2024: "Order of the Ghostslayer" }, title: "Ghostslayer", playstyle: "Trade vitality for crimson rites that punish undead and unnatural foes.", abilities: ["DEX", "INT", "CON", "WIS", "STR", "CHA"], skills: ["Investigation", "Survival", "Arcana", "Perception"], feats: ["Tough", "Mage Slayer", "Alert", "Resilient"], fightingStyle: "Archery", equipment: ["Studded Leather Armor", "Longbow", "Shortsword", "Dagger", "Backpack"] },
      { className: "Ranger", subclasses: { 2014: "Monster Slayer", 2024: "Monster Slayer" }, title: "Monster Slayer", playstyle: "A tactical hunter with excellent tracking, ranged pressure, and anti-magic tools.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Survival", "Investigation", "Perception", "Nature"], feats: ["Sharpshooter", "Mage Slayer", "Alert", "Resilient"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Hunter's Mark", "Protection from Evil and Good", "Goodberry", "Pass without Trace", "Silence", "Lesser Restoration", "Protection from Energy", "Freedom of Movement"] },
      { className: "Paladin", subclasses: { 2014: "Oath of Vengeance", 2024: "Oath of Vengeance" }, title: "Avenging Hunter", playstyle: "A heavily armored pursuer who marks one dangerous enemy and refuses to let it escape.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Intimidation", "Insight", "Survival"], feats: ["Sentinel", "Mage Slayer", "Great Weapon Master", "Tough"], fightingStyle: "Great Weapon Fighting", masteries: ["Greatsword", "Javelin"], equipment: ["Chain Mail", "Greatsword", "Javelin", "Backpack"], spells: ["Hunter's Mark", "Bane", "Misty Step", "Hold Person", "Haste", "Protection from Energy", "Banishment"] }
    ]
  },
  {
    id: "arcane-marksman",
    name: "Arcane Marksman",
    icon: "ARC",
    description: "Combine precise ranged attacks with magical tricks and battlefield control.",
    aliases: ["magic archer", "arcane archer", "sniper", "spell bow", "ranged"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Arcane Archer", 2024: "Arcane Archer" }, title: "Arcane Archer", playstyle: "A durable archer who adds magical effects to decisive shots.", abilities: ["DEX", "INT", "CON", "WIS", "STR", "CHA"], skills: ["Perception", "Arcana", "Athletics", "Insight"], feats: ["Sharpshooter", "Piercer", "Alert", "Magic Initiate"], fightingStyle: "Archery", masteries: ["Longbow", "Rapier", "Dagger"], equipment: ["Studded Leather Armor", "Longbow", "Rapier", "Dagger", "Backpack"] },
      { className: "Ranger", subclasses: { 2014: "Hunter", 2024: "Hunter" }, title: "Spellbow Hunter", playstyle: "A practical ranged striker using primal magic to mark and control enemies.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Perception", "Stealth", "Survival", "Nature"], feats: ["Sharpshooter", "Piercer", "Skulker", "Alert"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Hunter's Mark", "Ensnaring Strike", "Goodberry", "Hail of Thorns", "Pass without Trace", "Spike Growth", "Lightning Arrow", "Conjure Barrage"] },
      { className: "Rogue", subclasses: { 2014: "Arcane Trickster", 2024: "Arcane Trickster" }, title: "Arcane Sniper", playstyle: "A stealthy precision attacker using illusion and enchantment to create openings.", abilities: ["DEX", "INT", "CON", "WIS", "CHA", "STR"], skills: ["Stealth", "Perception", "Investigation", "Sleight of Hand", "Arcana"], feats: ["Sharpshooter", "Skulker", "Fey Touched", "Alert"], masteries: ["Shortbow", "Dagger"], spells: ["Mage Hand", "Minor Illusion", "Disguise Self", "Silent Image", "Charm Person", "Invisibility", "Mirror Image", "Hold Person", "Hypnotic Pattern"] }
    ]
  },
  {
    id: "shadow-mage",
    name: "Shadow Mage",
    icon: "UMB",
    description: "Control darkness, fear, illusion, and the boundary between life and death.",
    aliases: ["dark mage", "illusion", "shadow", "umbral", "hex", "night magic"],
    branches: [
      { className: "Sorcerer", subclasses: { 2014: "Shadow Magic", 2024: "Shadow Sorcery" }, title: "Shadow Sorcerer", playstyle: "A charismatic full caster who survives in darkness and overwhelms foes with fear.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Deception", "Arcana", "Intimidation", "Insight"], feats: ["Shadow Touched", "War Caster", "Telepathic", "Resilient"], spells: ["Chill Touch", "Minor Illusion", "Disguise Self", "Silent Image", "Darkness", "Shadow Blade", "Fear", "Hypnotic Pattern", "Greater Invisibility", "Shadow of Moil"] },
      { className: "Warlock", subclasses: { 2014: "The Hexblade", 2024: "The Hexblade" }, title: "Hexblade", playstyle: "An armored occult duelist mixing curses, weapon attacks, and short-rest magic.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Intimidation", "Deception", "Arcana", "Investigation"], feats: ["War Caster", "Shadow Touched", "Polearm Master", "Sentinel"], fightingStyle: "Defense", spells: ["Eldritch Blast", "Booming Blade", "Hex", "Armor of Agathys", "Shield", "Darkness", "Misty Step", "Shadow Blade", "Fly", "Fear", "Shadow of Moil"] },
      { className: "Rogue", subclasses: { 2014: "Phantom", 2024: "Phantom" }, title: "Phantom", playstyle: "A skillful infiltrator who borrows knowledge and power from lingering spirits.", abilities: ["DEX", "WIS", "CON", "INT", "CHA", "STR"], skills: ["Stealth", "Perception", "Insight", "Investigation", "Deception"], feats: ["Shadow Touched", "Skulker", "Alert", "Telepathic"], masteries: ["Rapier", "Shortbow"] }
    ]
  },
  {
    id: "battle-medic",
    name: "Battle Medic",
    icon: "MED",
    description: "Keep the party standing without giving up armor, offense, or practical utility.",
    aliases: ["healer", "doctor", "support", "combat medic", "white mage", "restoration"],
    branches: [
      { className: "Cleric", subclasses: { 2014: "Life Domain", 2024: "Life Domain" }, title: "Life Cleric", playstyle: "The strongest direct healer, backed by armor and a complete divine spell list.", abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Medicine", "Insight", "Religion", "Persuasion"], feats: ["Healer", "War Caster", "Resilient", "Inspiring Leader"], spells: ["Guidance", "Spare the Dying", "Bless", "Cure Wounds", "Healing Word", "Aid", "Lesser Restoration", "Prayer of Healing", "Revivify", "Mass Healing Word", "Death Ward", "Greater Restoration", "Heal"] },
      { className: "Artificer", subclasses: { 2014: "Alchemist", 2024: "Alchemist" }, title: "Field Alchemist", playstyle: "A durable intelligence-based support specialist using tools, elixirs, and healing magic.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Medicine", "Arcana", "Investigation", "Sleight of Hand"], feats: ["Healer", "War Caster", "Chef", "Skill Expert"], spells: ["Guidance", "Spare the Dying", "Cure Wounds", "Faerie Fire", "Sanctuary", "Aid", "Lesser Restoration", "Healing Word", "Revivify", "Haste"] },
      { className: "Bard", subclasses: { 2014: "College of Lore", 2024: "College of Lore" }, title: "Combat Support", playstyle: "A flexible healer and expert who prevents harm with inspiration and control magic.", abilities: ["CHA", "DEX", "CON", "WIS", "INT", "STR"], skills: ["Persuasion", "Medicine", "Insight", "Perception", "Performance"], feats: ["Inspiring Leader", "Healer", "War Caster", "Skill Expert"], spells: ["Vicious Mockery", "Guidance", "Healing Word", "Cure Wounds", "Faerie Fire", "Heroism", "Aid", "Lesser Restoration", "Hypnotic Pattern", "Dispel Magic", "Greater Restoration"] }
    ]
  },
  {
    id: "inventor",
    name: "Inventor",
    icon: "GEAR",
    description: "Solve danger with armor, constructs, gadgets, alchemy, and carefully chosen magic.",
    aliases: ["engineer", "mechanic", "robot", "gadget", "iron man", "alchemist", "artificer"],
    branches: [
      { className: "Artificer", subclasses: { 2014: "Armorer", 2024: "Armorer" }, title: "Arcane Armorer", playstyle: "A heavily protected inventor who turns enchanted armor into a customizable weapon system.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Perception", "Sleight of Hand"], feats: ["War Caster", "Heavy Armor Master", "Skill Expert", "Alert"], equipment: ["Scale Mail", "Shield", "Light Crossbow", "Dagger", "Backpack"], spells: ["Guidance", "Fire Bolt", "Magic Missile", "Thunderwave", "Cure Wounds", "Aid", "Mirror Image", "Shatter", "Haste", "Lightning Bolt"] },
      { className: "Artificer", subclasses: { 2014: "Battle Smith", 2024: "Battle Smith" }, title: "Battle Smith", playstyle: "A weapon-using support character accompanied by a durable steel defender.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Medicine", "Perception"], feats: ["War Caster", "Sentinel", "Sharpshooter", "Skill Expert"], equipment: ["Scale Mail", "Shield", "Light Crossbow", "Longsword", "Backpack"], spells: ["Guidance", "Mending", "Cure Wounds", "Faerie Fire", "Heroism", "Shield", "Aid", "Warding Bond", "Haste", "Aura of Vitality"] },
      { className: "Artificer", subclasses: { 2014: "Artillerist", 2024: "Artillerist" }, title: "Arcane Artillerist", playstyle: "A ranged magical blaster with a deployable cannon and excellent utility.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Perception", "Sleight of Hand"], feats: ["Spell Sniper", "War Caster", "Elemental Adept", "Skill Expert"], equipment: ["Scale Mail", "Shield", "Light Crossbow", "Dagger", "Backpack"], spells: ["Fire Bolt", "Ray of Frost", "Faerie Fire", "Thunderwave", "Shield", "Scorching Ray", "Shatter", "Fireball", "Ice Storm", "Wall of Fire"] }
    ]
  },
  {
    id: "dragon-rider",
    name: "Dragon Hero",
    icon: "DRG",
    description: "Channel draconic power through a companion, bloodline, breath, or disciplined technique.",
    aliases: ["dragon rider", "dragon mage", "draconic", "dragonborn", "dragon warrior"],
    branches: [
      { className: "Ranger", subclasses: { 2014: "Drakewarden", 2024: "Drakewarden" }, title: "Drakewarden", playstyle: "Adventure beside a growing drake companion and fight with elemental coordination.", abilities: ["DEX", "WIS", "CON", "STR", "CHA", "INT"], skills: ["Animal Handling", "Perception", "Survival", "Nature"], feats: ["Mounted Combatant", "Sharpshooter", "Gift of the Chromatic Dragon", "Alert"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Hunter's Mark", "Goodberry", "Absorb Elements", "Pass without Trace", "Lesser Restoration", "Protection from Energy", "Freedom of Movement"] },
      { className: "Sorcerer", subclasses: { 2014: "Draconic Bloodline", 2024: "Draconic Sorcery" }, title: "Dragon-Blooded Mage", playstyle: "A charismatic elemental caster with natural resilience and eventually draconic flight.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Intimidation", "Persuasion", "Insight"], feats: ["Gift of the Chromatic Dragon", "Elemental Adept", "War Caster", "Inspiring Leader"], spells: ["Fire Bolt", "Chromatic Orb", "Burning Hands", "Dragon's Breath", "Scorching Ray", "Fly", "Fireball", "Fear", "Polymorph", "Cone of Cold", "Draconic Transformation"] },
      { className: "Monk", subclasses: { 2014: "Way of the Ascendant Dragon", 2024: "Way of the Ascendant Dragon" }, title: "Ascendant Dragon", playstyle: "A mobile martial artist whose strikes, breath, and presence emulate a dragon.", abilities: ["DEX", "WIS", "CON", "CHA", "STR", "INT"], skills: ["Acrobatics", "Insight", "Intimidation", "Athletics"], feats: ["Gift of the Chromatic Dragon", "Mobile", "Crusher", "Alert"] }
    ]
  },
  {
    id: "swashbuckler",
    name: "Swashbuckler",
    icon: "DUEL",
    description: "Win fights with speed, flair, daring footwork, and a perfectly timed blade.",
    aliases: ["pirate", "duelist", "fencer", "swordsman", "musketeer", "privateer"],
    branches: [
      { className: "Rogue", subclasses: { 2014: "Swashbuckler", 2024: "Swashbuckler" }, title: "Daring Duelist", playstyle: "A charismatic skirmisher who isolates foes and slips away without reprisal.", abilities: ["DEX", "CHA", "CON", "WIS", "INT", "STR"], skills: ["Acrobatics", "Persuasion", "Deception", "Perception", "Athletics"], feats: ["Defensive Duelist", "Mobile", "Piercer", "Alert"], masteries: ["Rapier", "Dagger"], equipment: ["Leather Armor", "Rapier", "Shortbow", "Dagger", "Backpack"] },
      { className: "Bard", subclasses: { 2014: "College of Swords", 2024: "College of Swords" }, title: "Blade Bard", playstyle: "A stylish weapon user with inspiration, flourishes, social expertise, and full spellcasting.", abilities: ["CHA", "DEX", "CON", "WIS", "INT", "STR"], skills: ["Performance", "Persuasion", "Acrobatics", "Insight", "Deception"], feats: ["War Caster", "Defensive Duelist", "Mobile", "Inspiring Leader"], fightingStyle: "Dueling", equipment: ["Studded Leather Armor", "Rapier", "Dagger", "Backpack"], spells: ["Vicious Mockery", "Minor Illusion", "Healing Word", "Dissonant Whispers", "Heroism", "Thunderwave", "Mirror Image", "Suggestion", "Hypnotic Pattern", "Greater Invisibility"] },
      { className: "Fighter", subclasses: { 2014: "Battle Master", 2024: "Battle Master" }, title: "Master Fencer", playstyle: "A dependable martial duelist using maneuvers, reactions, and superior positioning.", abilities: ["DEX", "CON", "CHA", "WIS", "STR", "INT"], skills: ["Acrobatics", "Persuasion", "Insight", "Perception"], feats: ["Defensive Duelist", "Piercer", "Mobile", "Martial Adept"], fightingStyle: "Dueling", masteries: ["Rapier", "Dagger", "Light Crossbow"], equipment: ["Studded Leather Armor", "Rapier", "Light Crossbow", "Dagger", "Backpack"] }
    ]
  }
];
