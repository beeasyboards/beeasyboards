<style lang="sass"> @import 'core';
    main.blog-show {
        display: flex;
        flex-wrap: wrap;
        @include bp(tablet) {
            flex-wrap: nowrap;
        }
    }

    //
    // Header
    //
    .blog-show header {
        display: block !important;
        padding: 24px 0;
        h1, time {
            display: block !important;
            width: 100%;
        }
    }

    //
    // Article
    //
    .blog-show article {
        padding-bottom: 12px !important;
        @include bp-prop(flex-basis, 100%, 75%);

        div.post-content {
            > * {
                border-radius: 3px;
                margin-bottom: 24px;
            }

            blockquote {
                margin: 0 12px 24px;
                text-align: center;
            }

            img {
                height: auto;
                width: 100%;
            }

            // Flexible rows and columns
            div.flex-row {
                display: flex;
                @include bp-prop(flex-wrap, wrap, nowrap);
                > div.flex-col, > div.flex-column {
                    flex-basis: 100%;
                    &:not(:first-child) { @include bp-prop(padding-left, 0, 12px) }
                    &:not(:last-child) { @include bp-prop(padding-right, 0, 12px) }
                }
            }
        }
    }

    //
    // Aside
    //
    .blog-show aside {
        @include bp-prop(background-color, $alternate-background-color, #fff);
        @include bp-prop(border-top, 2px solid darken($alternate-background-color, 10%), none);
        @include bp-prop(flex-basis, 100%, 25%);

        h2 {
            @include bp-prop(margin, 12px 0, 24px 0);
        }

        @include bp(tablet) {
            ul {
                flex-wrap: wrap;
            }
            li {
                flex-basis: 100% !important;
                max-width: none;
            }
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
            <v-disqus :id="post.id" :title="post.title"></v-disqus>
        </article>
        <aside>
            <h2 class="content">Related posts</h2>
            <v-blog-posts :posts="related"></v-blog-posts>
        </aside>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import DisqusComponent from './components/disqus';
    import BlogPostsComponent from './components/posts';

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
            'v-blog-posts': BlogPostsComponent,
            'v-disqus': DisqusComponent,
        },
    };
</script>
