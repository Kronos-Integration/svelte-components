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

<text x={10} y={endpoint.y}>{endpoint.name}</text>
<g
  id={endpoint.identifier}
  on:click={click}
  class={endpoint.isOpen ? 'endpoint open' : 'endpoint'}
  transform="translate({endpoint.x},{endpoint.y})">

  <circle cx="0" cy="0" r="4" fill="gray"/>

  {#if endpoint.requests}
    {#each endpoint.requests as request, index}
      <text x={75 + index * 12} y="-10">{index}</text>
      <rect x={70 + index * 12} y="-5" width="5" height="5" />
    {/each}
  {/if}

  {#if endpoint.isIn}
    {#each [...endpoint.connections()] as connected}
      <Connection from={endpoint} to={connected} />
    {/each}
  {/if}

  {#each endpoint.interceptors as interceptor, i}
    <Interceptor {interceptor} cx={20 + 12 * i} cy={0} />
  {/each}
</g>
