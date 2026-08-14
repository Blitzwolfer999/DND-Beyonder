(function initCinematicDice(root) {
  "use strict";

  const VERSION = "1.1.4";
  const MODULE_URL = `https://unpkg.com/@3d-dice/dice-box@${VERSION}/dist/dice-box.es.min.js`;
  const ORIGIN_URL = `https://unpkg.com/@3d-dice/dice-box@${VERSION}/dist/`;
  let box = null;
  let initialization = null;
  let lastError = "";
  let hideTimer = null;

  function stage() {
    return document.querySelector("#dice-cinematic-stage");
  }

  function setState(state, message = "") {
    const element = stage();
    if (!element) return;
    element.dataset.state = state;
    element.setAttribute("aria-label", message || (state === "loading" ? "Loading cinematic dice" : "Cinematic dice roller"));
    root.dispatchEvent(new CustomEvent("dnd-dice-cinematic-state", { detail: { state, message } }));
  }

  async function ensureReady(profile = {}) {
    if (box) return box;
    if (initialization) return initialization;
    initialization = (async () => {
      const element = stage();
      if (!element) throw new Error("The cinematic dice stage is unavailable.");
      setState("loading", "Loading the cinematic dice renderer");
      const loaded = await import(MODULE_URL);
      const DiceBox = loaded.default || loaded.DiceBox;
      if (typeof DiceBox !== "function") throw new Error("The cinematic dice module did not load correctly.");
      const config = {
        container: "#dice-cinematic-stage",
        assetPath: "assets/",
        origin: ORIGIN_URL,
        theme: "default",
        themeColor: profile.primary || "#b98a3e",
        scale: Number(profile.scale || 5),
        offscreen: true,
        gravity: 1,
        mass: 1,
        friction: .8,
        restitution: .15,
        settleTimeout: 5000,
      };
      box = new DiceBox(config);
      await box.init();
      lastError = "";
      setState("ready", "Cinematic dice ready");
      return box;
    })().catch(error => {
      lastError = String(error?.message || error || "Cinematic dice could not load.");
      initialization = null;
      box = null;
      setState("error", lastError);
      throw error;
    });
    return initialization;
  }

  function normalizeResults(results, groups) {
    const groupResults = [];
    const source = Array.isArray(results) ? results : [];
    for (const item of source) {
      if (Array.isArray(item?.rolls)) groupResults.push(item.rolls.map(roll => Number(roll?.value ?? roll?.result ?? roll)));
      else if (Number.isFinite(Number(item?.value ?? item?.result))) {
        if (!groupResults.length) groupResults.push([]);
        groupResults[groupResults.length - 1].push(Number(item.value ?? item.result));
      }
    }
    if (groupResults.length !== groups.length || groupResults.some((values, index) => values.length < groups[index].count)) {
      const flat = source.flatMap(item => Array.isArray(item?.rolls) ? item.rolls.map(roll => Number(roll?.value ?? roll?.result ?? roll)) : [Number(item?.value ?? item?.result)]).filter(Number.isFinite);
      let offset = 0;
      return groups.map(group => {
        const values = flat.slice(offset, offset + group.count);
        offset += group.count;
        return values;
      });
    }
    return groupResults.map((values, index) => values.slice(0, groups[index].count));
  }

  async function roll(groups, profile = {}, options = {}) {
    clearTimeout(hideTimer);
    const element = stage();
    if (!element) throw new Error("The cinematic dice stage is unavailable.");
    element.hidden = false;
    element.classList.add("active");
    const diceBox = await ensureReady(profile);
    if (typeof diceBox.updateConfig === "function") {
      diceBox.updateConfig({ themeColor: profile.primary || "#b98a3e", scale: Number(profile.scale || 5) });
    }
    const notation = groups.map(group => ({ qty: group.count, sides: group.sides, theme: "default", themeColor: profile.primary || "#b98a3e" }));
    const results = await diceBox.roll(notation.length === 1 ? notation[0] : notation, { theme: "default", newStartPoint: true });
    setState("settled", "Cinematic dice settled");
    if (!options.keepDice) {
      hideTimer = setTimeout(() => {
        element.classList.remove("active");
        element.hidden = true;
        if (typeof diceBox.clear === "function") diceBox.clear();
      }, 2600);
    }
    return normalizeResults(results, groups);
  }

  function clear() {
    clearTimeout(hideTimer);
    if (box && typeof box.clear === "function") box.clear();
    const element = stage();
    if (element) {
      element.classList.remove("active");
      element.hidden = true;
    }
  }

  root.DndCinematicDice = {
    clear,
    ensureReady,
    getStatus: () => ({ ready: Boolean(box), loading: Boolean(initialization && !box), error: lastError, version: VERSION }),
    roll,
  };
})(typeof window !== "undefined" ? window : globalThis);
