import { Interceptor } from "@kronos-integration/interceptor";

export class MockInterceptor extends Interceptor {
  #config;
  #type;
  #ca;

  constructor(config) {
    super(config);
    if (config == undefined || config == null) {
      config = {};
    }
    this.#config = config;
    this.#type = config.type;
    //delete config.type;

    this.#ca = Object.fromEntries(Object.keys(this.#config).map(k => [k, {}]));
  }

  get type() {
    return this.#type;
  }

  get configurationAttributes() {
    return this.#ca || super.configurationAttributes;
  }
}
