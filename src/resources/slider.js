import Vue from 'vue';

module.exports = {

    /**
     * @type {String}
     */
    url: '/api/beeasy/slides',

    /**
     * Fetch the slides
     *
     * @return {Promise}
     */
    get() {
        return Vue.resource(this.url).get();
    },
};
