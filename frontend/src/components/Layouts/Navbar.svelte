<script lang="ts">
	import FlexyCenter from '../../components/Divs/FlexyCenter.svelte';
	import Icon from '../Modules/Icon/Icon.svelte';
	import { ICON_BARS, ICON_HOME } from '../../consts';
	import LinkButton from '../Interactibles/LinkButton.svelte';
	import { userState } from '../../stores/userStore/userStore';
	import TextInput from '../Interactibles/Input/TextInput.svelte';
	import Button from '../Interactibles/Button.svelte';
	import { onMount } from 'svelte';
	import type { Props_User } from '../../types';
	import { createDefaultUser } from '../../stores/_funcs';
	import Dropdown from '../Modules/Dropdown/Dropdown.svelte';
	import DropdownItem from '../Modules/Dropdown/_Parts/DropdownItem.svelte';
	import MobileDropdown from './Navbar/_Parts/MobileDropdown.svelte';
	import NavbarUserRepr from './Navbar/_Parts/NavbarUserRepr.svelte';
	import { logout } from '../../services/authFetchers';

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

	let isLogged = false;
	let user: Props_User = createDefaultUser();

	userState.subscribe((data) => {
		isLogged = data.isLogged;
		user = data.user;
	});

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
				<Dropdown>
					<div slot="toggler">
						<NavbarUserRepr {user} />
					</div>
					<svelte:fragment slot="list">
						<DropdownItem variant="inline"><a href="/" data-variant="">My profile</a></DropdownItem>
						<DropdownItem
							variant="inline"
							useHover={false}
							cubeClass={{ utilClass: 'margin-block-start-2' }}
						>
							<Button on:click={logout} secondaryVariant="downvote">Log out</Button>
						</DropdownItem>
					</svelte:fragment>
				</Dropdown>
			{:else}
				<LinkButton variant="primary-difference" to="/auth/login">Login</LinkButton>
				<LinkButton variant="primary" to="/auth/signup">Sign up</LinkButton>
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
		<!-- svelte-ignore a11y-no-redundant-roles -->
		<ul
			role="list"
			class="[ dropdown__list ] [ flex-direction-column gap-1 place-items-center text-center ]"
		>
			<MobileDropdown {isLogged} {user} />
		</ul>
	</div>
</nav>
