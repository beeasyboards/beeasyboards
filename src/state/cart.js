module.exports = {

    /**
     * @type {Object}
     */
    state: {
        items: [],
    },

    /**
     * Returns the number of items in the cart
     *
     * @return {Integer}
     */
    getItemCount() {
        let total = 0;
        for (let item of this.state.items) {
            total += item.quantity;
        }

        return total;
    },
};
