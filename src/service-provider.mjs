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

export class ServiceProvider extends ServiceProviderMixin(
  MockService,
  MockLogger
) {
  static async initialize(json, requestsStore) {
    let serviceProviderData = {};
    for (const [k, v] of Object.entries(json)) {
      if (v.serviceProvider) {
        serviceProviderData = v;
        delete json[k];
        break;
      }
    }

    const services = new ServiceProvider(
      serviceProviderData,
      new NoneWaitingInitializationContext()
    );

    await services.declareServices(json);

    const sh = 50;
    const sw = 100;
    let cx = 40;
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

    if (requestsStore) {
      requestsStore.subscribe(request => services.addRequest(request));
    }

    return services;
  }

  constructor(...args) {
    super(...args);
    this.requests = [];
  }

  addRequest(request) {
    const endpoint = this.endpointForExpression(request.endpoint);
    console.log("ADD", request);

    if (endpoint) {
      this.requests.push({ endpoint, arguments: request.arguments });
    }
  }

  *connections() {
    const delivered = new Set();
    for (const service of Object.values(this.services)) {
      for (const endpoint of Object.values(service.endpoints)) {
        for (const connection of endpoint.connections()) {
          const key = endpoint.identifier + "-" + connection.identifier;
          if (!delivered.has(key)) {
            delivered.add(key);
            delivered.add(connection.identifier + "-" + endpoint.identifier);
            yield [endpoint, connection];
          }
        }
      }
    }
  }
}
