<style lang="sass">
    @import './scss/core';

    //
    // Global styles
    //
    @import 'normalize.scss/normalize.scss';
    @import 'transitions';

    //
    // Elements
    //
    @import 'elements/containers';
    @import 'elements/layout';
    @import 'elements/media';
    @import 'elements/sections';
    @import 'elements/typography';
    @import 'elements/ui';
</style>

<template>
    <div>
        <v-header></v-header>
        <router-view transition="fade" transition-mode="out-in"></router-view>
    </div>
</template>

<script>
    import FastClick from 'fastclick';

    export default {

        /**
         * @type {Object}
         */
        components: {
            'v-header': require('layout/header'),
        },

        /**
         * Bind fastclick to the body
         *
         * @return {void}
         */
        attached() {
            if ('addEventListener' in document) {
                document.addEventListener('DOMContentLoaded', () => {
                    FastClick.attach(document.body);
                }, false);
            }
        }
    };
</script>
