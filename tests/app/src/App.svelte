<script>
  import { ServiceCanvas, Services } from "../../../src/index.svelte";
  import { data } from "./data.mjs";
</script>

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
              <li>{interceptor.type} ${JSON.stringify(interceptor.toJSON())}</li>
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

{#await Services.initialize(data)}
  waiting...
{:then services}
  <ServiceCanvas {services} />
{:catch e}
  Error
  {e}
{/await}
