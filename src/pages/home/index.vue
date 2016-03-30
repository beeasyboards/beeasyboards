<style lang="sass">@import 'core';
    .home-page-component {
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;

        > section, aside {
            flex-basis: auto;
            width: 100%;
            @include transition(width);
        }

        > .v-slider {
            order: 1;
            @include transition(padding);
        }

        > .v-featured-products { order: 2 }
        > .v-blog-sidebar { order: 3 }

        @include bp(tablet) {
            > .v-slider {
                order: 1;
                width: calc(100% - #{ $sidebar-width });
            }

            > .v-blog-sidebar {
                order: 2;
                width: $sidebar-width;
                li {
                    overflow: hidden;
                    &:nth-of-type(3), &:nth-of-type(4) { display: none; }
                    @include transition(height);
                }
            }

            > .v-featured-products {
                order: 3;
            }
        }

        @include bp(desktop) {
            > .v-blog-sidebar li:nth-of-type(3) { display: block }
        }
    }
</style>

<template>
    <main class="home-page-component reset margins">
        <v-slider class="v-slider tablet-padding" :slides="slides"></v-slider>
        <v-blog-sidebar class="v-blog-sidebar padding" :posts="recentPosts"></v-blog-sidebar>
        <v-featured-products class="v-featured-products padding"></v-featured-products>
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
