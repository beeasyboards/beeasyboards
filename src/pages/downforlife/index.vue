<style lang="sass" scoped>@import 'core';
    ul {
        display: flex;
        list-style: none;
        padding: 0 12px 12px;
        margin: -6px;
        flex-wrap: wrap;
    }

    li {
        flex-basis: auto;
        padding: 6px;
        width: 100%;
        @include bp(phone) { width: 50% }
        @include bp(large-phone) { width: 33.3333% }
        @include bp(tablet) { width: 25% }
        @include bp(desktop) { width: 20% }
        @include transition(width);
    }
</style>

<template>
    <main class="inner">
        <h1 class="content">Down for life</h1>
        <ul>
            <li v-for="homie in homies">
                <a v-if="homie.href" href="{{ homie.href }}" @click.prevent>
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
    };
</script>
