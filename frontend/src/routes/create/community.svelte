<script lang="ts">
	import NumberedListCard from '../../components/Modules/Card/NumberedListCard.svelte';
	import Miscellaneuos from '../../components/Modules/Miscellaneuos/Miscellaneuos.svelte';
	import Button from '../../components/Interactibles/Button.svelte';
	import ImageInput from '../../components/Interactibles/Input/ImageInput.svelte';
	import TextArea from '../../components/Interactibles/Input/TextArea.svelte';
	import TextInput from '../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../components/Modules/Card/Card.svelte';
	import { COMMUNITY_CREATION_RULES } from '../../consts';
	import type { Props_CreateCommunityData, Props_HandledError } from '../../services/types';
	import { isImage, minLenValidator, useForm, validInputs } from '../../utils/inputValidators';
	import { createCommunity } from '../../services/communityFetchers';
	import ErrorCard from '../../components/Modules/Card/ErrorCard.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { Props_FormHook } from '../../utils/types';

	onMount(() => {
		form = useForm(_thisForm);
	});

	function handleAddProfile(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.files && isImage(target.files[0])) data.profile = target.files[0];
	}

	function handleAddBanner(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.files && isImage(target.files[0])) data.banner = target.files[0];
	}

	function handleCreateCommunity() {
		if (form.validateForm()) {
			createCommunity(data)
				.then((res: any) => goto('/communities/' + res.id))
				.catch((err: Props_HandledError) => {
					errorText = err.detail;
				});
		}
	}

	const data: Props_CreateCommunityData = {
		name: '',
		about: '',

		profile: null,
		banner: null
	};

	let _thisForm: HTMLFormElement;
	let errorText = '';

	let form: Props_FormHook;
</script>

<section class="[ feed ] [ grid ]" data-grid-collapse>
	<form bind:this={_thisForm} on:submit|preventDefault={handleCreateCommunity}>
		<h2 class="[ text-center margin-block-end-1 fw-normal ]">Create a Community</h2>

		{#if errorText}
			<ErrorCard>
				<p>{errorText}</p>
			</ErrorCard>
		{/if}

		<Card cubeClass={{ utilClass: 'flex-direction-column gap-2 padding-2' }} variant="difference">
			<TextInput
				label="Name"
				placeholder="Enter name"
				bind:value={data.name}
				validators={[minLenValidator(2)]}
			/>
			<ImageInput label="Profile" on:input={handleAddProfile} />
			<ImageInput label="Banner" secondaryVariant="image-banner" on:input={handleAddBanner} />
			<TextArea label="About" placeholder="Enter group description" bind:value={data.about} />
		</Card>
		<Button
			submit={true}
			cubeClass={{ utilClass: 'width-100 margin-block-start-2' }}
			variant="primary-difference">Create</Button
		>
	</form>

	<Miscellaneuos>
		<NumberedListCard title="How to make a community" items={COMMUNITY_CREATION_RULES} />
	</Miscellaneuos>
</section>
