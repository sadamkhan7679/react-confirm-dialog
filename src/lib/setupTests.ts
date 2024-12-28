import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});