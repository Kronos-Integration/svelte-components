<script>
  import { ServiceCanvas, Services } from "../../src/index.svelte";
  import { data } from "./data.mjs";

  const services = Services.initialize(data);
</script>

<ul>
  {#each services.services as service}
    <li>
      {service.name} ({service.type})
      <ul>
        {#each Object.values(service.endpoints) as endpoint}
          <li>{endpoint.name}</li>
        {/each}
      </ul>
    </li>
  {/each}
</ul>
