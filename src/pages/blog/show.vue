<style lang="sass"> @import 'core';
    main.blog-show {
        display: flex;
        flex-wrap: wrap;

        //
        // Articles
        //
        article {

            header {
                flex-wrap: wrap;
                justify-content: space-between;
                flex-basis: 100%;

                @include bp(tablet) {
                    flex-wrap: nowrap;
                    h1 { flex-basis: auto }
                    time {
                        flex-basis: auto;
                        padding-top: 12px;
                    }
                }
            }

            a { text-decoration: underline }

            div.post-content *:not(:last-child) { margin-bottom: 24px }

            div.gallery {
                align-items: space-around;
                display: flex;
                margin: -12px;
                @include bp-prop(flex-wrap, wrap, nowrap);

                div {
                    font-size: 0; // remove whitespace
                    margin-bottom: 0 !important;
                    padding: 12px;
                    flex-basis: 100%;
                }
                img { width: 100%; height: auto; }
                + div.gallery { margin-top: -24px !important }
            }

            blockquote {
                text-align: center;
                @include bp-prop(margin, 0px 12px 24px, 0px 24px 24px);
                p {
                    font-size: 1.5rem;
                    margin-bottom: 6px !important;
                }
            }

            img, div.video-wrapper { border-radius: 3px }

            img {
                height: auto;
                width: 100%;
            }
        }

        //
        // Sidebar
        //
        aside {
            flex-basis: 100%;

            h2 {
                height: $header-height-mobile;
                line-height: $header-height-mobile;
            }
        }
    }
</style>

<template>
    <main class="blog-show inner content">
        <article>
            <header>
                <h1>{{ post.title }}</h1>
                <time datetime="{{ post.published_at | moment }}">
                    {{ post.published_at | moment 'MMM DD, YYYY' }}
                </time>
            </header>
            <div class="post-content" v-linkable>{{{ post.content_html }}}</div>
        </article>
        <aside>
            <h2>Related</h2>
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
