export function createMoodSession(flow, startStepId) {
  if (!flow.steps[startStepId]) throw new Error(`Unknown step: ${startStepId}`);
  return { currentStepId: startStepId, answers: {}, complete: false };
}

export function answerMoodStep(flow, session, answerValue) {
  const step = flow.steps[session.currentStepId];
  if (!step) throw new Error(`Unknown current step: ${session.currentStepId}`);

  const option = step.answers.find((item) => item.value === answerValue);
  if (!option) throw new Error(`Invalid answer: ${answerValue}`);

  const answers = { ...session.answers, [step.id]: answerValue };
  if (option.next == null) {
    return { currentStepId: null, answers, complete: true };
  }
  if (!flow.steps[option.next]) throw new Error(`Unknown next step: ${option.next}`);
  return { currentStepId: option.next, answers, complete: false };
}
