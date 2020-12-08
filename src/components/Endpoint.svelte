<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { ENDPOINT } from "../util.mjs";

  import Interceptor from "./Interceptor.svelte";
  import Connection from "./Connection.svelte";

  export let endpoint;

  setContext(ENDPOINT, endpoint);

  const dispatch = createEventDispatcher();


  function click() {
    dispatch("add-endpoint-probe", {
      endpoint
    });
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
<g
  id={endpoint.identifier}
  on:click={click}
  class={endpoint.isOpen ? 'endpoint open' : 'endpoint'}
  transform="translate({endpoint.x},{endpoint.y})">
  {#if endpoint.requests}
    {#each endpoint.requests as r, i}
      <rect x={80 + i * 15} y="-5" width="5" height="5" />
    {/each}
  {/if}

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
