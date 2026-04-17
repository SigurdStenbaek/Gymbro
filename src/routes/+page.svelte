<script lang="ts">
  import App from '$lib/components/App.svelte';
  import { Drawer } from "flowbite-svelte";
  import { selectionStore } from '../stores/stores';
  import { quintOut } from 'svelte/easing';

  let isOpen = $state(false);
  let isFullscreen = $state(false);

  $effect(() => { isOpen = $selectionStore != null; });
  $effect(() => { if (!isOpen) { isFullscreen = false; selectionStore.set(null); } });

  function onHandleClick() { isFullscreen = !isFullscreen; }
</script>

<div>
  <App />

  <Drawer
    placement="bottom"
    bind:open={isOpen}
    modal={false}
    width="full"
    transitionParams={{ duration: 450, y: 400, easing: quintOut }}
    class="rounded-t-2xl p-0 overflow-hidden"
    style="top: auto; bottom: 50px; height: {isFullscreen ? 'calc(100dvh - 60px)' : '35vh'}; z-index: 41;"
  >
    <button
      class="w-full flex justify-center pt-3 pb-2 focus:outline-none cursor-grab active:cursor-grabbing"
      onclick={onHandleClick}
      aria-label={isFullscreen ? 'Minimer' : 'Utvid'}
    >
      <div class="w-12 h-1.5 rounded-full bg-gray-300"></div>
    </button>

    <div class="px-5 overflow-y-auto h-full">
      <h2 class="text-xl font-bold text-gray-900">{$selectionStore}</h2>

      <p class="text-gray-500 text-sm mt-2">Valgt muskelgruppe</p>
    </div>
  </Drawer>
</div>
<style>
</style>
