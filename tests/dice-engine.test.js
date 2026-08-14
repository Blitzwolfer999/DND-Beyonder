const assert = require("node:assert/strict");
const {
  createDiceRoll,
  evaluateDiceNotation,
  formatDiceRollDetail,
  notationCanUseCinematic,
  parseDiceNotation,
  rollDie,
} = require("../dice-engine.js");

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

const physical = createDiceRoll({ sides: 12, count: 2, modifier: 1, rolls: [12, 3], random: () => 0 });
assert.deepEqual(physical.rolls, [12, 3], "supplied physical faces must be authoritative");
assert.equal(physical.total, 16);

const keepHighest = evaluateDiceNotation("2d20kh1+5", { random: sequence([0.1, 0.8]) });
assert.deepEqual(keepHighest.rolls, [3, 17]);
assert.deepEqual(keepHighest.keptRolls, [17]);
assert.equal(keepHighest.rawValue, 17);
assert.equal(keepHighest.total, 22);
assert.equal(keepHighest.mode, "advantage");

const abilityRoll = evaluateDiceNotation("4d6dl1", { random: sequence([0, 0.2, 0.5, 0.999]) });
assert.deepEqual(abilityRoll.rolls, [1, 2, 4, 6]);
assert.deepEqual(abilityRoll.keptRolls, [2, 4, 6]);
assert.equal(abilityRoll.total, 12);
assert.match(formatDiceRollDetail(abilityRoll), /\(1\)/);

const exploding = evaluateDiceNotation("2d6!", { random: sequence([0.999, 0.2, 0.5]) });
assert.deepEqual(exploding.rolls, [6, 2, 4]);
assert.equal(exploding.groups[0].rolls[1].exploded, true);
assert.equal(exploding.total, 12);

const rerolled = evaluateDiceNotation("2d6r1", { random: sequence([0, 0.5, 0.999]) });
assert.deepEqual(rerolled.rolls, [4, 6]);
assert.equal(rerolled.groups[0].rolls[0].original, 1);
assert.equal(rerolled.total, 10);

const fate = evaluateDiceNotation("4df", { random: sequence([0, 0.34, 0.67, 0.9]) });
assert.deepEqual(fate.rolls, [-1, 0, 1, 1]);
assert.equal(fate.total, 1);

const coins = evaluateDiceNotation("3dc", { random: sequence([0, 0.6, 0.9]) });
assert.deepEqual(coins.rolls, [0, 1, 1]);
assert.equal(coins.total, 2);

const mixed = evaluateDiceNotation("1d8+2d4-3", { random: sequence([0.5, 0, 0.999]) });
assert.deepEqual(mixed.rolls, [5, 1, 4]);
assert.equal(mixed.total, 7);

assert.equal(notationCanUseCinematic(parseDiceNotation("2d20kh1+5")), true);
assert.equal(notationCanUseCinematic(parseDiceNotation("2d6!")), false);
assert.throws(() => parseDiceNotation("51d6"), /at most 50 dice/i);
assert.throws(() => parseDiceNotation("2d6++4"), /unsupported dice notation/i);

console.log("dice-engine tests passed");
