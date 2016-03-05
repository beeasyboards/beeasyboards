<template>
    <div id="disqus_thread"></div>
</template>

<script>
    let disqusIsFetched = false;

    module.exports = {

        /**
         * @type {Array}
         */
        props: ['id', 'title'],

        /**
         * Fetch disqus and reset it's current context
         *
         * @return {void}
         */
        attached() {
            this.fetchDisqus();
            this.resetDisqus();
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Fetch Disqus dependency if we haven't already done so
             *
             * @return {void}
             */
            fetchDisqus() {
                if (!disqusIsFetched) {
                    let dsq = document.createElement('script');
                    dsq.type = 'text/javascript';
                    dsq.async = true;
                    dsq.src = 'http://beeasyboards.disqus.com/embed.js';
                    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                    disqusIsFetched = true;
                }
            },

            /**
             * Reset the Disqus context
             *
             * @return {void}
             */
            resetDisqus() {
                if (typeof DISQUS !== 'undefined') {
                    DISQUS.reset({
                        reload: true,
                        config() {
                            this.language = 'en';
                            this.page.title = this.title;
                            this.page.identifier = this.id;
                            this.page.url = 'http://beeasyboards.com' + this.$route.path;
                        },
                    });
                }
            },
        },
    };
</script>
