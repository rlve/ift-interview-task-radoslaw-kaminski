export class WakuClient {
  constructor(private baseUrl: string) {}

  public async getDebugInfo() {
    const response = await fetch(`${this.baseUrl}/debug/v1/info`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  }

  public async subscribeTopics(topics: string[]) {
    const response = await fetch(`${this.baseUrl}/relay/v1/auto/subscriptions`, {
      method: 'post',
      headers: { accept: 'text/plain', 'content-type': 'application/json' },
      body: JSON.stringify(topics),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.status;
  }

  public async publishMessage(payload: string, topic: string) {
    const response = await fetch(`${this.baseUrl}/relay/v1/auto/messages`, {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        payload,
        contentTopic: topic,
        timestamp: 0,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.status;
  }

  public async getMessages(topic: string) {
    const response = await fetch(`${this.baseUrl}/relay/v1/auto/messages/${encodeURIComponent(topic)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  }

  public async getPeers() {
    const response = await fetch(`${this.baseUrl}/admin/v1/peers`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    return json;
  }
}
