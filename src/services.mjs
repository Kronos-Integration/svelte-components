import {
  Service,
  ServiceProviderMixin,
  InitializationContext
} from "@kronos-integration/service";
import {
  Interceptor
} from "@kronos-integration/interceptor";

globalThis.process = { env: {} };
globalThis.Buffer = class Buffer {};

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
    let cx = 110;
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

  instantiateInterceptor(def) {
    const interceptor = super.instantiateInterceptor(def);
    if(interceptor) {
      return interceptor;
    }
    return new Interceptor(def);
  }
}
