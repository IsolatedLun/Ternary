<script lang='ts'>
    import { ICON_COMMENTS, ICON_DOWNVOTE, ICON_UPVOTE } from "../../../consts";
    import FlexyCenter from "../../../components/Divs/FlexyCenter.svelte";
    import Button from "../../../components/Interactibles/Button.svelte";
    import Icon from "../Icon/Icon.svelte";
    import Profile from "../Profile/Profile.svelte";
    import Video from "../MediaElements/Video.svelte";
    import PostImages from "./_Parts/PostImages.svelte";
    import LinkButton from "../../../components/Interactibles/LinkButton.svelte";
import UserRepr from "../User/UserRepr.svelte";
import StatController from "../StatController/StatController.svelte";

    export let props: import("./types").Props_Post = {
        user: {
            id: 0,
            honor: 0,
            username: '',
            profile: '',
            date_created: ''         
        },

        id: 0,
        votes: 0,
        comments: 0,
        title: '',
        content: { text: '' },
        content_type: 'text',
        date_created: 'Recently'
    }

    export let isInThread = false;
</script>

<div class="[ post ] [ flex-direction-column justify-content-space-between card padding-1 ]"
    data-variant='difference'
    data-content-type={props.content_type}
    data-in-thread={isInThread}
    >
    <header class="[ under-border ]">
        <FlexyCenter useJustify={false}>
            <UserRepr user={props.user} />
            <p class="[ fs-350 align-self-start text-muted ]">on { props.date_created }</p>
        </FlexyCenter>
        <p class="[ fs-500 ]">{ props.title }</p>
    </header>
    <article class="[ post__content ] [ margin-block-1 hyphens-auto overflow-hidden pos-relative ]">
        {#if 'text' in props.content}
            { props.content.text }
        {:else if 'images' in props.content}
            <PostImages props={{ title: props.title, images: props.content.images }} />
        {:else}
            <Video props={{ src: props.content.video }} />
        {/if}
    </article>
    <footer class="[ flex gap-1 align-items-center justify-content-space-between ] [ margin-block-start-auto upper-border ]">
        <FlexyCenter useJustify={false} props={{ gap: 1 }}>
            {#if !isInThread}
                <LinkButton ariaLabel='Open thread' variant='action' to={`/threads/${props.id}`}>
                    View thread
                </LinkButton>
            {/if}
        </FlexyCenter>

        <StatController props={{ votes: props.votes, comments: props.comments, action: 'neutral' }} />
    </footer>
</div>