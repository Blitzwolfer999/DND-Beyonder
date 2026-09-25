// Unearthed Arcana playtest subclasses for the 2024 rules, from the UA packets
// released between January 2025 and September 2026. This is playtest material:
// each one is labelled with the packet it came from so nobody mistakes it for a
// published option, and the wording of every summary is original, as the
// project's content policy requires.

const UA_SUBCLASSES = {
  Barbarian: [
    ["Path of the Ancestral Guardian", "Unearthed Arcana: Subclasses Update"],
    ["Path of the Storm Herald", "Unearthed Arcana: Subclasses Update"],
    ["Path of Lament", "Unearthed Arcana: Villainous Options 2"],
    ["Path of Unlight", "Unearthed Arcana: Underdark Options"]
  ],
  Cleric: [
    ["Grave Domain", "Unearthed Arcana: Horror Subclasses"],
    ["Pestilence Domain", "Unearthed Arcana: Villainous Options"],
    ["Freedom Domain", "Unearthed Arcana: Underdark Options 2"]
  ],
  Druid: [
    ["Circle of Preservation", "Unearthed Arcana: Apocalyptic Subclasses"],
    ["Circle of the Titan", "Unearthed Arcana: Villainous Options Revisited"],
    ["Circle of Spores", "Unearthed Arcana: Underdark Options 2"]
  ],
  Fighter: [
    ["Cavalier", "Unearthed Arcana: Subclasses Update"],
    ["Purple Dragon Knight", "Unearthed Arcana: Forgotten Realms Subclasses"],
    ["Gladiator", "Unearthed Arcana: Apocalyptic Subclasses"],
    ["Hell Knight", "Unearthed Arcana: Villainous Options Revisited"]
  ],
  Monk: [
    ["Tattooed Warrior", "Unearthed Arcana: Arcane Subclasses Update"],
    ["Warrior of Intoxication", "Unearthed Arcana: Subclasses Update"],
    ["Warrior of Venom", "Unearthed Arcana: Villainous Options 2"]
  ],
  Paladin: [
    ["Oathbreaker", "Unearthed Arcana: Subclasses Update"],
    ["Oath of the Spellguard", "Unearthed Arcana: Mystic Subclasses"]
  ],
  Rogue: [
    ["Magic Stealer", "Unearthed Arcana: Mystic Subclasses"],
    ["House Agent", "Unearthed Arcana: Underdark Options"]
  ],
  Sorcerer: [
    ["Ancestral Sorcery", "Unearthed Arcana: Arcane Subclasses"],
    ["Defiled Sorcery", "Unearthed Arcana: Apocalyptic Subclasses"],
    ["Demonic Sorcery", "Unearthed Arcana: Villainous Options Revisited"],
    ["Faerzress Sorcery", "Unearthed Arcana: Underdark Options 2"]
  ],
  Warlock: [
    ["Hexblade Patron", "Unearthed Arcana: Arcane Subclasses"],
    ["Sorcerer-King Patron", "Unearthed Arcana: Apocalyptic Subclasses"],
    ["Primordial Patron", "Unearthed Arcana: Villainous Options 2"]
  ],
  Wizard: [
    ["Imaskarcanist", "Unearthed Arcana: Underdark Options"]
  ]
};

const UA_SUBCLASS_FEATURES = {
  // ---------------- Barbarian ----------------
  "Path of the Ancestral Guardian": [
    [3, "Spiritual Protectors", "While raging, the first creature you hit is hounded by ancestral warriors that hamper its attacks on anyone but you."],
    [6, "Spirit Shield", "While raging, react to reduce the damage an ally within 30 feet takes, the spirits taking the blow for them."],
    [10, "Consult the Spirits", "Cast Augury or Clairvoyance through your guardians without a spell slot."],
    [14, "Vengeful Spirits", "A melee attack roll of 18 or higher calls the spirits to strike alongside you."]
  ],
  "Path of the Storm Herald": [
    [3, "Storm Aura", "Raging raises a 10-foot aura of desert, sea or tundra that lashes out each turn, scaling with your rage damage."],
    [6, "Storm Soul", "Your chosen storm grants a lasting resistance and a matching trick with fire, water or ice."],
    [10, "Shielding Storm", "Allies inside your aura share its damage resistance."],
    [14, "Raging Storm", "The aura punishes those who fail — or in the case of the sea, even those who succeed — against it."]
  ],
  "Path of Lament": [
    [3, "Banshee's Wail", "Rage with a grieving cry that damages and unsettles those who hear it."],
    [6, "Commune With The Dead", "You can cast Speak with Dead as a ritual, using Wisdom."],
    [6, "Horrifying Strike", "Once a turn, a Strength-based hit while raging can leave the target frightened."],
    [10, "Otherworldly Anguish", "Your sorrow reaches past death itself, hardening you against the harm the living suffer."],
    [14, "Sorrow Form", "Rage can clothe you in undeath for a minute, with the resilience that comes with it."]
  ],
  "Path of Unlight": [
    [3, "Radiant Rage", "Unlight answers blows struck against you while raging, burning the attacker with radiant energy."],
    [6, "Unlight Revelation", "Expertise in Perception, and sight that pierces the dark while your rage burns."],
    [10, "Infectious Unlight", "Brutal Strike can deal radiant damage and infect the target with light that marks it for everyone."],
    [10, "Harbinger of Unlight", "You have resistance to radiant damage."],
    [14, "Brilliant Rage", "Raging floods 30 feet with bright light, and the Unlight around you grows fiercer."]
  ],

  // ---------------- Cleric ----------------
  "Grave Domain": [
    [3, "Circle of Mortality", "Healing rolled for a creature at 0 hit points counts as maximum, and once a turn you press harder on a bloodied foe."],
    [3, "Path to the Grave", "Spend Channel Divinity to curse a creature so the next hit against it lands with terrible force."],
    [6, "Sentinel at Death's Door", "React to turn a hit on you or a bloodied creature nearby into a miss, Wisdom modifier times per long rest."],
    [17, "Divine Reaper", "Your Necromancy spells of level 5 or lower reach a second target, and a nearby death restores hit points to someone you choose."]
  ],
  "Pestilence Domain": [
    [3, "Blight Weaver", "Resistance to necrotic and poison damage, and the sickness you spread clings to its victims."],
    [3, "Plague Blessing", "Spend Channel Divinity to raise a contagious aura that infects those caught in it."],
    [6, "Virulent Burst", "React when an enemy drops to 0 hit points to spread the plague to another, Wisdom modifier times per long rest."],
    [17, "Vermin Form", "Become a swarm of tiny pests for 10 minutes, hard to pin down and hard to hurt."]
  ],
  "Freedom Domain": [
    [3, "Invoke Liberty", "Spend Channel Divinity so your allies shrug off what holds them and move freely."],
    [3, "Unencumbered Grace", "Without armour your Armor Class is 10 plus Dexterity and Wisdom."],
    [6, "Unstoppable", "Difficult terrain and effects that would slow or stop you no longer do."],
    [17, "Avatar of Freedom", "A 30-foot aura for 10 minutes that frees your allies' movement and steadies their hands."]
  ],

  // ---------------- Druid ----------------
  "Circle of Preservation": [
    [3, "Preserved Land", "Spend a Wild Shape use to bless a 15-foot cube that shelters and mends those inside it."],
    [3, "Student of Preservation", "Your study of nature's resilience grants lasting practical benefits."],
    [6, "Improved Preservation", "Preserved Land protects those who defend it, and grows harder to disrupt."],
    [10, "Facilitated Restoration", "Cast Lesser Restoration or Greater Restoration without a slot or components."],
    [14, "Sacrosanct Land", "Your Preserved Land fills a 30-foot cube and shields what shelters there."]
  ],
  "Circle of the Titan": [
    [3, "Titan Form", "Wild Shape becomes a colossal behemoth, leviathan or insectoid with its own stat block and a rending attack."],
    [6, "Dire Impact", "Your Titan Form's rend carries elemental force, and moving fast sends out a shock wave."],
    [10, "Primal Havoc", "You can rise to Huge, toughen your hide with a spell slot, and ignore the ground's worst footing."],
    [14, "Monstrous Appetite", "Gargantuan size, a rend that grapples, and the ability to swallow what you have caught."]
  ],
  "Circle of Spores": [
    [3, "Halo of Spores", "Invisible spores fill 10 feet around you and can be turned on a creature that comes too close."],
    [3, "Symbiotic Entity", "Spend a Wild Shape use to wake your spores instead of changing shape, hardening you and sharpening your strikes."],
    [6, "Fungal Infestation", "A Small or Medium beast or humanoid that dies nearby can rise briefly under your spores' control."],
    [10, "Explosive Burst", "An undead of yours that dies bursts in a cloud of spores."],
    [14, "Fungal Body", "Immunity to several conditions, and critical hits against you land as ordinary ones."]
  ],

  // ---------------- Fighter ----------------
  Cavalier: [
    [3, "Bonus Proficiency", "Proficiency in one of Animal Handling, History, Insight, Performance or Persuasion."],
    [3, "Born to the Saddle", "You stay in the saddle where others fall, and land lightly when you do not."],
    [3, "Unwavering Mark", "A creature you hit is marked: attacking anyone else is harder for it, and you can punish it for trying."],
    [7, "Warding Maneuver", "React to add a die to the Armor Class of you, your mount or a creature beside you, or to halve the damage."],
    [10, "Hold the Line", "Creatures that move within your reach provoke, and your opportunity attacks stop them dead."],
    [15, "Ferocious Charger", "In the first round you and your mount move faster and without being slowed."],
    [18, "Vigilant Defender", "You get an extra reaction on every other creature's turn to make an opportunity attack."]
  ],
  "Purple Dragon Knight": [
    [3, "Knightly Envoy", "A language and the bearing of a knight of the order."],
    [3, "Purple Dragon Companion", "An amethyst dragon hatchling fights beside you with its own stat block and a gravity breath."],
    [7, "Dragon Rider", "The dragon grows to Medium and can be ridden, its breath widens, and your Second Wind heals it too."],
    [10, "Rallying Surge", "Action Surge lets three allies advance and attack, or fall back without provoking."],
    [15, "Amethyst Pinnacle", "The dragon grows Large and faster, and can strike in tandem with your Attack action."],
    [18, "Enduring Commander", "You and your dragon resist force and psychic damage."]
  ],
  Gladiator: [
    [3, "Brutality", "Once a turn a hit can be turned into a crowd-pleasing maiming blow."],
    [3, "Combat Theatrics", "Fighting as performance: your showmanship is worth as much as your blade."],
    [7, "Flourish Parry", "React to a melee hit with a flourish that turns the blow aside."],
    [10, "Bolder Brutalities", "New Brutality options, including one that opens a wound as you strike."],
    [15, "Brutal Resurgence", "Second Wind restores a use of Brutality along with your hit points."],
    [18, "Mutilate", "A hit on a bloodied creature can maim or slow it until it heals."]
  ],
  "Hell Knight": [
    [3, "Diabolical Gift", "Devil's sight out to 120 feet and the tongue of the Nine Hells."],
    [3, "Hell-Forged Weapon", "Your weapons take on hellfire when you attack with them."],
    [3, "Infernal Wound", "A hit with a hell-forged weapon can open a lasting wound, measured by your Infernal Wound Die."],
    [7, "Advanced Wounds", "Infernal wounds erupt with caustic pus, arcane force or stygian cold."],
    [7, "Infernal Equipment", "A resistance chosen each rest, and a 1 on the wound die can be read as a 6."],
    [10, "Hellfire Surge", "Action Surge with a hell-forged weapon sets a 20-foot emanation ablaze."],
    [15, "Devil's Misfortune", "React when a wounded creature hits you to roll the wound against it."],
    [18, "Infernal Bargain", "Three sixes on the wound die in a round buy you Heroic Inspiration you can spend on anyone."]
  ],

  // ---------------- Monk ----------------
  "Tattooed Warrior": [
    [3, "Magic Tattoos", "Your tattoos are magical markings that grow in number as you rise."],
    [3, "Beast Tattoo", "Two animal tattoos, each granting a cantrip or a beast's knack."],
    [6, "Celestial Tattoo", "A tattoo of a heavenly body that adds its power to your strikes or your defence."],
    [11, "Nature Tattoo", "A tattoo of a natural force, from sea storms to standing stone."],
    [17, "Monster Tattoo", "A tattoo of a mighty creature, whose power you carry into every fight."]
  ],
  "Warrior of Intoxication": [
    [3, "Bonus Proficiencies", "Proficiency in Performance and with brewer's supplies."],
    [3, "Drunken Technique", "Flurry of Blows sends you weaving: more speed and no opportunity attacks."],
    [6, "Tipsy Sway", "Stand from prone cheaply, and spend a Focus Point to send a missed attack into another creature."],
    [6, "Mystic Brew", "Brew magical drinks on a rest, from toxic dragon's breath to a restorative dip."],
    [11, "Master Brewer", "Stronger brews, including one that hands you Heroic Inspiration."],
    [17, "Intoxicated Frenzy", "Flurry of Blows lands a flurry of extra strikes across several enemies."]
  ],
  "Warrior of Venom": [
    [3, "Envenom Weapon", "Spend a Focus Point to coat a Monk weapon in your own toxin for a minute."],
    [3, "Potent Arsenal", "A poisoner's kit, proficiency with it, and basic poisons brewed in a fraction of the time."],
    [6, "Toxic Touch", "Spend a Focus Point to poison, charm or weaken a creature you touch."],
    [11, "Toxic Refiner", "Immunity to poison damage, and poison thrown at you refills your own supply."],
    [11, "Toxic Blood", "A creature that hits you in melee is splashed by your poisonous blood."],
    [17, "Hallucinogenic Breath", "Spend two Focus Points to exhale a cloud that leaves foes seeing things."]
  ],

  // ---------------- Paladin ----------------
  Oathbreaker: [
    [3, "Conjure Undead", "Spend Channel Divinity to raise undead servants that fight at your command."],
    [3, "Dreadful Aspect", "A Divine Smite can be followed by Channel Divinity that leaves your enemies terrified."],
    [7, "Aura of Hate", "You and the fiends and undead in your aura add your Charisma to melee damage."],
    [15, "Supernatural Resistance", "Resistance to bludgeoning, piercing and slashing damage."],
    [20, "Dread Lord", "Your aura fills with magical darkness, fear grips those inside it, and you strike from the gloom."]
  ],
  "Oath of the Spellguard": [
    [3, "Guardian Bond", "Spend Channel Divinity to bond with an ally, sharing their harm and shielding them from magic."],
    [3, "Spellguard Strike", "Strike a caster within reach as it casts, spoiling the spell."],
    [7, "Aura of Concentration", "You and your allies hold concentration more surely inside your aura."],
    [15, "Spell-Breaking Blade", "A Spellguard Strike can carry a free Counterspell."],
    [20, "Eternal Spellguard", "For a minute your aura turns spell attacks aside and hardens everyone in it against magic."]
  ],

  // ---------------- Rogue ----------------
  "Magic Stealer": [
    [3, "Empower Sneak Attack", "React when a creature casts a spell near you to steal a thread of its power for your next Sneak Attack."],
    [3, "Drain Magic", "Drain an ongoing spell to hand an ally back some of its magic."],
    [9, "Magical Sabotage", "Cunning Strike options that weaken a target's saves, disrupt its casting, or strip a resistance."],
    [13, "Occult Shroud", "Nondetection on yourself after each long rest, cast with Intelligence."],
    [13, "Improved Drain Magic", "Drain Magic becomes a Bonus Action and can end a spell outright."],
    [17, "Eldritch Implosion", "Empowered Sneak Attack can collapse the stolen magic on the target."]
  ],
  "House Agent": [
    [3, "House Insignia", "A token from your sponsor that keeps a short list of charm spells prepared."],
    [3, "Charming Presence", "Influence as a Bonus Action, and proficiency in a social skill."],
    [9, "Backstab", "Advantage on attacks against creatures that think you are friendly."],
    [13, "Infiltration Partner", "Your familiar gains far-seeing darkvision and truesight."],
    [13, "Silver Tongue", "A hostile attitude no longer costs you advantage on Charisma checks."],
    [17, "Subtle Manipulator", "A Cunning Strike option that confounds the target's mind."]
  ],

  // ---------------- Sorcerer ----------------
  "Ancestral Sorcery": [
    [3, "Ancestor's Lore", "Your ancestor's knowledge adds your Charisma modifier to Intelligence checks."],
    [3, "Visage of the Ancestor", "While Innate Sorcery is active your ancestor's image surrounds you."],
    [6, "Superior Spell Disruption", "Counterspell and Dispel Magic always prepared, and more effective while Innate Sorcery burns."],
    [14, "Ancestral Majesty", "Innate Sorcery raises an aura that awes or cows those beside you."],
    [14, "Steady Spellcaster", "Damage cannot break your concentration on Sorcerer spells."],
    [18, "Ancestor's Ward", "Innate Sorcery grants advantage on saves against magic."]
  ],
  "Defiled Sorcery": [
    [3, "Defile and Empower", "Once a turn, spend your own vitality to swell a spell's damage."],
    [6, "Corrupted Caster", "The corruption inside you shields you and feeds your magic."],
    [14, "Withering Aura", "Innate Sorcery surrounds you with 15 feet of defiling magic."],
    [18, "Superior Defiler", "Immunity to poison and mastery of the life you drain."]
  ],
  "Demonic Sorcery": [
    [3, "Abyssal Rupture", "Innate Sorcery tears open a 10-foot rupture into the Abyss that claws and screams at those inside."],
    [6, "Abyssal Realm", "Spending a Sorcery Point calls an Abyssal layer's influence: a driving maw, a maze, or choking slime."],
    [14, "Abyssal Conduit", "The rupture widens to 30 feet and becomes difficult ground, and Summon Fiend needs no concentration."],
    [18, "Abyssal Explosion", "Fill 30 feet with an explosion of Abyssal energy."]
  ],
  "Faerzress Sorcery": [
    [3, "Faerzress Zone", "Spend 3 Sorcery Points to flood an area with the Underdark's strange radiation."],
    [3, "Immunity to Faerzress", "Faerzress never hinders you, and yours never hinders your allies."],
    [6, "Faerzress Affinity", "Resistance to lightning damage and darkvision, or a longer range if you have it."],
    [14, "Faerzress Spell", "Spend a Sorcery Point to lace a failed save with faerzress, blocking teleportation and divination."],
    [14, "Faerzress Step", "Teleport always prepared, with a free casting each long rest."],
    [18, "Faerzress Form", "Innate Sorcery can turn you into raw faerzress: flying, all but immune to harm, for a minute."]
  ],

  // ---------------- Warlock ----------------
  "Hexblade Patron": [
    [3, "Hexblade's Curse", "As a Bonus Action, curse a creature within 30 feet so your strikes bite deeper and its death restores you."],
    [3, "Unyielding Will", "Holding concentration steadies your allies beside you."],
    [6, "Malign Brutality", "Your patron's hunger rewards the spells you cast and the blows you land."],
    [10, "Armor of Hexes", "React to blunt damage from the creature you have cursed."],
    [14, "Masterful Hex", "Attacks against your cursed target crit more readily, and the curse's power grows."]
  ],
  "Sorcerer-King Patron": [
    [3, "Tyrants Herald", "Proficiency in Intimidation and the bearing of a tyrant's herald."],
    [6, "Decisive Edict", "Casting a spell with a slot lets you rally an ally or cow an enemy."],
    [10, "Vindictive Rebuke", "React when an enemy hits you to answer on your patron's behalf."],
    [14, "Absolute Tyranny", "Command reaches another creature, and your edicts are harder to refuse."]
  ],
  "Primordial Patron": [
    [3, "Elemental Node", "A Magic action raises a 5-foot sphere of elemental magic within 60 feet of you."],
    [6, "Elemental Haven", "Standing in your node shields you with your element."],
    [10, "Primeval Protection", "Resistance to your element's damage and firmer footing in its presence."],
    [14, "Elemental Harbinger", "Your node can call up a vortex and the mightiest elementals."]
  ],

  // ---------------- Wizard ----------------
  Imaskarcanist: [
    [3, "Unlight Adept", "Weave Unlight into a damaging spell to change what it burns with."],
    [3, "Unlight Invigoration", "A Bonus Action lends a creature Unlight drawn from your own reserves."],
    [6, "Unlight Restoration", "A Bonus Action turns Unlight to healing and to lifting what afflicts a creature."],
    [10, "Secrets of Deep Imaskar", "Attune in an instant, ignore resistance to radiant damage, resist it yourself, and keep Glyph of Warding ready."],
    [14, "Doom of Unlight", "Curse an enemy so it blazes, burns each turn, and bursts if it falls."]
  ]
};

const UA_SUBCLASS_SPELLS = {
  "Grave Domain": {
    3: ["Bane", "Chill Touch", "Detect Evil and Good", "Gentle Repose", "Ray of Enfeeblement"],
    5: ["Revivify", "Vampiric Touch"],
    7: ["Blight", "Dispel Evil and Good"],
    9: ["Hold Monster", "Raise Dead"]
  },
  "Pestilence Domain": {
    3: ["Detect Poison and Disease", "Protection from Poison", "Ray of Enfeeblement", "Ray of Sickness"],
    5: ["Stinking Cloud", "Vampiric Touch"],
    7: ["Blight", "Giant Insect"],
    9: ["Contagion", "Insect Plague"]
  },
  "Freedom Domain": {
    3: ["Expeditious Retreat", "Jump", "Knock", "Misty Step"],
    5: ["Fly", "Gaseous Form"],
    7: ["Dimension Door", "Freedom of Movement"],
    9: ["Passwall", "Tree Stride"]
  },
  "Circle of Preservation": {
    3: ["Bless", "Lesser Restoration", "Protection from Poison", "Sanctuary"],
    5: ["Beacon of Hope", "Plant Growth"],
    7: ["Aura of Life", "Death Ward"],
    9: ["Greater Restoration", "Hallow"]
  },
  "Circle of the Titan": {
    3: ["Enlarge/Reduce", "Thaumaturgy", "Thunderwave"], 5: ["Fear"], 7: ["Fire Shield"], 9: ["Destructive Wave"]
  },
  "Circle of Spores": {
    3: ["Blindness/Deafness", "Charm Person", "Chill Touch"], 5: ["Animate Dead"], 7: ["Confusion"], 9: ["Contagion"]
  },
  Oathbreaker: {
    3: ["Hellish Rebuke", "Witch Bolt"], 5: ["Crown of Madness", "Darkness"], 9: ["Fear", "Summon Undead"],
    13: ["Blight", "Phantasmal Killer"], 17: ["Contagion", "Steel Wind Strike"]
  },
  "Oath of the Spellguard": {
    3: ["Detect Magic", "Shield"], 5: ["See Invisibility", "Silence"], 9: ["Counterspell", "Dispel Magic"],
    13: ["Freedom of Movement", "Otiluke's Resilient Sphere"], 17: ["Circle of Power", "Hallow"]
  },
  "House Agent": { 3: ["Charm Person"], 5: ["Suggestion"], 9: ["Hypnotic Pattern"] },
  "Ancestral Sorcery": {
    3: ["Command", "Guidance", "Locate Object", "Protection from Evil and Good", "Resistance", "Spiritual Weapon"],
    5: ["Magic Circle", "Spirit Guardians"], 7: ["Divination", "Locate Creature"],
    9: ["Legend Lore", "Yolande's Regal Presence"]
  },
  "Defiled Sorcery": {
    3: ["Blindness/Deafness", "Inflict Wounds", "Ray of Enfeeblement", "Ray of Sickness"],
    5: ["Bestow Curse", "Vampiric Touch"], 7: ["Blight", "Hallucinatory Terrain"], 9: ["Antilife Shell", "Contagion"]
  },
  "Demonic Sorcery": {
    3: ["Bane", "Dissonant Whispers", "Spike Growth", "Web"], 5: ["Bestow Curse", "Dispel Magic"],
    7: ["Giant Insect", "Hallucinatory Terrain"], 9: ["Contact Other Plane", "Modify Memory"]
  },
  "Faerzress Sorcery": {
    3: ["Faerie Fire", "Magic Weapon", "Misty Step", "Witch Bolt"], 5: ["Nondetection", "Sending"],
    7: ["Arcane Eye", "Stone Shape"], 9: ["Passwall", "Scrying"]
  },
  "Hexblade Patron": {
    3: ["Arcane Vigor", "Hex", "Shield", "Wrathful Smite"], 5: ["Bestow Curse", "Conjure Barrage"],
    7: ["Freedom of Movement", "Staggering Smite"], 9: ["Animate Objects", "Steel Wind Strike"]
  },
  "Sorcerer-King Patron": {
    3: ["Command", "Compelled Duel", "Hold Person", "Mind Spike", "Wrathful Smite"], 5: ["Fear", "Sending"],
    7: ["Compulsion", "Staggering Smite"], 9: ["Dominate Person", "Synaptic Static"]
  }
};

// A Primordial Patron's prepared spells are the shared list plus the element it
// serves, so the element chosen at level 3 decides the table.
const UA_PRIMORDIAL_SPELLS = {
  Air: { 3: ["Chromatic Orb", "Darkvision", "Feather Fall", "Shatter"], 5: ["Elemental Weapon", "Fly"],
    7: ["Summon Elemental", "Freedom of Movement"], 9: ["Commune with Nature", "Steel Wind Strike"] },
  Earth: { 3: ["Chromatic Orb", "Darkvision", "Entangle", "Knock"], 5: ["Elemental Weapon", "Plant Growth"],
    7: ["Summon Elemental", "Vitriolic Sphere"], 9: ["Commune with Nature", "Wall of Stone"] },
  Fire: { 3: ["Chromatic Orb", "Darkvision", "Burning Hands", "Heat Metal"], 5: ["Elemental Weapon", "Fireball"],
    7: ["Summon Elemental", "Wall of Fire"], 9: ["Commune with Nature", "Flame Strike"] },
  Water: { 3: ["Chromatic Orb", "Darkvision", "Alter Self", "Ice Knife"], 5: ["Elemental Weapon", "Water Walk"],
    7: ["Summon Elemental", "Control Water"], 9: ["Commune with Nature", "Cone of Cold"] }
};

const UA_SUBCLASS_CHOICES = {
  "Path of the Storm Herald": [
    { key: "stormAura", label: "Storm Aura", level: 3, editions: ["2024"], options: ["Desert", "Sea", "Tundra"] }
  ],
  "Circle of the Titan": [
    { key: "titanForm", label: "Titan Form", level: 3, editions: ["2024"], options: ["Behemoth", "Leviathan", "Insectoid"] }
  ],
  "Primordial Patron": [
    { key: "primordialElement", label: "Element of your patron", level: 3, editions: ["2024"], options: ["Air", "Earth", "Fire", "Water"] }
  ],
  "Hell Knight": [
    { key: "infernalWound", label: "Advanced wound effect", level: 7, editions: ["2024"], options: ["Purulence of Minauros", "Rupture of Cania", "Stygian Gangrene"] }
  ]
};

(function registerUnearthedArcana() {
  if (typeof SUBCLASS_CATALOG !== "undefined" && typeof subclassRecord === "function") {
    Object.entries(UA_SUBCLASSES).forEach(([className, entries]) => {
      SUBCLASS_CATALOG[className] = SUBCLASS_CATALOG[className] || [];
      entries.forEach(([name, source]) => {
        const exists = SUBCLASS_CATALOG[className].some(item => item.name === name && item.rules === "2024");
        if (!exists) SUBCLASS_CATALOG[className].push(subclassRecord(name, source, "2024"));
      });
    });
  }
  if (typeof addSubclassFeatures === "function") addSubclassFeatures({ "2024": UA_SUBCLASS_FEATURES });
  if (typeof SUBCLASS_SPELL_LISTS !== "undefined") {
    SUBCLASS_SPELL_LISTS["2024"] = SUBCLASS_SPELL_LISTS["2024"] || {};
    Object.entries(UA_SUBCLASS_SPELLS).forEach(([subclass, table]) => {
      if (!SUBCLASS_SPELL_LISTS["2024"][subclass]) SUBCLASS_SPELL_LISTS["2024"][subclass] = table;
    });
  }
  if (typeof SUBCLASS_CHOICE_SPELLS !== "undefined") {
    SUBCLASS_CHOICE_SPELLS["2024"] = SUBCLASS_CHOICE_SPELLS["2024"] || {};
    SUBCLASS_CHOICE_SPELLS["2024"]["Primordial Patron"] = { key: "primordialElement", lists: UA_PRIMORDIAL_SPELLS };
  }
  // SUBCLASS_CHOICE_RULES lives in app.js, which loads after this file, so the
  // rules are queued for app.js to pick up rather than written directly.
  const queueChoiceRules = (subclass, rules) => {
    if (typeof SUBCLASS_CHOICE_RULES !== "undefined") {
      if (!SUBCLASS_CHOICE_RULES[subclass]) SUBCLASS_CHOICE_RULES[subclass] = rules;
      return;
    }
    window.PENDING_SUBCLASS_CHOICE_RULES = window.PENDING_SUBCLASS_CHOICE_RULES || [];
    window.PENDING_SUBCLASS_CHOICE_RULES.push([subclass, rules]);
  };
  Object.entries(UA_SUBCLASS_CHOICES).forEach(([subclass, rules]) => queueChoiceRules(subclass, rules));
})();

if (typeof module !== "undefined") {
  module.exports = { UA_SUBCLASSES, UA_SUBCLASS_FEATURES, UA_SUBCLASS_SPELLS, UA_PRIMORDIAL_SPELLS };
}
