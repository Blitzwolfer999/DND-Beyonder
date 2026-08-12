"use strict";

const assert = require("node:assert/strict");
require("../dungeon-data.js");

const { crOptions, crProfiles, themes } = globalThis.DUNGEON_LIBRARY;
const generate = globalThis.generateCrDungeon;

assert.deepEqual(crOptions, [3, 5, 9, 11, 14, 17, 20]);
assert.equal(typeof generate, "function");
assert.ok(themes.length >= 10, "expected a broad theme library");

function cellKey(x, y) {
  return `${x},${y}`;
}

function pathExists(mapData, from, to) {
  const passable = new Set(mapData.tiles.map(tile => cellKey(tile.x, tile.y)));
  const start = cellKey(from.x, from.y);
  const goal = cellKey(to.x, to.y);
  const queue = [start];
  const visited = new Set([start]);
  while (queue.length) {
    const current = queue.shift();
    if (current === goal) return true;
    const [x, y] = current.split(",").map(Number);
    [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]].forEach(([nextX, nextY]) => {
      const next = cellKey(nextX, nextY);
      if (passable.has(next) && !visited.has(next)) {
        visited.add(next);
        queue.push(next);
      }
    });
  }
  return false;
}

let generatedCount = 0;
for (const targetCr of crOptions) {
  for (const theme of themes) {
    const options = { targetCr, themeId: theme.id, seed: `test-${targetCr}-${theme.id}` };
    const pack = generate(options);
    const duplicate = generate(options);
    const data = pack.mapData;
    const dungeon = data.dungeon;
    const profile = crProfiles[targetCr];

    assert.deepEqual(pack, duplicate, `${theme.id} CR ${targetCr} should be deterministic`);
    assert.equal(pack.targetCr, targetCr);
    assert.equal(dungeon.targetCr, targetCr);
    assert.equal(dungeon.themeId, theme.id);
    assert.equal(data.columns, profile.columns);
    assert.equal(data.rows, profile.rows);
    assert.equal(dungeon.rooms.length, profile.rooms);
    assert.equal(dungeon.encounters.length, profile.rooms - 1);
    assert.ok(dungeon.hook && dungeon.twist && dungeon.treasure && dungeon.hazard);
    assert.ok(dungeon.boss.quickStats.maxHp > 0);
    assert.equal(dungeon.boss.targetCr, targetCr);

    const tileKeys = data.tiles.map(tile => cellKey(tile.x, tile.y));
    assert.equal(new Set(tileKeys).size, tileKeys.length, "tile coordinates should be unique");
    data.tiles.forEach(tile => {
      assert.ok(tile.x > 0 && tile.x < data.columns - 1);
      assert.ok(tile.y > 0 && tile.y < data.rows - 1);
    });

    const entrance = dungeon.rooms.find(room => room.role === "entrance");
    const bossRoom = dungeon.rooms.find(room => room.role === "boss");
    assert.ok(entrance && bossRoom);
    assert.ok(pathExists(data, entrance.center, bossRoom.center), `${theme.id} CR ${targetCr} should connect entrance to boss`);
    assert.ok(!data.fog.cells.includes(cellKey(entrance.center.x, entrance.center.y)), "entrance should start revealed");
    assert.ok(data.fog.cells.includes(cellKey(bossRoom.center.x, bossRoom.center.y)), "boss room should start covered");

    const monsterTokens = data.tokens.filter(token => token.kind === "monster");
    const bossToken = monsterTokens.find(token => token.role === "boss");
    assert.ok(bossToken, "boss token is required");
    assert.equal(data.encounter.combatants.length, monsterTokens.length);
    monsterTokens.forEach(token => {
      assert.ok(token.x >= 0 && token.y >= 0);
      assert.ok(token.x + token.size <= data.columns);
      assert.ok(token.y + token.size <= data.rows);
      assert.ok(token.hidden, "generated enemies should begin hidden");
      assert.ok(token.quickStats.ac >= 1 && token.quickStats.maxHp >= 1);
      assert.match(token.quickStats.damage, /^\d+d\d+/i);
    });
    generatedCount += 1;
  }
}

console.log(`Dungeon generator: ${generatedCount} CR/theme combinations passed.`);
