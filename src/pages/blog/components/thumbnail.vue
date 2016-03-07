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
        <img :src="post.thumbnail.path" alt="{{ post.thumbnail.alt }}">
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
    };
</script>
