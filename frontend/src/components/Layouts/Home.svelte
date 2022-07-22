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
        <footer class="[ card ] [ padding-1 ]" data-variant='difference'>
            <p class="[ margin-bottom-1 ]">Ternary, enjoy the freedom of the Internet.</p>

            <address class="[ text-muted ]">Ternary Inc.</address>
        </footer>
    </section>
</div>