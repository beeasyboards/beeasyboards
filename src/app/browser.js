import zenscroll from 'zenscroll';

//
// Static browser functions
//
module.exports = {

    /**
     * Set the window title
     *
     * @param  {String} title
     * @return {void}
     */
    setTitle(title) {
        document.title = to.title;
    },

    /**
     * Animates a scroll to a given y offset
     *
     * @param  {Number} targetY     The Y offset to scroll to
     * @return {void}
     */
    scrollTo(targetY) {
        zenscroll.toY(-100)
    },
};
