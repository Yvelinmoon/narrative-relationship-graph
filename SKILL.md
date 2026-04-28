---
name: narrative-relationship-graph
description: Use when the user wants to create, update, personalize, or rebuild an interactive narrative relationship graph / 3D character-event-world network, including preparing node data, writing relationships, splitting overview/subgraph views, encoding factions, and adapting the bundled template.html and the existing Three.js project at /Users/yves/narrative-graph-mvp for stories such as Harry Potter, 红楼梦, 进击的巨人, historical narratives, games, novels, or fictional universes.
metadata:
  short-description: Build personalized narrative relationship graphs
---

# Narrative Relationship Graph

## Use This Skill When

Use this skill when the user asks to build or modify a relationship-network frontend for a narrative world, including:

- 人物关系网, 角色关系图, 事件关系网, 世界观关系图
- Character/event/faction/place/object network visualizations
- Works such as 红楼梦, 哈利波特, 进击的巨人, 三体, historical dynasties, games, anime, novels, RPG worlds
- Tasks involving data preparation, relation writing, faction encoding, subgraph navigation, Three.js graph UI, or personalized visual themes

## Base Template

Use the standalone HTML shell bundled with this skill as the HTML entry template:

`/Users/yves/.codex/skills/narrative-relationship-graph/template.html`

Do not inline the HTML into `SKILL.md`. When a user asks to create or personalize a relationship graph, copy or adapt `template.html` as the page shell, then connect it to the graph app scripts/styles.

The current complete runnable project remains the reusable implementation reference:

`/Users/yves/narrative-graph-mvp`

This project is a static Three.js relationship graph with modular JS, CSS, vendored Three.js, node cards, subgraph navigation, crystal-ball nodes, faction-colored nodes, curved relation lines, hover/focus behavior, and a cache-busted entry flow.

Important: the runnable reference project may currently contain a specific story theme from recent work. Treat that as an implementation example, not as the default theme. For a new world, replace the data, title, copy, colors, decorative elements, node imagery, and typography so the result no longer feels like the previous story.

Default preview URL:

`http://127.0.0.1:8824/`

If the server is not running, start it from the project root:

```bash
python3 -m http.server 8824
```

When changing JS or CSS, update cache-busting versions in:

- `index.html`
- `app.js`
- `src/main.js`
- `BUILD_ID` in `src/main.js`

Keep the bundled `template.html` as the HTML shell and the full Three.js project as the working implementation template. For a new personalized graph, either modify the current project directly when the user is iterating on it, or copy the project to a new folder first if the user wants a separate work.

## Product Principle

The graph should help users understand narrative structure, not just look dense.

Prioritize:

- Semantic clarity over visual decoration
- Faction/force relationships that are directly visible
- A default overview plus smaller independent subgraphs
- Hover/focus states that isolate relevant relationships
- Sparse enough layouts that the graph can be manually indexed
- Minimal UI outside the graph; navigation is allowed only when it improves graph browsing

Avoid:

- Dumping every node into one unreadable graph
- Encoding too many meanings at once on the same visual channel
- Adding decorative UI that competes with the graph
- Showing all edge labels by default
- Random rainbow colors

## Theme Reset Rules

The default theme is a neutral narrative graph, not Harry Potter or any other existing franchise. When creating a new relationship graph, start by defining a theme brief before editing visuals.

Theme brief should include:

- Narrative mood: palace genealogy, dark military archive, cosmic sci-fi map, folkloric scroll, noir case board, etc.
- Palette: 3-5 colors tied to the world and its factions
- Typography direction: handwritten, serif archive, technical display, classical book, military stencil, etc.
- Background atmosphere: parchment, star field, map grid, archive dust, water ink, battlefield haze, etc.
- Node material metaphor: crystal, seal, jade bead, metal token, star, document pin, rune, etc.
- Decorative elements: only small non-interfering accents that support the world

Do not reuse story-specific decorative elements from the reference project unless they fit the new world. For example, a magic sigil or Hogwarts-like ornament is appropriate for a wizarding graph but wrong for 红楼梦, 进击的巨人, 三体, or historical politics.

For each new world, update at least:

- HTML title and `aria-label`
- Dataset file name/imports if the graph is no longer the reference story
- Node/faction color palette
- Background and decorative CSS
- Card tone, image treatment, and label style
- Any hardcoded story-specific text, IDs, view labels, or comments

If the user does not specify a visual direction, choose a neutral theme that matches the story instead of inheriting the previous project theme.

### Theme Tokens

Prefer putting theme decisions behind named tokens instead of scattering one-off values. At minimum define or update tokens for:

- Background base, glow, vignette, and atmospheric pattern
- Text primary, text muted, card background, card border
- Faction colors and neutral node colors
- Edge colors by relation class
- Highlight glow and unrelated fade opacity
- Decorative accent colors

Theme tokens should make the page feel like the selected world while preserving graph readability. Do not use a franchise palette as the fallback for unrelated worlds.

### Example Theme Directions

Use these as starting points, then adapt to the user's story:

- 红楼梦: warm parchment, cinnabar, ink black, jade green, family-seal nodes, subtle scroll texture
- 进击的巨人: desaturated military map, wall-stone gray, blood rust, brass, regiment insignia accents
- 三体: dark cosmic grid, cold cyan, solar gold, signal green, orbital arcs, star-map atmosphere
- Historical politics: archive paper, wax red, imperial gold, steel blue, document-card nodes, map-grid background
- Noir investigation: charcoal board, amber lamp, faded photo cards, red thread edges, case-file typography

### Theme Cleanup Pass

Before considering a new graph complete, search for leftover theme names and visual motifs from prior work. Check:

- HTML title and `aria-label`
- Data file name, imports, `DATASET_KEY`, root ID, and view labels
- CSS class names or comments that mention a previous world
- Decorative DOM created in `src/main.js`
- Palette constants in `styles.css` and `src/core/graph.js`
- Image URLs and fallback copy

If any prior-world wording remains, either replace it or document why it is intentionally retained.

## Data Model

Represent a narrative world with nodes, edges, and views.

### Nodes

Use stable lowercase IDs. Prefer short semantic IDs over display labels.

```js
{
  id: "root-character",
  label: "中心角色",
  type: "character",
  zone: "character",
  description: "关系网的叙事中心，连接主要人物、关键事件和核心阵营。简介应说明这个节点为什么能作为理解整张图的入口。",
  image: "https://...",
  imageSource: "https://commons.wikimedia.org/wiki/File:...",
  imageCredit: "Wikimedia Commons / source page title"
}
```

Every node should include a `description` of about 50-100 Chinese characters. Write it as a concise narrative card intro, not as a dictionary definition. It should explain why the node matters in the graph: role, faction/camp, event function, symbolic meaning, or key conflict.

For large datasets, keep descriptions in a separate dictionary and merge them into nodes to reduce object clutter:

```js
const NODE_DESCRIPTIONS = {
  "root-character": "关系网的叙事中心，连接主要人物、关键事件和核心阵营。简介应说明这个节点为什么能作为理解整张图的入口。"
};

const nodes = rawNodes.map((node) => ({ ...node, description: NODE_DESCRIPTIONS[node.id] ?? "" }));
```

Do not leave descriptions empty in final output. If source certainty is limited, write a safe high-level description and avoid over-specific claims.

When adding real images, prefer storing `imageSource` and `imageCredit` alongside `image`. These fields are not required for rendering, but they make image provenance auditable and make it easier to replace broken URLs later.

Recommended node types:

- `character`: people or intelligent roles
- `event`: plot events, battles, turning points, incidents
- `faction`: organizations, families, political groups, schools, houses, camps
- `place`: geography, cities, buildings, regions
- `object`: artifacts, weapons, documents, clues, heirlooms

Recommended zones:

- `character`: characters
- `event`: events or timeline nodes
- `world`: factions, places, objects, institutions, geography

### Edges

Use relation labels as readable verbs or short phrases. Do not use vague labels like “related”.

```js
{
  source: "root-character",
  target: "core-faction",
  label: "归属",
  relation: "character-world"
}
```

Supported relation classes:

- `character-character`: friendship, rivalry, kinship, mentorship, romance, protection
- `character-event`: participation, victim, witness, planner, betrayer, killer, defender
- `event-event`: timeline, escalation, cause/effect, foreshadowing, consequence
- `character-world`: faction, family, school, office, object ownership, place association
- `event-world`: event location, participating organization, contested object
- `world-world`: institution hierarchy, family alliance, geography containment, artifact category

### Directional Perspectives

A relationship is not always symmetric. When A's view of B differs from B's view of A, keep one visual edge but add `perspectives` to the data.

```js
{
  source: "boa-hancock",
  target: "luffy",
  label: "非对称情感",
  relation: "character-character",
  perspectives: [
    { from: "boa-hancock", to: "luffy", label: "爱慕" },
    { from: "luffy", to: "boa-hancock", label: "信任/伙伴，没有恋爱情感" }
  ]
}
```

Use `perspectives` for:

- One-sided romance or admiration
- Protection vs misunderstanding
- Manipulation vs loyalty
- Public alliance vs private suspicion
- Role-duty vs personal emotion
- Any relation where the two endpoints would describe the relation differently

Display rule: keep the graph visually simple with a single edge. Hover should only isolate/highlight related nodes and edges; do not show extra text on hover. Show the summary `label` and each perspective inside the clicked node's info card. Only add arrows or double curves if the user explicitly asks for directional visual encoding.

## Writing Relationships

Follow this sequence:

1. Start with a central root.
2. Add core characters directly related to the root.
3. Add faction/family/school affiliations early, because they shape interpretation.
4. Add major events only after the character/faction skeleton is clear.
5. Add places and objects as supporting context, not as noise.
6. Add event-event timeline edges last.

For each edge, ask:

- Can a user explain why this relation exists from the label alone?
- Is this relation important enough to show visually?
- Does it help identify faction, conflict, timeline, or causality?

Use faction edges heavily. They are important in narrative graphs:

```js
{ source: "character", target: "faction", label: "归属", relation: "character-world" }
{ source: "character", target: "family", label: "家族成员", relation: "character-world" }
{ source: "event", target: "faction", label: "参战", relation: "event-world" }
```

## Visual Encoding Rules

Use visual channels consistently:

- Node color: primary faction / force / camp
- Node size: importance and layer
- Node position: narrative structure and subgraph layout
- Node type: expressed through position, label, and card metadata, not primarily through color
- Edge color: relationship class, kept low-saturation and star-like
- Edge labels: hidden by default and not shown on hover; relation text belongs in the clicked node card
- Highlighting: related nodes/edges stay readable; unrelated graph fades hard

For faction color, use priority rather than multi-color rings. If a character belongs to multiple groups, choose the strongest narrative force first.

Suggested priority:

1. Main antagonist camp / enemy force
2. Main protagonist organization
3. Sub-organization or resistance group
4. Government / institution
5. Family / lineage
6. School / house / local group

Do not add complex outer rings or many small pips unless the user explicitly asks for multi-affiliation glyphs. They are easy to misunderstand.

## Views And Subgraphs

Always prefer a default overview plus independent subgraphs over one giant graph.

Recommended top-level sections:

```text
总览
人物
事件
世界
物品
```

For MVP, use four sections first:

```text
总览 / 人物 / 事件 / 世界
```

Each section can contain second-level views:

```js
export const GRAPH_VIEWS = [
  {
    id: "overview",
    label: "总览",
    children: [
      { id: "overview-all", label: "全部总览", rootId: "root", include: "all" },
      { id: "overview-main", label: "主线", rootId: "root", include: ["root", "ally", "enemy", "event"] }
    ]
  }
];
```

A subgraph should have:

- `id`: stable view ID
- `label`: UI label
- `rootId`: subgraph center
- `include`: explicit node IDs or `all`

Subgraphs should rebuild the graph from their own node/edge set, not simply dim old content. When switching views, ensure old Three.js objects and CSS2D labels are removed.

## Adaptive Layout Rules

Do not hardcode layout around a specific story's node IDs unless the user explicitly wants a hand-curated poster-like layout. The Harry Potter reference project contains some hand-tuned overview sectors, but a reusable skill should prefer data-driven layout.

Use this layout strategy for new worlds:

1. Root at center.
2. Compute graph distance from `rootId` using active subgraph edges.
3. First-hop important characters and factions go on the first ring.
4. Secondary characters go on the second ring.
5. Events go on a narrative/timeline arc or event ring.
6. Factions, places, and objects go on outer semantic bands.
7. Radius and angular spread must scale with node count.

Prefer formulas over fixed IDs:

```js
const ringRadius = baseRadius + Math.max(0, nodeCount - 8) * radiusStep;
const spread = Math.min(maxSpread, minSpread + nodeCount * spreadStep);
const angleStep = nodeCount <= 1 ? 0 : spread / (nodeCount - 1);
```

Good generic grouping signals:

- `zone`: character / event / world
- `type`: character / event / faction / place / object
- graph distance from root
- degree centrality
- faction membership edges
- event-event timeline edges
- optional data fields such as `layoutGroup`, `arc`, `rank`, `era`, `faction`, or `importance`

For reusable data, allow optional layout hints on nodes:

```js
{
  id: "lin-daiyu",
  label: "林黛玉",
  type: "character",
  zone: "character",
  faction: "jia-family",
  layoutGroup: "core-romance",
  importance: 95
}
```

Layout hints should guide placement, not be required. If hints are missing, fall back to graph distance, type, degree, and relation classes.

Subgraph layout can be simpler than overview layout. For each subgraph, use radial BFS rings around the view root. This adapts well to different node counts and avoids needing story-specific sectors.

Avoid these brittle patterns in reusable skills:

- Fixed arrays like `ids: ["harry", "ron", "hermione"]` as the only layout mechanism
- World clusters based only on hardcoded ID sets
- One fixed radius for any number of nodes
- One fixed spread for every subgraph
- Assuming exactly three character groups or exactly four factions

If a project starts with a hand-tuned layout, document it as a theme-specific override and keep a generic fallback path.

## Workflow For A New World

1. Identify the world root.

Examples:

- 红楼梦: `jia-baoyu` or 贾府 as root, depending on whether the user wants character-first or family-first.
- 进击的巨人: `eren`, `paradis`, or `titans` depending on focus.
- Political history: dynasty/state/institution as root.

2. Define factions first.

Examples:

- 红楼梦: 贾府, 王家, 史家, 薛家, 大观园, 朝廷, 僧道/命运线.
- 进击的巨人: 帕拉迪岛, 马莱, 艾尔迪亚, 调查兵团, 宪兵团, 战士队, 王政, 巨人体系.

3. Add core characters.

Keep the first pass compact. Add only the characters needed to understand the root and main conflict.

4. Add events.

Use events to explain change over time, not just as extra nodes.

5. Add places and objects.

Only add places and objects that connect important characters, factions, or events.

6. Search and attach node images.

For character, faction, place, and iconic object nodes, search Wikimedia / Wikimedia Commons first. Add images where a clear representative image exists, and leave the node image-free when the result is uncertain or visually misleading. Do not delay the graph for perfect image coverage; prioritize core characters and visually important world nodes.

For each accepted image, store:

- `image`: direct renderable image URL
- `imageSource`: file or article page URL
- `imageCredit`: short source label, usually Wikimedia Commons or the file page title

7. Create views.

Add overview first, then 3-8 useful subgraphs. Each subgraph should answer a clear question:

- “Who belongs to this camp?”
- “What happened in this event?”
- “How does this family connect?”
- “Which objects drive the plot?”

8. Reset the visual theme.

Do this as a required step, not a final polish pass. Change colors, background, typography, camera, node materials, card tone, decorative elements, title, and accessibility labels to match the world. Preserve interaction and graph-reading clarity. Never ship a new world while it still looks like the previous reference project's franchise theme.

## Implementation Checklist

When editing the base project, usually touch these files:

- `src/data/<story>.js`: preferred for a new world; use existing story files only when continuing that same graph
- `src/core/state.js`: subgraph filtering and layout behavior if needed
- `src/core/graph.js`: node materials, faction color priority, edge style, reveal/highlight behavior
- `src/core/scene.js`: camera, lighting, controls
- `src/main.js`: story data import, decorative DOM, view index, build stamp, initialization
- `styles.css`: theme tokens, UI, labels, cards, decorative atmosphere
- `index.html` and `app.js`: title, accessibility labels, data-entry import, and cache-busting

Keep the current project architecture unless there is a strong reason to refactor.

## Image Rules

If the graph uses real character images, avatars, faction marks, place photos, or object covers, verify sources before adding URLs. Wikimedia-style URLs can work well, but may fail CORS or disappear. Implement graceful fallback.

Recommended search order:

1. Wikimedia Commons file page for public/free media.
2. Wikipedia infobox image when Commons is not obvious.
3. Official/public-domain source where appropriate for historical or real-world topics.
4. No image if the result is uncertain, low quality, or likely rights-sensitive.

Good Wikimedia query patterns:

- `site:commons.wikimedia.org <character or place name> portrait`
- `site:wikipedia.org <work name> <character name> image`
- `Wikimedia Commons <faction/place/object name>`

For fictional works, prioritize cast/film poster-style images only when they are already available on Wikimedia/Wikipedia and technically renderable. Do not hotlink random fan art or unverified image-CDN results.

For each accepted image:

- Use a direct image URL in `image`, such as an `upload.wikimedia.org` URL.
- Store the file/article page in `imageSource`.
- Store a compact attribution/source label in `imageCredit`.
- Prefer stable thumbnail URLs sized around 330-640px when full-resolution files are unnecessarily large.
- Test at least a few core image URLs in the browser; if they fail, keep the node without an image.

Rendering fallback rules:

- Hide image sprite on load error
- Keep node visible without image
- Crop portraits from top center when possible to preserve heads
- Do not let images distort; crop rather than stretch

## Verification

After edits, run syntax checks:

```bash
node --check src/main.js
node --check src/core/graph.js
node --check src/core/state.js
node --check src/data/<story>.js
node --check app.js
```

Check local serving:

```bash
curl -I 'http://127.0.0.1:8824/?v=<cache-version>'
```

If subgraphs changed, verify every view has at least one node and preferably at least one edge.

## Common Failure Modes

- Old CSS2D labels remain after view switch: recursively remove CSS2D DOM when clearing old graph objects.
- User sees two graphs at once: old node or label groups were not fully cleared.
- Graph is too dense: create smaller subgraphs instead of shrinking labels.
- Faction is unclear: encode faction in node color, not in extra rings or tiny glyphs.
- Lines look like electric wires: reduce saturation, use thin tubes, use subtle additive glow only on focus.
- Node images look distorted: crop to square from top center, never stretch.
- Cache appears stale: update all query-string versions and `BUILD_ID`.
