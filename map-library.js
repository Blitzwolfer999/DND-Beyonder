(function initMapLibrary(root) {
  "use strict";

  const MAP_SCENE_TEMPLATES = [
    { id: "classic-goblin-mine", name: "Goblin Mine Ambush", category: "Dungeon", size: "34 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["cave-floor", "chasm", "cracked-stone", "mine-track"], ambience: "torchlight", tags: "classic goblin mine cave ambush rails bridge", features: ["Three approach lanes", "Mine-cart cover", "Rope bridge chokepoint"], tactics: "A low-level cave assault with crossfire ledges, a trapped rail lane, and a boss den beyond a narrow bridge.", description: "A sprawling goblin mine with branching tunnels, ore works, a guarded rope bridge, and a cluttered boss den." },
    { id: "classic-dragon-hoard", name: "Dragon's Hoard Cavern", category: "Dungeon", size: "36 x 24", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["volcanic-rock", "obsidian", "lava", "gold-floor"], ambience: "embers", tags: "classic dragon lair hoard lava boss cavern", features: ["Central boss dais", "Lava hazard lanes", "Cliffside flanking paths"], tactics: "A cinematic boss arena with a visible treasure objective, dangerous lava channels, and side ledges that reward movement.", description: "A vast volcanic lair where a treasure dais rises between lava channels, broken columns, and dragon-scorched ledges." },
    { id: "classic-vampire-ballroom", name: "Vampire Manor Ballroom", category: "Horror", size: "32 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["marble", "checker-tile", "rug", "dark-wood"], ambience: "moonlight", tags: "classic vampire manor ballroom gothic coffin", features: ["Grand dance floor", "Raised side galleries", "Hidden coffin chamber"], tactics: "A social scene turned battle, with open central sightlines, furniture cover, balcony stairs, and a concealed retreat room.", description: "A moonlit gothic ballroom with a grand dance floor, banquet galleries, pipe organ, and a secret coffin chamber." },
    { id: "classic-lich-crypt", name: "Lich's Ritual Crypt", category: "Horror", size: "34 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["crypt-floor", "rune-stone", "shadow", "obsidian"], ambience: "arcane", tags: "classic lich crypt ritual undead phylactery", features: ["Four ritual anchors", "Sarcophagus cover", "Phylactery vault"], tactics: "A multi-objective crypt fight where the party can disrupt ritual anchors before crossing the central death circle.", description: "An ancient burial complex centered on a death ritual, guarded sarcophagi, and a sealed phylactery vault." },
    { id: "classic-orc-war-camp", name: "Orc War Camp", category: "Wilderness", size: "36 x 24", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["dead-grass", "dirt", "palisade-wall", "forest"], ambience: "sunset", tags: "classic orc war camp palisade tents assault", features: ["Fortified palisade", "Watchtower crossfire", "Two breach points"], tactics: "A fortified assault with a visible front gate, a damaged side wall, sentry towers, traps, and dense camp cover.", description: "A heavily occupied war camp behind timber walls, with watchtowers, tents, supply lanes, and a vulnerable breach." },
    { id: "classic-haunted-forest", name: "Haunted Forest Shrine", category: "Horror", size: "34 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["forest", "dead-grass", "bog-water", "temple-tile"], ambience: "mist", tags: "classic haunted forest shrine ghosts ruins", features: ["Winding approach", "Foggy stream crossing", "Corrupted shrine"], tactics: "A visibility-focused wilderness encounter with twisted cover, water crossings, graves, and a ritual site at the far end.", description: "A twisted woodland path leads through graves and black water to a ruined shrine pulsing beneath the mist." },
    { id: "classic-sunken-temple", name: "Sunken Temple", category: "Dungeon", size: "34 x 24", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["deep-water", "shallow-water", "temple-tile", "mossy-stone"], ambience: "mist", tags: "classic sunken temple flooded ruins water", features: ["Flooded movement lanes", "Broken causeways", "Dry altar island"], tactics: "A flooded ruin where causeways control movement, side pools hide threats, and the dry central altar becomes contested ground.", description: "A half-drowned temple of broken causeways, submerged chambers, lily-covered pools, and a dry ritual island." },
    { id: "classic-dwarven-forge", name: "Dwarven Forge Hall", category: "Dungeon", size: "36 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["flagstone", "mine-track", "obsidian", "lava"], ambience: "embers", tags: "classic dwarf forge lava mine industrial", features: ["Twin molten channels", "Working forge stations", "Ore-cart rail lane"], tactics: "An industrial battle map with hot-zone lanes, sturdy workbench cover, rail access, and a commanding central forge platform.", description: "A monumental forge hall crossed by molten channels, ore rails, anvils, bellows, and heavy stone machinery." },
    { id: "classic-wizard-library", name: "Wizard Tower Library", category: "Arcane", size: "32 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["slate-floor", "rune-stone", "temple-tile", "rug"], ambience: "arcane", tags: "classic wizard tower library books portal", features: ["Bookshelf maze", "Portal anchors", "Central spell dais"], tactics: "A spellcaster arena with broken sightlines, flammable-looking book stacks, four magical anchors, and a central objective.", description: "A circular tower library packed with book stacks, study alcoves, unstable portals, and a rune-carved spell dais." },
    { id: "classic-castle-siege", name: "Castle Siege Courtyard", category: "Town", size: "38 x 24", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["grass", "cobblestone", "dungeon-wall", "cracked-stone"], ambience: "storm", tags: "classic castle siege courtyard breach battle", features: ["Gatehouse approach", "Collapsed wall breach", "Defensive barricades"], tactics: "A large assault map supporting gate combat, a rubble breach, wall positions, civilian structures, and multiple reinforcement routes.", description: "A storm-lashed castle courtyard under siege, with a breached wall, fortified gatehouse, barricades, and burning supplies." },
    { id: "classic-frost-giant-pass", name: "Frost Giant Mountain Pass", category: "Wilderness", size: "36 x 22", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["snow", "ice", "chasm", "rune-stone"], ambience: "snowfall", tags: "classic frost giant mountain pass ice bridge", features: ["Narrow ice bridge", "Cliffside ledges", "Giant rune camp"], tactics: "A dangerous mountain crossing with forced movement risk, split-height-looking ledges, a giant camp, and an icy boss circle.", description: "A frozen mountain pass spans a deep chasm between wind-cut ledges, giant runestones, and a rough hunting camp." },
    { id: "classic-pirate-cove", name: "Pirate Cove & Docks", category: "Coastal", size: "36 x 24", pack: "classic-encounters", packName: "Classic Encounters", previewTiles: ["deep-water", "sand", "wooden-deck", "cave-floor"], ambience: "sunset", tags: "classic pirate cove docks ship treasure cave", features: ["Dockside skirmish", "Moored cutter", "Hidden treasure grotto"], tactics: "An amphibious encounter with long dock lanes, open-water danger, a playable ship deck, and a cave route around the flank.", description: "A defended pirate cove with timber docks, a moored cutter, cargo yards, sea caves, and a hidden treasure grotto." },
    { id: "dungeon-crossroads", name: "Dungeon Crossroads", category: "Dungeon", size: "30 x 20", previewTiles: ["dungeon-wall", "flagstone", "mossy-stone", "shadow"], ambience: "torchlight", tags: "vault corridors traps ritual", description: "A branching flagstone dungeon with chambers, choke points, and a shadowed vault." },
    { id: "forest-clearing", name: "Forest Clearing", category: "Wilderness", size: "30 x 20", previewTiles: ["forest", "grass", "dirt", "water"], ambience: "clear", tags: "woods stream camp ambush", description: "A woodland encounter space with a winding trail, cover, and a shallow stream." },
    { id: "tavern-floor", name: "Tavern Floor", category: "Town", size: "24 x 16", previewTiles: ["wood-planks", "rug", "dark-wood", "brick-wall"], ambience: "torchlight", tags: "inn bar brawl interior", description: "A warm timber tavern with a central rug, stone hearth, and back-room access." },
    { id: "town-square", name: "Town Square", category: "Town", size: "32 x 22", previewTiles: ["cobblestone", "flagstone", "grass", "roof-tile"], ambience: "clear", tags: "market city fountain street", description: "A broad market square with roads, green edges, rooftops, and a fountain plaza." },
    { id: "cavern-pools", name: "Cavern Pools", category: "Dungeon", size: "30 x 20", previewTiles: ["cave-floor", "deep-water", "chasm", "cracked-stone"], ambience: "mist", tags: "underdark cave water bridge", description: "An irregular cavern divided by dark water, narrow ledges, and unstable stone." },
    { id: "snow-ruins", name: "Snowbound Ruins", category: "Wilderness", size: "30 x 20", previewTiles: ["snow", "ice", "cracked-stone", "brick-wall"], ambience: "snowfall", tags: "winter frozen shrine keep", description: "Frozen ruins with broken walls, slick ice, and an exposed central approach." },
    { id: "dungeon-guardroom", name: "Dungeon Guardroom", category: "Dungeon", size: "24 x 16", previewTiles: ["flagstone", "brick-wall", "crypt-floor", "rug"], ambience: "torchlight", tags: "fort guard cell barracks", description: "A fortified guard post stocked with crates, barrels, tables, braziers, and a locked cell." },
    { id: "crypt-vault", name: "Crypt & Bone Vault", category: "Horror", size: "28 x 18", previewTiles: ["crypt-floor", "webbed-floor", "cracked-stone", "shadow"], ambience: "moonlight", tags: "undead tomb grave necromancy", description: "A shadowed burial vault of gravestones, scattered bones, cobwebs, and a glowing summoning circle." },
    { id: "throne-hall", name: "Throne Hall", category: "Town", size: "28 x 20", previewTiles: ["marble", "checker-tile", "rug", "flagstone"], ambience: "clear", tags: "palace court royal interior", description: "A grand marble hall with a checkered aisle, hanging banners, flanking statues, and a raised throne." },
    { id: "ruined-temple", name: "Ruined Temple", category: "Dungeon", size: "30 x 20", previewTiles: ["temple-tile", "cracked-stone", "mossy-stone", "dungeon-wall"], ambience: "moonlight", tags: "altar shrine ruins cult", description: "A roofless sanctuary with broken columns, a ritual dais, and rubble-choked side chapels." },
    { id: "sewer-junction", name: "Sewer Junction", category: "Dungeon", size: "28 x 18", previewTiles: ["sewer-stone", "wet-cobble", "bog-water", "brick-wall"], ambience: "mist", tags: "city tunnels water grate", description: "A wet undercity junction of raised walkways, barred channels, ladders, and maintenance rooms." },
    { id: "bandit-camp", name: "Bandit Camp", category: "Wilderness", size: "30 x 20", previewTiles: ["grass", "dead-grass", "dirt", "forest"], ambience: "sunset", tags: "outlaws tents camp road", description: "A defended woodland camp with tents, wagons, a cookfire, and several lines of approach." },
    { id: "swamp-causeway", name: "Swamp Causeway", category: "Wilderness", size: "30 x 20", previewTiles: ["swamp", "bog-water", "mud", "shallow-water"], ambience: "mist", tags: "marsh bog bridge ruins", description: "A flooded marsh crossed by a broken causeway, tangled growth, and a half-sunken shrine." },
    { id: "desert-oasis", name: "Desert Oasis", category: "Wilderness", size: "30 x 20", previewTiles: ["sand", "desert-rock", "shallow-water", "sandstone"], ambience: "sunset", tags: "desert camp palms ruin", description: "A palm-ringed oasis between sandstone ruins, dunes, and a caravan campsite." },
    { id: "volcanic-forge", name: "Volcanic Forge", category: "Hazard", size: "30 x 20", previewTiles: ["volcanic-rock", "lava", "obsidian", "ash-ground"], ambience: "embers", tags: "fire forge lava boss", description: "An ancient forge spanning lava channels with obsidian platforms and a blazing central anvil." },
    { id: "wizard-laboratory", name: "Wizard Laboratory", category: "Arcane", size: "28 x 18", previewTiles: ["rune-stone", "slate-floor", "obsidian", "temple-tile"], ambience: "arcane", tags: "magic tower books experiment", description: "A rune-lit laboratory packed with bookcases, crystals, experiments, and unstable portals." },
    { id: "ship-deck", name: "Stormbound Ship", category: "Coastal", size: "30 x 16", previewTiles: ["deep-water", "wooden-deck", "dark-wood", "water"], ambience: "storm", tags: "ship ocean pirate deck", description: "A broad sailing ship deck with raised ends, rigging, cargo, and dangerous open water." },
    { id: "castle-gate", name: "Castle Gate", category: "Town", size: "32 x 20", previewTiles: ["stone-floor", "cobblestone", "dungeon-wall", "grass"], ambience: "clear", tags: "siege walls courtyard city", description: "A fortified gatehouse and courtyard with battlements, a portcullis, and flanking guard posts." },
    { id: "graveyard-chapel", name: "Graveyard Chapel", category: "Horror", size: "30 x 20", previewTiles: ["dead-grass", "crypt-floor", "mud", "brick-wall"], ambience: "moonlight", tags: "cemetery undead chapel tomb", description: "A moonlit cemetery surrounding a ruined chapel, mausoleum, and freshly opened graves." },
    { id: "mushroom-grotto", name: "Mushroom Grotto", category: "Arcane", size: "30 x 20", previewTiles: ["fungal-floor", "cave-floor", "shallow-water", "chasm"], ambience: "arcane", tags: "fey underdark cave crystals", description: "A luminous grotto of giant fungi, crystal shelves, pools, and narrow stone crossings." },
    { id: "farmstead-raid", name: "Farmstead Raid", category: "Wilderness", size: "32 x 20", previewTiles: ["farmland", "grass", "dirt", "roof-tile"], ambience: "sunset", tags: "farm village road barn", description: "A rural homestead with fenced fields, a barn, cottage, well, and defensible wagon lane." }
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
    "water", "deep-water", "shallow-water", "bog-water", "lava", "acid", "shadow", "wet-cobble", "sewer-stone", "temple-tile", "rune-stone",
    "slate-floor", "wooden-deck", "dead-grass", "desert-rock", "ash-ground", "volcanic-rock", "farmland", "fungal-floor", "mud", "obsidian", "sandstone", "swamp",
    "mine-track", "gold-floor", "palisade-wall",
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
    const line = (startX, startY, endX, endY, tileId, width = 1) => {
      const steps = Math.max(Math.abs(endX - startX), Math.abs(endY - startY), 1);
      for (let step = 0; step <= steps; step += 1) {
        const x = Math.round(startX + ((endX - startX) * step) / steps);
        const y = Math.round(startY + ((endY - startY) * step) / steps);
        for (let offsetY = 0; offsetY < width; offsetY += 1) {
          for (let offsetX = 0; offsetX < width; offsetX += 1) paint(x + offsetX, y + offsetY, tileId);
        }
      }
    };
    const list = () => [...cells.values()].sort((a, b) => a.y - b.y || a.x - b.x);
    return { paint, fill, rect, frame, ellipse, line, list };
  }

  function scatterProps(painter, random, tileIds, count, columns, rows, margin = 1) {
    for (let index = 0; index < count; index += 1) {
      const x = margin + Math.floor(random() * Math.max(1, columns - margin * 2));
      const y = margin + Math.floor(random() * Math.max(1, rows - margin * 2));
      painter.paint(x, y, tileIds[index % tileIds.length]);
    }
  }

  function scatterPropsInRect(painter, random, tileIds, count, x, y, width, height) {
    for (let index = 0; index < count; index += 1) {
      painter.paint(x + Math.floor(random() * Math.max(1, width)), y + Math.floor(random() * Math.max(1, height)), tileIds[index % tileIds.length]);
    }
  }

  function buildClassicGoblinMine(seed) {
    const columns = 34;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("chasm");
    painter.ellipse(7, 18, 7, 4, "cave-floor");
    painter.ellipse(15, 13, 7, 5, "cracked-stone");
    painter.ellipse(26, 6, 7, 5, "mossy-stone");
    painter.ellipse(7, 6, 5, 4, "cave-floor");
    painter.line(6, 18, 14, 13, "cave-floor", 3);
    painter.line(16, 12, 24, 7, "cave-floor", 2);
    painter.line(7, 15, 7, 7, "mine-track", 2);
    painter.line(9, 6, 19, 6, "mine-track", 1);
    painter.rect(19, 5, 4, 3, "cracked-stone");
    painter.ellipse(27, 6, 3, 2, "crypt-floor");
    overlay.paint(18, 6, "mine-cart");
    overlay.paint(11, 12, "mine-cart");
    overlay.paint(7, 15, "mine-cart");
    overlay.paint(21, 6, "rope-bridge");
    overlay.paint(22, 6, "rope-bridge");
    overlay.paint(27, 5, "treasure-chest");
    overlay.paint(27, 7, "wooden-table");
    overlay.paint(25, 8, "campfire");
    overlay.paint(4, 18, "spike-trap");
    overlay.paint(12, 14, "wooden-door");
    scatterPropsInRect(overlay, random, ["ore-vein", "stalagmite", "boulder"], 18, 3, 3, 28, 16);
    scatterPropsInRect(overlay, random, ["crate", "barrel", "bones"], 12, 23, 3, 8, 7);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicDragonHoard(seed) {
    const columns = 36;
    const rows = 24;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("volcanic-rock");
    painter.ellipse(18, 12, 16, 10, "cave-floor");
    painter.ellipse(18, 10, 8, 6, "obsidian");
    painter.ellipse(18, 10, 4, 3, "gold-floor");
    painter.line(0, 7, 14, 11, "lava", 2);
    painter.line(22, 11, 34, 5, "lava", 2);
    painter.line(6, 20, 14, 15, "cracked-stone", 3);
    painter.line(28, 20, 22, 15, "cracked-stone", 2);
    painter.rect(3, 4, 8, 4, "ash-ground");
    painter.rect(27, 3, 6, 4, "ash-ground");
    overlay.paint(18, 10, "gold-hoard");
    overlay.paint(17, 9, "treasure-chest");
    overlay.paint(19, 11, "treasure-chest");
    overlay.paint(8, 6, "dragon-bones");
    overlay.paint(29, 5, "dragon-bones");
    overlay.paint(18, 6, "brazier");
    overlay.paint(14, 10, "stone-stairs");
    overlay.paint(22, 10, "stone-stairs");
    [[12, 7], [24, 7], [12, 14], [24, 14], [6, 12], [30, 12]].forEach(([x, y]) => overlay.paint(x, y, "stone-pillar"));
    scatterPropsInRect(overlay, random, ["stalagmite", "crystals", "boulder"], 24, 2, 2, 32, 20);
    scatterPropsInRect(overlay, random, ["gold-hoard", "bones"], 10, 14, 8, 9, 7);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicVampireBallroom() {
    const columns = 32;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    painter.fill("brick-wall");
    painter.rect(1, 1, 30, 20, "marble");
    painter.frame(0, 0, columns, rows, "brick-wall");
    painter.rect(10, 5, 12, 12, "checker-tile");
    painter.rect(13, 3, 6, 16, "rug");
    painter.rect(2, 2, 6, 18, "dark-wood");
    painter.rect(24, 2, 6, 18, "dark-wood");
    painter.rect(11, 1, 10, 4, "slate-floor");
    painter.rect(2, 15, 5, 5, "crypt-floor");
    overlay.paint(16, 2, "pipe-organ");
    overlay.paint(4, 17, "coffin");
    overlay.paint(7, 17, "bookshelf");
    overlay.paint(8, 10, "stone-stairs");
    overlay.paint(23, 10, "stone-stairs");
    [[4, 4], [4, 9], [4, 14], [27, 4], [27, 9], [27, 14]].forEach(([x, y]) => overlay.paint(x, y, "round-table"));
    [[10, 5], [21, 5], [10, 16], [21, 16], [15, 7], [16, 14]].forEach(([x, y]) => overlay.paint(x, y, "candelabra"));
    [[1, 1], [30, 1], [1, 20], [30, 20]].forEach(([x, y]) => overlay.paint(x, y, "statue"));
    overlay.paint(15, 20, "wooden-door");
    overlay.paint(16, 0, "iron-door");
    overlay.paint(2, 15, "wooden-door");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicLichCrypt(seed) {
    const columns = 34;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.rect(1, 1, 32, 20, "crypt-floor");
    painter.frame(0, 0, columns, rows, "obsidian");
    painter.rect(11, 5, 12, 12, "rune-stone");
    painter.ellipse(17, 11, 5, 5, "shadow");
    painter.rect(2, 2, 7, 6, "webbed-floor");
    painter.rect(25, 2, 7, 6, "cracked-stone");
    painter.rect(2, 14, 7, 6, "cracked-stone");
    painter.rect(25, 14, 7, 6, "slate-floor");
    painter.rect(15, 1, 4, 4, "temple-tile");
    overlay.paint(17, 11, "summoning-circle");
    overlay.paint(17, 2, "soul-gem");
    [[12, 6], [22, 6], [12, 16], [22, 16]].forEach(([x, y]) => overlay.paint(x, y, "arcane-rune"));
    [[4, 4], [7, 6], [27, 4], [30, 6], [4, 16], [7, 18], [27, 16], [30, 18]].forEach(([x, y]) => overlay.paint(x, y, "sarcophagus"));
    [[10, 4], [24, 4], [10, 18], [24, 18]].forEach(([x, y]) => overlay.paint(x, y, "brazier"));
    overlay.paint(16, 4, "iron-door");
    overlay.paint(16, 19, "stone-stairs");
    scatterPropsInRect(overlay, random, ["bones", "gravestone", "book-pile"], 22, 2, 2, 30, 18);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicOrcCamp(seed) {
    const columns = 36;
    const rows = 24;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("forest");
    painter.rect(3, 2, 30, 20, "dead-grass");
    painter.frame(2, 1, 32, 22, "palisade-wall");
    painter.rect(16, 20, 5, 4, "dirt");
    painter.line(18, 22, 18, 7, "dirt", 3);
    painter.line(6, 12, 29, 12, "dirt", 2);
    painter.rect(29, 15, 4, 5, "mud");
    painter.rect(3, 5, 3, 5, "cracked-stone");
    overlay.paint(18, 21, "palisade-gate");
    overlay.paint(33, 17, "rubble");
    [[4, 3], [31, 3], [4, 20], [31, 20]].forEach(([x, y]) => overlay.paint(x, y, "watchtower"));
    [[8, 6], [14, 5], [23, 6], [28, 9], [8, 16], [14, 18], [25, 17]].forEach(([x, y]) => overlay.paint(x, y, "tent"));
    overlay.paint(18, 11, "campfire");
    overlay.paint(20, 9, "wooden-table");
    overlay.paint(23, 14, "weapon-rack");
    overlay.paint(10, 12, "armor-rack");
    overlay.paint(6, 12, "cart");
    [[16, 20], [21, 20], [32, 16], [32, 18]].forEach(([x, y]) => overlay.paint(x, y, "spike-trap"));
    scatterPropsInRect(overlay, random, ["crate", "barrel", "bones", "log"], 24, 4, 3, 28, 18);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicHauntedForest(seed) {
    const columns = 34;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("forest");
    painter.line(2, 20, 10, 14, "dead-grass", 3);
    painter.line(10, 14, 18, 12, "mud", 2);
    painter.line(18, 12, 28, 4, "dead-grass", 3);
    painter.ellipse(14, 10, 5, 3, "bog-water");
    painter.ellipse(27, 5, 6, 4, "mossy-stone");
    painter.rect(24, 3, 7, 6, "temple-tile");
    painter.frame(23, 2, 9, 8, "cracked-stone");
    painter.rect(3, 3, 6, 4, "webbed-floor");
    overlay.paint(27, 5, "summoning-circle");
    overlay.paint(27, 3, "altar");
    overlay.paint(23, 6, "ruined-arch");
    overlay.paint(15, 10, "rope-bridge");
    overlay.paint(16, 10, "rope-bridge");
    [[7, 5], [20, 5], [7, 16], [22, 16], [29, 14]].forEach(([x, y]) => overlay.paint(x, y, "dead-tree"));
    [[4, 18], [9, 15], [19, 13], [25, 11]].forEach(([x, y]) => overlay.paint(x, y, "gravestone"));
    scatterPropsInRect(overlay, random, ["ancient-tree", "shrub", "mushrooms", "bones"], 30, 1, 1, 32, 20);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicSunkenTemple(seed) {
    const columns = 34;
    const rows = 24;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("deep-water");
    painter.ellipse(17, 12, 15, 10, "shallow-water");
    painter.rect(4, 9, 26, 6, "mossy-stone");
    painter.rect(14, 3, 6, 18, "temple-tile");
    painter.ellipse(17, 12, 5, 4, "cracked-stone");
    painter.rect(2, 2, 8, 6, "crypt-floor");
    painter.rect(24, 16, 8, 6, "crypt-floor");
    painter.frame(1, 1, 10, 8, "mossy-stone");
    painter.frame(23, 15, 10, 8, "mossy-stone");
    painter.rect(15, 20, 4, 4, "shallow-water");
    overlay.paint(17, 11, "altar");
    overlay.paint(17, 13, "summoning-circle");
    [[12, 9], [22, 9], [12, 14], [22, 14], [5, 4], [28, 19]].forEach(([x, y]) => overlay.paint(x, y, "stone-pillar"));
    [[9, 11], [10, 11], [24, 12], [25, 12]].forEach(([x, y]) => overlay.paint(x, y, "wooden-bridge"));
    overlay.paint(14, 20, "stone-stairs");
    overlay.paint(19, 3, "ruined-arch");
    scatterPropsInRect(overlay, random, ["lily-pads", "statue-broken", "rubble", "crystals"], 30, 2, 2, 30, 20);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicDwarvenForge(seed) {
    const columns = 36;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.rect(1, 1, 34, 20, "flagstone");
    painter.frame(0, 0, columns, rows, "obsidian");
    painter.rect(0, 6, 36, 3, "lava");
    painter.rect(0, 15, 36, 3, "lava");
    painter.rect(4, 9, 28, 6, "slate-floor");
    painter.rect(14, 4, 8, 14, "obsidian");
    painter.rect(16, 8, 4, 8, "rune-stone");
    painter.line(2, 3, 33, 3, "mine-track", 2);
    painter.rect(15, 6, 6, 3, "stone-floor");
    painter.rect(15, 15, 6, 3, "stone-floor");
    overlay.paint(18, 11, "anvil");
    [[7, 11], [11, 11], [25, 11], [29, 11]].forEach(([x, y]) => overlay.paint(x, y, "forge-bellows"));
    [[5, 10], [12, 13], [24, 13], [31, 10]].forEach(([x, y]) => overlay.paint(x, y, "gearworks"));
    [[8, 3], [18, 3], [28, 3]].forEach(([x, y]) => overlay.paint(x, y, "mine-cart"));
    [[14, 7], [21, 7], [14, 16], [21, 16]].forEach(([x, y]) => overlay.paint(x, y, "brazier"));
    overlay.paint(3, 19, "stone-stairs");
    overlay.paint(32, 19, "iron-door");
    scatterPropsInRect(overlay, random, ["ore-vein", "crate", "weapon-rack", "barrel"], 22, 2, 2, 32, 18);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicWizardLibrary(seed) {
    const columns = 32;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.ellipse(16, 11, 15, 10, "slate-floor");
    painter.ellipse(16, 11, 6, 5, "rune-stone");
    painter.ellipse(16, 11, 3, 3, "temple-tile");
    painter.rect(3, 8, 7, 6, "rug");
    painter.rect(22, 8, 7, 6, "rug");
    painter.rect(13, 18, 6, 4, "checker-tile");
    overlay.paint(16, 11, "summoning-circle");
    [[11, 6], [21, 6], [11, 16], [21, 16]].forEach(([x, y]) => overlay.paint(x, y, "arcane-rune"));
    for (let y = 4; y <= 17; y += 3) {
      overlay.paint(5, y, "bookshelf");
      overlay.paint(8, y + 1, "bookshelf");
      overlay.paint(24, y + 1, "bookshelf");
      overlay.paint(27, y, "bookshelf");
    }
    overlay.paint(4, 11, "wooden-table");
    overlay.paint(28, 11, "wooden-table");
    overlay.paint(16, 19, "stone-stairs");
    overlay.paint(16, 3, "soul-gem");
    scatterPropsInRect(overlay, random, ["book-pile", "crystals", "candelabra"], 20, 3, 3, 26, 16);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicCastleSiege(seed) {
    const columns = 38;
    const rows = 24;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("grass");
    painter.rect(0, 0, 38, 6, "cobblestone");
    painter.rect(5, 5, 28, 18, "stone-floor");
    painter.frame(4, 4, 30, 20, "dungeon-wall");
    painter.rect(15, 0, 8, 10, "wet-cobble");
    painter.rect(5, 18, 8, 5, "cracked-stone");
    painter.rect(25, 18, 8, 5, "roof-tile");
    painter.rect(4, 10, 3, 7, "cracked-stone");
    painter.rect(30, 9, 4, 8, "dungeon-wall");
    painter.line(19, 23, 19, 8, "cobblestone", 3);
    overlay.paint(19, 5, "portcullis");
    overlay.paint(5, 13, "rubble");
    overlay.paint(6, 14, "rubble");
    overlay.paint(7, 15, "siege-fire");
    [[12, 10], [25, 10], [12, 16], [25, 16], [17, 19], [21, 19]].forEach(([x, y]) => overlay.paint(x, y, "barricade"));
    [[6, 6], [31, 6], [6, 21], [31, 21]].forEach(([x, y]) => overlay.paint(x, y, "watchtower"));
    overlay.paint(28, 20, "well");
    overlay.paint(10, 20, "cart");
    overlay.paint(29, 18, "wooden-door");
    overlay.paint(18, 8, "statue");
    scatterPropsInRect(overlay, random, ["crate", "barrel", "rubble", "siege-fire"], 24, 6, 6, 26, 16);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicFrostGiantPass(seed) {
    const columns = 36;
    const rows = 22;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("chasm");
    painter.ellipse(7, 15, 8, 7, "snow");
    painter.ellipse(29, 7, 8, 7, "snow");
    painter.line(11, 13, 24, 9, "ice", 3);
    painter.rect(1, 17, 9, 4, "cracked-stone");
    painter.ellipse(29, 7, 4, 4, "rune-stone");
    painter.rect(25, 12, 8, 5, "dead-grass");
    painter.line(3, 19, 10, 14, "ice", 2);
    overlay.paint(29, 7, "summoning-circle");
    overlay.paint(28, 6, "stone-pillar");
    overlay.paint(31, 8, "stone-pillar");
    overlay.paint(27, 14, "tent");
    overlay.paint(31, 14, "campfire");
    overlay.paint(25, 15, "dragon-bones");
    overlay.paint(6, 18, "stone-stairs");
    [[12, 12], [16, 11], [20, 10], [24, 9]].forEach(([x, y]) => overlay.paint(x, y, "ice-spikes"));
    scatterPropsInRect(overlay, random, ["pine-tree", "boulder", "ice-spikes"], 26, 1, 1, 34, 20);
    scatterPropsInRect(overlay, random, ["crate", "barrel", "bones"], 10, 24, 12, 10, 7);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildClassicPirateCove(seed) {
    const columns = 36;
    const rows = 24;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("deep-water");
    painter.ellipse(7, 12, 9, 11, "cave-floor");
    painter.ellipse(12, 17, 9, 6, "sand");
    painter.rect(12, 9, 16, 3, "wooden-deck");
    painter.rect(18, 5, 3, 14, "wooden-deck");
    painter.ellipse(29, 8, 5, 7, "wooden-deck");
    painter.rect(25, 5, 8, 7, "wooden-deck");
    painter.rect(2, 4, 8, 6, "cracked-stone");
    painter.rect(3, 5, 6, 4, "gold-floor");
    painter.ellipse(19, 17, 5, 3, "shallow-water");
    overlay.paint(5, 6, "gold-hoard");
    overlay.paint(7, 7, "treasure-chest");
    overlay.paint(29, 8, "mast");
    overlay.paint(31, 9, "ship-wheel");
    overlay.paint(26, 8, "anchor");
    overlay.paint(19, 7, "stone-stairs");
    overlay.paint(15, 10, "rowboat");
    overlay.paint(19, 17, "rowboat");
    overlay.paint(10, 16, "campfire");
    overlay.paint(4, 10, "ruined-arch");
    scatterPropsInRect(overlay, random, ["crate", "barrel", "rope-coil", "barricade"], 28, 11, 8, 21, 11);
    scatterPropsInRect(overlay, random, ["stalagmite", "bones", "boulder"], 16, 1, 2, 10, 18);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
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

  function buildRuinedTemple(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dead-grass");
    painter.rect(3, 2, 24, 16, "temple-tile");
    painter.frame(2, 1, 26, 18, "dungeon-wall");
    painter.rect(12, 2, 6, 5, "rune-stone");
    painter.rect(13, 7, 4, 11, "cracked-stone");
    painter.rect(3, 3, 6, 6, "mossy-stone");
    painter.rect(21, 3, 6, 6, "mossy-stone");
    painter.rect(3, 12, 6, 6, "cracked-stone");
    painter.rect(21, 12, 6, 6, "cracked-stone");
    overlay.paint(14, 3, "altar");
    overlay.paint(14, 5, "summoning-circle");
    overlay.paint(13, 17, "stone-stairs");
    overlay.paint(16, 17, "stone-stairs");
    [[6, 5], [23, 5], [6, 14], [23, 14], [11, 8], [18, 8], [11, 13], [18, 13]].forEach(([x, y]) => overlay.paint(x, y, "stone-pillar"));
    scatterProps(overlay, random, ["rubble", "statue-broken", "bones"], 18, columns, rows, 2);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildSewer(seed) {
    const columns = 28;
    const rows = 18;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("brick-wall");
    painter.rect(1, 1, 26, 16, "sewer-stone");
    painter.rect(0, 7, 28, 4, "bog-water");
    painter.rect(12, 0, 4, 18, "bog-water");
    painter.rect(0, 6, 28, 1, "wet-cobble");
    painter.rect(0, 11, 28, 1, "wet-cobble");
    painter.rect(11, 0, 1, 18, "wet-cobble");
    painter.rect(16, 0, 1, 18, "wet-cobble");
    painter.rect(11, 8, 6, 2, "wooden-deck");
    painter.rect(2, 2, 7, 4, "flagstone");
    painter.rect(19, 12, 7, 4, "flagstone");
    overlay.paint(13, 8, "wooden-bridge");
    overlay.paint(14, 9, "wooden-bridge");
    overlay.paint(3, 3, "ladder");
    overlay.paint(24, 14, "ladder");
    overlay.paint(11, 4, "portcullis");
    overlay.paint(16, 13, "portcullis");
    scatterProps(overlay, random, ["barrel", "crate", "rubble", "mushrooms"], 18, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildBanditCamp(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("forest");
    painter.ellipse(15, 10, 11, 8, "dead-grass");
    painter.rect(0, 9, 30, 3, "dirt");
    painter.ellipse(15, 10, 5, 4, "grass");
    overlay.paint(15, 10, "campfire");
    [[8, 5], [14, 4], [21, 6], [8, 14], [20, 14]].forEach(([x, y]) => overlay.paint(x, y, "tent"));
    overlay.paint(4, 9, "cart");
    overlay.paint(24, 10, "cart");
    overlay.paint(12, 12, "wooden-table");
    overlay.paint(17, 8, "weapon-rack");
    overlay.paint(17, 12, "armor-rack");
    scatterProps(overlay, random, ["crate", "barrel", "log", "shrub"], 22, columns, rows, 2);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildSwamp(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("swamp");
    painter.ellipse(7, 7, 6, 5, "bog-water");
    painter.ellipse(23, 13, 7, 6, "bog-water");
    painter.ellipse(16, 4, 5, 3, "shallow-water");
    for (let x = 0; x < columns; x += 1) {
      const y = Math.round(10 + Math.sin(x / 4) * 2);
      painter.paint(x, y, "mud");
      painter.paint(x, y + 1, "mud");
    }
    painter.rect(12, 8, 7, 5, "mossy-stone");
    overlay.paint(14, 9, "altar");
    overlay.paint(17, 11, "statue-broken");
    [[6, 8], [7, 8], [21, 12], [22, 12]].forEach(([x, y]) => overlay.paint(x, y, "wooden-bridge"));
    scatterProps(overlay, random, ["dead-tree", "mushrooms", "shrub", "log"], 28, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildDesert(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("sand");
    painter.ellipse(15, 10, 5, 3, "shallow-water");
    painter.ellipse(15, 10, 8, 5, "desert-rock");
    painter.ellipse(15, 10, 5, 3, "shallow-water");
    painter.rect(2, 3, 7, 6, "sandstone");
    painter.frame(1, 2, 9, 8, "cracked-stone");
    painter.rect(22, 12, 6, 5, "sandstone");
    painter.frame(21, 11, 8, 7, "cracked-stone");
    overlay.paint(4, 5, "altar");
    overlay.paint(25, 14, "treasure-chest");
    [[11, 7], [18, 7], [11, 13], [18, 13]].forEach(([x, y]) => overlay.paint(x, y, "palm-tree"));
    overlay.paint(6, 14, "tent");
    overlay.paint(9, 15, "tent");
    overlay.paint(8, 12, "campfire");
    scatterProps(overlay, random, ["boulder", "rubble", "crate"], 15, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildVolcanicForge(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("volcanic-rock");
    painter.rect(0, 4, 30, 3, "lava");
    painter.rect(0, 14, 30, 3, "lava");
    painter.rect(4, 7, 22, 7, "obsidian");
    painter.rect(12, 2, 6, 16, "ash-ground");
    painter.rect(11, 8, 8, 5, "rune-stone");
    painter.rect(13, 4, 4, 3, "wooden-deck");
    painter.rect(13, 14, 4, 3, "wooden-deck");
    overlay.paint(15, 10, "anvil");
    overlay.paint(15, 8, "summoning-circle");
    [[5, 8], [24, 8], [5, 12], [24, 12]].forEach(([x, y]) => overlay.paint(x, y, "brazier"));
    scatterProps(overlay, random, ["crystals", "rubble", "weapon-rack"], 18, columns, rows, 2);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildWizardLab(seed) {
    const columns = 28;
    const rows = 18;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dungeon-wall");
    painter.rect(1, 1, 26, 16, "slate-floor");
    painter.frame(0, 0, columns, rows, "obsidian");
    painter.rect(10, 4, 8, 10, "rune-stone");
    painter.rect(12, 6, 4, 6, "temple-tile");
    overlay.paint(14, 9, "arcane-rune");
    overlay.paint(14, 5, "cauldron");
    [[3, 3], [3, 8], [3, 13], [24, 3], [24, 8], [24, 13]].forEach(([x, y]) => overlay.paint(x, y, "bookshelf"));
    [[9, 4], [18, 4], [9, 13], [18, 13]].forEach(([x, y]) => overlay.paint(x, y, "crystals"));
    overlay.paint(8, 8, "wooden-table");
    overlay.paint(19, 9, "wooden-table");
    scatterProps(overlay, random, ["book-pile", "arcane-rune", "brazier"], 13, columns, rows, 2);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildShip(seed) {
    const columns = 30;
    const rows = 16;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("deep-water");
    painter.ellipse(15, 8, 12, 7, "wooden-deck");
    painter.rect(5, 5, 20, 7, "wooden-deck");
    painter.rect(7, 3, 6, 3, "dark-wood");
    painter.rect(18, 10, 6, 3, "dark-wood");
    overlay.paint(15, 8, "mast");
    overlay.paint(9, 4, "stone-stairs");
    overlay.paint(21, 11, "stone-stairs");
    overlay.paint(5, 8, "anchor");
    overlay.paint(24, 8, "ship-wheel");
    for (let index = 0; index < 22; index += 1) {
      overlay.paint(6 + Math.floor(random() * 18), 4 + Math.floor(random() * 8), ["rope-coil", "barrel", "crate"][index % 3]);
    }
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildCastleGate() {
    const columns = 32;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    painter.fill("grass");
    painter.rect(0, 7, 32, 6, "cobblestone");
    painter.rect(9, 0, 14, 20, "stone-floor");
    painter.rect(0, 0, 9, 7, "dungeon-wall");
    painter.rect(23, 0, 9, 7, "dungeon-wall");
    painter.rect(0, 13, 9, 7, "dungeon-wall");
    painter.rect(23, 13, 9, 7, "dungeon-wall");
    painter.rect(9, 0, 14, 3, "dungeon-wall");
    painter.rect(9, 17, 14, 3, "dungeon-wall");
    painter.rect(13, 3, 6, 14, "wet-cobble");
    overlay.paint(15, 3, "portcullis");
    overlay.paint(15, 16, "portcullis");
    [[10, 4], [21, 4], [10, 15], [21, 15]].forEach(([x, y]) => overlay.paint(x, y, "stone-pillar"));
    [[5, 3], [26, 3], [5, 16], [26, 16]].forEach(([x, y]) => overlay.paint(x, y, "banner"));
    overlay.paint(11, 9, "market-stall");
    overlay.paint(20, 10, "cart");
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildGraveyard(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("dead-grass");
    painter.rect(0, 9, 30, 2, "mud");
    painter.rect(10, 3, 10, 8, "crypt-floor");
    painter.frame(9, 2, 12, 10, "brick-wall");
    painter.rect(22, 13, 6, 5, "crypt-floor");
    painter.frame(21, 12, 8, 7, "cracked-stone");
    painter.rect(3, 14, 5, 4, "webbed-floor");
    overlay.paint(15, 5, "altar");
    overlay.paint(15, 9, "wooden-door");
    overlay.paint(24, 15, "sarcophagus");
    scatterProps(overlay, random, ["gravestone", "dead-tree", "bones"], 34, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildGrotto(seed) {
    const columns = 30;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("chasm");
    painter.ellipse(15, 10, 13, 8, "fungal-floor");
    painter.ellipse(7, 7, 4, 3, "shallow-water");
    painter.ellipse(23, 13, 4, 3, "shallow-water");
    painter.rect(8, 8, 15, 4, "cave-floor");
    painter.ellipse(15, 10, 4, 3, "rune-stone");
    overlay.paint(15, 10, "summoning-circle");
    [[5, 5], [24, 5], [5, 15], [24, 15]].forEach(([x, y]) => overlay.paint(x, y, "crystals"));
    scatterProps(overlay, random, ["mushrooms", "crystals", "boulder"], 30, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildFarmstead(seed) {
    const columns = 32;
    const rows = 20;
    const painter = createPainter(columns, rows);
    const overlay = createPainter(columns, rows);
    const random = seededRandom(seed);
    painter.fill("grass");
    painter.rect(0, 9, 32, 3, "dirt");
    painter.rect(2, 2, 11, 6, "farmland");
    painter.rect(2, 13, 11, 5, "farmland");
    painter.rect(20, 2, 9, 6, "roof-tile");
    painter.rect(21, 3, 7, 4, "wood-planks");
    painter.rect(20, 13, 9, 5, "dark-wood");
    overlay.paint(24, 7, "wooden-door");
    overlay.paint(24, 13, "wooden-door");
    overlay.paint(16, 7, "well");
    overlay.paint(16, 14, "cart");
    overlay.paint(18, 14, "hay-bales");
    for (let x = 1; x < 14; x += 2) {
      overlay.paint(x, 1, "fence");
      overlay.paint(x, 18, "fence");
    }
    scatterProps(overlay, random, ["shrub", "hay-bales", "crate"], 16, columns, rows, 1);
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function buildMapScene(sceneId, seed = "dnd-beyonder") {
    const template = MAP_SCENE_TEMPLATES.find((entry) => entry.id === sceneId);
    if (!template) return null;
    let scene;
    if (sceneId === "classic-goblin-mine") scene = buildClassicGoblinMine(seed);
    else if (sceneId === "classic-dragon-hoard") scene = buildClassicDragonHoard(seed);
    else if (sceneId === "classic-vampire-ballroom") scene = buildClassicVampireBallroom();
    else if (sceneId === "classic-lich-crypt") scene = buildClassicLichCrypt(seed);
    else if (sceneId === "classic-orc-war-camp") scene = buildClassicOrcCamp(seed);
    else if (sceneId === "classic-haunted-forest") scene = buildClassicHauntedForest(seed);
    else if (sceneId === "classic-sunken-temple") scene = buildClassicSunkenTemple(seed);
    else if (sceneId === "classic-dwarven-forge") scene = buildClassicDwarvenForge(seed);
    else if (sceneId === "classic-wizard-library") scene = buildClassicWizardLibrary(seed);
    else if (sceneId === "classic-castle-siege") scene = buildClassicCastleSiege(seed);
    else if (sceneId === "classic-frost-giant-pass") scene = buildClassicFrostGiantPass(seed);
    else if (sceneId === "classic-pirate-cove") scene = buildClassicPirateCove(seed);
    else if (sceneId === "dungeon-crossroads") scene = buildDungeon(seed);
    else if (sceneId === "forest-clearing") scene = buildForest(seed);
    else if (sceneId === "tavern-floor") scene = buildTavern();
    else if (sceneId === "town-square") scene = buildTown();
    else if (sceneId === "cavern-pools") scene = buildCavern(seed);
    else if (sceneId === "dungeon-guardroom") scene = buildGuardroom();
    else if (sceneId === "crypt-vault") scene = buildCrypt(seed);
    else if (sceneId === "throne-hall") scene = buildThrone();
    else if (sceneId === "ruined-temple") scene = buildRuinedTemple(seed);
    else if (sceneId === "sewer-junction") scene = buildSewer(seed);
    else if (sceneId === "bandit-camp") scene = buildBanditCamp(seed);
    else if (sceneId === "swamp-causeway") scene = buildSwamp(seed);
    else if (sceneId === "desert-oasis") scene = buildDesert(seed);
    else if (sceneId === "volcanic-forge") scene = buildVolcanicForge(seed);
    else if (sceneId === "wizard-laboratory") scene = buildWizardLab(seed);
    else if (sceneId === "ship-deck") scene = buildShip(seed);
    else if (sceneId === "castle-gate") scene = buildCastleGate();
    else if (sceneId === "graveyard-chapel") scene = buildGraveyard(seed);
    else if (sceneId === "mushroom-grotto") scene = buildGrotto(seed);
    else if (sceneId === "farmstead-raid") scene = buildFarmstead(seed);
    else scene = buildSnow(seed);
    return {
      ...scene,
      id: template.id,
      name: template.name,
      category: template.category,
      description: template.description,
      ambience: template.ambience,
      pack: template.pack || "",
      packName: template.packName || "",
      tactics: template.tactics || "",
      features: Array.isArray(template.features) ? [...template.features] : []
    };
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
