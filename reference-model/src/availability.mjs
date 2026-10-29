export function earliestAvailableSlot(slots, now = new Date(0).toISOString()) {
  const threshold = new Date(now).getTime();
  const candidates = slots
    .filter((slot) => slot.available)
    .filter((slot) => new Date(slot.startsAt).getTime() >= threshold)
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());

  return candidates[0] ?? null;
}
