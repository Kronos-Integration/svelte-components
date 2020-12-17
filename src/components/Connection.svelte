<script>
  export let from;
  export let to;

  function connectionPath(from, to) {
    const fx = from.x + from.owner.x;
    const fy = from.y + from.owner.y;
    const tx = to.x + to.owner.x;
    const ty = to.y + to.owner.y;

    return `M${fx} ${fy}H${fx+from.rx}V${ty}H${tx + 2}`;
  }
</script>

<path
  class="connection"
  d={connectionPath(from, to)}
  marker-end="url(#arrow)"
  marker-start="url(#dot)" />
