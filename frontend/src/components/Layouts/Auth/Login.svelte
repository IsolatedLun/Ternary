<script>
	import { emailValidator } from '../../../utils/inputValidators';
	import Button from '../../../components/Interactibles/Button.svelte';
	import TextInput from '../../../components/Interactibles/Input/TextInput.svelte';
	import Card from '../../../components/Modules/Card/Card.svelte';

	let email = '';
	let password = '';
</script>

<Card
	tag="form"
	variant="difference"
	cubeClass={{ utilClass: 'padding-2 flex-direction-column gap-2' }}
>
	<TextInput
		bind:value={email}
		validators={[emailValidator()]}
		placeholder="Enter email address"
		type="email"
	/>
	<TextInput bind:value={password} placeholder="Enter password" type="password" />
</Card>

<Button variant="primary" cubeClass={{ utilClass: 'margin-block-start-3 width-100' }}>Login</Button>
