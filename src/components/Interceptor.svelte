<script>
  import { setContext } from "svelte";
  import { INTERCEPTOR } from "../util.mjs";

  let { interceptor, x, y, interceptorAction } = $props();

  setContext(INTERCEPTOR, interceptor);

  const knownInterceptorTypes = new Set([
    "live-probe",
    "ctx",
    "ctx-jwt-verify",
    "ctx-body-param"
  ]);

  const href = knownInterceptorTypes.has(interceptor.type)
    ? "#" + interceptor.type
    : "#interceptor";
</script>

<use
  {href}
  {x}
  {y}
  onclick={interceptorAction}
  onkeydown={interceptorAction}
  tabindex="0"
  role="button"
/>
