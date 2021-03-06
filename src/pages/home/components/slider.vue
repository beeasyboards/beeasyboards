<style lang="sass" scoped>@import 'core';
    img {
        height: auto;
        width: 100%;
    }

    // The buffer is just a place to load the previous and next images. It
    // exists to force the browser into loading the image as soon as it
    // is "on deck". This allows the slider to have a smooth change.
    .buffer { display: none }
</style>

<template>
    <section
        v-linkable
        v-touch:swipeleft="advanceToNextSlide"
        v-touch:swiperight="returnToPreviousSlide"
        v-touch-options:swipe="{ direction: 'horizontal' }"
    >
        <a :href="currentSlide.href">
            <img v-if="currentSlide" :src="currentSlide.image.path">
        </a>
        <div class="buffer">
            <img v-if="previousSlide" :src="previousSlide.image.path">
            <img v-if="nextSlide" :src="nextSlide.image.path">
        </div>
    </section>
</template>

<script>
    /**
     * @type {String}   Default href for slide links
     */
    let defaultSlideHref = '/shop';

    /**
     * @type {Number}   Transition duration in milliseconds
     */
    let transitionDurationMs = 30000;

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                currentIndex: 0,
                transitionInterval: null,
            };
        },

        /**
         * Start the transition interval
         *
         * @return {void}
         */
        attached() {
            this.transitionInterval = setInterval(this.advanceToNextSlide, transitionDurationMs);
        },

        /**
         * Clear the transition interval
         *
         * @return {void}
         */
        destroyed() {
            clearInterval(this.transitionInterval);
        },

        /**
         * @type {Array}
         */
        props: ['slides'],

        /**
         * @type {Object}
         */
        computed: {

            /**
             * Return the previous, current, or next slides
             *
             * @return {Object}
             */
            previousSlide() {
                return typeof this.slides[this.previousIndex] !== 'undefined'
                    ? this.slides[this.previousIndex]
                    : null;
            },

            currentSlide() {
                let slide = { href: '', image: { path: '' } };

                if (typeof this.slides[this.currentIndex] !== 'undefined') {
                    slide = this.slides[this.currentIndex];
                }

                if (slide.href.length === 0) {
                    slide.href = defaultSlideHref;
                }

                return slide;
            },

            nextSlide() {
                return typeof this.slides[this.nextIndex] !== 'undefined'
                    ? this.slides[this.nextIndex]
                    : null;
            },

            /**
             * Determine the previous or next slide index
             *
             * @return {Number}
             */
            previousIndex() {
                return this.currentIndex > 0
                    ? this.currentIndex - 1
                    : this.slides.length - 1;
            },

            nextIndex() {
                return this.currentIndex < this.slides.length - 1
                    ? this.currentIndex + 1
                    : 0;
            },
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Transition to the next slide
             *
             * @return {void}
             */
            advanceToNextSlide() {
                this.currentIndex = this.nextIndex;
            },

            /**
             * Transition to the previous slide
             *
             * @return {void}
             */
            returnToPreviousSlide() {
                this.currentIndex = this.previousIndex;
            },
        },
    };
</script>
