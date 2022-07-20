<script lang='ts'>
    import type { Props_CubeCSS } from "../../types";
    import { createCubeCSSClass, defCubeClass } from "../../utils/componentFuncs";

    export let cubeClass: Props_CubeCSS = defCubeClass();
    export let variant = 'default';
    export let ariaLabel = 'button';
    export let to = '/';

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: 'button fw-bold' 
    });
</script>

<a href={to} on:click class={_class} data-variant={variant} aria-label={ariaLabel}>
    <slot></slot>
</a>