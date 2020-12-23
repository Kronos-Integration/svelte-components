import {
  ServiceProviderMixin,
  InitializationContext
} from "@kronos-integration/service";
import { MockService } from "./mock-service.mjs";
import { MockLogger } from "./mock-logger.mjs";

globalThis.process = { env: {} };

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
  constructor(serviceStore, requestsStore) {
    super({}, new NoneWaitingInitializationContext());
    this.subscriptions = new Set();
    this.requests = [];

    if (serviceStore) {
      serviceStore.subscribe(services => this.initialize(services));
    }

    if (requestsStore) {
      requestsStore.subscribe(request => this.addRequest(request));
    }
  }

  subscribe(cb) {
    this.subscriptions.add(cb);
    cb(this);
    return () => this.subscriptions.delete(cb);
  }

  fireSubscriptions() {
    if (this.subscriptions) {
      this.subscriptions.forEach(s => s(this));
    }
  }

  async initialize(json) {
    await this.declareServices(json);

    const sw = 100;
    let cx = 40;
    let y = 0;

    for (const service of Object.values(this.services)) {
      service.x = 10;
      service.y = y;
      let ey = 18;

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
      service.h = ey;

      y += service.h + 6;
    }

    this.width = 500;
    this.height = y;

    this.fireSubscriptions();
  }

  addRequest(request) {
    const endpoint = this.endpointForExpression(request.endpoint);
    console.log("ADD", request);

    if (endpoint) {
      this.requests.push({ endpoint, arguments: request.arguments });
    }
  }

  get connections() {
    const connections = [];
    const delivered = new Set();
    for (const service of Object.values(this.services)) {
      for (const endpoint of Object.values(service.endpoints)) {
        for (const connection of endpoint.connections()) {
          const key = endpoint.identifier + "-" + connection.identifier;
          if (!delivered.has(key)) {
            delivered.add(key);
            delivered.add(connection.identifier + "-" + endpoint.identifier);
            connections.push([endpoint, connection]);
          }
        }
      }
    }
    return connections;
  }
}
