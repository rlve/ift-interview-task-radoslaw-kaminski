import { describe, expect, test } from 'bun:test';
import { WakuClient } from '../lib/waku-client';

describe('Basic Node Operation', () => {
  const wakuClient = new WakuClient('http://nwaku1:21161');
  const topic = '/my-app/2/chatroom-1/proto';
  const payload = 'UmVsYXkgd29ya3MhIQ==';

  test('1. Verify Node Information', async () => {
    const response = await wakuClient.getDebugInfo();
    const { enrUri } = response;

    expect(enrUri).toStartWith('enr:');
  });

  test('2. Subscribe to a Topic', async () => {
    const status = await wakuClient.subscribeTopics([topic]);

    expect(status).toBe(200);
  });

  test('3. Publish a Message', async () => {
    const status = await wakuClient.publishMessage(payload, topic);

    expect(status).toBe(200);
  });

  test('4. Confirm Message Publication', async () => {
    const response = await wakuClient.getMessages(topic);
    const [message] = response;

    expect(response).toBeArrayOfSize(1);
    expect(message).toMatchObject({ contentTopic: topic, payload });
  });
});
