<script>
	import { emailValidator } from '../../../utils/inputValidators';
	import Button from '../../../components/Interactibles/Button.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';
	import { login, setTokens } from '../../../services/authFetchers';
	import { userState } from '../../../stores/userStore/userStore';

	function handleLogin() {
		login({ email_address: email, password }).then((data) => {
			setTokens(data.tokens);
			userState.set({ user: data.user, isLogged: true });

			location.href = '/';
		});
	}

	let email = '';
	let password = '';
</script>

<Card variant="difference" cubeClass={{ utilClass: 'padding-2 flex-direction-column gap-2' }}>
	<TextInput
		bind:value={email}
		validators={[emailValidator()]}
		placeholder="Enter email address"
		type="email"
	/>
	<TextInput bind:value={password} placeholder="Enter password" type="password" />
</Card>

<Button
	variant="primary"
	on:click={handleLogin}
	cubeClass={{ utilClass: 'margin-block-start-3 width-100' }}>Login</Button
>
