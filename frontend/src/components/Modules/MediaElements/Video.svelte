<script lang='ts'>
    import type { Props_CubeCSS } from "src/types";
    import { onMount } from "svelte";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";
    import type { Props_Video } from "./types";

    onMount(() => {
        _this.addEventListener('error', () => {
            _this.setAttribute('data-media-error', 'true')
        })
    })

    export let props: Props_Video = {
        src: '',
    };
    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {});
    let _this: HTMLElement;
</script>

<video 
    class={_class} 
    type='video/mp4'
    src={props.src} 
    controls
    
    bind:this={_this} 

    data-media-error='false'
    >
    <track kind="captions" />
</video>