<style lang="sass" scoped> @import 'core';
    main {
        overflow: hidden;
    }

    p {
        text-align: center;
        @include bp(tablet) { text-align: left }
    }
</style>

<template>
    <main class="inner">
        <v-index-header @search="search" :header="header"></v-index-header>
        <v-blog-posts
            :posts="posts"
            v-bind:class="{ 'is-searching': isSearching }">
        </v-blog-posts>
        <p class="content" v-show="posts.length === 0">
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
                return BlogResource.get().then(response => this.setPosts(response.data));
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
                    this.setPosts(response.data);
                });
            },

            /**
             * Parse out image details and set post data
             *
             * @param  {Object} data
             * @return {void}
             */
            setPosts(data) {
                this.posts = data.map(post => {
                    if (post.featured_images.length > 0) {
                        let img = post.featured_images[0];
                        post.thumbnail = { path: img.path, alt: img.title };
                    } else {
                        post.thumbnail = { path: null, alt: null };
                    }

                    return post;
                });
            },
        },
    };
</script>
