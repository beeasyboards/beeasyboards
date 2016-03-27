<style lang="sass" scoped>@import 'core';
    img {
        height: auto;
        width: 100%;
    }
</style>

<template>
    <section>
        <ul>
            <li v-for="slide in slides">
                <img :src="slide.image.path">
            </li>
        </ul>
    </section>
</template>

<script>
    module.exports = {

        /**
         * @type {Array}
         */
        props: ['slides'],
    };
</script>
