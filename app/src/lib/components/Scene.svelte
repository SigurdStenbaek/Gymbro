<script lang="ts">
  import { T } from '@threlte/core'
  import Body from "./models/Body.svelte";
  import UnclickableMan from "./models/UnclickableMan.svelte";
  import { ContactShadows, Float, Grid, OrbitControls, interactivity, useGltf, useTexture} from '@threlte/extras'
  import { Texture, RepeatWrapping, MirroredRepeatWrapping, CanvasTexture} from "three";
</script>

<T.PerspectiveCamera
  makeDefault
  position={[0, 0, 8]}
  target={[0, 0, 0]}
  fov={15}
>
  <OrbitControls
    autoRotate
    enableZoom={true}
    enableDamping
    autoRotateSpeed={0}
    rotateSpeed={1}
    target={[0, 1, 0]}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={5.8}
  position={[-10, 10, -10]}
/>
<T.DirectionalLight
  intensity={2.8}
  position={[-10, 10, 10]}
/>

<T.AmbientLight intensity={0.8} />

<UnclickableMan/>

<Body/>


<!-- <ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5} /> -->

  


