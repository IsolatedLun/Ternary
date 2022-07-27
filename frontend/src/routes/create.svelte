<script lang="ts">
	import {
		minLenValidator,
		urlValidator,
		validInputs,
		videoValidator
	} from '../utils/inputValidators';
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

	function handleCreatePost() {
		let to_send = data;

		if (type === 'media' && mediaType === 'image') {
			to_send = { ...data, content_type: 'image' };
		}

		createPost(to_send);
	}

	function handleForm(e: SubmitEvent) {
		if (validInputs(_thisForm)) handleCreatePost();
	}

	let type = $page.url.searchParams.get('type') ? $page.url.searchParams.get('type') : 'text';
	let data: Props_CreatePost = {
		title: '',
		content: '',
		content_type: ''
	};

	let mediaType = 'image';
	let _thisForm: HTMLFormElement;
</script>

<section class="[ feed ] [ grid ]" data-grid-collapse>
	<form
		class="[ flex-direction-column gap-1 ]"
		bind:this={_thisForm}
		on:submit|preventDefault={handleForm}
	>
		<CreateHeader on:typeChange={(_type) => (type = _type.detail.data)} />

		<Card variant="difference" cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }}>
			<TextInput
				bind:value={data.title}
				placeholder="Enter title"
				label="Title"
				validators={[minLenValidator(7)]}
			/>

			{#if type === 'text'}
				<TextArea
					bind:value={data.title}
					placeholder="Enter Text"
					label="Description"
					validators={[minLenValidator(2)]}
				/>
			{:else if type === 'media'}
				<Select
					options={['Image', 'Video']}
					on:select={(e) => (mediaType = e.detail.value)}
					selectText="Type"
				/>

				{#if mediaType === 'image'}
					<CreateImages on:input={(e) => (data.content = e.detail.images)} />
				{:else}
					<p>// Add video input</p>
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

		<Button submit={true} variant="primary-difference" cubeClass={{ utilClass: 'margin-block-2' }}
			>Post</Button
		>
	</form>

	<Miscellaneuos>
		<Card cubeClass={{ utilClass: 'padding-inline-3 padding-block-1' }} variant="difference">
			<p class="[ under-border ]">How to make a post</p>
		</Card>
	</Miscellaneuos>
</section>
