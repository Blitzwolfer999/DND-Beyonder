/* AD&D 2nd Edition equipment.
 *
 * As with the rest of the 2E data, these are mechanics rather than reproduced
 * text: armour ratings, damage dice, weapon speed factors and weights.
 *
 * Armor Class descends, so each armour records the AC it grants. "rating" is
 * how far below 10 that sits, which is what the Armor Class maths subtracts.
 * Weapons list damage against small or medium targets and against large ones
 * separately, the way 2E prints them, plus the speed factor that decides who
 * strikes first within an initiative count.
 */

const ADND_ARMOR = {
  "Padded armor": { ac: 8, rating: 2, cost: "4 gp", weight: 10,
    note: "Quilted cloth. Cheap, hot, and better than nothing." },
  "Leather armor": { ac: 8, rating: 2, cost: "5 gp", weight: 15,
    note: "Boiled and hardened hide, the standard light armour." },
  "Studded leather": { ac: 7, rating: 3, cost: "20 gp", weight: 25,
    note: "Leather reinforced with rivets." },
  "Ring mail": { ac: 7, rating: 3, cost: "100 gp", weight: 30,
    note: "Leather sewn with metal rings." },
  "Brigandine": { ac: 6, rating: 4, cost: "120 gp", weight: 35,
    note: "Metal plates riveted between layers of cloth." },
  "Scale mail": { ac: 6, rating: 4, cost: "120 gp", weight: 40,
    note: "Overlapping scales on a leather backing." },
  "Chain mail": { ac: 5, rating: 5, cost: "75 gp", weight: 40,
    note: "Interlocking rings over padding. The classic adventurer's armour." },
  "Splint mail": { ac: 4, rating: 6, cost: "80 gp", weight: 40,
    note: "Vertical metal strips on a leather base." },
  "Banded mail": { ac: 4, rating: 6, cost: "200 gp", weight: 35,
    note: "Overlapping horizontal bands over chain." },
  "Plate mail": { ac: 3, rating: 7, cost: "600 gp", weight: 50,
    note: "Shaped plates over chain and padding." },
  "Field plate": { ac: 2, rating: 8, cost: "2000 gp", weight: 60,
    note: "Fitted plate for battle, requiring help to don." },
  "Full plate": { ac: 1, rating: 9, cost: "4000 gp", weight: 70,
    note: "Master-forged and fitted to one wearer. The best armour in the game." },
  "Small shield": { ac: 0, rating: 1, cost: "3 gp", weight: 5, shield: true,
    note: "Improves Armor Class by 1 against attacks you can see coming." },
  "Medium shield": { ac: 0, rating: 1, cost: "7 gp", weight: 10, shield: true,
    note: "Improves Armor Class by 1, and can guard against two opponents." },
  "Body shield": { ac: 0, rating: 2, cost: "10 gp", weight: 15, shield: true,
    note: "A tower shield: Armor Class 2 better, but heavy and awkward." },
  "Buckler": { ac: 0, rating: 1, cost: "1 gp", weight: 3, shield: true,
    note: "Strapped to the forearm, improving Armor Class against one attacker." }
};

// Damage is printed against small-or-medium targets and against large ones.
// Speed factor breaks ties within an initiative count -- lower goes first.
const ADND_WEAPONS = {
  "Dagger": { group: "Blade", dmgSM: "1d4", dmgL: "1d3", speed: 2, cost: "2 gp", weight: 1, thrown: true },
  "Knife": { group: "Blade", dmgSM: "1d3", dmgL: "1d2", speed: 2, cost: "5 sp", weight: 1, thrown: true },
  "Short sword": { group: "Blade", dmgSM: "1d6", dmgL: "1d8", speed: 3, cost: "10 gp", weight: 3 },
  "Long sword": { group: "Blade", dmgSM: "1d8", dmgL: "1d12", speed: 5, cost: "15 gp", weight: 4 },
  "Broad sword": { group: "Blade", dmgSM: "2d4", dmgL: "1d6+1", speed: 5, cost: "10 gp", weight: 4 },
  "Bastard sword": { group: "Blade", dmgSM: "1d8", dmgL: "1d12", speed: 6, cost: "25 gp", weight: 10,
    note: "One or two handed; two-handed use raises the damage and the speed factor." },
  "Two-handed sword": { group: "Blade", dmgSM: "1d10", dmgL: "3d6", speed: 10, cost: "50 gp", weight: 15, twoHanded: true },
  "Scimitar": { group: "Blade", dmgSM: "1d8", dmgL: "1d8", speed: 5, cost: "15 gp", weight: 4 },
  "Rapier": { group: "Blade", dmgSM: "1d6", dmgL: "1d8", speed: 4, cost: "15 gp", weight: 4 },
  "Hand axe": { group: "Axe", dmgSM: "1d6", dmgL: "1d4", speed: 4, cost: "1 gp", weight: 5, thrown: true },
  "Battle axe": { group: "Axe", dmgSM: "1d8", dmgL: "1d8", speed: 7, cost: "5 gp", weight: 7 },
  "Halberd": { group: "Polearm", dmgSM: "1d10", dmgL: "2d6", speed: 9, cost: "10 gp", weight: 15, twoHanded: true },
  "Pike": { group: "Polearm", dmgSM: "1d6", dmgL: "1d12", speed: 13, cost: "5 gp", weight: 12, twoHanded: true },
  "Spear": { group: "Polearm", dmgSM: "1d6", dmgL: "1d8", speed: 6, cost: "8 sp", weight: 5, thrown: true },
  "Trident": { group: "Polearm", dmgSM: "1d6+1", dmgL: "3d4", speed: 7, cost: "15 gp", weight: 5 },
  "Club": { group: "Blunt", dmgSM: "1d6", dmgL: "1d3", speed: 4, cost: "-", weight: 3 },
  "Quarterstaff": { group: "Blunt", dmgSM: "1d6", dmgL: "1d6", speed: 4, cost: "-", weight: 4, twoHanded: true },
  "Mace, footman's": { group: "Blunt", dmgSM: "1d6+1", dmgL: "1d6", speed: 7, cost: "8 gp", weight: 10 },
  "Mace, horseman's": { group: "Blunt", dmgSM: "1d6", dmgL: "1d4", speed: 6, cost: "5 gp", weight: 6 },
  "Warhammer": { group: "Blunt", dmgSM: "1d4+1", dmgL: "1d4", speed: 4, cost: "2 gp", weight: 6 },
  "Flail, footman's": { group: "Blunt", dmgSM: "1d6+1", dmgL: "2d4", speed: 7, cost: "15 gp", weight: 15 },
  "Morning star": { group: "Blunt", dmgSM: "2d4", dmgL: "1d6+1", speed: 7, cost: "10 gp", weight: 12 },
  "Staff sling": { group: "Missile", dmgSM: "1d4+1", dmgL: "1d6+1", speed: 11, cost: "5 sp", weight: 1, missile: true, range: "30/60/90" },
  "Sling": { group: "Missile", dmgSM: "1d4", dmgL: "1d4", speed: 6, cost: "5 sp", weight: 0, missile: true, range: "40/80/160" },
  "Short bow": { group: "Missile", dmgSM: "1d6", dmgL: "1d6", speed: 7, cost: "30 gp", weight: 2, missile: true, range: "50/100/150" },
  "Long bow": { group: "Missile", dmgSM: "1d6", dmgL: "1d6", speed: 8, cost: "75 gp", weight: 3, missile: true, range: "70/140/210" },
  "Composite long bow": { group: "Missile", dmgSM: "1d6", dmgL: "1d6", speed: 7, cost: "100 gp", weight: 3, missile: true, range: "60/120/180" },
  "Light crossbow": { group: "Missile", dmgSM: "1d4", dmgL: "1d4", speed: 7, cost: "35 gp", weight: 7, missile: true, range: "60/120/180" },
  "Heavy crossbow": { group: "Missile", dmgSM: "1d4+1", dmgL: "1d6+1", speed: 10, cost: "50 gp", weight: 14, missile: true, range: "80/160/240" },
  "Dart": { group: "Missile", dmgSM: "1d3", dmgL: "1d2", speed: 2, cost: "5 sp", weight: 0, missile: true, thrown: true, range: "10/20/40" },
  "Javelin": { group: "Missile", dmgSM: "1d6", dmgL: "1d6", speed: 4, cost: "5 sp", weight: 2, missile: true, thrown: true, range: "20/40/60" }
};

const ADND_ARMOR_NAMES = Object.keys(ADND_ARMOR);
const ADND_WEAPON_NAMES = Object.keys(ADND_WEAPONS);

if (typeof window !== "undefined") {
  window.ADND_ARMOR = ADND_ARMOR;
  window.ADND_WEAPONS = ADND_WEAPONS;
  window.ADND_ARMOR_NAMES = ADND_ARMOR_NAMES;
  window.ADND_WEAPON_NAMES = ADND_WEAPON_NAMES;
}
