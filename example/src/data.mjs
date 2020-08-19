export const data = {
  logger: {
    type: "systemd-logger",
    name: "logger",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        in: true,
        out: true,
        open: true,
        connected: [
          "service(admin).log",
          "service(auth).log",
          "service(config).log",
          "service(health).log",
          "service(http).log",
          "service(ldap).log",
          "service(logger).log",
          "service(logger).log",
          "service(swarm).log",
          "service(systemctl).log",
          "service(systemd).log"
        ]
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      }
    }
  },
  config: {
    type: "systemd-config",
    name: "config",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      }
    }
  },
  systemd: {
    type: "systemd",
    name: "systemd",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      }
    }
  },
  http: {
    type: "http",
    name: "http",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      "/services/peers": {
        path: "/services/peers",
        ws: true,
        in: true,
        out: true,
        connected: "service(swarm).peers.services",
        interceptors: [
          {
            type: "decode-json"
          }
        ]
      },
      "/state/uptime": {
        path: "/state/uptime",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).uptime",
        interceptors: [
          {
            type: "decode-json"
          }
        ]
      },
      "/state/cpu": {
        path: "/state/cpu",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).cpu",
        interceptors: [
          {
            type: "decode-json"
          }
        ]
      },
      "/state/memory": {
        path: "/state/memory",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).memory",
        interceptors: [
          {
            type: "decode-json"
          }
        ]
      },
      "/state": {
        path: "/state",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).state",
        interceptors: [
          {
            type: "decode-json"
          }
        ]
      },
      "/authenticate": {
        method: "POST",
        path: "/authenticate",
        out: true,
        open: true,
        connected: "service(auth).access_token",
        interceptors: [
          {
            type: "ctx-body-param"
          }
        ]
      },
      "/services": {
        method: "GET",
        path: "/services",
        out: true,
        open: true,
        connected: "service(admin).services",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/machines": {
        method: "GET",
        path: "/systemctl/machines",
        out: true,
        open: true,
        connected: "service(systemctl).machines",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/timers": {
        method: "GET",
        path: "/systemctl/timers",
        out: true,
        open: true,
        connected: "service(systemctl).timers",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/sockets": {
        method: "GET",
        path: "/systemctl/sockets",
        out: true,
        open: true,
        connected: "service(systemctl).sockets",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit": {
        method: "GET",
        path: "/systemctl/unit",
        out: true,
        open: true,
        connected: "service(systemctl).units",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit": {
        method: "GET",
        path: "/systemctl/unit/:unit",
        out: true,
        open: true,
        connected: "service(systemctl).unit",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit/files": {
        method: "GET",
        path: "/systemctl/unit/:unit/files",
        out: true,
        open: true,
        connected: "service(systemctl).files",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit/start": {
        method: "POST",
        path: "/systemctl/unit/:unit/start",
        out: true,
        open: true,
        connected: "service(systemctl).start",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit/stop": {
        method: "POST",
        path: "/systemctl/unit/:unit/stop",
        out: true,
        open: true,
        connected: "service(systemctl).stop",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit/restart": {
        method: "POST",
        path: "/systemctl/unit/:unit/restart",
        out: true,
        open: true,
        connected: "service(systemctl).restart",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/systemctl/unit/:unit/reload": {
        method: "POST",
        path: "/systemctl/unit/:unit/reload",
        out: true,
        open: true,
        connected: "service(systemctl).reload",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      },
      "/other/fail2ban": {
        method: "GET",
        path: "/other/fail2ban",
        out: true,
        open: true,
        connected: "service(systemctl).fail2ban",
        interceptors: [
          {
            type: "ctx-jwt-verify"
          },
          {
            type: "ctx"
          }
        ]
      }
    }
  },
  ldap: {
    type: "ldap",
    name: "ldap",
    state: "stopped",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      authenticate: {
        in: true,
        out: true,
        open: true,
        connected: "service(auth).ldap"
      },
      search: {
        in: true,
        out: true
      }
    }
  },
  health: {
    type: "health-check",
    name: "health",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      state: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state",
        interceptors: [
          {
            type: "encode-json"
          }
        ]
      },
      cpu: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/cpu",
        interceptors: [
          {
            type: "encode-json"
          }
        ]
      },
      memory: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/memory",
        interceptors: [
          {
            type: "encode-json"
          }
        ]
      },
      uptime: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/uptime",
        interceptors: [
          {
            type: "encode-json"
          }
        ]
      },
      resourceUsage: {
        in: true,
        out: true,
        open: true
      }
    }
  },
  auth: {
    type: "authenticator",
    name: "auth",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      access_token: {
        in: true,
        open: true,
        connected: "service(http)./authenticate"
      },
      ldap: {
        out: true,
        open: true,
        connected: "service(ldap).authenticate"
      }
    }
  },
  admin: {
    type: "admin",
    name: "admin",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      services: {
        in: true,
        out: true,
        open: true,
        connected: ["service(http)./services", "service(swarm).topic.services"],
        interceptors: [
          {
            type: "encode-json"
          }
        ]
      }
    }
  },
  swarm: {
    type: "swarm",
    name: "swarm",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      "topic.services": {
        in: true,
        out: true,
        connected: "service(admin).services",
        sockets: 0,
        topic: {
          name: "services",
          peers: [
            {
              host: "79.194.42.188",
              port: 35323
            },
            {
              host: "79.194.42.188",
              port: 38661
            },
            {
              host: "79.194.42.188",
              port: 44361
            },
            {
              host: "10.0.6.2",
              port: 44361
            }
          ],
          sockets: 0,
          announce: true,
          lookup: true
        }
      },
      "peers.services": {
        out: true,
        connected: "service(http)./services/peers",
        topic: {
          name: "services",
          peers: [
            {
              host: "79.194.42.188",
              port: 35323
            },
            {
              host: "79.194.42.188",
              port: 38661
            },
            {
              host: "79.194.42.188",
              port: 44361
            },
            {
              host: "10.0.6.2",
              port: 44361
            }
          ],
          sockets: 0,
          announce: true,
          lookup: true
        }
      }
    }
  },
  systemctl: {
    type: "systemctl",
    name: "systemctl",
    state: "running",
    logLevel: "info",
    endpoints: {
      log: {
        out: true,
        open: true,
        connected: "service(logger).log"
      },
      config: {
        in: true,
        open: true
      },
      command: {
        in: true,
        open: true
      },
      files: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit/files"
      },
      unit: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit"
      },
      units: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit"
      },
      timers: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/timers"
      },
      sockets: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/sockets"
      },
      machines: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/machines"
      },
      start: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit/start"
      },
      stop: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit/stop"
      },
      restart: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit/restart"
      },
      reload: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./systemctl/unit/:unit/reload"
      },
      fail2ban: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./other/fail2ban"
      }
    }
  }
};
