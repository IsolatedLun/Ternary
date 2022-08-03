<script lang="ts">
	import { VIDEO_PAUSE_THRESHOLD } from '../../../consts';

	import type { Props_CubeCSS } from '../../../types';
	import { onMount } from 'svelte';
	import { createCubeCSSClass, defCubeClass } from '../../../utils/componentFuncs';
	import type { Props_Video } from './types';

	onMount(() => {
		_this.addEventListener('error', () => {
			_this.setAttribute('data-media-error', 'true');
		});

		const observer = new IntersectionObserver(observeVideo, {
			root: null,
			threshold: VIDEO_PAUSE_THRESHOLD
		});
		observer.observe(_this);
	});

	function observeVideo(e: IntersectionObserverEntry[]) {
		if (!e[0].isIntersecting) _this.pause();
	}

	export let props: Props_Video = {
		src: ''
	};
	export let cubeClass: Props_CubeCSS = defCubeClass();

	const _class = createCubeCSSClass(cubeClass, {});
	let _this: HTMLVideoElement;
</script>

<video
	bind:this={_this}
	class={_class}
	type="video/mp4"
	src={props.src}
	controls
	data-media-error="false"
>
	<track kind="captions" />
</video>
