<template>
    <main class="inner content">
        <v-index-header @search="search"></v-index-header>
        <div class="posts" v-if="posts.length">
            <ul v-bind:class="{ 'is-searching': isSearching }">
                <li v-for="post in posts">
                    <a v-link="{ name: 'blog-show', params: { slug: post.slug }}">
                        <img :src="post.thumbnail.path" alt="{{ post.thumbnail.alt }}">
                        <div>{{ post.title }}</div>
                        <small>{{ post.subtitle }}</small>
                    </a>
                </li>
            </ul>
        </div>
        <p v-else>{{ noResults }}</p>
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
                this.$set('posts', data.map(post => {
                    if (post.featured_images.length > 0) {
                        let img = post.featured_images[0];
                        post.thumbnail = { path: img.path, alt: img.title };
                        post.subtitle = img.description;
                    } else {
                        post.thumbnail = { path: null, alt: null };
                        post.subtitle = 'View post';
                    }

                    return post;
                }));
            },
        },
    };
</script>
