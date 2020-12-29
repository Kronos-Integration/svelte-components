<script>
  import { setContext, createEventDispatcher } from "svelte";
  import { INTERCEPTOR } from "../util.mjs";

  export let interceptor;
  export let x;
  export let y;
  setContext(INTERCEPTOR, interceptor);

  const dispatch = createEventDispatcher();

  function click(event) {
    dispatch("interceptorAction", {
      interceptor
    });
  }

  const knownInterceptorTypes = new Set(["live-probe","ctx","ctx-jwt-verify","ctx-body-param" ]);

  const href = knownInterceptorTypes.has(interceptor.type) ? '#' + interceptor.type : "#interceptor"
</script>

<use {href} {x} {y} on:click={click}/>
