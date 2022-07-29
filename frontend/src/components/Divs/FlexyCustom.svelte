<script lang="ts">
	import type { Props_CubeCSS } from '../../types';
	import { createCubeCSSClass, defCubeClass } from '../../utils/componentFuncs';

	export let gap = 1;
	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let useColumn = false;
	export let align = '';
	export let justify = '';
	export let tag = 'div';

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: `${
			useColumn ? 'flex-direction-column' : 'flex'
		} gap-${gap} align-items-${align} justify-content-${justify}`
	});
</script>

<svelte:element this={tag} class={_class}>
	<slot />
</svelte:element>
