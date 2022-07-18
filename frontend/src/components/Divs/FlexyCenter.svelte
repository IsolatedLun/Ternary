<script lang='ts'>
    import type { Props_CubeCSS } from "../../types";
    import { createCubeCSSClass, defCubeClass } from "../../utils/componentFuncs";
    import type { Props_FlexyCenter } from "./types";

    export let props: Props_FlexyCenter = {
        gap: 2,
    };
    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: `flex gap-${props.gap} align-items-center flex-justify-content-center` 
    });
</script>

<div class={_class}>
    <slot></slot>
</div>