export function clampPercent(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function calculatePercent(position, total) {
  if (!Number.isFinite(total) || total <= 0) return 0;
  return clampPercent((position / total) * 100);
}

/**
 * Illustrative display rule only; not a claim about the production product.
 */
export function displayCompletion({ reading = 0, listening = 0 }) {
  return Math.max(clampPercent(reading), clampPercent(listening));
}
