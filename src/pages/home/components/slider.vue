<style lang="sass" scoped>@import 'core';
    img {
        height: auto;
        width: 100%;
    }
</style>

<template>
    <section>
        <!-- Previous slide -->
        <div class="previous"></div>

        <!-- Current slide -->
        <div
            class="current"
            v-touch:swipeleft="onSwipeLeft"
            v-touch:swiperight="onSwipeRight"
            v-touch-options:swipe="{ direction: 'horizontal' }">
            <img :src="currentSlide.image.path">
        </div>

        <!-- Next slide -->
        <div v-if="nextcurrentIndex !== currentIndex" class="next">

        </div>
    </section>
</template>

<script>
    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                currentIndex: 0,
            };
        },

        /**
         * @type {Array}
         */
        props: ['slides'],

        computed: {
            /**
             * Return the current slide
             *
             * @return {Object|null}
             */
            currentSlide() {
                return typeof this.slides[this.currentIndex] !== 'undefined'
                    ? this.slides[this.currentIndex]
                    : null;
            },

            /**
             * Determine what the next slide index is
             *
             * @return {Number}
             */
            nextIndex() {
                return this.currentIndex < this.slides.length - 1
                    ? this.currentIndex + 1
                    : 0;
            },

            /**
             * Determine what the previous slide index is
             *
             * @return {Number}
             */
            previousIndex() {
                return this.currentIndex > 0
                    ? this.currentIndex - 1
                    : this.slides.length - 1;
            }
        },

        methods: {

            /**
             * Advance to the next slide
             *
             * @return {void}
             */
            onSwipeLeft() {
                this.currentIndex = this.nextIndex;
            },

            /**
             * Return to the previous slide
             *
             * @return {void}
             */
            onSwipeRight() {
                this.currentIndex = this.previousIndex;
            },
        },
    };
</script>
