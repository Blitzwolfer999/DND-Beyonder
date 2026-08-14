(function initMapLibrary(root) {
  "use strict";

  const MAP_SCENE_TEMPLATES = [
    { id: "dungeon-crossroads", name: "Dungeon Crossroads", category: "Dungeon", size: "30 x 20", previewTile: "mossy-stone", description: "A branching flagstone dungeon with chambers, choke points, and a shadowed vault." },
    { id: "forest-clearing", name: "Forest Clearing", category: "Wilderness", size: "30 x 20", previewTile: "forest", description: "A woodland encounter space with a winding trail, cover, and a shallow stream." },
    { id: "tavern-floor", name: "Tavern Floor", category: "Town", size: "24 x 16", previewTile: "wood-planks", description: "A warm timber tavern with a central rug, stone hearth, and back-room access." },
    { id: "town-square", name: "Town Square", category: "Town", size: "32 x 22", previewTile: "cobblestone", description: "A broad market square with roads, green edges, rooftops, and a fountain plaza." },
    { id: "cavern-pools", name: "Cavern Pools", category: "Dungeon", size: "30 x 20", previewTile: "cave-floor", description: "An irregular cavern divided by dark water, narrow ledges, and unstable stone." },
    { id: "snow-ruins", name: "Snowbound Ruins", category: "Wilderness", size: "30 x 20", previewTile: "snow", description: "Frozen ruins with broken walls, slick ice, and an exposed central approach." },
    { id: "dungeon-guardroom", name: "Dungeon Guardroom", category: "Dungeon", size: "24 x 16", previewTile: "flagstone", description: "A fortified guard post stocked with crates, barrels, tables, braziers, and a locked cell." },
    { id: "crypt-vault", name: "Crypt & Bone Vault", category: "Dungeon", size: "28 x 18", previewTile: "crypt-floor", description: "A shadowed burial vault of gravestones, scattered bones, cobwebs, and a glowing summoning circle." },
    { id: "throne-hall", name: "Throne Hall", category: "Town", size: "28 x 20", previewTile: "marble", description: "A grand marble hall with a checkered aisle, hanging banners, flanking statues, and a raised throne." },
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
    "stone-floor", "flagstone", "cracked-stone", "mossy-stone", "crypt-floor", "webbed-floor", "dungeon-wall", "brick-wall", "cave-floor", "chasm",
    "wood-planks", "dark-wood", "cobblestone", "marble", "checker-tile", "roof-tile", "rug", "grass", "forest", "dirt", "sand", "snow", "ice",
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

  function buildDungeon() {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    painter.fill("dungeon-wall");

    // Chambers
    painter.rect(8, 1, 14, 6, "flagstone");     // boss chamber (north)
    painter.rect(12, 9, 6, 5, "stone-floor");   // central crossroads
    painter.rect(11, 15, 8, 4, "flagstone");    // entrance hall (south)
    painter.rect(1, 8, 7, 7, "crypt-floor");    // west barracks
    painter.rect(22, 8, 7, 7, "mossy-stone");   // east treasure vault
    painter.rect(1, 1, 5, 5, "cracked-stone");  // secret vault (NW)
    painter.frame(12, 2, 6, 4, "cracked-stone");// raised ritual dais

    // Corridors (2-wide so tokens can pass)
    painter.rect(14, 6, 2, 4, "stone-floor");   // crossroads -> boss
    painter.rect(13, 13, 2, 3, "stone-floor");  // entrance -> crossroads
    painter.rect(7, 10, 6, 2, "stone-floor");   // crossroads -> barracks
    painter.rect(17, 10, 6, 2, "stone-floor");  // crossroads -> vault (trapped)
    painter.rect(3, 5, 2, 3, "stone-floor");    // barracks -> secret vault

    // Boss chamber: throne + summoning ritual, cover pillars, torchlight
    overlay.paint(14, 2, "altar");
    overlay.paint(14, 4, "summoning-circle");
    overlay.paint(11, 2, "brazier");
    overlay.paint(18, 2, "brazier");
    overlay.paint(9, 2, "stone-pillar");
    overlay.paint(20, 2, "stone-pillar");
    overlay.paint(9, 5, "stone-pillar");
    overlay.paint(20, 5, "stone-pillar");
    overlay.paint(8, 3, "wall-torch");
    overlay.paint(21, 3, "wall-torch");
    overlay.paint(12, 5, "bones");
    overlay.paint(17, 5, "bones");
    overlay.paint(14, 7, "wooden-door");

    // Crossroads cover
    overlay.paint(12, 9, "stone-pillar");
    overlay.paint(17, 9, "stone-pillar");
    overlay.paint(12, 13, "stone-pillar");
    overlay.paint(17, 13, "stone-pillar");

    // Entrance hall: the way in
    overlay.paint(13, 18, "stone-stairs");
    overlay.paint(16, 18, "stone-stairs");
    overlay.paint(11, 15, "wall-torch");
    overlay.paint(18, 15, "wall-torch");
    overlay.paint(13, 14, "wooden-door");

    // West barracks: bunks, mess table, arms
    overlay.paint(2, 9, "bed");
    overlay.paint(2, 11, "bed");
    overlay.paint(2, 13, "bed");
    overlay.paint(5, 10, "wooden-table");
    overlay.paint(6, 13, "barrel");
    overlay.paint(1, 8, "crate");
    overlay.paint(4, 8, "banner");
    overlay.paint(6, 9, "bones");
    overlay.paint(7, 11, "wooden-door");

    // Secret vault (behind the barracks)
    overlay.paint(3, 3, "treasure-chest");
    overlay.paint(2, 2, "crystals");
    overlay.paint(4, 4, "bones");
    overlay.paint(3, 6, "wooden-door");

    // East treasure vault, reached past a trapped corridor
    overlay.paint(18, 10, "spike-trap");
    overlay.paint(20, 11, "spike-trap");
    overlay.paint(21, 10, "wooden-door");
    overlay.paint(25, 10, "treasure-chest");
    overlay.paint(27, 12, "treasure-chest");
    overlay.paint(22, 13, "barrel");
    overlay.paint(23, 13, "barrel");
    overlay.paint(28, 8, "crate");
    overlay.paint(25, 13, "brazier");
    overlay.paint(22, 9, "wall-torch");
    overlay.paint(26, 9, "rubble");

    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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
    painter.ellipse(10, 13, 2, 2, "deep-water"); // forest pond
    painter.paint(10, 11, "dirt");
    painter.paint(12, 14, "dirt");
    painter.rect(13, 9, 4, 3, "grass");           // widened camp clearing
    const overlay = createPainter(columns, rows);
    overlay.paint(15, 10, "campfire");
    overlay.paint(11, 8, "shrub");
    overlay.paint(19, 12, "shrub");
    overlay.paint(12, 6, "shrub");
    overlay.paint(20, 15, "shrub");
    overlay.paint(9, 13, "ancient-tree");
    overlay.paint(21, 7, "ancient-tree");
    overlay.paint(7, 6, "ancient-tree");
    overlay.paint(23, 15, "ancient-tree");
    overlay.paint(14, 13, "mushrooms");
    overlay.paint(6, 11, "mushrooms");
    overlay.paint(18, 6, "mushrooms");
    overlay.paint(17, 8, "boulder");
    overlay.paint(13, 12, "boulder");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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
    const overlay = createPainter(columns, rows);
    overlay.paint(3, 3, "barrel");
    overlay.paint(4, 3, "barrel");
    overlay.paint(19, 9, "barrel");
    overlay.paint(9, 6, "wooden-table");
    overlay.paint(12, 7, "round-table");
    overlay.paint(10, 8, "wooden-table");
    overlay.paint(1, 1, "wall-torch");
    overlay.paint(22, 1, "wall-torch");
    overlay.paint(19, 4, "brazier");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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
    const overlay = createPainter(columns, rows);
    overlay.paint(16, 11, "fountain");
    overlay.paint(4, 3, "banner");
    overlay.paint(27, 3, "banner");
    overlay.paint(15, 6, "statue");
    overlay.paint(6, 10, "shrub");
    overlay.paint(25, 12, "shrub");
    overlay.paint(18, 15, "crate");
    overlay.paint(19, 15, "barrel");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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
    const overlay = createPainter(columns, rows);
    overlay.paint(10, 6, "crystals");
    overlay.paint(26, 11, "crystals");
    overlay.paint(5, 6, "mushrooms");
    overlay.paint(25, 15, "mushrooms");
    overlay.paint(14, 10, "boulder");
    overlay.paint(16, 10, "boulder");
    overlay.paint(8, 7, "wooden-bridge");
    overlay.paint(9, 7, "wooden-bridge");
    overlay.paint(6, 9, "campfire");
    overlay.paint(14, 9, "treasure-chest");
    overlay.paint(26, 13, "treasure-chest");
    overlay.paint(23, 11, "bones");
    overlay.paint(19, 11, "bones");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildSnow(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("snow");
    painter.rect(3, 3, 8, 6, "cracked-stone");    // NW roofless hall
    painter.frame(2, 2, 10, 8, "brick-wall");
    painter.rect(19, 11, 8, 6, "mossy-stone");    // SE shrine
    painter.frame(18, 10, 10, 8, "brick-wall");
    painter.rect(13, 6, 6, 6, "cracked-stone");   // central collapsed keep
    painter.frame(12, 5, 8, 8, "brick-wall");
    for (let x = 9; x < 21; x += 1) painter.paint(x, Math.round(9 + Math.sin(x / 3)), "dirt"); // linking path
    painter.ellipse(24, 4, 4, 2, "ice");          // frozen ponds
    painter.ellipse(6, 15, 3, 2, "ice");
    painter.rect(14, 8, 4, 2, "ice");
    painter.rect(8, 14, 3, 1, "brick-wall");       // broken wall fragments
    painter.rect(22, 6, 1, 3, "brick-wall");
    painter.rect(4, 12, 2, 1, "brick-wall");
    for (let index = 0; index < 16; index += 1) {
      painter.paint(Math.floor(random() * columns), Math.floor(random() * rows), random() > 0.6 ? "ice" : "snow");
    }
    const overlay = createPainter(columns, rows);
    overlay.paint(4, 4, "gravestone");            // NW graveyard
    overlay.paint(6, 4, "gravestone");
    overlay.paint(4, 6, "gravestone");
    overlay.paint(8, 7, "bones");
    overlay.paint(15, 8, "campfire");             // central camp
    overlay.paint(13, 6, "rubble");
    overlay.paint(18, 11, "rubble");
    overlay.paint(14, 11, "stone-pillar");
    overlay.paint(17, 6, "stone-pillar");
    overlay.paint(21, 12, "brazier");             // SE shrine
    overlay.paint(25, 15, "brazier");
    overlay.paint(23, 13, "banner");
    overlay.paint(22, 15, "bones");
    overlay.paint(6, 15, "crystals");             // frozen open ground
    overlay.paint(24, 4, "crystals");
    overlay.paint(10, 12, "boulder");
    overlay.paint(20, 5, "boulder");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildGuardroom() {
    const columns = 24;
    const rows = 16;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    painter.fill("dungeon-wall");
    painter.rect(1, 1, 22, 14, "flagstone");
    painter.frame(0, 0, columns, rows, "brick-wall");
    painter.rect(1, 1, 5, 4, "stone-floor");
    painter.rect(18, 1, 5, 4, "crypt-floor");
    painter.rect(18, 11, 5, 4, "cracked-stone");
    painter.rect(9, 6, 6, 5, "rug");
    overlay.paint(11, 0, "wooden-door");
    overlay.paint(2, 2, "barrel");
    overlay.paint(3, 2, "barrel");
    overlay.paint(2, 3, "crate");
    overlay.paint(4, 3, "crate");
    overlay.paint(10, 7, "wooden-table");
    overlay.paint(13, 8, "round-table");
    overlay.paint(1, 8, "wall-torch");
    overlay.paint(22, 8, "wall-torch");
    overlay.paint(6, 12, "brazier");
    overlay.paint(17, 12, "brazier");
    overlay.paint(20, 2, "bones");
    overlay.paint(11, 1, "banner");
    overlay.paint(5, 6, "stone-pillar");
    overlay.paint(18, 9, "stone-pillar");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildCrypt(seed) {
    const columns = 28;
    const rows = 18;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.rect(1, 1, 26, 16, "crypt-floor");
    painter.frame(0, 0, columns, rows, "brick-wall");
    painter.rect(11, 6, 6, 6, "flagstone");
    painter.rect(2, 2, 6, 4, "cracked-stone");
    painter.rect(20, 12, 6, 4, "mossy-stone");
    painter.rect(1, 1, 3, 3, "webbed-floor");
    painter.rect(24, 14, 3, 3, "webbed-floor");
    for (let index = 0; index < 16; index += 1) {
      const x = 1 + Math.floor(random() * 26);
      const y = 1 + Math.floor(random() * 16);
      if (random() > 0.6) painter.paint(x, y, "cracked-stone");
    }
    overlay.paint(14, 9, "summoning-circle");
    overlay.paint(3, 3, "gravestone");
    overlay.paint(5, 3, "gravestone");
    overlay.paint(3, 5, "gravestone");
    overlay.paint(23, 13, "gravestone");
    overlay.paint(25, 13, "gravestone");
    overlay.paint(10, 4, "bones");
    overlay.paint(18, 14, "bones");
    overlay.paint(8, 14, "bones");
    overlay.paint(21, 3, "bones");
    overlay.paint(12, 7, "brazier");
    overlay.paint(16, 7, "brazier");
    overlay.paint(1, 9, "wall-torch");
    overlay.paint(26, 9, "wall-torch");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildThrone() {
    const columns = 28;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    painter.fill("brick-wall");
    painter.rect(1, 1, 26, 18, "marble");
    painter.frame(0, 0, columns, rows, "brick-wall");
    painter.rect(12, 4, 4, 15, "checker-tile");
    painter.rect(9, 1, 10, 3, "flagstone");
    painter.rect(11, 1, 6, 2, "rug");
    overlay.paint(14, 2, "altar");
    overlay.paint(11, 2, "statue");
    overlay.paint(16, 2, "statue");
    overlay.paint(2, 2, "banner");
    overlay.paint(25, 2, "banner");
    overlay.paint(2, 9, "banner");
    overlay.paint(25, 9, "banner");
    overlay.paint(2, 16, "banner");
    overlay.paint(25, 16, "banner");
    overlay.paint(10, 7, "brazier");
    overlay.paint(17, 7, "brazier");
    overlay.paint(10, 13, "brazier");
    overlay.paint(17, 13, "brazier");
    overlay.paint(6, 5, "stone-pillar");
    overlay.paint(21, 5, "stone-pillar");
    overlay.paint(6, 14, "stone-pillar");
    overlay.paint(21, 14, "stone-pillar");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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
    else if (sceneId === "dungeon-guardroom") scene = buildGuardroom();
    else if (sceneId === "crypt-vault") scene = buildCrypt(seed);
    else if (sceneId === "throne-hall") scene = buildThrone();
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
