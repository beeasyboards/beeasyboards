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
        this.state.isExpanded = false;
    },

    /**
     * Expanded the mobile navigation
     *
     * @return {void}
     */
    open() {
        this.state.isExpanded = true;
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
