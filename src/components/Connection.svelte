<script>
  export let from;
  export let to;

  function connectionPath(from, to) {
    return `M 0 0H${from.rx}V${to.owner.y + to.y - (from.owner.y + from.y)}H2`;
  }
</script>

<path
  class="connection"
  d={connectionPath(from, to)}
  marker-end="url(#arrow)"
  marker-start="url(#dot)" />
