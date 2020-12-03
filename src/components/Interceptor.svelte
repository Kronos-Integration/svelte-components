<script>
  export let interceptor;
  export let cx;
  export let cy;

  function click() {
    alert(JSON.stringify(interceptor.toJSON()));
  }
</script>

<circle class="interceptor" {cx} {cy} r="5" on:click={click} />
