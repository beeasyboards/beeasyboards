<style lang="sass"> @import 'core';
    .blog-show article {
        padding: 12px 0;

        img {
            height: auto;
            width: 100%;
        }

        > *:not(:last-child) {
            @include bp-prop(margin-bottom, 12px, 24px);
        }

        > blockquote {
            margin-top: 0;
            margin-left: 12px;
            margin-right: 12px;
            text-align: center;
            @include bp-prop(margin-bottom, 12px, 24px);

            > p {
                font-size: 22px;
            }
        }
    }

    .blog-show aside {
        @include bp-prop(background-color, $alternate-background-color, false, #fff);
        @include bp-prop(border-top, 2px solid darken($alternate-background-color, 10%), none);
    }
</style>

<template>
    <main class="blog-show">
        <section class="padded with-sidebar">
            <header class="custom">
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
