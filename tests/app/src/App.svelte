<script>
  import { writable } from "svelte/store";
  import { onMount } from "svelte";
  import { ServiceCanvas, Services } from "../../../src/index.svelte";
  import { data } from "./data.mjs";

  export const requests = writable({
    endpoint: "service(admin).log",
    arguments: []
  });

  onMount(() => {
    setInterval(() => {
      requests.update(old => {
        return {
          endpoint: "service(admin).log",
          arguments: ["2"]
        };
      });
    }, 500);
  });
</script>


{#await Services.initialize(data)}
  waiting...
{:then services}
  <ServiceCanvas {requests} {services} />
{:catch e}
  Error
  {e}
{/await}


<!--
<ul>
  {#await Services.initialize(data)}
    waiting...
  {:then services}
    {#each Object.values(services.services) as service}
      <li class="service">
        {service.name}
        ({service.type})
        {service.state}
        <ul>
          {#each Object.values(service.endpoints) as endpoint}
            <li>
              {endpoint.name}
              <ul>
                {#each endpoint.interceptors as interceptor}
                  <li>
                    {interceptor.type}
                    ${JSON.stringify(interceptor.toJSON())}
                  </li>
                {/each}
              </ul>
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  {:catch e}
    Error
    {e}
  {/await}
</ul>
-->