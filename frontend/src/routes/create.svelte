<script lang="ts">
	import { minLenValidator, urlValidator, validInputs } from '../utils/inputValidators';
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
	import VideoInput from '../components/Interactibles/Input/VideoInput.svelte';
	import { POST_CREATION_RULES } from '../consts';
	import { goto } from '$app/navigation';

	function handleCreatePost() {
		let toSend = data;

		if (type === 'media' && mediaType === 'image') {
			toSend = { ...data, content: [...data.content], content_type: 'image' };
		} else if (type === 'media' && mediaType === 'video') {
			toSend = { ...data, content_type: 'video' };
		} else if (type === 'link') {
			toSend = { ...data, content_type: 'link' };
		} else {
			toSend = { ...data, content_type: 'text' };
		}

		createPost({ ...toSend, communityId: Number($page.url.searchParams.get('communityId')) }).then(
			(id) => {
				goto('/threads/' + id);
			}
		);
	}

	function handleForm(e: SubmitEvent) {
		if (validInputs(_thisForm) && data.content) handleCreatePost();
	}

	let type = $page.url.searchParams.get('type') ? $page.url.searchParams.get('type') : 'text';
	let data: Props_CreatePost = {
		title: '',
		content_type: '',
		communityId: -1,
		content: null
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
				validators={[minLenValidator(1)]}
			/>

			{#if type === 'text'}
				<TextArea
					bind:value={data.content}
					placeholder="Enter Text"
					label="Description"
					validators={[minLenValidator(1)]}
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
					<VideoInput on:input={(e) => (data.content = e.detail.video)} />
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
			<p class="[ under-border ] [ fs-500 ]">How to make a post</p>

			<!-- svelte-ignore a11y-no-redundant-roles -->
			<ul role="list" class="[ margin-block-start-1 ] [ flow ]">
				{#each POST_CREATION_RULES as info, i}
					<li class="[ card ] [ padding-1 ]" data-variant="dark">
						<span class="[ fw-bold fs-400 ]">{i + 1}.</span>
						{info}
					</li>
				{/each}
			</ul>
		</Card>
	</Miscellaneuos>
</section>
