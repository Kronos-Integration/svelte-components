import { Interceptor } from "@kronos-integration/interceptor";

export class MockInterceptor extends Interceptor {
  constructor(config) {
    super(config);
    if (config == undefined || config == null) {
      config = {};
    }
    this._config = config;
    this._type = config.type;
    //delete config.type;

    //console.log(Object.keys(this._config));

    this._ca = Object.fromEntries(Object.keys(this._config).map(k => [k, {}]));
  }

  get type() {
    return this._type;
  }

  get configurationAttributes() {
    return this._ca || super.configurationAttributes;
  }
}
