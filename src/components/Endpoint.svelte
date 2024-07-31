<script>
  import { setContext } from "svelte";
  import { ENDPOINT } from "../util.mjs";
  import Interceptor from "./Interceptor.svelte";

  let { endpoint, endpintAction, interceptorAction } = $props();

  setContext(ENDPOINT, endpoint);
</script>

<g
  id={endpoint.identifier}
  class="endpoint"
  tabindex="0"
  role="button"
  onclick={endpintAction}
  onkeydown={endpintAction}
  transform="translate({endpoint.x},{endpoint.y})"
>
  <text x="-6px" y="1px">{endpoint.name}</text>
  <circle r="3" />

  {#each endpoint.interceptors as interceptor, i}
    <Interceptor {interceptorAction} {interceptor} x={10 + 10 * i} y={0} />
  {/each}
</g>
