<style lang="sass" scoped> @import 'core';
    header {
        flex-wrap: wrap;
        justify-content: space-between;
        h1, time { flex-basis: 100% }

        @include bp(tablet) {
            flex-wrap: nowrap;

            h1 {
                flex-basis: auto;
            }

            time {
                flex-basis: auto;
                padding-top: 12px;
            }
        }
    }

</style>

<template>
    <main class="inner content">
        <header>
            <h1>{{ post.title }}</h1>
            <time datetime="{{ post.published_at | moment }}">
                {{ post.published_at | moment 'MMM DD, YYYY' }}
            </time>
        </header>
        <div v-linkable>{{{ post.content_html }}}</div>
    </main>
</template>

<script>
    import BlogResource from 'resources/blog';

    module.exports = {

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
                return BlogResource.get(this.$route.params).then(response => this.$set('post', response.data));
            },
        },
    };
</script>
