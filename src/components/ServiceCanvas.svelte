<script>
  import { setContext } from "svelte";
  import { SERVICES } from "../util.mjs";
  import Service from "./Service.svelte";

  export let services;
  export let requests;

  setContext(SERVICES, services);

  function handleMessage(event) {
    alert(event.detail.text);
  }

  $: {
    if ($requests.endpoint) {
      const endpoint = services.endpointForExpression($requests.endpoint);

      if (endpoint) {
        if (!endpoint.requests) {
          endpoint.requests = [$requests.arguments];
        } else {
          endpoint.requests.push($requests.arguments);
        }
        // console.log(endpoint.name,endpoint.requests);
        services.services = services.services;
      }
    }
  }
</script>

<svg
  viewbox="0 0 {services.width} {services.height}"
  on:message={handleMessage}>
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
      <Service {service} />
    {/each}
  </g>
</svg>
