<script>
  import Service from "./Service.svelte";

  export let services;
</script>

<style>
  svg {
    pointer-events: none;
  }
</style>

<svg viewbox="0 0 {services.width} {services.height}">
  <defs>
    <symbol id="interceptor" width="10" height="10" viewBox="0 0 2 2">
      <circle class="interceptor" cx="0" cy="0" r="5" />
    </symbol>

    <marker
      id="arrow"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="6"
      markerHeight="6"
      orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
    <marker
      id="dot"
      viewBox="0 0 10 10"
      refX="5"
      refY="5"
      markerWidth="5"
      markerHeight="5">
      <circle cx="5" cy="5" r="5" fill="black" />
    </marker>
  </defs>

  <g class="services">
    {#if services.services}
      {#each Object.values(services.services) as service}
        <Service {service} />
      {/each}
    {/if}
  </g>
</svg>
