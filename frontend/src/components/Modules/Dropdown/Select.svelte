<script lang="ts">
	import { ICON_CARET_DOWN } from '../../../consts';
	import { createEventDispatcher, onMount } from 'svelte';
	import Icon from '../Icon/Icon.svelte';
	import FlexyCustom from '../../../components/Divs/FlexyCustom.svelte';
	import { isOnMobile } from '../../../utils/generalFuncs';

	onMount(() => {
		_this.addEventListener('focusout', () => _thisSelect.setAttribute('data-hide', ''));
		_this.addEventListener('focusin', () => {
			if (isOnMobile()) {
				_thisSelect.style.transform = 'translate(-4rem)';
			}
			_thisSelect.removeAttribute('data-hide');
		});

		selected = options[0];
	});

	function setSelect(val: string) {
		selected = val;

		dispatchSelect(val);
		_this.blur();
	}

	function dispatchSelect(val: string) {
		dispatch('select', {
			value: val.toLowerCase()
		});
	}

	let _this: HTMLElement;
	let _thisSelect: HTMLElement;
	let selected: string = '';
	let dispatch = createEventDispatcher();

	export let options: string[] = ['Select'];
	export let selectText: string = 'Choose';
</script>

<FlexyCustom align="center">
	<p class="[ fs-350 whitespace-nowrap text-muted ]">{selectText}:</p>
	<button
		class="[ dropdown button ] [ pos-relative text-muted border-radius-100vw ]"
		data-variant="select"
		bind:this={_this}
	>
		<span class="[ clr-blue-400 flex gap-1 fw-bold  ]">
			{selected}
			<Icon>{ICON_CARET_DOWN}</Icon>
		</span>

		<!-- svelte-ignore a11y-no-redundant-roles -->
		<ul
			class="[ dropdown__items ] [ card ] [ pos-absolute padding-1 z-index-999 ]"
			data-variant="difference"
			data-hide=""
			role="list"
			bind:this={_thisSelect}
		>
			{#each options as option}
				<li
					class="[ hoverable ] [ fs-400 padding-block-1 padding-inline-3 border-radius-cubed 
                    cursor-pointer ]"
					on:click={() => setSelect(option)}
				>
					{option}
				</li>
			{/each}
		</ul>
	</button>
</FlexyCustom>
