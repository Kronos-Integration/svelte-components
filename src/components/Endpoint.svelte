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

  <text x="-6px" y="1px">{endpoint.name}</text>
  <circle r="4"/>
  
  {#each endpoint.interceptors as interceptor, i}
    <Interceptor {interceptor} cx={20 + 12 * i} cy={0} />
  {/each}
</g>
