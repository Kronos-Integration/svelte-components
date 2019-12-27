<script>
  import { session } from "../main.mjs";
  import api from "consts:api";

  const sh = 50;
  const sw = 100;

  async function fetchServices() {
    return fetch(`${api}/services`, {
      headers: session.authorizationHeader
    })
      .then(response => response.json())
      .then(json => {
        let cx = 110;
        let y = 0;
        for (const service of Object.values(json)) {
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

        return json;
      });
  }

  let width = 400;
  let height = 900;

  function endpointFor(services, exp) {
    const m = exp.match(/service\((\w+)\)\.(.+)/);

    if (m) {
      return services[m[1]].endpoints[m[2]];
    }
  }

  function coordsFor(services, exp, current) {
    const endpoint = endpointFor(services, exp);
    return `V${endpoint.service.y + endpoint.y - current.service.y - current.y}H${endpoint.x}`;
  }
</script>

<style>
  svg {
    width: 33%;
    height: 33%;
  }

  .service rect {
    stroke: none;
    opacity: 0.35;
  }

  .endpoint {
    text-anchor: end;
    font-size: 0.8em;
    overflow: visible;
  }

  .connection {
    fill: none;
    stroke: black;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }
</style>

{#await fetchServices()}
  <p>...fetching</p>
{:then services}
  <svg viewbox="0 0 {width} {height}">
    <g class="services">
      {#each Object.values(services) as service}
        <g class="service" transform="translate({service.x},{service.y})">
          <rect
            x="0"
            y="0"
            width={service.w}
            height={service.h}
            fill={service.state === 'running' ? 'green' : 'red'} />
          <text x="8" y="22">{service.name}</text>
          {#each Object.values(service.endpoints) as endpoint}
            <g
              class="endpoint"
              transform="translate({endpoint.x - 60},{endpoint.y})">

              <text x={52} y={3}>{endpoint.name}</text>
              <circle cx="60" cy="0" r="5" />
              {#each endpoint.connected as connected}
                <path
                  class="connection"
                  d="M60 0H{connected.x}{coordsFor(services, connected.target, endpoint)}" />
              {/each}
            </g>
          {/each}
        </g>
      {/each}
    </g>
  </svg>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
