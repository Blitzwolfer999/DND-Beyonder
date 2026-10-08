// Structured mechanics for the spells that had none, so every spell in the
// builder shows a usable card: level, school, casting time, range, components
// and duration, plus the save or attack and damage where the spell has one.
//
// These are mechanical facts rather than rules prose. The non-SRD spells keep
// their original effect summaries, in line with this project's content policy;
// only SRD material is reproduced verbatim (see PHANTASMAL_FORCE_SRD below,
// which comes from SRD 5.2 under CC BY 4.0).

const EXTRA_SPELL_MECHANICS = {
  "Arcane Gate": { school: "Conjuration", castingTime: "Action", range: "500 feet", components: "V, S", duration: "Concentration, up to 10 minutes" },
  "Arcane Vigor": { school: "Abjuration", castingTime: "Bonus Action", range: "Self", components: "V, S", duration: "Instantaneous" },
  "Armor of Agathys": { school: "Abjuration", castingTime: "Bonus Action", range: "Self", components: "V, S, M", duration: "1 hour", damageEffect: "Cold" },
  "Arms of Hadar": { school: "Conjuration", castingTime: "Action", range: "Self", components: "V, S", duration: "Instantaneous", saveAttack: "STR save", dice: "2d6 necrotic", area: "10-foot emanation", damageEffect: "Necrotic" },
  "Astral Flood": { school: "Evocation", castingTime: "Action", range: "Self", components: "V, S, M", duration: "Instantaneous" },
  "Aura of Purity": { school: "Abjuration", castingTime: "Action", range: "Self", components: "V", duration: "Concentration, up to 10 minutes", area: "30-foot emanation" },
  "Aura of Vitality": { school: "Abjuration", castingTime: "Action", range: "Self", components: "V", duration: "Concentration, up to 1 minute", dice: "2d6 healing", area: "30-foot emanation" },
  "Banishing Smite": { school: "Conjuration", castingTime: "1 Bonus Action", range: "Self", components: "V", duration: "Concentration, up to 1 minute", dice: "5d10 force", damageEffect: "Force" },
  "Beast Sense": { school: "Divination", castingTime: "Action or Ritual", range: "Touch", components: "S", duration: "Concentration, up to 1 hour" },
  "Blade Ward": { school: "Abjuration", castingTime: "Action", range: "Self", components: "V, S", duration: "Concentration, up to 1 minute" },
  "Buzzing Bee": { school: "Conjuration", castingTime: "Action", range: "120 feet", components: "V, S, M", duration: "Concentration, up to 1 minute" },
  "Circle of Power": { school: "Abjuration", castingTime: "Action", range: "Self", components: "V", duration: "Concentration, up to 10 minutes", area: "30-foot emanation" },
  "Cloud of Daggers": { school: "Conjuration", castingTime: "Action", range: "60 feet", components: "V, S, M", duration: "Concentration, up to 1 minute", dice: "4d4 slashing", area: "5-foot cube", damageEffect: "Slashing" },
  "Conjure Barrage": { school: "Conjuration", castingTime: "Action", range: "Self", components: "V, S, M", duration: "Instantaneous" },
  "Conjure Volley": { school: "Conjuration", castingTime: "Action", range: "150 feet", components: "V, S, M", duration: "Instantaneous" },
  "Cordon of Arrows": { school: "Transmutation", castingTime: "Action", range: "Touch", components: "V, S, M", duration: "8 hours" },
  "Crown of Madness": { school: "Enchantment", castingTime: "Action", range: "120 feet", components: "V, S", duration: "Concentration, up to 1 minute", saveAttack: "WIS save" },
  "Destructive Wave": { school: "Evocation", castingTime: "Action", range: "Self", components: "V", duration: "Instantaneous", saveAttack: "CON save", dice: "5d6 thunder plus 5d6 radiant or necrotic", area: "30-foot emanation", damageEffect: "Thunder" },
  "Elemental Weapon": { school: "Transmutation", castingTime: "Action", range: "Touch", components: "V, S", duration: "Concentration, up to 1 hour" },
  "Feign Death": { school: "Necromancy", castingTime: "Action or Ritual", range: "Touch", components: "V, S, M", duration: "1 hour" },
  "Flock of Familiars": { school: "Conjuration", castingTime: "1 minute", range: "Touch", components: "V, S", duration: "Concentration, up to 1 hour" },
  "Fount of Moonlight": { school: "Evocation", castingTime: "Action", range: "Self", components: "V, S", duration: "Concentration, up to 10 minutes", damageEffect: "Radiant" },
  Friends: { school: "Enchantment", castingTime: "Action", range: "10 feet", components: "S, M", duration: "Concentration, up to 1 minute", saveAttack: "WIS save" },
  "Galder's Speedy Courier": { school: "Conjuration", castingTime: "Action", range: "10 feet", components: "V, S, M", duration: "10 minutes" },
  "Galder's Tower": { school: "Conjuration", castingTime: "10 minutes", range: "30 feet", components: "V, S, M", duration: "24 hours" },
  "Grasping Vine": { school: "Conjuration", castingTime: "Bonus Action", range: "60 feet", components: "V, S", duration: "Concentration, up to 1 minute", saveAttack: "Melee spell attack" },
  "Hail of Thorns": { school: "Conjuration", castingTime: "1 Bonus Action", range: "Self", components: "V", duration: "Instantaneous", damageEffect: "Piercing" },
  "Hunger of Hadar": { school: "Conjuration", castingTime: "Action", range: "150 feet", components: "V, S, M", duration: "Concentration, up to 1 minute", area: "20-foot radius sphere" },
  "Insidious Rhythm": { school: "Enchantment", castingTime: "Action", range: "120 feet", components: "V, S", duration: "Concentration, up to 1 minute", saveAttack: "WIS save" },
  "Jallarzi's Storm of Radiance": { school: "Evocation", castingTime: "Action", range: "120 feet", components: "V, S, M", duration: "Concentration, up to 1 minute", area: "10-foot radius" },
  "Leomund's Lamentable Belaborment": { school: "Enchantment", castingTime: "Action", range: "30 feet", components: "V", duration: "1 minute" },
  "Lightning Arrow": { school: "Transmutation", castingTime: "1 Bonus Action", range: "Self", components: "V, S", duration: "Instantaneous", damageEffect: "Lightning" },
  "Power Word Fortify": { school: "Enchantment", castingTime: "Action", range: "60 feet", components: "V", duration: "Instantaneous" },
  "Searing Orb": { school: "Evocation", castingTime: "Action", range: "60 feet", components: "S, M", duration: "Instantaneous", saveAttack: "Ranged spell attack", damageEffect: "Radiant" },
  "Staggering Smite": { school: "Enchantment", castingTime: "1 Bonus Action", range: "Self", components: "V", duration: "Instantaneous", saveAttack: "WIS save", dice: "4d6 psychic", damageEffect: "Psychic" },
  "Sticks to Snakes": { school: "Transmutation", castingTime: "Action", range: "90 feet", components: "V, S, M", duration: "Concentration, up to 1 minute" },
  "Swift Quiver": { school: "Transmutation", castingTime: "Bonus Action", range: "Self", components: "V, S, M", duration: "Concentration, up to 1 minute" },
  "Tasha's Bubbling Cauldron": { school: "Conjuration", castingTime: "Action", range: "5 feet", components: "V, S, M", duration: "10 minutes" },
  Telepathy: { school: "Divination", castingTime: "Action", range: "Unlimited", components: "V, S, M", duration: "24 hours" },
  "Thunderous Smite": { school: "Evocation", castingTime: "1 Bonus Action", range: "Self", components: "V", duration: "Instantaneous", dice: "2d6 thunder", damageEffect: "Thunder" },
  "Tortoise Shell": { school: "Abjuration", castingTime: "Action", range: "Touch", components: "V, S", duration: "Concentration, up to 1 minute" },
  "Void Star": { school: "Necromancy", castingTime: "Action", range: "120 feet", components: "V, S, M", duration: "Instantaneous", saveAttack: "Ranged spell attack", damageEffect: "Necrotic" },
  "Yolande's Regal Presence": { school: "Enchantment", castingTime: "Action", range: "Self", components: "V, S, M", duration: "Concentration, up to 1 minute", area: "10-foot emanation" }
};

// 2024 renamed several spells after their wizard; the rules text sits under the
// System Reference Document's generic name, so these point at it.
const SPELL_NAME_ALIASES = {
  "Bigby's Hand": "Arcane Hand",
  "Mordenkainen's Sword": "Arcane Sword",
  "Nystul's Magic Aura": "Arcanist's Magic Aura"
};

// Phantasmal Force was the only spell in SRD 5.2 whose text the app had not
// captured. Reproduced from the System Reference Document 5.2 by Wizards of
// the Coast LLC, licensed under CC BY 4.0.
const PHANTASMAL_FORCE_SRD = "Level 2 Illusion (Bard, Sorcerer, Wizard) Casting Time: Action Range: 60 feet Components: V, S, M (a bit of fleece) Duration: Concentration, up to 1 minute You attempt to craft an illusion in the mind of a creature you can see within range. The target makes an Intelligence saving throw. On a failed save, you create a phantasmal object, creature, or other phenomenon that is no larger than a 10-foot Cube and that is perceivable only to the target for the duration. The phantasm includes sound, temperature, and other stimuli. The target can take a Study action to examine the phantasm with an Intelligence (Investigation) check against your spell save DC. If the check succeeds, the target realizes that the phantasm is an illusion, and the spell ends. While affected by the spell, the target treats the phantasm as if it were real and rationalizes any illogical outcomes from interacting with it. For example, if the target steps through a phantasmal bridge and survives the fall, it believes the bridge exists and something else caused it to fall. An affected target can even take damage from the illusion if the phantasm represents a dangerous creature or hazard. On each of your turns, such a phantasm can deal 2d8 Psychic damage to the target if it is in the phantasm's area or within 5 feet of the phantasm. The target perceives the damage as a type appropriate to the illusion.";

(function registerSpellMechanics() {
  if (typeof SPELL_METADATA !== "undefined") {
    Object.entries(EXTRA_SPELL_MECHANICS).forEach(([name, meta]) => {
      SPELL_METADATA[name] = { ...meta, ...(SPELL_METADATA[name] || {}) };
    });
  }
  if (typeof RULE_DESCRIPTIONS !== "undefined" && RULE_DESCRIPTIONS.spells) {
    RULE_DESCRIPTIONS.spells["2024"] = RULE_DESCRIPTIONS.spells["2024"] || {};
    if (!RULE_DESCRIPTIONS.spells["2024"]["Phantasmal Force"]) {
      RULE_DESCRIPTIONS.spells["2024"]["Phantasmal Force"] = PHANTASMAL_FORCE_SRD;
    }
  }
})();

if (typeof module !== "undefined") {
  module.exports = { EXTRA_SPELL_MECHANICS, SPELL_NAME_ALIASES, PHANTASMAL_FORCE_SRD };
}
