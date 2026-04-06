import { CareerMatcher } from '../utils/careerMatcher';

self.onmessage = (event: MessageEvent) => {
  const { answers, questions } = event.data;

  try {
    const matcher = new CareerMatcher();

    self.postMessage({ type: 'progress', progress: 15 });

    matcher.analyzeResponses(answers, questions);
    self.postMessage({ type: 'progress', progress: 35 });

    self.postMessage({ type: 'progress', progress: 55 });

    const matches = matcher.matchCareers(12);
    self.postMessage({ type: 'progress', progress: 85 });

    self.postMessage({ type: 'progress', progress: 98 });

    setTimeout(() => {
      self.postMessage({ type: 'complete', matches });
    }, 100);
  } catch (error) {
    console.error('Worker error:', error);
    self.postMessage({ type: 'error', error: String(error) });
  }
};
