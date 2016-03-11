<style lang="sass"> @import 'core';
    main.blog-index {
        overflow: hidden;
    }

    .blog-index p {
        text-align: center;
        @include bp(tablet) { text-align: left }
    }

    .blog-index ul.v-blog-posts {
        li {
            flex-basis: 100%;
            @include bp(large-phone) { flex-basis: 50% }
            @include bp(tablet) { flex-basis: 33.3333% }
            @include bp(desktop) { flex-basis: 25% }

            // Keep the first two posts at a 50% basis
            &:nth-of-type(-n + 2) {
                @include bp(large-phone) { flex-basis: 50% !important }
            }
        }
    }
</style>

<template>
    <main class="blog-index inner">
        <v-index-header @search="search" :header="header"></v-index-header>
        <v-blog-posts
            :posts="posts"
            class="content"
            v-bind:class="{ 'is-searching': isSearching }">
        </v-blog-posts>
        <p class="blog-index content" v-show="posts.length === 0">
            We didn't find anything matching "{{ lastSearch }}".
        </p>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import BlogPostsComponent from './components/posts';
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
            'v-blog-posts': BlogPostsComponent,
            'v-index-header': IndexHeaderComponent,
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
                    posts: BlogResource.get(),
                });
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

                BlogResource.get({ search: term }).then(response => {
                    this.isSearching = false;
                    this.posts = response.data
                });
            },
        },
    };
</script>
