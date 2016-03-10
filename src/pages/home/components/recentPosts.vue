<template>
    <section>
        Recent posts
    </section>
</template>

<script>
    import BlogPostsComponent from 'pages/blog/components/posts';

    module.exports = {

        /**
         * @type {Object}
         */
        components: {
            'v-blog-posts': BlogPostsComponent,
        },
    };
</script>
