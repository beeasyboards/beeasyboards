<style lang="sass" scoped> @import 'core';
    $post-mobile: 'min-width: 376px';
    $post-spacing-mobile: 12px;
    $post-spacing-tablet: 24px;

    main {
        overflow: hidden;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        justify-content: space-around;
        width: 100%;
        margin: 0;
        padding: 0;
        @include transition(opacity);

        li {
            flex-basis: 100%;
            flex-grow: 1;
            margin-bottom: 24px;
            @include bp($post-mobile) { flex-basis: 50% }
            @include bp(tablet) { flex-basis: 33.3333% }
            @include bp(desktop) { flex-basis: 25% }
            @include bp-prop(max-width, none, 50%);
            @include bp-prop(padding, 0 $post-spacing-mobile, 0 $post-spacing-tablet / 2);

            // The first two posts should be larger
            &:nth-of-type(-n + 2) {
                @include bp($post-mobile) { flex-basis: 50% }
            }

            a {
                display: block;

                &:hover {
                    img { filter: brightness(100%) }
                }
            }

            img {
                border-radius: 3px;
                filter: brightness(90%);
                height: auto;
                width: 100%;
                @include transition(filter);
            }
        }

        &.is-searching { opacity: 0 }
    }

    p {
        text-align: center;
        @include bp(tablet) { text-align: left }
    }
</style>

<template>
    <main class="inner">
        <v-index-header @search="search" :header="header"></v-index-header>
        <div class="posts" v-if="posts.length">
            <ul v-bind:class="{ 'is-searching': isSearching }">
                <li v-for="post in posts">
                    <a v-link="{ name: 'blog-show', params: { slug: post.slug }}" href="#">
                        <img :src="post.thumbnail.path" alt="{{ post.thumbnail.alt }}">
                        <div>{{ post.title }}</div>
                        <small>{{ post.subtitle }}</small>
                    </a>
                </li>
            </ul>
        </div>
        <p class="content" v-else>We didn't find anything matching "{{ lastSearch }}".</p>
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
             * Gets a blog post's featured image
             *
             * @param  {Object}         post
             * @return {String|Null}
             */
            getFeaturedImage(post) {
                let image = post.featured_images[0];
                return typeof image.path !== 'undefined' ? image.path : null;
            },

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
                        post.subtitle = img.description;
                    } else {
                        post.thumbnail = { path: null, alt: null };
                        post.subtitle = 'View post';
                    }

                    return post;
                });
            },
        },
    };
</script>
