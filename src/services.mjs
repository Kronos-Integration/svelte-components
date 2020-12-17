import {
  ServiceProviderMixin,
  InitializationContext
} from "@kronos-integration/service";
import { MockService } from "./mock-service.mjs";
import { MockLogger } from "./mock-logger.mjs";

globalThis.process = { env: {} };
globalThis.Buffer = class Buffer {};

class NoneWaitingInitializationContext extends InitializationContext {
  async getServiceFactory(type) {
    const f = await super.getServiceFactory(type);

    if (!f) {
      return MockService;
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

export class Services extends ServiceProviderMixin(MockService, MockLogger) {
  static async initialize(json) {
    let serviceProviderData = {};
    for (const [k, v] of Object.entries(json)) {
      if (v.serviceProvider) {
        serviceProviderData = v;
        delete json[k];
        break;
      }
    }

    const services = new Services(
      serviceProviderData,
      new NoneWaitingInitializationContext()
    );

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
        endpoint.x = sw;
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

  *connections() {
    for (const service of Object.values(this.services)) {
      for (const endpoint of Object.values(service.endpoints)) {
        for (const connection of endpoint.connections()) {
          yield [endpoint, connection];
        }
      }
    }
  }

  addEndpointProbe(endpoint) {
    console.log("add probe", endpoint);
  }
}
