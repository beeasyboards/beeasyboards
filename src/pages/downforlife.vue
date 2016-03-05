<style lang="sass" scoped>@import 'core';
    ul {
        display: flex;
        list-style: none;
        padding: 0 12px 12px;
        margin: -6px;
        flex-wrap: wrap;
    }

    li {
        flex-basis: 100%;
        padding: 6px;
        @include bp(phone) { flex-basis: 50% }
        @include bp(large-phone) { flex-basis: 33.3333% }
        @include bp(tablet) { flex-basis: 25% }
        @include bp(desktop) { flex-basis: 20% }
        @include transition(flex-basis);
    }

    img {
        height: 100%;
        width: 100%;
    }

    div.square {
        border-radius: 4px;
        overflow: hidden;
        padding-bottom: 100%;
        position: relative;
        width: 100%;

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

            .name {
                padding: 0 6px 12px;
                text-align: center;
                @include bp-prop(font-size, 20px, 22px, 24px);
            }
            .down-since { @include bp-prop(font-size, 12px, 14px) }
            time { @include bp-prop(font-size, 18px, 20px, 22px) }
        }
    }
</style>

<template>
    <main class="inner">
        <h1 class="content">Down for life</h1>
        <ul>
            <li v-for="homie in homies">
                <div class="square">
                    <img src="{{ homie.image.path }}">
                    <div class="caption">
                        <div class="name">{{ homie.name }}</div>
                        <div class="down-since">Down since</div>
                        <time datetime="{{ homie.created_at | moment }}">
                            {{ homie.created_at | moment 'MMMM YYYY' }}
                        </time>
                    </div>
                </div>
            </li>
        </ul>
    </main>
</template>

<script>
    import DownForLifeResource from 'resources/downforlife';

    module.exports = {

        /**
         * @return {Object}
         */
        data() {
            return {
                homies: [],
            };
        },

        /**
         * @type {Object}
         */
        route: {

            /**
             * @type {Boolean}
             */
            waitForData: true,

            /**
             * Fetch route data
             *
             * @param  {Object}     transition
             * @return {Promise}
             */
            data(transition) {
                return DownForLifeResource.get().then(response => this.$set('homies', response.data));
            },
        },
    };
</script>
