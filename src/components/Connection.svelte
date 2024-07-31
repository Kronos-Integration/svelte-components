<script>
  import { connectionPath } from "../util.mjs";
  let { to, from } = $props();
</script>

<path
  id={from.identifier + ":" + to.identifier}
  class="connection"
  d={connectionPath(from, to)}
  marker-end="url(#arrow)"
  marker-start="url(#dot)"
/>
