<script>
    import { page } from "$app/stores";
    import PostArea from "../../components/Layouts/PostArea.svelte";


    let id = Number($page.params.id);
</script>

<PostArea id={id} />