"""Convert the SW5E Foundry compendium into DND-Beyonder's data shapes.

Only structural/mechanical facts are carried across (names, levels, dice, saves,
ranges, durations). Descriptive prose from the source is NOT copied; every
summary emitted here is generated from the mechanical fields.
"""
import json, glob, os, re, sys, collections

PACKS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sw5e-data", "packs")

ABIL = {"str": "STR", "dex": "DEX", "con": "CON", "int": "INT", "wis": "WIS", "cha": "CHA"}
ABIL_NAME = {"STR": "Strength", "DEX": "Dexterity", "CON": "Constitution",
             "INT": "Intelligence", "WIS": "Wisdom", "CHA": "Charisma"}
SKILL = {
    "acr": "Acrobatics", "ani": "Animal Handling", "ath": "Athletics", "dec": "Deception",
    "ins": "Insight", "itm": "Intimidation", "inv": "Investigation", "lor": "Lore",
    "med": "Medicine", "nat": "Nature", "prc": "Perception", "prf": "Performance",
    "per": "Persuasion", "pil": "Piloting", "slt": "Sleight of Hand", "ste": "Stealth",
    "sur": "Survival", "tec": "Technology",
}
CLASS_ICON = {
    "Berserker": "BSK", "Consular": "CNS", "Engineer": "ENG", "Fighter": "FTR",
    "Guardian": "GRD", "Monk": "MNK", "Operative": "OPR", "Scholar": "SCH",
    "Scout": "SCT", "Sentinel": "SEN",
}
# Primary ability per class (from the SW5E class tables).
PRIMARY = {
    "Berserker": "STR", "Consular": "WIS", "Engineer": "INT", "Fighter": "STR",
    "Guardian": "STR", "Monk": "DEX", "Operative": "DEX", "Scholar": "INT",
    "Scout": "DEX", "Sentinel": "DEX",
}


def load(path):
    with open(path, encoding="utf-8") as fh:
        return json.load(fh)


def load_dir(name):
    return [load(p) for p in glob.glob(os.path.join(PACKS, name, "**", "*.json"), recursive=True)]


def by_id(entries):
    return {e["_id"]: e for e in entries}


def grants(entry):
    """[(level, [compendium ids])] from an entry's ItemGrant advancements."""
    out = []
    for adv in entry.get("system", {}).get("advancement", []) or []:
        if adv.get("type") != "ItemGrant":
            continue
        lvl = adv.get("level")
        ids = [str(i).rsplit(".", 1)[-1] for i in (adv.get("configuration", {}).get("items") or [])]
        if lvl and ids:
            out.append((int(lvl), ids))
    return out


def scale_values(entry):
    """ScaleValue advancements -> {title: {level: value}} (used for dice/uses)."""
    out = {}
    for adv in entry.get("system", {}).get("advancement", []) or []:
        if adv.get("type") != "ScaleValue":
            continue
        cfg = adv.get("configuration", {})
        scale = {}
        for lvl, val in (cfg.get("scale") or {}).items():
            v = val.get("value", val.get("number"))
            if v is None and "faces" in val:
                v = "d%s" % val["faces"]
            if v is not None:
                scale[int(lvl)] = v
        if adv.get("title") and scale:
            out[adv["title"]] = scale
    return out


# ---------- summary generation (mechanical facts only) ----------

def feature_summary(feat, cls, level):
    s = feat.get("system", {})
    bits = []
    act = (s.get("activation") or {}).get("type")
    ACT = {"action": "Action", "bonus": "Bonus action", "reaction": "Reaction",
           "minute": "Takes minutes", "hour": "Takes hours", "special": "Special",
           "legendary": "Legendary action", "crew": "Crew action"}
    if act and act in ACT:
        bits.append(ACT[act])
    uses = s.get("uses") or {}
    if uses.get("max"):
        per = {"sr": "per short rest", "lr": "per long rest", "day": "per day",
               "charges": "charges", "": ""}.get(uses.get("per") or "", "")
        bits.append(("%s use%s %s" % (uses["max"], "" if str(uses["max"]) == "1" else "s", per)).strip())
    rng = s.get("range") or {}
    if rng.get("value") and rng.get("units") in ("ft", "mi"):
        bits.append("range %s %s" % (rng["value"], rng["units"]))
    dmg = ((s.get("damage") or {}).get("parts") or [])
    if dmg:
        parts = [p[0] for p in dmg if p and p[0]]
        if parts:
            bits.append("deals %s" % " + ".join(parts))
    save = s.get("save") or {}
    if save.get("ability"):
        bits.append("%s save" % ABIL.get(save["ability"], save["ability"]).upper())
    detail = " · ".join(bits)
    base = "%s feature gained at level %s." % (cls, level)
    return (base + " " + detail) if detail else base


POWER_SCHOOL = {
    "lgt": "Light side", "drk": "Dark side", "uni": "Universal",
    "tec": "Tech", "enh": "Enhancement",
}


def power_summary(power):
    s = power["system"]
    lvl = s.get("level", 0)
    kind = "tech power" if power.get("_pack") == "tech" else "force power"
    head = ("At-will %s" % kind) if not lvl else ("Level %s %s" % (lvl, kind))
    school = POWER_SCHOOL.get(s.get("school"))
    if school:
        head += " (%s)" % school
    bits = [head]
    act = (s.get("activation") or {})
    ACT = {"action": "1 action", "bonus": "1 bonus action", "reaction": "1 reaction",
           "minute": "%s minute(s)", "hour": "%s hour(s)", "special": "special"}
    if act.get("type") in ("minute", "hour"):
        bits.append(ACT[act["type"]] % act.get("cost", 1))
    elif act.get("type") in ACT:
        bits.append(ACT[act["type"]])
    rng = s.get("range") or {}
    if rng.get("units") == "self":
        bits.append("self")
    elif rng.get("units") == "touch":
        bits.append("touch")
    elif rng.get("value"):
        bits.append("range %s %s" % (rng["value"], rng.get("units") or "ft"))
    dur = s.get("duration") or {}
    if dur.get("units") and dur.get("units") != "inst":
        bits.append(("lasts %s %s" % (dur.get("value") or "", dur["units"])).strip())
    elif dur.get("units") == "inst":
        bits.append("instantaneous")
    parts = [p[0] for p in ((s.get("damage") or {}).get("parts") or []) if p and p[0]]
    if parts:
        bits.append("%s damage" % " + ".join(parts))
    save = s.get("save") or {}
    if save.get("ability"):
        bits.append("%s save" % ABIL.get(save["ability"], save["ability"]))
    if s.get("actionType") in ("rsak", "msak"):
        bits.append("power attack roll")
    if (s.get("components") or {}).get("concentration"):
        bits.append("concentration")
    return " · ".join(bits) + "."


# ---------- build ----------

def main():
    classes = sorted(load_dir("classes"), key=lambda c: c["name"])
    classfeatures = by_id(load_dir("classfeatures"))
    archetypes = load_dir("archetypes")
    archfeatures = by_id(load_dir("archetypefeatures"))

    chassis, class_features, summaries = {}, {}, {}
    powercasting = {}
    for c in classes:
        name, s = c["name"], c["system"]
        chassis[name] = {
            "icon": CLASS_ICON.get(name, name[:3].upper()),
            "hit": int(re.sub(r"\D", "", s.get("hitDice") or "d8") or 8),
            "primary": PRIMARY.get(name, "STR"),
            "save": [ABIL[a] for a in s.get("saves", []) if a in ABIL],
            "skills": {
                "count": (s.get("skills") or {}).get("number", 2),
                "options": [SKILL[k] for k in (s.get("skills") or {}).get("choices", []) if k in SKILL],
            },
        }
        pc = s.get("powercasting") or {}
        powercasting[name] = {"force": pc.get("force", "none"), "tech": pc.get("tech", "none")}
        class_features[name] = []

    # Class features come from each feature's `requirements` ("Berserker 10"),
    # which is complete, unlike the partial ItemGrant advancement graph.
    class_names = {c["name"] for c in classes}
    for feat in classfeatures.values():
        req = (feat["system"].get("requirements") or "").strip()
        m = re.match(r"^(.*?)(?:\s+(\d+))?$", req)
        cls, lvl = (m.group(1) or "").strip(), int(m.group(2) or 1)
        if cls not in class_names:
            continue
        class_features[cls].append([lvl, feat["name"]])
        summaries.setdefault(feat["name"], feature_summary(feat, cls, lvl))
    for cls in class_features:
        seen, rows = set(), []
        for lvl, nm in sorted(class_features[cls], key=lambda r: (r[0], r[1])):
            if (lvl, nm) in seen:
                continue
            seen.add((lvl, nm))
            rows.append([lvl, nm])
        class_features[cls] = rows

    # Archetype features: "Operative (Acquisitions Practice) 13"
    arch_catalog = collections.defaultdict(list)
    arch_features, arch_levels = collections.defaultdict(list), collections.defaultdict(set)
    for a in archetypes:
        cls_id = (a["system"].get("classIdentifier") or "").lower()
        cls = next((c["name"] for c in classes if c["system"].get("identifier", "").lower() == cls_id), None)
        if cls:
            arch_catalog[cls].append(a["name"])
    for feat in archfeatures.values():
        req = (feat["system"].get("requirements") or "").strip()
        m = re.match(r"^([^(]+?)\s*\(([^)]+)\)\s*(\d+)$", req)
        if not m:
            continue
        cls, arch, lvl = m.group(1).strip(), m.group(2).strip(), int(m.group(3))
        arch_features[arch].append([lvl, feat["name"]])
        if cls in class_names:
            arch_levels[cls].add(lvl)
        summaries.setdefault(feat["name"], feature_summary(feat, arch, lvl))
    for arch in list(arch_features):
        seen, rows = set(), []
        for lvl, nm in sorted(arch_features[arch], key=lambda r: (r[0], r[1])):
            if (lvl, nm) in seen:
                continue
            seen.add((lvl, nm))
            rows.append([lvl, nm])
        arch_features[arch] = rows
    arch_features = dict(arch_features)

    # powers -> spell-list shape
    power_lists = {"force": collections.defaultdict(list), "tech": collections.defaultdict(list)}
    power_meta = {}
    for kind, pack in (("force", "forcepowers"), ("tech", "techpowers")):
        for p in load_dir(pack):
            p["_pack"] = kind
            lvl = p["system"].get("level", 0) or 0
            power_lists[kind][lvl].append(p["name"])
            s = p["system"]
            rng = s.get("range") or {}
            dur = s.get("duration") or {}
            act = s.get("activation") or {}
            parts = [x[0] for x in ((s.get("damage") or {}).get("parts") or []) if x and x[0]]
            save = s.get("save") or {}
            power_meta[p["name"]] = {
                "school": POWER_SCHOOL.get(s.get("school"), ""),
                "castingTime": {"action": "1 Action", "bonus": "1 Bonus Action",
                                "reaction": "1 Reaction"}.get(act.get("type"),
                                "%s %s" % (act.get("cost") or 1, act.get("type") or "")).strip(),
                "range": "Self" if rng.get("units") == "self" else (
                    "Touch" if rng.get("units") == "touch" else
                    ("%s %s" % (rng.get("value") or "", rng.get("units") or "")).strip()),
                "duration": "Instantaneous" if dur.get("units") == "inst" else (
                    ("%s %s" % (dur.get("value") or "", dur.get("units") or "")).strip()),
                "saveAttack": ("%s save" % ABIL_NAME.get(ABIL.get(save.get("ability"), ""), "")) if save.get("ability")
                              else ("Ranged power attack" if s.get("actionType") == "rsak"
                                    else ("Melee power attack" if s.get("actionType") == "msak" else "None")),
                "dice": " + ".join(parts) if parts else "None",
                "concentration": bool((s.get("components") or {}).get("concentration")),
            }
            summaries.setdefault(p["name"], power_summary(p))
    for kind in power_lists:
        for lvl in power_lists[kind]:
            power_lists[kind][lvl] = sorted(set(power_lists[kind][lvl]))

    species = sorted({s["name"] for s in load_dir("species")})
    backgrounds = sorted({b["name"] for b in load_dir("backgrounds")})

    data = {
        "chassis": chassis,
        "powercasting": powercasting,
        "classFeatures": class_features,
        "archetypes": {k: sorted(v) for k, v in arch_catalog.items()},
        "archetypeFeatures": arch_features,
        "archetypeLevels": {k: sorted(v) for k, v in arch_levels.items()},
        "powerLists": {k: {str(l): v for l, v in d.items()} for k, d in power_lists.items()},
        "powerMeta": power_meta,
        "species": species,
        "backgrounds": backgrounds,
        "summaries": summaries,
    }
    out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "sw5e-build.json")
    with open(out, "w", encoding="utf-8") as fh:
        json.dump(data, fh, ensure_ascii=False)
    print("classes", len(chassis))
    print("class features", sum(len(v) for v in class_features.values()))
    print("archetypes", sum(len(v) for v in data["archetypes"].values()))
    print("archetype features", sum(len(v) for v in arch_features.values()))
    print("force powers", sum(len(v) for v in power_lists["force"].values()))
    print("tech powers", sum(len(v) for v in power_lists["tech"].values()))
    print("species", len(species), "backgrounds", len(backgrounds))
    print("summaries", len(summaries))
    print("wrote", out, os.path.getsize(out) // 1024, "KB")


if __name__ == "__main__":
    main()
