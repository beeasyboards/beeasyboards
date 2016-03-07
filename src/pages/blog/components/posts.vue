<style lang="sass" scoped> @import 'core';
    $post-mobile: 'min-width: 376px';
    $post-spacing-mobile: 12px;
    $post-spacing-tablet: 24px;

    ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        list-style: none;
        margin: 0;
        width: 100%;
        @include bp-prop(padding, 0 6px, 0);
        @include transition(opacity);
    }

    li {
        flex-basis: 100%;
        flex-grow: 1;
        margin-bottom: 12px;
        @include bp(large-phone) { flex-basis: 50% }
        @include bp(tablet) { flex-basis: 33.3333% }
        @include bp(desktop) { flex-basis: 25% }
        @include bp-prop(max-width, none, 50%);
        @include bp-prop(padding, 0 $post-spacing-mobile / 2, 0 $post-spacing-tablet / 2);

        // The first two posts should be larger
        &:nth-of-type(-n + 2) {
            @include bp(large-phone) { flex-basis: 50% }
        }
    }
</style>

<template>
    <ul>
        <li v-for="post in posts">
            <v-thumbnail :post="post"></v-thumbnail>
        </li>
    </ul>
</template>

<script>
    import ThumbnailComponent from './thumbnail';

    module.exports = {

        /**
         * @type {Array}
         */
        props: ['posts'],

        /**
         * @type {Object}
         */
        components: {
            'v-thumbnail': ThumbnailComponent,
        },

    };
</script>
