import Vue from 'vue';

module.exports = {

    /**
     * @type {String}
     */
    url: '/api/beeasy/downforlife',

    /**
     * Fetch the homies
     *
     * @return {Promise}
     */
    get() {
        return Vue.resource(this.url).get();
    },
};
