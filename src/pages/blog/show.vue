<template>
    <main class="page padded">
        <h1>{{ post.title }}</h1>
        <div v-linkable>{{{ post.content_html }}}</div>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';

    module.exports = {

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
                return BlogResource.get(this.$route.params).then(response => this.$set('post', response.data));
            },
        },
    };
</script>
