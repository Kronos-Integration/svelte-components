import {
  Service,
  ServiceProviderMixin,
  InitializationContext
} from "@kronos-integration/service";
import { Interceptor } from "@kronos-integration/interceptor";

globalThis.process = { env: {} };
globalThis.Buffer = class Buffer {};

class TypedInterceptor extends Interceptor {
  constructor(config) {
    super(config);
    if(config == undefined || config == null) {
      config = {};
    }
    this._config = config;
    this._type = config.type;
    //delete config.type;

    //console.log(Object.keys(this._config));

    this._ca = Object.fromEntries(Object.keys(this._config).map(k => [k,{}]));
  }

  get type() {
    return this._type;
  }

  get configurationAttributes()
  {
    return this._ca || super.configurationAttributes;
  }
}

/**
 * @property {string} type
 * @property {string} state
 */
class TypedService extends Service {
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
    return new TypedInterceptor(def);
  }
}

class NoneWaitingInitializationContext extends InitializationContext {
  async getServiceFactory(type) {
    const f = await super.getServiceFactory(type);

    if (!f) {
      return TypedService;
    }
  }

  get waitForFactories() {
    return false;
  }

  connectEndpoint(endpoint, connected) {
    try {
      super.connectEndpoint(endpoint, connected);
    } catch (e) {}
  }
}

export class Services extends ServiceProviderMixin(Service) {
  static async initialize(json) {
    const services = new Services({}, new NoneWaitingInitializationContext());

    await services.declareServices(json);

    const sh = 50;
    const sw = 140;
    let cx = 100;
    let y = 0;

    for (const service of Object.values(services.services)) {
      service.x = 10;
      service.y = y;
      let ey = 10 + 20 + 5;

      for (const endpoint of Object.values(service.endpoints)) {
        endpoint.x = sw - 10;
        endpoint.y = ey;

        for (const connection of endpoint.connections()) {
          cx = cx + 5;
          connection.rx = cx;
         // console.log(`${endpoint.identifier} ${endpoint.interceptors}`);
        }

        ey += 12;
      }

      service.w = sw;
      service.h = ey > sh ? ey : sh;

      y += service.h + 10;
    }

    services.width = 500;
    services.height = y;

    return services;
  }

  addEndpointProbe(endpoint)
  {
    console.log("add probe",endpoint);
  }
}
