/* D&D 3.5 weapons.
 *
 * The weapon table is Open Game Content from the v3.5 System Reference
 * Document under the Open Game License v1.0a. See OGL-3.5.txt.
 *
 * 3.5 weapons differ from their 5e namesakes -- a 3.5 longsword is 1d8 with a
 * 19-20 threat range, and criticals multiply rather than rolling extra dice --
 * so the edition keeps its own table rather than borrowing the 5e catalogue.
 */

const D35_WEAPONS = {
  "Gauntlet": { category: "Simple", group: "Unarmed", cost: "2 gp", dmgSmall: "1d2", dmgMedium: "1d3", critical: "×2", weight: "1 lb.", type: "Bludgeoning" },
  "Unarmed strike": { category: "Simple", group: "Unarmed", cost: "—", dmgSmall: "1d23", dmgMedium: "1d33", critical: "×2", weight: "—", type: "Bludgeoning" },
  "Dagger": { category: "Simple", group: "Light melee", cost: "2 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "19-20/×2", weight: "1 lb.", type: "Piercing or slashing", range: "10 ft." },
  "Dagger, punching": { category: "Simple", group: "Light melee", cost: "2 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×3", weight: "1 lb.", type: "Piercing" },
  "Gauntlet, spiked": { category: "Simple", group: "Light melee", cost: "5 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "1 lb.", type: "Piercing" },
  "Mace, light": { category: "Simple", group: "Light melee", cost: "5 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "4 lb.", type: "Bludgeoning" },
  "Sickle": { category: "Simple", group: "Light melee", cost: "6 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "2 lb.", type: "Slashing" },
  "Club": { category: "Simple", group: "One-handed melee", cost: "—", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "3 lb.", type: "Bludgeoning", range: "10 ft." },
  "Mace, heavy": { category: "Simple", group: "One-handed melee", cost: "12 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×2", weight: "8 lb.", type: "Bludgeoning" },
  "Morningstar": { category: "Simple", group: "One-handed melee", cost: "8 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×2", weight: "6 lb.", type: "Bludgeoning and piercing" },
  "Shortspear": { category: "Simple", group: "One-handed melee", cost: "1 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "3 lb.", type: "Piercing", range: "20 ft." },
  "Longspear4": { category: "Simple", group: "Two-handed melee", cost: "5 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "9 lb.", type: "Piercing" },
  "Quarterstaff5": { category: "Simple", group: "Two-handed melee", cost: "—", dmgSmall: "1d4/1d4", dmgMedium: "1d6/1d6", critical: "×2", weight: "4 lb.", type: "Bludgeoning" },
  "Spear": { category: "Simple", group: "Two-handed melee", cost: "2 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "6 lb.", type: "Piercing", range: "20 ft." },
  "Crossbow, heavy": { category: "Simple", group: "Ranged", cost: "50 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "19-20/×2", weight: "8 lb.", type: "Piercing", range: "120 ft." },
  "Bolts, crossbow (10)": { category: "Simple", group: "Ranged", cost: "1 gp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "1 lb.", type: "—" },
  "Crossbow, light": { category: "Simple", group: "Ranged", cost: "35 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "19-20/×2", weight: "4 lb.", type: "Piercing", range: "80 ft." },
  "Dart": { category: "Simple", group: "Ranged", cost: "5 sp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "½ lb.", type: "Piercing", range: "20 ft." },
  "Javelin": { category: "Simple", group: "Ranged", cost: "1 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "2 lb.", type: "Piercing", range: "30 ft." },
  "Sling": { category: "Simple", group: "Ranged", cost: "—", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "0 lb.", type: "Bludgeoning", range: "50 ft." },
  "Bullets, sling (10)": { category: "Simple", group: "Ranged", cost: "1 sp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "5 lb.", type: "—" },
  "Axe, throwing": { category: "Martial", group: "Light melee", cost: "8 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "2 lb.", type: "Slashing", range: "10 ft." },
  "Hammer, light": { category: "Martial", group: "Light melee", cost: "1 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "2 lb.", type: "Bludgeoning", range: "20 ft." },
  "Handaxe": { category: "Martial", group: "Light melee", cost: "6 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×3", weight: "3 lb.", type: "Slashing" },
  "Kukri": { category: "Martial", group: "Light melee", cost: "8 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "18-20/×2", weight: "2 lb.", type: "Slashing" },
  "Pick, light": { category: "Martial", group: "Light melee", cost: "4 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×4", weight: "3 lb.", type: "Piercing" },
  "Sap": { category: "Martial", group: "Light melee", cost: "1 gp", dmgSmall: "1d43", dmgMedium: "1d63", critical: "×2", weight: "2 lb.", type: "Bludgeoning" },
  "Shield, light": { category: "Martial", group: "Light melee", cost: "special", dmgSmall: "1d2", dmgMedium: "1d3", critical: "×2", weight: "special", type: "Bludgeoning" },
  "Spiked armor": { category: "Martial", group: "Light melee", cost: "special", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "special", type: "Piercing" },
  "Spiked shield, light": { category: "Martial", group: "Light melee", cost: "special", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "special", type: "Piercing" },
  "Sword, short": { category: "Martial", group: "Light melee", cost: "10 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "19-20/×2", weight: "2 lb.", type: "Piercing" },
  "Battleaxe": { category: "Martial", group: "One-handed melee", cost: "10 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "6 lb.", type: "Slashing" },
  "Flail": { category: "Martial", group: "One-handed melee", cost: "8 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×2", weight: "5 lb.", type: "Bludgeoning" },
  "Longsword": { category: "Martial", group: "One-handed melee", cost: "15 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "19-20/×2", weight: "4 lb.", type: "Slashing" },
  "Pick, heavy": { category: "Martial", group: "One-handed melee", cost: "8 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×4", weight: "6 lb.", type: "Piercing" },
  "Rapier": { category: "Martial", group: "One-handed melee", cost: "20 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "18-20/×2", weight: "2 lb.", type: "Piercing" },
  "Scimitar": { category: "Martial", group: "One-handed melee", cost: "15 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "18-20/×2", weight: "4 lb.", type: "Slashing" },
  "Shield, heavy": { category: "Martial", group: "One-handed melee", cost: "special", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "special", type: "Bludgeoning" },
  "Spiked shield, heavy": { category: "Martial", group: "One-handed melee", cost: "special", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "special", type: "Piercing" },
  "Trident": { category: "Martial", group: "One-handed melee", cost: "15 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×2", weight: "4 lb.", type: "Piercing", range: "10 ft." },
  "Warhammer": { category: "Martial", group: "One-handed melee", cost: "12 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "5 lb.", type: "Bludgeoning" },
  "Falchion": { category: "Martial", group: "Two-handed melee", cost: "75 gp", dmgSmall: "1d6", dmgMedium: "2d4", critical: "18-20/×2", weight: "8 lb.", type: "Slashing" },
  "Glaive4": { category: "Martial", group: "Two-handed melee", cost: "8 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "×3", weight: "10 lb.", type: "Slashing" },
  "Greataxe": { category: "Martial", group: "Two-handed melee", cost: "20 gp", dmgSmall: "1d10", dmgMedium: "1d12", critical: "×3", weight: "12 lb.", type: "Slashing" },
  "Greatclub": { category: "Martial", group: "Two-handed melee", cost: "5 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "×2", weight: "8 lb.", type: "Bludgeoning" },
  "Flail, heavy": { category: "Martial", group: "Two-handed melee", cost: "15 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "19-20/×2", weight: "10 lb.", type: "Bludgeoning" },
  "Greatsword": { category: "Martial", group: "Two-handed melee", cost: "50 gp", dmgSmall: "1d10", dmgMedium: "2d6", critical: "19-20/×2", weight: "8 lb.", type: "Slashing" },
  "Guisarme4": { category: "Martial", group: "Two-handed melee", cost: "9 gp", dmgSmall: "1d6", dmgMedium: "2d4", critical: "×3", weight: "12 lb.", type: "Slashing" },
  "Halberd": { category: "Martial", group: "Two-handed melee", cost: "10 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "×3", weight: "12 lb.", type: "Piercing or slashing" },
  "Lance4": { category: "Martial", group: "Two-handed melee", cost: "10 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "10 lb.", type: "Piercing" },
  "Ranseur4": { category: "Martial", group: "Two-handed melee", cost: "10 gp", dmgSmall: "1d6", dmgMedium: "2d4", critical: "×3", weight: "12 lb.", type: "Piercing" },
  "Scythe": { category: "Martial", group: "Two-handed melee", cost: "18 gp", dmgSmall: "1d6", dmgMedium: "2d4", critical: "×4", weight: "10 lb.", type: "Piercing or slashing" },
  "Longbow": { category: "Martial", group: "Ranged", cost: "75 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "3 lb.", type: "Piercing", range: "100 ft." },
  "Arrows (20)": { category: "Martial", group: "Ranged", cost: "1 gp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "3 lb.", type: "—" },
  "Longbow, composite": { category: "Martial", group: "Ranged", cost: "100 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "×3", weight: "3 lb.", type: "Piercing", range: "110 ft." },
  "Shortbow": { category: "Martial", group: "Ranged", cost: "30 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×3", weight: "2 lb.", type: "Piercing", range: "60 ft." },
  "Shortbow, composite": { category: "Martial", group: "Ranged", cost: "75 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×3", weight: "2 lb.", type: "Piercing", range: "70 ft." },
  "Kama": { category: "Exotic", group: "Light melee", cost: "2 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "2 lb.", type: "Slashing" },
  "Nunchaku": { category: "Exotic", group: "Light melee", cost: "2 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "2 lb.", type: "Bludgeoning" },
  "Sai": { category: "Exotic", group: "Light melee", cost: "1 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "×2", weight: "1 lb.", type: "Bludgeoning", range: "10 ft." },
  "Siangham": { category: "Exotic", group: "Light melee", cost: "3 gp", dmgSmall: "1d4", dmgMedium: "1d6", critical: "×2", weight: "1 lb.", type: "Piercing" },
  "Sword, bastard": { category: "Exotic", group: "One-handed melee", cost: "35 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "19-20/×2", weight: "6 lb.", type: "Slashing" },
  "Waraxe, dwarven": { category: "Exotic", group: "One-handed melee", cost: "30 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "×3", weight: "8 lb.", type: "Slashing" },
  "Whip4": { category: "Exotic", group: "One-handed melee", cost: "1 gp", dmgSmall: "1d23", dmgMedium: "1d33", critical: "×2", weight: "2 lb.", type: "Slashing" },
  "Axe, orc double5": { category: "Exotic", group: "Two-handed melee", cost: "60 gp", dmgSmall: "1d6/1d6", dmgMedium: "1d8/1d8", critical: "×3", weight: "15 lb.", type: "Slashing" },
  "Chain, spiked4": { category: "Exotic", group: "Two-handed melee", cost: "25 gp", dmgSmall: "1d6", dmgMedium: "2d4", critical: "×2", weight: "10 lb.", type: "Piercing" },
  "Flail, dire5": { category: "Exotic", group: "Two-handed melee", cost: "90 gp", dmgSmall: "1d6/1d6", dmgMedium: "1d8/1d8", critical: "×2", weight: "10 lb.", type: "Bludgeoning" },
  "Hammer, gnome hooked5": { category: "Exotic", group: "Two-handed melee", cost: "20 gp", dmgSmall: "1d6/1d4", dmgMedium: "1d8/1d6", critical: "×3/×4", weight: "6 lb.", type: "Bludgeoning/Piercing" },
  "Sword, two-bladed5": { category: "Exotic", group: "Two-handed melee", cost: "100 gp", dmgSmall: "1d6/1d6", dmgMedium: "1d8/1d8", critical: "19-20/×2", weight: "10 lb.", type: "Slashing" },
  "Urgrosh, dwarven5": { category: "Exotic", group: "Two-handed melee", cost: "50 gp", dmgSmall: "1d6/1d4", dmgMedium: "1d8/1d6", critical: "×3", weight: "12 lb.", type: "Slashing or piercing" },
  "Bolas": { category: "Exotic", group: "Ranged", cost: "5 gp", dmgSmall: "1d33", dmgMedium: "1d43", critical: "×2", weight: "2 lb.", type: "Bludgeoning", range: "10 ft." },
  "Crossbow, hand": { category: "Exotic", group: "Ranged", cost: "100 gp", dmgSmall: "1d3", dmgMedium: "1d4", critical: "19-20/×2", weight: "2 lb.", type: "Piercing", range: "30 ft." },
  "Bolts (10)": { category: "Exotic", group: "Ranged", cost: "1 gp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "1 lb.", type: "—" },
  "Crossbow, repeating heavy": { category: "Exotic", group: "Ranged", cost: "400 gp", dmgSmall: "1d8", dmgMedium: "1d10", critical: "19-20/×2", weight: "12 lb.", type: "Piercing", range: "120 ft." },
  "Bolts (5)": { category: "Exotic", group: "Ranged", cost: "1 gp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "1 lb.", type: "—" },
  "Crossbow, repeating light": { category: "Exotic", group: "Ranged", cost: "250 gp", dmgSmall: "1d6", dmgMedium: "1d8", critical: "19-20/×2", weight: "6 lb.", type: "Piercing", range: "80 ft." },
  "Net": { category: "Exotic", group: "Ranged", cost: "20 gp", dmgSmall: "—", dmgMedium: "—", critical: "—", weight: "6 lb.", type: "—", range: "10 ft." },
  "Shuriken (5)": { category: "Exotic", group: "Ranged", cost: "1 gp", dmgSmall: "1", dmgMedium: "1d2", critical: "×2", weight: "½ lb.", type: "Piercing", range: "10 ft." }
};

const D35_WEAPON_NAMES = Object.keys(D35_WEAPONS).sort();

if (typeof window !== "undefined") {
  window.D35_WEAPONS = D35_WEAPONS;
  window.D35_WEAPON_NAMES = D35_WEAPON_NAMES;
}
