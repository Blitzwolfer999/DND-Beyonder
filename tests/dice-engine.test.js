const assert = require("node:assert/strict");
const { createDiceRoll, formatDiceRollDetail, rollDie } = require("../dice-engine.js");

function sequence(values) {
  let index = 0;
  return () => values[index++ % values.length];
}

assert.equal(rollDie(20, () => 0), 1);
assert.equal(rollDie(20, () => 0.999999), 20);

const modified = createDiceRoll({ sides: 20, count: 1, modifier: 7, random: () => 0.45 });
assert.deepEqual(modified.rolls, [10]);
assert.equal(modified.rawValue, 10, "raw face must exclude the modifier");
assert.equal(modified.total, 17);

const multiple = createDiceRoll({ sides: 6, count: 3, modifier: 2, random: sequence([0, 0.5, 0.999]) });
assert.deepEqual(multiple.rolls, [1, 4, 6]);
assert.equal(multiple.rawValue, 11);
assert.equal(multiple.total, 13);
assert.equal(formatDiceRollDetail(multiple), "3d6+2 [1, 4, 6]");

const advantage = createDiceRoll({ sides: 20, modifier: 4, mode: "advantage", random: sequence([0.1, 0.8]) });
assert.deepEqual(advantage.rolls, [3, 17]);
assert.equal(advantage.rawValue, 17);
assert.equal(advantage.total, 21);
assert.equal(formatDiceRollDetail(advantage), "2d20+4 [3, 17 -> 17]");

const disadvantage = createDiceRoll({ sides: 20, modifier: -2, mode: "disadvantage", random: sequence([0.95, 0.2]) });
assert.deepEqual(disadvantage.rolls, [20, 5]);
assert.equal(disadvantage.rawValue, 5);
assert.equal(disadvantage.total, 3);

console.log("dice-engine tests passed");
