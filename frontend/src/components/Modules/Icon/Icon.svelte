<script lang="ts">
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let ariaLabel = 'An icon';

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: 'icon'
	});
</script>

<p class={_class} aria-label={ariaLabel} aria-hidden="true">
	<slot />
</p>
