<script>
  import { setContext } from "svelte";
  import { SERVICES } from "../util.mjs";
  import Service from "./Service.svelte";
  import Connection from "./Connection.svelte";
  import Request from "./Request.svelte";
  import { getAttributes } from "model-attributes";

  export let services;

  setContext(SERVICES, services);

  let s;

  $: {
    s = $services;
  }

  function serviceAction(event) {
    alert(event.detail.service);
    $services = { service: event.detail.service.name, action: "start" };
  }

  function endpointAction(event) {
    alert(event.detail.endpoint);

    $services = {
      action: "insert",
      service: event.detail.endpoint.owner.name,
      endpoint: event.detail.endpoint.name,
      interceptors: [{ type: "live-probe" }]
    };
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

<svg viewbox="0 0 {s.width} {s.height}">
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
    {#each Object.values(s.services) as service}
      <Service
        {service}
        on:endpointAction={endpointAction}
        on:interceptorAction={interceptorAction}
        on:serviceAction={serviceAction} />
    {/each}
  </g>

  <g class="connections">
    {#each s.connections as [from, to]}
      <Connection {from} {to} />
    {/each}
  </g>

  <g class="requests">
    {#each s.requests as request}
      <Request {request} />
    {/each}
  </g>
</svg>
