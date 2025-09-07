<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import Selection from './Selection.svelte';
</script>
<!-- <div class="scene-grid"> -->
  <div class="scene-container">
    <Canvas>
      <Scene />
    </Canvas>
  </div>
<!-- </div> -->
<div class="selection">
  <Selection/>
</div>

<style>
  .selection {
    color: black;
  }
  /* .scene-grid {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-template-rows: auto auto auto;
    /* height: 800px;
  } */

  .scene-container {
    /* display: grid; */
    align-content: center;
    height: 90vh;
  }
  
  @media (max-width: 600px) {  /* Dimensjoner for mobil-skjerm */
    /* .scene-grid {
      height: 600px;
    } */
  }
</style>
