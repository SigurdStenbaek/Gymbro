<script lang="ts">
  import "../app.css";     

  let { children } = $props();
</script>
    
<svelte:head>
  <title>Gymbro</title>
</svelte:head>

<main class="max-w-2xl mx-auto bg-gray-200">
	<div class="relative grid grid-cols-12 gap-4">
		{@render children()}
	</div>
</main>