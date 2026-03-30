const majorPalette = [
  { dot: "#60a5fa", background: "#1d4ed8", text: "#eff6ff" },
  { dot: "#a78bfa", background: "#6d28d9", text: "#f5f3ff" },
  { dot: "#f472b6", background: "#be185d", text: "#fdf2f8" },
  { dot: "#fb7185", background: "#e11d48", text: "#fff1f2" },
  { dot: "#fb923c", background: "#c2410c", text: "#fff7ed" },
  { dot: "#facc15", background: "#ca8a04", text: "#422006" },
  { dot: "#4ade80", background: "#15803d", text: "#f0fdf4" },
  { dot: "#2dd4bf", background: "#0f766e", text: "#f0fdfa" },
  { dot: "#38bdf8", background: "#0369a1", text: "#f0f9ff" },
  { dot: "#c084fc", background: "#7e22ce", text: "#faf5ff" },
];

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getMajorColor(label: string) {
  const normalized = label.trim().toLowerCase();
  if (!normalized) {
    return { dot: "#94a3b8", background: "#475569", text: "#f8fafc" };
  }

  return majorPalette[hashString(normalized) % majorPalette.length];
}

export function getMajorChipStyle(label: string) {
  const color = getMajorColor(label);
  return {
    backgroundColor: color.background,
    color: color.text,
  };
}
