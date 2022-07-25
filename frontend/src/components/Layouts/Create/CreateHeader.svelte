<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Icon from '../../../components/Modules/Icon/Icon.svelte';
	import { ICON_IMAGE, ICON_LINK, ICON_TEXT } from '../../../consts';

	function handleChangeType(type: string) {
		dispatch('typeChange', { data: type });
	}

	const dispatch = createEventDispatcher();
</script>

<header>
	<nav aria-label="Create post navigation">
		<ul
			role="list"
			class="[ card ] [ flex align-items-center margin-inline-auto width-max-content ]"
			data-variant="dark"
		>
			<li>
				<a
					on:click={() => handleChangeType('text')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=text"
					data-variant="">Text <Icon>{ICON_TEXT}</Icon></a
				>
			</li>
			<li>
				<a
					on:click={() => handleChangeType('media')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=media"
					data-variant="">Media <Icon>{ICON_IMAGE}</Icon></a
				>
			</li>
			<li>
				<a
					on:click={() => handleChangeType('link')}
					class="[ hoverable ] [ flex-align-items-center border-radius-cubed gap-1 padding-2 text-muted ]"
					href="/create?type=link"
					data-variant="">Link <Icon>{ICON_LINK}</Icon></a
				>
			</li>
		</ul>
	</nav>
</header>
