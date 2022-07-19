<script>
    import Navbar from "../components/Layouts/Navbar.svelte";
</script>

<Navbar />

<main class="[ main-container ] [ margin-block-2 gap-2 margin-inline-auto ]" data-grid-collapse>
    <slot></slot>
</main>

<style>
    @import url('../../static/posty.css');
</style>