<script>
  import  {connectionPath} from "../util.mjs";
  export let from;
  export let to;
</script>

<path
  id={from.identifier + ":" + to.identifier}
  class="connection"
  d={connectionPath(from, to)}
  marker-end="url(#arrow)"
  marker-start="url(#dot)" />
