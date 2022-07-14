import { Service } from "@kronos-integration/service";
import { MockInterceptor } from "./mock-interceptor.mjs";

/**
 * @property {string} type
 * @property {string} state
 */
export class MockService extends Service {
  async configure(config) {
    super.configure(config);
    this.config = config;
  }

  get state() {
    return this.config ? this.config.state : super.state;
  }

  get type() {
    return this.config ? this.config.type : super.type;
  }

  instantiateInterceptor(def) {
    return new MockInterceptor(def);
  }

  log(level, arg) {
    // ignore
  }
}
