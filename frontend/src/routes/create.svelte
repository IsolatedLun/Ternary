<script lang="ts">
	import { maxLenValidator, urlValidator } from '../utils/inputValidators';
	import Button from '../components/Interactibles/Button.svelte';
	import TextArea from '../components/Interactibles/Input/TextArea.svelte';
	import TextInput from '../components/Interactibles/Input/TextInput.svelte';
	import Card from '../components/Modules/Card/Card.svelte';
	import Miscellaneuos from '../components/Modules/Miscellaneuos/Miscellaneuos.svelte';
	import CreateHeader from '../components/Layouts/Create/CreateHeader.svelte';
	import { page } from '$app/stores';
	import type { Props_CreatePost } from 'src/services/types';
	import { createPost } from '../services/postFetchers';
	import Select from '../components/Modules/Dropdown/Select.svelte';
	import CreateImages from '../components/Layouts/Create/CreateImages.svelte';
	import MediaInput from '../components/Interactibles/Input/MediaInput.svelte';
	import Log from '../components/Modules/Logs/Log.svelte';
	import type { Props_Log } from '../components/Modules/Logs/types';

	function handleCreatePost(_data: any) {
		createPost(_data);
	}

	let type = $page.url.searchParams.get('type') ? $page.url.searchParams.get('type') : 'text';
	let data: Props_CreatePost = {
		title: '',
		content: '',
		content_type: ''
	};

	let mediaType = 'image';
	let logs: Props_Log[] = [];
</script>

<section class="[ feed ] [ grid ]" data-grid-collapse>
	<div class="[ flex-direction-column gap-1 ]">
		<CreateHeader on:typeChange={(_type) => (type = _type.detail.data)} />
		{mediaType}
		<Card variant="difference" cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }}>
			<TextInput
				bind:value={data.title}
				placeholder="Enter title"
				label="Title"
				validators={[maxLenValidator(7)]}
			/>

			{#if type === 'text'}
				<TextArea bind:value={data.title} placeholder="Enter Text" label="Description" />
			{:else if type === 'media'}
				<Select
					options={['Image', 'Video']}
					on:select={(e) => (mediaType = e.detail.value)}
					selectText="Type"
				/>

				{#if mediaType === 'image'}
					<CreateImages />
				{:else}
					<MediaInput type="video" />
				{/if}
			{:else}
				<TextInput
					bind:value={data.content}
					thenOnInput={() => (data.content_type = 'link')}
					placeholder="Enter URL"
					label="Link"
					validators={[urlValidator()]}
				/>
			{/if}
		</Card>

		<Button
			on:click={() => handleCreatePost(data)}
			variant="primary-difference"
			cubeClass={{ utilClass: 'margin-block-2' }}>Post</Button
		>
	</div>

	<Miscellaneuos>
		<Card cubeClass={{ utilClass: 'padding-inline-3 padding-block-1' }} variant="difference">
			<p class="[ under-border ]">Logs</p>

			<Card
				cubeClass={{ utilClass: 'flex-direction-column gap-1 padding-1 margin-block-1 fs-300' }}
				variant="dark"
			>
				{#each logs as log}
					<Log cubeClass={{ utilClass: 'margin-inline-1' }} {...log} />
				{/each}
			</Card>
		</Card>
	</Miscellaneuos>
</section>
