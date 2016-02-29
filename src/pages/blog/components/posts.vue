<style lang="sass" scoped> @import 'core';
    $post-mobile: 'min-width: 376px';
    $post-spacing-mobile: 12px;
    $post-spacing-tablet: 24px;

    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        justify-content: space-around;
        width: 100%;
        margin: 0;
        padding: 0;
        @include transition(opacity);
    }

    li {
        flex-basis: 100%;
        flex-grow: 1;
        margin-bottom: 30px;
        @include bp($post-mobile) { flex-basis: 50% }
        @include bp(tablet) { flex-basis: 33.3333% }
        @include bp(desktop) { flex-basis: 25% }
        @include bp-prop(max-width, none, 50%);
        @include bp-prop(padding, 0 $post-spacing-mobile, 0 $post-spacing-tablet / 2);

        // The first two posts should be larger
        &:nth-of-type(-n + 2) { @include bp($post-mobile) { flex-basis: 50% } }
    }

    a {
        display: block;
        &:hover { img { filter: brightness(100%) } }
    }

    img {
        border-radius: 3px;
        filter: brightness(90%);
        height: auto;
        width: 100%;
        @include transition(filter);
    }

    div.subtitle { font-size: 14px }
</style>

<template>
    <ul>
        <li v-for="post in posts">
            <a v-link="{ name: 'blog-show', params: { slug: post.slug }}" href="#">
                <img :src="post.thumbnail.path" alt="{{ post.thumbnail.alt }}">
                <h3>{{ post.title }}</h3>
                <div class="subtitle">{{ post.subtitle }}</div>
            </a>
        </li>
    </ul>
</template>

<script>
    module.exports = {

        props: ['posts'],

    };
</script>
