<script lang="ts">
	import Profile from '../../components/Modules/Profile/Profile.svelte';
	import FlexyCenter from '../../components/Divs/FlexyCenter.svelte';
	import Card from '../../components/Modules/Card/Card.svelte';
	import Icon from '../Modules/Icon/Icon.svelte';
	import { ICON_BARS, ICON_HOME } from '../../consts';
	import LinkButton from '../Interactibles/LinkButton.svelte';
	import { userState } from '../../stores/userStore/userStore';
	import TextInput from '../Interactibles/Input/TextInput.svelte';
	import Button from '../Interactibles/Button.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		_thisToggler.addEventListener('click', () => {
			_thisDropdown.removeAttribute('data-hide');
			_thisNavbar.setAttribute('data-dropdown-state', '');

			_thisDropdown.focus();
		});

		_thisDropdown.addEventListener('focusout', () => {
			_thisDropdown.setAttribute('data-hide', '');
			_thisNavbar.removeAttribute('data-dropdown-state');
		});
	});

	const { isLogged, user } = $userState;

	let _thisToggler: HTMLElement;
	let _thisDropdown: HTMLElement;
	let _thisNavbar: HTMLElement;
</script>

<nav
	class="[ main-navbar ] [ flex align-items-center gap-2 padding-inline-2 padding-block-small ]"
	bind:this={_thisNavbar}
>
	<FlexyCenter cubeClass={{ utilClass: 'flex-grow' }}>
		<a class="[ fs-600 fw-normal ]" href="/" data-variant="default">Ternary</a>
		<TextInput cubeClass={{ utilClass: 'fs-350 width-100' }} placeholder={'Enter search'} />
	</FlexyCenter>

	<div data-desktop>
		<FlexyCenter>
			<LinkButton to="/" variant="icon-block"><Icon>{ICON_HOME}</Icon></LinkButton>

			{#if isLogged}
				<Card cubeClass={{ utilClass: 'flex gap-2 margin-inline-start-auto fs-300 padding-1' }}>
					<div>
						<p>{user.username}</p>
						<p class="[ fs-300 clr-text-muted ]">{user.honor} honor</p>
					</div>
					<Profile props={{ src: user.profile, alt: 'Your profile' }} />
				</Card>
			{:else}
				<LinkButton variant="primary-difference">Login</LinkButton>
				<LinkButton variant="primary">Sign up</LinkButton>
			{/if}
		</FlexyCenter>
	</div>

	<div data-mobile>
		<Button bind:self={_thisToggler} variant="icon-block">
			<Icon>{ICON_BARS}</Icon>
		</Button>
	</div>

	<div
		class="[ navbar__dropdown ] [ card ] [ padding-2 ]"
		data-variant="difference"
		data-hide
		tabindex="-1"
		bind:this={_thisDropdown}
	>
		<ul class="[ dropdown__list ] [ flex-direction-column gap-1 place-items-center text-center ]">
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
		</ul>
	</div>
</nav>
