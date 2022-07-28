<script lang="ts">
	import type { Props_CubeCSS } from 'src/types';
	import { rand } from '../../../utils/generalFuncs';
	import { onMount } from 'svelte';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import type { Props_Profile } from '../Profile/types';

	onMount(() => {
		_this.addEventListener('error', () => {
			_this.setAttribute('data-media-error', 'true');
		});

		if (useRandFilter) {
			_this.style.filter = `
                hue-rotate(${rand(364)}deg) 
                sepia(${rand(100) / 100}) 
                saturate(${rand(3.5)})`;
		}
	});

	export let props: Props_Profile = {
		src: '',
		alt: ''
	};
	export let cubeClass: Props_CubeCSS = defCubeClass();
	export let useRandFilter = false;

	const _class = createCubeCSSClass(cubeClass, {});
	let _this: HTMLImageElement;
	let isTooSmall = false;
</script>

<img
	bind:this={_this}
	loading="lazy"
	class={_class}
	src={props.src}
	alt={props.alt}
	data-media-error="false"
	data-small={false}
/>
