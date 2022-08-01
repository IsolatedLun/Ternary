<script lang="ts">
	import { createCubeCSSClass } from '../../../../utils/componentFuncs';

	export let variant = 'default';

	const _class = createCubeCSSClass(
		{
			blockClass: 'dropdown__item',
			compostClass: 'hoverable',
			utilClass: `clr-text-400 fs-400 ${
				variant === 'default' ? 'padding-block-1 padding-inline-3' : '[  ]'
			} border-radius-cubed cursor-pointer`
		},
		{}
	);
</script>

<li class={_class} data-variant={variant} on:click>
	<slot />
</li>
