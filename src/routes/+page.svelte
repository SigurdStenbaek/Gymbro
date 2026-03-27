<script lang="ts">
  import App from '$lib/components/App.svelte';
  import { Heading, Footer } from "flowbite-svelte";
  import { fly } from 'svelte/transition';
  import { selectionStore } from '../stores/stores';

  let isOpen = $state(false);
  let isFullscreen = $state(false);

  $effect(() => { isOpen = $selectionStore != null; });
  $effect(() => { if (!isOpen) { isFullscreen = false; selectionStore.set(null); } });

  function onBackdropClick() { isOpen = false; }
  function onDrawerClick() { isFullscreen = !isFullscreen; }
</script>

<div class="col-span-12">
  <Heading tag="h1" class="bg-white p-4" style="height:75px">GymRat</Heading>
  <App />
  <Footer class="p-4" style="height:50px">
    2026 GymRat® All Rights Reserved
  </Footer>
</div>

{#if isOpen}
  <!-- Backdrop -->
  <!-- <button
    class="fixed inset-0 bg-black/30 border-none p-0 cursor-default"
    style="z-index: 40;"
    onclick={onBackdropClick}
    aria-label="Lukk">
  </button> -->

  <!-- Drawer -->
  <div
    role="button"
    tabindex="0"
    transition:fly={{ y: 300, duration: 300 }}
    class="fixed bottom-0 left-0 w-full bg-white rounded-t-xl shadow-lg"
    style="z-index: 41; height: {isFullscreen ? '100vh' : 'auto'}; transition: height 0.3s ease;"
    onclick={onDrawerClick}
    onkeydown={(e) => e.key === 'Enter' && onDrawerClick()}
  >
    <div class="flex justify-center pt-2 pb-1">
      <div class="w-10 h-1.5 rounded-full bg-gray-300"></div>
    </div>
    <p class="p-4">{$selectionStore}</p>
  </div>
{/if}

<style>
</style>
