<style lang="sass">
    @import 'core';
    @import 'global';
</style>

<template>
    <div class="root">
        <v-header class="header"></v-header>
        <router-view class="content" transition="fade" transition-mode="out-in"></router-view>
        <footer class="footer">
            <div class="margins">
                Footer content
            </div>
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
