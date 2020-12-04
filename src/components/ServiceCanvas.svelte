<script>
  import Endpoint from "./Endpoint.svelte";

  export let services;

  function clickService(event) {
  }

  function dragStartService(event) {
    console.log(event);
  }
</script>

<style>
  svg {
    pointer-events: none;
  }

  .service {
    pointer-events: auto;
  }

  .service rect {
    stroke: none;
    opacity: 0.35;
  }

  .open {
    fill: green;
    stroke: green;
  }

  .running {
    fill: green;
  }
  .starting {
    fill: lightgreen;
  }
  .stopped {
    fill: gray;
  }
  .stopping {
    fill: lightgray;
  }
  .failed {
    fill: red;
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
        <g
          class="service"
          transform="translate({service.x},{service.y})"
          on:click={clickService}
          on:dragstart={dragStartService}>
          <rect
            class={service.state}
            x="0"
            y="0"
            width={service.w}
            height={service.h}
            rx="5" />
          <text x="8" y="22">{service.name} ({service.type})</text>
          {#each Object.values(service.endpoints) as endpoint}
           <Endpoint {endpoint}/>
          {/each}
        </g>
      {/each}
    {/if}
  </g>
</svg>
