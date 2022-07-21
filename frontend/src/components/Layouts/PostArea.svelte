<script lang='ts'>
    import Card from "../Modules/Card/Card.svelte";
    import Post from "../Modules/Post/Post.svelte";
    import UserRepr from "../Modules/User/UserRepr.svelte";
    
        const post = {
            user: {
                id: 1,
                username: 'EpicjjGGGamer',
                honor: 9083,
                profile: '',
                date_created: 'Recently'
            },
    
            id: 0,
            votes: 0,
            comments: 0,
    
            title: 'Im the first poster here eh',
            content: { text: 'halo infinite' },
            content_type: 'text',
            date_created: '23 seconds ago'
        }

        export let id: number = -1;
</script>
    
<div class="[ feed ] [ grid ]" data-grid-collapse>
    <section class="[ posts ] [ width-100 ]">
        <Post props={{ ...post }} isInThread={true} />

        <div class="[ comments ] [ margin-block-2 ]">
            <p class='[ fs-500 fw-normal ]'>0 Comments</p>

            <Card 
                cubeClass={{ utilClass: 'padding-2 margin-block-1 flex-direction-column gap-2' }}
                variant='difference'
                >
                <div class="[ comment ] [ under-border ] [ flex-direction-column ]">
                    <div>
                        <UserRepr user={post.user} />
                        <p class="[ margin-inline-start-2 margin-block-start-2 fs-350 ]">lorem</p>
                    </div>
                </div>
            </Card>
        </div>
    </section>

    <section class="[ miscellaneous ]" data-desktop>
        <p>Misc</p>
    </section>
</div>