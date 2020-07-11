export class Service {
  constructor(name, options) {
    this.name = name;
    this.endpoints = {};

    for (const n of ["type", "state", "logLevel"]) {
      this[n] = options[n];
    }
  }
}
