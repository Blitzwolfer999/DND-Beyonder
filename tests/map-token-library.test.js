const assert = require("node:assert/strict");
const { MAP_TOKEN_LIBRARY, MAP_TOKEN_TYPES, MAP_SRD_CREATURE_NAMES, TOKEN_LIBRARY_NOTICE, createCreatureTokenPreset, tokenPresetPortrait } = require("../map-token-library.js");

assert.ok(MAP_TOKEN_LIBRARY.length >= 340, "expected the complete SRD catalog plus featured tokens");
assert.equal(MAP_TOKEN_TYPES.length, 14, "expected every SRD creature type");
assert.equal(MAP_SRD_CREATURE_NAMES.length, 331, "expected every SRD 5.2.1 creature entry");
assert.equal(new Set(MAP_SRD_CREATURE_NAMES).size, MAP_SRD_CREATURE_NAMES.length, "SRD creature names should be unique");
assert.ok(new Set(MAP_TOKEN_LIBRARY.map(token => token.category)).size >= 15, "expected all creature types plus NPCs");
assert.equal(new Set(MAP_TOKEN_LIBRARY.map(token => token.id)).size, MAP_TOKEN_LIBRARY.length, "token ids should be unique");
assert.equal(new Set(MAP_TOKEN_LIBRARY.map(token => token.name.toLowerCase())).size, MAP_TOKEN_LIBRARY.length, "token names should be unique");
for (const token of MAP_TOKEN_LIBRARY) {
  assert.ok(token.name && token.role && token.category);
  assert.ok(token.ac > 0 && token.hp > 0);
  assert.ok(token.size >= 1 && token.size <= 4);
  assert.match(tokenPresetPortrait(token), /^data:image\/svg\+xml/);
}
for (const name of ["Aboleth", "Ancient Red Dragon", "Commoner", "Kraken", "Tarrasque", "Vampire", "Zombie"]) {
  assert.ok(MAP_TOKEN_LIBRARY.some(token => token.name === name), `missing ${name}`);
}
for (const name of MAP_SRD_CREATURE_NAMES) assert.ok(MAP_TOKEN_LIBRARY.some(token => token.name === name), `library should include ${name}`);
const custom = createCreatureTokenPreset("Clockwork Moon Beast", "Construct");
assert.equal(custom.category, "Construct");
assert.equal(custom.profileKind, "editable");
assert.match(tokenPresetPortrait(custom), /^data:image\/svg\+xml/);
assert.match(TOKEN_LIBRARY_NOTICE.attribution, /Creative Commons Attribution 4\.0/);
console.log(`map-token-library tests passed (${MAP_TOKEN_LIBRARY.length} presets)`);
