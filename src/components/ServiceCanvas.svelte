<script>
  export let services;
  let width = 500;
  let height = 1200;

  const stateColor = {
    running: "green",
    starting: "green",
    stopped: "gray",
    stoppin: "gray",
    failed: "red"
  };
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

  .open {
    fill: green;
  }

  .endpoint:hover {
    stroke: red;
  }

  .interceptor {
  }

  .interceptor:hover {
    stroke: red;
  }

  .connection {
    fill: none;
    stroke: black;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
  }

  .connection:hover {
    stroke: red;
  }
</style>

<svg viewbox="0 0 {width} {height}">
  <g class="services">
    {#each services.services as service}
      <g class="service" transform="translate({service.x},{service.y})">
        <rect
          x="0"
          y="0"
          width={service.w}
          height={service.h}
          fill={stateColor[service.state]} />
        <text x="8" y="22">{service.name}</text>
        {#each Object.values(service.endpoints) as endpoint}
          <g
            class="{endpoint.isOpen ? 'endpoint open' : 'endpoint'}"
            transform="translate({endpoint.x - 60},{endpoint.y})">

            <text x={52} y={3}>{endpoint.name}</text>
            {#if endpoint.isIn}
              <rect x="60" y="0" w="10" h="10" />
            {:else}
              <circle cx="60" cy="0" r="5" />
            {/if}

            {#each endpoint.interceptors as interceptor}
              <circle class="interceptor" cx="72" cy="0" r="5" />
            {/each}
            {#each endpoint.connected as connected}
              <path
                class="connection"
                d="M60 0H{connected.x}{services.coordsFor(connected.target, endpoint)}" />
            {/each}
          </g>
        {/each}
      </g>
    {/each}
  </g>
</svg>
