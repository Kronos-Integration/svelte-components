<script>
  export let services;
  let width = 400;
  let height = 900;
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
                d="M60 0H{connected.x}{services.coordsFor(connected.target, endpoint)}" />
            {/each}
          </g>
        {/each}
      </g>
    {/each}
  </g>
</svg>
