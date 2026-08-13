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
  },
  {
    id: "berserker",
    name: "Berserker",
    icon: "RAGE",
    description: "Fly into a furious rage and overwhelm enemies with raw, relentless physical power.",
    aliases: ["barbarian", "rage", "frenzy", "brute", "viking", "savage", "warrior"],
    branches: [
      { className: "Barbarian", subclasses: { 2014: "Path of the Berserker", 2024: "Path of the Berserker" }, title: "Frenzied Berserker", playstyle: "A front-line juggernaut who trades caution for overwhelming melee damage.", abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Intimidation", "Perception", "Survival"], feats: ["Great Weapon Master", "Tough", "Sentinel", "Crusher"], masteries: ["Greataxe", "Handaxe"], equipment: ["Greataxe", "Handaxe", "Handaxe", "Explorer's Pack"] },
      { className: "Barbarian", subclasses: { 2014: "Path of the Zealot", 2024: "Path of the Zealot" }, title: "Battle Zealot", playstyle: "A divinely furious warrior who keeps fighting long past the point others would fall.", abilities: ["STR", "CON", "CHA", "WIS", "DEX", "INT"], skills: ["Athletics", "Religion", "Intimidation", "Perception"], feats: ["Great Weapon Master", "Tough", "Sentinel", "Resilient"], masteries: ["Greatsword", "Javelin"], equipment: ["Greatsword", "Javelin", "Javelin", "Explorer's Pack"] },
      { className: "Barbarian", subclasses: { 2014: "Path of Wild Magic", 2024: "Path of Wild Magic" }, title: "Wild Rager", playstyle: "A chaotic bruiser whose rage triggers unpredictable surges of primal magic.", abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"], skills: ["Athletics", "Nature", "Arcana", "Perception"], feats: ["Tough", "Great Weapon Master", "Crusher", "Alert"], masteries: ["Greataxe", "Handaxe"] },
      { className: "Fighter", subclasses: { 2014: "Champion", 2024: "Champion" }, title: "Relentless Champion", playstyle: "A simple, sturdy weapon master with reliable critical hits and staying power.", abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Intimidation", "Perception", "Survival"], feats: ["Great Weapon Master", "Tough", "Sentinel", "Piercer"], fightingStyle: "Great Weapon Fighting", masteries: ["Greatsword", "Handaxe"], equipment: ["Chain Mail", "Greatsword", "Handaxe", "Explorer's Pack"] }
    ]
  },
  {
    id: "warlord",
    name: "Warlord",
    icon: "CMD",
    description: "Lead from the front, rally your allies, and turn a party into a coordinated war machine.",
    aliases: ["commander", "leader", "tactician", "captain", "general", "marshal"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Purple Dragon Knight", 2024: "Purple Dragon Knight" }, title: "Banneret Commander", playstyle: "An inspiring armored leader who bolsters allies and holds the line.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Persuasion", "Intimidation", "Insight"], feats: ["Sentinel", "Inspiring Leader", "Heavy Armor Master", "Tough"], fightingStyle: "Defense", masteries: ["Longsword", "Javelin"], equipment: ["Chain Mail", "Longsword", "Shield", "Javelin", "Explorer's Pack"] },
      { className: "Bard", subclasses: { 2014: "College of Valor", 2024: "College of Valor" }, title: "Valor Skald", playstyle: "A battlefield bard who fights up front and empowers allies with song.", abilities: ["CHA", "CON", "STR", "DEX", "WIS", "INT"], skills: ["Performance", "Persuasion", "Athletics", "Intimidation"], feats: ["War Caster", "Inspiring Leader", "Resilient", "Tough"], fightingStyle: "Dueling", spells: ["Vicious Mockery", "Blade Ward", "Healing Word", "Heroism", "Thunderwave", "Aid", "Shatter", "Enhance Ability", "Haste", "Dispel Magic"] },
      { className: "Paladin", subclasses: { 2014: "Oath of the Crown", 2024: "Oath of the Crown" }, title: "Crown Knight", playstyle: "A steadfast guardian sworn to protect the group and rally the fallen.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Persuasion", "Athletics", "Insight", "Intimidation"], feats: ["Sentinel", "Inspiring Leader", "Heavy Armor Master", "War Caster"], fightingStyle: "Protection", masteries: ["Longsword", "Javelin"], spells: ["Bless", "Command", "Shield of Faith", "Aid", "Warding Bond", "Aura of Vitality", "Spirit Guardians", "Aura of Purity"] },
      { className: "Cleric", subclasses: { 2014: "War Domain", 2024: "War Domain" }, title: "War Priest", playstyle: "An armored divine caster who blends weapon attacks with battlefield miracles.", abilities: ["WIS", "STR", "CON", "DEX", "CHA", "INT"], skills: ["Religion", "Athletics", "Intimidation", "Insight"], feats: ["War Caster", "Resilient", "Inspiring Leader", "Sentinel"], spells: ["Guidance", "Sacred Flame", "Bless", "Shield of Faith", "Spiritual Weapon", "Aid", "Spirit Guardians", "Crusader's Mantle", "Guardian of Faith"] }
    ]
  },
  {
    id: "samurai",
    name: "Samurai",
    icon: "SAM",
    description: "Master the blade with unbreakable discipline, honor, and perfectly timed resolve.",
    aliases: ["ronin", "bushido", "honorable", "kensei", "blademaster", "swordmaster"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Samurai", 2024: "Samurai" }, title: "Sword Saint", playstyle: "A disciplined duelist with unbreakable resolve and precise, decisive strikes.", abilities: ["DEX", "CON", "WIS", "STR", "CHA", "INT"], skills: ["Athletics", "History", "Insight", "Perception"], feats: ["Alert", "Piercer", "Resilient", "Sentinel"], fightingStyle: "Dueling", masteries: ["Longsword", "Longbow"], equipment: ["Half Plate", "Longsword", "Longbow", "Explorer's Pack"] },
      { className: "Monk", subclasses: { 2014: "Way of the Kensei", 2024: "Way of the Kensei" }, title: "Kensei", playstyle: "A weapon-focused martial artist who treats blade and bow as extensions of ki.", abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"], skills: ["Acrobatics", "History", "Insight", "Athletics"], feats: ["Alert", "Mobile", "Piercer", "Resilient"], masteries: ["Longsword", "Shortbow"] },
      { className: "Paladin", subclasses: { 2014: "Oath of Conquest", 2024: "Oath of Conquest" }, title: "Iron Oathbound", playstyle: "A dominating armored warrior who breaks enemy morale through fear and force.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Intimidation", "Insight", "History"], feats: ["Sentinel", "Great Weapon Master", "Heavy Armor Master", "War Caster"], fightingStyle: "Defense", masteries: ["Longsword", "Javelin"], spells: ["Command", "Armor of Agathys", "Wrathful Smite", "Hold Person", "Spiritual Weapon", "Fear", "Bestow Curse", "Dominate Person"] }
    ]
  },
  {
    id: "illusionist",
    name: "Illusionist",
    icon: "ILL",
    description: "Bend perception itself—weave decoys, invisibility, and mind-fooling phantasms.",
    aliases: ["illusion", "trickster", "mirage", "deceiver", "phantasm", "mirror"],
    branches: [
      { className: "Wizard", subclasses: { 2014: "School of Illusion", 2024: "School of Illusion" }, title: "Master Illusionist", playstyle: "A cunning caster who bends perception, creating decoys, cover, and confusion.", abilities: ["INT", "DEX", "CON", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Deception", "Perception"], feats: ["War Caster", "Fey Touched", "Alert", "Resilient"], spells: ["Minor Illusion", "Prestidigitation", "Silent Image", "Disguise Self", "Mirror Image", "Invisibility", "Phantasmal Force", "Hypnotic Pattern", "Major Image", "Greater Invisibility"] },
      { className: "Bard", subclasses: { 2014: "College of Glamour", 2024: "College of Glamour" }, title: "Glamour Weaver", playstyle: "A dazzling performer who charms crowds and beguiles enemies with fey splendor.", abilities: ["CHA", "DEX", "CON", "WIS", "INT", "STR"], skills: ["Deception", "Performance", "Persuasion", "Insight"], feats: ["War Caster", "Fey Touched", "Inspiring Leader", "Resilient"], spells: ["Vicious Mockery", "Minor Illusion", "Charm Person", "Disguise Self", "Mirror Image", "Suggestion", "Major Image", "Hypnotic Pattern", "Greater Invisibility"] },
      { className: "Warlock", subclasses: { 2014: "The Archfey", 2024: "The Archfey" }, title: "Archfey Trickster", playstyle: "An occult caster wielding beguiling fey magic, teleportation, and illusions.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Deception", "Arcana", "Persuasion", "Insight"], feats: ["War Caster", "Fey Touched", "Spell Sniper", "Resilient"], spells: ["Eldritch Blast", "Minor Illusion", "Faerie Fire", "Sleep", "Misty Step", "Phantasmal Force", "Blink", "Hypnotic Pattern", "Greater Invisibility"] }
    ]
  },
  {
    id: "enchanter",
    name: "Enchanter",
    icon: "CHRM",
    description: "Win with words and willpower—charm, command, and dominate the minds of others.",
    aliases: ["charmer", "manipulator", "mesmer", "diplomat", "face", "mind control"],
    branches: [
      { className: "Wizard", subclasses: { 2014: "School of Enchantment", 2024: "School of Enchantment" }, title: "Enchanter", playstyle: "A subtle caster who dominates minds, charms foes, and rewrites memories.", abilities: ["INT", "CHA", "CON", "WIS", "DEX", "STR"], skills: ["Arcana", "Persuasion", "Deception", "Insight"], feats: ["War Caster", "Fey Touched", "Telepathic", "Resilient"], spells: ["Friends", "Mind Sliver", "Charm Person", "Tasha's Hideous Laughter", "Hold Person", "Suggestion", "Hypnotic Pattern", "Confusion", "Dominate Person"] },
      { className: "Bard", subclasses: { 2014: "College of Eloquence", 2024: "College of Eloquence" }, title: "Silver Tongue", playstyle: "The ultimate face: unbeatable persuasion, flawless deception, and control magic.", abilities: ["CHA", "CON", "INT", "DEX", "WIS", "STR"], skills: ["Persuasion", "Deception", "Insight", "Performance"], feats: ["Inspiring Leader", "War Caster", "Skill Expert", "Fey Touched"], spells: ["Vicious Mockery", "Friends", "Charm Person", "Heroism", "Suggestion", "Enthrall", "Hypnotic Pattern", "Confusion", "Dominate Person"] },
      { className: "Rogue", subclasses: { 2014: "Mastermind", 2024: "Mastermind" }, title: "Mastermind", playstyle: "A manipulative operative who controls conversations and pulls every string.", abilities: ["CHA", "DEX", "INT", "WIS", "CON", "STR"], skills: ["Deception", "Persuasion", "Insight", "Investigation", "Sleight of Hand"], feats: ["Skill Expert", "Alert", "Fey Touched", "Inspiring Leader"], masteries: ["Rapier", "Shortbow"], equipment: ["Leather Armor", "Rapier", "Shortbow", "Dagger", "Explorer's Pack"] }
    ]
  },
  {
    id: "storm-caller",
    name: "Storm Caller",
    icon: "STRM",
    description: "Summon thunder, lightning, wind, and rain to devastate the battlefield.",
    aliases: ["storm", "thunder", "lightning", "tempest", "weather", "gale"],
    branches: [
      { className: "Sorcerer", subclasses: { 2014: "Storm Sorcery", 2024: "Storm Sorcery" }, title: "Storm Sorcerer", playstyle: "A mobile blaster who rides the wind and calls down thunder and lightning.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Acrobatics", "Persuasion", "Nature"], feats: ["Elemental Adept", "War Caster", "Spell Sniper", "Resilient"], spells: ["Shocking Grasp", "Booming Blade", "Thunderwave", "Gust of Wind", "Shatter", "Call Lightning", "Sleet Storm", "Lightning Bolt", "Ice Storm", "Chain Lightning"] },
      { className: "Cleric", subclasses: { 2014: "Tempest Domain", 2024: "Tempest Domain" }, title: "Tempest Priest", playstyle: "A divine stormbringer who maximizes lightning and thunder and knocks foes prone.", abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Nature", "Religion", "Insight", "Athletics"], feats: ["War Caster", "Elemental Adept", "Resilient", "Sentinel"], spells: ["Guidance", "Thunderclap", "Fog Cloud", "Thunderwave", "Gust of Wind", "Shatter", "Call Lightning", "Sleet Storm", "Ice Storm"] },
      { className: "Barbarian", subclasses: { 2014: "Path of the Storm Herald", 2024: "Path of the Storm Herald" }, title: "Storm Herald", playstyle: "A raging warrior wreathed in a primal aura of storm, desert, or tundra.", abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Nature", "Survival", "Perception"], feats: ["Tough", "Great Weapon Master", "Elemental Adept", "Sentinel"], masteries: ["Greataxe", "Javelin"], equipment: ["Greataxe", "Javelin", "Javelin", "Explorer's Pack"] },
      { className: "Druid", subclasses: { 2014: "Circle of the Land", 2024: "Circle of the Land" }, title: "Storm Druid", playstyle: "A primal caster who commands weather, lightning, and the raw power of the sky.", abilities: ["WIS", "CON", "DEX", "INT", "CHA", "STR"], skills: ["Nature", "Perception", "Survival", "Arcana"], feats: ["War Caster", "Elemental Adept", "Resilient", "Mobile"], spells: ["Thunderclap", "Produce Flame", "Fog Cloud", "Gust of Wind", "Call Lightning", "Sleet Storm", "Ice Storm", "Control Water"] }
    ]
  },
  {
    id: "tide-caller",
    name: "Tide Caller",
    icon: "TIDE",
    description: "Command the ocean's depths—cold, currents, mist, and the crushing weight of the sea.",
    aliases: ["sea", "ocean", "water", "tide", "sailor", "aquatic", "mariner"],
    branches: [
      { className: "Warlock", subclasses: { 2014: "The Fathomless", 2024: "The Fathomless" }, title: "Fathomless Caller", playstyle: "An occult caster bound to the deep, wielding cold, tentacles, and crushing tides.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Nature", "Arcana", "Athletics", "Perception"], feats: ["War Caster", "Elemental Adept", "Resilient", "Spell Sniper"], spells: ["Eldritch Blast", "Ray of Frost", "Armor of Agathys", "Create or Destroy Water", "Misty Step", "Gust of Wind", "Sleet Storm", "Cone of Cold", "Evard's Black Tentacles"] },
      { className: "Druid", subclasses: { 2014: "Circle of the Land", 2024: "Circle of the Land" }, title: "Coast Warden", playstyle: "A primal caster of the shoreline commanding water, mist, and sea life.", abilities: ["WIS", "CON", "DEX", "INT", "CHA", "STR"], skills: ["Nature", "Perception", "Survival", "Athletics"], feats: ["War Caster", "Resilient", "Mobile", "Elemental Adept"], spells: ["Shape Water", "Produce Flame", "Fog Cloud", "Create or Destroy Water", "Water Walk", "Tidal Wave", "Control Water", "Watery Sphere"] },
      { className: "Paladin", subclasses: { 2014: "Oath of the Open Sea", 2024: "Oath of the Open Sea" }, title: "Sea Reaver", playstyle: "A free-spirited armored warrior who fights with the fury and freedom of the sea.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Athletics", "Perception", "Intimidation", "Survival"], feats: ["Sentinel", "Great Weapon Master", "Tough", "War Caster"], fightingStyle: "Dueling", masteries: ["Rapier", "Javelin"], spells: ["Command", "Compelled Duel", "Create or Destroy Water", "Misty Step", "Water Walk", "Freedom of Movement", "Wind Wall"] }
    ]
  },
  {
    id: "star-seer",
    name: "Star Seer",
    icon: "STAR",
    description: "Draw power from the night sky—constellations, moonlight, and cosmic prophecy.",
    aliases: ["stars", "cosmic", "astral", "celestial", "moon", "oracle", "seer"],
    branches: [
      { className: "Druid", subclasses: { 2014: "Circle of Stars", 2024: "Circle of Stars" }, title: "Starry Sage", playstyle: "A primal seer who channels constellations to heal, guide, and strike from afar.", abilities: ["WIS", "CON", "INT", "DEX", "CHA", "STR"], skills: ["Nature", "Insight", "Perception", "Arcana"], feats: ["War Caster", "Resilient", "Fey Touched", "Mobile"], spells: ["Guidance", "Produce Flame", "Faerie Fire", "Moonbeam", "Call Lightning", "Sleet Storm", "Sunbeam"] },
      { className: "Cleric", subclasses: { 2014: "Twilight Domain", 2024: "Twilight Domain" }, title: "Twilight Sentinel", playstyle: "A guardian of the night sky granting darkvision, temporary hit points, and calm.", abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Religion", "Insight", "Perception", "Survival"], feats: ["War Caster", "Resilient", "Inspiring Leader", "Tough"], spells: ["Guidance", "Light", "Bless", "Faerie Fire", "Moonbeam", "Aid", "Spirit Guardians", "Aura of Vitality", "Circle of Power"] },
      { className: "Warlock", subclasses: { 2014: "The Celestial", 2024: "The Celestial" }, title: "Celestial Star-Caller", playstyle: "An occult healer channeling radiant starlight to mend allies and burn foes.", abilities: ["CHA", "CON", "WIS", "DEX", "INT", "STR"], skills: ["Religion", "Arcana", "Insight", "Persuasion"], feats: ["War Caster", "Fey Touched", "Inspiring Leader", "Resilient"], spells: ["Eldritch Blast", "Sacred Flame", "Guiding Bolt", "Cure Wounds", "Lesser Restoration", "Daylight", "Guardian of Faith", "Flame Strike"] },
      { className: "Sorcerer", subclasses: { 2014: "Lunar Sorcery", 2024: "Lunar Sorcery" }, title: "Moonlit Sorcerer", playstyle: "A charismatic caster shifting between lunar phases for varied magical power.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Insight", "Nature", "Persuasion"], feats: ["War Caster", "Metamagic Adept", "Resilient", "Fey Touched"], spells: ["Light", "Ray of Frost", "Faerie Fire", "Moonbeam", "Sleet Storm", "Fireball", "Cone of Cold", "Sunbeam"] }
    ]
  },
  {
    id: "chronomancer",
    name: "Reality Mage",
    icon: "TIME",
    description: "Warp time, gravity, and fate itself—slow enemies, seize destiny, and rewrite the odds.",
    aliases: ["time", "chronomancer", "gravity", "fate", "order", "warp", "reality"],
    branches: [
      { className: "Wizard", subclasses: { 2014: "Chronurgy Magic", 2024: "Chronurgy Magic" }, title: "Chronurgist", playstyle: "A scholar of time who slows enemies, seizes fate, and bends probability.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "History", "Investigation", "Insight"], feats: ["War Caster", "Resilient", "Alert", "Fey Touched"], spells: ["Mage Hand", "Message", "Magic Missile", "Shield", "Misty Step", "Blink", "Haste", "Slow", "Counterspell", "Bigby's Hand"] },
      { className: "Wizard", subclasses: { 2014: "Graviturgy Magic", 2024: "Graviturgy Magic" }, title: "Graviturgist", playstyle: "A manipulator of gravity who crushes, flings, and immobilizes foes.", abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "History", "Perception"], feats: ["War Caster", "Resilient", "Spell Sniper", "Alert"], spells: ["Mage Hand", "Ray of Frost", "Magic Missile", "Shield", "Levitate", "Misty Step", "Fly", "Slow", "Wall of Force", "Bigby's Hand"] },
      { className: "Sorcerer", subclasses: { 2014: "Clockwork Soul", 2024: "Clockwork Soul" }, title: "Clockwork Adept", playstyle: "A caster of cosmic order who tames chaos, wards allies, and restores fate.", abilities: ["CHA", "CON", "INT", "WIS", "DEX", "STR"], skills: ["Arcana", "Insight", "History", "Persuasion"], feats: ["War Caster", "Metamagic Adept", "Resilient", "Fey Touched"], spells: ["Guidance", "Mage Hand", "Shield", "Protection from Evil and Good", "Aid", "Lesser Restoration", "Counterspell", "Dispel Magic", "Freedom of Movement"] }
    ]
  },
  {
    id: "gunslinger",
    name: "Gunslinger",
    icon: "GUN",
    description: "Master firearms and precision ranged combat with calm nerves and a fast trigger.",
    aliases: ["gun", "firearm", "gunslinger", "musketeer", "sharpshooter", "cowboy"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Gunslinger", 2024: "Gunslinger" }, title: "Deadeye Gunslinger", playstyle: "A ranged specialist who wields firearms with lethal, calculated precision.", abilities: ["DEX", "CON", "WIS", "STR", "INT", "CHA"], skills: ["Perception", "Investigation", "Sleight of Hand", "Athletics"], feats: ["Sharpshooter", "Alert", "Piercer", "Skill Expert"], fightingStyle: "Archery", masteries: ["Light Crossbow", "Rapier", "Dagger"], equipment: ["Studded Leather Armor", "Light Crossbow", "Rapier", "Dagger", "Explorer's Pack"] },
      { className: "Artificer", subclasses: { 2014: "Artillerist", 2024: "Artillerist" }, title: "Arcane Gunner", playstyle: "An inventor who pairs spellwork with a deployable cannon and eldritch shots.", abilities: ["INT", "DEX", "CON", "WIS", "CHA", "STR"], skills: ["Arcana", "Investigation", "Perception", "Sleight of Hand"], feats: ["Sharpshooter", "Spell Sniper", "War Caster", "Skill Expert"], spells: ["Fire Bolt", "Ray of Frost", "Thunderwave", "Shield", "Scorching Ray", "Shatter", "Fireball", "Wall of Fire"], equipment: ["Studded Leather Armor", "Light Crossbow", "Dagger", "Thieves' Tools", "Explorer's Pack"] },
      { className: "Rogue", subclasses: { 2014: "Scout", 2024: "Scout" }, title: "Outrider", playstyle: "A mobile skirmisher who scouts ahead and picks off enemies from range.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Stealth", "Survival", "Perception", "Nature", "Acrobatics"], feats: ["Sharpshooter", "Alert", "Mobile", "Skulker"], masteries: ["Shortbow", "Dagger"], equipment: ["Leather Armor", "Shortbow", "Rapier", "Dagger", "Thieves' Tools", "Explorer's Pack"] }
    ]
  },
  {
    id: "bulwark",
    name: "Bulwark",
    icon: "WALL",
    description: "Become an immovable wall—soak damage, lock down enemies, and shield your allies.",
    aliases: ["tank", "defender", "guardian", "bulwark", "protector", "shield"],
    branches: [
      { className: "Fighter", subclasses: { 2014: "Cavalier", 2024: "Cavalier" }, title: "Steadfast Cavalier", playstyle: "An immovable protector who guards allies and punishes foes for ignoring them.", abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"], skills: ["Athletics", "Animal Handling", "Perception", "Insight"], feats: ["Sentinel", "Heavy Armor Master", "Tough", "Alert"], fightingStyle: "Protection", masteries: ["Longsword", "Javelin"], equipment: ["Chain Mail", "Longsword", "Shield", "Javelin", "Explorer's Pack"] },
      { className: "Barbarian", subclasses: { 2014: "Path of the Ancestral Guardian", 2024: "Path of the Ancestral Guardian" }, title: "Ancestral Guardian", playstyle: "A spirit-warded defender whose ancestors shield allies from harm.", abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"], skills: ["Athletics", "Intimidation", "Perception", "Survival"], feats: ["Sentinel", "Tough", "Great Weapon Master", "Alert"], masteries: ["Greatsword", "Handaxe"], equipment: ["Greatsword", "Handaxe", "Handaxe", "Explorer's Pack"] },
      { className: "Paladin", subclasses: { 2014: "Oath of Redemption", 2024: "Oath of Redemption" }, title: "Redeemer", playstyle: "A defensive paladin who shields the party and ends fights without needless bloodshed.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Persuasion", "Insight", "Athletics", "Religion"], feats: ["Sentinel", "War Caster", "Inspiring Leader", "Heavy Armor Master"], fightingStyle: "Protection", masteries: ["Longsword", "Javelin"], spells: ["Bless", "Sanctuary", "Shield of Faith", "Warding Bond", "Aid", "Aura of Vitality", "Counterspell", "Wall of Force"] }
    ]
  },
  {
    id: "feral",
    name: "Feral Shapeshifter",
    icon: "FANG",
    description: "Embrace the beast within—claws, fangs, and monstrous transformations in the heat of battle.",
    aliases: ["werewolf", "lycan", "feral", "beast", "shapeshifter", "monstrous"],
    branches: [
      { className: "Barbarian", subclasses: { 2014: "Path of the Beast", 2024: "Path of the Beast" }, title: "Beast Barbarian", playstyle: "A savage warrior who grows natural weapons—claws, tail, and bite—mid-rage.", abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"], skills: ["Athletics", "Intimidation", "Survival", "Perception"], feats: ["Tough", "Great Weapon Master", "Crusher", "Alert"], masteries: ["Greataxe", "Handaxe"], equipment: ["Hide Armor", "Greataxe", "Handaxe", "Explorer's Pack"] },
      { className: "Blood Hunter", subclasses: { 2014: "Order of the Lycan", 2024: "Order of the Lycan" }, title: "Lycan Blood Hunter", playstyle: "A cursed hunter who unleashes a controlled bestial transformation in battle.", abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"], skills: ["Survival", "Perception", "Intimidation", "Athletics"], feats: ["Tough", "Great Weapon Master", "Alert", "Resilient"], fightingStyle: "Great Weapon Fighting", equipment: ["Studded Leather Armor", "Greatsword", "Dagger", "Explorer's Pack"] },
      { className: "Druid", subclasses: { 2014: "Circle of the Moon", 2024: "Circle of the Moon" }, title: "Werebeast Druid", playstyle: "A shapeshifter who becomes powerful beasts to brawl on the front line.", abilities: ["WIS", "CON", "STR", "DEX", "INT", "CHA"], skills: ["Nature", "Perception", "Animal Handling", "Survival"], feats: ["Tough", "War Caster", "Resilient", "Mobile"], spells: ["Guidance", "Shillelagh", "Faerie Fire", "Cure Wounds", "Moonbeam", "Pass without Trace", "Conjure Animals", "Polymorph"] }
    ]
  },
  {
    id: "plague-warden",
    name: "Plague Warden",
    icon: "ROT",
    description: "Weaponize decay, poison, spores, and swarms to sicken and wither your enemies.",
    aliases: ["plague", "decay", "spore", "rot", "fungus", "disease", "swarm"],
    branches: [
      { className: "Druid", subclasses: { 2014: "Circle of Spores", 2024: "Circle of Spores" }, title: "Spore Druid", playstyle: "A grim druid who weaponizes fungal decay, necrotic spores, and toughened flesh.", abilities: ["WIS", "CON", "INT", "DEX", "CHA", "STR"], skills: ["Nature", "Medicine", "Survival", "Perception"], feats: ["War Caster", "Tough", "Resilient", "Mobile"], spells: ["Chill Touch", "Poison Spray", "Entangle", "Ray of Sickness", "Blindness/Deafness", "Gentle Repose", "Animate Dead", "Blight", "Contagion"] },
      { className: "Cleric", subclasses: { 2014: "Grave Domain", 2024: "Grave Domain" }, title: "Grave Warden", playstyle: "A solemn priest who guards the line between life and death and denies foes their healing.", abilities: ["WIS", "CON", "STR", "DEX", "CHA", "INT"], skills: ["Religion", "Medicine", "Insight", "Persuasion"], feats: ["War Caster", "Resilient", "Tough", "Healer"], spells: ["Spare the Dying", "Toll the Dead", "Bane", "False Life", "Gentle Repose", "Ray of Enfeeblement", "Revivify", "Vampiric Touch", "Blight"] },
      { className: "Ranger", subclasses: { 2014: "Swarmkeeper", 2024: "Swarmkeeper" }, title: "Swarm Warden", playstyle: "A ranger accompanied by a cloud of stinging, biting creatures that harry enemies.", abilities: ["DEX", "WIS", "CON", "INT", "STR", "CHA"], skills: ["Nature", "Survival", "Perception", "Animal Handling"], feats: ["Sharpshooter", "Alert", "Mobile", "Resilient"], fightingStyle: "Archery", masteries: ["Longbow", "Shortsword"], spells: ["Hunter's Mark", "Faerie Fire", "Goodberry", "Web", "Pass without Trace", "Gaseous Form", "Insect Plague"] }
    ]
  },
  {
    id: "master-thief",
    name: "Master Thief",
    icon: "THF",
    description: "Slip in unseen, grab the prize, and vanish—heists, cons, and quick hands.",
    aliases: ["thief", "burglar", "heist", "con artist", "spy", "detective"],
    branches: [
      { className: "Rogue", subclasses: { 2014: "Thief", 2024: "Thief" }, title: "Master Thief", playstyle: "The classic burglar: fast hands, fast feet, and a knack for using anything.", abilities: ["DEX", "CON", "INT", "WIS", "CHA", "STR"], skills: ["Stealth", "Sleight of Hand", "Acrobatics", "Perception", "Investigation"], feats: ["Alert", "Skulker", "Skill Expert", "Mobile"], masteries: ["Shortbow", "Dagger"], equipment: ["Leather Armor", "Shortsword", "Shortbow", "Dagger", "Thieves' Tools", "Explorer's Pack"] },
      { className: "Bard", subclasses: { 2014: "College of Whispers", 2024: "College of Whispers" }, title: "Shadow Whisper", playstyle: "A sinister infiltrator who mimics the dead and terrifies enemies with their own secrets.", abilities: ["CHA", "DEX", "CON", "WIS", "INT", "STR"], skills: ["Deception", "Stealth", "Persuasion", "Insight", "Sleight of Hand"], feats: ["Skulker", "Alert", "Fey Touched", "Skill Expert"], spells: ["Vicious Mockery", "Minor Illusion", "Disguise Self", "Charm Person", "Detect Thoughts", "Invisibility", "Fear", "Hypnotic Pattern"] },
      { className: "Cleric", subclasses: { 2014: "Trickery Domain", 2024: "Trickery Domain" }, title: "Trickster Priest", playstyle: "A divine con artist who blesses allies while deceiving and duplicating himself.", abilities: ["WIS", "DEX", "CON", "CHA", "INT", "STR"], skills: ["Deception", "Stealth", "Religion", "Insight"], feats: ["Alert", "Skulker", "War Caster", "Fey Touched"], spells: ["Guidance", "Minor Illusion", "Charm Person", "Disguise Self", "Mirror Image", "Pass without Trace", "Blink", "Dispel Magic"] },
      { className: "Rogue", subclasses: { 2014: "Inquisitive", 2024: "Inquisitive" }, title: "Sharp-Eyed Detective", playstyle: "A perceptive investigator who spots lies, finds weaknesses, and strikes true.", abilities: ["DEX", "INT", "WIS", "CON", "CHA", "STR"], skills: ["Investigation", "Insight", "Perception", "Stealth", "Sleight of Hand"], feats: ["Alert", "Skill Expert", "Skulker", "Mobile"], masteries: ["Rapier", "Shortbow"] }
    ]
  },
  {
    id: "infernal",
    name: "Infernal Pact",
    icon: "HELL",
    description: "Bargain with hell for fire, fear, and cruel power—burn foes and grow stronger as they fall.",
    aliases: ["fiend", "demon", "devil", "hellfire", "infernal", "warlock", "fire"],
    branches: [
      { className: "Warlock", subclasses: { 2014: "The Fiend", 2024: "The Fiend" }, title: "Fiend-Pact Warlock", playstyle: "An occult blaster who channels hellfire and grows tougher as enemies fall.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Deception", "Intimidation", "Arcana", "Persuasion"], feats: ["Elemental Adept", "War Caster", "Spell Sniper", "Resilient"], spells: ["Eldritch Blast", "Fire Bolt", "Hellish Rebuke", "Command", "Scorching Ray", "Fireball", "Stinking Cloud", "Fire Shield", "Wall of Fire"] },
      { className: "Sorcerer", subclasses: { 2014: "Draconic Bloodline", 2024: "Draconic Bloodline" }, title: "Hellfire Sorcerer", playstyle: "A fiery sorcerer whose infernal blood makes flame magic hit harder and hurt less.", abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"], skills: ["Arcana", "Intimidation", "Deception", "Persuasion"], feats: ["Elemental Adept", "War Caster", "Metamagic Adept", "Resilient"], spells: ["Fire Bolt", "Chromatic Orb", "Burning Hands", "Scorching Ray", "Fireball", "Fire Shield", "Wall of Fire", "Immolation"] },
      { className: "Paladin", subclasses: { 2014: "Oathbreaker", 2024: "Oathbreaker" }, title: "Hell Knight", playstyle: "A fallen armored warrior who commands fear and infernal power on the field.", abilities: ["STR", "CHA", "CON", "WIS", "DEX", "INT"], skills: ["Intimidation", "Athletics", "Religion", "Deception"], feats: ["Great Weapon Master", "Sentinel", "Heavy Armor Master", "War Caster"], fightingStyle: "Great Weapon Fighting", masteries: ["Greatsword", "Javelin"], spells: ["Command", "Hellish Rebuke", "Wrathful Smite", "Darkness", "Crown of Madness", "Bestow Curse", "Fear", "Blight"] }
    ]
  }
];
