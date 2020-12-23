<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { INTERCEPTOR } from "../util.mjs";

  export let interceptor;
  export let cx;
  export let cy;
  setContext(INTERCEPTOR, interceptor);

  const dispatch = createEventDispatcher();

  function click(event) {
    dispatch("interceptorAction", {
      interceptor
    });
  }
</script>

<circle class="interceptor" {cx} {cy} r="4" on:click={click} />
