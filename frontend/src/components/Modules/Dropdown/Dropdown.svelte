<script lang="ts">
	import { onMount } from 'svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';

	onMount(() => {
		_this.addEventListener('focusin', () => {
			_thisSelect.setAttribute('data-dropdown-state', 'true');
		});
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
			id="LOL"
			role="list"
			tabindex="-1"
			data-dropdown-state="false"
			bind:this={_thisSelect}
		>
			<slot name="list" />
		</ul>
	</button>
</FlexyCustom>
