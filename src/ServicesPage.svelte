<script>
  let { router } = $props();

  const route = router.route;
  const services = $route.value;
</script>

{#each services as service}{service.name}{/each}
