<script lang='ts'>
    import { getFeed } from "../../services/postFetchers";
    import Post from "../Modules/Post/Post.svelte";

    const feedPromise = getFeed();
</script>

<div class="[ feed ] [ grid ]" data-grid-collapse>
    <section class="[ posts ] [ width-100 ]">
        {#await feedPromise}
            <p>LOADING</p>
        {:then feed}
            {#each feed as post}
                <Post props={{ ...post }} />
            {/each}
        {/await}
    </section>

    <section class="[ miscellaneous ]" data-desktop>
        <p>Misc</p>
    </section>
</div>