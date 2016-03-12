module.exports = {

    /**
     * Add a property determining what kind of user we're dealing with
     *
     * @param  {Object}     Vue
     * @param  {Object}     options
     * @return {void}
     */
    install(Vue, options) {
        Vue.prototype.$isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
};
