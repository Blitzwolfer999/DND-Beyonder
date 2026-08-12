const FANTASY_NAME_STYLES = {
  Human: {
    given: ["Adrian", "Alina", "Amara", "Bastian", "Brenna", "Cassian", "Celia", "Darian", "Elara", "Elias", "Freya", "Garrick", "Helena", "Ilyan", "Jora", "Kael", "Leona", "Lucan", "Mara", "Merek", "Nadia", "Oren", "Petra", "Quinn", "Rhea", "Rowan", "Sabine", "Tamsin", "Valen", "Wren"],
    family: ["Ashford", "Blackwell", "Briar", "Brightwood", "Dawnmere", "Emberly", "Fairwind", "Fallow", "Greycastle", "Hawthorne", "Ironwood", "Kepler", "Marrow", "North", "Oakheart", "Pike", "Quill", "Ravenwood", "Reed", "Stone", "Storme", "Thorne", "Vale", "Voss", "Westfall", "Whitlock"]
  },
  Elf: {
    starts: ["Ae", "Ari", "Cael", "Ela", "Fae", "Gala", "Iri", "Lae", "Myr", "Nae", "Ori", "Ryn", "Sae", "Tha", "Vael"],
    ends: ["dan", "driel", "fina", "las", "lian", "lith", "nor", "rael", "riel", "rion", "sari", "thas", "vara", "wen", "wyn"],
    family: ["Amberleaf", "Brightbough", "Dawnwhisper", "Evenstar", "Fernsong", "Glassbrook", "Highbough", "Lightstep", "Moonbrook", "Nightbloom", "Rivergleam", "Silverfrond", "Starfall", "Sunweaver", "Thistledown", "Windmere"]
  },
  Dwarf: {
    starts: ["Bar", "Bryn", "Dag", "Dol", "Dur", "Far", "Gim", "Har", "Kil", "Mor", "Nor", "Or", "Thar", "Tor", "Ulf"],
    ends: ["a", "din", "dis", "dra", "grim", "in", "li", "rik", "run", "var"],
    family: ["Anvilward", "Ashbeard", "Blackhammer", "Bronzebrow", "Deepdelver", "Emberforge", "Flintmantle", "Goldvein", "Granitehand", "Ironbraid", "Kegthane", "Runebinder", "Steelboot", "Stonehelm", "Strongarm", "Thunderpick"]
  },
  Halfling: {
    given: ["Alton", "Andry", "Bree", "Calla", "Cora", "Daisy", "Eldon", "Esme", "Finn", "Hollis", "Jasper", "Lidda", "Marigold", "Milo", "Nedda", "Nora", "Oswin", "Perrin", "Pip", "Posy", "Reed", "Roscoe", "Tella", "Theo"],
    family: ["Appleblossom", "Bramblefoot", "Brushgather", "Butterwick", "Cloverhill", "Fairkettle", "Goodbarrel", "Greenbottle", "Hilltopple", "Honeymead", "Littleburrow", "Meadowcroft", "Puddlejump", "Quickstep", "Reedwhistle", "Softshoe", "Tealeaf", "Underbough"]
  },
  Gnome: {
    starts: ["Albi", "Bim", "Cali", "Dim", "Fizz", "Glim", "Jeb", "Kip", "Nim", "Pock", "Quil", "Sna", "Tib", "Wim", "Zan"],
    ends: ["bin", "dle", "fiz", "kin", "mip", "nix", "pip", "rick", "wicket", "zzle"],
    family: ["Brassbutton", "Brightspark", "Cogspinner", "Copperkettle", "Fidgetgear", "Fizzlebang", "Glimmerwick", "Nimblethumb", "Oddsocket", "Quickwhistle", "Tinkertop", "Wobblepin"]
  },
  Dragonborn: {
    starts: ["Arj", "Bal", "Daar", "Ghar", "Hesk", "Kava", "Kriv", "Medr", "Nad", "Patr", "Rhaz", "Sava", "Tarh", "Vez", "Zor"],
    ends: ["akas", "an", "ashi", "ath", "esh", "iar", "inn", "ira", "ok", "rax", "ush", "yth"],
    family: ["Ashscale", "Brightclaw", "Cindercrest", "Dawnfang", "Emberhide", "Flintwing", "Frostbreath", "Goldhorn", "Ironscale", "Skyroar", "Stormtalon", "Thundermaw"]
  },
  Orc: {
    starts: ["Ar", "Brak", "Dren", "Ghar", "Grum", "Karg", "Kor", "Mog", "Nazh", "Rag", "Shur", "Thok", "Urz", "Varg", "Zug"],
    ends: ["a", "ak", "ash", "ga", "gor", "ka", "mar", "ok", "ra", "tar", "ug", "za"],
    family: ["Ashwalker", "Boneguard", "Dawnscar", "Emberhand", "Frosttusk", "Ironhide", "Longstride", "Redblade", "Stonejaw", "Stormrunner", "Strongbow", "Wolfmark"]
  },
  Tiefling: {
    given: ["Akmenos", "Amity", "Ash", "Carrion", "Creed", "Damakos", "Desire", "Ember", "Glory", "Hope", "Iados", "Kairon", "Lerissa", "Mordai", "Nemeia", "Nyx", "Orianna", "Penance", "Poetry", "Reverence", "Sorrow", "Torment", "Valor", "Vice"],
    family: ["Blackrose", "Cinderveil", "Duskryn", "Emberfall", "Grimward", "Hollow", "Nightglass", "Ravenscar", "Redmoon", "Shadowend", "Thornveil", "Vex"]
  },
  Aasimar: {
    starts: ["Ae", "Astra", "Cael", "Elio", "Iri", "Lumi", "Ora", "Sera", "Sola", "Val", "Vesper", "Zari"],
    ends: ["el", "en", "ia", "iel", "ion", "is", "ora", "riel", "yne"],
    family: ["Dawnward", "Everlight", "Goldwing", "Heavensong", "Lightbearer", "Radiant", "Silverhalo", "Starborn", "Sunward", "Virtue"]
  },
  Goliath: {
    starts: ["Aukan", "Eglath", "Gae", "Kav", "Keoth", "Lo", "Man", "Nalla", "Orilo", "Pau", "Thoth", "Uthal", "Vaun", "Vimak"],
    ends: ["a", "ak", "ann", "ath", "eon", "ik", "ka", "lan", "uk"],
    family: ["Bearspirit", "Cliffstrider", "Dawncaller", "Fearless", "Highclimber", "Peakborn", "Riverleaper", "Skywatcher", "Stonebreaker", "Stormshoulder", "Tallpine", "Winterwalker"]
  },
  Goblin: {
    starts: ["Bik", "Crik", "Daz", "Fizz", "Gib", "Grib", "Kik", "Mog", "Nib", "Rik", "Skab", "Snix", "Tik", "Vrak", "Zib"],
    ends: ["bit", "dak", "ik", "ka", "nit", "nok", "rak", "rik", "ska", "wit", "z"],
    family: ["Bentcoin", "Blackcap", "Crackpot", "Fastfinger", "Gearsnatch", "Mudpocket", "Nailbiter", "Rattlebag", "Rustbucket", "Sharpgrin", "Sootnose", "Tanglewire"]
  },
  Fey: {
    starts: ["Aeri", "Belli", "Ciri", "Dew", "Fae", "Glim", "Liri", "Merri", "Nim", "Peta", "Spri", "Twi", "Vivi", "Wisp"],
    ends: ["bell", "bloom", "dew", "flick", "lark", "light", "moth", "petal", "song", "whim", "wing"],
    family: ["Bluebell", "Bramble", "Dancinglight", "Dewdrop", "Honeywing", "Moonmoth", "Mossbutton", "Pollenstep", "Rainpetal", "Summerdew", "Thistlewink", "Willowisp"]
  },
  Aquatic: {
    starts: ["Alo", "Cora", "Del", "Iri", "Maro", "Neri", "Olo", "Pela", "Rill", "Sela", "Talo", "Umi", "Vara"],
    ends: ["cor", "dine", "fin", "lan", "mar", "na", "nis", "ra", "rin", "sea", "th"],
    family: ["Coralborn", "Deepcurrent", "Foamrunner", "Pearlguard", "Reefwalker", "Saltwind", "Seasong", "Shellward", "Tidecaller", "Wavecrest"]
  },
  Beastfolk: {
    given: ["Asha", "Boro", "Cinder", "Dapple", "Ember", "Fenn", "Kestrel", "Luma", "Morrow", "Nim", "Pounce", "Reed", "Rill", "Sable", "Talon", "Vela", "Whisker", "Yarrow"],
    family: ["Brightmane", "Cloudrunner", "Dewstep", "Farstrider", "Fleetfoot", "Goldeneye", "Longtail", "Moonpelt", "Quickear", "Redclaw", "Softpaw", "Stormfeather"]
  },
  Construct: {
    given: ["Anchor", "Bastion", "Bell", "Brass", "Bulwark", "Cipher", "Clarity", "Copper", "Echo", "Forge", "Gear", "Keeper", "Lantern", "March", "Mettle", "Pillar", "Quill", "Relay", "Sentry", "Seven", "Slate", "Spark", "Tinker", "Vector"],
    family: []
  },
  Spirit: {
    starts: ["Ashi", "Dae", "Eri", "Hana", "Izu", "Kaze", "Miyo", "Naka", "Obi", "Rin", "Sora", "Tama", "Yori"],
    ends: ["hana", "hiro", "ka", "ki", "ko", "maru", "mori", "na", "no", "ra", "shi", "to"],
    family: ["Cloudbloom", "Dewfield", "Lanternvale", "Maplewind", "Mistgarden", "Moonbridge", "Reedbank", "Riverbell", "Stonepath", "Sunmeadow"]
  },
  Fantasy: {
    starts: ["Aer", "Bel", "Cor", "Dae", "Eli", "Fen", "Gav", "Ira", "Jor", "Kas", "Lor", "Myr", "Niv", "Or", "Rav", "Syl", "Tor", "Val", "Wyn", "Zel"],
    ends: ["a", "an", "ar", "en", "ia", "in", "is", "on", "or", "ra", "ric", "ryn", "us"],
    family: ["Ashmere", "Brightwater", "Duskhollow", "Emberlane", "Farwind", "Greymark", "Highvale", "Ironmere", "Moonfall", "Ravencrest", "Starling", "Thornfield", "Wintermere"]
  }
};

const SPECIES_NAME_STYLE = {
  Aarakocra: "Beastfolk", Aasimar: "Aasimar", "Astral Elf": "Elf", Autognome: "Construct",
  Boggart: "Goblin", Bugbear: "Goblin", Centaur: "Fey", Changeling: "Fey", Custom: "Fantasy",
  Dara: "Spirit", "Deep Gnome": "Gnome", Dhampir: "Fantasy", Dragonborn: "Dragonborn", Duergar: "Dwarf",
  Dwarf: "Dwarf", Eladrin: "Elf", Elf: "Elf", Faerie: "Fey", Fairy: "Fey", Firbolg: "Fey",
  Flamekin: "Fantasy", Giff: "Beastfolk", Githyanki: "Fantasy", Githzerai: "Fantasy", Gnome: "Gnome",
  Goblin: "Goblin", Goliath: "Goliath", Grung: "Aquatic", Hadozee: "Beastfolk", "Half-Elf": "Elf",
  "Half-Orc": "Orc", Halfling: "Halfling", Harengon: "Beastfolk", Hexblood: "Fey", Hobgoblin: "Goblin",
  Human: "Human", Kalashtar: "Spirit", Kender: "Halfling", Kenku: "Beastfolk", Khoravar: "Elf",
  Kobold: "Goblin", Leonin: "Beastfolk", Lizardfolk: "Beastfolk", Locathah: "Aquatic", "Lorwyn Changeling": "Fey",
  Loxodon: "Beastfolk", Lupin: "Beastfolk", Minotaur: "Beastfolk", Nakudama: "Spirit", "Obojima Elf": "Elf",
  Orc: "Orc", Owlin: "Beastfolk", Plasmoid: "Fantasy", Reborn: "Fantasy", Rimekin: "Fantasy",
  Satyr: "Fey", "Sea Elf": "Aquatic", "Shadar-Kai": "Elf", Shifter: "Beastfolk", "Simic Hybrid": "Fantasy",
  Tabaxi: "Beastfolk", "Thri-kreen": "Fantasy", Tiefling: "Tiefling", Tortle: "Aquatic", Triton: "Aquatic",
  Vedalken: "Fantasy", Verdan: "Goblin", Warforged: "Construct", "Yuan-Ti": "Fantasy"
};
