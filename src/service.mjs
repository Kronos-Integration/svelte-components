import { Interceptor } from "@kronos-integration/interceptor";

export class Service {
  constructor(name, options) {
    this.name = name;
    this.endpoints = {};

    for (const n of ["type", "state", "logLevel"]) {
      this[n] = options[n];
    }
  }

  instantiateInterceptor(options) {
    return new Interceptor(typeof options === "string" ? {} : options);
  }
}
