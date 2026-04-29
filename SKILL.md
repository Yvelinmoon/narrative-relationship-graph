---
name: narrative-relationship-graph
description: Use when the user wants to create, update, personalize, or rebuild an interactive narrative relationship graph / 3D character-event-world network, including preparing node data, writing relationships, splitting overview/subgraph views, encoding factions, searching Wikimedia node images, generating Neta theme backgrounds/assets, adapting the bundled template.html, and creating a themed Three.js graph for stories such as 红楼梦, 进击的巨人, Harry Potter, historical narratives, games, novels, or fictional universes.
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

The `template.html` file is intentionally a minimal HTML shell, not a full page implementation. It defines only the stable entry contract:

- `#graph-root` as the mount point
- `styles.css` as the stylesheet entry
- `app.js` as the module entry
- cache-busting query strings
- title and accessibility label placeholders

This is enough because the actual reusable implementation lives in `examples/reference/`: modular Three.js scene/controller/state/data files, subgraph navigation, clicked-node cards, Wikimedia-style node images, generated/local background assets, and robust `scene.background` texture handling. Strictly follow the template contract for every new graph, then copy/adapt the reference implementation behind that shell.

Do not inline a whole application into `template.html`, and do not replace the template shell with a custom one-off HTML structure unless the user explicitly asks for a different runtime. When creating a graph, start from this shell and connect it to `app.js`, `styles.css`, and `src/` modules.

The `examples/reference/` folder is a runnable example snapshot showing current implementation patterns. Use it as implementation reference when needed, but do not copy its Harry Potter theme, data, colors, or labels into unrelated worlds.

The reusable implementation pattern is a static Three.js relationship graph with modular JS, CSS, vendored Three.js, node cards, subgraph navigation, themed nodes, faction-colored nodes, curved relation lines, hover/focus behavior, and a cache-busted entry flow.

For a new world, create or adapt a project using this structure, then replace the data, title, copy, colors, decorative elements, node imagery, and typography so the result is specific to the user's story.

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

## Non-Negotiable Gates

Do not treat image search or generated theme assets as optional polish. Before final delivery, explicitly pass these gates or state the blocker.

1. Data gate: every node has a stable ID, type, zone, 50-100 Chinese character `description`, and meaningful relation labels.
2. Wikimedia image gate: run a Wikimedia API image pass for core characters, factions, places, and iconic objects. Add `image`, `imageSource`, and `imageCredit` when a reliable image exists. If no image is used for an important node, record or mention why, such as no clear result, rights risk, or misleading image.
3. Neta theme asset gate: for a themed graph, generate or select a 16:9 theme background with Neta unless the user explicitly opts out or authentication/quota blocks it. Download the result into local `assets/` and wire it into the project.
4. Theme reset gate: remove prior-world text, colors, decorative motifs, and hardcoded IDs from the visible app unless continuing that exact world.
5. Verification gate: check local serving, syntax, cache-busting versions, and at least one visible route where node images/background assets load.

Final updates should mention the Wikimedia pass and Neta asset pass. If either was skipped, say why in one sentence.

## Default Execution Order

Use this order for new themed graph builds unless the user explicitly narrows the task:

1. Create or copy the project shell from `template.html` and the modular Three.js architecture.
2. Build the node/edge/view data with descriptions and directional perspectives where needed.
3. Run the Wikimedia API image pass for important nodes and store provenance.
4. Run Neta generation for the primary 16:9 background or document the skip reason.
5. Reset the visual theme, including palette, node materials, cards, background, and decorative motifs.
6. Wire generated/downloaded assets locally under `assets/` and update cache versions.
7. Verify syntax, local serving, asset URLs, subgraphs, and visible background/node image behavior.

## Product Principle

The graph should help users understand narrative structure, not just look dense.

Prioritize:

- Semantic clarity over visual decoration
- Faction/force relationships that are directly visible
- A default overview plus smaller independent subgraphs
- Hover/focus states that isolate relevant relationships
- Compact clicked-node cards that summarize rather than dump every relation
- Sparse enough layouts that the graph can be manually indexed
- Minimal UI outside the graph; navigation is allowed only when it improves graph browsing

Avoid:

- Dumping every node into one unreadable graph
- Encoding too many meanings at once on the same visual channel
- Adding decorative UI that competes with the graph
- Showing all edge labels by default
- Letting info cards exceed the viewport without scroll protection
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

## Relationship Direction And Data Validation

Relation classes must match the actual node endpoint order, not just the semantic wording in your head. If an edge is stored as `{ source: "event", target: "character" }`, its relation must be `event-character`, not `character-event`. If the rendering layer only has a style for `character-event`, normalize the style in code, but keep the data truthful.

Before delivery, run an import-level data validation pass, not only `node --check`. `node --check` catches syntax but will not catch missing nodes, empty views, wrong endpoint order, or positions that resolve to `undefined` at runtime.

Recommended validator:

```bash
node --input-type=module <<'JS'
import { DATASET, GRAPH_VIEWS, TYPE_META } from './src/data/<story>.js';
import { createGraphState } from './src/core/state.js';

const ids = new Set(DATASET.nodes.map((node) => node.id));
const badEdges = DATASET.edges.filter((edge) => !ids.has(edge.source) || !ids.has(edge.target));
const emptyDescriptions = DATASET.nodes.filter((node) => !node.description);

if (badEdges.length) throw new Error(`Bad edge endpoints: ${JSON.stringify(badEdges.slice(0, 5))}`);
if (emptyDescriptions.length) throw new Error(`Missing descriptions: ${emptyDescriptions.map((n) => n.id).join(', ')}`);

const state = createGraphState({ ...DATASET, views: GRAPH_VIEWS }, TYPE_META);
for (const section of GRAPH_VIEWS) {
  for (const view of section.children ?? []) {
    state.setActiveView(view.id);
    const nodes = state.getNodes();
    const missingPositions = nodes.filter((node) => !state.getNodePosition(node.id));
    if (!nodes.length) throw new Error(`Empty view: ${view.id}`);
    if (missingPositions.length) throw new Error(`${view.id} missing positions: ${missingPositions.map((n) => n.id).join(', ')}`);
  }
}
console.log('VALIDATED', DATASET.nodes.length, DATASET.edges.length);
JS
```

If the graph uses custom relation classes such as `event-character`, add matching entries to relation labels and style normalization so info cards and edge drawing do not silently fall back to misleading defaults.

## Info Card Rules

The clicked-node card should provide useful detail without becoming a second page. Keep it compact and scannable.

Recommended card contents:

- Title, image if available, node type/layer/zone chips
- One 50-100 Chinese character description
- One compact relation summary chip, such as direct relation count by zone
- Up to 5-8 representative relationship details
- Directional `perspectives` only for the representative edges that need them

Avoid:

- Separate large statistic blocks unless the user asks for analytics
- Repeating all direct relations for high-degree nodes
- Showing both “key associations” chips and long relation lists at the same time
- Cards that exceed the viewport with no scroll handling

Implementation rules:

- Add `max-height: calc(100vh - <margin>)` and `overflow-y: auto` to the card.
- Prefer relation sorting and slicing, for example `.slice(0, 6)`, over dumping everything.
- Put full relationship exploration into subgraphs, not into one oversized card.

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

Do not hardcode layout around a specific story's node IDs unless the user explicitly wants a hand-curated poster-like layout. A reusable skill should prefer data-driven layout with optional theme-specific overrides.

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

6. Search and attach node images. This step is mandatory for important nodes.

For character, faction, place, and iconic object nodes, use the Wikimedia APIs first. Add images where a clear representative image exists, and leave the node image-free when the result is uncertain or visually misleading. Do not delay the graph for perfect image coverage; prioritize core characters and visually important world nodes. Do not skip this because the graph already works without images.

Primary API flow:

1. Search Wikimedia Commons files with the MediaWiki Action API.
2. Fetch the selected file's direct thumbnail URL and metadata with `prop=imageinfo`.
3. If Commons search is poor but the node has a strong Wikipedia page, use Wikipedia `prop=pageimages` as a fallback.
4. Store the final renderable image URL plus provenance fields on the node.

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

Do this as a required step, not a final polish pass. Change colors, background, typography, camera, node materials, card tone, decorative elements, title, and accessibility labels to match the world. Preserve interaction and graph-reading clarity. Never ship a new world while it still looks like a previous franchise theme.

9. Generate custom theme assets with Neta unless explicitly skipped.

Use Neta image generation to create at least the primary 16:9 page background for themed graph projects, unless the user opts out or Neta authentication/quota/network blocks it. Also use Neta when Wikimedia images are missing, inconsistent, too literal, or the page needs a coherent non-photographic visual system. Keep generated assets secondary to graph readability: backgrounds need a dark overlay, avatars need clean crops, and decorative images must not compete with nodes/edges.

## Implementation Checklist

When editing the base project, usually touch these files:

- `src/data/<story>.js`: preferred for a new world; use existing story files only when continuing that same graph
- `src/core/state.js`: subgraph filtering and layout behavior if needed
- `src/core/graph.js`: node materials, faction color priority, edge style, reveal/highlight behavior
- `src/core/scene.js`: camera, lighting, controls, generated background texture via `scene.background`
- `src/main.js`: story data import, decorative DOM, view index, build stamp, initialization
- `styles.css`: theme tokens, UI, labels, cards, decorative atmosphere, dark overlay for generated backgrounds
- `assets/`: local Wikimedia downloads or Neta-generated backgrounds/icons/avatars
- `index.html` and `app.js`: title, accessibility labels, data-entry import, and cache-busting

Keep the current project architecture unless there is a strong reason to refactor.

## Image Rules

If the graph uses real character images, avatars, faction marks, place photos, or object covers, verify sources before adding URLs. Wikimedia-style URLs can work well, but may fail CORS or disappear. Implement graceful fallback.

Use Wikimedia APIs instead of manual search whenever possible.

Official references:

- MediaWiki `list=search`: https://www.mediawiki.org/wiki/API:Search
- MediaWiki `prop=imageinfo`: https://www.mediawiki.org/wiki/API:Imageinfo
- PageImages `prop=pageimages`: https://www.mediawiki.org/wiki/Extension:PageImages#API

Primary endpoint:

```text
https://commons.wikimedia.org/w/api.php
```

Search files on Wikimedia Commons:

```text
https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&list=search&srnamespace=6&srlimit=8&srsearch=<query>
```

Use namespace `6` because Commons files live in the `File:` namespace. Pick the best `title` from the search results, for example `File:Example.jpg`.

Fetch the direct image URL, thumbnail URL, dimensions, MIME type, and source metadata:

```text
https://commons.wikimedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&titles=<File:Example.jpg>&iiprop=url|mime|size|extmetadata&iiurlwidth=512
```

Map the response into node fields:

```js
{
  image: imageinfo.thumburl ?? imageinfo.url,
  imageSource: imageinfo.descriptionurl,
  imageCredit: imageinfo.extmetadata?.ObjectName?.value ?? fileTitle
}
```

Fallback endpoint for a Wikipedia page image:

```text
https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages&piprop=thumbnail|original&pithumbsize=512&titles=<Article title>
```

For non-English works, use the relevant Wikipedia host when needed, such as `zh.wikipedia.org` or `ja.wikipedia.org`, but prefer Commons for reusable media.

Recommended search order:

1. Wikimedia Commons Action API file search.
2. Wikimedia Commons `prop=imageinfo` for selected file URLs and metadata.
3. Wikipedia `prop=pageimages` for an article infobox image when Commons search is not obvious.
4. Official/public-domain source where appropriate for historical or real-world topics.
5. No image if the result is uncertain, low quality, or likely rights-sensitive.

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

## Image Reliability And Local Caching

Wikimedia thumbnail URLs are not safe to hand-edit. Do not change `960px-...` to `512px-...` by string replacement; Wikimedia only supports specific thumbnail steps for some files and will return HTTP 400 (`Use thumbnail steps listed...`) for invalid sizes. Prefer URLs returned directly by `prop=imageinfo&iiurlwidth=<size>` or Wikipedia `pageimages`.

Remote Wikimedia image URLs can also hit 429 robot-policy/rate-limit errors when a page loads many images or when the agent verifies many URLs in a short window. For important node portraits, download reliable image responses into local `assets/portraits/` and point `node.image` at the local file. Keep `imageSource` and `imageCredit` pointing to the Wikimedia/Wikipedia source page for provenance.

Recommended caching flow:

1. Use the API-returned `thumburl` exactly as returned.
2. Verify with `curl -I` or a small scripted request.
3. If the remote URL returns 400 or 429, try the API again later or download the original/file URL once and cache locally.
4. Store local portraits as `assets/portraits/<node-id>.<ext>` and use `image: "./assets/portraits/<node-id>.<ext>"`.
5. Never leave broken remote URLs in final data. If no reliable image exists, omit `image` or use a clearly marked generated/generic fallback.
6. For generated or generic avatars, make `imageCredit` explicit, for example: `Neta generated generic official avatar; not a real-person likeness`.

For browser rendering, prefer local assets for any image that appears in many nodes or is critical to the experience. Local 200 responses are more important than perfect remote thumbnail size.

## Background Asset Readability

Generated backgrounds should be background plates, not posters. For relationship graphs, prefer spacious, low-contrast, dark 16:9 compositions with a clean center and subtle world-specific silhouettes near the edges or horizon. Avoid large radial color blobs, bright central objects, readable text, logos, faces, flags dominating the frame, or high-detail illustrations that compete with nodes.

Prompt pattern:

```text
A spacious dark cinematic background plate for an interactive <world> relationship graph, wide empty center for network nodes, subtle <representative architecture/symbol> as faint outlines near the lower horizon, deep <palette> atmosphere, understated linework, tiny accent colors, no people, no readable text, no logos, minimal, high readability, background plate not poster
```

After generation, inspect the result before wiring it in. If the user says the background shows “large blocks”, “two big color patches”, or “too busy”, regenerate with: wide empty center, no large radial glow, no poster composition, and darker/low-contrast constraints. If needed, darken locally with an overlay or image processing, but do not let the background hide nodes.

## Neta Generated Assets

Use Neta generation when the user wants a custom theme background, when real-source images are unavailable, or when the graph needs a coherent non-photographic visual system.

Common uses:

- 16:9 page background for the whole graph
- Square or 3:4 node avatar images
- Faction emblems or symbolic object images
- Reference images for later video or visual extensions

Generate image command:

```bash
env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY NETA_API_BASE_URL=https://api.talesofai.com \
  npx -y @talesofai/neta-skills@latest make_image \
  --prompt "<theme-safe visual prompt, no text, no logo, no UI>" \
  --aspect "16:9"
```

Use `--aspect "16:9"` for page backgrounds, `--aspect "1:1"` for icons or node portraits, and `--aspect "3:4"` for character-card portraits.

Before generation, check AP if needed:

```bash
env -u HTTP_PROXY -u HTTPS_PROXY -u ALL_PROXY NETA_API_BASE_URL=https://api.talesofai.com \
  npx -y @talesofai/neta-skills@latest get_ap_info
```

If Neta reports login or network errors:

- Prefer global host: `NETA_API_BASE_URL=https://api.talesofai.com`.
- If local proxy breaks CLI fetch, unset `HTTP_PROXY`, `HTTPS_PROXY`, and `ALL_PROXY` for the command.
- If login is required, use `login --action request-code`, open the returned verification URL, then run `login --action verify-code`.
- If the region says device login is unsupported, authenticate with `NETA_TOKEN` instead.

After generation:

1. Download the returned artifact URL into the project, usually `assets/<story>-background.webp` or `assets/<node-id>.webp`.
2. Use local assets in the page rather than depending on remote generated URLs.
3. For full-page Three.js graph backgrounds, prefer loading the image as a Three.js scene background texture. This avoids CSS backgrounds being hidden by the WebGL canvas clear pass.
4. Use CSS overlays only for darkening/vignette effects above the canvas, not as the only place where the background image exists.
5. Update cache-busting versions after adding or replacing generated assets.

Stable Three.js background pattern:

```js
const backgroundTexture = new THREE.TextureLoader().load("./assets/<story>-background.webp");
if (THREE.SRGBColorSpace) {
  backgroundTexture.colorSpace = THREE.SRGBColorSpace;
}
scene.background = backgroundTexture;
```

Keep the renderer setup explicit:

```js
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.domElement.style.background = "transparent";
```

CSS overlay pattern for generated backgrounds:

```css
.graph-bg-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 38%, rgba(10, 7, 9, 0.08), rgba(5, 4, 6, 0.22) 66%, rgba(3, 3, 4, 0.48) 100%),
    linear-gradient(90deg, rgba(4, 3, 5, 0.38), rgba(8, 6, 8, 0.12) 45%, rgba(4, 3, 5, 0.42));
}
```

If you intentionally use a CSS image behind the canvas instead of `scene.background`, verify all of these are true:

- The WebGL renderer uses `{ alpha: true }`.
- `renderer.setClearColor(0x000000, 0)` is set.
- `scene.background = null`.
- The canvas CSS background is `transparent`.
- The CSS background layer is not behind a negative `z-index` stacking context.

In practice, if the user says the background looks exactly unchanged after refresh, switch to `scene.background` texture first before further tuning brightness.

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

Asset verification checklist:

- Wikimedia pass completed for core nodes, with `imageSource`/`imageCredit` where images are used.
- Do not rely only on syntax checks; run the import-level data validator above to catch missing endpoints, empty descriptions, empty views, and missing node positions.
- Neta 16:9 background generated or a skip reason is documented.
- Generated/downloaded assets live under local `assets/`, not only remote URLs.
- Important portraits that failed remote verification are cached under local `assets/portraits/` or intentionally omitted.
- Background asset is wired through Three.js `scene.background` for graph pages using WebGL.
- `curl -I` returns 200 for the page, background asset, and representative local portrait assets.
- Cache-busting versions changed in `index.html`, `app.js`, `src/main.js`, and `BUILD_ID`.

## Common Failure Modes

- Graph appears styled but no nodes are visible: check canvas/label stacking. The WebGL canvas must sit above background/decor layers, for example `#graph-root canvas { position: absolute; inset: 0; z-index: 6; }` and `.label-layer { z-index: 7; pointer-events: none; }`. A decorative overlay with a higher z-index can hide the whole graph.
- Old CSS2D labels remain after view switch: recursively remove CSS2D DOM when clearing old graph objects.
- User sees two graphs at once: old node or label groups were not fully cleared.
- Graph is too dense: create smaller subgraphs instead of shrinking labels.
- Faction is unclear: encode faction in node color, not in extra rings or tiny glyphs.
- Lines look like electric wires: reduce saturation, use thin tubes, use subtle additive glow only on focus.
- Node images look distorted: crop to square from top center, never stretch.
- Node images fail even though a Wikimedia image exists: do not manually edit Wikimedia thumbnail dimensions. Use API-returned `thumburl`, cache the image locally, or omit the image. Invalid thumbnail steps return 400; repeated remote loads can return 429.
- Remote images load during development but fail in the shared page: cache important portraits and backgrounds locally under `assets/` and verify 200 responses from the shared static path.
- Background looks like two giant color blocks or a poster: regenerate as a sparse background plate with an empty center, or darken/reduce contrast. The graph should dominate the composition.
- Cache appears stale: update all query-string versions and `BUILD_ID`.
- Generated background not visible: first check the asset URL returns 200, then ensure the page imports the updated cache version. If the CSS layer exists but the user still cannot see it, WebGL is probably covering it; load the image with `scene.background = new THREE.TextureLoader().load(...)` instead of relying on CSS behind the canvas.
- Background appears unchanged after changing the image: compare the actual loaded URL/version, check that the local asset file changed, and remember that very dark generated images plus a heavy overlay can look identical. Temporarily reduce overlay opacity or sample a screenshot before assuming the file failed to load.
