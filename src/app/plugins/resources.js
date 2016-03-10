module.exports = {

    /**
     * Install plugin
     *
     * @param  {Object}     Vue
     * @param  {Object}     options
     * @return {void}
     */
    install(Vue, options) {

        // Register global methods
        Object.keys(this.methods).forEach(method => {
            Vue.prototype['$' + method] = this.methods[method]
        });
    },

    /**
     * @type {Object}   Global methods
     */
    methods: {

        /**
         * Bind resources to Vue models
         *
         * @param  {Promise|Array} resources
         * @return {void}
         */
        resources(resources) {
            let promises = [];

            Object.keys(resources).forEach(key => {
                let promise = resources[key];
                promise.then(response => this.$set(key, response.data));
                promises.push(promise);
            });

            return Promise.all(promises);
        }
    }
};
