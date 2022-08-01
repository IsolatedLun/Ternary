<script lang="ts">
	import Card from '../../../../components/Modules/Card/Card.svelte';
	import Numeric from '../../../../components/Modules/Numeric/Numeric.svelte';
	import Profile from '../../../../components/Modules/Profile/Profile.svelte';
	import { API_URL } from '../../../../consts';
	import { createDefaultUser } from '../../../../stores/_funcs';
	import type { Props_User } from '../../../../types';

	export let user: Props_User = createDefaultUser();
</script>

<Card cubeClass={{ utilClass: 'flex gap-2 margin-inline-start-auto fs-300 padding-1' }}>
	<Profile props={{ src: API_URL + user.profile, alt: 'Your profile' }} />
	<div>
		<p>{user.username}</p>
		<p class="[ fs-300 clr-text-muted ]"><Numeric num={user.honor} /> honor</p>
	</div>
</Card>
