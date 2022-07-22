<script lang='ts'>
    import { ICON_ERROR } from "../../../consts";
    import LinkButton from "../../../components/Interactibles/LinkButton.svelte";
    import Card from "../Card/Card.svelte";
    import Icon from "../Icon/Icon.svelte";

    export let err: string = 'Something went wrong.';
</script>

<div class="[ general-error ] [ flex-direction-column align-items-center justify-content-center gap-3 ]">
    <div class="[ text-center flow ]">
        <Icon cubeClass={{ utilClass: 'fs-800 clr-downvote-400' }}>{ ICON_ERROR }</Icon>
        <p class="[ text-muted fs-600 ]">An Error Occurred.</p>
    </div>
    
    <Card cubeClass={{ utilClass: 'padding-2 clr-downvote-400' }} variant='difference'>
        { err }
    </Card>

    <LinkButton variant='primary'>Go back</LinkButton>
</div>