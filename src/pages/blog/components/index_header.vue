<style lang="sass" scoped> @import 'core';
    div {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
        position: relative;

        h1 { @include transition(opacity) }

        form {
            left: 0;
            opacity: 0;
            position: absolute;
            top: -60px;
            transition: all 250ms;
            width: 100%;
        }

        a {
            color: #666;
            font-size: 18px;
            padding: 10px;
            &:hover { color: #000 }
        }

        @include bp('min-width: 480px') {
            form {
                opacity: 1;
                position: static;
                transition-property: none;
                width: 320px;
            }

            a { display: none }
        }

        &.search {
            h1 {
                opacity: 0;
            }

            form {
                opacity: 1;
                top: $layout-padding-mobile;
            }
        }
    }
</style>

<template>
    <div v-bind:class="{ 'search': searchIsExpanded }">
        <h1>Blog</h1>
        <a @click.prevent="showSearch" href="#">
            <i class="fa fa-search"></i>
        </a>
        <form @submit="executeSearch" v-el:form>
            <input
                @blur="hideSearch"
                @change="executeSearch"
                @keypress.enter.prevent="executeSearch"
                v-el:search
                v-model="search"
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
                searchIsExpanded: false,
            };
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Instruct the parent component to search the blog
             *
             * @return {void}
             */
            executeSearch() {
                if (this.isMobile()) {
                    this.$els.search.blur();
                }

                this.searchIsExpanded = false;
                this.$dispatch('search-submitted', this.search.trim());
            },

            /**
             * Blur the mobile search
             *
             * @return {void}
             */
            hideSearch() {
                this.searchIsExpanded = false;
            },

            /**
             * Determine if we're in mobile based on the form's position
             *
             * @return {Boolean}
             */
            isMobile() {
                return window.getComputedStyle(this.$els.form).getPropertyValue('position') === 'absolute';
            },

            /**
             * Focus the mobile search
             *
             * @return {void}
             */
            showSearch() {
                this.$els.search.focus();
                this.searchIsExpanded = true;
            },
        },
    };
</script>
