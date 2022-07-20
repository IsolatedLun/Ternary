<script lang='ts'>
    import type { Props_CubeCSS } from "../../../types";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";

    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: 'icon'
    });
</script>

<p class={_class} aria-hidden="true">
    <slot></slot>
</p>