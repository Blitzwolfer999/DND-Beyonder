"""Second pass: add SW5E level tables, proficiencies, starting gear and the
equipment catalog to sw5e-build.json, using the official SW5E API."""
import json, os, re, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
API = "https://sw5eapi.azurewebsites.net/api/%s"


def fetch(name, cache):
    path = os.path.join(HERE, cache)
    if not os.path.exists(path):
        with urllib.request.urlopen(API % name, timeout=120) as r, open(path, "wb") as fh:
            fh.write(r.read())
    return json.load(open(path, encoding="utf-8"))


def num(text):
    m = re.search(r"\d+", str(text or ""))
    return int(m.group()) if m else 0


def ordinal(text):
    """'3rd' -> 3, '�' / '-' -> 0"""
    return num(text)


def main():
    build = json.load(open(os.path.join(HERE, "sw5e-build.json"), encoding="utf-8"))
    classes = fetch("class", "api_classes.json")
    equipment = fetch("equipment", "api_equipment.json")

    level_tables, profs, starting, wealth = {}, {}, {}, {}
    for c in classes:
        name = c["name"]
        if name not in build["chassis"]:
            continue
        rows = {}
        for lvl, row in (c.get("levelChanges") or {}).items():
            entry = {}
            for key, out in (("Force Powers Known", "powersKnown"),
                             ("Tech Powers Known", "powersKnown"),
                             ("Force Points", "powerPoints"),
                             ("Tech Points", "powerPoints"),
                             ("Max Power Level", "maxPowerLevel")):
                if key in row:
                    entry[out] = ordinal(row[key])
            # non-caster resource columns worth surfacing
            for key in ("Rages", "Rage Damage", "Superiority Dice", "Sneak Attack",
                        "Martial Arts", "Focus Points", "Unarmored Movement"):
                if key in row and str(row[key]).strip() not in ("", "�", "-"):
                    entry.setdefault("columns", {})[key] = str(row[key]).strip()
            if entry:
                rows[int(lvl)] = entry
        if rows:
            level_tables[name] = rows
        profs[name] = {
            "armor": [a for a in (c.get("armorProficiencies") or []) if a and a != "None"],
            "weapons": [w for w in (c.get("weaponProficiencies") or []) if w and w != "None"],
            "tools": [t for t in (c.get("toolProficienciesList") or []) if t and t != "None"],
        }
        starting[name] = [re.sub(r"[*_]", "", l).lstrip("- ").strip()
                          for l in (c.get("equipmentLines") or [])]
        wealth[name] = c.get("startingWealthVariant") or ""

    # ---- equipment catalog ----
    DIE = {}
    items, armor_rules = [], {}
    for e in equipment:
        cat = e.get("equipmentCategory")
        name = e.get("name")
        if not name:
            continue
        cost = "%s cr" % e["cost"] if e.get("cost") else "—"
        weight = float(e["weight"]) if str(e.get("weight") or "").replace(".", "", 1).isdigit() else 0
        props = [p for p in (e.get("properties") or []) if p]
        if cat == "Weapon":
            dice, die = e.get("damageNumberOfDice") or 0, e.get("damageDieType") or 0
            dmg = "%sd%s" % (dice, die) if dice and die else ""
            dtype = (e.get("damageType") or "").lower()
            cls = e.get("weaponClassification") or "Weapon"
            kind = re.sub(r"(?<!^)(?=[A-Z])", " ", cls)
            details = " · ".join(filter(None, [
                ("%s %s" % (dmg, dtype)).strip() if dmg else "",
                ", ".join(props) if props else "",
            ]))
            items.append({"name": name, "type": "%s Weapon" % kind, "cost": cost,
                          "weight": weight, "details": details})
        elif cat == "Armor":
            ac = num(e.get("ac"))
            klass = e.get("armorClassification") or "Light"
            items.append({"name": name, "type": "%s Armor" % klass, "cost": cost,
                          "weight": weight,
                          "details": " · ".join(filter(None, ["AC %s" % ac if ac else "",
                                                              ", ".join(props) if props else ""]))})
            if ac:
                armor_rules[name] = {
                    "base": ac,
                    "dex": 99 if klass == "Light" else (2 if klass == "Medium" else 0),
                    "type": "%s Armor" % klass,
                }
        else:
            label = re.sub(r"(?<!^)(?=[A-Z])", " ", cat or "Gear")
            items.append({"name": name, "type": label, "cost": cost, "weight": weight,
                          "details": ", ".join(props)})

    build.update({
        "levelTables": level_tables,
        "proficiencies": profs,
        "startingEquipment": starting,
        "startingWealth": wealth,
        "equipment": items,
        "armorRules": armor_rules,
    })
    json.dump(build, open(os.path.join(HERE, "sw5e-build.json"), "w", encoding="utf-8"),
              ensure_ascii=False)
    print("level tables:", {k: len(v) for k, v in level_tables.items()})
    print("caster tables:", {k: v.get(1, {}) for k, v in level_tables.items() if 1 in v and "powersKnown" in v[1]})
    print("equipment items:", len(items), "| armor rules:", len(armor_rules))
    print("sample weapon:", next(i for i in items if "Weapon" in i["type"]))


if __name__ == "__main__":
    main()
