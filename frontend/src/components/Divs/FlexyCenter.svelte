<script lang="ts">
	import type { Props_CubeCSS } from '../../types';
	import { createCubeCSSClass, defCubeClass } from '../../utils/componentFuncs';
	import type { Props_FlexyCenter } from './types';

	export let props: Props_FlexyCenter = {
		gap: 2
	};
	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let useJustify = true;
	export let useColumn = false;
	export let useAlign = true;

	const _class = createCubeCSSClass(cubeClass, {
		compostClass: `${useColumn ? 'flex-direction-column' : 'flex'} gap-${props.gap} ${
			useAlign ? 'align-items-center' : ''
		} ${useJustify ? 'justify-content-center' : ''}`
	});
</script>

<div class={_class}>
	<slot />
</div>
