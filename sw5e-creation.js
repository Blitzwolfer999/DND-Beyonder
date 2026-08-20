// SW5E creation content — brings the Star Wars setting up to parity with the
// D&D one for the Quick Build, Prebuild and Theme Builder paths.
//
// Every class, archetype, species, background, power and item referenced here
// exists in sw5e-content.js. Role/tagline/playstyle copy is original.

// ---- Quick Build profiles (one per SW5E class) ----
const SW5E_QUICK_BUILD_PROFILES = {
  Berserker: {
    role: "Raging front-line bruiser", tagline: "Wade in swinging and shrug off what comes back.",
    abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
    skills: ["Athletics", "Perception", "Survival", "Intimidation"],
    backgrounds: { sw5e: "Mercenary" },
    equipment: ["Vibroaxe", "Vibroblade", "Combat suit", "Backpack"],
    masteries: ["Vibroaxe", "Vibroblade"]
  },
  Consular: {
    role: "Dedicated force caster", tagline: "Shape the Force to control, mend, and overwhelm.",
    abilities: ["WIS", "CON", "DEX", "CHA", "INT", "STR"],
    skills: ["Insight", "Persuasion", "Lore", "Medicine"],
    backgrounds: { sw5e: "Jedi" },
    equipment: ["Lightsaber", "Combat suit", "Backpack", "Medpac"],
    powers: ["Affect Mind", "Force Push/Pull", "Guidance", "Saber Ward",
             "Battle Precognition", "Burst of Speed", "Cloud Mind", "Force Body", "Slow Descent"]
  },
  Engineer: {
    role: "Tech specialist and inventor", tagline: "Build, hack, and deploy the right tool for every problem.",
    abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
    skills: ["Technology", "Investigation", "Lore", "Piloting"],
    backgrounds: { sw5e: "Engineer" },
    equipment: ["Blaster pistol", "Combat suit", "Security kit", "Backpack"],
    powers: ["Analyze", "Alarm", "Bacta Pack", "Adrenaline", "Absorb Energy", "Barrage"]
  },
  Fighter: {
    role: "Versatile combat specialist", tagline: "Master any weapon and outlast anyone in a firefight.",
    abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
    skills: ["Athletics", "Perception", "Intimidation", "Piloting"],
    backgrounds: { sw5e: "Soldier" },
    equipment: ["Blaster rifle", "Vibrosword", "Battle armor", "Backpack"],
    masteries: ["Vibrosword", "Blaster rifle"]
  },
  Guardian: {
    role: "Lightsaber duelist", tagline: "Stand between your allies and the blaster bolt.",
    abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"],
    skills: ["Athletics", "Insight", "Perception", "Lore"],
    backgrounds: { sw5e: "Jedi" },
    equipment: ["Lightsaber", "Combat suit", "Backpack", "Medpac"],
    powers: ["Saber Ward", "Force Push/Pull", "Battle Precognition", "Burst of Speed", "Force Body"]
  },
  Monk: {
    role: "Unarmed martial artist", tagline: "Strike faster than anyone can track and never stop moving.",
    abilities: ["DEX", "WIS", "CON", "STR", "CHA", "INT"],
    skills: ["Acrobatics", "Athletics", "Insight", "Stealth"],
    backgrounds: { sw5e: "Jedi" },
    equipment: ["Vibroblade", "Combat suit", "Backpack"],
    masteries: ["Vibroblade"]
  },
  Operative: {
    role: "Precision skirmisher and scoundrel", tagline: "Strike from the shadows and talk your way out of the rest.",
    abilities: ["DEX", "CON", "INT", "WIS", "CHA", "STR"],
    skills: ["Stealth", "Deception", "Sleight of Hand", "Perception"],
    backgrounds: { sw5e: "Smuggler" },
    equipment: ["Blaster pistol", "Vibroblade", "Combat suit", "Security kit"],
    masteries: ["Blaster pistol", "Vibroblade"]
  },
  Scholar: {
    role: "Field expert and support", tagline: "Know the answer, patch the wounded, and outthink the fight.",
    abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
    skills: ["Lore", "Medicine", "Investigation", "Technology"],
    backgrounds: { sw5e: "Agent" },
    equipment: ["Blaster pistol", "Combat suit", "Medpac", "Backpack"]
  },
  Scout: {
    role: "Tracker and ranged hunter", tagline: "Find the target, mark it, and take the shot.",
    abilities: ["DEX", "WIS", "CON", "INT", "CHA", "STR"],
    skills: ["Survival", "Perception", "Stealth", "Nature"],
    backgrounds: { sw5e: "Bounty Hunter" },
    equipment: ["Blaster rifle", "Vibroblade", "Combat suit", "Backpack"],
    powers: ["Analyze", "Alarm", "Adrenaline", "Bacta Pack"]
  },
  Sentinel: {
    role: "Force-blade hybrid", tagline: "Blend saber work with the Force and hunt what hides.",
    abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
    skills: ["Stealth", "Insight", "Perception", "Lore"],
    backgrounds: { sw5e: "Jedi" },
    equipment: ["Lightsaber", "Combat suit", "Backpack", "Security kit"],
    powers: ["Saber Ward", "Force Push/Pull", "Affect Mind", "Burst of Speed", "Battle Precognition"]
  }
};

// ---- Premade heroes ----
const SW5E_PREMADE_HEROES = [
  { key: "sw-kessari", name: "Vel Kessari", className: "Guardian", species: "Human", background: "Jedi",
    role: "Defender", pitch: "A saber duelist who plants herself between the party and the blaster fire.",
    level: 1, subclass: "Ataru Form" },
  { key: "sw-tavrin", name: "Tavrin Oss", className: "Consular", species: "Twi'lek", background: "Jedi",
    role: "Force caster", pitch: "A calm adept with control powers, healing, and answers.",
    level: 1, subclass: "Way of Balance" },
  { key: "sw-rix", name: "Rix Danvo", className: "Operative", species: "Rodian", background: "Smuggler",
    role: "Scout", pitch: "A quick scoundrel who picks locks, reads rooms, and shoots first.",
    level: 1, subclass: "Beguiler Practice" },
  { key: "sw-hakkar", name: "Hakkar", className: "Berserker", species: "Wookiee", background: "Mercenary",
    role: "Bruiser", pitch: "A towering brawler who answers every problem with a vibroaxe.",
    level: 1, subclass: "Armored Approach" },
  { key: "sw-sena", name: "Sena Vek", className: "Engineer", species: "Chiss", background: "Engineer",
    role: "Tech specialist", pitch: "A builder who slices doors, deploys gadgets, and rewires the fight.",
    level: 1, subclass: "Armstech Engineering" },
  { key: "sw-doshan", name: "Doshan Ka", className: "Scout", species: "Zabrak", background: "Bounty Hunter",
    role: "Ranged hunter", pitch: "A tracker who marks a target and rarely misses twice.",
    level: 1, subclass: "Deadeye Technique" }
];

// ---- Themes ----
const SW5E_CHARACTER_THEMES = [
  {
    id: "sw-jedi", name: "Jedi", icon: "JED", setting: "starwars",
    description: "Wield a lightsaber and the light side of the Force.",
    aliases: ["lightsaber", "force user", "light side", "padawan", "knight"],
    branches: [
      { className: "Guardian", subclasses: { sw5e: "Ataru Form" }, title: "Jedi Guardian",
        playstyle: "A saber duelist who soaks damage and protects the party.",
        abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"],
        skills: ["Athletics", "Insight", "Perception", "Lore"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Saber Ward", "Force Push/Pull", "Battle Precognition", "Burst of Speed"] },
      { className: "Consular", subclasses: { sw5e: "Way of Balance" }, title: "Jedi Consular",
        playstyle: "A full force caster focused on control, insight, and healing.",
        abilities: ["WIS", "CON", "DEX", "CHA", "INT", "STR"],
        skills: ["Insight", "Persuasion", "Lore", "Medicine"],
        equipment: ["Lightsaber", "Combat suit", "Medpac"],
        spells: ["Affect Mind", "Guidance", "Force Push/Pull", "Cloud Mind", "Force Body"] },
      { className: "Sentinel", subclasses: { sw5e: "Path of Focus" }, title: "Jedi Sentinel",
        playstyle: "A stealthy blade who mixes saber work with Force techniques.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Stealth", "Insight", "Perception", "Lore"],
        equipment: ["Lightsaber", "Combat suit", "Security kit"],
        spells: ["Saber Ward", "Affect Mind", "Burst of Speed", "Battle Precognition"] }
    ]
  },
  {
    id: "sw-sith", name: "Sith", icon: "SIT", setting: "starwars",
    description: "Draw on the dark side for power, fear, and domination.",
    aliases: ["dark side", "sith lord", "inquisitor", "darth", "villain"],
    branches: [
      { className: "Consular", subclasses: { sw5e: "Way of Lightning" }, title: "Sith Sorcerer",
        playstyle: "A dark-side caster built around lightning, fear, and control.",
        abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
        skills: ["Intimidation", "Deception", "Lore", "Insight"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Enfeeble", "Force Push/Pull", "Affect Mind", "Curse", "Dark Side Tendrils"] },
      { className: "Guardian", subclasses: { sw5e: "Juyo/Vaapad Form" }, title: "Sith Warrior",
        playstyle: "An aggressive duelist who feeds on the fury of the fight.",
        abilities: ["STR", "CON", "CHA", "DEX", "WIS", "INT"],
        skills: ["Athletics", "Intimidation", "Perception", "Lore"],
        equipment: ["Lightsaber", "Battle armor", "Backpack"],
        spells: ["Saber Ward", "Force Push/Pull", "Enfeeble", "Burst of Speed"] }
    ]
  },
  {
    id: "sw-bounty", name: "Bounty Hunter", icon: "BTY", setting: "starwars",
    description: "Track a mark across the galaxy and bring it in — or not.",
    aliases: ["mandalorian", "hunter", "mercenary", "tracker", "gunslinger"],
    branches: [
      { className: "Scout", subclasses: { sw5e: "Deadeye Technique" }, title: "Deadeye Hunter",
        playstyle: "A ranged specialist who marks a target and drops it at distance.",
        abilities: ["DEX", "WIS", "CON", "INT", "CHA", "STR"],
        skills: ["Survival", "Perception", "Stealth", "Piloting"],
        equipment: ["Blaster rifle", "Vibroblade", "Combat suit"],
        spells: ["Analyze", "Alarm", "Adrenaline"] },
      { className: "Fighter", subclasses: { sw5e: "Assault Specialist" }, title: "Armored Mercenary",
        playstyle: "A heavily armored gun platform who wins by attrition.",
        abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
        skills: ["Athletics", "Intimidation", "Perception", "Piloting"],
        equipment: ["Blaster rifle", "Battle armor", "Backpack"] }
    ]
  },
  {
    id: "sw-smuggler", name: "Smuggler", icon: "SMG", setting: "starwars",
    description: "Fast ship, faster mouth, and a blaster for the rest.",
    aliases: ["scoundrel", "pilot", "rogue", "pirate", "outlaw", "thief"],
    branches: [
      { className: "Operative", subclasses: { sw5e: "Beguiler Practice" }, title: "Scoundrel",
        playstyle: "A precision striker who talks, sneaks, and shoots first.",
        abilities: ["DEX", "CHA", "CON", "INT", "WIS", "STR"],
        skills: ["Deception", "Stealth", "Sleight of Hand", "Piloting"],
        equipment: ["Blaster pistol", "Vibroblade", "Combat suit", "Security kit"] },
      { className: "Scholar", subclasses: { sw5e: "Explorer Pursuit" }, title: "Fixer",
        playstyle: "A resourceful expert who solves problems before they start.",
        abilities: ["INT", "DEX", "CON", "CHA", "WIS", "STR"],
        skills: ["Lore", "Investigation", "Technology", "Persuasion"],
        equipment: ["Blaster pistol", "Combat suit", "Medpac"] }
    ]
  },
  {
    id: "sw-tech", name: "Technician", icon: "TEC", setting: "starwars",
    description: "Slice systems, build gadgets, and let the droids do the rest.",
    aliases: ["engineer", "slicer", "hacker", "droid", "mechanic", "inventor"],
    branches: [
      { className: "Engineer", subclasses: { sw5e: "Armstech Engineering" }, title: "Armstech Engineer",
        playstyle: "A tech caster who builds weapons and controls the battlefield.",
        abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
        skills: ["Technology", "Investigation", "Lore", "Piloting"],
        equipment: ["Blaster pistol", "Combat suit", "Security kit"],
        spells: ["Analyze", "Alarm", "Barrage", "Absorb Energy"] },
      { className: "Engineer", subclasses: { sw5e: "Astrotech Engineering" }, title: "Astrotech Engineer",
        playstyle: "A droid-focused builder with a companion and constant utility.",
        abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
        skills: ["Technology", "Piloting", "Investigation", "Lore"],
        equipment: ["Blaster pistol", "Combat suit", "Backpack"],
        spells: ["Aid Droid", "Analyze", "Bacta Pack", "Adrenaline"] }
    ]
  },
  {
    id: "sw-soldier", name: "Soldier", icon: "SLD", setting: "starwars",
    description: "Discipline, armor, and overwhelming fire.",
    aliases: ["trooper", "commando", "clone", "veteran", "marine"],
    branches: [
      { className: "Fighter", subclasses: { sw5e: "Assault Specialist" }, title: "Assault Trooper",
        playstyle: "A durable weapon user who keeps firing when others break.",
        abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
        skills: ["Athletics", "Perception", "Intimidation", "Piloting"],
        equipment: ["Blaster rifle", "Battle armor", "Backpack"] },
      { className: "Berserker", subclasses: { sw5e: "Armored Approach" }, title: "Shock Trooper",
        playstyle: "A raging melee specialist who closes distance and breaks lines.",
        abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
        skills: ["Athletics", "Intimidation", "Survival", "Perception"],
        equipment: ["Vibroaxe", "Battle armor", "Backpack"] }
    ]
  }
];

// ---- Legends-era themes ----
// Drawn from the Expanded Universe: the Old Republic and Rise of the Empire on
// one side, the Rebellion through the Legacy era on the other. Every archetype,
// species, background and power referenced below exists in the SW5E data.
const SW5E_LEGENDS_THEMES = [
  // ===== Before the films =====
  {
    id: "sw-jedi-shadow", name: "Jedi Shadow", icon: "SHD", setting: "starwars", era: "Old Republic",
    description: "Hunt Sith relics and dark-side cults in the quiet places the Order won't go.",
    aliases: ["shadow", "jedi covert", "relic hunter", "dark side hunter", "sentinel"],
    branches: [
      { className: "Sentinel", subclasses: { sw5e: "Path of Shadows" }, title: "Order Shadow",
        playstyle: "A stealthy saber user who erases traces and strikes from concealment.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Stealth", "Perception", "Lore", "Investigation"],
        equipment: ["Lightsaber", "Combat suit", "Security kit"],
        spells: ["Cloud Mind", "Force Camouflage", "Affect Mind", "Burst of Speed", "Sense Force"] },
      { className: "Operative", subclasses: { sw5e: "Shadow Killer Practice" }, title: "Covert Operative",
        playstyle: "An infiltrator who removes a target before anyone knows they were there.",
        abilities: ["DEX", "INT", "CON", "WIS", "CHA", "STR"],
        skills: ["Stealth", "Deception", "Investigation", "Perception"],
        equipment: ["Vibroblade", "Blaster pistol", "Combat suit", "Security kit"] }
    ]
  },
  {
    id: "sw-inquisitor", name: "Sith Inquisitor", icon: "INQ", setting: "starwars", era: "Old Republic",
    description: "Tear secrets from the unwilling and bend the weak to your will.",
    aliases: ["inquisitor", "sith sorcerer", "interrogator", "dark council", "lightning"],
    branches: [
      { className: "Consular", subclasses: { sw5e: "Way of Manipulation" }, title: "Sith Sorcerer",
        playstyle: "A dark-side caster who dominates minds and burns foes with lightning.",
        abilities: ["CHA", "CON", "DEX", "WIS", "INT", "STR"],
        skills: ["Intimidation", "Deception", "Lore", "Persuasion"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Affect Mind", "Enfeeble", "Force Lightning", "Curse", "Dark Aura", "Drain Life"] },
      { className: "Scout", subclasses: { sw5e: "Inquisitor Technique" }, title: "Sith Interrogator",
        playstyle: "A relentless hunter who marks a quarry and breaks it down.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Intimidation", "Perception", "Investigation", "Survival"],
        equipment: ["Blaster rifle", "Vibroblade", "Combat suit"] }
    ]
  },
  {
    id: "sw-mandalorian", name: "Mandalorian Crusader", icon: "MND", setting: "starwars", era: "Old Republic",
    description: "Armor, honour, and a war worth fighting — the creed of the Neo-Crusaders.",
    aliases: ["mandalore", "neo-crusader", "beskar", "clan warrior", "heavy armor"],
    branches: [
      { className: "Fighter", subclasses: { sw5e: "Heavy Weapons Specialist" }, title: "Crusader Heavy",
        playstyle: "A walking weapons platform in sealed armour.",
        abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
        skills: ["Athletics", "Intimidation", "Perception", "Piloting"],
        equipment: ["Assault cannon", "Battle armor", "Backpack"] },
      { className: "Berserker", subclasses: { sw5e: "Warchief Approach" }, title: "Clan Warchief",
        playstyle: "A front-line leader who drags the whole squad forward.",
        abilities: ["STR", "CON", "CHA", "DEX", "WIS", "INT"],
        skills: ["Athletics", "Intimidation", "Survival", "Perception"],
        equipment: ["Vibroaxe", "Battle armor", "Backpack"] }
    ]
  },
  {
    id: "sw-nightsister", name: "Nightsister", icon: "NSR", setting: "starwars", era: "Rise of the Empire",
    description: "Dathomiri witchcraft — spirit magic, rancor lore, and old grudges.",
    aliases: ["dathomir", "witch", "spirit magic", "clan mother", "nightsisters"],
    branches: [
      { className: "Sentinel", subclasses: { sw5e: "Path of Witchcraft" }, title: "Dathomiri Witch",
        playstyle: "A spellblade who binds spirits and fights alongside them.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Nature", "Survival", "Lore", "Intimidation"],
        equipment: ["Vibroblade", "Combat suit", "Backpack"],
        spells: ["Curse", "Enfeeble", "Dark Aura", "Affect Mind", "Force Camouflage"] },
      { className: "Monk", subclasses: { sw5e: "Nightsister Order" }, title: "Nightsister Initiate",
        playstyle: "A fast, unarmoured warrior channelling Dathomiri rites.",
        abilities: ["DEX", "WIS", "CON", "CHA", "STR", "INT"],
        skills: ["Acrobatics", "Nature", "Stealth", "Survival"],
        equipment: ["Vibroblade", "Combat suit", "Backpack"] }
    ]
  },
  {
    id: "sw-teras-kasi", name: "Teräs Käsi Adept", icon: "TKA", setting: "starwars", era: "Old Republic",
    description: "The steel hand — an unarmed art built to kill Force users.",
    aliases: ["teras kasi", "echani", "martial artist", "unarmed", "steel hand", "duelist"],
    branches: [
      { className: "Monk", subclasses: { sw5e: "Teras Kasi Order" }, title: "Steel Hand",
        playstyle: "An unarmed specialist trained to close with and disrupt casters.",
        abilities: ["DEX", "WIS", "CON", "STR", "CHA", "INT"],
        skills: ["Acrobatics", "Athletics", "Insight", "Perception"],
        equipment: ["Vibroblade", "Combat suit", "Backpack"] },
      { className: "Monk", subclasses: { sw5e: "Echani Order" }, title: "Echani Duelist",
        playstyle: "A dueling tradition that reads an opponent through combat itself.",
        abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
        skills: ["Acrobatics", "Insight", "Perception", "Athletics"],
        equipment: ["Vibrosword", "Combat suit", "Backpack"] }
    ]
  },
  {
    id: "sw-baran-do", name: "Baran Do Sage", icon: "BDO", setting: "starwars", era: "Old Republic",
    description: "Kel Dor seers who read the future in storms and warn of what is coming.",
    aliases: ["baran do", "seer", "oracle", "kel dor", "precognition", "prophet"],
    branches: [
      { className: "Consular", subclasses: { sw5e: "Way of the Seer" }, title: "Storm Sage",
        playstyle: "A caster who sees danger coming and positions the party around it.",
        abilities: ["WIS", "CON", "DEX", "CHA", "INT", "STR"],
        skills: ["Insight", "Perception", "Lore", "Nature"],
        equipment: ["Lightsaber", "Combat suit", "Medpac"],
        spells: ["Battle Precognition", "Sense Force", "Guidance", "Affect Mind", "Cloud Mind"] },
      { className: "Scholar", subclasses: { sw5e: "Occultist Pursuit" }, title: "Keeper of Omens",
        playstyle: "A scholar of portents who turns knowledge into an edge for the party.",
        abilities: ["INT", "WIS", "CON", "DEX", "CHA", "STR"],
        skills: ["Lore", "Insight", "Investigation", "Medicine"],
        equipment: ["Blaster pistol", "Combat suit", "Medpac"] }
    ]
  },
  {
    id: "sw-aing-tii", name: "Aing-Tii Monk", icon: "ATI", setting: "starwars", era: "Old Republic",
    description: "Fringe mystics who step between places and refuse both sides of the Force.",
    aliases: ["aing-tii", "flow walking", "kathol", "grey", "teleport", "monk"],
    branches: [
      { className: "Monk", subclasses: { sw5e: "Aing-Tii Order" }, title: "Flow Walker",
        playstyle: "A mobile martial artist who slips through space to reach any target.",
        abilities: ["DEX", "WIS", "CON", "INT", "CHA", "STR"],
        skills: ["Acrobatics", "Lore", "Perception", "Stealth"],
        equipment: ["Vibroblade", "Combat suit", "Backpack"] },
      { className: "Sentinel", subclasses: { sw5e: "Path of Ethereality" }, title: "Between Places",
        playstyle: "A saber user who phases out of danger and reappears behind it.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Stealth", "Lore", "Perception", "Insight"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Burst of Speed", "Force Camouflage", "Cloud Mind", "Sense Force"] }
    ]
  },
  {
    id: "sw-matukai", name: "Matukai Adept", icon: "MTK", setting: "starwars", era: "Old Republic",
    description: "Force through the body — a tradition that trains muscle as the conduit.",
    aliases: ["matukai", "body", "physical", "adept", "iron", "warrior monk"],
    branches: [
      { className: "Monk", subclasses: { sw5e: "Matukai Order" }, title: "Matukai Warrior",
        playstyle: "A physical adept who channels the Force through raw conditioning.",
        abilities: ["DEX", "WIS", "CON", "STR", "INT", "CHA"],
        skills: ["Athletics", "Acrobatics", "Survival", "Insight"],
        equipment: ["Echostaff", "Combat suit", "Backpack"] },
      { className: "Sentinel", subclasses: { sw5e: "Path of Iron" }, title: "Iron Adept",
        playstyle: "A durable blade who keeps standing long after they should not.",
        abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"],
        skills: ["Athletics", "Survival", "Insight", "Perception"],
        equipment: ["Lightsaber", "Battle armor", "Backpack"],
        spells: ["Force Body", "Saber Ward", "Burst of Speed", "Battle Precognition"] }
    ]
  },
  {
    id: "sw-sith-alchemist", name: "Sith Alchemist", icon: "ALC", setting: "starwars", era: "Old Republic",
    description: "Twist flesh and metal with the old sorceries of Korriban.",
    aliases: ["alchemy", "sith sorcery", "korriban", "leviathan", "artificer", "necromancer"],
    branches: [
      { className: "Scholar", subclasses: { sw5e: "Occultist Pursuit" }, title: "Korriban Occultist",
        playstyle: "A scholar of forbidden lore who unnerves and unravels enemies.",
        abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
        skills: ["Lore", "Investigation", "Medicine", "Intimidation"],
        equipment: ["Blaster pistol", "Combat suit", "Medpac"] },
      { className: "Engineer", subclasses: { sw5e: "Biotech Engineering" }, title: "Flesh Shaper",
        playstyle: "A tech caster who rebuilds bodies — allies' and enemies'.",
        abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
        skills: ["Technology", "Medicine", "Lore", "Investigation"],
        equipment: ["Blaster pistol", "Combat suit", "Medpac"],
        spells: ["Bacta Pack", "Analyze", "Adrenaline", "Absorb Energy"] }
    ]
  },
  {
    id: "sw-saber-master", name: "Lightsaber Form Master", icon: "FRM", setting: "starwars", era: "Rise of the Empire",
    description: "Commit to one classical form and master it above all others.",
    aliases: ["makashi", "soresu", "juyo", "vaapad", "duelist", "form", "ataru", "djem so"],
    branches: [
      { className: "Guardian", subclasses: { sw5e: "Makashi Form" }, title: "Makashi Duelist",
        playstyle: "A precise one-on-one duelist built to beat other saber users.",
        abilities: ["DEX", "CON", "WIS", "STR", "CHA", "INT"],
        skills: ["Insight", "Perception", "Acrobatics", "Lore"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Saber Ward", "Battle Precognition", "Force Disarm", "Burst of Speed"] },
      { className: "Guardian", subclasses: { sw5e: "Soresu Form" }, title: "Soresu Defender",
        playstyle: "A defensive wall who outlasts blaster fire and duels alike.",
        abilities: ["CON", "DEX", "WIS", "STR", "CHA", "INT"],
        skills: ["Insight", "Perception", "Athletics", "Lore"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Saber Ward", "Saber Reflect", "Force Body", "Battle Precognition"] },
      { className: "Guardian", subclasses: { sw5e: "Juyo/Vaapad Form" }, title: "Vaapad Aggressor",
        playstyle: "A ferocious attacker who turns an opponent's fury back on them.",
        abilities: ["STR", "CON", "WIS", "DEX", "CHA", "INT"],
        skills: ["Athletics", "Intimidation", "Insight", "Perception"],
        equipment: ["Lightsaber", "Combat suit", "Backpack"],
        spells: ["Saber Ward", "Burst of Speed", "Force Push/Pull", "Saber Throw"] }
    ]
  },

  // ===== After the films =====
  {
    id: "sw-emperors-hand", name: "Emperor's Hand", icon: "EMH", setting: "starwars", era: "Rebellion Era",
    description: "A hidden agent answering to one master, sent where armies cannot go.",
    aliases: ["mara jade", "assassin", "imperial agent", "hand", "spy", "infiltrator"],
    branches: [
      { className: "Operative", subclasses: { sw5e: "Shadow Killer Practice" }, title: "Imperial Assassin",
        playstyle: "A lethal infiltrator who ends fights before they begin.",
        abilities: ["DEX", "INT", "CON", "CHA", "WIS", "STR"],
        skills: ["Stealth", "Deception", "Perception", "Sleight of Hand"],
        equipment: ["Vibroblade", "Blaster pistol", "Combat suit", "Security kit"] },
      { className: "Sentinel", subclasses: { sw5e: "Path of Shadows" }, title: "Hand of the Emperor",
        playstyle: "A Force-trained agent hiding a saber under a civilian cover.",
        abilities: ["DEX", "WIS", "CON", "CHA", "INT", "STR"],
        skills: ["Stealth", "Deception", "Insight", "Perception"],
        equipment: ["Lightsaber", "Combat suit", "Security kit"],
        spells: ["Cloud Mind", "Force Camouflage", "Affect Mind", "Burst of Speed"] }
    ]
  },
  {
    id: "sw-grand-admiral", name: "Grand Admiral", icon: "ADM", setting: "starwars", era: "Rebellion Era",
    description: "Win the battle in the briefing room, then watch it play out.",
    aliases: ["thrawn", "tactician", "commander", "strategist", "officer", "fleet"],
    branches: [
      { className: "Scholar", subclasses: { sw5e: "Tactician Pursuit" }, title: "Fleet Tactician",
        playstyle: "A support commander who hands allies openings and reads the enemy.",
        abilities: ["INT", "CON", "DEX", "WIS", "CHA", "STR"],
        skills: ["Lore", "Investigation", "Insight", "Piloting"],
        equipment: ["Blaster pistol", "Combat suit", "Backpack"] },
      { className: "Fighter", subclasses: { sw5e: "Tactical Specialist" }, title: "Line Officer",
        playstyle: "A front-line leader who directs the squad while holding the line.",
        abilities: ["STR", "CON", "INT", "DEX", "WIS", "CHA"],
        skills: ["Athletics", "Perception", "Intimidation", "Piloting"],
        equipment: ["Blaster rifle", "Battle armor", "Backpack"] }
    ]
  },
  {
    id: "sw-jensaarai", name: "Jensaarai Defender", icon: "JSA", setting: "starwars", era: "Rebellion Era",
    description: "Armoured Force users who took the Sith's lessons and turned defensive.",
    aliases: ["jensaarai", "armor", "defender", "susevfi", "grey jedi", "hidden order"],
    branches: [
      { className: "Sentinel", subclasses: { sw5e: "Path of Iron" }, title: "Saarai Defender",
        playstyle: "An armoured Force blade built to absorb punishment.",
        abilities: ["CON", "DEX", "WIS", "STR", "CHA", "INT"],
        skills: ["Athletics", "Insight", "Perception", "Lore"],
        equipment: ["Lightsaber", "Battle armor", "Backpack"],
        spells: ["Force Body", "Saber Ward", "Battle Precognition", "Burst of Speed"] },
      { className: "Guardian", subclasses: { sw5e: "Soresu Form" }, title: "Armoured Guardian",
        playstyle: "A defensive duelist who protects the people behind them.",
        abilities: ["CON", "STR", "WIS", "DEX", "CHA", "INT"],
        skills: ["Athletics", "Insight", "Perception", "Lore"],
        equipment: ["Lightsaber", "Battle armor", "Backpack"],
        spells: ["Saber Ward", "Saber Reflect", "Force Body"] }
    ]
  },
  {
    id: "sw-rogue-ace", name: "Rogue Squadron Ace", icon: "ACE", setting: "starwars", era: "Rebellion Era",
    description: "Best pilot in the fleet, and just as dangerous once the boots hit dirt.",
    aliases: ["pilot", "rogue squadron", "ace", "starfighter", "wedge", "x-wing"],
    branches: [
      { className: "Operative", subclasses: { sw5e: "Maverick Practice" }, title: "Hotshot Pilot",
        playstyle: "A daring skirmisher who improvises out of every bad situation.",
        abilities: ["DEX", "CHA", "CON", "INT", "WIS", "STR"],
        skills: ["Piloting", "Perception", "Technology", "Deception"],
        equipment: ["Blaster pistol", "Vibroblade", "Combat suit"] },
      { className: "Scout", subclasses: { sw5e: "Artillerist Technique" }, title: "Gunnery Ace",
        playstyle: "A ranged specialist who lays down overwhelming fire.",
        abilities: ["DEX", "WIS", "CON", "INT", "CHA", "STR"],
        skills: ["Piloting", "Perception", "Technology", "Survival"],
        equipment: ["Blaster rifle", "Combat suit", "Backpack"],
        spells: ["Analyze", "Alarm", "Adrenaline"] }
    ]
  },
  {
    id: "sw-vong-veteran", name: "Vong War Veteran", icon: "VNG", setting: "starwars", era: "New Jedi Order",
    description: "You fought an enemy the Force could not touch, and you came back.",
    aliases: ["yuuzhan vong", "new jedi order", "invasion", "veteran", "survivor", "war"],
    branches: [
      { className: "Berserker", subclasses: { sw5e: "Frenzied Approach" }, title: "Frenzied Survivor",
        playstyle: "A furious melee fighter who fights hardest when it is worst.",
        abilities: ["STR", "CON", "DEX", "WIS", "CHA", "INT"],
        skills: ["Athletics", "Survival", "Intimidation", "Perception"],
        equipment: ["Vibroaxe", "Battle armor", "Backpack"] },
      { className: "Fighter", subclasses: { sw5e: "Praetorian Specialist" }, title: "Praetorian Guard",
        playstyle: "A bodyguard who plants themselves in front of the people who matter.",
        abilities: ["STR", "CON", "DEX", "WIS", "INT", "CHA"],
        skills: ["Athletics", "Perception", "Insight", "Intimidation"],
        equipment: ["Vibrosword", "Battle armor", "Backpack"] }
    ]
  }
];

(function registerSw5eCreation() {
  const ED = "sw5e";
  if (typeof QUICK_BUILD_PROFILES !== "undefined") {
    Object.entries(SW5E_QUICK_BUILD_PROFILES).forEach(([name, profile]) => {
      // Fighter and Monk exist in both systems; keep their D&D profile and
      // store the SW5E one under a setting-scoped lookup.
      if (!QUICK_BUILD_PROFILES[name]) QUICK_BUILD_PROFILES[name] = profile;
    });
  }
  if (typeof QUICK_SPELL_COUNTS !== "undefined") {
    Object.entries(SW5E_DATA.castRate || {}).forEach(([name]) => {
      if (!QUICK_SPELL_COUNTS[name]) QUICK_SPELL_COUNTS[name] = { 0: 0, 1: 4 };
    });
  }
  if (typeof CHARACTER_THEMES !== "undefined") {
    CHARACTER_THEMES.forEach(theme => { if (!theme.setting) theme.setting = "dnd"; });
    [...SW5E_CHARACTER_THEMES, ...SW5E_LEGENDS_THEMES].forEach(theme => {
      if (!CHARACTER_THEMES.some(existing => existing.id === theme.id)) CHARACTER_THEMES.push(theme);
    });
  }
})();

// SW5E-specific profile lookup, used when the active edition is sw5e so the
// shared Fighter/Monk names resolve to the Star Wars build.
function sw5eQuickProfile(className) {
  return SW5E_QUICK_BUILD_PROFILES[className] || null;
}

if (typeof module !== "undefined") {
  module.exports = { SW5E_QUICK_BUILD_PROFILES, SW5E_PREMADE_HEROES, SW5E_CHARACTER_THEMES, SW5E_LEGENDS_THEMES };
}
