<script lang="ts">
  import App from '$lib/components/App.svelte';
  import MuscleInfo from '$lib/components/MuscleInfo.svelte';
  import { Drawer } from "flowbite-svelte";
  import { selectionStore } from '../stores/stores';
  import { quintOut } from 'svelte/easing';

  let isOpen = $state(false);
  let isFullscreen = $state(false);
  let dragHeight = $state<number | null>(null);
  let dragStartY = 0;
  let dragStartHeight = 0;
  let hasDragged = false;

  $effect(() => { isOpen = $selectionStore != null; });
  $effect(() => { if (!isOpen) { isFullscreen = false; selectionStore.set(null); } });

  function getBaseHeight(): number {
    return isFullscreen
      ? window.innerHeight - 60
      : window.innerHeight * 0.35;
  }

  function onPointerDown(e: PointerEvent) {
    dragStartY = e.clientY;
    dragStartHeight = getBaseHeight();
    hasDragged = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent) {
    if (!(e.currentTarget as HTMLElement).hasPointerCapture(e.pointerId)) return;
    const delta = dragStartY - e.clientY;
    if (Math.abs(delta) > 5) hasDragged = true;
    dragHeight = Math.max(80, Math.min(window.innerHeight - 60, dragStartHeight + delta));
  }

  function onPointerUp(e: PointerEvent) {
    if (hasDragged) {
      const finalHeight = dragStartHeight + (dragStartY - e.clientY);
      isFullscreen = finalHeight > window.innerHeight * 0.5;
    }
    dragHeight = null;
  }

  function onHandleClick() {
    if (hasDragged) return;
    isFullscreen = !isFullscreen;
  }

  const height = $derived(
    dragHeight != null
      ? `${dragHeight}px`
      : isFullscreen ? 'calc(100dvh - 60px)' : '35vh'
  );

  const transition = $derived(dragHeight != null ? 'none' : 'height 0.42s cubic-bezier(0.32, 0.72, 0, 1)');
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
    style="top: auto; bottom: 50px; height: {height}; transition: {transition}; z-index: 41;"
  >
    <button
      class="w-full flex justify-center pt-3 pb-2 focus:outline-none cursor-grab active:cursor-grabbing touch-none"
      onpointerdown={onPointerDown}
      onpointermove={onPointerMove}
      onpointerup={onPointerUp}
      onclick={onHandleClick}
      aria-label={isFullscreen ? 'Minimer' : 'Utvid'}
    >
      <div class="w-12 h-1.5 rounded-full bg-gray-300"></div>
    </button>

    <div class="px-5 h-full {isFullscreen ? 'overflow-y-auto' : 'overflow-hidden'}">
      <MuscleInfo muscleId={$selectionStore} />
    </div>
  </Drawer>
</div>
<style>
</style>