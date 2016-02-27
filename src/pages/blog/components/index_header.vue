<style lang="sass" scoped> @import 'core';
    div {
        margin: $unit 0;
        overflow: hidden;
        position: relative;
        @include bp-prop(height, $header-height-mobile / 1.5, $header-height-tablet / 1.5, $header-height-desktop / 1.5);

        h1 {
            opacity: 1;
            @include bp-prop(padding-left, $layout-padding-mobile, $layout-padding-tablet);
            @include transition(opacity);
        }

        form {
            opacity: 0;
            position: absolute;
            top: -$header-height-mobile;
            @include props((left, right), $layout-padding-mobile);
            @include transition('opacity, top');
        }

        a {
            color: #666;
            &:hover { color: #000 }
        }

        //
        // Mobile searching
        //
        &.is-searching {
            h1 {
                opacity: 0;
            }

            form {
                opacity: 1;
                top: 0;
            }
        }

        //
        // Non-mobile
        //
        @include bp(tablet) {
            form {
                opacity: 1;
                padding: 0 $layout-padding-tablet;
                position: static;
                width: 50%;
            }

            a { display: none }
        }
    }
</style>

<template>
    <div v-bind:class="{ 'is-searching': isSearching }" class="page-header v-padded">
        <h1>Blog</h1>
        <a @click.prevent="onShow" href="#" class="icon-btn">
            <i class="fa fa-search"></i>
        </a>
        <form v-el:form @submit.prevent>
            <input
                v-el:search
                @blur="onBlur"
                @keypress.enter.prevent="onEnter"
                v-model="search"
                debounce="250"
                type="search"
                placeholder="Search the blog...">
        </form>
    </div>
</template>

<script>
    module.exports = {

        /**
         * @return {void}
         */
        data() {
            return {
                search: '',
                isSearching: false,
            };
        },

        /**
         * @type {Object}
         */
        watch: {

            /**
             * Dispatch an event indicating the search has changed
             *
             * @return {void}
             */
            search() {
                this.$dispatch('search', this.search.trim());
            },
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Determine if we're in mobile based on the form's position
             *
             * @return {Boolean}
             */
            isMobile() {
                return window.getComputedStyle(this.$els.form).getPropertyValue('position') === 'absolute';
            },

            /**
             * Blur the textarea if we're on mobile
             *
             * @return {void}
             */
            onEnter() {
                if (this.isMobile()) {
                    this.$els.search.blur();
                }
            },

            /**
             * Blur the mobile search
             *
             * @return {void}
             */
            onBlur() {
                this.isSearching = false;
            },

            /**
             * Show the mobile search
             *
             * @return {void}
             */
            onShow() {
                this.isSearching = true;
                this.$els.search.focus();
            },
        },
    };
</script>
