<style lang="sass">@import 'core';
    .blog-sidebar-component li {
        @include bp(large-phone) { width: 50% !important }
        @include bp(tablet) { width: 100% !important }
    }
</style>

<template>
    <aside>
        <slot name="header"></slot>
        <v-blog-posts :posts="posts" class="blog-sidebar-component"></v-blog-posts>
    </aside>
</template>

<script>
    import BlogPostsComponent from 'pages/blog/components/posts';

    module.exports = {

        /**
         * @type {Array}
         */
        props: ['posts'],

        /**
         * @type {Object}
         */
        components: {
            'v-blog-posts': BlogPostsComponent,
        },
    };
</script>
