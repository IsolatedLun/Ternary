<script lang='ts'>
    import Profile from "../../components/Modules/Profile/Profile.svelte";
    import FlexyCenter from "../../components/Divs/FlexyCenter.svelte";
    import Card from "../../components/Modules/Card/Card.svelte";
    import Icon from "../Modules/Icon/Icon.svelte";
    import { ICON_HOME } from "../../consts";
    import LinkButton from "../Interactibles/LinkButton.svelte";
    import { userState } from '../../stores/userStore/userStore'
    import TextInput from "../Interactibles/Input/TextInput.svelte";

    const { isLogged, user } = $userState;
</script>

<nav class="[ main-navbar ] [ flex align-items-center gap-2 padding-inline-2 padding-block-small ]">
    <FlexyCenter cubeClass={{ utilClass: 'flex-grow' }}>
        <a class="[ fs-600 fw-normal ]" href='/' data-variant='default'>Ternary</a>
        <TextInput cubeClass={{ utilClass: 'fs-350 width-100' }} placeholder={'Enter search'} />
    </FlexyCenter>

    <FlexyCenter>
        <LinkButton to='/'><Icon>{ ICON_HOME }</Icon></LinkButton>

        {#if isLogged}
            <Card cubeClass={{ utilClass: 'flex gap-2 margin-inline-start-auto fs-300 padding-1' }}>
                <div>
                    <p>{ user.username }</p>
                    <p class="[ fs-300 clr-text-muted ]">{ user.honor } honor</p>
                </div>
                <Profile props={{ src: user.profile, alt: 'Your profile' }} />
            </Card>

            {:else}
                <LinkButton variant='primary-difference'>Login</LinkButton>
                <LinkButton variant='primary'>Sign up</LinkButton>
        {/if}
    </FlexyCenter>
</nav>