// The five playtest species from Unearthed Arcana: Underdark Options and
// Underdark Options 2. They are 2024-rules options, labelled as playtest
// material wherever they appear, and every description below is an original
// summary, as this project's content policy requires.
//
// RULES.species, SPECIES_TRAIT_SUMMARIES, SPECIES_WALKING_SPEEDS and
// SPECIES_DARKVISION all live in app.js, which loads after the content files,
// so the registration that touches them runs from registerUnderdarkRuntime(),
// the hook init() already uses for the other content packs.

const UNDERDARK_SPECIES_SOURCE = {
  "Deep Imaskari": "Unearthed Arcana: Underdark Options 2",
  Drider: "Unearthed Arcana: Underdark Options 2",
  Illithidkin: "Unearthed Arcana: Underdark Options",
  "Kuo-toa": "Unearthed Arcana: Underdark Options 2",
  Myconid: "Unearthed Arcana: Underdark Options"
};

const UNDERDARK_SPECIES = {
  "Deep Imaskari": {
    summary: "Unearthed Arcana. Descendants of an empire that sealed itself in the Underdark and lit an artificial sun; millennia of that radiation left crystals growing from their skin. Medium or Small, speed 30.",
    darkvision: 0,
    traits: {
      Photoresistant: "You have resistance to radiant damage.",
      Resourceful: "Every long rest ends with Heroic Inspiration in hand.",
      Unluminescent: "An action sets the crystals in your skin glowing, shedding bright light 5 feet around you until you stop.",
      "Aura of Unlight": "From character level 3, a Bonus Action raises a 10-foot aura of light for a minute, once per long rest. Choose each time: an Armor Class bonus worth half your proficiency for you and your allies, a glare that blinds everyone else, or the power to turn your damage radiant and spend a Hit Point Die for more of it."
    }
  },
  Drider: {
    summary: "Unearthed Arcana. Cursed by the Spider Queen with a drow's head and torso on a giant spider's body, driders hunt the caverns on eight legs. Medium, speed 30, and they live as long as elves.",
    darkvision: 120,
    traits: {
      "Arachnid Build": "You count as one size larger for carrying capacity.",
      Darkvision: "You have darkvision out to 120 feet.",
      "Spells of the Spider Queen": "You know Dancing Lights; Faerie Fire is always prepared from level 3 and Web from level 5, each castable once per long rest without a slot. Pick Intelligence, Wisdom or Charisma for them when you choose this species.",
      "Spider Climb": "You have a climb speed equal to your speed, and from level 3 you can cross walls and ceilings with your hands free.",
      "Web Walker": "Webs never slow you, and you know where anything else touching the same web is."
    }
  },
  Illithidkin: {
    summary: "Unearthed Arcana. Those touched by illithid influence without being consumed by it, left with a mind that reaches out on its own. Medium or Small, speed 30.",
    darkvision: 120,
    traits: {
      Darkvision: "You have darkvision out to 120 feet.",
      "Psionic Aptitude": "You know Mage Hand and can make the hand invisible; Command is always prepared from level 3 and Levitate from level 5, each castable once per long rest without a slot. Pick Intelligence, Wisdom or Charisma for them when you choose this species.",
      "Sharpened Mind": "You resist psychic damage and have advantage on saves to avoid or shake off being charmed.",
      Telepathy: "You have telepathy out to 30 feet."
    }
  },
  "Kuo-toa": {
    summary: "Unearthed Arcana. Fish-folk whose fervent belief shapes gods out of nothing — and sometimes brings them to life. Medium, speed 30, at home in air and water alike.",
    darkvision: 0,
    traits: {
      Amphibious: "You breathe air and water, and you have a swim speed equal to your speed.",
      Slippery: "You have advantage on saves to avoid or end being grappled or restrained.",
      "Deific Manifestation": "Find Familiar is always prepared and needs no materials, with one free casting per long rest. Your familiar is a Celestial and can take a homunculus or myconid sprout form, and it borrows one action, reaction or trait from a second form you pick."
    }
  },
  Myconid: {
    summary: "Unearthed Arcana. Fungal folk of the deep caverns who speak mind to mind and return to the soil to feed the next circle. Medium or Small, speed 30.",
    darkvision: 120,
    traits: {
      Darkvision: "You have darkvision out to 120 feet.",
      Telepathy: "You have telepathy out to 30 feet.",
      "Rapport Spores": "An action fills a 30-foot emanation with spores that give thinking creatures in it telepathy for an hour, once per long rest.",
      "Skill Meld": "A ritual on a long rest lets up to six allies within 30 feet share one skill proficiency that a participant already has, until their next long rest."
    }
  }
};

(function registerUnderdarkSpeciesContent() {
  if (typeof SPECIES_CATALOG !== "undefined" && typeof customizationRecord === "function") {
    Object.entries(UNDERDARK_SPECIES_SOURCE).forEach(([name, source]) => {
      if (!SPECIES_CATALOG.some(row => row.name === name && row.rules === "2024")) {
        SPECIES_CATALOG.push(customizationRecord(name, source, "2024"));
      }
    });
  }
  if (typeof CONTENT_SUMMARIES !== "undefined") {
    CONTENT_SUMMARIES.species = CONTENT_SUMMARIES.species || {};
    CONTENT_SUMMARIES.speciesTraits = CONTENT_SUMMARIES.speciesTraits || {};
    Object.entries(UNDERDARK_SPECIES).forEach(([name, data]) => {
      if (!CONTENT_SUMMARIES.species[name]) CONTENT_SUMMARIES.species[name] = data.summary;
      Object.entries(data.traits).forEach(([trait, text]) => {
        const key = `${name}|${trait}`;
        if (!CONTENT_SUMMARIES.speciesTraits[key]) CONTENT_SUMMARIES.speciesTraits[key] = text;
      });
    });
  }
})();

// Called from app.js init(), once RULES and the species tables exist.
function registerUnderdarkRuntime() {
  if (typeof RULES === "undefined") return;
  RULES.species["2024"] = RULES.species["2024"] || [];
  Object.keys(UNDERDARK_SPECIES).forEach(name => {
    if (!RULES.species["2024"].includes(name)) RULES.species["2024"].push(name);
    if (typeof SPECIES_TRAIT_SUMMARIES !== "undefined" && !SPECIES_TRAIT_SUMMARIES[name]) {
      SPECIES_TRAIT_SUMMARIES[name] = Object.keys(UNDERDARK_SPECIES[name].traits);
    }
    const darkvision = UNDERDARK_SPECIES[name].darkvision;
    if (typeof SPECIES_DARKVISION !== "undefined") {
      SPECIES_DARKVISION["2024"] = SPECIES_DARKVISION["2024"] || {};
      if (SPECIES_DARKVISION["2024"][name] === undefined) SPECIES_DARKVISION["2024"][name] = darkvision;
    }
  });
  // All five walk 30 feet, which is the default, so SPECIES_WALKING_SPEEDS
  // needs no entry for them.
}

if (typeof module !== "undefined") {
  module.exports = { UNDERDARK_SPECIES, UNDERDARK_SPECIES_SOURCE };
}
