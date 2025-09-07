<script lang="ts">
  import App from '$lib/components/App.svelte'
</script>

<div class="viewport">
  <App />
</div>

<style>
  .viewport {
    height: 100%;
  }

  :global(body) {
    margin: 0;
    background: #eeeeee;
  }
  :global(canvas) {
    height: 200%;
  }
</style>
