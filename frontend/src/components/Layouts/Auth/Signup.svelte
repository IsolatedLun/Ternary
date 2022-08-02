<script lang="ts">
	import { emailValidator, isImage } from '../../../utils/inputValidators';
	import Button from '../../../components/Interactibles/Button.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { goto } from '$app/navigation';
	import ImageInput from '../../../components/Interactibles/Input/ImageInput.svelte';
	import type { Props_SignupData } from './types';
	import { signup } from '../../../services/authFetchers';

	function handleSignUp() {
		signup(signupData).then(() => {
			goto('/auth/login');
		});
	}

	function addImage(e: Event) {
		const target = e.currentTarget as HTMLInputElement;

		if (target.files && isImage(target.files[0])) {
			signupData.profile = target.files[0];
		}
	}

	const signupData: Props_SignupData = {
		email_address: '',
		username: '',
		password: '',
		profile: null
	};
</script>

<section class="[ ]" data-grid-collapse>
	<div>
		<form>
			<h2 class="[ text-center margin-block-end-2 fw-normal ]">Sign up</h2>
			<Card variant="difference" cubeClass={{ utilClass: 'padding-2 flex-direction-column gap-2' }}>
				<TextInput
					bind:value={signupData.email_address}
					validators={[emailValidator()]}
					placeholder="Enter email address"
					label="Email address"
					type="email"
				/>
				<TextInput
					bind:value={signupData.username}
					validators={[]}
					placeholder="Enter username"
					label="Username"
					type="text"
				/>
				<TextInput
					bind:value={signupData.password}
					placeholder="Enter password"
					type="password"
					label="Password"
				/>
				<ImageInput on:input={addImage} label="Profile*" />
			</Card>
			<a class="[ margin-block-2 display-inline-block ]" href="/auth/login"
				>Already have an account?</a
			>
			<Button
				variant="primary"
				on:click={handleSignUp}
				cubeClass={{ utilClass: 'margin-block-start-1 width-100' }}>Sign up</Button
			>
		</form>
	</div>
</section>
