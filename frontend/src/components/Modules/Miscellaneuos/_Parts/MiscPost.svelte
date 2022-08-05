<script lang="ts">
	import FlexyCustom from '../../../../components/Divs/FlexyCustom.svelte';
	import { createDefaultUser } from '../../../../stores/_funcs';

	import type { Props_MiscPost } from '../types';

	export let props: Props_MiscPost = {
		id: 0,
		votes: 0,
		title: '',

		user: createDefaultUser()
	};
</script>

<FlexyCustom align="center" cubeClass={{ blockClass: 'misc__post' }}>
	<a
		class="[ hoverable ] [ padding-1 flex align-items-center gap-1 border-radius-cubed ]"
		data-hover-variant="light"
		data-variant=""
		href={`/threads/${props.id}`}
	>
		<p
			class="[ post__votes padding-1 border-radius-cubed ] [ fs-350 ]"
			data-color-scheme={props.votes > 0 ? 'upvote' : 'downvote'}
		>
			{props.votes}
		</p>
		<p class="[ post__title ] [ text-elliptic ] [ fs-300 ]">
			{props.title}
		</p>
	</a>
	<p class="[ text-elliptic ] [ fs-350 ]">
		- <a href={`/users/${props.user.id}`}>{props.user.username}</a>
	</p>
</FlexyCustom>
