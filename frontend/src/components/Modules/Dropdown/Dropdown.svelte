<script lang="ts">
	import { onMount } from 'svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';

	onMount(() => {
		// Fix interactibles elements not firing events.
		// _this.addEventListener('focusout', (e) => _thisSelect.setAttribute('data-hide', ''));
		_this.addEventListener('focusin', () => _thisSelect.removeAttribute('data-hide'));
	});

	let _this: HTMLElement;
	let _thisSelect: HTMLElement;
</script>

<FlexyCustom align="center">
	<button
		class="[ dropdown ] [ pos-relative text-muted cursor-pointer ]"
		data-variant="select"
		bind:this={_this}
	>
		<slot name="toggler" />
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<ul
			class="[ dropdown__items ] [ card ] [ pos-absolute padding-1 z-index-999 ]"
			data-variant="difference"
			data-hide=""
			role="list"
			bind:this={_thisSelect}
		>
			<slot name="list" />
		</ul>
	</button>
</FlexyCustom>
