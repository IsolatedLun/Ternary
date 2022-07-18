<script lang='ts'>
    import type { Props_CubeCSS } from "../../../types";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";
    import type { Props_Profile } from "./types";

    export let props: Props_Profile = {
        src: '',
        alt: 'An image'
    }
    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, { 
        compostClass: 'profile',
    });
</script>

<div class={_class}>
    <img 
        class="[ border-radius-100vw ]"
        src={props.src} 
        alt={props.alt} />
</div>