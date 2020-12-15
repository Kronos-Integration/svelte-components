import { ServiceLogger } from "@kronos-integration/service";

export class MockLogger extends ServiceLogger {
  async logEntry(entry) {}

  async configure(config) {
    super.configure(config);
    this._state = config.state;
  }

  get state() {
    return this._state || super.state;
  }
}
