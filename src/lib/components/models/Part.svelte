<script lang="ts">
    import { T } from '@threlte/core'
    import type { Mesh, CanvasTexture} from "three";
    import {selectionStore} from "../../../stores/stores";

    export let mesh: Mesh;
    export let normalMap: CanvasTexture ;
    
    const bodyColor: string = "#ffc0b3";
    const selectionColor: string = "#fe7358";
    const hoverColor: string = "#fff2eb";
    
    let color: string = bodyColor;

    function pointerup(e: any) {
        if (e.nativeEvent.button == 0) {
            if ($selectionStore == e.object.name)
            {
                $selectionStore = null;
            }
            else {
                $selectionStore = e.object.name;
            }
        }

        e.stopPropagation();
    }
    
    function pointerEnter(e:any) {
        color = hoverColor;
        e.stopPropagation();
    }

    function pointerLeave(e:any) {
        color = bodyColor;
        e.stopPropagation();
    }
</script>

  <T.Mesh geometry={mesh.geometry} name={mesh.name}
    on:pointerenter={pointerEnter}
    on:pointerleave={pointerLeave}
    on:pointerup={pointerup}>
    
    <T.MeshStandardMaterial {normalMap} color={$selectionStore == mesh.name ? selectionColor : color}/>
  </T.Mesh>    

