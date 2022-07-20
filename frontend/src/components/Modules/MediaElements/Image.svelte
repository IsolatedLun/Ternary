<script lang='ts'>
    import type { Props_CubeCSS } from "src/types";
    import { onMount } from "svelte";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";
    import type { Props_Profile } from "../Profile/types";

    onMount(() => {
        _this.addEventListener('error', () => {
            _this.setAttribute('data-media-error', 'true')
        })
    })

    export let props: Props_Profile = {
        src: '',
        alt: ''
    };
    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {});
    let _this: HTMLElement;
</script>

<img 
    class={_class} 
    src={props.src} 
    alt={props.alt} 
    bind:this={_this}
    data-media-error='false' />