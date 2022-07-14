import { ServiceLogger } from "@kronos-integration/service";

export class MockLogger extends ServiceLogger {
  #state;

  async logEntry(entry) {}

  async configure(config) {
    super.configure(config);
    this.#state = config.state;
  }

  get state() {
    return this.#state || super.state;
  }
}
