export const data = {
  logger: {
    type: "systemd-logger",
    name: "logger",
    state: "running",
    logLevel: "trace",
    description: "Forward log entries into systemd journal",
    timeout: { start: 20, stop: 20, restart: 20 },
    endpoints: {
      log: {
        in: true,
        out: true,
        open: true,
        connected: [
          "service(admin).log",
          "service(authenticator).log",
          "service(config).log",
          "service(health).log",
          "service(http).log",
          "service(ldap).log",
          "service(logger).log",
          "service(smtp).log",
          "service(systemd).log"
        ]
      },
      config: { in: true, open: true }
    }
  },
  config: {
    type: "systemd-config",
    name: "config",
    state: "running",
    logLevel: "trace",
    description: "Synchronize configuration with systemd",
    timeout: { start: 20, stop: 20, restart: 20 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true }
    }
  },
  systemd: {
    type: "systemd",
    serviceProvider: true,
    name: "systemd",
    state: "running",
    logLevel: "trace",
    description: "Bridge to systemd",
    timeout: { start: 20, stop: 20, restart: 20 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true }
    }
  },
  http: {
    type: "http",
    name: "http",
    state: "running",
    logLevel: "trace",
    jwt: {},
    listen: {
      url: "https://mfelten.dynv6.net/services/entitlements/api",
      socket: { fd: 3, name: "http.listen.socket" }
    },
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    description: "http server",
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      "/state/uptime": {
        path: "/state/uptime",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).uptime",
        interceptors: [{ type: "decode-json" }]
      },
      "/state/cpu": {
        path: "/state/cpu",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).cpu",
        interceptors: [{ type: "decode-json" }]
      },
      "/state/memory": {
        path: "/state/memory",
        ws: true,
        in: true,
        out: true,
        connected: "service(health).memory",
        interceptors: [{ type: "decode-json" }]
      },
      "/admin/services": {
        path: "/admin/services",
        ws: true,
        in: true,
        out: true,
        open: true,
        connected: "service(admin).services",
        interceptors: [{ type: "decode-json" }]
      },
      "/admin/requests": {
        path: "/admin/requests",
        ws: true,
        in: true,
        out: true,
        open: true,
        connected: "service(admin).requests[C]",
        interceptors: [{ type: "decode-json" }]
      },
      "/authenticate": {
        method: "POST",
        path: "/authenticate",
        out: true,
        open: true,
        connected: "service(authenticator).access_token",
        interceptors: [{ type: "ctx-body-param", headers: {} }]
      },
      "/entitlement": {
        method: "GET",
        path: "/entitlement",
        out: true,
        open: true,
        connected: "service(ldap).search",
        interceptors: [
          { type: "ctx-jwt-verify" },
          { type: "ctx", headers: {} },
          {
            type: "template",
            request: {
              base: "ou=groups,dc=mf,dc=de",
              scope: "children",
              attributes: ["cn"],
              filter: "(objectclass=groupOfUniqueNames)"
            }
          }
        ]
      },
      "/user": {
        method: "GET",
        path: "/user",
        out: true,
        open: true,
        connected: "service(ldap).search",
        interceptors: [
          { type: "ctx-jwt-verify" },
          { type: "ctx", headers: {} },
          {
            type: "template",
            request: {
              base: "ou=accounts,dc=mf,dc=de",
              scope: "children",
              filter: "(objectclass=posixAccount)"
            }
          }
        ]
      },
      "PUT:/user": {
        method: "PUT",
        path: "/user",
        out: true,
        open: true,
        connected: "service(ldap).add",
        interceptors: [
          {
            type: "ctx-jwt-verify",
            requiredEntitlements: ["entitlement-provider.user.add"]
          },
          { type: "ctx-body-param", headers: {} },
          {
            type: "template",
            request: {
              dn: "uid={{user}},ou=accounts,dc=mf,dc=de",
              entry: {
                objectClass: [
                  "inetOrgPerson",
                  "organizationalPerson",
                  "person",
                  "top"
                ],
                cn: "{{user}}",
                sn: "{{user}}",
                userPassword: "{{password}}"
              }
            }
          }
        ]
      },
      "PATCH:/user/password": {
        method: "PATCH",
        path: "/user/password",
        out: true,
        open: true,
        connected: "service(ldap).modify",
        interceptors: [
          { type: "ctx-body-param", headers: {} },
          {
            type: "template",
            request: {
              bind: {
                dn: "uid={{user}},ou=accounts,dc=mf,dc=de",
                password: "{{password}}"
              },
              dn: "uid={{user}},ou=accounts,dc=mf,dc=de",
              replace: { userPassword: "{{new_password}}" }
            }
          }
        ]
      },
      "PATCH:/user/:user": {
        method: "PATCH",
        path: "/user/:user",
        out: true,
        open: true,
        connected: "service(ldap).modify",
        interceptors: [
          {
            type: "ctx-jwt-verify",
            requiredEntitlements: ["entitlement-provider.user.modify"]
          },
          { type: "ctx-body-param", headers: {} },
          {
            type: "template",
            request: {
              bind: {
                dn: "uid={{user}},ou=accounts,dc=mf,dc=de",
                password: "{{password}}"
              },
              dn: "uid={{user}},ou=accounts,dc=mf,dc=de",
              replace: {}
            }
          }
        ]
      },
      "DELETE:/user/:user": {
        method: "DELETE",
        path: "/user/:user",
        out: true,
        open: true,
        connected: "service(ldap).del",
        interceptors: [
          { type: "ctx-jwt-verify" },
          { type: "ctx", headers: {} },
          {
            type: "template",
            request: { dn: "uid={{user}},ou=accounts,dc=mf,dc=de" }
          }
        ]
      },
      "/user/:user/entitlements": {
        method: "GET",
        path: "/user/:user/entitlements",
        out: true,
        open: true,
        connected: "service(ldap).search",
        interceptors: [
          { type: "ctx-jwt-verify" },
          { type: "ctx", headers: {} },
          {
            type: "template",
            request: {
              base: "ou=groups,dc=mf,dc=de",
              scope: "sub",
              attributes: ["cn"],
              filter:
                "(&(objectclass=groupOfUniqueNames)(uniqueMember=uid={{user}},ou=accounts,dc=mf,dc=de))"
            }
          }
        ]
      }
    }
  },
  authenticator: {
    type: "authenticator",
    name: "authenticator",
    state: "stopped",
    logLevel: "trace",
    description: "provide authentication services",
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      change_password: { in: true, open: true },
      access_token: {
        in: true,
        open: true,
        connected: "service(http)./authenticate"
      },
      "ldap.authenticate": {
        out: true,
        open: true,
        connected: "service(ldap).authenticate"
      }
    }
  },
  ldap: {
    type: "ldap",
    name: "ldap",
    state: "stopped",
    logLevel: "trace",
    url: "ldaps://mfelten.dynv6.net",
    entitlements: {
      bindDN: "uid={{username}},ou=accounts,dc=mf,dc=de",
      base: "ou=groups,dc=mf,dc=de",
      attribute: "cn",
      scope: "sub",
      filter:
        "(&(objectclass=groupOfUniqueNames)(uniqueMember=uid={{username}},ou=accounts,dc=mf,dc=de))"
    },
    description: "LDAP server access for bind/add/modify/del/query",
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      authenticate: {
        in: true,
        out: true,
        open: true,
        connected: "service(authenticator).ldap.authenticate"
      },
      add: {
        in: true,
        out: true,
        open: true,
        connected: "service(http).PUT:/user"
      },
      del: {
        in: true,
        out: true,
        open: true,
        connected: "service(http).DELETE:/user/:user"
      },
      modify: {
        in: true,
        out: true,
        open: true,
        connected: "service(http).PATCH:/user/password"
      },
      search: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./entitlement"
      }
    }
  },
  health: {
    type: "health",
    name: "health",
    state: "running",
    logLevel: "trace",
    cpuInterval: 30,
    memoryInterval: 30,
    uptimeInterval: 30,
    resourceUsageInterval: 30,
    description: "This service is the base class for service implementations",
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      state: { in: true, out: true, open: true },
      cpu: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/cpu"
      },
      memory: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/memory"
      },
      uptime: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./state/uptime"
      },
      resourceUsage: { in: true, out: true, open: true }
    }
  },
  admin: {
    type: "admin",
    name: "admin",
    state: "stopped",
    logLevel: "trace",
    description: "Live administration of kronos services",
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      command: { in: true, open: true },
      services: {
        in: true,
        out: true,
        open: true,
        connected: "service(http)./admin/services"
      },
      requests: { out: true, connected: "service(http)./admin/requests[T]" }
    }
  },
  smtp: {
    type: "smtp",
    name: "smtp",
    state: "stopped",
    logLevel: "trace",
    port: 25,
    secure: false,
    auth: {},
    description: "This service is the base class for service implementations",
    timeout: { start: 20, stop: 20, restart: 20, server: 120 },
    endpoints: {
      log: { out: true, open: true, connected: "service(logger).log" },
      config: { in: true, open: true },
      send: { in: true, out: true }
    }
  }
};
