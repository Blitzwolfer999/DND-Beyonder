(function initDiceExperience(root) {
  "use strict";

  const STORAGE_KEY = "dndBeyonder.diceExperience.v1";
  const BUILTIN_PROFILES = [
    { id: "royal-gold", name: "Royal Gold", primary: "#b98a3e", secondary: "#fff3cf", effect: "arcane", sound: "felt", scale: 5 },
    { id: "dragon-fire", name: "Dragon Fire", primary: "#d94b32", secondary: "#ffd2a6", effect: "fire", sound: "metal", scale: 5 },
    { id: "frost-rune", name: "Frost Rune", primary: "#57aee8", secondary: "#e7f7ff", effect: "cold", sound: "crystal", scale: 5 },
    { id: "shadow-amethyst", name: "Shadow Amethyst", primary: "#8f63cf", secondary: "#f0deff", effect: "psychic", sound: "arcane", scale: 5 },
    { id: "emerald-restoration", name: "Emerald Restoration", primary: "#3fa76d", secondary: "#ddffea", effect: "healing", sound: "wood", scale: 5 },
    { id: "obsidian", name: "Obsidian", primary: "#6e7780", secondary: "#f1f3f5", effect: "shadow", sound: "stone", scale: 5 },
  ];
  const EFFECT_COLORS = {
    arcane: ["#b77cff", "#f3d7ff"], fire: ["#ff5a36", "#ffcc62"], cold: ["#75cfff", "#effcff"],
    lightning: ["#60a5fa", "#fff47a"], acid: ["#92d83e", "#dfff8c"], poison: ["#61b15a", "#c0ff98"],
    radiant: ["#ffd76a", "#fff8c9"], necrotic: ["#554064", "#bd8bd4"], psychic: ["#b66cff", "#ff8fdd"],
    force: ["#59a5ff", "#b8dcff"], healing: ["#4ed38a", "#c8ffe0"], crit: ["#ffca4b", "#fff7b0"],
    fumble: ["#b63636", "#4a1111"], shadow: ["#6e7780", "#c5ccd3"], none: ["#b98a3e", "#fff3cf"],
  };
  const EFFECT_WORDS = [
    ["fire", /\b(fire|flame|burn|scorch|ember)\b/i], ["cold", /\b(cold|frost|ice|freeze)\b/i],
    ["lightning", /\b(lightning|thunder|shock|electric)\b/i], ["acid", /\b(acid|corrosive)\b/i],
    ["poison", /\b(poison|venom|toxic)\b/i], ["radiant", /\b(radiant|holy|sun|divine)\b/i],
    ["necrotic", /\b(necrotic|death|wither|life drain)\b/i], ["psychic", /\b(psychic|mind|mental)\b/i],
    ["force", /\bforce\b/i], ["healing", /\b(heal|healing|cure|restoration)\b/i],
  ];
  const DEFAULTS = {
    renderer: "performance", effects: "full", soundEnabled: true, volume: .55, activeProfileId: "royal-gold",
    profiles: BUILTIN_PROFILES, characterProfiles: {}, trayDice: [20], keepDice: false, defaultEffect: "auto",
    visibility: "self", targetCampaignId: "", customEffect: { image: "", sound: "", name: "Custom" },
  };
  let settings = loadSettings();
  let campaigns = [];
  let activeCharacterId = "";
  let audioContext = null;
  let effectTimer = null;

  function clone(value) { return JSON.parse(JSON.stringify(value)); }
  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return normalizeSettings(saved || {});
    } catch (error) { return normalizeSettings({}); }
  }
  function normalizeSettings(value) {
    const profiles = Array.isArray(value.profiles) ? value.profiles.filter(profile => profile?.id && profile?.name).slice(0, 30) : [];
    const allProfiles = [...BUILTIN_PROFILES.map(clone), ...profiles.filter(profile => !BUILTIN_PROFILES.some(builtin => builtin.id === profile.id)).map(profile => ({
      id: String(profile.id), name: String(profile.name).slice(0, 40), primary: validColor(profile.primary, "#b98a3e"),
      secondary: validColor(profile.secondary, "#fff3cf"), effect: EFFECT_COLORS[profile.effect] ? profile.effect : "arcane",
      sound: ["felt", "wood", "stone", "metal", "crystal", "arcane", "custom"].includes(profile.sound) ? profile.sound : "felt",
      scale: Math.max(3, Math.min(8, Number(profile.scale || 5))), custom: true,
    }))];
    const activeProfileId = allProfiles.some(profile => profile.id === value.activeProfileId) ? value.activeProfileId : "royal-gold";
    return {
      ...clone(DEFAULTS), ...value, profiles: allProfiles, activeProfileId,
      renderer: value.renderer === "cinematic" ? "cinematic" : "performance",
      effects: ["full", "reduced", "off"].includes(value.effects) ? value.effects : "full",
      volume: Math.max(0, Math.min(1, Number(value.volume ?? .55))), soundEnabled: value.soundEnabled !== false,
      characterProfiles: value.characterProfiles && typeof value.characterProfiles === "object" ? value.characterProfiles : {},
      trayDice: Array.isArray(value.trayDice) ? value.trayDice.map(Number).filter(side => side >= 2 && side <= 1000).slice(0, 30) : [20],
      keepDice: Boolean(value.keepDice), visibility: ["self", "public", "dm"].includes(value.visibility) ? value.visibility : "self",
      customEffect: value.customEffect && typeof value.customEffect === "object" ? value.customEffect : { image: "", sound: "", name: "Custom" },
    };
  }
  function validColor(value, fallback) { return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : fallback; }
  function profileById(id) { return settings.profiles.find(profile => profile.id === id) || settings.profiles[0]; }
  function currentProfile(characterId = activeCharacterId) {
    const assigned = characterId && settings.characterProfiles[characterId];
    return profileById(assigned || settings.activeProfileId);
  }
  function cloudSettings() {
    const copy = clone(settings);
    copy.customEffect = { name: copy.customEffect?.name || "Custom", image: "", sound: "" };
    return copy;
  }
  function saveSettings(options = {}) {
    settings = normalizeSettings(settings);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch (error) {}
    applyProfile();
    renderControls();
    if (options.broadcast !== false) root.dispatchEvent(new CustomEvent("dnd-dice-settings-changed", { detail: cloudSettings() }));
  }
  function applyRemoteSettings(remote) {
    if (!remote || typeof remote !== "object") return;
    const localCustom = settings.customEffect;
    settings = normalizeSettings({ ...settings, ...remote, customEffect: localCustom });
    saveSettings({ broadcast: false });
  }
  function hexToRgba(hex, alpha) {
    const value = validColor(hex, "#b98a3e").slice(1);
    const number = Number.parseInt(value, 16);
    return `rgba(${number >> 16}, ${(number >> 8) & 255}, ${number & 255}, ${alpha})`;
  }
  function applyProfile() {
    const profile = currentProfile();
    if (!profile || !document.body) return;
    document.body.style.setProperty("--dice-edge", profile.primary);
    document.body.style.setProperty("--dice-fill", hexToRgba(profile.primary, .16));
    document.body.style.setProperty("--dice-face", hexToRgba(profile.primary, .34));
    document.body.style.setProperty("--dice-spoke", hexToRgba(profile.secondary, .55));
    document.body.style.setProperty("--dice-num", profile.secondary);
  }

  function inferEffect(result) {
    const isD20Check = result.sides === 20 && (result.mode !== "normal" || result.rolls?.length === 1);
    if (isD20Check && result.rawValue === 20) return "crit";
    if (isD20Check && result.rawValue === 1) return "fumble";
    const explicit = result.effect && result.effect !== "auto" ? result.effect : settings.defaultEffect;
    if (explicit && explicit !== "auto") return explicit;
    const text = `${result.label || ""} ${result.damageType || ""}`;
    return EFFECT_WORDS.find(([, pattern]) => pattern.test(text))?.[0] || currentProfile(result.characterId)?.effect || "arcane";
  }

  function playEffect(result) {
    if (settings.effects === "off" || root.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.querySelector("#dice-effect-layer");
    if (!layer) return;
    clearTimeout(effectTimer);
    const effect = inferEffect(result);
    if (effect === "none") return;
    const colors = EFFECT_COLORS[effect] || EFFECT_COLORS.arcane;
    const count = settings.effects === "reduced" ? 8 : effect === "crit" ? 34 : 20;
    layer.className = `dice-effect-layer active effect-${effect}`;
    layer.style.setProperty("--effect-primary", colors[0]);
    layer.style.setProperty("--effect-secondary", colors[1]);
    layer.replaceChildren();
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement("i");
      const angle = (Math.PI * 2 * index) / count + Math.random() * .45;
      const distance = 70 + Math.random() * (settings.effects === "reduced" ? 70 : 190);
      particle.style.setProperty("--tx", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--ty", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--delay", `${Math.random() * 120}ms`);
      particle.style.setProperty("--spin", `${Math.round(Math.random() * 540 - 270)}deg`);
      particle.style.setProperty("--size", `${4 + Math.random() * 9}px`);
      layer.append(particle);
    }
    if (settings.customEffect?.image && (effect === "arcane" || settings.defaultEffect === "custom")) {
      const image = document.createElement("img");
      image.src = settings.customEffect.image;
      image.alt = "";
      layer.append(image);
    }
    effectTimer = setTimeout(() => { layer.className = "dice-effect-layer"; layer.replaceChildren(); }, settings.effects === "reduced" ? 750 : 1400);
  }

  function audio() {
    const AudioContext = root.AudioContext || root.webkitAudioContext;
    if (!AudioContext) return null;
    if (!audioContext) audioContext = new AudioContext();
    if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
    return audioContext;
  }
  function tone(context, frequency, duration, gain, type = "sine", delay = 0) {
    const oscillator = context.createOscillator();
    const volume = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, context.currentTime + delay);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, frequency * .62), context.currentTime + delay + duration);
    volume.gain.setValueAtTime(Math.max(.0001, gain), context.currentTime + delay);
    volume.gain.exponentialRampToValueAtTime(.0001, context.currentTime + delay + duration);
    oscillator.connect(volume).connect(context.destination);
    oscillator.start(context.currentTime + delay);
    oscillator.stop(context.currentTime + delay + duration);
  }
  function playSound(result) {
    if (!settings.soundEnabled || settings.volume <= 0) return;
    if (settings.customEffect?.sound && currentProfile(result.characterId)?.sound === "custom") {
      const sound = new Audio(settings.customEffect.sound);
      sound.volume = settings.volume;
      sound.play().catch(() => {});
      return;
    }
    const context = audio();
    if (!context) return;
    const profile = currentProfile(result.characterId);
    const effect = inferEffect(result);
    const volume = settings.volume * .12;
    const base = profile.sound === "metal" ? 320 : profile.sound === "crystal" ? 520 : profile.sound === "wood" ? 150 : profile.sound === "stone" ? 90 : profile.sound === "arcane" ? 410 : 120;
    tone(context, base, .16, volume, profile.sound === "metal" ? "square" : "triangle");
    tone(context, base * 1.45, .11, volume * .55, "sine", .035);
    if (effect === "crit") { tone(context, 660, .34, volume, "sine", .09); tone(context, 990, .4, volume * .7, "sine", .14); }
    if (effect === "fumble") tone(context, 55, .42, volume * 1.25, "sawtooth", .06);
  }

  function renderProfileOptions() {
    const select = document.querySelector("#dice-profile-select");
    if (!select) return;
    select.innerHTML = settings.profiles.map(profile => `<option value="${escapeAttribute(profile.id)}" ${profile.id === settings.activeProfileId ? "selected" : ""}>${escapeText(profile.name)}</option>`).join("");
  }
  function renderCampaignOptions() {
    const select = document.querySelector("#dice-campaign-target");
    if (!select) return;
    select.innerHTML = campaigns.length ? campaigns.map(campaign => `<option value="${escapeAttribute(campaign.id)}" ${campaign.id === settings.targetCampaignId ? "selected" : ""}>${escapeText(campaign.name)}</option>`).join("") : `<option value="">No campaign available</option>`;
    select.disabled = !campaigns.length || settings.visibility === "self";
  }
  function renderTray() {
    const target = document.querySelector("#persistent-dice-list");
    if (!target) return;
    target.innerHTML = settings.trayDice.length ? settings.trayDice.map((sides, index) => `<button type="button" class="persistent-die" data-persistent-roll="${index}" title="Roll this d${sides}"><strong>d${sides}</strong><span data-persistent-remove="${index}" aria-label="Remove d${sides}">x</span></button>`).join("") : `<p>No dice pinned. Add a die to build a reusable tray.</p>`;
  }
  function renderDesigner(profile = currentProfile()) {
    if (!profile) return;
    const name = document.querySelector("#dice-design-name");
    const primary = document.querySelector("#dice-design-primary");
    const secondary = document.querySelector("#dice-design-secondary");
    const effect = document.querySelector("#dice-design-effect");
    const sound = document.querySelector("#dice-design-sound");
    const scale = document.querySelector("#dice-design-scale");
    if (name) name.value = profile.name;
    if (primary) primary.value = profile.primary;
    if (secondary) secondary.value = profile.secondary;
    if (effect) effect.value = profile.effect;
    if (sound) sound.value = profile.sound;
    if (scale) scale.value = profile.scale;
  }
  function renderControls() {
    renderProfileOptions(); renderCampaignOptions(); renderTray();
    const skinProfiles = { gold: "royal-gold", crimson: "dragon-fire", emerald: "emerald-restoration", sapphire: "frost-rune", amethyst: "shadow-amethyst", obsidian: "obsidian" };
    document.querySelectorAll("#dice-skins [data-dice-skin]").forEach(button => button.classList.toggle("active", skinProfiles[button.dataset.diceSkin] === settings.activeProfileId));
    const renderer = document.querySelector("#dice-renderer"); if (renderer) renderer.value = settings.renderer;
    const effects = document.querySelector("#dice-effects-level"); if (effects) effects.value = settings.effects;
    const sound = document.querySelector("#dice-sound-enabled"); if (sound) sound.checked = settings.soundEnabled;
    const volume = document.querySelector("#dice-volume"); if (volume) volume.value = settings.volume;
    const keep = document.querySelector("#dice-keep-on-table"); if (keep) keep.checked = settings.keepDice;
    const visibility = document.querySelector("#dice-roll-visibility"); if (visibility) visibility.value = settings.visibility;
    const effect = document.querySelector("#dice-effect-select"); if (effect) effect.value = settings.defaultEffect;
    const assignment = document.querySelector("#dice-character-profile-status");
    if (assignment) assignment.textContent = activeCharacterId ? `Selected character uses ${currentProfile(activeCharacterId).name}.` : "Open a character sheet to assign this profile.";
  }
  function escapeText(value) { const span = document.createElement("span"); span.textContent = String(value ?? ""); return span.innerHTML; }
  function escapeAttribute(value) { return escapeText(value).replace(/"/g, "&quot;"); }

  function fileToDataUrl(file, maximum, typePrefix) {
    return new Promise((resolve, reject) => {
      if (!file || !String(file.type || "").startsWith(typePrefix)) return reject(new Error(`Choose a ${typePrefix.slice(0, -1)} file.`));
      if (file.size > maximum) return reject(new Error(`Keep the file under ${Math.round(maximum / 1024)} KB.`));
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(new Error("The file could not be read."));
      reader.readAsDataURL(file);
    });
  }

  function bindControls() {
    const unlockAudio = () => { if (settings.soundEnabled) audio(); };
    document.addEventListener("pointerdown", unlockAudio, { capture: true });
    document.addEventListener("keydown", unlockAudio, { capture: true });
    document.querySelector("#dice-profile-select")?.addEventListener("change", event => { settings.activeProfileId = event.target.value; saveSettings(); renderDesigner(); });
    document.querySelector("#dice-renderer")?.addEventListener("change", event => { settings.renderer = event.target.value; saveSettings(); });
    document.querySelector("#dice-effects-level")?.addEventListener("change", event => { settings.effects = event.target.value; saveSettings(); });
    document.querySelector("#dice-sound-enabled")?.addEventListener("change", event => { settings.soundEnabled = event.target.checked; saveSettings(); });
    document.querySelector("#dice-volume")?.addEventListener("input", event => { settings.volume = Number(event.target.value); saveSettings(); });
    document.querySelector("#dice-keep-on-table")?.addEventListener("change", event => { settings.keepDice = event.target.checked; saveSettings(); });
    document.querySelector("#dice-effect-select")?.addEventListener("change", event => { settings.defaultEffect = event.target.value; saveSettings(); });
    document.querySelector("#dice-roll-visibility")?.addEventListener("change", event => { settings.visibility = event.target.value; saveSettings(); });
    document.querySelector("#dice-campaign-target")?.addEventListener("change", event => { settings.targetCampaignId = event.target.value; saveSettings(); });
    document.querySelector("#dice-notation-form")?.addEventListener("submit", event => {
      event.preventDefault();
      const input = document.querySelector("#dice-notation");
      root.dispatchEvent(new CustomEvent("dnd-dice-formula", { detail: { notation: input?.value || "" } }));
    });
    document.querySelector("#persistent-dice-add")?.addEventListener("click", () => {
      const select = document.querySelector("#persistent-dice-type");
      settings.trayDice.push(Number(select?.value || 20)); saveSettings();
    });
    document.querySelector("#persistent-dice-roll")?.addEventListener("click", () => {
      if (!settings.trayDice.length) return;
      const counts = settings.trayDice.reduce((map, sides) => map.set(sides, (map.get(sides) || 0) + 1), new Map());
      const notation = [...counts].map(([sides, count]) => `${count}d${sides}`).join("+");
      root.dispatchEvent(new CustomEvent("dnd-dice-formula", { detail: { notation, label: "Persistent tray" } }));
    });
    document.querySelector("#persistent-dice-clear")?.addEventListener("click", () => { settings.trayDice = []; saveSettings(); root.DndCinematicDice?.clear(); });
    document.querySelector("#persistent-dice-list")?.addEventListener("click", event => {
      const remove = event.target.closest("[data-persistent-remove]");
      if (remove) { event.stopPropagation(); settings.trayDice.splice(Number(remove.dataset.persistentRemove), 1); saveSettings(); return; }
      const die = event.target.closest("[data-persistent-roll]");
      if (die) root.dispatchEvent(new CustomEvent("dnd-dice-formula", { detail: { notation: `1d${settings.trayDice[Number(die.dataset.persistentRoll)]}`, label: "Persistent die" } }));
    });
    document.querySelector("#dice-profile-save")?.addEventListener("click", () => {
      const id = `custom-${Date.now().toString(36)}`;
      const profile = {
        id, custom: true, name: document.querySelector("#dice-design-name")?.value.trim().slice(0, 40) || "Custom Dice",
        primary: document.querySelector("#dice-design-primary")?.value || "#b98a3e", secondary: document.querySelector("#dice-design-secondary")?.value || "#fff3cf",
        effect: document.querySelector("#dice-design-effect")?.value || "arcane", sound: document.querySelector("#dice-design-sound")?.value || "felt",
        scale: Number(document.querySelector("#dice-design-scale")?.value || 5),
      };
      settings.profiles.push(profile); settings.activeProfileId = id; saveSettings(); renderDesigner(profile);
    });
    document.querySelector("#dice-profile-delete")?.addEventListener("click", () => {
      const profile = currentProfile(); if (!profile?.custom) return;
      settings.profiles = settings.profiles.filter(item => item.id !== profile.id);
      Object.keys(settings.characterProfiles).forEach(id => { if (settings.characterProfiles[id] === profile.id) delete settings.characterProfiles[id]; });
      settings.activeProfileId = "royal-gold"; saveSettings(); renderDesigner();
    });
    document.querySelector("#dice-profile-assign")?.addEventListener("click", () => {
      if (!activeCharacterId) return;
      settings.characterProfiles[activeCharacterId] = settings.activeProfileId; saveSettings();
    });
    document.querySelector("#dice-effect-image")?.addEventListener("change", async event => {
      try { settings.customEffect.image = await fileToDataUrl(event.target.files?.[0], 650 * 1024, "image/"); saveSettings(); }
      catch (error) { root.dispatchEvent(new CustomEvent("dnd-dice-error", { detail: String(error.message || error) })); }
      event.target.value = "";
    });
    document.querySelector("#dice-effect-sound")?.addEventListener("change", async event => {
      try { settings.customEffect.sound = await fileToDataUrl(event.target.files?.[0], 500 * 1024, "audio/"); saveSettings(); }
      catch (error) { root.dispatchEvent(new CustomEvent("dnd-dice-error", { detail: String(error.message || error) })); }
      event.target.value = "";
    });
    document.querySelector("#dice-profile-export")?.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(currentProfile(), null, 2)], { type: "application/json" });
      const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${currentProfile().name.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}-dice.json`; link.click(); URL.revokeObjectURL(link.href);
    });
    document.querySelector("#dice-profile-import")?.addEventListener("change", event => {
      const file = event.target.files?.[0]; if (!file) return;
      const reader = new FileReader(); reader.onload = () => {
        try {
          const imported = JSON.parse(String(reader.result || "{}"));
          settings.profiles.push({ ...imported, id: `custom-${Date.now().toString(36)}`, custom: true });
          settings.activeProfileId = settings.profiles.at(-1).id; saveSettings(); renderDesigner();
        } catch (error) { root.dispatchEvent(new CustomEvent("dnd-dice-error", { detail: "That dice profile file is not valid." })); }
      }; reader.readAsText(file); event.target.value = "";
    });
  }

  function init() { applyProfile(); bindControls(); renderControls(); renderDesigner(); }
  function setCampaigns(value) { campaigns = Array.isArray(value) ? value.map(campaign => ({ id: campaign.id, name: campaign.name })) : []; if (!campaigns.some(campaign => campaign.id === settings.targetCampaignId)) settings.targetCampaignId = campaigns[0]?.id || ""; renderCampaignOptions(); }
  function setActiveCharacter(id) { activeCharacterId = id || ""; applyProfile(); renderControls(); }
  function selectProfile(id) {
    if (!settings.profiles.some(profile => profile.id === id)) return;
    settings.activeProfileId = id;
    saveSettings();
    renderDesigner();
  }
  function rollOptions() { return { campaignId: settings.visibility === "self" ? "" : settings.targetCampaignId, visibility: settings.visibility, effect: settings.defaultEffect }; }

  root.DndDiceExperience = {
    applyRemoteSettings, cloudSettings, currentProfile, getSettings: () => clone(settings), inferEffect, init, playEffect, playSound,
    rollOptions, saveSettings, selectProfile, setActiveCharacter, setCampaigns,
  };
})(typeof window !== "undefined" ? window : globalThis);
