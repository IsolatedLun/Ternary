<script lang='ts'>
    import type { Props_CubeCSS } from "../../types";
    import { createCubeCSSClass, defCubeClass } from "../../utils/componentFuncs";
    import type { Props_GridySplit } from "./types";

    export let props: Props_GridySplit = {
        gap: 2,
        repeat: 2
    };
    export let cubeClass: Props_CubeCSS = defCubeClass();

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: `grid gap-${props.gap} grid-repeater-${props.repeat}` 
    });
</script>

<div class={_class}>
    <slot></slot>
</div>