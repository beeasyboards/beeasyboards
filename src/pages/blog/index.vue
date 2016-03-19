<style lang="sass"> @import 'core';
    .blog-index-component header {
        @include valign-parent();
    }

    .blog-index-component h1 {
        padding-right: 72px;
        @include bp(large-phone) { padding-right: 24px }
    }

    .blog-index-component input {
        left: 0;
        opacity: 0;
        position: absolute;
        top: -100%;
        transform: translateY(0%);
        z-index: 1;
        @include transition('opacity, top, transform, width', 375ms, ease-in-out);

        &.is-searching {
            opacity: 1;
            top: 50%;
            transform: translateY(-50%);
        }

        @include bp(large-phone) {
            opacity: 1;
            position: static;
            width: calc(50% - 6px);
        }

        @include bp(tablet) {
            width: calc(50% - 12px);
        }

        @include bp(desktop) {
            width: calc(25% - 18px);
        }
    }

    .blog-index-component i.fa {
        align-items: center;
        color: #ccc;
        cursor: pointer;
        display: flex;
        font-size: 30px;
        height: 100%;
        justify-content: center;
        padding: 12px;
        position: absolute;
        right: -12px;
        top: 0;
        width: 72px;
        z-index: 2;
        @include transition(color);
        @include bp(large-phone) {
            display: none;
        }

        &.is-searching {
            color: #666;
        }
    }

    //
    // Blog posts
    //
    .blog-index-component .v-blog-posts {
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
                <i
                    v-if="!isSearching || search.length === 0"
                    :class="{ 'is-searching': isSearching }"
                    @click="onSearchClicked" class="fa fa-search">
                </i>
                <i
                    v-else
                    v-touch:tap="onClearClicked"
                    class="fa fa-times">
                </i>
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
                if (typeof this.$route.query.search === 'undefined') {
                    this.search = '';
                }

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

            onClearClicked(e) {
                this.search = '';
                console.log ('did it');
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
            onSearchBlur(e) {
                this.isSearching = false;
                console.log ('blur');
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
