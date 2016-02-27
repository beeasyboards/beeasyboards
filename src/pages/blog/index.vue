<style lang="sass" scoped> @import 'core';
    ul {
        @include transition(opacity);
        &.is-searching { opacity: 0; }
    }
</style>

<template>
    <main class="page">
        <v-index-header @search="search"></v-index-header>
        <ul v-bind:class="{ 'is-searching': isSearching }" v-if="posts.length">
            <li v-for="post in posts"><pre>{{ post | json }}</pre></li>
        </ul>
        <div v-else class="h-padded">
            <h3>{{ noResults }}</h3>
        </div>
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
        computed: {

            /**
             * No results message
             *
             * @return {String}
             */
            noResults() {
                return `We didn't find anything matching "${ this.lastSearch }".`;
            },
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
             * @param  {String} term    The term being search for
             * @return {void}
             */
            search(term) {
                if (term === this.lastSearch) {
                    return;
                }

                this.lastSearch = term;
                this.isSearching = true;
                BlogResource.get({ search: term }).then(response => {
                    this.isSearching = false;
                    this.$set('posts', response.data);
                });
            },
        }
    };
</script>
