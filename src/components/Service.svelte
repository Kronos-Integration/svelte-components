<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { SERVICE } from "../util.mjs";
  import Endpoint from "./Endpoint.svelte";

  export let service;

  setContext(SERVICE, service);

  const dispatch = createEventDispatcher();

  function click(event) {
    dispatch("serviceAction", {
      service
    });
  }
</script>

<g
  id={service.name}
  class="service"
  transform="translate({service.x},{service.y})"
  on:endpointAction
  on:interceptorAction
  on:click={click}>
  <rect width={service.w} height={service.h} rx="4" />
  <text x="8" y="14">{service.name}</text>
  {#each Object.values(service.endpoints) as endpoint}
    <Endpoint {endpoint} />
  {/each}
</g>
