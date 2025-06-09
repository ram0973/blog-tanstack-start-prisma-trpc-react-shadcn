import wretch from 'wretch';

// Instantiate and configure wretch
export const api = wretch(`http://localhost/api`)
  .errorType('json')
  .resolve((r) => r.json());
