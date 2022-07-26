<script lang="ts">
	import type { Props_CubeCSS } from '../../../types';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';

	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let text = '';
	export let type = '';

	const _class = createCubeCSSClass(cubeClass, {
		utilClass:
			type === 'error' ? 'clr-downvote-400' : type === 'warn' ? 'clr-warn-400' : 'clr-text-muted'
	});
</script>

<p class={_class}>
	{text}
</p>
