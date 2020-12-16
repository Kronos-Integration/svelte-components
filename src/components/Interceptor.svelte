<script>
  import { setContext } from "svelte";
  import { INTERCEPTOR } from "../util.mjs";
  import { getAttributes } from "model-attributes";

  export let interceptor;
  export let cx;
  export let cy;
  setContext(INTERCEPTOR, interceptor);

  function click() {
    let atts = getAttributes(interceptor, interceptor.configurationAttributes);
    const str =
      `${interceptor.type}\n` +
      Object.entries(atts)
        .map(([k, v]) => `${k}: ${v}`)
        .join("\n");

    alert(str);
  }
</script>

<circle class="interceptor" {cx} {cy} r="5" on:click={click} />
