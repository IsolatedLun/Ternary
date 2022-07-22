<script lang='ts'>
    import type { Props_CubeCSS } from "../../../types";
    import { createCubeCSSClass, defCubeClass } from "../../../utils/componentFuncs";

    export let cubeClass: Props_CubeCSS = defCubeClass();
    export let variant = 'default';
    export let secondaryVariant = 'default';
    export let placeholder = 'Enter text';

    const _class = createCubeCSSClass(cubeClass, {
        compostClass: 'input' 
    });
</script>

<input 
    on:input class={_class} 
    data-variant={variant} 
    data-secondary-variant={secondaryVariant}
    
    placeholder={placeholder}
    type='text' />