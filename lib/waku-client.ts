export class WakuClient {
  constructor(private baseUrl: string) {}

  public async getDebugInfo() {
    const response = await fetch(`${this.baseUrl}/debug/v1/info`);
    const json = await response.json();

    return json;
  }
}
