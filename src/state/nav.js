//
// Navigation state
//
module.exports = {

    /**
     * @type {Object}
     */
    state: {
        isExpanded: false,
    },

    /**
     * Expanded the mobile navigation
     *
     * @return {void}
     */
    close() {
        this.isExpanded = false;
    },

    /**
     * Expanded the mobile navigation
     *
     * @return {void}
     */
    open() {
        this.isExpanded = true;
    },

    /**
     * Toggle mobile navigation
     *
     * @return {void}
     */
    toggle() {
        this.state.isExpanded = !this.state.isExpanded;
    },
};
