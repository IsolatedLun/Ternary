<script lang="ts">
	import { emailValidator } from '../../../utils/inputValidators';
	import Button from '../../../components/Interactibles/Button.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { login, setTokens } from '../../../services/authFetchers';
	import { userState } from '../../../stores/userStore/userStore';
	import { goto } from '$app/navigation';
	import type { Props_LoginData } from './types';
	import { goBack } from '../../../stores/locationStore/_funcs';
	import { locationState } from '../../../stores/locationStore/locationStore';

	function handleLogin() {
		login(loginData).then((data) => {
			setTokens(data.tokens);
			userState.set({ user: data.user, isLogged: true });

			goto(goBack($locationState.history));
		});
	}

	const loginData: Props_LoginData = {
		email_address: '',
		password: ''
	};
</script>

<section class="[ ]" data-grid-collapse>
	<div>
		<form>
			<h2 class="[ text-center margin-block-end-2 fw-normal ]">Login</h2>
			<Card variant="difference" cubeClass={{ utilClass: 'padding-2 flex-direction-column gap-2' }}>
				<TextInput
					bind:value={loginData.email_address}
					validators={[emailValidator()]}
					placeholder="Enter email address"
					label="Email address"
					type="email"
				/>
				<TextInput
					bind:value={loginData.password}
					placeholder="Enter password"
					type="password"
					label="Password"
				/>
			</Card>
			<a class="[ margin-block-2 display-inline-block ]" href="/auth/signup"
				>Don't have an account?</a
			>
			<Button
				variant="primary"
				on:click={handleLogin}
				cubeClass={{ utilClass: 'margin-block-start-1 width-100' }}>Login</Button
			>
		</form>
	</div>
</section>
