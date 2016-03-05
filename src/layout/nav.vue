<style lang="sass" scoped> @import 'core';
    nav {
        display: flex;
        align-items: center;

        a {
            color: #fff;
            &.toggle {
                align-items: center;
                display: flex;
                height: $header-height-mobile;
                margin-right: -$layout-padding-mobile;
                padding: 0 $layout-padding-mobile * 2;
                @include bp(tablet) { display: none }
            }
        }

        ul {
            left: 0;
            list-style: none;
            margin: 0;
            max-height: 0;
            overflow: hidden;
            padding: 0;
            right: 0;
            top: $header-height-mobile;
            z-index: 1;
            @include bp-prop('max-height', 0, none);
            @include bp-prop('border-bottom', 2px solid #222, 0);
            @include bp-prop('position', absolute, static);
            @include transition('max-height', 0.3s, ease-in-out);
            &.is-expanded { max-height: 500px }

            li {
                text-align: center;
                @include bp-prop('display', block, inline-block);

                a {
                    display: block;
                    font-weight: 300;
                    min-width: 125px;
                    text-align: center;
                    padding: 0 25px;
                    @include bp-prop('background-color', #444, transparent);
                    @include bp-prop('border-top', 1px solid #363636, none);
                    @include bp-prop('height, line-height', $header-height-mobile, $header-height-tablet, $header-height-desktop);
                    @include transition('background-color, height, line-height');

                    &:hover {
                        background-color: #222;
                        text-decoration: none;
                    }
                }
            }
        }
    }
</style>

<template>
    <nav>
        <ul v-bind:class="{ 'is-expanded': NavState.isExpanded }">
            <li><a @click="closeNavigation" v-link="{ name: 'shop' }">Shop</a></li>
            <li><a @click="closeNavigation" v-link="{ name: 'blog-index' }">Blog</a></li>
            <li><a @click="closeNavigation" v-link="{ name: 'downforlife' }">Down for Life</a></li>
            <li><a @click="closeNavigation" href="#">Cart ({{ cartItemCount }})</a></li>
        </ul>
        <a @click.prevent="toggleNavigation"  href="#" class="toggle fa-btn">
            <i class="fa {{ mobileIcon }}"></i>
        </a>
    </nav>
</template>

<script>
    import NavState from 'state/nav';
    import CartState from 'state/cart';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                NavState: NavState.state,
            };
        },

        /**
         * Close the mobile navigation when appropriate
         *
         * @return {void}
         */
        ready() {
            this.$el.addEventListener('click', e => e.stopPropagation());
            window.addEventListener('click', () => NavState.close());
            window.addEventListener('resize', () => NavState.close());
            window.addEventListener('scroll', () => NavState.close());
        },

        /**
         * @type {Object}
         */
        computed: {

            /**
             * Returns the number of items in the cart
             *
             * @return {Integer}
             */
            cartItemCount() {
                return CartState.getItemCount();
            },

            /**
             * Returns the mobile navigation Font Awesome class
             *
             * @return {String}
             */
            mobileIcon() {
                return NavState.state.isExpanded ? 'fa-times' : 'fa-bars';
            },
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Close the mobile navigation
             *
             * @return {void}
             */
            closeNavigation() {
                NavState.close();
            },

            /**
             * Toggle the mobile navigation
             *
             * @return {void}
             */
            toggleNavigation() {
                NavState.toggle();
            },
        },
    };
</script>
