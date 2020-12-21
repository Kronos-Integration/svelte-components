<script>
  import { setContext } from "svelte";
  import { SERVICES } from "../util.mjs";
  import Service from "./Service.svelte";
  import Connection from "./Connection.svelte";
  import Request from "./Request.svelte";
  import { getAttributes } from "model-attributes";

  export let services;

  setContext(SERVICES, services);

  function serviceAction(event) {
    alert(event.detail.service);
  }

  function endpointAction(event) {
    alert(event.detail.endpoint);
  }

  function interceptorAction(event) {
    const interceptor = event.detail.interceptor;
    let atts = getAttributes(interceptor, interceptor.configurationAttributes);
    const str =
      `${interceptor.type}\n` +
      Object.entries(atts)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

    alert(str);
  }
</script>

<svg viewbox="0 0 {services.width} {services.height}">
  <defs>
    <symbol id="interceptor" width="10" height="10" viewBox="0 0 2 2">
      <circle class="interceptor" cx="0" cy="0" r="5" />
    </symbol>

    <marker
      id="arrow"
      viewBox="0 0 8 8"
      refX="6"
      refY="4"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse">
      <path d="M 0 0 L 8 4 L 0 8 z" />
    </marker>
    <marker
      id="dot"
      viewBox="0 0 8 8"
      refX="4"
      refY="4"
      markerWidth="4"
      markerHeight="4">
      <circle cx="4" cy="4" r="4" />
    </marker>
  </defs>

  <g class="services">
    {#each Object.values(services.services) as service}
      <Service
        {service}
        on:serviceAction={serviceAction}
        on:endpointAction={endpointAction}
        on:interceptorAction={interceptorAction} />
    {/each}
  </g>

  <g class="connections">
    {#each [...services.connections()] as [from, to]}
      <Connection {from} {to} />
    {/each}
  </g>

  <g class="requests">
    {#each services.requests as request}
      <Request {request} />
    {/each}
  </g>
</svg>
