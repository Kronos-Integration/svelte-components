<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { ENDPOINT } from "../util.mjs";

  import Interceptor from "./Interceptor.svelte";

  export let endpoint;

  setContext(ENDPOINT, endpoint);

  const dispatch = createEventDispatcher();

  function click() {
    dispatch("add-endpoint-probe", {
      endpoint
    });
  }
</script>

<g
  id={endpoint.identifier}
  class="endpoint"
  on:click={click}
  transform="translate({endpoint.x},{endpoint.y})">

  <text x="-6px" y="2px">{endpoint.name}</text>

  <circle r="4"/>

  {#if endpoint.requests}
    {#each endpoint.requests as request, index}
      <text x={75 + index * 12} y="-10">{index}</text>
      <rect x={70 + index * 12} y="-5" width="5" height="5" />
    {/each}
  {/if}
  
  {#each endpoint.interceptors as interceptor, i}
    <Interceptor {interceptor} cx={20 + 12 * i} cy={0} />
  {/each}
</g>
