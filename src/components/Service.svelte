<script>
  import { setContext } from "svelte";
  import { SERVICE } from "../util.mjs";
  import Endpoint from "./Endpoint.svelte";

  export let service;

  setContext(SERVICE, service);

  function clickService(event) {}

  function dragStartService(event) {
    console.log(event);
  }

  function handleMessage(event) {
    console.log("Servide handleMessage", event);
  }
</script>

<g
  id={service.name}
  class="service"
  transform="translate({service.x},{service.y})"
  on:message={handleMessage}
  on:click={clickService}
  on:dragstart={dragStartService}>
  <rect
    class={service.state}
    x="0"
    y="0"
    width={service.w}
    height={service.h}
    rx="5" />
  <text x="8" y="14">{service.name}</text>
  {#each Object.values(service.endpoints) as endpoint}
    <Endpoint {endpoint} />
  {/each}
</g>
