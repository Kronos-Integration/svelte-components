import { Endpoint } from "@kronos-integration/endpoint";
import { Service } from "./service.mjs";

export class Services {
  static initialize(json) {
    const services = new Services();

    const sh = 50;
    const sw = 100;

    let cx = 110;
    let y = 0;

    services.services = [];

    for (const [name, serviceDetails] of Object.entries(json)) {
      const service = new Service(name, serviceDetails);

      services.services.push(service);

      service.x = 10;
      service.y = y;

      let ey = 10 + 20 + 5;

      for (const [en, eo] of Object.entries(serviceDetails.endpoints)) {
        eo.interceptors = [];
        const endpoint = new Endpoint(en, service, eo);

        service.endpoints[en] = endpoint;

        endpoint.x = sw - 10;
        endpoint.y = ey;

        let connected = eo.connected;

        if (connected === undefined) {
          connected = [];
        } else if (!Array.isArray(connected)) {
          connected = [connected];
        }

        endpoint.connected = connected.map(c => {
          cx = cx + 5;

          return { x: cx, target: c };
        });
        ey += 12;
      }

      service.w = sw;
      service.h = ey > sh ? ey : sh;

      y += service.h + 10;
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
    return `V${endpoint.owner.y + endpoint.y - current.owner.y - current.y}H${
      endpoint.x
    }`;
  }
}
