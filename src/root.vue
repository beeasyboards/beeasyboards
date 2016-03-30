<style lang="sass">
    @import 'core';
    @import 'global';
</style>

<template>
    <div class="root">
        <v-header class="header"></v-header>
        <div class="router">
            <router-view transition="fade" transition-mode="out-in"></router-view>
        </div>
        <footer class="footer margins">
            Footer content
        </footer>
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
