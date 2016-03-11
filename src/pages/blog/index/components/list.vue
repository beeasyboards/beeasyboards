<style lang="sass">@import 'core';
    .blog-list ul.v-blog-posts {
        li {
            flex-basis: 100%;
            @include bp(large-phone) { flex-basis: 50% }
            @include bp(tablet) { flex-basis: 33.3333% }
            @include bp(desktop) { flex-basis: 25% }

            // Keep the first two posts at a 50% basis
            &:nth-of-type(-n + 2) {
                @include bp(large-phone) { flex-basis: 50% !important }
            }
        }
    }
</style>

<template>
    <div class="blog-list content">
        <v-blog-posts :posts="posts" v-if="posts.length > 0"></v-blog-posts>
        <p v-else>
            No results found for "{{ lastSearch }}".
        </p>
    </div>
</template>

<script>
    import BlogResource from 'resources/blog';
    import BlogPostsComponent from './../../components/posts';

    module.exports = {

        /**
         * @type {Array}
         */
        props: ['posts', 'lastSearch'],

        /**
         * @type {Object}
         */
        components: {
            'v-blog-posts': BlogPostsComponent,
        },
    };
</script>
