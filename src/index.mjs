
import { Endpoint } from "@kronos-integration/endpoint";

export function endpointFor(services, exp) {
  const m = exp.match(/service\((\w+)\)\.(.+)/);

  if (m) {
    return services[m[1]].endpoints[m[2]];
  }
}

export function normalizeServices(services) {

  const sw = 100;
  const sh = 50;

  let cx = 110;
  let y = 0;
  for (const service of Object.values(services)) {
    service.x = 10;
    service.y = y;

    let ey = 10 + 20 + 5;
    for (const [name, endpoint] of Object.entries(service.endpoints)) {
      endpoint.name = name;
      endpoint.service = service;
      endpoint.x = sw - 10;
      endpoint.y = ey;
      if (endpoint.connected === undefined) {
        endpoint.connected = [];
      } else if (!Array.isArray(endpoint.connected)) {
        endpoint.connected = [endpoint.connected];
      }
      endpoint.connected = endpoint.connected.map(c => {
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

export function coordsFor(services, exp, current) {
  const endpoint = endpointFor(services, exp);
  return `V${endpoint.service.y + endpoint.y - current.service.y - current.y}H${
    endpoint.x
  }`;
}
