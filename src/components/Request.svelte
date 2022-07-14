<script>
  export let request;

  const owner = request.endpoint.owner;
  const x = owner.x + request.endpoint.x + 20;
  const y = owner.y + request.endpoint.y;
</script>

<g class="request" transform="translate({x},{y})">
  <text y="-6">0</text>
  <rect x="-4" y="-4" width="8" height="8" />
</g>
