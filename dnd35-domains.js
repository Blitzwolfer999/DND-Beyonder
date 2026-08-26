/* D&D 3.5 cleric domains.
 *
 * Granted powers and domain spell lists are Open Game Content from the v3.5
 * System Reference Document under the Open Game License v1.0a. See OGL-3.5.txt.
 *
 * A 3.5 cleric picks two domains, each granting a power and one bonus spell
 * per spell level. Position in the list is the spell level, 1 through 9.
 */

const D35_DOMAINS = {
  "Air": {
    power: "Turn or destroy earth creatures as a good cleric turns undead. Rebuke, command, or bolster air creatures as an evil cleric rebukes undead. Use these abilities a total number of times per day equal to 3 + your Charisma modifier. This granted power is a supernatural ability.",
    spells: [
      { level: 1, name: "Obscuring Mist", desc: "Fog surrounds you." },
      { level: 2, name: "Wind Wall", desc: "Deflects arrows, smaller creatures, and gases." },
      { level: 3, name: "Gaseous Form", desc: "Subject becomes insubstantial and can fly slowly." },
      { level: 4, name: "Air Walk", desc: "Subject treads on air as if solid (climb at 45-degree angle)." },
      { level: 5, name: "Control Winds", desc: "Change wind direction and speed." },
      { level: 6, name: "Chain Lightning", desc: "1d6/level damage; 1 secondary bolt/level each deals half damage." },
      { level: 7, name: "Control Weather", desc: "Changes weather in local area." },
      { level: 8, name: "Whirlwind", desc: "Cyclone deals damage and can pick up creatures." },
      { level: 9, name: "Elemental Swarm", desc: "Summons multiple elementals." }
    ]
  },
  "Animal": {
    power: "You can use speak with animals once per day as a spell-like ability. Add Knowledge (nature) to your list of cleric class skills.",
    spells: [
      { level: 1, name: "Calm Animals", desc: "Calms (2d4 + level) HD of animals." },
      { level: 2, name: "Hold Animal", desc: "Paralyzes one animal for 1 round/level." },
      { level: 3, name: "Dominate Animal", desc: "Subject animal obeys silent mental commands." },
      { level: 4, name: "Summon Nature's Ally IV", desc: "Calls creature to fight." },
      { level: 5, name: "Commune with Nature", desc: "Learn about terrain for 1 mile/level." },
      { level: 6, name: "Antilife Shell", desc: "10-ft. field hedges out living creatures." },
      { level: 7, name: "Animal Shapes", desc: "One ally/level polymorphs into chosen animal." },
      { level: 8, name: "Summon Nature's Ally VIII", desc: "Calls creature to fight." },
      { level: 9, name: "Shapechange", desc: "Transforms you into any creature, and change forms once per round." }
    ]
  },
  "Chaos": {
    power: "You cast chaos spells at +1 caster level.",
    spells: [
      { level: 1, name: "Protection from Law", desc: "+2 to AC and saves, counter mind control, hedge out elementals and outsiders." },
      { level: 2, name: "Shatter", desc: "Sonic vibration damages objects or crystalline creatures." },
      { level: 3, name: "Magic Circle against Law", desc: "As protection spells, but 10-ft. radius and 10 min./level." },
      { level: 4, name: "Chaos Hammer", desc: "Damages and staggers lawful creatures." },
      { level: 5, name: "Dispel Law", desc: "+4 bonus against attacks by lawful creatures." },
      { level: 6, name: "Animate Objects", desc: "Objects attack your foes." },
      { level: 7, name: "Word of Chaos", desc: "Kills, confuses, stuns, or deafens nonchaotic subjects." },
      { level: 8, name: "Cloak of Chaos", desc: "+4 to AC, +4 resistance, SR 25 against lawful spells." },
      { level: 9, name: "Summon Monster IX", desc: "Calls extraplanar creature to fight for you." }
    ]
  },
  "Death": {
    power: "You may use a death touch once per day. Your death touch is a supernatural ability that produces a death effect. You must succeed on a melee touch attack against a living creature (using the rules for touch spells). When you touch, roll 1d6 per cleric level you possess. If the total at least equals the creature's current hit points, it dies (no save).",
    spells: [
      { level: 1, name: "Cause Fear", desc: "One creature of 5 HD or less flees for 1d4 rounds." },
      { level: 2, name: "Death Knell", desc: "Kill dying creature and gain 1d8 temporary hp, +2 to Str, and +1 caster level." },
      { level: 3, name: "Animate Dead", desc: "Creates undead skeletons and zombies." },
      { level: 4, name: "Death Ward", desc: "Grants immunity to death spells and negative energy effects." },
      { level: 5, name: "Slay Living", desc: "Touch attack kills subject." },
      { level: 6, name: "Create Undead", desc: "Create ghouls, ghasts, mummies, or mohrgs." },
      { level: 7, name: "Destruction", desc: "Kills subject and destroys remains." },
      { level: 8, name: "Create Greater Undead", desc: "Create shadows, wraiths, spectres, or devourers." },
      { level: 9, name: "Wail of the Banshee", desc: "Kills one creature/level." }
    ]
  },
  "Destruction": {
    power: "You gain the smite power, the supernatural ability to make a single melee attack with a +4 bonus on attack rolls and a bonus on damage rolls equal to your cleric level (if you hit). You must declare the smite before making the attack. This ability is usable once per day.",
    spells: [
      { level: 1, name: "Inflict Light Wounds", desc: "Touch attack, 1d8 damage +1/level (max +5)." },
      { level: 2, name: "Shatter", desc: "Sonic vibration damages objects or crystalline creatures." },
      { level: 3, name: "Contagion", desc: "Infects subject with chosen disease." },
      { level: 4, name: "Inflict Critical Wounds", desc: "Touch attack, 4d8 damage +1/level (max +20)." },
      { level: 5, name: "Inflict Light Wounds, Mass", desc: "Deals 1d8 damage +1/level to any creatures." },
      { level: 6, name: "Harm", desc: "Deals 10 points/level damage to target." },
      { level: 7, name: "Disintegrate", desc: "Makes one creature or object vanish." },
      { level: 8, name: "Earthquake", desc: "Intense tremor shakes 80-ft.-radius." },
      { level: 9, name: "Implosion", desc: "Kills one creature/round." }
    ]
  },
  "Earth": {
    power: "Turn or destroy air creatures as a good cleric turns undead. Rebuke, command, or bolster earth creatures as an evil cleric rebukes undead. Use these abilities a total number of times per day equal to 3 + your Charisma modifier. This granted power is a supernatural ability.",
    spells: [
      { level: 1, name: "Magic Stone", desc: "Three stones become +1 projectiles, 1d6 +1 damage." },
      { level: 2, name: "Soften Earth and Stone", desc: "Turns stone to clay or dirt to sand or mud." },
      { level: 3, name: "Stone Shape", desc: "Sculpts stone into any shape." },
      { level: 4, name: "Spike Stones", desc: "Creatures in area take 1d8 damage, may be lowed." },
      { level: 5, name: "Wall of Stone", desc: "Creates a stone wall that can be shaped." },
      { level: 6, name: "Stoneskin", desc: "Ignore 10 points of damage per attack." },
      { level: 7, name: "Earthquake", desc: "Intense tremor shakes 80-ft.-radius." },
      { level: 8, name: "Iron Body", desc: "Your body becomes living iron." },
      { level: 9, name: "Elemental Swarm", desc: "Summons multiple elementals." }
    ]
  },
  "Evil": {
    power: "You cast evil spells at +1 caster level.",
    spells: [
      { level: 1, name: "Protection from Good", desc: "+2 to AC and saves, counter mind control, hedge out elementals and outsiders." },
      { level: 2, name: "Desecrate", desc: "Fills area with negative energy, making undead stronger." },
      { level: 3, name: "Magic Circle against Good", desc: "As protection spells, but 10-ft. radius and 10 min./level." },
      { level: 4, name: "Unholy Blight", desc: "Damages and sickens good creatures." },
      { level: 5, name: "Dispel Good", desc: "+4 bonus against attacks by good creatures." },
      { level: 6, name: "Create Undead", desc: "Create ghouls, ghasts, mummies, or mohrgs." },
      { level: 7, name: "Blasphemy", desc: "Kills, paralyzes, weakens, or dazes nonevil subjects." },
      { level: 8, name: "Unholy Aura", desc: "+4 to AC, +4 resistance, SR 25 against good spells." },
      { level: 9, name: "Summon Monster IX", desc: "Calls extraplanar creature to fight for you." }
    ]
  },
  "Fire": {
    power: "Turn or destroy water creatures as a good cleric turns undead. Rebuke, command, or bolster fire creatures as an evil cleric rebukes undead. Use these abilities a total number of times per day equal to 3 + your Charisma modifier. This granted power is a supernatural ability.",
    spells: [
      { level: 1, name: "Burning Hands", desc: "1d4/level fire damage (max 5d4)." },
      { level: 2, name: "Produce Flame", desc: "1d6 damage +1/ level, touch or thrown." },
      { level: 3, name: "Resist Energy", desc: "Ignores 10 (or more) points of damage/attack from specified energy type." },
      { level: 4, name: "Wall of Fire", desc: "Deals 2d4 fire damage out to 10 ft. and 1d4 out to 20 ft. Passing through wall deals 2d6 damage +1/level." },
      { level: 5, name: "Fire Shield", desc: "Creatures attacking you take fire damage; you're protected from heat or cold." },
      { level: 6, name: "Fire Seeds", desc: "Acorns and berries become grenades and bombs." },
      { level: 7, name: "Fire Storm", desc: "Deals 1d6/level fire damage." },
      { level: 8, name: "Incendiary Cloud", desc: "Cloud deals 4d6 fire damage/round." },
      { level: 9, name: "Elemental Swarm", desc: "Summons multiple elementals." }
    ]
  },
  "Good": {
    power: "You cast good spells at +1 caster level.",
    spells: [
      { level: 1, name: "Protection from Evil", desc: "+2 to AC and saves, counter mind control, hedge out elementals and outsiders." },
      { level: 2, name: "Aid", desc: "+1 on attack rolls, +1 on saves against fear, 1d8 temporary hp +1/level (max +10)." },
      { level: 3, name: "Magic Circle against Evil", desc: "As protection spells, but 10-ft. radius and 10 min./level." },
      { level: 4, name: "Holy Smite", desc: "Damages and blinds evil creatures." },
      { level: 5, name: "Dispel Evil", desc: "+4 bonus against attacks by evil creatures." },
      { level: 6, name: "Blade Barrier", desc: "Wall of blades deals 1d6/level damage." },
      { level: 7, name: "Holy Word", desc: "Kills, paralyzes, slows, or deafens nongood subjects." },
      { level: 8, name: "Holy Aura", desc: "+4 to AC, +4 resistance, and SR 25 against evil spells." },
      { level: 9, name: "Summon Monster IX", desc: "Calls extraplanar creature to fight for you." }
    ]
  },
  "Healing": {
    power: "You cast healing spells at +1 caster level.",
    spells: [
      { level: 1, name: "Cure Light Wounds", desc: "Cures 1d8 damage +1/level (max +5)." },
      { level: 2, name: "Cure Moderate Wounds", desc: "Cures 2d8 damage +1/level (max +10)." },
      { level: 3, name: "Cure Serious Wounds", desc: "Cures 3d8 damage +1/level (max +15)." },
      { level: 4, name: "Cure Critical Wounds", desc: "Cures 4d8 damage +1/level (max +20)." },
      { level: 5, name: "Cure Light Wounds, Mass", desc: "Cures 1d8 damage +1/level (max +25) for many creatures." },
      { level: 6, name: "Heal", desc: "Cures 10 points/level of damage, all diseases and mental conditions." },
      { level: 7, name: "Regenerate", desc: "Subject's severed limbs grow back, cures 4d8 damage +1/level (max +35)." },
      { level: 8, name: "Cure Critical Wounds, Mass", desc: "Cures 4d8 damage +1/level (max +40) for many creatures." },
      { level: 9, name: "Heal, Mass", desc: "As heal, but with several subjects." }
    ]
  },
  "Knowledge": {
    power: "Add all Knowledge skills to your list of cleric class skills. You cast divination spells at +1 caster level.",
    spells: [
      { level: 1, name: "Detect Secret Doors", desc: "Reveals hidden doors within 60 ft." },
      { level: 2, name: "Detect Thoughts", desc: "Allows “listening” to surface thoughts." },
      { level: 3, name: "Clairaudience/Clairvoyance", desc: "Hear or see at a distance for 1 min./level." },
      { level: 4, name: "Divination", desc: "Provides useful advice for specific proposed actions." },
      { level: 5, name: "True Seeing", desc: "Lets you see all things as they really are." },
      { level: 6, name: "Find the Path", desc: "Shows most direct way to a location." },
      { level: 7, name: "Legend Lore", desc: "Lets you learn tales about a person, place, or thing." },
      { level: 8, name: "Discern Location", desc: "Reveals exact location of creature or object." },
      { level: 9, name: "Foresight", desc: "“Sixth sense” warns of impending danger." }
    ]
  },
  "Law": {
    power: "You cast law spells at +1 caster level.",
    spells: [
      { level: 1, name: "Protection from Chaos", desc: "+2 to AC and saves, counter mind control, hedge out elementals and outsiders." },
      { level: 2, name: "Calm Emotions", desc: "Calms creatures, negating emotion effects." },
      { level: 3, name: "Magic Circle against Chaos", desc: "As protection spells, but 10-ft. radius and 10 min./level." },
      { level: 4, name: "Order's Wrath", desc: "Damages and dazes chaotic creatures." },
      { level: 5, name: "Dispel Chaos", desc: "+4 bonus against attacks by chaotic creatures." },
      { level: 6, name: "Hold Monster", desc: "As hold person, but any creature." },
      { level: 7, name: "Dictum", desc: "Kills, paralyzes, slows, or deafens nonlawful subjects." },
      { level: 8, name: "Shield of Law", desc: "+4 to AC, +4 resistance, and SR 25 against chaotic spells." },
      { level: 9, name: "Summon Monster IX", desc: "Calls extraplanar creature to fight for you." }
    ]
  },
  "Luck": {
    power: "You gain the power of good fortune, which is usable once per day. This extraordinary ability allows you to reroll one roll that you have just made before the game master declares whether the roll results in success or failure. You must take the result of the reroll, even if it's worse than the original roll.",
    spells: [
      { level: 1, name: "Entropic Shield", desc: "Ranged attacks against you have 20% miss chance." },
      { level: 2, name: "Aid", desc: "+1 on attack rolls, +1 against fear, 1d8 temporary hp +1/level (max +10)." },
      { level: 3, name: "Protection from Energy", desc: "Absorb 12 points/level of damage from one kind of energy." },
      { level: 4, name: "Freedom of Movement", desc: "Subject moves normally despite impediments." },
      { level: 5, name: "Break Enchantment", desc: "Frees subjects from enchantments, alterations, curses, and petrification." },
      { level: 6, name: "Mislead", desc: "Turns you invisible and creates illusory double." },
      { level: 7, name: "Spell Turning", desc: "Reflect 1d4+6 spell levels back at caster." },
      { level: 8, name: "Moment of Prescience", desc: "You gain insight bonus on single attack roll, check, or save." },
      { level: 9, name: "Miracle", desc: "Requests a deity's intercession." }
    ]
  },
  "Magic": {
    power: "Use scrolls, wands, and other devices with spell completion or spell trigger activation as a wizard of one-half your cleric level (at least 1st level). For the purpose of using a scroll or other magic device, if you are also a wizard, actual wizard levels and these effective wizard levels stack.",
    spells: [
      { level: 1, name: "Magic Aura", desc: "Alters object's magic aura." },
      { level: 2, name: "Identify", desc: "Determines properties of magic item." },
      { level: 3, name: "Dispel Magic", desc: "Cancels magical spells and effects." },
      { level: 4, name: "Imbue with Spell Ability", desc: "Transfer spells to subject." },
      { level: 5, name: "Spell Resistance", desc: "Subject gains SR 12 + level." },
      { level: 6, name: "Antimagic Field", desc: "Negates magic within 10 ft." },
      { level: 7, name: "Spell Turning", desc: "Reflect 1d4+6 spell levels back at caster." },
      { level: 8, name: "Protection from Spells", desc: "Confers +8 resistance bonus." },
      { level: 9, name: "Mage's Disjunction", desc: "Dispels magic, disenchants magic items." }
    ]
  },
  "Plant": {
    power: "Rebuke or command plant creatures as an evil cleric rebukes or commands undead. Use this ability a total number of times per day equal to 3 + your Charisma modifier. This granted power is a supernatural ability. Add Knowledge (nature) to your list of cleric class skills.",
    spells: [
      { level: 1, name: "Entangle", desc: "Plants entangle everyone in 40-ft.-radius." },
      { level: 2, name: "Barkskin", desc: "Grants +2 (or higher) enhancement to natural armor." },
      { level: 3, name: "Plant Growth", desc: "Grows vegetation, improves crops." },
      { level: 4, name: "Command Plants", desc: "Sway the actions of one or more plant creatures." },
      { level: 5, name: "Wall of Thorns", desc: "Thorns damage anyone who tries to pass." },
      { level: 6, name: "Repel Wood", desc: "Pushes away wooden objects." },
      { level: 7, name: "Animate Plants", desc: "One or more trees animate and fight for you." },
      { level: 8, name: "Control Plants", desc: "Control actions of one or more plant creatures." },
      { level: 9, name: "Shambler", desc: "Summons 1d4+2 shambling mounds to fight for you." }
    ]
  },
  "Protection": {
    power: "You can generate a protective ward as a supernatural ability. Grant someone you touch a resistance bonus equal to your cleric level on his or her next saving throw. Activating this power is a standard action. The protective ward is an abjuration effect with a duration of 1 hour that is usable once per day.",
    spells: [
      { level: 1, name: "Sanctuary", desc: "Opponents can't attack you, and you can't attack." },
      { level: 2, name: "Shield Other", desc: "You take half of subject's damage." },
      { level: 3, name: "Protection from Energy", desc: "Absorb 12 points/level of damage from one kind of energy." },
      { level: 4, name: "Spell Immunity", desc: "Subject is immune to one spell per four levels." },
      { level: 5, name: "Spell Resistance", desc: "Subject gains SR 12 + level." },
      { level: 6, name: "Antimagic Field", desc: "Negates magic within 10 ft." },
      { level: 7, name: "Repulsion", desc: "Creatures can't approach you." },
      { level: 8, name: "Mind Blank", desc: "Subject is immune to mental/emotional magic and scrying." },
      { level: 9, name: "Prismatic Sphere", desc: "As prismatic wall, but surrounds on all sides." }
    ]
  },
  "Strength": {
    power: "You can perform a feat of strength as a supernatural ability. You gain an enhancement bonus to Strength equal to your cleric level. Activating the power is a free action, the power lasts 1 round, and it is usable once per day.",
    spells: [
      { level: 1, name: "Enlarge Person", desc: "Humanoid creature doubles in size." },
      { level: 2, name: "Bull's Strength", desc: "Subject gains +4 to Str for 1 min./level." },
      { level: 3, name: "Magic Vestment", desc: "Armor or shield gains +1 enhancement per four levels." },
      { level: 4, name: "Spell Immunity", desc: "Subject is immune to one spell per four levels." },
      { level: 5, name: "Righteous Might", desc: "Your size increases, and you gain combat bonuses." },
      { level: 6, name: "Stoneskin", desc: "Ignore 10 points of damage per attack." },
      { level: 7, name: "Grasping Hand", desc: "Large hand provides cover, pushes, or grapples." },
      { level: 8, name: "Clenched Fist", desc: "Large hand provides cover, pushes, or attacks your foes." },
      { level: 9, name: "Crushing Hand", desc: "Large hand provides cover, pushes, or crushes your foes." }
    ]
  },
  "Sun": {
    power: "Once per day, you can perform a greater turning against undead in place of a regular turning. The greater turning is like a normal turning except that the undead creatures that would be turned are destroyed instead.",
    spells: [
      { level: 1, name: "Endure Elements", desc: "Exist comfortably in hot or cold environments." },
      { level: 2, name: "Heat Metal", desc: "Make metal so hot it damages those who touch it." },
      { level: 3, name: "Searing Light", desc: "Ray deals 1d8/two levels, more against undead." },
      { level: 4, name: "Fire Shield", desc: "Creatures attacking you take fire damage; you're protected from heat or cold." },
      { level: 5, name: "Flame Strike", desc: "Smite foes with divine fire (1d6/level damage)." },
      { level: 6, name: "Fire Seeds", desc: "Acorns and berries become grenades and bombs." },
      { level: 7, name: "Sunbeam", desc: "Beam blinds and deals 4d6 damage." },
      { level: 8, name: "Sunburst", desc: "Blinds all within 10 ft., deals 6d6 damage." },
      { level: 9, name: "Prismatic Sphere", desc: "As prismatic wall, but surrounds on all sides." }
    ]
  },
  "Travel": {
    power: "For a total time per day of 1 round per cleric level you possess, you can act normally regardless of magical effects that impede movement as if you were affected by the spell freedom of movement. This effect occurs automatically as soon as it applies, lasts until it runs out or is no longer needed, and can operate multiple times per day (up to the total daily limit of rounds). This granted power is a supernatural ability. Add Survival to your list of cleric class skills.",
    spells: [
      { level: 1, name: "Longstrider", desc: "Increases your speed." },
      { level: 2, name: "Locate Object", desc: "Senses direction toward object (specific or type)." },
      { level: 3, name: "Fly", desc: "Subject flies at speed of 60 ft." },
      { level: 4, name: "Dimension Door", desc: "Teleports you short distance." },
      { level: 5, name: "Teleport", desc: "Instantly transports you as far as 100 miles/level." },
      { level: 6, name: "Find the Path", desc: "Shows most direct way to a location." },
      { level: 7, name: "Teleport, Greater", desc: "As teleport, but no range limit and no off-target arrival." },
      { level: 8, name: "Phase Door", desc: "Creates an invisible passage through wood or stone." },
      { level: 9, name: "Astral Projection", desc: "Projects you and companions onto Astral Plane." }
    ]
  },
  "Trickery": {
    power: "Add Bluff, Disguise, and Hide to your list of cleric class skills.",
    spells: [
      { level: 1, name: "Disguise Self", desc: "Disguise own appearance." },
      { level: 2, name: "Invisibility", desc: "Subject invisible 1 min./level or until it attacks." },
      { level: 3, name: "Nondetection", desc: "Hides subject from divination, scrying." },
      { level: 4, name: "Confusion", desc: "Subjects behave oddly for 1 round/level." },
      { level: 5, name: "False Vision", desc: "Fools scrying with an illusion." },
      { level: 6, name: "Mislead", desc: "Turns you invisible and creates illusory double." },
      { level: 7, name: "Screen", desc: "Illusion hides area from vision, scrying." },
      { level: 8, name: "Polymorph Any Object", desc: "Changes any subject into anything else." },
      { level: 9, name: "Time Stop", desc: "You act freely for 1d4+1 rounds." }
    ]
  },
  "War": {
    power: "Free Martial Weapon Proficiency with deity's favored weapon (if necessary) and Weapon Focus with the deity's favored weapon.",
    spells: [
      { level: 1, name: "Magic Weapon", desc: "Weapon gains +1 bonus." },
      { level: 2, name: "Spiritual Weapon", desc: "Magical weapon attacks on its own." },
      { level: 3, name: "Magic Vestment", desc: "Armor or shield gains +1 enhancement per four levels." },
      { level: 4, name: "Divine Power", desc: "You gain attack bonus, +6 to Str, and 1 hp/level." },
      { level: 5, name: "Flame Strike", desc: "Smite foes with divine fire (1d6/level damage)." },
      { level: 6, name: "Blade Barrier", desc: "Wall of blades deals 1d6/level damage." },
      { level: 7, name: "Power Word Blind", desc: "Blinds creature with 200 hp or less." },
      { level: 8, name: "Power Word Stun", desc: "Stuns creature with 150 hp or less." },
      { level: 9, name: "Power Word Kill", desc: "Kills creature with 100 hp or less." }
    ]
  },
  "Water": {
    power: "Turn or destroy fire creatures as a good cleric turns undead. Rebuke, command, or bolster water creatures as an evil cleric rebukes undead. Use these abilities a total number of times per day equal to 3 + your Charisma modifier. This granted power is a supernatural ability.",
    spells: [
      { level: 1, name: "Obscuring Mist", desc: "Fog surrounds you." },
      { level: 2, name: "Fog Cloud", desc: "Fog obscures vision." },
      { level: 3, name: "Water Breathing", desc: "Subjects can breathe underwater." },
      { level: 4, name: "Control Water", desc: "Raises or lowers bodies of water." },
      { level: 5, name: "Ice Storm", desc: "Hail deals 5d6 damage in cylinder 40 ft. across." },
      { level: 6, name: "Cone of Cold", desc: "1d6/level cold damage." },
      { level: 7, name: "Acid Fog", desc: "Fog deals acid damage." },
      { level: 8, name: "Horrid Wilting", desc: "Deals 1d6/level damage within 30 ft." },
      { level: 9, name: "Elemental Swarm", desc: "Summons multiple elementals." }
    ]
  }
};

const D35_DOMAIN_NAMES = Object.keys(D35_DOMAINS).sort();

if (typeof window !== "undefined") {
  window.D35_DOMAINS = D35_DOMAINS;
  window.D35_DOMAIN_NAMES = D35_DOMAIN_NAMES;
}
