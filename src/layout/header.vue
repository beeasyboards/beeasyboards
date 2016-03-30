<style lang="sass" scoped> @import 'core';
    header {
        background-color: #000;
        color: #fff;

        > div {
            display: flex;
            justify-content: space-between;
            padding: 0 12px;
            @include bp-prop(height, $header-height-mobile, $header-height-tablet, $header-height-desktop);
            @include transition(height);
        }

        a.logo {
            align-items: center;
            display: flex;

            img {
                width: auto;
                @include bp-prop('height', 35px, 45px, 60px);
                @include transition('height');
            }
        }
    }
</style>

<template>
    <header>
        <div class="margins">
            <a v-link="{ name: 'home' }" class="logo">
                <img src="./../assets/logo_white.png" alt="Be Easy">
            </a>
            <v-nav></v-nav>
        </div>
    </header>
</template>

<script>
    import NavComponent from './nav';

    module.exports = {

        /**
         * @type {Object}
         */
        components: {
            'v-nav': NavComponent,
        },
    };
</script>
