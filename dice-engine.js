(function initDiceEngine(root) {
  "use strict";

  const UINT32_RANGE = 0x100000000;

  function finiteInteger(value, fallback, minimum, maximum) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    return Math.min(maximum, Math.max(minimum, Math.floor(parsed)));
  }

  function secureRandom() {
    const cryptoObject = root.crypto;
    if (cryptoObject && typeof cryptoObject.getRandomValues === "function") {
      const value = new Uint32Array(1);
      cryptoObject.getRandomValues(value);
      return value[0] / UINT32_RANGE;
    }
    return Math.random();
  }

  function secureRollDie(sides) {
    const safeSides = finiteInteger(sides, 20, 2, 1000);
    const cryptoObject = root.crypto;
    if (!cryptoObject || typeof cryptoObject.getRandomValues !== "function") return Math.floor(Math.random() * safeSides) + 1;
    const ceiling = Math.floor(UINT32_RANGE / safeSides) * safeSides;
    const value = new Uint32Array(1);
    do cryptoObject.getRandomValues(value); while (value[0] >= ceiling);
    return (value[0] % safeSides) + 1;
  }

  function rollDie(sides, random) {
    const safeSides = finiteInteger(sides, 20, 2, 1000);
    if (typeof random !== "function") return secureRollDie(safeSides);
    const sample = Math.min(0.999999999, Math.max(0, Number(random()) || 0));
    return Math.floor(sample * safeSides) + 1;
  }

  function normalizedProvidedRolls(values, count, sides) {
    const rolls = Array.isArray(values) ? values.slice(0, count) : [];
    return rolls.map(value => finiteInteger(value, 1, 1, sides));
  }

  function createDiceRoll(options = {}) {
    const sides = finiteInteger(options.sides, 20, 2, 1000);
    const requestedCount = finiteInteger(options.count, 1, 1, 50);
    const modifier = finiteInteger(options.modifier, 0, -9999, 9999);
    const mode = ["advantage", "disadvantage"].includes(options.mode) ? options.mode : "normal";
    const random = typeof options.random === "function" ? options.random : undefined;
    const count = mode === "normal" ? requestedCount : 2;
    const rolls = normalizedProvidedRolls(options.rolls, count, sides);
    while (rolls.length < count) rolls.push(rollDie(sides, random));
    const rawTotal = rolls.reduce((sum, value) => sum + value, 0);
    const rawValue = mode === "advantage" ? Math.max(...rolls) : mode === "disadvantage" ? Math.min(...rolls) : rawTotal;
    return {
      notation: options.notation || "",
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
      groups: [{ sides, count, sign: 1, rolls: rolls.map((value, index) => ({ value, kept: mode === "normal" || value === rawValue, index })) }],
    };
  }

  function parseDiceNotation(notation) {
    const source = String(notation || "").trim().toLowerCase().replace(/\s+/g, "");
    if (!source) throw new Error("Enter a dice formula such as 2d20+5.");
    const terms = [];
    const matcher = /([+-]?)(?:(\d*)d(%|f|c|\d+)(?:(kh|kl|dh|dl)(\d+))?(!)?(?:r(<=|>=|<|>|=)?(-?\d+))?|(\d+))/gy;
    let index = 0;
    let totalDice = 0;
    while (index < source.length) {
      matcher.lastIndex = index;
      const match = matcher.exec(source);
      if (!match || match.index !== index) throw new Error(`Unsupported dice notation near "${source.slice(index)}".`);
      const sign = match[1] === "-" ? -1 : 1;
      if (match[9] !== undefined) {
        terms.push({ type: "constant", value: sign * finiteInteger(match[9], 0, 0, 9999) });
      } else {
        const faceToken = match[3];
        const fate = faceToken === "f";
        const coin = faceToken === "c";
        const sides = fate ? 3 : coin ? 2 : faceToken === "%" ? 100 : finiteInteger(faceToken, 20, 2, 1000);
        const requestedCount = Number(match[2] || 1);
        if (requestedCount > 50) throw new Error("A formula can roll at most 50 dice at once.");
        const count = finiteInteger(requestedCount, 1, 1, 50);
        totalDice += count;
        if (totalDice > 50) throw new Error("A formula can roll at most 50 dice at once.");
        const selection = match[4] ? { type: match[4], count: finiteInteger(match[5], 1, 1, count) } : null;
        const reroll = match[8] !== undefined ? { operator: match[7] || "=", target: finiteInteger(match[8], 1, -1000, 1000) } : null;
        terms.push({ type: "dice", sign, count, sides, fate, coin, selection, explode: Boolean(match[6]), reroll });
      }
      index = matcher.lastIndex;
    }
    return { notation: source, terms, totalDice };
  }

  function matchesTarget(value, rule) {
    if (!rule) return false;
    if (rule.operator === "<") return value < rule.target;
    if (rule.operator === "<=") return value <= rule.target;
    if (rule.operator === ">") return value > rule.target;
    if (rule.operator === ">=") return value >= rule.target;
    return value === rule.target;
  }

  function groupRoller(term, random, provided) {
    let providedIndex = 0;
    return () => {
      if (providedIndex < provided.length) return provided[providedIndex++];
      if (term.fate) return Math.floor((typeof random === "function" ? random() : secureRandom()) * 3) - 1;
      if (term.coin) return (typeof random === "function" ? random() : secureRandom()) >= .5 ? 1 : 0;
      return rollDie(term.sides, random);
    };
  }

  function applySelection(rolls, selection) {
    if (!selection) return;
    const ordered = rolls.map((roll, index) => ({ index, value: roll.value })).sort((a, b) => a.value - b.value || a.index - b.index);
    const amount = Math.min(selection.count, rolls.length);
    let keptIndexes;
    if (selection.type === "kh") keptIndexes = new Set(ordered.slice(-amount).map(item => item.index));
    else if (selection.type === "kl") keptIndexes = new Set(ordered.slice(0, amount).map(item => item.index));
    else if (selection.type === "dh") keptIndexes = new Set(ordered.slice(0, Math.max(0, rolls.length - amount)).map(item => item.index));
    else keptIndexes = new Set(ordered.slice(amount).map(item => item.index));
    rolls.forEach((roll, index) => { roll.kept = keptIndexes.has(index); });
  }

  function evaluateDiceNotation(notation, options = {}) {
    const plan = typeof notation === "string" ? parseDiceNotation(notation) : notation;
    const random = typeof options.random === "function" ? options.random : undefined;
    const suppliedGroups = Array.isArray(options.rollsByGroup) ? options.rollsByGroup : [];
    const groups = [];
    let rawValue = 0;
    let modifier = 0;
    let groupIndex = 0;
    for (const term of plan.terms) {
      if (term.type === "constant") {
        modifier += term.value;
        continue;
      }
      const supplied = normalizedProvidedRolls(suppliedGroups[groupIndex], term.count, term.sides);
      const nextRoll = groupRoller(term, random, supplied);
      const rolls = [];
      for (let index = 0; index < term.count; index += 1) {
        const original = nextRoll();
        let value = original;
        let rerolled = null;
        if (matchesTarget(value, term.reroll)) { rerolled = value; value = nextRoll(); }
        rolls.push({ value, original: rerolled, kept: true, exploded: false });
        if (term.explode && !term.fate && !term.coin) {
          let guard = 0;
          while (value === term.sides && guard++ < 50) {
            value = nextRoll();
            rolls.push({ value, original: null, kept: true, exploded: true });
          }
        }
      }
      applySelection(rolls, term.selection);
      const subtotal = rolls.filter(roll => roll.kept).reduce((sum, roll) => sum + roll.value, 0) * term.sign;
      rawValue += subtotal;
      groups.push({ ...term, groupIndex, rolls, subtotal });
      groupIndex += 1;
    }
    const visibleRolls = groups.flatMap(group => group.rolls.map(roll => roll.value));
    const keptRolls = groups.flatMap(group => group.rolls.filter(roll => roll.kept).map(roll => roll.value));
    const singleGroup = groups.length === 1 ? groups[0] : null;
    return {
      notation: plan.notation,
      groups,
      sides: singleGroup?.sides || 0,
      requestedCount: singleGroup?.count || visibleRolls.length,
      count: visibleRolls.length,
      modifier,
      mode: singleGroup?.selection?.type === "kh" && singleGroup.count === 2 && singleGroup.selection.count === 1 ? "advantage"
        : singleGroup?.selection?.type === "kl" && singleGroup.count === 2 && singleGroup.selection.count === 1 ? "disadvantage" : "normal",
      rolls: visibleRolls,
      keptRolls,
      rawTotal: rawValue,
      rawValue,
      chosen: rawValue,
      faceValue: rawValue,
      total: rawValue + modifier,
      advanced: true,
    };
  }

  function formatDiceRollDetail(result) {
    if (result.advanced && result.notation) {
      const groups = result.groups.map(group => {
        const faces = group.rolls.map(roll => {
          const reroll = roll.original !== null ? `${roll.original}->${roll.value}` : String(roll.value);
          return roll.kept ? reroll : `(${reroll})`;
        });
        return `[${faces.join(", ")}]`;
      });
      return `${result.notation} ${groups.join(" ")}`;
    }
    const modifier = result.modifier ? `${result.modifier > 0 ? "+" : ""}${result.modifier}` : "";
    const expressionCount = result.mode === "normal" ? result.requestedCount : 2;
    const choice = result.mode === "normal" ? "" : ` -> ${result.rawValue}`;
    return `${expressionCount}d${result.sides}${modifier} [${result.rolls.join(", ")}${choice}]`;
  }

  function notationCanUseCinematic(plan) {
    return plan.terms.filter(term => term.type === "dice").every(term => !term.fate && !term.coin && !term.explode && !term.reroll);
  }

  root.secureDiceRandom = secureRandom;
  root.createDiceRoll = createDiceRoll;
  root.parseDiceNotation = parseDiceNotation;
  root.evaluateDiceNotation = evaluateDiceNotation;
  root.formatDiceRollDetail = formatDiceRollDetail;
  root.notationCanUseCinematic = notationCanUseCinematic;
  if (typeof module !== "undefined" && module.exports) module.exports = {
    createDiceRoll, evaluateDiceNotation, formatDiceRollDetail, notationCanUseCinematic, parseDiceNotation, rollDie, secureRandom
  };
})(typeof window !== "undefined" ? window : globalThis);
