<script>
  export let router;

  const route = router.route;
</script>

{#each $route as service}{service.name}{/each}
