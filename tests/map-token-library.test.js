const assert = require("node:assert/strict");
const { MAP_TOKEN_LIBRARY, tokenPresetPortrait } = require("../map-token-library.js");

assert.ok(MAP_TOKEN_LIBRARY.length >= 30, "expected a broad token library");
assert.ok(new Set(MAP_TOKEN_LIBRARY.map(token => token.category)).size >= 8, "expected varied token categories");
assert.equal(new Set(MAP_TOKEN_LIBRARY.map(token => token.id)).size, MAP_TOKEN_LIBRARY.length, "token ids should be unique");
for (const token of MAP_TOKEN_LIBRARY) {
  assert.ok(token.name && token.role && token.category);
  assert.ok(token.ac > 0 && token.hp > 0);
  assert.match(tokenPresetPortrait(token), /^data:image\/svg\+xml/);
}
console.log(`map-token-library tests passed (${MAP_TOKEN_LIBRARY.length} presets)`);
