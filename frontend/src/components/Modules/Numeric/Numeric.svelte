<script lang="ts">
	export let tag = 'span';
	export let num: string | number = '0';

	let strNum = String(num);
	let intNum = Math.abs(Number(strNum));
</script>

<svelte:element this={tag} aria-label={strNum}>
	{#if intNum < 1000}
		{strNum}
	{:else if intNum >= 1000}
		{strNum[0]}.{strNum.substring(0, 2)}k
	{:else if intNum >= 1000000}
		{strNum[0]}.{strNum.substring(0, 2)}M
	{/if}
</svelte:element>
