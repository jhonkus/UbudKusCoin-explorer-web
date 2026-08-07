import '@testing-library/jest-dom';

// Mock Next Router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: {},
      asPath: '',
      push: jest.fn(),
    };
  },
}));

// Polyfill setImmediate for gRPC in jsdom environment
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

// Stub global fetch if not present
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Suppress console logs during test runs
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
