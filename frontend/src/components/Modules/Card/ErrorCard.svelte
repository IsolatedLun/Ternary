<script lang="ts">
	import { ICON_ERROR } from '../../..//consts';
	import { combineCubeClasses, defCubeClass } from '../../..//utils/componentFuncs';
	import Icon from '../Icon/Icon.svelte';
	import Card from './Card.svelte';

	export let cubeClass = defCubeClass();
</script>

<Card
	variant="error"
	cubeClass={combineCubeClasses(cubeClass, {
		utilClass: 'flex gap-2 padding-2 margin-block-1'
	})}
>
	<Icon cubeClass={{ utilClass: 'clr-downvote-500' }}>{ICON_ERROR}</Icon>
	<slot />
</Card>
