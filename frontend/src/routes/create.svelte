<script lang="ts">
	import { maxLenValidator, urlValidator } from '../utils/inputValidators';
	import Button from '../components/Interactibles/Button.svelte';
	import TextArea from '../components/Interactibles/Input/TextArea.svelte';
	import TextInput from '../components/Interactibles/Input/TextInput.svelte';
	import Card from '../components/Modules/Card/Card.svelte';
	import Miscellaneuos from '../components/Modules/Miscellaneuos/Miscellaneuos.svelte';
	import CreateHeader from '../components/Layouts/Create/CreateHeader.svelte';
	import { page } from '$app/stores';

	let type = $page.url.searchParams.get('type') ? $page.url.searchParams.get('type') : 'text';
</script>

<section class="[ feed ] [ grid ]" data-grid-collapse>
	<div class="[ flex-direction-column gap-1 ]">
		<CreateHeader on:typeChange={(_type) => (type = _type.detail.data)} />

		{#if type === 'text'}
			<Card variant="difference" cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }}>
				<TextInput placeholder="Enter title" label="Title" validators={[maxLenValidator(7)]} />
				<TextArea placeholder="Enter Text" label="Description" />
			</Card>
		{:else if type === 'media'}
			<Card variant="difference" cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }}>
				<TextInput placeholder="Enter title" label="Title" validators={[maxLenValidator(7)]} />
				<p>// Add media component</p>
			</Card>
		{:else}
			<Card variant="difference" cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }}>
				<TextInput placeholder="Enter title" label="Title" validators={[maxLenValidator(7)]} />
				<TextInput placeholder="Enter URL" label="Link" validators={[urlValidator()]} />
			</Card>
		{/if}

		<Button variant="primary-difference" cubeClass={{ utilClass: 'margin-block-2' }}>Post</Button>
	</div>

	<Miscellaneuos>
		<p>Info about making posts</p>
	</Miscellaneuos>
</section>
