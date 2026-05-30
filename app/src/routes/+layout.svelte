<script lang="ts">
  import "../app.css";    
  import { Heading, Footer } from "flowbite-svelte"; 

  const Name = "Gymrat®";
  let { children } = $props();
</script>
    
<svelte:head>
  <title>Gymrat</title>
</svelte:head>

<main>
  <Heading tag="h1" class="bg-white p-4" style="height:75px">{Name}</Heading>
    {@render children()}
  <Footer class="p-4" style="height:60px">
    2026 {Name} All Rights Reserved
  </Footer>	
</main>