<script lang="ts">
	import { onMount } from 'svelte';

	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let tag = 'div';

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'card'
	});
</script>

<svelte:element this={tag} class={_class} data-variant={variant}>
	<slot />
</svelte:element>
