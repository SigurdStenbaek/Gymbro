<script lang="ts">
  import "../app.css";    
  import { Heading, Footer } from "flowbite-svelte"; 

  let { children } = $props();
</script>
    
<svelte:head>
  <title>Gymbro</title>
</svelte:head>

<main>
  <Heading tag="h1" class="bg-white p-4" style="height:75px">GymRat®</Heading>
    {@render children()}
  <Footer class="p-4" style="height:60px">
    2026 GymRat® All Rights Reserved
  </Footer>	
</main>