<script>
  export let request;

  const x = request.endpoint.x;
  const y = request.endpoint.y;
</script>

<text {x} {y}>0</text>
<rect {x} {y} width="5" height="5" />
