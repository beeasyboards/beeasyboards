<style lang="sass" scoped> @import 'core';
    $mobile-width: 'min-width: 481px';
    header {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        position: relative;

        @include bp('min-width: 481px') {
            flex-wrap: nowrap;
        }
    }

    //
    // Search form
    //
    form {
        margin-top: -$header-height-mobile;
        display: flex;
        align-items: center;
        position: absolute;
        left: 0;
        width: 100%;
        opacity: 0;
        padding: $layout-padding-mobile;
        height: $header-height-mobile;
        line-height: $header-height-mobile;
        @include transition('margin-top, opacity, width', 350ms);

        &.is-searching {
            margin-top: 0;
            opacity: 1;
        }

        @include bp('min-width: 481px') {
            margin-top: 0;
            opacity: 1;
            order: 2;
            padding-right: 0;
            position: static;
            width: 50%;
        }

        @include bp(desktop) {
            width: 25%;
        }
    }
    //
    // Mobile search
    //
    a {
        align-self: center;
        color: #aaa;
        @include bp('min-width: 481px') { display: none }
    }
</style>

<template>
    <header class="content">
        <form v-el:form @submit.prevent v-bind:class="{ 'is-searching': isSearching }">
            <input
                v-el:search
                @blur="onBlur"
                @keypress.enter.prevent="onEnter"
                v-model="search"
                debounce="250"
                type="search"
                placeholder="Search the blog...">
        </form>
        <h1>{{ header }}</h1>
        <a @click.prevent="onShow" href="#" class="fa-btn">
            <i class="fa fa-search"></i>
        </a>
    </header>
</template>

<script>
    module.exports = {

        /**
         * @type {Array}
         */
        props: ['header'],

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
