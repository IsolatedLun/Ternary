<script lang="ts">
	import type { Props_CubeCSS } from 'src/types';

	import { createCubeCSSClass, defCubeClass } from '../../../../utils/componentFuncs';

	export let variant = 'default';
	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let useHover = true;

	const _class = createCubeCSSClass(
		{
			blockClass: 'dropdown__item',
			compostClass: useHover ? 'hoverable' : '',
			utilClass: `clr-text-400 fs-400 ${
				variant === 'default' ? 'padding-block-1 padding-inline-3' : '[  ]'
			} border-radius-cubed cursor-pointer`
		},
		cubeClass
	);
</script>

<li class={_class} data-variant={variant} on:click>
	<slot />
</li>
