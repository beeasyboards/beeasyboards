<style lang="sass" scoped> @import 'core';
    header {
        background-color: #000;
        color: #fff;

        .inner {
            align-items: center;
            display: flex;
            justify-content: space-between;
            @include bp-prop(height, $header-height-mobile, $header-height-tablet, $header-height-desktop);
            @include transition(height);
        }

        a.logo {
            @include bp-prop('padding-left', $layout-padding-mobile, $layout-padding-tablet);
            img {
                margin-bottom: -5%; // align the logo by font baseline, not by height
                width: auto;
                @include bp-prop('height', 35px, 45px, 60px);
                @include transition('height');
            }
        }
    }
</style>

<template>
    <header>
        <div class="inner">
            <a v-link="{ name: 'home' }" class="logo">
                <img src="./../assets/logo_white.png" alt="Be Easy">
            </a>
            <v-nav></v-nav>
        </div>
    </header>
</template>

<script>
    module.exports = {

        /**
         * @type {Object}
         */
        components: {
            'v-nav': require('./nav'),
        },
    };
</script>
