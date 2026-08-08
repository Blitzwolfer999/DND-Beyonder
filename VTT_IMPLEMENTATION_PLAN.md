# DND Beyonder VTT Implementation Plan

## Scope

Build DND Beyonder's campaign map system into a D&D Beyond Maps-style virtual tabletop focused on fast table use:

- Campaign-scoped live map room.
- DM-controlled prep and player-safe play views.
- Character, monster, companion, and object tokens.
- Shared dice/game log.
- Fog of war, drawing, overlays, stickers, ruler, point, and ping.
- Combat encounter mode with initiative, rounds, HP, and monster stat blocks.

This plan intentionally assumes all DND Beyonder content is available to every signed-in user. No paid-content gates.

## D&D Beyond Maps Feature Model

Official D&D Beyond Maps surfaces the VTT as a campaign-integrated browser room. The core feature set is:

- Map browser with official maps, uploaded maps, and quickplay maps.
- Upload flow with map title, file upload, grid scaling/calibration, edit/delete, sorting, and storage tracking.
- Token browser with Monsters, Players, and Companions.
- Correct token sizing from creature size, including larger monsters occupying multiple squares.
- Player character tokens sourced from character sheet art.
- Token controls: move, hide/reveal, rename, border color, delete.
- DM/player map session state: start, pause, resume, end.
- Invite and map links.
- Connected players menu.
- Game Log that aggregates rolls from character sheets, maps, encounters, combat tracker, and related tools.
- Fog of war with cover all, reveal all, paint, erase, brush shape, and brush size.
- Ruler, point trail, and ping.
- DM drawing tools with color, brush size, erase, clear all, and persistence.
- Overlays for square/cube, circle/sphere/cylinder, cone, and line with color/pattern/visibility.
- Stickers/props that can be searched, placed, moved, resized, rotated, hidden, locked, and deleted.
- Select/group/lock tools for map elements.
- Spectator/player-safe view.
- Combat encounters directly on maps: add tokens to encounter, party/enemy/NPC groups, auto/manual initiative, advantage/disadvantage, difficulty estimate, rounds/turns, hidden creature handling, mid-combat additions, monster HP/temp HP/max HP override, monster stat block viewing, and monster rolls.

## Current DND Beyonder Status

Already present:

- Supabase-backed campaigns: campaigns, members, shared characters, maps.
- Campaign invite code flow.
- DM read/update access to shared character sheets.
- Character vault separates owned sheets from DM campaign sheets.
- Campaign map panel.
- Map creation with columns, rows, grid size, image URL/upload.
- Map settings edit/delete.
- Built-in and custom tile stamps.
- Party tokens using shared character portraits.
- Token movement and resizing.
- DM can move any campaign token; players can move their own tokens.
- 7-second polling-based campaign sync.
- Local dice history and animated dice overlay.
- Campaign rolls for initiative, perception, stealth.
- Rest, HP, temp HP, and item controls on campaign character cards.

Current constraints:

- Map state is mostly stored in `campaign_maps.data` JSON.
- There is no dedicated game log table.
- There is no encounter/combat table.
- There is no presence/session table.
- There are no monster/NPC token data sources yet.
- Realtime is simulated by polling.
- Fog, drawings, overlays, pings, and stickers are not implemented as first-class map layers.

## Recommended Data Model

Keep `campaign_maps` as the map shell, but stop treating it as the only state container.

### Extend Existing Map Data JSON

Use `campaign_maps.data` for relatively stable map configuration:

```json
{
  "columns": 24,
  "rows": 16,
  "gridSize": 44,
  "background": "",
  "backgroundFit": "cover",
  "scale": { "feetPerSquare": 5, "offsetX": 0, "offsetY": 0 },
  "session": { "state": "draft|live|paused|ended", "activeMapId": "" },
  "fog": { "enabled": false, "mode": "covered", "cells": [] },
  "drawings": [],
  "overlays": [],
  "stickers": [],
  "tiles": [],
  "customTiles": []
}
```

Tokens can remain in map JSON during the first upgrade, but should eventually move to `campaign_map_tokens` for better concurrent updates.

### New Tables

`campaign_game_log`

- `id uuid primary key`
- `campaign_id uuid`
- `actor_user_id uuid`
- `actor_name text`
- `character_id text null`
- `source text` such as `sheet`, `map`, `combat`, `monster`
- `label text`
- `rolls jsonb`
- `raw_total integer`
- `modifier integer`
- `total integer`
- `visibility text check ('public','dm')`
- `created_at timestamptz`

`campaign_encounters`

- `id uuid primary key`
- `campaign_id uuid`
- `map_id uuid null`
- `name text`
- `status text check ('draft','active','paused','ended')`
- `round integer`
- `turn_index integer`
- `difficulty text`
- `data jsonb`
- `updated_at timestamptz`

`campaign_encounter_combatants`

- `id uuid primary key`
- `encounter_id uuid`
- `map_token_id text null`
- `type text check ('player','companion','monster','npc')`
- `name text`
- `side text check ('party','enemy','npc')`
- `initiative integer null`
- `initiative_mode text`
- `ac integer null`
- `hp_current integer null`
- `hp_max integer null`
- `hp_temp integer null`
- `conditions jsonb`
- `stat_block jsonb`
- `hidden boolean`
- `sort_suffix text`

`campaign_presence`

- `campaign_id uuid`
- `user_id uuid`
- `display_name text`
- `character_id text null`
- `active_map_id uuid null`
- `cursor jsonb`
- `last_seen timestamptz`
- primary key `(campaign_id, user_id)`

Optional later table: `campaign_map_tokens`, once token concurrency becomes annoying in JSON.

## Permission Rules

- Campaign members can read campaign maps, logs, live session state, visible tokens, visible overlays, and visible stickers.
- DMs can create/update/delete maps, fog, overlays, stickers, encounters, monster/NPC tokens, and all combatants.
- Players can move/resize only tokens tied to their own shared characters/companions unless DM settings allow broader control.
- Players can add public rolls to the game log.
- DMs can add public or DM-private rolls/log entries.
- Hidden tokens, hidden overlays, hidden stickers, and covered fog regions must be filtered for player/spectator view.
- Player settings should be campaign-scoped toggles: move own token, move monster tokens, draw, point, ping, group/lock.

## Implementation Phases

### Phase 1: Shared Game Log

Goal: every sheet, campaign, and map roll creates a campaign-visible log entry.

Work:

- Add `campaign_game_log` table and RLS.
- Add `recordCampaignRoll(campaignId, rollPayload)`.
- Update `rollOnSheet` to optionally accept campaign context.
- Add a right-side Game Log panel in Campaigns.
- Show roll label, roller, raw dice, modifier, total, time, and expand/collapse details.
- Poll or subscribe to log updates.

Acceptance:

- DM rolls from a shared sheet and players see it in the campaign log.
- Player rolls from their sheet and the DM sees it.
- Local dice page still works without campaign context.

### Phase 2: VTT Shell And Session Controls

Goal: campaign map feels like a session room rather than an editor section.

Work:

- Split map UI into left toolbar, center map canvas, right panel.
- Add `Start Session`, `Pause`, `Resume`, and `End`.
- Player view shows waiting/paused/ended states when appropriate.
- Add map link copy button and campaign invite copy button in the map info area.
- Add connected players panel using `campaign_presence`.
- Add spectator/player-safe mode.

Acceptance:

- Player cannot see active map until DM starts session.
- Pause/end hides map from player view.
- Presence shows connected users and selected character.

### Phase 3: Token Browser And Token Toolbar

Goal: token handling becomes table-ready.

Work:

- Add token browser tabs: Players, Companions, Monsters, Custom.
- Players tab uses shared campaign character portraits.
- Companions tab uses character extras once extras are represented.
- Monsters tab starts with SRD/basic monster records and can be expanded later.
- Add token toolbar: hide/reveal, rename, border color, delete, size.
- Add `hidden`, `borderColor`, `customName`, `type`, `side`, `size`, `hp`, `statBlockRef`.
- Use creature size to set default token footprint.

Acceptance:

- DM can add a monster token and player character token.
- Player sees only revealed tokens.
- Player can move own token; DM can control all.

### Phase 4: Fog Of War

Goal: player-safe visibility.

Work:

- Add fog layer to map data.
- Tools: cover all, reveal all, paint fog, erase fog.
- Brush: square/circle, sizes 1, 2, 3, 4, 6 cells.
- Render fog differently for DM and player:
  - DM sees fog as translucent overlay.
  - Player sees covered cells as opaque.
- Store fog as cells first; later optimize to polygons if needed.

Acceptance:

- DM can cover/reveal parts of the map.
- Player view hides covered areas and hidden tokens under them.

### Phase 5: Ping, Point, Ruler, And Draw

Goal: live table communication.

Work:

- Add ping tool that writes short-lived ping events to map data or a `campaign_map_events` table.
- Add point trail events with expiration.
- Add local ruler tool that measures feet based on grid scale.
- Add DM draw layer: strokes with color, brush size, erase, clear.
- Respect campaign settings for player drawing/ping/point permissions.

Acceptance:

- Pings appear to all connected users.
- Ruler distance is accurate.
- DM drawings persist after reload.

### Phase 6: Overlays And Spell Templates

Goal: support spell/effect targeting.

Work:

- Add overlay shapes: square, circle, cone, line.
- Add color and pattern selection.
- Add visibility toggle, move, rotate, resize, delete.
- Add quick spell templates from spells with AoE metadata when available.

Acceptance:

- DM can place a 20-foot sphere or 30-foot cone.
- Player view respects hidden overlay state.

### Phase 7: Stickers And Props

Goal: map dressing without replacing the map.

Work:

- Rename/expand current tile stamping into a sticker/prop browser.
- Built-in fantasy props: door, chest, trap, table, barrel, rubble, fire, stairs, bridge, tree, wall segment, marker.
- Custom sticker upload.
- Move/resize/rotate/lock/hide/delete.
- Keep tile painting as a separate Terrain tool.

Acceptance:

- DM can place a prop, rotate it, resize it, hide it, and reveal it later.

### Phase 8: Combat Encounter Mode

Goal: run combat inside the map.

Work:

- Add encounter and combatant tables.
- Button: `Build encounter from map tokens`.
- Group combatants into Party, Enemies, NPCs.
- Auto/manual initiative with advantage/disadvantage.
- Start combat, next turn, previous/undo turn, end combat.
- Round/turn tracker.
- Display player-facing initiative strip, hiding unrevealed monsters.
- Monster HP/temp HP/max override.
- Monster stat block panel.
- Monster rolls routed to Game Log.
- Sync character HP from shared sheets into combatants.

Acceptance:

- DM can build encounter from placed tokens, roll initiative, advance rounds, damage a monster, and roll an attack/check into the shared log.

### Phase 9: Map Upload Calibration

Goal: uploaded maps align smoothly.

Work:

- Replace raw grid size fields with a calibration modal.
- User places an anchor corner and drags scale handle.
- Store `scale.offsetX`, `scale.offsetY`, `gridSize`, and feet per square.
- Add zoom/pan during calibration.
- Support rename/delete/edit for uploaded maps.

Acceptance:

- A gridded uploaded map can be aligned without manually guessing pixel grid size.

### Phase 10: Quickplay Encounters

Goal: let a DM start quickly.

Work:

- Add built-in starter scenes: tavern brawl, forest road ambush, dungeon room, cave mouth, town square.
- Each quickplay scene includes map settings, terrain, stickers, starting fog, and optional monsters.
- Add `Create from template` to map creation.

Acceptance:

- DM can start a ready-to-run encounter map in under a minute.

## Technical Notes

- For Phase 1-3, polling can continue.
- For Phase 4+, Supabase Realtime should replace or supplement polling for `campaign_game_log`, `campaign_presence`, and future combat/event tables.
- Do not put large uploaded images directly into JSON forever. Current base64 image storage works for testing but will hit browser/Supabase payload limits. Long term, use Supabase Storage buckets for map backgrounds, stickers, and portraits.
- Prefer small, typed map events for high-frequency interactions: `ping`, `point`, `presence`, and `roll`.
- Keep player-safe rendering as a pure function: `visibleMapDataForRole(map, role, userId)`.
- Keep each VTT layer independent: terrain, stickers, fog, drawings, overlays, tokens, pings, UI.

## Suggested Next Implementation Sprint

Build the VTT foundation in this order:

1. Shared Game Log.
2. Campaign session state and right-side VTT layout.
3. Token toolbar with hide/reveal, rename, border color, delete.
4. Fog of war with square/circle brush.
5. Ping/ruler.
6. Basic combat initiative tracker.

This sequence produces useful table features quickly while setting up the schema needed for monster tokens, overlays, stickers, and full encounter mode.
