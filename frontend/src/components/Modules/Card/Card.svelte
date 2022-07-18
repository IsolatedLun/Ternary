<script lang='ts'>
import { onMount } from "svelte";

    import type { Props_CubeCSS } from "../../../types";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";

    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: 'card'
    });
</script>

<div class={_class}>
    <slot></slot>
</div>