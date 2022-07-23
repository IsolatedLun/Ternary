<script lang='ts'>
    import { getFeed } from "../../../services/postFetchers";
import Button from "../../Interactibles/Button.svelte";
import TextInput from "../../Interactibles/Input/TextInput.svelte";
    import Card from "../../Modules/Card/Card.svelte";
import Icon from "../../Modules/Icon/Icon.svelte";
    import GroupJoin from "../../Modules/Miscellaneuos/GroupJoin.svelte";
    import Post from "../../Modules/Post/Post.svelte";
import HomeHeader from "./_Parts/HomeHeader.svelte";

    const feedPromise = getFeed();
</script>

<div class="[ feed ] [ grid ]" data-grid-collapse>
    <div class="[ flex-direction-column gap-1 ]">
        <HomeHeader />
        <section class="[ posts ] [ width-100 ]">
            {#await feedPromise}
                <p>LOADING</p>
            {:then feed}
                {#each feed as post}
                    <Post props={{ ...post }} />
                {/each}
            {/await}
        </section>
    </div>

    <section class="[ miscellaneous ]" data-desktop>
        <Card cubeClass={{ utilClass: 'padding-1' }} variant='difference'>
            <p class="[ under-border ] [ text-center margin-block-end-1 ]">Relevant Communities</p>
            <GroupJoin />
        </Card>
    </section>
</div>