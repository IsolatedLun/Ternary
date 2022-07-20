<script lang="ts">
    import type { Props_User } from "../../../types";
    import Profile from "../Profile/Profile.svelte";


    export let user: Props_User = {
        username: '',
        honor: 0,
        id: 0,
        date_created: '',
        profile: ''
    }
</script>

<div class="[ user-repr ] [ flex gap-1 margin-block-end-05 ]">
    <Profile props={{ src: user.profile, alt: `${user.username}'s profile` }} />
    <div class="[ user__info ] [ column-split-2 ]">
        <div class="[ flex-direction-column align-items-center ]">
            <p class="[ fs-300 margin-block-end-05 ]">
                <a href={`/users/${user.id}`}>u/{user.username}</a>
            </p>
            <p class="[ fs-300 text-muted ]">{ user.honor } honor</p>
        </div>
    </div>
</div>