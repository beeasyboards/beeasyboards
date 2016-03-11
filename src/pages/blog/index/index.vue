<style lang="sass"> @import 'core';
    main.blog-index {
        overflow: hidden;
    }

    .blog-index p {
        text-align: center;
        @include bp(tablet) { text-align: left }
    }
</style>

<template>
    <main class="blog-index inner">
        <v-header @search="search" :header="header"></v-header>
        <router-view
            transition="fade"
            transition-mode="out-in"
            :last-search="lastsearch"
            :posts="posts">
        </router-view>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import BlogPostsComponent from './../components/posts';
    import HeaderComponent from './components/header';

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
                    posts: BlogResource.get(this.$route.query),
                });
            },
        },

        /**
         * @type {Object}
         */
        components: {
            'v-blog-posts': BlogPostsComponent,
            'v-header': HeaderComponent,
        },

        /**
         * @type {Object}
         */
        computed: {

            /**
             * Returns the header text
             *
             * @return {String}
             */
            header() {
                if (this.lastSearch.length === 0) {
                    return 'Blog';
                }

                let isPlural = this.posts.length !== 1;
                return this.posts.length + ' ' + (isPlural ? 'results' : 'result');
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
                if (term.length === 0) {
                    term = null;
                }

                this.$router.go({
                    name: 'blog-list',
                    query: { search: term },
                });
            },
        },
    };
</script>
