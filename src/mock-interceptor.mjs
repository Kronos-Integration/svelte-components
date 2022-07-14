import { Interceptor } from "@kronos-integration/interceptor";

export class MockInterceptor extends Interceptor {

  #type;
  #config;

  constructor(config) {
    super(config);
    if (config == undefined || config == null) {
      config = {};
    }
    this.#config = config;
    this.#type = config.type;

    this._ca = Object.fromEntries(Object.keys(this.#config).map(k => [k, {}]));
  }

  get type() {
    return this.#type;
  }

  get configurationAttributes() {
    return this._ca || super.configurationAttributes;
  }
}