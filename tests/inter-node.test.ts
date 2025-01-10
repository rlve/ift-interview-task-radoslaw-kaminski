import { WakuClient } from '../lib/waku-client';
import { beforeAll, describe, expect, test } from 'bun:test';
import { retry } from 'ts-retry-promise';

describe('Inter-Node Communication', () => {
  const wakuClient1 = new WakuClient('http://nwaku1:21161');
  const wakuClient2 = new WakuClient('http://nwaku2:21161');
  const topic = '/my-app/2/chatroom-2/proto';
  const payload = 'UmVsYXkgd29ya3MhIQ==';

  const wakuNode1IP = '172.18.111.226';
  const wakuNode2IP = '172.18.111.227';

  beforeAll(async () => {
    console.log('Waiting for Autoconnection');

    await retry(
      async () => {
        console.log('Verifying Node 1 peers...');
        const node1Peers = await wakuClient1.getPeers();

        expect(node1Peers).toBeArrayOfSize(1);
        expect(node1Peers[0].multiaddr).toContain(wakuNode2IP);

        console.log(`Connected: ${node1Peers[0].multiaddr}`);

        console.log('Verifying Node 2 peers...');
        const node2Peers = await wakuClient2.getPeers();

        expect(node2Peers).toBeArrayOfSize(1);
        expect(node2Peers[0].multiaddr).toContain(wakuNode1IP);

        console.log(`Connected: ${node2Peers[0].multiaddr}`);
      },
      { retries: 20, delay: 3000 }
    );
  });

  test('Message Transmission', async () => {
    const subscriptionStatus1 = await wakuClient1.subscribeTopics([topic]);
    const subscriptionStatus2 = await wakuClient2.subscribeTopics([topic]);

    expect(subscriptionStatus1).toBe(200);
    expect(subscriptionStatus2).toBe(200);

    const publishStatus = await wakuClient1.publishMessage(payload, topic);

    expect(publishStatus).toBe(200);

    const response = await wakuClient2.getMessages(topic);
    const [message] = response;

    expect(response).toBeArrayOfSize(1);
    expect(message).toMatchObject({ contentTopic: topic, payload });
  });
});
