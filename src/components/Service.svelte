<script>
  import { setContext, createEventDispatcher, onMount } from "svelte";
  import { SERVICE } from "../util.mjs";
  import { makeDraggable } from "../dragging.mjs";
  import Endpoint from "./Endpoint.svelte";

  export let service;

  setContext(SERVICE, service);

  const dispatch = createEventDispatcher();

  function click(event) {
    dispatch("serviceAction", {
      service
    });
  }

  let element;

  onMount(() => {
    makeDraggable(element,() => {
      console.log("dragged");
    });
  });

</script>

<g
  bind:this={element}
  id={service.name}
  class="service"
  transform="translate({service.x},{service.y})"
  on:click={click}>
  <rect width={service.w} height={service.h} rx="4" />
  <text x="8" y="14">{service.name}</text>
  {#each Object.values(service.endpoints) as endpoint}
    <Endpoint on:endpointAction on:interceptorAction {endpoint} />
  {/each}
</g>
