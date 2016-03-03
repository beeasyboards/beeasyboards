<style lang="sass" scoped> @import 'core';
    main.blog-show {

    }

    header {
        display: block !important;

        h1, time {
            display: block !important;
            border: 1px solid blue;
            width: 100%;
        }
    }
</style>

<template>
    <main class="blog-show inner">
        <article class="content">
            <header>
                <h1>{{ post.title }}</h1>
                <time datetime="{{ post.published_at | moment }}">
                    {{ post.published_at | moment 'MMM DD, YYYY' }}
                </time>
            </header>
            <div class="post-content" v-linkable>
                {{{ post.content_html }}}
            </div>
        </article>
        <aside>
            <h2 class="content">Related posts</h2>
            <v-blog-posts :posts="related"></v-blog-posts>
        </aside>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import BlogPostsComponent from './components/posts';
    import ParseBlogPosts from './utilities/parse_posts.js';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                post: {},
                related: [],
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
                let Post = BlogResource.get(this.$route.params)
                    .then(response => this.$set('post', response.data));

                let Related = BlogResource.getRelated(this.$route.params)
                    .then(response => this.$set('related', ParseBlogPosts(response)));

                return Promise.all([ Post, Related ]);
            },
        },

        /**
         * @type {Object}
         */
        components: {
            'v-blog-posts': BlogPostsComponent,
        },
    };
</script>
