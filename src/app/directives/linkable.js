import Vue from 'vue';

/**
 * Keep local links from dynamic content as part of the SPA
 *
 * @return {void}
 */
Vue.directive('linkable', {

    /**
     * Bind to the click event
     *
     * @return {void}
     */
    bind() {
        this.el.addEventListener('click', this.onClick.bind(this));
    },

    /**
     * Hijack local links and direct them to the router
     *
     * @param  {Object} e       The click event
     * @return {void}
     */
    onClick(e) {
        let isCtrlKey = e.ctrlKey || e.metaKey;
        for (let el of e.path) {
            if (el === this.el || el.tagName === 'A') {
                let isLocalLink = el.hostname === window.location.hostname;
                if (isLocalLink && !isCtrlKey) {
                    e.preventDefault();
                    return this.vm.$router.go({ path: el.pathname });
                }
                break;
            }
        }
    },

    /**
     * Unbind the click event
     *
     * @return {void}
     */
    unbind() {
        this.el.removeEventListener('click', this.onClick);
    },
});
