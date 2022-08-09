<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		_this.addEventListener('mousemove', (e) => {
			const target = e.currentTarget as HTMLElement;

			const centerX = target.offsetWidth / 2;
			const centerY = target.offsetHeight / 2;
			const x = centerX - e.offsetX;
			const y = centerY - e.offsetY;

			target.style.transform = `
                rotateX(${x * 2 * (x > centerX ? -1 : 1)}deg)
                rotateY(${y * 2 * (x < centerY ? -1 : 1)}deg)
                perspective(500px)
            `;
		});
	});

	let _this: HTMLElement;
</script>

<div class="[ tilter_3d ]" bind:this={_this}>
	<slot />
</div>
