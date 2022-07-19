<script lang='ts'>
    import { ICON_COMMENTS, ICON_DOWNVOTE, ICON_UPVOTE } from "../../../consts";
    import FlexyCenter from "../../../components/Divs/FlexyCenter.svelte";
    import Button from "../../../components/Interactibles/Button.svelte";
    import Icon from "../Icon/Icon.svelte";
    import Profile from "../Profile/Profile.svelte";

    export let props: import("./types").Props_Post = {
        user: {
            id: 0,
            honor: 0,
            username: '',
            profile: '',
            date_created: ''         
        },

        id: 0,
        title: '',
        content: '',
        content_type: '',
        date_created: ''
    }
</script>

<div class="[ post ] [ flex-direction-column justify-content-space-between card padding-1 ]"
    data-variant='difference'
    data-content-type={props.content_type}
    >
    <header class="[ under-border ]">
        <div class="[ post__user ] [ flex gap-1 margin-block-end-05 ]">
            <Profile props={{ src: props.user.profile, alt: `${props.user.username}'s profile` }} />
            <div class="[ user__info ] [ column-split-2 ]">
                <div class="[ flex-direction-column align-items-center ]">
                    <p class="[ fs-300 margin-block-end-05 ]">
                        <a href={`/users/${props.user.id}`}>u/{props.user.username}</a>
                    </p>
                    <p class="[ fs-300 text-muted ]">{ props.user.honor } honor</p>
                </div>
                <p class="[ fs-300 ]">17 hours ago</p>
            </div>
        </div>
        <p class="[ fs-500 ]">{ props.title }</p>
    </header>
    <article class="[ post__content ] [ margin-block-1 hyphens-auto overflow-hidden ]">
        { props.content }
    </article>
    <footer class="[ flex gap-1 align-items-center justify-content-space-between ] [ margin-block-start-auto upper-border ]">
        <FlexyCenter useJustify={false} props={{ gap: 1 }}>
            <Button variant='action'>View thread</Button>
            <Button variant='action'><Icon>{ ICON_COMMENTS }</Icon></Button>
        </FlexyCenter>

        <FlexyCenter useJustify={false} props={{ gap: 1 }}>
            <Button variant='action'><Icon>{ ICON_UPVOTE }</Icon></Button>
            <p>0</p>
            <Button variant='action'><Icon>{ ICON_DOWNVOTE }</Icon></Button>
        </FlexyCenter>
    </footer>
</div>