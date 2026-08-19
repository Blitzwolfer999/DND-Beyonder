// Subclasses original to Solasta: Crown of the Magister (Tactical Adventures).
// Solasta is built on the SRD 5.1 ruleset, so these register under the 2014
// rules. Subclasses Solasta shares with the SRD (Champion, Thief, Life Domain,
// Circle of the Land, Oath of Devotion, Hunter, The Fiend, College of Lore,
// Path of the Berserker, Way of the Open Hand, Draconic Bloodline) are already
// in the catalog and are not duplicated here.
//
// All summaries below are original concise descriptions of the mechanics, in
// keeping with this project's content policy — no sourcebook or wiki prose is
// reproduced.

const SOLASTA_SOURCE = "Solasta: Crown of the Magister";
const SOLASTA_LOST_VALLEY = "Solasta: Crown of the Magister (Lost Valley)";

// Catalog entries: [className, subclassName, source]
const SOLASTA_CATALOG_ENTRIES = [
  ["Barbarian", "Path of the Magebane", SOLASTA_SOURCE],
  ["Barbarian", "Path of the Stone", SOLASTA_SOURCE],
  ["Barbarian", "Path of Claw", SOLASTA_LOST_VALLEY],
  ["Bard", "College of Hope", SOLASTA_SOURCE],
  ["Bard", "College of Heroism", SOLASTA_SOURCE],
  ["Bard", "College of Tradition", SOLASTA_SOURCE],
  ["Cleric", "Battle Domain", SOLASTA_SOURCE],
  ["Cleric", "Elemental (Fire)", SOLASTA_SOURCE],
  ["Cleric", "Elemental (Ice)", SOLASTA_SOURCE],
  ["Cleric", "Elemental (Lightning)", SOLASTA_SOURCE],
  ["Cleric", "Insight Domain", SOLASTA_SOURCE],
  ["Cleric", "Law Domain", SOLASTA_SOURCE],
  ["Cleric", "Oblivion Domain", SOLASTA_SOURCE],
  ["Cleric", "Sun Domain", SOLASTA_SOURCE],
  ["Cleric", "Mischief Domain", SOLASTA_LOST_VALLEY],
  ["Druid", "Circle of the Kindred Spirit", SOLASTA_SOURCE],
  ["Druid", "Circle of Winds", SOLASTA_SOURCE],
  ["Druid", "Circle of Balance", SOLASTA_LOST_VALLEY],
  ["Fighter", "Mountaineer", SOLASTA_SOURCE],
  ["Fighter", "Spellblade", SOLASTA_SOURCE],
  ["Fighter", "Commander", SOLASTA_LOST_VALLEY],
  ["Monk", "Way of Freedom", SOLASTA_SOURCE],
  ["Monk", "Way of Light", SOLASTA_SOURCE],
  ["Monk", "Way of Survival", SOLASTA_SOURCE],
  ["Paladin", "Oath of the Motherland", SOLASTA_SOURCE],
  ["Paladin", "Oath of Tirmar", SOLASTA_SOURCE],
  ["Paladin", "Oath of Judgment", SOLASTA_LOST_VALLEY],
  ["Ranger", "Marksman", SOLASTA_SOURCE],
  ["Ranger", "Shadow Tamer", SOLASTA_SOURCE],
  ["Ranger", "Swift Blade", SOLASTA_LOST_VALLEY],
  ["Rogue", "Darkweaver", SOLASTA_SOURCE],
  ["Rogue", "Shadowcaster", SOLASTA_SOURCE],
  ["Rogue", "Hoodlum", SOLASTA_LOST_VALLEY],
  ["Sorcerer", "Child of the Rift", SOLASTA_SOURCE],
  ["Sorcerer", "Mana Painter", SOLASTA_SOURCE],
  ["Sorcerer", "Haunted Soul", SOLASTA_LOST_VALLEY],
  ["Warlock", "The Hive", SOLASTA_SOURCE],
  ["Warlock", "The Timekeeper", SOLASTA_SOURCE],
  ["Warlock", "The Tree", SOLASTA_SOURCE],
  ["Wizard", "Greenmage", SOLASTA_SOURCE],
  ["Wizard", "Loremaster", SOLASTA_SOURCE],
  ["Wizard", "Shock Arcanist", SOLASTA_SOURCE],
  ["Wizard", "Court Mage", SOLASTA_LOST_VALLEY]
];

const SOLASTA_SUBCLASS_FEATURES = {
  // ---------------- Barbarian ----------------
  "Path of the Magebane": [
    [3, "War Cry", "While raging, you can answer magical damage with a reaction shout that deals psychic damage to nearby enemies."],
    [6, "Enemy of Magic", "Your raging melee hits against spellcasters roll an extra weapon damage die."],
    [10, "Reject Magic", "You have advantage on saving throws made against spells."]
  ],
  "Path of the Stone": [
    [3, "Stone Resilience", "Each turn you spend raging ends with temporary hit points equal to twice your proficiency bonus."],
    [6, "Strength from Within", "Saving throws use your Constitution modifier whenever that is higher than the ability the save would normally use."],
    [10, "Rock Solid", "While raging you gain up to +4 AC, scaling with the number of enemies crowding you."]
  ],
  "Path of Claw": [
    [3, "Dragon Ancestry", "Choose a draconic ancestor; its element sets the damage type used by your other Path of Claw features."],
    [3, "Dragon Scales", "Raging grants +1 AC and resistance to your ancestor's damage type."],
    [6, "Draconic Wrath", "Once per short rest, exhale a cone of your ancestor's element as a bonus action, halved on a Dexterity save."],
    [10, "Dragon's Blessing", "Your melee weapon hits deal extra elemental damage while you rage."]
  ],

  // ---------------- Bard ----------------
  "College of Hope": [
    [3, "Healing Ballad", "Your Song of Rest restores extra hit points and hands out temporary hit points after a short rest."],
    [3, "Wandering Healer", "You gain a set of restorative spells that are always available to you."],
    [6, "Words of Hope", "Granting Bardic Inspiration also heals the recipient with a Song of Rest die."],
    [14, "Song of Hope", "Take an action to give nearby allies resistance to all damage and advantage on saves while you keep the song going."]
  ],
  "College of Heroism": [
    [3, "Bolster Morale", "Allies spending your Bardic Inspiration die roll it twice and keep the better result."],
    [3, "Heroic Tale", "Once per rest, embolden an ally for a minute with immunity to fear and advantage on saving throws."],
    [6, "Thundering Voice", "Handing out Bardic Inspiration also lashes the nearest foe with thunder damage and hampers its next attack."]
  ],
  "College of Tradition": [
    [3, "Aura of Preeminence", "Intimidation and Insight checks treat any die roll below 10 as a 10."],
    [3, "Ancient Tradition", "You can cast mage armor on yourself at will."],
    [6, "Verbal Onslaught", "Spend Bardic Inspiration as a reaction to deal psychic damage to whoever hurt you, potentially stunning them."]
  ],

  // ---------------- Cleric ----------------
  "Battle Domain": [
    [1, "Battle Domain Spells", "Martial and offensive spells are added to your always-prepared list as you level."],
    [1, "Bonus Proficiency", "You gain proficiency with martial weapons."],
    [1, "Battle Magic", "You can supply somatic components while holding a weapon or shield, with no free hand needed."],
    [1, "Divine Fortitude", "Take an action to gain temporary hit points equal to three per cleric level."],
    [2, "Channel Divinity: Decisive Strike", "Channel Divinity to add extra damage to a weapon hit and stun the target."],
    [6, "Herald of Battle", "Allies beside you gain a bonus to attack rolls, damage, AC, and saving throws."],
    [8, "Scholar of Battle", "You gain an additional attack when you take the Attack or Shove action."]
  ],
  "Elemental (Fire)": [
    [1, "Elemental Domain Spells", "Elemental spells are added to your always-prepared list as you level."],
    [1, "Bonus Cantrip (Fire)", "You learn the fire bolt cantrip."],
    [1, "Primal Harmony (Fire)", "You have resistance to fire damage."],
    [2, "Channel Divinity: Fire Burst", "Channel Divinity to scorch a distant target for fire damage, halved on a Dexterity save."],
    [6, "Scholar of the Elements", "React to fire damage to become immune to it and be healed by it instead."],
    [8, "Call Upon Fire", "A number of times per long rest equal to your Wisdom bonus, deal fire damage and knock the target back on a failed Strength save."]
  ],
  "Elemental (Ice)": [
    [1, "Elemental Domain Spells", "Elemental spells are added to your always-prepared list as you level."],
    [1, "Bonus Cantrip (Ice)", "You learn the ray of frost cantrip."],
    [1, "Primal Harmony (Ice)", "You have resistance to cold damage."],
    [2, "Channel Divinity: Ice Lance", "Channel Divinity to spear a distant target for cold damage and push it back on a failed Dexterity save."],
    [6, "Scholar of the Elements", "React to cold damage to become immune to it and be healed by it instead."],
    [8, "Call Upon Cold", "A number of times per long rest equal to your Wisdom bonus, deal cold damage and push the target on a failed Strength save."]
  ],
  "Elemental (Lightning)": [
    [1, "Elemental Domain Spells", "Elemental spells are added to your always-prepared list as you level."],
    [1, "Bonus Cantrip (Lightning)", "You learn the shocking grasp cantrip."],
    [1, "Primal Harmony (Lightning)", "You have resistance to lightning damage."],
    [2, "Channel Divinity: Lightning Blade", "Channel Divinity to strike a distant target with lightning, stunning it briefly on a failed Dexterity save."],
    [6, "Scholar of the Elements", "React to your domain's element to become immune to it and be healed by it instead."],
    [8, "Call Upon Thunder", "A number of times per long rest equal to your Wisdom modifier, damage a target and push it back on a failed Strength save."]
  ],
  "Insight Domain": [
    [1, "Insight Domain Spells", "Divinatory and protective spells are added to your always-prepared list as you level."],
    [1, "Divine Intuition", "You have advantage on Arcana, History, and Nature checks."],
    [1, "Inspired Diplomat", "You can read the odds of success on social checks before committing to them."],
    [2, "Channel Divinity: Foreknowledge", "Channel Divinity so that attacks against you are made with disadvantage for a minute."],
    [6, "Divine Eye", "You have advantage on finding traps, hidden doors, and concealed objects."],
    [8, "Divine Lore", "You understand all languages, and once per long rest you can identify a magic item."]
  ],
  "Law Domain": [
    [1, "Law Domain Spells", "Binding and punitive spells are added to your always-prepared list as you level."],
    [1, "Unyielding Enforcer", "You have advantage on rolls to resist being shoved or moved by magic."],
    [1, "Commanding Presence", "You gain proficiency and advantage on Intimidation checks."],
    [2, "Channel Divinity: Holy Retribution", "Channel Divinity to answer damage with a reactive psychic counterattack."],
    [2, "Channel Divinity: Force Law", "Channel Divinity to impose disadvantage on a target's save against your attack spell."],
    [6, "Word of the Law", "You can break an enemy's concentration on a spell."],
    [8, "Anathema", "Restrain a creature and burn it with force damage each turn until it saves or the minute ends."]
  ],
  "Oblivion Domain": [
    [1, "Oblivion Domain Spells", "Necrotic and debilitating spells are added to your always-prepared list as you level."],
    [1, "Bonus Cantrip", "You learn the chill touch cantrip."],
    [1, "Gate Keeper", "You and nearby allies have advantage on death saving throws."],
    [2, "Channel Divinity: Herald of Pain", "Channel Divinity to deal necrotic damage and poison a nearby foe on a failed Wisdom save."],
    [2, "Peaceful Rest", "Your camps are less likely to be attacked and you cannot be surprised while resting."],
    [6, "Strike of Oblivion", "Your first attack each turn deals extra necrotic damage."],
    [8, "Mark of Fate", "Mark a creature you can see so your attacks against it deal additional damage."]
  ],
  "Sun Domain": [
    [1, "Sun Domain Spells", "Fire and light spells are added to your always-prepared list as you level."],
    [1, "Bonus Cantrip", "You learn the light cantrip."],
    [1, "Holy Radiance", "Targets have disadvantage on saving throws against your sacred flame."],
    [2, "Channel Divinity: Herald of the Sun", "Channel Divinity to bathe a visible enemy in radiant light for damage that scales with your cleric level."],
    [6, "Channel Divinity: Indomitable Light", "Channel Divinity to raise a sphere of sunlight that banishes darkness and punishes light-sensitive foes."],
    [6, "Soothing Hand", "Heal an ally and clear one detrimental condition from them."],
    [8, "Divine Strike", "Once per turn your weapon attacks deal extra radiant damage."]
  ],
  "Mischief Domain": [
    [1, "Mischief Domain Spells", "Charm and illusion spells are added to your always-prepared list as you level."],
    [1, "Trickster", "You gain proficiency in Stealth and Deception."],
    [1, "Borrowed Luck", "React to a failed save against magic to reroll it, at the cost of disadvantage on your next save."],
    [2, "Channel Divinity: Trickery Strike", "Channel Divinity so a weapon hit deals extra psychic damage and inflicts a random condition."],
    [6, "Elusive Target", "React to a melee hit to gain the benefits of Dodge and Disengage until your next turn ends."],
    [8, "Divine Strike", "Your weapon attacks deal extra psychic damage."]
  ],

  // ---------------- Druid ----------------
  "Circle of the Kindred Spirit": [
    [2, "Spirit Choice", "Bond with a chosen spirit companion, which also grants you a benefit of its own."],
    [2, "Spirit Call", "Summon your kindred spirit nearby with an action; if it dies you must take a long rest before calling it again."],
    [2, "Spirit Bond", "Your spirit shares your proficiency bonus, attack, and saving throw numbers, and hurts you psychically if it falls."],
    [6, "Magical Spirit", "Your spirit's attacks count as magical, and healing you also transfers hit points to it."],
    [10, "Shared Pain", "React to split damage dealt to you or your spirit evenly between the two of you."]
  ],
  "Circle of Winds": [
    [2, "Carried by the Wind", "Casting a leveled spell lets you Disengage for free and adds movement speed for the turn."],
    [6, "Sheltering Breeze", "A bonus action grants nearby allies advantage on saving throws until your next turn, a number of times per long rest based on your Wisdom."],
    [10, "Guiding Winds", "Hitting an enemy grants advantage on the next attack made against it before your next turn ends."]
  ],
  "Circle of Balance": [
    [2, "Gift of Life", "Healing a creature with a leveled spell restores extra hit points equal to your level on your next turn."],
    [6, "Survival of the Wisest", "Against creature types you have already studied, your spell save DC and spell attack bonus improve."],
    [10, "Cold Embrace", "Damaging a foe with a spell prevents it from regaining hit points until your next turn."]
  ],

  // ---------------- Fighter ----------------
  "Mountaineer": [
    [3, "Shield Swipe", "You have advantage on shove attempts made while using a shield."],
    [3, "Tunnel Fighter", "Fighting with a wall at your side grants a bonus to AC."],
    [3, "Bonus Proficiency", "You gain the training a mountain fighter needs for close, cramped terrain."],
    [7, "Close Quarters", "A bonus action lets you force a position swap with an adjacent enemy through a Strength or Dexterity contest."],
    [10, "Shield Push", "You can shove opponents as a bonus action while wielding a shield."]
  ],
  "Spellblade": [
    [3, "Spellcasting", "You learn wizard cantrips and spells drawn from the conjuration, evocation, transmutation, and enchantment schools."],
    [3, "Magic Weapon", "Your weapon attacks count as magical for overcoming resistance and immunity."],
    [7, "Into the Fray", "Your melee weapon serves as a spellcasting focus, and being in melee no longer hampers your ranged spell attacks."],
    [10, "Spell Tyrant", "Force a creature to stumble one space on a failed Strength save."]
  ],
  "Commander": [
    [3, "Bonus Proficiencies", "You gain proficiency in Intimidation and Insight."],
    [3, "Rousing Shout", "A bonus action grants nearby allies advantage on their next attack."],
    [7, "Coordinated Defense", "Give up an attack to grant a nearby ally the benefits of Dodge until your next turn."],
    [10, "Invigorating Shout", "Rousing Shout reaches further and grants temporary hit points equal to your fighter level."]
  ],

  // ---------------- Monk ----------------
  "Way of Freedom": [
    [3, "Swift Steps", "Flurry of Blows also grants a free Dash and advantage on your next attack."],
    [6, "Swirling Dance", "React to a missed melee attack with an immediate counterattack."],
    [11, "Unending Strikes", "Flurry of Blows makes three attacks instead of two."]
  ],
  "Way of Light": [
    [3, "Luminous Ki", "You learn the light and shine cantrips using Wisdom, and creatures struck by your Flurry of Blows glow briefly."],
    [6, "Radiant Strikes", "Striking a target lit by your own light deals extra radiant damage."],
    [11, "Blinding Flash", "Spend ki to burst with light, dealing radiant damage and blinding nearby creatures on a failed Constitution save."]
  ],
  "Way of Survival": [
    [3, "Defensive Stance", "You gain a bonus to AC while unarmoured, and Patient Defense grants advantage on your attacks."],
    [6, "Unbreakable Body", "Taking damage heals you for your proficiency bonus on your next turn, and Patient Defense grants damage resistance."],
    [11, "Unmoving Strength", "You add your Constitution modifier to damage with unarmed strikes and monk weapons."]
  ],

  // ---------------- Paladin ----------------
  "Oath of the Motherland": [
    [3, "Oath Spells", "Fire and flame spells become always prepared for you at the listed levels."],
    [3, "Channel Divinity: Fiery Wrath", "Channel Divinity to burn a distant creature for damage scaling with your paladin level and set it alight."],
    [3, "Channel Divinity: Fiery Presence", "Channel Divinity to blind nearby foes on a failed Dexterity save, with darkvision creatures faring worse."],
    [7, "Volcanic Aura", "Allies in your aura gain fire resistance and a bonus to AC."]
  ],
  "Oath of Tirmar": [
    [3, "Oath Spells", "Light and binding spells become always prepared for you at the listed levels."],
    [3, "Bonus Language", "You learn the Tirmarian tongue."],
    [3, "Channel Divinity: Golden Speech", "Channel Divinity for an hour of advantage on Persuasion and Intimidation checks."],
    [3, "Channel Divinity: Scourge of the Hidden", "Channel Divinity to deal radiant damage against shapeshifters and creatures with darkvision, doubled against both."],
    [7, "Aura of Truth", "Allies in your aura gain superior darkvision and a bonus to Perception."]
  ],
  "Oath of Judgment": [
    [3, "Oath Spells", "Spells of judgement and restraint become always prepared for you at the listed levels."],
    [3, "Channel Divinity: Weight of Justice", "Channel Divinity so your next melee hit restrains the target until it succeeds on a Charisma save."],
    [3, "Channel Divinity: Purge Corruption", "Channel Divinity as a bonus action to lift blindness, deafness, paralysis, or poison from a nearby ally."],
    [7, "Aura of Righteousness", "Allies in your aura add your proficiency bonus to weapon damage, matching the weapon's damage type."]
  ],

  // ---------------- Ranger ----------------
  "Marksman": [
    [3, "Additional Proficiencies", "You gain proficiency with a herbalism kit or a poisoner's kit."],
    [3, "Reaction Shot", "When a distant foe attacks you with a ranged weapon or spell, you can return fire as a reaction."],
    [7, "Recycler", "You can craft arrows during a short or long rest."],
    [7, "Step Back", "A bonus action moves you clear without provoking and grants advantage on your next ranged attack that turn."]
  ],
  "Shadow Tamer": [
    [3, "Tunnel Wisdom", "In dim light or darkness you have advantage on Dexterity saving throws."],
    [3, "Dark Slayer", "Against light-sensitive creatures you add your proficiency bonus to weapon attack and damage rolls."],
    [7, "Rope Grapple", "Hook a creature and drag it toward you if it loses a Strength contest."],
    [7, "Know the Darkness", "In dim light or darkness you gain tremorsense and advantage on Stealth, Perception, and Investigation."]
  ],
  "Swift Blade": [
    [3, "Quick Steps", "Your speed increases, and Dashing makes opportunity attacks against you suffer disadvantage."],
    [3, "Blade Dance", "Dual-wielding melee weapons grants a bonus to AC."],
    [7, "Battle Focus", "Enter a heightened state that boosts your weapon damage until your next turn."],
    [11, "Extra Attack (2)", "You attack three times whenever you take the Attack action."]
  ],

  // ---------------- Rogue ----------------
  "Darkweaver": [
    [3, "Bonus Proficiency", "You gain proficiency with a poisoner's kit."],
    [3, "Spider on Wall", "You climb without friction, treating difficult climbing surfaces as ordinary movement."],
    [3, "Predator", "Ranged weapon hits on enemies below you add your proficiency bonus to damage."],
    [9, "Poisonous", "Your damaging melee hits force a Constitution save or poison the target and deal extra damage."]
  ],
  "Shadowcaster": [
    [3, "Spellcasting", "You learn wizard cantrips and spells from the divination, illusion, necromancy, and abjuration schools using Intelligence."],
    [3, "Shadow Dodge", "A bonus action teleports you a short distance to a spot you can see; it returns after a rest."],
    [9, "Shadow Retribution", "When a damaging spell targets you, you can answer with a cantrip as a reaction."]
  ],
  "Hoodlum": [
    [3, "Mean Mug", "You gain proficiency in Intimidation, or expertise if you were already proficient."],
    [3, "The Right Tool", "You gain proficiency with martial weapons, medium armour, and shields."],
    [3, "Heavy Beating", "You can use Sneak Attack with melee weapons that lack the finesse property."],
    [9, "Menacing", "A creature struck by your Sneak Attack has disadvantage on its attacks until your next turn."],
    [13, "Dirty Fighting", "A bonus action leaves a target incapacitated and blinded on a failed Constitution save, once per target."]
  ],

  // ---------------- Sorcerer ----------------
  "Child of the Rift": [
    [1, "Child of the Rift Spells", "Rift-touched spells become permanently available to you at the listed levels."],
    [1, "Rift Magic", "Casting a sorcerer spell of levels 1 through 5 carries a chance the slot is not spent at all."],
    [2, "Rift Deflection", "Spend a sorcery point as a bonus action for improved AC and saving throws until your next turn."],
    [6, "Offering to the Rift", "Sacrifice hit points as a bonus action to regain a sorcery point; the loss is restored on a long rest."]
  ],
  "Mana Painter": [
    [1, "Mana Painter Spells", "Nature-touched spells become permanently available to you at the listed levels."],
    [1, "Mana Absorption", "Saving throws against spells and magical effects use your Charisma modifier when it is higher."],
    [2, "Mana Drain", "Make a melee spell attack for force damage that returns a sorcery point on a hit, usable again after a short rest."],
    [6, "Mana Tap", "Once per long rest, finishing a short rest restores sorcery points equal to half your sorcerer level."]
  ],
  "Haunted Soul": [
    [1, "Haunted Soul Spells", "Spells of fear and decay become permanently available to you at the listed levels."],
    [2, "Spirit Visage", "A bonus action saddles a target with disadvantage on attacks and checks unless it succeeds on a Wisdom save."],
    [6, "Vengeful Spirits", "Conjure a roaming field of spirits that deals necrotic damage to enemies inside it, halved on a Charisma save."]
  ],

  // ---------------- Warlock ----------------
  "The Hive": [
    [1, "Expanded Spells", "Spells of poison, vermin, and decay are added to your spell list."],
    [1, "Weakening Pheromones", "The first creature you damage with a spell each turn has disadvantage on its next saving throw."],
    [6, "Magic Counter", "Once per short rest you can counterspell without spending a slot, adding your proficiency bonus against higher-level spells."],
    [10, "Reactive Carapace", "React to magical damage to gain temporary hit points until your next turn."]
  ],
  "The Timekeeper": [
    [1, "Expanded Spells", "Spells that hasten, slow, and manipulate time are added to your spell list."],
    [1, "Curse of Time", "Enemies you damage with a spell bleed force damage at the start of each of their turns for a minute."],
    [6, "Time Shift", "Once per long rest, react by stepping forward in time to negate all incoming damage and effects."],
    [10, "Accelerate", "A bonus action grants an ally the benefits of haste without the usual lethargy, a number of times per long rest equal to your proficiency bonus."],
    [14, "Time Warp", "Once per long rest, take an extra action on your turn."]
  ],
  "The Tree": [
    [1, "Piercing Branches", "Barbs erupt from your skin to wound enemies that strike you in melee."],
    [6, "Blessing of the Tree", "You become immune to the poisoned condition and resistant to poison and necrotic damage."],
    [10, "Explosive Growth", "Once per short rest, erupt with branches that damage, shove, and restrain nearby enemies on a failed Dexterity save."]
  ],

  // ---------------- Wizard ----------------
  "Greenmage": [
    [2, "Green Magic", "A list of nature-themed spells counts as wizard spells for you."],
    [2, "Warden of the Forest", "You gain the Archery fighting style along with light armour and shortbow proficiency."],
    [6, "Entangling Shot", "Your arrows sprout vines that restrain a target on a failed Strength save, usable a number of times based on your Intelligence."],
    [10, "Leaf Scales", "React to a ranged attack or spell you can see to halve the damage it deals you."]
  ],
  "Loremaster": [
    [2, "Keen Mind", "You have advantage on Arcana, History, and Investigation checks, copy scrolls more reliably, and craft faster and cheaper."],
    [6, "Spell Academic", "You learn one additional spell at every level."],
    [10, "Academic Lore", "You can memorise additional spells equal to your proficiency bonus and learn two more cantrips."]
  ],
  "Shock Arcanist": [
    [2, "Arcane Warfare", "Spells from the war list are cast as though using a slot one level higher."],
    [6, "Arcane Fury", "Once per long rest, add your proficiency and Intelligence bonuses to evocation spell damage for a minute."],
    [10, "Arcane Shock", "Overcharge your magic to guarantee high damage dice, at the cost of being restrained and risking psychic backlash."]
  ],
  "Court Mage": [
    [2, "Always Prepared", "You gain shield proficiency and the Protection fighting style."],
    [2, "Spell Shield", "Take an action to grant temporary hit points to yourself and a nearby ally for up to an hour."],
    [6, "Counterspell Mastery", "You have advantage on your counterspell checks, and enemies have disadvantage countering yours."],
    [10, "Improved Spell Shield", "Creatures protected by your Spell Shield gain advantage on saves against spells and magical effects."]
  ]
};

// Domain / oath / patron / origin spells granted by the Solasta subclasses.
// Keyed by the class level at which they become available. Spells unique to
// Solasta that have no entry in this app's spell database are omitted.
const SOLASTA_SUBCLASS_SPELLS = {
  "Battle Domain": {
    1: ["Magic Missile", "Shield of Faith"], 3: ["Hold Person", "Branding Smite"],
    5: ["Fireball", "Haste"], 7: ["Stoneskin", "Phantasmal Killer"],
    9: ["Hold Monster", "Insect Plague"]
  },
  "Elemental (Fire)": {
    1: ["Thunderwave", "Fog Cloud"], 3: ["Levitate", "Misty Step"],
    5: ["Lightning Bolt", "Fly"], 7: ["Ice Storm", "Wall of Fire"],
    9: ["Cone of Cold", "Conjure Elemental"]
  },
  "Elemental (Ice)": {
    1: ["Thunderwave", "Fog Cloud"], 3: ["Levitate", "Misty Step"],
    5: ["Lightning Bolt", "Fly"], 7: ["Ice Storm", "Wall of Fire"],
    9: ["Cone of Cold", "Conjure Elemental"]
  },
  "Elemental (Lightning)": {
    1: ["Thunderwave", "Fog Cloud"], 3: ["Levitate", "Misty Step"],
    5: ["Lightning Bolt", "Fly"], 7: ["Ice Storm", "Wall of Fire"],
    9: ["Cone of Cold", "Conjure Elemental"]
  },
  "Insight Domain": {
    1: ["Detect Evil and Good", "Identify"], 3: ["Find Traps", "See Invisibility"],
    5: ["Slow", "Remove Curse"], 7: ["Phantasmal Killer"],
    9: ["Dispel Evil and Good", "Dominate Person"]
  },
  "Law Domain": {
    1: ["Heroism", "Shield"], 3: ["Branding Smite", "Hold Person"],
    5: ["Counterspell", "Lightning Bolt"], 7: ["Banishment", "Guardian of Faith"],
    9: ["Hold Monster", "Dispel Evil and Good"]
  },
  "Oblivion Domain": {
    1: ["Sleep", "Inflict Wounds"], 3: ["Blindness/Deafness", "Ray of Enfeeblement"],
    5: ["Vampiric Touch", "Fear"], 7: ["Black Tentacles", "Confusion"],
    9: ["Contagion", "Cloudkill"]
  },
  "Sun Domain": {
    1: ["Burning Hands", "Faerie Fire"], 3: ["Scorching Ray", "Darkvision"],
    5: ["Daylight", "Hypnotic Pattern"], 7: ["Fire Shield", "Wall of Fire"],
    9: ["Flame Strike", "Greater Restoration"]
  },
  "Mischief Domain": {
    1: ["Charm Person", "Expeditious Retreat"], 3: ["Blur", "Invisibility"],
    5: ["Hypnotic Pattern", "Slow"], 7: ["Confusion", "Greater Invisibility"],
    9: ["Dominate Person", "Hold Monster"]
  },
  "Oath of the Motherland": {
    3: ["Bane", "Burning Hands"], 5: ["Branding Smite", "Scorching Ray"],
    9: ["Fireball", "Dispel Magic"]
  },
  "Oath of Tirmar": {
    3: ["Sleep", "Shield"], 5: ["Hold Person", "Blindness/Deafness"],
    9: ["Daylight", "Slow"]
  },
  "Oath of Judgment": {
    3: ["Guiding Bolt", "Protection from Evil and Good"], 5: ["Enhance Ability", "Hold Person"],
    9: ["Hypnotic Pattern", "Haste"]
  },
  "The Hive": {
    1: ["Detect Poison and Disease", "Inflict Wounds"], 3: ["Acid Arrow", "Calm Emotions"],
    5: ["Lightning Bolt", "Stinking Cloud"], 7: ["Giant Insect", "Stoneskin"],
    9: ["Cloudkill", "Insect Plague"]
  },
  "The Timekeeper": {
    1: ["Longstrider", "Magic Missile"], 3: ["Blur", "Calm Emotions"],
    5: ["Haste", "Slow"], 7: ["Greater Invisibility", "Phantasmal Killer"],
    9: ["Raise Dead", "Dominate Person"]
  },
  "Child of the Rift": {
    1: ["Guiding Bolt"], 3: ["Aid"], 5: ["Daylight"], 7: ["Banishment"], 9: ["Greater Restoration"]
  },
  "Mana Painter": {
    1: ["Entangle"], 3: ["Barkskin"], 5: ["Sleet Storm"], 7: ["Fire Shield"], 9: ["Conjure Elemental"]
  },
  "Haunted Soul": {
    1: ["Inflict Wounds"], 3: ["Ray of Enfeeblement"], 5: ["Fear"], 7: ["Phantasmal Killer"]
  },
  "College of Hope": {
    3: ["Prayer of Healing"], 6: ["Mass Healing Word", "Revivify"]
  }
};

// ---- Registration ----
(function registerSolastaContent() {
  if (typeof SUBCLASS_CATALOG !== "undefined" && typeof subclassRecord === "function") {
    SOLASTA_CATALOG_ENTRIES.forEach(([className, name, source]) => {
      SUBCLASS_CATALOG[className] = SUBCLASS_CATALOG[className] || [];
      const already = SUBCLASS_CATALOG[className]
        .some(record => record.name === name && record.rules === "2014");
      if (!already) SUBCLASS_CATALOG[className].push(subclassRecord(name, source, "2014"));
    });
  }
  if (typeof addSubclassFeatures === "function") {
    addSubclassFeatures({ "2014": SOLASTA_SUBCLASS_FEATURES });
  }
  if (typeof SUBCLASS_SPELL_LISTS !== "undefined") {
    SUBCLASS_SPELL_LISTS["2014"] = SUBCLASS_SPELL_LISTS["2014"] || {};
    Object.entries(SOLASTA_SUBCLASS_SPELLS).forEach(([name, table]) => {
      if (!SUBCLASS_SPELL_LISTS["2014"][name]) SUBCLASS_SPELL_LISTS["2014"][name] = table;
    });
  }
})();

if (typeof module !== "undefined") {
  module.exports = { SOLASTA_CATALOG_ENTRIES, SOLASTA_SUBCLASS_FEATURES, SOLASTA_SUBCLASS_SPELLS };
}
