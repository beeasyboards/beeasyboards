<style lang="sass"> @import 'core';
    .blog-show header {

    }

    .blog-show article {

    }
</style>

<template>
    <main class="blog-show">
        <section class="padded with-sidebar">
            <header>
                <h1>{{ post.title }}</h1>
                <time datetime="{{ post.published_at | moment }}">
                    {{ post.published_at | moment 'MMM DD, YYYY' }}
                </time>
            </header>
            <article class="post-content" v-linkable>
                {{{ post.content_html }}}
            </article>
            <v-disqus :id="post.id" :title="post.title"></v-disqus>
        </section>
        <v-blog-sidebar class="padded" :posts="related">
            <h2 slot="header">Related posts</h2>
        </v-blog-sidebar>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import DisqusComponent from './components/disqus';
    import BlogSidebarComponent from './components/sidebar';

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
                return this.$resources({
                    post: BlogResource.get(this.$route.params),
                    related: BlogResource.getRelated(this.$route.params),
                });
            },
        },

        /**
         * @type {Object}
         */
        components: {
            'v-blog-sidebar': BlogSidebarComponent,
            'v-disqus': DisqusComponent,
        },
    };
</script>
