<style lang="sass" scoped>@import 'core';
    ul {
        display: flex;
        list-style: none;
        padding: 0 12px 12px;
        margin: -6px;
        flex-wrap: wrap;
    }

    li {
        flex-basis: 100%;
        padding: 6px;
        @include bp(phone) { flex-basis: 50% }
        @include bp(large-phone) { flex-basis: 33.3333% }
        @include bp(tablet) { flex-basis: 25% }
        @include bp(desktop) { flex-basis: 20% }
        @include transition(flex-basis);
    }
</style>

<template>
    <main class="inner">
        <h1 class="content">Down for life</h1>
        <ul>
            <li v-for="homie in homies">
                <a v-if="hasLink(homie)" href="{{ homie.href }}" :target="linkTarget(homie)">
                    <v-homie :homie="homie"></v-homie>
                </a>
                <v-homie v-else :homie="homie"></v-homie>
            </li>
        </ul>
    </main>
</template>

<script>
    import DownForLifeResource from 'resources/downforlife';
    import HomieComponent from './components/homie';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                homies: [],
            };
        },

        /**
         * @type {Object}
         */
        route: {

            /**
             * @type {Boolean}
             */
            waitForData: true,

            /**
             * Fetch route data
             *
             * @param  {Object}     transition
             * @return {Promise}
             */
            data(transition) {
                return this.$resources({
                    homies: DownForLifeResource.get(),
                })
            },
        },

        /**
         * @type {Object}
         */
        components: {
            'v-homie': HomieComponent,
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Check if the homie has an href to link to
             *
             * @param  {Object}     homie
             * @return {Boolean}
             */
            hasLink(homie) {
                return homie.href.length > 0;
            },

            /**
             * Determines where to open the homie's link
             *
             * @param  {Object}     homie
             * @return {String}
             */
            linkTarget(homie) {
                return homie.is_new_window ? '_blank' : '_self';
            },
        },
    };
</script>
