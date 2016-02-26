<style lang="sass" scoped> @import 'core';
    ul {
        @include transition(opacity);
        &.is-searching { opacity: 0; }
    }
</style>

<template>
    <main class="page">
        <v-index-header @search-submitted="executeSearch"></v-index-header>
        <ul v-bind:class="{ 'is-searching': isSearching }">
            <li v-for="post in posts"><pre>{{ post | json }}</pre></li>
        </ul>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import IndexHeaderComponent from './components/index_header';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                isSearching: false,
                lastSearch: '',
                posts: [],
                searchIsExpanded: false,
            };
        },

        /**
         * @type {Object}
         */
        components: {
            'v-index-header': IndexHeaderComponent,
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
         * @type {Object}
         */
        methods: {

            /**
             * Search the blog for a given term
             *
             * @param  {String} search
             * @return {void}
             */
            executeSearch(search) {
                if (search === this.lastSearch) {
                    return;
                }

                this.isSearching = true;
                BlogResource.get({ search }).then(response => {
                    this.lastSearch = search;
                    this.isSearching = false;
                    this.$set('posts', response.data);
                });
            }
        }
    };
</script>
