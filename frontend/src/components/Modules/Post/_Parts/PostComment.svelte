<script lang='ts'>
    import Card from "../../Card/Card.svelte";
    import UserRepr from "../../User/UserRepr.svelte";
import type { Props_PostComment } from "../types";

    export let comment: Props_PostComment = {
        user: {
            id: 0,
            date_created: '',
            username: '',
            honor: 0,
            profile: '',
        },

        post: 0,
        text: '',
        date_created: ''
    }

</script>
<div 
    class="[ pos-relative padding-2 margin-block-1 flex-direction-column gap-2 ]"
    >
    <div class="[ comment ] [ under-border ] [ flex-direction-column ]">
        <div>
            <UserRepr user={comment.user} />
            <p class="[ margin-inline-start-2 margin-block-start-2 fs-350 ]">
                { comment.text }
            </p>
        </div>
    </div>
</div>