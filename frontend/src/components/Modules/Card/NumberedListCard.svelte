<script lang="ts">
	import CardWithHeader from './CardWithHeader.svelte';

	export let title = '';
	export let items: any[] = [];
</script>

<CardWithHeader
	{title}
	cubeClass={{ utilClass: 'padding-inline-3 padding-block-1' }}
	variant="difference"
>
	<!-- svelte-ignore a11y-no-redundant-roles -->
	<ul role="list" class="[ margin-block-start-1 ] [ flow ]">
		{#each items as item, i}
			<li class="[ card ] [ padding-1 ]" data-variant="dark">
				<span class="[ fw-bold fs-400 ]">{i + 1}.</span>
				{item}
			</li>
		{/each}
	</ul>
</CardWithHeader>
