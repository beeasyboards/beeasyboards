<style lang="sass" scoped>@import 'core';
    img {
        height: 100%;
        width: 100%;
    }

    .square {
        border-radius: 4px;
        overflow: hidden;
        padding-bottom: 100%;
        position: relative;
        width: 100%;

        &.is-tapped, &:not(.is-mobile):hover {
            img {
                filter: blur(2px);
            }
            .caption {
                background-color: rgba(0, 0, 0, 0.8);
                opacity: 1;
            }
        }
    }

    img, .caption {
        position: absolute;
        @include props((top, right, bottom, left), 0)
    }

    .caption {
        align-items: center;
        color: #eee;
        display: flex;
        font-weight: 300 !important;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        position: absolute;
        z-index: 1;
        @include transition(opacity);
    }

    .name {
        padding: 0 6px 12px;
        text-align: center;
        @include bp-prop(font-size, 20px, 22px, 24px);
    }

    .down-since {
        @include bp-prop(font-size, 12px, 14px);

        time {
            @include bp-prop(font-size, 18px, 20px, 22px);
        }
    }
</style>

<template>
    <div
        class="square"
        @click.prevent="onClick"
        v-touch:tap="onTap"
        v-touch:doubletap="onDoubleTap"
        v-bind:class="{
            'is-mobile': this.$isMobile,
            'is-tapped': isTapped,
        }"
    >
        <img v-if="hasImage" :src="homie.image.path">
        <div class="caption">
            <div class="name">{{ homie.name }}</div>
            <div class="down-since">Down since</div>
            <time datetime="{{ homie.created_at | moment }}">
                {{ homie.created_at | moment 'MMMM YYYY' }}
            </time>
        </div>
    </div>
</template>

<script>
    module.exports = {

        /**
         * @type {Array}
         */
        props: ['homie'],

        /**
         * @return {Object}
         */
        data() {
            return {
                isTapped: false,
            };
        },

        /**
         * @type {Object}
         */
        computed: {

            /**
             * Check if the homie has an image
             *
             * @return {Boolean}
             */
            hasImage() {
                return typeof this.homie !== 'undefined' &&
                    typeof this.homie.image !== 'undefined' &&
                    typeof this.homie.image.path !== 'undefined';
            },
        },

        /**
         * @type {Object}
         */
        methods: {

            /**
             * Disable our sibling captions
             *
             * @return {void}
             */
            disableSiblingCaptions() {
                this.$parent.$children.forEach(sibling => {
                    if (sibling !== this) {
                        sibling.isTapped = false
                    }
                });
            },

            /**
             * Navigate to the homie's page
             *
             * @return {void}
             */
            gotoHomie() {
                if (!this.homie.href) {
                    return;
                } else if (this.homie.is_new_window) {
                    window.open(this.homie.href);
                } else {
                    window.location.href = this.homie.href
                }
            },

            /**
             * Navigates desktop users to a homie's page
             *
             * @return {void}
             */
            onClick() {
                if (!this.$isMobile) {
                    this.gotoHomie();
                }
            },

            /**
             * Navigates mobile users to a homie's page
             *
             * @return {void}
             */
            onDoubleTap() {
                if (this.$isMobile) {
                    this.gotoHomie();
                }
            },

            /**
             * Disable all other homie captions, and toggle our own
             *
             * @return {void}
             */
            onTap() {
                if (this.$isMobile) {
                    this.disableSiblingCaptions();
                    this.isTapped = !this.isTapped;
                }
            },
        },
    };
</script>
