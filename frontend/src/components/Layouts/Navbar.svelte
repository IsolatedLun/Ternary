<script lang='ts'>
    import Profile from "../../components/Modules/Profile/Profile.svelte";
    import FlexyCenter from "../../components/Divs/FlexyCenter.svelte";
    import Card from "../../components/Modules/Card/Card.svelte";
    import Icon from "../Modules/Icon/Icon.svelte";
    import { ICON_HOME } from "../../consts";
    import LinkButton from "../Interactibles/LinkButton.svelte";
</script>

<nav class="[ main-navbar ] [ flex align-items-center gap-2 padding-inline-2 padding-block-small ]">
    <FlexyCenter cubeClass={{ utilClass: 'flex-grow' }}>
        <a class="[ fs-600 fw-normal ]" href='/' data-variant='default'>Ternary</a>
        <input type="text" placeholder="Search" class="[ fs-350 input width-100 ]" data-variant='text' />
    </FlexyCenter>

    <FlexyCenter>
        <LinkButton to='/'><Icon>{ ICON_HOME }</Icon></LinkButton>

        <Card cubeClass={{ utilClass: 'flex gap-2 margin-inline-start-auto fs-300 padding-1' }}>
            <div>
                <p>IsolatedLun</p>
                <p class="[ fs-300 clr-text-muted ]">0 honor</p>
            </div>
            <Profile props={{ src: 'https://i.natgeofe.com/n/9135ca87-0115-4a22-8caf-d1bdef97a814/75552.jpg', alt: 'joe biden' }} />
        </Card>
    </FlexyCenter>
</nav>