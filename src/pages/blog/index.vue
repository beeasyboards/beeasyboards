<style lang="sass"> @import 'core';
    .blog-index .header {
        align-items: center;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
    }

    .blog-index h1 {
        opacity: 1;
        @include transition(opacity);
    }

    .blog-index .is-searching h1 {
        opacity: 0;
    }

    .blog-index input {
        position: absolute;
        left: 12px;
        width: calc(100% - 24px);
        transform: translateY(-50%);
        top: -50%;
        opacity: 0;
        @include transition('max-width, opacity, top', 350ms);

        @include bp(tablet) {
            opacity: 1;
            position: static;
            transform: none;
            max-width: 50%;
        }

        @include bp(desktop) {
            max-width: 25%;
        }
    }

    .blog-index .is-searching input {
        opacity: 1;
        top: 50%;
    }

    .blog-index i.fa-search {
        color: #ccc;
        cursor: pointer;
        font-size: 24px;
        @include bp-prop(display, block, none);
    }

    .blog-index .results {
        padding: 0 12px 12px;
    }

    .blog-index li {
        flex-basis: 100%;
        @include bp(large-phone) { flex-basis: 50% }
        @include bp(tablet) { flex-basis: 33.3333% }
        @include bp(desktop) { flex-basis: 25% }

        &:nth-of-type(-n + 2) {
            @include bp(tablet) { flex-basis: 50% }
            @include bp(desktop) { flex-basis: 50% }
        }
    }
</style>

<template>
    <main class="blog-index inner">
        <section class="header content" :class="{ 'is-searching': isSearching }" v-clickoff="onClickOff">
            <h1>{{ header }}</h1>
            <input
                v-el:search
                @blur="onSearchBlurred"
                type="search"
                placeholder="Search" />
            <i @click="onSearchClicked" class="fa fa-btn fa-search"></i>
        </section>
        <section class="results">
            <v-blog-posts :posts="posts"></v-blog-posts>
        </section>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import BlogPostsComponent from './components/posts';

    module.exports = {

        /**
         * @type {Object}
         */
        watch: {
            isSearching(isSearching) {
                // if (!this.$isMobile) {
                //     return;
                // }

                this.$el.addEventListener('click', () => {
                    console.log ('clicked');
                })
            }
        },

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
             * Blur the search box
             *
             * @return {[type]} [description]
             */
            onClickOff(e) {
                console.log ('on click off', e);
                e.stopPropagation();
            },

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

            /**
             * Show and focus the search input
             *
             * @return {void}
             */
            onSearchClicked() {
                this.isSearching = true;
                this.$els.search.focus();
            },

            /**
             * Set the searching status to false
             *
             * @return {void}
             */
            onSearchBlurred() {
                this.isSearching = false;
            },
        },
    };
</script>
