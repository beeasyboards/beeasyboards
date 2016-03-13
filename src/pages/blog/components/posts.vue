<style lang="sass" scoped> @import 'core';
    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        padding: 0;
        @include bp-prop(margin, -6px, -12px);
        @include transition(margin);
    }

    li {
        // IE 10 & 11 workaround for flex-basis and box-sizing
        // github.com/philipwalton/flexbugs#7-flex-basis-doesnt-account-for-box-sizingborder-box
        flex-basis: auto;
        width: 100%;

        @include bp-prop(padding, 6px, 12px);
        @include transition('padding, width');
    }
</style>

<template>
    <ul class="v-blog-posts">
        <li v-for="post in posts">
            <v-post-preview :post="post"></v-post-preview>
        </li>
    </ul>
</template>

<script>
    import PostPreviewComponent from './post_preview';

    module.exports = {

        /**
         * @type {Array}
         */
        props: ['posts'],

        /**
         * @type {Object}
         */
        components: {
            'v-post-preview': PostPreviewComponent,
        },
    };
</script>
