<script lang="ts">
	import { onMount } from 'svelte';

	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let variant = 'default';
	export let tag = 'div';
	export let title = '';

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'card'
	});
</script>

<svelte:element this={tag} class={_class} data-variant={variant}>
	<p class="[ under-border ] [ fs-500 text-center margin-block-end-1 ]">{title}</p>
	<slot />
</svelte:element>
