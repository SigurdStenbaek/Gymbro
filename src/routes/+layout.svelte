<script lang="ts">
  import "../app.css";     

  let { children } = $props();
</script>
    
<svelte:head>
  <title>Gymbro</title>
</svelte:head>

<main>
	{@render children()}
</main>