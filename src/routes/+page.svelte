<script lang="ts">
  import App from '$lib/components/App.svelte';
  import { Drawer } from "flowbite-svelte";
  import { selectionStore } from '../stores/stores';
  import { quintOut } from 'svelte/easing';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let isOpen = $state(false);
  let isFullscreen = $state(false);
  let currentHeight = $state('35vh');
  let isDragging = $state(false);
  let dragStartY = 0;
  let dragStartHeightPx = 0;

  const SNAP_THRESHOLD = 80;

  let selectedPart = $derived(
    data.body.parts.find(p => p.id === $selectionStore) ?? null
  );

  $effect(() => { isOpen = $selectionStore != null; });
  $effect(() => {
    if (!isOpen) { isFullscreen = false; currentHeight = '35vh'; selectionStore.set(null); }
  });

  function onPointerDown(e: PointerEvent) {
    dragStartY = e.clientY;
    dragStartHeightPx = isFullscreen ? window.innerHeight - 60 : window.innerHeight * 0.35;
    isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!isDragging) return;
    const delta = e.clientY - dragStartY;
    const newH = Math.max(60, Math.min(window.innerHeight - 60, dragStartHeightPx - delta));
    currentHeight = `${newH}px`;
  }

  function onPointerUp(e: PointerEvent) {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.clientY - dragStartY;
    if (delta > SNAP_THRESHOLD) {
      if (isFullscreen) { isFullscreen = false; currentHeight = '35vh'; }
      else isOpen = false;
    } else if (delta < -SNAP_THRESHOLD) {
      isFullscreen = true;
      currentHeight = 'calc(100dvh - 60px)';
    } else {
      currentHeight = isFullscreen ? 'calc(100dvh - 60px)' : '35vh';
    }
  }

  function onHandleClick() {
    isFullscreen = !isFullscreen;
    currentHeight = isFullscreen ? 'calc(100dvh - 60px)' : '35vh';
  }
</script>

<div>
  <App />

  <Drawer
    placement="bottom"
    bind:open={isOpen}
    modal={false}
    dismissable={false}
    width="full"
    transitionParams={{ duration: 450, y: 400, easing: quintOut }}
    class="rounded-t-2xl p-0 overflow-hidden"
    style="top: auto; bottom: 50px; height: {currentHeight}; z-index: 41; transition: {isDragging ? 'none' : 'height 0.3s ease'};"
  >
    <div
      class="h-full flex flex-col touch-none {isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}"
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onpointercancel={onPointerUp}
    >
      <button
        class="w-full flex justify-center pt-3 pb-2 focus:outline-none"
        onclick={onHandleClick}
        aria-label={isFullscreen ? 'Minimer' : 'Utvid'}
      >
        <div class="w-12 h-1.5 rounded-full bg-gray-300"></div>
      </button>

    <div class="px-5 overflow-hidden pb-6">
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
    </div>
  </Drawer>

  {#if isOpen}
    <div style="position: fixed; bottom: 50px; left: 0; right: 0; height: 10px; background: white; z-index: 40;"></div>
  {/if}
</div>
<style>
</style>
