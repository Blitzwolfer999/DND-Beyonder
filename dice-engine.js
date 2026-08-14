(function initDiceEngine(root) {
  "use strict";

  function finiteInteger(value, fallback, minimum, maximum) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(maximum, Math.max(minimum, Math.floor(parsed)));
  }

  function rollDie(sides, random = Math.random) {
    const safeSides = finiteInteger(sides, 20, 2, 1000);
    const sample = Math.min(0.999999999, Math.max(0, Number(random()) || 0));
    return Math.floor(sample * safeSides) + 1;
  }

  function createDiceRoll(options = {}) {
    const sides = finiteInteger(options.sides, 20, 2, 1000);
    const requestedCount = finiteInteger(options.count, 1, 1, 20);
    const modifier = finiteInteger(options.modifier, 0, -9999, 9999);
    const mode = ["advantage", "disadvantage"].includes(options.mode) ? options.mode : "normal";
    const random = typeof options.random === "function" ? options.random : Math.random;
    const count = mode === "normal" ? requestedCount : 2;
    const rolls = Array.from({ length: count }, () => rollDie(sides, random));
    const rawTotal = rolls.reduce((sum, value) => sum + value, 0);
    const rawValue = mode === "advantage" ? Math.max(...rolls) : mode === "disadvantage" ? Math.min(...rolls) : rawTotal;
    return {
      sides,
      requestedCount: mode === "normal" ? requestedCount : 1,
      count,
      modifier,
      mode,
      rolls,
      rawTotal,
      rawValue,
      chosen: rawValue,
      faceValue: rawValue,
      total: rawValue + modifier,
    };
  }

  function formatDiceRollDetail(result) {
    const modifier = result.modifier ? `${result.modifier > 0 ? "+" : ""}${result.modifier}` : "";
    const expressionCount = result.mode === "normal" ? result.requestedCount : 2;
    const choice = result.mode === "normal" ? "" : ` -> ${result.rawValue}`;
    return `${expressionCount}d${result.sides}${modifier} [${result.rolls.join(", ")}${choice}]`;
  }

  root.createDiceRoll = createDiceRoll;
  root.formatDiceRollDetail = formatDiceRollDetail;
  if (typeof module !== "undefined" && module.exports) module.exports = { createDiceRoll, formatDiceRollDetail, rollDie };
})(typeof window !== "undefined" ? window : globalThis);
