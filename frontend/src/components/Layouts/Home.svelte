<script lang='ts'>
import Post from "../Modules/Post/Post.svelte";

    const post = {
        user: {
            id: 1,
            username: 'EpicjjGGGamer',
            honor: 9083,
            profile: '',
            date_created: 'Recently'
        },

        id: 123123,
        votes: 0,
        comments: 0,

        title: 'Im the first poster here eh',
        content: { images: ['img1.png', 'img2.png'] },
        content_type: 'media',
        date_created: '23 seconds ago'
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