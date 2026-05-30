<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf } from '@threlte/extras'
  import { Mesh } from "three";

  let manPromise = useGltf('/models/Male6.glb');

  function toArray(obj: any): Mesh[] {
    let results = [];
    for (const [key, value] of Object.entries(obj)) {
      if (value instanceof Mesh) results.push(value);
    }
    return results;
  }

  let meshRefs: Record<string, Mesh> = $state({});

  $effect(() => {
    for (const ref of Object.values(meshRefs)) {
      ref.raycast = () => {};
      ref.renderOrder = 0;
    }
  });
</script>

{#await manPromise then gltf}
  {#each toArray(gltf.nodes) as node}
    <T.Mesh
      geometry={node.geometry}
      name={node.name}
      renderOrder={0}
      bind:ref={meshRefs[node.name]}
    >
      <T.MeshStandardMaterial
        normalMap={gltf.materials.Char_Mlp.normalMap}
        color="#ffc0b3"
      />
    </T.Mesh>
  {/each}
{/await}
