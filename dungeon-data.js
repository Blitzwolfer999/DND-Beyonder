(function initDungeonChallengeLibrary(root) {
  "use strict";

  const CR_OPTIONS = [3, 5, 9, 11, 14, 17, 20];
  const CR_PROFILES = {
    3: { rooms: 5, columns: 34, rows: 22, ac: 14, hp: 72, minionHp: 12, eliteHp: 30, attack: 5, saveDc: 13, initiative: 2, bossDamage: "2d8 + 3", eliteDamage: "2d6 + 2", minionDamage: "1d6 + 2" },
    5: { rooms: 6, columns: 36, rows: 24, ac: 15, hp: 105, minionHp: 18, eliteHp: 44, attack: 7, saveDc: 14, initiative: 3, bossDamage: "3d8 + 4", eliteDamage: "2d8 + 3", minionDamage: "1d8 + 3" },
    9: { rooms: 6, columns: 40, rows: 26, ac: 17, hp: 155, minionHp: 30, eliteHp: 70, attack: 9, saveDc: 16, initiative: 4, bossDamage: "3d10 + 5", eliteDamage: "3d8 + 4", minionDamage: "2d6 + 3" },
    11: { rooms: 7, columns: 42, rows: 26, ac: 18, hp: 185, minionHp: 38, eliteHp: 88, attack: 10, saveDc: 17, initiative: 4, bossDamage: "4d10 + 5", eliteDamage: "3d10 + 4", minionDamage: "2d8 + 4" },
    14: { rooms: 7, columns: 44, rows: 28, ac: 19, hp: 225, minionHp: 48, eliteHp: 110, attack: 11, saveDc: 18, initiative: 5, bossDamage: "4d12 + 6", eliteDamage: "4d10 + 5", minionDamage: "2d10 + 4" },
    17: { rooms: 8, columns: 46, rows: 30, ac: 20, hp: 275, minionHp: 58, eliteHp: 135, attack: 13, saveDc: 20, initiative: 6, bossDamage: "5d12 + 7", eliteDamage: "4d12 + 6", minionDamage: "3d8 + 5" },
    20: { rooms: 8, columns: 48, rows: 30, ac: 21, hp: 330, minionHp: 70, eliteHp: 165, attack: 14, saveDc: 21, initiative: 7, bossDamage: "6d12 + 8", eliteDamage: "5d12 + 7", minionDamage: "3d10 + 6" }
  };

  const THEMES = [
    {
      id: "vampire-court", name: "Vampire Court", icon: "VC", tone: "Gothic intrigue and predatory nobility",
      summary: "A candlelit stronghold where invitations are traps, mirrors lie, and the host is always listening.",
      floorTile: "cracked-stone", wallTile: "dungeon-wall", hazardTile: "shadow", accent: "#8f2f3a",
      sites: ["Manor", "Blood Keep", "Moonlit Chateau", "Crimson Court"], adjectives: ["Sable", "Thirsting", "Moonless", "Velvet"],
      bosses: ["Crimson Castellan", "Blood Baron", "Night Regent", "Elder Vampire", "Sovereign of Thorns", "First-Blood Duchess", "The Undying Host"],
      minions: ["Swarm of Bats", "Skeleton Retainer", "Wolf", "Specter"], elites: ["Wight Duelist", "Vampire Spawn", "Werewolf Hunter"],
      references: ["Vampire", "Vampire Spawn", "Wight", "Specter", "Swarm of Bats"],
      rooms: ["Portrait Gallery", "Shuttered Ballroom", "Wine Crypt", "Moon Chapel", "Guest Wing", "Throne of Red Glass"],
      hooks: ["A wedding invitation bears the name of someone who died a century ago.", "The village offers its last silver heirloom to end the nightly disappearances."],
      hazards: ["A mirrored wall creates a false line of sight.", "Blood-red mist lightly obscures the room until a brazier is extinguished."],
      treasures: ["A silver signet that opens the servants' passages", "A reliquary containing three vials of consecrated oil"],
      twists: ["The apparent prisoner is the court's willing herald.", "Destroying the false coffin awakens the real guardian."],
      tactics: ["The master separates prey with locked doors and charm.", "Retainers screen the boss while mobile hunters attack the back line."]
    },
    {
      id: "lich-crypt", name: "Lich Crypt", icon: "LC", tone: "Necromancy, forbidden scholarship, and soul magic",
      summary: "A sealed archive of dead empires where every inscription is part warning and part spell.",
      floorTile: "stone-floor", wallTile: "dungeon-wall", hazardTile: "shadow", accent: "#6d4a91",
      sites: ["Sepulcher", "Black Archive", "Ossuary", "Soul Vault"], adjectives: ["Hollow", "Ashen", "Forgotten", "Whispering"],
      bosses: ["Grave Scholar", "Mummy Magus", "Bone Savant", "Phylactery Keeper", "Undying Magister", "Soul-Tithe Archmage", "Archlich Avatar"],
      minions: ["Skeleton", "Zombie", "Shadow", "Ghoul"], elites: ["Wight", "Mummy", "Flameskull"],
      references: ["Lich", "Mummy Lord", "Wight", "Flameskull", "Skeleton"],
      rooms: ["Hall of Names", "Bone Scriptorium", "Silent Library", "Embalming Theater", "Phylactery Maze", "Astral Sepulcher"],
      hooks: ["A sage's memories are vanishing one page at a time.", "A dead monarch's crown has begun issuing orders in dreams."],
      hazards: ["A soul glyph drains vitality from the first creature crossing it.", "Whispering shelves impose a choice between silence and disorientation."],
      treasures: ["A spellshard containing one forgotten ritual", "The map to a secondary, empty phylactery vault"],
      twists: ["The phylactery is a place, not an object.", "One undead guardian remembers its former oath and can be persuaded."],
      tactics: ["The caster uses elevation and line-blocking minions.", "A marked floor zone erupts at the end of every round unless disrupted."]
    },
    {
      id: "dragon-hoard", name: "Dragon Hoard", icon: "DH", tone: "Elemental fury, cult defenses, and vertical lairs",
      summary: "A treasure fortress shaped by claws, breath, and generations of terrified servants.",
      floorTile: "cracked-stone", wallTile: "dungeon-wall", hazardTile: "lava", accent: "#b45a32",
      sites: ["Hoardspire", "Caldera", "Scaleforge", "Wyrm Vault"], adjectives: ["Ember", "Storm", "Venom", "Frostbound"],
      bosses: ["Scaled Ravager", "Hoard Warden", "Young Dragon", "Mature Wyrm", "Ancient Broodguard", "Elder Dragon", "World-Scarred Dragon"],
      minions: ["Kobold", "Guard Drake", "Cultist", "Winged Scavenger"], elites: ["Dragonborn Champion", "Half-Dragon Veteran", "Hoard Golem"],
      references: ["Young Dragon", "Adult Dragon", "Ancient Dragon", "Kobold", "Cult Fanatic"],
      rooms: ["Tribute Gate", "Scorched Gallery", "Scale Shrine", "Collapsed Aerie", "Coin River", "Hoard Heart"],
      hooks: ["A dragon-marked coin appears in every market till by dawn.", "An old treaty expires at the next eclipse."],
      hazards: ["Unstable hoard piles slide when crossed quickly.", "Elemental vents telegraph a line blast one turn before erupting."],
      treasures: ["A heat-darkened dragon scale usable as a ward", "A ledger naming every faction that paid tribute"],
      twists: ["The cult plans to replace the dragon during the assault.", "The most valuable treasure is an unhatched, unwillingly stolen egg."],
      tactics: ["The boss circles between open lanes and protected perches.", "Minions lure heroes into breath-shaped firing corridors."]
    },
    {
      id: "beholder-vault", name: "Beholder Vault", icon: "BV", tone: "Paranoia, eye magic, and impossible architecture",
      summary: "A tyrant's vault bends gravity and sightlines so that every corridor can watch every other corridor.",
      floorTile: "cobblestone", wallTile: "dungeon-wall", hazardTile: "shadow", accent: "#8a6a2f",
      sites: ["Panopticon", "Eye Vault", "Impossible Gallery", "Tyrant's Lens"], adjectives: ["Many-Eyed", "Inverted", "Watchful", "Prismatic"],
      bosses: ["Lens Keeper", "Aberrant Overseer", "Many-Eyed Savant", "Vault Tyrant", "Dreaming Eye", "Paranoid Sovereign", "The Final Witness"],
      minions: ["Animated Armor", "Gibbering Mouther", "Flying Sword", "Aberrant Eye"], elites: ["Spectator", "Stone Golem", "Eye-Bound Mage"],
      references: ["Beholder", "Spectator", "Gibbering Mouther", "Animated Armor", "Stone Golem"],
      rooms: ["Blind Vestibule", "Gravity Well", "Hall of Lenses", "Disintegration Gallery", "False Treasury", "Central Iris"],
      hooks: ["A city official receives perfect sketches of private meetings.", "A mapmaker insists a newly drawn corridor is watching her."],
      hazards: ["Gravity rotates ninety degrees across a bright seam.", "A lens suppresses one category of magic until shattered or turned."],
      treasures: ["A levitating crystal surveyor", "A brass key whose teeth rearrange when observed"],
      twists: ["Two rival overseers each claim the other is imaginary.", "The treasure vault is bait; the map room is the true prize."],
      tactics: ["The tyrant attacks through murder holes while staying mobile.", "Each eye-lens controls a different battlefield lane."]
    },
    {
      id: "infernal-rift", name: "Infernal Rift", icon: "IR", tone: "Devilish contracts, hellfire, and disciplined legions",
      summary: "An iron bastion has grown around a planar wound, turning negotiation and siegecraft into the same weapon.",
      floorTile: "cracked-stone", wallTile: "dungeon-wall", hazardTile: "lava", accent: "#a8412f",
      sites: ["Iron Embassy", "Cinder Bastion", "Contract Forge", "Ninefold Gate"], adjectives: ["Ashen", "Brass", "Oathbound", "Burning"],
      bosses: ["Infernal Bailiff", "Barbed Legate", "Bone Advocate", "Horned Marshal", "Icebound General", "Hell Duke", "Pit Tyrant"],
      minions: ["Imp", "Lemure", "Cultist", "Hell Hound"], elites: ["Barbed Devil", "Bone Devil", "Erinyes"],
      references: ["Pit Fiend", "Horned Devil", "Bone Devil", "Barbed Devil", "Hell Hound"],
      rooms: ["Petitioner's Gate", "Chain Barracks", "Clause Archive", "Ember Court", "Soul Foundry", "Rift Dais"],
      hooks: ["Everyone who signed a popular mercenary contract shares the same nightmare.", "A courthouse door now opens onto a furnace-lit road."],
      hazards: ["Chains animate when a promise is broken aloud.", "Hellfire vents punish creatures ending a turn in marked squares."],
      treasures: ["A contract blade that can cut one written clause", "A cooling ingot stamped with an infernal legion's route"],
      twists: ["The devil is enforcing a contract the mortal patron actually wrote.", "Closing the rift voids a pact protecting the nearby town."],
      tactics: ["Legionnaires hold choke points and punish movement.", "The commander offers a tactical bargain halfway through the fight."]
    },
    {
      id: "abyssal-temple", name: "Abyssal Temple", icon: "AT", tone: "Demonic chaos, mutation, and collapsing reality",
      summary: "A desecrated sanctuary shifts between mortal stone and a hungry layer of the Abyss.",
      floorTile: "stone-floor", wallTile: "dungeon-wall", hazardTile: "lava", accent: "#71335f",
      sites: ["Broken Fane", "Howling Maw", "Chaos Basilica", "Ruin Gate"], adjectives: ["Twisted", "Howling", "Riven", "Hungering"],
      bosses: ["Rift Brute", "Demonic Herald", "Glabrezu Schemer", "Vrock Prophet", "Nalfeshnee Prince", "Marilith Warlord", "Abyssal Incarnation"],
      minions: ["Dretch", "Quasit", "Manes", "Cultist"], elites: ["Vrock", "Hezrou", "Glabrezu"],
      references: ["Balor", "Marilith", "Nalfeshnee", "Glabrezu", "Dretch"],
      rooms: ["Riven Nave", "Choir of Teeth", "Mutation Font", "Fallen Belfry", "Sacrifice Spiral", "Maw Altar"],
      hooks: ["A temple bell rings from underground whenever someone lies.", "Livestock return from the hills with unfamiliar shadows."],
      hazards: ["Reality buckles and swaps two marked spaces.", "A mutation pool grants power now and a complication later."],
      treasures: ["A shard of the temple's original consecrated bell", "A planar compass that points away from the Abyss"],
      twists: ["The cult is trying to contain what it summoned.", "The altar can close the rift only after being deliberately fed magic."],
      tactics: ["Demons break formation and exploit isolated targets.", "The battlefield changes one terrain feature at the end of each round."]
    },
    {
      id: "giant-stronghold", name: "Giant Stronghold", icon: "GS", tone: "Oversized siegeworks, ancient ordning, and raw strength",
      summary: "A fortress built to giant scale turns furniture, stairs, and dinnerware into tactical terrain.",
      floorTile: "stone-floor", wallTile: "dungeon-wall", hazardTile: "cracked-stone", accent: "#796043",
      sites: ["Skyhold", "Titan Hall", "Thunder Stead", "Rune Keep"], adjectives: ["Storm", "Basalt", "Frost", "Cloud-Crowned"],
      bosses: ["Ogre Chief", "Troll Jarl", "Hill Giant Thane", "Stone Giant Dreamer", "Fire Giant General", "Cloud Giant Oracle", "Titan-Blood King"],
      minions: ["Goblin Servitor", "Orc Raider", "Dire Wolf", "Ogre"], elites: ["Troll", "Hill Giant", "Stone Giant"],
      references: ["Storm Giant", "Cloud Giant", "Fire Giant", "Stone Giant", "Hill Giant"],
      rooms: ["Boot Hall", "Feasting Table", "Rune Kitchen", "Wolf Kennel", "Siege Balcony", "High Seat"],
      hooks: ["Boulders bearing royal decrees land outside the city wall.", "A stolen giant rune has made every doorway in town grow overnight."],
      hazards: ["A giant-sized mechanism sweeps a broad lane.", "Hanging cookware can be dropped to create cover and noise."],
      treasures: ["A palm-sized giant rune that is shield-sized to humans", "A stormglass cup that predicts violent weather"],
      twists: ["The apparent warlord is stalling a worse claimant.", "The fortress is beginning to awaken as a construct."],
      tactics: ["Giants throw terrain before closing to melee.", "Smaller allies use high walkways while the boss controls the floor."]
    },
    {
      id: "hagwood", name: "Hagwood Coven", icon: "HC", tone: "Fey bargains, stolen memories, and storybook horror",
      summary: "A forest cottage network is stitched together by paths that only appear after a promise is made.",
      floorTile: "forest", wallTile: "shadow", hazardTile: "water", accent: "#52704b",
      sites: ["Covenstead", "Crooked Wood", "Briar House", "Moonfen"], adjectives: ["Crooked", "Briarbound", "Laughing", "Moss-Crowned"],
      bosses: ["Bog Witch", "Green Hag", "Night Hag", "Coven Mother", "Dream Eater", "Ancient Crone", "Grandmother of Thorns"],
      minions: ["Twig Blight", "Giant Toad", "Scarecrow", "Will-o'-Wisp"], elites: ["Green Hag", "Night Hag", "Shambling Mound"],
      references: ["Green Hag", "Night Hag", "Sea Hag", "Will-o'-Wisp", "Shambling Mound"],
      rooms: ["Talking Gate", "Bottled Orchard", "Crooked Kitchen", "Name Cellar", "Dreaming Pond", "Coven Hearth"],
      hooks: ["The town's children have all forgotten the same lullaby verse.", "A harmless wish begins coming true in increasingly literal ways."],
      hazards: ["A patch of brambles repeats the last movement made within it.", "Bottled voices impose disadvantage until their owners are identified."],
      treasures: ["A spool of thread that leads to the last promise made", "A jar containing one hour of moonlight"],
      twists: ["One coven member secretly wants to become mortal.", "The victim hired the coven and now regrets the exact wording."],
      tactics: ["The coven divides attention with illusions and forced choices.", "Destroying linked charms weakens the boss's defenses."]
    },
    {
      id: "psionic-colony", name: "Psionic Colony", icon: "PC", tone: "Alien intellect, enthrallment, and organic machinery",
      summary: "Beneath the city, a thinking colony remodels stone into chambers designed for minds rather than bodies.",
      floorTile: "cracked-stone", wallTile: "shadow", hazardTile: "water", accent: "#5863a8",
      sites: ["Thought Warren", "Elder Vault", "Synapse Labyrinth", "Hushed Colony"], adjectives: ["Silent", "Pulsing", "Unremembered", "Violet"],
      bosses: ["Thought Thief", "Psionic Overseer", "Colony Savant", "Elder-Brain Herald", "Astral Tyrant", "Synaptic Sovereign", "The Mind Below"],
      minions: ["Thrall", "Intellect Predator", "Gray Ooze", "Grimlock"], elites: ["Psionic Arcanist", "Umber Hulk", "Flesh Golem"],
      references: ["Psionic aberrations", "Intellect predators", "Thralls", "Umber Hulk", "Flesh Golem"],
      rooms: ["Memory Sluice", "Thrall Dormitory", "Synapse Bridge", "Thought Theater", "Astral Hatchery", "Elder Chamber"],
      hooks: ["Citizens share a memory of a festival that never occurred.", "A miner returns able to answer questions before they are asked."],
      hazards: ["A psychic pulse repeats the last damage dealt in the room.", "A thought-door opens only when a character gives up a true memory."],
      treasures: ["A crystal that stores one spoken thought", "An astral chart grown from translucent tissue"],
      twists: ["The colony fled something worse in the deep Astral Sea.", "The enthralled captain has been leaving clues during moments of control."],
      tactics: ["Controllers break concentration while brutes block exits.", "The overseer marks one mind each round for coordinated attacks."]
    },
    {
      id: "death-knight-citadel", name: "Death Knight Citadel", icon: "DK", tone: "Cursed honor, black armor, and a fallen oath",
      summary: "A ruined order still drills in perfect silence beneath banners that refuse to decay.",
      floorTile: "stone-floor", wallTile: "dungeon-wall", hazardTile: "lava", accent: "#4e5260",
      sites: ["Black Citadel", "Oathfall Keep", "Ashen Chapterhouse", "Grave Bastion"], adjectives: ["Forsworn", "Cinder", "Ebon", "Last"],
      bosses: ["Forsworn Captain", "Blackguard", "Grave Marshal", "Oathbreaker Lord", "Dread Castellan", "Death Knight", "The Last Commander"],
      minions: ["Skeleton", "Zombie", "Animated Armor", "Warhorse Skeleton"], elites: ["Wight Knight", "Helmed Horror", "Revenant Champion"],
      references: ["Death Knight", "Wight", "Revenant", "Helmed Horror", "Animated Armor"],
      rooms: ["Broken Portcullis", "Silent Barracks", "Hall of Charges", "Cinder Chapel", "Banner Crypt", "Oath Throne"],
      hooks: ["A long-dead knightly order resumes collecting taxes.", "Every sword drawn near the old keep whispers the same challenge."],
      hazards: ["Cursed banners redirect the first ranged attack each round.", "Ash pits flare when a sacred oath is broken nearby."],
      treasures: ["A restored fragment of the order's uncorrupted standard", "A black iron key bearing the name of every former commander"],
      twists: ["The death knight can be released only by completing the original oath.", "The living heir is using the curse to hide a modern crime."],
      tactics: ["Disciplined undead form a shield line around the commander.", "The boss punishes clustered foes with a telegraphed burst."]
    },
    {
      id: "elemental-temple", name: "Elemental Temple", icon: "ET", tone: "Unstable elements, ancient wards, and planar imbalance",
      summary: "Four elemental sanctums orbit a failing seal, each changing how movement and magic behave.",
      floorTile: "sand", wallTile: "cracked-stone", hazardTile: "water", accent: "#2f7f82",
      sites: ["Primal Fane", "Fourfold Shrine", "Genie Vault", "Convergence"], adjectives: ["Shifting", "Tempest", "Molten", "Fourfold"],
      bosses: ["Mephit Oracle", "Elemental Warden", "Djinni Exile", "Efreet Vizier", "Primal Colossus", "Storm Sovereign", "Convergence Avatar"],
      minions: ["Mephit", "Magma Spawn", "Dust Spirit", "Steam Servitor"], elites: ["Air Elemental", "Earth Elemental", "Fire Elemental"],
      references: ["Air Elemental", "Earth Elemental", "Fire Elemental", "Water Elemental", "Djinni"],
      rooms: ["Wind Gate", "Flooded Axis", "Basalt Crucible", "Living Dune", "Seal Engine", "Convergence Dais"],
      hooks: ["Rain falls upward around a ruined shrine.", "Every hearth in the valley goes cold at the same moment."],
      hazards: ["A rotating elemental wall changes damage type each round.", "A current pushes every unsecured creature one square at initiative 20."],
      treasures: ["A four-faced compass pointing toward planar breaches", "A sealed flask of perfectly still wind"],
      twists: ["The summoned guardian is preventing a catastrophic convergence.", "One elemental faction offers an alliance that empowers another enemy."],
      tactics: ["The boss changes resistance and terrain with the active seal.", "Elementals shove heroes through hazardous zones."]
    },
    {
      id: "drowned-sanctum", name: "Drowned Sanctum", icon: "DS", tone: "Deep-sea horror, cult ruins, and rising water",
      summary: "A tidal ruin alternates between flooded passages and air pockets while something vast turns below.",
      floorTile: "cobblestone", wallTile: "cracked-stone", hazardTile: "water", accent: "#346c83",
      sites: ["Tide Vault", "Drowned Abbey", "Abyssal Grotto", "Leviathan Shrine"], adjectives: ["Sunken", "Brinebound", "Tidal", "Lightless"],
      bosses: ["Deep Scavenger", "Sea Spawn Oracle", "Aboleth Thrall", "Tide Tyrant", "Kraken Priest", "Abyssal Leviathan", "World-Coil Avatar"],
      minions: ["Giant Crab", "Sahuagin Raider", "Merrow", "Cultist"], elites: ["Water Elemental", "Sea Hag", "Chuul"],
      references: ["Aboleth", "Kraken", "Chuul", "Sea Hag", "Water Elemental"],
      rooms: ["Tidal Stair", "Barnacle Cloister", "Air Bell", "Offering Pool", "Floodgate Engine", "Lightless Altar"],
      hooks: ["The tide leaves identical black pearls in every doorway.", "A lighthouse beam now points down into the sea."],
      hazards: ["The water level rises after every loud impact.", "A sucking current pulls creatures toward a broken floodgate."],
      treasures: ["A pearl that creates a brief sphere of breathable air", "A coral tablet charting an impossible coastline"],
      twists: ["The cult is feeding the creature to keep it asleep.", "The ruin surfaces for only one hour before sinking again."],
      tactics: ["Aquatic enemies retreat through flooded shortcuts.", "The boss controls water level to open and close tactical routes."]
    }
  ];

  function hashSeed(value) {
    let hash = 2166136261;
    for (const char of String(value || "dungeon")) {
      hash ^= char.charCodeAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function seededRandom(seed) {
    let state = hashSeed(seed) || 1;
    return function random() {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pick(values, random) {
    return values[Math.floor(random() * values.length) % values.length];
  }

  function numberBetween(min, max, random) {
    return min + Math.floor(random() * (max - min + 1));
  }

  function slug(value) {
    return String(value || "dungeon").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 36) || "dungeon";
  }

  function buildRooms(profile, theme, random) {
    const rooms = [];
    const gridColumns = Math.ceil(profile.rooms / 2);
    const zoneWidth = (profile.columns - 4) / Math.max(1, gridColumns);
    for (let index = 0; index < profile.rooms; index += 1) {
      const pair = Math.floor((index + 1) / 2);
      const row = index === 0 ? 0 : index % 4 < 2 ? 0 : 1;
      const width = index === profile.rooms - 1 ? 8 : numberBetween(5, 7, random);
      const height = index === profile.rooms - 1 ? 7 : numberBetween(4, 6, random);
      const baseX = index === 0 ? 2 : Math.min(profile.columns - width - 2, 2 + Math.floor(pair * zoneWidth));
      const baseY = row === 0 ? 2 : profile.rows - height - 2;
      const x = Math.max(1, Math.min(profile.columns - width - 1, baseX + numberBetween(-1, 1, random)));
      const y = Math.max(1, Math.min(profile.rows - height - 1, baseY + numberBetween(-1, 1, random)));
      const role = index === 0 ? "entrance" : index === profile.rooms - 1 ? "boss" : index % 3 === 1 ? "skirmish" : index % 3 === 2 ? "hazard" : "discovery";
      const roomName = index === 0 ? "Threshold" : index === profile.rooms - 1 ? theme.rooms[theme.rooms.length - 1] : theme.rooms[(index - 1) % Math.max(1, theme.rooms.length - 1)];
      rooms.push({
        id: `room-${index + 1}`,
        index: index + 1,
        name: roomName,
        role,
        x, y, width, height,
        center: { x: x + Math.floor(width / 2), y: y + Math.floor(height / 2) }
      });
    }
    return rooms;
  }

  function carveDungeon(profile, theme, rooms, random) {
    const floor = new Map();
    const mark = (x, y, tileId = theme.floorTile) => {
      if (x <= 0 || y <= 0 || x >= profile.columns - 1 || y >= profile.rows - 1) return;
      floor.set(`${x},${y}`, { x, y, tileId });
    };
    rooms.forEach(room => {
      for (let y = room.y; y < room.y + room.height; y += 1) {
        for (let x = room.x; x < room.x + room.width; x += 1) mark(x, y);
      }
    });
    for (let index = 1; index < rooms.length; index += 1) {
      const from = rooms[index - 1].center;
      const to = rooms[index].center;
      const horizontalFirst = random() > 0.5;
      const carveHorizontal = (y, start, end) => {
        for (let x = Math.min(start, end); x <= Math.max(start, end); x += 1) { mark(x, y); mark(x, y + 1); }
      };
      const carveVertical = (x, start, end) => {
        for (let y = Math.min(start, end); y <= Math.max(start, end); y += 1) { mark(x, y); mark(x + 1, y); }
      };
      if (horizontalFirst) {
        carveHorizontal(from.y, from.x, to.x);
        carveVertical(to.x, from.y, to.y);
      } else {
        carveVertical(from.x, from.y, to.y);
        carveHorizontal(to.y, from.x, to.x);
      }
    }
    rooms.filter(room => room.role === "hazard").forEach(room => {
      const hazardCount = Math.max(2, Math.floor(room.width * room.height / 5));
      for (let index = 0; index < hazardCount; index += 1) {
        const x = room.x + numberBetween(1, Math.max(1, room.width - 2), random);
        const y = room.y + numberBetween(1, Math.max(1, room.height - 2), random);
        mark(x, y, theme.hazardTile);
      }
    });
    return [...floor.values()];
  }

  function quickProfile(profile, role, random) {
    const hpBase = role === "boss" ? profile.hp : role === "elite" ? profile.eliteHp : profile.minionHp;
    const variance = Math.max(2, Math.round(hpBase * 0.08));
    return {
      ac: profile.ac + (role === "boss" ? 1 : role === "minion" ? -2 : 0),
      maxHp: Math.max(1, hpBase + numberBetween(-variance, variance, random)),
      initiativeBonus: profile.initiative + (role === "minion" ? -1 : 0),
      attackBonus: profile.attack + (role === "boss" ? 1 : role === "minion" ? -2 : 0),
      saveDc: profile.saveDc + (role === "boss" ? 1 : role === "minion" ? -2 : 0),
      damage: role === "boss" ? profile.bossDamage : role === "elite" ? profile.eliteDamage : profile.minionDamage
    };
  }

  function placeEncounterTokens(targetCr, profile, theme, rooms, random, packId) {
    const tokens = [];
    const encounters = [];
    const bossName = theme.bosses[CR_OPTIONS.indexOf(targetCr)];
    rooms.slice(1).forEach((room, roomIndex) => {
      const isBoss = room.role === "boss";
      const count = isBoss ? (targetCr >= 11 ? 3 : 2) : room.role === "hazard" ? 1 : numberBetween(2, targetCr >= 14 ? 4 : 3, random);
      const creatures = [];
      for (let index = 0; index < count; index += 1) {
        const role = isBoss && index === 0 ? "boss" : isBoss || room.role === "skirmish" && index === 0 ? "elite" : "minion";
        const name = role === "boss" ? bossName : role === "elite" ? pick(theme.elites, random) : pick(theme.minions, random);
        const stats = quickProfile(profile, role, random);
        const x = Math.min(room.x + room.width - 2, room.x + 1 + (index % Math.max(1, room.width - 2)));
        const y = Math.min(room.y + room.height - 2, room.y + 1 + Math.floor(index / Math.max(1, room.width - 2)));
        const tokenId = `${packId}-enemy-${roomIndex + 1}-${index + 1}`;
        const size = role === "boss" && targetCr >= 14 ? 3 : role === "boss" || role === "elite" && targetCr >= 11 ? 2 : 1;
        tokens.push({
          id: tokenId,
          kind: "monster",
          side: "enemy",
          name,
          role,
          x, y, size,
          color: role === "boss" ? theme.accent : role === "elite" ? "#6f3942" : "#4c5665",
          portrait: "",
          hidden: true,
          quickStats: stats,
          sourceNote: "Original quick-run profile; replace with an owned source stat block when desired."
        });
        creatures.push({ tokenId, name, role, ...stats });
      }
      encounters.push({
        id: `encounter-${room.index}`,
        roomId: room.id,
        title: isBoss ? `Boss: ${bossName}` : room.role === "hazard" ? "Hazard guardians" : "Dungeon opposition",
        kind: isBoss ? "boss" : room.role,
        trigger: isBoss ? "The final seal breaks when a creature reaches the room's center." : "The encounter begins when half the party enters the room.",
        tactics: pick(theme.tactics, random),
        creatures
      });
    });
    return { tokens, encounters, bossName };
  }

  function roomNotes(rooms, theme, encounters, random) {
    return rooms.map(room => {
      const encounter = encounters.find(item => item.roomId === room.id);
      const readAloud = room.role === "entrance"
        ? `The way into the ${theme.sites[0].toLowerCase()} narrows. ${theme.summary}`
        : room.role === "boss"
          ? `The ${room.name.toLowerCase()} opens around a single commanding presence. Every path behind you suddenly feels very far away.`
          : `${room.name} carries the dungeon's ${theme.tone.toLowerCase()}. A useful route is visible, but it is not unguarded.`;
      return {
        ...room,
        readAloud,
        encounterId: encounter?.id || "",
        hazard: room.role === "hazard" ? pick(theme.hazards, random) : "",
        secret: room.role === "discovery" || room.role === "hazard" ? pick(theme.twists, random) : "",
        reward: room.role === "discovery" ? pick(theme.treasures, random) : ""
      };
    });
  }

  function generateCrDungeon(options = {}) {
    const requestedCr = Number(options.targetCr || options.cr || 5);
    const targetCr = CR_OPTIONS.includes(requestedCr) ? requestedCr : 5;
    const seed = String(options.seed || `challenge-${targetCr}`).trim() || `challenge-${targetCr}`;
    const random = seededRandom(`${seed}:${targetCr}:${options.themeId || "random"}`);
    const requestedTheme = THEMES.find(theme => theme.id === options.themeId);
    const theme = requestedTheme || pick(THEMES, random);
    const profile = CR_PROFILES[targetCr];
    const packId = `cr${targetCr}-${theme.id}-${slug(seed)}`;
    const rooms = buildRooms(profile, theme, random);
    const tiles = carveDungeon(profile, theme, rooms, random);
    const { tokens, encounters, bossName } = placeEncounterTokens(targetCr, profile, theme, rooms, random, packId);
    const detailedRooms = roomNotes(rooms, theme, encounters, random);
    const entrance = rooms[0];
    const revealedCells = new Set();
    for (let y = entrance.y; y < entrance.y + entrance.height; y += 1) {
      for (let x = entrance.x; x < entrance.x + entrance.width; x += 1) revealedCells.add(`${x},${y}`);
    }
    const fogCells = [];
    for (let y = 0; y < profile.rows; y += 1) {
      for (let x = 0; x < profile.columns; x += 1) if (!revealedCells.has(`${x},${y}`)) fogCells.push(`${x},${y}`);
    }
    const title = `The ${pick(theme.adjectives, random)} ${pick(theme.sites, random)}`;
    const bossToken = tokens.find(token => token.role === "boss");
    const combatants = tokens.map(token => ({
      id: `combat-${token.id}`,
      tokenId: token.id,
      name: token.name,
      side: "enemy",
      role: token.role,
      ac: token.quickStats.ac,
      hp: token.quickStats.maxHp,
      maxHp: token.quickStats.maxHp,
      initiative: null,
      initiativeBonus: token.quickStats.initiativeBonus,
      hidden: true,
      defeated: false,
      conditions: []
    }));
    const mapData = {
      columns: profile.columns,
      rows: profile.rows,
      gridSize: Number(options.gridSize || 32),
      gridEnabled: options.gridEnabled !== false,
      background: "",
      backgroundFit: "cover",
      scale: { feetPerSquare: 5, offsetX: 0, offsetY: 0 },
      session: { state: "draft", updatedAt: "" },
      fog: { enabled: true, cells: fogCells },
      pings: [], drawings: [], overlays: [], stickers: [], customTiles: [],
      tiles,
      tokens,
      dungeon: {
        schemaVersion: 1,
        packId,
        title,
        targetCr,
        themeId: theme.id,
        themeName: theme.name,
        themeIcon: theme.icon,
        tone: theme.tone,
        summary: theme.summary,
        seed,
        wallTile: theme.wallTile,
        floorTile: theme.floorTile,
        accent: theme.accent,
        hook: pick(theme.hooks, random),
        twist: pick(theme.twists, random),
        treasure: pick(theme.treasures, random),
        hazard: pick(theme.hazards, random),
        boss: {
          name: bossName,
          targetCr,
          tokenId: bossToken?.id || "",
          quickStats: bossToken?.quickStats || quickProfile(profile, "boss", random),
          tactics: theme.tactics[0],
          sourceNote: "The boss title and quick-run profile are original. Creature references are provided as encounter inspiration, not reproduced stat blocks."
        },
        referenceCreatures: theme.references,
        rooms: detailedRooms,
        encounters,
        runNotes: [
          "Target CR describes the headline boss profile, not a guarantee of party balance.",
          "Reveal rooms as they are entered; generated enemies begin hidden.",
          "Use the quick profiles for immediate play or substitute a creature stat block you own."
        ]
      },
      encounter: {
        status: "ready",
        round: 0,
        turnIndex: 0,
        combatants,
        updatedAt: ""
      }
    };
    return { id: packId, name: title, targetCr, theme, mapData };
  }

  root.DUNGEON_LIBRARY = { crOptions: CR_OPTIONS, crProfiles: CR_PROFILES, themes: THEMES };
  root.generateCrDungeon = generateCrDungeon;
})(typeof window !== "undefined" ? window : globalThis);
