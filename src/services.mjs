import { Endpoint } from "@kronos-integration/endpoint";
import { Service } from "./service.mjs";

export class Services {
  static initialize(json) {
    const services = new Services();

    services.services = [];

    for (const [name, serviceDetails] of Object.entries(json)) {
      const service = new Service(name, serviceDetails);
      services.services.push(service);
    }

    for (const [name, serviceDetails] of Object.entries(json)) {
      const service = services.service(name, );
      for (const [en, eo] of Object.entries(serviceDetails.endpoints)) {
        eo.interceptors = [];
        const ep = new Endpoint(en, service, eo);
        service.endpoints[en] = ep;
      }
    }

    return services;
  }

  service(name) {
    return this.services.find(s => s.name === name);
  }

  endpointFor(exp) {
    const m = exp.match(/service\((\w+)\)\.([\w\.\-\/\:]+)/);

    if (m) {
      const service = this.service(m[1]);
      return service.endpoints[m[2]];
    }
  }

  coordsFor(exp, current) {
    const endpoint = this.endpointFor(exp);
    return `V${
      endpoint.service.y + endpoint.y - current.service.y - current.y
    }H${endpoint.x}`;
  }
}
