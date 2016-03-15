<style lang="sass">@import 'core';
    .blog-sidebar-component li {
        width: 100%;
        @include bp(large-phone) { width: 50% }
        @include bp(tablet) { width: 100% }
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
