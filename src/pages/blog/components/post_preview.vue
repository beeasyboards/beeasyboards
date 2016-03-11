<style lang="sass" scoped>@import 'core';
    a {
        display: block;

        &:hover img {
            filter: brightness(100%) ;
        }
    }

    img {
        border-radius: 3px;
        filter: brightness(90%);
        height: auto;
        width: 100%;
        @include transition(filter);
    }

    div {
        font-size: 14px;
    }
</style>

<template>
    <a v-link="{ name: 'blog-show', params: { slug: post.slug }}" href="#">
        <img v=if="src" :src="src" :alt="post.title">
        <h3>{{ post.title }}</h3>
        <div>{{ post.subtitle }}</div>
    </a>
</template>

<script>
    module.exports = {

        /**
         * @type {Array}
         */
        props: ['post'],

        /**
         * @type {Object}
         */
        computed: {

            /**
             * Use the first image as our thumbnail
             *
             * @return {String}
             */
            src() {
                return typeof this.post.featured_images !== 'undefined' && this.post.featured_images.length > 0
                    ? this.post.featured_images[0].path
                    : null;
            },
        },
    };
</script>
