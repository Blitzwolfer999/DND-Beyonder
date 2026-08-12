(function initMapTokenLibrary(root) {
  "use strict";

  const MAP_TOKEN_LIBRARY = [
    { id: "town-guard", name: "Town Guard", category: "NPC", role: "Defender", color: "#315b78", ac: 16, hp: 18, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2", side: "ally" },
    { id: "veteran", name: "Veteran", category: "NPC", role: "Frontliner", color: "#5b6170", ac: 17, hp: 58, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d8 + 3", side: "ally" },
    { id: "scout", name: "Scout", category: "NPC", role: "Skirmisher", color: "#47704f", ac: 13, hp: 20, initiativeBonus: 3, attackBonus: 4, saveDc: 12, damage: "1d8 + 2", side: "ally" },
    { id: "apprentice-mage", name: "Apprentice Mage", category: "NPC", role: "Spellcaster", color: "#594d89", ac: 12, hp: 18, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "2d6", side: "ally" },
    { id: "temple-priest", name: "Temple Priest", category: "NPC", role: "Support", color: "#92713b", ac: 14, hp: 27, initiativeBonus: 0, attackBonus: 4, saveDc: 13, damage: "1d8 + 2", side: "ally" },
    { id: "travelling-merchant", name: "Travelling Merchant", category: "NPC", role: "Civilian", color: "#8b5b38", ac: 10, hp: 9, initiativeBonus: 0, attackBonus: 1, saveDc: 10, damage: "1d4", side: "ally" },
    { id: "goblin-raider", name: "Goblin Raider", category: "Humanoid", role: "Skirmisher", color: "#4e7135", ac: 15, hp: 10, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "1d6 + 2" },
    { id: "orc-warrior", name: "Orc Warrior", category: "Humanoid", role: "Brute", color: "#61733b", ac: 13, hp: 24, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d12 + 3" },
    { id: "kobold-skirmisher", name: "Kobold Skirmisher", category: "Humanoid", role: "Ambusher", color: "#9a5135", ac: 12, hp: 8, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "1d6 + 2" },
    { id: "gnoll-hunter", name: "Gnoll Hunter", category: "Humanoid", role: "Hunter", color: "#7d6539", ac: 15, hp: 27, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2" },
    { id: "hobgoblin-soldier", name: "Hobgoblin Soldier", category: "Humanoid", role: "Soldier", color: "#8b3d35", ac: 18, hp: 18, initiativeBonus: 1, attackBonus: 4, saveDc: 12, damage: "1d8 + 2" },
    { id: "bandit-captain", name: "Bandit Captain", category: "Humanoid", role: "Leader", color: "#634a3b", ac: 15, hp: 65, initiativeBonus: 3, attackBonus: 5, saveDc: 13, damage: "1d6 + 3" },
    { id: "wolf", name: "Wolf", category: "Beast", role: "Pack Hunter", color: "#59636a", ac: 13, hp: 12, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "2d4 + 2" },
    { id: "dire-wolf", name: "Dire Wolf", category: "Beast", role: "Large Brute", color: "#3f4850", ac: 14, hp: 42, initiativeBonus: 2, attackBonus: 5, saveDc: 13, damage: "2d6 + 3", size: 2 },
    { id: "brown-bear", name: "Brown Bear", category: "Beast", role: "Brute", color: "#6d4d32", ac: 11, hp: 34, initiativeBonus: 0, attackBonus: 5, saveDc: 13, damage: "2d6 + 4", size: 2 },
    { id: "giant-spider", name: "Giant Spider", category: "Beast", role: "Controller", color: "#403a47", ac: 14, hp: 26, initiativeBonus: 3, attackBonus: 5, saveDc: 12, damage: "1d8 + 3", size: 2 },
    { id: "giant-eagle", name: "Giant Eagle", category: "Beast", role: "Aerial Striker", color: "#806c43", ac: 13, hp: 32, initiativeBonus: 3, attackBonus: 5, saveDc: 12, damage: "2d6 + 3", size: 2 },
    { id: "skeleton", name: "Skeleton", category: "Undead", role: "Soldier", color: "#6b7072", ac: 13, hp: 13, initiativeBonus: 2, attackBonus: 4, saveDc: 11, damage: "1d6 + 2" },
    { id: "zombie", name: "Zombie", category: "Undead", role: "Brute", color: "#54644a", ac: 8, hp: 24, initiativeBonus: -2, attackBonus: 3, saveDc: 11, damage: "1d6 + 1" },
    { id: "ghoul", name: "Ghoul", category: "Undead", role: "Controller", color: "#5d5d64", ac: 12, hp: 26, initiativeBonus: 2, attackBonus: 4, saveDc: 12, damage: "2d4 + 2" },
    { id: "wight", name: "Wight", category: "Undead", role: "Commander", color: "#393f52", ac: 14, hp: 48, initiativeBonus: 2, attackBonus: 5, saveDc: 13, damage: "1d8 + 3" },
    { id: "vampire-spawn", name: "Vampire Spawn", category: "Undead", role: "Predator", color: "#7c2e39", ac: 15, hp: 82, initiativeBonus: 3, attackBonus: 6, saveDc: 14, damage: "2d6 + 3" },
    { id: "imp", name: "Imp", category: "Fiend", role: "Infiltrator", color: "#783635", ac: 13, hp: 12, initiativeBonus: 3, attackBonus: 5, saveDc: 11, damage: "1d4 + 3" },
    { id: "hell-hound", name: "Hell Hound", category: "Fiend", role: "Striker", color: "#a44027", ac: 15, hp: 45, initiativeBonus: 1, attackBonus: 5, saveDc: 12, damage: "1d8 + 3" },
    { id: "demon-brute", name: "Demon Brute", category: "Fiend", role: "Brute", color: "#793044", ac: 15, hp: 86, initiativeBonus: 1, attackBonus: 7, saveDc: 14, damage: "2d10 + 4", size: 2 },
    { id: "owlbear", name: "Owlbear", category: "Monstrosity", role: "Brute", color: "#71533c", ac: 13, hp: 60, initiativeBonus: 1, attackBonus: 7, saveDc: 14, damage: "2d8 + 5", size: 2 },
    { id: "mimic", name: "Mimic", category: "Monstrosity", role: "Ambusher", color: "#74502f", ac: 12, hp: 58, initiativeBonus: 1, attackBonus: 5, saveDc: 13, damage: "1d8 + 3" },
    { id: "basilisk", name: "Basilisk", category: "Monstrosity", role: "Controller", color: "#557241", ac: 15, hp: 58, initiativeBonus: -1, attackBonus: 5, saveDc: 12, damage: "2d6 + 3", size: 2 },
    { id: "young-dragon", name: "Young Dragon", category: "Dragon", role: "Boss", color: "#8d352d", ac: 18, hp: 145, initiativeBonus: 3, attackBonus: 8, saveDc: 15, damage: "2d10 + 5", size: 3 },
    { id: "wyvern", name: "Wyvern", category: "Dragon", role: "Aerial Brute", color: "#4f5d70", ac: 13, hp: 110, initiativeBonus: 0, attackBonus: 7, saveDc: 15, damage: "2d6 + 4", size: 3 },
    { id: "animated-armor", name: "Animated Armor", category: "Construct", role: "Defender", color: "#596778", ac: 18, hp: 34, initiativeBonus: 0, attackBonus: 4, saveDc: 12, damage: "1d6 + 2" },
    { id: "stone-golem", name: "Stone Golem", category: "Construct", role: "Boss", color: "#6a6964", ac: 17, hp: 178, initiativeBonus: -1, attackBonus: 10, saveDc: 17, damage: "3d8 + 6", size: 2 },
  ];

  const CATEGORY_MARKS = {
    NPC: "shield",
    Humanoid: "blades",
    Beast: "paw",
    Undead: "skull",
    Fiend: "horns",
    Monstrosity: "eye",
    Dragon: "wings",
    Construct: "rune",
  };

  function escapeXml(value) {
    return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[character]);
  }

  function tokenMark(category) {
    const mark = CATEGORY_MARKS[category] || "rune";
    if (mark === "shield") return '<path d="M50 18 76 29v20c0 19-11 28-26 35-15-7-26-16-26-35V29Z" fill="none" stroke="#fff" stroke-width="5"/>';
    if (mark === "blades") return '<path d="m28 24 44 52m0-52L28 76" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="50" cy="50" r="10" fill="none" stroke="#fff" stroke-width="4"/>';
    if (mark === "paw") return '<circle cx="50" cy="57" r="14" fill="#fff"/><circle cx="32" cy="37" r="7" fill="#fff"/><circle cx="47" cy="30" r="7" fill="#fff"/><circle cx="64" cy="35" r="7" fill="#fff"/>';
    if (mark === "skull") return '<path d="M29 47c0-15 9-25 21-25s21 10 21 25c0 11-6 18-12 21v10H41V68c-6-3-12-10-12-21Z" fill="#fff"/><circle cx="42" cy="48" r="5" fill="#222"/><circle cx="58" cy="48" r="5" fill="#222"/>';
    if (mark === "horns") return '<path d="M29 51C13 34 19 19 27 13c-1 14 7 18 15 22m29 16c16-17 10-32 2-38 1 14-7 18-15 22" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M34 62q16-28 32 0L50 81Z" fill="#fff"/>';
    if (mark === "eye") return '<path d="M18 51q32-32 64 0-32 32-64 0Z" fill="none" stroke="#fff" stroke-width="5"/><circle cx="50" cy="51" r="12" fill="#fff"/><circle cx="50" cy="51" r="5" fill="#222"/>';
    if (mark === "wings") return '<path d="M49 45C35 22 19 23 11 27c10 5 13 14 13 25l22 19m5-26c14-23 30-22 38-18-10 5-13 14-13 25L54 71" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round"/><path d="m50 35 8 25-8 21-8-21Z" fill="#fff"/>';
    return '<path d="m50 18 10 21 22 3-16 16 4 23-20-11-20 11 4-23-16-16 22-3Z" fill="none" stroke="#fff" stroke-width="5"/>';
  }

  function tokenPresetPortrait(presetOrId) {
    const preset = typeof presetOrId === "string" ? MAP_TOKEN_LIBRARY.find(item => item.id === presetOrId) : presetOrId;
    if (!preset) return "";
    const initials = preset.name.split(/\s+/).map(word => word[0]).join("").slice(0, 2).toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="g"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></radialGradient></defs><circle cx="50" cy="50" r="49" fill="${escapeXml(preset.color)}"/><circle cx="50" cy="50" r="43" fill="url(#g)" stroke="#f4dfb0" stroke-width="2"/>${tokenMark(preset.category)}<rect x="27" y="71" width="46" height="18" rx="9" fill="#111" fill-opacity=".78"/><text x="50" y="84" text-anchor="middle" fill="#fff" font-family="serif" font-size="14" font-weight="700">${escapeXml(initials)}</text></svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  }

  root.MAP_TOKEN_LIBRARY = MAP_TOKEN_LIBRARY;
  root.tokenPresetPortrait = tokenPresetPortrait;
  if (typeof module !== "undefined" && module.exports) module.exports = { MAP_TOKEN_LIBRARY, tokenPresetPortrait };
})(typeof window !== "undefined" ? window : globalThis);
