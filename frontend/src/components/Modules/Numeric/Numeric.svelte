<script lang="ts">
	export let tag = 'span';
	export let num: string | number = '0';

	let strNum = String(num);
	let intNum = Math.abs(Number(strNum));
</script>

<svelte:element this={tag} aria-label={strNum}>
	{#if intNum >= 1000000}
		{strNum[0]}.{strNum.substring(0, 2)}M
	{:else if intNum >= 100000}
		{strNum.substring(0, 3)}.{strNum.substring(3, 5)}k
	{:else if intNum >= 10000}
		{strNum.substring(0, 2)}.{strNum.substring(2, 4)}k
	{:else if intNum >= 1000}
		{strNum[0]}.{strNum.substring(1, 3)}k
	{:else}
		{strNum}
	{/if}
</svelte:element>
