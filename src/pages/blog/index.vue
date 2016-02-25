<style lang="sass" scoped> @import 'core';
    .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
</style>

<template>
    <main class="page">
        <div class="header">
            <h1>Blog</h1>
            <div>
                <input type="search" v-model="search" placeholder="Search the blog...">
            </div>
        </div>
        <ul>
            <li v-for="post in posts"><pre>{{ post | json }}</pre></li>
        </ul>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                search: '',
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
                return BlogResource.get().then(response => this.$set('posts', response.data));
            },
        },

        /**
         * @return {Object}
         */
        data() {
            return {
                posts: [],
            };
        },
    };
</script>
