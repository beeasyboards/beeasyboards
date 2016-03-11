<style lang="sass" scoped>@import 'core';

</style>

<template>
    <section>
        <v-blog-posts :posts="posts"></v-blog-posts>
    </section>
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
