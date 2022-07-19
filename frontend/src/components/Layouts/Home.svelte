<script lang='ts'>
import Post from "../Modules/Post/Post.svelte";

    const post = {
        user: {
            id: 1,
            username: 'EpicjjGGGamer',
            honor: 9083,
            profile: '',
            date_created: ''
        },

        id: 0,
        title: 'Im the first poster here eh',
        content: 'MEOW',
        content_type: 'text',
        date_created: ''
    }
</script>

<div class="[ feed ] [ grid ]" data-grid-collapse>
    <section class="[ posts ] [ width-100 ]">
        <Post props={{ ...post }} />
    </section>

    <section class="[ miscellaneous ]" data-desktop>
        <p>Misc</p>
    </section>
</div>