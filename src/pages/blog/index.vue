<style lang="sass"> @import 'core';
    //
    // Header
    //
    .blog-index-component header {
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        @include valign-parent();

        input {
            left: 0;
            @include valign-child();
            @include transition('opacity, top', 375ms, ease-in-out);
            &:not(.is-searching) { top: -50% }
        }

        i.fa-search {
            align-items: center;
            cursor: pointer;
            display: flex;
            font-size: 30px;
            justify-content: center;
            padding: 0 12px;
        }
    }

    //
    // Blog posts
    //
    .blog-index-component .v-blog-posts {
        margin-top: -24px;

        li {
            width: 100%;
            &:nth-of-type(-n + 2) { min-width: 50% }
            @include bp(large-phone) { width: 50% }
            @include bp(tablet) { width: 33.3333% }
            @include bp(desktop) { width: 25% }
            @include transition(width);
        }
    }
</style>

<template>
    <main class="blog-index-component">
        <section class="padded">
            <header>
                <h1>{{ header }}</h1>
                <input
                    :class="{ 'is-searching': isSearching }"
                    debounce="300"
                    placeholder="Search"
                    type="search"
                    v-el:search
                    v-model="search"
                    @blur="onSearchBlur"
                    @keypress.enter="onSearchEnter"
                />
                <i @click="onSearchClicked" class="fa fa-search"></i>
            </header>
            <v-blog-posts v-if="posts.length" :posts="posts"></v-blog-posts>
            <p v-else>Sorry homie, we didn't find anything.</p>
        </section>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import PostsComponent from './components/posts';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                isSearching: false,
                posts: [],
                search: this.$route.query.search,
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
            'v-blog-posts': PostsComponent,
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
                if (this.search) {
                    let search = this.search.trim().toLowerCase();

                    if (search) {
                        return `"${ search }"`;
                    }
                }

                return 'Blog';
            },
        },

        /**
         * @type {Object}
         */
        watch: {

            /**
             * Update the query string and search the blog
             *
             * @param  {String} term
             * @return {void}
             */
            search(term) {
                let search = term.trim().toLowerCase() || null, query = { search };
                this.$resources({ posts: BlogResource.get(query) });
                this.$router.replace({ name: 'blog-index', query });
            },
        },

        /**
         * @type {Object}
         */
        methods: {

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
            onSearchBlur() {
                this.isSearching = false;
            },

            /**
             * Blur the input on enter for mobile users
             *
             * @return {void}
             */
            onSearchEnter() {
                if (this.$isMobile) {
                    this.$els.search.blur();
                }
            },
        },
    };
</script>
