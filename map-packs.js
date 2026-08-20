// Additional preloaded battle maps: a Sword Coast pack of well-known Faerûn
// locations and a Portside pack of harbour scenes.
//
// Rather than hand-coding a builder per map, each entry declares its layout as
// data and a single generic builder paints it. Layout ops mirror the painter
// API in map-library.js: fill, frame, rect, ellipse, line, plus prop placement
// and seeded scatter.
//
// Location names are used as factual references; every description here is
// original, in keeping with this project's content policy.

(function initMapPacks(root) {
  "use strict";

  const SWORD_COAST = "sword-coast";
  const SWORD_COAST_NAME = "Sword Coast";
  const PORTSIDE = "portside";
  const PORTSIDE_NAME = "Portside & Harbours";

  // op shapes:
  //   ["fill", tile] ["frame", x,y,w,h,tile] ["rect", x,y,w,h,tile]
  //   ["ellipse", cx,cy,rx,ry,tile] ["line", x1,y1,x2,y2,tile,width]
  const PACK_MAPS = [
    // ---------------- Sword Coast ----------------
    {
      id: "sc-yawning-portal", name: "The Yawning Portal", category: "Town", columns: 30, rows: 20,
      ambience: "torchlight", previewTiles: ["wood-planks", "dark-wood", "stone-floor", "chasm"],
      tags: "waterdeep tavern inn well undermountain dungeon entrance",
      features: ["Open well to the deep", "Upper gallery rail", "Crowded common room"],
      tactics: "A famous taproom built around a stone well. The open shaft dominates the centre, tables break sightlines, and a gallery overlooks the floor.",
      description: "A busy timber taproom ringed by galleries, with a wide stone well at its heart dropping into darkness.",
      terrain: [
        ["fill", "dark-wood"], ["rect", 1, 1, 28, 18, "wood-planks"], ["frame", 0, 0, 30, 20, "brick-wall"],
        ["rect", 11, 6, 8, 8, "stone-floor"], ["ellipse", 15, 10, 3, 3, "chasm"],
        ["rect", 1, 1, 7, 4, "rug"], ["rect", 22, 15, 7, 4, "rug"], ["rect", 1, 15, 5, 4, "stone-floor"]
      ],
      props: [
        [15, 10, "well"], [4, 3, "wooden-table"], [6, 4, "round-table"], [24, 16, "wooden-table"],
        [26, 17, "round-table"], [2, 9, "wall-torch"], [27, 9, "wall-torch"], [15, 1, "banner"],
        [3, 16, "barrel"], [4, 16, "barrel"], [5, 17, "crate"], [14, 18, "wooden-door"],
        [9, 6, "stone-pillar"], [20, 6, "stone-pillar"], [9, 13, "stone-pillar"], [20, 13, "stone-pillar"],
        [1, 10, "stone-stairs"], [28, 10, "stone-stairs"]
      ],
      scatter: [{ tiles: ["barrel", "crate", "round-table"], count: 8 }]
    },
    {
      id: "sc-dock-ward", name: "Dock Ward Wharves", category: "Coastal", columns: 36, rows: 24,
      ambience: "mist", previewTiles: ["deep-water", "wooden-deck", "wet-cobble", "cobblestone"],
      tags: "waterdeep docks harbour wharf portside warehouse smuggler",
      features: ["Three finger piers", "Warehouse row", "Open harbour water"],
      tactics: "Long piers channel movement over deep water while warehouses give cover on the landward side. Good for chases and boarding actions.",
      description: "A fog-thick city waterfront of tarred piers, moored boats, stacked cargo, and shuttered warehouses.",
      terrain: [
        ["fill", "deep-water"], ["rect", 0, 0, 36, 9, "wet-cobble"], ["rect", 0, 0, 36, 6, "cobblestone"],
        ["rect", 4, 9, 4, 12, "wooden-deck"], ["rect", 16, 9, 4, 14, "wooden-deck"], ["rect", 28, 9, 4, 11, "wooden-deck"],
        ["rect", 0, 8, 36, 2, "wooden-deck"],
        ["rect", 2, 0, 7, 5, "dark-wood"], ["rect", 14, 0, 8, 5, "dark-wood"], ["rect", 27, 0, 7, 5, "dark-wood"]
      ],
      props: [
        [5, 2, "wooden-door"], [18, 2, "wooden-door"], [30, 2, "wooden-door"],
        [6, 20, "rowboat"], [18, 22, "rowboat"], [30, 19, "rowboat"],
        [5, 12, "crate"], [6, 14, "barrel"], [17, 13, "crate"], [18, 16, "barrel"],
        [29, 12, "crate"], [30, 15, "barrel"], [12, 7, "wall-torch"], [24, 7, "wall-torch"],
        [11, 8, "anchor"], [23, 8, "anchor"], [35, 8, "watchtower"]
      ],
      scatter: [{ tiles: ["crate", "barrel", "rope-coil"], count: 14, rect: [0, 0, 36, 9] }]
    },
    {
      id: "sc-undermountain-gate", name: "Undermountain Entry Halls", category: "Dungeon", columns: 34, rows: 22,
      ambience: "torchlight", previewTiles: ["flagstone", "dungeon-wall", "cracked-stone", "shadow"],
      tags: "undermountain waterdeep dungeon halls mad mage portal",
      features: ["Four-way junction", "Collapsed side hall", "Warded portal alcove"],
      tactics: "The first halls below the well: a wide junction with pillars, a rubble-choked branch, and a rune alcove that rewards investigation.",
      description: "Vast worked halls beneath the city, pillared and cold, branching into darkness past a warded arch.",
      terrain: [
        ["fill", "dungeon-wall"], ["rect", 2, 9, 30, 5, "flagstone"], ["rect", 14, 2, 6, 18, "flagstone"],
        ["rect", 2, 2, 7, 6, "cracked-stone"], ["rect", 25, 15, 7, 5, "shadow"],
        ["rect", 25, 2, 7, 6, "rune-stone"], ["frame", 0, 0, 34, 22, "brick-wall"]
      ],
      props: [
        [6, 10, "stone-pillar"], [11, 10, "stone-pillar"], [22, 10, "stone-pillar"], [28, 12, "stone-pillar"],
        [16, 3, "ruined-arch"], [28, 4, "arcane-rune"], [17, 19, "iron-door"],
        [3, 10, "wall-torch"], [31, 10, "wall-torch"], [5, 4, "rubble"], [7, 6, "rubble"],
        [27, 17, "bones"], [29, 18, "sarcophagus"]
      ],
      scatter: [{ tiles: ["rubble", "bones", "stalagmite"], count: 12 }]
    },
    {
      id: "sc-candlekeep", name: "Candlekeep Great Library", category: "Arcane", columns: 32, rows: 22,
      ambience: "arcane", previewTiles: ["marble", "temple-tile", "rug", "slate-floor"],
      tags: "candlekeep library books scholars fortress archive",
      features: ["Stack maze", "Central reading floor", "Restricted vault"],
      tactics: "Tall shelves break every line of sight. The open reading floor is the only clear ground, and the vault at the back is the obvious prize.",
      description: "A monastic library of towering shelves, lamp-lit reading tables, and a locked vault of rarer works.",
      terrain: [
        ["fill", "brick-wall"], ["rect", 1, 1, 30, 20, "marble"], ["rect", 11, 7, 10, 8, "rug"],
        ["rect", 1, 1, 30, 2, "temple-tile"], ["rect", 24, 16, 7, 5, "slate-floor"]
      ],
      props: [
        [4, 5, "bookshelf"], [4, 7, "bookshelf"], [4, 9, "bookshelf"], [4, 11, "bookshelf"],
        [8, 5, "bookshelf"], [8, 7, "bookshelf"], [8, 9, "bookshelf"], [8, 11, "bookshelf"],
        [23, 5, "bookshelf"], [23, 7, "bookshelf"], [23, 9, "bookshelf"], [27, 5, "bookshelf"],
        [27, 7, "bookshelf"], [27, 9, "bookshelf"],
        [14, 10, "wooden-table"], [17, 11, "round-table"], [15, 2, "statue"], [16, 2, "statue"],
        [27, 18, "treasure-chest"], [25, 17, "iron-door"], [2, 11, "candelabra"], [29, 11, "candelabra"]
      ],
      scatter: [{ tiles: ["book-pile", "candelabra"], count: 10 }]
    },
    {
      id: "sc-baldurs-gate", name: "Upper City Gate", category: "Town", columns: 34, rows: 22,
      ambience: "clear", previewTiles: ["cobblestone", "stone-floor", "dungeon-wall", "roof-tile"],
      tags: "baldurs gate city wall portcullis guard checkpoint",
      features: ["Portcullis chokepoint", "Wall walk", "Guarded plaza"],
      tactics: "A hard chokepoint at the gate with wall positions above and an open plaza behind, ideal for a checkpoint standoff.",
      description: "A fortified city gate of grey stone, its portcullis flanked by guardhouses and a busy inner plaza.",
      terrain: [
        ["fill", "cobblestone"], ["rect", 0, 0, 34, 6, "dungeon-wall"], ["rect", 14, 0, 6, 6, "stone-floor"],
        ["rect", 0, 6, 34, 2, "stone-floor"], ["rect", 2, 2, 5, 4, "roof-tile"], ["rect", 27, 2, 5, 4, "roof-tile"],
        ["rect", 12, 12, 10, 8, "flagstone"]
      ],
      props: [
        [16, 5, "portcullis"], [17, 5, "portcullis"], [4, 4, "wooden-door"], [29, 4, "wooden-door"],
        [10, 1, "watchtower"], [23, 1, "watchtower"], [16, 1, "banner"], [17, 1, "banner"],
        [13, 9, "barricade"], [20, 9, "barricade"], [16, 16, "fountain"],
        [6, 14, "market-stall"], [26, 14, "market-stall"], [8, 18, "cart"], [24, 18, "cart"],
        [12, 7, "wall-torch"], [21, 7, "wall-torch"]
      ],
      scatter: [{ tiles: ["crate", "barrel", "shrub"], count: 12, rect: [1, 9, 32, 12] }]
    },
    {
      id: "sc-neverwinter-ruins", name: "Blacklake Ruins", category: "Town", columns: 32, rows: 22,
      ambience: "mist", previewTiles: ["cracked-stone", "cobblestone", "bog-water", "rubble"],
      tags: "neverwinter ruins district collapsed city flooded",
      features: ["Collapsed streets", "Flooded cellar", "Standing tenement"],
      tactics: "A broken district where rubble makes difficult ground, flooded cellars slow movement, and one intact building offers height.",
      description: "A drowned quarter of a rebuilt city: cracked streets, sunken cellars, and tenements gutted by old fire.",
      terrain: [
        ["fill", "cracked-stone"], ["rect", 0, 9, 32, 5, "cobblestone"], ["ellipse", 8, 16, 6, 4, "bog-water"],
        ["rect", 20, 2, 9, 7, "stone-floor"], ["rect", 2, 2, 7, 5, "cracked-stone"], ["frame", 20, 2, 9, 7, "brick-wall"]
      ],
      props: [
        [24, 8, "wooden-door"], [22, 4, "wooden-table"], [26, 6, "bed"],
        [12, 11, "rubble"], [15, 12, "rubble"], [18, 11, "rubble"],
        [6, 15, "ruined-arch"], [10, 18, "statue-broken"], [4, 13, "dead-tree"],
        [29, 15, "campfire"], [28, 17, "tent"]
      ],
      scatter: [{ tiles: ["rubble", "statue-broken", "dead-tree", "boulder"], count: 16 }]
    },
    {
      id: "sc-icewind-tundra", name: "Icewind Tundra Crossing", category: "Wilderness", columns: 34, rows: 22,
      ambience: "snowfall", previewTiles: ["snow", "ice", "cracked-stone", "chasm"],
      tags: "icewind dale tundra frozen north snow crevasse ten towns",
      features: ["Frozen lake sheet", "Crevasse hazard", "Sheltering rocks"],
      tactics: "Open ground with almost no cover. The ice sheet is fast but treacherous and the crevasse splits the field.",
      description: "An endless white plain broken by a frozen lake, wind-carved rocks, and a crevasse cutting the tundra.",
      terrain: [
        ["fill", "snow"], ["ellipse", 17, 11, 9, 6, "ice"], ["line", 0, 18, 34, 20, "chasm", 2],
        ["rect", 2, 1, 6, 4, "cracked-stone"], ["rect", 26, 2, 6, 4, "cracked-stone"]
      ],
      props: [
        [4, 3, "boulder"], [6, 2, "boulder"], [28, 3, "boulder"], [30, 4, "boulder"],
        [17, 11, "ice-spikes"], [13, 9, "ice-spikes"], [21, 13, "ice-spikes"],
        [8, 6, "dead-tree"], [25, 8, "dead-tree"], [16, 3, "tent"], [18, 4, "campfire"]
      ],
      scatter: [{ tiles: ["ice-spikes", "boulder", "pine-tree"], count: 14 }]
    },
    {
      id: "sc-menzoberranzan", name: "Drow City Plaza", category: "Dungeon", columns: 34, rows: 22,
      ambience: "arcane", previewTiles: ["obsidian", "slate-floor", "rune-stone", "shadow"],
      tags: "menzoberranzan drow underdark city plaza spider house",
      features: ["Stalagmite spires", "Raised house terrace", "Shadowed side ways"],
      tactics: "A dark city square under stone. Spires break the open ground, a noble terrace commands the plaza, and side alleys stay in shadow.",
      description: "A cavern plaza of polished black stone, spider-carved spires, and terraced noble houses lit by faerie fire.",
      terrain: [
        ["fill", "cave-floor"], ["rect", 3, 3, 28, 16, "obsidian"], ["ellipse", 17, 11, 6, 4, "slate-floor"],
        ["rect", 12, 1, 10, 4, "rune-stone"], ["rect", 0, 0, 3, 22, "shadow"], ["rect", 31, 0, 3, 22, "shadow"]
      ],
      props: [
        [17, 11, "summoning-circle"], [8, 7, "stone-pillar"], [26, 7, "stone-pillar"],
        [8, 15, "stone-pillar"], [26, 15, "stone-pillar"], [17, 3, "statue"],
        [5, 5, "stalagmite"], [29, 5, "stalagmite"], [5, 17, "stalagmite"], [29, 17, "stalagmite"],
        [14, 19, "brazier"], [20, 19, "brazier"], [17, 6, "altar"]
      ],
      scatter: [{ tiles: ["stalagmite", "crystals", "arcane-rune"], count: 14 }]
    },
    {
      id: "sc-phandalin", name: "Phandalin Village Green", category: "Town", columns: 32, rows: 22,
      ambience: "clear", previewTiles: ["grass", "dirt", "roof-tile", "farmland"],
      tags: "phandalin village frontier town green townmaster shrine",
      features: ["Open village green", "Four buildings", "Cart road"],
      tactics: "A frontier settlement with buildings on all four sides and open ground in the middle. Good for a running street fight.",
      description: "A rough frontier village of timber buildings around a trampled green, ringed by farm plots and a cart road.",
      terrain: [
        ["fill", "grass"], ["rect", 0, 10, 32, 3, "dirt"], ["rect", 14, 0, 3, 22, "dirt"],
        ["rect", 2, 2, 8, 6, "roof-tile"], ["rect", 21, 2, 8, 6, "roof-tile"],
        ["rect", 2, 15, 8, 6, "roof-tile"], ["rect", 21, 15, 8, 6, "roof-tile"],
        ["rect", 30, 15, 2, 6, "farmland"]
      ],
      props: [
        [6, 8, "wooden-door"], [25, 8, "wooden-door"], [6, 15, "wooden-door"], [25, 15, "wooden-door"],
        [15, 11, "well"], [12, 6, "cart"], [19, 17, "cart"], [11, 13, "fence"], [20, 13, "fence"],
        [4, 11, "market-stall"], [27, 11, "market-stall"], [15, 20, "campfire"],
        [1, 5, "shrub"], [30, 5, "shrub"], [8, 12, "hay-bales"]
      ],
      scatter: [{ tiles: ["shrub", "barrel", "crate", "hay-bales"], count: 12 }]
    },
    {
      id: "sc-cragmaw-cave", name: "Goblin Hideout Cave", category: "Dungeon", columns: 30, rows: 20,
      ambience: "torchlight", previewTiles: ["cave-floor", "shallow-water", "cracked-stone", "chasm"],
      tags: "cragmaw goblin cave hideout stream ambush bridge",
      features: ["Stream entry", "Ambush ledges", "Chieftain's chamber"],
      tactics: "A classic cave hideout: a stream mouth, high ledges for ambushers, a narrow bridge, and a den at the back.",
      description: "A damp cave mouth where a stream runs out past ambush ledges toward a smoky chieftain's den.",
      terrain: [
        ["fill", "dungeon-wall"], ["rect", 1, 8, 28, 5, "cave-floor"], ["line", 0, 10, 20, 10, "shallow-water", 2],
        ["rect", 20, 2, 9, 7, "cave-floor"], ["rect", 4, 14, 10, 5, "cave-floor"],
        ["ellipse", 16, 15, 3, 2, "chasm"]
      ],
      props: [
        [10, 9, "wooden-bridge"], [24, 5, "campfire"], [22, 3, "tent"], [26, 7, "treasure-chest"],
        [6, 16, "bones"], [9, 17, "bones"], [3, 9, "stalagmite"], [17, 8, "stalagmite"],
        [2, 11, "wall-torch"], [27, 9, "wall-torch"], [13, 12, "rubble"]
      ],
      scatter: [{ tiles: ["stalagmite", "bones", "rubble", "mushrooms"], count: 12 }]
    },
    {
      id: "sc-skullport", name: "Skullport Smuggler Docks", category: "Coastal", columns: 34, rows: 22,
      ambience: "mist", previewTiles: ["deep-water", "wooden-deck", "cave-floor", "shadow"],
      tags: "skullport underdark smuggler port cavern docks black market",
      features: ["Cavern harbour", "Plank walkways", "Hidden stash cave"],
      tactics: "An underground port. Narrow planks cross black water, cavern walls kill flanking, and a side cave hides contraband.",
      description: "A lightless harbour inside a cavern, its crooked plank walks strung above still black water.",
      terrain: [
        ["fill", "cave-floor"], ["rect", 0, 8, 34, 10, "deep-water"],
        ["rect", 0, 6, 34, 2, "wooden-deck"], ["rect", 6, 8, 3, 10, "wooden-deck"],
        ["rect", 17, 8, 3, 12, "wooden-deck"], ["rect", 27, 8, 3, 8, "wooden-deck"],
        ["rect", 24, 0, 9, 5, "shadow"]
      ],
      props: [
        [7, 16, "rowboat"], [18, 19, "rowboat"], [28, 14, "rowboat"],
        [7, 10, "crate"], [18, 12, "barrel"], [28, 10, "crate"],
        [3, 5, "wall-torch"], [30, 5, "wall-torch"], [28, 2, "treasure-chest"], [26, 3, "crate"],
        [12, 5, "stalagmite"], [22, 5, "stalagmite"], [33, 6, "iron-door"]
      ],
      scatter: [{ tiles: ["crate", "barrel", "rope-coil"], count: 12, rect: [0, 0, 34, 7] }]
    },
    {
      id: "sc-myth-drannor", name: "Elven Ruins of Myth Drannor", category: "Wilderness", columns: 34, rows: 22,
      ambience: "arcane", previewTiles: ["mossy-stone", "forest", "temple-tile", "rune-stone"],
      tags: "myth drannor elven ruins overgrown city arcane forest",
      features: ["Overgrown avenue", "Standing arches", "Live mythal node"],
      tactics: "Forest has reclaimed a fallen elven city. Arches and trees break sightlines around a still-active arcane node.",
      description: "A drowned-in-green elven city where broken arches and rune-cut plazas glimmer beneath old trees.",
      terrain: [
        ["fill", "forest"], ["rect", 0, 9, 34, 5, "mossy-stone"], ["ellipse", 17, 11, 5, 3, "temple-tile"],
        ["rect", 4, 2, 7, 5, "rune-stone"], ["rect", 24, 15, 7, 5, "rune-stone"]
      ],
      props: [
        [17, 11, "arcane-rune"], [9, 10, "ruined-arch"], [25, 10, "ruined-arch"],
        [7, 4, "statue-broken"], [27, 17, "statue-broken"], [13, 9, "stone-pillar"], [21, 13, "stone-pillar"],
        [3, 14, "ancient-tree"], [30, 6, "ancient-tree"], [15, 5, "ancient-tree"], [19, 17, "ancient-tree"]
      ],
      scatter: [{ tiles: ["ancient-tree", "shrub", "statue-broken", "arcane-rune"], count: 18 }]
    },
    {
      id: "sc-port-nyanzaru", name: "Port Nyanzaru Market", category: "Town", columns: 34, rows: 22,
      ambience: "clear", previewTiles: ["sandstone", "cobblestone", "roof-tile", "shallow-water"],
      tags: "chult port nyanzaru market jungle tropical dinosaur bazaar",
      features: ["Packed market lanes", "Harbour edge", "Merchant terraces"],
      tactics: "A dense tropical market: stalls everywhere, narrow lanes for chases, and open water along one edge.",
      description: "A sun-bright tropical port where awninged stalls crowd the lanes down to a busy harbour front.",
      terrain: [
        ["fill", "sandstone"], ["rect", 0, 18, 34, 4, "shallow-water"], ["rect", 0, 16, 34, 2, "wooden-deck"],
        ["rect", 0, 7, 34, 3, "cobblestone"], ["rect", 12, 0, 3, 16, "cobblestone"],
        ["rect", 2, 1, 8, 5, "roof-tile"], ["rect", 24, 1, 8, 5, "roof-tile"]
      ],
      props: [
        [4, 9, "market-stall"], [8, 9, "market-stall"], [17, 9, "market-stall"], [22, 9, "market-stall"],
        [27, 9, "market-stall"], [6, 13, "market-stall"], [20, 13, "market-stall"], [29, 13, "market-stall"],
        [6, 6, "wooden-door"], [28, 6, "wooden-door"], [13, 17, "rowboat"], [25, 17, "rowboat"],
        [2, 12, "palm-tree"], [32, 12, "palm-tree"], [17, 3, "fountain"], [10, 15, "crate"], [23, 15, "barrel"]
      ],
      scatter: [{ tiles: ["market-stall", "crate", "barrel", "palm-tree"], count: 14, rect: [0, 8, 34, 8] }]
    },
    {
      id: "sc-omu-shrine", name: "Jungle Shrine of Omu", category: "Wilderness", columns: 32, rows: 22,
      ambience: "mist", previewTiles: ["forest", "mossy-stone", "temple-tile", "bog-water"],
      tags: "chult omu jungle shrine trial ruins puzzle overgrown",
      features: ["Vine-choked approach", "Trial platform", "Flooded pits"],
      tactics: "A jungle trial site. Dense growth limits movement, water pits punish careless steps, and the platform is the objective.",
      description: "A vine-swallowed shrine deep in the jungle, its stepped platform ringed by flooded pits and carved idols.",
      terrain: [
        ["fill", "forest"], ["ellipse", 16, 11, 9, 7, "mossy-stone"], ["ellipse", 16, 11, 5, 4, "temple-tile"],
        ["ellipse", 7, 17, 3, 2, "bog-water"], ["ellipse", 25, 5, 3, 2, "bog-water"]
      ],
      props: [
        [16, 11, "altar"], [12, 8, "statue"], [20, 8, "statue"], [12, 14, "statue"], [20, 14, "statue"],
        [16, 6, "ruined-arch"], [4, 4, "ancient-tree"], [28, 18, "ancient-tree"], [3, 12, "ancient-tree"],
        [29, 11, "ancient-tree"], [9, 19, "mushrooms"], [23, 3, "mushrooms"]
      ],
      scatter: [{ tiles: ["ancient-tree", "shrub", "mushrooms", "boulder"], count: 18 }]
    },
    {
      id: "sc-silverymoon-bridge", name: "Moonbridge Crossing", category: "Town", columns: 34, rows: 20,
      ambience: "moonlight", previewTiles: ["deep-water", "marble", "cobblestone", "rune-stone"],
      tags: "silverymoon moonbridge river crossing arcane bridge city",
      features: ["Single span crossing", "River banks", "Warded approach"],
      tactics: "A long bridge over deep water. The span is a brutal chokepoint and the banks give ranged positions on both sides.",
      description: "A pale arcane span crosses a wide river between lamp-lit banks, humming faintly underfoot.",
      terrain: [
        ["fill", "deep-water"], ["rect", 0, 0, 34, 6, "cobblestone"], ["rect", 0, 14, 34, 6, "cobblestone"],
        ["rect", 14, 6, 6, 8, "marble"], ["rect", 14, 4, 6, 2, "rune-stone"], ["rect", 14, 14, 6, 2, "rune-stone"]
      ],
      props: [
        [16, 5, "arcane-rune"], [17, 15, "arcane-rune"], [13, 8, "statue"], [20, 8, "statue"],
        [13, 12, "statue"], [20, 12, "statue"], [6, 3, "wall-torch"], [27, 3, "wall-torch"],
        [6, 17, "wall-torch"], [27, 17, "wall-torch"], [3, 2, "market-stall"], [30, 17, "cart"]
      ],
      scatter: [{ tiles: ["shrub", "crate", "barrel"], count: 10, rect: [0, 0, 34, 6] }]
    },
    {
      id: "sc-zhentil-ramparts", name: "Black Keep Ramparts", category: "Town", columns: 34, rows: 22,
      ambience: "storm", previewTiles: ["dungeon-wall", "stone-floor", "cracked-stone", "cobblestone"],
      tags: "zhentil keep ramparts fortress walls siege black network",
      features: ["Wall walk", "Two towers", "Inner yard"],
      tactics: "Fighting along a rampart: a long narrow walk between towers, with a drop to the yard and stairs at both ends.",
      description: "Storm-slick battlements of black stone run between squat towers above a cold inner yard.",
      terrain: [
        ["fill", "cobblestone"], ["rect", 0, 6, 34, 4, "stone-floor"], ["rect", 0, 4, 34, 2, "dungeon-wall"],
        ["rect", 0, 10, 34, 2, "dungeon-wall"], ["rect", 2, 2, 6, 8, "cracked-stone"], ["rect", 26, 2, 6, 8, "cracked-stone"],
        ["rect", 12, 14, 10, 7, "flagstone"]
      ],
      props: [
        [5, 5, "watchtower"], [29, 5, "watchtower"], [4, 8, "stone-stairs"], [30, 8, "stone-stairs"],
        [12, 7, "barricade"], [21, 7, "barricade"], [17, 5, "banner"],
        [9, 3, "wall-torch"], [25, 3, "wall-torch"], [16, 17, "siege-fire"], [19, 19, "cart"],
        [13, 16, "crate"], [21, 15, "barrel"]
      ],
      scatter: [{ tiles: ["rubble", "crate", "barrel", "barricade"], count: 12 }]
    },
    {
      id: "sc-anauroch-ruin", name: "Anauroch Buried Ruin", category: "Wilderness", columns: 32, rows: 22,
      ambience: "sunset", previewTiles: ["sand", "sandstone", "desert-rock", "temple-tile"],
      tags: "anauroch desert dune buried ruin netheril sand tomb",
      features: ["Shifting dunes", "Exposed roof", "Sunken hall"],
      tactics: "Dunes give rolling cover above a half-buried structure, with a sunken hall below for a second stage of the fight.",
      description: "Desert wind uncovers the roof of a buried hall, its pillars standing free of the dunes at last.",
      terrain: [
        ["fill", "sand"], ["ellipse", 16, 12, 9, 6, "sandstone"], ["rect", 11, 9, 10, 8, "temple-tile"],
        ["rect", 2, 2, 6, 4, "desert-rock"], ["rect", 25, 3, 6, 4, "desert-rock"]
      ],
      props: [
        [13, 11, "stone-pillar"], [18, 11, "stone-pillar"], [13, 15, "stone-pillar"], [18, 15, "stone-pillar"],
        [16, 13, "sarcophagus"], [16, 8, "ruined-arch"], [4, 4, "boulder"], [28, 5, "boulder"],
        [8, 18, "palm-tree"], [24, 19, "palm-tree"], [6, 12, "bones"], [26, 14, "bones"]
      ],
      scatter: [{ tiles: ["boulder", "rubble", "bones", "statue-broken"], count: 14 }]
    },

    // ---------------- Portside & Harbours ----------------
    {
      id: "ps-fish-market", name: "Portside Fish Market", category: "Coastal", columns: 32, rows: 20,
      ambience: "clear", previewTiles: ["wet-cobble", "wooden-deck", "shallow-water", "roof-tile"],
      tags: "portside fish market harbour stalls town coastal",
      features: ["Stall rows", "Slippery cobbles", "Quay edge"],
      tactics: "Tight market lanes with knock-over cover, opening onto a quay where a fall means cold water.",
      description: "A noisy quayside market of gutting tables, ice barrels, and awnings dripping onto wet cobbles.",
      terrain: [
        ["fill", "wet-cobble"], ["rect", 0, 16, 32, 4, "shallow-water"], ["rect", 0, 14, 32, 2, "wooden-deck"],
        ["rect", 2, 1, 7, 4, "roof-tile"], ["rect", 23, 1, 7, 4, "roof-tile"], ["rect", 0, 7, 32, 2, "cobblestone"]
      ],
      props: [
        [4, 6, "market-stall"], [9, 6, "market-stall"], [14, 6, "market-stall"], [19, 6, "market-stall"],
        [24, 6, "market-stall"], [6, 11, "market-stall"], [12, 11, "market-stall"], [18, 11, "market-stall"],
        [24, 11, "market-stall"], [5, 4, "wooden-door"], [27, 4, "wooden-door"],
        [8, 15, "rowboat"], [22, 15, "rowboat"], [2, 12, "barrel"], [29, 12, "barrel"], [16, 14, "anchor"]
      ],
      scatter: [{ tiles: ["crate", "barrel", "rope-coil", "market-stall"], count: 14, rect: [0, 5, 32, 9] }]
    },
    {
      id: "ps-warehouse-row", name: "Harbour Warehouse Row", category: "Town", columns: 32, rows: 22,
      ambience: "torchlight", previewTiles: ["stone-floor", "dark-wood", "cobblestone", "wood-planks"],
      tags: "warehouse row harbour cargo smuggling interior crates",
      features: ["Crate maze", "Loading doors", "Office loft"],
      tactics: "Stacked cargo makes a shifting maze with long shooting lanes down the aisles and an office overlooking the floor.",
      description: "A cavernous cargo house stacked to the rafters, its aisles running between crate walls to wide loading doors.",
      terrain: [
        ["fill", "brick-wall"], ["rect", 1, 1, 30, 20, "stone-floor"], ["rect", 1, 1, 30, 3, "dark-wood"],
        ["rect", 24, 16, 7, 5, "wood-planks"], ["rect", 0, 9, 32, 3, "cobblestone"]
      ],
      props: [
        [4, 6, "crate"], [6, 6, "crate"], [8, 6, "crate"], [4, 8, "crate"], [6, 8, "crate"],
        [14, 6, "crate"], [16, 6, "crate"], [14, 8, "crate"], [16, 8, "crate"],
        [22, 6, "crate"], [24, 6, "crate"], [22, 8, "crate"],
        [5, 14, "barrel"], [9, 15, "barrel"], [15, 14, "barrel"], [19, 16, "barrel"],
        [0, 10, "wooden-door"], [31, 10, "wooden-door"], [27, 18, "wooden-table"], [29, 19, "treasure-chest"],
        [2, 5, "wall-torch"], [29, 5, "wall-torch"], [12, 20, "cart"]
      ],
      scatter: [{ tiles: ["crate", "barrel", "rope-coil"], count: 16, rect: [1, 4, 30, 16] }]
    },
    {
      id: "ps-lighthouse", name: "Lighthouse Point", category: "Coastal", columns: 30, rows: 22,
      ambience: "storm", previewTiles: ["deep-water", "cracked-stone", "stone-floor", "cobblestone"],
      tags: "lighthouse point cliff storm coastal beacon wreck",
      features: ["Narrow causeway", "Lighthouse base", "Wave-washed rocks"],
      tactics: "A storm-lashed headland reached by one causeway, with rocks that flood and a tight tower interior at the end.",
      description: "A lonely beacon tower on a rocky point, joined to shore by a causeway the sea keeps trying to take.",
      terrain: [
        ["fill", "deep-water"], ["rect", 0, 0, 10, 22, "cracked-stone"], ["rect", 10, 9, 12, 4, "cobblestone"],
        ["ellipse", 25, 11, 5, 5, "cracked-stone"], ["ellipse", 25, 11, 3, 3, "stone-floor"]
      ],
      props: [
        [25, 11, "watchtower"], [23, 9, "wall-torch"], [27, 13, "wall-torch"],
        [12, 10, "barricade"], [18, 11, "barricade"], [4, 4, "boulder"], [6, 17, "boulder"],
        [3, 12, "dead-tree"], [8, 8, "crate"], [7, 20, "rowboat"], [21, 16, "anchor"], [28, 6, "boulder"]
      ],
      scatter: [{ tiles: ["boulder", "rubble", "rope-coil"], count: 12, rect: [0, 0, 10, 22] }]
    },
    {
      id: "ps-shipbreakers", name: "Shipbreaker's Yard", category: "Coastal", columns: 34, rows: 22,
      ambience: "mist", previewTiles: ["mud", "wooden-deck", "shallow-water", "sand"],
      tags: "shipbreaker yard wreck salvage beach hulk harbour",
      features: ["Beached hulk", "Salvage stacks", "Tidal flats"],
      tactics: "A salvage yard around a broken hull. The wreck gives height and cover; the flats are open and slow going.",
      description: "A tidal yard of mud and timber where a beached hulk is being taken apart plank by plank.",
      terrain: [
        ["fill", "mud"], ["rect", 0, 17, 34, 5, "shallow-water"], ["rect", 0, 0, 34, 5, "sand"],
        ["rect", 10, 7, 16, 8, "wooden-deck"], ["rect", 13, 9, 10, 4, "dark-wood"]
      ],
      props: [
        [18, 10, "mast"], [15, 8, "ship-wheel"], [22, 13, "anchor"],
        [11, 14, "crate"], [24, 8, "crate"], [12, 6, "barrel"], [25, 15, "barrel"],
        [4, 9, "cart"], [30, 11, "cart"], [6, 3, "tent"], [28, 3, "campfire"],
        [8, 19, "rowboat"], [27, 19, "rowboat"]
      ],
      scatter: [{ tiles: ["rubble", "crate", "barrel", "rope-coil", "log"], count: 18 }]
    },
    {
      id: "ps-customs-house", name: "Customs House Standoff", category: "Town", columns: 28, rows: 20,
      ambience: "torchlight", previewTiles: ["marble", "flagstone", "dark-wood", "rug"],
      tags: "customs house harbour office ledger interior standoff guard",
      features: ["Public counter", "Records room", "Strongroom"],
      tactics: "An interior standoff: a counter divides the public hall, side offices give cover, and the strongroom is the goal.",
      description: "A stone-fronted harbour office of long counters, ledger shelves, and an iron-doored strongroom.",
      terrain: [
        ["fill", "brick-wall"], ["rect", 1, 1, 26, 18, "flagstone"], ["rect", 1, 1, 26, 7, "marble"],
        ["rect", 20, 12, 7, 7, "dark-wood"], ["rect", 4, 12, 8, 6, "rug"]
      ],
      props: [
        [6, 9, "wooden-table"], [10, 9, "wooden-table"], [14, 9, "wooden-table"], [18, 9, "wooden-table"],
        [23, 15, "treasure-chest"], [21, 12, "iron-door"], [24, 17, "bookshelf"], [26, 13, "bookshelf"],
        [3, 3, "statue"], [24, 3, "statue"], [13, 19, "wooden-door"], [2, 10, "wall-torch"], [25, 10, "wall-torch"],
        [6, 14, "round-table"], [9, 16, "barrel"]
      ],
      scatter: [{ tiles: ["book-pile", "crate", "barrel"], count: 10, rect: [1, 8, 26, 11] }]
    },
    {
      id: "ps-tidal-caves", name: "Smuggler's Tidal Caves", category: "Coastal", columns: 32, rows: 22,
      ambience: "mist", previewTiles: ["cave-floor", "shallow-water", "deep-water", "sand"],
      tags: "smuggler tidal cave sea grotto contraband boat hidden",
      features: ["Tide channel", "Dry stash ledge", "Sea entrance"],
      tactics: "Water splits the cave into ledges. Boats can reach the middle, and the dry stash at the back is defensible.",
      description: "Sea caves that flood with the tide, hiding a dry ledge of stacked contraband beyond the channel.",
      terrain: [
        ["fill", "dungeon-wall"], ["rect", 1, 6, 30, 12, "cave-floor"], ["line", 0, 12, 32, 12, "deep-water", 3],
        ["rect", 22, 6, 9, 5, "sand"], ["rect", 2, 15, 8, 3, "shallow-water"]
      ],
      props: [
        [26, 8, "treasure-chest"], [24, 9, "crate"], [28, 9, "barrel"],
        [12, 13, "rowboat"], [19, 14, "rowboat"], [6, 8, "stalagmite"], [16, 8, "stalagmite"],
        [10, 17, "stalagmite"], [21, 17, "stalagmite"], [3, 10, "wall-torch"], [29, 15, "wall-torch"]
      ],
      scatter: [{ tiles: ["stalagmite", "crate", "barrel", "rope-coil"], count: 14 }]
    }
  ];

  function hashSeed(value) {
    const text = String(value || "seed");
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }
  function seededRandom(seed) {
    let state = hashSeed(seed) || 1;
    return function next() {
      state ^= state << 13; state >>>= 0;
      state ^= state >> 17;
      state ^= state << 5; state >>>= 0;
      return state / 4294967296;
    };
  }

  // Paint a declarative layout with the same primitives the bespoke builders use.
  function buildPackScene(template, seed) {
    const { columns, rows } = template;
    const painter = root.createMapPainter(columns, rows);
    const overlay = root.createMapPainter(columns, rows);
    const random = seededRandom(`${template.id}:${seed}`);
    (template.terrain || []).forEach(op => {
      const [kind, ...args] = op;
      if (kind === "fill") painter.fill(args[0]);
      else if (kind === "rect") painter.rect(args[0], args[1], args[2], args[3], args[4]);
      else if (kind === "frame") painter.frame(args[0], args[1], args[2], args[3], args[4]);
      else if (kind === "ellipse") painter.ellipse(args[0], args[1], args[2], args[3], args[4]);
      else if (kind === "line") painter.line(args[0], args[1], args[2], args[3], args[4], args[5] || 1);
    });
    (template.props || []).forEach(([x, y, id]) => overlay.paint(x, y, id));
    (template.scatter || []).forEach(entry => {
      const box = entry.rect;
      if (box) root.scatterMapPropsInRect(overlay, random, entry.tiles, entry.count, box[0], box[1], box[2], box[3]);
      else root.scatterMapProps(overlay, random, entry.tiles, entry.count, columns, rows, 1);
    });
    return { columns, rows, tiles: painter.list(), overlays: overlay.list() };
  }

  function registerPackMaps() {
    if (!Array.isArray(root.MAP_SCENE_TEMPLATES) || typeof root.buildMapScene !== "function") return;
    PACK_MAPS.forEach(map => {
      if (root.MAP_SCENE_TEMPLATES.some(entry => entry.id === map.id)) return;
      root.MAP_SCENE_TEMPLATES.push({
        id: map.id, name: map.name, category: map.category,
        size: `${map.columns} x ${map.rows}`,
        pack: map.id.startsWith("ps-") ? PORTSIDE : SWORD_COAST,
        packName: map.id.startsWith("ps-") ? PORTSIDE_NAME : SWORD_COAST_NAME,
        previewTiles: map.previewTiles, ambience: map.ambience, tags: map.tags,
        features: map.features || [], tactics: map.tactics || "", description: map.description
      });
    });
    // Wrap the original builder so pack ids paint from their layout data.
    const originalBuild = root.buildMapScene;
    root.buildMapScene = function buildMapSceneWithPacks(sceneId, seed = "dnd-beyonder") {
      const packMap = PACK_MAPS.find(entry => entry.id === sceneId);
      if (!packMap) return originalBuild(sceneId, seed);
      const scene = buildPackScene(packMap, seed);
      const template = root.MAP_SCENE_TEMPLATES.find(entry => entry.id === sceneId) || {};
      return {
        ...scene, id: template.id, name: template.name, category: template.category,
        description: template.description, ambience: template.ambience,
        pack: template.pack || "", packName: template.packName || "",
        tactics: template.tactics || "", features: [...(template.features || [])]
      };
    };
  }

  root.MAP_PACK_MAPS = PACK_MAPS;
  root.registerMapPacks = registerPackMaps;
  registerPackMaps();
  if (typeof module !== "undefined" && module.exports) module.exports = { PACK_MAPS, buildPackScene };
})(typeof window !== "undefined" ? window : globalThis);
