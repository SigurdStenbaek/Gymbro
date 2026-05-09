<script lang="ts">
  import App from '$lib/components/App.svelte';
  import { Drawer } from "flowbite-svelte";
  import { selectionStore } from '../stores/stores';
  import { quintOut } from 'svelte/easing';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let isOpen = $state(false);
  let isFullscreen = $state(false);

  let selectedPart = $derived(
    data.body.parts.find(p => p.id === $selectionStore) ?? null
  );

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

    <div class="px-5 overflow-y-auto h-full pb-6">
      <h2 class="text-xl font-bold text-gray-900">{selectedPart?.title ?? $selectionStore}</h2>



      {#if selectedPart && selectedPart.exercises.length > 0}
        <h3 class="text-sm font-semibold text-gray-800 mt-4 mb-1">Exercises</h3>
        <ul class="text-sm text-gray-600 space-y-1">
          {#each selectedPart.exercises as exercise}
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0"></span>
              {exercise}
            </li>
          {/each}
        </ul>
      {/if}

      {#if selectedPart && selectedPart.bodyweightExercises.length > 0}
        <h3 class="text-sm font-semibold text-gray-800 mt-4 mb-1">Without equipment</h3>
        <ul class="text-sm text-gray-600 space-y-1">
          {#each selectedPart.bodyweightExercises as exercise}
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0"></span>
              {exercise}
            </li>
          {/each}
        </ul>
      {/if}

      {#if selectedPart?.description}
        <p class="text-gray-600 text-sm mt-2">{selectedPart.description}</p>
      {/if}

      
    </div>
  </Drawer>
</div>
<style>
</style>
