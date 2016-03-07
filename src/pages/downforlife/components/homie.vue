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
    }

    img, .caption {
        position: absolute;
        @include props((top, right, bottom, left), 0)
    }

    .caption {
        align-items: center;
        color: #eee;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        position: absolute;
        z-index: 1;
        font-weight: 300 !important;
        @include transition(opacity);

        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
            opacity: 1;
        }
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
    <div class="square">
        <img :src="getImgPath(homie)">
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
         * @type {Object}
         */
        methods: {
            getImgPath(homie) {
                return typeof homie.image.path !== 'undefined'
                    ? homie.image.path
                    : 'error.jpg';
            },
        },
    };
</script>
