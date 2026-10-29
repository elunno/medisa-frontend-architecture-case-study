export function evaluateAssessment(definition, answers) {
  const questions = definition.questions ?? [];
  let score = 0;

  for (const question of questions) {
    const selected = answers[question.id];
    if (question.required && selected == null) {
      throw new Error(`Missing required answer: ${question.id}`);
    }
    if (selected == null) continue;

    const option = question.options.find((candidate) => candidate.value === selected);
    if (!option) throw new Error(`Invalid answer for ${question.id}: ${selected}`);
    score += option.points;
  }

  const band = definition.bands.find((candidate) => score >= candidate.min && score <= candidate.max);
  if (!band) throw new Error(`No result band for score: ${score}`);

  return { score, band: band.id, label: band.label };
}
