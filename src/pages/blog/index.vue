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
        left: 12px;
        top: -50%;
        @include bp-prop(opacity, 0, 1);
        @include bp-prop(position, absolute, static);
        @include bp-prop(transform, translateY(-50%), none);
        @include bp-prop(max-width, calc(100% - 24px), calc(50% - 12px), calc(25% - 12px));
        @include transition('max-width, opacity, top', 350ms);
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
        @include bp(large-phone) { width: 50% }
        @include bp(tablet) { width: 33.3333% }
        @include bp(desktop) { width: 25% }

        &:nth-of-type(-n + 2) {
            @include bp(tablet) { width: 50% }
        }
    }
</style>

<template>
    <main class="blog-index inner">
        <section class="header content" :class="{ 'is-searching': isSearching }">
            <h1>{{ header }}</h1>
            <input
                debounce="300"
                placeholder="Search"
                type="search"
                v-el:search
                v-model="search"
                @blur="onSearchBlur"
                @keypress.enter="onSearchEnter"
            />
            <i @click="onSearchClicked" class="fa fa-btn fa-search"></i>
        </section>
        <section class="results">
            <v-blog-posts :posts="posts" v-if="posts.length"></v-blog-posts>
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
