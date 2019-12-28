<script>
  import { ServiceCanvas, normalizeServices } from "../../src/index.svelte";

  let services = normalizeServices({
    s1: {
      endpoints: { e1: {}, e2: {} }
    }
  });
</script>

<ServiceCanvas services={services} />
