"""Emit sw5e-content.js for DND-Beyonder from sw5e-build.json."""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = r"C:\Users\mcdbz\OneDrive\Documents\Claude\DND-Beyonder\sw5e-content.js"

d = json.load(open(os.path.join(HERE, "sw5e-build.json"), encoding="utf-8"))

# The Foundry set carries internal entries that are not player-selectable:
# "(Companion)" halves hold the pet/droid statblock for a companion archetype,
# and "(Depreciated)"/"(Old)" are superseded versions. Drop both.
_INTERNAL_SUFFIXES = ("(companion)", "(depreciated)", "(old)")
def _is_internal(name):
    return str(name).strip().lower().endswith(_INTERNAL_SUFFIXES)
d["archetypes"] = {cls: [a for a in names if not _is_internal(a)]
                   for cls, names in d["archetypes"].items()}
d["archetypeFeatures"] = {a: rows for a, rows in d["archetypeFeatures"].items()
                          if not _is_internal(a)}

# Force/tech caster progression -> which power list a class draws from.
FORCE = {c for c, p in d["powercasting"].items() if p["force"] != "none"}
TECH = {c for c, p in d["powercasting"].items() if p["tech"] != "none"}

# Powers known / max power level follow the SW5E caster tables.
CAST_RATE = {}
for c, p in d["powercasting"].items():
    rate = p["force"] if p["force"] != "none" else p["tech"]
    if rate != "none":
        CAST_RATE[c] = rate

spell_lists = {}
for cls in d["chassis"]:
    if cls in FORCE:
        src = d["powerLists"]["force"]
    elif cls in TECH:
        src = d["powerLists"]["tech"]
    else:
        continue
    spell_lists[cls] = {lvl: names for lvl, names in sorted(src.items(), key=lambda kv: int(kv[0]))}

class_skills = {c: {"count": v["skills"]["count"], "options": v["skills"]["options"]}
                for c, v in d["chassis"].items()}
chassis = {c: {k: v for k, v in val.items() if k != "skills"} for c, val in d["chassis"].items()}

payload = {
    "chassis": chassis,
    "classSkills": class_skills,
    "castRate": CAST_RATE,
    "classFeatures": d["classFeatures"],
    "archetypes": d["archetypes"],
    "archetypeFeatures": d["archetypeFeatures"],
    "archetypeLevels": d["archetypeLevels"],
    "spellLists": spell_lists,
    "powerMeta": d["powerMeta"],
    "species": d["species"],
    "backgrounds": d["backgrounds"],
    "summaries": d["summaries"],
    "levelTables": d.get("levelTables", {}),
    "proficiencies": d.get("proficiencies", {}),
    "startingEquipment": d.get("startingEquipment", {}),
    "startingWealth": d.get("startingWealth", {}),
    "equipment": d.get("equipment", []),
    "armorRules": d.get("armorRules", {}),
    "feats": d.get("feats", []),
}

header = '''// Star Wars 5e (SW5E) content — a third rules edition alongside 2014 and 2024.
//
// SW5E is a fan-made conversion of 5e to the Star Wars setting. This file
// carries only STRUCTURE and MECHANICAL FACTS extracted from the community
// SW5E dataset (class chassis, feature names and levels, archetypes, power
// names with casting time / range / duration / damage / saves, species and
// background names). No descriptive prose from the source is reproduced: every
// summary below is generated from those mechanical fields, in keeping with this
// project's content policy.
//
// SW5E is unofficial fan content and is not associated with SW5e, Disney,
// Lucasfilm, or Wizards of the Coast.
//
// Source dataset: github.com/sw5e-foundry/sw5e (packs/)

const SW5E_DATA = '''

footer = r'''
;

// SW5E's skill list replaces Arcana/History/Religion with Lore, and adds
// Piloting and Technology.
let SW5E_CLASS_SKILLS = {};
const SW5E_SKILLS = { Lore: "INT", Piloting: "DEX", Technology: "INT" };
const SW5E_EXCLUDED_SKILLS = ["Arcana", "History", "Religion"];
// Skill list shown for an edition. Only SW5E swaps the D&D knowledge skills.
function skillsForEdition(rulesEdition) {
  const all = Object.keys(SKILLS);
  if (rulesEdition !== "sw5e") return all.filter(name => !SW5E_SKILLS[name]);
  return all.filter(name => !SW5E_EXCLUDED_SKILLS.includes(name));
}
function isSw5eClass(className) {
  return Boolean(SW5E_DATA.chassis[className]);
}
// Force/tech points, powers known and max power level all come from each
// class's own level table in the SW5E data.
function sw5eLevelRow(className, level) {
  const table = SW5E_DATA.levelTables[className];
  if (!table) return null;
  return table[String(Math.max(1, Math.min(20, Number(level || 1))))] || null;
}
function sw5ePowerPoints(className, level) {
  return Number(sw5eLevelRow(className, level)?.powerPoints || 0);
}
function sw5ePowersKnown(className, level) {
  return Number(sw5eLevelRow(className, level)?.powersKnown || 0);
}
function sw5eIsTechCaster(className) {
  return (SW5E_DATA.powercasting?.[className]?.tech || "none") !== "none";
}
// Caps come from each class's Max Power Level column: full casters reach 9th,
// 3/4 casters (Sentinel) 7th, half casters (Guardian, Scout) 5th.
function sw5eMaxPowerLevel(className, level) {
  return Number(sw5eLevelRow(className, level)?.maxPowerLevel || 0);
}

// RULES, SKILLS and CLASS_SKILLS live in app.js, which loads after this file,
// so those registrations run from app.js's init via registerSw5eRuntime().
function registerSw5eRuntime() {
  const ED = "sw5e";
  if (typeof RULES === "undefined") return;
  // Existing D&D classes are limited to the D&D editions first.
  Object.values(RULES.classes).forEach(data => {
    if (!data.editions) data.editions = ["2014", "2024"];
  });
  Object.entries(SW5E_DATA.chassis).forEach(([name, data]) => {
    const existing = RULES.classes[name];
    if (existing && existing.editions.includes(ED)) return;
    if (existing) {
      // Fighter and Monk exist in both systems with identical hit die and
      // saves, so the shared entry simply gains SW5E as an available edition.
      existing.editions = [...new Set([...(existing.editions || []), ED])];
      existing.subclasses = { ...(existing.subclasses || {}), [ED]: SW5E_DATA.archetypes[name] || [] };
      return;
    }
    RULES.classes[name] = { ...data, origin: "Star Wars 5e", editions: [ED],
      subclasses: { [ED]: SW5E_DATA.archetypes[name] || [] } };
  });
  Object.entries(SW5E_SKILLS).forEach(([name, ability]) => { if (!SKILLS[name]) SKILLS[name] = ability; });
  // SW5E class skill lists are kept separate so Fighter/Monk keep their D&D
  // options in the D&D editions.
  SW5E_CLASS_SKILLS = SW5E_DATA.classSkills;
  Object.entries(SW5E_CLASS_SKILLS).forEach(([name, value]) => {
    if (!value.options || !value.options.length) value.options = skillsForEdition(ED);
  });
  RULES.species[ED] = SW5E_DATA.species;
  RULES.backgrounds[ED] = SW5E_DATA.backgrounds;
  if (typeof ARMOR_RULES !== "undefined") {
    Object.entries(SW5E_DATA.armorRules).forEach(([name, rule]) => {
      if (!ARMOR_RULES[name]) ARMOR_RULES[name] = { ...rule, dex: rule.dex >= 99 ? Infinity : rule.dex };
    });
  }
}

(function registerSw5eContent() {
  const ED = "sw5e";
  // --- features ---
  CLASS_FEATURES[ED] = CLASS_FEATURES[ED] || {};
  Object.entries(SW5E_DATA.classFeatures).forEach(([name, rows]) => { CLASS_FEATURES[ED][name] = rows; });
  SUBCLASS_FEATURES[ED] = SUBCLASS_FEATURES[ED] || {};
  Object.entries(SW5E_DATA.archetypeFeatures).forEach(([name, rows]) => { SUBCLASS_FEATURES[ED][name] = rows; });
  SUBCLASS_LEVELS[ED] = SUBCLASS_LEVELS[ED] || {};
  Object.entries(SW5E_DATA.archetypeLevels).forEach(([name, levels]) => { SUBCLASS_LEVELS[ED][name] = levels; });
  // --- archetype catalog ---
  Object.entries(SW5E_DATA.archetypes).forEach(([cls, names]) => {
    SUBCLASS_CATALOG[cls] = SUBCLASS_CATALOG[cls] || [];
    names.forEach(name => {
      if (!SUBCLASS_CATALOG[cls].some(r => r.name === name && r.rules === ED)) {
        SUBCLASS_CATALOG[cls].push(subclassRecord(name, "Star Wars 5e", ED));
      }
    });
  });
  // --- powers as the spell list ---
  SPELL_LISTS[ED] = SPELL_LISTS[ED] || {};
  Object.entries(SW5E_DATA.spellLists).forEach(([cls, lists]) => { SPELL_LISTS[ED][cls] = lists; });
  if (typeof SPELL_METADATA !== "undefined") {
    Object.entries(SW5E_DATA.powerMeta).forEach(([name, meta]) => {
      if (!SPELL_METADATA[name]) SPELL_METADATA[name] = meta;
    });
  }
  // --- feats ---
  if (typeof FEATS !== "undefined" && SW5E_DATA.feats && SW5E_DATA.feats.length) {
    FEATS[ED] = SW5E_DATA.feats;
  }
  // --- progression: powers known come straight from the class tables ---
  SPELL_PROGRESSION[ED] = {};
  Object.entries(SW5E_DATA.levelTables).forEach(([cls, table]) => {
    const totals = [];
    for (let lvl = 1; lvl <= 20; lvl += 1) totals.push(Number(table[String(lvl)]?.powersKnown || 0));
    if (totals.some(Boolean)) SPELL_PROGRESSION[ED][cls] = { mode: "known", totals };
  });
  // At-will powers are part of the powers-known total in SW5E, so there is no
  // separate cantrip allowance.
  CANTRIP_PROGRESSION[ED] = {};
  // --- equipment ---
  SW5E_DATA.equipment.forEach(item => {
    if (!EQUIPMENT_CATALOG.some(existing => existing.name === item.name && existing.editions)) {
      EQUIPMENT_CATALOG.push({ ...item, editions: [ED] });
    }
  });

  PROGRESSION_OPTIONS.invocations[ED] = [];
  PROGRESSION_OPTIONS.metamagic[ED] = [];
  PROGRESSION_OPTIONS.fightingStyles[ED] = PROGRESSION_OPTIONS.fightingStyles["2014"];
  LEVEL_CHOICE_RULES[ED] = {};
  // --- descriptions ---
  if (typeof CONTENT_SUMMARIES !== "undefined") {
    CONTENT_SUMMARIES.features = CONTENT_SUMMARIES.features || {};
    Object.entries(SW5E_DATA.summaries).forEach(([name, text]) => {
      if (!CONTENT_SUMMARIES.features[name]) CONTENT_SUMMARIES.features[name] = text;
    });
  }
})();

if (typeof module !== "undefined") module.exports = { SW5E_DATA };
'''

with open(OUT, "w", encoding="utf-8") as fh:
    fh.write(header)
    json.dump(payload, fh, ensure_ascii=False, separators=(",", ":"))
    fh.write(footer)

print("wrote", OUT, os.path.getsize(OUT) // 1024, "KB")
print("classes", len(chassis), "| archetypes", sum(len(v) for v in d["archetypes"].values()))
print("power lists", {k: sum(len(v) for v in lv.values()) for k, lv in spell_lists.items() if k in ("Consular", "Engineer")})
