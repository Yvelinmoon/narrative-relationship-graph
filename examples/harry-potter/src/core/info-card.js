const TYPE_LABELS = {
  character: "角色",
  faction: "阵营/组织",
  place: "地点",
  object: "物件",
  event: "事件",
};

const LEVEL_LABELS = {
  root: "中心原点",
  "character-core": "核心角色层",
  "character-outer": "扩展角色层",
  event: "事件层",
  world: "世界层",
};

const ZONE_LABELS = {
  character: "人物关系",
  event: "叙事事件",
  world: "世界设定",
};

const RELATION_LABELS = {
  "character-character": "角色关系",
  "character-event": "角色-事件",
  "event-event": "事件链路",
  "character-world": "角色-世界",
  "event-world": "事件-世界",
  "world-world": "世界结构",
};

function buildEdgeIndex(edges) {
  const edgeIndex = new Map();

  edges.forEach((edge) => {
    if (!edgeIndex.has(edge.source)) {
      edgeIndex.set(edge.source, []);
    }
    if (!edgeIndex.has(edge.target)) {
      edgeIndex.set(edge.target, []);
    }
    edgeIndex.get(edge.source).push(edge);
    edgeIndex.get(edge.target).push(edge);
  });

  return edgeIndex;
}

function createChip(text) {
  const chip = document.createElement("span");
  chip.className = "info-chip";
  chip.textContent = text;
  return chip;
}

function createRelationItem(content, muted = false) {
  const item = document.createElement("li");
  item.className = "info-list-item";
  if (muted) {
    item.classList.add("muted");
  }

  if (typeof content === "string") {
    item.textContent = content;
    return item;
  }

  const title = document.createElement("div");
  title.className = "info-relation-title";
  title.textContent = content.title;
  item.appendChild(title);

  const meta = document.createElement("div");
  meta.className = "info-relation-meta";
  meta.textContent = content.meta;
  item.appendChild(meta);

  if (content.perspectives?.length) {
    const perspectives = document.createElement("div");
    perspectives.className = "info-perspectives";
    content.perspectives.forEach((perspective) => {
      const line = document.createElement("div");
      line.className = "info-perspective";

      const from = document.createElement("span");
      from.className = "info-perspective-from";
      from.textContent = `${perspective.fromLabel} -> ${perspective.toLabel}`;

      const label = document.createElement("span");
      label.textContent = perspective.label;
      line.append(from, label);
      perspectives.appendChild(line);
    });
    item.appendChild(perspectives);
  }

  return item;
}

function uniqueOrdered(values) {
  return [...new Set(values.filter(Boolean))];
}

function createNodeDescriptor(graphState, edgeIndex, nodeId) {
  const node = graphState.getNode(nodeId);
  if (!node) {
    return null;
  }

  const edges = edgeIndex.get(nodeId) ?? [];
  const relations = edges.map((edge) => {
    const relatedId = edge.source === nodeId ? edge.target : edge.source;
    const relatedNode = graphState.getNode(relatedId);
    const relationType = RELATION_LABELS[edge.relation] ?? edge.relation;
    return {
      edge,
      relatedId,
      relatedNode,
      relationText: `${edge.label} · ${relatedNode?.label ?? relatedId}`,
      relationDetail: {
        title: `${edge.label} · ${relatedNode?.label ?? relatedId}`,
        meta: `${relationType} / ${TYPE_LABELS[relatedNode?.type] ?? relatedNode?.type ?? "未知节点"}`,
        perspectives: (edge.perspectives ?? []).map((perspective) => ({
          fromLabel: graphState.getNode(perspective.from)?.label ?? perspective.from,
          toLabel: graphState.getNode(perspective.to)?.label ?? perspective.to,
          label: perspective.label,
        })),
      },
    };
  });

  const byZone = {
    character: relations.filter((item) => item.relatedNode?.zone === "character"),
    event: relations.filter((item) => item.relatedNode?.zone === "event"),
    world: relations.filter((item) => item.relatedNode?.zone === "world"),
  };

  const chips = uniqueOrdered([
    ...byZone.world.slice(0, 2).map((item) => item.relatedNode?.label),
    ...byZone.event.slice(0, 2).map((item) => item.relatedNode?.label),
    ...byZone.character.slice(0, 2).map((item) => item.relatedNode?.label),
  ]).slice(0, 6);

  return {
    title: node.label,
    imageUrl: node.image ?? null,
    description: node.description ?? "",
    typeLabel: TYPE_LABELS[node.type] ?? node.type,
    levelLabel: LEVEL_LABELS[graphState.getNodeLevel(nodeId)] ?? "未分层",
    zoneLabel: ZONE_LABELS[graphState.getNodeZone(nodeId)] ?? "未知区",
    relationCount: relations.length,
    counts: {
      character: byZone.character.length,
      event: byZone.event.length,
      world: byZone.world.length,
    },
    chips,
    relationItems: relations
      .sort((left, right) => (right.relatedNode?.zone ?? "").localeCompare(left.relatedNode?.zone ?? ""))
      .slice(0, 12)
      .map((item) => item.relationDetail),
  };
}

export function createInfoCardController({ root, graphState }) {
  const edgeIndex = buildEdgeIndex(graphState.getAllEdges?.() ?? graphState.getEdges());
  const panel = document.createElement("aside");
  panel.className = "info-card hidden";
  root.appendChild(panel);

  let lastNodeId = "__none__";

  function render(nodeId) {
    if (!nodeId) {
      panel.classList.add("hidden");
      panel.innerHTML = "";
      lastNodeId = "__none__";
      return;
    }

    if (lastNodeId === nodeId) {
      return;
    }

    const descriptor = createNodeDescriptor(graphState, edgeIndex, nodeId);
    if (!descriptor) {
      panel.classList.add("hidden");
      panel.innerHTML = "";
      lastNodeId = "__none__";
      return;
    }

    panel.innerHTML = "";

    const header = document.createElement("div");
    header.className = "info-card-header";

    const titleBlock = document.createElement("div");
    titleBlock.className = "info-card-title-block";

    if (descriptor.imageUrl) {
      const media = document.createElement("div");
      media.className = "info-card-media";
      const image = document.createElement("img");
      image.className = "info-card-image";
      image.src = descriptor.imageUrl;
      image.alt = `${descriptor.title} image`;
      image.loading = "lazy";
      media.appendChild(image);
      header.appendChild(media);
    }

    const title = document.createElement("h2");
    title.className = "info-card-title";
    title.textContent = descriptor.title;

    const subtitle = document.createElement("div");
    subtitle.className = "info-card-subtitle";
    subtitle.append(
      createChip(descriptor.typeLabel),
      createChip(descriptor.levelLabel),
      createChip(descriptor.zoneLabel),
    );

    titleBlock.append(title, subtitle);
    header.appendChild(titleBlock);

    const description = document.createElement("p");
    description.className = "info-description";
    description.textContent = descriptor.description || "这个节点还没有补充简介。";

    const stats = document.createElement("div");
    stats.className = "info-stats";
    [
      ["直接关系", String(descriptor.relationCount)],
      ["角色", String(descriptor.counts.character)],
      ["事件", String(descriptor.counts.event)],
      ["世界", String(descriptor.counts.world)],
    ].forEach(([label, value]) => {
      const stat = document.createElement("div");
      stat.className = "info-stat";
      const valueNode = document.createElement("strong");
      valueNode.textContent = value;
      const labelNode = document.createElement("span");
      labelNode.textContent = label;
      stat.append(valueNode, labelNode);
      stats.appendChild(stat);
    });

    const chipSection = document.createElement("div");
    chipSection.className = "info-section";
    const chipTitle = document.createElement("div");
    chipTitle.className = "info-section-title";
    chipTitle.textContent = "关键关联";
    const chipList = document.createElement("div");
    chipList.className = "info-chip-list";
    descriptor.chips.forEach((chip) => chipList.appendChild(createChip(chip)));
    if (!descriptor.chips.length) {
      chipList.appendChild(createChip("暂无补充关联"));
    }
    chipSection.append(chipTitle, chipList);

    const relationSection = document.createElement("div");
    relationSection.className = "info-section";
    const relationTitle = document.createElement("div");
    relationTitle.className = "info-section-title";
    relationTitle.textContent = "关系解读";
    const relationList = document.createElement("ul");
    relationList.className = "info-list";
    descriptor.relationItems.forEach((item) => relationList.appendChild(createRelationItem(item)));
    if (!descriptor.relationItems.length) {
      relationList.appendChild(createRelationItem("当前节点暂无可展示的直接关系", true));
    }
    relationSection.append(relationTitle, relationList);

    panel.append(header, description, stats, chipSection, relationSection);
    panel.classList.remove("hidden");
    lastNodeId = nodeId;
  }

  return {
    render,
  };
}
