import { describe, expect, test } from 'bun:test';
import { WakuClient } from '../lib/waku-client';

describe('Basic Node Operation', () => {
  const wakuClient = new WakuClient('http://0.0.0.0:21161');

  test('1. Verify Node Information', async () => {
    const response = await wakuClient.getDebugInfo();
    const { enrUri } = response;

    expect(enrUri).toStartWith('enr:');
  });
});
