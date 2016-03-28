<style lang="sass">@import 'core';
    .home-component .slider {
        border: 1px solid red;
    }

    .home-component .v-blog-sidebar li:nth-of-type(4) {
        @include bp(tablet) {
            display: none;
        }
    }
</style>

<template>
    <main class="home-component">
        <v-slider class="with-sidebar" :slides="slides"></v-slider>
        <v-blog-sidebar class="v-blog-sidebar padded" :posts="recentPosts"></v-blog-sidebar>
        <section class="padded">
            <v-featured-products class="featured-products"></v-featured-products>
        </section>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import SliderResource from 'resources/slider';
    import SliderComponent from './components/slider';
    import BlogSidebarComponent from 'pages/blog/components/sidebar';
    import FeaturedProductsComponent from './components/featured_products';

    module.exports = {

        /**
         * @return {[Object]}
         */
        data() {
            return {
                slides: [],
                recentPosts: {},
            };
        },

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
                return this.$resources({
                    slides: SliderResource.get(),
                    recentPosts: BlogResource.getRecent(),
                });
            },
        },

        /**
         * @type {Object}
         */
        components: {
            'v-slider': SliderComponent,
            'v-blog-sidebar': BlogSidebarComponent,
            'v-featured-products': FeaturedProductsComponent,
        },
    };
</script>
