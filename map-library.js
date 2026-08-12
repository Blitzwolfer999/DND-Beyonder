(function initMapLibrary(root) {
  "use strict";

  const MAP_SCENE_TEMPLATES = [
    { id: "dungeon-crossroads", name: "Dungeon Crossroads", category: "Dungeon", size: "30 x 20", previewTile: "mossy-stone", description: "A branching flagstone dungeon with chambers, choke points, and a shadowed vault." },
    { id: "forest-clearing", name: "Forest Clearing", category: "Wilderness", size: "30 x 20", previewTile: "forest", description: "A woodland encounter space with a winding trail, cover, and a shallow stream." },
    { id: "tavern-floor", name: "Tavern Floor", category: "Town", size: "24 x 16", previewTile: "wood-planks", description: "A warm timber tavern with a central rug, stone hearth, and back-room access." },
    { id: "town-square", name: "Town Square", category: "Town", size: "32 x 22", previewTile: "cobblestone", description: "A broad market square with roads, green edges, rooftops, and a fountain plaza." },
    { id: "cavern-pools", name: "Cavern Pools", category: "Dungeon", size: "30 x 20", previewTile: "cave-floor", description: "An irregular cavern divided by dark water, narrow ledges, and unstable stone." },
    { id: "snow-ruins", name: "Snowbound Ruins", category: "Wilderness", size: "30 x 20", previewTile: "snow", description: "Frozen ruins with broken walls, slick ice, and an exposed central approach." },
  ];

  const MAP_ASSET_LIBRARY = [
    { id: "scribble-dungeons", name: "Scribble Dungeons", author: "Kenney", type: "Tiles, props, and tokens", license: "CC0", sourceUrl: "https://opengameart.org/content/scribble-dungeons", description: "A cohesive hand-drawn set with 256 PNG assets, vector sources, and a sample map." },
    { id: "top-down-dungeon", name: "Top Down Dungeon Pack", author: "Screaming Brain Studios", type: "Dungeon tiles", license: "CC0", sourceUrl: "https://opengameart.org/content/top-down-dungeon-pack", description: "A large 64px library of stone, dirt, sand, grass, wood, metal, and wall autotiles." },
    { id: "dungeon-pack", name: "Dungeon Pack", author: "nato", type: "Tiles, props, and creatures", license: "CC0", sourceUrl: "https://opengameart.org/content/dungeon-pack", description: "A compact top-down set with dungeon terrain, props, characters, enemies, and bosses." },
    { id: "forest-tilemap", name: "Forest Tilemap", author: "Vomdrache", type: "Wilderness tiles", license: "CC0", sourceUrl: "https://opengameart.org/content/forest-tilemap", description: "Fantasy grasslands, forest growth, trees, and crystal terrain for outdoor encounters." },
    { id: "simple-map-tiles", name: "Simple Map Tiles", author: "MELLE", type: "Fantasy world maps", license: "CC0", sourceUrl: "https://opengameart.org/content/simple-map-tiles", description: "Parchment, settlements, mountains, forests, roads, and an example fantasy region map." },
    { id: "spears-maps", name: "Spears of the Dawn Maps", author: "Sine Nomine Publishing", type: "Ready maps", license: "CC0 / public domain", sourceUrl: "https://opengameart.org/content/maps-for-an-africanfantasy-inspired-book-spears-of-the-dawn", description: "Villages, shrines, tombs, and dungeons supplied as unkeyed maps and editable source files." },
    { id: "fantasy-world-map", name: "Fantasy World Map", author: "Belohlavek", type: "Ready world map", license: "CC0", sourceUrl: "https://opengameart.org/content/fantasy-world-map", description: "A large finished fantasy world map suitable for travel, lore, and campaign overview scenes." },
  ];

  const SCENE_TILE_IDS = [
    "stone-floor", "flagstone", "cracked-stone", "mossy-stone", "crypt-floor", "dungeon-wall", "brick-wall", "cave-floor", "chasm",
    "wood-planks", "dark-wood", "cobblestone", "marble", "roof-tile", "rug", "grass", "forest", "dirt", "sand", "snow", "ice",
    "water", "deep-water", "lava", "acid", "shadow",
  ];

  function hashSeed(value) {
    let hash = 2166136261;
    for (const character of String(value || "map")) {
      hash ^= character.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let state = hashSeed(seed) || 1;
    return function random() {
      state += 0x6d2b79f5;
      let result = state;
      result = Math.imul(result ^ (result >>> 15), result | 1);
      result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
      return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
    };
  }

  function createPainter(columns, rows) {
    const cells = new Map();
    const inBounds = (x, y) => x >= 0 && y >= 0 && x < columns && y < rows;
    const paint = (x, y, tileId) => {
      if (inBounds(x, y)) cells.set(`${x}:${y}`, { x, y, tileId });
    };
    const fill = (tileId) => {
      for (let y = 0; y < rows; y += 1) for (let x = 0; x < columns; x += 1) paint(x, y, tileId);
    };
    const rect = (x, y, width, height, tileId) => {
      for (let row = y; row < y + height; row += 1) for (let column = x; column < x + width; column += 1) paint(column, row, tileId);
    };
    const frame = (x, y, width, height, tileId) => {
      for (let column = x; column < x + width; column += 1) {
        paint(column, y, tileId);
        paint(column, y + height - 1, tileId);
      }
      for (let row = y; row < y + height; row += 1) {
        paint(x, row, tileId);
        paint(x + width - 1, row, tileId);
      }
    };
    const ellipse = (centerX, centerY, radiusX, radiusY, tileId) => {
      for (let y = Math.floor(centerY - radiusY); y <= Math.ceil(centerY + radiusY); y += 1) {
        for (let x = Math.floor(centerX - radiusX); x <= Math.ceil(centerX + radiusX); x += 1) {
          const dx = (x - centerX) / Math.max(1, radiusX);
          const dy = (y - centerY) / Math.max(1, radiusY);
          if (dx * dx + dy * dy <= 1) paint(x, y, tileId);
        }
      }
    };
    const list = () => [...cells.values()].sort((a, b) => a.y - b.y || a.x - b.x);
    return { paint, fill, rect, frame, ellipse, list };
  }

  function buildDungeon(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.rect(2, 3, 9, 7, "flagstone");
    painter.rect(19, 2, 9, 8, "mossy-stone");
    painter.rect(3, 13, 10, 5, "crypt-floor");
    painter.rect(19, 13, 8, 5, "cracked-stone");
    painter.rect(10, 6, 10, 3, "stone-floor");
    painter.rect(8, 8, 3, 6, "stone-floor");
    painter.rect(12, 11, 8, 3, "stone-floor");
    painter.rect(22, 9, 3, 5, "stone-floor");
    painter.frame(13, 4, 5, 5, "mossy-stone");
    painter.rect(14, 5, 3, 3, "shadow");
    for (let index = 0; index < 18; index += 1) {
      const x = 3 + Math.floor(random() * 24);
      const y = 3 + Math.floor(random() * 14);
      if (random() > 0.45) painter.paint(x, y, random() > 0.5 ? "cracked-stone" : "mossy-stone");
    }
    return { columns, rows, tiles: painter.list() };
  }

  function buildForest(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("forest");
    painter.ellipse(15, 10, 9, 6, "grass");
    for (let x = 0; x < columns; x += 1) {
      const pathY = Math.round(11 + Math.sin(x / 4) * 2);
      painter.paint(x, pathY, "dirt");
      painter.paint(x, pathY + 1, "dirt");
    }
    for (let y = 0; y < rows; y += 1) {
      const streamX = Math.round(23 + Math.sin(y / 3));
      painter.paint(streamX, y, "water");
      if (y % 3 !== 0) painter.paint(streamX + 1, y, "water");
    }
    for (let index = 0; index < 34; index += 1) {
      const x = Math.floor(random() * columns);
      const y = Math.floor(random() * rows);
      if (Math.abs(x - 15) > 8 || Math.abs(y - 10) > 5) painter.paint(x, y, "forest");
    }
    return { columns, rows, tiles: painter.list() };
  }

  function buildTavern() {
    const columns = 24;
    const rows = 16;
    const painter = createPainter(columns, rows);
    painter.fill("brick-wall");
    painter.rect(1, 1, 22, 14, "wood-planks");
    painter.frame(0, 0, columns, rows, "brick-wall");
    painter.rect(8, 5, 8, 5, "rug");
    painter.rect(2, 2, 5, 4, "dark-wood");
    painter.rect(18, 2, 4, 5, "stone-floor");
    painter.rect(18, 8, 4, 6, "dark-wood");
    painter.rect(11, 0, 2, 2, "wood-planks");
    painter.paint(20, 3, "lava");
    return { columns, rows, tiles: painter.list() };
  }

  function buildTown() {
    const columns = 32;
    const rows = 22;
    const painter = createPainter(columns, rows);
    painter.fill("grass");
    painter.rect(0, 8, columns, 6, "cobblestone");
    painter.rect(13, 0, 6, rows, "cobblestone");
    painter.rect(9, 5, 14, 12, "flagstone");
    painter.rect(2, 2, 8, 5, "roof-tile");
    painter.rect(22, 2, 8, 5, "roof-tile");
    painter.rect(2, 15, 8, 5, "roof-tile");
    painter.rect(22, 15, 8, 5, "roof-tile");
    painter.ellipse(16, 11, 2, 2, "marble");
    painter.paint(16, 11, "water");
    return { columns, rows, tiles: painter.list() };
  }

  function buildCavern(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("chasm");
    painter.ellipse(8, 7, 7, 5, "cave-floor");
    painter.ellipse(21, 12, 7, 5, "cave-floor");
    painter.rect(8, 8, 14, 4, "cave-floor");
    painter.ellipse(8, 7, 3, 2, "deep-water");
    painter.ellipse(22, 13, 3, 2, "water");
    for (let index = 0; index < 28; index += 1) {
      const x = 2 + Math.floor(random() * 26);
      const y = 2 + Math.floor(random() * 16);
      if (random() > 0.55) painter.paint(x, y, "cracked-stone");
    }
    painter.rect(13, 9, 4, 2, "stone-floor");
    return { columns, rows, tiles: painter.list() };
  }

  function buildSnow(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("snow");
    painter.rect(4, 4, 9, 6, "cracked-stone");
    painter.frame(3, 3, 11, 8, "brick-wall");
    painter.rect(18, 10, 8, 6, "mossy-stone");
    painter.frame(17, 9, 10, 8, "brick-wall");
    painter.rect(12, 8, 7, 3, "ice");
    painter.ellipse(23, 4, 4, 2, "ice");
    for (let index = 0; index < 22; index += 1) {
      painter.paint(Math.floor(random() * columns), Math.floor(random() * rows), random() > 0.5 ? "ice" : "snow");
    }
    return { columns, rows, tiles: painter.list() };
  }

  function buildMapScene(sceneId, seed = "dnd-beyonder") {
    const template = MAP_SCENE_TEMPLATES.find((entry) => entry.id === sceneId);
    if (!template) return null;
    let scene;
    if (sceneId === "dungeon-crossroads") scene = buildDungeon(seed);
    else if (sceneId === "forest-clearing") scene = buildForest(seed);
    else if (sceneId === "tavern-floor") scene = buildTavern();
    else if (sceneId === "town-square") scene = buildTown();
    else if (sceneId === "cavern-pools") scene = buildCavern(seed);
    else scene = buildSnow(seed);
    return { ...scene, id: template.id, name: template.name, category: template.category, description: template.description };
  }

  function paintMapDataCells(data, tool, tileId, originX, originY, brushSize = 1, assetKind = "terrain") {
    const size = Math.min(4, Math.max(1, Number(brushSize || 1)));
    const changed = [];
    const key = (x, y) => `${Math.max(0, Number(x) || 0)},${Math.max(0, Number(y) || 0)}`;
    const tileMap = new Map((data.tiles || []).map(tile => [key(tile.x, tile.y), tile]));
    const overlayMap = new Map((data.overlays || []).map(tile => [key(tile.x, tile.y), tile]));
    const fogCells = new Set(data.fog?.cells || []);
    data.fog = data.fog || { enabled: false, cells: [] };
    for (let offsetY = 0; offsetY < size; offsetY += 1) {
      for (let offsetX = 0; offsetX < size; offsetX += 1) {
        const x = originX + offsetX;
        const y = originY + offsetY;
        if (x < 0 || y < 0 || x >= data.columns || y >= data.rows) continue;
        const cellKey = key(x, y);
        if (tool === "paint" && assetKind === "prop") overlayMap.set(cellKey, { x, y, tileId });
        if (tool === "paint" && assetKind !== "prop") tileMap.set(cellKey, { x, y, tileId });
        if (tool === "erase") {
          if (overlayMap.has(cellKey)) overlayMap.delete(cellKey);
          else tileMap.delete(cellKey);
        }
        if (tool === "fog-paint") {
          data.fog.enabled = true;
          fogCells.add(cellKey);
        }
        if (tool === "fog-erase") fogCells.delete(cellKey);
        changed.push({ x, y });
      }
    }
    data.tiles = [...tileMap.values()];
    data.overlays = [...overlayMap.values()];
    data.fog.cells = [...fogCells];
    if (!data.fog.cells.length) data.fog.enabled = false;
    return changed;
  }

  root.MAP_SCENE_TEMPLATES = MAP_SCENE_TEMPLATES;
  root.MAP_ASSET_LIBRARY = MAP_ASSET_LIBRARY;
  root.MAP_SCENE_TILE_IDS = SCENE_TILE_IDS;
  root.buildMapScene = buildMapScene;
  root.paintMapDataCells = paintMapDataCells;
  if (typeof module !== "undefined" && module.exports) module.exports = { MAP_SCENE_TEMPLATES, MAP_ASSET_LIBRARY, SCENE_TILE_IDS, buildMapScene, paintMapDataCells };
})(typeof window !== "undefined" ? window : globalThis);
