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
    SW5E_CHARACTER_THEMES.forEach(theme => {
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
  module.exports = { SW5E_QUICK_BUILD_PROFILES, SW5E_PREMADE_HEROES, SW5E_CHARACTER_THEMES };
}
