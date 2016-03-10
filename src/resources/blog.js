import Vue from 'vue';

module.exports = {

    /**
     * @type {String}
     */
    url: '/api/rainlab/blog{/slug}',

    /**
     * Make a get request to the blog api
     *
     * @param  {Object}     params
     * @return {Promise}
     */
    get(params) {
        return Vue.resource(this.url).get(params);
    },

    /**
     * Fetch the most recent posts
     *
     * @return {Object}
     */
    getRecent() {
        return Vue.resource('/api/beeasy/blog/recent').get();
    },

    /**
     * Make a get request to fetch related posts
     *
     * @param  {Object}     params
     * @return {Promise}
     */
    getRelated(params) {
        return Vue.resource('/api/beeasy/blog/related{/slug}').get(params);
    },
};
