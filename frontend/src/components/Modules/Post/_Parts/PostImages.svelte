<script lang='ts'>
    import { ICON_ARROW_LEFT, ICON_ARROW_RIGHT } from "../../../../consts";
    import Button from "../../../../components/Interactibles/Button.svelte";
    import Icon from "../../Icon/Icon.svelte";
    import Image from "../../MediaElements/Image.svelte";

    export let props: import("../types").Props_PostImages = {
        images: [],
        title: ''
    }

    let idx = 0;
</script>

<div class="[ post__images ]">
    <Button 
        on:click={() => idx - 1 < 0 ? idx = props.images.length - 1 : idx -= 1}
        cubeClass={{ blockClass: 'image__button', utilClass: 'pos-absolute mix-blend-difference' }} 
        variant='action-difference'
        ariaLabel='Previous Image'
        >
        <Icon>{ ICON_ARROW_LEFT }</Icon>
    </Button>

    <div>
        <Image props={{ src: props.images[idx], alt: `${props.title} image ${idx}` }} />
    </div>

    <Button 
        on:click={() => idx + 1 > props.images.length - 1 ? idx = 0 : idx += 1}
        cubeClass={{ blockClass: 'image__button', utilClass: 'pos-absolute mix-blend-difference' }} 
        variant='action-difference'
        ariaLabel='Next Image'
        >
        <Icon>{ ICON_ARROW_RIGHT }</Icon>
    </Button>
</div>