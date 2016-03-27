<style lang="sass">@import 'core';
    .home-component .slider {
        border: 1px solid red;
    }
</style>

<template>
    <main class="home-component">
        <v-slider class="with-sidebar" :slides="slides"></v-slider>
        <v-blog-sidebar class="padded" :posts="recentPosts"></v-blog-sidebar>
        <section class="padded">
            <v-featured-products class="featured-products"></v-featured-products>
        </section>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';
    import SliderResource from 'resources/slider';
    import SliderComponent from './components/slider';
    import RecentPostsComponent from './components/recent_posts';
    import BlogSidebarComponent from 'pages/blog/components/sidebar';
    import FeaturedProductsComponent from './components/featuredProducts';

    module.exports = {

        /**
         * @return {[Object]}
         */
        data() {
            return {
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
