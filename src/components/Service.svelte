<script>
  import {
    setContext,
    onMount
  } from "svelte";
  import { SERVICE, connectionPath } from "../util.mjs";
  import { makeDraggable } from "../dragging.mjs";
  import Endpoint from "./Endpoint.svelte";

  let { service, serviceAction, endpointAction, interceptorAction } = $props();

  setContext(SERVICE, service);

  let element;

  onMount(() => {
    makeDraggable(element, (x, y) => {
      service.x = x;
      service.y = y;
      for (const [n, endpoint] of Object.entries(service.endpoints)) {
        for (const connection of endpoint.connections()) {
          const c = document.getElementById(
            endpoint.identifier + ":" + connection.identifier
          );
          if (c) {
            c.setAttribute("d", connectionPath(endpoint, connection));
          } else {
            console.log(
              "missing",
              endpoint.identifier + ":" + connection.identifier
            );
          }
        }
      }
    });
  });
</script>

<g
  bind:this={element}
  id={service.name}
  class="service"
  transform="translate({service.x},{service.y})"
  role="button"
  tabindex="0"
  onclick={serviceAction}
  onkeydown={serviceAction}
>
  <rect width={service.w} height={service.h} rx="4" />
  <text x="8" y="14">{service.name}</text>
  {#each Object.values(service.endpoints) as endpoint}
    <Endpoint {endpoint} {endpointAction} {interceptorAction} />
  {/each}
</g>
