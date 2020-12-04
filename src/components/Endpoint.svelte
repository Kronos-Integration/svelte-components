<script>
  import Interceptor from "./Interceptor.svelte";
  import Connection from "./Connection.svelte";

  export let endpoint;

  function click() {
    alert(JSON.stringify(endpoint.toJSON()));
  }

</script>

<style>
  .endpoint {
    text-anchor: end;
    overflow: visible;
    pointer-events: auto;
  }

  .endpoint:hover {
    stroke: red;
    pointer-events: auto;
  }
</style>

<text x={10} y={endpoint.y}>{endpoint.name}</text>
<g on:click={click}
  class={endpoint.isOpen ? 'endpoint open' : 'endpoint'}
  transform="translate({endpoint.x},{endpoint.y})">
  {#if endpoint.isIn}
    <rect x="-5" y="-5" width="10" height="10" />
    {#each [...endpoint.connections()] as connected}
      <Connection from={endpoint} to={connected} />
    {/each}
  {:else}
    <circle cx="0" cy="0" r="5" />
  {/if}

  {#each endpoint.interceptors as interceptor, i}
    <Interceptor {interceptor} cx={20 + 12 * i} cy={0} />
  {/each}
</g>
