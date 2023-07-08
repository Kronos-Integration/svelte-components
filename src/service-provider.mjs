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
}

export class ServiceProvider extends ServiceProviderMixin(
  MockService,
  MockLogger
) {
  subscriptions = new Set();
  requests = [];
  width = 500;
  height = 500;

  constructor(serviceStore, requestsStore) {
    super({}, new NoneWaitingInitializationContext());

    for (const service of Object.values(this.services)) {
      service.x = 0;
      service.y = 0;
      for (const endpoint of Object.values(service.endpoints)) {
        endpoint.x = 0;
        endpoint.y = 0;
      }
    }

    if (serviceStore) {
      this.serviceStore = serviceStore;
      serviceStore.subscribe(services => this.initialize(services));
    }

    if (requestsStore) {
      this.requestsStore = requestsStore;
      requestsStore.subscribe(request => this.addRequest(request));
    }
  }

  subscribe(cb) {
    this.subscriptions.add(cb);
    cb(this);
    return () => this.subscriptions.delete(cb);
  }

  fireSubscriptions() {
    this.subscriptions.forEach(s => s(this));
  }

  async initialize(json) {
    await this.declareServices(json);

    let cx = 0;
    let y = 0;

    for (const service of Object.values(this.services)) {
      service.x = 10;
      service.w = 90;
      service.y = y;

      let ey = 18;

      for (const endpoint of Object.values(service.endpoints)) {
        endpoint.x = service.w;
        endpoint.y = ey;

        for (const connection of endpoint.connections()) {
          cx += 4;
          connection.rx = cx;
        }

        ey += 10;
      }

      service.h = ey;

      y += service.h + 6;
    }

    this.height = y;

    this.fireSubscriptions();
  }

  addRequest(request) {
    const endpoint = this.endpointForExpression(request.endpoint);

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
          if (!connection.x || !connection.y || !endpoint.x || !endpoint.y) {
            //console.log(endpoint.identifier, "no valid connection", connection);
            continue;
          }

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
