import { Service } from "@kronos-integration/service";

import { MockInterceptor } from "./mock-interceptor.mjs";

/**
 * @property {string} type
 * @property {string} state
 */
export class MockService extends Service {
  constructor(config, ic) {
    super(config, ic);
    this.config = config;
  }

  get type() {
    return this.config.type;
  }

  get state() {
    return this.config.state;
  }

  instantiateInterceptor(def) {
    return new MockInterceptor(def);
  }
}
