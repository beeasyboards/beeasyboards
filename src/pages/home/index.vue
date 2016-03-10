<style lang="sass" scoped>@import 'core';
    $slider-width-tablet: 70%;

    main {
        display: flex;
        flex-wrap: wrap;
        > section { flex-basis: 100% }

        > .slider {
            order: 1;
            @include bp(tablet) { flex-basis: $slider-width-tablet }
        }

        > .featured-products {
            @include bp-prop(order, 2, 3);
        }

        > .recent-posts {
            @include bp-prop(order, 3, 2);
            @include bp(tablet) { flex-basis: 100% - $slider-width-tablet }
        }
    }
</style>

<template>
    <main class="inner">
        <v-slider class="slider"></v-slider>
        <v-recent-posts class="recent-posts"></v-recent-posts>
        <v-featured-products class="featured-products"></v-featured-products>
    </main>
</template>

<script>
    import SliderComponent from './components/slider';
    import RecentPostsComponent from './components/recentPosts';
    import FeaturedProductsComponent from './components/featuredProducts';

    module.exports = {

        /**
         * @type {Object}
         */
        components: {
            'v-slider': SliderComponent,
            'v-recent-posts': RecentPostsComponent,
            'v-featured-products': FeaturedProductsComponent,
        },
    };
</script>
