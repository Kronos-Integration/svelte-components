<script>
  import { setContext } from "svelte";
  import { SERVICE } from "../util.mjs";
  import Endpoint from "./Endpoint.svelte";
  import ServicePopup from "./ServicePopup.svelte";

  export let service;

  setContext(SERVICE, service);

  function clickService(event) {

  }

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
  <rect width={service.w} height={service.h} rx="4" />
  <text x="8" y="14">{service.name}</text>
  {#each Object.values(service.endpoints) as endpoint}
    <Endpoint {endpoint} />
  {/each}
</g>
