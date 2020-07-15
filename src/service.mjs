
export class Service {
  constructor(name, options, owner) {
    this.name = name;
    this.owner = owner;
    this.endpoints = {};

    for (const n of ["type", "state", "logLevel"]) {
      this[n] = options[n];
    }
  }

  instantiateInterceptor(options) {
    return this.owner.instantiateInterceptor(options);
  }
}
