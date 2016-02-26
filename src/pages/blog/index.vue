<style lang="sass" scoped> @import 'core';
    $mobile-width: 480px;

    .header {
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        overflow: hidden;
        position: relative;

        a.search {
            color: #666;
            font-size: 18px;
            padding: 10px;
            &:hover { color: #000 }
        }

        h1 {
            @include transition(opacity);
        }

        form {
            left: 0;
            opacity: 0;
            position: absolute;
            top: -60px;
            transition: all 250ms;
            width: 100%;
        }

        @include bp('min-width: #{ $mobile-width }') {
            a.search { display: none }
            form {
                opacity: 1;
                position: static;
                transition-property: none;
                width: 320px;
            }
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

    ul {
        @include transition(opacity);
        &.is-searching { opacity: 0; }
    }
</style>

<template>
    <main class="page">
        <div class="header" v-bind:class="{ 'search': searchIsExpanded }">
            <h1>Blog</h1>
            <a @click.prevent="showMobileSearch" href="#" class="search">
                <i class="fa fa-search"></i>
            </a>
            <form @submit.prevent="onSearchSubmitted">
                <input
                    @blur="hideMobileSearch"
                    @keypress.enter="blueMobileSearch"
                    v-el:search
                    v-model="search"
                    type="search"
                    placeholder="Search the blog...">
            </div>
        </div>
        <ul v-bind:class="{ 'is-searching': isSearching }">
            <li v-for="post in posts"><pre>{{ post | json }}</pre></li>
        </ul>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                isSearching: true,
                search: '',
                posts: [],
                searchIsExpanded: false,
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
                return BlogResource.get()
                    .then(response => this.$set('posts', response.data));
            },
        },

        /**
         * @type {Object}
         */
        methods: {

            blueMobileSearch() {
                this.$els.search.blur();
            },

            hideMobileSearch() {
                this.searchIsExpanded = false;
            },

            showMobileSearch() {
                this.searchIsExpanded = true;
                this.$els.search.focus();
            },

            /**
             * Search the blog for posts
             *
             * @param  {Object} e
             * @return {void}
             */
            onSearchSubmitted(e) {
                this.isSearching = true;
                let search = this.search.trim();
                BlogResource.get({ search }).then(response => {
                    this.isSearching = false;
                    this.$set('posts', response.data);
                });
            },
        },
    };
</script>
