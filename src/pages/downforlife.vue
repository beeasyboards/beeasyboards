<template>
    <main class="inner">
        <ul>
            <li v-for="homie in homies">
                {{ homie.name }}
            </li>
        </ul>
    </main>
</template>

<script>
    import DownForLifeResource from 'resources/downforlife';

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
                return DownForLifeResource.get().then(response => this.$set('homies', response.data));
            },
        },
    };
</script>
