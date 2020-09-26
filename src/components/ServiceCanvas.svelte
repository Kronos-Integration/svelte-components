<script>
  export let services;

  function connectionPath(from, to) {
    return `M60 0H${from.rx}V${to.owner.y + to.y - (from.owner.y + from.y)}H60`;
  }

  function clickService(event) {
    console.log(event);
  }
</script>

<style>
  svg {
    pointer-events: none;
  }

  .service rect {
    stroke: none;
    opacity: 0.35;
    pointer-events: auto;
  }

  .endpoint {
    text-anchor: end;
    font-size: 0.8em;
    overflow: visible;
    pointer-events: auto;
  }

  .open {
    fill: green;
    stroke: green;
  }

  .endpoint:hover {
    stroke: red;
    pointer-events: auto;
  }

  .interceptor {
  }

  .interceptor:hover {
    stroke: red;
  }

  .connection {
    fill: none;
    stroke: black;
    stroke-width: 1pt;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-miterlimit: 10;
    pointer-events: auto;
  }

  .connection:hover {
    stroke: red;
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
  <g class="services">
    {#if services.services}
      {#each Object.values(services.services) as service}
        <g
          class="service"
          transform="translate({service.x},{service.y})"
          on:click={clickService}>
          <rect
            class={service.state}
            x="0"
            y="0"
            width={service.w}
            height={service.h}
            rx="5" />
          <text x="8" y="22">{service.name} ({service.type})</text>
          {#each Object.values(service.endpoints) as endpoint}
            <g
              class={endpoint.isOpen ? 'endpoint open' : 'endpoint'}
              transform="translate({endpoint.x - 60},{endpoint.y})">
              <text x={52} y={3}>{endpoint.name}</text>
              {#if endpoint.isIn}
                <rect x="55" y="-5" width="10" height="10" />

                {#each [...endpoint.connections()] as connected}
                  <path
                    class="connection"
                    d={connectionPath(endpoint, connected)} />
                {/each}
              {:else}
                <circle cx="60" cy="0" r="5" />
              {/if}

              {#each endpoint.interceptors as interceptor}
                <circle class="interceptor" cx="72" cy="0" r="5" />
              {/each}
            </g>
          {/each}
        </g>
      {/each}
    {/if}
  </g>
</svg>
