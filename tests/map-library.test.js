const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { MAP_SCENE_TEMPLATES, SCENE_TILE_IDS, buildMapScene, paintMapDataCells } = require("../map-library.js");

assert.ok(MAP_SCENE_TEMPLATES.length >= 6, "expected a useful scene library");
const appSource = fs.readFileSync(path.join(__dirname, "..", "app.js"), "utf8");
for (const tileId of SCENE_TILE_IDS) assert.match(appSource, new RegExp(`id: ["']${tileId}["']`), `${tileId} should have a rendered tile style`);

for (const template of MAP_SCENE_TEMPLATES) {
  const first = buildMapScene(template.id, "test-seed");
  const second = buildMapScene(template.id, "test-seed");
  assert.ok(first, `${template.id} should build`);
  assert.deepEqual(first, second, `${template.id} should be deterministic for a seed`);
  assert.ok(first.columns >= 20 && first.rows >= 15, `${template.id} should be encounter sized`);
  assert.equal(first.tiles.length, first.columns * first.rows, `${template.id} should cover the board`);
  const occupied = new Set();
  for (const tile of first.tiles) {
    assert.ok(tile.x >= 0 && tile.x < first.columns, `${template.id} tile x should be in bounds`);
    assert.ok(tile.y >= 0 && tile.y < first.rows, `${template.id} tile y should be in bounds`);
    assert.ok(SCENE_TILE_IDS.includes(tile.tileId), `${template.id} uses a registered tile`);
    const key = `${tile.x}:${tile.y}`;
    assert.ok(!occupied.has(key), `${template.id} should not duplicate cells`);
    occupied.add(key);
  }
}

assert.equal(buildMapScene("missing-scene"), null);
const brushMap = { columns: 4, rows: 4, tiles: [], fog: { enabled: false, cells: [] } };
assert.equal(paintMapDataCells(brushMap, "paint", "grass", 1, 1, 2).length, 4);
assert.equal(brushMap.tiles.length, 4, "2x2 brush should paint four cells");
paintMapDataCells(brushMap, "erase", "grass", 2, 2, 1);
assert.equal(brushMap.tiles.length, 3, "eraser should remove one painted cell");
paintMapDataCells(brushMap, "fog-paint", "", 0, 0, 2);
assert.equal(brushMap.fog.cells.length, 4, "fog brush should cover four cells");
paintMapDataCells(brushMap, "fog-erase", "", 0, 0, 2);
assert.equal(brushMap.fog.enabled, false, "revealing the final cells should disable empty fog");
console.log(`map-library tests passed (${MAP_SCENE_TEMPLATES.length} scene templates)`);
