// Feature rows + original concise summaries for catalog subclasses that
// previously had no defined features (so the builder/sheet showed generic
// "subclass feature gained" placeholders). All summaries are original
// mechanical descriptions, consistent with the project's content policy.
//
// Shape: SUBCLASS_FEATURE_DATA[edition][subclassName] = [[level, featureName, summary], ...]
// The loader at the bottom registers the rows into SUBCLASS_FEATURES and the
// summaries into CONTENT_SUMMARIES.features (without clobbering existing keys).

const SUBCLASS_FEATURE_DATA = {
  "2014": {
    // ---------------- Barbarian ----------------
    "Path of the Totem Warrior": [
      [3, "Spirit Seeker", "You can cast beast sense and speak with animals as rituals, deepening your bond with the wild."],
      [3, "Totem Spirit", "Choose a totem animal such as Bear, Eagle, or Wolf and gain its protective benefit while you rage."],
      [6, "Aspect of the Beast", "A chosen totem animal grants a lasting boon that aids you outside of battle as well as within it."],
      [10, "Spirit Walker", "You can cast commune with nature as a ritual to learn about the surrounding land."],
      [14, "Totemic Attunement", "Your chosen totem grants a powerful combat benefit, such as drawing enemies' attacks or knocking foes prone."]
    ],
    "Path of the Battlerager": [
      [3, "Battlerager Armor", "While wearing spiked armor you can make a bonus-action spike attack and damage creatures you grapple."],
      [6, "Reckless Abandon", "When you Reckless Attack while raging, you gain temporary hit points."],
      [10, "Battlerager Charge", "You can take the Dash action as a bonus action while raging."],
      [14, "Spiked Retribution", "When a creature within reach hits you in melee while you rage, it takes damage from your spikes."]
    ],
    "Path of the Ancestral Guardian": [
      [3, "Ancestral Protectors", "While raging, the first creature you hit is hindered by ancestral spirits and penalized when it attacks anyone but you."],
      [6, "Spirit Shield", "Use your reaction to summon spectral ancestors that reduce damage taken by an ally you can see."],
      [10, "Consult the Spirits", "Call on ancestral spirits to cast augury or clairvoyance without a spell slot."],
      [14, "Vengeful Ancestors", "When your Spirit Shield reduces damage, the attacker takes that force damage in return."]
    ],
    "Path of the Storm Herald": [
      [3, "Storm Aura", "While raging you emanate an aura of desert, sea, or tundra that damages or aids creatures around you."],
      [6, "Storm Soul", "You gain resistance and an environmental benefit tied to your chosen storm aura."],
      [10, "Shielding Storm", "Allies within your aura gain the damage resistance your Storm Soul grants you."],
      [14, "Raging Storm", "Your storm aura gains an extra effect that punishes or controls nearby enemies."]
    ],
    "Path of the Zealot": [
      [3, "Divine Fury", "While raging, your first hit each turn deals extra radiant or necrotic damage."],
      [3, "Warrior of the Gods", "Spells and effects that restore you to life need no material components, reflecting your divine favor."],
      [6, "Fanatical Focus", "Once per rage, you can reroll a saving throw you fail."],
      [10, "Zealous Presence", "As a bonus action, give allies advantage on attacks and saves with a battle cry."],
      [14, "Rage Beyond Death", "While raging, dropping to 0 hit points doesn't knock you out until the rage ends."]
    ],
    "Path of the Beast": [
      [3, "Form of the Beast", "When you rage, manifest a natural weapon — bite, claws, or tail — each with its own combat benefit."],
      [6, "Bestial Soul", "Your natural weapons count as magical and you gain a situational movement such as swimming or climbing."],
      [10, "Infectious Fury", "When you hit with a natural weapon while raging, you can force the target to attack another creature or take psychic damage."],
      [14, "Call the Hunt", "When you rage, grant several allies bonus damage and gain temporary hit points for each of them."]
    ],
    "Path of Wild Magic": [
      [3, "Magic Awareness", "As an action, sense nearby magic items and spells for a short time."],
      [3, "Wild Surge", "When you enter your rage, roll on a table of chaotic magical effects that erupt around you."],
      [6, "Bolstering Magic", "Touch an ally to grant a bonus to attacks or to restore an expended low-level spell slot."],
      [10, "Unstable Backlash", "When you take damage or fail a save while raging, you can trigger a new Wild Surge effect."],
      [14, "Controlled Surge", "When you roll on the Wild Surge table, you can choose from two results instead of taking one at random."]
    ],
    "Path of the Giant": [
      [3, "Giant's Power", "You learn druidcraft and gain giant-themed spells that are always prepared at the listed levels."],
      [3, "Crushing Throw", "When you hit with a thrown weapon or shove while raging, you can spend a Rage use to push the target and add rage damage."],
      [6, "Elemental Cleaver", "Your weapon takes on an elemental damage type and can be thrown and recalled while you rage."],
      [10, "Mighty Impel", "Use a bonus action to hurl a creature you can reach a short distance through the air."],
      [14, "Demiurgic Colossus", "Your reach and rage damage grow as you take on truly giant proportions."]
    ],
    "Path of the Juggernaut": [
      [3, "Thunderous Blows", "When you hit a creature while raging, you can push it and knock it prone with overwhelming force."],
      [3, "Spirit of the Mountain", "While raging you can't be knocked prone, moved against your will, or forced from a space you defend."],
      [6, "Demolishing Might", "Your melee hits deal extra damage to objects and constructs, and your unarmed strikes grow stronger."],
      [10, "Overwhelming Cleave", "When you hit a creature, you can attack another creature within reach as a bonus action."],
      [14, "Unstoppable", "At the start of your turns while raging, your speed can't be reduced and many hindering conditions are resisted or end."]
    ],

    // ---------------- Bard ----------------
    "College of Valor": [
      [3, "Bonus Proficiencies", "You gain proficiency with medium armor, shields, and martial weapons."],
      [3, "Combat Inspiration", "A creature with your Bardic Inspiration die can add it to a weapon's damage or to its AC against an attack."],
      [6, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [14, "Battle Magic", "When you cast a spell with your action, you can make one weapon attack as a bonus action."]
    ],
    "College of Glamour": [
      [3, "Mantle of Inspiration", "Spend a Bardic Inspiration use to grant allies temporary hit points and an immediate reaction move."],
      [3, "Enthralling Performance", "After performing, you can charm watchers who fail a save so they are enraptured by you for a time."],
      [6, "Mantle of Majesty", "Cast command at will for a short time while wreathed in fey splendor that compels obedience."],
      [14, "Unbreakable Majesty", "Assume a majestic aspect that makes attackers hesitate, imposing disadvantage when they target you."]
    ],
    "College of Swords": [
      [3, "Bonus Proficiencies", "You gain proficiency with medium armor and the scimitar, and can use any simple or martial melee weapon as a spellcasting focus."],
      [3, "Fighting Style", "Choose Dueling or Two-Weapon Fighting to sharpen your bladework."],
      [3, "Blade Flourish", "When you take the Attack action, you can spend a Bardic Inspiration die on a flourish that adds movement, defense, or extra targets."],
      [6, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [14, "Master's Flourish", "You can fuel a Blade Flourish with a rolled d6 instead of spending a Bardic Inspiration die."]
    ],
    "College of Whispers": [
      [3, "Psychic Blades", "Spend a Bardic Inspiration use to deal extra psychic damage when you hit a creature with a weapon."],
      [3, "Words of Terror", "A minute of private talk can leave a creature frightened of you or someone else."],
      [6, "Mantle of Whispers", "Capture the shadow of a creature that dies near you and wear it to disguise yourself as them."],
      [14, "Shadow Lore", "Whisper a magical threat that can charm a creature into obeying you out of dread."]
    ],
    "College of Eloquence": [
      [3, "Silver Tongue", "Your Persuasion and Deception checks treat a roll below 10 as a 10."],
      [3, "Unsettling Words", "Spend a Bardic Inspiration die to subtract it from a creature's next saving throw."],
      [6, "Unfailing Inspiration", "When a creature fails a roll using your Bardic Inspiration die, it keeps the die."],
      [6, "Universal Speech", "Make yourself understood by any creature that can hear you for a time."],
      [14, "Infectious Inspiration", "When a creature succeeds using your Bardic Inspiration, you can grant another creature a die for free."]
    ],
    "College of Creation": [
      [3, "Mote of Potential", "Your Bardic Inspiration becomes a dancing mote that adds an extra benefit when used for a check, attack, or save."],
      [3, "Performance of Creation", "Conjure a nonmagical item out of song, sized by your bardic power."],
      [6, "Animating Performance", "Bring a Large object to life as a dancing servant that fights and aids you."],
      [14, "Creative Crescendo", "Your Performance of Creation can produce multiple or larger items at once."]
    ],
    "College of Spirits": [
      [3, "Guiding Whispers", "You can cast guidance at extended range, drawing on helpful spirits."],
      [3, "Spiritual Focus", "A spirit focus adds bonus dice to the healing and damage of your bard spells."],
      [3, "Tales from Beyond", "Spend a Bardic Inspiration die and roll on a table of spirit tales, each with its own magical effect."],
      [6, "Spirit Session", "Through a séance ritual, you and allies can temporarily learn a higher-level spell."],
      [14, "Mystical Connection", "Your Tales from Beyond improve, letting you reroll a low result to find a better tale."]
    ],
    "College of Tragedy": [
      [3, "Poetry in Misery", "When you or a creature you can hear rolls a 1 on a d20, you regain a Bardic Inspiration use."],
      [3, "Sorrowful Fate", "Spend a Bardic Inspiration die so a creature takes psychic damage and laments aloud when it fails a save."],
      [6, "Tale of Hubris", "A creature affected by your Bardic Inspiration becomes vulnerable to critical hits for a time."],
      [14, "Nimbus of Pathos", "Grant a creature radiant power and a dramatic last stand, letting it return briefly even after falling."]
    ]
  },

  "2024": {
    // ---------------- Barbarian ----------------
    "Path of the Wild Heart": [
      [3, "Animal Speaker", "You can cast beast sense and speak with animals as rituals."],
      [3, "Rage of the Wilds", "When you rage, choose a beast spirit — Bear, Eagle, or Wolf — for a benefit that lasts until the rage ends."],
      [6, "Aspect of the Wilds", "Choose a beast aspect — Owl, Panther, or Salmon — granting a lasting exploration benefit."],
      [10, "Nature Speaker", "You can cast commune with nature as a ritual."],
      [14, "Power of the Wilds", "While raging, choose a flight, protective, or knockdown benefit from your beast spirits each turn."]
    ],
    "Path of the World Tree": [
      [3, "Vitality of the Tree", "When you rage, gain temporary hit points, and on later turns share temporary hit points with nearby allies."],
      [6, "Branches of the Tree", "When a creature you can see hits you, summon spectral branches to slow it and pull it toward you."],
      [10, "Battering Roots", "Your melee weapons gain reach and can push or knock prone the creatures you hit."],
      [14, "Travel along the Tree", "While raging, teleport short distances, and spend a Rage use to teleport farther and bring willing allies."]
    ],
    "Path of the Zealot": [
      [3, "Divine Fury", "While raging, your first hit each turn deals extra radiant or necrotic damage."],
      [3, "Warrior of the Gods", "You have a pool of d12s that can be spent to heal you, and spells can restore you to life without material components."],
      [6, "Fanatical Focus", "Once per rage, you can reroll a saving throw you fail."],
      [10, "Zealous Presence", "As a bonus action, give allies advantage on attacks and saves with a battle cry."],
      [14, "Rage of the Gods", "While raging, take on a divine form that lets you revive allies and resist being slain."]
    ],

    // ---------------- Bard ----------------
    "College of Dance": [
      [3, "Dazzling Footwork", "While unarmored you use Charisma for unarmed strikes (damage by your Bardic die) and gain a bonus to AC and acrobatic movement."],
      [6, "Inspiring Movement", "When an enemy ends its turn near you, spend a reaction and a Bardic die to reposition yourself and an ally."],
      [6, "Tandem Footwork", "When you roll initiative, spend a Bardic die to boost your own and your allies' initiative."],
      [14, "Leading Evasion", "When you succeed on a Dexterity save for half damage you take none, and you can share that protection with nearby allies."]
    ],
    "College of Glamour": [
      [3, "Mantle of Inspiration", "Spend a Bardic Inspiration use to grant allies temporary hit points and an immediate reaction move."],
      [3, "Enthralling Performance", "After performing, you can charm watchers who fail a save so they are enraptured by you for a time."],
      [6, "Mantle of Majesty", "Cast command at will for a short time while wreathed in fey splendor that compels obedience."],
      [14, "Unbreakable Majesty", "Assume a majestic aspect that makes attackers hesitate, imposing disadvantage when they target you."]
    ],
    "College of Valor": [
      [3, "Combat Inspiration", "A creature with your Bardic Inspiration die can add it to a weapon's damage or to its AC against an attack."],
      [3, "Martial Training", "You gain proficiency with martial weapons and medium armor and shields, and can use a weapon as a spellcasting focus."],
      [6, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [14, "Battle Magic", "When you cast a spell with your action, you can make one weapon attack as a bonus action."]
    ]
  }
};

function addSubclassFeatures(data) {
  if (typeof SUBCLASS_FEATURES === "undefined") return;
  Object.entries(data).forEach(([rulesEdition, subclasses]) => {
    SUBCLASS_FEATURES[rulesEdition] = SUBCLASS_FEATURES[rulesEdition] || {};
    Object.entries(subclasses).forEach(([subclassName, rows]) => {
      SUBCLASS_FEATURES[rulesEdition][subclassName] = rows.map(([level, name]) => [level, name]);
      if (typeof CONTENT_SUMMARIES !== "undefined" && CONTENT_SUMMARIES.features) {
        rows.forEach(([, name, summary]) => {
          if (summary && !CONTENT_SUMMARIES.features[name]) CONTENT_SUMMARIES.features[name] = summary;
        });
      }
    });
  });
}

addSubclassFeatures(SUBCLASS_FEATURE_DATA);

// ================= Cleric =================
addSubclassFeatures({
  "2014": {
    "Knowledge Domain": [
      [1, "Knowledge Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Blessings of Knowledge", "You learn two languages and gain doubled proficiency in two knowledge skills or tools."],
      [2, "Channel Divinity: Knowledge of the Ages", "Channel Divinity to gain proficiency with a skill or tool of your choice for a time."],
      [6, "Channel Divinity: Read Thoughts", "Channel Divinity to read a creature's surface thoughts and briefly command it."],
      [8, "Potent Spellcasting", "Add your Wisdom modifier to the damage you deal with Cleric cantrips."],
      [17, "Visions of the Past", "Through meditation, glean visions about an object's owners or a place's history."]
    ],
    "Light Domain": [
      [1, "Light Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Warding Flare", "Use your reaction to impose disadvantage on an attacker you can see, a few times per long rest."],
      [2, "Channel Divinity: Radiance of the Dawn", "Channel Divinity to dispel magical darkness and deal radiant damage to nearby foes."],
      [6, "Improved Flare", "You can use Warding Flare to protect another creature, not just yourself."],
      [8, "Potent Spellcasting", "Add your Wisdom modifier to the damage you deal with Cleric cantrips."],
      [17, "Corona of Light", "Emanate sunlight and impose disadvantage on saves against your fire and radiant spells."]
    ],
    "Nature Domain": [
      [1, "Nature Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Acolyte of Nature", "You learn one Druid cantrip and gain proficiency in a nature-related skill."],
      [2, "Channel Divinity: Charm Animals and Plants", "Channel Divinity to charm beasts and plants that fail a save for a time."],
      [6, "Dampen Elements", "Use your reaction to grant resistance to acid, cold, fire, lightning, or thunder damage."],
      [17, "Master of Nature", "You can command the beasts and plants charmed by your Channel Divinity."]
    ],
    "Tempest Domain": [
      [1, "Tempest Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Wrath of the Storm", "Use your reaction to deal lightning or thunder damage to a creature that hits you in melee."],
      [2, "Channel Divinity: Destructive Wrath", "Channel Divinity to deal maximum lightning or thunder damage instead of rolling."],
      [6, "Thunderbolt Strike", "When you deal lightning damage to a Large or smaller creature, you can push it away."],
      [17, "Stormborn", "You gain a flying speed equal to your walking speed while not underground or indoors."]
    ],
    "Trickery Domain": [
      [1, "Trickery Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Blessing of the Trickster", "Touch a creature to give it advantage on Dexterity (Stealth) checks for a time."],
      [2, "Channel Divinity: Invoke Duplicity", "Channel Divinity to create an illusory duplicate you can move and cast spells through."],
      [6, "Channel Divinity: Cloak of Shadows", "Channel Divinity to become invisible until the end of your next turn."],
      [17, "Improved Duplicity", "Your duplicate splits into several, and allies near them gain a bonus to attacks."]
    ],
    "War Domain": [
      [1, "War Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "War Priest", "When you take the Attack action, you can make one weapon attack as a bonus action a few times per rest."],
      [2, "Channel Divinity: Guided Strike", "Channel Divinity to add +10 to an attack roll you just made."],
      [6, "Channel Divinity: War God's Blessing", "Channel Divinity and your reaction to grant a +10 bonus to an ally's attack roll."],
      [17, "Avatar of Battle", "You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons."]
    ],
    "Death Domain": [
      [1, "Death Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Reaper", "You learn a necromancy cantrip that can target two creatures when it normally targets one."],
      [2, "Channel Divinity: Touch of Death", "Channel Divinity to deal extra necrotic damage when you hit a creature in melee."],
      [6, "Inescapable Destruction", "Your spells and Channel Divinity ignore resistance to necrotic damage."],
      [8, "Divine Strike (Necrotic)", "Once on each of your turns, your weapon hit deals extra necrotic damage."],
      [17, "Improved Reaper", "When you cast a single-target necromancy spell of 1st-5th level, you can target a second creature."]
    ],
    "Arcana Domain": [
      [1, "Arcana Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Arcane Initiate", "You gain proficiency in Arcana and learn two Wizard cantrips."],
      [2, "Channel Divinity: Arcane Abjuration", "Channel Divinity to turn a celestial, elemental, fey, or fiend, banishing weaker ones."],
      [6, "Spell Breaker", "When you restore hit points to an ally with a spell, you can also end one spell on them."],
      [8, "Potent Spellcasting", "Add your Wisdom modifier to the damage you deal with Cleric cantrips."],
      [17, "Arcane Mastery", "Add a 6th-, 7th-, 8th-, and 9th-level Wizard spell to your always-prepared domain spells."]
    ],
    "Forge Domain": [
      [1, "Forge Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Blessing of the Forge", "Once per long rest, give a weapon or armor a +1 bonus overnight."],
      [2, "Channel Divinity: Artisan's Blessing", "Channel Divinity to craft a simple metal item over the course of an hour."],
      [6, "Soul of the Forge", "You gain resistance to fire damage and a bonus to AC while in heavy armor."],
      [8, "Divine Strike (Fire)", "Once on each of your turns, your weapon hit deals extra fire damage."],
      [17, "Saint of Forge and Fire", "You gain immunity to fire and resistance to nonmagical physical damage in heavy armor."]
    ],
    "Grave Domain": [
      [1, "Grave Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Circle of Mortality", "Your healing is maximized for creatures at 0 hit points, and you can cast spare the dying at range as a bonus action."],
      [1, "Eyes of the Grave", "You can sense the presence of undead within a wide range a few times per long rest."],
      [2, "Channel Divinity: Path to the Grave", "Channel Divinity to curse a creature so the next attack against it doubles its damage."],
      [6, "Sentinel at Death's Door", "Use your reaction to turn a critical hit against you or a nearby ally into a normal hit."],
      [8, "Potent Spellcasting", "Add your Wisdom modifier to the damage you deal with Cleric cantrips."],
      [17, "Keeper of Souls", "When an enemy dies near you, you or a nearby ally regains hit points."]
    ],
    "Order Domain": [
      [1, "Order Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Voice of Authority", "When you cast a spell on an ally, that ally can use its reaction to make a weapon attack."],
      [2, "Channel Divinity: Order's Demand", "Channel Divinity to charm creatures and force them to drop what they hold."],
      [6, "Embodiment of the Law", "You can cast enchantment spells of 1st-5th level as a bonus action a few times per long rest."],
      [8, "Divine Strike", "Once on each of your turns, your weapon hit deals extra damage of a type tied to your domain."],
      [17, "Order's Wrath", "When you hit a creature with Divine Strike, an ally's next hit on it deals extra psychic damage."]
    ],
    "Peace Domain": [
      [1, "Peace Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Implement of Peace", "You gain proficiency in the Insight, Performance, or Persuasion skill."],
      [1, "Emboldening Bond", "Bond several creatures so that, while near each other, they can add a d4 to an attack, check, or save."],
      [2, "Channel Divinity: Balm of Peace", "Channel Divinity to move without provoking attacks and heal creatures you pass."],
      [6, "Protective Bond", "Bonded creatures can use a reaction to teleport to each other and take damage in another's place."],
      [8, "Potent Spellcasting", "Add your Wisdom modifier to the damage you deal with Cleric cantrips."],
      [17, "Expansive Bond", "Your Emboldening and Protective Bonds work at greater range and grant resistance."]
    ],
    "Twilight Domain": [
      [1, "Twilight Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [1, "Eyes of Night", "You gain darkvision out to a great distance and can share it with allies."],
      [1, "Vigilant Blessing", "You give yourself or another creature advantage on the next initiative roll."],
      [2, "Channel Divinity: Twilight Sanctuary", "Channel Divinity to create an aura that grants temporary hit points or ends charm and fear."],
      [6, "Steps of Night", "You can magically fly for a short time while in dim light or darkness."],
      [8, "Divine Strike", "Once on each of your turns, your weapon hit deals extra damage of a type tied to your domain."],
      [17, "Twilight Shroud", "Allies within your Twilight Sanctuary gain half cover."]
    ]
  },
  "2024": {
    "Light Domain": [
      [3, "Light Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [3, "Warding Flare", "Use your reaction to impose disadvantage on an attacker you can see, a few times per long rest."],
      [3, "Radiance of the Dawn", "As a Channel Divinity option, dispel magical darkness and deal radiant damage to nearby foes."],
      [6, "Improved Warding Flare", "Your Warding Flare regains uses on a short rest and reduces the triggering attack's damage."],
      [17, "Corona of Light", "Emanate sunlight and impose disadvantage on saves against your fire and radiant spells."]
    ],
    "Trickery Domain": [
      [3, "Trickery Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [3, "Blessing of the Trickster", "Touch a creature to give it advantage on Dexterity (Stealth) checks for a time."],
      [3, "Invoke Duplicity", "As a Channel Divinity option, conjure an illusory duplicate you can move and cast spells through."],
      [6, "Trickster's Transposition", "While your duplicate is present, you can swap places with it as a bonus action."],
      [17, "Improved Duplicity", "Your duplicate splits into several, and allies near them gain a bonus to attacks."]
    ],
    "War Domain": [
      [3, "War Domain Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [3, "Guided Strike", "As a Channel Divinity option, add +10 to an attack roll you just made."],
      [3, "War Priest", "A few times per day, when you take the Attack action you can make an extra weapon attack as a bonus action."],
      [6, "War God's Blessing", "As a Channel Divinity option, grant a +10 bonus to an attack roll by you or a nearby ally."],
      [17, "Avatar of Battle", "You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons."]
    ]
  }
});

// ================= Druid =================
addSubclassFeatures({
  "2014": {
    "Circle of the Moon": [
      [2, "Combat Wild Shape", "You can Wild Shape as a bonus action and spend spell slots to heal while transformed."],
      [2, "Circle Forms", "You can transform into beasts of a higher challenge rating, improving as you level."],
      [6, "Primal Strike", "Your attacks in beast form count as magical for overcoming resistance and immunity."],
      [10, "Elemental Wild Shape", "You can spend two Wild Shape uses to become an air, earth, fire, or water elemental."],
      [14, "Thousand Forms", "You can cast alter self at will."]
    ],
    "Circle of Dreams": [
      [2, "Balm of the Summer Court", "You have a pool of healing dice you can give to creatures to heal and grant temporary hit points."],
      [6, "Hearth of Moonlight and Shadow", "During a rest, create a protective sphere granting cover and bonuses to stealth and saves."],
      [10, "Hidden Paths", "You can teleport short distances as a bonus action and send others teleporting too."],
      [14, "Walker in Dreams", "After a short rest, you can cast certain divination and teleportation spells by walking dream paths."]
    ],
    "Circle of the Shepherd": [
      [2, "Speech of the Woods", "You can speak with beasts, and they understand you."],
      [2, "Spirit Totem", "Summon a Bear, Hawk, or Unicorn spirit whose aura aids allies within it."],
      [6, "Mighty Summoner", "Creatures you conjure gain extra hit points and magical attacks."],
      [10, "Guardian Spirit", "Your conjured and summoned creatures regain hit points while near your Spirit Totem."],
      [14, "Faithful Summons", "When you drop to 0 hit points, you automatically summon protective spirit beasts."]
    ],
    "Circle of Spores": [
      [2, "Halo of Spores", "Use your reaction to deal necrotic damage to a creature near you."],
      [2, "Symbiotic Entity", "Spend a Wild Shape use to gain temporary hit points and empower your Halo of Spores and melee attacks."],
      [6, "Fungal Infestation", "When a creature near you dies, you can reanimate it as a zombie under your command."],
      [10, "Spreading Spores", "Hurl a cloud of spores that damages creatures in an area for a time."],
      [14, "Fungal Body", "You're immune to critical hits and several conditions thanks to your fungal form."]
    ],
    "Circle of Stars": [
      [2, "Star Map", "You gain a star chart that lets you cast guidance and guiding bolt."],
      [2, "Starry Form", "Spend a Wild Shape use to take a constellation form — Archer, Chalice, or Dragon — each with a benefit."],
      [6, "Cosmic Omen", "After a long rest, roll to determine a Weal or Woe reaction you can use to aid allies or hinder foes."],
      [10, "Twinkling Constellations", "Your Starry Form improves and you gain a flying speed while transformed."],
      [14, "Full of Stars", "While in Starry Form, you become partly incorporeal and resist physical damage."]
    ],
    "Circle of Wildfire": [
      [2, "Summon Wildfire Spirit", "Spend a Wild Shape use to summon a wildfire spirit that fights for you and teleports allies."],
      [6, "Enhanced Bond", "Your spells deal extra fire damage and can be cast from your wildfire spirit's space."],
      [10, "Cauterizing Flames", "When a creature dies near you or your spirit, you can heal or harm another creature with spectral flame."],
      [14, "Blazing Revival", "If you drop to 0 hit points, your wildfire spirit can sacrifice itself to bring you back."]
    ]
  },
  "2024": {
    "Circle of the Moon": [
      [3, "Circle of the Moon Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [3, "Circle Forms", "You can spend a Wild Shape use to take stronger beast forms and gain temporary hit points."],
      [6, "Improved Circle Forms", "Your beast forms gain bonus damage and can use your Wisdom for attacks."],
      [10, "Moonlight Step", "You can teleport short distances as a bonus action a few times per long rest."],
      [14, "Lunar Form", "Your Wild Shape attacks deal extra radiant damage and you can share Moonlight Step with an ally."]
    ],
    "Circle of the Sea": [
      [3, "Circle of the Sea Spells", "This subclass grants spells that are always prepared at the listed levels."],
      [3, "Wrath of the Sea", "When you Wild Shape, manifest an aura of sea spray that damages and pushes nearby foes."],
      [6, "Aquatic Affinity", "Your Wrath of the Sea aura grows, and you gain a swim speed and the ability to breathe underwater."],
      [10, "Stormborn", "While your aura is active, you gain a flying speed and resistance to cold, lightning, and thunder."],
      [14, "Oceanic Gift", "You can extend your Wrath of the Sea aura to a willing ally and enlarge its effect."]
    ],
    "Circle of the Stars": [
      [3, "Star Map", "You gain a star chart that lets you cast guidance and guiding bolt."],
      [3, "Starry Form", "Spend a Wild Shape use to take a constellation form — Archer, Chalice, or Dragon — each with a benefit."],
      [6, "Cosmic Omen", "After a long rest, roll to determine a Weal or Woe reaction you can use to aid allies or hinder foes."],
      [10, "Twinkling Constellations", "Your Starry Form improves and you gain a flying speed while transformed."],
      [14, "Full of Stars", "While in Starry Form, you become partly incorporeal and resist physical damage."]
    ]
  }
});

// ================= Wizard =================
addSubclassFeatures({
  "2014": {
    "School of Abjuration": [
      [2, "Abjuration Savant", "The gold and time to copy abjuration spells into your spellbook is halved."],
      [2, "Arcane Ward", "Casting an abjuration spell creates a magical ward that absorbs damage for you until you rest."],
      [6, "Projected Ward", "Use your reaction to absorb damage with your Arcane Ward for a nearby creature."],
      [10, "Improved Abjuration", "Add your proficiency bonus to ability checks made as part of abjuration spells like counterspell and dispel magic."],
      [14, "Spell Resistance", "You have advantage on saving throws against spells and resistance to spell damage."]
    ],
    "School of Conjuration": [
      [2, "Conjuration Savant", "The gold and time to copy conjuration spells into your spellbook is halved."],
      [2, "Minor Conjuration", "Conjure a small nonmagical object that lasts for an hour or until used."],
      [6, "Benign Transposition", "Teleport a short distance, or swap places with a willing creature you can see."],
      [10, "Focused Conjuration", "Taking damage can't break your concentration on conjuration spells."],
      [14, "Durable Summons", "Creatures you summon with conjuration spells gain temporary hit points."]
    ],
    "School of Divination": [
      [2, "Divination Savant", "The gold and time to copy divination spells into your spellbook is halved."],
      [2, "Portent", "After a long rest, roll two d20s and replace any later attack, check, or save with one of those rolls."],
      [6, "Expert Divination", "Casting a divination spell of 2nd level or higher refunds a lower-level spell slot."],
      [10, "The Third Eye", "Gain a sensory boon such as darkvision, ethereal sight, or the ability to read any language."],
      [14, "Greater Portent", "You roll three d20s for your Portent feature instead of two."]
    ],
    "School of Enchantment": [
      [2, "Enchantment Savant", "The gold and time to copy enchantment spells into your spellbook is halved."],
      [2, "Hypnotic Gaze", "Charm and incapacitate a creature you can see with a mesmerizing stare."],
      [6, "Instinctive Charm", "Use your reaction to redirect an attack against you toward another creature."],
      [10, "Split Enchantment", "When you cast a single-target enchantment spell, you can target a second creature."],
      [14, "Alter Memories", "A creature you charm with a spell can be made to forget the time it was charmed."]
    ],
    "School of Illusion": [
      [2, "Illusion Savant", "The gold and time to copy illusion spells into your spellbook is halved."],
      [2, "Improved Minor Illusion", "You know minor illusion and can create both a sound and an image at once."],
      [6, "Malleable Illusions", "You can change the nature of an active illusion you cast as an action."],
      [10, "Illusory Self", "Use your reaction to interpose an illusory duplicate, causing an attack to miss you."],
      [14, "Illusory Reality", "Make one object in an illusion you cast briefly real enough to affect the world."]
    ],
    "School of Necromancy": [
      [2, "Necromancy Savant", "The gold and time to copy necromancy spells into your spellbook is halved."],
      [2, "Grim Harvest", "When you kill a creature with a spell, you regain hit points."],
      [6, "Undead Thralls", "You learn animate dead, and the undead you raise are tougher and hit harder."],
      [10, "Inured to Undeath", "You resist necrotic damage and your hit point maximum can't be reduced."],
      [14, "Command Undead", "You can seize control of an undead creature with your magic."]
    ],
    "School of Transmutation": [
      [2, "Transmutation Savant", "The gold and time to copy transmutation spells into your spellbook is halved."],
      [2, "Minor Alchemy", "Temporarily transform one material into another, such as wood into stone."],
      [6, "Transmuter's Stone", "Create a stone that grants a chosen benefit such as darkvision, speed, or a save bonus."],
      [10, "Shapechanger", "You can cast polymorph on yourself without expending a spell slot to become a beast."],
      [14, "Master Transmuter", "Expend your Transmuter's Stone for a major effect such as transmuting an object or restoring youth."]
    ],
    "Bladesinging": [
      [2, "Training in War and Song", "You gain proficiency with light armor and a one-handed melee weapon, plus the Performance skill."],
      [2, "Bladesong", "As a bonus action, enter a magical bladesong that boosts your AC, speed, Concentration, and Acrobatics."],
      [6, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [10, "Song of Defense", "While your Bladesong is active, you can spend a spell slot to reduce damage taken."],
      [14, "Song of Victory", "While your Bladesong is active, your melee weapon attacks deal extra damage."]
    ],
    "War Magic": [
      [2, "Arcane Deflection", "Use your reaction to gain a bonus to AC or a saving throw when hit or forced to save."],
      [2, "Tactical Wit", "Add your Intelligence modifier to your initiative rolls."],
      [6, "Power Surge", "Store magical surges by countering or dispelling spells and spend them to add force damage."],
      [10, "Durable Magic", "While concentrating on a spell, you gain a bonus to AC and saving throws."],
      [14, "Deflecting Shroud", "When you use Arcane Deflection, magic lashes out and damages nearby enemies."]
    ],
    "Chronurgy Magic": [
      [2, "Chronal Shift", "Use a reaction to force a creature to reroll an attack, check, or save, twice per long rest."],
      [2, "Temporal Awareness", "Add your Intelligence modifier to your initiative rolls."],
      [6, "Momentary Stasis", "Encase a Large or smaller creature in time, leaving it incapacitated unless it succeeds on a save."],
      [10, "Arcane Abeyance", "Store a low-level spell in a mote that you or an ally can release later."],
      [14, "Convergent Future", "Choose the result of an attack, check, or save you can see, at the cost of exhaustion-like strain."]
    ],
    "Graviturgy Magic": [
      [2, "Adjust Density", "Make a creature or object heavier or lighter, changing its speed and the weight it can bear."],
      [6, "Gravity Well", "When you damage a creature with a spell, you can move it a short distance."],
      [10, "Violent Attraction", "Use your reaction to add damage to a falling or attacking creature's hit."],
      [14, "Event Horizon", "Emanate a field of gravity that damages and slows enemies who try to move within it."]
    ],
    "Order of Scribes": [
      [2, "Wizardly Quill", "Conjure a magical quill that writes swiftly and lets you copy spells more cheaply."],
      [2, "Awakened Spellbook", "Your spellbook gains a will of its own, letting you swap a spell's damage type and ritual-cast freely."],
      [6, "Manifest Mind", "Project your awakened spellbook's mind as a glowing form you can see and cast spells through."],
      [10, "Master Scrivener", "After a long rest, create a magical scroll from a spell in your spellbook."],
      [14, "One with the Word", "Your bond with your book lets you avoid death once, at the cost of losing some spell knowledge."]
    ]
  },
  "2024": {
    "Abjurer": [
      [3, "Abjuration Savant", "The gold and time to copy abjuration spells into your spellbook is halved."],
      [3, "Arcane Ward", "Casting an abjuration spell creates a magical ward that absorbs damage for you until you rest."],
      [6, "Projected Ward", "Use your reaction to absorb damage with your Arcane Ward for a nearby creature."],
      [10, "Spell Breaker", "You always have counterspell and dispel magic prepared and can cast them more efficiently."],
      [14, "Spell Resistance", "You have advantage on saving throws against spells and resistance to spell damage."]
    ],
    "Diviner": [
      [3, "Divination Savant", "The gold and time to copy divination spells into your spellbook is halved."],
      [3, "Portent", "After a long rest, roll two d20s and replace a later attack, check, or save with one of those rolls."],
      [6, "Expert Divination", "Casting a divination spell of 2nd level or higher refunds a lower-level spell slot."],
      [10, "The Third Eye", "Gain a sensory boon such as darkvision or the ability to read any language."],
      [14, "Greater Portent", "You roll three d20s for your Portent feature instead of two."]
    ],
    "Illusionist": [
      [3, "Illusion Savant", "The gold and time to copy illusion spells into your spellbook is halved."],
      [3, "Improved Illusions", "You know minor illusion, can cast it without components, and create both a sound and image at once."],
      [6, "Phantasmal Creatures", "You can conjure illusory creatures that act on your behalf."],
      [10, "Illusory Self", "Use your reaction to interpose an illusory duplicate, causing an attack to miss you."],
      [14, "Illusory Reality", "Make one object in an illusion you cast briefly real enough to affect the world."]
    ],
    "Bladesinger": [
      [3, "Training in War and Song", "You gain proficiency with light armor and a one-handed melee weapon, plus the Performance skill."],
      [3, "Bladesong", "As a bonus action, enter a magical bladesong that boosts your AC, speed, Concentration, and Acrobatics."],
      [6, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [10, "Song of Defense", "While your Bladesong is active, you can spend a spell slot to reduce damage taken."],
      [14, "Song of Victory", "While your Bladesong is active, your melee weapon attacks deal extra damage."]
    ]
  }
});

// ================= Sorcerer =================
addSubclassFeatures({
  "2014": {
    "Wild Magic": [
      [1, "Wild Magic Surge", "Your spellcasting can trigger a roll on a table of random magical effects."],
      [1, "Tides of Chaos", "Gain advantage on one attack, check, or save; the DM can later trigger a Wild Magic Surge to refresh it."],
      [6, "Bend Luck", "Spend Sorcery Points and your reaction to add or subtract a d4 from another creature's roll."],
      [14, "Controlled Chaos", "When you roll on the Wild Magic table, you can roll twice and choose the result."],
      [18, "Spell Bombardment", "When you roll a maximum die of spell damage, you can roll and add another die of that type."]
    ],
    "Storm Sorcery": [
      [1, "Wind Speaker", "You can speak, read, and write Primordial and its dialects."],
      [1, "Tempestuous Magic", "After casting a spell of 1st level or higher, fly a short distance without provoking attacks."],
      [6, "Heart of the Storm", "You resist lightning and thunder damage and deal damage to nearby foes when you cast such spells."],
      [6, "Storm Guide", "You can calm rain around you or summon a gust of wind as a bonus action."],
      [14, "Storm's Fury", "When hit in melee, deal lightning damage to and push the attacker as a reaction."],
      [18, "Wind Soul", "You gain immunity to lightning and thunder damage and a flying speed you can share with allies."]
    ],
    "Divine Soul": [
      [1, "Divine Magic", "You can draw spells from the Cleric list and gain one based on your divine affinity."],
      [1, "Favored by the Gods", "When you fail an attack or save, add 2d4 to the roll, once per short rest."],
      [6, "Empowered Healing", "Reroll dice when you or a nearby ally cast a healing spell, spending a Sorcery Point."],
      [14, "Otherworldly Wings", "Sprout spectral wings to gain a flying speed as a bonus action."],
      [18, "Unearthly Recovery", "When you drop below half hit points, regain a large number of hit points once per long rest."]
    ],
    "Shadow Magic": [
      [1, "Eyes of the Dark", "You gain darkvision and can cast darkness, seeing through your own darkness."],
      [1, "Strength of the Grave", "When dropped to 0 hit points, you can spend a roll or Sorcery Point to stay at 1 instead."],
      [6, "Hound of Ill Omen", "Spend Sorcery Points to summon a shadow hound that hunts a chosen creature."],
      [14, "Shadow Walk", "In dim light or darkness, teleport between shadows as a bonus action."],
      [18, "Umbral Form", "Spend Sorcery Points to become a shadowy form that moves through objects and resists most damage."]
    ],
    "Aberrant Mind": [
      [1, "Psionic Spells", "You learn aberrant-themed spells and can swap them as you level."],
      [1, "Telepathic Speech", "Form a telepathic link with a creature you can see for a time."],
      [6, "Psionic Sorcery", "You can cast your psionic spells using Sorcery Points instead of slots, and often without components."],
      [6, "Psychic Defenses", "You gain resistance to psychic damage and advantage against being charmed or frightened."],
      [14, "Revelation in Flesh", "Spend Sorcery Points to gain otherworldly traits like flight, swimming, or seeing the invisible."],
      [18, "Warping Implosion", "Teleport and unleash a gravitational burst that damages and pulls in nearby creatures."]
    ],
    "Clockwork Soul": [
      [1, "Clockwork Magic", "You learn order-themed spells drawn from several classes and can swap them as you level."],
      [1, "Restore Balance", "Use your reaction to cancel advantage or disadvantage on a creature's roll."],
      [6, "Bastion of Law", "Spend Sorcery Points to ward a creature with dice that absorb damage."],
      [14, "Trance of Order", "Attacks against you can't gain advantage, and you can treat low d20 rolls as an 10."],
      [18, "Clockwork Cavalcade", "Summon spirits of order that heal allies, repair objects, and end spells in an area."]
    ],
    "Lunar Sorcery": [
      [1, "Moon Bolt", "You learn a moon-themed cantrip that deals necrotic damage and can hinder its target."],
      [1, "Lunar Embodiment", "Choose a lunar phase that grants always-prepared spells, and shift phases during a long rest."],
      [6, "Lunar Boons", "Spend Sorcery Points to gain a benefit tied to your current lunar phase."],
      [14, "Waxing and Waning", "You can change your lunar phase more freely and gain resistance based on it."],
      [18, "Lunar Empowerment", "Your phase grants a powerful benefit, such as extra radiant or necrotic damage or improved defenses."]
    ]
  },
  "2024": {
    "Aberrant Sorcery": [
      [3, "Psionic Spells", "You learn aberrant-themed spells and can swap them as you level."],
      [3, "Telepathic Speech", "Form a telepathic link with a creature you can see for a time."],
      [6, "Psionic Sorcery", "You can cast your psionic spells using Sorcery Points instead of slots, and often without components."],
      [6, "Psychic Defenses", "You gain resistance to psychic damage and advantage against being charmed or frightened."],
      [14, "Revelation in Flesh", "Spend Sorcery Points to gain otherworldly traits like flight, swimming, or seeing the invisible."],
      [18, "Warping Implosion", "Teleport and unleash a gravitational burst that damages and pulls in nearby creatures."]
    ],
    "Clockwork Sorcery": [
      [3, "Clockwork Spells", "You learn order-themed spells and can swap them as you level."],
      [3, "Restore Balance", "Use your reaction to cancel advantage or disadvantage on a creature's roll."],
      [6, "Bastion of Law", "Spend Sorcery Points to ward a creature with dice that absorb damage."],
      [14, "Trance of Order", "Attacks against you can't gain advantage, and you can treat low d20 rolls as a 10."],
      [18, "Clockwork Cavalcade", "Summon spirits of order that heal allies, repair objects, and end spells in an area."]
    ],
    "Wild Magic Sorcery": [
      [3, "Wild Magic Surge", "Your spellcasting can trigger a roll on a table of random magical effects."],
      [3, "Tides of Chaos", "Gain advantage on one attack, check, or save; a later Wild Magic Surge refreshes it."],
      [6, "Bend Luck", "Spend Sorcery Points and your reaction to add or subtract a d4 from another creature's roll."],
      [14, "Controlled Chaos", "When you roll on the Wild Magic table, you can roll twice and choose the result."],
      [18, "Spell Bombardment", "When you roll a maximum die of spell damage, you can roll and add another die of that type."]
    ]
  }
});

// ================= Warlock =================
addSubclassFeatures({
  "2014": {
    "The Archfey": [
      [1, "Fey Presence", "As an action, charm or frighten creatures around you that fail a save."],
      [6, "Misty Escape", "When you take damage, turn invisible and teleport a short distance as a reaction."],
      [10, "Beguiling Defenses", "You're immune to being charmed and can turn a failed charm back on its caster."],
      [14, "Dark Delirium", "Plunge a creature into an illusory realm, leaving it charmed or frightened and unaware of its surroundings."]
    ],
    "The Great Old One": [
      [1, "Awakened Mind", "You can speak telepathically to any creature you can see within range."],
      [6, "Entropic Ward", "Use your reaction to impose disadvantage on an attack, then gain advantage against that attacker."],
      [10, "Thought Shield", "Your thoughts can't be read, and creatures that deal you psychic damage take some back."],
      [14, "Create Thrall", "Touch an incapacitated creature to charm it indefinitely as your thrall."]
    ],
    "The Undying": [
      [1, "Among the Dead", "You learn spare the dying, undead struggle to harm you, and you resist disease."],
      [6, "Defy Death", "Regain hit points when you succeed on a death save or stabilize a dying creature."],
      [10, "Undying Nature", "You age slowly, can hold your breath indefinitely, and need no food, water, or air."],
      [14, "Indestructible Life", "As a bonus action, regain hit points and reattach or regrow lost body parts."]
    ],
    "The Celestial": [
      [1, "Bonus Cantrips", "You learn two Cleric cantrips, which count as Warlock spells for you."],
      [1, "Healing Light", "You have a pool of d6s you can spend as a bonus action to heal yourself or others."],
      [6, "Radiant Soul", "You resist radiant damage and add your Charisma modifier to one radiant or fire spell's damage."],
      [10, "Celestial Resilience", "You and your allies gain temporary hit points whenever you finish a rest."],
      [14, "Searing Vengeance", "When you would make a death save, instead rise with hit points and blind nearby foes with light."]
    ],
    "The Hexblade": [
      [1, "Hexblade's Curse", "Curse a creature to gain bonus damage, critical hits on 19-20, and healing when it dies."],
      [1, "Hex Warrior", "You gain martial armor and weapon training and can use Charisma for one bonded weapon's attacks."],
      [6, "Accursed Specter", "When you slay a creature, you can raise its spirit as a specter that serves you."],
      [10, "Armor of Hexes", "Your cursed target has a chance to miss you with each attack."],
      [14, "Master of Hexes", "When your cursed target dies, you can move the curse to a new creature."]
    ],
    "The Fathomless": [
      [1, "Tentacle of the Deeps", "Summon a spectral tentacle that lashes and slows the foes you target."],
      [1, "Gift of the Sea", "You gain a swim speed and can breathe underwater."],
      [6, "Oceanic Soul", "You gain resistance to cold and can communicate underwater with creatures."],
      [6, "Guardian Coil", "Your tentacle can use its reaction to reduce damage taken by you or a nearby creature."],
      [10, "Grasping Tentacle", "You can cast evard's black tentacles once per long rest, and it can't harm you."],
      [14, "Fathomless Plunge", "Teleport yourself and up to five willing creatures to a body of water you've seen."]
    ],
    "The Genie": [
      [1, "Genie's Vessel", "You gain a magical vessel tied to a genie kind, granting bonus damage and a place to retreat into."],
      [6, "Elemental Gift", "You gain resistance to your genie's damage type and can fly for short bursts."],
      [10, "Sanctuary Vessel", "You and allies can rest inside your vessel, gaining benefits when you finish a rest there."],
      [14, "Limited Wish", "Once per long-rest-and-a-half, replicate the effect of a spell of 6th level or lower."]
    ],
    "The Undead": [
      [1, "Form of Dread", "Transform into a frightening aspect, gaining temporary hit points and the ability to frighten foes you hit."],
      [6, "Grave Touched", "Your patron's power lets you deal necrotic damage with any attack and ignore the need to eat, drink, or breathe."],
      [10, "Necrotic Husk", "You resist necrotic damage, and once per long rest you can erupt with necrotic energy when reduced to 0 hit points."],
      [14, "Spirit Projection", "Project your spirit to become incorporeal, moving through objects and enhancing your spells."]
    ]
  },
  "2024": {
    "Archfey Patron": [
      [3, "Archfey Spells", "Your patron grants spells that are always prepared at the listed levels."],
      [3, "Steps of the Fey", "When you Misty Step, choose a refreshing or disappearing effect that aids you or hinders foes."],
      [6, "Misty Escape", "When you take damage, turn invisible and teleport a short distance as a reaction."],
      [10, "Beguiling Defenses", "You're immune to being charmed and can turn a failed charm back on its caster."],
      [14, "Dark Delirium", "Plunge a creature into an illusory realm, leaving it charmed or frightened and unaware of its surroundings."]
    ],
    "Celestial Patron": [
      [3, "Celestial Spells", "Your patron grants spells that are always prepared at the listed levels."],
      [3, "Healing Light", "You have a pool of d6s you can spend as a bonus action to heal yourself or others."],
      [6, "Radiant Soul", "You resist radiant damage and add your Charisma modifier to one radiant or fire spell's damage."],
      [10, "Celestial Resilience", "You and your allies gain temporary hit points whenever you finish a rest."],
      [14, "Searing Vengeance", "When you would make a death save, instead rise with hit points and blind nearby foes with light."]
    ],
    "Great Old One Patron": [
      [3, "Great Old One Spells", "Your patron grants spells that are always prepared at the listed levels."],
      [3, "Awakened Mind", "You can speak telepathically to any creature you can see within range."],
      [6, "Clairvoyant Combatant", "Form a psychic link with a creature so you have advantage and it has disadvantage against you."],
      [10, "Eldritch Hex", "Your hex-like patron magic adds a slowing or hindering effect to a cursed creature."],
      [14, "Create Thrall", "Charm a creature into becoming your psychically linked thrall."]
    ]
  }
});

// ================= Fighter =================
addSubclassFeatures({
  "2014": {
    "Battle Master": [
      [3, "Combat Superiority", "You learn combat maneuvers fueled by superiority dice that add effects like tripping, disarming, or rallying when you attack."],
      [3, "Student of War", "You gain proficiency with one type of artisan's tools."],
      [7, "Know Your Enemy", "Study a creature for a short time to learn how its capabilities compare to your own."],
      [10, "Improved Combat Superiority", "Your superiority dice increase in size, making your maneuvers more potent."],
      [15, "Relentless", "When you roll initiative with no superiority dice left, you regain one."],
      [18, "Improved Combat Superiority", "Your superiority dice increase in size again, to their largest."]
    ],
    "Eldritch Knight": [
      [3, "Spellcasting", "You learn wizard spells, focused on abjuration and evocation, using Intelligence."],
      [3, "Weapon Bond", "Bond with up to two weapons so you can't be disarmed of them and can summon them to your hand."],
      [7, "War Magic", "When you cast a cantrip, you can make one weapon attack as a bonus action."],
      [10, "Eldritch Strike", "When you hit a creature with a weapon, it has disadvantage on its next save against your spells."],
      [15, "Arcane Charge", "When you Action Surge, you can teleport a short distance."],
      [18, "Improved War Magic", "When you cast a spell, you can make one weapon attack as a bonus action."]
    ],
    "Purple Dragon Knight": [
      [3, "Rallying Cry", "When you use Second Wind, you also restore hit points to nearby allies."],
      [7, "Royal Envoy", "You gain expertise in Persuasion and learn an additional language."],
      [10, "Inspiring Surge", "When you Action Surge, an ally you can see can also make a weapon attack."],
      [15, "Bulwark", "When you use Indomitable, a nearby ally can also reroll a failed saving throw."]
    ],
    "Arcane Archer": [
      [3, "Arcane Archer Lore", "You learn a magical cantrip and gain proficiency in Arcana or Nature."],
      [3, "Arcane Shot", "You learn special Arcane Shot options that add magical effects to your arrows a few times per rest."],
      [7, "Magic Arrow", "Your nonmagical arrows count as magical and ignore resistance to their damage."],
      [7, "Curving Shot", "When you miss with a magic arrow, you can reroll the attack against a different nearby target."],
      [15, "Ever-Ready Shot", "When you roll initiative with no Arcane Shot uses, you regain one."]
    ],
    "Cavalier": [
      [3, "Bonus Proficiency", "You gain proficiency in a skill or with an additional language."],
      [3, "Born to the Saddle", "You mount and dismount easily and stay in the saddle when you'd otherwise be knocked off."],
      [3, "Unwavering Mark", "When you hit a creature, you mark it; it suffers when it attacks anyone but you, and you can punish it."],
      [7, "Warding Maneuver", "Use your reaction to add to a nearby ally's AC and grant resistance to an attack's damage."],
      [10, "Hold the Line", "Creatures provoke your opportunity attacks when they move, and your hits stop their movement."],
      [15, "Ferocious Charger", "If you move toward a creature before hitting it, you can knock it prone."],
      [18, "Vigilant Defender", "You can make an opportunity attack on every other creature's turn, not just your own."]
    ],
    "Samurai": [
      [3, "Bonus Proficiency", "You gain proficiency in a social skill of your choice."],
      [3, "Fighting Spirit", "As a bonus action, gain advantage on your attacks this turn and some temporary hit points."],
      [7, "Elegant Courtier", "Add your Wisdom modifier to Persuasion checks and resist being charmed or frightened."],
      [10, "Tireless Spirit", "When you roll initiative with no Fighting Spirit uses, you regain one."],
      [15, "Rapid Strike", "Trade advantage on an attack for an extra attack against the same target."],
      [18, "Strength Before Death", "When you drop to 0 hit points but aren't killed, you can take an immediate extra turn."]
    ],
    "Echo Knight": [
      [3, "Manifest Echo", "Summon a spectral echo of yourself that you can swap places with and attack from."],
      [3, "Unleash Incarnation", "Make an extra melee attack from your echo's position a number of times per rest."],
      [7, "Echo Avatar", "See and hear through your echo as it scouts at a distance."],
      [10, "Shadow Martyr", "Have your echo intercept an attack meant for another creature."],
      [15, "Reclaim Potential", "When your echo is destroyed, you gain temporary hit points."],
      [18, "Legion of One", "Maintain two echoes at once and regain Unleash Incarnation uses when you roll initiative."]
    ],
    "Psi Warrior": [
      [3, "Psionic Power", "You have a pool of Psionic Energy dice that fuel your subclass's special psionic talents."],
      [7, "Telekinetic Adept", "Unleash a wave of telekinetic force or briefly fly using your psionic power."],
      [10, "Guarded Mind", "You resist psychic damage and can spend a die to end being charmed or frightened."],
      [15, "Bulwark of Force", "Shield yourself and nearby allies with telekinetic cover as a bonus action."],
      [18, "Telekinetic Master", "Cast telekinesis and make a weapon attack on the same turn."]
    ],
    "Rune Knight": [
      [3, "Bonus Proficiencies", "You gain proficiency with smith's tools and learn to speak, read, and write Giant."],
      [3, "Rune Carver", "You inscribe magical runes on your gear that grant powerful benefits when invoked."],
      [3, "Giant's Might", "As a bonus action, grow to Large size, gaining advantage on Strength checks and extra damage."],
      [7, "Runic Shield", "Use your reaction to force an attacker to reroll a hit against a nearby ally."],
      [10, "Great Stature", "Your body grows, your height increases, and your Giant's Might deals more damage."],
      [15, "Master of Runes", "You can invoke each of your runes more often between rests."],
      [18, "Runic Juggernaut", "Your Giant's Might lets you become Huge, increasing your reach and damage."]
    ],
    "Gunslinger": [
      [3, "Gunsmith", "You gain proficiency with tinker's tools and can craft and repair firearms and ammunition."],
      [3, "Adept Marksman", "You have a pool of grit points that fuel Trick Shots — special firearm maneuvers."],
      [7, "Quick Draw", "You add your proficiency bonus to initiative and can draw a weapon as part of an attack."],
      [10, "Rapid Repair", "You can spend grit to clear a misfired firearm during combat."],
      [15, "Bullying Shot", "Use a near miss to demoralize a creature, granting an ally advantage against it."],
      [18, "Lightning Reload", "You can reload a one-handed firearm as a bonus action."]
    ]
  },
  "2024": {
    "Battle Master": [
      [3, "Combat Superiority", "You learn combat maneuvers fueled by superiority dice that add effects like tripping, disarming, or rallying when you attack."],
      [3, "Student of War", "You gain a tool proficiency and an additional skill proficiency."],
      [7, "Know Your Enemy", "Spend a superiority die to learn whether a creature is your equal, superior, or inferior in chosen traits."],
      [10, "Improved Combat Superiority", "Your superiority dice increase in size, making your maneuvers more potent."],
      [15, "Relentless", "When you roll initiative with no superiority dice left, you regain one."],
      [18, "Improved Combat Superiority", "Your superiority dice increase in size again, to their largest."]
    ],
    "Eldritch Knight": [
      [3, "Spellcasting", "You learn wizard spells, focused on abjuration and evocation, using Intelligence."],
      [3, "War Bond", "Bond with up to two weapons so you can't be disarmed of them and can summon them to your hand."],
      [7, "War Magic", "When you take the Attack action, you can replace one attack with a casting of a cantrip or a bonus-action spell."],
      [10, "Eldritch Strike", "When you hit a creature with a weapon, it has disadvantage on its next save against your spells."],
      [15, "Arcane Charge", "When you Action Surge, you can teleport a short distance."],
      [18, "Improved War Magic", "When you take the Attack action, you can replace one attack with casting a 1st- or 2nd-level spell."]
    ],
    "Psi Warrior": [
      [3, "Psionic Power", "You have a pool of Psionic Energy dice that fuel your subclass's special psionic talents."],
      [7, "Telekinetic Adept", "Unleash a wave of telekinetic force or briefly fly using your psionic power."],
      [10, "Guarded Mind", "You resist psychic damage and can spend a die to end being charmed or frightened."],
      [15, "Bulwark of Force", "Shield yourself and nearby allies with telekinetic cover as a bonus action."],
      [18, "Telekinetic Master", "Cast telekinesis and make a weapon attack on the same turn."]
    ]
  }
});

// ================= Monk =================
addSubclassFeatures({
  "2014": {
    "Way of the Four Elements": [
      [3, "Disciple of the Elements", "You learn elemental disciplines that spend Ki to produce magical effects like elemental blasts and movement."],
      [6, "Additional Discipline", "You learn another elemental discipline and can fuel your most powerful ones."],
      [11, "Additional Discipline", "You learn another elemental discipline and can fuel your most powerful ones."],
      [17, "Additional Discipline", "You learn another elemental discipline and can fuel your most powerful ones."]
    ],
    "Way of Shadow": [
      [3, "Shadow Arts", "Spend Ki to cast spells like darkness, pass without trace, and silence, and you know the minor illusion cantrip."],
      [6, "Shadow Step", "Teleport between areas of dim light or darkness as a bonus action, gaining advantage on your next melee attack."],
      [11, "Cloak of Shadows", "In dim light or darkness, you can become invisible as an action."],
      [17, "Opportunist", "When a creature near you is hit by another's attack, you can make a melee attack against it."]
    ],
    "Way of the Long Death": [
      [3, "Touch of Death", "When you reduce a creature to 0 hit points, you gain temporary hit points."],
      [6, "Hour of Reaping", "As an action, frighten creatures around you that fail a save."],
      [11, "Mastery of Death", "Spend Ki to stay at 1 hit point when you would drop to 0."],
      [17, "Touch of the Long Death", "Spend Ki to deal a burst of necrotic damage to a creature you touch."]
    ],
    "Way of the Sun Soul": [
      [3, "Radiant Sun Bolt", "Hurl ranged radiant bolts using your Martial Arts, including as part of a Flurry of Blows."],
      [6, "Searing Arc Strike", "Spend Ki to cast burning hands through your martial arts."],
      [11, "Searing Sunburst", "Create a burst of radiant light that blinds and damages creatures in an area."],
      [17, "Sun Shield", "You shed bright light and can deal radiant damage to creatures that hit you in melee."]
    ],
    "Way of the Drunken Master": [
      [3, "Bonus Proficiencies", "You gain proficiency in Performance and with brewer's supplies."],
      [3, "Drunken Technique", "Your Flurry of Blows grants you extra movement and the benefit of the Disengage action."],
      [6, "Tipsy Sway", "Redirect a missed attack to another creature, or stand from prone cheaply."],
      [11, "Drunkard's Luck", "Spend Ki to cancel disadvantage on a roll you make."],
      [17, "Intoxicated Frenzy", "Your Flurry of Blows can make extra attacks when you spread them among different targets."]
    ],
    "Way of the Kensei": [
      [3, "Path of the Kensei", "Choose kensei weapons you can wield with Martial Arts, gaining accuracy, defense, and ranged options."],
      [6, "One with the Blade", "Your kensei weapons count as magical, and you can spend Ki to add damage on a hit."],
      [11, "Sharpen the Blade", "Spend Ki to give a kensei weapon a bonus to attack and damage rolls."],
      [17, "Unerring Accuracy", "Once per turn, reroll a missed attack with a monk weapon."]
    ],
    "Way of the Astral Self": [
      [3, "Arms of the Astral Self", "Summon spectral arms that extend your reach, use Wisdom for attacks, and deal force damage."],
      [6, "Visage of the Astral Self", "Manifest a spectral face granting darkvision, an intimidating gaze, and far-reaching speech."],
      [11, "Body of the Astral Self", "Manifest a full astral body, adding damage and a deflecting reaction."],
      [17, "Awakened Astral Self", "Summon your complete astral form for bonus AC, extra attacks, and longer reach."]
    ],
    "Way of Mercy": [
      [3, "Implements of Mercy", "You gain proficiency in Insight, Medicine, and the herbalism kit, and wear a mask of mercy."],
      [3, "Hand of Healing", "Spend Ki to restore hit points to a creature you touch."],
      [3, "Hand of Harm", "Spend Ki to deal extra necrotic damage when you hit a creature."],
      [6, "Physician's Touch", "Your Hand of Healing can also cure a disease or condition, and your Hand of Harm can poison."],
      [11, "Flurry of Healing and Harm", "During a Flurry of Blows, you can heal or harm with each strike without spending extra Ki."],
      [17, "Hand of Ultimate Mercy", "Spend Ki to return a recently dead creature to life."]
    ],
    "Way of the Ascendant Dragon": [
      [3, "Draconic Disciple", "You gain a draconic damage affinity, a useful skill expertise, and a touch of draconic presence."],
      [3, "Breath of the Dragon", "Replace a Flurry of Blows attack with a breath weapon dealing your draconic damage type."],
      [6, "Wings Unfurled", "When you Step of the Wind, you gain a flying speed for that turn."],
      [11, "Aspect of the Wyrm", "Emanate an aura that frightens enemies or shields allies with draconic resistance."],
      [17, "Ascendant Aspect", "Your draconic powers grow, improving your breath weapon, senses, and aura."]
    ],
    "Way of the Cobalt Soul": [
      [3, "Extract Aspects", "When you hit with Flurry of Blows, you can learn a creature's defenses and vulnerabilities."],
      [6, "Extort Truth", "A creature you've damaged struggles to lie to you for a short time."],
      [6, "Mystical Erudition", "You gain additional languages and expertise with knowledge skills."],
      [11, "Mind of Mercury", "Spend Ki to take additional reactions in a round."],
      [17, "Debilitating Barrage", "Spend Ki when you hit to make a creature vulnerable to a damage type of your choice."]
    ]
  },
  "2024": {
    "Warrior of Mercy": [
      [3, "Implements of Mercy", "You gain proficiency in Insight and Medicine and with the herbalism kit, and wear a mask of mercy."],
      [3, "Hand of Healing", "Spend Focus to restore hit points to a creature you touch."],
      [3, "Hand of Harm", "Spend Focus to deal extra necrotic damage when you hit a creature."],
      [6, "Physician's Touch", "Your Hand of Healing can also end a condition, and your Hand of Harm can poison its target."],
      [11, "Flurry of Healing and Harm", "During a Flurry of Blows, you can heal or harm with each strike without spending extra Focus."],
      [17, "Hand of Ultimate Mercy", "Spend Focus to return a recently dead creature to life."]
    ],
    "Warrior of Shadow": [
      [3, "Shadow Arts", "Spend Focus to cast darkness and you know the minor illusion cantrip, seeing through your own darkness."],
      [6, "Shadow Step", "Teleport between areas of dim light or darkness as a bonus action, gaining advantage on your next melee attack."],
      [11, "Improved Shadow Step", "When you Shadow Step, you can make a melee attack with advantage right after teleporting."],
      [17, "Cloak of Shadows", "In dim light or darkness, you can become invisible and pass through occupied spaces."]
    ],
    "Warrior of the Elements": [
      [3, "Elemental Attunement", "Spend Focus to extend your reach and deal elemental damage with your Martial Arts strikes."],
      [6, "Powerful Elements", "Your elemental strikes can push the creatures you hit and deal extra damage."],
      [11, "Stride of the Elements", "You gain a flying and swimming speed while your elemental attunement is active."],
      [17, "Elemental Epitome", "Your mastery grows, granting resistance, extra damage, and greater elemental reach."]
    ]
  }
});

// ================= Paladin =================
addSubclassFeatures({
  "2014": {
    "Oath of the Ancients": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Nature's Wrath", "Channel Divinity to ensnare a creature in spectral vines that restrain it."],
      [3, "Turn the Faithless", "Channel Divinity to force fey and fiends to flee and reveal shapechangers."],
      [7, "Aura of Warding", "You and allies within your aura gain resistance to damage from spells."],
      [15, "Undying Sentinel", "When you would drop to 0 hit points, you can stay at 1 instead, once per long rest."],
      [20, "Elder Champion", "Assume a primal form that heals you, speeds your spellcasting, and weakens enemies' saves."]
    ],
    "Oath of Vengeance": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Abjure Enemy", "Channel Divinity to frighten and halt a creature you can see."],
      [3, "Vow of Enmity", "Channel Divinity to gain advantage on attacks against one chosen creature."],
      [7, "Relentless Avenger", "When you hit a creature with an opportunity attack, you can move without provoking attacks."],
      [15, "Soul of Vengeance", "When your Vow of Enmity target attacks, you can use your reaction to strike it."],
      [20, "Avenging Angel", "Sprout wings and emanate an aura of menace that frightens your enemies."]
    ],
    "Oathbreaker": [
      [3, "Oath Spells", "Your dark oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Control Undead", "Channel Divinity to bend an undead creature to your will."],
      [3, "Dreadful Aspect", "Channel Divinity to frighten creatures around you with an aura of terror."],
      [7, "Aura of Hate", "You and fiends and undead near you add your Charisma modifier to melee damage."],
      [15, "Supernatural Resistance", "You gain resistance to nonmagical weapon damage."],
      [20, "Dread Lord", "Wreathe yourself in shadow, summoning a spectral attacker and obscuring your foes' sight."]
    ],
    "Oath of the Crown": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Champion Challenge", "Channel Divinity to bind nearby creatures so they can't move away from you."],
      [3, "Turn the Tide", "Channel Divinity to heal nearby bloodied allies."],
      [7, "Divine Allegiance", "Use your reaction to take the damage a nearby ally would suffer."],
      [15, "Unyielding Spirit", "You have advantage on saving throws against being paralyzed or stunned."],
      [20, "Exalted Champion", "Gain resistance to physical weapon damage and bolster your allies' resolve for a time."]
    ],
    "Oath of Conquest": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Conquering Presence", "Channel Divinity to frighten creatures around you with crushing authority."],
      [3, "Guided Strike", "Channel Divinity to add +10 to an attack roll you just made."],
      [7, "Aura of Conquest", "Frightened enemies in your aura have their speed reduced to 0 and take psychic damage."],
      [15, "Scornful Rebuke", "When a creature hits you, it takes psychic damage in return."],
      [20, "Invincible Conqueror", "Assume a fearsome form with resistance to all damage, an extra attack, and brutal critical hits."]
    ],
    "Oath of Redemption": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Emissary of Peace", "Channel Divinity to gain a bonus to your Persuasion checks."],
      [3, "Rebuke the Violent", "Channel Divinity to deal radiant damage to a creature that harms another nearby."],
      [7, "Aura of the Guardian", "Use your reaction to magically take the damage an ally in your aura would suffer."],
      [15, "Protective Spirit", "You regain hit points at the end of your turn while bloodied in combat."],
      [20, "Emissary of Redemption", "You become resistant to all damage from creatures, and attackers take radiant damage."]
    ],
    "Oath of Glory": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Peerless Athlete", "Channel Divinity to gain advantage on Athletics and Acrobatics and improved jumping and carrying."],
      [3, "Inspiring Smite", "After a Divine Smite, distribute temporary hit points to yourself and nearby allies."],
      [7, "Aura of Alacrity", "You and allies who enter your aura gain increased speed."],
      [15, "Glorious Defense", "Use your reaction to boost an ally's AC and counterattack a foe that missed them."],
      [20, "Living Legend", "Become legendary for a time, gaining bonuses to saves, reliable attacks, and the ability to turn a miss into a hit."]
    ],
    "Oath of the Watchers": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Watcher's Will", "Channel Divinity to give yourself and allies advantage on Intelligence, Wisdom, and Charisma saves."],
      [3, "Abjure the Extraplanar", "Channel Divinity to force aberrations, celestials, elementals, fey, and fiends to flee."],
      [7, "Aura of the Sentinel", "You and allies in your aura gain a bonus to initiative."],
      [15, "Vigilant Rebuke", "When you or a nearby creature succeeds on a mental save, you can deal force damage to the source."],
      [20, "Mortal Bulwark", "Gain truesight and the ability to banish extraplanar creatures you strike for a time."]
    ],
    "Oath of the Open Sea": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Marine Layer", "Channel Divinity to summon a magical fog that obscures the area around you."],
      [3, "Fury of the Tides", "Channel Divinity to add forceful knockback to your weapon strikes for a time."],
      [7, "Aura of Liberation", "You and allies in your aura can't be grappled or restrained and ignore movement reduction."],
      [15, "Stormy Waters", "Creatures provoke a damaging, knockdown reaction when they enter or leave your reach."],
      [20, "Mythic Swashbuckler", "Gain swashbuckling prowess — extra reach, free movement, advantage, and the ability to disengage at will."]
    ]
  },
  "2024": {
    "Oath of Glory": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Peerless Athlete", "As a Channel Divinity option, gain advantage on Athletics and Acrobatics and improved jumping and carrying."],
      [3, "Inspiring Smite", "After you use Divine Smite, distribute temporary hit points to yourself and nearby allies."],
      [7, "Aura of Alacrity", "You and allies who enter your aura gain increased speed."],
      [15, "Glorious Defense", "Use your reaction to boost an ally's AC and counterattack a foe that missed them."],
      [20, "Living Legend", "Become legendary for a time, gaining bonuses to saves, reliable attacks, and the ability to turn a miss into a hit."]
    ],
    "Oath of the Ancients": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Nature's Wrath", "As a Channel Divinity option, ensnare nearby creatures in spectral vines that restrain them."],
      [7, "Aura of Warding", "You and allies within your aura gain resistance to damage from spells."],
      [15, "Undying Sentinel", "When you would drop to 0 hit points, you can stay at 1 instead, and you age slowly."],
      [20, "Elder Champion", "Assume a primal form that heals you, speeds your spellcasting, and weakens enemies' saves."]
    ],
    "Oath of Vengeance": [
      [3, "Oath Spells", "Your oath grants spells that are always prepared at the listed Paladin levels."],
      [3, "Vow of Enmity", "As a Channel Divinity option, gain advantage on attacks against one chosen creature."],
      [7, "Relentless Avenger", "When you hit a creature with an opportunity attack, you can move without provoking attacks."],
      [15, "Soul of Vengeance", "When your Vow of Enmity target attacks, you can use your reaction to strike it."],
      [20, "Avenging Angel", "Sprout wings and emanate an aura of menace that frightens your enemies."]
    ]
  }
});

// ================= Ranger =================
addSubclassFeatures({
  "2014": {
    "Beast Master": [
      [3, "Ranger's Companion", "Gain a loyal beast companion that acts on your command and shares your proficiency bonus."],
      [7, "Exceptional Training", "Your companion can Dash, Disengage, Dodge, or Help as a bonus action, and its attacks count as magical."],
      [11, "Bestial Fury", "Your companion can make two attacks when you command it to attack."],
      [15, "Share Spells", "When you cast a spell on yourself, you can also affect your companion."]
    ],
    "Gloom Stalker": [
      [3, "Dread Ambusher", "On your first turn you gain bonus initiative, extra speed, and an extra attack that deals bonus damage."],
      [3, "Umbral Sight", "You gain darkvision and are invisible to creatures relying on darkvision to see you."],
      [7, "Iron Mind", "You gain proficiency in Wisdom saving throws."],
      [11, "Stalker's Flurry", "When you miss with an attack, you can immediately make another."],
      [15, "Shadowy Dodge", "When a creature attacks you, use your reaction to impose disadvantage and shift through shadow."]
    ],
    "Horizon Walker": [
      [3, "Detect Portal", "You can sense the distance and direction to the nearest planar portal."],
      [3, "Planar Warrior", "As a bonus action, mark a target so your attacks deal force damage to it."],
      [7, "Ethereal Step", "Cast etherealness as a bonus action to briefly slip into the Ethereal Plane."],
      [11, "Distant Strike", "When you take the Attack action, you can teleport between attacks and strike a third foe."],
      [15, "Spectral Defense", "Use your reaction to gain resistance to an attack's damage."]
    ],
    "Monster Slayer": [
      [3, "Hunter's Sense", "As an action, learn a creature's vulnerabilities, resistances, and immunities."],
      [3, "Slayer's Prey", "Mark a creature so your attacks against it deal extra damage."],
      [7, "Supernatural Defense", "When your prey forces you to save or hits you, you gain a bonus to resist it."],
      [11, "Magic-User's Nemesis", "Use your reaction to force a creature to fail a spell or interrupt its teleport."],
      [15, "Slayer's Counter", "When your prey forces you to make a save, you can attack it first and succeed if you hit."]
    ],
    "Fey Wanderer": [
      [3, "Dreadful Strikes", "Your weapon attacks deal extra psychic damage to a creature for a time."],
      [3, "Otherworldly Glamour", "Add your Wisdom modifier to Charisma checks and gain a social skill proficiency."],
      [7, "Beguiling Twist", "You resist being charmed or frightened and can redirect such effects to another creature."],
      [11, "Fey Reinforcements", "You always have summon fey prepared and can cast it once per long rest for free."],
      [15, "Misty Wanderer", "Cast misty step a few times per long rest without a slot, bringing a willing ally along."]
    ],
    "Swarmkeeper": [
      [3, "Gathered Swarm", "A swarm of nature spirits aids your attacks, dealing extra damage and moving foes or yourself."],
      [3, "Swarmkeeper Magic", "You learn mage hand and gain swarm-themed always-prepared spells."],
      [7, "Writhing Tide", "Your swarm lifts you, granting a short flying speed."],
      [11, "Mighty Swarm", "Your swarm grows stronger, improving its damage and the effects it imposes."],
      [15, "Swarming Dispersal", "When hit, your swarm can teleport you a short distance and grant resistance."]
    ],
    "Drakewarden": [
      [3, "Draconic Gift", "You learn the thaumaturgy cantrip and can understand and be understood by dragons."],
      [3, "Drake Companion", "Summon a loyal drake that fights beside you and shares your proficiency bonus."],
      [7, "Bond of Fang and Scale", "Your drake grows, can be ridden, gains a damage resistance, and empowers your attacks."],
      [11, "Drake's Breath", "Your drake exhales a breath weapon of acid, cold, fire, lightning, or poison."],
      [15, "Perfected Bond", "Your drake becomes larger and tougher, and you both gain benefits while near each other."]
    ]
  },
  "2024": {
    "Beast Master": [
      [3, "Primal Companion", "Summon a primal beast companion of land, sea, or sky that obeys you and scales with your level."],
      [7, "Exceptional Training", "Your companion can Dash, Disengage, Dodge, or Help as a bonus action, and its attacks count as magical."],
      [11, "Bestial Fury", "Your companion can make two attacks when you command it to attack."],
      [15, "Share Spells", "When you cast a spell on yourself, you can also affect your companion."]
    ],
    "Fey Wanderer": [
      [3, "Dreadful Strikes", "Your weapon attacks deal extra psychic damage to a creature for a time."],
      [3, "Otherworldly Glamour", "Add your Wisdom modifier to Charisma checks and gain a social skill proficiency."],
      [7, "Beguiling Twist", "You resist being charmed or frightened and can redirect such effects to another creature."],
      [11, "Fey Reinforcements", "You always have summon fey prepared and can cast it once per long rest for free."],
      [15, "Misty Wanderer", "Cast misty step a few times per long rest without a slot, bringing a willing ally along."]
    ],
    "Gloom Stalker": [
      [3, "Dread Ambusher", "On your first turn you gain bonus initiative, extra speed, and an extra attack that deals bonus damage."],
      [3, "Umbral Sight", "You gain darkvision and are invisible to creatures relying on darkvision to see you."],
      [7, "Iron Mind", "You gain proficiency in Wisdom saving throws."],
      [11, "Stalker's Flurry", "When you miss with an attack, you can immediately make another."],
      [15, "Shadowy Dodge", "When a creature attacks you, use your reaction to impose disadvantage and shift through shadow."]
    ]
  }
});

// ================= Fighter (Banneret) =================
addSubclassFeatures({
  "2024": {
    "Banneret": [
      [3, "Rallying Cry", "When you use Second Wind, you also restore hit points to nearby allies."],
      [7, "Royal Envoy", "You gain expertise in Persuasion and learn an additional language."],
      [10, "Inspiring Surge", "When you Action Surge, an ally you can see can also make a weapon attack."],
      [15, "Bulwark", "When you use Indomitable, a nearby ally can also reroll a failed saving throw."]
    ]
  }
});

// ================= Rogue =================
addSubclassFeatures({
  "2014": {
    "Arcane Trickster": [
      [3, "Spellcasting", "You learn wizard spells, focused on enchantment and illusion, using Intelligence."],
      [3, "Mage Hand Legerdemain", "Your invisible mage hand can pick locks, pick pockets, and carry out subtle tasks."],
      [9, "Magical Ambush", "A creature has disadvantage on its save against a spell you cast while hidden from it."],
      [13, "Versatile Trickster", "Use your mage hand to distract a creature, gaining advantage on attacks against it."],
      [17, "Spell Thief", "When a creature casts a spell at you, you can try to steal knowledge of that spell for a time."]
    ],
    "Assassin": [
      [3, "Bonus Proficiencies", "You gain proficiency with the disguise kit and the poisoner's kit."],
      [3, "Assassinate", "You have advantage against creatures that haven't acted, and your hits on surprised creatures are critical."],
      [9, "Infiltration Expertise", "You can establish a believable false identity over time."],
      [13, "Impostor", "You can unerringly mimic another creature's speech, writing, and behavior."],
      [17, "Death Strike", "When you hit a surprised creature, it must save or take double damage."]
    ],
    "Mastermind": [
      [3, "Master of Intrigue", "You can mimic speech patterns and accents and gain disguise and forgery proficiency."],
      [3, "Master of Tactics", "You can use the Help action as a bonus action and from a distance."],
      [9, "Insightful Manipulator", "Studying a creature reveals how its capabilities compare to your own."],
      [13, "Misdirection", "When attacked, you can redirect the attack to a creature providing you cover."],
      [17, "Soul of Deceit", "Your thoughts can't be read, and you can present false thoughts to mind-reading magic."]
    ],
    "Swashbuckler": [
      [3, "Fancy Footwork", "After you attack a creature in melee, it can't make opportunity attacks against you that turn."],
      [3, "Rakish Audacity", "Add Charisma to your initiative, and you can Sneak Attack while dueling a foe one-on-one."],
      [9, "Panache", "A charming or taunting remark can captivate a creature or goad it into focusing on you."],
      [13, "Elegant Maneuver", "Use a bonus action to gain advantage on your next acrobatic or athletic check."],
      [17, "Master Duelist", "When you miss an attack, you can reroll it with advantage."]
    ],
    "Inquisitive": [
      [3, "Ear for Deceit", "Your Insight checks to detect lies never fall below a set minimum."],
      [3, "Eye for Detail", "Use a bonus action to spot hidden creatures or study clues."],
      [3, "Insightful Fighting", "Study a creature so you can Sneak Attack it even without advantage for a time."],
      [9, "Steady Eye", "You have advantage on Perception and Investigation checks if you move slowly on your turn."],
      [13, "Unerring Eye", "Sense the presence of illusions, shapechangers, and other deceptions nearby."],
      [17, "Eye for Weakness", "While using Insightful Fighting, your Sneak Attack against that creature deals extra damage."]
    ],
    "Scout": [
      [3, "Skirmisher", "When an enemy ends its turn next to you, you can move away as a reaction without provoking."],
      [3, "Survivalist", "You gain expertise in the Nature and Survival skills."],
      [9, "Superior Mobility", "Your walking speed increases."],
      [13, "Ambush Master", "When you hit a creature on your first turn, your allies gain advantage against it."],
      [17, "Sudden Strike", "You can make a second Sneak Attack against a different creature using a bonus-action attack."]
    ],
    "Phantom": [
      [3, "Whispers of the Dead", "After a rest, gain any skill or tool proficiency, drawing on the knowledge of the dead."],
      [3, "Wails from the Grave", "When you Sneak Attack a creature, a second creature nearby also takes necrotic damage."],
      [9, "Tokens of the Departed", "When a creature dies near you, collect a soul trinket that aids your saves and your Wails from the Grave."],
      [13, "Ghost Walk", "Assume a ghostly form to fly, move through creatures, and become harder to hit."],
      [17, "Death's Friend", "Your Wails from the Grave triggers with every Sneak Attack, and your soul trinkets grow more potent."]
    ],
    "Soulknife": [
      [3, "Psionic Power", "You have a pool of Psionic Energy dice that fuel your subclass's special psionic talents."],
      [3, "Psychic Blades", "Manifest shimmering psychic blades you can attack with at range or in melee, including as a bonus action."],
      [9, "Soul Blades", "Spend Psionic Energy to home a missed blade onto its target or to teleport before attacking."],
      [13, "Psychic Veil", "Turn invisible for a time by clouding nearby minds."],
      [17, "Rend Mind", "When you Sneak Attack a creature with a psychic blade, you can stun it."]
    ]
  },
  "2024": {
    "Arcane Trickster": [
      [3, "Spellcasting", "You learn wizard spells, focused on enchantment and illusion, using Intelligence."],
      [3, "Mage Hand Legerdemain", "Your invisible mage hand can pick locks, pick pockets, and carry out subtle tasks."],
      [9, "Magical Ambush", "A creature has disadvantage on its save against a spell you cast while hidden from it."],
      [13, "Versatile Trickster", "Use your mage hand to distract a creature, gaining advantage on attacks against it."],
      [17, "Spell Thief", "When a creature casts a spell at you, you can try to steal knowledge of that spell for a time."]
    ],
    "Assassin": [
      [3, "Assassinate", "You have advantage against creatures that haven't acted, and you deal extra damage to anyone you surprise."],
      [3, "Assassin's Tools", "You gain a disguise kit and a poisoner's kit and proficiency with both."],
      [9, "Infiltration Expertise", "You can craft and maintain believable false identities."],
      [13, "Envenom Weapons", "When you deal Sneak Attack damage, you can add poison damage to the hit."],
      [17, "Death Strike", "When you hit a creature that is surprised, it must save or take double damage."]
    ],
    "Soulknife": [
      [3, "Psionic Power", "You have a pool of Psionic Energy dice that fuel your subclass's special psionic talents."],
      [3, "Psychic Blades", "Manifest shimmering psychic blades you can attack with at range or in melee, including as a bonus action."],
      [9, "Soul Blades", "Spend Psionic Energy to home a missed blade onto its target or to teleport before attacking."],
      [13, "Psychic Veil", "Turn invisible for a time by clouding nearby minds."],
      [17, "Rend Mind", "When you Sneak Attack a creature with a psychic blade, you can stun it."]
    ]
  }
});

// ================= Artificer =================
addSubclassFeatures({
  "2014": {
    "Alchemist": [
      [3, "Tool Proficiency", "You gain proficiency with alchemist's supplies (or your specialty's tools)."],
      [3, "Experimental Elixir", "After a long rest, brew magical elixirs with random or chosen beneficial effects."],
      [5, "Alchemical Savant", "Add your Intelligence modifier to one roll of any spell that heals or deals acid, fire, necrotic, or poison damage."],
      [9, "Restorative Reagents", "Your elixirs also grant temporary hit points, and you can cast lesser restoration without a slot."],
      [15, "Chemical Mastery", "You resist acid and poison, ignore the poisoned condition, and can cast greater restoration and heal."]
    ],
    "Armorer": [
      [3, "Tools of the Trade", "You gain proficiency with heavy armor and smith's tools."],
      [3, "Arcane Armor", "Turn a suit of armor into magical armor you can don quickly and that needs no Strength."],
      [3, "Armor Model", "Customize your Arcane Armor as a Guardian melee model or an Infiltrator ranged-and-stealth model."],
      [5, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [9, "Armor Modifications", "Your infused armor counts as several items, letting you load it with extra infusions."],
      [15, "Perfected Armor", "Your Guardian or Infiltrator model gains a powerful new capability."]
    ],
    "Artillerist": [
      [3, "Tool Proficiency", "You gain proficiency with woodcarver's tools (or your specialty's tools)."],
      [3, "Eldritch Cannon", "Create a small magical cannon that can blast foes, launch flame, or protect allies."],
      [5, "Arcane Firearm", "Channel your magic through a wand or rod to add damage to your artificer spells."],
      [9, "Explosive Cannon", "Your cannon deals more damage and can be detonated in a fiery burst."],
      [15, "Fortified Position", "You can have two cannons at once, and allies near a cannon gain half cover."]
    ],
    "Battle Smith": [
      [3, "Battle Ready", "You gain martial weapon training and can use Intelligence for attacks with magic weapons."],
      [3, "Steel Defender", "Build a loyal mechanical companion that protects allies and fights at your command."],
      [5, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [9, "Arcane Jolt", "Spend magical energy to deal extra force damage or heal when you or your defender hits."],
      [15, "Improved Defender", "Your Arcane Jolt grows stronger and your Steel Defender gains better defenses and a deflecting reaction."]
    ]
  },
  "2024": {
    "Alchemist": [
      [3, "Tool Proficiency", "You gain proficiency with alchemist's supplies (or your specialty's tools)."],
      [3, "Experimental Elixir", "After a long rest, brew magical elixirs with random or chosen beneficial effects."],
      [5, "Alchemical Savant", "Add your Intelligence modifier to one roll of any spell that heals or deals acid, fire, necrotic, or poison damage."],
      [9, "Restorative Reagents", "Your elixirs also grant temporary hit points, and you can cast lesser restoration without a slot."],
      [15, "Chemical Mastery", "You resist acid and poison, ignore the poisoned condition, and can cast greater restoration and heal."]
    ],
    "Armorer": [
      [3, "Tools of the Trade", "You gain proficiency with heavy armor and smith's tools."],
      [3, "Arcane Armor", "Turn a suit of armor into magical armor you can don quickly and that needs no Strength."],
      [3, "Armor Model", "Customize your Arcane Armor as a Guardian melee model or an Infiltrator ranged-and-stealth model."],
      [5, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [9, "Armor Modifications", "Your infused armor counts as several items, letting you load it with extra infusions."],
      [15, "Perfected Armor", "Your Guardian or Infiltrator model gains a powerful new capability."]
    ],
    "Artillerist": [
      [3, "Tool Proficiency", "You gain proficiency with woodcarver's tools (or your specialty's tools)."],
      [3, "Eldritch Cannon", "Create a small magical cannon that can blast foes, launch flame, or protect allies."],
      [5, "Arcane Firearm", "Channel your magic through a wand or rod to add damage to your artificer spells."],
      [9, "Explosive Cannon", "Your cannon deals more damage and can be detonated in a fiery burst."],
      [15, "Fortified Position", "You can have two cannons at once, and allies near a cannon gain half cover."]
    ],
    "Battle Smith": [
      [3, "Battle Ready", "You gain martial weapon training and can use Intelligence for attacks with magic weapons."],
      [3, "Steel Defender", "Build a loyal mechanical companion that protects allies and fights at your command."],
      [5, "Extra Attack", "You can attack twice, instead of once, whenever you take the Attack action on your turn."],
      [9, "Arcane Jolt", "Spend magical energy to deal extra force damage or heal when you or your defender hits."],
      [15, "Improved Defender", "Your Arcane Jolt grows stronger and your Steel Defender gains better defenses and a deflecting reaction."]
    ]
  }
});

// ================= Blood Hunter (Critical Role) =================
addSubclassFeatures({
  "2014": {
    "Order of the Ghostslayer": [
      [3, "Rite of the Dawn", "You learn a special Crimson Rite that deals radiant damage and is especially potent against undead."],
      [7, "Curse Specialist", "You gain an extra use of Blood Maledict and can deliver your blood curses at range."],
      [11, "Dark Velocity", "While a Crimson Rite is active, your speed increases and your ranged rites carry farther."],
      [15, "Brand of Sundering", "Your Brand of Castigation hampers regeneration and lets you ignore some of the target's resistance."],
      [18, "Blood Curse of the Exorcist", "You learn a blood curse that frees a creature from charm or fear and lashes back at the source."]
    ],
    "Order of the Lycan": [
      [3, "Heightened Senses", "You gain advantage on Perception checks that rely on smell or hearing."],
      [3, "Hybrid Transformation", "Transform into a feral hybrid form with claws, resilience, and a bloodlust you must control."],
      [7, "Stalker's Prowess", "Your jump distance and speed increase, and your hybrid form gains improved reflexes."],
      [11, "Advanced Transformation", "Your hybrid form gains new predatory abilities and stronger natural weapons."],
      [15, "Brand of the Voracious", "Your Brand of Castigation grants you advantage against the branded creature while transformed."],
      [18, "Hybrid Transformation Mastery", "You gain full control of your hybrid form, and its powers reach their peak."]
    ],
    "Order of the Mutant": [
      [3, "Formulas", "You discover mutagen formulas — alchemical concoctions that grant benefits and drawbacks."],
      [3, "Mutagencraft", "Craft and drink mutagens that temporarily reshape your body with chosen boons."],
      [7, "Strange Metabolism", "You gain resistance to poison and can ignore a mutagen's side effect once per rest."],
      [11, "Brand of Axiom", "Your Brand of Castigation reveals and disrupts shapechangers and illusions."],
      [15, "Blood Curse of Corrosion", "You learn a blood curse that poisons a creature and weakens it over time."],
      [18, "Exalted Mutation", "As a bonus action, instantly gain the benefit of a known mutagen."]
    ],
    "Order of the Profane Soul": [
      [3, "Otherworldly Patron", "You gain Pact Magic and a warlock patron, learning a few warlock spells and an expanded list."],
      [3, "Rite Focus", "Your Crimson Rite weapon serves as your spellcasting focus and grants a patron benefit on a hit."],
      [7, "Mystic Frenzy", "When you cast a cantrip, you can make a weapon attack as a bonus action."],
      [7, "Revealed Arcana", "Your patron grants an extra spell that's always available to you."],
      [11, "Brand of the Sapping Scar", "Your Brand of Castigation imposes disadvantage on the target's saves against your spells."],
      [15, "Unsealed Arcana", "Your patron grants higher-level spells you can cast a limited number of times."],
      [18, "Brand Resonance", "When your branded creature is affected, you regain a use of a Blood Hunter feature."]
    ]
  }
});
SUBCLASS_FEATURES["2024"]["Order of the Ghostslayer"] = SUBCLASS_FEATURES["2014"]["Order of the Ghostslayer"];
SUBCLASS_FEATURES["2024"]["Order of the Lycan"] = SUBCLASS_FEATURES["2014"]["Order of the Lycan"];
SUBCLASS_FEATURES["2024"]["Order of the Mutant"] = SUBCLASS_FEATURES["2014"]["Order of the Mutant"];
SUBCLASS_FEATURES["2024"]["Order of the Profane Soul"] = SUBCLASS_FEATURES["2014"]["Order of the Profane Soul"];

// ================= Third-party / newest-source subclasses =================
// These come from Critical Role's Tal'Dorei setting or 2024-25 books whose exact
// per-level features aren't reproduced here. Each gets one honest, sourced concept
// description so selecting it is informative; full per-level features can be added
// later from the relevant sourcebook.
addSubclassFeatures({
  "2014": {
    "Blood Domain": [[1, "Blood Domain", "A Cleric domain of blood, sacrifice, and the life force of others (Critical Role: Tal'Dorei Reborn). Its full per-level features come from that sourcebook."]],
    "Moon Domain": [[1, "Moon Domain", "A Cleric domain drawing on lunar cycles, light, and shifting fortune (Critical Role: Tal'Dorei Reborn). Its full per-level features come from that sourcebook."]],
    "Circle of the Blighted": [[2, "Circle of the Blighted", "A Druid circle channeling decay and the corrupted growth of blighted lands (Critical Role: Tal'Dorei Reborn). Its full per-level features come from that sourcebook."]],
    "Runechild": [[1, "Runechild", "A Sorcerer origin marked by glowing arcane runes etched into the body (Critical Role: Tal'Dorei Reborn). Its full per-level features come from that sourcebook."]],
    "Blood Magic": [[2, "Blood Magic", "A Wizard tradition of hemocraft that fuels spells with the caster's own vitality (Critical Role: Tal'Dorei Reborn). Its full per-level features come from that sourcebook."]]
  },
  "2024": {
    "College of the Moon": [[3, "College of the Moon", "A Bard college tied to moonlight, night, and revelry (Forgotten Realms: Heroes of Faerûn). Its full per-level features come from that sourcebook."]],
    "Knowledge Domain": [[3, "Knowledge Domain", "A Cleric domain of secrets, memory, and lore in its 2024 Forgotten Realms incarnation. Its full per-level features come from that sourcebook."]],
    "Oath of the Noble Genies": [[3, "Oath of the Noble Genies", "A Paladin oath sworn to the majesty and law of the noble genies (Forgotten Realms: Heroes of Faerûn). Its full per-level features come from that sourcebook."]],
    "Winter Walker": [[3, "Winter Walker", "A Ranger subclass mastering cold, ice, and survival in frozen wilds (Forgotten Realms: Heroes of Faerûn). Its full per-level features come from that sourcebook."]],
    "Scion of the Three": [[3, "Scion of the Three", "A Rogue subclass devoted to the Dead Three — Bane, Bhaal, and Myrkul (Forgotten Realms: Heroes of Faerûn). Its full per-level features come from that sourcebook."]],
    "Spellfire Sorcery": [[3, "Spellfire Sorcery", "A Sorcerer origin wielding the rare, raw power of spellfire (Forgotten Realms: Heroes of Faerûn). Its full per-level features come from that sourcebook."]],
    "Cartographer": [[3, "Cartographer", "An Artificer specialist who charts and manipulates space and travel (Eberron: Forge of the Artificer). Its full per-level features come from that sourcebook."]]
  }
});
