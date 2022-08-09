<script lang="ts">
	import UserRepr from '../../../../components/Modules/User/UserRepr.svelte';
	import type { Props_User } from 'src/types';
	import { createDefaultUser } from '../../../../utils/defaultCreates';

	export let isLogged = false;
	export let user: Props_User = createDefaultUser();
</script>

{#if isLogged}
	{#if user}
		<UserRepr {user} />
	{/if}
	<li class="[ width-100 ]">
		<a
			href={`/users/${user.id}`}
			class="[ hoverable ] [ width-100 padding-block-1 padding-inline-2 fw-500 border-radius-100vw ]"
			data-variant="">My profile</a
		>
	</li>
	<li class="[ width-100 ]" />
{:else}
	<li class="[ width-100 ]">
		<a
			href="/"
			class="[ hoverable ] [ width-100 padding-block-1 padding-inline-2 fw-500 border-radius-100vw ]"
			data-variant="">Login</a
		>
	</li>
	<li class="[ width-100 ]">
		<a
			href="/"
			class="[ hoverable ] [ width-100 padding-block-1 padding-inline-2 fw-500 border-radius-100vw ]"
			data-variant="">Sign up</a
		>
	</li>
{/if}
